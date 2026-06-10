import {getSitemap} from '@shopify/hydrogen';
import type {LoaderFunctionArgs} from 'react-router';

export async function loader({
  request,
  params,
  context: {storefront},
}: LoaderFunctionArgs) {
  const response = await getSitemap({
    storefront,
    request,
    params,
    locales: ['EN-ZA', 'EN-NZ', 'EN-AU', 'EN-US'],
    getLink: ({type, baseUrl, handle, locale}) => {
      const localePrefix = locale ? `/${locale.toLowerCase()}` : '';
      return `${baseUrl}${localePrefix}/${type}/${handle}`;
    },
  });

  response.headers.set('Cache-Control', 'max-age=86400');
  return response;
}
