import {describe, it, expect} from 'vitest';
import {
  searchCatalog,
  tokenize,
  toPredictiveResult,
  toRegularResult,
} from '~/lib/searchIndex.server';

function product(overrides: Record<string, unknown>) {
  return {
    id: `gid://shopify/Product/${Math.random()}`,
    title: 'Untitled',
    handle: 'untitled',
    vendor: 'Hoseworld',
    productType: '',
    description: '',
    featuredImage: {url: 'https://cdn.shopify.com/x.jpg', altText: null},
    priceRange: {minVariantPrice: {amount: '10.0', currencyCode: 'ZAR'}},
    brand: null,
    subCollection: null,
    subCatCollection: null,
    type: null,
    msq: null,
    supplierName: null,
    externalProductId: null,
    erpLongDescription: null,
    variants: {nodes: [{id: 'gid://shopify/ProductVariant/1', availableForSale: true}]},
    ...overrides,
  };
}

function collection(overrides: Record<string, unknown>) {
  return {
    id: `gid://shopify/Collection/${Math.random()}`,
    title: 'Untitled',
    handle: 'untitled',
    description: '',
    image: null,
    role: null,
    displayName: null,
    parentCollection: null,
    ...overrides,
  };
}

const PRODUCTS = [
  product({
    title: 'Camlock Coupling Type A',
    handle: 'camlock-coupling-type-a',
    brand: {value: 'GATOR'},
    subCollection: {value: 'AC BINDING'},
    subCatCollection: {value: 'ACAE TWINE'},
    externalProductId: {value: 'AO757/0813'},
    supplierName: {value: 'Agrinet'},
  }),
  product({
    title: 'Garden Hose 20mm',
    handle: 'garden-hose-20mm',
    brand: {value: 'CEPEX'},
    description: 'A flexible camlock-compatible hose for irrigation.',
  }),
  product({
    title: 'Ball Valve',
    handle: 'ball-valve',
    brand: {value: 'CEPEX'},
  }),
];

const COLLECTIONS = [
  collection({title: 'FB CAMLOCK', displayName: {value: 'CAMLOCK'}, role: {value: 'sub'}}),
  collection({title: 'Agricultural', role: {value: 'main'}}),
  collection({title: 'Watering'}),
];

// Storefront stub: one page of products, one page of collections.
function makeStorefront() {
  return {
    query: async (query: string) => {
      if (query.includes('SearchIndexProducts')) {
        return {products: {nodes: PRODUCTS, pageInfo: {hasNextPage: false, endCursor: null}}};
      }
      return {collections: {nodes: COLLECTIONS, pageInfo: {hasNextPage: false, endCursor: null}}};
    },
  };
}

let cacheCounter = 0;
function search(term: string) {
  return searchCatalog(makeStorefront(), term, `test-${cacheCounter++}`);
}

describe('tokenize', () => {
  it('lowercases and splits on non-alphanumerics', () => {
    expect(tokenize('Camlock  Coupling/Type-A')).toEqual(['camlock', 'coupling', 'type', 'a']);
  });
});

describe('searchCatalog weighting', () => {
  it('ranks a title match above a description match', async () => {
    const {products} = await search('camlock');
    expect(products.length).toBe(2);
    expect(products[0].entry.node.title).toBe('Camlock Coupling Type A');
    expect(products[1].entry.node.title).toBe('Garden Hose 20mm');
    expect(products[0].score).toBeGreaterThan(products[1].score);
  });

  it('matches brand names', async () => {
    const {products, brands} = await search('cepex');
    expect(products.map((p) => p.entry.node.title).sort()).toEqual([
      'Ball Valve',
      'Garden Hose 20mm',
    ]);
    expect(brands).toHaveLength(1);
    expect(brands[0].name).toBe('CEPEX');
    expect(brands[0].productCount).toBe(2);
  });

  it('matches sub and sub_cat collection metafields', async () => {
    const {products} = await search('twine');
    expect(products).toHaveLength(1);
    expect(products[0].entry.node.title).toBe('Camlock Coupling Type A');
  });

  it('finds a product by its code with " " and "/" excluded', async () => {
    for (const term of ['AO757/0813', 'AO7570813', 'ao757 0813']) {
      const {products} = await search(term);
      expect(products[0]?.entry.node.title, `term: ${term}`).toBe(
        'Camlock Coupling Type A',
      );
    }
  });

  it('matches collections by title and display name', async () => {
    const {collections} = await search('camlock');
    expect(collections).toHaveLength(1);
    expect(collections[0].entry.node.title).toBe('FB CAMLOCK');
  });

  it('returns nothing for an empty term', async () => {
    const {products, collections, brands} = await search('   ');
    expect(products).toEqual([]);
    expect(collections).toEqual([]);
    expect(brands).toEqual([]);
  });
});

describe('result shaping', () => {
  it('toPredictiveResult produces the aside dropdown shape', async () => {
    const predictive = toPredictiveResult('camlock', await search('camlock'), 5);
    expect(predictive.type).toBe('predictive');
    expect(predictive.result.total).toBeGreaterThan(0);
    const {products, collections, queries, articles, pages} = predictive.result.items;
    expect(articles).toEqual([]);
    expect(pages).toEqual([]);
    expect(products[0].title).toBe('Camlock Coupling Type A');
    expect(products[0].selectedOrFirstAvailableVariant?.price?.currencyCode).toBe('ZAR');
    expect(collections[0].title).toBe('CAMLOCK');
    expect(queries.map((q) => q.text)).toContain('CAMLOCK');
  });

  it('toRegularResult groups collections by role and lists brands', async () => {
    const regular = toRegularResult('camlock', await search('camlock'));
    expect(regular.type).toBe('regular');
    expect(regular.result.items.subCollections.map((c) => c.title)).toEqual(['FB CAMLOCK']);
    expect(regular.result.items.mainCollections).toEqual([]);
    expect(regular.result.items.products[0].title).toBe('Camlock Coupling Type A');
  });

  it('empty search returns the empty predictive shape', async () => {
    const predictive = toPredictiveResult('zzz', await search('zzznotfound'), 5);
    expect(predictive.result.total).toBe(0);
    expect(predictive.result.items.products).toEqual([]);
  });
});
