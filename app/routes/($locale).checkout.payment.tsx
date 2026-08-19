import {type ActionFunctionArgs, redirect, data} from 'react-router';
import {validateCollectionDateTime} from '~/lib/collectionSchedule';

/**
 * Payment portal entry point — PayFast or direct EFT.
 * Only active when PUBLIC_PAYMENT_GATEWAY=payfast in .env.
 * Receives cart details from the checkout form, calls hw-storefront-ui
 * to create a Draft Order, then either issues a 302 to PayFast (paymentMethod
 * 'payfast') or to our own success page with EFT banking details
 * (paymentMethod 'eft') — hw-storefront-ui returns the right redirectUrl
 * either way, so this route doesn't need to branch on it.
 */
export async function action({request, context}: ActionFunctionArgs) {
  const env = context.env as any;
  const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
  const internalSecret: string = env.INTERNAL_API_SECRET ?? '';

  if (!storefrontUiUrl) {
    return data(
      {error: 'Payment service is not configured. Please try again later.'},
      {status: 503},
    );
  }

  // Pre-payment PayFast availability gate (task 2607191915): during a reported
  // major/critical PayFast outage, redirecting the customer would strand them
  // on a dead payment page with an orphaned draft order. Fails open when the
  // status page itself is unreachable. Server-only module — dynamic import per
  // ERR-IMPORT-001.
  const {getPayfastStatus, isPayfastOutage} = await import(
    '~/lib/payfastStatus.server'
  );
  const payfastStatus = await getPayfastStatus();
  if (isPayfastOutage(payfastStatus)) {
    console.error('[checkout/payment] blocked by PayFast outage:', payfastStatus);
    return data(
      {
        error:
          'The payment provider (PayFast) is currently reporting an outage' +
          (payfastStatus.description ? ` ("${payfastStatus.description}")` : '') +
          '. Your cart has been saved — please try again shortly.',
      },
      {status: 503},
    );
  }

  const formData = await request.formData();

  const paymentMethod = (formData.get('paymentMethod') as string) || 'payfast';
  const shippingMethodType = (formData.get('shippingMethodType') as string) || '';
  const rawCollectionDate = (formData.get('collectionDate') as string) || '';
  const rawCollectionTime = (formData.get('collectionTime') as string) || '';

  // Server-side enforcement of the 4-working-day / store-hours collection
  // window — the checkout form already applies this, but a direct POST here
  // must not be able to bypass it.
  if (shippingMethodType === 'collection') {
    const scheduleCheck = validateCollectionDateTime(rawCollectionDate, rawCollectionTime);
    if (!scheduleCheck.valid) {
      return data({error: scheduleCheck.error}, {status: 400});
    }
  }

  const orderPayload = {
    cartId: formData.get('cartId'),
    paymentMethod,
    cartTotal: formData.get('cartTotal'),
    cartCurrency: formData.get('cartCurrency'),
    customer: {
      email: formData.get('email'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone'),
    },
    shippingAddress: {
      address1: formData.get('shipAddress1'),
      address2: formData.get('shipAddress2'),
      city: formData.get('shipCity'),
      province: formData.get('shipProvince'),
      zip: formData.get('shipZip'),
      country: formData.get('shipCountry'),
    },
    lineItems: (() => {
      try {
        return JSON.parse((formData.get('lineItems') as string) ?? '[]');
      } catch {
        return [];
      }
    })(),
    invoiceEmailRequested: formData.get('invoiceEmailRequested') === 'true',
    businessDetails: {
      isBusinessCustomer: formData.get('isBusinessCustomer') === 'true',
      companyName: (formData.get('companyName') as string) || '',
      vatNumber: (formData.get('vatNumber') as string) || '',
      regNumber: (formData.get('regNumber') as string) || '',
    },
    shippingLine: {
      title: (formData.get('shippingTitle') as string) || 'Shipping',
      cost: (formData.get('shippingCost') as string) || '0',
    },
    // Shipping App (task 2607280940) — carried through to hw-storefront-ui's
    // customAttributes so processItn can create the Shipment tracking row.
    shippingMethod: {
      type: shippingMethodType,
      tcgRateId: (formData.get('tcgRateId') as string) || '',
      tcgServiceLevel: (formData.get('tcgServiceLevel') as string) || '',
      // Combined display string — hw-storefront-ui only stores this as an
      // opaque customAttribute value, it doesn't parse it.
      collectionDate: `${rawCollectionDate} ${rawCollectionTime}`.trim(),
    },
  };

  try {
    const res = await fetch(`${storefrontUiUrl}/api/payment/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Secret': internalSecret,
      },
      body: JSON.stringify(orderPayload),
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => 'Unknown error');
      console.error('[checkout/payment] initiate failed:', res.status, errorText);
      return data(
        {error: 'Payment initiation failed. Please try again.'},
        {status: 502},
      );
    }

    const {redirectUrl} = (await res.json()) as {redirectUrl: string};

    if (!redirectUrl) {
      return data(
        {error: 'No payment redirect URL received. Please try again.'},
        {status: 502},
      );
    }

    throw redirect(redirectUrl);
  } catch (err: unknown) {
    if (err instanceof Response) throw err; // let redirect pass through
    console.error('[checkout/payment] unexpected error:', err);
    return data(
      {error: 'An unexpected error occurred. Please try again.'},
      {status: 500},
    );
  }
}

/* GET requests to this route redirect back to checkout */
export async function loader() {
  throw redirect('/checkout');
}
