import {Form, useActionData, useOutletContext} from 'react-router';
import type {ActionFunctionArgs} from 'react-router';
import {CUSTOMER_UPDATE_MUTATION} from '~/graphql/customer-account/CustomerUpdateMutation';
import type {CustomerDetailsQuery} from 'customer-accountapi.generated';

type AccountContext = {
  customer: CustomerDetailsQuery['customer'];
};

export async function action({context, request}: ActionFunctionArgs) {
  const formData = await request.formData();

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
    return {error: errors[0].message};
  }

  if (data?.customerUpdate?.userErrors?.length) {
    return {error: data.customerUpdate.userErrors[0].message};
  }

  return {success: true};
}

export default function AccountProfile() {
  const {customer} = useOutletContext<AccountContext>();
  const actionData = useActionData<typeof action>();

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

  return (
    <div>
      <h2 style={{fontSize: '1.25rem', marginBottom: '1rem'}}>Profile</h2>

      {actionData && 'success' in actionData && (
        <p style={{color: '#68d391', marginBottom: '1rem'}}>Profile updated.</p>
      )}
      {actionData && 'error' in actionData && (
        <p style={{color: '#fc8181', marginBottom: '1rem'}}>{actionData.error}</p>
      )}

      <Form
        method="post"
        style={{
          background: 'rgba(50, 50, 50, 0.85)',
          borderRadius: '6px',
          padding: '1.25rem',
        }}
      >
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
    </div>
  );
}
