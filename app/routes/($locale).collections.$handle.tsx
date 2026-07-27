import {useState} from 'react';
import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, useSearchParams, Link} from 'react-router';
import {ProductCard} from '~/components/ProductCard';
import {CollectionCard} from '~/components/CollectionCard';
import {ScrollToTopButton} from '~/components/ScrollToTopButton';
import {fetchAllCollections} from '~/lib/collections';

// Collection-wide product count for this store is small (~180) — fetching everything
// in one request and grouping/filtering here is simpler and more maintainable than
// Shopify's native collection filter API, which would additionally require pinning
// subCollection/subCatCollection as storefront-filterable metafield definitions plus
// the Search & Discovery app. Revisit only if the catalog grows into the thousands.
const MAX_PRODUCTS = 250;

export async function loader(args: LoaderFunctionArgs) {
  const {params, context} = args;
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Response('Collection handle is required', {status: 400});
  }

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, first: MAX_PRODUCTS},
  });

  if (!collection && handle === 'all') {
    const {products} = await storefront.query(ALL_PRODUCTS_QUERY, {
      variables: {first: MAX_PRODUCTS},
    });
    return {
      collection: {
        id: 'all',
        title: 'All Products',
        handle: 'all',
        description: '',
        products,
      },
      subCollections: null,
      breadcrumb: [],
    };
  }

  if (!collection) {
    throw new Response('Collection not found', {status: 404});
  }

  // Every collection tier (Main -> Sub -> Sub-Cat, task 2607271000) is checked
  // for children the same way, generically — a page shows its children as
  // tiles when any exist (spec 2607171535, extended one tier deeper) and falls
  // back to the product grid only for a genuine leaf. A child's assignment
  // lives in its custom.parent_collection metafield (its parent's TITLE),
  // written by the admin app's Collections page. Tiles sort and label by the
  // child's cleaned display name ("BINDING", task 2607191357) — the coded
  // title ("AC BINDING") stays the identity key/handle source. This one fetch
  // also supplies the breadcrumb's ancestor-title-to-handle lookups below, so
  // it always runs (not just for role === 'main' as before) rather than
  // duplicating a second all-collections round trip just for that.
  const allNodes = await fetchAllCollections<any>(storefront, CHILD_COLLECTIONS_QUERY);
  const byNormTitle = new Map(allNodes.map((c) => [c.title.trim().toLowerCase(), c]));

  const wanted = collection.title.trim().toLowerCase();
  const subCollections = allNodes
    .filter((c) => (c.parent?.value || '').trim().toLowerCase() === wanted)
    .sort((a, b) => getDisplayName(a).localeCompare(getDisplayName(b), undefined, {numeric: true}));

  const breadcrumb = buildBreadcrumb(collection, byNormTitle);

  if (subCollections.length > 0) {
    return {collection, subCollections, breadcrumb};
  }

  return {collection, subCollections: null, breadcrumb};
}

// Walks the parent_collection metafield chain up to the root, using the
// all-collections snapshot the loader already fetched (byNormTitle) to
// resolve each ancestor's own handle for the link — no extra network round
// trips. Capped at 5 hops as a belt-and-braces guard against a future data
// error creating a parent cycle (today's real hierarchy is exactly 3 deep:
// Main -> Sub -> Sub-Cat, so a Main's own trail is always empty and a
// Sub-Cat's is always [Main, Sub]).
function buildBreadcrumb(collection: any, byNormTitle: Map<string, any>) {
  const trail: {title: string; handle: string}[] = [];
  let parentTitle = (collection.parent?.value || '').trim();
  let hops = 0;
  while (parentTitle && hops < 5) {
    const node = byNormTitle.get(parentTitle.toLowerCase());
    if (!node) break;
    trail.unshift({title: getDisplayName(node), handle: node.handle});
    parentTitle = (node.parent?.value || '').trim();
    hops++;
  }
  return trail;
}

// Cleaned display name for a collection (custom.display_name, written by the
// admin app for imported Sub Collections) — falls back to the title for main
// collections and anything imported before the naming change.
function getDisplayName(collection: any) {
  return collection.displayName?.value || collection.title;
}

function getSubCollection(product: any) {
  return product.subCollection?.value || 'Other';
}

function getSubCatCollection(product: any) {
  return product.subCatCollection?.value || 'Other';
}

function getBrand(product: any) {
  return product.vendor || '';
}

function getPrice(product: any) {
  return Number(product.priceRange?.minVariantPrice?.amount) || 0;
}

function uniqueSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, undefined, {numeric: true}),
  );
}

function FilterCheckboxGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: Set<string>;
  onToggle: (value: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <div className="filter-group">
      <h4 className="font-semibold text-sm mb-1">{title}</h4>
      <div className="filter-group-options">
        {options.map((option) => (
          <label key={option} className="filter-option">
            <input
              type="checkbox"
              checked={selected.has(option)}
              onChange={() => onToggle(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function Collection() {
  const {collection, subCollections, breadcrumb} = useLoaderData<typeof loader>();

  // Main/Sub Collection → grid of its assigned child tiles (Sub or Sub-Cat,
  // task 2607271000). Rendered by a separate component from the product view
  // so the hook count stays stable when navigating between tiers (the route
  // component instance is reused across $handle param changes).
  if (subCollections) {
    return (
      <SubCollectionsView collection={collection} subCollections={subCollections} breadcrumb={breadcrumb} />
    );
  }

  return <CollectionProductsView collection={collection} breadcrumb={breadcrumb} />;
}

// Trail of ancestor tiers above the current page (Main, and Main > Sub for a
// Sub-Cat page) — empty for a Main, which has no parent. Plain text/links
// styled to match the existing dark-card look; no new page chrome.
function Breadcrumb({trail}: {trail: {title: string; handle: string}[]}) {
  if (trail.length === 0) return null;
  return (
    <nav className="collection-breadcrumb text-sm text-gray-300 mb-2" aria-label="Breadcrumb">
      <Link to="/collections" className="hover:text-white hover:underline">
        Collections
      </Link>
      {trail.map((t) => (
        <span key={t.handle}>
          {' / '}
          <Link to={`/collections/${t.handle}`} className="hover:text-white hover:underline">
            {t.title}
          </Link>
        </span>
      ))}
    </nav>
  );
}

function SubCollectionsView({
  collection,
  subCollections,
  breadcrumb,
}: {
  collection: any;
  subCollections: any[];
  breadcrumb: {title: string; handle: string}[];
}) {
  // A Main's children are Sub Collections (h3, unchanged from before task
  // 2607271000); a Sub's children are Sub-Cat Collections — one heading level
  // deeper (h4) since the page is now 3 tiers deep, not 2.
  const childHeadingLevel = collection.role?.value === 'main' ? 'h3' : 'h4';
  return (
    <div className="page-card page-card--wide">
      <div className="collection max-w-7xl mx-auto px-4 py-8">
        <div className="collection-header">
          <div>
            <Breadcrumb trail={breadcrumb} />
            <h1 className="text-3xl font-bold mb-2 text-white">{getDisplayName(collection)}</h1>
            {collection.description && (
              <p className="collection-description text-gray-300 mb-6">
                {collection.description}
              </p>
            )}
          </div>
        </div>
        {subCollections.length > 0 ? (
          <div className="collections-grid">
            {subCollections.map((sub: any) => (
              <CollectionCard key={sub.id} collection={sub} headingLevel={childHeadingLevel} />
            ))}
          </div>
        ) : (
          <p className="text-gray-300 py-8">
            No Sub Collections have been assigned to this Collection yet.
          </p>
        )}
      </div>
    </div>
  );
}

function CollectionProductsView({collection, breadcrumb}: {collection: any; breadcrumb: {title: string; handle: string}[]}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const allProducts: any[] = collection.products.nodes;

  const selectedBrands = new Set(searchParams.getAll('brand'));
  const selectedSubCollections = new Set(searchParams.getAll('subCollection'));
  const selectedSubCatCollections = new Set(searchParams.getAll('subCatCollection'));
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const brandOptions = uniqueSorted(allProducts.map(getBrand));
  const subCollectionOptions = uniqueSorted(allProducts.map(getSubCollection));
  const subCatCollectionOptions = uniqueSorted(allProducts.map(getSubCatCollection));

  const hasFilters =
    selectedBrands.size > 0 ||
    selectedSubCollections.size > 0 ||
    selectedSubCatCollections.size > 0 ||
    minPrice !== '' ||
    maxPrice !== '';

  function toggleParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    const values = next.getAll(key);
    next.delete(key);
    if (values.includes(value)) {
      for (const v of values) if (v !== value) next.append(key, v);
    } else {
      for (const v of values) next.append(key, v);
      next.append(key, value);
    }
    setSearchParams(next, {preventScrollReset: true});
  }

  function setPrice(key: 'minPrice' | 'maxPrice', value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, {preventScrollReset: true});
  }

  function clearFilters() {
    setSearchParams(new URLSearchParams(), {preventScrollReset: true});
  }

  // One flat grid always (task 2607191357 removed the old collapsible
  // Brand > Sub > Sub-cat tree — the Filters panel covers the same job).
  const filteredProducts = allProducts.filter((product) => {
    if (selectedBrands.size > 0 && !selectedBrands.has(getBrand(product))) return false;
    if (selectedSubCollections.size > 0 && !selectedSubCollections.has(getSubCollection(product))) return false;
    if (selectedSubCatCollections.size > 0 && !selectedSubCatCollections.has(getSubCatCollection(product))) return false;
    const price = getPrice(product);
    if (minPrice !== '' && price < Number(minPrice)) return false;
    if (maxPrice !== '' && price > Number(maxPrice)) return false;
    return true;
  });

  const priceValues = allProducts.map(getPrice);
  const priceFloor = priceValues.length ? Math.floor(Math.min(...priceValues)) : 0;
  const priceCeil = priceValues.length ? Math.ceil(Math.max(...priceValues)) : 0;
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="page-card page-card--wide">
      <ScrollToTopButton />
      <div className="collection max-w-7xl mx-auto px-4 py-8">
        <div className="collection-header">
          <div>
            <Breadcrumb trail={breadcrumb} />
            <h1 className="text-3xl font-bold mb-2 text-white">{getDisplayName(collection)}</h1>
            {collection.description && (
              <p className="collection-description text-gray-300 mb-6">
                {collection.description}
              </p>
            )}
          </div>
        </div>

        {/* Direct child of the grid-ified .collection (not .collection-header, which
            is only a short flex row) so this sticky button's containing block spans
            the whole page section -- otherwise it stops sticking as soon as its
            parent's own (short) height has scrolled by. Placed with grid-row: 1 / -1
            so it overlaps .collection-header/.collection-layout's shared column
            instead of pushing them into their own track. */}
        <button
          type="button"
          className="filter-toggle-btn"
          aria-expanded={filtersOpen}
          aria-controls="collection-filters"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M4 5h16M7 12h10M10 19h4" strokeLinecap="round" />
          </svg>
          Filters
        </button>

        <div className={`collection-layout${filtersOpen ? ' filters-open' : ''}`}>
          {filtersOpen && (
            <aside id="collection-filters" className="collection-filters">
              <div className="filter-group">
                <h4 className="font-semibold text-sm mb-1">Price</h4>
                <div className="filter-price-slider">
                  <input
                    type="range"
                    min={priceFloor}
                    max={priceCeil}
                    value={minPrice === '' ? priceFloor : Number(minPrice)}
                    onChange={(e) =>
                      setPrice('minPrice', Math.min(Number(e.target.value), maxPrice === '' ? priceCeil : Number(maxPrice)).toString())
                    }
                  />
                  <input
                    type="range"
                    min={priceFloor}
                    max={priceCeil}
                    value={maxPrice === '' ? priceCeil : Number(maxPrice)}
                    onChange={(e) =>
                      setPrice('maxPrice', Math.max(Number(e.target.value), minPrice === '' ? priceFloor : Number(minPrice)).toString())
                    }
                  />
                </div>
                <div className="filter-price-range">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setPrice('minPrice', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setPrice('maxPrice', e.target.value)}
                  />
                </div>
              </div>
              <FilterCheckboxGroup
                title="Brand"
                options={brandOptions}
                selected={selectedBrands}
                onToggle={(v) => toggleParam('brand', v)}
              />
              <FilterCheckboxGroup
                title="Sub Collection"
                options={subCollectionOptions}
                selected={selectedSubCollections}
                onToggle={(v) => toggleParam('subCollection', v)}
              />
              <FilterCheckboxGroup
                title="Sub-Cat Collection"
                options={subCatCollectionOptions}
                selected={selectedSubCatCollections}
                onToggle={(v) => toggleParam('subCatCollection', v)}
              />
              {hasFilters && (
                <button type="button" className="filter-clear-btn" onClick={clearFilters}>
                  Clear filters
                </button>
              )}
            </aside>
          )}

          <div className="collection-results">
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-300 py-8">
                {hasFilters
                  ? 'No products match the selected filters.'
                  : 'No products in this collection yet.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const PRODUCT_FIELDS = `#graphql
  fragment CollectionProductFields on Product {
    id
    title
    handle
    productType
    vendor
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
    subCollection: metafield(namespace: "custom", key: "sub_collection") {
      value
    }
    subCatCollection: metafield(namespace: "custom", key: "sub_cat_collection") {
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
    images: metafield(namespace: "custom", key: "images") {
      value
    }
    type: metafield(namespace: "custom", key: "type") {
      value
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
      }
    }
  }
`;

const COLLECTION_QUERY = `#graphql
  query Collection(
    $handle: String!
    $first: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      role: metafield(namespace: "custom", key: "collection_role") {
        value
      }
      displayName: metafield(namespace: "custom", key: "display_name") {
        value
      }
      typeCode: metafield(namespace: "custom", key: "collection_type") {
        value
      }
      parent: metafield(namespace: "custom", key: "parent_collection") {
        value
      }
      products(first: $first) {
        nodes {
          ...CollectionProductFields
        }
      }
    }
  }
  ${PRODUCT_FIELDS}
` as const;

// All collections with their parent-assignment metafield — filtered in the
// loader down to the children of one main Collection. first: 250 is Shopify's
// per-connection max; total collection count (17 fixed + imported subs) is
// currently 137 and grows with the supplier catalog, so this must stay at the
// max rather than an arbitrary lower number (a first: 100 cap here silently
// dropped fixed/sub collections once the store passed 100 total — see
// ($locale)._index.tsx / ($locale).collections._index.tsx for the same bug).
const CHILD_COLLECTIONS_QUERY = `#graphql
  query ChildCollections(
    $cursor: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: 250, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        handle
        image {
          url
          altText
          width
          height
        }
        parent: metafield(namespace: "custom", key: "parent_collection") {
          value
        }
        displayName: metafield(namespace: "custom", key: "display_name") {
          value
        }
      }
    }
  }
` as const;

const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $first: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: $first) {
      nodes {
        ...CollectionProductFields
      }
    }
  }
  ${PRODUCT_FIELDS}
` as const;
