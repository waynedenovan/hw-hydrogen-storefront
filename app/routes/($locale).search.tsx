import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, Link} from 'react-router';
import {Image, Money, Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';

export async function loader({request, context}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q') || '';
  const paginationVariables = getPaginationVariables(request, {pageBy: 12});

  if (!searchTerm) {
    return {searchTerm, products: null};
  }

  const {search} = await context.storefront.query(SEARCH_QUERY, {
    variables: {query: searchTerm, ...paginationVariables},
  });

  return {searchTerm, products: search};
}

export default function Search() {
  const {searchTerm, products} = useLoaderData<typeof loader>();

  return (
    <div className="search max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      <SearchFormPredictive>
        {({fetchResults, goToSearch, inputRef}) => (
          <div className="flex gap-2 mb-8">
            <input
              name="q"
              defaultValue={searchTerm}
              onChange={fetchResults}
              onFocus={fetchResults}
              placeholder="Search products..."
              ref={inputRef}
              type="search"
              className="flex-1 px-4 py-2 border border-gray-300 rounded"
            />
            <button
              onClick={goToSearch}
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Search
            </button>
          </div>
        )}
      </SearchFormPredictive>

      {searchTerm && !products?.nodes?.length && (
        <p className="text-gray-500">
          No results found for <q>{searchTerm}</q>
        </p>
      )}

      {products?.nodes?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.nodes.map((product: any) => (
            <Link
              key={product.id}
              to={`/products/${product.handle}`}
              prefetch="intent"
              className="group"
            >
              {product.featuredImage && (
                <Image
                  data={product.featuredImage}
                  aspectRatio="1/1"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              )}
              <h3 className="mt-2 font-semibold group-hover:underline">
                {product.title}
              </h3>
              <Money data={product.priceRange.minVariantPrice} />
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

const SEARCH_QUERY = `#graphql
  query Search(
    $query: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    search(
      query: $query
      types: [PRODUCT]
      first: $first
      last: $last
      before: $startCursor
      after: $endCursor
    ) {
      nodes {
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
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
` as const;
