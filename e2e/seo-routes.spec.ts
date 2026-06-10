import {test, expect} from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5130';

test.describe('SEO Routes', () => {
  test('sitemap.xml returns XML response', async ({request}) => {
    const response = await request.get(`${BASE_URL}/sitemap.xml`);
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'] || '';
    expect(contentType).toContain('xml');
  });

  test('robots.txt returns text/plain response', async ({request}) => {
    const response = await request.get(`${BASE_URL}/robots.txt`);
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'] || '';
    expect(contentType).toContain('text/plain');
  });

  test('robots.txt contains disallow rules', async ({request}) => {
    const response = await request.get(`${BASE_URL}/robots.txt`);
    const body = await response.text();
    expect(body).toContain('User-agent: *');
    expect(body).toContain('Disallow: /admin');
    expect(body).toContain('Disallow: /cart');
    expect(body).toContain('Disallow: /checkout');
    expect(body).toContain('Disallow: /account');
  });

  test('robots.txt contains sitemap directive', async ({request}) => {
    const response = await request.get(`${BASE_URL}/robots.txt`);
    const body = await response.text();
    expect(body).toContain('Sitemap:');
    expect(body).toContain('/sitemap.xml');
  });
});
