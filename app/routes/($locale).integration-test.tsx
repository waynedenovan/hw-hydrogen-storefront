import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData} from 'react-router';

interface CheckResult {
  name: string;
  status: 'pass' | 'fail' | 'warn';
  detail: string;
}

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {country, language} = storefront.i18n;
  const checks: CheckResult[] = [];

  // 1. Storefront API connectivity
  try {
    const {shop} = await storefront.query(SHOP_QUERY);
    checks.push({
      name: 'Storefront API Connectivity',
      status: shop?.name ? 'pass' : 'fail',
      detail: shop?.name
        ? `Connected to "${shop.name}" (${shop.primaryDomain?.url})`
        : 'Shop query returned null',
    });
  } catch (e: any) {
    checks.push({
      name: 'Storefront API Connectivity',
      status: 'fail',
      detail: `Error: ${e.message}`,
    });
  }

  // 2. Product availability with @inContext
  try {
    const {products} = await storefront.query(PRODUCTS_QUERY, {
      variables: {country, language},
    });
    const product = products?.nodes?.[0];
    if (!product) {
      checks.push({
        name: 'Product Availability',
        status: 'fail',
        detail: 'No products found via Storefront API. Check that products are published to the Headless channel.',
      });
    } else {
      const price = product.selectedOrFirstAvailableVariant?.price;
      const priceAmount = parseFloat(price?.amount ?? '0');

      checks.push({
        name: 'Product Availability',
        status: 'pass',
        detail: `Found "${product.title}" (handle: ${product.handle})`,
      });

      // 3. Market pricing check
      checks.push({
        name: `Market Pricing (@inContext country=${country})`,
        status: priceAmount > 0 ? 'pass' : 'fail',
        detail: priceAmount > 0
          ? `Price: ${price!.amount} ${price!.currencyCode}`
          : `Price is ${price?.amount ?? 'null'} ${price?.currencyCode ?? ''} - ZA market is likely in DRAFT status. Activate it in Admin > Catalogs.`,
      });

      // 4. Inventory permissions
      const qty = product.selectedOrFirstAvailableVariant?.quantityAvailable;
      checks.push({
        name: 'Inventory Permissions',
        status: qty != null ? 'pass' : 'warn',
        detail: qty != null
          ? `quantityAvailable: ${qty}`
          : 'quantityAvailable is null. Enable "Read inventory of assigned locations" in Admin > Settings > Apps > Headless > Storefront API permissions.',
      });
    }
  } catch (e: any) {
    checks.push({
      name: 'Product Availability',
      status: 'fail',
      detail: `Error: ${e.message}`,
    });
  }

  // 5. Collection availability
  try {
    const data = await storefront.query(COLLECTION_QUERY);
    const allCollection = data.collection;
    const collections = data.collections?.nodes ?? [];

    checks.push({
      name: 'Collection "all" Handle',
      status: allCollection ? 'pass' : 'warn',
      detail: allCollection
        ? `"all" collection exists (id: ${allCollection.id})`
        : '"all" collection not found via Storefront API (this is normal - the route uses a fallback query for /collections/all)',
    });

    checks.push({
      name: 'Collections Available',
      status: collections.length > 0 ? 'pass' : 'fail',
      detail: collections.length > 0
        ? `${collections.length} collections found: ${collections.map((c: any) => c.handle).join(', ')}`
        : 'No collections found. Check that collections are published to the Headless channel.',
    });
  } catch (e: any) {
    checks.push({
      name: 'Collection Availability',
      status: 'fail',
      detail: `Error: ${e.message}`,
    });
  }

  // 6. Cart handler check
  try {
    const cartData = await context.cart.get();
    if (cartData) {
      const buyerCountry = cartData.buyerIdentity?.countryCode;
      const totalAmount = cartData.cost?.totalAmount;
      checks.push({
        name: 'Cart State',
        status: buyerCountry === country ? 'pass' : 'warn',
        detail: buyerCountry === country
          ? `Cart exists, buyerIdentity.countryCode=${buyerCountry}, total=${totalAmount?.amount ?? '0'} ${totalAmount?.currencyCode ?? ''}, items=${cartData.totalQuantity ?? 0}`
          : `Cart exists but buyerIdentity.countryCode=${buyerCountry ?? 'none'} (expected ${country}). Reconciliation should fix this on next page load.`,
      });
    } else {
      checks.push({
        name: 'Cart State',
        status: 'pass',
        detail: 'No active cart (normal for new sessions). Cart will be created on first add-to-cart.',
      });
    }
  } catch (e: any) {
    checks.push({
      name: 'Cart State',
      status: 'fail',
      detail: `Error: ${e.message}`,
    });
  }

  return {
    checks,
    context: {country, language},
    timestamp: new Date().toISOString(),
  };
}

