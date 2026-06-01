import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';

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
  };
}

export function ProductCard({product}: ProductCardProps) {
  return (
    <Link
      to={`/products/${product.handle}`}
      prefetch="intent"
      className="product-card group block"
    >
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        {product.featuredImage ? (
          <Image
            data={product.featuredImage}
            aspectRatio="1/1"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
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
        <h3 className="text-sm font-semibold text-white group-hover:underline truncate">
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
  );
}
