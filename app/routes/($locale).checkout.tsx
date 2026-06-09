import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  data,
  redirect,
} from 'react-router';
import {useLoaderData, useLocation, useFetcher} from 'react-router';
import {useState, useEffect} from 'react';
import {Money, Image, type CountryCode} from '@shopify/hydrogen';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

export async function loader({context}: LoaderFunctionArgs) {
  const {cart, storefront} = context;
  const expectedCountry = storefront.i18n.country;

  let cartData = await cart.get();

  if (cartData) {
    const currentCountry = cartData.buyerIdentity?.countryCode;
    if (!currentCountry || currentCountry !== expectedCountry) {
      console.log(
        `[checkout-loader] Syncing buyerIdentity: ${currentCountry ?? 'none'} -> ${expectedCountry}`,
      );
      await cart.updateBuyerIdentity({countryCode: expectedCountry});
      cartData = await cart.get();
    }
  }

  if (!cartData || !cartData.totalQuantity) {
    throw redirect('/cart');
  }

  return {cart: cartData};
}

export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;
  const formData = await request.formData();
  const step = formData.get('step') as string;

  let result: any;

  if (step === 'customer-info') {
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const url = new URL(request.url);
    const pathPrefix = `/${url.pathname.split('/')[1]?.toLowerCase() ?? ''}`;
    const localeCountryMap: Record<string, string> = {
      '/en-za': 'ZA',
      '/en-nz': 'NZ',
      '/en-au': 'AU',
      '/en-us': 'US',
    };
    const countryCode = (localeCountryMap[pathPrefix] ?? 'ZA') as CountryCode;

    result = await cart.updateBuyerIdentity({
      email,
      phone: phone || undefined,
      countryCode,
    });
  } else if (step === 'shipping-address') {
    result = await cart.addDeliveryAddresses([
      {
        address: {
          deliveryAddress: {
            address1: formData.get('address1') as string,
            address2: (formData.get('address2') as string) || undefined,
            city: formData.get('city') as string,
            provinceCode: (formData.get('provinceCode') as string) || undefined,
            zip: formData.get('zip') as string,
            countryCode: formData.get('countryCode') as string,
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            phone: (formData.get('phone') as string) || undefined,
          },
        },
        selected: true,
      },
    ]);
  } else {
    return data({error: 'Invalid step'}, {status: 400});
  }

  const userErrors = result?.userErrors || [];
  if (userErrors.length > 0) {
    return data(
      {step, success: false, errors: userErrors},
      {status: 422},
    );
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(cartId) : new Headers();

  return data({step, success: true}, {status: 200, headers});
}

type StepNumber = 1 | 2 | 3;

