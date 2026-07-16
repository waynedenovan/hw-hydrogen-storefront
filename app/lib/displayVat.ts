import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

// SA standard VAT rate — matches the 15% (OUTPUT3) rate hw-storefront-ui applies
// server-side when invoicing via Xero. Storefront API prices are VAT-exclusive;
// this is DISPLAY ONLY (Product Cards + Detailed Product Card) — cart, checkout,
// and order/invoicing all continue to use the raw exclusive amount untouched.
const DISPLAY_VAT_RATE = 0.15;

export function withDisplayVat<T extends Pick<MoneyV2, 'amount'>>(money: T): T {
  return {
    ...money,
    amount: (parseFloat(money.amount) * (1 + DISPLAY_VAT_RATE)).toFixed(2),
  };
}

// The VAT amount only (not the VAT-inclusive total) — used by Subtotal/VAT/Total
// breakdowns in Cart/Checkout/Order summaries.
export function displayVatOnly<T extends Pick<MoneyV2, 'amount'>>(money: T): T {
  return {
    ...money,
    amount: (parseFloat(money.amount) * DISPLAY_VAT_RATE).toFixed(2),
  };
}
