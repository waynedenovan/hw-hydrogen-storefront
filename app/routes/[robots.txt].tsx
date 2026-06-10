import type {LoaderFunctionArgs} from 'react-router';

export function generateRobotsTxt(baseUrl: string): string {
  return [
    'User-agent: *',
    'Disallow: /admin',
    'Disallow: /cart',
    'Disallow: /checkout',
    'Disallow: /account',
    'Disallow: /search',
    'Allow: /',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
  ].join('\n');
}

export async function loader({request}: LoaderFunctionArgs) {
  const baseUrl = new URL(request.url).origin;
  const robotsTxt = generateRobotsTxt(baseUrl);

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'max-age=86400',
    },
  });
}
