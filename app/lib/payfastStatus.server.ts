// PayFast availability check via their public status page (task 2607191915
// follow-up; endpoint per the payfast-status-api skill). Used to warn the
// customer on the checkout Review step from "minor" up, and to block payment
// initiation on "major"/"critical" — a failed redirect to a dead PayFast page
// would orphan a draft order and confuse the customer.
//
// Fails OPEN: if the status page itself is slow or unreachable, the indicator
// is "unknown" and payment proceeds — status.payfast.io being down is not
// evidence that PayFast payments are down.

export type PayfastIndicator = 'none' | 'minor' | 'major' | 'critical' | 'unknown';

export interface PayfastStatus {
  indicator: PayfastIndicator;
  description: string;
}

const STATUS_URL = 'https://status.payfast.io/api/v2/status.json';
const FETCH_TIMEOUT_MS = 3000;
const CACHE_TTL_MS = 60_000;

let cached: {at: number; status: PayfastStatus} | null = null;

export async function getPayfastStatus(): Promise<PayfastStatus> {
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.status;

  let status: PayfastStatus = {indicator: 'unknown', description: ''};
  try {
    const response = await fetch(STATUS_URL, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (response.ok) {
      const body = (await response.json()) as {
        status?: {indicator?: string; description?: string};
      };
      const indicator = body?.status?.indicator;
      if (
        indicator === 'none' ||
        indicator === 'minor' ||
        indicator === 'major' ||
        indicator === 'critical'
      ) {
        status = {indicator, description: body?.status?.description ?? ''};
      }
    }
  } catch (error) {
    console.warn(
      '[payfastStatus] status page unreachable (failing open):',
      error instanceof Error ? error.message : error,
    );
  }

  cached = {at: Date.now(), status};
  return status;
}

/** True when payment initiation should be blocked outright. */
export function isPayfastOutage(status: PayfastStatus): boolean {
  return status.indicator === 'major' || status.indicator === 'critical';
}

/** True when the checkout should show a degraded-service warning banner. */
export function isPayfastDegraded(status: PayfastStatus): boolean {
  return (
    status.indicator === 'minor' ||
    status.indicator === 'major' ||
    status.indicator === 'critical'
  );
}

// Test seam: reset the module cache between test cases.
export function _resetPayfastStatusCache() {
  cached = null;
}
