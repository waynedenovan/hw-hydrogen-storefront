import {useFetcher, useLocation} from 'react-router';
import {useState, useRef, useEffect} from 'react';
import {CartForm} from '@shopify/hydrogen';

const LOCALES = [
  {country: 'NZ', language: 'EN', label: 'New Zealand (NZD)', prefix: ''},
  {country: 'AU', language: 'EN', label: 'Australia (AUD)', prefix: '/en-au'},
  {country: 'US', language: 'EN', label: 'United States (USD)', prefix: '/en-us'},
];

export function CountrySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  function handleLocaleChange(locale: (typeof LOCALES)[number]) {
    setIsOpen(false);
    const pathWithoutPrefix = location.pathname.replace(
      /^\/(en-nz|en-au|en-us)/,
      '',
    );
    const newPath = locale.prefix + (pathWithoutPrefix || '/');
    window.location.href = newPath;
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="reset text-sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select country"
      >
        {currentLocale.country} ▾
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[180px]">
          {LOCALES.map((locale) => (
            <button
              key={locale.country}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                locale.country === currentLocale.country
                  ? 'font-bold bg-gray-50'
                  : ''
              }`}
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
