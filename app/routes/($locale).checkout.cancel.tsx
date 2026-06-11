import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData} from 'react-router';

export async function loader({request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const orderRef = url.searchParams.get('ref') ?? '';
  return {orderRef};
}

export default function CheckoutCancel() {
  const {orderRef} = useLoaderData<typeof loader>();

  return (
    <div className="checkout-result-wrapper">
      <div className="checkout-result-box">
        <div className="checkout-result-icon" style={{color: '#fc8181'}}>✕</div>
        <h1 className="checkout-result-title">Payment Cancelled</h1>
        <p className="checkout-result-message">
          Your payment was cancelled and you have not been charged. Your cart
          is still intact — you can try again when you are ready.
        </p>
        {orderRef && (
          <p className="checkout-result-order-ref">Order ref: {orderRef}</p>
        )}
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <a href="/checkout" className="checkout-result-btn">
            Try Again
          </a>
          <a
            href="/cart"
            className="checkout-result-btn"
            style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)'}}
          >
            Back to Cart
          </a>
        </div>
      </div>
    </div>
  );
}
