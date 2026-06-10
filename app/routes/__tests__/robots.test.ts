import {describe, it, expect} from 'vitest';
import {generateRobotsTxt} from '../[robots.txt]';

describe('robots.txt', () => {
  const baseUrl = 'https://example.com';
  const content = generateRobotsTxt(baseUrl);

  it('includes User-agent wildcard', () => {
    expect(content).toContain('User-agent: *');
  });

  it('disallows admin, cart, checkout, account, and search', () => {
    expect(content).toContain('Disallow: /admin');
    expect(content).toContain('Disallow: /cart');
    expect(content).toContain('Disallow: /checkout');
    expect(content).toContain('Disallow: /account');
    expect(content).toContain('Disallow: /search');
  });

  it('allows root path', () => {
    expect(content).toContain('Allow: /');
  });

  it('includes sitemap directive with correct URL', () => {
    expect(content).toContain(`Sitemap: ${baseUrl}/sitemap.xml`);
  });

  it('uses the provided base URL', () => {
    const customContent = generateRobotsTxt('https://hoseworld.co.nz');
    expect(customContent).toContain(
      'Sitemap: https://hoseworld.co.nz/sitemap.xml',
    );
  });
});
