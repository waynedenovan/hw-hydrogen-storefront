import {describe, it, expect} from 'vitest';

const DEFAULT_LOCALE = {
  language: 'EN',
  country: 'ZA',
  pathPrefix: '',
};

const LOCALE_MAP: Record<string, typeof DEFAULT_LOCALE> = {
  '/en-za': {language: 'EN', country: 'ZA', pathPrefix: '/en-za'},
  '/en-nz': {language: 'EN', country: 'NZ', pathPrefix: '/en-nz'},
  '/en-au': {language: 'EN', country: 'AU', pathPrefix: '/en-au'},
  '/en-us': {language: 'EN', country: 'US', pathPrefix: '/en-us'},
};

function getLocaleFromRequest(request: Request) {
  const url = new URL(request.url);
  const pathPrefix = `/${url.pathname.split('/')[1]?.toLowerCase() ?? ''}`;
  return LOCALE_MAP[pathPrefix] ?? DEFAULT_LOCALE;
}

describe('getLocaleFromRequest', () => {
  it('returns ZA locale for /en-za prefix', () => {
    const request = new Request('http://localhost/en-za/products/test');
    const locale = getLocaleFromRequest(request);
    expect(locale.country).toBe('ZA');
    expect(locale.language).toBe('EN');
    expect(locale.pathPrefix).toBe('/en-za');
  });

  it('returns NZ locale for /en-nz prefix', () => {
    const request = new Request('http://localhost/en-nz/collections');
    const locale = getLocaleFromRequest(request);
    expect(locale.country).toBe('NZ');
    expect(locale.pathPrefix).toBe('/en-nz');
  });

  it('returns AU locale for /en-au prefix', () => {
    const request = new Request('http://localhost/en-au/');
    const locale = getLocaleFromRequest(request);
    expect(locale.country).toBe('AU');
    expect(locale.pathPrefix).toBe('/en-au');
  });

  it('returns US locale for /en-us prefix', () => {
    const request = new Request('http://localhost/en-us/search');
    const locale = getLocaleFromRequest(request);
    expect(locale.country).toBe('US');
    expect(locale.pathPrefix).toBe('/en-us');
  });

  it('returns default ZA locale for root path', () => {
    const request = new Request('http://localhost/');
    const locale = getLocaleFromRequest(request);
    expect(locale.country).toBe('ZA');
    expect(locale.pathPrefix).toBe('');
  });

  it('returns default ZA locale for unrecognized prefix', () => {
    const request = new Request('http://localhost/fr-ca/products/test');
    const locale = getLocaleFromRequest(request);
    expect(locale.country).toBe('ZA');
    expect(locale.pathPrefix).toBe('');
  });

  it('returns default ZA locale for /products path (no locale prefix)', () => {
    const request = new Request('http://localhost/products/some-handle');
    const locale = getLocaleFromRequest(request);
    expect(locale.country).toBe('ZA');
    expect(locale.pathPrefix).toBe('');
  });

  it('is case-insensitive for locale prefix', () => {
    const request = new Request('http://localhost/EN-US/products');
    const locale = getLocaleFromRequest(request);
    expect(locale.country).toBe('US');
    expect(locale.pathPrefix).toBe('/en-us');
  });
});

describe('LOCALE_MAP', () => {
  it('has exactly 4 supported locales', () => {
    expect(Object.keys(LOCALE_MAP)).toHaveLength(4);
  });

  it('all locales use EN language', () => {
    for (const locale of Object.values(LOCALE_MAP)) {
      expect(locale.language).toBe('EN');
    }
  });

  it('all locales have unique country codes', () => {
    const countries = Object.values(LOCALE_MAP).map((l) => l.country);
    expect(new Set(countries).size).toBe(countries.length);
  });
});
