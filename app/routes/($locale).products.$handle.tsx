import {type LoaderFunctionArgs} from 'react-router';
import {useLoaderData, useFetcher} from 'react-router';
import {useState, useEffect, useRef} from 'react';
import {
  Image,
  Money,
  VariantSelector,
  CartForm,
  getSelectedProductOptions,
} from '@shopify/hydrogen';
import {ProductPrice} from '~/components/ProductPrice';
import {QuantitySelector} from '~/components/QuantitySelector';
import {useAside} from '~/components/Aside';
import {getProductGalleryImageSrcs} from '~/lib/supplierImages';

// Each thumbnail tracks its own load-failure locally — the resource route serving
// these files doesn't exist yet (see supplierImages.ts), so most candidates will
// 404 until the /media/suppliers disk-reading route lands. Hiding on error means
// the gallery just quietly shows whichever images are actually available.
function GalleryThumbnail({
  src,
  alt,
  wrapperClassName = 'aspect-square overflow-hidden rounded bg-gray-100',
}: {
  src: string;
  alt: string;
  wrapperClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <div className={wrapperClassName}>
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

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
  const [quantity, setQuantity] = useState(1);
  const dimensions = product.dimensions?.value
    ? (JSON.parse(product.dimensions.value) as {
        length?: string;
        width?: string;
        height?: string;
        weight?: string;
      })
    : null;
  const hasDimensions =
    dimensions &&
    (dimensions.length || dimensions.width || dimensions.height || dimensions.weight);
  const gallerySrcs = getProductGalleryImageSrcs(
    product.supplierName?.value,
    product.externalProductId?.value,
  );
  const fetcher = useFetcher({key: 'add-to-cart'});
  const {open} = useAside();
  const prevFetcherState = useRef(fetcher.state);

  useEffect(() => {
    if (prevFetcherState.current === 'loading' && fetcher.state === 'idle') {
      open('cart');
    }
    prevFetcherState.current = fetcher.state;
  }, [fetcher.state, open]);

  return (
    <div
      style={{
        maxWidth: '80%',
        margin: '0 auto',
        background: 'rgba(50, 50, 50, 0.65)',
        padding: '2rem',
        borderRadius: '12px',
      }}
    >
      <div className="product max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="product-image">
            {featuredImage ? (
              <Image
                data={featuredImage}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            ) : (
              gallerySrcs[0] && (
                <GalleryThumbnail
                  src={gallerySrcs[0]}
                  alt={title}
                  wrapperClassName="w-full aspect-square overflow-hidden rounded"
                />
              )
            )}
            {gallerySrcs.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {gallerySrcs.slice(1).map((src) => (
                  <GalleryThumbnail key={src} src={src} alt={title} />
                ))}
              </div>
            )}
          </div>
          <div className="product-main">
            <h1 className="text-3xl font-bold mb-4 text-white">{title}</h1>
            <div className="text-white text-xl font-semibold">
              <ProductPrice
                price={product.selectedOrFirstAvailableVariant?.price}
                compareAtPrice={
                  product.selectedOrFirstAvailableVariant?.compareAtPrice
                }
              />
            </div>
            <div
              className="mt-4 prose text-gray-200"
              dangerouslySetInnerHTML={{__html: descriptionHtml}}
            />
            {hasDimensions && (
              <div className="mt-4 text-gray-200">
                <h3 className="font-semibold mb-2 text-white">
                  Specifications
                </h3>
                <ul className="text-sm space-y-1">
                  {dimensions?.length && (
                    <li>Length: {dimensions.length} cm</li>
                  )}
                  {dimensions?.width && <li>Width: {dimensions.width} cm</li>}
                  {dimensions?.height && (
                    <li>Height: {dimensions.height} cm</li>
                  )}
                  {dimensions?.weight && (
                    <li>Weight: {dimensions.weight} kg</li>
                  )}
                </ul>
              </div>
            )}
            <VariantSelector
              handle={product.handle}
              options={product.options}
              variants={product.adjacentVariants}
            >
              {({option}) => (
                <div key={option.name} className="mt-4">
                  <h3 className="font-semibold mb-2 text-white">
                    {option.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map(
                      ({value, isAvailable, to, isActive}) => (
                        <a
                          key={value}
                          href={to}
                          className={`px-3 py-1 border rounded ${
                            isActive
                              ? 'border-white bg-white text-black'
                              : isAvailable
                                ? 'border-gray-400 text-gray-200 hover:border-white hover:text-white'
                                : 'border-gray-600 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {value}
                        </a>
                      ),
                    )}
                  </div>
                </div>
              )}
            </VariantSelector>
            <div className="mt-6">
              <label className="block text-white text-sm font-semibold mb-2">
                Quantity
              </label>
              <QuantitySelector
                quantity={quantity}
                onChange={setQuantity}
              />
            </div>
            <fetcher.Form method="post" action="/cart">
              <input
                type="hidden"
                name={CartForm.INPUT_NAME}
                value={JSON.stringify({
                  action: CartForm.ACTIONS.LinesAdd,
                  inputs: {
                    lines: [
                      {
                        merchandiseId:
                          product.selectedOrFirstAvailableVariant?.id ?? '',
                        quantity,
                        selectedVariant: product.selectedOrFirstAvailableVariant
                          ? {
                              ...product.selectedOrFirstAvailableVariant,
                              product: {
                                handle: product.handle,
                                title: product.title,
                                id: product.id,
                                vendor: product.vendor,
                              },
                            }
                          : undefined,
                      },
                    ],
                  },
                })}
              />
              <button
                type="submit"
                className="mt-4 w-full bg-white text-black py-3 px-6 rounded hover:bg-gray-200 transition font-semibold"
                disabled={
                  !product.selectedOrFirstAvailableVariant?.availableForSale ||
                  fetcher.state !== 'idle'
                }
              >
                {product.selectedOrFirstAvailableVariant?.availableForSale
                  ? fetcher.state !== 'idle'
                    ? 'Adding...'
                    : 'Add to Cart'
                  : 'Sold Out'}
              </button>
            </fetcher.Form>
          </div>
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
        title
        availableForSale
        requiresShipping
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
          id
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
      brand: metafield(namespace: "custom", key: "brand") {
        value
      }
      b2cDescription: metafield(namespace: "custom", key: "b2c_description") {
        value
      }
      dimensions: metafield(namespace: "custom", key: "dimensions") {
        value
      }
      supplierName: metafield(namespace: "custom", key: "supplier_name") {
        value
      }
      externalProductId: metafield(namespace: "custom", key: "external_product_id") {
        value
      }
    }
  }
` as const;
