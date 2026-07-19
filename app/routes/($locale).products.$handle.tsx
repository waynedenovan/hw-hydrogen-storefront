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
import {WishlistButton} from '~/components/WishlistButton';
import {useAside} from '~/components/Aside';
import {getProductGalleryImageSrcs} from '~/lib/supplierImages';
import {withDisplayVat} from '~/lib/displayVat';

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

// The loader only sends srcs whose files exist on disk, so failures here are
// rare (file deleted between loader and fetch) — but an SSR'd <img> that fails
// BEFORE React hydrates has already fired its error event when onError
// attaches, so the mount effect re-checks for an already-missed failure
// (complete + naturalWidth 0 = the load failed). Without this, broken tiles
// stay visible whenever the failure wins the race against hydration.
function GalleryThumbnail({
  src,
  alt,
  wrapperClassName = 'aspect-square overflow-hidden rounded bg-gray-100',
  onExpand,
}: {
  src: string;
  alt: string;
  wrapperClassName?: string;
  onExpand?: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) return null;
  const img = (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="w-full h-full object-cover"
    />
  );
  if (onExpand) {
    return (
      <button
        type="button"
        onClick={onExpand}
        className={`${wrapperClassName} block w-full p-0 border-0 cursor-zoom-in`}
        aria-label={`Expand image: ${alt}`}
      >
        {img}
      </button>
    );
  }
  return <div className={wrapperClassName}>{img}</div>;
}

// Full-screen expanded view of a gallery image (todo spec: extra images are
// shown minimised and, when selected, expand for better viewing; closing
// returns them to the minimised grid). Prev/next cycle through gallerySrcs.
function GalleryCarousel({
  srcs,
  index,
  alt,
  onNavigate,
  onClose,
}: {
  srcs: string[];
  index: number;
  alt: string;
  onNavigate: (index: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft')
        onNavigate((index - 1 + srcs.length) % srcs.length);
      if (event.key === 'ArrowRight') onNavigate((index + 1) % srcs.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index, srcs.length, onNavigate, onClose]);
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Expanded product image"
      onClick={onClose}
    >
      <img
        src={srcs[index]}
        alt={alt}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded bg-white"
        onClick={(event) => event.stopPropagation()}
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Close expanded image"
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-black text-xl leading-none hover:bg-white"
      >
        ×
      </button>
      {srcs.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index - 1 + srcs.length) % srcs.length);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-black text-xl leading-none hover:bg-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index + 1) % srcs.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-black text-xl leading-none hover:bg-white"
          >
            ›
          </button>
        </>
      )}
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

  // Gallery candidate URLs are checked against the actual files on disk HERE,
  // server-side, and only existing ones are sent to the client. Previously the
  // component rendered all 11 candidates and relied on each <img onError> to
  // hide itself — but an SSR'd <img> whose 404 lands before React hydrates has
  // already fired its error event by the time the handler attaches, so dead
  // tiles stayed visible as a grid of broken images (count varied per load —
  // it's a race, worst on phones where hydration is slowest). This was the
  // long-recurring "Detailed Product page" bug. node:fs is imported
  // dynamically per project pattern ERR-IMPORT-001 (a static server-only
  // import in a route with a client component breaks the client bundle).
  const candidates = getProductGalleryImageSrcs(
    product.supplierName?.value,
    product.externalProductId?.value,
  );
  let gallerySrcs: string[] = [];
  if (candidates.length > 0) {
    const [fs, path] = await Promise.all([
      import('node:fs/promises'),
      import('node:path'),
    ]);
    const root = path.resolve(process.cwd(), 'media', 'suppliers');
    gallerySrcs = (
      await Promise.all(
        candidates.map(async (src) => {
          const rel = src.replace(/^\/media\/suppliers\//, '');
          try {
            await fs.access(path.resolve(root, rel));
            return src;
          } catch {
            return null;
          }
        }),
      )
    ).filter((src): src is string => src !== null);
  }

  return {product, gallerySrcs};
}

