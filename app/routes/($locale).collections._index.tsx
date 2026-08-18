import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData} from 'react-router';
import {CollectionCard} from '~/components/CollectionCard';
import {sortMainCollections} from '~/lib/fixedCollections';
import {fetchAllCollections} from '~/lib/collections';

export async function loader(args: LoaderFunctionArgs) {
  const {context} = args;

  // Same view as the homepage: only the fixed main Collections
  // (custom.collection_role = "main"), in the fixed list's order. Falls back to
  // the full list until the admin app's Collections setup has been run.
  // Paginated (task 2607271000) — see ~/lib/collections' doc comment: total
  // collection count crossed Shopify's first:250 max once the Sub-Cat tier
  // landed, so a single page can no longer be assumed to hold every main.
  const nodes = await fetchAllCollections<any>(context.storefront, COLLECTIONS_QUERY);
  const mains = nodes.filter((col) => col.role?.value === 'main');
  return {
    collections:
      mains.length > 0
        ? sortMainCollections(mains)
        : nodes.filter((col) => col.title !== 'JSON Imported'),
  };
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="collections max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Collections</h1>
      {collections.length > 0 ? (
        <div className="collections-grid">
          {collections.map((collection: any) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              headingLevel="h2"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 py-8">No collections available yet.</p>
      )}
    </div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query Collections(
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
        role: metafield(namespace: "custom", key: "collection_role") {
          value
        }
      }
    }
  }
` as const;
