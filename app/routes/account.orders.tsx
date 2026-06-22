import {useLoaderData, Link, useFetcher} from 'react-router';
import type {LoaderFunctionArgs, ActionFunctionArgs} from 'react-router';
import {Money, getPaginationVariables} from '@shopify/hydrogen';
import {CUSTOMER_ORDERS_QUERY} from '~/graphql/customer-account/CustomerOrdersQuery';

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

export async function loader({context, request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const view = url.searchParams.get('view') ?? 'active';
  const paginationVariables = getPaginationVariables(request, {pageBy: 20});

  const [{data: ordersData}, {data: metaData}] = await Promise.all([
    context.customerAccount.query(CUSTOMER_ORDERS_QUERY, {
      variables: {...paginationVariables},
    }),
    context.customerAccount.query(ARCHIVED_METAFIELD_QUERY),
  ]);

  const archivedIds = parseArchivedIds(
    metaData?.customer?.metafield?.value,
  );

  return {orders: ordersData.customer.orders, archivedIds, view};
}

export async function action({context, request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent') as string;
  const orderId = formData.get('orderId') as string;

  const {data: metaData} = await context.customerAccount.query(ARCHIVED_METAFIELD_QUERY);
  const customerId = metaData?.customer?.id as string | undefined;
  const archivedIds = parseArchivedIds(metaData?.customer?.metafield?.value);

  let updatedIds: string[];

  if (intent === 'archive') {
    updatedIds = archivedIds.includes(orderId) ? archivedIds : [...archivedIds, orderId];
  } else if (intent === 'unarchive') {
    updatedIds = archivedIds.filter((id) => id !== orderId);
  } else {
    return {error: 'Unknown intent'};
  }

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

  if (errors?.length) {
    return {error: errors[0].message};
  }

  if (data?.metafieldsSet?.userErrors?.length) {
    return {error: data.metafieldsSet.userErrors[0].message};
  }

  return {success: true, intent};
}

export default function AccountOrders() {
  const {orders, archivedIds, view} = useLoaderData<typeof loader>();
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

      {displayedOrders.length === 0 ? (
        <div style={cardStyle}>
          <p style={{color: 'rgba(255,255,255,0.7)'}}>
            {isArchiveView ? 'No archived orders.' : 'No orders yet.'}
          </p>
        </div>
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

            <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap'}}>
              <Link
                to={`/account/orders/${btoa(order.id)}`}
                style={{fontSize: '0.8rem', color: 'rgba(26,180,215,0.9)', textDecoration: 'none'}}
              >
                View Details
              </Link>
              <fetcher.Form method="post" style={{display: 'inline'}}>
                <input type="hidden" name="intent" value={isArchiveView ? 'unarchive' : 'archive'} />
                <input type="hidden" name="orderId" value={order.id} />
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
                  {isArchiveView ? 'Unarchive' : 'Archive'}
                </button>
              </fetcher.Form>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
