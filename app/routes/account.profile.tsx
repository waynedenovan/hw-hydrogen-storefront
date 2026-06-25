import {Form, useActionData, useOutletContext, useLoaderData} from 'react-router';
import {useState} from 'react';
import type {ActionFunctionArgs, LoaderFunctionArgs} from 'react-router';
import {CUSTOMER_UPDATE_MUTATION} from '~/graphql/customer-account/CustomerUpdateMutation';
import type {CustomerDetailsQuery} from 'customer-accountapi.generated';

type AccountContext = {
  customer: CustomerDetailsQuery['customer'];
};

const CUSTOMER_EMAIL_QUERY = `#graphql
  query CustomerEmail {
    customer {
      id
      emailAddress {
        emailAddress
      }
    }
  }
` as const;

export async function loader({context}: LoaderFunctionArgs) {
  const env = context.env as any;
  const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
  const internalSecret: string = env.INTERNAL_API_SECRET ?? '';

  let businessProfile = {companyName: '', regNumber: '', vatNumber: ''};

  try {
    const isLoggedIn = await context.customerAccount.isLoggedIn();
    if (isLoggedIn && storefrontUiUrl) {
      const {data} = await context.customerAccount.query(CUSTOMER_EMAIL_QUERY);
      const email = (data as any)?.customer?.emailAddress?.emailAddress ?? '';
      if (email) {
        const res = await fetch(
          `${storefrontUiUrl}/api/customer/business?email=${encodeURIComponent(email)}`,
          {headers: {'X-Internal-Secret': internalSecret}},
        );
        if (res.ok) {
          const data = (await res.json()) as typeof businessProfile;
          businessProfile = data;
        }
      }
    }
  } catch {
    // non-blocking — profile just won't be pre-filled
  }

  return {businessProfile};
}

export async function action({context, request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent') as string;

  if (intent === 'update') {
    const {data, errors} = await context.customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer: {
            firstName: String(formData.get('firstName') || ''),
            lastName: String(formData.get('lastName') || ''),
          },
        },
      },
    );

    if (errors?.length) {
      return {error: errors[0].message, intent};
    }

    if (data?.customerUpdate?.userErrors?.length) {
      return {error: data.customerUpdate.userErrors[0].message, intent};
    }

    return {success: true, intent: 'update'};
  }

  if (intent === 'update-business') {
    const env = context.env as any;
    const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
    const internalSecret: string = env.INTERNAL_API_SECRET ?? '';

    if (!storefrontUiUrl) {
      return {error: 'Business profile service is not configured.', intent};
    }

    try {
      // Get customer email for keying the profile
      const {data: idData} = await context.customerAccount.query(CUSTOMER_EMAIL_QUERY);
      const email = (idData as any)?.customer?.emailAddress?.emailAddress ?? '';
      const shopifyCustomerId = (idData as any)?.customer?.id ?? '';

      if (!email) {
        return {error: 'Could not identify customer.', intent};
      }

      const companyName = String(formData.get('companyName') || '');
      const regNumber = String(formData.get('regNumber') || '');
      const vatNumber = String(formData.get('vatNumber') || '');

      const res = await fetch(`${storefrontUiUrl}/api/customer/business`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Internal-Secret': internalSecret,
        },
        body: JSON.stringify({shopifyCustomerId, email, companyName, regNumber, vatNumber}),
      });

      if (!res.ok) {
        return {error: 'Failed to save business details.', intent};
      }

      return {success: true, intent: 'update-business', companyName, regNumber, vatNumber};
    } catch {
      return {error: 'Could not reach profile service.', intent};
    }
  }

  return {error: 'Unknown action', intent: 'unknown'};
}

