import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData} from 'react-router';
import {CollectionCard} from '~/components/CollectionCard';
import {sortMainCollections} from '~/lib/fixedCollections';

export async function loader(args: LoaderFunctionArgs) {
  const {context} = args;
  const {storefront} = context;

  const data = await storefront.query(HOMEPAGE_COLLECTIONS_QUERY);

  const nodes = (data.collections?.nodes ?? []) as any[];
  // The homepage shows the FIXED main Collection list (custom.collection_role =
  // "main", managed on the admin app's Collections page) — never the imported
  // sub collections. Empty mains still show: they're permanent structure.
  const mains = nodes.filter((col: any) => col.role?.value === 'main');
  // Pre-setup fallback: until "Create / repair fixed Collections" has been run
  // on the admin app's Collections page, no collection carries role=main —
  // keep the old dynamic list (non-empty collections) so the homepage never
  // goes blank because of deploy ordering.
  const collections =
    mains.length > 0
      ? sortMainCollections(mains)
      : nodes.filter(
          (col: any) =>
            col.title !== 'JSON Imported' && col.products.nodes.length > 0,
        );

  return {collections};
}

export default function Homepage() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="home">
      <section className="px-4 pt-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-left">Online</h2>
      </section>
      <div className="px-4 max-w-7xl mx-auto">
        <hr style={{border: 'none', borderTop: '2px solid rgb(0, 0, 0)'}} />
      </div>
      <section hidden className="px-4 py-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold">Instore</h2>
      </section>
      <section className="px-4 py-8 max-w-7xl mx-auto">
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
          <p className="text-center text-gray-500 py-8">
            No collections available yet. Run &ldquo;Create / repair fixed
            Collections&rdquo; on the admin app&rsquo;s Collections page.
          </p>
        )}
      </section>
    </div>
  );
}

const HOMEPAGE_COLLECTIONS_QUERY = `#graphql
  query HomepageCollections(
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
        role: metafield(namespace: "custom", key: "collection_role") {
          value
        }
        products(first: 1) {
          nodes {
            id
          }
        }
      }
    }
  }
` as const;
