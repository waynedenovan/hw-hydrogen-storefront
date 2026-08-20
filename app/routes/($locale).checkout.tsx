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
import {withDisplayVat, displayVatOnly} from '~/lib/displayVat';
import {
  getMinCollectionDate,
  getWorkingHoursFor,
  validateCollectionDateTime,
} from '~/lib/collectionSchedule';
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

  // PayFast service-status banner data (task 2607191915) — 60s-cached, 3s
  // timeout, fails open to 'unknown'. Dynamic import per ERR-IMPORT-001.
  let payfastStatus = null as null | {indicator: string; description: string};
  if (paymentGateway === 'payfast') {
    const {getPayfastStatus, isPayfastDegraded} = await import(
      '~/lib/payfastStatus.server'
    );
    const status = await getPayfastStatus();
    if (isPayfastDegraded(status)) payfastStatus = status;
  }

  // Direct EFT is only offered alongside PayFast, not as a substitute for
  // the raw Shopify-checkout fallback below it.
  const eftBankingDetails =
    paymentGateway === 'payfast'
      ? {
          bankName: (context.env as any).EFT_BANK_NAME ?? '',
          accountHolder: (context.env as any).EFT_ACCOUNT_HOLDER ?? '',
          accountNumber: (context.env as any).EFT_ACCOUNT_NUMBER ?? '',
          branchCode: (context.env as any).EFT_BRANCH_CODE ?? '',
          swiftCode: (context.env as any).EFT_SWIFT_CODE ?? '',
        }
      : null;

  return {cart: cartData, customer, paymentGateway, businessProfile, payfastStatus, eftBankingDetails};
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
    const rawCountryCode = (formData.get('countryCode') as string)?.trim().toUpperCase();
    const countryCode = /^[A-Z]{2}$/.test(rawCountryCode) ? (rawCountryCode as CountryCode) : null;
    if (!countryCode) {
      return data(
        {step, success: false, errors: [{message: 'Please select a valid country.'}]},
        {status: 422},
      );
    }
    result = await cart.addDeliveryAddresses([
      {
        address: {
          deliveryAddress: {
            address1: formData.get('address1') as string,
            address2: (formData.get('address2') as string) || undefined,
            city: formData.get('city') as string,
            provinceCode: (formData.get('provinceCode') as string) || undefined,
            zip: formData.get('zip') as string,
            countryCode,
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
  const {cart, customer, paymentGateway, businessProfile, payfastStatus, eftBankingDetails} =
    useLoaderData<typeof loader>();
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
    countryCode: (() => {
      const raw = (customer?.defaultAddress as any)?.territoryCode || defaultCountry;
      return /^[A-Z]{2}$/.test(raw) ? raw : defaultCountry;
    })(),
    phone: customer?.defaultAddress?.phoneNumber || '',
  });

  useEffect(() => {
    if (!shippingAddress.countryCode) {
      setShippingAddress((prev) => ({...prev, countryCode: defaultCountry}));
    }
  }, [defaultCountry, shippingAddress.countryCode]);

  const [shippingRates, setShippingRates] = useState<TcgRate[]>([]);
  const [collectionAddress, setCollectionAddress] = useState<CollectionAddress | null>(null);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [ratesError, setRatesError] = useState<string | null>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<ShippingSelection | null>(null);

  async function fetchShippingRates() {
    setRatesLoading(true);
    setRatesError(null);
    try {
      const lineItems = (cart.lines?.nodes ?? []).map((line: any) => ({
        variantId: line.merchandise?.id ?? '',
        quantity: line.quantity,
      }));
      const res = await fetch(`${localePrefix}/checkout/shipping-rates`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({lineItems, deliveryAddress: shippingAddress}),
      });
      const json = (await res.json()) as {
        rates?: TcgRate[];
        collection?: {address: CollectionAddress} | null;
        error?: string;
      };
      setShippingRates(json.rates ?? []);
      setCollectionAddress(json.collection?.address ?? null);
      // Error state lives in the JSON body, not the HTTP status — this route
      // always responds 200 so Cloudflare doesn't swallow the body (see the
      // note in checkout.shipping-rates.tsx).
      if (json.error) setRatesError(json.error);
    } catch {
      setRatesError('Could not fetch shipping rates.');
    } finally {
      setRatesLoading(false);
    }
  }

  /* After shipping-address step succeeds, revalidate then fetch TCG rates fresh */
  useEffect(() => {
    if (fetcher.data?.success && fetcher.data.step === 'shipping-address') {
      pendingStep3.current = true;
      setShippingRates([]);
      setCollectionAddress(null);
      setRatesError(null);
      setSelectedShippingMethod(null);
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

  useEffect(() => {
    if (currentStep === 3 && shippingRates.length === 0 && !collectionAddress && !ratesLoading && !ratesError) {
      fetchShippingRates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

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
            rates={shippingRates}
            collectionAddress={collectionAddress}
            loading={ratesLoading}
            error={ratesError}
            selected={selectedShippingMethod}
            onSelect={setSelectedShippingMethod}
            onBack={() => setCurrentStep(2)}
            onContinue={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 4 && (
          <OrderReviewStep
            cart={cart}
            customerInfo={customerInfo}
            shippingAddress={shippingAddress}
            selectedShippingMethod={selectedShippingMethod}
            paymentGateway={paymentGateway}
            localePrefix={localePrefix}
            invoiceEmailRequested={invoiceEmailRequested}
            onInvoiceEmailChange={setInvoiceEmailRequested}
            businessCustomer={businessCustomer}
            businessDetails={businessDetails}
            payfastStatus={payfastStatus}
            eftBankingDetails={eftBankingDetails}
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

function formatRegNumber(value: string): string {
  if (/^[a-zA-Z]/.test(value)) return value;
  if (/^\d{4}\/\d{6}\/\d{2}$/.test(value)) return value;
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 4) return digits;
  if (digits.length <= 10) return `${digits.slice(0, 4)}/${digits.slice(4)}`;
  return `${digits.slice(0, 4)}/${digits.slice(4, 10)}/${digits.slice(10, 12)}`;
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
              onChange={(e) => onBusinessDetailChange('regNumber', formatRegNumber(e.target.value))}
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
            Country
          </label>
          <select
            id="countryCode"
            name="countryCode"
            required
            className="checkout-form-input"
            value={shippingAddress.countryCode}
            onChange={(e) => onFieldChange('countryCode', e.target.value)}
          >
            <option value="ZA">South Africa (ZA)</option>
            <option value="AU" disabled>Australia (AU)</option>
            <option value="BW" disabled>Botswana (BW)</option>
            <option value="CA" disabled>Canada (CA)</option>
            <option value="GB" disabled>United Kingdom (GB)</option>
            <option value="LS" disabled>Lesotho (LS)</option>
            <option value="MW" disabled>Malawi (MW)</option>
            <option value="MZ" disabled>Mozambique (MZ)</option>
            <option value="NA" disabled>Namibia (NA)</option>
            <option value="NZ" disabled>New Zealand (NZ)</option>
            <option value="SZ" disabled>Eswatini (SZ)</option>
            <option value="TZ" disabled>Tanzania (TZ)</option>
            <option value="US" disabled>United States (US)</option>
            <option value="ZM" disabled>Zambia (ZM)</option>
            <option value="ZW" disabled>Zimbabwe (ZW)</option>
          </select>
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

type TcgRate = {
  rateId: string | number;
  serviceLevel: string | null;
  title: string;
  cost: number;
};

type CollectionAddress = {
  company: string;
  street: string;
  city: string;
  zone: string;
  code: string;
  country: string;
};

type ShippingSelection =
  | {type: 'tcg'; rateId: string | number; serviceLevel: string | null; title: string; cost: number}
  | {type: 'collection'; collectionDate: string; collectionTime: string};

function ShippingMethodStep({
  rates,
  collectionAddress,
  loading,
  error,
  selected,
  onSelect,
  onBack,
  onContinue,
}: {
  rates: TcgRate[];
  collectionAddress: CollectionAddress | null;
  loading: boolean;
  error: string | null;
  selected: ShippingSelection | null;
  onSelect: (selection: ShippingSelection) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const [collectionDate, setCollectionDate] = useState('');
  const [collectionTime, setCollectionTime] = useState('');
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  const minCollectionDate = getMinCollectionDate();
  const collectionHours = collectionDate ? getWorkingHoursFor(collectionDate) : null;

  function selectRate(rate: TcgRate) {
    onSelect({type: 'tcg', rateId: rate.rateId, serviceLevel: rate.serviceLevel, title: rate.title, cost: rate.cost});
  }

  function selectCollection(date: string, time: string) {
    if (date && time) {
      const result = validateCollectionDateTime(date, time);
      setScheduleError(result.valid ? null : result.error);
    } else {
      setScheduleError(null);
    }
    onSelect({type: 'collection', collectionDate: date, collectionTime: time});
  }

  const isCollectionSelected = selected?.type === 'collection';
  const canContinue = Boolean(
    selected?.type === 'tcg' ||
      (selected?.type === 'collection' && collectionDate && collectionTime && !scheduleError),
  );

  if (loading) {
    return (
      <div className="checkout-form">
        <h2 className="checkout-section-title">Shipping Method</h2>
        <div className="checkout-shipping-empty">Fetching courier rates…</div>
      </div>
    );
  }

  return (
    <div className="checkout-form">
      <h2 className="checkout-section-title">Shipping Method</h2>

      {error && (
        <div className="checkout-shipping-empty">
          Couldn&rsquo;t fetch courier rates right now — collection from our store is still available below.
        </div>
      )}

      {rates.length === 0 && !collectionAddress && !error && (
        <div className="checkout-shipping-empty">
          No shipping options are currently available for your address. Please
          contact us for assistance.
        </div>
      )}

      <div className="checkout-shipping-options">
        {rates.map((rate) => (
          <label key={rate.rateId} className="checkout-shipping-option">
            <input
              type="radio"
              name="delivery"
              checked={selected?.type === 'tcg' && selected.rateId === rate.rateId}
              onChange={() => selectRate(rate)}
            />
            <span className="checkout-shipping-option-label">{rate.title}</span>
            <span
              className={`checkout-shipping-option-cost ${
                rate.cost === 0 ? 'checkout-shipping-option-free' : ''
              }`}
            >
              {rate.cost === 0 ? (
                'Free'
              ) : (
                <Money data={{amount: String(rate.cost), currencyCode: 'ZAR' as CurrencyCode}} />
              )}
            </span>
          </label>
        ))}

        {collectionAddress && (
          <label className="checkout-shipping-option">
            <input
              type="radio"
              name="delivery"
              checked={isCollectionSelected}
              onChange={() => selectCollection(collectionDate, collectionTime)}
            />
            <span className="checkout-shipping-option-label">
              Collection from Hose World store
              <div style={{fontSize: '0.8rem', opacity: 0.7, marginTop: '2px'}}>
                {collectionAddress.company}, {collectionAddress.street}, {collectionAddress.city},{' '}
                {collectionAddress.zone} {collectionAddress.code}
              </div>
            </span>
            <span className="checkout-shipping-option-cost checkout-shipping-option-free">Free</span>
          </label>
        )}
      </div>

      {isCollectionSelected && (
        <div className="checkout-form-row" style={{marginTop: '0.75rem'}}>
          <div className="checkout-form-field">
            <label htmlFor="collectionDate" className="checkout-form-label">
              Preferred collection date
            </label>
            <input
              id="collectionDate"
              type="date"
              required
              min={minCollectionDate}
              className="checkout-form-input"
              value={collectionDate}
              onChange={(e) => {
                setCollectionDate(e.target.value);
                selectCollection(e.target.value, collectionTime);
              }}
            />
          </div>
          <div className="checkout-form-field">
            <label htmlFor="collectionTime" className="checkout-form-label">
              Preferred collection time
            </label>
            <input
              id="collectionTime"
              type="time"
              required
              min={collectionHours?.min}
              max={collectionHours?.max}
              className="checkout-form-input"
              value={collectionTime}
              onChange={(e) => {
                setCollectionTime(e.target.value);
                selectCollection(collectionDate, e.target.value);
              }}
            />
          </div>
        </div>
      )}

      {isCollectionSelected && (
        <p style={{fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem'}}>
          Collection is available at least 4 working days ahead, Mon–Thu 08:00–16:30 or Fri 08:00–15:30.
        </p>
      )}

      {isCollectionSelected && scheduleError && (
        <div className="checkout-errors" style={{marginTop: '0.5rem'}}>
          <p>{scheduleError}</p>
        </div>
      )}

      <div className="checkout-nav-buttons">
        <button type="button" className="checkout-back-btn" onClick={onBack}>
          &larr; Back
        </button>
        <button
          type="button"
          className="checkout-submit-btn"
          onClick={onContinue}
          disabled={!canContinue}
        >
          Continue to Review →
        </button>
      </div>
    </div>
  );
}

function OrderReviewStep({
  cart,
  customerInfo,
  shippingAddress,
  selectedShippingMethod,
  paymentGateway,
  localePrefix,
  invoiceEmailRequested,
  onInvoiceEmailChange,
  businessCustomer,
  businessDetails,
  payfastStatus,
  eftBankingDetails,
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
  selectedShippingMethod: ShippingSelection | null;
  paymentGateway: string;
  localePrefix: string;
  invoiceEmailRequested: boolean;
  onInvoiceEmailChange: (v: boolean) => void;
  businessCustomer: boolean;
  businessDetails: {companyName: string; vatNumber: string; regNumber: string};
  payfastStatus: {indicator: string; description: string} | null;
  eftBankingDetails: {
    bankName: string;
    accountHolder: string;
    accountNumber: string;
    branchCode: string;
    swiftCode: string;
  } | null;
  onBack: () => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState<'payfast' | 'eft'>('payfast');
  const shippingCurrency = cart.cost?.subtotalAmount?.currencyCode ?? ('ZAR' as CurrencyCode);
  const shippingTitle =
    selectedShippingMethod?.type === 'tcg'
      ? selectedShippingMethod.title
      : selectedShippingMethod?.type === 'collection'
        ? 'Collection from Hose World store'
        : null;
  const shippingCost = selectedShippingMethod?.type === 'tcg' ? selectedShippingMethod.cost : 0;

  // Display-only VAT estimate (matches the same 15% rate the real charge uses
  // server-side via the Shopify draft order) — subtotal + shipping combined.
  const vatBaseAmount = cart.cost?.subtotalAmount
    ? {
        amount: (parseFloat(cart.cost.subtotalAmount.amount) + shippingCost).toFixed(2),
        currencyCode: cart.cost.subtotalAmount.currencyCode,
      }
    : null;

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

      {shippingTitle && (
        <div className="checkout-review-section">
          <h3>Shipping Method</h3>
          <p>
            {shippingTitle}
            {' — '}
            {shippingCost === 0 ? (
              'Free'
            ) : (
              <Money data={{amount: String(shippingCost), currencyCode: shippingCurrency}} />
            )}
          </p>
          {selectedShippingMethod?.type === 'collection' && (
            <p style={{fontSize: '0.85rem', opacity: 0.75}}>
              Preferred: {selectedShippingMethod.collectionDate} {selectedShippingMethod.collectionTime}
            </p>
          )}
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
                  <Money data={withDisplayVat(line.cost.totalAmount)} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="checkout-review-section checkout-review-totals">
        <div className="checkout-review-total-row">
          <span>Subtotal (excl. VAT)</span>
          <span>
            {cart.cost?.subtotalAmount ? (
              <Money data={cart.cost.subtotalAmount} />
            ) : (
              '-'
            )}
          </span>
        </div>
        {shippingTitle && shippingCost > 0 && (
          <div className="checkout-review-total-row">
            <span>Shipping</span>
            <span>
              <Money data={{amount: String(shippingCost), currencyCode: shippingCurrency}} />
            </span>
          </div>
        )}
        {vatBaseAmount && (
          <div className="checkout-review-total-row">
            <span>VAT</span>
            <span>
              <Money data={displayVatOnly(vatBaseAmount)} />
            </span>
          </div>
        )}
        <div className="checkout-review-total-row checkout-review-grand-total">
          <span>Total (incl. VAT)</span>
          <span>
            {vatBaseAmount ? (
              <Money data={withDisplayVat(vatBaseAmount)} />
            ) : (
              '-'
            )}
          </span>
        </div>
      </div>

      <div className="checkout-review-section">
        <h3>Discounts &amp; Gift Cards</h3>
        <CheckoutDiscounts cart={cart} localePrefix={localePrefix} />
        <CheckoutGiftCard cart={cart} localePrefix={localePrefix} />
      </div>

      <div className="checkout-review-section checkout-payment-info">
        <h3>Payment</h3>
        {paymentGateway === 'payfast' && eftBankingDetails?.accountNumber ? (
          <>
            <div className="checkout-payment-methods" role="radiogroup" aria-label="Payment method">
              <label style={{display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer'}}>
                <input
                  type="radio"
                  name="paymentMethodChoice"
                  checked={paymentMethod === 'payfast'}
                  onChange={() => setPaymentMethod('payfast')}
                />
                Card / PayFast
              </label>
              <label style={{display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer'}}>
                <input
                  type="radio"
                  name="paymentMethodChoice"
                  checked={paymentMethod === 'eft'}
                  onChange={() => setPaymentMethod('eft')}
                />
                Self EFT
              </label>
            </div>

            {paymentMethod === 'payfast' ? (
              <p>You will be redirected to PayFast to complete your payment securely.</p>
            ) : (
              <div className="checkout-eft-details">
                <p>
                  <strong>Your order will only be processed once payment reflects in our bank account.</strong>{' '}
                  Please allow 1–2 business days for EFT payments to clear, and use the order
                  reference (shown after you confirm) as your payment reference.
                </p>
                <dl style={{margin: '0.75rem 0 0', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.25rem 0.75rem', fontSize: '0.9rem'}}>
                  <dt style={{opacity: 0.7}}>Bank</dt>
                  <dd>{eftBankingDetails.bankName}</dd>
                  <dt style={{opacity: 0.7}}>Account holder</dt>
                  <dd>{eftBankingDetails.accountHolder}</dd>
                  <dt style={{opacity: 0.7}}>Account number</dt>
                  <dd>{eftBankingDetails.accountNumber}</dd>
                  <dt style={{opacity: 0.7}}>Branch code</dt>
                  <dd>{eftBankingDetails.branchCode}</dd>
                  {eftBankingDetails.swiftCode && (
                    <>
                      <dt style={{opacity: 0.7}}>SWIFT</dt>
                      <dd>{eftBankingDetails.swiftCode}</dd>
                    </>
                  )}
                </dl>
              </div>
            )}
          </>
        ) : paymentGateway === 'payfast' ? (
          <p>You will be redirected to PayFast to complete your payment securely.</p>
        ) : (
          <p>You will be redirected to our secure payment page to complete your order.</p>
        )}
        {paymentGateway === 'payfast' && paymentMethod === 'payfast' && (
          <div className="checkout-payment-methods">
            <span className="checkout-payment-badge">Card</span>
            <span className="checkout-payment-badge">EFT via PayFast</span>
          </div>
        )}
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

      {paymentGateway === 'payfast' && payfastStatus && (
        <div
          className={`checkout-payfast-status-banner ${
            payfastStatus.indicator === 'minor' ? 'is-minor' : 'is-outage'
          }`}
        >
          {payfastStatus.indicator === 'minor'
            ? `PayFast is currently reporting degraded service${
                payfastStatus.description ? ` (“${payfastStatus.description}”)` : ''
              }. Your payment may be slower than usual.`
            : `PayFast is currently reporting an outage${
                payfastStatus.description ? ` (“${payfastStatus.description}”)` : ''
              }. Payment is temporarily unavailable — your cart is saved, please try again shortly.`}
        </div>
      )}

      <div className="checkout-nav-buttons">
        <button type="button" className="checkout-back-btn" onClick={onBack}>
          &larr; Back
        </button>
        {paymentGateway === 'payfast' ? (
          <PayFastPaymentForm
            cart={cart}
            customerInfo={customerInfo}
            shippingAddress={shippingAddress}
            selectedShippingMethod={selectedShippingMethod}
            localePrefix={localePrefix}
            invoiceEmailRequested={invoiceEmailRequested}
            businessCustomer={businessCustomer}
            businessDetails={businessDetails}
            paymentMethod={paymentMethod}
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

function CheckoutDiscounts({cart, localePrefix}: {cart: CartApiQueryFragment; localePrefix: string}) {
  const codes = (cart.discountCodes ?? [])
    .filter((d) => d.applicable)
    .map((d) => d.code);

  return (
    <div style={{marginBottom: '0.75rem'}}>
      {codes.length > 0 && (
        <div style={{marginBottom: '0.5rem'}}>
          <CartForm route={`${localePrefix}/cart`} action={CartForm.ACTIONS.DiscountCodesUpdate} inputs={{discountCodes: []}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem'}}>
              <code style={{background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px'}}>{codes.join(', ')}</code>
              <button type="submit" style={{background: 'none', border: 'none', color: 'rgba(255,100,100,0.8)', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline', padding: 0}}>
                Remove
              </button>
            </div>
          </CartForm>
        </div>
      )}
      <CartForm route={`${localePrefix}/cart`} action={CartForm.ACTIONS.DiscountCodesUpdate} inputs={{discountCodes: codes}}>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <input
            type="text"
            name="discountCode"
            placeholder="Discount code"
            className="checkout-form-input"
            style={{flex: 1, margin: 0}}
          />
          <button type="submit" className="checkout-back-btn" style={{margin: 0, whiteSpace: 'nowrap'}}>
            Apply
          </button>
        </div>
      </CartForm>
    </div>
  );
}

function CheckoutGiftCard({cart, localePrefix}: {cart: CartApiQueryFragment; localePrefix: string}) {
  const appliedCards = cart.appliedGiftCards ?? [];
  return (
    <div>
      {appliedCards.length > 0 && (
        <div style={{marginBottom: '0.5rem'}}>
          {appliedCards.map((gc) => (
            <CartForm key={gc.id} route={`${localePrefix}/cart`} action={CartForm.ACTIONS.GiftCardCodesRemove} inputs={{giftCardCodes: [gc.id]}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '0.25rem'}}>
                <code style={{background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px'}}>***{gc.lastCharacters}</code>
                <Money data={gc.amountUsed} />
                <button type="submit" style={{background: 'none', border: 'none', color: 'rgba(255,100,100,0.8)', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline', padding: 0}}>
                  Remove
                </button>
              </div>
            </CartForm>
          ))}
        </div>
      )}
      <CartForm route={`${localePrefix}/cart`} action={CartForm.ACTIONS.GiftCardCodesAdd}>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <input
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            className="checkout-form-input"
            style={{flex: 1, margin: 0}}
          />
          <button type="submit" className="checkout-back-btn" style={{margin: 0, whiteSpace: 'nowrap'}}>
            Apply
          </button>
        </div>
      </CartForm>
    </div>
  );
}

function PayFastPaymentForm({
  cart,
  customerInfo,
  shippingAddress,
  selectedShippingMethod,
  localePrefix,
  invoiceEmailRequested,
  businessCustomer,
  businessDetails,
  paymentMethod,
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
  selectedShippingMethod: ShippingSelection | null;
  localePrefix: string;
  invoiceEmailRequested: boolean;
  businessCustomer: boolean;
  businessDetails: {companyName: string; vatNumber: string; regNumber: string};
  paymentMethod: 'payfast' | 'eft';
}) {
  const payFetcher = useFetcher<{error?: string}>({key: 'payfast-initiate'});
  const isSubmitting = payFetcher.state !== 'idle';

  return (
    <payFetcher.Form
      method="post"
      action={`${localePrefix}/checkout/payment`}
    >
      {/* Cart reference */}
      <input type="hidden" name="paymentMethod" value={paymentMethod} />
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
        value={
          selectedShippingMethod?.type === 'tcg'
            ? selectedShippingMethod.title
            : selectedShippingMethod?.type === 'collection'
              ? 'Collection from Hose World store'
              : ''
        }
      />
      <input
        type="hidden"
        name="shippingCost"
        value={selectedShippingMethod?.type === 'tcg' ? String(selectedShippingMethod.cost) : '0'}
      />
      <input
        type="hidden"
        name="shippingMethodType"
        value={selectedShippingMethod?.type ?? ''}
      />
      <input
        type="hidden"
        name="tcgRateId"
        value={selectedShippingMethod?.type === 'tcg' ? String(selectedShippingMethod.rateId) : ''}
      />
      <input
        type="hidden"
        name="tcgServiceLevel"
        value={selectedShippingMethod?.type === 'tcg' ? selectedShippingMethod.serviceLevel ?? '' : ''}
      />
      <input
        type="hidden"
        name="collectionDate"
        value={
          selectedShippingMethod?.type === 'collection' ? selectedShippingMethod.collectionDate : ''
        }
      />
      <input
        type="hidden"
        name="collectionTime"
        value={
          selectedShippingMethod?.type === 'collection' ? selectedShippingMethod.collectionTime : ''
        }
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
        {isSubmitting
          ? paymentMethod === 'eft'
            ? 'Placing order...'
            : 'Redirecting to PayFast...'
          : paymentMethod === 'eft'
            ? 'Confirm Order — Pay via EFT →'
            : 'Proceed to Payment →'}
      </button>
    </payFetcher.Form>
  );
}