export default function Checkout() {
  const {cart} = useLoaderData<typeof loader>();
  const fetcher = useFetcher<{
    step?: string;
    success?: boolean;
    errors?: Array<{message: string; field?: string[]}>;
    error?: string;
  }>({key: 'checkout-step'});
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [customerInfo, setCustomerInfo] = useState({
    email: cart.buyerIdentity?.email || '',
    firstName: cart.buyerIdentity?.customer?.firstName || '',
    lastName: cart.buyerIdentity?.customer?.lastName || '',
    phone: cart.buyerIdentity?.phone || '',
  });
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    provinceCode: '',
    zip: '',
    countryCode: '',
    phone: '',
  });

  const location = useLocation();
  const localeMatch = location.pathname.match(/^\/(en-nz|en-au|en-us|en-za)/);
  const localePrefix = localeMatch ? localeMatch[0] : '';
  const defaultCountry =
    localeMatch?.[1]?.split('-')[1]?.toUpperCase() ?? 'ZA';
  const actionUrl = `${localePrefix}/checkout`;

  useEffect(() => {
    if (!shippingAddress.countryCode) {
      setShippingAddress((prev) => ({...prev, countryCode: defaultCountry}));
    }
  }, [defaultCountry, shippingAddress.countryCode]);

  useEffect(() => {
    if (fetcher.data?.success) {
      if (fetcher.data.step === 'customer-info') {
        setCurrentStep(2);
      } else if (fetcher.data.step === 'shipping-address') {
        setCurrentStep(3);
      }
    }
  }, [fetcher.data]);

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        <StepIndicator currentStep={currentStep} />

        {fetcher.data?.errors && fetcher.data.errors.length > 0 && (
          <div className="checkout-errors">
            {fetcher.data.errors.map((err, i) => (
              <p key={i}>{err.message}</p>
            ))}
          </div>
        )}

        {currentStep === 1 && (
          <CustomerInfoStep
            customerInfo={customerInfo}
            onFieldChange={(field, value) =>
              setCustomerInfo((prev) => ({...prev, [field]: value}))
            }
            fetcher={fetcher}
            actionUrl={actionUrl}
          />
        )}

        {currentStep === 2 && (
          <ShippingAddressStep
            shippingAddress={shippingAddress}
            onFieldChange={(field, value) =>
              setShippingAddress((prev) => ({...prev, [field]: value}))
            }
            onBack={() => setCurrentStep(1)}
            fetcher={fetcher}
            actionUrl={actionUrl}
          />
        )}

        {currentStep === 3 && (
          <OrderReviewStep
            cart={cart}
            customerInfo={customerInfo}
            shippingAddress={shippingAddress}
            onBack={() => setCurrentStep(2)}
          />
        )}
      </div>
    </div>
  );
}

function StepIndicator({currentStep}: {currentStep: StepNumber}) {
  const steps = [
    {num: 1, label: 'Information'},
    {num: 2, label: 'Shipping'},
    {num: 3, label: 'Review & Pay'},
  ];

  return (
    <div className="checkout-steps">
      {steps.map((step, i) => (
        <div key={step.num} className="checkout-step-item">
          <div
            className={`checkout-step-circle ${
              currentStep >= step.num ? 'active' : ''
            }`}
          >
            {step.num}
          </div>
          <span
            className={`checkout-step-label ${
              currentStep >= step.num ? 'active' : ''
            }`}
          >
            {step.label}
          </span>
          {i < steps.length - 1 && <div className="checkout-step-line" />}
        </div>
      ))}
    </div>
  );
}