export default function AccountProfile() {
  const {customer} = useOutletContext<AccountContext>();
  const {businessProfile} = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [isBusinessCustomer, setIsBusinessCustomer] = useState(
    !!(businessProfile.companyName || businessProfile.regNumber || businessProfile.vatNumber),
  );
  const [companyName, setCompanyName] = useState(businessProfile.companyName ?? '');
  const [regNumber, setRegNumber] = useState(businessProfile.regNumber ?? '');
  const [vatNumber, setVatNumber] = useState(businessProfile.vatNumber ?? '');

  // Sync saved business data back after successful update
  const savedBusiness =
    actionData && 'success' in actionData && actionData.intent === 'update-business'
      ? (actionData as any)
      : null;

  const inputStyle = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '4px',
    color: 'white',
    fontSize: '0.875rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.25rem',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.875rem',
  };

  const cardStyle = {
    background: 'rgba(50, 50, 50, 0.85)',
    borderRadius: '6px',
    padding: '1.25rem',
  };

  const actionError = actionData && 'error' in actionData ? actionData.error : null;

  return (
    <div>
      <h2 style={{fontSize: '1.25rem', marginBottom: '1rem'}}>Profile</h2>

      {actionData && 'success' in actionData && actionData.intent === 'update' && (
        <p style={{color: '#68d391', marginBottom: '1rem'}}>Profile updated.</p>
      )}
      {actionData && 'success' in actionData && actionData.intent === 'update-business' && (
        <p style={{color: '#68d391', marginBottom: '1rem'}}>Business details saved.</p>
      )}
      {actionError && (
        <p style={{color: '#fc8181', marginBottom: '1rem'}}>{actionError}</p>
      )}

      {/* Personal details */}
      <Form method="post" style={{...cardStyle, marginBottom: '1rem'}}>
        <input type="hidden" name="intent" value="update" />
        <div style={{marginBottom: '1rem'}}>
          <label htmlFor="firstName" style={labelStyle}>
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            defaultValue={customer.firstName ?? ''}
            style={inputStyle}
          />
        </div>

        <div style={{marginBottom: '1.5rem'}}>
          <label htmlFor="lastName" style={labelStyle}>
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            defaultValue={customer.lastName ?? ''}
            style={inputStyle}
          />
        </div>

        <button
          type="submit"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: '0.5rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
      </Form>

      {/* Business details */}
      <div style={cardStyle}>
        <h3 style={{fontSize: '1rem', marginBottom: '0.75rem', color: 'rgba(255,255,255,0.9)'}}>
          Business Details
        </h3>
        <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '1rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)'}}>
          <input
            type="checkbox"
            checked={isBusinessCustomer}
            onChange={(e) => setIsBusinessCustomer(e.target.checked)}
            style={{width: 'auto', margin: 0}}
          />
          This account is used for business purchases
        </label>

        {isBusinessCustomer && (
          <Form method="post">
            <input type="hidden" name="intent" value="update-business" />
            <div style={{marginBottom: '0.75rem'}}>
              <label htmlFor="companyName" style={labelStyle}>Company name</label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme (Pty) Ltd"
                style={inputStyle}
              />
            </div>
            <div style={{marginBottom: '0.75rem'}}>
              <label htmlFor="bizRegNumber" style={labelStyle}>
                Business registration number
              </label>
              <input
                id="bizRegNumber"
                name="regNumber"
                type="text"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                placeholder="XXXX/XXXXXX/XX"
                style={inputStyle}
              />
            </div>
            <div style={{marginBottom: '1.25rem'}}>
              <label htmlFor="bizVatNumber" style={labelStyle}>
                VAT / Tax number (SARS VAT number)
              </label>
              <input
                id="bizVatNumber"
                name="vatNumber"
                type="text"
                value={vatNumber}
                onChange={(e) => setVatNumber(e.target.value)}
                placeholder="4XXXXXXXXX"
                style={inputStyle}
              />
            </div>
            <button
              type="submit"
              style={{
                background: 'rgba(26,180,215,0.15)',
                color: 'rgba(26,180,215,0.9)',
                border: '1px solid rgba(26,180,215,0.3)',
                padding: '0.5rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              Save Business Details
            </button>
          </Form>
        )}
      </div>
    </div>
  );
}
