import {useEffect} from 'react';
import {useFetcher, useNavigate} from 'react-router';

function HeartIcon({filled}: {filled: boolean}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/**
 * Adds a product to the customer's Wish List (posts to /account/wishlist).
 * Logged-out customers are sent to /account/login.
 *
 * variant "icon"  — compact heart-only button (Product Cards)
 * variant "button" — heart + label (Detailed Product page)
 */
export function WishlistButton({
  productId,
  productHandle,
  productTitle,
  variant = 'icon',
}: {
  productId: string;
  productHandle: string;
  productTitle: string;
  variant?: 'icon' | 'button';
}) {
  const fetcher = useFetcher<{
    success?: boolean;
    requiresLogin?: boolean;
    error?: string;
  }>({key: `wishlist-${productId}`});
  const navigate = useNavigate();

  useEffect(() => {
    if (fetcher.data?.requiresLogin) navigate('/account/login');
  }, [fetcher.data, navigate]);

  const added = Boolean(fetcher.data?.success);
  const busy = fetcher.state !== 'idle';

  return (
    <fetcher.Form method="post" action="/account/wishlist">
      <input type="hidden" name="intent" value="add" />
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="productHandle" value={productHandle} />
      <input type="hidden" name="productTitle" value={productTitle} />
      <button
        type="submit"
        disabled={busy || added}
        className={
          variant === 'icon' ? 'wishlist-icon-btn' : 'wishlist-add-btn'
        }
        aria-label={added ? 'Added to Wish List' : 'Add to Wish List'}
        title={added ? 'Added to Wish List' : 'Add to Wish List'}
      >
        <HeartIcon filled={added} />
        {variant === 'button' && (
          <span>{added ? 'Added to Wish List' : busy ? 'Adding…' : 'Add to Wish List'}</span>
        )}
      </button>
    </fetcher.Form>
  );
}
