import {defer, type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, Await} from 'react-router';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductCollectionSortKeys,
} from '@shopify/hydrogen/storefront-api-types';
import {ProductCard} from '~/components/ProductCard';
import {StickyScrollMenu} from '~/components/StickyScrollMenu';

export async function loader(args: LoaderFunctionArgs) {
  const {context} = args;
  const {storefront} = context;

  const {products} = await storefront.query(HOMEPAGE_PRODUCTS_QUERY, {
    variables: {first: 30},
  });

  const categories = extractCategories(products.nodes);

  return {products, categories};
}

function extractCategories(products: any[]) {
  const categoryMap = new Map<string, {name: string; handle: string}>();
  for (const product of products) {
    const type = product.productType;
    if (type && !categoryMap.has(type)) {
      categoryMap.set(type, {
        name: type,
        handle: type.toLowerCase().replace(/\s+/g, '-'),
      });
    }
  }
  return Array.from(categoryMap.values());
}

export default function Homepage() {
  const {products, categories} = useLoaderData<typeof loader>();

  return (
    <div className="home">
      <StickyScrollMenu categories={categories} />
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.nodes.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

const HOMEPAGE_PRODUCTS_QUERY = `#graphql
  query HomepageProducts(
    $first: Int!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: $first, sortKey: TITLE) {
      nodes {
        id
        title
        handle
        description
        productType
        tags
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
          width
          height
        }
        brand: metafield(namespace: "app", key: "brand") {
          value
          type
        }
        b2cDescription: metafield(namespace: "app", key: "b2c_description") {
          value
          type
        }
      }
    }
  }
` as const;
