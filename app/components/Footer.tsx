import {Suspense, useEffect, useState} from 'react';
import {Await, NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import VERSION from '../../VERSION?raw';

type StorefrontSettings = Record<string, {value: string} | null> | null;

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
  footerBanner?: Promise<string | null>;
  storefrontSettings?: Promise<StorefrontSettings>;
  onOpenCookiePreferences?: () => void;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
  footerBanner,
  storefrontSettings,
  onOpenCookiePreferences,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="footer">
            {footerBanner && (
              <Suspense>
                <Await resolve={footerBanner}>
                  {(bannerHtml) =>
                    bannerHtml ? (
                      <div
                        className="footer-banner bg-gray-900 text-white px-4 py-6 text-center"
                        dangerouslySetInnerHTML={{__html: bannerHtml}}
                      />
                    ) : null
                  }
                </Await>
              </Suspense>
            )}
            {footer?.menu && header.shop.primaryDomain?.url && (
              <FooterMenu
                menu={footer.menu}
                primaryDomainUrl={header.shop.primaryDomain.url}
                publicStoreDomain={publicStoreDomain}
              />
            )}
            <Suspense fallback={<FooterUtilities settings={null} onOpenCookiePreferences={onOpenCookiePreferences} />}>
              <Await resolve={storefrontSettings ?? Promise.resolve(null)}>
                {(settings) => (
                  <FooterUtilities
                    settings={settings}
                    onOpenCookiePreferences={onOpenCookiePreferences}
                  />
                )}
              </Await>
            </Suspense>
            <FooterBrandBar />
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterBrandBar() {
  return (
    <div className="footer-brand">
      <p className="footer-copyright">
        © {new Date().getFullYear()} Hose World. All rights reserved.
      </p>
      <span className="footer-version">v{VERSION.trim()}</span>
      <div className="footer-powered-by">
        <img
          src="/images/rn-logo_50-150dpi.png"
          alt="Rogue Nation"
          className="footer-powered-logo"
        />
        <span>Powered by: Rogue Nation</span>
      </div>
    </div>
  );
}

const DEFAULT_IMAGE_CREDIT_TEXT = `Images on Pixbay by:
We thank the photogrephers for their work and allowing us to use their images
Bru-nO
johnnaturephotos
trapezemike
anncapictures
Pexels
ThMilherou
jp26jp
jarmoluk
cocoparisienne
VariousPhotography
Life-Of-Pix
chulmin1700
malateronald
igorovsyannykov`;

type FooterModalKey =
  | 'imageCredit'
  | 'privacyPolicy'
  | 'termsOfService'
  | 'refundPolicy';

// Any of these with custom HTML content set in Storefront Settings opens in
// the same floating ContentModal as Image Credit; otherwise it falls back to
// linking straight to Shopify's built-in policy page (the behavior every
// storefront visitor sees today, since all three are currently blank).
const POLICY_LINKS: Array<{
  key: FooterModalKey;
  label: string;
  contentKey: string;
  fallbackTo: string;
}> = [
  {
    key: 'privacyPolicy',
    label: 'Privacy Policy',
    contentKey: 'privacyPolicyContent',
    fallbackTo: '/policies/privacy-policy',
  },
  {
    key: 'termsOfService',
    label: 'Terms of Service',
    contentKey: 'termsOfServiceContent',
    fallbackTo: '/policies/terms-of-service',
  },
  {
    key: 'refundPolicy',
    label: 'Refund Policy',
    contentKey: 'refundPolicyContent',
    fallbackTo: '/policies/refund-policy',
  },
];

function FooterUtilities({
  settings,
  onOpenCookiePreferences,
}: {
  settings: StorefrontSettings;
  onOpenCookiePreferences?: () => void;
}) {
  const [openModal, setOpenModal] = useState<FooterModalKey | null>(null);
  const imageCreditText =
    settings?.imageCreditText?.value || DEFAULT_IMAGE_CREDIT_TEXT;

  return (
    <div className="footer-utilities flex justify-center gap-4 px-4 py-3 text-xs text-gray-400 border-t border-gray-800">
      {POLICY_LINKS.map((policy) => {
        const content = settings?.[policy.contentKey]?.value;
        if (content) {
          return (
            <button
              key={policy.key}
              type="button"
              onClick={() => setOpenModal(policy.key)}
            >
              {policy.label}
            </button>
          );
        }
        return (
          <NavLink key={policy.key} to={policy.fallbackTo} prefetch="intent">
            {policy.label}
          </NavLink>
        );
      })}
      <button type="button" onClick={() => setOpenModal('imageCredit')}>
        Image Credit
      </button>
      {onOpenCookiePreferences && (
        <button type="button" onClick={onOpenCookiePreferences}>
          Cookie Preferences
        </button>
      )}
      {openModal === 'imageCredit' && (
        <ContentModal
          title="Image Credit"
          text={imageCreditText}
          onClose={() => setOpenModal(null)}
        />
      )}
      {POLICY_LINKS.map((policy) => {
        const content = settings?.[policy.contentKey]?.value;
        if (openModal !== policy.key || !content) return null;
        return (
          <ContentModal
            key={policy.key}
            title={policy.label}
            text={content}
            onClose={() => setOpenModal(null)}
          />
        );
      })}
    </div>
  );
}

// Floating overlay for any admin-authored HTML content (Image Credit + the 3
// policy modals). Content renders through .rich-html-content (app.css) so
// bullets/tables/columns from pasted HTML render correctly instead of being
// stripped by Tailwind Preflight / reset.css's blanket list-style reset.
function ContentModal({
  title,
  text,
  onClose,
}: {
  title: string;
  text: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="max-w-md w-full max-h-[85vh] overflow-y-auto rounded-md p-4 text-left text-sm whitespace-pre-line text-gray-300"
        style={{background: 'rgba(50, 50, 50, 0.85)'}}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="rich-html-content text-white font-medium mb-2"
          dangerouslySetInnerHTML={{__html: text}}
        />
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={`Close ${title.toLowerCase()}`}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-black text-xl leading-none hover:bg-white"
      >
        ×
      </button>
    </div>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
