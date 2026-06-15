import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, Link} from 'react-router';
import {ProductCard} from '~/components/ProductCard';

export async function loader(args: LoaderFunctionArgs) {
  const {context} = args;
  const {storefront} = context;

  const data = await storefront.query(HOMEPAGE_COLLECTIONS_QUERY);

  const collections = (data.collections?.nodes ?? []).filter(
    (col: any) => col.title !== 'JSON Imported' && col.products.nodes.length > 0,
  );

  return {collections};
}

function CollectionSection({
  collection,
}: {
  collection: {
    id: string;
    title: string;
    handle: string;
    products: {nodes: any[]};
  };
}) {
  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{collection.title}</h2>
        <Link
          to={`/collections/${collection.handle}`}
          prefetch="intent"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collection.products.nodes.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default function Homepage() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="home">
      {collections.length > 0 ? (
        collections.map((collection: any) => (
          <CollectionSection key={collection.id} collection={collection} />
        ))
      ) : (
        <section className="px-4 py-16 max-w-7xl mx-auto text-center text-gray-500">
          <p>No collections available yet.</p>
        </section>
      )}
    </div>
  );
}

const HOMEPAGE_COLLECTIONS_QUERY = `#graphql
  query HomepageCollections(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: 20) {
      nodes {
        id
        title
        handle
        products(first: 8) {
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
              type
            }
            variants(first: 1) {
              nodes {
                id
                availableForSale
              }
            }
          }
        }
      }
    }
  }
` as const;
