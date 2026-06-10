import {useLoaderData, Link, redirect} from 'react-router';
import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import {Money, Image} from '@shopify/hydrogen';
import {ORDER_QUERY} from '~/graphql/customer-account/CustomerOrdersQuery';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Order ${data?.order?.name ?? ''} | Hoseworld`}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  if (!params.id) {
    return redirect('/account/orders');
  }

  const orderId = atob(params.id);

  const {data, errors} = await context.customerAccount.query(ORDER_QUERY, {
    variables: {
      orderId,
    },
  });

  if (errors?.length || !data?.order) {
    throw new Response('Order not found', {status: 404});
  }

  return {order: data.order};
}

export default function OrderDetail() {
  const {order} = useLoaderData<typeof loader>();

  const cardStyle: React.CSSProperties = {
    background: 'rgba(50, 50, 50, 0.85)',
    borderRadius: '6px',
    padding: '1.25rem',
    marginBottom: '1rem',
  };

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
