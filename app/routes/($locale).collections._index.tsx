import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData} from 'react-router';
import {Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {CollectionCard} from '~/components/CollectionCard';

export async function loader(args: LoaderFunctionArgs) {
  const {context, request} = args;
  const paginationVariables = getPaginationVariables(request, {pageBy: 8});

  const {collections} = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables,
  });

  return {collections};
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="collections max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Collections</h1>
      <Pagination connection={collections}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <>
            <PreviousLink>
              {isLoading ? 'Loading...' : <span>Load previous</span>}
            </PreviousLink>
            <div className="collections-grid">
              {nodes.map((collection: any) => (
                <CollectionCard key={collection.id} collection={collection} />
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

const COLLECTIONS_QUERY = `#graphql
  query Collections(
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: $first, last: $last, before: $startCursor, after: $endCursor) {
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
