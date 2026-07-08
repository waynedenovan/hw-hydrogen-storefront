import {useState, useEffect} from 'react';
import {Link, useFetcher} from 'react-router';
import {Image, Money, CartForm} from '@shopify/hydrogen';
import {getProductCardImageSrc} from '~/lib/supplierImages';

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
    msq?: {value: string} | null;
    supplierName?: {value: string} | null;
    externalProductId?: {value: string} | null;
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
  const localImageSrc = getProductCardImageSrc(
    product.supplierName?.value,
    product.externalProductId?.value,
  );
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
            <div className="moq-ribbon">Minimum qty: {msq}</div>
          )}
        </div>
        <div
          className="mt-3"
          style={{
            background: 'rgba(50, 50, 50, 0.85)',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
          }}
        >
          <h3 className="text-sm font-semibold text-white group-hover:underline">
            {product.title}
          </h3>
          {product.brand?.value && (
            <p className="text-xs text-gray-300 mt-0.5">{product.brand.value}</p>
          )}
          {product.productType && (
            <p className="text-xs text-gray-400 mt-0.5">{product.productType}</p>
          )}
          <div className="mt-1 text-sm font-medium text-white">
            <Money data={product.priceRange.minVariantPrice} />
          </div>
        </div>
      </Link>
      {firstVariant && (
        <fetcher.Form method="post" action="/cart">
          <input
            type="hidden"
            name={CartForm.INPUT_NAME}
            value={JSON.stringify({
              action: CartForm.ACTIONS.LinesAdd,
              inputs: {
                lines: [
                  {
                    merchandiseId: firstVariant.id,
                    quantity: 1,
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
        </fetcher.Form>
      )}
    </div>
  );
}
