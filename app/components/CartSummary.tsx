import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Money, type OptimisticCart} from '@shopify/hydrogen';
import {useEffect, useRef} from 'react';
import {Link, useFetcher, useLocation} from 'react-router';
import {useAside} from '~/components/Aside';
import {withDisplayVat, displayVatOnly} from '~/lib/displayVat';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
  isCartUpdating?: boolean;
};

export function CartSummary({cart, layout, isCartUpdating}: CartSummaryProps) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';

  return (
    <div aria-labelledby="cart-summary" className={className}>
      <h4>Totals</h4>
      <dl className="cart-subtotal">
        <dt>Subtotal (excl. VAT)</dt>
        <dd>
          {cart?.cost?.subtotalAmount?.amount ? (
            <Money data={cart?.cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </dl>
      {cart?.cost?.subtotalAmount?.amount && (
        <>
          <dl className="cart-vat">
            <dt>VAT</dt>
            <dd>
              <Money data={displayVatOnly(cart.cost.subtotalAmount)} />
            </dd>
          </dl>
          <dl className="cart-total-incl-vat">
            <dt>Total (incl. VAT)</dt>
            <dd>
              <Money data={withDisplayVat(cart.cost.subtotalAmount)} />
            </dd>
          </dl>
        </>
      )}
      {layout === 'page' && <CartDiscounts discountCodes={cart?.discountCodes} />}
      {layout === 'page' && <CartGiftCard giftCardCodes={cart?.appliedGiftCards} />}
      <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} isCartUpdating={isCartUpdating} />
    </div>
  );
}

function CartCheckoutActions({
  checkoutUrl,
  isCartUpdating,
}: {
  checkoutUrl?: string;
  isCartUpdating?: boolean;
}) {
  if (!checkoutUrl) return null;

  const {close} = useAside();
  const location = useLocation();
  const localeMatch = location.pathname.match(/^\/(en-nz|en-au|en-us|en-za)/);
  const localePrefix = localeMatch ? localeMatch[0] : '';

  function handleCheckoutClick(e: React.MouseEvent) {
    if (isCartUpdating) {
      e.preventDefault();
      return;
    }
    close();
  }

  return (
    <div className="cart-checkout-actions">
      <Link
        to={`${localePrefix}/checkout`}
        onClick={handleCheckoutClick}
        className={`checkout-primary-btn${isCartUpdating ? ' checkout-btn-disabled' : ''}`}
        aria-disabled={isCartUpdating}
        style={isCartUpdating ? {opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none'} : undefined}
      >
        {isCartUpdating ? 'Updating cart…' : 'Proceed to Checkout →'}
      </Link>
    </div>
  );
}

function CartDiscounts({
  discountCodes,
}: {
  discountCodes?: CartApiQueryFragment['discountCodes'];
}) {
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div>
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length}>
        <div>
          <dt>Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="cart-discount">
              <code>{codes?.join(', ')}</code>
              &nbsp;
              <button type="submit" aria-label="Remove discount">
                Remove
              </button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div>
          <label htmlFor="discount-code-input" className="sr-only">
            Discount code
          </label>
          <input
            id="discount-code-input"
            type="text"
            name="discountCode"
            placeholder="Discount code"
          />
          &nbsp;
          <button type="submit" aria-label="Apply discount code">
            Apply
          </button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartGiftCard({
  giftCardCodes,
}: {
  giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
}) {
  const giftCardCodeInput = useRef<HTMLInputElement>(null);
  const giftCardAddFetcher = useFetcher({key: 'gift-card-add'});

  useEffect(() => {
    if (giftCardAddFetcher.data) {
      giftCardCodeInput.current!.value = '';
    }
  }, [giftCardAddFetcher.data]);

  return (
    <div>
      {giftCardCodes && giftCardCodes.length > 0 && (
        <dl>
          <dt>Applied Gift Card(s)</dt>
          {giftCardCodes.map((giftCard) => (
            <RemoveGiftCardForm key={giftCard.id} giftCardId={giftCard.id}>
              <div className="cart-discount">
                <code>***{giftCard.lastCharacters}</code>
                &nbsp;
                <Money data={giftCard.amountUsed} />
                &nbsp;
                <button type="submit">Remove</button>
              </div>
            </RemoveGiftCardForm>
          ))}
        </dl>
      )}

      <AddGiftCardForm fetcherKey="gift-card-add">
        <div>
          <input
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            ref={giftCardCodeInput}
          />
          &nbsp;
          <button type="submit" disabled={giftCardAddFetcher.state !== 'idle'}>
            Apply
          </button>
        </div>
      </AddGiftCardForm>
    </div>
  );
}

function AddGiftCardForm({
  fetcherKey,
  children,
}: {
  fetcherKey?: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      fetcherKey={fetcherKey}
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesAdd}
    >
      {children}
    </CartForm>
  );
}

function RemoveGiftCardForm({
  giftCardId,
  children,
}: {
  giftCardId: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesRemove}
      inputs={{
        giftCardCodes: [giftCardId],
      }}
    >
      {children}
    </CartForm>
  );
}
