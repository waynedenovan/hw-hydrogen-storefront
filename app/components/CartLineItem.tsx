import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import type {CartLayout, LineItemChildrenMap} from '~/components/CartMain';
import {CartForm, Image, type OptimisticCartLine} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {Link, useFetcher} from 'react-router';
import {useRef} from 'react';
import {ProductPrice} from './ProductPrice';
import {useAside} from './Aside';
import type {
  CartApiQueryFragment,
  CartLineFragment,
} from 'storefrontapi.generated';

export type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 * If the line is a parent line that has child components (like warranties or gift wrapping), they are
 * rendered nested below the parent line.
 */
export function CartLineItem({
  layout,
  line,
  childrenMap,
}: {
  layout: CartLayout;
  line: CartLine;
  childrenMap: LineItemChildrenMap;
}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside();
  const lineItemChildren = childrenMap[id];
  const childrenLabelId = `cart-line-children-${id}`;

  return (
    <li key={id} className="cart-line">
      <div className="cart-line-inner">
        {image && (
          <Image
            alt={title}
            aspectRatio="1/1"
            data={image}
            height={100}
            loading="lazy"
            width={100}
          />
        )}

        <div>
          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') {
                close();
              }
            }}
          >
            <p>
              <strong>{product.title}</strong>
            </p>
          </Link>
          <ProductPrice price={line?.cost?.totalAmount} />
          <ul>
            {selectedOptions.map((option) => (
              <li key={option.name}>
                <small>
                  {option.name}: {option.value}
                </small>
              </li>
            ))}
          </ul>
          <CartLineQuantity line={line} />
        </div>
      </div>

      {lineItemChildren ? (
        <div>
          <p id={childrenLabelId} className="sr-only">
            Line items with {product.title}
          </p>
          <ul aria-labelledby={childrenLabelId} className="cart-line-children">
            {lineItemChildren.map((childLine) => (
              <CartLineItem
                childrenMap={childrenMap}
                key={childLine.id}
                line={childLine}
                layout={layout}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 */
function CartLineQuantity({line}: {line: CartLine}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic, merchandise} = line;
  const msqValue = Number(merchandise?.product?.msq?.value);
  // MOQ (minimum order quantity): a product with one steps/rounds the Qty
  // field in multiples of it instead of 1 — see moq_cart_msq_stepping pattern.
  const msq = Number.isFinite(msqValue) && msqValue > 1 ? msqValue : 1;
  const prevQuantity = Number(Math.max(msq, quantity - msq).toFixed(0));
  const nextQuantity = Number((quantity + msq).toFixed(0));
  const inputRef = useRef<HTMLInputElement>(null);
  // Separate key so this fetcher doesn't share state with the +/- CartForm buttons
  const fetcher = useFetcher({key: getUpdateKey([lineId]) + '-input'});

  function submitQuantity(rawQty: number) {
    if (!Number.isFinite(rawQty)) {
      if (inputRef.current) inputRef.current.value = String(quantity);
      return;
    }
    // Round manual entry to the closest multiple of msq, floored at msq itself
    // — a MOQ product can never have fewer than msq in the cart while the line
    // still exists, so anything below msq rounds UP to msq rather than down to 0.
    const newQty = Math.max(msq, Math.round(rawQty / msq) * msq);
    if (inputRef.current) inputRef.current.value = String(newQty);
    if (newQty === quantity) return;
    const formData = new FormData();
    formData.append(
      'cartFormInput',
      JSON.stringify({
        action: CartForm.ACTIONS.LinesUpdate,
        inputs: {lines: [{id: lineId, quantity: newQty}]},
      }),
    );
    fetcher.submit(formData, {method: 'POST', action: '/cart'});
  }

  return (
    <div className="cart-line-quantity">
      <div className="cart-line-qty-controls">
        <label htmlFor={`qty-${lineId}`} className="sr-only">Qty</label>
        <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= msq || !!isOptimistic}
            name="decrease-quantity"
            value={prevQuantity}
          >
            <span>&#8722;</span>
          </button>
        </CartLineUpdateButton>
        <input
          key={quantity}
          id={`qty-${lineId}`}
          ref={inputRef}
          type="number"
          className="cart-line-qty-input"
          defaultValue={quantity}
          min={msq}
          step={msq}
          disabled={!!isOptimistic}
          aria-label="Quantity"
          onBlur={(e) => submitQuantity(parseInt(e.target.value, 10))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              (e.target as HTMLInputElement).blur();
            }
          }}
        />
        <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            aria-label="Increase quantity"
            name="increase-quantity"
            value={nextQuantity}
            disabled={!!isOptimistic}
          >
            <span>&#43;</span>
          </button>
        </CartLineUpdateButton>
      </div>
      {msq > 1 && (
        <p className="cart-line-moq-note">Sold in multiples of {msq}</p>
      )}
      <div className="cart-line-remove">
        <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
      </div>
    </div>
  );
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 */
function CartLineRemoveButton({
  lineIds,
  disabled,
}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      fetcherKey={getRemoveKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button disabled={disabled} type="submit">
        Remove
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}

function getRemoveKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesRemove, ...lineIds].join('-');
}
