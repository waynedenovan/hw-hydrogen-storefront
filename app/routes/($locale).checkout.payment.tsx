import {type ActionFunctionArgs, redirect, data} from 'react-router';

/**
 * PayFast payment portal entry point.
 * Only active when PUBLIC_PAYMENT_GATEWAY=payfast in .env.
 * Receives cart details from the checkout form, calls hw-storefront-ui
 * to create a Draft Order and get the signed PayFast redirect URL,
 * then issues a 302 to PayFast.
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

  const formData = await request.formData();

  const orderPayload = {
    cartId: formData.get('cartId'),
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
