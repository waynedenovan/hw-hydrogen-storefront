import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData} from 'react-router';
import {
  Image,
  Money,
  VariantSelector,
  CartForm,
  getSelectedProductOptions,
} from '@shopify/hydrogen';
import {ProductPrice} from '~/components/ProductPrice';

export async function loader(args: LoaderFunctionArgs) {
  const {params, request, context} = args;
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Response('Product handle is required', {status: 400});
  }

  const selectedOptions = getSelectedProductOptions(request);

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

  if (!product) {
    throw new Response('Product not found', {status: 404});
  }

  return {product};
}

export default function Product() {
  const {product} = useLoaderData<typeof loader>();
  const {title, descriptionHtml, featuredImage} = product;

  return (
    <div className="product max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="product-image">
          {featuredImage && (
            <Image
              data={featuredImage}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          )}
        </div>
        <div className="product-main">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <ProductPrice
            price={product.selectedOrFirstAvailableVariant?.price}
            compareAtPrice={product.selectedOrFirstAvailableVariant?.compareAtPrice}
          />
          <div
            className="mt-4 prose"
            dangerouslySetInnerHTML={{__html: descriptionHtml}}
          />
          <VariantSelector
            handle={product.handle}
            options={product.options}
            variants={product.adjacentVariants}
          >
            {({option}) => (
              <div key={option.name} className="mt-4">
                <h3 className="font-semibold mb-2">{option.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {option.values.map(({value, isAvailable, to, isActive}) => (
                    <a
                      key={value}
                      href={to}
                      className={`px-3 py-1 border rounded ${
                        isActive
                          ? 'border-black bg-black text-white'
                          : isAvailable
                            ? 'border-gray-300 hover:border-black'
                            : 'border-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {value}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </VariantSelector>
          <CartForm
            route="/cart"
            action={CartForm.ACTIONS.LinesAdd}
            inputs={{
              lines: [
                {
                  merchandiseId:
                    product.selectedOrFirstAvailableVariant?.id ?? '',
                  quantity: 1,
                },
              ],
            }}
          >
            <button
              type="submit"
              className="mt-6 w-full bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition"
              disabled={
                !product.selectedOrFirstAvailableVariant?.availableForSale
              }
            >
              {product.selectedOrFirstAvailableVariant?.availableForSale
                ? 'Add to Cart'
                : 'Sold Out'}
            </button>
          </CartForm>
        </div>
      </div>
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
  query Product(
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      description
      descriptionHtml
      productType
      tags
      featuredImage {
        url
        altText
        width
        height
      }
      options {
        name
        optionValues {
          name
          swatch {
            color
            image {
              previewImage {
                url
              }
            }
          }
        }
      }
      selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions) {
        id
        availableForSale
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        image {
          url
          altText
          width
          height
        }
      }
      adjacentVariants(selectedOptions: $selectedOptions) {
        id
        availableForSale
        price {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
      }
      brand: metafield(namespace: "app", key: "brand") {
        value
      }
      b2cDescription: metafield(namespace: "app", key: "b2c_description") {
        value
      }
    }
  }
` as const;
