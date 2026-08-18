import {createCookie} from 'react-router';

export type CookieConsentMethod =
  | 'accept_all'
  | 'reject_non_essential'
  | 'manage_preferences';

export type CookieConsent = {
  essential: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  method: CookieConsentMethod;
  decidedAt: string;
};

// POPIA requires the consent decision to persist across return visits (not
// just the current browser session), so this is a dedicated, long-lived
// cookie rather than a key on the ambient `session` cookie (app/lib/session.ts),
// which has no maxAge and disappears when the browser session ends.
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function createCookieConsentCookie(secrets: string[]) {
  return createCookie('cookie_consent', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: ONE_YEAR_SECONDS,
    secrets,
  });
}

export async function parseCookieConsent(
  request: Request,
  secrets: string[],
): Promise<CookieConsent | null> {
  try {
    const cookie = createCookieConsentCookie(secrets);
    const value = await cookie.parse(request.headers.get('Cookie'));
    if (!value || typeof value !== 'object') return null;
    return value as CookieConsent;
  } catch {
    return null;
  }
}

export async function serializeCookieConsent(
  consent: CookieConsent,
  secrets: string[],
): Promise<string> {
  const cookie = createCookieConsentCookie(secrets);
  return cookie.serialize(consent);
}

export function buildCookieConsent(
  method: CookieConsentMethod,
  categories: {functional: boolean; analytics: boolean; marketing: boolean},
): CookieConsent {
  return {
    essential: true,
    functional: categories.functional,
    analytics: categories.analytics,
    marketing: categories.marketing,
    method,
    decidedAt: new Date().toISOString(),
  };
}

// Mirrors the existing account.profile.tsx business-profile pattern: logged-in
// customers get a durable, amendable copy of their choice in the
// hw-storefront-ui-node-docker backend (survives cookie clears), keyed by
// email/shopifyCustomerId — never a Shopify Customer Account API metafield
// (that namespace write is rejected there; this is the established convention).
export async function syncCookieConsentToBackend(
  storefrontUiUrl: string,
  internalSecret: string,
  params: {
    shopifyCustomerId: string;
    email: string;
    consent: CookieConsent;
  },
): Promise<boolean> {
  if (!storefrontUiUrl || !params.email) return false;
  try {
    const res = await fetch(`${storefrontUiUrl}/api/customer/cookie-consent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Secret': internalSecret,
      },
      body: JSON.stringify({
        shopifyCustomerId: params.shopifyCustomerId,
        email: params.email,
        functional: params.consent.functional,
        analytics: params.consent.analytics,
        marketing: params.consent.marketing,
        method: params.consent.method,
        decidedAt: params.consent.decidedAt,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchCookieConsentFromBackend(
  storefrontUiUrl: string,
  internalSecret: string,
  email: string,
): Promise<{functional: boolean; analytics: boolean; marketing: boolean} | null> {
  if (!storefrontUiUrl || !email) return null;
  try {
    const res = await fetch(
      `${storefrontUiUrl}/api/customer/cookie-consent?email=${encodeURIComponent(email)}`,
      {headers: {'X-Internal-Secret': internalSecret}},
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      functional?: boolean;
      analytics?: boolean;
      marketing?: boolean;
      found?: boolean;
    };
    if (!data.found) return null;
    return {
      functional: Boolean(data.functional),
      analytics: Boolean(data.analytics),
      marketing: Boolean(data.marketing),
    };
  } catch {
    return null;
  }
}
