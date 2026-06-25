import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  data,
  redirect,
  useRevalidator,
} from 'react-router';
import {useLoaderData, useLocation, useFetcher} from 'react-router';
import {useState, useEffect, useRef} from 'react';
import {Money, Image, CartForm} from '@shopify/hydrogen';
import type {CountryCode, CurrencyCode} from '@shopify/hydrogen/storefront-api-types';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';
import type {CustomerDetailsQuery} from 'customer-accountapi.generated';

export async function loader({context}: LoaderFunctionArgs) {
  const {cart, storefront, customerAccount} = context;
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

  let customer: CustomerDetailsQuery['customer'] | null = null;
  let businessProfile = {companyName: '', regNumber: '', vatNumber: ''};

  try {
    const isLoggedIn = await customerAccount.isLoggedIn();
    if (isLoggedIn) {
      const {data: accountData} = await customerAccount.query(CUSTOMER_DETAILS_QUERY);
      customer = accountData.customer;

      const env = context.env as any;
      const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
      const internalSecret: string = env.INTERNAL_API_SECRET ?? '';
      const email = (customer as any)?.emailAddress?.emailAddress ?? '';

      if (storefrontUiUrl && email) {
        try {
          const bpRes = await fetch(
            `${storefrontUiUrl}/api/customer/business?email=${encodeURIComponent(email)}`,
            {headers: {'X-Internal-Secret': internalSecret}},
          );
          if (bpRes.ok) {
            businessProfile = (await bpRes.json()) as typeof businessProfile;
          }
        } catch {
          /* non-blocking */
        }
      }
    }
  } catch {
    /* guest checkout — no pre-fill */
  }

  const paymentGateway = (context.env as any).PUBLIC_PAYMENT_GATEWAY ?? 'shopify';

  return {cart: cartData, customer, paymentGateway, businessProfile};
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

    // Save business details to backend profile (non-blocking)
    const isBusinessCustomer = formData.get('isBusinessCustomer') === 'true';
    if (isBusinessCustomer && email) {
      const env = context.env as any;
      const storefrontUiUrl: string = env.STOREFRONT_UI_API_URL ?? '';
      const internalSecret: string = env.INTERNAL_API_SECRET ?? '';
      if (storefrontUiUrl) {
        const companyName = formData.get('companyName') as string || '';
        const regNumber = formData.get('regNumber') as string || '';
        const vatNumber = formData.get('vatNumber') as string || '';
        try {
          let shopifyCustomerId = '';
          try {
            const isLoggedIn = await context.customerAccount.isLoggedIn();
            if (isLoggedIn) {
              const {data: idData} = await context.customerAccount.query(
                `#graphql query { customer { id } }` as any,
              );
              shopifyCustomerId = (idData as any)?.customer?.id ?? '';
            }
          } catch { /* ignore */ }

          await fetch(`${storefrontUiUrl}/api/customer/business`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'X-Internal-Secret': internalSecret},
            body: JSON.stringify({shopifyCustomerId, email, companyName, regNumber, vatNumber}),
          });
        } catch { /* non-blocking */ }
      }
    }
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
            countryCode: formData.get('countryCode') as CountryCode,
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

type StepNumber = 1 | 2 | 3 | 4;

