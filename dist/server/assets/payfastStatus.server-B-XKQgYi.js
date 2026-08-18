const STATUS_URL = "https://status.payfast.io/api/v2/status.json";
const FETCH_TIMEOUT_MS = 3e3;
const CACHE_TTL_MS = 6e4;
let cached = null;
async function getPayfastStatus() {
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.status;
  let status = { indicator: "unknown", description: "" };
  try {
    const response = await fetch(STATUS_URL, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
    });
    if (response.ok) {
      const body = await response.json();
      const indicator = body?.status?.indicator;
      if (indicator === "none" || indicator === "minor" || indicator === "major" || indicator === "critical") {
        status = { indicator, description: body?.status?.description ?? "" };
      }
    }
  } catch (error) {
    console.warn(
      "[payfastStatus] status page unreachable (failing open):",
      error instanceof Error ? error.message : error
    );
  }
  cached = { at: Date.now(), status };
  return status;
}
function isPayfastOutage(status) {
  return status.indicator === "major" || status.indicator === "critical";
}
function isPayfastDegraded(status) {
  return status.indicator === "minor" || status.indicator === "major" || status.indicator === "critical";
}

export { getPayfastStatus, isPayfastDegraded, isPayfastOutage };
