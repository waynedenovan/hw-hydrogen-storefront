import {useFetcher, useLocation} from 'react-router';
import {useState, useRef, useEffect} from 'react';
import {CartForm} from '@shopify/hydrogen';

const LOCALES = [
  {country: 'ZA', language: 'EN', label: 'South Africa (ZAR)', prefix: ''},
  {country: 'NZ', language: 'EN', label: 'New Zealand (NZD)', prefix: '/en-nz'},
  {country: 'AU', language: 'EN', label: 'Australia (AUD)', prefix: '/en-au'},
  {country: 'US', language: 'EN', label: 'United States (USD)', prefix: '/en-us'},
];

export function CountrySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fetcher = useFetcher();
  const pendingNavRef = useRef<string | null>(null);

  const currentPrefix = `/${location.pathname.split('/')[1]?.toLowerCase() ?? ''}`;
  const currentLocale =
    LOCALES.find((l) => l.prefix === currentPrefix) ?? LOCALES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (fetcher.state === 'idle' && pendingNavRef.current) {
      const path = pendingNavRef.current;
      pendingNavRef.current = null;
      window.location.href = path;
    }
  }, [fetcher.state]);

  function handleLocaleChange(locale: (typeof LOCALES)[number]) {
    setIsOpen(false);
    const pathWithoutPrefix = location.pathname.replace(
      /^\/(en-nz|en-au|en-us|en-za)/,
      '',
    );
    const newPath = locale.prefix + (pathWithoutPrefix || '/');
    pendingNavRef.current = newPath;

    const formData = new FormData();
    formData.set(
      CartForm.INPUT_NAME,
      JSON.stringify({
        action: CartForm.ACTIONS.BuyerIdentityUpdate,
        inputs: {buyerIdentity: {countryCode: locale.country}},
      }),
    );
    fetcher.submit(formData, {method: 'POST', action: '/cart'});
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="reset text-sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select country"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '4px'}}
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {currentLocale.country}
      </button>
      {isOpen && (
        <div className="dropdown-panel absolute top-full right-0 mt-1 z-50 min-w-[180px]">
          {LOCALES.map((locale) => (
            <button
              key={locale.country}
              className={`block w-full text-left px-4 py-2 text-sm ${
                locale.country === currentLocale.country ? 'font-bold' : ''
              }`}
              style={
                locale.country === currentLocale.country
                  ? {background: 'rgba(255, 255, 255, 0.15)'}
                  : undefined
              }
              onClick={() => handleLocaleChange(locale)}
            >
              {locale.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
