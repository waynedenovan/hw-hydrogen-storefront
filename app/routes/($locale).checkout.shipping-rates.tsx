import {type ActionFunctionArgs, data} from 'react-router';

/**
 * Server-side proxy to hw-storefront-ui's TCG rate-quote endpoint — keeps
 * INTERNAL_API_SECRET off the browser, same pattern as checkout.payment.tsx.
 * Always returns a `collection` option even when the TCG rates call fails
 * upstream, so checkout can degrade to collection-only rather than blocking.
 *
 * NOTE: this always responds with HTTP 200 (error state lives in the JSON
 * body's `error` field) rather than a 5xx status — this route is served
 * through Cloudflare (hoseworld.store), which replaces 502/503/504 response
 * bodies with its own generic error page, destroying the `collection`
 * fallback data the checkout UI needs. See the matching note in
 * hw-storefront-ui's api.shipping.rates.jsx.
 */
export async function action({request, context}: ActionFunctionArgs) {
  const env = context.env as any;
  const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
  const internalSecret: string = env.INTERNAL_API_SECRET ?? '';

  if (!storefrontUiUrl) {
    return data({error: 'Shipping service is not configured.', rates: [], collection: null});
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return data({error: 'Invalid JSON body', rates: [], collection: null});
  }

  try {
    const res = await fetch(`${storefrontUiUrl}/api/shipping/rates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Secret': internalSecret,
      },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    return data(json);
  } catch (err) {
    console.error('[checkout/shipping-rates] proxy failed:', err);
    return data({error: 'Could not fetch shipping rates.', rates: [], collection: null});
  }
}

export async function loader() {
  return data({error: 'Method not allowed'}, {status: 405});
}
