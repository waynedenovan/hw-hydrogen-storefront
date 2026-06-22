import {useState} from 'react';
import {Form, useActionData, useOutletContext, redirect} from 'react-router';
import type {ActionFunctionArgs} from 'react-router';
import {CUSTOMER_UPDATE_MUTATION} from '~/graphql/customer-account/CustomerUpdateMutation';
import type {CustomerDetailsQuery} from 'customer-accountapi.generated';

type AccountContext = {
  customer: CustomerDetailsQuery['customer'];
};

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
      return {error: errors[0].message};
    }

    if (data?.customerUpdate?.userErrors?.length) {
      return {error: data.customerUpdate.userErrors[0].message};
    }

    return {success: true, intent: 'update'};
  }

  if (intent === 'deactivate') {
    const {data, errors} = await context.customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer: {
            firstName: 'Deactivated',
            lastName: 'Account',
          },
        },
      },
    );

    if (errors?.length) {
      return {error: errors[0].message, intent: 'deactivate'};
    }

    if (data?.customerUpdate?.userErrors?.length) {
      return {error: data.customerUpdate.userErrors[0].message, intent: 'deactivate'};
    }

    await context.customerAccount.logout({});
    return redirect('/');
  }

  if (intent === 'delete') {
    const confirmation = formData.get('confirmation') as string;
    if (confirmation !== 'DELETE') {
      return {error: 'Please type DELETE to confirm account deletion.', intent: 'delete'};
    }

    const {data, errors} = await context.customerAccount.mutate(
      CUSTOMER_UPDATE_MUTATION,
      {
        variables: {
          customer: {
            firstName: 'Deleted',
            lastName: 'User',
          },
        },
      },
    );

    if (errors?.length) {
      return {error: errors[0].message, intent: 'delete'};
    }

    if (data?.customerUpdate?.userErrors?.length) {
      return {error: data.customerUpdate.userErrors[0].message, intent: 'delete'};
    }

    await context.customerAccount.logout({});
    return redirect('/');
  }

  return {error: 'Unknown action', intent: 'unknown'};
}

export default function AccountProfile() {
  const {customer} = useOutletContext<AccountContext>();
  const actionData = useActionData<typeof action>();
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

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

  const dangerBtnStyle: React.CSSProperties = {
    background: 'rgba(197, 48, 48, 0.15)',
    color: '#fc8181',
    border: '1px solid rgba(197, 48, 48, 0.4)',
    padding: '0.5rem 1.25rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    marginRight: '0.5rem',
  };

  const actionError = actionData && 'error' in actionData ? actionData.error : null;

  return (
    <div>
      <h2 style={{fontSize: '1.25rem', marginBottom: '1rem'}}>Profile</h2>

      {actionData && 'success' in actionData && actionData.intent === 'update' && (
        <p style={{color: '#68d391', marginBottom: '1rem'}}>Profile updated.</p>
      )}
      {actionError && (
        <p style={{color: '#fc8181', marginBottom: '1rem'}}>{actionError}</p>
      )}

      <Form method="post" style={cardStyle}>
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

      {/* Danger Zone */}
      <div style={{marginTop: '2rem'}}>
        <h3 style={{fontSize: '1rem', color: '#fc8181', marginBottom: '0.75rem'}}>Account Management</h3>
        <div style={{...cardStyle, border: '1px solid rgba(197, 48, 48, 0.3)'}}>
          <div style={{marginBottom: '1.25rem'}}>
            <p style={{fontWeight: 600, marginBottom: '0.25rem'}}>Deactivate Account</p>
            <p style={{fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.75rem'}}>
              Marks your account as deactivated. Your order history and invoicing records are retained.
            </p>
            {!showDeactivate ? (
              <button type="button" style={dangerBtnStyle} onClick={() => setShowDeactivate(true)}>
                Deactivate Account
              </button>
            ) : (
              <div style={{background: 'rgba(197,48,48,0.08)', borderRadius: '6px', padding: '1rem', border: '1px solid rgba(197,48,48,0.3)'}}>
                <p style={{fontSize: '0.875rem', marginBottom: '1rem', color: 'rgba(255,255,255,0.8)'}}>
                  Are you sure you want to deactivate your account? You will be logged out.
                </p>
                <Form method="post" style={{display: 'inline'}}>
                  <input type="hidden" name="intent" value="deactivate" />
                  <button type="submit" style={dangerBtnStyle}>
                    Yes, Deactivate
                  </button>
                </Form>
                <button type="button" style={{...dangerBtnStyle, color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)', background: 'transparent'}} onClick={() => setShowDeactivate(false)}>
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div style={{borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem'}}>
            <p style={{fontWeight: 600, marginBottom: '0.25rem'}}>Close Account &amp; Delete Personal Information</p>
            <p style={{fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.75rem'}}>
              Permanently removes your personal information. Your order and invoicing records are retained as required by SARS.
            </p>
            {!showDelete ? (
              <button type="button" style={{...dangerBtnStyle, borderColor: 'rgba(197,48,48,0.6)'}} onClick={() => setShowDelete(true)}>
                Close Account
              </button>
            ) : (
              <div style={{background: 'rgba(197,48,48,0.08)', borderRadius: '6px', padding: '1rem', border: '1px solid rgba(197,48,48,0.3)'}}>
                <p style={{fontSize: '0.875rem', marginBottom: '0.75rem', color: 'rgba(255,255,255,0.8)'}}>
                  This will permanently remove your personal information. Type <strong>DELETE</strong> to confirm.
                </p>
                <Form method="post">
                  <input type="hidden" name="intent" value="delete" />
                  <input
                    name="confirmation"
                    type="text"
                    placeholder="Type DELETE to confirm"
                    style={{...inputStyle, width: 'auto', marginBottom: '0.75rem', display: 'block'}}
                  />
                  <button type="submit" style={{...dangerBtnStyle, borderColor: 'rgba(197,48,48,0.6)'}}>
                    Delete My Information
                  </button>
                  <button type="button" style={{...dangerBtnStyle, color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)', background: 'transparent'}} onClick={() => setShowDelete(false)}>
                    Cancel
                  </button>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
