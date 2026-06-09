import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData} from 'react-router';

export async function loader({request, context}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const handle = url.searchParams.get('handle');

  if (!handle) {
    return {error: 'Pass ?handle=product-handle to test availability', results: null};
  }

  const {storefront} = context;

  const withContext = await storefront.query(DEBUG_QUERY_WITH_CONTEXT, {
    variables: {handle},
  });

  const withoutContext = await storefront.query(DEBUG_QUERY_WITHOUT_CONTEXT, {
    variables: {handle},
  });

  return {
    error: null,
    results: {
      handle,
      withContext: withContext.product,
      withoutContext: withoutContext.product,
    },
  };
}

export default function DebugAvailability() {
  const {error, results} = useLoaderData<typeof loader>();

  if (error) {
    return (
      <div style={{padding: '2rem', color: 'white'}}>
        <h1>Debug Product Availability</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!results) return null;

  const {handle, withContext, withoutContext} = results;

  return (
    <div style={{padding: '2rem', color: 'white', maxWidth: '900px', margin: '0 auto'}}>
      <h1 style={{marginBottom: '1rem'}}>Debug: {handle}</h1>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>
        <Section
          title="WITH @inContext (ZA)"
          product={withContext}
        />
        <Section
          title="WITHOUT @inContext"
          product={withoutContext}
        />
      </div>

      <div style={{marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,0,0.1)', borderRadius: '8px'}}>
        <h3>Diagnosis</h3>
        {withContext && withoutContext ? (
          <ul>
            <li>
              With ZA context: availableForSale ={' '}
              <strong style={{color: withContext.availableForSale ? 'lime' : 'red'}}>
                {String(withContext.availableForSale)}
              </strong>
            </li>
            <li>
              Without context: availableForSale ={' '}
              <strong style={{color: withoutContext.availableForSale ? 'lime' : 'red'}}>
                {String(withoutContext.availableForSale)}
              </strong>
            </li>
            {withContext.availableForSale !== withoutContext.availableForSale && (
              <li style={{color: 'orange', fontWeight: 'bold'}}>
                Discrepancy detected — the ZA market context is affecting availability.
                Check if the ZA market is in DRAFT status.
              </li>
            )}
            {!withContext.availableForSale && !withoutContext.availableForSale && (
              <li style={{color: 'red'}}>
                Product is unavailable in both contexts — issue is not market-specific.
                Check inventory tracking and publication status in admin.
              </li>
            )}
            {withContext.availableForSale && withoutContext.availableForSale && (
              <li style={{color: 'lime'}}>
                Product is available in both contexts — no issue detected.
              </li>
            )}
          </ul>
        ) : (
          <p>One or both queries returned null — product may not exist or not be published.</p>
        )}
      </div>
    </div>
  );
}

function Section({title, product}: {title: string; product: any}) {
  if (!product) {
    return (
      <div style={{background: 'rgba(50,50,50,0.6)', padding: '1rem', borderRadius: '8px'}}>
        <h2>{title}</h2>
        <p style={{color: 'red'}}>Product not found (null)</p>
      </div>
    );
  }

  const variant = product.selectedOrFirstAvailableVariant;

  return (
    <div style={{background: 'rgba(50,50,50,0.6)', padding: '1rem', borderRadius: '8px'}}>
      <h2 style={{marginBottom: '0.5rem'}}>{title}</h2>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <tbody>
          <Row label="Title" value={product.title} />
          <Row label="Product availableForSale" value={String(product.availableForSale)} color={product.availableForSale ? 'lime' : 'red'} />
          <Row label="Variant availableForSale" value={String(variant?.availableForSale)} color={variant?.availableForSale ? 'lime' : 'red'} />
          <Row label="Variant quantityAvailable" value={String(variant?.quantityAvailable ?? 'N/A')} />
          <Row label="Price" value={variant ? `${variant.price.amount} ${variant.price.currencyCode}` : 'N/A'} />
        </tbody>
      </table>
      {product.variants?.nodes?.length > 0 && (
        <>
          <h3 style={{marginTop: '1rem'}}>All Variants</h3>
          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem'}}>
            <thead>
              <tr>
                <th style={{textAlign: 'left', padding: '4px'}}>Title</th>
                <th style={{textAlign: 'left', padding: '4px'}}>Available</th>
                <th style={{textAlign: 'left', padding: '4px'}}>Qty</th>
                <th style={{textAlign: 'left', padding: '4px'}}>Price</th>
              </tr>
            </thead>
            <tbody>
              {product.variants.nodes.map((v: any) => (
                <tr key={v.id}>
                  <td style={{padding: '4px'}}>{v.title}</td>
                  <td style={{padding: '4px', color: v.availableForSale ? 'lime' : 'red'}}>{String(v.availableForSale)}</td>
                  <td style={{padding: '4px'}}>{v.quantityAvailable ?? 'N/A'}</td>
                  <td style={{padding: '4px'}}>{v.price.amount} {v.price.currencyCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

function Row({label, value, color}: {label: string; value: string; color?: string}) {
  return (
    <tr>
      <td style={{padding: '4px', fontWeight: 'bold'}}>{label}</td>
      <td style={{padding: '4px', color: color || 'white'}}>{value}</td>
    </tr>
  );
}

const DEBUG_QUERY_WITH_CONTEXT = `#graphql
  query DebugProductWithContext(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      availableForSale
      selectedOrFirstAvailableVariant {
        id
        availableForSale
        quantityAvailable
        price { amount currencyCode }
      }
      variants(first: 5) {
        nodes {
          id
          title
          availableForSale
          quantityAvailable
          price { amount currencyCode }
        }
      }
    }
  }
` as const;

const DEBUG_QUERY_WITHOUT_CONTEXT = `#graphql
  query DebugProductWithoutContext($handle: String!) {
    product(handle: $handle) {
      id
      title
      availableForSale
      selectedOrFirstAvailableVariant {
        id
        availableForSale
        quantityAvailable
        price { amount currencyCode }
      }
      variants(first: 5) {
        nodes {
          id
          title
          availableForSale
          quantityAvailable
          price { amount currencyCode }
        }
      }
    }
  }
` as const;
