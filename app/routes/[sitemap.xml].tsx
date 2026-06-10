import {getSitemapIndex} from '@shopify/hydrogen';
import type {LoaderFunctionArgs} from 'react-router';

export async function loader({request, context}: LoaderFunctionArgs) {
  const response = await getSitemapIndex({
    storefront: context.storefront,
    request,
    types: ['products', 'pages', 'collections', 'metaObjects'],
  });

  response.headers.set('Cache-Control', 'max-age=86400');
  return response;
}
