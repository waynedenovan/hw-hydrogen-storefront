import {useLoaderData, Link} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';
import {Money, getPaginationVariables} from '@shopify/hydrogen';
import {CUSTOMER_ORDERS_QUERY} from '~/graphql/customer-account/CustomerOrdersQuery';

export async function loader({context, request}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {pageBy: 20});

  const {data} = await context.customerAccount.query(CUSTOMER_ORDERS_QUERY, {
    variables: {
      ...paginationVariables,
    },
  });

  return {orders: data.customer.orders};
}

export default function AccountOrders() {
  const {orders} = useLoaderData<typeof loader>();

  const cardStyle = {
    background: 'rgba(50, 50, 50, 0.85)',
    borderRadius: '6px',
    padding: '1.25rem',
    marginBottom: '0.75rem',
  };

  return (
    <div>
      <h2 style={{fontSize: '1.25rem', marginBottom: '1rem'}}>Order History</h2>

      {orders.nodes.length === 0 ? (
        <div style={cardStyle}>
          <p style={{color: 'rgba(255,255,255,0.7)'}}>No orders yet.</p>
        </div>
      ) : (
        orders.nodes.map((order) => (
          <div key={order.id} style={cardStyle}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem'}}>
              <div>
                <p style={{fontWeight: 'bold'}}>
                  Order #{order.number}
                  {order.confirmationNumber && (
                    <span style={{color: 'rgba(255,255,255,0.5)', fontWeight: 'normal', marginLeft: '0.5rem'}}>
                      ({order.confirmationNumber})
                    </span>
                  )}
                </p>
                <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem'}}>
                  {new Date(order.processedAt).toLocaleDateString()}
                </p>
              </div>
              <div style={{textAlign: 'right'}}>
                <p>
                  <Money data={order.totalPrice} />
                </p>
                <p style={{fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)'}}>
                  {order.fulfillmentStatus}
                </p>
              </div>
            </div>
            {order.statusPageUrl && (
              <a
                href={order.statusPageUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem',
                  display: 'inline-block',
                }}
              >
                View status page
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
}
