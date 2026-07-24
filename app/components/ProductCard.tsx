import {useState, useEffect, useRef} from 'react';
import {Link, useFetcher} from 'react-router';
import {Image, Money, CartForm} from '@shopify/hydrogen';
import {getProductCardImageSrc, getImagesFromMetafield} from '~/lib/supplierImages';
import {withDisplayVat} from '~/lib/displayVat';
import {WishlistButton} from '~/components/WishlistButton';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    handle: string;
    productType?: string;
    featuredImage?: {
      url: string;
      altText?: string | null;
      width?: number;
      height?: number;
    } | null;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    brand?: {value: string} | null;
    /**
     * custom.type metafield — the supplier type code stripped from the
     * Sub/Sub-Cat Collection display names (e.g. "ACAE", task 2607191357).
     * Still identifies the sub collection now that names no longer carry it.
     */
    type?: {value: string} | null;
    msq?: {value: string} | null;
    supplierName?: {value: string} | null;
    externalProductId?: {value: string} | null;
    /** custom.images metafield — ";"-delimited, first value is the main image. */
    images?: {value: string} | null;
    variants?: {
      nodes: {
        id: string;
        availableForSale: boolean;
      }[];
    } | null;
  };
}

export function ProductCard({product}: ProductCardProps) {
  const fetcher = useFetcher({key: `add-to-cart-${product.id}`});
  const firstVariant = product.variants?.nodes[0];
  const msq = Number(product.msq?.value);
  const showMoqRibbon = Number.isFinite(msq) && msq > 1;
  const [localImageFailed, setLocalImageFailed] = useState(false);
  const localImageRef = useRef<HTMLImageElement>(null);
  // Task 2607240845: custom.images (explicit ";"-delimited list, main image
  // first) is preferred over the old guessed bare-filename fallback — falls
  // back to the guess only for products without an images metafield value yet.
  const explicitImageSrc = getImagesFromMetafield(
    product.supplierName?.value,
    product.images?.value,
  )[0];
  const localImageSrc =
    explicitImageSrc ??
    getProductCardImageSrc(product.supplierName?.value, product.externalProductId?.value);

  // An SSR'd <img> whose 404 lands before React hydrates has already fired its
  // error event by the time onError attaches — the handler never runs and the
  // card shows a broken image instead of the "No image" placeholder (a race:
  // worst on phones, where hydration is slowest). Re-check on mount for a
  // failure that was missed that way (complete + naturalWidth 0 = failed).
  useEffect(() => {
    const img = localImageRef.current;
    if (img && img.complete && img.naturalWidth === 0) setLocalImageFailed(true);
  }, []);
  const noImageAvailable = !product.featuredImage && (!localImageSrc || localImageFailed);

  // Dev-only trace for "no image" cases — the placeholder itself is expected UI,
  // but silently showing it makes missing-image data issues hard to spot later.
  useEffect(() => {
    if (!noImageAvailable || !import.meta.env.DEV) return;
    console.warn(
      `[ProductCard] No image for "${product.title}" (${product.handle}): no Shopify featuredImage, and ` +
        (localImageSrc
          ? `local fallback 404'd at ${localImageSrc}.`
          : 'no supplier_name/external_product_id metafields to build a local fallback path.'),
    );
  }, [noImageAvailable, localImageSrc, product.title, product.handle]);

  return (
    <div className="product-card group block">
      <Link to={`/products/${product.handle}`} prefetch="intent" className="block">
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 moq-ribbon-wrapper">
          {product.featuredImage ? (
            <Image
              data={product.featuredImage}
              aspectRatio="1/1"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : localImageSrc && !localImageFailed ? (
            <img
              ref={localImageRef}
              src={localImageSrc}
              alt={product.title}
              onError={() => {
                console.warn(
                  `[ProductCard] Local fallback image 404'd for "${product.title}" (${product.handle}): ${localImageSrc}. ` +
                    `Check that supplier_name/external_product_id metafields match a real file under media/suppliers/.`,
                );
                setLocalImageFailed(true);
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
          {showMoqRibbon && (
            <div className="moq-ribbon">
              <span className="moq-ribbon-label">Min Order Qty</span>
              <span className="moq-ribbon-value">{msq}</span>
            </div>
          )}
        </div>
        <div
          className="mt-2"
          style={{
            background: 'rgba(50, 50, 50, 0.85)',
            padding: '0.4rem 0.5rem',
            borderRadius: '6px',
          }}
        >
          {/* h3/p font-size + font-weight are set in app.css (.product-card h3/p) —
              Tailwind text-size/font-weight utility classes here would be silently
              overridden by reset.css's unlayered h3/p rules, see app.css comment. */}
          <h3 className="leading-snug text-white group-hover:underline">
            {product.title}
          </h3>
          {product.brand?.value && (
            <p className="text-gray-300 mt-0.5">{product.brand.value}</p>
          )}
          {product.productType && (
            <p className="text-gray-400 mt-0.5">{product.productType}</p>
          )}
          {product.type?.value && (
            <p className="text-gray-400 mt-0.5">Type: {product.type.value}</p>
          )}
          <div className="mt-1 text-white product-price-display">
            <Money data={withDisplayVat(product.priceRange.minVariantPrice)} />
          </div>
        </div>
      </Link>
      <div className="product-card-actions">
        {firstVariant && (
        <fetcher.Form method="post" action="/cart" className="product-card-cart-form">
          <input
            type="hidden"
            name={CartForm.INPUT_NAME}
            value={JSON.stringify({
              action: CartForm.ACTIONS.LinesAdd,
              inputs: {
                lines: [
                  {
                    merchandiseId: firstVariant.id,
                    // MOQ products must enter the cart already at their minimum
                    // order quantity, not 1 — see moq_cart_msq_stepping pattern.
                    quantity: showMoqRibbon ? msq : 1,
                  },
                ],
              },
            })}
          />
          <button
            type="submit"
            disabled={!firstVariant.availableForSale || fetcher.state !== 'idle'}
            className="add-to-cart-btn"
          >
            {!firstVariant.availableForSale
              ? 'Sold Out'
              : fetcher.state !== 'idle'
              ? 'Adding...'
              : 'Add to Cart'}
          </button>
          {/* Shopify silently caps quantity to whatever's actually in stock
              (MERCHANDISE_NOT_ENOUGH_STOCK) instead of rejecting the add — surface
              that here so a lower-than-requested cart quantity doesn't look like a
              stepping/MOQ bug. See moq_cart_msq_stepping pattern. */}
          {(fetcher.data as {warnings?: {message: string}[]} | undefined)?.warnings?.map(
            (warning, index) => (
              <p key={index} className="cart-stock-warning">
                {warning.message}
              </p>
            ),
          )}
        </fetcher.Form>
        )}
        <WishlistButton
          productId={product.id}
          productHandle={product.handle}
          productTitle={product.title}
        />
      </div>
    </div>
  );
}
