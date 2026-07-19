// Shared types for the storefront search feature (task 2607191820).
//
// The previous version of this file typed the search results off
// storefrontapi.generated PredictiveSearchQuery/RegularSearchQuery types that
// were never generated (no predictive GraphQL query ever existed in this repo,
// so the aside's predictive dropdown was permanently empty). Search is now
// served by our own server-side weighted engine (app/lib/searchIndex.server.ts),
// so the shapes are declared concretely here — the /search loader produces them
// and SearchFormPredictive/SearchResultsPredictive consume them.

import type {CurrencyCode} from '@shopify/hydrogen/storefront-api-types';

export interface SearchMoneyV2 {
  amount: string;
  currencyCode: CurrencyCode;
}

export interface SearchImage {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

/** Product entry shaped for the predictive-search dropdown items. */
export interface PredictiveProductItem {
  id: string;
  title: string;
  handle: string;
  trackingParameters?: string | null;
  selectedOrFirstAvailableVariant?: {
    price?: SearchMoneyV2 | null;
    image?: SearchImage | null;
  } | null;
}

export interface PredictiveCollectionItem {
  id: string;
  title: string;
  handle: string;
  trackingParameters?: string | null;
  image?: SearchImage | null;
}

export interface PredictivePageItem {
  id: string;
  title: string;
  handle: string;
  trackingParameters?: string | null;
}

export interface PredictiveArticleItem {
  id: string;
  title: string;
  handle: string;
  trackingParameters?: string | null;
  blog: {handle: string};
  image?: SearchImage | null;
}

export interface PredictiveQueryItem {
  text: string;
  styledText?: string | null;
  trackingParameters?: string | null;
}

export interface PredictiveSearchItems {
  articles: PredictiveArticleItem[];
  collections: PredictiveCollectionItem[];
  pages: PredictivePageItem[];
  products: PredictiveProductItem[];
  queries: PredictiveQueryItem[];
}

export type PredictiveSearchReturn = {
  type: 'predictive';
  term: string;
  error?: string;
  result: {total: number; items: PredictiveSearchItems};
};

/** Full product entry for the regular /search results page (ProductCard-compatible). */
export interface SearchProductResult {
  id: string;
  title: string;
  handle: string;
  vendor?: string | null;
  productType?: string | null;
  featuredImage?: SearchImage | null;
  priceRange: {minVariantPrice: SearchMoneyV2};
  brand?: {value: string} | null;
  type?: {value: string} | null;
  msq?: {value: string} | null;
  supplierName?: {value: string} | null;
  externalProductId?: {value: string} | null;
  variants?: {nodes: {id: string; availableForSale: boolean}[]} | null;
}

export interface SearchCollectionResult {
  id: string;
  title: string;
  handle: string;
  description?: string | null;
  image?: SearchImage | null;
  /** custom.collection_role — "main", "sub", or unset. */
  role?: string | null;
  /** custom.display_name — cleaned display name when set. */
  displayName?: string | null;
}

export interface SearchBrandResult {
  name: string;
  productCount: number;
}

export type RegularSearchReturn = {
  type: 'regular';
  term: string;
  error?: string;
  result: {
    total: number;
    items: {
      products: SearchProductResult[];
      mainCollections: SearchCollectionResult[];
      subCollections: SearchCollectionResult[];
      brands: SearchBrandResult[];
    };
  };
};

/**
 * Returns the empty state of a predictive search result to reset the search state.
 */
export function getEmptyPredictiveSearchResult(): PredictiveSearchReturn['result'] {
  return {
    total: 0,
    items: {
      articles: [],
      collections: [],
      products: [],
      pages: [],
      queries: [],
    },
  };
}

interface UrlWithTrackingParams {
  /** The base URL to which the tracking parameters will be appended. */
  baseUrl: string;
  /** The trackingParams returned by the Storefront API. */
  trackingParams?: string | null;
  /** Any additional query parameters to be appended to the URL. */
  params?: Record<string, string>;
  /** The search term to be appended to the URL. */
  term: string;
}

/**
 * A utility function that appends tracking parameters to a URL. Tracking parameters are
 * used internally by Shopify to enhance search results and admin dashboards.
 */
export function urlWithTrackingParams({
  baseUrl,
  trackingParams,
  params: extraParams,
  term,
}: UrlWithTrackingParams) {
  let search = new URLSearchParams({
    ...extraParams,
    q: encodeURIComponent(term),
  }).toString();

  if (trackingParams) {
    search = `${search}&${trackingParams}`;
  }

  return `${baseUrl}?${search}`;
}
