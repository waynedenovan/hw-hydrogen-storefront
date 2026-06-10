import {useLoaderData, Link} from 'react-router';
import type {LoaderFunctionArgs, MetaFunction} from 'react-router';

export const meta: MetaFunction = () => {
  return [{title: 'Policies | Hoseworld'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const data = await context.storefront.query(POLICIES_QUERY, {
    variables: {
      language: context.storefront.i18n.language,
      country: context.storefront.i18n.country,
    },
    cache: context.storefront.CacheLong(),
  });

  const policies = [
    data.shop.privacyPolicy,
    data.shop.shippingPolicy,
    data.shop.termsOfService,
    data.shop.refundPolicy,
    data.shop.subscriptionPolicy,
  ].filter(Boolean);

  if (policies.length === 0) {
    throw new Response('No policies found', {status: 404});
  }

  return {policies};
}

export default function Policies() {
  const {policies} = useLoaderData<typeof loader>();

  const cardStyle: React.CSSProperties = {
    background: 'rgba(50, 50, 50, 0.85)',
    borderRadius: '6px',
    padding: '1.25rem',
    marginBottom: '0.75rem',
    display: 'block',
    color: 'white',
    textDecoration: 'none',
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
      <h1 style={{fontSize: '1.75rem', marginBottom: '1.5rem'}}>Policies</h1>
      {policies.map((policy) => (
        <Link
          key={policy.handle}
          to={`/policies/${policy.handle}`}
          style={cardStyle}
        >
          <span style={{fontSize: '1.1rem'}}>{policy.title}</span>
          <span
            style={{
              float: 'right',
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            →
          </span>
        </Link>
      ))}
    </div>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy { ...PolicyItem }
      shippingPolicy { ...PolicyItem }
      termsOfService { ...PolicyItem }
      refundPolicy { ...PolicyItem }
      subscriptionPolicy { id title handle }
    }
  }
` as const;