export default function Product() {
  const {product, gallerySrcs} = useLoaderData<typeof loader>();
  const {title, descriptionHtml, featuredImage} = product;
  const msqValue = Number(product.msq?.value);
  const msq = Number.isFinite(msqValue) && msqValue > 1 ? msqValue : 1;
  const [quantity, setQuantity] = useState(msq);
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
  const [expandedImage, setExpandedImage] = useState<number | null>(null);
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
      {/* No max-width cap: the content area must keep expanding with the
          screen, bounded only by the 90%-of-card / 5%-inset rule enforced
          in app.css (.product padding-inline at >=45em). */}
      <div className="product mx-auto px-4 py-8">
        <div className="product-layout">
          <div className="product-image">
            {featuredImage ? (
              <Image
                data={featuredImage}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            ) : gallerySrcs[0] ? (
              <GalleryThumbnail
                src={gallerySrcs[0]}
                alt={title}
                wrapperClassName="w-full aspect-square overflow-hidden rounded"
                onExpand={() => setExpandedImage(0)}
              />
            ) : (
              <div className="w-full aspect-square rounded bg-gray-100 flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
            {gallerySrcs.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {gallerySrcs.slice(1).map((src, thumbIndex) => (
                  <GalleryThumbnail
                    key={src}
                    src={src}
                    alt={title}
                    onExpand={() => setExpandedImage(thumbIndex + 1)}
                  />
                ))}
              </div>
            )}
            {expandedImage !== null && gallerySrcs[expandedImage] && (
              <GalleryCarousel
                srcs={gallerySrcs}
                index={expandedImage}
                alt={title}
                onNavigate={setExpandedImage}
                onClose={() => setExpandedImage(null)}
              />
            )}
          </div>
          <div className="product-main">
            {/* font-size/weight set in app.css (.product-main h1) — Tailwind
                text-size/font-weight classes here would be silently overridden
                by reset.css's unlayered h1 rule, see app.css comment. */}
            <h1 className="mb-4 text-white">{title}</h1>
            <div className="text-white product-price-display">
              <ProductPrice
                price={
                  product.selectedOrFirstAvailableVariant?.price
                    ? withDisplayVat(product.selectedOrFirstAvailableVariant.price)
                    : undefined
                }
                compareAtPrice={
                  product.selectedOrFirstAvailableVariant?.compareAtPrice
                    ? withDisplayVat(product.selectedOrFirstAvailableVariant.compareAtPrice)
                    : undefined
                }
              />
            </div>
            <div
              className="mt-4 prose product-description text-gray-200"
              dangerouslySetInnerHTML={{__html: descriptionHtml}}
            />
            {(partNo || product.type?.value || combinedDetailBlocks.length > 0) && (
              <div className="mt-6 text-gray-200">
                {/* h1/h3/p/table font-size + weight for this page are set in
                    app.css (.product-main …) alongside .product-card's — see
                    the cascade-layers comment there. Tailwind text-size/weight
                    classes on these elements would be silent no-ops. */}
                <h3 className="mb-2 text-white">
                  Product Details
                </h3>
                {partNo && (
                  <p>
                    <span className="font-semibold text-white">
                      Part No.:{' '}
                    </span>
                    {partNo}
                  </p>
                )}
                {product.type?.value && (
                  <p>
                    <span className="font-semibold text-white">
                      Type:{' '}
                    </span>
                    {product.type.value}
                  </p>
                )}
                {combinedDetailBlocks.map((block, index) => (
                  <p
                    key={index}
                    className={
                      index > 0 || partNo
                        ? 'mt-3 pt-3 border-t border-gray-600'
                        : undefined
                    }
                  >
                    {block}
                  </p>
                ))}
              </div>
            )}
            {hasDimensions && (
              <div className="mt-6 text-gray-200">
                <h3 className="mb-2 text-white">
                  Specifications
                </h3>
                <div className="product-dimensions-table">
                  <table className="w-full text-left border-collapse">
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
                  <h3 className="mb-2 text-white">
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
                min={msq}
                step={msq}
              />
              {msq > 1 && (
                <p className="text-xs text-gray-300 mt-1">
                  Sold in multiples of {msq}
                </p>
              )}
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
                                msq: product.msq,
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
              {/* Shopify silently caps quantity to whatever's actually in stock
                  (MERCHANDISE_NOT_ENOUGH_STOCK) instead of rejecting the add —
                  surface that here so a lower-than-requested cart quantity
                  doesn't look like a stepping/MOQ bug. */}
              {(fetcher.data as {warnings?: {message: string}[]} | undefined)?.warnings?.map(
                (warning, index) => (
                  <p key={index} className="text-xs text-amber-300 mt-2">
                    {warning.message}
                  </p>
                ),
              )}
            </fetcher.Form>
            <div className="mt-3">
              <WishlistButton
                productId={product.id}
                productHandle={product.handle}
                productTitle={product.title}
                variant="button"
              />
            </div>
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
      msq: metafield(namespace: "custom", key: "msq") {
        value
      }
      type: metafield(namespace: "custom", key: "type") {
        value
      }
    }
  }
` as const;
