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
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

// Combines several description-like fields into one text block, dropping any
// sentence that already appeared in an earlier field or in `alreadyShown`
// (and dropping the whole field if nothing unique survives) so overlapping
// copy from ERP/B2C/short description sources doesn't repeat itself, and so
// this block never just re-prints the {desc} paragraph already rendered
// above it.
function buildCombinedDetails(
  fields: {text: string | null | undefined}[],
  alreadyShown?: string | null,
): string[] {
  const seen = new Set<string>(
    alreadyShown ? splitSentences(alreadyShown).map((s) => s.toLowerCase()) : [],
  );
  const blocks: string[] = [];
  for (const field of fields) {
    if (!field.text) continue;
    const uniqueSentences = splitSentences(field.text).filter((sentence) => {
      const key = sentence.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    if (uniqueSentences.length > 0) {
      blocks.push(uniqueSentences.join(' '));
    }
  }
  return blocks;
}

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
  const combinedDetailBlocks = buildCombinedDetails(
    [
      {text: product.shortDescription?.value},
      {text: product.b2cShortDescription?.value},
      {text: product.b2cDescription?.value},
      {text: product.erpShortDescription?.value},
      {text: product.erpLongDescription?.value},
    ],
    descriptionHtml ? stripHtml(descriptionHtml) : null,
  );
  const partNo = product.cleansku?.value;
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
    <div className="page-card page-card--narrow">
      <div className="product max-w-7xl mx-auto px-4 py-8">
        <div className="product-layout">
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
              className="mt-4 prose product-description text-gray-200"
              dangerouslySetInnerHTML={{__html: descriptionHtml}}
            />
            {(partNo || combinedDetailBlocks.length > 0) && (
              <div className="mt-6 text-gray-200">
                <h3 className="font-semibold mb-2 text-white">
                  Product Details
                </h3>
                {partNo && (
                  <p className="text-sm">
                    <span className="font-semibold text-white">
                      Part No.:{' '}
                    </span>
                    {partNo}
                  </p>
                )}
                {combinedDetailBlocks.map((block, index) => (
                  <p
                    key={index}
                    className={`text-sm${
                      index > 0 || partNo
                        ? ' mt-3 pt-3 border-t border-gray-600'
                        : ''
                    }`}
                  >
                    {block}
                  </p>
                ))}
              </div>
            )}
            {hasDimensions && (
              <div className="mt-6 text-gray-200">
                <h3 className="font-semibold mb-2 text-white">
                  Specifications
                </h3>
                <div className="product-dimensions-table">
                  <table className="w-full text-sm text-left border-collapse">
                    <tbody>
                      {dimensions?.weight && (
                        <tr className="border-b border-gray-600">
                          <th scope="row" className="py-1.5 pr-4 font-medium text-white whitespace-nowrap">
                            Weight
                          </th>
                          <td className="py-1.5">{dimensions.weight} kg</td>
                        </tr>
                      )}
                      {dimensions?.length && (
                        <tr className="border-b border-gray-600">
                          <th scope="row" className="py-1.5 pr-4 font-medium text-white whitespace-nowrap">
                            Length
                          </th>
                          <td className="py-1.5">{dimensions.length} mm</td>
                        </tr>
                      )}
                      {dimensions?.width && (
                        <tr className="border-b border-gray-600">
                          <th scope="row" className="py-1.5 pr-4 font-medium text-white whitespace-nowrap">
                            Width
                          </th>
                          <td className="py-1.5">{dimensions.width} mm</td>
                        </tr>
                      )}
                      {dimensions?.height && (
                        <tr>
                          <th scope="row" className="py-1.5 pr-4 font-medium text-white whitespace-nowrap">
                            Height
                          </th>
                          <td className="py-1.5">{dimensions.height} mm</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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
      shortDescription: metafield(namespace: "custom", key: "short_description") {
        value
      }
      b2cDescription: metafield(namespace: "custom", key: "b2c_description") {
        value
      }
      b2cShortDescription: metafield(namespace: "custom", key: "b2c_short_description") {
        value
      }
      erpShortDescription: metafield(namespace: "custom", key: "erp_short_description") {
        value
      }
      erpLongDescription: metafield(namespace: "custom", key: "erp_long_description") {
        value
      }
      cleansku: metafield(namespace: "custom", key: "cleansku") {
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
