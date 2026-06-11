import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData} from 'react-router';

export async function loader({request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const orderRef = url.searchParams.get('ref') ?? '';
  const paymentRef = url.searchParams.get('pf_payment_id') ?? '';
  return {orderRef, paymentRef};
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
