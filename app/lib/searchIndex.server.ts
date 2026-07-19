// Server-side weighted search engine (task 2607191820).
//
// The Storefront API's own search()/predictiveSearch() can't rank against this
// project's custom metafields (brand, sub_collection, sub_cat_collection, type),
// which is exactly what the search must cover. So the whole catalog (products +
// collections, with those metafields) is paged into an in-memory index here and
// scored with explicit field weights. Runs only on the server — the /search
// loader dynamic-imports this module (ERR-IMPORT-001: no static server-only
// imports from routes with client components).

import {
  getEmptyPredictiveSearchResult,
  type PredictiveSearchReturn,
  type RegularSearchReturn,
  type SearchBrandResult,
  type SearchCollectionResult,
  type SearchProductResult,
} from '~/lib/search';
import {
  getProductCardImageSrc,
  getSupplierFolderPrefix,
  normalizeProductIdForImage,
} from '~/lib/supplierImages';

// Minimal surface of Hydrogen's storefront client that the index needs; keeps
// this module decoupled from generated types (storefrontapi.generated is stale).
interface StorefrontClient {
  query: (query: string, options?: {variables?: Record<string, unknown>}) => Promise<any>;
}

interface IndexedProduct {
  node: SearchProductResult;
  /** Resolved thumbnail for predictive results: Shopify image or verified local file. */
  imageUrl: string | null;
  imageAlt: string | null;
  // Pre-lowered searchable fields
  title: string;
  externalId: string;
  brand: string;
  subCollection: string;
  subCatCollection: string;
  typeCode: string;
  productType: string;
  vendor: string;
  body: string;
}

interface IndexedCollection {
  node: SearchCollectionResult;
  title: string;
  displayName: string;
  body: string;
}

interface SearchIndex {
  products: IndexedProduct[];
  collections: IndexedCollection[];
  builtAt: number;
}

const PAGE_SIZE = 250;
const MAX_PRODUCT_PAGES = 40; // hard safety cap (10k products)
const CACHE_TTL_MS = 5 * 60 * 1000;

// Field weights: best-match relevance is title/product-code first, then brand,
// then the collection hierarchy names, then generic type/vendor, then long text.
const WEIGHTS = {
  productCode: 12,
  title: 10,
  brand: 8,
  collectionName: 6,
  typeVendor: 4,
  body: 2,
  phraseInTitleBonus: 15,
  titleStartsWithBonus: 5,
};

const indexCache = new Map<string, SearchIndex>();

const SEARCH_INDEX_PRODUCTS_QUERY = `#graphql
  query SearchIndexProducts(
    $first: Int!
    $after: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: $first, after: $after) {
      nodes {
        id
        title
        handle
        vendor
        productType
        description
        featuredImage { url altText width height }
        priceRange { minVariantPrice { amount currencyCode } }
        brand: metafield(namespace: "custom", key: "brand") { value }
        subCollection: metafield(namespace: "custom", key: "sub_collection") { value }
        subCatCollection: metafield(namespace: "custom", key: "sub_cat_collection") { value }
        type: metafield(namespace: "custom", key: "type") { value }
        msq: metafield(namespace: "custom", key: "msq") { value }
        supplierName: metafield(namespace: "custom", key: "supplier_name") { value }
        externalProductId: metafield(namespace: "custom", key: "external_product_id") { value }
        erpLongDescription: metafield(namespace: "custom", key: "erp_long_description") { value }
        variants(first: 1) { nodes { id availableForSale } }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
` as const;

const SEARCH_INDEX_COLLECTIONS_QUERY = `#graphql
  query SearchIndexCollections(
    $first: Int!
    $after: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: $first, after: $after) {
      nodes {
        id
        title
        handle
        description
        image { url altText }
        role: metafield(namespace: "custom", key: "collection_role") { value }
        displayName: metafield(namespace: "custom", key: "display_name") { value }
        parentCollection: metafield(namespace: "custom", key: "parent_collection") { value }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
` as const;

function lower(value: string | null | undefined): string {
  return (value || '').toLowerCase();
}

// Verifies the local supplier-image fallback on disk so predictive thumbnails
// never render dead URLs (same server-side existence pattern as the product
// route's gallery loader, session 2607161525).
async function resolveProductImage(node: SearchProductResult): Promise<{url: string | null; alt: string | null}> {
  if (node.featuredImage?.url) {
    return {url: node.featuredImage.url, alt: node.featuredImage.altText ?? null};
  }
  const localSrc = getProductCardImageSrc(
    node.supplierName?.value,
    node.externalProductId?.value,
  );
  if (!localSrc) return {url: null, alt: null};
  try {
    const [{access}, path] = await Promise.all([
      import('node:fs/promises'),
      import('node:path'),
    ]);
    const root = path.resolve(process.cwd(), 'media', 'suppliers');
    const prefix = getSupplierFolderPrefix(node.supplierName!.value);
    const file = `${normalizeProductIdForImage(node.externalProductId?.value)}.jpg`;
    await access(path.resolve(root, prefix, file));
    return {url: localSrc, alt: node.title};
  } catch {
    return {url: null, alt: null};
  }
}

