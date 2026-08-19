import {type LoaderFunctionArgs, data} from 'react-router';
import {useLoaderData} from 'react-router';

export async function loader({request, context}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const orderRef = url.searchParams.get('ref') ?? '';
  const paymentRef = url.searchParams.get('pf_payment_id') ?? '';
  const method = url.searchParams.get('method') ?? '';

  const eftBankingDetails =
    method === 'eft'
      ? {
          bankName: (context.env as any).EFT_BANK_NAME ?? '',
          accountHolder: (context.env as any).EFT_ACCOUNT_HOLDER ?? '',
          accountNumber: (context.env as any).EFT_ACCOUNT_NUMBER ?? '',
          branchCode: (context.env as any).EFT_BRANCH_CODE ?? '',
          swiftCode: (context.env as any).EFT_SWIFT_CODE ?? '',
        }
      : null;

  // Best-effort: remove lines from the Shopify Storefront API cart for cleanup
  try {
    const cartData = await context.cart.get();
    const lineIds = (cartData?.lines?.nodes ?? []).map((line: any) => line.id);
    if (lineIds.length > 0) {
      await context.cart.removeLines(lineIds);
    }
  } catch (err) {
    console.error('[checkout/success] Cart lines removal failed:', err);
  }

  // Always clear the cart from the session so the user sees an empty cart
  context.session.unset('cartId');
  const cookieHeader = await context.session.commit();
  const headers = new Headers({'Set-Cookie': cookieHeader});

  return data({orderRef, paymentRef, method, eftBankingDetails}, {headers});
}

export default function CheckoutSuccess() {
  const {orderRef, paymentRef, method, eftBankingDetails} = useLoaderData<typeof loader>();
  const isEft = method === 'eft';

  return (
    <div className="checkout-result-wrapper">
      <div className="checkout-result-box">
        <div className="checkout-result-icon">{isEft ? '⏳' : '✓'}</div>
        <h1 className="checkout-result-title">
          {isEft ? 'Order Received — Awaiting Payment' : 'Order Confirmed!'}
        </h1>
        <p className="checkout-result-message">
          {isEft
            ? 'Thank you for your order. Please make your EFT payment using the banking details below. Your order will only be processed once payment reflects in our bank account (this can take 1–2 business days) — please use the order reference below as your payment reference.'
            : 'Thank you for your order. We have received your payment and will process your order shortly. A confirmation email will be sent to you.'}
        </p>
        {orderRef && (
          <p className="checkout-result-order-ref">Order ref: {orderRef}</p>
        )}
        {paymentRef && (
          <p className="checkout-result-order-ref">Payment ref: {paymentRef}</p>
        )}
        {isEft && eftBankingDetails && (
          <div className="checkout-eft-details" style={{textAlign: 'left', marginTop: '1rem'}}>
            <dl style={{margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.25rem 0.75rem', fontSize: '0.9rem'}}>
              <dt style={{opacity: 0.7}}>Bank</dt>
              <dd>{eftBankingDetails.bankName}</dd>
              <dt style={{opacity: 0.7}}>Account holder</dt>
              <dd>{eftBankingDetails.accountHolder}</dd>
              <dt style={{opacity: 0.7}}>Account number</dt>
              <dd>{eftBankingDetails.accountNumber}</dd>
              <dt style={{opacity: 0.7}}>Branch code</dt>
              <dd>{eftBankingDetails.branchCode}</dd>
              {eftBankingDetails.swiftCode && (
                <>
                  <dt style={{opacity: 0.7}}>SWIFT</dt>
                  <dd>{eftBankingDetails.swiftCode}</dd>
                </>
              )}
              <dt style={{opacity: 0.7}}>Reference</dt>
              <dd>{orderRef || 'See confirmation email'}</dd>
            </dl>
          </div>
        )}
        <a href="/" className="checkout-result-btn">
          Continue Shopping
        </a>
      </div>
    </div>
  );
}
