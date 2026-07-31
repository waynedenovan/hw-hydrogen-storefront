import {useEffect} from 'react';
import {useCustomerPrivacy} from '@shopify/hydrogen';
import type {CookieConsent} from '~/lib/cookieConsent.server';

interface CustomerPrivacySyncProps {
  storefrontAccessToken: string;
  checkoutDomain: string;
  consent: CookieConsent | null;
}

// Syncs our custom cookie-consent banner's choice into Shopify's own Customer
// Privacy API, per shopify.dev's documented pattern for storefronts using a
// custom consent banner instead of Shopify's built-in one (root.tsx already
// sets consent.withPrivacyBanner: false). Without this, Shopify-side
// consent-aware behavior (Customer Events/pixels configured in Shopify Admin,
// Shop Pay, checkout tracking) would never learn the visitor's choice.
// Note: Shopify's built-in cookie banner must also be removed in Shopify
// Admin > Settings > Customer Privacy > Cookie banner — that's an external,
// dashboard-only step this repo cannot perform.
export function CustomerPrivacySync({
  storefrontAccessToken,
  checkoutDomain,
  consent,
}: CustomerPrivacySyncProps) {
  const {customerPrivacy} = useCustomerPrivacy({
    storefrontAccessToken,
    checkoutDomain,
  });

  useEffect(() => {
    if (!customerPrivacy?.setTrackingConsent || !consent) return;
    customerPrivacy.setTrackingConsent(
      {
        marketing: consent.marketing,
        analytics: consent.analytics,
        preferences: consent.functional,
        sale_of_data: consent.marketing,
      },
      (result) => {
        if (result?.error) {
          console.error('Error syncing cookie consent to Shopify:', result.error);
        }
      },
    );
  }, [customerPrivacy, consent]);

  return null;
}