async function buildIndex(storefront: StorefrontClient): Promise<SearchIndex> {
  const products: IndexedProduct[] = [];
  const collections: IndexedCollection[] = [];

  let after: string | null = null;
  for (let page = 0; page < MAX_PRODUCT_PAGES; page++) {
    const data = await storefront.query(SEARCH_INDEX_PRODUCTS_QUERY, {
      variables: {first: PAGE_SIZE, after},
    });
    const connection = data?.products;
    if (!connection?.nodes?.length) break;
    for (const node of connection.nodes as SearchProductResult[]) {
      const raw = node as SearchProductResult & {
        description?: string | null;
        erpLongDescription?: {value: string} | null;
      };
      const image = await resolveProductImage(node);
      products.push({
        node,
        imageUrl: image.url,
        imageAlt: image.alt,
        title: lower(node.title),
        externalId: lower(normalizeProductIdForImage(node.externalProductId?.value)),
        brand: lower(node.brand?.value),
        subCollection: lower((node as any).subCollection?.value),
        subCatCollection: lower((node as any).subCatCollection?.value),
        typeCode: lower(node.type?.value),
        productType: lower(node.productType),
        vendor: lower(node.vendor),
        body: `${lower(raw.description)} ${lower(raw.erpLongDescription?.value)}`.trim(),
      });
    }
    if (!connection.pageInfo?.hasNextPage) break;
    after = connection.pageInfo.endCursor;
  }

  after = null;
  for (let page = 0; page < 4; page++) {
    const data = await storefront.query(SEARCH_INDEX_COLLECTIONS_QUERY, {
      variables: {first: PAGE_SIZE, after},
    });
    const connection = data?.collections;
    if (!connection?.nodes?.length) break;
    for (const raw of connection.nodes) {
      const node: SearchCollectionResult = {
        id: raw.id,
        title: raw.title,
        handle: raw.handle,
        description: raw.description,
        image: raw.image,
        role: raw.role?.value ?? null,
        displayName: raw.displayName?.value ?? null,
      };
      collections.push({
        node,
        title: lower(node.title),
        displayName: lower(node.displayName),
        body: lower(node.description),
      });
    }
    if (!connection.pageInfo?.hasNextPage) break;
    after = connection.pageInfo.endCursor;
  }

  return {products, collections, builtAt: Date.now()};
}

export async function getSearchIndex(
  storefront: StorefrontClient,
  cacheKey = 'default',
): Promise<SearchIndex> {
  const cached = indexCache.get(cacheKey);
  if (cached && Date.now() - cached.builtAt < CACHE_TTL_MS) return cached;
  const index = await buildIndex(storefront);
  indexCache.set(cacheKey, index);
  return index;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function tokenize(term: string): string[] {
  return lower(term)
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 0);
}

// Per-token field score: whole-word match earns the full weight, substring match
// 60% of it. Summed over tokens so multi-word queries reward fields hitting more
// of the query.
function fieldScore(tokens: string[], text: string, weight: number): number {
  if (!text) return 0;
  let score = 0;
  for (const token of tokens) {
    if (new RegExp(`\\b${escapeRegExp(token)}\\b`).test(text)) {
      score += weight;
    } else if (text.includes(token)) {
      score += weight * 0.6;
    }
  }
  return score;
}

function scoreProduct(entry: IndexedProduct, tokens: string[], phrase: string, compactPhrase: string): number {
  let score = 0;
  score += fieldScore(tokens, entry.title, WEIGHTS.title);
  score += fieldScore(tokens, entry.brand, WEIGHTS.brand);
  score += fieldScore(tokens, entry.subCollection, WEIGHTS.collectionName);
  score += fieldScore(tokens, entry.subCatCollection, WEIGHTS.collectionName);
  score += fieldScore(tokens, entry.typeCode, WEIGHTS.collectionName);
  score += fieldScore(tokens, entry.productType, WEIGHTS.typeVendor);
  score += fieldScore(tokens, entry.vendor, WEIGHTS.typeVendor);
  score += fieldScore(tokens, entry.body, WEIGHTS.body);
  // Product-code lookups: compare against the id with " " and "/" excluded, the
  // same normalization the image matching uses, so "AO757/0813" finds the product.
  if (entry.externalId) {
    if (compactPhrase && entry.externalId === compactPhrase) {
      score += WEIGHTS.productCode * 2;
    } else if (compactPhrase && entry.externalId.includes(compactPhrase)) {
      score += WEIGHTS.productCode;
    } else {
      score += fieldScore(tokens, entry.externalId, WEIGHTS.productCode) * 0.5;
    }
  }
  if (phrase && entry.title.includes(phrase)) {
    score += WEIGHTS.phraseInTitleBonus;
    if (entry.title.startsWith(phrase)) score += WEIGHTS.titleStartsWithBonus;
  }
  return score;
}

