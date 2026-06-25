import {useLoaderData, Link, redirect, useFetcher} from 'react-router';
import {useState} from 'react';
import type {LoaderFunctionArgs, ActionFunctionArgs, MetaFunction} from 'react-router';
import {Money, Image} from '@shopify/hydrogen';
import {ORDER_QUERY} from '~/graphql/customer-account/CustomerOrdersQuery';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Order ${data?.order?.name ?? ''} | Hoseworld`}];
};

const CUSTOMER_ID_QUERY = `#graphql
  query CustomerId {
    customer {
      id
      emailAddress {
        emailAddress
      }
    }
  }
` as const;

type ReturnRequestStatus = {
  id: string;
  status: string;
  reason: string | null;
  lineItemsJson: string | null;
  shopifyOrderNum: string | null;
  xeroCreditNoteNum: string | null;
  createdAt: string;
  updatedAt: string;
} | null;

async function fetchArchivedIds(
  storefrontUiUrl: string,
  internalSecret: string,
  customerId: string,
): Promise<string[]> {
  try {
    const res = await fetch(
      `${storefrontUiUrl}/api/orders/archive?customerId=${encodeURIComponent(customerId)}`,
      {headers: {'X-Internal-Secret': internalSecret}},
    );
    if (!res.ok) return [];
    const data = (await res.json()) as {archivedIds?: string[]};
    return data.archivedIds ?? [];
  } catch {
    return [];
  }
}

async function fetchReturnStatus(
  storefrontUiUrl: string,
  internalSecret: string,
  shopifyOrderId: string,
): Promise<ReturnRequestStatus> {
  try {
    const res = await fetch(
      `${storefrontUiUrl}/api/returns/status?shopifyOrderId=${encodeURIComponent(shopifyOrderId)}`,
      {headers: {'X-Internal-Secret': internalSecret}},
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {returnRequest?: ReturnRequestStatus};
    return data.returnRequest ?? null;
  } catch {
    return null;
  }
}

export async function loader({params, context}: LoaderFunctionArgs) {
  if (!params.id) {
    return redirect('/account/orders');
  }

  const orderId = atob(params.id);
  const env = context.env as any;
  const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
  const internalSecret: string = env.INTERNAL_API_SECRET ?? '';

  const [{data, errors}, {data: idData}] = await Promise.all([
    context.customerAccount.query(ORDER_QUERY, {variables: {orderId}}),
    context.customerAccount.query(CUSTOMER_ID_QUERY),
  ]);

  if (errors?.length || !data?.order) {
    throw new Response('Order not found', {status: 404});
  }

  const customerId: string = (idData as any)?.customer?.id ?? '';
  const customerEmail: string = (idData as any)?.customer?.emailAddress?.emailAddress ?? '';

  const [archivedIds, returnRequest] = await Promise.all([
    storefrontUiUrl ? fetchArchivedIds(storefrontUiUrl, internalSecret, customerId) : Promise.resolve([]),
    storefrontUiUrl ? fetchReturnStatus(storefrontUiUrl, internalSecret, orderId) : Promise.resolve(null),
  ]);

  const isArchived = archivedIds.includes(orderId);

  return {order: data.order, isArchived, orderId, customerId, customerEmail, returnRequest};
}

export async function action({context, request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent') as string;
  const orderId = formData.get('orderId') as string;
  const customerId = formData.get('customerId') as string;

  if (intent === 'return-request') {
    const orderNum = formData.get('orderNum') as string;
    const customerEmail = formData.get('customerEmail') as string;
    const reason = formData.get('reason') as string;
    const lineItemsRaw = formData.get('lineItems') as string;

    const env = context.env as any;
    const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
    const internalSecret: string = env.INTERNAL_API_SECRET ?? '';

    if (!storefrontUiUrl) {
      return {error: 'Return service is not configured.', intent};
    }

    let lineItems: any[] | undefined;
    try {
      if (lineItemsRaw) lineItems = JSON.parse(lineItemsRaw);
    } catch {
      // proceed without lineItems
    }

    try {
      const res = await fetch(`${storefrontUiUrl}/api/returns/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Internal-Secret': internalSecret,
        },
        body: JSON.stringify({orderId, orderNum, customerEmail, customerId, reason, lineItems}),
      });

      if (!res.ok) {
        const data = (await res.json()) as {error?: string};
        return {error: data.error ?? 'Failed to submit return request.', intent};
      }

      return {success: true, intent};
    } catch {
      return {error: 'Could not reach return service. Please try again.', intent};
    }
  }

  if (intent === 'request-invoice') {
    const env = context.env as any;
    const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
    const invoiceApiSecret: string = env.INVOICE_API_SECRET ?? '';

    if (!storefrontUiUrl || !invoiceApiSecret) {
      return {error: 'Invoice service is not configured.', intent};
    }

    try {
      const res = await fetch(`${storefrontUiUrl}/api/xero/email-invoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Invoice-Api-Secret': invoiceApiSecret,
        },
        body: JSON.stringify({shopifyOrderId: orderId}),
      });

      const result = await res.json() as {success?: boolean; error?: string; alreadySent?: boolean};

      if (!res.ok) {
        return {error: result.error ?? 'Failed to email invoice.', intent};
      }

      return {
        success: true,
        intent,
        alreadySent: result.alreadySent ?? false,
      };
    } catch {
      return {error: 'Could not reach invoice service. Please try again.', intent};
    }
  }

  if (intent === 'archive') {
    const env = context.env as any;
    const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
    const internalSecret: string = env.INTERNAL_API_SECRET ?? '';

    if (!storefrontUiUrl) {
      return {error: 'Archive service is not configured.', intent};
    }

    try {
      const res = await fetch(`${storefrontUiUrl}/api/orders/archive`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Internal-Secret': internalSecret,
        },
        body: JSON.stringify({customerId, orderId}),
      });

      if (!res.ok) {
        const data = (await res.json()) as {error?: string};
        return {error: data.error ?? 'Failed to archive order.', intent};
      }

      return {success: true, intent};
    } catch {
      return {error: 'Could not reach archive service. Please try again.', intent};
    }
  }

  return {error: 'Unknown intent', intent};
}

type ReturnView = 'none' | 'select-items' | 'success';

export default function OrderDetail() {
  const {order, isArchived, orderId, customerId, customerEmail, returnRequest} = useLoaderData<typeof loader>();
  const fetcher = useFetcher<{success?: boolean; error?: string; intent?: string; alreadySent?: boolean}>();

  const [returnView, setReturnView] = useState<ReturnView>('none');
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(new Map());
  const [policyAcknowledged, setPolicyAcknowledged] = useState(false);
  const [returnReason, setReturnReason] = useState('');

  const cardStyle: React.CSSProperties = {
    background: 'rgba(50, 50, 50, 0.85)',
    borderRadius: '6px',
    padding: '1.25rem',
    marginBottom: '1rem',
  };

  const result = fetcher.data;
  const currentlyArchived = result?.intent === 'archive' && result?.success ? true : isArchived;

  // When return request succeeds, switch to success view
  const prevSuccess = result?.success && result.intent === 'return-request';
  if (prevSuccess && returnView === 'none') {
    // handled via useEffect pattern below
  }

  function handleItemToggle(lineItemId: string, originalQty: number) {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      if (next.has(lineItemId)) {
        next.delete(lineItemId);
      } else {
        next.set(lineItemId, 1);
      }
      return next;
    });
  }

  function handleQtyChange(lineItemId: string, qty: number) {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      if (next.has(lineItemId)) next.set(lineItemId, qty);
      return next;
    });
  }

  function handleReturnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const lineItems = order.lineItems.nodes
      .filter((li) => selectedItems.has(li.id))
      .map((li) => ({
        title: li.title,
        variantTitle: li.variantTitle ?? '',
        quantity: selectedItems.get(li.id) ?? 1,
        unitPrice: (li as any).price?.amount ?? '0',
        sku: (li as any).sku ?? '',
        variantId: (li as any).variant?.id ?? '',
      }));

    fetcher.submit(
      {
        intent: 'return-request',
        orderId,
        orderNum: order.name,
        customerId,
        customerEmail,
        reason: returnReason,
        lineItems: JSON.stringify(lineItems),
      },
      {method: 'post'},
    );
    setReturnView('none');
  }

  if (returnView === 'select-items') {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            setReturnView('none');
            setSelectedItems(new Map());
            setPolicyAcknowledged(false);
            setReturnReason('');
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            fontSize: '0.875rem',
            padding: 0,
            marginBottom: '1rem',
            display: 'inline-block',
          }}
        >
          ← Back to Order Details
        </button>

        <h2 style={{fontSize: '1.1rem', marginBottom: '1rem'}}>
          Request Return — {order.name}
        </h2>

        {/* Return Policy acknowledgment */}
        <div style={{...cardStyle, borderLeft: '3px solid rgba(255,180,100,0.5)'}}>
          <p style={{fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.75rem'}}>
            Before proceeding, please read our{' '}
            <a
              href="/policies/refund-policy"
              target="_blank"
              rel="noreferrer"
              style={{color: 'rgba(26,180,215,0.9)', textDecoration: 'underline'}}
            >
              Return Policy
            </a>
            . It describes what items are eligible, the customer's obligations, and any applicable shipping costs.
          </p>
          <label style={{display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem'}}>
            <input
              type="checkbox"
              checked={policyAcknowledged}
              onChange={(e) => setPolicyAcknowledged(e.target.checked)}
              style={{marginTop: '2px', flexShrink: 0}}
            />
            I have read and accept the Return Policy, including cost implications and obligations for both parties.
          </label>
        </div>

        {/* Line item selection */}
        <div style={cardStyle}>
          <h3 style={{fontSize: '1rem', marginBottom: '0.75rem'}}>Select items to return</h3>
          {order.lineItems.nodes.map((lineItem) => {
            const isSelected = selectedItems.has(lineItem.id);
            const selQty = selectedItems.get(lineItem.id) ?? 1;
            return (
              <div
                key={lineItem.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  opacity: isSelected ? 1 : 0.6,
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleItemToggle(lineItem.id, lineItem.quantity)}
                  style={{marginTop: '4px', flexShrink: 0}}
                />
                {lineItem.image && (
                  <Image
                    data={lineItem.image}
                    width={56}
                    height={56}
                    style={{borderRadius: '4px', objectFit: 'cover', flexShrink: 0}}
                  />
                )}
                <div style={{flex: 1, minWidth: 0}}>
                  <p style={{margin: 0, fontWeight: 'bold', fontSize: '0.875rem'}}>{lineItem.title}</p>
                  {lineItem.variantTitle && (
                    <p style={{margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)'}}>
                      {lineItem.variantTitle}
                    </p>
                  )}
                  <p style={{margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)'}}>
                    Ordered: {lineItem.quantity}
                  </p>
                  {isSelected && (
                    <div style={{marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
                      <label style={{fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)'}}>Return qty:</label>
                      <select
                        value={selQty}
                        onChange={(e) => handleQtyChange(lineItem.id, Number(e.target.value))}
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '4px',
                          color: 'white',
                          padding: '2px 6px',
                          fontSize: '0.8rem',
                        }}
                      >
                        {Array.from({length: lineItem.quantity}, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div style={{textAlign: 'right', flexShrink: 0}}>
                  <Money data={lineItem.price} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Reason + submit */}
        <form onSubmit={handleReturnSubmit} style={cardStyle}>
          <div style={{marginBottom: '0.75rem'}}>
            <label style={{display: 'block', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem'}}>
              Reason for return
            </label>
            <textarea
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              required
              rows={3}
              placeholder="e.g. Item arrived damaged, wrong size received…"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '4px',
                color: 'white',
                padding: '0.5rem',
                fontSize: '0.875rem',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {result?.error && result.intent === 'return-request' && (
            <p style={{color: '#fc8181', marginBottom: '0.75rem', fontSize: '0.875rem'}}>{result.error}</p>
          )}

          <div style={{display: 'flex', gap: '0.5rem'}}>
            <button
              type="submit"
              disabled={
                fetcher.state !== 'idle' ||
                !policyAcknowledged ||
                selectedItems.size === 0 ||
                !returnReason.trim()
              }
              style={{
                background: 'rgba(255,180,100,0.15)',
                color: 'rgba(255,180,100,0.9)',
                border: '1px solid rgba(255,180,100,0.3)',
                padding: '0.45rem 1.1rem',
                borderRadius: '5px',
                fontSize: '0.875rem',
                cursor: 'pointer',
                opacity:
                  !policyAcknowledged || selectedItems.size === 0 || !returnReason.trim()
                    ? 0.5
                    : 1,
              }}
            >
              {fetcher.state !== 'idle' ? 'Submitting…' : 'Submit Return Request'}
            </button>
            <button
              type="button"
              onClick={() => {
                setReturnView('none');
                setSelectedItems(new Map());
                setPolicyAcknowledged(false);
                setReturnReason('');
              }}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.4)',
                padding: '0.45rem 1rem',
                borderRadius: '5px',
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
          {(!policyAcknowledged || selectedItems.size === 0) && (
            <p style={{fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem'}}>
              {!policyAcknowledged && 'Please acknowledge the Return Policy. '}
              {selectedItems.size === 0 && 'Please select at least one item to return.'}
            </p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/account/orders"
        style={{
          color: 'rgba(255, 255, 255, 0.7)',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '1rem',
        }}
      >
        ← Back to Orders
      </Link>

      {result?.error && (
        <p style={{color: '#fc8181', marginBottom: '1rem', fontSize: '0.875rem'}}>{result.error}</p>
      )}
      {result?.success && result.intent === 'return-request' && (
        <p style={{color: '#68d391', marginBottom: '1rem', fontSize: '0.875rem'}}>
          Return request submitted. Our team will review it and be in touch.
        </p>
      )}
      {result?.success && result.intent === 'request-invoice' && (
        <p style={{color: '#68d391', marginBottom: '1rem', fontSize: '0.875rem'}}>
          {result.alreadySent ? 'Invoice was already sent to your email.' : 'Invoice emailed to your account email address.'}
        </p>
      )}
      {result?.success && result.intent === 'archive' && (
        <p style={{color: '#68d391', marginBottom: '1rem', fontSize: '0.875rem'}}>Order archived.</p>
      )}

      <div style={cardStyle}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          <div>
            <h2 style={{fontSize: '1.25rem', margin: 0}}>{order.name}</h2>
            {order.confirmationNumber && (
              <p
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.875rem',
                  margin: '0.25rem 0 0',
                }}
              >
                Confirmation: {order.confirmationNumber}
              </p>
            )}
          </div>
          <div style={{textAlign: 'right'}}>
            <p style={{margin: 0, fontSize: '0.875rem'}}>
              {new Date(order.processedAt).toLocaleDateString()}
            </p>
            <p
              style={{
                margin: '0.25rem 0 0',
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {order.fulfillmentStatus}
            </p>
          </div>
        </div>

        {/* Order Actions */}
        <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem'}}>
          <fetcher.Form method="post" style={{display: 'inline'}}>
            <input type="hidden" name="intent" value="request-invoice" />
            <input type="hidden" name="orderId" value={orderId} />
            <button
              type="submit"
              disabled={fetcher.state !== 'idle'}
              style={{
                background: 'rgba(26,180,215,0.15)',
                color: 'rgba(26,180,215,0.9)',
                border: '1px solid rgba(26,180,215,0.3)',
                padding: '0.4rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              {fetcher.state !== 'idle' && result?.intent === 'request-invoice' ? 'Sending…' : 'Email Invoice'}
            </button>
          </fetcher.Form>

          {!currentlyArchived && (
            <fetcher.Form method="post" style={{display: 'inline'}}>
              <input type="hidden" name="intent" value="archive" />
              <input type="hidden" name="orderId" value={orderId} />
              <input type="hidden" name="customerId" value={customerId} />
              <button
                type="submit"
                disabled={fetcher.state !== 'idle'}
                style={{
                  background: 'none',
                  color: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '0.4rem 1rem',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                }}
              >
                Archive Order
              </button>
            </fetcher.Form>
          )}
          {currentlyArchived && (
            <span style={{fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', padding: '0.4rem 0'}}>
              Archived
            </span>
          )}
          {!currentlyArchived && (!returnRequest || returnRequest.status === 'REJECTED') && (
            <button
              type="button"
              onClick={() => {
                setReturnView('select-items');
                setSelectedItems(new Map());
                setPolicyAcknowledged(false);
                setReturnReason('');
              }}
              style={{
                background: 'rgba(255,180,100,0.1)',
                color: 'rgba(255,180,100,0.8)',
                border: '1px solid rgba(255,180,100,0.25)',
                padding: '0.4rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              Request Return
            </button>
          )}
        </div>
      </div>

      {returnRequest && returnRequest.status !== 'REJECTED' && (
        <ReturnStatusCard returnRequest={returnRequest} />
      )}

      {returnRequest?.status === 'REJECTED' && (
        <div style={{...cardStyle, borderLeft: '3px solid rgba(255,100,100,0.4)', marginBottom: '1rem'}}>
          <p style={{margin: 0, fontSize: '0.875rem', color: 'rgba(255,150,150,0.9)'}}>
            A previous return request for this order was not approved. You may submit a new request if needed.
          </p>
        </div>
      )}

      <div style={cardStyle}>
        <h3 style={{fontSize: '1.1rem', marginBottom: '1rem'}}>Items</h3>
        {order.lineItems.nodes.map((lineItem) => (
          <div
            key={lineItem.id}
            style={{
              display: 'flex',
              gap: '1rem',
              paddingBottom: '1rem',
              marginBottom: '1rem',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {lineItem.image && (
              <Image
                data={lineItem.image}
                width={80}
                height={80}
                style={{borderRadius: '4px', objectFit: 'cover'}}
              />
            )}
            <div style={{flex: 1}}>
              <p style={{margin: 0, fontWeight: 'bold'}}>{lineItem.title}</p>
              {lineItem.variantTitle && (
                <p
                  style={{
                    margin: '0.25rem 0 0',
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  {lineItem.variantTitle}
                </p>
              )}
              <p
                style={{
                  margin: '0.25rem 0 0',
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                Qty: {lineItem.quantity}
              </p>
            </div>
            <div style={{textAlign: 'right'}}>
              <Money data={lineItem.price} />
              {lineItem.discountAllocations.length > 0 && (
                <p
                  style={{
                    margin: '0.25rem 0 0',
                    fontSize: '0.875rem',
                    color: '#e53e3e',
                  }}
                >
                  -<Money data={lineItem.totalDiscount} />
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {order.shippingAddress && (
        <div style={cardStyle}>
          <h3 style={{fontSize: '1.1rem', marginBottom: '0.75rem'}}>
            Shipping Address
          </h3>
          <p style={{margin: 0, lineHeight: '1.6'}}>
            {order.shippingAddress.formatted?.join(', ')}
          </p>
        </div>
      )}

      <div style={cardStyle}>
        <h3 style={{fontSize: '1.1rem', marginBottom: '0.75rem'}}>
          Order Summary
        </h3>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}
        >
          <span style={{color: 'rgba(255,255,255,0.7)'}}>Subtotal</span>
          <Money data={order.subtotal} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}
        >
          <span style={{color: 'rgba(255,255,255,0.7)'}}>Tax</span>
          <Money data={order.totalTax} />
        </div>
        {order.discountApplications.nodes.length > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              color: '#e53e3e',
            }}
          >
            <span>Discounts</span>
            <span>
              {order.discountApplications.nodes.map((discount, i) => (
                <span key={i}>
                  {discount.value.__typename === 'MoneyV2' ? (
                    <Money data={discount.value} />
                  ) : (
                    `${discount.value.percentage}%`
                  )}
                </span>
              ))}
            </span>
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '0.75rem',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
        >
          <span>Total</span>
          <Money data={order.totalPrice} />
        </div>
      </div>

      {order.statusPageUrl && (
        <a
          href={order.statusPageUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-block',
            color: 'rgba(255, 255, 255, 0.7)',
            textDecoration: 'none',
            marginTop: '0.5rem',
          }}
        >
          View order status page →
        </a>
      )}
    </div>
  );
}

function ReturnStatusCard({returnRequest}: {returnRequest: NonNullable<ReturnRequestStatus>}) {
  const statusColors: Record<string, string> = {
    PENDING: 'rgba(255,180,60,0.9)',
    APPROVED: 'rgba(104,211,145,0.9)',
  };
  const borderColors: Record<string, string> = {
    PENDING: 'rgba(255,180,60,0.4)',
    APPROVED: 'rgba(104,211,145,0.4)',
  };

  const color = statusColors[returnRequest.status] ?? 'rgba(255,255,255,0.7)';
  const border = borderColors[returnRequest.status] ?? 'rgba(255,255,255,0.2)';

  let lineItems: Array<{title?: string; variantTitle?: string; quantity?: number}> = [];
  try {
    if (returnRequest.lineItemsJson) lineItems = JSON.parse(returnRequest.lineItemsJson);
  } catch { /* keep empty */ }

  const cardStyle: React.CSSProperties = {
    background: 'rgba(50, 50, 50, 0.85)',
    borderRadius: '6px',
    padding: '1.25rem',
    marginBottom: '1rem',
    borderLeft: `3px solid ${border}`,
  };

  return (
    <div style={cardStyle}>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem'}}>
        <h3 style={{margin: 0, fontSize: '1rem'}}>Return Request</h3>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color,
            border: `1px solid ${border}`,
            borderRadius: '4px',
            padding: '2px 8px',
          }}
        >
          {returnRequest.status}
        </span>
      </div>

      <p style={{margin: '0 0 0.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)'}}>
        Submitted: {new Date(returnRequest.createdAt).toLocaleDateString()}
      </p>

      {returnRequest.reason && (
        <p style={{margin: '0 0 0.75rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)'}}>
          <span style={{color: 'rgba(255,255,255,0.5)'}}>Reason: </span>{returnRequest.reason}
        </p>
      )}

      {lineItems.length > 0 && (
        <div style={{marginBottom: '0.75rem'}}>
          <p style={{margin: '0 0 0.4rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)'}}>Items requested for return:</p>
          {lineItems.map((item, i) => (
            <p key={i} style={{margin: '0.2rem 0', fontSize: '0.875rem', paddingLeft: '0.75rem'}}>
              — {item.title}{item.variantTitle ? ` (${item.variantTitle})` : ''} × {item.quantity ?? 1}
            </p>
          ))}
        </div>
      )}

      {returnRequest.status === 'APPROVED' && returnRequest.xeroCreditNoteNum && (
        <p style={{margin: 0, fontSize: '0.875rem', color: 'rgba(104,211,145,0.9)'}}>
          Credit Note: {returnRequest.xeroCreditNoteNum}
        </p>
      )}

      {returnRequest.status === 'PENDING' && (
        <p style={{margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)'}}>
          Your return request is under review. We will be in touch once it has been processed.
        </p>
      )}
    </div>
  );
}
