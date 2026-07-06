import {useState} from 'react';
import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, useSearchParams} from 'react-router';
import {ProductCard} from '~/components/ProductCard';

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
    };
  }

  if (!collection) {
    throw new Response('Collection not found', {status: 404});
  }

  return {collection};
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
  const {collection} = useLoaderData<typeof loader>();
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

  // Default view: group by sub-collection, then by sub-cat-collection within it.
  const grouped = new Map<string, Map<string, any[]>>();
  for (const product of allProducts) {
    const subCollection = getSubCollection(product);
    const subCatCollection = getSubCatCollection(product);
    if (!grouped.has(subCollection)) grouped.set(subCollection, new Map());
    const subMap = grouped.get(subCollection)!;
    if (!subMap.has(subCatCollection)) subMap.set(subCatCollection, []);
    subMap.get(subCatCollection)!.push(product);
  }

  return (
    <div className="collection max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{collection.title}</h1>
      {collection.description && (
        <p className="collection-description text-gray-600 mb-6">
          {collection.description}
        </p>
      )}

      <div className="collection-layout">
        <aside className="collection-filters">
          <div className="filter-group">
            <h4 className="font-semibold text-sm mb-1">Price</h4>
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

        <div className="collection-results">
          {hasFilters ? (
            filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No products match the selected filters.</p>
            )
          ) : (
            [...grouped.entries()].map(([subCollection, subCatMap]) => {
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
            })
          )}
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
    brand: metafield(namespace: "app", key: "brand") {
      value
    }
    subCollection: metafield(namespace: "app", key: "sub_collection") {
      value
    }
    subCatCollection: metafield(namespace: "app", key: "sub_cat_collection") {
      value
    }
    msq: metafield(namespace: "app", key: "msq") {
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
      products(first: $first) {
        nodes {
          ...CollectionProductFields
        }
      }
    }
  }
  ${PRODUCT_FIELDS}
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
