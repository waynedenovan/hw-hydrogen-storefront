import {Outlet, useLoaderData, type ShouldRevalidateFunction} from 'react-router';
import type {LoaderFunctionArgs} from 'react-router';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';

export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  if (formMethod && formMethod !== 'GET') return true;
  if (currentUrl.toString() === nextUrl.toString()) return true;
  return false;
};

export async function loader({context}: LoaderFunctionArgs) {
  await context.customerAccount.handleAuthStatus();

  const {data} = await context.customerAccount.query(CUSTOMER_DETAILS_QUERY);

  return {customer: data.customer};
}

export default function AccountLayout() {
  const {customer} = useLoaderData<typeof loader>();

  return (
    <div
      className="account-layout"
      style={{
        maxWidth: '80%',
        margin: '0 auto',
        padding: '2rem 1rem',
        color: 'white',
      }}
    >
      <h1 style={{fontSize: '1.75rem', marginBottom: '1.5rem'}}>
        Welcome, {customer.firstName || 'there'}
      </h1>
      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        <AccountNav />
        <div style={{flex: 1, minWidth: 0}}>
          <Outlet context={{customer}} />
        </div>
      </div>
    </div>
  );
}

function AccountNav() {
  const navStyle = {
    background: 'rgba(50, 50, 50, 0.85)',
    borderRadius: '6px',
    padding: '1rem',
    minWidth: '200px',
  };

  const linkStyle = {
    display: 'block',
    padding: '0.5rem 0.75rem',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    marginBottom: '0.25rem',
  };

  return (
    <nav style={navStyle}>
      <a href="/account" style={linkStyle}>
        Overview
      </a>
      <a href="/account/orders" style={linkStyle}>
        Orders
      </a>
      <a href="/account/wishlist" style={linkStyle}>
        Wish List
      </a>
      <a href="/account/profile" style={linkStyle}>
        Profile
      </a>
      <a href="/account/addresses" style={linkStyle}>
        Addresses
      </a>
      <a href="/account/management" style={linkStyle}>
        Account Management
      </a>
    </nav>
  );
}
