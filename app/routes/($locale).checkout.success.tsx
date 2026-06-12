import {type LoaderFunctionArgs, data} from 'react-router';
import {useLoaderData} from 'react-router';

export async function loader({request, context}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const orderRef = url.searchParams.get('ref') ?? '';
  const paymentRef = url.searchParams.get('pf_payment_id') ?? '';

  let headers = new Headers();
  try {
    const cartData = await context.cart.get();
    const lineIds = (cartData?.lines?.nodes ?? []).map((line: any) => line.id);
    if (lineIds.length > 0) {
      const result = await context.cart.removeLines(lineIds);
      if (result?.headers) {
        result.headers.forEach((value: string, key: string) =>
          headers.append(key, value),
        );
      }
    }
  } catch {
    // Cart clearing is best-effort — don't block the success page on error
  }

  return data({orderRef, paymentRef}, {headers});
}

export default function CheckoutSuccess() {
  const {orderRef, paymentRef} = useLoaderData<typeof loader>();

  return (
    <div className="checkout-result-wrapper">
      <div className="checkout-result-box">
        <div className="checkout-result-icon">✓</div>
        <h1 className="checkout-result-title">Order Confirmed!</h1>
        <p className="checkout-result-message">
          Thank you for your order. We have received your payment and will
          process your order shortly. A confirmation email will be sent to you.
        </p>
        {orderRef && (
          <p className="checkout-result-order-ref">Order ref: {orderRef}</p>
        )}
        {paymentRef && (
          <p className="checkout-result-order-ref">Payment ref: {paymentRef}</p>
        )}
        <a href="/" className="checkout-result-btn">
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
