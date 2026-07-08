import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import VERSION from '../../VERSION?raw';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
  footerBanner?: Promise<string | null>;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
  footerBanner,
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
            <FooterUtilities />
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

function FooterUtilities() {
  return (
    <div className="footer-utilities flex justify-center gap-4 px-4 py-3 text-xs text-gray-400 border-t border-gray-800">
      <NavLink to="/policies/privacy-policy" prefetch="intent">
        Privacy Policy
      </NavLink>
      <NavLink to="/policies/terms-of-service" prefetch="intent">
        Terms of Service
      </NavLink>
      <NavLink to="/policies/refund-policy" prefetch="intent">
        Refund Policy
      </NavLink>
      <NavLink to="/policies/shipping-policy" prefetch="intent">
        Shipping Policy
      </NavLink>
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
