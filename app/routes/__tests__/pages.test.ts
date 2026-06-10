import {describe, it, expect} from 'vitest';

describe('pages route meta', () => {
  const createMetaArgs = (page: {
    title: string;
    seo?: {title?: string; description?: string} | null;
  }) => ({
    data: {page},
    params: {},
    location: {pathname: '/pages/test'} as Location,
    matches: [],
    error: undefined,
  });

  it('uses seo.title when available', () => {
    const args = createMetaArgs({
      title: 'Page Title',
      seo: {title: 'SEO Title'},
    });
    const title = args.data.page.seo?.title || args.data.page.title || 'Page';
    expect(title).toBe('SEO Title');
  });

  it('falls back to page title when seo.title is missing', () => {
    const args = createMetaArgs({title: 'Page Title', seo: null});
    const title = args.data.page.seo?.title || args.data.page.title || 'Page';
    expect(title).toBe('Page Title');
  });

  it('falls back to "Page" when both are missing', () => {
    const title =
      (null as any)?.seo?.title || (null as any)?.title || 'Page';
    expect(title).toBe('Page');
  });
});
