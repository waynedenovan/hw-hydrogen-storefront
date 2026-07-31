import {data, Form, useActionData, useLoaderData} from 'react-router';
import type {ActionFunctionArgs, LoaderFunctionArgs} from 'react-router';
import {
  buildCookieConsent,
  fetchCookieConsentFromBackend,
  parseCookieConsent,
  serializeCookieConsent,
  syncCookieConsentToBackend,
} from '~/lib/cookieConsent.server';

const CUSTOMER_EMAIL_QUERY = `#graphql
  query CookiePreferencesCustomerEmail {
    customer {
      id
      emailAddress {
        emailAddress
      }
    }
  }
` as const;

type Categories = {functional: boolean; analytics: boolean; marketing: boolean};

export async function loader({context, request}: LoaderFunctionArgs) {
  const env = context.env as any;
  const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
  const internalSecret: string = env.INTERNAL_API_SECRET ?? '';

  let categories: Categories = {functional: false, analytics: false, marketing: false};

  try {
    const {data} = await context.customerAccount.query(CUSTOMER_EMAIL_QUERY);
    const email = (data as any)?.customer?.emailAddress?.emailAddress ?? '';
    const fromBackend = email
      ? await fetchCookieConsentFromBackend(storefrontUiUrl, internalSecret, email)
      : null;

    if (fromBackend) {
      categories = fromBackend;
    } else {
      // No backend record yet (e.g. this device never submitted the banner
      // while logged in) — fall back to whatever this browser's cookie says.
      const cookieConsent = await parseCookieConsent(request, [
        String(env.SESSION_SECRET || ''),
      ]);
      if (cookieConsent) {
        categories = {
          functional: cookieConsent.functional,
          analytics: cookieConsent.analytics,
          marketing: cookieConsent.marketing,
        };
      }
    }
  } catch {
    // non-blocking — page just shows the all-off defaults
  }

  return {categories, configured: Boolean(storefrontUiUrl)};
}

export async function action({context, request}: ActionFunctionArgs) {
  const env = context.env as any;
  const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
  const internalSecret: string = env.INTERNAL_API_SECRET ?? '';
  const formData = await request.formData();

  const categories: Categories = {
    functional: formData.get('functional') === 'on',
    analytics: formData.get('analytics') === 'on',
    marketing: formData.get('marketing') === 'on',
  };

  const consent = buildCookieConsent('manage_preferences', categories);
  const secrets = [String(env.SESSION_SECRET || '')];
  const setCookieHeader = await serializeCookieConsent(consent, secrets);

  try {
    const {data} = await context.customerAccount.query(CUSTOMER_EMAIL_QUERY);
    const shopifyCustomerId: string = (data as any)?.customer?.id ?? '';
    const email: string = (data as any)?.customer?.emailAddress?.emailAddress ?? '';
    if (email) {
      await syncCookieConsentToBackend(storefrontUiUrl, internalSecret, {
        shopifyCustomerId,
        email,
        consent,
      });
    }
  } catch {
    // The cookie (set below) is always updated regardless of backend sync
    // success — see cookie-consent.tsx for the same non-blocking rationale.
  }

  return data(
    {success: true},
    {headers: {'Set-Cookie': setCookieHeader}},
  );
}

export default function AccountCookiePreferences() {
  const {categories, configured} = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const cardStyle = {
    background: 'rgba(50, 50, 50, 0.85)',
    borderRadius: '6px',
    padding: '1.25rem',
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem',
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.85)',
  };

  return (
    <div>
      <h2 style={{fontSize: '1.25rem', marginBottom: '1rem'}}>Cookie Preferences</h2>
      <p style={{color: '#ccc', marginBottom: '1rem'}}>
        Choose which non-essential cookie categories we may use. Essential
        cookies (required for login, cart and checkout) are always active.
        This also updates the choice remembered in your browser.
      </p>

      {!configured && (
        <p style={{color: '#f88'}}>Cookie preferences service is not configured.</p>
      )}

      {actionData?.success && (
        <p style={{color: '#68d391', marginBottom: '1rem'}}>Preferences saved.</p>
      )}

      <Form method="post" style={cardStyle}>
        <label style={labelStyle}>
          <input type="checkbox" checked disabled style={{width: 'auto', margin: 0}} />
          Essential (always active)
        </label>
        <label style={labelStyle}>
          <input
            type="checkbox"
            name="functional"
            defaultChecked={categories.functional}
            style={{width: 'auto', margin: 0}}
          />
          Functional
        </label>
        <label style={labelStyle}>
          <input
            type="checkbox"
            name="analytics"
            defaultChecked={categories.analytics}
            style={{width: 'auto', margin: 0}}
          />
          Analytics
        </label>
        <label style={{...labelStyle, marginBottom: '1.25rem'}}>
          <input
            type="checkbox"
            name="marketing"
            defaultChecked={categories.marketing}
            style={{width: 'auto', margin: 0}}
          />
          Marketing
        </label>

        <button
          type="submit"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: '0.5rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Save Preferences
        </button>
      </Form>
    </div>
  );
}
