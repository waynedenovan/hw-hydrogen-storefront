import {describe, it, expect} from 'vitest';
import {
  matchesQuery,
  parseQuery,
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

describe('parseQuery', () => {
  it('extracts a quoted phrase as a single atomic term', () => {
    const parsed = parseQuery('"steel pipe"');
    expect(parsed.hasOperators).toBe(true);
    expect(parsed.groups).toEqual([[{raw: 'steel pipe', phrase: true, regex: expect.any(RegExp)}]]);
    expect(parsed.plainTerms).toEqual(['steel pipe']);
  });

  it('does not flag a plain multi-word query as using operators', () => {
    const parsed = parseQuery('garden hose');
    expect(parsed.hasOperators).toBe(false);
  });

  it('follows Shopify\'s documented precedence: OR binds tighter than AND', () => {
    // shopify.dev's own example: "bob OR norman AND Shopify" == "(bob OR norman) AND Shopify"
    const parsed = parseQuery('bob OR norman AND shopify');
    expect(parsed.groups.map((g) => g.map((t) => t.raw))).toEqual([['bob', 'norman'], ['shopify']]);
  });

  it('treats & and | symbols the same as the AND/OR keywords', () => {
    const words = parseQuery('bob OR norman AND shopify');
    const symbols = parseQuery('bob | norman & shopify');
    expect(symbols.groups.map((g) => g.map((t) => t.raw))).toEqual(
      words.groups.map((g) => g.map((t) => t.raw)),
    );
  });

  it('produces no groups for a connective with nothing around it', () => {
    const parsed = parseQuery('AND');
    expect(parsed.groups).toEqual([]);
    expect(parsed.hasOperators).toBe(true);
  });
});

describe('matchesQuery wildcards', () => {
  it('matches * inline within a field, not just as a prefix', () => {
    const parsed = parseQuery('cam*lock');
    expect(matchesQuery(parsed, ['a camlock example'])).toBe(true);
    expect(matchesQuery(parsed, ['no match here'])).toBe(false);
  });

  it('matches ? as exactly one character', () => {
    const parsed = parseQuery('v?lve');
    expect(matchesQuery(parsed, ['ball valve'])).toBe(true);
    expect(matchesQuery(parsed, ['ball valves'])).toBe(true);
    expect(matchesQuery(parsed, ['ball vlve'])).toBe(false);
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

describe('searchCatalog operators', () => {
  it('exact phrase: matches a title containing the exact phrase, not just its words', async () => {
    const {products} = await search('"garden hose"');
    expect(products.map((p) => p.entry.node.title)).toEqual(['Garden Hose 20mm']);
  });

  it('exact phrase: does not match when the words appear but not adjacent/in order', async () => {
    const {products} = await search('"hose garden"');
    expect(products).toEqual([]);
  });

  it('AND (&): requires every term to be present somewhere', async () => {
    const {products} = await search('gator AND coupling');
    expect(products.map((p) => p.entry.node.title)).toEqual(['Camlock Coupling Type A']);
    const {products: viaSymbol} = await search('gator & coupling');
    expect(viaSymbol.map((p) => p.entry.node.title)).toEqual(['Camlock Coupling Type A']);
  });

  it('OR (|): matches either term', async () => {
    const {products} = await search('ball | garden');
    expect(products.map((p) => p.entry.node.title).sort()).toEqual(['Ball Valve', 'Garden Hose 20mm']);
    const {products: viaWord} = await search('ball OR garden');
    expect(viaWord.map((p) => p.entry.node.title).sort()).toEqual(['Ball Valve', 'Garden Hose 20mm']);
  });

  it('* wildcard: matches inline within a field', async () => {
    const {products} = await search('camlo*');
    expect(products.map((p) => p.entry.node.title).sort()).toEqual([
      'Camlock Coupling Type A',
      'Garden Hose 20mm',
    ]);
  });

  it('? wildcard: matches exactly one character', async () => {
    const {products} = await search('v?lve');
    expect(products.map((p) => p.entry.node.title)).toEqual(['Ball Valve']);
  });

  it('regression: a plain multi-word query with no operators keeps the pre-existing implicit-OR behavior', async () => {
    const {products} = await search('camlock garden');
    expect(products.map((p) => p.entry.node.title).sort()).toEqual([
      'Camlock Coupling Type A',
      'Garden Hose 20mm',
    ]);
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
