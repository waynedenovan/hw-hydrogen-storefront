import {Form, useOutletContext} from 'react-router';
import type {ActionFunctionArgs} from 'react-router';
import type {CustomerDetailsQuery} from 'customer-accountapi.generated';

type AccountContext = {
  customer: CustomerDetailsQuery['customer'];
};

export async function action({context}: ActionFunctionArgs) {
  return context.customerAccount.logout({});
}

export default function AccountDashboard() {
  const {customer} = useOutletContext<AccountContext>();

  const cardStyle = {
    background: 'rgba(50, 50, 50, 0.85)',
    borderRadius: '6px',
    padding: '1.25rem',
    marginBottom: '1rem',
  };

  return (
    <div>
      <h2 style={{fontSize: '1.25rem', marginBottom: '1rem'}}>Account Overview</h2>

      <div style={cardStyle}>
        <h3 style={{fontSize: '1rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)'}}>
          Profile
        </h3>
        <p>
          {customer.firstName} {customer.lastName}
        </p>
      </div>

      {customer.defaultAddress && (
        <div style={cardStyle}>
          <h3 style={{fontSize: '1rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)'}}>
            Default Address
          </h3>
          {customer.defaultAddress.formatted.map((line: string, i: number) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}

      <Form method="post" style={{marginTop: '2rem'}}>
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
          Sign out
        </button>
      </Form>
    </div>
  );
}