export default function IntegrationTest() {
  const {checks, context, timestamp} = useLoaderData<typeof loader>();

  const passCount = checks.filter((c) => c.status === 'pass').length;
  const failCount = checks.filter((c) => c.status === 'fail').length;
  const warnCount = checks.filter((c) => c.status === 'warn').length;

  return (
    <div style={{padding: '2rem', color: 'white', maxWidth: '900px', margin: '0 auto'}}>
      <h1 style={{marginBottom: '0.5rem'}}>Integration Test Dashboard</h1>
      <p style={{color: '#aaa', marginBottom: '1.5rem'}}>
        Context: country={context.country}, language={context.language} | {timestamp}
      </p>

      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
      }}>
        <StatusBadge label="Pass" count={passCount} color="lime" />
        <StatusBadge label="Fail" count={failCount} color="red" />
        <StatusBadge label="Warn" count={warnCount} color="orange" />
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        {checks.map((check, i) => (
          <CheckRow key={i} check={check} />
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '8px',
        fontSize: '0.85rem',
        color: '#aaa',
      }}>
        <h3 style={{marginBottom: '0.5rem', color: 'white'}}>Manual Actions Checklist</h3>
        <ul style={{paddingLeft: '1.2rem'}}>
          <li>Activate ZA market: Admin app &gt; Catalogs &gt; click "Activate" next to South Africa</li>
          <li>Enable inventory permission: Settings &gt; Apps &gt; Headless &gt; Storefront API permissions &gt; "Read inventory of assigned locations"</li>
          <li>Clear browser cookies for the storefront domain to eliminate stale cart sessions</li>
        </ul>
      </div>
    </div>
  );
}

function StatusBadge({label, count, color}: {label: string; count: number; color: string}) {
  return (
    <div style={{
      padding: '0.5rem 1rem',
      background: `rgba(${color === 'lime' ? '0,255,0' : color === 'red' ? '255,0,0' : '255,165,0'},0.15)`,
      borderRadius: '8px',
      fontWeight: 'bold',
      color,
    }}>
      {count} {label}
    </div>
  );
}

function CheckRow({check}: {check: CheckResult}) {
  const statusIcon = check.status === 'pass' ? '✅' : check.status === 'fail' ? '❌' : '⚠️';
  const bgColor = check.status === 'pass'
    ? 'rgba(0,255,0,0.08)'
    : check.status === 'fail'
      ? 'rgba(255,0,0,0.08)'
      : 'rgba(255,165,0,0.08)';

  return (
    <div style={{
      padding: '0.75rem 1rem',
      background: bgColor,
      borderRadius: '8px',
      borderLeft: `3px solid ${check.status === 'pass' ? 'lime' : check.status === 'fail' ? 'red' : 'orange'}`,
    }}>
      <div style={{fontWeight: 'bold', marginBottom: '0.25rem'}}>
        {statusIcon} {check.name}
      </div>
      <div style={{fontSize: '0.85rem', color: '#ccc'}}>
        {check.detail}
      </div>
    </div>
  );
}

const SHOP_QUERY = `#graphql
  query IntegrationShop {
    shop {
      name
      primaryDomain {
        url
      }
    }
  }
` as const;

const PRODUCTS_QUERY = `#graphql
  query IntegrationProducts(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 1) {
      nodes {
        id
        title
        handle
        availableForSale
        selectedOrFirstAvailableVariant {
          id
          availableForSale
          quantityAvailable
          price {
            amount
            currencyCode
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
` as const;

const COLLECTION_QUERY = `#graphql
  query IntegrationCollection(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: "all") {
      id
      title
    }
    collections(first: 3) {
      nodes {
        id
        title
        handle
      }
    }
  }
` as const;

