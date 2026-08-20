import {useLoaderData, Link, useFetcher} from 'react-router';
import type {LoaderFunctionArgs, ActionFunctionArgs} from 'react-router';
import {Money, getPaginationVariables} from '@shopify/hydrogen';
import {CUSTOMER_ORDERS_QUERY} from '~/graphql/customer-account/CustomerOrdersQuery';

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

type PendingEftOrder = {
  draftOrderName: string;
  totalPrice: number;
  currency: string;
  createdAt: string;
};

async function fetchPendingEftOrders(
  storefrontUiUrl: string,
  internalSecret: string,
  customerEmail: string,
): Promise<PendingEftOrder[]> {
  if (!customerEmail) return [];
  try {
    const res = await fetch(
      `${storefrontUiUrl}/api/orders/eft-pending?email=${encodeURIComponent(customerEmail)}`,
      {headers: {'X-Internal-Secret': internalSecret}},
    );
    if (!res.ok) return [];
    const data = (await res.json()) as {orders?: PendingEftOrder[]};
    return data.orders ?? [];
  } catch {
    return [];
  }
}

export async function loader({context, request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const view = url.searchParams.get('view') ?? 'active';
  const paginationVariables = getPaginationVariables(request, {pageBy: 20});

  const env = context.env as any;
  const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
  const internalSecret: string = env.INTERNAL_API_SECRET ?? '';

  const [{data: ordersData}, {data: idData}] = await Promise.all([
    context.customerAccount.query(CUSTOMER_ORDERS_QUERY, {
      variables: {...paginationVariables},
    }),
    context.customerAccount.query(CUSTOMER_ID_QUERY),
  ]);

  const customerId: string = (idData as any)?.customer?.id ?? '';
  const customerEmail: string = (idData as any)?.customer?.emailAddress?.emailAddress ?? '';
  const [archivedIds, pendingEftOrders] = storefrontUiUrl
    ? await Promise.all([
        fetchArchivedIds(storefrontUiUrl, internalSecret, customerId),
        fetchPendingEftOrders(storefrontUiUrl, internalSecret, customerEmail),
      ])
    : [[], []];

  return {
    orders: ordersData.customer.orders,
    archivedIds,
    pendingEftOrders,
    view,
    customerId,
    customerEmail,
  };
}

export async function action({context, request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent') as string;
  const orderId = formData.get('orderId') as string;
  const customerId = formData.get('customerId') as string;

  const env = context.env as any;
  const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
  const internalSecret: string = env.INTERNAL_API_SECRET ?? '';

  if (intent === 'archive') {
    if (!storefrontUiUrl) {
      return {error: 'Archive service is not configured.'};
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
        return {error: data.error ?? 'Failed to archive order.'};
      }

      return {success: true, intent};
    } catch {
      return {error: 'Could not reach archive service. Please try again.'};
    }
  }

  return {error: 'Unknown intent'};
}

export default function AccountOrders() {
  const {orders, archivedIds, pendingEftOrders, view, customerId} = useLoaderData<typeof loader>();
  const fetcher = useFetcher<{success?: boolean; error?: string; intent?: string}>();

  const isArchiveView = view === 'archived';

  const cardStyle = {
    background: 'rgba(50, 50, 50, 0.85)',
    borderRadius: '6px',
    padding: '1.25rem',
    marginBottom: '0.75rem',
  };

  const allOrders = orders.nodes;
  const displayedOrders = isArchiveView
    ? allOrders.filter((o) => archivedIds.includes(o.id))
    : allOrders.filter((o) => !archivedIds.includes(o.id));

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
        <h2 style={{fontSize: '1.25rem', margin: 0}}>
          Order History
          {isArchiveView && <span style={{fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', fontWeight: 400, marginLeft: '0.5rem'}}>— Archived</span>}
        </h2>
        {isArchiveView ? (
          <Link to="/account/orders" style={{fontSize: '0.875rem', color: 'rgba(26,180,215,0.9)'}}>
            ← Active Orders
          </Link>
        ) : (
          <Link to="?view=archived" style={{fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)'}}>
            View Archived
          </Link>
        )}
      </div>

      {fetcher.data?.error && (
        <p style={{color: '#fc8181', marginBottom: '1rem', fontSize: '0.875rem'}}>{fetcher.data.error}</p>
      )}

      {!isArchiveView && pendingEftOrders.length > 0 && (
        <div style={{marginBottom: '1.5rem'}}>
          <h3 style={{fontSize: '1rem', margin: '0 0 0.5rem', color: 'rgba(255,255,255,0.7)'}}>
            Awaiting EFT Payment
          </h3>
          {pendingEftOrders.map((order) => (
            <div key={order.draftOrderName} style={{...cardStyle, border: '1px solid rgba(255,255,255,0.15)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem'}}>
                <div>
                  <p style={{fontWeight: 'bold'}}>Order {order.draftOrderName}</p>
                  <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem'}}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div style={{textAlign: 'right'}}>
                  <p>
                    {order.currency} {order.totalPrice.toFixed(2)}
                  </p>
                  <p style={{fontSize: '0.875rem', color: '#f6ad55'}}>Awaiting payment</p>
                </div>
              </div>
              <p style={{fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.75rem'}}>
                Use <strong>{order.draftOrderName}</strong> as your EFT payment reference. This order
                will be processed once payment reflects in our bank account.
              </p>
            </div>
          ))}
        </div>
      )}

      {displayedOrders.length === 0 ? (
        (isArchiveView || pendingEftOrders.length === 0) && (
          <div style={cardStyle}>
            <p style={{color: 'rgba(255,255,255,0.7)'}}>
              {isArchiveView ? 'No archived orders.' : 'No orders yet.'}
            </p>
          </div>
        )
      ) : (
        displayedOrders.map((order) => (
          <div key={order.id} style={cardStyle}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem'}}>
              <div>
                <p style={{fontWeight: 'bold'}}>
                  <Link
                    to={`/account/orders/${btoa(order.id)}`}
                    style={{color: 'white', textDecoration: 'none'}}
                  >
                    Order #{order.number}
                  </Link>
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
                <p><Money data={order.totalPrice} /></p>
                <p style={{fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)'}}>
                  {order.fulfillmentStatus}
                </p>
              </div>
            </div>

            <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap', alignItems: 'center'}}>
              <Link
                to={`/account/orders/${btoa(order.id)}`}
                style={{fontSize: '0.8rem', color: 'rgba(26,180,215,0.9)', textDecoration: 'none'}}
              >
                View Details
              </Link>
              {!isArchiveView && (
                <fetcher.Form method="post" style={{display: 'inline'}}>
                  <input type="hidden" name="intent" value="archive" />
                  <input type="hidden" name="orderId" value={order.id} />
                  <input type="hidden" name="customerId" value={customerId} />
                  <button
                    type="submit"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    Archive
                  </button>
                </fetcher.Form>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