function scoreCollection(entry: IndexedCollection, tokens: string[], phrase: string): number {
  let score = 0;
  score += fieldScore(tokens, entry.title, WEIGHTS.title);
  score += fieldScore(tokens, entry.displayName, WEIGHTS.title);
  score += fieldScore(tokens, entry.body, WEIGHTS.body);
  if (phrase && (entry.title.includes(phrase) || entry.displayName.includes(phrase))) {
    score += WEIGHTS.phraseInTitleBonus;
  }
  return score;
}

export interface WeightedSearchResults {
  products: Array<{entry: IndexedProduct; score: number}>;
  collections: Array<{entry: IndexedCollection; score: number}>;
  brands: Array<{name: string; score: number; productCount: number}>;
}

export async function searchCatalog(
  storefront: StorefrontClient,
  term: string,
  cacheKey?: string,
): Promise<WeightedSearchResults> {
  const phrase = lower(term).trim();
  const tokens = tokenize(term);
  if (!tokens.length) return {products: [], collections: [], brands: []};
  const compactPhrase = phrase.replace(/[ /]/g, '');

  const index = await getSearchIndex(storefront, cacheKey);

  const products = index.products
    .map((entry) => ({entry, score: scoreProduct(entry, tokens, phrase, compactPhrase)}))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

  const collections = index.collections
    .map((entry) => ({entry, score: scoreCollection(entry, tokens, phrase)}))
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

  const brandMap = new Map<string, {name: string; score: number; productCount: number}>();
  for (const {node, brand} of index.products) {
    const name = node.brand?.value;
    if (!name || !brand) continue;
    let hit = brandMap.get(brand);
    if (!hit) {
      const score =
        fieldScore(tokens, brand, WEIGHTS.brand) +
        (phrase && brand.includes(phrase) ? WEIGHTS.phraseInTitleBonus : 0);
      hit = {name, score, productCount: 0};
      brandMap.set(brand, hit);
    }
    hit.productCount += 1;
  }
  const brands = [...brandMap.values()]
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

  return {products, collections, brands};
}

/** Shapes weighted results for the predictive-search aside dropdown. */
export function toPredictiveResult(
  term: string,
  results: WeightedSearchResults,
  limit: number,
): PredictiveSearchReturn {
  const products = results.products.slice(0, limit).map(({entry}) => ({
    id: entry.node.id,
    title: entry.node.title,
    handle: entry.node.handle,
    trackingParameters: null,
    selectedOrFirstAvailableVariant: {
      price: entry.node.priceRange?.minVariantPrice ?? null,
      image: entry.imageUrl ? {url: entry.imageUrl, altText: entry.imageAlt} : null,
    },
  }));

  const collections = results.collections.slice(0, limit).map(({entry}) => ({
    id: entry.node.id,
    title: entry.node.displayName || entry.node.title,
    handle: entry.node.handle,
    trackingParameters: null,
    image: entry.node.image ?? null,
  }));

  // Suggestion strings for the input's <datalist>: best-matching collection and
  // brand names.
  const seen = new Set<string>();
  const queries: {text: string}[] = [];
  for (const name of [
    ...results.collections.map(({entry}) => entry.node.displayName || entry.node.title),
    ...results.brands.map(({name}) => name),
  ]) {
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    queries.push({text: name});
    if (queries.length >= limit) break;
  }

  const total = results.products.length + results.collections.length;
  if (!total) {
    return {type: 'predictive', term, result: getEmptyPredictiveSearchResult()};
  }
  return {
    type: 'predictive',
    term,
    result: {
      total,
      items: {articles: [], pages: [], products, collections, queries},
    },
  };
}

/** Shapes weighted results for the full /search results page. */
export function toRegularResult(
  term: string,
  results: WeightedSearchResults,
  maxProducts = 48,
): RegularSearchReturn {
  const mainCollections: SearchCollectionResult[] = [];
  const subCollections: SearchCollectionResult[] = [];
  for (const {entry} of results.collections) {
    if (entry.node.role === 'main') mainCollections.push(entry.node);
    else subCollections.push(entry.node);
  }

  const products = results.products.slice(0, maxProducts).map(({entry}) => entry.node);
  const brands: SearchBrandResult[] = results.brands.map(({name, productCount}) => ({
    name,
    productCount,
  }));

  return {
    type: 'regular',
    term,
    result: {
      total:
        results.products.length +
        results.collections.length +
        results.brands.length,
      items: {products, mainCollections, subCollections, brands},
    },
  };
}