function CustomerInfoStep({
  customerInfo,
  onFieldChange,
  fetcher,
  actionUrl,
}: {
  customerInfo: {email: string; firstName: string; lastName: string; phone: string};
  onFieldChange: (field: string, value: string) => void;
  fetcher: ReturnType<typeof useFetcher>;
  actionUrl: string;
}) {
  const isSubmitting = fetcher.state !== 'idle';
  return (
    <fetcher.Form method="post" action={actionUrl} className="checkout-form">
      <input type="hidden" name="step" value="customer-info" />
      <h2 className="checkout-section-title">Contact Information</h2>
      <div className="checkout-form-field">
        <label htmlFor="email" className="checkout-form-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="checkout-form-input"
          value={customerInfo.email}
          onChange={(e) => onFieldChange('email', e.target.value)}
          placeholder="your@email.com"
        />
      </div>
      <div className="checkout-form-row">
        <div className="checkout-form-field">
          <label htmlFor="firstName" className="checkout-form-label">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="checkout-form-input"
            value={customerInfo.firstName}
            onChange={(e) => onFieldChange('firstName', e.target.value)}
          />
        </div>
        <div className="checkout-form-field">
          <label htmlFor="lastName" className="checkout-form-label">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="checkout-form-input"
            value={customerInfo.lastName}
            onChange={(e) => onFieldChange('lastName', e.target.value)}
          />
        </div>
      </div>
      <div className="checkout-form-field">
        <label htmlFor="phone" className="checkout-form-label">
          Phone (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="checkout-form-input"
          value={customerInfo.phone}
          onChange={(e) => onFieldChange('phone', e.target.value)}
          placeholder="+1 234 567 8900"
        />
      </div>
      <button type="submit" className="checkout-submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Continue to Shipping →'}
      </button>
    </fetcher.Form>
  );
}

function ShippingAddressStep({
  shippingAddress,
  onFieldChange,
  onBack,
  fetcher,
  actionUrl,
}: {
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    provinceCode: string;
    zip: string;
    countryCode: string;
    phone: string;
  };
  onFieldChange: (field: string, value: string) => void;
  onBack: () => void;
  fetcher: ReturnType<typeof useFetcher>;
  actionUrl: string;
}) {
  const isSubmitting = fetcher.state !== 'idle';
  return (
    <fetcher.Form method="post" action={actionUrl} className="checkout-form">
      <input type="hidden" name="step" value="shipping-address" />
      <h2 className="checkout-section-title">Shipping Address</h2>
      <div className="checkout-form-row">
        <div className="checkout-form-field">
          <label htmlFor="ship-firstName" className="checkout-form-label">
            First Name
          </label>
          <input
            id="ship-firstName"
            name="firstName"
            type="text"
            required
            className="checkout-form-input"
            value={shippingAddress.firstName}
            onChange={(e) => onFieldChange('firstName', e.target.value)}
          />
        </div>
        <div className="checkout-form-field">
          <label htmlFor="ship-lastName" className="checkout-form-label">
            Last Name
          </label>
          <input
            id="ship-lastName"
            name="lastName"
            type="text"
            required
            className="checkout-form-input"
            value={shippingAddress.lastName}
            onChange={(e) => onFieldChange('lastName', e.target.value)}
          />
        </div>
      </div>
      <div className="checkout-form-field">
        <label htmlFor="address1" className="checkout-form-label">
          Address
        </label>
        <input
          id="address1"
          name="address1"
          type="text"
          required
          className="checkout-form-input"
          value={shippingAddress.address1}
          onChange={(e) => onFieldChange('address1', e.target.value)}
        />
      </div>
      <div className="checkout-form-field">
        <label htmlFor="address2" className="checkout-form-label">
          Apartment, suite, etc. (optional)
        </label>
        <input
          id="address2"
          name="address2"
          type="text"
          className="checkout-form-input"
          value={shippingAddress.address2}
          onChange={(e) => onFieldChange('address2', e.target.value)}
        />
      </div>
      <div className="checkout-form-row">
        <div className="checkout-form-field">
          <label htmlFor="city" className="checkout-form-label">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            required
            className="checkout-form-input"
            value={shippingAddress.city}
            onChange={(e) => onFieldChange('city', e.target.value)}
          />
        </div>
        <div className="checkout-form-field">
          <label htmlFor="provinceCode" className="checkout-form-label">
            Province / State
          </label>
          <input
            id="provinceCode"
            name="provinceCode"
            type="text"
            className="checkout-form-input"
            value={shippingAddress.provinceCode}
            onChange={(e) => onFieldChange('provinceCode', e.target.value)}
          />
        </div>
      </div>
      <div className="checkout-form-row">
        <div className="checkout-form-field">
          <label htmlFor="zip" className="checkout-form-label">
            Postal / Zip Code
          </label>
          <input
            id="zip"
            name="zip"
            type="text"
            required
            className="checkout-form-input"
            value={shippingAddress.zip}
            onChange={(e) => onFieldChange('zip', e.target.value)}
          />
        </div>
        <div className="checkout-form-field">
          <label htmlFor="countryCode" className="checkout-form-label">
            Country Code
          </label>
          <input
            id="countryCode"
            name="countryCode"
            type="text"
            required
            className="checkout-form-input"
            value={shippingAddress.countryCode}
            onChange={(e) =>
              onFieldChange('countryCode', e.target.value.toUpperCase())
            }
            maxLength={2}
            placeholder="ZA"
          />
        </div>
      </div>
      <div className="checkout-form-field">
        <label htmlFor="ship-phone" className="checkout-form-label">
          Phone (optional)
        </label>
        <input
          id="ship-phone"
          name="phone"
          type="tel"
          className="checkout-form-input"
          value={shippingAddress.phone}
          onChange={(e) => onFieldChange('phone', e.target.value)}
        />
      </div>
      <div className="checkout-nav-buttons">
        <button type="button" className="checkout-back-btn" onClick={onBack}>
          &larr; Back
        </button>
        <button type="submit" className="checkout-submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Continue to Review →'}
        </button>
      </div>
    </fetcher.Form>
  );
}

