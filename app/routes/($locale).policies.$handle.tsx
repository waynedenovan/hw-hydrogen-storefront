import {useLoaderData, Link} from 'react-router';
import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import type {Shop} from '@shopify/hydrogen/storefront-api-types';

type SelectedPolicies = keyof Pick<
  Shop,
  'privacyPolicy' | 'shippingPolicy' | 'termsOfService' | 'refundPolicy'
>;

export function policyHandleToFieldName(handle: string): string {
  return handle.replace(/-([a-z])/g, (_: unknown, m1: string) =>
    m1.toUpperCase(),
  );
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `${data?.policy?.title ?? 'Policy'} | Hoseworld`}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  if (!params.handle) {
    throw new Response('No policy handle provided', {status: 400});
  }

  const policyName = policyHandleToFieldName(params.handle) as SelectedPolicies;

  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n.language,
      country: context.storefront.i18n.country,
    },
    cache: context.storefront.CacheLong(),
  });

  const policy = data.shop?.[policyName];

  if (!policy) {
    throw new Response('Policy not found', {status: 404});
  }

  return {policy};
}

export default function Policy() {
  const {policy} = useLoaderData<typeof loader>();

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
      <div style={{marginBottom: '1rem'}}>
        <Link
          to="/policies"
          style={{color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none'}}
        >
          ← Back to Policies
        </Link>
      </div>
      <h1 style={{fontSize: '1.75rem', marginBottom: '1.5rem'}}>
        {policy.title}
      </h1>
      <div style={cardStyle}>
        <div
          dangerouslySetInnerHTML={{__html: policy.body}}
          style={{lineHeight: '1.6'}}
        />
      </div>
    </div>
  );
}

const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) { ...Policy }
      shippingPolicy @include(if: $shippingPolicy) { ...Policy }
      termsOfService @include(if: $termsOfService) { ...Policy }
      refundPolicy @include(if: $refundPolicy) { ...Policy }
    }
  }
` as const;
