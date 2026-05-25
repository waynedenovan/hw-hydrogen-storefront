import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData} from 'react-router';
import {Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {ProductCard} from '~/components/ProductCard';

export async function loader(args: LoaderFunctionArgs) {
  const {params, request, context} = args;
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 12});

  if (!handle) {
    throw new Response('Collection handle is required', {status: 400});
  }

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, ...paginationVariables},
  });

  if (!collection) {
    throw new Response('Collection not found', {status: 404});
  }

  return {collection};
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();

  return (
    <div className="collection max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{collection.title}</h1>
      {collection.description && (
        <p className="collection-description text-gray-600 mb-6">
          {collection.description}
        </p>
      )}
      <Pagination connection={collection.products}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <>
            <PreviousLink>
              {isLoading ? 'Loading...' : <span>Load previous</span>}
            </PreviousLink>
            <div className="products-grid">
              {nodes.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load more</span>}
            </NextLink>
          </>
        )}
      </Pagination>
    </div>
  );
}

const COLLECTION_QUERY = `#graphql
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
        nodes {
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
          brand: metafield(namespace: "app", key: "brand") {
            value
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
  }
` as const;
