import type {ActionFunctionArgs} from 'react-router';
import {data} from 'react-router';
import {
  buildCookieConsent,
  serializeCookieConsent,
  syncCookieConsentToBackend,
  type CookieConsentMethod,
} from '~/lib/cookieConsent.server';

const CUSTOMER_ID_QUERY = `#graphql
  query CookieConsentCustomerId {
    customer {
      id
      emailAddress {
        emailAddress
      }
    }
  }
` as const;

// Resource route (no default export/UI) — submitted from the CookieConsentGate
// banner (first-visit, non-dismissible) and from account.cookie-preferences.tsx
// (amendment). Always sets the long-lived cookie_consent cookie; additionally
// persists to the hw-storefront-ui-node-docker backend when the visitor is a
// logged-in customer, per the project's "custom backend, never Customer
// Account API metafields" convention (see account.wishlist.tsx / account.profile.tsx).
export async function action({context, request}: ActionFunctionArgs) {
  const env = context.env as any;
  const formData = await request.formData();

  const intent = (formData.get('intent') as CookieConsentMethod) || 'reject_non_essential';
  const isAcceptAll = intent === 'accept_all';
  const isManage = intent === 'manage_preferences';

  const categories = {
    functional: isAcceptAll || (isManage && formData.get('functional') === 'on'),
    analytics: isAcceptAll || (isManage && formData.get('analytics') === 'on'),
    marketing: isAcceptAll || (isManage && formData.get('marketing') === 'on'),
  };

  const consent = buildCookieConsent(intent, categories);
  const secrets = [String(env.SESSION_SECRET || '')];
  const setCookieHeader = await serializeCookieConsent(consent, secrets);

  try {
    const loggedIn = await context.customerAccount.isLoggedIn();
    if (loggedIn) {
      const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
      const internalSecret: string = env.INTERNAL_API_SECRET ?? '';
      const {data: idData} = await context.customerAccount.query(CUSTOMER_ID_QUERY);
      const shopifyCustomerId: string = (idData as any)?.customer?.id ?? '';
      const email: string = (idData as any)?.customer?.emailAddress?.emailAddress ?? '';
      if (storefrontUiUrl && email) {
        await syncCookieConsentToBackend(storefrontUiUrl, internalSecret, {
          shopifyCustomerId,
          email,
          consent,
        });
      }
    }
  } catch {
    // Backend sync is best-effort — the cookie is always the source of truth
    // for whether the gate should show, so a backend hiccup must not block it.
  }

  return data(
    {success: true, consent},
    {headers: {'Set-Cookie': setCookieHeader}},
  );
}