function OrderReviewStep({
  cart,
  customerInfo,
  shippingAddress,
  onBack,
}: {
  cart: CartApiQueryFragment;
  customerInfo: {email: string; firstName: string; lastName: string; phone: string};
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    provinceCode: string;
    zip: string;
    countryCode: string;
    phone: string;
  };
  onBack: () => void;
}) {
  return (
    <div className="checkout-review">
      <h2 className="checkout-section-title">Order Review</h2>

      <div className="checkout-review-section">
        <h3>Contact</h3>
        <p>{customerInfo.email}</p>
        <p>
          {customerInfo.firstName} {customerInfo.lastName}
        </p>
        {customerInfo.phone && <p>{customerInfo.phone}</p>}
      </div>

      <div className="checkout-review-section">
        <h3>Ship to</h3>
        <p>
          {shippingAddress.firstName} {shippingAddress.lastName}
        </p>
        <p>{shippingAddress.address1}</p>
        {shippingAddress.address2 && <p>{shippingAddress.address2}</p>}
        <p>
          {shippingAddress.city}
          {shippingAddress.provinceCode && `, ${shippingAddress.provinceCode}`}{' '}
          {shippingAddress.zip}
        </p>
        <p>{shippingAddress.countryCode}</p>
      </div>

      <div className="checkout-review-section">
        <h3>Items</h3>
        <ul className="checkout-review-items">
          {(cart.lines?.nodes ?? []).map((line: any) => {
            const merchandise = line.merchandise;
            if (!('product' in merchandise)) return null;
            return (
              <li key={line.id} className="checkout-review-line">
                <div className="checkout-review-line-image">
                  {merchandise.image && (
                    <Image
                      data={merchandise.image}
                      width={60}
                      height={60}
                    />
                  )}
                </div>
                <div className="checkout-review-line-details">
                  <p className="checkout-review-line-title">
                    {merchandise.product.title}
                  </p>
                  {merchandise.title !== 'Default Title' && (
                    <p className="checkout-review-line-variant">
                      {merchandise.title}
                    </p>
                  )}
                  <p className="checkout-review-line-qty">
                    Qty: {line.quantity}
                  </p>
                </div>
                <div className="checkout-review-line-price">
                  <Money data={line.cost.totalAmount} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="checkout-review-section checkout-review-totals">
        <div className="checkout-review-total-row">
          <span>Subtotal</span>
          <span>
            {cart.cost?.subtotalAmount ? (
              <Money data={cart.cost.subtotalAmount} />
            ) : (
              '-'
            )}
          </span>
        </div>
<div className="checkout-review-total-row checkout-review-grand-total">
          <span>Total</span>
          <span>
            {cart.cost?.totalAmount ? (
              <Money data={cart.cost.totalAmount} />
            ) : (
              '-'
            )}
          </span>
        </div>
      </div>

      <div className="checkout-review-section checkout-payment-info">
        <h3>Payment</h3>
        <p>You will be redirected to our secure payment page to complete your order.</p>
        <div className="checkout-payment-methods">
          <span className="checkout-payment-badge">Card</span>
          <span className="checkout-payment-badge">EFT</span>
          <span className="checkout-payment-badge">Google Pay</span>
          <span className="checkout-payment-badge">Apple Pay</span>
        </div>
      </div>

      <div className="checkout-nav-buttons">
        <button type="button" className="checkout-back-btn" onClick={onBack}>
          &larr; Back
        </button>
        <a href={cart.checkoutUrl} target="_self" className="checkout-pay-btn">
          Proceed to Payment &rarr;
        </a>
      </div>
    </div>
  );
}
