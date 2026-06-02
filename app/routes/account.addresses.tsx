import {Form, useActionData, useOutletContext} from 'react-router';
import type {ActionFunctionArgs} from 'react-router';
import {
  CUSTOMER_ADDRESS_CREATE_MUTATION,
  CUSTOMER_ADDRESS_UPDATE_MUTATION,
  CUSTOMER_ADDRESS_DELETE_MUTATION,
} from '~/graphql/customer-account/CustomerAddressMutations';
import type {CustomerDetailsQuery} from 'customer-accountapi.generated';

type AccountContext = {
  customer: CustomerDetailsQuery['customer'];
};

export async function action({context, request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent');

  if (intent === 'delete') {
    const addressId = String(formData.get('addressId'));
    const {data, errors} = await context.customerAccount.mutate(
      CUSTOMER_ADDRESS_DELETE_MUTATION,
      {variables: {addressId}},
    );
    if (errors?.length) return {error: errors[0].message};
    if (data?.customerAddressDelete?.userErrors?.length) {
      return {error: data.customerAddressDelete.userErrors[0].message};
    }
    return {success: 'Address deleted.'};
  }

  const address = {
    firstName: String(formData.get('firstName') || ''),
    lastName: String(formData.get('lastName') || ''),
    company: String(formData.get('company') || ''),
    address1: String(formData.get('address1') || ''),
    address2: String(formData.get('address2') || ''),
    city: String(formData.get('city') || ''),
    zoneCode: String(formData.get('zoneCode') || ''),
    zip: String(formData.get('zip') || ''),
    territoryCode: String(formData.get('territoryCode') || ''),
    phoneNumber: String(formData.get('phoneNumber') || ''),
  };

  const defaultAddress = formData.get('defaultAddress') === 'on';

  if (intent === 'update') {
    const addressId = String(formData.get('addressId'));
    const {data, errors} = await context.customerAccount.mutate(
      CUSTOMER_ADDRESS_UPDATE_MUTATION,
      {variables: {address, addressId, defaultAddress}},
    );
    if (errors?.length) return {error: errors[0].message};
    if (data?.customerAddressUpdate?.userErrors?.length) {
      return {error: data.customerAddressUpdate.userErrors[0].message};
    }
    return {success: 'Address updated.'};
  }

  if (intent === 'create') {
    const {data, errors} = await context.customerAccount.mutate(
      CUSTOMER_ADDRESS_CREATE_MUTATION,
      {variables: {address, defaultAddress}},
    );
    if (errors?.length) return {error: errors[0].message};
    if (data?.customerAddressCreate?.userErrors?.length) {
      return {error: data.customerAddressCreate.userErrors[0].message};
    }
    return {success: 'Address created.'};
  }

  return {error: 'Unknown action.'};
}

export default function AccountAddresses() {
  const {customer} = useOutletContext<AccountContext>();
  const actionData = useActionData<typeof action>();

  const cardStyle = {
    background: 'rgba(50, 50, 50, 0.85)',
    borderRadius: '6px',
    padding: '1.25rem',
    marginBottom: '0.75rem',
  };

  const buttonStyle = {
    background: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '0.35rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.875rem',
  };

  return (
    <div>
      <h2 style={{fontSize: '1.25rem', marginBottom: '1rem'}}>Addresses</h2>

      {actionData && 'success' in actionData && (
        <p style={{color: '#68d391', marginBottom: '1rem'}}>{actionData.success}</p>
      )}
      {actionData && 'error' in actionData && (
        <p style={{color: '#fc8181', marginBottom: '1rem'}}>{actionData.error}</p>
      )}

      {customer.addresses.nodes.length === 0 ? (
        <div style={cardStyle}>
          <p style={{color: 'rgba(255,255,255,0.7)'}}>No addresses saved.</p>
        </div>
      ) : (
        customer.addresses.nodes.map((address) => (
          <div key={address.id} style={cardStyle}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem'}}>
              <div>
                {address.formatted.map((line: string, i: number) => (
                  <p key={i}>{line}</p>
                ))}
                {customer.defaultAddress?.id === address.id && (
                  <p style={{color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: '0.25rem'}}>
                    Default
                  </p>
                )}
              </div>
              <Form method="post">
                <input type="hidden" name="addressId" value={address.id} />
                <input type="hidden" name="intent" value="delete" />
                <button
                  type="submit"
                  style={{...buttonStyle, background: 'rgba(229, 62, 62, 0.3)', border: '1px solid rgba(229, 62, 62, 0.5)'}}
                >
                  Delete
                </button>
              </Form>
            </div>
          </div>
        ))
      )}

      <details style={{...cardStyle, cursor: 'pointer', marginTop: '1.5rem'}}>
        <summary style={{fontWeight: 'bold', marginBottom: '1rem'}}>Add new address</summary>
        <AddressForm />
      </details>
    </div>
  );
}

function AddressForm() {
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

  const fieldStyle = {marginBottom: '0.75rem'};

  return (
    <Form method="post">
      <input type="hidden" name="intent" value="create" />
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem'}}>
        <div style={fieldStyle}>
          <label htmlFor="firstName" style={labelStyle}>First name</label>
          <input id="firstName" name="firstName" type="text" style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label htmlFor="lastName" style={labelStyle}>Last name</label>
          <input id="lastName" name="lastName" type="text" style={inputStyle} />
        </div>
      </div>
      <div style={fieldStyle}>
        <label htmlFor="company" style={labelStyle}>Company</label>
        <input id="company" name="company" type="text" style={inputStyle} />
      </div>
      <div style={fieldStyle}>
        <label htmlFor="address1" style={labelStyle}>Address</label>
        <input id="address1" name="address1" type="text" style={inputStyle} />
      </div>
      <div style={fieldStyle}>
        <label htmlFor="address2" style={labelStyle}>Apartment, suite, etc.</label>
        <input id="address2" name="address2" type="text" style={inputStyle} />
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem'}}>
        <div style={fieldStyle}>
          <label htmlFor="city" style={labelStyle}>City</label>
          <input id="city" name="city" type="text" style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label htmlFor="zoneCode" style={labelStyle}>Province/State</label>
          <input id="zoneCode" name="zoneCode" type="text" style={inputStyle} />
        </div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem'}}>
        <div style={fieldStyle}>
          <label htmlFor="zip" style={labelStyle}>Postal/Zip code</label>
          <input id="zip" name="zip" type="text" style={inputStyle} />
        </div>
        <div style={fieldStyle}>
          <label htmlFor="territoryCode" style={labelStyle}>Country code</label>
          <input id="territoryCode" name="territoryCode" type="text" style={inputStyle} placeholder="e.g. ZA, US, NZ" />
        </div>
      </div>
      <div style={fieldStyle}>
        <label htmlFor="phoneNumber" style={labelStyle}>Phone</label>
        <input id="phoneNumber" name="phoneNumber" type="tel" style={inputStyle} />
      </div>
      <div style={{...fieldStyle, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
        <input id="defaultAddress" name="defaultAddress" type="checkbox" />
        <label htmlFor="defaultAddress" style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem'}}>
          Set as default address
        </label>
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
        Add address
      </button>
    </Form>
  );
}
