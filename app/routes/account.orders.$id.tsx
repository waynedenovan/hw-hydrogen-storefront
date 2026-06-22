import {useLoaderData, Link, redirect, useFetcher} from 'react-router';
import type {LoaderFunctionArgs, ActionFunctionArgs, MetaFunction} from 'react-router';
import {Money, Image} from '@shopify/hydrogen';
import {ORDER_QUERY} from '~/graphql/customer-account/CustomerOrdersQuery';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Order ${data?.order?.name ?? ''} | Hoseworld`}];
};

const ARCHIVED_METAFIELD_QUERY = `#graphql
  query ArchivedOrders {
    customer {
      id
      metafield(namespace: "hw_account", key: "archived_order_ids") {
        value
      }
    }
  }
` as const;

const SET_ARCHIVED_METAFIELD_MUTATION = `#graphql
  mutation SetArchivedOrders($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        key
        namespace
        value
      }
      userErrors {
        field
        message
        code
      }
    }
  }
` as const;

function parseArchivedIds(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return (parsed as unknown[]).filter((x): x is string => typeof x === 'string');
    }
    return [];
  } catch {
    return [];
  }
}

export async function loader({params, context}: LoaderFunctionArgs) {
  if (!params.id) {
    return redirect('/account/orders');
  }

  const orderId = atob(params.id);

  const [{data, errors}, {data: metaData}] = await Promise.all([
    context.customerAccount.query(ORDER_QUERY, {variables: {orderId}}),
    context.customerAccount.query(ARCHIVED_METAFIELD_QUERY),
  ]);

  if (errors?.length || !data?.order) {
    throw new Response('Order not found', {status: 404});
  }

  const archivedIds = parseArchivedIds(metaData?.customer?.metafield?.value);
  const isArchived = archivedIds.includes(orderId);

  return {order: data.order, isArchived, orderId};
}

export async function action({params, context, request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent') as string;
  const orderId = formData.get('orderId') as string;

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

  if (intent === 'archive' || intent === 'unarchive') {
    const {data: metaData} = await context.customerAccount.query(ARCHIVED_METAFIELD_QUERY);
    const customerId = metaData?.customer?.id as string | undefined;
    const archivedIds = parseArchivedIds(metaData?.customer?.metafield?.value);

    const updatedIds = intent === 'archive'
      ? (archivedIds.includes(orderId) ? archivedIds : [...archivedIds, orderId])
      : archivedIds.filter((id) => id !== orderId);

    const {data, errors} = await context.customerAccount.mutate(SET_ARCHIVED_METAFIELD_MUTATION, {
      variables: {
        metafields: [{
          ownerId: customerId,
          namespace: 'hw_account',
          key: 'archived_order_ids',
          type: 'single_line_text_field',
          value: JSON.stringify(updatedIds),
        }],
      },
    });

    if (errors?.length) return {error: errors[0].message, intent};
    if (data?.metafieldsSet?.userErrors?.length) {
      return {error: data.metafieldsSet.userErrors[0].message, intent};
    }

    return {success: true, intent};
  }

  return {error: 'Unknown intent', intent};
}

export default function OrderDetail() {
  const {order, isArchived, orderId} = useLoaderData<typeof loader>();
  const fetcher = useFetcher<{success?: boolean; error?: string; intent?: string; alreadySent?: boolean}>();

  const cardStyle: React.CSSProperties = {
    background: 'rgba(50, 50, 50, 0.85)',
    borderRadius: '6px',
    padding: '1.25rem',
    marginBottom: '1rem',
  };

  const result = fetcher.data;
  const currentlyArchived = result?.intent === 'archive' && result?.success
    ? true
    : result?.intent === 'unarchive' && result?.success
      ? false
      : isArchived;

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
      {result?.success && result.intent === 'request-invoice' && (
        <p style={{color: '#68d391', marginBottom: '1rem', fontSize: '0.875rem'}}>
          {result.alreadySent ? 'Invoice was already sent to your email.' : 'Invoice emailed to your account email address.'}
        </p>
      )}
      {result?.success && result.intent === 'archive' && (
        <p style={{color: '#68d391', marginBottom: '1rem', fontSize: '0.875rem'}}>Order archived.</p>
      )}
      {result?.success && result.intent === 'unarchive' && (
        <p style={{color: '#68d391', marginBottom: '1rem', fontSize: '0.875rem'}}>Order restored to active.</p>
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

          <fetcher.Form method="post" style={{display: 'inline'}}>
            <input type="hidden" name="intent" value={currentlyArchived ? 'unarchive' : 'archive'} />
            <input type="hidden" name="orderId" value={orderId} />
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
              {currentlyArchived ? 'Unarchive Order' : 'Archive Order'}
            </button>
          </fetcher.Form>
        </div>
      </div>

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
