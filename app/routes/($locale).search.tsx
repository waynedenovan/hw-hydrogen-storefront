import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, Link} from 'react-router';
import {SearchFormPredictive} from '~/components/SearchFormPredictive';
import {ProductCard} from '~/components/ProductCard';
import {CollectionCard} from '~/components/CollectionCard';
import {
  getEmptyPredictiveSearchResult,
  type PredictiveSearchReturn,
  type RegularSearchReturn,
  type SearchCollectionResult,
  type SearchProductResult,
} from '~/lib/search';

// Search runs entirely server-side (task 2607191820): the loader hands the term
// to the weighted engine in app/lib/searchIndex.server.ts, which scores the
// whole catalog (collections, sub/sub-cat collections, product names, detailed
// product info, brands) and returns best-match-first results. The same loader
// also answers the header search aside's predictive fetcher requests
// (?predictive=true&limit=N) — previously those returned an incompatible shape,
// which is why the header Search icon never showed results.
export async function loader({
  request,
  context,
}: LoaderFunctionArgs): Promise<PredictiveSearchReturn | RegularSearchReturn> {
  const url = new URL(request.url);
  const term = String(url.searchParams.get('q') || '').trim();
  const isPredictive = url.searchParams.has('predictive');
  const limit = Math.max(1, Math.min(10, Number(url.searchParams.get('limit')) || 5));

  // Server-only engine — dynamic import per ERR-IMPORT-001 (a static import of a
  // .server module from a route with client components breaks the client bundle).
  const engine = await import('~/lib/searchIndex.server');

  if (isPredictive) {
    if (!term) {
      return {
        type: 'predictive',
        term,
        result: getEmptyPredictiveSearchResult(),
      };
    }
    const results = await engine.searchCatalog(context.storefront, term);
    return engine.toPredictiveResult(term, results, limit);
  }

  if (!term) {
    return {
      type: 'regular',
      term,
      result: {
        total: 0,
        items: {products: [], mainCollections: [], subCollections: [], brands: []},
      },
    };
  }
  const results = await engine.searchCatalog(context.storefront, term);
  return engine.toRegularResult(term, results);
}

// CollectionCard expects the metafield shape ({value}) the collection routes
// query; the search engine returns display names as plain strings.
function toCardCollection(collectionResult: SearchCollectionResult) {
  return {
    id: collectionResult.id,
    title: collectionResult.title,
    handle: collectionResult.handle,
    image: collectionResult.image
      ? {
          url: collectionResult.image.url,
          altText: collectionResult.image.altText,
          width: collectionResult.image.width ?? undefined,
          height: collectionResult.image.height ?? undefined,
        }
      : null,
    displayName: collectionResult.displayName
      ? {value: collectionResult.displayName}
      : null,
  };
}

// ProductCard types its optional fields as undefined; GraphQL returns nulls.
function toCardProduct(productResult: SearchProductResult) {
  return {
    ...productResult,
    productType: productResult.productType ?? undefined,
    featuredImage: productResult.featuredImage
      ? {
          url: productResult.featuredImage.url,
          altText: productResult.featuredImage.altText,
          width: productResult.featuredImage.width ?? undefined,
          height: productResult.featuredImage.height ?? undefined,
        }
      : null,
  };
}

export default function Search() {
  const data = useLoaderData<typeof loader>();
  if (data.type !== 'regular') return null;
  const {term, result} = data;
  const {products, mainCollections, subCollections, brands} = result.items;

  return (
    <div className="page-card page-card--wide search">
      <h1>Search</h1>
      <SearchFormPredictive>
        {({fetchResults, goToSearch, inputRef}) => (
          <div className="search-page-form">
            <input
              name="q"
              defaultValue={term}
              onChange={fetchResults}
              onFocus={fetchResults}
              placeholder="Search products, collections, brands..."
              ref={inputRef}
              type="search"
            />
            <button onClick={goToSearch}>Search</button>
          </div>
        )}
      </SearchFormPredictive>

      {term && !result.total ? (
        <p className="text-gray-300">
          No results found for <q>{term}</q>
        </p>
      ) : null}

      {mainCollections.length ? (
        <section className="search-section">
          <h2>Collections</h2>
          <div className="collections-grid">
            {mainCollections.map((c) => (
              <CollectionCard key={c.id} collection={toCardCollection(c)} headingLevel="h2" />
            ))}
          </div>
        </section>
      ) : null}

      {subCollections.length ? (
        <section className="search-section">
          <h2>Sub Collections</h2>
          <div className="collections-grid">
            {subCollections.map((c) => (
              <CollectionCard key={c.id} collection={toCardCollection(c)} headingLevel="h3" />
            ))}
          </div>
        </section>
      ) : null}

      {brands.length ? (
        <section className="search-section">
          <h2>Brands</h2>
          <div className="search-brand-list">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                className="search-brand-chip"
                to={`/search?q=${encodeURIComponent(brand.name)}`}
              >
                {brand.name}
                <span className="search-brand-count">{brand.productCount}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {products.length ? (
        <section className="search-section">
          <h2>Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={toCardProduct(product)} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
