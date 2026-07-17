import {useLoaderData, useFetcher} from 'react-router';
import type {LoaderFunctionArgs, ActionFunctionArgs} from 'react-router';
import {ProductCard} from '~/components/ProductCard';

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

type WishlistApiItem = {
  shopifyProductId: string;
  productHandle: string;
  productTitle?: string | null;
  createdAt: string;
};

async function fetchWishlist(
  storefrontUiUrl: string,
  internalSecret: string,
  customerId: string,
): Promise<WishlistApiItem[]> {
  try {
    const res = await fetch(
      `${storefrontUiUrl}/api/wishlist?customerId=${encodeURIComponent(customerId)}`,
      {headers: {'X-Internal-Secret': internalSecret}},
    );
    if (!res.ok) return [];
    const data = (await res.json()) as {items?: WishlistApiItem[]};
    return data.items ?? [];
  } catch {
    return [];
  }
}

export async function loader({context}: LoaderFunctionArgs) {
  const env = context.env as any;
  const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
  const internalSecret: string = env.INTERNAL_API_SECRET ?? '';

  const {data: idData} = await context.customerAccount.query(CUSTOMER_ID_QUERY);
  const customerId: string = (idData as any)?.customer?.id ?? '';

  const items = storefrontUiUrl && customerId
    ? await fetchWishlist(storefrontUiUrl, internalSecret, customerId)
    : [];

  let products: any[] = [];
  if (items.length > 0) {
    const {nodes} = await context.storefront.query(WISHLIST_PRODUCTS_QUERY, {
      variables: {
        ids: items.map((i) => i.shopifyProductId),
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
      cache: context.storefront.CacheNone(),
    });
    // A wishlisted product can since have been deleted/unpublished — nodes()
    // returns null for those; keep the raw item so it can still be removed.
    products = (nodes ?? []).filter(Boolean);
  }

  return {items, products, configured: Boolean(storefrontUiUrl)};
}

export async function action({context, request}: ActionFunctionArgs) {
  const env = context.env as any;
  const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
  const internalSecret: string = env.INTERNAL_API_SECRET ?? '';

  const loggedIn = await context.customerAccount.isLoggedIn();
  if (!loggedIn) {
    return {requiresLogin: true};
  }

  if (!storefrontUiUrl) {
    return {error: 'Wish List service is not configured.'};
  }

  const formData = await request.formData();
  const intent = (formData.get('intent') as string) || 'add';
  const productId = formData.get('productId') as string;
  const productHandle = (formData.get('productHandle') as string) || '';
  const productTitle = (formData.get('productTitle') as string) || '';

  if (!productId) return {error: 'Missing product.'};

  const {data: idData} = await context.customerAccount.query(CUSTOMER_ID_QUERY);
  const customerId: string = (idData as any)?.customer?.id ?? '';
  const customerEmail: string =
    (idData as any)?.customer?.emailAddress?.emailAddress ?? '';

  try {
    const res = await fetch(`${storefrontUiUrl}/api/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Secret': internalSecret,
      },
      body: JSON.stringify({
        intent,
        customerId,
        customerEmail,
        productId,
        productHandle,
        productTitle,
      }),
    });
    if (!res.ok) {
      const data = (await res.json()) as {error?: string};
      return {error: data.error ?? 'Failed to update Wish List.'};
    }
    return {success: true, intent, productId};
  } catch {
    return {error: 'Could not reach the Wish List service. Please try again.'};
  }
}

export default function AccountWishlist() {
  const {items, products, configured} = useLoaderData<typeof loader>();
  const fetcher = useFetcher<{success?: boolean; error?: string}>();

  const productById = new Map(products.map((p) => [p.id, p]));
  // Items whose product no longer resolves on the Storefront API (deleted or
  // unpublished) still need a row so the customer can remove them.
  const orphanItems = items.filter((i) => !productById.has(i.shopifyProductId));

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h2 style={{fontSize: '1.25rem', margin: 0}}>Wish List</h2>
      </div>
      <p style={{color: '#ccc', marginBottom: '1rem'}}>
        Products you save here are watched for you — we can let you know when
        stock becomes available or a special is running.
      </p>

      {!configured && (
        <p style={{color: '#f88'}}>Wish List service is not configured.</p>
      )}

      {fetcher.data?.error && (
        <p style={{color: '#f88'}}>{fetcher.data.error}</p>
      )}

      {items.length === 0 ? (
        <div
          style={{
            background: 'rgba(50, 50, 50, 0.85)',
            borderRadius: '6px',
            padding: '1.25rem',
          }}
        >
          Your Wish List is empty. Use the ♡ button on any product to add it.
        </div>
      ) : (
        <div className="products-grid wishlist-grid">
          {items.map((item) => {
            const product = productById.get(item.shopifyProductId);
            if (!product) return null;
            return (
              <div key={item.shopifyProductId} className="wishlist-item">
                <ProductCard product={product} />
                <RemoveButton item={item} />
              </div>
            );
          })}
        </div>
      )}

      {orphanItems.length > 0 && (
        <div style={{marginTop: '1.5rem'}}>
          <h3 style={{fontSize: '1rem'}}>No longer available</h3>
          {orphanItems.map((item) => (
            <div
              key={item.shopifyProductId}
              style={{
                background: 'rgba(50, 50, 50, 0.85)',
                borderRadius: '6px',
                padding: '0.75rem 1rem',
                marginTop: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <span>{item.productTitle || item.productHandle}</span>
              <RemoveButton item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RemoveButton({item}: {item: WishlistApiItem}) {
  const fetcher = useFetcher();
  const removing = fetcher.state !== 'idle';
  return (
    <fetcher.Form method="post" action="/account/wishlist">
      <input type="hidden" name="intent" value="remove" />
      <input type="hidden" name="productId" value={item.shopifyProductId} />
      <button type="submit" disabled={removing} className="wishlist-remove-btn">
        {removing ? 'Removing…' : 'Remove'}
      </button>
    </fetcher.Form>
  );
}

const WISHLIST_PRODUCTS_QUERY = `#graphql
  query WishlistProducts(
    $ids: [ID!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        productType
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        brand: metafield(namespace: "custom", key: "brand") {
          value
        }
        msq: metafield(namespace: "custom", key: "msq") {
          value
        }
        supplierName: metafield(namespace: "custom", key: "supplier_name") {
          value
        }
        externalProductId: metafield(namespace: "custom", key: "external_product_id") {
          value
        }
        variants(first: 1) {
          nodes {
            id
            availableForSale
          }
        }
      }
    }
  }
` as const;