export default function Checkout() {
  const {cart, customer, paymentGateway, businessProfile} = useLoaderData<typeof loader>();
  const fetcher = useFetcher<{
    step?: string;
    success?: boolean;
    errors?: Array<{message: string; field?: string[]}>;
    error?: string;
  }>({key: 'checkout-step'});
  const revalidator = useRevalidator();
  const pendingStep3 = useRef(false);

  const location = useLocation();
  const localeMatch = location.pathname.match(/^\/(en-nz|en-au|en-us|en-za)/);
  const localePrefix = localeMatch ? localeMatch[0] : '';
  const defaultCountry =
    localeMatch?.[1]?.split('-')[1]?.toUpperCase() ?? 'ZA';
  const actionUrl = `${localePrefix}/checkout`;

  const isPreFilled = Boolean(
    customer?.defaultAddress?.address1 || customer?.firstName,
  );
  const isGuest = !customer;

  // Guests must explicitly confirm details before proceeding (account will be created)
  // Logged-in users with pre-filled data also confirm, others proceed freely
  const requiresConfirm = isPreFilled || isGuest;
  const [prefillConfirmed, setPrefillConfirmed] = useState(!requiresConfirm);
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [invoiceEmailRequested, setInvoiceEmailRequested] = useState(false);
  const [businessCustomer, setBusinessCustomer] = useState(
    !!(businessProfile?.companyName || businessProfile?.regNumber || businessProfile?.vatNumber),
  );
  const [businessDetails, setBusinessDetails] = useState({
    companyName: businessProfile?.companyName ?? '',
    vatNumber: businessProfile?.vatNumber ?? '',
    regNumber: businessProfile?.regNumber ?? '',
  });

  const [customerInfo, setCustomerInfo] = useState({
    email:
      cart.buyerIdentity?.email ||
      (customer as any)?.emailAddress?.emailAddress ||
      '',
    firstName:
      cart.buyerIdentity?.customer?.firstName || customer?.firstName || '',
    lastName:
      cart.buyerIdentity?.customer?.lastName || customer?.lastName || '',
    phone:
      cart.buyerIdentity?.phone ||
      customer?.defaultAddress?.phoneNumber ||
      '',
  });

  const [shippingAddress, setShippingAddress] = useState({
    firstName: customer?.defaultAddress?.firstName || '',
    lastName: customer?.defaultAddress?.lastName || '',
    address1: customer?.defaultAddress?.address1 || '',
    address2: customer?.defaultAddress?.address2 || '',
    city: customer?.defaultAddress?.city || '',
    provinceCode: customer?.defaultAddress?.zoneCode || '',
    zip: customer?.defaultAddress?.zip || '',
    countryCode:
      (customer?.defaultAddress as any)?.territoryCode || defaultCountry,
    phone: customer?.defaultAddress?.phoneNumber || '',
  });

  useEffect(() => {
    if (!shippingAddress.countryCode) {
      setShippingAddress((prev) => ({...prev, countryCode: defaultCountry}));
    }
  }, [defaultCountry, shippingAddress.countryCode]);

  /* After shipping-address step succeeds, revalidate to get fresh deliveryGroups */
  useEffect(() => {
    if (fetcher.data?.success && fetcher.data.step === 'shipping-address') {
      pendingStep3.current = true;
      revalidator.revalidate();
    } else if (fetcher.data?.success && fetcher.data.step === 'customer-info') {
      setCurrentStep(2);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (revalidator.state === 'idle' && pendingStep3.current) {
      pendingStep3.current = false;
      setCurrentStep(3);
    }
  }, [revalidator.state]);

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
            isPreFilled={isPreFilled}
            isGuest={isGuest}
            prefillConfirmed={prefillConfirmed}
            onPrefillConfirm={setPrefillConfirmed}
            onFieldChange={(field, value) =>
              setCustomerInfo((prev) => ({...prev, [field]: value}))
            }
            businessCustomer={businessCustomer}
            onBusinessCustomerChange={setBusinessCustomer}
            businessDetails={businessDetails}
            onBusinessDetailChange={(field, value) =>
              setBusinessDetails((prev) => ({...prev, [field]: value}))
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
          <ShippingMethodStep
            deliveryGroups={(cart as any).deliveryGroups}
            localePrefix={localePrefix}
            onBack={() => setCurrentStep(2)}
            onContinue={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 4 && (
          <OrderReviewStep
            cart={cart}
            customerInfo={customerInfo}
            shippingAddress={shippingAddress}
            paymentGateway={paymentGateway}
            localePrefix={localePrefix}
            invoiceEmailRequested={invoiceEmailRequested}
            onInvoiceEmailChange={setInvoiceEmailRequested}
            businessCustomer={businessCustomer}
            businessDetails={businessDetails}
            onBack={() => setCurrentStep(3)}
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
    {num: 3, label: 'Method'},
    {num: 4, label: 'Review & Pay'},
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
  isPreFilled,
  isGuest,
  prefillConfirmed,
  onPrefillConfirm,
  onFieldChange,
  businessCustomer,
  onBusinessCustomerChange,
  businessDetails,
  onBusinessDetailChange,
  fetcher,
  actionUrl,
}: {
  customerInfo: {email: string; firstName: string; lastName: string; phone: string};
  isPreFilled: boolean;
  isGuest: boolean;
  prefillConfirmed: boolean;
  onPrefillConfirm: (v: boolean) => void;
  onFieldChange: (field: string, value: string) => void;
  businessCustomer: boolean;
  onBusinessCustomerChange: (v: boolean) => void;
  businessDetails: {companyName: string; vatNumber: string; regNumber: string};
  onBusinessDetailChange: (field: string, value: string) => void;
  fetcher: ReturnType<typeof useFetcher>;
  actionUrl: string;
}) {
  const isSubmitting = fetcher.state !== 'idle';
  return (
    <fetcher.Form method="post" action={actionUrl} className="checkout-form">
      <input type="hidden" name="step" value="customer-info" />
      <input type="hidden" name="isBusinessCustomer" value={businessCustomer ? 'true' : 'false'} />
      <h2 className="checkout-section-title">Contact Information</h2>

      {isPreFilled && (
        <div className="checkout-prefill-notice">
          <p>Your details have been pre-filled from your account. Please verify they are correct before continuing.</p>
          <label className="checkout-prefill-confirm-label">
            <input
              type="checkbox"
              checked={prefillConfirmed}
              onChange={(e) => onPrefillConfirm(e.target.checked)}
            />
            I confirm these details are correct
          </label>
        </div>
      )}

      {isGuest && (
        <div className="checkout-prefill-notice">
          <p>You are checking out as a guest. A customer account will be created using the details below. Please confirm they are correct before continuing.</p>
          <label className="checkout-prefill-confirm-label">
            <input
              type="checkbox"
              checked={prefillConfirmed}
              onChange={(e) => onPrefillConfirm(e.target.checked)}
            />
            I confirm my details are correct and agree to have an account created
          </label>
        </div>
      )}

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
          placeholder="+27 82 000 0000"
        />
      </div>

      <div className="checkout-form-field" style={{marginTop: '0.75rem'}}>
        <label className="checkout-prefill-confirm-label">
          <input
            type="checkbox"
            checked={businessCustomer}
            onChange={(e) => onBusinessCustomerChange(e.target.checked)}
          />
          This order is for a business
        </label>
      </div>

      {businessCustomer && (
        <>
          <div className="checkout-form-field">
            <label htmlFor="companyName" className="checkout-form-label">
              Company name
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              className="checkout-form-input"
              value={businessDetails.companyName}
              onChange={(e) => onBusinessDetailChange('companyName', e.target.value)}
              placeholder="e.g. Acme (Pty) Ltd"
            />
          </div>
          <div className="checkout-form-field">
            <label htmlFor="vatNumber" className="checkout-form-label">
              TAX/VAT No (SARS VAT Number)
            </label>
            <input
              id="vatNumber"
              name="vatNumber"
              type="text"
              className="checkout-form-input"
              value={businessDetails.vatNumber}
              onChange={(e) => onBusinessDetailChange('vatNumber', e.target.value)}
              placeholder="4XXXXXXXXX"
            />
          </div>
          <div className="checkout-form-field">
            <label htmlFor="regNumber" className="checkout-form-label">
              Reg No (Business Registration Number)
            </label>
            <input
              id="regNumber"
              name="regNumber"
              type="text"
              className="checkout-form-input"
              value={businessDetails.regNumber}
              onChange={(e) => onBusinessDetailChange('regNumber', e.target.value)}
              placeholder="XXXX/XXXXXX/XX"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="checkout-submit-btn"
        disabled={isSubmitting || ((isPreFilled || isGuest) && !prefillConfirmed)}
      >
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
        <button
          type="submit"
          className="checkout-submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Continue to Shipping Method →'}
        </button>
      </div>
    </fetcher.Form>
  );
}

type DeliveryOption = {
  handle: string;
  title: string;
  code?: string;
  estimatedCost: {amount: string; currencyCode: CurrencyCode};
};

type DeliveryGroup = {
  id: string;
  deliveryOptions: DeliveryOption[];
  selectedDeliveryOption?: {
    handle: string;
    title: string;
    estimatedCost: {amount: string; currencyCode: CurrencyCode};
  } | null;
};

function ShippingMethodStep({
  deliveryGroups,
  localePrefix,
  onBack,
  onContinue,
}: {
  deliveryGroups?: {nodes: DeliveryGroup[]};
  localePrefix: string;
  onBack: () => void;
  onContinue: () => void;
}) {
  const shippingFetcher = useFetcher<any>({key: 'shipping-method'});
  const group = deliveryGroups?.nodes?.[0];
  const options = group?.deliveryOptions ?? [];
  const [selectedHandle, setSelectedHandle] = useState<string | null>(
    group?.selectedDeliveryOption?.handle ?? (options[0]?.handle ?? null),
  );

  /* Auto-select first option if none is selected yet */
  useEffect(() => {
    if (!selectedHandle && options.length > 0 && group) {
      const handle = options[0].handle;
      setSelectedHandle(handle);
      shippingFetcher.submit(
        {
          [CartForm.INPUT_NAME]: JSON.stringify({
            action: CartForm.ACTIONS.SelectedDeliveryOptionsUpdate,
            inputs: {
              selectedDeliveryOptions: [
                {deliveryGroupId: group.id, deliveryOptionHandle: handle},
              ],
            },
          }),
        },
        {method: 'POST', action: `${localePrefix}/cart`},
      );
    }
  }, []);

  if (options.length === 0) {
    return (
      <div className="checkout-form">
        <h2 className="checkout-section-title">Shipping Method</h2>
        <div className="checkout-shipping-empty">
          No shipping options are currently available for your address. Please
          contact us for assistance.
        </div>
        <div className="checkout-nav-buttons">
          <button type="button" className="checkout-back-btn" onClick={onBack}>
            &larr; Back
          </button>
          <button
            type="button"
            className="checkout-submit-btn"
            onClick={onContinue}
          >
            Continue to Review →
          </button>
        </div>
      </div>
    );
  }

  function handleSelect(option: DeliveryOption) {
    if (!group) return;
    setSelectedHandle(option.handle);
    shippingFetcher.submit(
      {
        [CartForm.INPUT_NAME]: JSON.stringify({
          action: CartForm.ACTIONS.SelectedDeliveryOptionsUpdate,
          inputs: {
            selectedDeliveryOptions: [
              {
                deliveryGroupId: group.id,
                deliveryOptionHandle: option.handle,
              },
            ],
          },
        }),
      },
      {method: 'POST', action: `${localePrefix}/cart`},
    );
  }

  const isFree = (amount: string) => parseFloat(amount) === 0;

  return (
    <div className="checkout-form">
      <h2 className="checkout-section-title">Shipping Method</h2>
      <div className="checkout-shipping-options">
        {options.map((option) => (
          <label key={option.handle} className="checkout-shipping-option">
            <input
              type="radio"
              name="delivery"
              value={option.handle}
              checked={selectedHandle === option.handle}
              onChange={() => handleSelect(option)}
            />
            <span className="checkout-shipping-option-label">
              {option.title}
            </span>
            <span
              className={`checkout-shipping-option-cost ${
                isFree(option.estimatedCost.amount)
                  ? 'checkout-shipping-option-free'
                  : ''
              }`}
            >
              {isFree(option.estimatedCost.amount) ? (
                'Free'
              ) : (
                <Money data={option.estimatedCost} />
              )}
            </span>
          </label>
        ))}
      </div>
      <div className="checkout-nav-buttons">
        <button type="button" className="checkout-back-btn" onClick={onBack}>
          &larr; Back
        </button>
        <button
          type="button"
          className="checkout-submit-btn"
          onClick={onContinue}
          disabled={!selectedHandle || shippingFetcher.state !== 'idle'}
        >
          {shippingFetcher.state !== 'idle'
            ? 'Updating...'
            : 'Continue to Review →'}
        </button>
      </div>
    </div>
  );
}

function OrderReviewStep({
  cart,
  customerInfo,
  shippingAddress,
  paymentGateway,
  localePrefix,
  invoiceEmailRequested,
  onInvoiceEmailChange,
  businessCustomer,
  businessDetails,
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
  paymentGateway: string;
  localePrefix: string;
  invoiceEmailRequested: boolean;
  onInvoiceEmailChange: (v: boolean) => void;
  businessCustomer: boolean;
  businessDetails: {companyName: string; vatNumber: string; regNumber: string};
  onBack: () => void;
}) {
  const deliveryGroup = (cart as any).deliveryGroups?.nodes?.[0];
  const selectedDelivery = deliveryGroup?.selectedDeliveryOption;

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

      {selectedDelivery && (
        <div className="checkout-review-section">
          <h3>Shipping Method</h3>
          <p>
            {selectedDelivery.title}
            {' — '}
            {parseFloat(selectedDelivery.estimatedCost.amount) === 0 ? (
              'Free'
            ) : (
              <Money data={selectedDelivery.estimatedCost} />
            )}
          </p>
        </div>
      )}

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
        {selectedDelivery &&
          parseFloat(selectedDelivery.estimatedCost.amount) > 0 && (
            <div className="checkout-review-total-row">
              <span>Shipping</span>
              <span>
                <Money data={selectedDelivery.estimatedCost} />
              </span>
            </div>
          )}
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
        {paymentGateway === 'payfast' ? (
          <p>You will be redirected to PayFast to complete your payment securely.</p>
        ) : (
          <p>You will be redirected to our secure payment page to complete your order.</p>
        )}
        <div className="checkout-payment-methods">
          <span className="checkout-payment-badge">Card</span>
          <span className="checkout-payment-badge">EFT</span>
          <span className="checkout-payment-badge">Google Pay</span>
          <span className="checkout-payment-badge">Apple Pay</span>
        </div>
      </div>

      <div className="checkout-review-section" style={{borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem'}}>
        <label style={{display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer', fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)'}}>
          <input
            type="checkbox"
            checked={invoiceEmailRequested}
            onChange={(e) => onInvoiceEmailChange(e.target.checked)}
            style={{marginTop: '2px', flexShrink: 0}}
          />
          Email me a tax invoice for this order
        </label>
        <p style={{fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.75rem', lineHeight: '1.5'}}>
          By proceeding you agree to our{' '}
          <a href="/policies/terms-of-service" target="_blank" rel="noreferrer" style={{color: 'rgba(26,180,215,0.9)', textDecoration: 'underline'}}>
            Terms &amp; Conditions
          </a>{' '}
          and{' '}
          <a href="/policies/refund-policy" target="_blank" rel="noreferrer" style={{color: 'rgba(26,180,215,0.9)', textDecoration: 'underline'}}>
            Return Policy
          </a>
          .
        </p>
      </div>

      <div className="checkout-nav-buttons">
        <button type="button" className="checkout-back-btn" onClick={onBack}>
          &larr; Back
        </button>
        {paymentGateway === 'payfast' ? (
          <PayFastPaymentForm
            cart={cart}
            customerInfo={customerInfo}
            shippingAddress={shippingAddress}
            localePrefix={localePrefix}
            invoiceEmailRequested={invoiceEmailRequested}
            businessCustomer={businessCustomer}
            businessDetails={businessDetails}
          />
        ) : (
          <a href={cart.checkoutUrl} target="_self" className="checkout-pay-btn">
            Proceed to Payment →
          </a>
        )}
      </div>
    </div>
  );
}

function PayFastPaymentForm({
  cart,
  customerInfo,
  shippingAddress,
  localePrefix,
  invoiceEmailRequested,
  businessCustomer,
  businessDetails,
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
  localePrefix: string;
  invoiceEmailRequested: boolean;
  businessCustomer: boolean;
  businessDetails: {companyName: string; vatNumber: string; regNumber: string};
}) {
  const payFetcher = useFetcher<{error?: string}>({key: 'payfast-initiate'});
  const isSubmitting = payFetcher.state !== 'idle';

  return (
    <payFetcher.Form
      method="post"
      action={`${localePrefix}/checkout/payment`}
    >
      {/* Cart reference */}
      <input type="hidden" name="cartId" value={cart.id} />
      <input type="hidden" name="cartTotal" value={cart.cost?.totalAmount?.amount ?? '0'} />
      <input type="hidden" name="cartCurrency" value={cart.cost?.totalAmount?.currencyCode ?? 'ZAR'} />

      {/* Customer info */}
      <input type="hidden" name="email" value={customerInfo.email} />
      <input type="hidden" name="firstName" value={customerInfo.firstName} />
      <input type="hidden" name="lastName" value={customerInfo.lastName} />
      <input type="hidden" name="phone" value={customerInfo.phone} />

      {/* Shipping address */}
      <input type="hidden" name="shipAddress1" value={shippingAddress.address1} />
      <input type="hidden" name="shipAddress2" value={shippingAddress.address2} />
      <input type="hidden" name="shipCity" value={shippingAddress.city} />
      <input type="hidden" name="shipProvince" value={shippingAddress.provinceCode} />
      <input type="hidden" name="shipZip" value={shippingAddress.zip} />
      <input type="hidden" name="shipCountry" value={shippingAddress.countryCode} />

      {/* Invoice email preference */}
      <input type="hidden" name="invoiceEmailRequested" value={invoiceEmailRequested ? 'true' : 'false'} />

      {/* Business details */}
      <input type="hidden" name="isBusinessCustomer" value={businessCustomer ? 'true' : 'false'} />
      <input type="hidden" name="companyName" value={businessDetails.companyName} />
      <input type="hidden" name="vatNumber" value={businessDetails.vatNumber} />
      <input type="hidden" name="regNumber" value={businessDetails.regNumber} />

      {/* Line items as JSON — includes variantId for Shopify Draft Order creation */}
      <input
        type="hidden"
        name="lineItems"
        value={JSON.stringify(
          (cart.lines?.nodes ?? []).map((line: any) => ({
            variantId: line.merchandise?.id ?? '',
            quantity: line.quantity,
            title: line.merchandise?.product?.title ?? '',
            variantTitle: line.merchandise?.title ?? '',
            price: line.cost?.amountPerQuantity?.amount ?? '0',
            total: line.cost?.totalAmount?.amount ?? '0',
          })),
        )}
      />

      {/* Shipping / delivery selection */}
      <input
        type="hidden"
        name="shippingTitle"
        value={cart.deliveryGroups?.nodes?.[0]?.selectedDeliveryOption?.title ?? ''}
      />
      <input
        type="hidden"
        name="shippingCost"
        value={cart.deliveryGroups?.nodes?.[0]?.selectedDeliveryOption?.estimatedCost?.amount ?? '0'}
      />

      {payFetcher.data?.error && (
        <p style={{color: '#fc8181', fontSize: '0.85rem', marginBottom: '0.5rem'}}>
          {payFetcher.data.error}
        </p>
      )}

      <button
        type="submit"
        className="checkout-pay-btn"
        disabled={isSubmitting}
        style={{border: 'none', cursor: isSubmitting ? 'wait' : 'pointer'}}
      >
        {isSubmitting ? 'Redirecting to PayFast...' : 'Proceed to Payment →'}
      </button>
    </payFetcher.Form>
  );
}
