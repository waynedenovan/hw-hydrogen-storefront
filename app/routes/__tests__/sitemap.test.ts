import {describe, it, expect} from 'vitest';

const getLink = ({
  type,
  baseUrl,
  handle,
  locale,
}: {
  type: string;
  baseUrl: string;
  handle?: string;
  locale?: string;
}) => {
  const localePrefix = locale ? `/${locale.toLowerCase()}` : '';
  return `${baseUrl}${localePrefix}/${type}/${handle}`;
};

describe('sitemap getLink', () => {
  const baseUrl = 'https://example.com';

  it('generates product URLs without locale', () => {
    expect(getLink({type: 'products', baseUrl, handle: 'test-product'})).toBe(
      'https://example.com/products/test-product',
    );
  });

  it('generates product URLs with locale prefix', () => {
    expect(
      getLink({
        type: 'products',
        baseUrl,
        handle: 'test-product',
        locale: 'EN-ZA',
      }),
    ).toBe('https://example.com/en-za/products/test-product');
  });

  it('generates collection URLs with locale prefix', () => {
    expect(
      getLink({
        type: 'collections',
        baseUrl,
        handle: 'clearance',
        locale: 'EN-AU',
      }),
    ).toBe('https://example.com/en-au/collections/clearance');
  });

  it('generates page URLs with locale prefix', () => {
    expect(
      getLink({
        type: 'pages',
        baseUrl,
        handle: 'about-us',
        locale: 'EN-NZ',
      }),
    ).toBe('https://example.com/en-nz/pages/about-us');
  });

  it('lowercases locale in URL', () => {
    expect(
      getLink({
        type: 'products',
        baseUrl,
        handle: 'item',
        locale: 'EN-US',
      }),
    ).toBe('https://example.com/en-us/products/item');
  });
});
