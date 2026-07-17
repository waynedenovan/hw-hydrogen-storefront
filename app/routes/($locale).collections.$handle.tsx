import {useState} from 'react';
import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, useSearchParams} from 'react-router';
import {ProductCard} from '~/components/ProductCard';
import {CollectionCard} from '~/components/CollectionCard';
import {ScrollToTopButton} from '~/components/ScrollToTopButton';

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
    };
  }

  if (!collection) {
    throw new Response('Collection not found', {status: 404});
  }

  // Fixed main Collections (custom.collection_role = "main") don't show products —
  // they show their assigned Sub Collections as tiles (spec 2607171535). A sub's
  // assignment lives in its custom.parent_collection metafield (the main
  // collection's TITLE), written by the admin app's Collections page.
  if ((collection as any).role?.value === 'main') {
    const childData = await storefront.query(CHILD_COLLECTIONS_QUERY);
    const wanted = collection.title.trim().toLowerCase();
    const subCollections = ((childData.collections?.nodes ?? []) as any[])
      .filter((c) => (c.parent?.value || '').trim().toLowerCase() === wanted)
      .sort((a, b) => a.title.localeCompare(b.title, undefined, {numeric: true}));
    return {collection, subCollections};
  }

  return {collection, subCollections: null};
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

function CollapsibleSection({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="collection-section">
      <button
        type="button"
        className="collection-section-toggle"
        onClick={() => setCollapsed((c) => !c)}
      >
        {collapsed ? '▸' : '▾'} {title} ({count})
      </button>
      {!collapsed && children}
    </div>
  );
}

export default function Collection() {
  const {collection, subCollections} = useLoaderData<typeof loader>();

  // Main (fixed) Collection → grid of its assigned Sub Collection tiles.
  // Rendered by a separate component from the product view so the hook count
  // stays stable when navigating between a main and a sub collection (the route
  // component instance is reused across $handle param changes).
  if (subCollections) {
    return <SubCollectionsView collection={collection} subCollections={subCollections} />;
  }

  return <CollectionProductsView collection={collection} />;
}

function SubCollectionsView({
  collection,
  subCollections,
}: {
  collection: any;
  subCollections: any[];
}) {
  return (
    <div className="page-card page-card--wide">
      <div className="collection max-w-7xl mx-auto px-4 py-8">
        <div className="collection-header">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-white">{collection.title}</h1>
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
              <CollectionCard key={sub.id} collection={sub} headingLevel="h3" />
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

function CollectionProductsView({collection}: {collection: any}) {
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

  const filteredProducts = allProducts.filter((product) => {
    if (selectedBrands.size > 0 && !selectedBrands.has(getBrand(product))) return false;
    if (selectedSubCollections.size > 0 && !selectedSubCollections.has(getSubCollection(product))) return false;
    if (selectedSubCatCollections.size > 0 && !selectedSubCatCollections.has(getSubCatCollection(product))) return false;
    const price = getPrice(product);
    if (minPrice !== '' && price < Number(minPrice)) return false;
    if (maxPrice !== '' && price > Number(maxPrice)) return false;
    return true;
  });

  // Default view: group by brand, then sub-collection, then sub-cat-collection.
  const grouped = new Map<string, Map<string, Map<string, any[]>>>();
  for (const product of allProducts) {
    const brand = getBrand(product) || 'Other';
    const subCollection = getSubCollection(product);
    const subCatCollection = getSubCatCollection(product);
    if (!grouped.has(brand)) grouped.set(brand, new Map());
    const subCollectionMap = grouped.get(brand)!;
    if (!subCollectionMap.has(subCollection)) subCollectionMap.set(subCollection, new Map());
    const subCatMap = subCollectionMap.get(subCollection)!;
    if (!subCatMap.has(subCatCollection)) subCatMap.set(subCatCollection, []);
    subCatMap.get(subCatCollection)!.push(product);
  }

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
            <h1 className="text-3xl font-bold mb-2 text-white">{collection.title}</h1>
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
            {hasFilters ? (
              filteredProducts.length > 0 ? (
                <div className="products-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-300 py-8">No products match the selected filters.</p>
              )
            ) : (
              [...grouped.entries()].map(([brand, subCollectionMap]) => {
                const brandCount = [...subCollectionMap.values()]
                  .flatMap((subCatMap) => [...subCatMap.values()])
                  .reduce((sum, p) => sum + p.length, 0);
                return (
                  <CollapsibleSection key={brand} title={brand} count={brandCount}>
                    {[...subCollectionMap.entries()].map(([subCollection, subCatMap]) => {
                      const sectionCount = [...subCatMap.values()].reduce((sum, p) => sum + p.length, 0);
                      return (
                        <CollapsibleSection key={subCollection} title={subCollection} count={sectionCount}>
                          {[...subCatMap.entries()].map(([subCatCollection, products]) => (
                            <CollapsibleSection key={subCatCollection} title={subCatCollection} count={products.length}>
                              <div className="products-grid">
                                {products.map((product) => (
                                  <ProductCard key={product.id} product={product} />
                                ))}
                              </div>
                            </CollapsibleSection>
                          ))}
                        </CollapsibleSection>
                      );
                    })}
                  </CollapsibleSection>
                );
              })
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
// loader down to the children of one main Collection. Collection count for this
// store stays well under 100 (17 fixed + imported subs).
const CHILD_COLLECTIONS_QUERY = `#graphql
  query ChildCollections(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: 100) {
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
