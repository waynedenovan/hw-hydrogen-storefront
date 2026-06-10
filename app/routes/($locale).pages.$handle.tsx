import {useLoaderData, redirect} from 'react-router';
import type {LoaderFunctionArgs, MetaFunction} from 'react-router';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: data?.page?.seo?.title || data?.page?.title || 'Page'}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  if (!params.handle) {
    throw new Response('No page handle provided', {status: 400});
  }

  if (params.handle === 'contact') {
    const locale = context.storefront.i18n;
    const prefix = locale.pathPrefix || '';
    throw redirect(`${prefix}/contact`);
  }

  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
      language: context.storefront.i18n.language,
      country: context.storefront.i18n.country,
    },
    cache: context.storefront.CacheLong(),
  });

  if (!page) {
    throw new Response('Page not found', {status: 404});
  }

  return {page};
}

export default function Page() {
  const {page} = useLoaderData<typeof loader>();

  const cardStyle: React.CSSProperties = {
    background: 'rgba(50, 50, 50, 0.85)',
    borderRadius: '6px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem 1rem',
        color: 'white',
      }}
    >
      <h1 style={{fontSize: '1.75rem', marginBottom: '1.5rem'}}>
        {page.title}
      </h1>
      <div style={cardStyle}>
        <div
          dangerouslySetInnerHTML={{__html: page.body}}
          style={{lineHeight: '1.6'}}
        />
      </div>
    </div>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $handle: String!
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      handle
      seo {
        title
        description
      }
    }
  }
` as const;
