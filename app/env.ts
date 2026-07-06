// Extends Hydrogen's base `Env` type (declared by @shopify/hydrogen/react-router-types)
// with this project's custom environment variables.
declare global {
  interface Env {
    DEV_TUNNEL_DOMAIN?: string;
    PUBLIC_PAYMENT_GATEWAY?: string;
    STOREFRONT_UI_API_URL?: string;
    INTERNAL_API_SECRET?: string;
    INVOICE_API_SECRET?: string;
    PORT?: string;
  }
}

// Required to make this file a module and enable the augmentation above.
export {};
