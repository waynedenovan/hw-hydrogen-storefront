import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { PassThrough } from 'node:stream';
import { createReadableStreamFromReadable } from '@react-router/node';
import { ServerRouter, Await, NavLink, useLocation, useFetcher, useAsyncValue, Link, useNavigate, UNSAFE_withComponentProps, useRouteLoaderData, Outlet, UNSAFE_withErrorBoundaryProps, useRouteError, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useLoaderData, useSearchParams, data, redirect, useRevalidator, useActionData, Form, useOutletContext } from 'react-router';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { createContentSecurityPolicy, CartForm, useOptimisticCart, useAnalytics, Money, Image, Analytics, useNonce, getShopAnalytics, Pagination, getPaginationVariables, VariantSelector, getSelectedProductOptions, getSitemap, getSitemapIndex } from '@shopify/hydrogen';
import { createContext, useEffect, useContext, useState, Suspense, useRef, useMemo, useId } from 'react';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const ABORT_DELAY = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, reactRouterContext, context) {
  const devTunnel = context.env.DEV_TUNNEL_DOMAIN;
  const { nonce, header, NonceProvider } = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN
    },
    ...devTunnel ? { connectSrc: [`wss://${devTunnel}:*`] } : {}
  });
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const userAgent = request.headers.get("user-agent");
    const readyOption = userAgent && isbot(userAgent) ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(NonceProvider, { children: /* @__PURE__ */ jsx(
        ServerRouter,
        {
          context: reactRouterContext,
          url: request.url,
          nonce
        }
      ) }),
      {
        nonce,
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.set("Content-Security-Policy", header);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleError(error, { request }) {
  if (!request.signal.aborted) {
    console.error("[handleError]", request.method, request.url, error);
  }
}

const entryServer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  handleError
}, Symbol.toStringTag, { value: 'Module' }));

const favicon = "/assets/favicon-DZkC1E9c.svg";

const MENU_FRAGMENT = `#graphql
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
  fragment Menu on Menu {
    id
    items {
      ...ParentMenuItem
    }
  }
`;
const HEADER_QUERY = `#graphql
  fragment Shop on Shop {
    id
    name
    description
    primaryDomain {
      url
    }
    brand {
      logo {
        image {
          url
        }
      }
    }
  }
  query Header(
    $headerMenuHandle: String!
  ) {
    shop {
      ...Shop
    }
    menu(handle: $headerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
`;
const FOOTER_QUERY = `#graphql
  query Footer(
    $footerMenuHandle: String!
  ) {
    menu(handle: $footerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
`;

const CUSTOMER_NAME_QUERY = `#graphql
  query CustomerName {
    customer {
      firstName
    }
  }
`;

const resetStyles = "/assets/reset-CWZbsAai.css";

const appStyles = "/assets/app-OBsSJUet.css";

function Aside({
  children,
  heading,
  type
}) {
  const { type: activeType, close } = useAside();
  const expanded = type === activeType;
  useEffect(() => {
    const abortController = new AbortController();
    if (expanded) {
      document.addEventListener(
        "keydown",
        function handler(event) {
          if (event.key === "Escape") {
            close();
          }
        },
        { signal: abortController.signal }
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "aria-modal": true,
      className: `overlay ${expanded ? "expanded" : ""}`,
      role: "dialog",
      children: [
        /* @__PURE__ */ jsx("button", { className: "close-outside", onClick: close }),
        /* @__PURE__ */ jsxs("aside", { children: [
          /* @__PURE__ */ jsxs("header", { children: [
            /* @__PURE__ */ jsx("h3", { children: heading }),
            /* @__PURE__ */ jsx("button", { className: "close reset", onClick: close, "aria-label": "Close", children: "×" })
          ] }),
          /* @__PURE__ */ jsx("main", { children })
        ] })
      ]
    }
  );
}
const AsideContext = createContext(null);
Aside.Provider = function AsideProvider({ children }) {
  const [type, setType] = useState("closed");
  return /* @__PURE__ */ jsx(
    AsideContext.Provider,
    {
      value: {
        type,
        open: setType,
        close: () => setType("closed")
      },
      children
    }
  );
};
function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error("useAside must be used within an AsideProvider");
  }
  return aside;
}

function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
  footerBanner
}) {
  return /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(Await, { resolve: footerPromise, children: (footer) => /* @__PURE__ */ jsxs("footer", { className: "footer", children: [
    footerBanner && /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(Await, { resolve: footerBanner, children: (bannerHtml) => bannerHtml ? /* @__PURE__ */ jsx(
      "div",
      {
        className: "footer-banner bg-gray-900 text-white px-4 py-6 text-center",
        dangerouslySetInnerHTML: { __html: bannerHtml }
      }
    ) : null }) }),
    footer?.menu && header.shop.primaryDomain?.url && /* @__PURE__ */ jsx(
      FooterMenu,
      {
        menu: footer.menu,
        primaryDomainUrl: header.shop.primaryDomain.url,
        publicStoreDomain
      }
    ),
    /* @__PURE__ */ jsx(FooterUtilities, {})
  ] }) }) });
}
function FooterUtilities() {
  return /* @__PURE__ */ jsxs("div", { className: "footer-utilities flex justify-center gap-4 px-4 py-3 text-xs text-gray-400 border-t border-gray-800", children: [
    /* @__PURE__ */ jsx(NavLink, { to: "/policies/privacy-policy", prefetch: "intent", children: "Privacy Policy" }),
    /* @__PURE__ */ jsx(NavLink, { to: "/policies/terms-of-service", prefetch: "intent", children: "Terms of Service" }),
    /* @__PURE__ */ jsx(NavLink, { to: "/policies/refund-policy", prefetch: "intent", children: "Refund Policy" }),
    /* @__PURE__ */ jsx(NavLink, { to: "/policies/shipping-policy", prefetch: "intent", children: "Shipping Policy" })
  ] });
}
function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain
}) {
  return /* @__PURE__ */ jsx("nav", { className: "footer-menu", role: "navigation", children: (menu || FALLBACK_FOOTER_MENU).items.map((item) => {
    if (!item.url) return null;
    const url = item.url.includes("myshopify.com") || item.url.includes(publicStoreDomain) || item.url.includes(primaryDomainUrl) ? new URL(item.url).pathname : item.url;
    const isExternal = !url.startsWith("/");
    return isExternal ? /* @__PURE__ */ jsx("a", { href: url, rel: "noopener noreferrer", target: "_blank", children: item.title }, item.id) : /* @__PURE__ */ jsx(
      NavLink,
      {
        end: true,
        prefetch: "intent",
        style: activeLinkStyle$1,
        to: url,
        children: item.title
      },
      item.id
    );
  }) });
}
const FALLBACK_FOOTER_MENU = {
  items: [
    {
      id: "gid://shopify/MenuItem/461633060920",
      resourceId: "gid://shopify/ShopPolicy/23358046264",
      tags: [],
      title: "Privacy Policy",
      type: "SHOP_POLICY",
      url: "/policies/privacy-policy",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461633093688",
      resourceId: "gid://shopify/ShopPolicy/23358013496",
      tags: [],
      title: "Refund Policy",
      type: "SHOP_POLICY",
      url: "/policies/refund-policy",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461633126456",
      resourceId: "gid://shopify/ShopPolicy/23358111800",
      tags: [],
      title: "Shipping Policy",
      type: "SHOP_POLICY",
      url: "/policies/shipping-policy",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461633159224",
      resourceId: "gid://shopify/ShopPolicy/23358079032",
      tags: [],
      title: "Terms of Service",
      type: "SHOP_POLICY",
      url: "/policies/terms-of-service",
      items: []
    }
  ]
};
function activeLinkStyle$1({
  isActive,
  isPending
}) {
  return {
    fontWeight: isActive ? "bold" : void 0,
    color: isPending ? "grey" : "white"
  };
}

const LOCALES = [
  { country: "ZA", language: "EN", label: "South Africa (ZAR)", prefix: "" },
  { country: "NZ", language: "EN", label: "New Zealand (NZD)", prefix: "/en-nz" },
  { country: "AU", language: "EN", label: "Australia (AUD)", prefix: "/en-au" },
  { country: "US", language: "EN", label: "United States (USD)", prefix: "/en-us" }
];
function CountrySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const fetcher = useFetcher();
  const pendingNavRef = useRef(null);
  const currentPrefix = `/${location.pathname.split("/")[1]?.toLowerCase() ?? ""}`;
  const currentLocale = LOCALES.find((l) => l.prefix === currentPrefix) ?? LOCALES[0];
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (fetcher.state === "idle" && pendingNavRef.current) {
      const path = pendingNavRef.current;
      pendingNavRef.current = null;
      window.location.href = path;
    }
  }, [fetcher.state]);
  function handleLocaleChange(locale) {
    setIsOpen(false);
    const pathWithoutPrefix = location.pathname.replace(
      /^\/(en-nz|en-au|en-us|en-za)/,
      ""
    );
    const newPath = locale.prefix + (pathWithoutPrefix || "/");
    pendingNavRef.current = newPath;
    const formData = new FormData();
    formData.set(
      CartForm.INPUT_NAME,
      JSON.stringify({
        action: CartForm.ACTIONS.BuyerIdentityUpdate,
        inputs: { buyerIdentity: { countryCode: locale.country } }
      })
    );
    fetcher.submit(formData, { method: "POST", action: "/cart" });
  }
  return /* @__PURE__ */ jsxs("div", { ref: dropdownRef, className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "reset text-sm",
        onClick: () => setIsOpen(!isOpen),
        "aria-expanded": isOpen,
        "aria-label": "Select country",
        children: [
          /* @__PURE__ */ jsxs(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              style: { display: "inline-block", verticalAlign: "middle", marginRight: "4px" },
              children: [
                /* @__PURE__ */ jsx("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }),
                /* @__PURE__ */ jsx("circle", { cx: "12", cy: "10", r: "3" })
              ]
            }
          ),
          currentLocale.country
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "dropdown-panel absolute top-full right-0 mt-1 z-50 min-w-[180px]", children: LOCALES.map((locale) => /* @__PURE__ */ jsx(
      "button",
      {
        className: `block w-full text-left px-4 py-2 text-sm ${locale.country === currentLocale.country ? "font-bold" : ""}`,
        style: locale.country === currentLocale.country ? { background: "rgba(255, 255, 255, 0.15)" } : void 0,
        onClick: () => handleLocaleChange(locale),
        children: locale.label
      },
      locale.country
    )) })
  ] });
}

function Header({
  header,
  isLoggedIn,
  customerFirstName,
  cart,
  publicStoreDomain,
  isHomePage = false
}) {
  const { shop, menu } = header;
  return /* @__PURE__ */ jsxs("div", { className: "header-hero", children: [
    /* @__PURE__ */ jsxs("header", { className: "header site-header", children: [
      /* @__PURE__ */ jsx(NavLink, { prefetch: "intent", to: "/", end: true, className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/260601-logo_rev-02.1.svg",
          alt: shop.name,
          className: "h-auto",
          style: { width: "clamp(160px, 11.25vw, 300px)" }
        }
      ) }),
      /* @__PURE__ */ jsx(
        HeaderMenu,
        {
          menu,
          viewport: "desktop",
          primaryDomainUrl: header.shop.primaryDomain.url,
          publicStoreDomain
        }
      ),
      /* @__PURE__ */ jsx(HeaderCtas, { isLoggedIn, customerFirstName, cart })
    ] }),
    isHomePage && /* @__PURE__ */ jsx("div", { className: "header-tagline", children: /* @__PURE__ */ jsx("p", { children: "PROUDLY SERVING OUR CLIENTS FOR OVER 25 YEARS" }) })
  ] });
}
function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain
}) {
  const className = `header-menu-${viewport}`;
  const { close } = useAside();
  return /* @__PURE__ */ jsxs("nav", { className, role: "navigation", children: [
    viewport === "mobile" && /* @__PURE__ */ jsx(
      NavLink,
      {
        end: true,
        onClick: close,
        prefetch: "intent",
        style: activeLinkStyle(),
        to: "/",
        children: "Home"
      }
    ),
    (menu || FALLBACK_HEADER_MENU).items.map((item) => {
      if (!item.url) return null;
      const url = item.url.includes("myshopify.com") || item.url.includes(publicStoreDomain) || item.url.includes(primaryDomainUrl) ? new URL(item.url).pathname : item.url;
      return /* @__PURE__ */ jsx(
        NavLink,
        {
          className: "header-menu-item",
          end: true,
          onClick: close,
          prefetch: "intent",
          style: activeLinkStyle(),
          to: url,
          children: item.title
        },
        item.id
      );
    })
  ] });
}
function AccountIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "7", r: "4" })
      ]
    }
  );
}
function HeaderCtas({
  isLoggedIn,
  customerFirstName,
  cart
}) {
  return /* @__PURE__ */ jsxs("nav", { className: "header-ctas", role: "navigation", children: [
    /* @__PURE__ */ jsx(HeaderMenuMobileToggle, {}),
    /* @__PURE__ */ jsx(CountrySelector, {}),
    /* @__PURE__ */ jsx(
      Suspense,
      {
        fallback: /* @__PURE__ */ jsx(NavLink, { prefetch: "intent", to: "/account/login", "aria-label": "Sign in", children: /* @__PURE__ */ jsx(AccountIcon, {}) }),
        children: /* @__PURE__ */ jsx(Await, { resolve: isLoggedIn, children: (loggedIn) => loggedIn ? /* @__PURE__ */ jsxs(
          NavLink,
          {
            prefetch: "intent",
            to: "/account",
            "aria-label": "Account",
            className: "header-account-link",
            children: [
              /* @__PURE__ */ jsx(AccountIcon, {}),
              customerFirstName && /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(Await, { resolve: customerFirstName, children: (name) => name ? /* @__PURE__ */ jsx("span", { className: "header-customer-name", children: name }) : null }) })
            ]
          }
        ) : /* @__PURE__ */ jsx(NavLink, { prefetch: "intent", to: "/account/login", "aria-label": "Sign in", children: /* @__PURE__ */ jsx(AccountIcon, {}) }) })
      }
    ),
    /* @__PURE__ */ jsx(SearchToggle, {}),
    /* @__PURE__ */ jsx(CartToggle, { cart })
  ] });
}
function HeaderMenuMobileToggle() {
  const { open } = useAside();
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: "header-menu-mobile-toggle reset",
      onClick: () => open("mobile"),
      "aria-label": "Menu",
      children: /* @__PURE__ */ jsxs(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [
            /* @__PURE__ */ jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
            /* @__PURE__ */ jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
            /* @__PURE__ */ jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
          ]
        }
      )
    }
  );
}
function SearchToggle() {
  const { open } = useAside();
  return /* @__PURE__ */ jsx("button", { className: "reset", onClick: () => open("search"), "aria-label": "Search", children: /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
      ]
    }
  ) });
}
function CartBadge({ count }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: "/cart",
      className: "cart-icon-wrapper",
      "aria-label": `Cart${count ? ` (${count} items)` : ""}`,
      onClick: (e) => {
        e.preventDefault();
        open("cart");
        publish("cart_viewed", {
          cart,
          prevCart,
          shop,
          url: window.location.href || ""
        });
      },
      children: [
        /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              /* @__PURE__ */ jsx("path", { d: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" }),
              /* @__PURE__ */ jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
              /* @__PURE__ */ jsx("path", { d: "M16 10a4 4 0 0 1-8 0" })
            ]
          }
        ),
        count !== null && count > 0 && /* @__PURE__ */ jsx("span", { className: "cart-badge", children: count })
      ]
    }
  );
}
function CartToggle({ cart }) {
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(CartBadge, { count: null }), children: /* @__PURE__ */ jsx(Await, { resolve: cart, children: /* @__PURE__ */ jsx(CartBanner, {}) }) });
}
function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return /* @__PURE__ */ jsx(CartBadge, { count: cart?.totalQuantity ?? 0 });
}
const FALLBACK_HEADER_MENU = {
  items: [
    {
      id: "gid://shopify/MenuItem/461609500728",
      resourceId: null,
      tags: [],
      title: "Collections",
      type: "HTTP",
      url: "/collections",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461609533496",
      resourceId: null,
      tags: [],
      title: "Blog",
      type: "HTTP",
      url: "/blogs/journal",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461609566264",
      resourceId: null,
      tags: [],
      title: "Policies",
      type: "HTTP",
      url: "/policies",
      items: []
    },
    {
      id: "gid://shopify/MenuItem/461609599032",
      resourceId: "gid://shopify/Page/92591030328",
      tags: [],
      title: "About",
      type: "PAGE",
      url: "/pages/about",
      items: []
    }
  ]
};
function activeLinkStyle(viewport) {
  return ({
    isActive,
    isPending
  }) => ({
    fontWeight: isActive ? "bold" : void 0,
    color: isPending ? "rgba(255,255,255,0.6)" : "white"
  });
}

function useVariantUrl(handle, selectedOptions) {
  const { pathname } = useLocation();
  return useMemo(() => {
    return getVariantUrl({
      handle,
      pathname,
      searchParams: new URLSearchParams(),
      selectedOptions
    });
  }, [handle, selectedOptions, pathname]);
}
function getVariantUrl({
  handle,
  pathname,
  searchParams,
  selectedOptions
}) {
  const match = /(\/[a-zA-Z]{2}-[a-zA-Z]{2}\/)/g.exec(pathname);
  const isLocalePathname = match && match.length > 0;
  const path = isLocalePathname ? `${match[0]}products/${handle}` : `/products/${handle}`;
  selectedOptions?.forEach((option) => {
    searchParams.set(option.name, option.value);
  });
  const searchString = searchParams.toString();
  return path + (searchString ? "?" + searchParams.toString() : "");
}

function ProductPrice({
  price,
  compareAtPrice
}) {
  return /* @__PURE__ */ jsx("div", { className: "product-price", children: compareAtPrice ? /* @__PURE__ */ jsxs("div", { className: "product-price-on-sale", children: [
    price ? /* @__PURE__ */ jsx(Money, { data: price }) : null,
    /* @__PURE__ */ jsx("s", { children: /* @__PURE__ */ jsx(Money, { data: compareAtPrice }) })
  ] }) : price ? /* @__PURE__ */ jsx(Money, { data: price }) : /* @__PURE__ */ jsx("span", { children: " " }) });
}

function CartLineItem({
  layout,
  line,
  childrenMap
}) {
  const { id, merchandise } = line;
  const { product, title, image, selectedOptions } = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const { close } = useAside();
  const lineItemChildren = childrenMap[id];
  const childrenLabelId = `cart-line-children-${id}`;
  return /* @__PURE__ */ jsxs("li", { className: "cart-line", children: [
    /* @__PURE__ */ jsxs("div", { className: "cart-line-inner", children: [
      image && /* @__PURE__ */ jsx(
        Image,
        {
          alt: title,
          aspectRatio: "1/1",
          data: image,
          height: 100,
          loading: "lazy",
          width: 100
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            prefetch: "intent",
            to: lineItemUrl,
            onClick: () => {
              if (layout === "aside") {
                close();
              }
            },
            children: /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: product.title }) })
          }
        ),
        /* @__PURE__ */ jsx(ProductPrice, { price: line?.cost?.totalAmount }),
        /* @__PURE__ */ jsx("ul", { children: selectedOptions.map((option) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("small", { children: [
          option.name,
          ": ",
          option.value
        ] }) }, option.name)) }),
        /* @__PURE__ */ jsx(CartLineQuantity, { line })
      ] })
    ] }),
    lineItemChildren ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("p", { id: childrenLabelId, className: "sr-only", children: [
        "Line items with ",
        product.title
      ] }),
      /* @__PURE__ */ jsx("ul", { "aria-labelledby": childrenLabelId, className: "cart-line-children", children: lineItemChildren.map((childLine) => /* @__PURE__ */ jsx(
        CartLineItem,
        {
          childrenMap,
          line: childLine,
          layout
        },
        childLine.id
      )) })
    ] }) : null
  ] }, id);
}
function CartLineQuantity({ line }) {
  if (!line || typeof line?.quantity === "undefined") return null;
  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));
  const inputRef = useRef(null);
  const fetcher = useFetcher({ key: getUpdateKey([lineId]) + "-input" });
  function submitQuantity(newQty) {
    if (newQty < 1) {
      if (inputRef.current) inputRef.current.value = String(quantity);
      return;
    }
    if (newQty === quantity) return;
    const formData = new FormData();
    formData.append(
      "cartFormInput",
      JSON.stringify({
        action: CartForm.ACTIONS.LinesUpdate,
        inputs: { lines: [{ id: lineId, quantity: newQty }] }
      })
    );
    fetcher.submit(formData, { method: "POST", action: "/cart" });
  }
  return /* @__PURE__ */ jsxs("div", { className: "cart-line-quantity", children: [
    /* @__PURE__ */ jsxs("div", { className: "cart-line-qty-controls", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: `qty-${lineId}`, className: "sr-only", children: "Qty" }),
      /* @__PURE__ */ jsx(CartLineUpdateButton, { lines: [{ id: lineId, quantity: prevQuantity }], children: /* @__PURE__ */ jsx(
        "button",
        {
          "aria-label": "Decrease quantity",
          disabled: quantity <= 1 || !!isOptimistic,
          name: "decrease-quantity",
          value: prevQuantity,
          children: /* @__PURE__ */ jsx("span", { children: "−" })
        }
      ) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: `qty-${lineId}`,
          ref: inputRef,
          type: "number",
          className: "cart-line-qty-input",
          defaultValue: quantity,
          min: 1,
          disabled: !!isOptimistic,
          "aria-label": "Quantity",
          onBlur: (e) => submitQuantity(parseInt(e.target.value, 10)),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.target.blur();
            }
          }
        },
        quantity
      ),
      /* @__PURE__ */ jsx(CartLineUpdateButton, { lines: [{ id: lineId, quantity: nextQuantity }], children: /* @__PURE__ */ jsx(
        "button",
        {
          "aria-label": "Increase quantity",
          name: "increase-quantity",
          value: nextQuantity,
          disabled: !!isOptimistic,
          children: /* @__PURE__ */ jsx("span", { children: "+" })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "cart-line-remove", children: /* @__PURE__ */ jsx(CartLineRemoveButton, { lineIds: [lineId], disabled: !!isOptimistic }) })
  ] });
}
function CartLineRemoveButton({
  lineIds,
  disabled
}) {
  return /* @__PURE__ */ jsx(
    CartForm,
    {
      fetcherKey: getRemoveKey(lineIds),
      route: "/cart",
      action: CartForm.ACTIONS.LinesRemove,
      inputs: { lineIds },
      children: /* @__PURE__ */ jsx("button", { disabled, type: "submit", children: "Remove" })
    }
  );
}
function CartLineUpdateButton({
  children,
  lines
}) {
  const lineIds = lines.map((line) => line.id);
  return /* @__PURE__ */ jsx(
    CartForm,
    {
      fetcherKey: getUpdateKey(lineIds),
      route: "/cart",
      action: CartForm.ACTIONS.LinesUpdate,
      inputs: { lines },
      children
    }
  );
}
function getUpdateKey(lineIds) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join("-");
}
function getRemoveKey(lineIds) {
  return [CartForm.ACTIONS.LinesRemove, ...lineIds].join("-");
}

function CartSummary({ cart, layout, isCartUpdating }) {
  const className = layout === "page" ? "cart-summary-page" : "cart-summary-aside";
  return /* @__PURE__ */ jsxs("div", { "aria-labelledby": "cart-summary", className, children: [
    /* @__PURE__ */ jsx("h4", { children: "Totals" }),
    /* @__PURE__ */ jsxs("dl", { className: "cart-subtotal", children: [
      /* @__PURE__ */ jsx("dt", { children: "Subtotal" }),
      /* @__PURE__ */ jsx("dd", { children: cart?.cost?.subtotalAmount?.amount ? /* @__PURE__ */ jsx(Money, { data: cart?.cost?.subtotalAmount }) : "-" })
    ] }),
    layout === "page" && /* @__PURE__ */ jsx(CartDiscounts, { discountCodes: cart?.discountCodes }),
    layout === "page" && /* @__PURE__ */ jsx(CartGiftCard, { giftCardCodes: cart?.appliedGiftCards }),
    /* @__PURE__ */ jsx(CartCheckoutActions, { checkoutUrl: cart?.checkoutUrl, isCartUpdating })
  ] });
}
function CartCheckoutActions({
  checkoutUrl,
  isCartUpdating
}) {
  if (!checkoutUrl) return null;
  const { close } = useAside();
  const location = useLocation();
  const localeMatch = location.pathname.match(/^\/(en-nz|en-au|en-us|en-za)/);
  const localePrefix = localeMatch ? localeMatch[0] : "";
  function handleCheckoutClick(e) {
    if (isCartUpdating) {
      e.preventDefault();
      return;
    }
    close();
  }
  return /* @__PURE__ */ jsxs("div", { className: "cart-checkout-actions", children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        to: `${localePrefix}/checkout`,
        onClick: handleCheckoutClick,
        className: `checkout-primary-btn${isCartUpdating ? " checkout-btn-disabled" : ""}`,
        "aria-disabled": isCartUpdating,
        style: isCartUpdating ? { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" } : void 0,
        children: isCartUpdating ? "Updating cart…" : "Proceed to Checkout →"
      }
    ),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: checkoutUrl,
        target: "_self",
        onClick: handleCheckoutClick,
        className: `checkout-skip-btn${isCartUpdating ? " checkout-btn-disabled" : ""}`,
        "aria-disabled": isCartUpdating,
        style: isCartUpdating ? { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" } : void 0,
        children: "Skip to payment →"
      }
    )
  ] });
}
function CartDiscounts({
  discountCodes
}) {
  const codes = discountCodes?.filter((discount) => discount.applicable)?.map(({ code }) => code) || [];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("dl", { hidden: !codes.length, children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("dt", { children: "Discount(s)" }),
      /* @__PURE__ */ jsx(UpdateDiscountForm, { children: /* @__PURE__ */ jsxs("div", { className: "cart-discount", children: [
        /* @__PURE__ */ jsx("code", { children: codes?.join(", ") }),
        " ",
        /* @__PURE__ */ jsx("button", { type: "submit", "aria-label": "Remove discount", children: "Remove" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(UpdateDiscountForm, { discountCodes: codes, children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "discount-code-input", className: "sr-only", children: "Discount code" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "discount-code-input",
          type: "text",
          name: "discountCode",
          placeholder: "Discount code"
        }
      ),
      " ",
      /* @__PURE__ */ jsx("button", { type: "submit", "aria-label": "Apply discount code", children: "Apply" })
    ] }) })
  ] });
}
function UpdateDiscountForm({
  discountCodes,
  children
}) {
  return /* @__PURE__ */ jsx(
    CartForm,
    {
      route: "/cart",
      action: CartForm.ACTIONS.DiscountCodesUpdate,
      inputs: {
        discountCodes: discountCodes || []
      },
      children
    }
  );
}
function CartGiftCard({
  giftCardCodes
}) {
  const giftCardCodeInput = useRef(null);
  const giftCardAddFetcher = useFetcher({ key: "gift-card-add" });
  useEffect(() => {
    if (giftCardAddFetcher.data) {
      giftCardCodeInput.current.value = "";
    }
  }, [giftCardAddFetcher.data]);
  return /* @__PURE__ */ jsxs("div", { children: [
    giftCardCodes && giftCardCodes.length > 0 && /* @__PURE__ */ jsxs("dl", { children: [
      /* @__PURE__ */ jsx("dt", { children: "Applied Gift Card(s)" }),
      giftCardCodes.map((giftCard) => /* @__PURE__ */ jsx(RemoveGiftCardForm, { giftCardId: giftCard.id, children: /* @__PURE__ */ jsxs("div", { className: "cart-discount", children: [
        /* @__PURE__ */ jsxs("code", { children: [
          "***",
          giftCard.lastCharacters
        ] }),
        " ",
        /* @__PURE__ */ jsx(Money, { data: giftCard.amountUsed }),
        " ",
        /* @__PURE__ */ jsx("button", { type: "submit", children: "Remove" })
      ] }) }, giftCard.id))
    ] }),
    /* @__PURE__ */ jsx(AddGiftCardForm, { fetcherKey: "gift-card-add", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "giftCardCode",
          placeholder: "Gift card code",
          ref: giftCardCodeInput
        }
      ),
      " ",
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: giftCardAddFetcher.state !== "idle", children: "Apply" })
    ] }) })
  ] });
}
function AddGiftCardForm({
  fetcherKey,
  children
}) {
  return /* @__PURE__ */ jsx(
    CartForm,
    {
      fetcherKey,
      route: "/cart",
      action: CartForm.ACTIONS.GiftCardCodesAdd,
      children
    }
  );
}
function RemoveGiftCardForm({
  giftCardId,
  children
}) {
  return /* @__PURE__ */ jsx(
    CartForm,
    {
      route: "/cart",
      action: CartForm.ACTIONS.GiftCardCodesRemove,
      inputs: {
        giftCardCodes: [giftCardId]
      },
      children
    }
  );
}

function getLineItemChildrenMap(lines) {
  const children = {};
  for (const line of lines) {
    if ("parentRelationship" in line && line.parentRelationship?.parent) {
      const parentId = line.parentRelationship.parent.id;
      if (!children[parentId]) children[parentId] = [];
      children[parentId].push(line);
    }
    if ("lineComponents" in line) {
      const children2 = getLineItemChildrenMap(line.lineComponents);
      for (const [parentId, childIds] of Object.entries(children2)) {
        if (!children2[parentId]) children2[parentId] = [];
        children2[parentId].push(...childIds);
      }
    }
  }
  return children;
}
function CartMain({ layout, cart: originalCart }) {
  const cart = useOptimisticCart(originalCart);
  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount = cart && Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? "with-discount" : ""}`;
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;
  const isCartUpdating = !!cart?.isOptimistic;
  const childrenMap = getLineItemChildrenMap(cart?.lines?.nodes ?? []);
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx(CartEmpty, { hidden: linesCount, layout }),
    /* @__PURE__ */ jsxs("div", { className: "cart-details", children: [
      /* @__PURE__ */ jsx("p", { id: "cart-lines", className: "sr-only", children: "Line items" }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("ul", { "aria-labelledby": "cart-lines", children: (cart?.lines?.nodes ?? []).map((line) => {
        if ("parentRelationship" in line && line.parentRelationship?.parent) {
          return null;
        }
        return /* @__PURE__ */ jsx(
          CartLineItem,
          {
            line,
            layout,
            childrenMap
          },
          line.id
        );
      }) }) }),
      cartHasItems && layout === "aside" && /* @__PURE__ */ jsx(ContinueShopping, { disabled: isCartUpdating }),
      cartHasItems && /* @__PURE__ */ jsx(CartSummary, { cart, layout, isCartUpdating })
    ] })
  ] });
}
function ContinueShopping({ disabled }) {
  const { close } = useAside();
  return /* @__PURE__ */ jsx("div", { className: "continue-shopping", children: /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      className: "continue-shopping-btn",
      onClick: close,
      disabled,
      "aria-disabled": disabled,
      children: "← Continue Shopping"
    }
  ) });
}
function CartEmpty({
  hidden = false
}) {
  const { close } = useAside();
  return /* @__PURE__ */ jsxs("div", { hidden, children: [
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("p", { children: "Looks like you haven’t added anything yet, let’s get you started!" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(Link, { to: "/collections", onClick: close, prefetch: "viewport", children: "Continue shopping →" })
  ] });
}

const SEARCH_ENDPOINT = "/search";
function SearchFormPredictive({
  children,
  className = "predictive-search-form",
  ...props
}) {
  const fetcher = useFetcher({ key: "search" });
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const aside = useAside();
  function resetInput(event) {
    event.preventDefault();
    event.stopPropagation();
    if (inputRef?.current?.value) {
      inputRef.current.blur();
    }
  }
  function goToSearch() {
    const term = inputRef?.current?.value;
    void navigate(SEARCH_ENDPOINT + (term ? `?q=${term}` : ""));
    aside.close();
  }
  function fetchResults(event) {
    void fetcher.submit(
      { q: event.target.value || "", limit: 5, predictive: true },
      { method: "GET", action: SEARCH_ENDPOINT }
    );
  }
  useEffect(() => {
    inputRef?.current?.setAttribute("type", "search");
  }, []);
  if (typeof children !== "function") {
    return null;
  }
  return /* @__PURE__ */ jsx(fetcher.Form, { ...props, className, onSubmit: resetInput, children: children({ inputRef, fetcher, fetchResults, goToSearch }) });
}

function getEmptyPredictiveSearchResult() {
  return {
    total: 0,
    items: {
      articles: [],
      collections: [],
      products: [],
      pages: [],
      queries: []
    }
  };
}
function urlWithTrackingParams({
  baseUrl,
  trackingParams,
  params: extraParams,
  term
}) {
  let search = new URLSearchParams({
    ...extraParams,
    q: encodeURIComponent(term)
  }).toString();
  if (trackingParams) {
    search = `${search}&${trackingParams}`;
  }
  return `${baseUrl}?${search}`;
}

function SearchResultsPredictive({
  children
}) {
  const aside = useAside();
  const { term, inputRef, fetcher, total, items } = usePredictiveSearch();
  function resetInput() {
    if (inputRef.current) {
      inputRef.current.blur();
      inputRef.current.value = "";
    }
  }
  function closeSearch() {
    resetInput();
    aside.close();
  }
  return children({
    items,
    closeSearch,
    inputRef,
    state: fetcher.state,
    term,
    total
  });
}
SearchResultsPredictive.Articles = SearchResultsPredictiveArticles;
SearchResultsPredictive.Collections = SearchResultsPredictiveCollections;
SearchResultsPredictive.Pages = SearchResultsPredictivePages;
SearchResultsPredictive.Products = SearchResultsPredictiveProducts;
SearchResultsPredictive.Queries = SearchResultsPredictiveQueries;
SearchResultsPredictive.Empty = SearchResultsPredictiveEmpty;
function SearchResultsPredictiveArticles({
  term,
  articles,
  closeSearch
}) {
  if (!articles.length) return null;
  return /* @__PURE__ */ jsxs("div", { className: "predictive-search-result", children: [
    /* @__PURE__ */ jsx("h5", { children: "Articles" }),
    /* @__PURE__ */ jsx("ul", { children: articles.map((article) => {
      const articleUrl = urlWithTrackingParams({
        baseUrl: `/blogs/${article.blog.handle}/${article.handle}`,
        trackingParams: article.trackingParameters,
        term: term.current ?? ""
      });
      return /* @__PURE__ */ jsx("li", { className: "predictive-search-result-item", children: /* @__PURE__ */ jsxs(Link, { onClick: closeSearch, to: articleUrl, children: [
        article.image?.url && /* @__PURE__ */ jsx(
          Image,
          {
            alt: article.image.altText ?? "",
            src: article.image.url,
            width: 50,
            height: 50
          }
        ),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { children: article.title }) })
      ] }) }, article.id);
    }) })
  ] }, "articles");
}
function SearchResultsPredictiveCollections({
  term,
  collections,
  closeSearch
}) {
  if (!collections.length) return null;
  return /* @__PURE__ */ jsxs("div", { className: "predictive-search-result", children: [
    /* @__PURE__ */ jsx("h5", { children: "Collections" }),
    /* @__PURE__ */ jsx("ul", { children: collections.map((collection) => {
      const collectionUrl = urlWithTrackingParams({
        baseUrl: `/collections/${collection.handle}`,
        trackingParams: collection.trackingParameters,
        term: term.current
      });
      return /* @__PURE__ */ jsx("li", { className: "predictive-search-result-item", children: /* @__PURE__ */ jsxs(Link, { onClick: closeSearch, to: collectionUrl, children: [
        collection.image?.url && /* @__PURE__ */ jsx(
          Image,
          {
            alt: collection.image.altText ?? "",
            src: collection.image.url,
            width: 50,
            height: 50
          }
        ),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { children: collection.title }) })
      ] }) }, collection.id);
    }) })
  ] }, "collections");
}
function SearchResultsPredictivePages({
  term,
  pages,
  closeSearch
}) {
  if (!pages.length) return null;
  return /* @__PURE__ */ jsxs("div", { className: "predictive-search-result", children: [
    /* @__PURE__ */ jsx("h5", { children: "Pages" }),
    /* @__PURE__ */ jsx("ul", { children: pages.map((page) => {
      const pageUrl = urlWithTrackingParams({
        baseUrl: `/pages/${page.handle}`,
        trackingParams: page.trackingParameters,
        term: term.current
      });
      return /* @__PURE__ */ jsx("li", { className: "predictive-search-result-item", children: /* @__PURE__ */ jsx(Link, { onClick: closeSearch, to: pageUrl, children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { children: page.title }) }) }) }, page.id);
    }) })
  ] }, "pages");
}
function SearchResultsPredictiveProducts({
  term,
  products,
  closeSearch
}) {
  if (!products.length) return null;
  return /* @__PURE__ */ jsxs("div", { className: "predictive-search-result", children: [
    /* @__PURE__ */ jsx("h5", { children: "Products" }),
    /* @__PURE__ */ jsx("ul", { children: products.map((product) => {
      const productUrl = urlWithTrackingParams({
        baseUrl: `/products/${product.handle}`,
        trackingParams: product.trackingParameters,
        term: term.current
      });
      const price = product?.selectedOrFirstAvailableVariant?.price;
      const image = product?.selectedOrFirstAvailableVariant?.image;
      return /* @__PURE__ */ jsx("li", { className: "predictive-search-result-item", children: /* @__PURE__ */ jsxs(Link, { to: productUrl, onClick: closeSearch, children: [
        image && /* @__PURE__ */ jsx(
          Image,
          {
            alt: image.altText ?? "",
            src: image.url,
            width: 50,
            height: 50
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: product.title }),
          /* @__PURE__ */ jsx("small", { children: price && /* @__PURE__ */ jsx(Money, { data: price }) })
        ] })
      ] }) }, product.id);
    }) })
  ] }, "products");
}
function SearchResultsPredictiveQueries({
  queries,
  queriesDatalistId
}) {
  if (!queries.length) return null;
  return /* @__PURE__ */ jsx("datalist", { id: queriesDatalistId, children: queries.map((suggestion) => {
    if (!suggestion) return null;
    return /* @__PURE__ */ jsx("option", { value: suggestion.text }, suggestion.text);
  }) });
}
function SearchResultsPredictiveEmpty({
  term
}) {
  if (!term.current) {
    return null;
  }
  return /* @__PURE__ */ jsxs("p", { children: [
    "No results found for ",
    /* @__PURE__ */ jsx("q", { children: term.current })
  ] });
}
function usePredictiveSearch() {
  const fetcher = useFetcher({ key: "search" });
  const term = useRef("");
  const inputRef = useRef(null);
  if (fetcher?.state === "loading") {
    term.current = String(fetcher.formData?.get("q") || "");
  }
  useEffect(() => {
    if (!inputRef.current) {
      inputRef.current = document.querySelector('input[type="search"]');
    }
  }, []);
  const { items, total } = fetcher?.data?.result ?? getEmptyPredictiveSearchResult();
  return { items, total, inputRef, term, fetcher };
}

function PageLayout({
  cart,
  children = null,
  footer,
  footerBanner,
  header,
  isLoggedIn,
  customerFirstName,
  publicStoreDomain
}) {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || /^\/(en-nz|en-au|en-us|en-za)\/?$/.test(location.pathname);
  const isProductPage = /^(\/(en-nz|en-au|en-us|en-za))?\/products\//.test(location.pathname);
  const isAccountPage = /^(\/(en-nz|en-au|en-us|en-za))?\/account/.test(location.pathname);
  const isContactPage = /^(\/(en-nz|en-au|en-us|en-za|pages))?\/contact/.test(location.pathname);
  const isCartPage = /^(\/(en-nz|en-au|en-us|en-za))?\/cart/.test(location.pathname);
  const isCheckoutPage = /^(\/(en-nz|en-au|en-us|en-za))?\/checkout/.test(location.pathname);
  useEffect(() => {
    if (isHomePage) {
      document.body.classList.add("home-page");
    } else {
      document.body.classList.remove("home-page");
    }
    if (isProductPage) {
      document.body.classList.add("product-page");
    } else {
      document.body.classList.remove("product-page");
    }
    if (isAccountPage) {
      document.body.classList.add("account-page");
    } else {
      document.body.classList.remove("account-page");
    }
    if (isContactPage) {
      document.body.classList.add("contact-page");
    } else {
      document.body.classList.remove("contact-page");
    }
    if (isCartPage) {
      document.body.classList.add("cart-page");
    } else {
      document.body.classList.remove("cart-page");
    }
    if (isCheckoutPage) {
      document.body.classList.add("checkout-page");
    } else {
      document.body.classList.remove("checkout-page");
    }
    return () => {
      document.body.classList.remove("home-page");
      document.body.classList.remove("product-page");
      document.body.classList.remove("account-page");
      document.body.classList.remove("contact-page");
      document.body.classList.remove("cart-page");
      document.body.classList.remove("checkout-page");
    };
  }, [isHomePage, isProductPage, isAccountPage, isContactPage, isCartPage, isCheckoutPage]);
  return /* @__PURE__ */ jsxs(Aside.Provider, { children: [
    /* @__PURE__ */ jsx(CartAside, { cart }),
    /* @__PURE__ */ jsx(SearchAside, {}),
    /* @__PURE__ */ jsx(MobileMenuAside, { header, publicStoreDomain }),
    header && /* @__PURE__ */ jsx(
      Header,
      {
        header,
        cart,
        isLoggedIn,
        customerFirstName,
        publicStoreDomain,
        isHomePage
      }
    ),
    /* @__PURE__ */ jsx("main", { children }),
    /* @__PURE__ */ jsx(
      Footer,
      {
        footer,
        footerBanner,
        header,
        publicStoreDomain
      }
    )
  ] });
}
function CartAside({ cart }) {
  return /* @__PURE__ */ jsx(Aside, { type: "cart", heading: "CART", children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("p", { children: "Loading cart ..." }), children: /* @__PURE__ */ jsx(Await, { resolve: cart, children: (cart2) => {
    return /* @__PURE__ */ jsx(CartMain, { cart: cart2, layout: "aside" });
  } }) }) });
}
function SearchAside() {
  const queriesDatalistId = useId();
  return /* @__PURE__ */ jsx(Aside, { type: "search", heading: "SEARCH", children: /* @__PURE__ */ jsxs("div", { className: "predictive-search", children: [
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(SearchFormPredictive, { children: ({ fetchResults, goToSearch, inputRef }) => /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          name: "q",
          onChange: fetchResults,
          onFocus: fetchResults,
          placeholder: "Search",
          ref: inputRef,
          type: "search",
          list: queriesDatalistId
        }
      ),
      " ",
      /* @__PURE__ */ jsx("button", { onClick: goToSearch, children: "Search" })
    ] }) }),
    /* @__PURE__ */ jsx(SearchResultsPredictive, { children: ({ items, total, term, state, closeSearch }) => {
      const { articles, collections, pages, products, queries } = items;
      if (state === "loading" && term.current) {
        return /* @__PURE__ */ jsx("div", { children: "Loading..." });
      }
      if (!total) {
        return /* @__PURE__ */ jsx(SearchResultsPredictive.Empty, { term });
      }
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          SearchResultsPredictive.Queries,
          {
            queries,
            queriesDatalistId
          }
        ),
        /* @__PURE__ */ jsx(
          SearchResultsPredictive.Products,
          {
            products,
            closeSearch,
            term
          }
        ),
        /* @__PURE__ */ jsx(
          SearchResultsPredictive.Collections,
          {
            collections,
            closeSearch,
            term
          }
        ),
        /* @__PURE__ */ jsx(
          SearchResultsPredictive.Pages,
          {
            pages,
            closeSearch,
            term
          }
        ),
        /* @__PURE__ */ jsx(
          SearchResultsPredictive.Articles,
          {
            articles,
            closeSearch,
            term
          }
        ),
        term.current && total ? /* @__PURE__ */ jsx(
          Link,
          {
            onClick: closeSearch,
            to: `${SEARCH_ENDPOINT}?q=${term.current}`,
            children: /* @__PURE__ */ jsxs("p", { children: [
              "View all results for ",
              /* @__PURE__ */ jsx("q", { children: term.current }),
              "  →"
            ] })
          }
        ) : null
      ] });
    } })
  ] }) });
}
function MobileMenuAside({
  header,
  publicStoreDomain
}) {
  return header.menu && header.shop.primaryDomain?.url && /* @__PURE__ */ jsx(Aside, { type: "mobile", heading: "MENU", children: /* @__PURE__ */ jsx(
    HeaderMenu,
    {
      menu: header.menu,
      viewport: "mobile",
      primaryDomainUrl: header.shop.primaryDomain.url,
      publicStoreDomain
    }
  ) });
}

const shouldRevalidate$1 = ({
  formMethod,
  currentUrl,
  nextUrl
}) => {
  if (formMethod && formMethod !== "GET") return true;
  if (currentUrl.toString() === nextUrl.toString()) return true;
  return false;
};
function links() {
  return [{
    rel: "preconnect",
    href: "https://cdn.shopify.com"
  }, {
    rel: "preconnect",
    href: "https://shop.app"
  }, {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  }, {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  }, {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap"
  }, {
    rel: "icon",
    type: "image/svg+xml",
    href: favicon
  }];
}
async function loader$p(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  const {
    storefront,
    env
  } = args.context;
  return {
    ...deferredData,
    ...criticalData,
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID
    }),
    consent: {
      checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: false,
      // localize the privacy banner
      country: args.context.storefront.i18n.country,
      language: args.context.storefront.i18n.language
    }
  };
}
async function loadCriticalData({
  context
}) {
  const {
    storefront
  } = context;
  const [header] = await Promise.all([storefront.query(HEADER_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      headerMenuHandle: "main-menu"
      // Adjust to your header menu handle
    }
  })
  // Add other queries here, so that they are loaded in parallel
  ]);
  return {
    header
  };
}
function loadDeferredData({
  context
}) {
  const {
    storefront,
    customerAccount,
    cart
  } = context;
  const expectedCountry = storefront.i18n.country;
  const cartPromise = cart.get().then(async cartData => {
    if (!cartData) return cartData;
    const currentCountry = cartData.buyerIdentity?.countryCode;
    if (currentCountry && currentCountry === expectedCountry) return cartData;
    await cart.updateBuyerIdentity({
      countryCode: expectedCountry
    });
    return cart.get();
  }).catch(error => {
    console.error("[cart] buyerIdentity reconciliation error:", error);
    return null;
  });
  const isLoggedInPromise = customerAccount.isLoggedIn();
  const customerFirstName = isLoggedInPromise.then(loggedIn => {
    if (!loggedIn) return null;
    return customerAccount.query(CUSTOMER_NAME_QUERY).then(({
      data
    }) => data?.customer?.firstName ?? null).catch(() => null);
  }).catch(() => null);
  const footer = storefront.query(FOOTER_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      footerMenuHandle: "footer"
    }
  }).catch(error => {
    console.error(error);
    return null;
  });
  const footerBanner = storefront.query(FOOTER_BANNER_QUERY, {
    cache: storefront.CacheLong()
  }).then(data => data?.metaobject?.field?.value ?? null).catch(() => null);
  return {
    cart: cartPromise,
    isLoggedIn: isLoggedInPromise,
    customerFirstName,
    footer,
    footerBanner
  };
}
const FOOTER_BANNER_QUERY = `#graphql
  query FooterBanner {
    metaobject(handle: {type: "app--footer_banner", handle: "main"}) {
      field(key: "content") {
        value
      }
    }
  }
`;
function Layout({
  children
}) {
  const nonce = useNonce();
  return /* @__PURE__ */jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */jsxs("head", {
      children: [/* @__PURE__ */jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */jsx("meta", {
        name: "viewport",
        content: "width=device-width,initial-scale=1"
      }), /* @__PURE__ */jsx("link", {
        rel: "stylesheet",
        href: resetStyles
      }), /* @__PURE__ */jsx("link", {
        rel: "stylesheet",
        href: appStyles
      }), /* @__PURE__ */jsx(Meta, {}), /* @__PURE__ */jsx(Links, {})]
    }), /* @__PURE__ */jsxs("body", {
      children: [children, /* @__PURE__ */jsx(ScrollRestoration, {
        nonce
      }), /* @__PURE__ */jsx(Scripts, {
        nonce
      })]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  const data = useRouteLoaderData("root");
  if (!data) {
    return /* @__PURE__ */jsx(Outlet, {});
  }
  return /* @__PURE__ */jsx(Analytics.Provider, {
    cart: data.cart,
    shop: data.shop,
    consent: data.consent,
    children: /* @__PURE__ */jsx(PageLayout, {
      ...data,
      children: /* @__PURE__ */jsx(Outlet, {})
    })
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = "Unknown error";
  let errorStatus = 500;
  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  return /* @__PURE__ */jsxs("div", {
    className: "route-error",
    children: [/* @__PURE__ */jsx("h1", {
      children: "Oops"
    }), /* @__PURE__ */jsx("h2", {
      children: errorStatus
    }), errorMessage && /* @__PURE__ */jsx("fieldset", {
      children: /* @__PURE__ */jsx("pre", {
        children: errorMessage
      })
    })]
  });
});

const route0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links,
  loader: loader$p,
  shouldRevalidate: shouldRevalidate$1
}, Symbol.toStringTag, { value: 'Module' }));

const SUPPLIER_PREFIX_LENGTH = 4;
function getSupplierFolderPrefix(supplierName) {
  const lower = supplierName.toLowerCase();
  return lower.length <= SUPPLIER_PREFIX_LENGTH ? lower : lower.slice(0, SUPPLIER_PREFIX_LENGTH);
}
function getProductCardImageSrc(supplierName, externalProductId) {
  if (!supplierName || !externalProductId) return null;
  const prefix = getSupplierFolderPrefix(supplierName);
  return `/media/suppliers/${prefix}/${externalProductId}.jpg`;
}
function getProductGalleryImageSrcs(supplierName, externalProductId, maxSuffix = 9) {
  const cardSrc = getProductCardImageSrc(supplierName, externalProductId);
  if (!cardSrc) return [];
  const prefix = getSupplierFolderPrefix(supplierName);
  const suffixed = Array.from(
    { length: maxSuffix + 1 },
    (_, i) => `/media/suppliers/${prefix}/${externalProductId}_${i}.jpg`
  );
  return [cardSrc, ...suffixed];
}

function ProductCard({ product }) {
  const fetcher = useFetcher({ key: `add-to-cart-${product.id}` });
  const firstVariant = product.variants?.nodes[0];
  const msq = Number(product.msq?.value);
  const showMoqRibbon = Number.isFinite(msq) && msq > 1;
  const [localImageFailed, setLocalImageFailed] = useState(false);
  const localImageSrc = getProductCardImageSrc(
    product.supplierName?.value,
    product.externalProductId?.value
  );
  return /* @__PURE__ */ jsxs("div", { className: "product-card group block", children: [
    /* @__PURE__ */ jsxs(Link, { to: `/products/${product.handle}`, prefetch: "intent", className: "block", children: [
      /* @__PURE__ */ jsxs("div", { className: "aspect-square overflow-hidden rounded-lg bg-gray-100 moq-ribbon-wrapper", children: [
        product.featuredImage ? /* @__PURE__ */ jsx(
          Image,
          {
            data: product.featuredImage,
            aspectRatio: "1/1",
            sizes: "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          }
        ) : localImageSrc && !localImageFailed ? /* @__PURE__ */ jsx(
          "img",
          {
            src: localImageSrc,
            alt: product.title,
            onError: () => setLocalImageFailed(true),
            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-gray-400", children: "No image" }),
        showMoqRibbon && /* @__PURE__ */ jsxs("div", { className: "moq-ribbon", children: [
          "Minimum qty: ",
          msq
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "mt-3",
          style: {
            background: "rgba(50, 50, 50, 0.85)",
            padding: "0.5rem 0.75rem",
            borderRadius: "6px"
          },
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-white group-hover:underline truncate", children: product.title }),
            product.brand?.value && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-300 mt-0.5", children: product.brand.value }),
            product.productType && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: product.productType }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm font-medium text-white", children: /* @__PURE__ */ jsx(Money, { data: product.priceRange.minVariantPrice }) })
          ]
        }
      )
    ] }),
    firstVariant && /* @__PURE__ */ jsxs(fetcher.Form, { method: "post", action: "/cart", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "hidden",
          name: CartForm.INPUT_NAME,
          value: JSON.stringify({
            action: CartForm.ACTIONS.LinesAdd,
            inputs: {
              lines: [
                {
                  merchandiseId: firstVariant.id,
                  quantity: 1
                }
              ]
            }
          })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: !firstVariant.availableForSale || fetcher.state !== "idle",
          className: "add-to-cart-btn",
          children: !firstVariant.availableForSale ? "Sold Out" : fetcher.state !== "idle" ? "Adding..." : "Add to Cart"
        }
      )
    ] })
  ] });
}

const MAX_PRODUCTS = 250;
async function loader$o(args) {
  const {
    params,
    context
  } = args;
  const {
    handle
  } = params;
  const {
    storefront
  } = context;
  if (!handle) {
    throw new Response("Collection handle is required", {
      status: 400
    });
  }
  const {
    collection
  } = await storefront.query(COLLECTION_QUERY$1, {
    variables: {
      handle,
      first: MAX_PRODUCTS
    }
  });
  if (!collection && handle === "all") {
    const {
      products
    } = await storefront.query(ALL_PRODUCTS_QUERY, {
      variables: {
        first: MAX_PRODUCTS
      }
    });
    return {
      collection: {
        id: "all",
        title: "All Products",
        handle: "all",
        description: "",
        products
      }
    };
  }
  if (!collection) {
    throw new Response("Collection not found", {
      status: 404
    });
  }
  return {
    collection
  };
}
function getSubCollection(product) {
  return product.subCollection?.value || "Other";
}
function getSubCatCollection(product) {
  return product.subCatCollection?.value || "Other";
}
function getBrand(product) {
  return product.vendor || "";
}
function getPrice(product) {
  return Number(product.priceRange?.minVariantPrice?.amount) || 0;
}
function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, void 0, {
    numeric: true
  }));
}
function FilterCheckboxGroup({
  title,
  options,
  selected,
  onToggle
}) {
  if (options.length === 0) return null;
  return /* @__PURE__ */jsxs("div", {
    className: "filter-group",
    children: [/* @__PURE__ */jsx("h4", {
      className: "font-semibold text-sm mb-1",
      children: title
    }), /* @__PURE__ */jsx("div", {
      className: "filter-group-options",
      children: options.map(option => /* @__PURE__ */jsxs("label", {
        className: "filter-option",
        children: [/* @__PURE__ */jsx("input", {
          type: "checkbox",
          checked: selected.has(option),
          onChange: () => onToggle(option)
        }), option]
      }, option))
    })]
  });
}
function CollapsibleSection({
  title,
  count,
  children
}) {
  const [collapsed, setCollapsed] = useState(false);
  return /* @__PURE__ */jsxs("div", {
    className: "collection-section",
    children: [/* @__PURE__ */jsxs("button", {
      type: "button",
      className: "collection-section-toggle",
      onClick: () => setCollapsed(c => !c),
      children: [collapsed ? "▸" : "▾", " ", title, " (", count, ")"]
    }), !collapsed && children]
  });
}
const _$locale__collections_$handle = UNSAFE_withComponentProps(function Collection() {
  const {
    collection
  } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const allProducts = collection.products.nodes;
  const selectedBrands = new Set(searchParams.getAll("brand"));
  const selectedSubCollections = new Set(searchParams.getAll("subCollection"));
  const selectedSubCatCollections = new Set(searchParams.getAll("subCatCollection"));
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const brandOptions = uniqueSorted(allProducts.map(getBrand));
  const subCollectionOptions = uniqueSorted(allProducts.map(getSubCollection));
  const subCatCollectionOptions = uniqueSorted(allProducts.map(getSubCatCollection));
  const hasFilters = selectedBrands.size > 0 || selectedSubCollections.size > 0 || selectedSubCatCollections.size > 0 || minPrice !== "" || maxPrice !== "";
  function toggleParam(key, value) {
    const next = new URLSearchParams(searchParams);
    const values = next.getAll(key);
    next.delete(key);
    if (values.includes(value)) {
      for (const v of values) if (v !== value) next.append(key, v);
    } else {
      for (const v of values) next.append(key, v);
      next.append(key, value);
    }
    setSearchParams(next, {
      preventScrollReset: true
    });
  }
  function setPrice(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);else next.delete(key);
    setSearchParams(next, {
      preventScrollReset: true
    });
  }
  function clearFilters() {
    setSearchParams(new URLSearchParams(), {
      preventScrollReset: true
    });
  }
  const filteredProducts = allProducts.filter(product => {
    if (selectedBrands.size > 0 && !selectedBrands.has(getBrand(product))) return false;
    if (selectedSubCollections.size > 0 && !selectedSubCollections.has(getSubCollection(product))) return false;
    if (selectedSubCatCollections.size > 0 && !selectedSubCatCollections.has(getSubCatCollection(product))) return false;
    const price = getPrice(product);
    if (minPrice !== "" && price < Number(minPrice)) return false;
    if (maxPrice !== "" && price > Number(maxPrice)) return false;
    return true;
  });
  const grouped = /* @__PURE__ */new Map();
  for (const product of allProducts) {
    const subCollection = getSubCollection(product);
    const subCatCollection = getSubCatCollection(product);
    if (!grouped.has(subCollection)) grouped.set(subCollection, /* @__PURE__ */new Map());
    const subMap = grouped.get(subCollection);
    if (!subMap.has(subCatCollection)) subMap.set(subCatCollection, []);
    subMap.get(subCatCollection).push(product);
  }
  return /* @__PURE__ */jsxs("div", {
    className: "collection max-w-7xl mx-auto px-4 py-8",
    children: [/* @__PURE__ */jsx("h1", {
      className: "text-3xl font-bold mb-2",
      children: collection.title
    }), collection.description && /* @__PURE__ */jsx("p", {
      className: "collection-description text-gray-600 mb-6",
      children: collection.description
    }), /* @__PURE__ */jsxs("div", {
      className: "collection-layout",
      children: [/* @__PURE__ */jsxs("aside", {
        className: "collection-filters",
        children: [/* @__PURE__ */jsxs("div", {
          className: "filter-group",
          children: [/* @__PURE__ */jsx("h4", {
            className: "font-semibold text-sm mb-1",
            children: "Price"
          }), /* @__PURE__ */jsxs("div", {
            className: "filter-price-range",
            children: [/* @__PURE__ */jsx("input", {
              type: "number",
              placeholder: "Min",
              value: minPrice,
              onChange: e => setPrice("minPrice", e.target.value)
            }), /* @__PURE__ */jsx("input", {
              type: "number",
              placeholder: "Max",
              value: maxPrice,
              onChange: e => setPrice("maxPrice", e.target.value)
            })]
          })]
        }), /* @__PURE__ */jsx(FilterCheckboxGroup, {
          title: "Brand",
          options: brandOptions,
          selected: selectedBrands,
          onToggle: v => toggleParam("brand", v)
        }), /* @__PURE__ */jsx(FilterCheckboxGroup, {
          title: "Sub Collection",
          options: subCollectionOptions,
          selected: selectedSubCollections,
          onToggle: v => toggleParam("subCollection", v)
        }), /* @__PURE__ */jsx(FilterCheckboxGroup, {
          title: "Sub-Cat Collection",
          options: subCatCollectionOptions,
          selected: selectedSubCatCollections,
          onToggle: v => toggleParam("subCatCollection", v)
        }), hasFilters && /* @__PURE__ */jsx("button", {
          type: "button",
          className: "filter-clear-btn",
          onClick: clearFilters,
          children: "Clear filters"
        })]
      }), /* @__PURE__ */jsx("div", {
        className: "collection-results",
        children: hasFilters ? filteredProducts.length > 0 ? /* @__PURE__ */jsx("div", {
          className: "products-grid",
          children: filteredProducts.map(product => /* @__PURE__ */jsx(ProductCard, {
            product
          }, product.id))
        }) : /* @__PURE__ */jsx("p", {
          className: "text-center text-gray-500 py-8",
          children: "No products match the selected filters."
        }) : [...grouped.entries()].map(([subCollection, subCatMap]) => {
          const sectionCount = [...subCatMap.values()].reduce((sum, p) => sum + p.length, 0);
          return /* @__PURE__ */jsx(CollapsibleSection, {
            title: subCollection,
            count: sectionCount,
            children: [...subCatMap.entries()].map(([subCatCollection, products]) => /* @__PURE__ */jsx(CollapsibleSection, {
              title: subCatCollection,
              count: products.length,
              children: /* @__PURE__ */jsx("div", {
                className: "products-grid",
                children: products.map(product => /* @__PURE__ */jsx(ProductCard, {
                  product
                }, product.id))
              })
            }, subCatCollection))
          }, subCollection);
        })
      })]
    })]
  });
});
const PRODUCT_FIELDS = `#graphql
  fragment CollectionProductFields on Product {
    id
    title
    handle
    productType
    vendor
    featuredImage {
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    brand: metafield(namespace: "app", key: "brand") {
      value
    }
    subCollection: metafield(namespace: "app", key: "sub_collection") {
      value
    }
    subCatCollection: metafield(namespace: "app", key: "sub_cat_collection") {
      value
    }
    msq: metafield(namespace: "app", key: "msq") {
      value
    }
    supplierName: metafield(namespace: "app", key: "supplier_name") {
      value
    }
    externalProductId: metafield(namespace: "app", key: "external_product_id") {
      value
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
      }
    }
  }
`;
const COLLECTION_QUERY$1 = `#graphql
  query Collection(
    $handle: String!
    $first: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      products(first: $first) {
        nodes {
          ...CollectionProductFields
        }
      }
    }
  }
  ${PRODUCT_FIELDS}
`;
const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts(
    $first: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: $first) {
      nodes {
        ...CollectionProductFields
      }
    }
  }
  ${PRODUCT_FIELDS}
`;

const route1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _$locale__collections_$handle,
  loader: loader$o
}, Symbol.toStringTag, { value: 'Module' }));

function CollectionCard({ collection }) {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      className: "collection-item",
      to: `/collections/${collection.handle}`,
      prefetch: "intent",
      children: [
        collection.image && /* @__PURE__ */ jsx(
          Image,
          {
            data: collection.image,
            aspectRatio: "1/1",
            sizes: "(min-width: 768px) 25vw, 50vw"
          }
        ),
        /* @__PURE__ */ jsx("h3", { className: "mt-2 font-semibold", children: collection.title })
      ]
    },
    collection.id
  );
}

async function loader$n(args) {
  const {
    context,
    request
  } = args;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8
  });
  const {
    collections
  } = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables
  });
  return {
    collections
  };
}
const _$locale__collections__index = UNSAFE_withComponentProps(function Collections() {
  const {
    collections
  } = useLoaderData();
  return /* @__PURE__ */jsxs("div", {
    className: "collections max-w-7xl mx-auto px-4 py-8",
    children: [/* @__PURE__ */jsx("h1", {
      className: "text-3xl font-bold mb-6",
      children: "Collections"
    }), /* @__PURE__ */jsx(Pagination, {
      connection: collections,
      children: ({
        nodes,
        isLoading,
        PreviousLink,
        NextLink
      }) => /* @__PURE__ */jsxs(Fragment, {
        children: [/* @__PURE__ */jsx(PreviousLink, {
          children: isLoading ? "Loading..." : /* @__PURE__ */jsx("span", {
            children: "Load previous"
          })
        }), /* @__PURE__ */jsx("div", {
          className: "collections-grid",
          children: nodes.map(collection => /* @__PURE__ */jsx(CollectionCard, {
            collection
          }, collection.id))
        }), /* @__PURE__ */jsx(NextLink, {
          children: isLoading ? "Loading..." : /* @__PURE__ */jsx("span", {
            children: "Load more"
          })
        })]
      })
    })]
  });
});
const COLLECTIONS_QUERY = `#graphql
  query Collections(
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        id
        title
        handle
        image {
          url
          altText
          width
          height
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

const route2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _$locale__collections__index,
  loader: loader$n
}, Symbol.toStringTag, { value: 'Module' }));

async function loader$m({
  request,
  context
}) {
  const url = new URL(request.url);
  const handle = url.searchParams.get("handle");
  if (!handle) {
    return {
      error: "Pass ?handle=product-handle to test availability",
      results: null
    };
  }
  const {
    storefront
  } = context;
  const {
    country,
    language
  } = storefront.i18n;
  const withContext = await storefront.query(DEBUG_QUERY_WITH_CONTEXT, {
    variables: {
      handle,
      country,
      language
    }
  });
  const withoutContext = await storefront.query(DEBUG_QUERY_WITHOUT_CONTEXT, {
    variables: {
      handle
    }
  });
  return {
    error: null,
    results: {
      handle,
      resolvedContext: {
        country,
        language
      },
      withContext: withContext.product,
      withoutContext: withoutContext.product
    }
  };
}
const _$locale__debugAvailability = UNSAFE_withComponentProps(function DebugAvailability() {
  const {
    error,
    results
  } = useLoaderData();
  if (error) {
    return /* @__PURE__ */jsxs("div", {
      style: {
        padding: "2rem",
        color: "white"
      },
      children: [/* @__PURE__ */jsx("h1", {
        children: "Debug Product Availability"
      }), /* @__PURE__ */jsx("p", {
        children: error
      })]
    });
  }
  if (!results) return null;
  const {
    handle,
    withContext,
    withoutContext
  } = results;
  return /* @__PURE__ */jsxs("div", {
    style: {
      padding: "2rem",
      color: "white",
      maxWidth: "900px",
      margin: "0 auto"
    },
    children: [/* @__PURE__ */jsxs("h1", {
      style: {
        marginBottom: "1rem"
      },
      children: ["Debug: ", handle]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        marginBottom: "1rem",
        padding: "0.5rem",
        background: "rgba(0,100,255,0.15)",
        borderRadius: "8px"
      },
      children: [/* @__PURE__ */jsx("strong", {
        children: "Resolved Context:"
      }), " country=", results.resolvedContext.country, ", language=", results.resolvedContext.language]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem"
      },
      children: [/* @__PURE__ */jsx(Section, {
        title: "WITH @inContext (ZA)",
        product: withContext
      }), /* @__PURE__ */jsx(Section, {
        title: "WITHOUT @inContext",
        product: withoutContext
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        marginTop: "2rem",
        padding: "1rem",
        background: "rgba(255,255,0,0.1)",
        borderRadius: "8px"
      },
      children: [/* @__PURE__ */jsx("h3", {
        children: "Diagnosis"
      }), withContext && withoutContext ? /* @__PURE__ */jsxs("ul", {
        children: [/* @__PURE__ */jsxs("li", {
          children: ["With ZA context: availableForSale =", " ", /* @__PURE__ */jsx("strong", {
            style: {
              color: withContext.availableForSale ? "lime" : "red"
            },
            children: String(withContext.availableForSale)
          })]
        }), /* @__PURE__ */jsxs("li", {
          children: ["Without context: availableForSale =", " ", /* @__PURE__ */jsx("strong", {
            style: {
              color: withoutContext.availableForSale ? "lime" : "red"
            },
            children: String(withoutContext.availableForSale)
          })]
        }), withContext.availableForSale !== withoutContext.availableForSale && /* @__PURE__ */jsx("li", {
          style: {
            color: "orange",
            fontWeight: "bold"
          },
          children: "Discrepancy detected — the ZA market context is affecting availability. Check if the ZA market is in DRAFT status."
        }), !withContext.availableForSale && !withoutContext.availableForSale && /* @__PURE__ */jsx("li", {
          style: {
            color: "red"
          },
          children: "Product is unavailable in both contexts — issue is not market-specific. Check inventory tracking and publication status in admin."
        }), withContext.availableForSale && withoutContext.availableForSale && /* @__PURE__ */jsx("li", {
          style: {
            color: "lime"
          },
          children: "Product is available in both contexts — no issue detected."
        }), withContext.selectedOrFirstAvailableVariant?.quantityAvailable == null && /* @__PURE__ */jsx("li", {
          style: {
            color: "orange"
          },
          children: 'quantityAvailable is null/N/A. Enable "Read inventory of assigned locations" in Shopify Admin → Settings → Apps → Headless → Storefront API permissions.'
        })]
      }) : /* @__PURE__ */jsx("p", {
        children: "One or both queries returned null — product may not exist or not be published."
      })]
    })]
  });
});
function Section({
  title,
  product
}) {
  if (!product) {
    return /* @__PURE__ */jsxs("div", {
      style: {
        background: "rgba(50,50,50,0.6)",
        padding: "1rem",
        borderRadius: "8px"
      },
      children: [/* @__PURE__ */jsx("h2", {
        children: title
      }), /* @__PURE__ */jsx("p", {
        style: {
          color: "red"
        },
        children: "Product not found (null)"
      })]
    });
  }
  const variant = product.selectedOrFirstAvailableVariant;
  return /* @__PURE__ */jsxs("div", {
    style: {
      background: "rgba(50,50,50,0.6)",
      padding: "1rem",
      borderRadius: "8px"
    },
    children: [/* @__PURE__ */jsx("h2", {
      style: {
        marginBottom: "0.5rem"
      },
      children: title
    }), /* @__PURE__ */jsx("table", {
      style: {
        width: "100%",
        borderCollapse: "collapse"
      },
      children: /* @__PURE__ */jsxs("tbody", {
        children: [/* @__PURE__ */jsx(Row, {
          label: "Title",
          value: product.title
        }), /* @__PURE__ */jsx(Row, {
          label: "Product availableForSale",
          value: String(product.availableForSale),
          color: product.availableForSale ? "lime" : "red"
        }), /* @__PURE__ */jsx(Row, {
          label: "Variant availableForSale",
          value: String(variant?.availableForSale),
          color: variant?.availableForSale ? "lime" : "red"
        }), /* @__PURE__ */jsx(Row, {
          label: "Variant quantityAvailable",
          value: String(variant?.quantityAvailable ?? "N/A")
        }), /* @__PURE__ */jsx(Row, {
          label: "Price",
          value: variant ? `${variant.price.amount} ${variant.price.currencyCode}` : "N/A"
        })]
      })
    }), product.variants?.nodes?.length > 0 && /* @__PURE__ */jsxs(Fragment, {
      children: [/* @__PURE__ */jsx("h3", {
        style: {
          marginTop: "1rem"
        },
        children: "All Variants"
      }), /* @__PURE__ */jsxs("table", {
        style: {
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.85rem"
        },
        children: [/* @__PURE__ */jsx("thead", {
          children: /* @__PURE__ */jsxs("tr", {
            children: [/* @__PURE__ */jsx("th", {
              style: {
                textAlign: "left",
                padding: "4px"
              },
              children: "Title"
            }), /* @__PURE__ */jsx("th", {
              style: {
                textAlign: "left",
                padding: "4px"
              },
              children: "Available"
            }), /* @__PURE__ */jsx("th", {
              style: {
                textAlign: "left",
                padding: "4px"
              },
              children: "Qty"
            }), /* @__PURE__ */jsx("th", {
              style: {
                textAlign: "left",
                padding: "4px"
              },
              children: "Price"
            })]
          })
        }), /* @__PURE__ */jsx("tbody", {
          children: product.variants.nodes.map(v => /* @__PURE__ */jsxs("tr", {
            children: [/* @__PURE__ */jsx("td", {
              style: {
                padding: "4px"
              },
              children: v.title
            }), /* @__PURE__ */jsx("td", {
              style: {
                padding: "4px",
                color: v.availableForSale ? "lime" : "red"
              },
              children: String(v.availableForSale)
            }), /* @__PURE__ */jsx("td", {
              style: {
                padding: "4px"
              },
              children: v.quantityAvailable ?? "N/A"
            }), /* @__PURE__ */jsxs("td", {
              style: {
                padding: "4px"
              },
              children: [v.price.amount, " ", v.price.currencyCode]
            })]
          }, v.id))
        })]
      })]
    })]
  });
}
function Row({
  label,
  value,
  color
}) {
  return /* @__PURE__ */jsxs("tr", {
    children: [/* @__PURE__ */jsx("td", {
      style: {
        padding: "4px",
        fontWeight: "bold"
      },
      children: label
    }), /* @__PURE__ */jsx("td", {
      style: {
        padding: "4px",
        color: color || "white"
      },
      children: value
    })]
  });
}
const DEBUG_QUERY_WITH_CONTEXT = `#graphql
  query DebugProductWithContext(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      availableForSale
      selectedOrFirstAvailableVariant {
        id
        availableForSale
        quantityAvailable
        price { amount currencyCode }
      }
      variants(first: 5) {
        nodes {
          id
          title
          availableForSale
          quantityAvailable
          price { amount currencyCode }
        }
      }
    }
  }
`;
const DEBUG_QUERY_WITHOUT_CONTEXT = `#graphql
  query DebugProductWithoutContext($handle: String!) {
    product(handle: $handle) {
      id
      title
      availableForSale
      selectedOrFirstAvailableVariant {
        id
        availableForSale
        quantityAvailable
        price { amount currencyCode }
      }
      variants(first: 5) {
        nodes {
          id
          title
          availableForSale
          quantityAvailable
          price { amount currencyCode }
        }
      }
    }
  }
`;

const route3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _$locale__debugAvailability,
  loader: loader$m
}, Symbol.toStringTag, { value: 'Module' }));

async function loader$l({
  request,
  context
}) {
  const url = new URL(request.url);
  const orderRef = url.searchParams.get("ref") ?? "";
  const paymentRef = url.searchParams.get("pf_payment_id") ?? "";
  try {
    const cartData = await context.cart.get();
    const lineIds = (cartData?.lines?.nodes ?? []).map(line => line.id);
    if (lineIds.length > 0) {
      await context.cart.removeLines(lineIds);
    }
  } catch (err) {
    console.error("[checkout/success] Cart lines removal failed:", err);
  }
  context.session.unset("cartId");
  const cookieHeader = await context.session.commit();
  const headers = new Headers({
    "Set-Cookie": cookieHeader
  });
  return data({
    orderRef,
    paymentRef
  }, {
    headers
  });
}
const _$locale__checkout__success = UNSAFE_withComponentProps(function CheckoutSuccess() {
  const {
    orderRef,
    paymentRef
  } = useLoaderData();
  return /* @__PURE__ */jsx("div", {
    className: "checkout-result-wrapper",
    children: /* @__PURE__ */jsxs("div", {
      className: "checkout-result-box",
      children: [/* @__PURE__ */jsx("div", {
        className: "checkout-result-icon",
        children: "✓"
      }), /* @__PURE__ */jsx("h1", {
        className: "checkout-result-title",
        children: "Order Confirmed!"
      }), /* @__PURE__ */jsx("p", {
        className: "checkout-result-message",
        children: "Thank you for your order. We have received your payment and will process your order shortly. A confirmation email will be sent to you."
      }), orderRef && /* @__PURE__ */jsxs("p", {
        className: "checkout-result-order-ref",
        children: ["Order ref: ", orderRef]
      }), paymentRef && /* @__PURE__ */jsxs("p", {
        className: "checkout-result-order-ref",
        children: ["Payment ref: ", paymentRef]
      }), /* @__PURE__ */jsx("a", {
        href: "/",
        className: "checkout-result-btn",
        children: "Continue Shopping"
      })]
    })
  });
});

const route4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _$locale__checkout__success,
  loader: loader$l
}, Symbol.toStringTag, { value: 'Module' }));

async function loader$k({
  context
}) {
  const {
    storefront
  } = context;
  const {
    country,
    language
  } = storefront.i18n;
  const checks = [];
  try {
    const {
      shop
    } = await storefront.query(SHOP_QUERY);
    checks.push({
      name: "Storefront API Connectivity",
      status: shop?.name ? "pass" : "fail",
      detail: shop?.name ? `Connected to "${shop.name}" (${shop.primaryDomain?.url})` : "Shop query returned null"
    });
  } catch (e) {
    checks.push({
      name: "Storefront API Connectivity",
      status: "fail",
      detail: `Error: ${e.message}`
    });
  }
  try {
    const {
      products
    } = await storefront.query(PRODUCTS_QUERY, {
      variables: {
        country,
        language
      }
    });
    const product = products?.nodes?.[0];
    if (!product) {
      checks.push({
        name: "Product Availability",
        status: "fail",
        detail: "No products found via Storefront API. Check that products are published to the Headless channel."
      });
    } else {
      const price = product.selectedOrFirstAvailableVariant?.price;
      const priceAmount = parseFloat(price?.amount ?? "0");
      checks.push({
        name: "Product Availability",
        status: "pass",
        detail: `Found "${product.title}" (handle: ${product.handle})`
      });
      checks.push({
        name: `Market Pricing (@inContext country=${country})`,
        status: priceAmount > 0 ? "pass" : "fail",
        detail: priceAmount > 0 ? `Price: ${price.amount} ${price.currencyCode}` : `Price is ${price?.amount ?? "null"} ${price?.currencyCode ?? ""} - ZA market is likely in DRAFT status. Activate it in Admin > Catalogs.`
      });
      const qty = product.selectedOrFirstAvailableVariant?.quantityAvailable;
      checks.push({
        name: "Inventory Permissions",
        status: qty != null ? "pass" : "warn",
        detail: qty != null ? `quantityAvailable: ${qty}` : 'quantityAvailable is null. Enable "Read inventory of assigned locations" in Admin > Settings > Apps > Headless > Storefront API permissions.'
      });
    }
  } catch (e) {
    checks.push({
      name: "Product Availability",
      status: "fail",
      detail: `Error: ${e.message}`
    });
  }
  try {
    const data = await storefront.query(COLLECTION_QUERY);
    const allCollection = data.collection;
    const collections = data.collections?.nodes ?? [];
    checks.push({
      name: 'Collection "all" Handle',
      status: allCollection ? "pass" : "warn",
      detail: allCollection ? `"all" collection exists (id: ${allCollection.id})` : '"all" collection not found via Storefront API (this is normal - the route uses a fallback query for /collections/all)'
    });
    checks.push({
      name: "Collections Available",
      status: collections.length > 0 ? "pass" : "fail",
      detail: collections.length > 0 ? `${collections.length} collections found: ${collections.map(c => c.handle).join(", ")}` : "No collections found. Check that collections are published to the Headless channel."
    });
  } catch (e) {
    checks.push({
      name: "Collection Availability",
      status: "fail",
      detail: `Error: ${e.message}`
    });
  }
  try {
    const cartData = await context.cart.get();
    if (cartData) {
      const buyerCountry = cartData.buyerIdentity?.countryCode;
      const totalAmount = cartData.cost?.totalAmount;
      checks.push({
        name: "Cart State",
        status: buyerCountry === country ? "pass" : "warn",
        detail: buyerCountry === country ? `Cart exists, buyerIdentity.countryCode=${buyerCountry}, total=${totalAmount?.amount ?? "0"} ${totalAmount?.currencyCode ?? ""}, items=${cartData.totalQuantity ?? 0}` : `Cart exists but buyerIdentity.countryCode=${buyerCountry ?? "none"} (expected ${country}). Reconciliation should fix this on next page load.`
      });
    } else {
      checks.push({
        name: "Cart State",
        status: "pass",
        detail: "No active cart (normal for new sessions). Cart will be created on first add-to-cart."
      });
    }
  } catch (e) {
    checks.push({
      name: "Cart State",
      status: "fail",
      detail: `Error: ${e.message}`
    });
  }
  return {
    checks,
    context: {
      country,
      language
    },
    timestamp: (/* @__PURE__ */new Date()).toISOString()
  };
}
const _$locale__integrationTest = UNSAFE_withComponentProps(function IntegrationTest() {
  const {
    checks,
    context,
    timestamp
  } = useLoaderData();
  const passCount = checks.filter(c => c.status === "pass").length;
  const failCount = checks.filter(c => c.status === "fail").length;
  const warnCount = checks.filter(c => c.status === "warn").length;
  return /* @__PURE__ */jsxs("div", {
    style: {
      padding: "2rem",
      color: "white",
      maxWidth: "900px",
      margin: "0 auto"
    },
    children: [/* @__PURE__ */jsx("h1", {
      style: {
        marginBottom: "0.5rem"
      },
      children: "Integration Test Dashboard"
    }), /* @__PURE__ */jsxs("p", {
      style: {
        color: "#aaa",
        marginBottom: "1.5rem"
      },
      children: ["Context: country=", context.country, ", language=", context.language, " | ", timestamp]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        gap: "1rem",
        marginBottom: "2rem",
        flexWrap: "wrap"
      },
      children: [/* @__PURE__ */jsx(StatusBadge, {
        label: "Pass",
        count: passCount,
        color: "lime"
      }), /* @__PURE__ */jsx(StatusBadge, {
        label: "Fail",
        count: failCount,
        color: "red"
      }), /* @__PURE__ */jsx(StatusBadge, {
        label: "Warn",
        count: warnCount,
        color: "orange"
      })]
    }), /* @__PURE__ */jsx("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem"
      },
      children: checks.map((check, i) => /* @__PURE__ */jsx(CheckRow, {
        check
      }, i))
    }), /* @__PURE__ */jsxs("div", {
      style: {
        marginTop: "2rem",
        padding: "1rem",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "8px",
        fontSize: "0.85rem",
        color: "#aaa"
      },
      children: [/* @__PURE__ */jsx("h3", {
        style: {
          marginBottom: "0.5rem",
          color: "white"
        },
        children: "Manual Actions Checklist"
      }), /* @__PURE__ */jsxs("ul", {
        style: {
          paddingLeft: "1.2rem"
        },
        children: [/* @__PURE__ */jsx("li", {
          children: 'Activate ZA market: Admin app > Catalogs > click "Activate" next to South Africa'
        }), /* @__PURE__ */jsx("li", {
          children: 'Enable inventory permission: Settings > Apps > Headless > Storefront API permissions > "Read inventory of assigned locations"'
        }), /* @__PURE__ */jsx("li", {
          children: "Clear browser cookies for the storefront domain to eliminate stale cart sessions"
        })]
      })]
    })]
  });
});
function StatusBadge({
  label,
  count,
  color
}) {
  return /* @__PURE__ */jsxs("div", {
    style: {
      padding: "0.5rem 1rem",
      background: `rgba(${color === "lime" ? "0,255,0" : color === "red" ? "255,0,0" : "255,165,0"},0.15)`,
      borderRadius: "8px",
      fontWeight: "bold",
      color
    },
    children: [count, " ", label]
  });
}
function CheckRow({
  check
}) {
  const statusIcon = check.status === "pass" ? "✅" : check.status === "fail" ? "❌" : "⚠️";
  const bgColor = check.status === "pass" ? "rgba(0,255,0,0.08)" : check.status === "fail" ? "rgba(255,0,0,0.08)" : "rgba(255,165,0,0.08)";
  return /* @__PURE__ */jsxs("div", {
    style: {
      padding: "0.75rem 1rem",
      background: bgColor,
      borderRadius: "8px",
      borderLeft: `3px solid ${check.status === "pass" ? "lime" : check.status === "fail" ? "red" : "orange"}`
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        fontWeight: "bold",
        marginBottom: "0.25rem"
      },
      children: [statusIcon, " ", check.name]
    }), /* @__PURE__ */jsx("div", {
      style: {
        fontSize: "0.85rem",
        color: "#ccc"
      },
      children: check.detail
    })]
  });
}
const SHOP_QUERY = `#graphql
  query IntegrationShop {
    shop {
      name
      primaryDomain {
        url
      }
    }
  }
`;
const PRODUCTS_QUERY = `#graphql
  query IntegrationProducts(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 1) {
      nodes {
        id
        title
        handle
        availableForSale
        selectedOrFirstAvailableVariant {
          id
          availableForSale
          quantityAvailable
          price {
            amount
            currencyCode
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;
const COLLECTION_QUERY = `#graphql
  query IntegrationCollection(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: "all") {
      id
      title
    }
    collections(first: 3) {
      nodes {
        id
        title
        handle
      }
    }
  }
`;

const route5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _$locale__integrationTest,
  loader: loader$k
}, Symbol.toStringTag, { value: 'Module' }));

function policyHandleToFieldName(handle) {
  return handle.replace(/-([a-z])/g, (_, m1) => m1.toUpperCase());
}
const meta$4 = ({
  data
}) => {
  return [{
    title: `${data?.policy?.title ?? "Policy"} | Hoseworld`
  }];
};
async function loader$j({
  params,
  context
}) {
  if (!params.handle) {
    throw new Response("No policy handle provided", {
      status: 400
    });
  }
  const policyName = policyHandleToFieldName(params.handle);
  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n.language,
      country: context.storefront.i18n.country
    },
    cache: context.storefront.CacheLong()
  });
  const policy = data.shop?.[policyName];
  if (!policy) {
    throw new Response("Policy not found", {
      status: 404
    });
  }
  return {
    policy
  };
}
const _$locale__policies_$handle = UNSAFE_withComponentProps(function Policy() {
  const {
    policy
  } = useLoaderData();
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.5rem",
    marginBottom: "1.5rem"
  };
  return /* @__PURE__ */jsxs("div", {
    style: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem 1rem",
      color: "white"
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        marginBottom: "1rem"
      },
      children: /* @__PURE__ */jsx(Link, {
        to: "/policies",
        style: {
          color: "rgba(255, 255, 255, 0.7)",
          textDecoration: "none"
        },
        children: "← Back to Policies"
      })
    }), /* @__PURE__ */jsx("h1", {
      style: {
        fontSize: "1.75rem",
        marginBottom: "1.5rem"
      },
      children: policy.title
    }), /* @__PURE__ */jsx("div", {
      style: cardStyle,
      children: /* @__PURE__ */jsx("div", {
        dangerouslySetInnerHTML: {
          __html: policy.body
        },
        style: {
          lineHeight: "1.6"
        }
      })
    })]
  });
});
const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) { ...Policy }
      shippingPolicy @include(if: $shippingPolicy) { ...Policy }
      termsOfService @include(if: $termsOfService) { ...Policy }
      refundPolicy @include(if: $refundPolicy) { ...Policy }
    }
  }
`;

const route6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _$locale__policies_$handle,
  loader: loader$j,
  meta: meta$4,
  policyHandleToFieldName
}, Symbol.toStringTag, { value: 'Module' }));

function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max
}) {
  return /* @__PURE__ */ jsxs("div", { className: "quantity-selector", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "quantity-btn",
        onClick: () => onChange(Math.max(min, quantity - 1)),
        disabled: quantity <= min,
        "aria-label": "Decrease quantity",
        children: "−"
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "quantity-display", children: quantity }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        className: "quantity-btn",
        onClick: () => onChange(max ? Math.min(max, quantity + 1) : quantity + 1),
        disabled: max !== void 0 && quantity >= max,
        "aria-label": "Increase quantity",
        children: "+"
      }
    )
  ] });
}

function GalleryThumbnail({
  src,
  alt,
  wrapperClassName = "aspect-square overflow-hidden rounded bg-gray-100"
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return /* @__PURE__ */jsx("div", {
    className: wrapperClassName,
    children: /* @__PURE__ */jsx("img", {
      src,
      alt,
      onError: () => setFailed(true),
      className: "w-full h-full object-cover"
    })
  });
}
async function loader$i(args) {
  const {
    params,
    request,
    context
  } = args;
  const {
    handle
  } = params;
  const {
    storefront
  } = context;
  if (!handle) {
    throw new Response("Product handle is required", {
      status: 400
    });
  }
  const selectedOptions = getSelectedProductOptions(request);
  const {
    product
  } = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions
    }
  });
  if (!product) {
    throw new Response("Product not found", {
      status: 404
    });
  }
  return {
    product
  };
}
const _$locale__products_$handle = UNSAFE_withComponentProps(function Product() {
  const {
    product
  } = useLoaderData();
  const {
    title,
    descriptionHtml,
    featuredImage
  } = product;
  const [quantity, setQuantity] = useState(1);
  const dimensions = product.dimensions?.value ? JSON.parse(product.dimensions.value) : null;
  const hasDimensions = dimensions && (dimensions.length || dimensions.width || dimensions.height || dimensions.weight);
  const gallerySrcs = getProductGalleryImageSrcs(product.supplierName?.value, product.externalProductId?.value);
  const fetcher = useFetcher({
    key: "add-to-cart"
  });
  const {
    open
  } = useAside();
  const prevFetcherState = useRef(fetcher.state);
  useEffect(() => {
    if (prevFetcherState.current === "loading" && fetcher.state === "idle") {
      open("cart");
    }
    prevFetcherState.current = fetcher.state;
  }, [fetcher.state, open]);
  return /* @__PURE__ */jsx("div", {
    style: {
      maxWidth: "80%",
      margin: "0 auto",
      background: "rgba(50, 50, 50, 0.65)",
      padding: "2rem",
      borderRadius: "12px"
    },
    children: /* @__PURE__ */jsx("div", {
      className: "product max-w-7xl mx-auto px-4 py-8",
      children: /* @__PURE__ */jsxs("div", {
        className: "grid md:grid-cols-2 gap-8",
        children: [/* @__PURE__ */jsxs("div", {
          className: "product-image",
          children: [featuredImage ? /* @__PURE__ */jsx(Image, {
            data: featuredImage,
            sizes: "(min-width: 768px) 50vw, 100vw"
          }) : gallerySrcs[0] && /* @__PURE__ */jsx(GalleryThumbnail, {
            src: gallerySrcs[0],
            alt: title,
            wrapperClassName: "w-full aspect-square overflow-hidden rounded"
          }), gallerySrcs.length > 1 && /* @__PURE__ */jsx("div", {
            className: "grid grid-cols-4 gap-2 mt-2",
            children: gallerySrcs.slice(1).map(src => /* @__PURE__ */jsx(GalleryThumbnail, {
              src,
              alt: title
            }, src))
          })]
        }), /* @__PURE__ */jsxs("div", {
          className: "product-main",
          children: [/* @__PURE__ */jsx("h1", {
            className: "text-3xl font-bold mb-4 text-white",
            children: title
          }), /* @__PURE__ */jsx("div", {
            className: "text-white text-xl font-semibold",
            children: /* @__PURE__ */jsx(ProductPrice, {
              price: product.selectedOrFirstAvailableVariant?.price,
              compareAtPrice: product.selectedOrFirstAvailableVariant?.compareAtPrice
            })
          }), /* @__PURE__ */jsx("div", {
            className: "mt-4 prose text-gray-200",
            dangerouslySetInnerHTML: {
              __html: descriptionHtml
            }
          }), hasDimensions && /* @__PURE__ */jsxs("div", {
            className: "mt-4 text-gray-200",
            children: [/* @__PURE__ */jsx("h3", {
              className: "font-semibold mb-2 text-white",
              children: "Specifications"
            }), /* @__PURE__ */jsxs("ul", {
              className: "text-sm space-y-1",
              children: [dimensions?.length && /* @__PURE__ */jsxs("li", {
                children: ["Length: ", dimensions.length, " cm"]
              }), dimensions?.width && /* @__PURE__ */jsxs("li", {
                children: ["Width: ", dimensions.width, " cm"]
              }), dimensions?.height && /* @__PURE__ */jsxs("li", {
                children: ["Height: ", dimensions.height, " cm"]
              }), dimensions?.weight && /* @__PURE__ */jsxs("li", {
                children: ["Weight: ", dimensions.weight, " kg"]
              })]
            })]
          }), /* @__PURE__ */jsx(VariantSelector, {
            handle: product.handle,
            options: product.options,
            variants: product.adjacentVariants,
            children: ({
              option
            }) => /* @__PURE__ */jsxs("div", {
              className: "mt-4",
              children: [/* @__PURE__ */jsx("h3", {
                className: "font-semibold mb-2 text-white",
                children: option.name
              }), /* @__PURE__ */jsx("div", {
                className: "flex flex-wrap gap-2",
                children: option.values.map(({
                  value,
                  isAvailable,
                  to,
                  isActive
                }) => /* @__PURE__ */jsx("a", {
                  href: to,
                  className: `px-3 py-1 border rounded ${isActive ? "border-white bg-white text-black" : isAvailable ? "border-gray-400 text-gray-200 hover:border-white hover:text-white" : "border-gray-600 text-gray-500 cursor-not-allowed"}`,
                  children: value
                }, value))
              })]
            }, option.name)
          }), /* @__PURE__ */jsxs("div", {
            className: "mt-6",
            children: [/* @__PURE__ */jsx("label", {
              className: "block text-white text-sm font-semibold mb-2",
              children: "Quantity"
            }), /* @__PURE__ */jsx(QuantitySelector, {
              quantity,
              onChange: setQuantity
            })]
          }), /* @__PURE__ */jsxs(fetcher.Form, {
            method: "post",
            action: "/cart",
            children: [/* @__PURE__ */jsx("input", {
              type: "hidden",
              name: CartForm.INPUT_NAME,
              value: JSON.stringify({
                action: CartForm.ACTIONS.LinesAdd,
                inputs: {
                  lines: [{
                    merchandiseId: product.selectedOrFirstAvailableVariant?.id ?? "",
                    quantity,
                    selectedVariant: product.selectedOrFirstAvailableVariant ? {
                      ...product.selectedOrFirstAvailableVariant,
                      product: {
                        handle: product.handle,
                        title: product.title,
                        id: product.id,
                        vendor: product.vendor
                      }
                    } : void 0
                  }]
                }
              })
            }), /* @__PURE__ */jsx("button", {
              type: "submit",
              className: "mt-4 w-full bg-white text-black py-3 px-6 rounded hover:bg-gray-200 transition font-semibold",
              disabled: !product.selectedOrFirstAvailableVariant?.availableForSale || fetcher.state !== "idle",
              children: product.selectedOrFirstAvailableVariant?.availableForSale ? fetcher.state !== "idle" ? "Adding..." : "Add to Cart" : "Sold Out"
            })]
          })]
        })]
      })
    })
  });
});
const PRODUCT_QUERY = `#graphql
  query Product(
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      description
      descriptionHtml
      productType
      tags
      featuredImage {
        url
        altText
        width
        height
      }
      options {
        name
        optionValues {
          name
          swatch {
            color
            image {
              previewImage {
                url
              }
            }
          }
        }
      }
      selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions) {
        id
        title
        availableForSale
        requiresShipping
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        image {
          id
          url
          altText
          width
          height
        }
      }
      adjacentVariants(selectedOptions: $selectedOptions) {
        id
        availableForSale
        price {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
      }
      brand: metafield(namespace: "app", key: "brand") {
        value
      }
      b2cDescription: metafield(namespace: "app", key: "b2c_description") {
        value
      }
      dimensions: metafield(namespace: "app", key: "dimensions") {
        value
      }
      supplierName: metafield(namespace: "app", key: "supplier_name") {
        value
      }
      externalProductId: metafield(namespace: "app", key: "external_product_id") {
        value
      }
    }
  }
`;

const route7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _$locale__products_$handle,
  loader: loader$i
}, Symbol.toStringTag, { value: 'Module' }));

const meta$3 = () => {
  return [{
    title: "Policies | Hoseworld"
  }];
};
async function loader$h({
  context
}) {
  const data = await context.storefront.query(POLICIES_QUERY, {
    variables: {
      language: context.storefront.i18n.language,
      country: context.storefront.i18n.country
    },
    cache: context.storefront.CacheLong()
  });
  const policies = [data.shop.privacyPolicy, data.shop.shippingPolicy, data.shop.termsOfService, data.shop.refundPolicy, data.shop.subscriptionPolicy].filter(Boolean);
  if (policies.length === 0) {
    throw new Response("No policies found", {
      status: 404
    });
  }
  return {
    policies
  };
}
const _$locale__policies__index = UNSAFE_withComponentProps(function Policies() {
  const {
    policies
  } = useLoaderData();
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem",
    marginBottom: "0.75rem",
    display: "block",
    color: "white",
    textDecoration: "none"
  };
  return /* @__PURE__ */jsxs("div", {
    style: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem 1rem",
      color: "white"
    },
    children: [/* @__PURE__ */jsx("h1", {
      style: {
        fontSize: "1.75rem",
        marginBottom: "1.5rem"
      },
      children: "Policies"
    }), policies.map(policy => /* @__PURE__ */jsxs(Link, {
      to: `/policies/${policy.handle}`,
      style: cardStyle,
      children: [/* @__PURE__ */jsx("span", {
        style: {
          fontSize: "1.1rem"
        },
        children: policy.title
      }), /* @__PURE__ */jsx("span", {
        style: {
          float: "right",
          color: "rgba(255, 255, 255, 0.5)"
        },
        children: "→"
      })]
    }, policy.handle))]
  });
});
const POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy { ...PolicyItem }
      shippingPolicy { ...PolicyItem }
      termsOfService { ...PolicyItem }
      refundPolicy { ...PolicyItem }
      subscriptionPolicy { id title handle }
    }
  }
`;

const route8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _$locale__policies__index,
  loader: loader$h,
  meta: meta$3
}, Symbol.toStringTag, { value: 'Module' }));

async function loader$g({
  request,
  params,
  context: {
    storefront
  }
}) {
  const response = await getSitemap({
    storefront,
    request,
    params,
    locales: ["EN-ZA", "EN-NZ", "EN-AU", "EN-US"],
    getLink: ({
      type,
      baseUrl,
      handle,
      locale
    }) => {
      const localePrefix = locale ? `/${locale.toLowerCase()}` : "";
      return `${baseUrl}${localePrefix}/${type}/${handle}`;
    }
  });
  response.headers.set("Cache-Control", "max-age=86400");
  return response;
}

const route9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  loader: loader$g
}, Symbol.toStringTag, { value: 'Module' }));

const meta$2 = ({
  data
}) => {
  return [{
    title: data?.page?.seo?.title || data?.page?.title || "Page"
  }];
};
async function loader$f({
  params,
  context
}) {
  if (!params.handle) {
    throw new Response("No page handle provided", {
      status: 400
    });
  }
  if (params.handle === "contact") {
    const locale = context.storefront.i18n;
    const prefix = locale.pathPrefix || "";
    throw redirect(`${prefix}/contact`);
  }
  const {
    page
  } = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
      language: context.storefront.i18n.language,
      country: context.storefront.i18n.country
    },
    cache: context.storefront.CacheLong()
  });
  if (!page) {
    throw new Response("Page not found", {
      status: 404
    });
  }
  return {
    page
  };
}
const _$locale__pages_$handle = UNSAFE_withComponentProps(function Page() {
  const {
    page
  } = useLoaderData();
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.5rem",
    marginBottom: "1.5rem"
  };
  return /* @__PURE__ */jsxs("div", {
    style: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem 1rem",
      color: "white"
    },
    children: [/* @__PURE__ */jsx("h1", {
      style: {
        fontSize: "1.75rem",
        marginBottom: "1.5rem"
      },
      children: page.title
    }), /* @__PURE__ */jsx("div", {
      style: cardStyle,
      children: /* @__PURE__ */jsx("div", {
        dangerouslySetInnerHTML: {
          __html: page.body
        },
        style: {
          lineHeight: "1.6"
        }
      })
    })]
  });
});
const PAGE_QUERY = `#graphql
  query Page(
    $handle: String!
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      handle
      seo {
        title
        description
      }
    }
  }
`;

const route10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _$locale__pages_$handle,
  loader: loader$f,
  meta: meta$2
}, Symbol.toStringTag, { value: 'Module' }));

const CUSTOMER_FRAGMENT = `#graphql
  fragment Customer on Customer {
    id
    firstName
    lastName
    emailAddress {
      emailAddress
    }
    defaultAddress {
      ...Address
    }
    addresses(first: 6) {
      nodes {
        ...Address
      }
    }
  }
  fragment Address on CustomerAddress {
    id
    formatted
    firstName
    lastName
    company
    address1
    address2
    territoryCode
    zoneCode
    city
    zip
    phoneNumber
  }
`;
const CUSTOMER_DETAILS_QUERY = `#graphql
  query CustomerDetails($language: LanguageCode) @inContext(language: $language) {
    customer {
      ...Customer
    }
  }
  ${CUSTOMER_FRAGMENT}
`;

async function loader$e({
  context
}) {
  const {
    cart,
    storefront,
    customerAccount
  } = context;
  const expectedCountry = storefront.i18n.country;
  let cartData = await cart.get();
  if (cartData) {
    const currentCountry = cartData.buyerIdentity?.countryCode;
    if (!currentCountry || currentCountry !== expectedCountry) {
      console.log(`[checkout-loader] Syncing buyerIdentity: ${currentCountry ?? "none"} -> ${expectedCountry}`);
      await cart.updateBuyerIdentity({
        countryCode: expectedCountry
      });
      cartData = await cart.get();
    }
  }
  if (!cartData || !cartData.totalQuantity) {
    throw redirect("/cart");
  }
  let customer = null;
  let businessProfile = {
    companyName: "",
    regNumber: "",
    vatNumber: ""
  };
  try {
    const isLoggedIn = await customerAccount.isLoggedIn();
    if (isLoggedIn) {
      const {
        data: accountData
      } = await customerAccount.query(CUSTOMER_DETAILS_QUERY);
      customer = accountData.customer;
      const env = context.env;
      const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
      const internalSecret = env.INTERNAL_API_SECRET ?? "";
      const email = customer?.emailAddress?.emailAddress ?? "";
      if (storefrontUiUrl && email) {
        try {
          const bpRes = await fetch(`${storefrontUiUrl}/api/customer/business?email=${encodeURIComponent(email)}`, {
            headers: {
              "X-Internal-Secret": internalSecret
            }
          });
          if (bpRes.ok) {
            businessProfile = await bpRes.json();
          }
        } catch {}
      }
    }
  } catch {}
  const paymentGateway = context.env.PUBLIC_PAYMENT_GATEWAY ?? "shopify";
  return {
    cart: cartData,
    customer,
    paymentGateway,
    businessProfile
  };
}
async function action$8({
  request,
  context
}) {
  const {
    cart
  } = context;
  const formData = await request.formData();
  const step = formData.get("step");
  let result;
  if (step === "customer-info") {
    const email = formData.get("email");
    const phone = formData.get("phone");
    const url = new URL(request.url);
    const pathPrefix = `/${url.pathname.split("/")[1]?.toLowerCase() ?? ""}`;
    const localeCountryMap = {
      "/en-za": "ZA",
      "/en-nz": "NZ",
      "/en-au": "AU",
      "/en-us": "US"
    };
    const countryCode = localeCountryMap[pathPrefix] ?? "ZA";
    result = await cart.updateBuyerIdentity({
      email,
      phone: phone || void 0,
      countryCode
    });
    const isBusinessCustomer = formData.get("isBusinessCustomer") === "true";
    if (isBusinessCustomer && email) {
      const env = context.env;
      const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
      const internalSecret = env.INTERNAL_API_SECRET ?? "";
      if (storefrontUiUrl) {
        const companyName = formData.get("companyName") || "";
        const regNumber = formData.get("regNumber") || "";
        const vatNumber = formData.get("vatNumber") || "";
        try {
          let shopifyCustomerId = "";
          try {
            const isLoggedIn = await context.customerAccount.isLoggedIn();
            if (isLoggedIn) {
              const {
                data: idData
              } = await context.customerAccount.query(`#graphql query { customer { id } }`);
              shopifyCustomerId = idData?.customer?.id ?? "";
            }
          } catch {}
          await fetch(`${storefrontUiUrl}/api/customer/business`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Internal-Secret": internalSecret
            },
            body: JSON.stringify({
              shopifyCustomerId,
              email,
              companyName,
              regNumber,
              vatNumber
            })
          });
        } catch {}
      }
    }
  } else if (step === "shipping-address") {
    const rawCountryCode = formData.get("countryCode")?.trim().toUpperCase();
    const countryCode = /^[A-Z]{2}$/.test(rawCountryCode) ? rawCountryCode : null;
    if (!countryCode) {
      return data({
        step,
        success: false,
        errors: [{
          message: "Please select a valid country."
        }]
      }, {
        status: 422
      });
    }
    result = await cart.addDeliveryAddresses([{
      address: {
        deliveryAddress: {
          address1: formData.get("address1"),
          address2: formData.get("address2") || void 0,
          city: formData.get("city"),
          provinceCode: formData.get("provinceCode") || void 0,
          zip: formData.get("zip"),
          countryCode,
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          phone: formData.get("phone") || void 0
        }
      },
      selected: true
    }]);
  } else {
    return data({
      error: "Invalid step"
    }, {
      status: 400
    });
  }
  const userErrors = result?.userErrors || [];
  if (userErrors.length > 0) {
    return data({
      step,
      success: false,
      errors: userErrors
    }, {
      status: 422
    });
  }
  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(cartId) : new Headers();
  return data({
    step,
    success: true
  }, {
    status: 200,
    headers
  });
}
const _$locale__checkout = UNSAFE_withComponentProps(function Checkout() {
  const {
    cart,
    customer,
    paymentGateway,
    businessProfile
  } = useLoaderData();
  const fetcher = useFetcher({
    key: "checkout-step"
  });
  const revalidator = useRevalidator();
  const pendingStep3 = useRef(false);
  const location = useLocation();
  const localeMatch = location.pathname.match(/^\/(en-nz|en-au|en-us|en-za)/);
  const localePrefix = localeMatch ? localeMatch[0] : "";
  const defaultCountry = localeMatch?.[1]?.split("-")[1]?.toUpperCase() ?? "ZA";
  const actionUrl = `${localePrefix}/checkout`;
  const isPreFilled = Boolean(customer?.defaultAddress?.address1 || customer?.firstName);
  const isGuest = !customer;
  const requiresConfirm = isPreFilled || isGuest;
  const [prefillConfirmed, setPrefillConfirmed] = useState(!requiresConfirm);
  const [currentStep, setCurrentStep] = useState(1);
  const [invoiceEmailRequested, setInvoiceEmailRequested] = useState(false);
  const [businessCustomer, setBusinessCustomer] = useState(!!(businessProfile?.companyName || businessProfile?.regNumber || businessProfile?.vatNumber));
  const [businessDetails, setBusinessDetails] = useState({
    companyName: businessProfile?.companyName ?? "",
    vatNumber: businessProfile?.vatNumber ?? "",
    regNumber: businessProfile?.regNumber ?? ""
  });
  const [customerInfo, setCustomerInfo] = useState({
    email: cart.buyerIdentity?.email || customer?.emailAddress?.emailAddress || "",
    firstName: cart.buyerIdentity?.customer?.firstName || customer?.firstName || "",
    lastName: cart.buyerIdentity?.customer?.lastName || customer?.lastName || "",
    phone: cart.buyerIdentity?.phone || customer?.defaultAddress?.phoneNumber || ""
  });
  const [shippingAddress, setShippingAddress] = useState({
    firstName: customer?.defaultAddress?.firstName || "",
    lastName: customer?.defaultAddress?.lastName || "",
    address1: customer?.defaultAddress?.address1 || "",
    address2: customer?.defaultAddress?.address2 || "",
    city: customer?.defaultAddress?.city || "",
    provinceCode: customer?.defaultAddress?.zoneCode || "",
    zip: customer?.defaultAddress?.zip || "",
    countryCode: (() => {
      const raw = customer?.defaultAddress?.territoryCode || defaultCountry;
      return /^[A-Z]{2}$/.test(raw) ? raw : defaultCountry;
    })(),
    phone: customer?.defaultAddress?.phoneNumber || ""
  });
  useEffect(() => {
    if (!shippingAddress.countryCode) {
      setShippingAddress(prev => ({
        ...prev,
        countryCode: defaultCountry
      }));
    }
  }, [defaultCountry, shippingAddress.countryCode]);
  useEffect(() => {
    if (fetcher.data?.success && fetcher.data.step === "shipping-address") {
      pendingStep3.current = true;
      revalidator.revalidate();
    } else if (fetcher.data?.success && fetcher.data.step === "customer-info") {
      setCurrentStep(2);
    }
  }, [fetcher.data]);
  useEffect(() => {
    if (revalidator.state === "idle" && pendingStep3.current) {
      pendingStep3.current = false;
      setCurrentStep(3);
    }
  }, [revalidator.state]);
  return /* @__PURE__ */jsx("div", {
    className: "checkout-wrapper",
    children: /* @__PURE__ */jsxs("div", {
      className: "checkout-container",
      children: [/* @__PURE__ */jsx("h1", {
        className: "checkout-title",
        children: "Checkout"
      }), /* @__PURE__ */jsx(StepIndicator, {
        currentStep
      }), fetcher.data?.errors && fetcher.data.errors.length > 0 && /* @__PURE__ */jsx("div", {
        className: "checkout-errors",
        children: fetcher.data.errors.map((err, i) => /* @__PURE__ */jsx("p", {
          children: err.message
        }, i))
      }), currentStep === 1 && /* @__PURE__ */jsx(CustomerInfoStep, {
        customerInfo,
        isPreFilled,
        isGuest,
        prefillConfirmed,
        onPrefillConfirm: setPrefillConfirmed,
        onFieldChange: (field, value) => setCustomerInfo(prev => ({
          ...prev,
          [field]: value
        })),
        businessCustomer,
        onBusinessCustomerChange: setBusinessCustomer,
        businessDetails,
        onBusinessDetailChange: (field, value) => setBusinessDetails(prev => ({
          ...prev,
          [field]: value
        })),
        fetcher,
        actionUrl
      }), currentStep === 2 && /* @__PURE__ */jsx(ShippingAddressStep, {
        shippingAddress,
        onFieldChange: (field, value) => setShippingAddress(prev => ({
          ...prev,
          [field]: value
        })),
        onBack: () => setCurrentStep(1),
        fetcher,
        actionUrl
      }), currentStep === 3 && /* @__PURE__ */jsx(ShippingMethodStep, {
        deliveryGroups: cart.deliveryGroups,
        localePrefix,
        onBack: () => setCurrentStep(2),
        onContinue: () => setCurrentStep(4)
      }), currentStep === 4 && /* @__PURE__ */jsx(OrderReviewStep, {
        cart,
        customerInfo,
        shippingAddress,
        paymentGateway,
        localePrefix,
        invoiceEmailRequested,
        onInvoiceEmailChange: setInvoiceEmailRequested,
        businessCustomer,
        businessDetails,
        onBack: () => setCurrentStep(3)
      })]
    })
  });
});
function StepIndicator({
  currentStep
}) {
  const steps = [{
    num: 1,
    label: "Information"
  }, {
    num: 2,
    label: "Shipping"
  }, {
    num: 3,
    label: "Method"
  }, {
    num: 4,
    label: "Review & Pay"
  }];
  return /* @__PURE__ */jsx("div", {
    className: "checkout-steps",
    children: steps.map((step, i) => /* @__PURE__ */jsxs("div", {
      className: "checkout-step-item",
      children: [/* @__PURE__ */jsx("div", {
        className: `checkout-step-circle ${currentStep >= step.num ? "active" : ""}`,
        children: step.num
      }), /* @__PURE__ */jsx("span", {
        className: `checkout-step-label ${currentStep >= step.num ? "active" : ""}`,
        children: step.label
      }), i < steps.length - 1 && /* @__PURE__ */jsx("div", {
        className: "checkout-step-line"
      })]
    }, step.num))
  });
}
function formatRegNumber(value) {
  if (/^[a-zA-Z]/.test(value)) return value;
  if (/^\d{4}\/\d{6}\/\d{2}$/.test(value)) return value;
  const digits = value.replace(/\D/g, "");
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
  actionUrl
}) {
  const isSubmitting = fetcher.state !== "idle";
  return /* @__PURE__ */jsxs(fetcher.Form, {
    method: "post",
    action: actionUrl,
    className: "checkout-form",
    children: [/* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "step",
      value: "customer-info"
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "isBusinessCustomer",
      value: businessCustomer ? "true" : "false"
    }), /* @__PURE__ */jsx("h2", {
      className: "checkout-section-title",
      children: "Contact Information"
    }), isPreFilled && /* @__PURE__ */jsxs("div", {
      className: "checkout-prefill-notice",
      children: [/* @__PURE__ */jsx("p", {
        children: "Your details have been pre-filled from your account. Please verify they are correct before continuing."
      }), /* @__PURE__ */jsxs("label", {
        className: "checkout-prefill-confirm-label",
        children: [/* @__PURE__ */jsx("input", {
          type: "checkbox",
          checked: prefillConfirmed,
          onChange: e => onPrefillConfirm(e.target.checked)
        }), "I confirm these details are correct"]
      })]
    }), isGuest && /* @__PURE__ */jsxs("div", {
      className: "checkout-prefill-notice",
      children: [/* @__PURE__ */jsx("p", {
        children: "You are checking out as a guest. A customer account will be created using the details below. Please confirm they are correct before continuing."
      }), /* @__PURE__ */jsxs("label", {
        className: "checkout-prefill-confirm-label",
        children: [/* @__PURE__ */jsx("input", {
          type: "checkbox",
          checked: prefillConfirmed,
          onChange: e => onPrefillConfirm(e.target.checked)
        }), "I confirm my details are correct and agree to have an account created"]
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-form-field",
      children: [/* @__PURE__ */jsx("label", {
        htmlFor: "email",
        className: "checkout-form-label",
        children: "Email"
      }), /* @__PURE__ */jsx("input", {
        id: "email",
        name: "email",
        type: "email",
        required: true,
        className: "checkout-form-input",
        value: customerInfo.email,
        onChange: e => onFieldChange("email", e.target.value),
        placeholder: "your@email.com"
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-form-row",
      children: [/* @__PURE__ */jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "firstName",
          className: "checkout-form-label",
          children: "First Name"
        }), /* @__PURE__ */jsx("input", {
          id: "firstName",
          name: "firstName",
          type: "text",
          required: true,
          className: "checkout-form-input",
          value: customerInfo.firstName,
          onChange: e => onFieldChange("firstName", e.target.value)
        })]
      }), /* @__PURE__ */jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "lastName",
          className: "checkout-form-label",
          children: "Last Name"
        }), /* @__PURE__ */jsx("input", {
          id: "lastName",
          name: "lastName",
          type: "text",
          required: true,
          className: "checkout-form-input",
          value: customerInfo.lastName,
          onChange: e => onFieldChange("lastName", e.target.value)
        })]
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-form-field",
      children: [/* @__PURE__ */jsx("label", {
        htmlFor: "phone",
        className: "checkout-form-label",
        children: "Phone (optional)"
      }), /* @__PURE__ */jsx("input", {
        id: "phone",
        name: "phone",
        type: "tel",
        className: "checkout-form-input",
        value: customerInfo.phone,
        onChange: e => onFieldChange("phone", e.target.value),
        placeholder: "+27 82 000 0000"
      })]
    }), /* @__PURE__ */jsx("div", {
      className: "checkout-form-field",
      style: {
        marginTop: "0.75rem"
      },
      children: /* @__PURE__ */jsxs("label", {
        className: "checkout-prefill-confirm-label",
        children: [/* @__PURE__ */jsx("input", {
          type: "checkbox",
          checked: businessCustomer,
          onChange: e => onBusinessCustomerChange(e.target.checked)
        }), "This order is for a business"]
      })
    }), businessCustomer && /* @__PURE__ */jsxs(Fragment, {
      children: [/* @__PURE__ */jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "companyName",
          className: "checkout-form-label",
          children: "Company name"
        }), /* @__PURE__ */jsx("input", {
          id: "companyName",
          name: "companyName",
          type: "text",
          className: "checkout-form-input",
          value: businessDetails.companyName,
          onChange: e => onBusinessDetailChange("companyName", e.target.value),
          placeholder: "e.g. Acme (Pty) Ltd"
        })]
      }), /* @__PURE__ */jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "vatNumber",
          className: "checkout-form-label",
          children: "TAX/VAT No (SARS VAT Number)"
        }), /* @__PURE__ */jsx("input", {
          id: "vatNumber",
          name: "vatNumber",
          type: "text",
          className: "checkout-form-input",
          value: businessDetails.vatNumber,
          onChange: e => onBusinessDetailChange("vatNumber", e.target.value),
          placeholder: "4XXXXXXXXX"
        })]
      }), /* @__PURE__ */jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "regNumber",
          className: "checkout-form-label",
          children: "Reg No (Business Registration Number)"
        }), /* @__PURE__ */jsx("input", {
          id: "regNumber",
          name: "regNumber",
          type: "text",
          className: "checkout-form-input",
          value: businessDetails.regNumber,
          onChange: e => onBusinessDetailChange("regNumber", formatRegNumber(e.target.value)),
          placeholder: "XXXX/XXXXXX/XX"
        })]
      })]
    }), /* @__PURE__ */jsx("button", {
      type: "submit",
      className: "checkout-submit-btn",
      disabled: isSubmitting || (isPreFilled || isGuest) && !prefillConfirmed,
      children: isSubmitting ? "Saving..." : "Continue to Shipping →"
    })]
  });
}
function ShippingAddressStep({
  shippingAddress,
  onFieldChange,
  onBack,
  fetcher,
  actionUrl
}) {
  const isSubmitting = fetcher.state !== "idle";
  return /* @__PURE__ */jsxs(fetcher.Form, {
    method: "post",
    action: actionUrl,
    className: "checkout-form",
    children: [/* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "step",
      value: "shipping-address"
    }), /* @__PURE__ */jsx("h2", {
      className: "checkout-section-title",
      children: "Shipping Address"
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-form-row",
      children: [/* @__PURE__ */jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "ship-firstName",
          className: "checkout-form-label",
          children: "First Name"
        }), /* @__PURE__ */jsx("input", {
          id: "ship-firstName",
          name: "firstName",
          type: "text",
          required: true,
          className: "checkout-form-input",
          value: shippingAddress.firstName,
          onChange: e => onFieldChange("firstName", e.target.value)
        })]
      }), /* @__PURE__ */jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "ship-lastName",
          className: "checkout-form-label",
          children: "Last Name"
        }), /* @__PURE__ */jsx("input", {
          id: "ship-lastName",
          name: "lastName",
          type: "text",
          required: true,
          className: "checkout-form-input",
          value: shippingAddress.lastName,
          onChange: e => onFieldChange("lastName", e.target.value)
        })]
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-form-field",
      children: [/* @__PURE__ */jsx("label", {
        htmlFor: "address1",
        className: "checkout-form-label",
        children: "Address"
      }), /* @__PURE__ */jsx("input", {
        id: "address1",
        name: "address1",
        type: "text",
        required: true,
        className: "checkout-form-input",
        value: shippingAddress.address1,
        onChange: e => onFieldChange("address1", e.target.value)
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-form-field",
      children: [/* @__PURE__ */jsx("label", {
        htmlFor: "address2",
        className: "checkout-form-label",
        children: "Apartment, suite, etc. (optional)"
      }), /* @__PURE__ */jsx("input", {
        id: "address2",
        name: "address2",
        type: "text",
        className: "checkout-form-input",
        value: shippingAddress.address2,
        onChange: e => onFieldChange("address2", e.target.value)
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-form-row",
      children: [/* @__PURE__ */jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "city",
          className: "checkout-form-label",
          children: "City"
        }), /* @__PURE__ */jsx("input", {
          id: "city",
          name: "city",
          type: "text",
          required: true,
          className: "checkout-form-input",
          value: shippingAddress.city,
          onChange: e => onFieldChange("city", e.target.value)
        })]
      }), /* @__PURE__ */jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "provinceCode",
          className: "checkout-form-label",
          children: "Province / State"
        }), /* @__PURE__ */jsx("input", {
          id: "provinceCode",
          name: "provinceCode",
          type: "text",
          className: "checkout-form-input",
          value: shippingAddress.provinceCode,
          onChange: e => onFieldChange("provinceCode", e.target.value)
        })]
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-form-row",
      children: [/* @__PURE__ */jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "zip",
          className: "checkout-form-label",
          children: "Postal / Zip Code"
        }), /* @__PURE__ */jsx("input", {
          id: "zip",
          name: "zip",
          type: "text",
          required: true,
          className: "checkout-form-input",
          value: shippingAddress.zip,
          onChange: e => onFieldChange("zip", e.target.value)
        })]
      }), /* @__PURE__ */jsxs("div", {
        className: "checkout-form-field",
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "countryCode",
          className: "checkout-form-label",
          children: "Country"
        }), /* @__PURE__ */jsxs("select", {
          id: "countryCode",
          name: "countryCode",
          required: true,
          className: "checkout-form-input",
          value: shippingAddress.countryCode,
          onChange: e => onFieldChange("countryCode", e.target.value),
          children: [/* @__PURE__ */jsx("option", {
            value: "ZA",
            children: "South Africa (ZA)"
          }), /* @__PURE__ */jsx("option", {
            value: "AU",
            disabled: true,
            children: "Australia (AU)"
          }), /* @__PURE__ */jsx("option", {
            value: "BW",
            disabled: true,
            children: "Botswana (BW)"
          }), /* @__PURE__ */jsx("option", {
            value: "CA",
            disabled: true,
            children: "Canada (CA)"
          }), /* @__PURE__ */jsx("option", {
            value: "GB",
            disabled: true,
            children: "United Kingdom (GB)"
          }), /* @__PURE__ */jsx("option", {
            value: "LS",
            disabled: true,
            children: "Lesotho (LS)"
          }), /* @__PURE__ */jsx("option", {
            value: "MW",
            disabled: true,
            children: "Malawi (MW)"
          }), /* @__PURE__ */jsx("option", {
            value: "MZ",
            disabled: true,
            children: "Mozambique (MZ)"
          }), /* @__PURE__ */jsx("option", {
            value: "NA",
            disabled: true,
            children: "Namibia (NA)"
          }), /* @__PURE__ */jsx("option", {
            value: "NZ",
            disabled: true,
            children: "New Zealand (NZ)"
          }), /* @__PURE__ */jsx("option", {
            value: "SZ",
            disabled: true,
            children: "Eswatini (SZ)"
          }), /* @__PURE__ */jsx("option", {
            value: "TZ",
            disabled: true,
            children: "Tanzania (TZ)"
          }), /* @__PURE__ */jsx("option", {
            value: "US",
            disabled: true,
            children: "United States (US)"
          }), /* @__PURE__ */jsx("option", {
            value: "ZM",
            disabled: true,
            children: "Zambia (ZM)"
          }), /* @__PURE__ */jsx("option", {
            value: "ZW",
            disabled: true,
            children: "Zimbabwe (ZW)"
          })]
        })]
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-form-field",
      children: [/* @__PURE__ */jsx("label", {
        htmlFor: "ship-phone",
        className: "checkout-form-label",
        children: "Phone (optional)"
      }), /* @__PURE__ */jsx("input", {
        id: "ship-phone",
        name: "phone",
        type: "tel",
        className: "checkout-form-input",
        value: shippingAddress.phone,
        onChange: e => onFieldChange("phone", e.target.value)
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-nav-buttons",
      children: [/* @__PURE__ */jsx("button", {
        type: "button",
        className: "checkout-back-btn",
        onClick: onBack,
        children: "← Back"
      }), /* @__PURE__ */jsx("button", {
        type: "submit",
        className: "checkout-submit-btn",
        disabled: isSubmitting,
        children: isSubmitting ? "Saving..." : "Continue to Shipping Method →"
      })]
    })]
  });
}
function ShippingMethodStep({
  deliveryGroups,
  localePrefix,
  onBack,
  onContinue
}) {
  const shippingFetcher = useFetcher({
    key: "shipping-method"
  });
  const group = deliveryGroups?.nodes?.[0];
  const options = group?.deliveryOptions ?? [];
  const [selectedHandle, setSelectedHandle] = useState(group?.selectedDeliveryOption?.handle ?? options[0]?.handle ?? null);
  useEffect(() => {
    if (!selectedHandle && options.length > 0 && group) {
      const handle = options[0].handle;
      setSelectedHandle(handle);
      shippingFetcher.submit({
        [CartForm.INPUT_NAME]: JSON.stringify({
          action: CartForm.ACTIONS.SelectedDeliveryOptionsUpdate,
          inputs: {
            selectedDeliveryOptions: [{
              deliveryGroupId: group.id,
              deliveryOptionHandle: handle
            }]
          }
        })
      }, {
        method: "POST",
        action: `${localePrefix}/cart`
      });
    }
  }, []);
  if (options.length === 0) {
    return /* @__PURE__ */jsxs("div", {
      className: "checkout-form",
      children: [/* @__PURE__ */jsx("h2", {
        className: "checkout-section-title",
        children: "Shipping Method"
      }), /* @__PURE__ */jsx("div", {
        className: "checkout-shipping-empty",
        children: "No shipping options are currently available for your address. Please contact us for assistance."
      }), /* @__PURE__ */jsxs("div", {
        className: "checkout-nav-buttons",
        children: [/* @__PURE__ */jsx("button", {
          type: "button",
          className: "checkout-back-btn",
          onClick: onBack,
          children: "← Back"
        }), /* @__PURE__ */jsx("button", {
          type: "button",
          className: "checkout-submit-btn",
          onClick: onContinue,
          children: "Continue to Review →"
        })]
      })]
    });
  }
  function handleSelect(option) {
    if (!group) return;
    setSelectedHandle(option.handle);
    shippingFetcher.submit({
      [CartForm.INPUT_NAME]: JSON.stringify({
        action: CartForm.ACTIONS.SelectedDeliveryOptionsUpdate,
        inputs: {
          selectedDeliveryOptions: [{
            deliveryGroupId: group.id,
            deliveryOptionHandle: option.handle
          }]
        }
      })
    }, {
      method: "POST",
      action: `${localePrefix}/cart`
    });
  }
  const isFree = amount => parseFloat(amount) === 0;
  return /* @__PURE__ */jsxs("div", {
    className: "checkout-form",
    children: [/* @__PURE__ */jsx("h2", {
      className: "checkout-section-title",
      children: "Shipping Method"
    }), /* @__PURE__ */jsx("div", {
      className: "checkout-shipping-options",
      children: options.map(option => /* @__PURE__ */jsxs("label", {
        className: "checkout-shipping-option",
        children: [/* @__PURE__ */jsx("input", {
          type: "radio",
          name: "delivery",
          value: option.handle,
          checked: selectedHandle === option.handle,
          onChange: () => handleSelect(option)
        }), /* @__PURE__ */jsx("span", {
          className: "checkout-shipping-option-label",
          children: option.title
        }), /* @__PURE__ */jsx("span", {
          className: `checkout-shipping-option-cost ${isFree(option.estimatedCost.amount) ? "checkout-shipping-option-free" : ""}`,
          children: isFree(option.estimatedCost.amount) ? "Free" : /* @__PURE__ */jsx(Money, {
            data: option.estimatedCost
          })
        })]
      }, option.handle))
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-nav-buttons",
      children: [/* @__PURE__ */jsx("button", {
        type: "button",
        className: "checkout-back-btn",
        onClick: onBack,
        children: "← Back"
      }), /* @__PURE__ */jsx("button", {
        type: "button",
        className: "checkout-submit-btn",
        onClick: onContinue,
        disabled: !selectedHandle || shippingFetcher.state !== "idle",
        children: shippingFetcher.state !== "idle" ? "Updating..." : "Continue to Review →"
      })]
    })]
  });
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
  onBack
}) {
  const deliveryGroup = cart.deliveryGroups?.nodes?.[0];
  const selectedDelivery = deliveryGroup?.selectedDeliveryOption;
  return /* @__PURE__ */jsxs("div", {
    className: "checkout-review",
    children: [/* @__PURE__ */jsx("h2", {
      className: "checkout-section-title",
      children: "Order Review"
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-review-section",
      children: [/* @__PURE__ */jsx("h3", {
        children: "Contact"
      }), /* @__PURE__ */jsx("p", {
        children: customerInfo.email
      }), /* @__PURE__ */jsxs("p", {
        children: [customerInfo.firstName, " ", customerInfo.lastName]
      }), customerInfo.phone && /* @__PURE__ */jsx("p", {
        children: customerInfo.phone
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-review-section",
      children: [/* @__PURE__ */jsx("h3", {
        children: "Ship to"
      }), /* @__PURE__ */jsxs("p", {
        children: [shippingAddress.firstName, " ", shippingAddress.lastName]
      }), /* @__PURE__ */jsx("p", {
        children: shippingAddress.address1
      }), shippingAddress.address2 && /* @__PURE__ */jsx("p", {
        children: shippingAddress.address2
      }), /* @__PURE__ */jsxs("p", {
        children: [shippingAddress.city, shippingAddress.provinceCode && `, ${shippingAddress.provinceCode}`, " ", shippingAddress.zip]
      }), /* @__PURE__ */jsx("p", {
        children: shippingAddress.countryCode
      })]
    }), selectedDelivery && /* @__PURE__ */jsxs("div", {
      className: "checkout-review-section",
      children: [/* @__PURE__ */jsx("h3", {
        children: "Shipping Method"
      }), /* @__PURE__ */jsxs("p", {
        children: [selectedDelivery.title, " — ", parseFloat(selectedDelivery.estimatedCost.amount) === 0 ? "Free" : /* @__PURE__ */jsx(Money, {
          data: selectedDelivery.estimatedCost
        })]
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-review-section",
      children: [/* @__PURE__ */jsx("h3", {
        children: "Items"
      }), /* @__PURE__ */jsx("ul", {
        className: "checkout-review-items",
        children: (cart.lines?.nodes ?? []).map(line => {
          const merchandise = line.merchandise;
          if (!("product" in merchandise)) return null;
          return /* @__PURE__ */jsxs("li", {
            className: "checkout-review-line",
            children: [/* @__PURE__ */jsx("div", {
              className: "checkout-review-line-image",
              children: merchandise.image && /* @__PURE__ */jsx(Image, {
                data: merchandise.image,
                width: 60,
                height: 60
              })
            }), /* @__PURE__ */jsxs("div", {
              className: "checkout-review-line-details",
              children: [/* @__PURE__ */jsx("p", {
                className: "checkout-review-line-title",
                children: merchandise.product.title
              }), merchandise.title !== "Default Title" && /* @__PURE__ */jsx("p", {
                className: "checkout-review-line-variant",
                children: merchandise.title
              }), /* @__PURE__ */jsxs("p", {
                className: "checkout-review-line-qty",
                children: ["Qty: ", line.quantity]
              })]
            }), /* @__PURE__ */jsx("div", {
              className: "checkout-review-line-price",
              children: /* @__PURE__ */jsx(Money, {
                data: line.cost.totalAmount
              })
            })]
          }, line.id);
        })
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-review-section checkout-review-totals",
      children: [/* @__PURE__ */jsxs("div", {
        className: "checkout-review-total-row",
        children: [/* @__PURE__ */jsx("span", {
          children: "Subtotal"
        }), /* @__PURE__ */jsx("span", {
          children: cart.cost?.subtotalAmount ? /* @__PURE__ */jsx(Money, {
            data: cart.cost.subtotalAmount
          }) : "-"
        })]
      }), selectedDelivery && parseFloat(selectedDelivery.estimatedCost.amount) > 0 && /* @__PURE__ */jsxs("div", {
        className: "checkout-review-total-row",
        children: [/* @__PURE__ */jsx("span", {
          children: "Shipping"
        }), /* @__PURE__ */jsx("span", {
          children: /* @__PURE__ */jsx(Money, {
            data: selectedDelivery.estimatedCost
          })
        })]
      }), /* @__PURE__ */jsxs("div", {
        className: "checkout-review-total-row checkout-review-grand-total",
        children: [/* @__PURE__ */jsx("span", {
          children: "Total"
        }), /* @__PURE__ */jsx("span", {
          children: cart.cost?.totalAmount ? /* @__PURE__ */jsx(Money, {
            data: cart.cost.totalAmount
          }) : "-"
        })]
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-review-section",
      children: [/* @__PURE__ */jsx("h3", {
        children: "Discounts & Gift Cards"
      }), /* @__PURE__ */jsx(CheckoutDiscounts, {
        cart,
        localePrefix
      }), /* @__PURE__ */jsx(CheckoutGiftCard, {
        cart,
        localePrefix
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-review-section checkout-payment-info",
      children: [/* @__PURE__ */jsx("h3", {
        children: "Payment"
      }), paymentGateway === "payfast" ? /* @__PURE__ */jsx("p", {
        children: "You will be redirected to PayFast to complete your payment securely."
      }) : /* @__PURE__ */jsx("p", {
        children: "You will be redirected to our secure payment page to complete your order."
      }), /* @__PURE__ */jsxs("div", {
        className: "checkout-payment-methods",
        children: [/* @__PURE__ */jsx("span", {
          className: "checkout-payment-badge",
          children: "Card"
        }), /* @__PURE__ */jsx("span", {
          className: "checkout-payment-badge",
          children: "EFT"
        }), /* @__PURE__ */jsx("span", {
          className: "checkout-payment-badge",
          children: "Google Pay"
        }), /* @__PURE__ */jsx("span", {
          className: "checkout-payment-badge",
          children: "Apple Pay"
        })]
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-review-section",
      style: {
        borderTop: "1px solid rgba(255,255,255,0.1)",
        paddingTop: "1rem"
      },
      children: [/* @__PURE__ */jsxs("label", {
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: "0.6rem",
          cursor: "pointer",
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.85)"
        },
        children: [/* @__PURE__ */jsx("input", {
          type: "checkbox",
          checked: invoiceEmailRequested,
          onChange: e => onInvoiceEmailChange(e.target.checked),
          style: {
            marginTop: "2px",
            flexShrink: 0
          }
        }), "Email me a tax invoice for this order"]
      }), /* @__PURE__ */jsxs("p", {
        style: {
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.5)",
          marginTop: "0.75rem",
          lineHeight: "1.5"
        },
        children: ["By proceeding you agree to our", " ", /* @__PURE__ */jsx("a", {
          href: "/policies/terms-of-service",
          target: "_blank",
          rel: "noreferrer",
          style: {
            color: "rgba(26,180,215,0.9)",
            textDecoration: "underline"
          },
          children: "Terms & Conditions"
        }), " ", "and", " ", /* @__PURE__ */jsx("a", {
          href: "/policies/refund-policy",
          target: "_blank",
          rel: "noreferrer",
          style: {
            color: "rgba(26,180,215,0.9)",
            textDecoration: "underline"
          },
          children: "Return Policy"
        }), "."]
      })]
    }), /* @__PURE__ */jsxs("div", {
      className: "checkout-nav-buttons",
      children: [/* @__PURE__ */jsx("button", {
        type: "button",
        className: "checkout-back-btn",
        onClick: onBack,
        children: "← Back"
      }), paymentGateway === "payfast" ? /* @__PURE__ */jsx(PayFastPaymentForm, {
        cart,
        customerInfo,
        shippingAddress,
        localePrefix,
        invoiceEmailRequested,
        businessCustomer,
        businessDetails
      }) : /* @__PURE__ */jsx("a", {
        href: cart.checkoutUrl,
        target: "_self",
        className: "checkout-pay-btn",
        children: "Proceed to Payment →"
      })]
    })]
  });
}
function CheckoutDiscounts({
  cart,
  localePrefix
}) {
  const codes = (cart.discountCodes ?? []).filter(d => d.applicable).map(d => d.code);
  return /* @__PURE__ */jsxs("div", {
    style: {
      marginBottom: "0.75rem"
    },
    children: [codes.length > 0 && /* @__PURE__ */jsx("div", {
      style: {
        marginBottom: "0.5rem"
      },
      children: /* @__PURE__ */jsx(CartForm, {
        route: `${localePrefix}/cart`,
        action: CartForm.ACTIONS.DiscountCodesUpdate,
        inputs: {
          discountCodes: []
        },
        children: /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem"
          },
          children: [/* @__PURE__ */jsx("code", {
            style: {
              background: "rgba(255,255,255,0.1)",
              padding: "2px 8px",
              borderRadius: "4px"
            },
            children: codes.join(", ")
          }), /* @__PURE__ */jsx("button", {
            type: "submit",
            style: {
              background: "none",
              border: "none",
              color: "rgba(255,100,100,0.8)",
              cursor: "pointer",
              fontSize: "0.8rem",
              textDecoration: "underline",
              padding: 0
            },
            children: "Remove"
          })]
        })
      })
    }), /* @__PURE__ */jsx(CartForm, {
      route: `${localePrefix}/cart`,
      action: CartForm.ACTIONS.DiscountCodesUpdate,
      inputs: {
        discountCodes: codes
      },
      children: /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          gap: "0.5rem"
        },
        children: [/* @__PURE__ */jsx("input", {
          type: "text",
          name: "discountCode",
          placeholder: "Discount code",
          className: "checkout-form-input",
          style: {
            flex: 1,
            margin: 0
          }
        }), /* @__PURE__ */jsx("button", {
          type: "submit",
          className: "checkout-back-btn",
          style: {
            margin: 0,
            whiteSpace: "nowrap"
          },
          children: "Apply"
        })]
      })
    })]
  });
}
function CheckoutGiftCard({
  cart,
  localePrefix
}) {
  const appliedCards = cart.appliedGiftCards ?? [];
  return /* @__PURE__ */jsxs("div", {
    children: [appliedCards.length > 0 && /* @__PURE__ */jsx("div", {
      style: {
        marginBottom: "0.5rem"
      },
      children: appliedCards.map(gc => /* @__PURE__ */jsx(CartForm, {
        route: `${localePrefix}/cart`,
        action: CartForm.ACTIONS.GiftCardCodesRemove,
        inputs: {
          giftCardCodes: [gc.id]
        },
        children: /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            marginBottom: "0.25rem"
          },
          children: [/* @__PURE__ */jsxs("code", {
            style: {
              background: "rgba(255,255,255,0.1)",
              padding: "2px 8px",
              borderRadius: "4px"
            },
            children: ["***", gc.lastCharacters]
          }), /* @__PURE__ */jsx(Money, {
            data: gc.amountUsed
          }), /* @__PURE__ */jsx("button", {
            type: "submit",
            style: {
              background: "none",
              border: "none",
              color: "rgba(255,100,100,0.8)",
              cursor: "pointer",
              fontSize: "0.8rem",
              textDecoration: "underline",
              padding: 0
            },
            children: "Remove"
          })]
        })
      }, gc.id))
    }), /* @__PURE__ */jsx(CartForm, {
      route: `${localePrefix}/cart`,
      action: CartForm.ACTIONS.GiftCardCodesAdd,
      children: /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          gap: "0.5rem"
        },
        children: [/* @__PURE__ */jsx("input", {
          type: "text",
          name: "giftCardCode",
          placeholder: "Gift card code",
          className: "checkout-form-input",
          style: {
            flex: 1,
            margin: 0
          }
        }), /* @__PURE__ */jsx("button", {
          type: "submit",
          className: "checkout-back-btn",
          style: {
            margin: 0,
            whiteSpace: "nowrap"
          },
          children: "Apply"
        })]
      })
    })]
  });
}
function PayFastPaymentForm({
  cart,
  customerInfo,
  shippingAddress,
  localePrefix,
  invoiceEmailRequested,
  businessCustomer,
  businessDetails
}) {
  const payFetcher = useFetcher({
    key: "payfast-initiate"
  });
  const isSubmitting = payFetcher.state !== "idle";
  return /* @__PURE__ */jsxs(payFetcher.Form, {
    method: "post",
    action: `${localePrefix}/checkout/payment`,
    children: [/* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "cartId",
      value: cart.id
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "cartTotal",
      value: cart.cost?.totalAmount?.amount ?? "0"
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "cartCurrency",
      value: cart.cost?.totalAmount?.currencyCode ?? "ZAR"
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "email",
      value: customerInfo.email
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "firstName",
      value: customerInfo.firstName
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "lastName",
      value: customerInfo.lastName
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "phone",
      value: customerInfo.phone
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "shipAddress1",
      value: shippingAddress.address1
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "shipAddress2",
      value: shippingAddress.address2
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "shipCity",
      value: shippingAddress.city
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "shipProvince",
      value: shippingAddress.provinceCode
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "shipZip",
      value: shippingAddress.zip
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "shipCountry",
      value: shippingAddress.countryCode
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "invoiceEmailRequested",
      value: invoiceEmailRequested ? "true" : "false"
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "isBusinessCustomer",
      value: businessCustomer ? "true" : "false"
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "companyName",
      value: businessDetails.companyName
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "vatNumber",
      value: businessDetails.vatNumber
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "regNumber",
      value: businessDetails.regNumber
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "lineItems",
      value: JSON.stringify((cart.lines?.nodes ?? []).map(line => ({
        variantId: line.merchandise?.id ?? "",
        quantity: line.quantity,
        title: line.merchandise?.product?.title ?? "",
        variantTitle: line.merchandise?.title ?? "",
        price: line.cost?.amountPerQuantity?.amount ?? "0",
        total: line.cost?.totalAmount?.amount ?? "0"
      })))
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "shippingTitle",
      value: cart.deliveryGroups?.nodes?.[0]?.selectedDeliveryOption?.title ?? ""
    }), /* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "shippingCost",
      value: cart.deliveryGroups?.nodes?.[0]?.selectedDeliveryOption?.estimatedCost?.amount ?? "0"
    }), payFetcher.data?.error && /* @__PURE__ */jsx("p", {
      style: {
        color: "#fc8181",
        fontSize: "0.85rem",
        marginBottom: "0.5rem"
      },
      children: payFetcher.data.error
    }), /* @__PURE__ */jsx("button", {
      type: "submit",
      className: "checkout-pay-btn",
      disabled: isSubmitting,
      style: {
        border: "none",
        cursor: isSubmitting ? "wait" : "pointer"
      },
      children: isSubmitting ? "Redirecting to PayFast..." : "Proceed to Payment →"
    })]
  });
}

const route11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  action: action$8,
  default: _$locale__checkout,
  loader: loader$e
}, Symbol.toStringTag, { value: 'Module' }));

async function action$7({
  request,
  context
}) {
  const env = context.env;
  const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
  const internalSecret = env.INTERNAL_API_SECRET ?? "";
  if (!storefrontUiUrl) {
    return data({
      error: "Payment service is not configured. Please try again later."
    }, {
      status: 503
    });
  }
  const formData = await request.formData();
  const orderPayload = {
    cartId: formData.get("cartId"),
    cartTotal: formData.get("cartTotal"),
    cartCurrency: formData.get("cartCurrency"),
    customer: {
      email: formData.get("email"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone")
    },
    shippingAddress: {
      address1: formData.get("shipAddress1"),
      address2: formData.get("shipAddress2"),
      city: formData.get("shipCity"),
      province: formData.get("shipProvince"),
      zip: formData.get("shipZip"),
      country: formData.get("shipCountry")
    },
    lineItems: (() => {
      try {
        return JSON.parse(formData.get("lineItems") ?? "[]");
      } catch {
        return [];
      }
    })(),
    invoiceEmailRequested: formData.get("invoiceEmailRequested") === "true",
    businessDetails: {
      isBusinessCustomer: formData.get("isBusinessCustomer") === "true",
      companyName: formData.get("companyName") || "",
      vatNumber: formData.get("vatNumber") || "",
      regNumber: formData.get("regNumber") || ""
    },
    shippingLine: {
      title: formData.get("shippingTitle") || "Shipping",
      cost: formData.get("shippingCost") || "0"
    }
  };
  try {
    const res = await fetch(`${storefrontUiUrl}/api/payment/initiate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Internal-Secret": internalSecret
      },
      body: JSON.stringify(orderPayload)
    });
    if (!res.ok) {
      const errorText = await res.text().catch(() => "Unknown error");
      console.error("[checkout/payment] initiate failed:", res.status, errorText);
      return data({
        error: "Payment initiation failed. Please try again."
      }, {
        status: 502
      });
    }
    const {
      redirectUrl
    } = await res.json();
    if (!redirectUrl) {
      return data({
        error: "No payment redirect URL received. Please try again."
      }, {
        status: 502
      });
    }
    throw redirect(redirectUrl);
  } catch (err) {
    if (err instanceof Response) throw err;
    console.error("[checkout/payment] unexpected error:", err);
    return data({
      error: "An unexpected error occurred. Please try again."
    }, {
      status: 500
    });
  }
}
async function loader$d() {
  throw redirect("/checkout");
}

const route12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  action: action$7,
  loader: loader$d
}, Symbol.toStringTag, { value: 'Module' }));

async function loader$c({
  request
}) {
  const url = new URL(request.url);
  const orderRef = url.searchParams.get("ref") ?? "";
  return {
    orderRef
  };
}
const _$locale__checkout_cancel = UNSAFE_withComponentProps(function CheckoutCancel() {
  const {
    orderRef
  } = useLoaderData();
  return /* @__PURE__ */jsx("div", {
    className: "checkout-result-wrapper",
    children: /* @__PURE__ */jsxs("div", {
      className: "checkout-result-box",
      children: [/* @__PURE__ */jsx("div", {
        className: "checkout-result-icon",
        style: {
          color: "#fc8181"
        },
        children: "✕"
      }), /* @__PURE__ */jsx("h1", {
        className: "checkout-result-title",
        children: "Payment Cancelled"
      }), /* @__PURE__ */jsx("p", {
        className: "checkout-result-message",
        children: "Your payment was cancelled and you have not been charged. Your cart is still intact — you can try again when you are ready."
      }), orderRef && /* @__PURE__ */jsxs("p", {
        className: "checkout-result-order-ref",
        children: ["Order ref: ", orderRef]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap"
        },
        children: [/* @__PURE__ */jsx("a", {
          href: "/checkout",
          className: "checkout-result-btn",
          children: "Try Again"
        }), /* @__PURE__ */jsx("a", {
          href: "/cart",
          className: "checkout-result-btn",
          style: {
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.3)"
          },
          children: "Back to Cart"
        })]
      })]
    })
  });
});

const route13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _$locale__checkout_cancel,
  loader: loader$c
}, Symbol.toStringTag, { value: 'Module' }));

async function loader$b({
  context
}) {
  return context.customerAccount.authorize();
}

const route14 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  loader: loader$b
}, Symbol.toStringTag, { value: 'Module' }));

const meta$1 = () => {
  return [{
    title: "Contact Us | Hoseworld"
  }];
};
const _$locale__contact = UNSAFE_withComponentProps(function ContactPage() {
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.5rem",
    marginBottom: "1.5rem"
  };
  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    background: "rgba(255, 255, 255, 0.1)",
    color: "white",
    fontSize: "1rem",
    marginBottom: "1rem",
    boxSizing: "border-box"
  };
  const labelStyle = {
    display: "block",
    marginBottom: "0.25rem",
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "0.875rem"
  };
  return /* @__PURE__ */jsxs("div", {
    style: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem 1rem",
      color: "white"
    },
    children: [/* @__PURE__ */jsx("h1", {
      style: {
        fontSize: "1.75rem",
        marginBottom: "1.5rem"
      },
      children: "Contact Us"
    }), /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          flex: "1 1 300px"
        },
        children: /* @__PURE__ */jsxs("div", {
          style: cardStyle,
          children: [/* @__PURE__ */jsx("h2", {
            style: {
              fontSize: "1.25rem",
              marginBottom: "1rem"
            },
            children: "Get in Touch"
          }), /* @__PURE__ */jsx("p", {
            style: {
              marginBottom: "0.75rem",
              lineHeight: "1.6"
            },
            children: "Have a question about our products or need assistance with an order? We are here to help."
          }), /* @__PURE__ */jsxs("div", {
            style: {
              marginTop: "1.5rem"
            },
            children: [/* @__PURE__ */jsxs("p", {
              style: {
                marginBottom: "0.5rem"
              },
              children: [/* @__PURE__ */jsx("strong", {
                children: "Email:"
              }), " info@hoseworld.co.za"]
            }), /* @__PURE__ */jsxs("p", {
              style: {
                marginBottom: "0.5rem"
              },
              children: [/* @__PURE__ */jsx("strong", {
                children: "Phone:"
              }), " +27 (0)11 123 4567"]
            }), /* @__PURE__ */jsxs("p", {
              style: {
                marginBottom: "0.5rem"
              },
              children: [/* @__PURE__ */jsx("strong", {
                children: "Address:"
              }), " Johannesburg, South Africa"]
            }), /* @__PURE__ */jsxs("p", {
              style: {
                marginBottom: "0.5rem"
              },
              children: [/* @__PURE__ */jsx("strong", {
                children: "Hours:"
              }), " Mon-Fri 8am - 5pm SAST"]
            })]
          })]
        })
      }), /* @__PURE__ */jsx("div", {
        style: {
          flex: "1 1 300px"
        },
        children: /* @__PURE__ */jsxs("div", {
          style: cardStyle,
          children: [/* @__PURE__ */jsx("h2", {
            style: {
              fontSize: "1.25rem",
              marginBottom: "1rem"
            },
            children: "Send a Message"
          }), /* @__PURE__ */jsxs("form", {
            method: "post",
            children: [/* @__PURE__ */jsx("label", {
              style: labelStyle,
              children: "Name"
            }), /* @__PURE__ */jsx("input", {
              type: "text",
              name: "name",
              required: true,
              style: inputStyle,
              placeholder: "Your name"
            }), /* @__PURE__ */jsx("label", {
              style: labelStyle,
              children: "Email"
            }), /* @__PURE__ */jsx("input", {
              type: "email",
              name: "email",
              required: true,
              style: inputStyle,
              placeholder: "your@email.com"
            }), /* @__PURE__ */jsx("label", {
              style: labelStyle,
              children: "Message"
            }), /* @__PURE__ */jsx("textarea", {
              name: "message",
              required: true,
              rows: 5,
              style: {
                ...inputStyle,
                resize: "vertical"
              },
              placeholder: "How can we help?"
            }), /* @__PURE__ */jsx("button", {
              type: "submit",
              style: {
                background: "rgba(255, 255, 255, 0.15)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "0.75rem 1.5rem",
                borderRadius: "4px",
                fontSize: "1rem",
                cursor: "pointer",
                width: "100%"
              },
              children: "Send Message"
            })]
          })]
        })
      })]
    })]
  });
});

const route15 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _$locale__contact,
  meta: meta$1
}, Symbol.toStringTag, { value: 'Module' }));

const SUPPLIERS_ROOT = path.resolve(process.cwd(), "media", "suppliers");
async function loader$a({
  params
}) {
  const splat = params["*"] ?? "";
  const resolved = path.resolve(SUPPLIERS_ROOT, splat);
  if (resolved !== SUPPLIERS_ROOT && !resolved.startsWith(SUPPLIERS_ROOT + path.sep)) {
    return new Response(null, {
      status: 404
    });
  }
  let file;
  try {
    file = await fs.readFile(resolved);
  } catch {
    return new Response(null, {
      status: 404
    });
  }
  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}

const route16 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  loader: loader$a
}, Symbol.toStringTag, { value: 'Module' }));

async function loader$9(args) {
  const {
    context
  } = args;
  const {
    storefront
  } = context;
  const data = await storefront.query(HOMEPAGE_COLLECTIONS_QUERY);
  const collections = (data.collections?.nodes ?? []).filter(col => col.title !== "JSON Imported" && col.products.nodes.length > 0);
  return {
    collections
  };
}
const _$locale___index = UNSAFE_withComponentProps(function Homepage() {
  const {
    collections
  } = useLoaderData();
  return /* @__PURE__ */jsxs("div", {
    className: "home",
    children: [/* @__PURE__ */jsx("section", {
      className: "px-4 pt-8 max-w-7xl mx-auto",
      children: /* @__PURE__ */jsx("h2", {
        className: "text-2xl font-bold text-left",
        children: "Online"
      })
    }), /* @__PURE__ */jsx("div", {
      className: "px-4 max-w-7xl mx-auto",
      children: /* @__PURE__ */jsx("hr", {
        style: {
          border: "none",
          borderTop: "2px solid rgb(0, 0, 0)"
        }
      })
    }), /* @__PURE__ */jsx("section", {
      hidden: true,
      className: "px-4 py-8 max-w-7xl mx-auto",
      children: /* @__PURE__ */jsx("h2", {
        className: "text-2xl font-bold",
        children: "Instore"
      })
    }), /* @__PURE__ */jsx("section", {
      className: "px-4 py-8 max-w-7xl mx-auto",
      children: collections.length > 0 ? /* @__PURE__ */jsx("div", {
        className: "collections-grid",
        children: collections.map(collection => /* @__PURE__ */jsx(CollectionCard, {
          collection
        }, collection.id))
      }) : /* @__PURE__ */jsx("p", {
        className: "text-center text-gray-500 py-8",
        children: "No collections available yet."
      })
    })]
  });
});
const HOMEPAGE_COLLECTIONS_QUERY = `#graphql
  query HomepageCollections(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: 20) {
      nodes {
        id
        title
        handle
        image {
          url
          altText
          width
          height
        }
        products(first: 1) {
          nodes {
            id
          }
        }
      }
    }
  }
`;

const route17 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _$locale___index,
  loader: loader$9
}, Symbol.toStringTag, { value: 'Module' }));

async function loader$8({
  request,
  context
}) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q") || "";
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12
  });
  if (!searchTerm) {
    return {
      searchTerm,
      products: null
    };
  }
  const {
    search
  } = await context.storefront.query(SEARCH_QUERY, {
    variables: {
      query: searchTerm,
      ...paginationVariables
    }
  });
  return {
    searchTerm,
    products: search
  };
}
const _$locale__search = UNSAFE_withComponentProps(function Search() {
  const {
    searchTerm,
    products
  } = useLoaderData();
  return /* @__PURE__ */jsxs("div", {
    className: "search max-w-7xl mx-auto px-4 py-8",
    children: [/* @__PURE__ */jsx("h1", {
      className: "text-3xl font-bold mb-6",
      children: "Search"
    }), /* @__PURE__ */jsx(SearchFormPredictive, {
      children: ({
        fetchResults,
        goToSearch,
        inputRef
      }) => /* @__PURE__ */jsxs("div", {
        className: "flex gap-2 mb-8",
        children: [/* @__PURE__ */jsx("input", {
          name: "q",
          defaultValue: searchTerm,
          onChange: fetchResults,
          onFocus: fetchResults,
          placeholder: "Search products...",
          ref: inputRef,
          type: "search",
          className: "flex-1 px-4 py-2 border border-gray-300 rounded"
        }), /* @__PURE__ */jsx("button", {
          onClick: goToSearch,
          className: "px-6 py-2 bg-black text-white rounded hover:bg-gray-800",
          children: "Search"
        })]
      })
    }), searchTerm && !products?.nodes?.length && /* @__PURE__ */jsxs("p", {
      className: "text-gray-500",
      children: ["No results found for ", /* @__PURE__ */jsx("q", {
        children: searchTerm
      })]
    }), products?.nodes?.length ? /* @__PURE__ */jsx("div", {
      className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
      children: products.nodes.map(product => /* @__PURE__ */jsxs(Link, {
        to: `/products/${product.handle}`,
        prefetch: "intent",
        className: "group",
        children: [product.featuredImage && /* @__PURE__ */jsx(Image, {
          data: product.featuredImage,
          aspectRatio: "1/1",
          sizes: "(min-width: 768px) 25vw, 50vw"
        }), /* @__PURE__ */jsx("h3", {
          className: "mt-2 font-semibold group-hover:underline",
          children: product.title
        }), /* @__PURE__ */jsx(Money, {
          data: product.priceRange.minVariantPrice
        })]
      }, product.id))
    }) : null]
  });
});
const SEARCH_QUERY = `#graphql
  query Search(
    $query: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    search(
      query: $query
      types: [PRODUCT]
      first: $first
      last: $last
      before: $startCursor
      after: $endCursor
    ) {
      nodes {
        ... on Product {
          id
          title
          handle
          productType
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

const route18 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _$locale__search,
  loader: loader$8
}, Symbol.toStringTag, { value: 'Module' }));

async function action$6({
  request,
  context
}) {
  const {
    cart
  } = context;
  const formData = await request.formData();
  const {
    action: action2,
    inputs
  } = CartForm.getFormInput(formData);
  let result;
  switch (action2) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate:
      result = await cart.updateDiscountCodes(inputs.discountCodes);
      break;
    case CartForm.ACTIONS.GiftCardCodesAdd:
      result = await cart.addGiftCardCodes([inputs.giftCardCode]);
      break;
    case CartForm.ACTIONS.GiftCardCodesRemove:
      result = await cart.removeGiftCardCodes(inputs.giftCardCodes);
      break;
    case CartForm.ACTIONS.BuyerIdentityUpdate:
      result = await cart.updateBuyerIdentity(inputs.buyerIdentity);
      break;
    case CartForm.ACTIONS.DeliveryAddressesAdd:
      result = await cart.addDeliveryAddresses(inputs.addresses);
      break;
    case CartForm.ACTIONS.DeliveryAddressesReplace:
      result = await cart.replaceDeliveryAddresses(inputs.addresses);
      break;
    case CartForm.ACTIONS.SelectedDeliveryOptionsUpdate:
      result = await cart.updateSelectedDeliveryOption(inputs.selectedDeliveryOptions);
      break;
    default:
      throw new Error(`Unknown action: ${action2}`);
  }
  const userErrors = result?.userErrors || [];
  if (userErrors.length > 0) {
    console.warn("[cart] userErrors:", userErrors.map(e => e.message).join(", "));
  }
  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(cartId) : new Headers();
  const status = userErrors.length > 0 ? 422 : 200;
  return data(result, {
    status,
    headers
  });
}
async function loader$7({
  context
}) {
  const {
    cart,
    storefront
  } = context;
  const expectedCountry = storefront.i18n.country;
  let cartData = await cart.get();
  if (cartData) {
    const currentCountry = cartData.buyerIdentity?.countryCode;
    if (!currentCountry || currentCountry !== expectedCountry) {
      console.log(`[cart-loader] Syncing buyerIdentity: ${currentCountry ?? "none"} -> ${expectedCountry}`);
      await cart.updateBuyerIdentity({
        countryCode: expectedCountry
      });
      cartData = await cart.get();
    }
  }
  return {
    cart: cartData
  };
}
const _$locale__cart = UNSAFE_withComponentProps(function Cart() {
  const {
    cart
  } = useLoaderData();
  return /* @__PURE__ */jsxs("div", {
    className: "cart max-w-4xl mx-auto px-4 py-8",
    children: [/* @__PURE__ */jsx("h1", {
      className: "text-3xl font-bold mb-6",
      children: "Your Cart"
    }), /* @__PURE__ */jsx(CartMain, {
      cart,
      layout: "page"
    })]
  });
});

const route19 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  action: action$6,
  default: _$locale__cart,
  loader: loader$7
}, Symbol.toStringTag, { value: 'Module' }));

async function loader$6({
  context
}) {
  return context.customerAccount.login();
}

const route20 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  loader: loader$6
}, Symbol.toStringTag, { value: 'Module' }));

async function loader$5({
  request,
  context
}) {
  const response = await getSitemapIndex({
    storefront: context.storefront,
    request,
    types: ["products", "pages", "collections", "metaObjects"]
  });
  response.headers.set("Cache-Control", "max-age=86400");
  return response;
}

const route21 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  loader: loader$5
}, Symbol.toStringTag, { value: 'Module' }));

function generateRobotsTxt(baseUrl) {
  return ["User-agent: *", "Disallow: /admin", "Disallow: /cart", "Disallow: /checkout", "Disallow: /account", "Disallow: /search", "Allow: /", "", `Sitemap: ${baseUrl}/sitemap.xml`].join("\n");
}
async function loader$4({
  request
}) {
  const baseUrl = new URL(request.url).origin;
  const robotsTxt = generateRobotsTxt(baseUrl);
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "max-age=86400"
    }
  });
}

const route22 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  generateRobotsTxt,
  loader: loader$4
}, Symbol.toStringTag, { value: 'Module' }));

const shouldRevalidate = ({
  formMethod,
  currentUrl,
  nextUrl
}) => {
  if (formMethod && formMethod !== "GET") return true;
  if (currentUrl.toString() === nextUrl.toString()) return true;
  return false;
};
async function loader$3({
  context
}) {
  await context.customerAccount.handleAuthStatus();
  const {
    data
  } = await context.customerAccount.query(CUSTOMER_DETAILS_QUERY);
  return {
    customer: data.customer
  };
}
const account = UNSAFE_withComponentProps(function AccountLayout() {
  const {
    customer
  } = useLoaderData();
  return /* @__PURE__ */jsxs("div", {
    className: "account-layout",
    style: {
      maxWidth: "80%",
      margin: "0 auto",
      padding: "2rem 1rem",
      color: "white"
    },
    children: [/* @__PURE__ */jsxs("h1", {
      style: {
        fontSize: "1.75rem",
        marginBottom: "1.5rem"
      },
      children: ["Welcome, ", customer.firstName || "there"]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap"
      },
      children: [/* @__PURE__ */jsx(AccountNav, {}), /* @__PURE__ */jsx("div", {
        style: {
          flex: 1,
          minWidth: 0
        },
        children: /* @__PURE__ */jsx(Outlet, {
          context: {
            customer
          }
        })
      })]
    })]
  });
});
function AccountNav() {
  const navStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1rem",
    minWidth: "200px"
  };
  const linkStyle = {
    display: "block",
    padding: "0.5rem 0.75rem",
    color: "white",
    textDecoration: "none",
    borderRadius: "4px",
    marginBottom: "0.25rem"
  };
  return /* @__PURE__ */jsxs("nav", {
    style: navStyle,
    children: [/* @__PURE__ */jsx("a", {
      href: "/account",
      style: linkStyle,
      children: "Overview"
    }), /* @__PURE__ */jsx("a", {
      href: "/account/orders",
      style: linkStyle,
      children: "Orders"
    }), /* @__PURE__ */jsx("a", {
      href: "/account/profile",
      style: linkStyle,
      children: "Profile"
    }), /* @__PURE__ */jsx("a", {
      href: "/account/addresses",
      style: linkStyle,
      children: "Addresses"
    }), /* @__PURE__ */jsx("a", {
      href: "/account/management",
      style: linkStyle,
      children: "Account Management"
    })]
  });
}

const route23 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: account,
  loader: loader$3,
  shouldRevalidate
}, Symbol.toStringTag, { value: 'Module' }));

const CUSTOMER_UPDATE_MUTATION = `#graphql
  mutation customerUpdate(
    $customer: CustomerUpdateInput!
    $language: LanguageCode
  ) @inContext(language: $language) {
    customerUpdate(input: $customer) {
      customer {
        firstName
        lastName
        emailAddress {
          emailAddress
        }
        phoneNumber {
          phoneNumber
        }
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

async function action$5({
  context,
  request
}) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "deactivate") {
    const {
      data,
      errors
    } = await context.customerAccount.mutate(CUSTOMER_UPDATE_MUTATION, {
      variables: {
        customer: {
          firstName: "Deactivated",
          lastName: "Account"
        }
      }
    });
    if (errors?.length) {
      return {
        error: errors[0].message,
        intent: "deactivate"
      };
    }
    if (data?.customerUpdate?.userErrors?.length) {
      return {
        error: data.customerUpdate.userErrors[0].message,
        intent: "deactivate"
      };
    }
    await context.customerAccount.logout({});
    return redirect("/");
  }
  if (intent === "delete") {
    const confirmation = formData.get("confirmation");
    if (confirmation !== "DELETE") {
      return {
        error: "Please type DELETE to confirm account deletion.",
        intent: "delete"
      };
    }
    const {
      data,
      errors
    } = await context.customerAccount.mutate(CUSTOMER_UPDATE_MUTATION, {
      variables: {
        customer: {
          firstName: "Deleted",
          lastName: "User"
        }
      }
    });
    if (errors?.length) {
      return {
        error: errors[0].message,
        intent: "delete"
      };
    }
    if (data?.customerUpdate?.userErrors?.length) {
      return {
        error: data.customerUpdate.userErrors[0].message,
        intent: "delete"
      };
    }
    await context.customerAccount.logout({});
    return redirect("/");
  }
  return {
    error: "Unknown action",
    intent: "unknown"
  };
}
const account_management = UNSAFE_withComponentProps(function AccountManagement() {
  const actionData = useActionData();
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const inputStyle = {
    width: "100%",
    padding: "0.5rem 0.75rem",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "4px",
    color: "white",
    fontSize: "0.875rem"
  };
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem"
  };
  const dangerBtnStyle = {
    background: "rgba(197, 48, 48, 0.15)",
    color: "#fc8181",
    border: "1px solid rgba(197, 48, 48, 0.4)",
    padding: "0.5rem 1.25rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.875rem",
    marginRight: "0.5rem"
  };
  const actionError = actionData && "error" in actionData ? actionData.error : null;
  return /* @__PURE__ */jsxs("div", {
    children: [/* @__PURE__ */jsx("h2", {
      style: {
        fontSize: "1.25rem",
        marginBottom: "1rem",
        color: "#fc8181"
      },
      children: "Account Management"
    }), actionError && /* @__PURE__ */jsx("p", {
      style: {
        color: "#fc8181",
        marginBottom: "1rem"
      },
      children: actionError
    }), /* @__PURE__ */jsxs("div", {
      style: {
        ...cardStyle,
        border: "1px solid rgba(197, 48, 48, 0.3)"
      },
      children: [/* @__PURE__ */jsxs("div", {
        style: {
          marginBottom: "1.25rem"
        },
        children: [/* @__PURE__ */jsx("p", {
          style: {
            fontWeight: 600,
            marginBottom: "0.25rem"
          },
          children: "Deactivate Account"
        }), /* @__PURE__ */jsx("p", {
          style: {
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "0.75rem"
          },
          children: "Marks your account as deactivated. Your order history and invoicing records are retained."
        }), !showDeactivate ? /* @__PURE__ */jsx("button", {
          type: "button",
          style: dangerBtnStyle,
          onClick: () => setShowDeactivate(true),
          children: "Deactivate Account"
        }) : /* @__PURE__ */jsxs("div", {
          style: {
            background: "rgba(197,48,48,0.08)",
            borderRadius: "6px",
            padding: "1rem",
            border: "1px solid rgba(197,48,48,0.3)"
          },
          children: [/* @__PURE__ */jsx("p", {
            style: {
              fontSize: "0.875rem",
              marginBottom: "1rem",
              color: "rgba(255,255,255,0.8)"
            },
            children: "Are you sure you want to deactivate your account? You will be logged out."
          }), /* @__PURE__ */jsxs(Form, {
            method: "post",
            style: {
              display: "inline"
            },
            children: [/* @__PURE__ */jsx("input", {
              type: "hidden",
              name: "intent",
              value: "deactivate"
            }), /* @__PURE__ */jsx("button", {
              type: "submit",
              style: dangerBtnStyle,
              children: "Yes, Deactivate"
            })]
          }), /* @__PURE__ */jsx("button", {
            type: "button",
            style: {
              ...dangerBtnStyle,
              color: "rgba(255,255,255,0.6)",
              borderColor: "rgba(255,255,255,0.2)",
              background: "transparent"
            },
            onClick: () => setShowDeactivate(false),
            children: "Cancel"
          })]
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "1.25rem"
        },
        children: [/* @__PURE__ */jsx("p", {
          style: {
            fontWeight: 600,
            marginBottom: "0.25rem"
          },
          children: "Close Account & Delete Personal Information"
        }), /* @__PURE__ */jsx("p", {
          style: {
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "0.75rem"
          },
          children: "Permanently removes your personal information. Your order and invoicing records are retained as required by SARS."
        }), !showDelete ? /* @__PURE__ */jsx("button", {
          type: "button",
          style: {
            ...dangerBtnStyle,
            borderColor: "rgba(197,48,48,0.6)"
          },
          onClick: () => setShowDelete(true),
          children: "Close Account"
        }) : /* @__PURE__ */jsxs("div", {
          style: {
            background: "rgba(197,48,48,0.08)",
            borderRadius: "6px",
            padding: "1rem",
            border: "1px solid rgba(197,48,48,0.3)"
          },
          children: [/* @__PURE__ */jsxs("p", {
            style: {
              fontSize: "0.875rem",
              marginBottom: "0.75rem",
              color: "rgba(255,255,255,0.8)"
            },
            children: ["This will permanently remove your personal information. Type ", /* @__PURE__ */jsx("strong", {
              children: "DELETE"
            }), " to confirm."]
          }), /* @__PURE__ */jsxs(Form, {
            method: "post",
            children: [/* @__PURE__ */jsx("input", {
              type: "hidden",
              name: "intent",
              value: "delete"
            }), /* @__PURE__ */jsx("input", {
              name: "confirmation",
              type: "text",
              placeholder: "Type DELETE to confirm",
              style: {
                ...inputStyle,
                width: "auto",
                marginBottom: "0.75rem",
                display: "block"
              }
            }), /* @__PURE__ */jsx("button", {
              type: "submit",
              style: {
                ...dangerBtnStyle,
                borderColor: "rgba(197,48,48,0.6)"
              },
              children: "Delete My Information"
            }), /* @__PURE__ */jsx("button", {
              type: "button",
              style: {
                ...dangerBtnStyle,
                color: "rgba(255,255,255,0.6)",
                borderColor: "rgba(255,255,255,0.2)",
                background: "transparent"
              },
              onClick: () => setShowDelete(false),
              children: "Cancel"
            })]
          })]
        })]
      })]
    })]
  });
});

const route24 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  action: action$5,
  default: account_management
}, Symbol.toStringTag, { value: 'Module' }));

const CUSTOMER_ADDRESS_CREATE_MUTATION = `#graphql
  mutation customerAddressCreate(
    $address: CustomerAddressInput!
    $defaultAddress: Boolean
    $language: LanguageCode
  ) @inContext(language: $language) {
    customerAddressCreate(
      address: $address
      defaultAddress: $defaultAddress
    ) {
      customerAddress {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;
const CUSTOMER_ADDRESS_UPDATE_MUTATION = `#graphql
  mutation customerAddressUpdate(
    $address: CustomerAddressInput!
    $addressId: ID!
    $defaultAddress: Boolean
    $language: LanguageCode
 ) @inContext(language: $language) {
    customerAddressUpdate(
      address: $address
      addressId: $addressId
      defaultAddress: $defaultAddress
    ) {
      customerAddress {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;
const CUSTOMER_ADDRESS_DELETE_MUTATION = `#graphql
  mutation customerAddressDelete(
    $addressId: ID!
    $language: LanguageCode
  ) @inContext(language: $language) {
    customerAddressDelete(addressId: $addressId) {
      deletedAddressId
      userErrors {
        code
        field
        message
      }
    }
  }
`;

async function action$4({
  context,
  request
}) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "delete") {
    const addressId = String(formData.get("addressId"));
    const {
      data,
      errors
    } = await context.customerAccount.mutate(CUSTOMER_ADDRESS_DELETE_MUTATION, {
      variables: {
        addressId
      }
    });
    if (errors?.length) return {
      error: errors[0].message
    };
    if (data?.customerAddressDelete?.userErrors?.length) {
      return {
        error: data.customerAddressDelete.userErrors[0].message
      };
    }
    return {
      success: "Address deleted."
    };
  }
  const address = {
    firstName: String(formData.get("firstName") || ""),
    lastName: String(formData.get("lastName") || ""),
    company: String(formData.get("company") || ""),
    address1: String(formData.get("address1") || ""),
    address2: String(formData.get("address2") || ""),
    city: String(formData.get("city") || ""),
    zoneCode: String(formData.get("zoneCode") || ""),
    zip: String(formData.get("zip") || ""),
    territoryCode: String(formData.get("territoryCode") || ""),
    phoneNumber: String(formData.get("phoneNumber") || "")
  };
  const defaultAddress = formData.get("defaultAddress") === "on";
  if (intent === "update") {
    const addressId = String(formData.get("addressId"));
    const {
      data,
      errors
    } = await context.customerAccount.mutate(CUSTOMER_ADDRESS_UPDATE_MUTATION, {
      variables: {
        address,
        addressId,
        defaultAddress
      }
    });
    if (errors?.length) return {
      error: errors[0].message
    };
    if (data?.customerAddressUpdate?.userErrors?.length) {
      return {
        error: data.customerAddressUpdate.userErrors[0].message
      };
    }
    return {
      success: "Address updated."
    };
  }
  if (intent === "create") {
    const {
      data,
      errors
    } = await context.customerAccount.mutate(CUSTOMER_ADDRESS_CREATE_MUTATION, {
      variables: {
        address,
        defaultAddress
      }
    });
    if (errors?.length) return {
      error: errors[0].message
    };
    if (data?.customerAddressCreate?.userErrors?.length) {
      return {
        error: data.customerAddressCreate.userErrors[0].message
      };
    }
    return {
      success: "Address created."
    };
  }
  return {
    error: "Unknown action."
  };
}
const account_addresses = UNSAFE_withComponentProps(function AccountAddresses() {
  const {
    customer
  } = useOutletContext();
  const actionData = useActionData();
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem",
    marginBottom: "0.75rem"
  };
  const buttonStyle = {
    background: "rgba(255, 255, 255, 0.15)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding: "0.35rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.875rem"
  };
  return /* @__PURE__ */jsxs("div", {
    children: [/* @__PURE__ */jsx("h2", {
      style: {
        fontSize: "1.25rem",
        marginBottom: "1rem"
      },
      children: "Addresses"
    }), actionData && "success" in actionData && /* @__PURE__ */jsx("p", {
      style: {
        color: "#68d391",
        marginBottom: "1rem"
      },
      children: actionData.success
    }), actionData && "error" in actionData && /* @__PURE__ */jsx("p", {
      style: {
        color: "#fc8181",
        marginBottom: "1rem"
      },
      children: actionData.error
    }), customer.addresses.nodes.length === 0 ? /* @__PURE__ */jsx("div", {
      style: cardStyle,
      children: /* @__PURE__ */jsx("p", {
        style: {
          color: "rgba(255,255,255,0.7)"
        },
        children: "No addresses saved."
      })
    }) : customer.addresses.nodes.map(address => /* @__PURE__ */jsx("div", {
      style: cardStyle,
      children: /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem"
        },
        children: [/* @__PURE__ */jsxs("div", {
          children: [address.formatted.map((line, i) => /* @__PURE__ */jsx("p", {
            children: line
          }, i)), customer.defaultAddress?.id === address.id && /* @__PURE__ */jsx("p", {
            style: {
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.875rem",
              marginTop: "0.25rem"
            },
            children: "Default"
          })]
        }), /* @__PURE__ */jsxs(Form, {
          method: "post",
          children: [/* @__PURE__ */jsx("input", {
            type: "hidden",
            name: "addressId",
            value: address.id
          }), /* @__PURE__ */jsx("input", {
            type: "hidden",
            name: "intent",
            value: "delete"
          }), /* @__PURE__ */jsx("button", {
            type: "submit",
            style: {
              ...buttonStyle,
              background: "rgba(229, 62, 62, 0.3)",
              border: "1px solid rgba(229, 62, 62, 0.5)"
            },
            children: "Delete"
          })]
        })]
      })
    }, address.id)), /* @__PURE__ */jsxs("details", {
      style: {
        ...cardStyle,
        cursor: "pointer",
        marginTop: "1.5rem"
      },
      children: [/* @__PURE__ */jsx("summary", {
        style: {
          fontWeight: "bold",
          marginBottom: "1rem"
        },
        children: "Add new address"
      }), /* @__PURE__ */jsx(AddressForm, {})]
    })]
  });
});
function AddressForm() {
  const inputStyle = {
    width: "100%",
    padding: "0.5rem 0.75rem",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "4px",
    color: "white",
    fontSize: "0.875rem"
  };
  const labelStyle = {
    display: "block",
    marginBottom: "0.25rem",
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.875rem"
  };
  const fieldStyle = {
    marginBottom: "0.75rem"
  };
  return /* @__PURE__ */jsxs(Form, {
    method: "post",
    children: [/* @__PURE__ */jsx("input", {
      type: "hidden",
      name: "intent",
      value: "create"
    }), /* @__PURE__ */jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.75rem"
      },
      children: [/* @__PURE__ */jsxs("div", {
        style: fieldStyle,
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "firstName",
          style: labelStyle,
          children: "First name"
        }), /* @__PURE__ */jsx("input", {
          id: "firstName",
          name: "firstName",
          type: "text",
          style: inputStyle
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: fieldStyle,
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "lastName",
          style: labelStyle,
          children: "Last name"
        }), /* @__PURE__ */jsx("input", {
          id: "lastName",
          name: "lastName",
          type: "text",
          style: inputStyle
        })]
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: fieldStyle,
      children: [/* @__PURE__ */jsx("label", {
        htmlFor: "company",
        style: labelStyle,
        children: "Company"
      }), /* @__PURE__ */jsx("input", {
        id: "company",
        name: "company",
        type: "text",
        style: inputStyle
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: fieldStyle,
      children: [/* @__PURE__ */jsx("label", {
        htmlFor: "address1",
        style: labelStyle,
        children: "Address"
      }), /* @__PURE__ */jsx("input", {
        id: "address1",
        name: "address1",
        type: "text",
        style: inputStyle
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: fieldStyle,
      children: [/* @__PURE__ */jsx("label", {
        htmlFor: "address2",
        style: labelStyle,
        children: "Apartment, suite, etc."
      }), /* @__PURE__ */jsx("input", {
        id: "address2",
        name: "address2",
        type: "text",
        style: inputStyle
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.75rem"
      },
      children: [/* @__PURE__ */jsxs("div", {
        style: fieldStyle,
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "city",
          style: labelStyle,
          children: "City"
        }), /* @__PURE__ */jsx("input", {
          id: "city",
          name: "city",
          type: "text",
          style: inputStyle
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: fieldStyle,
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "zoneCode",
          style: labelStyle,
          children: "Province/State"
        }), /* @__PURE__ */jsx("input", {
          id: "zoneCode",
          name: "zoneCode",
          type: "text",
          style: inputStyle
        })]
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.75rem"
      },
      children: [/* @__PURE__ */jsxs("div", {
        style: fieldStyle,
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "zip",
          style: labelStyle,
          children: "Postal/Zip code"
        }), /* @__PURE__ */jsx("input", {
          id: "zip",
          name: "zip",
          type: "text",
          style: inputStyle
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: fieldStyle,
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "territoryCode",
          style: labelStyle,
          children: "Country code"
        }), /* @__PURE__ */jsx("input", {
          id: "territoryCode",
          name: "territoryCode",
          type: "text",
          style: inputStyle,
          placeholder: "e.g. ZA, US, NZ"
        })]
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: fieldStyle,
      children: [/* @__PURE__ */jsx("label", {
        htmlFor: "phoneNumber",
        style: labelStyle,
        children: "Phone"
      }), /* @__PURE__ */jsx("input", {
        id: "phoneNumber",
        name: "phoneNumber",
        type: "tel",
        style: inputStyle
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        ...fieldStyle,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      },
      children: [/* @__PURE__ */jsx("input", {
        id: "defaultAddress",
        name: "defaultAddress",
        type: "checkbox"
      }), /* @__PURE__ */jsx("label", {
        htmlFor: "defaultAddress",
        style: {
          color: "rgba(255,255,255,0.7)",
          fontSize: "0.875rem"
        },
        children: "Set as default address"
      })]
    }), /* @__PURE__ */jsx("button", {
      type: "submit",
      style: {
        background: "rgba(255, 255, 255, 0.15)",
        color: "white",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        padding: "0.5rem 1.5rem",
        borderRadius: "6px",
        cursor: "pointer"
      },
      children: "Add address"
    })]
  });
}

const route25 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  action: action$4,
  default: account_addresses
}, Symbol.toStringTag, { value: 'Module' }));

const CUSTOMER_EMAIL_QUERY = `#graphql
  query CustomerEmail {
    customer {
      id
      emailAddress {
        emailAddress
      }
    }
  }
`;
async function loader$2({
  context
}) {
  const env = context.env;
  const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
  const internalSecret = env.INTERNAL_API_SECRET ?? "";
  let businessProfile = {
    companyName: "",
    regNumber: "",
    vatNumber: ""
  };
  try {
    const isLoggedIn = await context.customerAccount.isLoggedIn();
    if (isLoggedIn && storefrontUiUrl) {
      const {
        data
      } = await context.customerAccount.query(CUSTOMER_EMAIL_QUERY);
      const email = data?.customer?.emailAddress?.emailAddress ?? "";
      if (email) {
        const res = await fetch(`${storefrontUiUrl}/api/customer/business?email=${encodeURIComponent(email)}`, {
          headers: {
            "X-Internal-Secret": internalSecret
          }
        });
        if (res.ok) {
          const data2 = await res.json();
          businessProfile = data2;
        }
      }
    }
  } catch {}
  return {
    businessProfile
  };
}
async function action$3({
  context,
  request
}) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "update") {
    const {
      data,
      errors
    } = await context.customerAccount.mutate(CUSTOMER_UPDATE_MUTATION, {
      variables: {
        customer: {
          firstName: String(formData.get("firstName") || ""),
          lastName: String(formData.get("lastName") || "")
        }
      }
    });
    if (errors?.length) {
      return {
        error: errors[0].message,
        intent
      };
    }
    if (data?.customerUpdate?.userErrors?.length) {
      return {
        error: data.customerUpdate.userErrors[0].message,
        intent
      };
    }
    return {
      success: true,
      intent: "update"
    };
  }
  if (intent === "update-business") {
    const env = context.env;
    const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
    const internalSecret = env.INTERNAL_API_SECRET ?? "";
    if (!storefrontUiUrl) {
      return {
        error: "Business profile service is not configured.",
        intent
      };
    }
    try {
      const {
        data: idData
      } = await context.customerAccount.query(CUSTOMER_EMAIL_QUERY);
      const email = idData?.customer?.emailAddress?.emailAddress ?? "";
      const shopifyCustomerId = idData?.customer?.id ?? "";
      if (!email) {
        return {
          error: "Could not identify customer.",
          intent
        };
      }
      const companyName = String(formData.get("companyName") || "");
      const regNumber = String(formData.get("regNumber") || "");
      const vatNumber = String(formData.get("vatNumber") || "");
      const res = await fetch(`${storefrontUiUrl}/api/customer/business`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Secret": internalSecret
        },
        body: JSON.stringify({
          shopifyCustomerId,
          email,
          companyName,
          regNumber,
          vatNumber
        })
      });
      if (!res.ok) {
        return {
          error: "Failed to save business details.",
          intent
        };
      }
      return {
        success: true,
        intent: "update-business",
        companyName,
        regNumber,
        vatNumber
      };
    } catch {
      return {
        error: "Could not reach profile service.",
        intent
      };
    }
  }
  return {
    error: "Unknown action",
    intent: "unknown"
  };
}
const account_profile = UNSAFE_withComponentProps(function AccountProfile() {
  const {
    customer
  } = useOutletContext();
  const {
    businessProfile
  } = useLoaderData();
  const actionData = useActionData();
  const [isBusinessCustomer, setIsBusinessCustomer] = useState(!!(businessProfile.companyName || businessProfile.regNumber || businessProfile.vatNumber));
  const [companyName, setCompanyName] = useState(businessProfile.companyName ?? "");
  const [regNumber, setRegNumber] = useState(businessProfile.regNumber ?? "");
  const [vatNumber, setVatNumber] = useState(businessProfile.vatNumber ?? "");
  actionData && "success" in actionData && actionData.intent === "update-business" ? actionData : null;
  const inputStyle = {
    width: "100%",
    padding: "0.5rem 0.75rem",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "4px",
    color: "white",
    fontSize: "0.875rem"
  };
  const labelStyle = {
    display: "block",
    marginBottom: "0.25rem",
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.875rem"
  };
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem"
  };
  const actionError = actionData && "error" in actionData ? actionData.error : null;
  return /* @__PURE__ */jsxs("div", {
    children: [/* @__PURE__ */jsx("h2", {
      style: {
        fontSize: "1.25rem",
        marginBottom: "1rem"
      },
      children: "Profile"
    }), actionData && "success" in actionData && actionData.intent === "update" && /* @__PURE__ */jsx("p", {
      style: {
        color: "#68d391",
        marginBottom: "1rem"
      },
      children: "Profile updated."
    }), actionData && "success" in actionData && actionData.intent === "update-business" && /* @__PURE__ */jsx("p", {
      style: {
        color: "#68d391",
        marginBottom: "1rem"
      },
      children: "Business details saved."
    }), actionError && /* @__PURE__ */jsx("p", {
      style: {
        color: "#fc8181",
        marginBottom: "1rem"
      },
      children: actionError
    }), /* @__PURE__ */jsxs(Form, {
      method: "post",
      style: {
        ...cardStyle,
        marginBottom: "1rem"
      },
      children: [/* @__PURE__ */jsx("input", {
        type: "hidden",
        name: "intent",
        value: "update"
      }), /* @__PURE__ */jsxs("div", {
        style: {
          marginBottom: "1rem"
        },
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "firstName",
          style: labelStyle,
          children: "First name"
        }), /* @__PURE__ */jsx("input", {
          id: "firstName",
          name: "firstName",
          type: "text",
          defaultValue: customer.firstName ?? "",
          style: inputStyle
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          marginBottom: "1.5rem"
        },
        children: [/* @__PURE__ */jsx("label", {
          htmlFor: "lastName",
          style: labelStyle,
          children: "Last name"
        }), /* @__PURE__ */jsx("input", {
          id: "lastName",
          name: "lastName",
          type: "text",
          defaultValue: customer.lastName ?? "",
          style: inputStyle
        })]
      }), /* @__PURE__ */jsx("button", {
        type: "submit",
        style: {
          background: "rgba(255, 255, 255, 0.15)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          padding: "0.5rem 1.5rem",
          borderRadius: "6px",
          cursor: "pointer"
        },
        children: "Save"
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */jsx("h3", {
        style: {
          fontSize: "1rem",
          marginBottom: "0.75rem",
          color: "rgba(255,255,255,0.9)"
        },
        children: "Business Details"
      }), /* @__PURE__ */jsxs("label", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          marginBottom: "1rem",
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.7)"
        },
        children: [/* @__PURE__ */jsx("input", {
          type: "checkbox",
          checked: isBusinessCustomer,
          onChange: e => setIsBusinessCustomer(e.target.checked),
          style: {
            width: "auto",
            margin: 0
          }
        }), "This account is used for business purchases"]
      }), isBusinessCustomer && /* @__PURE__ */jsxs(Form, {
        method: "post",
        children: [/* @__PURE__ */jsx("input", {
          type: "hidden",
          name: "intent",
          value: "update-business"
        }), /* @__PURE__ */jsxs("div", {
          style: {
            marginBottom: "0.75rem"
          },
          children: [/* @__PURE__ */jsx("label", {
            htmlFor: "companyName",
            style: labelStyle,
            children: "Company name"
          }), /* @__PURE__ */jsx("input", {
            id: "companyName",
            name: "companyName",
            type: "text",
            value: companyName,
            onChange: e => setCompanyName(e.target.value),
            placeholder: "e.g. Acme (Pty) Ltd",
            style: inputStyle
          })]
        }), /* @__PURE__ */jsxs("div", {
          style: {
            marginBottom: "0.75rem"
          },
          children: [/* @__PURE__ */jsx("label", {
            htmlFor: "bizRegNumber",
            style: labelStyle,
            children: "Business registration number"
          }), /* @__PURE__ */jsx("input", {
            id: "bizRegNumber",
            name: "regNumber",
            type: "text",
            value: regNumber,
            onChange: e => setRegNumber(e.target.value),
            placeholder: "XXXX/XXXXXX/XX",
            style: inputStyle
          })]
        }), /* @__PURE__ */jsxs("div", {
          style: {
            marginBottom: "1.25rem"
          },
          children: [/* @__PURE__ */jsx("label", {
            htmlFor: "bizVatNumber",
            style: labelStyle,
            children: "VAT / Tax number (SARS VAT number)"
          }), /* @__PURE__ */jsx("input", {
            id: "bizVatNumber",
            name: "vatNumber",
            type: "text",
            value: vatNumber,
            onChange: e => setVatNumber(e.target.value),
            placeholder: "4XXXXXXXXX",
            style: inputStyle
          })]
        }), /* @__PURE__ */jsx("button", {
          type: "submit",
          style: {
            background: "rgba(26,180,215,0.15)",
            color: "rgba(26,180,215,0.9)",
            border: "1px solid rgba(26,180,215,0.3)",
            padding: "0.5rem 1.5rem",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.875rem"
          },
          children: "Save Business Details"
        })]
      })]
    })]
  });
});

const route26 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  action: action$3,
  default: account_profile,
  loader: loader$2
}, Symbol.toStringTag, { value: 'Module' }));

async function action$2({
  context
}) {
  return context.customerAccount.logout({});
}
const account__index = UNSAFE_withComponentProps(function AccountDashboard() {
  const {
    customer
  } = useOutletContext();
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem",
    marginBottom: "1rem"
  };
  return /* @__PURE__ */jsxs("div", {
    children: [/* @__PURE__ */jsx("h2", {
      style: {
        fontSize: "1.25rem",
        marginBottom: "1rem"
      },
      children: "Account Overview"
    }), /* @__PURE__ */jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */jsx("h3", {
        style: {
          fontSize: "1rem",
          marginBottom: "0.5rem",
          color: "rgba(255,255,255,0.7)"
        },
        children: "Profile"
      }), /* @__PURE__ */jsxs("p", {
        children: [customer.firstName, " ", customer.lastName]
      })]
    }), customer.defaultAddress && /* @__PURE__ */jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */jsx("h3", {
        style: {
          fontSize: "1rem",
          marginBottom: "0.5rem",
          color: "rgba(255,255,255,0.7)"
        },
        children: "Default Address"
      }), customer.defaultAddress.formatted.map((line, i) => /* @__PURE__ */jsx("p", {
        children: line
      }, i))]
    }), /* @__PURE__ */jsx(Form, {
      method: "post",
      style: {
        marginTop: "2rem"
      },
      children: /* @__PURE__ */jsx("button", {
        type: "submit",
        style: {
          background: "rgba(250, 35, 35, 0.7)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          padding: "0.5rem 1.5rem",
          borderRadius: "6px",
          cursor: "pointer"
        },
        children: "Sign out"
      })
    })]
  });
});

const route27 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: account__index
}, Symbol.toStringTag, { value: 'Module' }));

const account_orders = UNSAFE_withComponentProps(function AccountOrdersLayout() {
  return /* @__PURE__ */jsx(Outlet, {});
});

const route28 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: account_orders
}, Symbol.toStringTag, { value: 'Module' }));

const ORDER_ITEM_FRAGMENT = `#graphql
  fragment OrderItem on Order {
    totalPrice {
      amount
      currencyCode
    }
    financialStatus
    fulfillmentStatus
    fulfillments(first: 1) {
      nodes {
        status
      }
    }
    id
    number
    confirmationNumber
    processedAt
  }
`;
const CUSTOMER_ORDERS_QUERY = `#graphql
  #graphql
  fragment CustomerOrders on Customer {
    orders(
      sortKey: PROCESSED_AT,
      reverse: true,
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor,
      query: $query
    ) {
      nodes {
        ...OrderItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
  ${ORDER_ITEM_FRAGMENT}

  query CustomerOrders(
    $endCursor: String
    $first: Int
    $last: Int
    $startCursor: String
    $query: String
    $language: LanguageCode
  ) @inContext(language: $language) {
    customer {
      ...CustomerOrders
    }
  }
`;
const ORDER_QUERY = `#graphql
  fragment OrderMoney on MoneyV2 {
    amount
    currencyCode
  }
  fragment DiscountApplication on DiscountApplication {
    value {
      __typename
      ... on MoneyV2 {
        ...OrderMoney
      }
      ... on PricingPercentageValue {
        percentage
      }
    }
  }
  fragment OrderLineItemFull on LineItem {
    id
    title
    quantity
    price {
      ...OrderMoney
    }
    discountAllocations {
      allocatedAmount {
        ...OrderMoney
      }
      discountApplication {
        ...DiscountApplication
      }
    }
    totalDiscount {
      ...OrderMoney
    }
    image {
      altText
      height
      url
      id
      width
    }
    variantTitle
  }
  fragment Order on Order {
    id
    name
    confirmationNumber
    statusPageUrl
    fulfillmentStatus
    processedAt
    fulfillments(first: 1) {
      nodes {
        status
      }
    }
    totalTax {
      ...OrderMoney
    }
    totalPrice {
      ...OrderMoney
    }
    subtotal {
      ...OrderMoney
    }
    shippingAddress {
      name
      formatted(withName: true)
      formattedArea
    }
    shippingLine {
      title
      originalPrice {
        ...OrderMoney
      }
    }
    discountApplications(first: 100) {
      nodes {
        ...DiscountApplication
      }
    }
    lineItems(first: 100) {
      nodes {
        ...OrderLineItemFull
      }
    }
  }
  query Order($orderId: ID!, $language: LanguageCode)
    @inContext(language: $language) {
    order(id: $orderId) {
      ... on Order {
        ...Order
      }
    }
  }
`;

const CUSTOMER_ID_QUERY$1 = `#graphql
  query CustomerId {
    customer {
      id
      emailAddress {
        emailAddress
      }
    }
  }
`;
async function fetchArchivedIds$1(storefrontUiUrl, internalSecret, customerId) {
  try {
    const res = await fetch(`${storefrontUiUrl}/api/orders/archive?customerId=${encodeURIComponent(customerId)}`, {
      headers: {
        "X-Internal-Secret": internalSecret
      }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.archivedIds ?? [];
  } catch {
    return [];
  }
}
async function loader$1({
  context,
  request
}) {
  const url = new URL(request.url);
  const view = url.searchParams.get("view") ?? "active";
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20
  });
  const env = context.env;
  const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
  const internalSecret = env.INTERNAL_API_SECRET ?? "";
  const [{
    data: ordersData
  }, {
    data: idData
  }] = await Promise.all([context.customerAccount.query(CUSTOMER_ORDERS_QUERY, {
    variables: {
      ...paginationVariables
    }
  }), context.customerAccount.query(CUSTOMER_ID_QUERY$1)]);
  const customerId = idData?.customer?.id ?? "";
  const customerEmail = idData?.customer?.emailAddress?.emailAddress ?? "";
  const archivedIds = storefrontUiUrl ? await fetchArchivedIds$1(storefrontUiUrl, internalSecret, customerId) : [];
  return {
    orders: ordersData.customer.orders,
    archivedIds,
    view,
    customerId,
    customerEmail
  };
}
async function action$1({
  context,
  request
}) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const orderId = formData.get("orderId");
  const customerId = formData.get("customerId");
  const env = context.env;
  const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
  const internalSecret = env.INTERNAL_API_SECRET ?? "";
  if (intent === "archive") {
    if (!storefrontUiUrl) {
      return {
        error: "Archive service is not configured."
      };
    }
    try {
      const res = await fetch(`${storefrontUiUrl}/api/orders/archive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Secret": internalSecret
        },
        body: JSON.stringify({
          customerId,
          orderId
        })
      });
      if (!res.ok) {
        const data = await res.json();
        return {
          error: data.error ?? "Failed to archive order."
        };
      }
      return {
        success: true,
        intent
      };
    } catch {
      return {
        error: "Could not reach archive service. Please try again."
      };
    }
  }
  return {
    error: "Unknown intent"
  };
}
const account_orders__index = UNSAFE_withComponentProps(function AccountOrders() {
  const {
    orders,
    archivedIds,
    view,
    customerId
  } = useLoaderData();
  const fetcher = useFetcher();
  const isArchiveView = view === "archived";
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem",
    marginBottom: "0.75rem"
  };
  const allOrders = orders.nodes;
  const displayedOrders = isArchiveView ? allOrders.filter(o => archivedIds.includes(o.id)) : allOrders.filter(o => !archivedIds.includes(o.id));
  return /* @__PURE__ */jsxs("div", {
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem"
      },
      children: [/* @__PURE__ */jsxs("h2", {
        style: {
          fontSize: "1.25rem",
          margin: 0
        },
        children: ["Order History", isArchiveView && /* @__PURE__ */jsx("span", {
          style: {
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.5)",
            fontWeight: 400,
            marginLeft: "0.5rem"
          },
          children: "— Archived"
        })]
      }), isArchiveView ? /* @__PURE__ */jsx(Link, {
        to: "/account/orders",
        style: {
          fontSize: "0.875rem",
          color: "rgba(26,180,215,0.9)"
        },
        children: "← Active Orders"
      }) : /* @__PURE__ */jsx(Link, {
        to: "?view=archived",
        style: {
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.5)"
        },
        children: "View Archived"
      })]
    }), fetcher.data?.error && /* @__PURE__ */jsx("p", {
      style: {
        color: "#fc8181",
        marginBottom: "1rem",
        fontSize: "0.875rem"
      },
      children: fetcher.data.error
    }), displayedOrders.length === 0 ? /* @__PURE__ */jsx("div", {
      style: cardStyle,
      children: /* @__PURE__ */jsx("p", {
        style: {
          color: "rgba(255,255,255,0.7)"
        },
        children: isArchiveView ? "No archived orders." : "No orders yet."
      })
    }) : displayedOrders.map(order => /* @__PURE__ */jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem"
        },
        children: [/* @__PURE__ */jsxs("div", {
          children: [/* @__PURE__ */jsxs("p", {
            style: {
              fontWeight: "bold"
            },
            children: [/* @__PURE__ */jsxs(Link, {
              to: `/account/orders/${btoa(order.id)}`,
              style: {
                color: "white",
                textDecoration: "none"
              },
              children: ["Order #", order.number]
            }), order.confirmationNumber && /* @__PURE__ */jsxs("span", {
              style: {
                color: "rgba(255,255,255,0.5)",
                fontWeight: "normal",
                marginLeft: "0.5rem"
              },
              children: ["(", order.confirmationNumber, ")"]
            })]
          }), /* @__PURE__ */jsx("p", {
            style: {
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.875rem"
            },
            children: new Date(order.processedAt).toLocaleDateString()
          })]
        }), /* @__PURE__ */jsxs("div", {
          style: {
            textAlign: "right"
          },
          children: [/* @__PURE__ */jsx("p", {
            children: /* @__PURE__ */jsx(Money, {
              data: order.totalPrice
            })
          }), /* @__PURE__ */jsx("p", {
            style: {
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.7)"
            },
            children: order.fulfillmentStatus
          })]
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          gap: "0.5rem",
          marginTop: "0.75rem",
          flexWrap: "wrap",
          alignItems: "center"
        },
        children: [/* @__PURE__ */jsx(Link, {
          to: `/account/orders/${btoa(order.id)}`,
          style: {
            fontSize: "0.8rem",
            color: "rgba(26,180,215,0.9)",
            textDecoration: "none"
          },
          children: "View Details"
        }), !isArchiveView && /* @__PURE__ */jsxs(fetcher.Form, {
          method: "post",
          style: {
            display: "inline"
          },
          children: [/* @__PURE__ */jsx("input", {
            type: "hidden",
            name: "intent",
            value: "archive"
          }), /* @__PURE__ */jsx("input", {
            type: "hidden",
            name: "orderId",
            value: order.id
          }), /* @__PURE__ */jsx("input", {
            type: "hidden",
            name: "customerId",
            value: customerId
          }), /* @__PURE__ */jsx("button", {
            type: "submit",
            style: {
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.8rem",
              cursor: "pointer",
              padding: 0
            },
            children: "Archive"
          })]
        })]
      })]
    }, order.id))]
  });
});

const route29 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: account_orders__index,
  loader: loader$1
}, Symbol.toStringTag, { value: 'Module' }));

const meta = ({
  data
}) => {
  return [{
    title: `Order ${data?.order?.name ?? ""} | Hoseworld`
  }];
};
const CUSTOMER_ID_QUERY = `#graphql
  query CustomerId {
    customer {
      id
      emailAddress {
        emailAddress
      }
    }
  }
`;
async function fetchArchivedIds(storefrontUiUrl, internalSecret, customerId) {
  try {
    const res = await fetch(`${storefrontUiUrl}/api/orders/archive?customerId=${encodeURIComponent(customerId)}`, {
      headers: {
        "X-Internal-Secret": internalSecret
      }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.archivedIds ?? [];
  } catch {
    return [];
  }
}
async function fetchReturnStatus(storefrontUiUrl, internalSecret, shopifyOrderId) {
  try {
    const res = await fetch(`${storefrontUiUrl}/api/returns/status?shopifyOrderId=${encodeURIComponent(shopifyOrderId)}`, {
      headers: {
        "X-Internal-Secret": internalSecret
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.returnRequest ?? null;
  } catch {
    return null;
  }
}
async function loader({
  params,
  context
}) {
  if (!params.id) {
    return redirect("/account/orders");
  }
  const orderId = atob(params.id);
  const env = context.env;
  const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
  const internalSecret = env.INTERNAL_API_SECRET ?? "";
  const [{
    data,
    errors
  }, {
    data: idData
  }] = await Promise.all([context.customerAccount.query(ORDER_QUERY, {
    variables: {
      orderId
    }
  }), context.customerAccount.query(CUSTOMER_ID_QUERY)]);
  if (errors?.length || !data?.order) {
    throw new Response("Order not found", {
      status: 404
    });
  }
  const customerId = idData?.customer?.id ?? "";
  const customerEmail = idData?.customer?.emailAddress?.emailAddress ?? "";
  const [archivedIds, returnRequest] = await Promise.all([storefrontUiUrl ? fetchArchivedIds(storefrontUiUrl, internalSecret, customerId) : Promise.resolve([]), storefrontUiUrl ? fetchReturnStatus(storefrontUiUrl, internalSecret, orderId) : Promise.resolve(null)]);
  const isArchived = archivedIds.includes(orderId);
  return {
    order: data.order,
    isArchived,
    orderId,
    customerId,
    customerEmail,
    returnRequest
  };
}
async function action({
  context,
  request
}) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const orderId = formData.get("orderId");
  const customerId = formData.get("customerId");
  if (intent === "return-request") {
    const orderNum = formData.get("orderNum");
    const customerEmail = formData.get("customerEmail");
    const reason = formData.get("reason");
    const lineItemsRaw = formData.get("lineItems");
    const env = context.env;
    const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
    const internalSecret = env.INTERNAL_API_SECRET ?? "";
    if (!storefrontUiUrl) {
      return {
        error: "Return service is not configured.",
        intent
      };
    }
    let lineItems;
    try {
      if (lineItemsRaw) lineItems = JSON.parse(lineItemsRaw);
    } catch {}
    try {
      const res = await fetch(`${storefrontUiUrl}/api/returns/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Secret": internalSecret
        },
        body: JSON.stringify({
          orderId,
          orderNum,
          customerEmail,
          customerId,
          reason,
          lineItems
        })
      });
      if (!res.ok) {
        const data = await res.json();
        return {
          error: data.error ?? "Failed to submit return request.",
          intent
        };
      }
      return {
        success: true,
        intent
      };
    } catch {
      return {
        error: "Could not reach return service. Please try again.",
        intent
      };
    }
  }
  if (intent === "request-invoice") {
    const env = context.env;
    const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
    const invoiceApiSecret = env.INVOICE_API_SECRET ?? "";
    if (!storefrontUiUrl || !invoiceApiSecret) {
      return {
        error: "Invoice service is not configured.",
        intent
      };
    }
    try {
      const res = await fetch(`${storefrontUiUrl}/api/xero/email-invoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Invoice-Api-Secret": invoiceApiSecret
        },
        body: JSON.stringify({
          shopifyOrderId: orderId
        })
      });
      const result = await res.json();
      if (!res.ok) {
        return {
          error: result.error ?? "Failed to email invoice.",
          intent
        };
      }
      return {
        success: true,
        intent,
        alreadySent: result.alreadySent ?? false
      };
    } catch {
      return {
        error: "Could not reach invoice service. Please try again.",
        intent
      };
    }
  }
  if (intent === "archive") {
    const env = context.env;
    const storefrontUiUrl = env.STOREFRONT_UI_API_URL ?? "";
    const internalSecret = env.INTERNAL_API_SECRET ?? "";
    if (!storefrontUiUrl) {
      return {
        error: "Archive service is not configured.",
        intent
      };
    }
    try {
      const res = await fetch(`${storefrontUiUrl}/api/orders/archive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Secret": internalSecret
        },
        body: JSON.stringify({
          customerId,
          orderId
        })
      });
      if (!res.ok) {
        const data = await res.json();
        return {
          error: data.error ?? "Failed to archive order.",
          intent
        };
      }
      return {
        success: true,
        intent
      };
    } catch {
      return {
        error: "Could not reach archive service. Please try again.",
        intent
      };
    }
  }
  return {
    error: "Unknown intent",
    intent
  };
}
const account_orders_$id = UNSAFE_withComponentProps(function OrderDetail() {
  const {
    order,
    isArchived,
    orderId,
    customerId,
    customerEmail,
    returnRequest
  } = useLoaderData();
  const fetcher = useFetcher();
  const [returnView, setReturnView] = useState("none");
  const [selectedItems, setSelectedItems] = useState(/* @__PURE__ */new Map());
  const [policyAcknowledged, setPolicyAcknowledged] = useState(false);
  const [returnReason, setReturnReason] = useState("");
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem",
    marginBottom: "1rem"
  };
  const result = fetcher.data;
  const currentlyArchived = result?.intent === "archive" && result?.success ? true : isArchived;
  result?.success && result.intent === "return-request";
  function handleItemToggle(lineItemId, originalQty) {
    setSelectedItems(prev => {
      const next = new Map(prev);
      if (next.has(lineItemId)) {
        next.delete(lineItemId);
      } else {
        next.set(lineItemId, 1);
      }
      return next;
    });
  }
  function handleQtyChange(lineItemId, qty) {
    setSelectedItems(prev => {
      const next = new Map(prev);
      if (next.has(lineItemId)) next.set(lineItemId, qty);
      return next;
    });
  }
  function handleReturnSubmit(e) {
    e.preventDefault();
    const lineItems = order.lineItems.nodes.filter(li => selectedItems.has(li.id)).map(li => ({
      title: li.title,
      variantTitle: li.variantTitle ?? "",
      quantity: selectedItems.get(li.id) ?? 1,
      unitPrice: li.price?.amount ?? "0",
      sku: li.sku ?? "",
      variantId: li.variant?.id ?? ""
    }));
    fetcher.submit({
      intent: "return-request",
      orderId,
      orderNum: order.name,
      customerId,
      customerEmail,
      reason: returnReason,
      lineItems: JSON.stringify(lineItems)
    }, {
      method: "post"
    });
    setReturnView("none");
  }
  if (returnView === "select-items") {
    return /* @__PURE__ */jsxs("div", {
      children: [/* @__PURE__ */jsx("button", {
        type: "button",
        onClick: () => {
          setReturnView("none");
          setSelectedItems(/* @__PURE__ */new Map());
          setPolicyAcknowledged(false);
          setReturnReason("");
        },
        style: {
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.7)",
          cursor: "pointer",
          fontSize: "0.875rem",
          padding: 0,
          marginBottom: "1rem",
          display: "inline-block"
        },
        children: "← Back to Order Details"
      }), /* @__PURE__ */jsxs("h2", {
        style: {
          fontSize: "1.1rem",
          marginBottom: "1rem"
        },
        children: ["Request Return — ", order.name]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          ...cardStyle,
          borderLeft: "3px solid rgba(255,180,100,0.5)"
        },
        children: [/* @__PURE__ */jsxs("p", {
          style: {
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.8)",
            marginBottom: "0.75rem"
          },
          children: ["Before proceeding, please read our", " ", /* @__PURE__ */jsx("a", {
            href: "/policies/refund-policy",
            target: "_blank",
            rel: "noreferrer",
            style: {
              color: "rgba(26,180,215,0.9)",
              textDecoration: "underline"
            },
            children: "Return Policy"
          }), ". It describes what items are eligible, the customer's obligations, and any applicable shipping costs."]
        }), /* @__PURE__ */jsxs("label", {
          style: {
            display: "flex",
            alignItems: "flex-start",
            gap: "0.5rem",
            cursor: "pointer",
            fontSize: "0.875rem"
          },
          children: [/* @__PURE__ */jsx("input", {
            type: "checkbox",
            checked: policyAcknowledged,
            onChange: e => setPolicyAcknowledged(e.target.checked),
            style: {
              marginTop: "2px",
              flexShrink: 0
            }
          }), "I have read and accept the Return Policy, including cost implications and obligations for both parties."]
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: cardStyle,
        children: [/* @__PURE__ */jsx("h3", {
          style: {
            fontSize: "1rem",
            marginBottom: "0.75rem"
          },
          children: "Select items to return"
        }), order.lineItems.nodes.map(lineItem => {
          const isSelected = selectedItems.has(lineItem.id);
          const selQty = selectedItems.get(lineItem.id) ?? 1;
          return /* @__PURE__ */jsxs("div", {
            style: {
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              padding: "0.75rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              opacity: isSelected ? 1 : 0.6
            },
            children: [/* @__PURE__ */jsx("input", {
              type: "checkbox",
              checked: isSelected,
              onChange: () => handleItemToggle(lineItem.id, lineItem.quantity),
              style: {
                marginTop: "4px",
                flexShrink: 0
              }
            }), lineItem.image && /* @__PURE__ */jsx(Image, {
              data: lineItem.image,
              width: 56,
              height: 56,
              style: {
                borderRadius: "4px",
                objectFit: "cover",
                flexShrink: 0
              }
            }), /* @__PURE__ */jsxs("div", {
              style: {
                flex: 1,
                minWidth: 0
              },
              children: [/* @__PURE__ */jsx("p", {
                style: {
                  margin: 0,
                  fontWeight: "bold",
                  fontSize: "0.875rem"
                },
                children: lineItem.title
              }), lineItem.variantTitle && /* @__PURE__ */jsx("p", {
                style: {
                  margin: "0.2rem 0 0",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.6)"
                },
                children: lineItem.variantTitle
              }), /* @__PURE__ */jsxs("p", {
                style: {
                  margin: "0.25rem 0 0",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.5)"
                },
                children: ["Ordered: ", lineItem.quantity]
              }), isSelected && /* @__PURE__ */jsxs("div", {
                style: {
                  marginTop: "0.4rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                },
                children: [/* @__PURE__ */jsx("label", {
                  style: {
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.6)"
                  },
                  children: "Return qty:"
                }), /* @__PURE__ */jsx("select", {
                  value: selQty,
                  onChange: e => handleQtyChange(lineItem.id, Number(e.target.value)),
                  style: {
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "4px",
                    color: "white",
                    padding: "2px 6px",
                    fontSize: "0.8rem"
                  },
                  children: Array.from({
                    length: lineItem.quantity
                  }, (_, i) => i + 1).map(n => /* @__PURE__ */jsx("option", {
                    value: n,
                    children: n
                  }, n))
                })]
              })]
            }), /* @__PURE__ */jsx("div", {
              style: {
                textAlign: "right",
                flexShrink: 0
              },
              children: /* @__PURE__ */jsx(Money, {
                data: lineItem.price
              })
            })]
          }, lineItem.id);
        })]
      }), /* @__PURE__ */jsxs("form", {
        onSubmit: handleReturnSubmit,
        style: cardStyle,
        children: [/* @__PURE__ */jsxs("div", {
          style: {
            marginBottom: "0.75rem"
          },
          children: [/* @__PURE__ */jsx("label", {
            style: {
              display: "block",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "0.4rem"
            },
            children: "Reason for return"
          }), /* @__PURE__ */jsx("textarea", {
            value: returnReason,
            onChange: e => setReturnReason(e.target.value),
            required: true,
            rows: 3,
            placeholder: "e.g. Item arrived damaged, wrong size received…",
            style: {
              width: "100%",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "4px",
              color: "white",
              padding: "0.5rem",
              fontSize: "0.875rem",
              resize: "vertical",
              boxSizing: "border-box"
            }
          })]
        }), result?.error && result.intent === "return-request" && /* @__PURE__ */jsx("p", {
          style: {
            color: "#fc8181",
            marginBottom: "0.75rem",
            fontSize: "0.875rem"
          },
          children: result.error
        }), /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            gap: "0.5rem"
          },
          children: [/* @__PURE__ */jsx("button", {
            type: "submit",
            disabled: fetcher.state !== "idle" || !policyAcknowledged || selectedItems.size === 0 || !returnReason.trim(),
            style: {
              background: "rgba(255,180,100,0.15)",
              color: "rgba(255,180,100,0.9)",
              border: "1px solid rgba(255,180,100,0.3)",
              padding: "0.45rem 1.1rem",
              borderRadius: "5px",
              fontSize: "0.875rem",
              cursor: "pointer",
              opacity: !policyAcknowledged || selectedItems.size === 0 || !returnReason.trim() ? 0.5 : 1
            },
            children: fetcher.state !== "idle" ? "Submitting…" : "Submit Return Request"
          }), /* @__PURE__ */jsx("button", {
            type: "button",
            onClick: () => {
              setReturnView("none");
              setSelectedItems(/* @__PURE__ */new Map());
              setPolicyAcknowledged(false);
              setReturnReason("");
            },
            style: {
              background: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.4)",
              padding: "0.45rem 1rem",
              borderRadius: "5px",
              fontSize: "0.875rem",
              cursor: "pointer"
            },
            children: "Cancel"
          })]
        }), (!policyAcknowledged || selectedItems.size === 0) && /* @__PURE__ */jsxs("p", {
          style: {
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.4)",
            marginTop: "0.5rem"
          },
          children: [!policyAcknowledged && "Please acknowledge the Return Policy. ", selectedItems.size === 0 && "Please select at least one item to return."]
        })]
      })]
    });
  }
  return /* @__PURE__ */jsxs("div", {
    children: [/* @__PURE__ */jsx(Link, {
      to: "/account/orders",
      style: {
        color: "rgba(255, 255, 255, 0.7)",
        textDecoration: "none",
        display: "inline-block",
        marginBottom: "1rem"
      },
      children: "← Back to Orders"
    }), result?.error && /* @__PURE__ */jsx("p", {
      style: {
        color: "#fc8181",
        marginBottom: "1rem",
        fontSize: "0.875rem"
      },
      children: result.error
    }), result?.success && result.intent === "return-request" && /* @__PURE__ */jsx("p", {
      style: {
        color: "#68d391",
        marginBottom: "1rem",
        fontSize: "0.875rem"
      },
      children: "Return request submitted. Our team will review it and be in touch."
    }), result?.success && result.intent === "request-invoice" && /* @__PURE__ */jsx("p", {
      style: {
        color: "#68d391",
        marginBottom: "1rem",
        fontSize: "0.875rem"
      },
      children: result.alreadySent ? "Invoice was already sent to your email." : "Invoice emailed to your account email address."
    }), result?.success && result.intent === "archive" && /* @__PURE__ */jsx("p", {
      style: {
        color: "#68d391",
        marginBottom: "1rem",
        fontSize: "0.875rem"
      },
      children: "Order archived."
    }), /* @__PURE__ */jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "1rem"
        },
        children: [/* @__PURE__ */jsxs("div", {
          children: [/* @__PURE__ */jsx("h2", {
            style: {
              fontSize: "1.25rem",
              margin: 0
            },
            children: order.name
          }), order.confirmationNumber && /* @__PURE__ */jsxs("p", {
            style: {
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.875rem",
              margin: "0.25rem 0 0"
            },
            children: ["Confirmation: ", order.confirmationNumber]
          })]
        }), /* @__PURE__ */jsxs("div", {
          style: {
            textAlign: "right"
          },
          children: [/* @__PURE__ */jsx("p", {
            style: {
              margin: 0,
              fontSize: "0.875rem"
            },
            children: new Date(order.processedAt).toLocaleDateString()
          }), /* @__PURE__ */jsx("p", {
            style: {
              margin: "0.25rem 0 0",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.7)"
            },
            children: order.fulfillmentStatus
          })]
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "0.75rem"
        },
        children: [/* @__PURE__ */jsxs(fetcher.Form, {
          method: "post",
          style: {
            display: "inline"
          },
          children: [/* @__PURE__ */jsx("input", {
            type: "hidden",
            name: "intent",
            value: "request-invoice"
          }), /* @__PURE__ */jsx("input", {
            type: "hidden",
            name: "orderId",
            value: orderId
          }), /* @__PURE__ */jsx("button", {
            type: "submit",
            disabled: fetcher.state !== "idle",
            style: {
              background: "rgba(26,180,215,0.15)",
              color: "rgba(26,180,215,0.9)",
              border: "1px solid rgba(26,180,215,0.3)",
              padding: "0.4rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.8rem"
            },
            children: fetcher.state !== "idle" && result?.intent === "request-invoice" ? "Sending…" : "Email Invoice"
          })]
        }), !currentlyArchived && /* @__PURE__ */jsxs(fetcher.Form, {
          method: "post",
          style: {
            display: "inline"
          },
          children: [/* @__PURE__ */jsx("input", {
            type: "hidden",
            name: "intent",
            value: "archive"
          }), /* @__PURE__ */jsx("input", {
            type: "hidden",
            name: "orderId",
            value: orderId
          }), /* @__PURE__ */jsx("input", {
            type: "hidden",
            name: "customerId",
            value: customerId
          }), /* @__PURE__ */jsx("button", {
            type: "submit",
            disabled: fetcher.state !== "idle",
            style: {
              background: "none",
              color: "rgba(255,255,255,0.4)",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "0.4rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.8rem"
            },
            children: "Archive Order"
          })]
        }), currentlyArchived && /* @__PURE__ */jsx("span", {
          style: {
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.35)",
            padding: "0.4rem 0"
          },
          children: "Archived"
        }), !currentlyArchived && (!returnRequest || returnRequest.status === "REJECTED") && /* @__PURE__ */jsx("button", {
          type: "button",
          onClick: () => {
            setReturnView("select-items");
            setSelectedItems(/* @__PURE__ */new Map());
            setPolicyAcknowledged(false);
            setReturnReason("");
          },
          style: {
            background: "rgba(255,180,100,0.1)",
            color: "rgba(255,180,100,0.8)",
            border: "1px solid rgba(255,180,100,0.25)",
            padding: "0.4rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "0.8rem"
          },
          children: "Request Return"
        })]
      })]
    }), returnRequest && returnRequest.status !== "REJECTED" && /* @__PURE__ */jsx(ReturnStatusCard, {
      returnRequest
    }), returnRequest?.status === "REJECTED" && /* @__PURE__ */jsx("div", {
      style: {
        ...cardStyle,
        borderLeft: "3px solid rgba(255,100,100,0.4)",
        marginBottom: "1rem"
      },
      children: /* @__PURE__ */jsx("p", {
        style: {
          margin: 0,
          fontSize: "0.875rem",
          color: "rgba(255,150,150,0.9)"
        },
        children: "A previous return request for this order was not approved. You may submit a new request if needed."
      })
    }), /* @__PURE__ */jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */jsx("h3", {
        style: {
          fontSize: "1.1rem",
          marginBottom: "1rem"
        },
        children: "Items"
      }), order.lineItems.nodes.map(lineItem => /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          gap: "1rem",
          paddingBottom: "1rem",
          marginBottom: "1rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        },
        children: [lineItem.image && /* @__PURE__ */jsx(Image, {
          data: lineItem.image,
          width: 80,
          height: 80,
          style: {
            borderRadius: "4px",
            objectFit: "cover"
          }
        }), /* @__PURE__ */jsxs("div", {
          style: {
            flex: 1
          },
          children: [/* @__PURE__ */jsx("p", {
            style: {
              margin: 0,
              fontWeight: "bold"
            },
            children: lineItem.title
          }), lineItem.variantTitle && /* @__PURE__ */jsx("p", {
            style: {
              margin: "0.25rem 0 0",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.7)"
            },
            children: lineItem.variantTitle
          }), /* @__PURE__ */jsxs("p", {
            style: {
              margin: "0.25rem 0 0",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.7)"
            },
            children: ["Qty: ", lineItem.quantity]
          })]
        }), /* @__PURE__ */jsxs("div", {
          style: {
            textAlign: "right"
          },
          children: [/* @__PURE__ */jsx(Money, {
            data: lineItem.price
          }), lineItem.discountAllocations.length > 0 && /* @__PURE__ */jsxs("p", {
            style: {
              margin: "0.25rem 0 0",
              fontSize: "0.875rem",
              color: "#e53e3e"
            },
            children: ["-", /* @__PURE__ */jsx(Money, {
              data: lineItem.totalDiscount
            })]
          })]
        })]
      }, lineItem.id))]
    }), order.shippingAddress && /* @__PURE__ */jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */jsx("h3", {
        style: {
          fontSize: "1.1rem",
          marginBottom: "0.75rem"
        },
        children: "Shipping Address"
      }), /* @__PURE__ */jsx("p", {
        style: {
          margin: 0,
          lineHeight: "1.6"
        },
        children: order.shippingAddress.formatted?.join(", ")
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: cardStyle,
      children: [/* @__PURE__ */jsx("h3", {
        style: {
          fontSize: "1.1rem",
          marginBottom: "0.75rem"
        },
        children: "Order Summary"
      }), /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem"
        },
        children: [/* @__PURE__ */jsx("span", {
          style: {
            color: "rgba(255,255,255,0.7)"
          },
          children: "Subtotal"
        }), /* @__PURE__ */jsx(Money, {
          data: order.subtotal
        })]
      }), order.shippingLine && parseFloat(order.shippingLine.originalPrice?.amount ?? "0") > 0 && /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem"
        },
        children: [/* @__PURE__ */jsx("span", {
          style: {
            color: "rgba(255,255,255,0.7)"
          },
          children: "Shipping"
        }), /* @__PURE__ */jsx(Money, {
          data: order.shippingLine.originalPrice
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem"
        },
        children: [/* @__PURE__ */jsx("span", {
          style: {
            color: "rgba(255,255,255,0.7)"
          },
          children: "Tax"
        }), (() => {
          const shippingAmt = parseFloat(order.shippingLine?.originalPrice?.amount ?? "0");
          const shippingVat = parseFloat((shippingAmt * 0.15).toFixed(2));
          const adjustedTax = {
            amount: (parseFloat(order.totalTax.amount) + shippingVat).toFixed(2),
            currencyCode: order.totalTax.currencyCode
          };
          return /* @__PURE__ */jsx(Money, {
            data: adjustedTax
          });
        })()]
      }), order.discountApplications.nodes.length > 0 && /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
          color: "#e53e3e"
        },
        children: [/* @__PURE__ */jsx("span", {
          children: "Discounts"
        }), /* @__PURE__ */jsx("span", {
          children: order.discountApplications.nodes.map((discount, i) => /* @__PURE__ */jsx("span", {
            children: discount.value.__typename === "MoneyV2" ? /* @__PURE__ */jsx(Money, {
              data: discount.value
            }) : `${discount.value.percentage}%`
          }, i))
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "0.75rem",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          fontWeight: "bold",
          fontSize: "1.1rem"
        },
        children: [/* @__PURE__ */jsx("span", {
          children: "Total"
        }), (() => {
          const shippingAmt = parseFloat(order.shippingLine?.originalPrice?.amount ?? "0");
          const shippingVat = parseFloat((shippingAmt * 0.15).toFixed(2));
          const adjustedTotal = {
            amount: (parseFloat(order.totalPrice.amount) + shippingVat).toFixed(2),
            currencyCode: order.totalPrice.currencyCode
          };
          return /* @__PURE__ */jsx(Money, {
            data: adjustedTotal
          });
        })()]
      })]
    })]
  });
});
function ReturnStatusCard({
  returnRequest
}) {
  const statusColors = {
    PENDING: "rgba(255,180,60,0.9)",
    APPROVED: "rgba(104,211,145,0.9)"
  };
  const borderColors = {
    PENDING: "rgba(255,180,60,0.4)",
    APPROVED: "rgba(104,211,145,0.4)"
  };
  const color = statusColors[returnRequest.status] ?? "rgba(255,255,255,0.7)";
  const border = borderColors[returnRequest.status] ?? "rgba(255,255,255,0.2)";
  let lineItems = [];
  try {
    if (returnRequest.lineItemsJson) lineItems = JSON.parse(returnRequest.lineItemsJson);
  } catch {}
  const cardStyle = {
    background: "rgba(50, 50, 50, 0.85)",
    borderRadius: "6px",
    padding: "1.25rem",
    marginBottom: "1rem",
    borderLeft: `3px solid ${border}`
  };
  return /* @__PURE__ */jsxs("div", {
    style: cardStyle,
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "0.75rem"
      },
      children: [/* @__PURE__ */jsx("h3", {
        style: {
          margin: 0,
          fontSize: "1rem"
        },
        children: "Return Request"
      }), /* @__PURE__ */jsx("span", {
        style: {
          fontSize: "0.75rem",
          fontWeight: 600,
          color,
          border: `1px solid ${border}`,
          borderRadius: "4px",
          padding: "2px 8px"
        },
        children: returnRequest.status
      })]
    }), /* @__PURE__ */jsxs("p", {
      style: {
        margin: "0 0 0.5rem",
        fontSize: "0.8rem",
        color: "rgba(255,255,255,0.5)"
      },
      children: ["Submitted: ", new Date(returnRequest.createdAt).toLocaleDateString()]
    }), returnRequest.reason && /* @__PURE__ */jsxs("p", {
      style: {
        margin: "0 0 0.75rem",
        fontSize: "0.875rem",
        color: "rgba(255,255,255,0.75)"
      },
      children: [/* @__PURE__ */jsx("span", {
        style: {
          color: "rgba(255,255,255,0.5)"
        },
        children: "Reason: "
      }), returnRequest.reason]
    }), lineItems.length > 0 && /* @__PURE__ */jsxs("div", {
      style: {
        marginBottom: "0.75rem"
      },
      children: [/* @__PURE__ */jsx("p", {
        style: {
          margin: "0 0 0.4rem",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.5)"
        },
        children: "Items requested for return:"
      }), lineItems.map((item, i) => /* @__PURE__ */jsxs("p", {
        style: {
          margin: "0.2rem 0",
          fontSize: "0.875rem",
          paddingLeft: "0.75rem"
        },
        children: ["— ", item.title, item.variantTitle ? ` (${item.variantTitle})` : "", " × ", item.quantity ?? 1]
      }, i))]
    }), returnRequest.status === "APPROVED" && returnRequest.xeroCreditNoteNum && /* @__PURE__ */jsxs("p", {
      style: {
        margin: 0,
        fontSize: "0.875rem",
        color: "rgba(104,211,145,0.9)"
      },
      children: ["Credit Note: ", returnRequest.xeroCreditNoteNum]
    }), returnRequest.status === "PENDING" && /* @__PURE__ */jsx("p", {
      style: {
        margin: 0,
        fontSize: "0.8rem",
        color: "rgba(255,255,255,0.4)"
      },
      children: "Your return request is under review. We will be in touch once it has been processed."
    })]
  });
}

const route30 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  action,
  default: account_orders_$id,
  loader,
  meta
}, Symbol.toStringTag, { value: 'Module' }));

const serverManifest = {'entry':{'module':'/assets/entry.client-H_D-kqiY.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js','/assets/index-CgNkdbnA.js'],'css':[]},'routes':{'root':{'id':'root','parentId':undefined,'path':'','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':true,'module':'/assets/root-D5JQfoGv.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js','/assets/index-CgNkdbnA.js','/assets/Aside-DQh46iyx.js','/assets/CartMain-ti85rl_j.js','/assets/SearchFormPredictive-EqQuWGrx.js','/assets/Image-DDf6K-tA.js','/assets/Money-B57dmFnt.js','/assets/ProductPrice-BGyT_iki.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale).collections.$handle':{'id':'routes/($locale).collections.$handle','parentId':'root','path':':locale?/collections/:handle','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/(_locale).collections._handle-DgvfC-Do.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js','/assets/index-CgNkdbnA.js','/assets/supplierImages-B2MdD-FG.js','/assets/Image-DDf6K-tA.js','/assets/Money-B57dmFnt.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale).collections._index':{'id':'routes/($locale).collections._index','parentId':'root','path':':locale?/collections','index':true,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/(_locale).collections._index-DJEDHzJI.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js','/assets/index-CgNkdbnA.js','/assets/CollectionCard-jsUwRsV0.js','/assets/Image-DDf6K-tA.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale).debug-availability':{'id':'routes/($locale).debug-availability','parentId':'root','path':':locale?/debug-availability','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/(_locale).debug-availability-DHupQaIc.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale).checkout_.success':{'id':'routes/($locale).checkout_.success','parentId':'root','path':':locale?/checkout/success','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/(_locale).checkout_.success-CTZZJZKG.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale).integration-test':{'id':'routes/($locale).integration-test','parentId':'root','path':':locale?/integration-test','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/(_locale).integration-test-CFhmZ654.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale).policies.$handle':{'id':'routes/($locale).policies.$handle','parentId':'root','path':':locale?/policies/:handle','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/(_locale).policies._handle-COK6_vI3.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale).products.$handle':{'id':'routes/($locale).products.$handle','parentId':'root','path':':locale?/products/:handle','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/(_locale).products._handle-B2XwVG1T.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js','/assets/index-CgNkdbnA.js','/assets/ProductPrice-BGyT_iki.js','/assets/Aside-DQh46iyx.js','/assets/supplierImages-B2MdD-FG.js','/assets/Image-DDf6K-tA.js','/assets/Money-B57dmFnt.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale).policies._index':{'id':'routes/($locale).policies._index','parentId':'root','path':':locale?/policies','index':true,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/(_locale).policies._index-DlggdO0F.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/sitemap.$type.$page[.xml]':{'id':'routes/sitemap.$type.$page[.xml]','parentId':'root','path':'sitemap/:type/:page.xml','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':false,'hasErrorBoundary':false,'module':'/assets/sitemap._type._page_.xml_-l0sNRNKZ.js','imports':[],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale).pages.$handle':{'id':'routes/($locale).pages.$handle','parentId':'root','path':':locale?/pages/:handle','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/(_locale).pages._handle-Cxjox_hu.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale).checkout':{'id':'routes/($locale).checkout','parentId':'root','path':':locale?/checkout','index':undefined,'caseSensitive':undefined,'hasAction':true,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/(_locale).checkout-Bp9Y4Yon.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js','/assets/index-CgNkdbnA.js','/assets/Money-B57dmFnt.js','/assets/Image-DDf6K-tA.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale).checkout.payment':{'id':'routes/($locale).checkout.payment','parentId':'routes/($locale).checkout','path':'payment','index':undefined,'caseSensitive':undefined,'hasAction':true,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':false,'hasErrorBoundary':false,'module':'/assets/(_locale).checkout.payment-l0sNRNKZ.js','imports':[],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale).checkout.cancel':{'id':'routes/($locale).checkout.cancel','parentId':'routes/($locale).checkout','path':'cancel','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/(_locale).checkout.cancel-Wo5fqxNm.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/account_.authorize':{'id':'routes/account_.authorize','parentId':'root','path':'account/authorize','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':false,'hasErrorBoundary':false,'module':'/assets/account_.authorize-l0sNRNKZ.js','imports':[],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale).contact':{'id':'routes/($locale).contact','parentId':'root','path':':locale?/contact','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/(_locale).contact-Cii-OHRZ.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/media.suppliers.$':{'id':'routes/media.suppliers.$','parentId':'root','path':'media/suppliers/*','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':false,'hasErrorBoundary':false,'module':'/assets/media.suppliers._-l0sNRNKZ.js','imports':[],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale)._index':{'id':'routes/($locale)._index','parentId':'root','path':':locale?','index':true,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/(_locale)._index-Cb6Q4ok7.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js','/assets/CollectionCard-jsUwRsV0.js','/assets/Image-DDf6K-tA.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale).search':{'id':'routes/($locale).search','parentId':'root','path':':locale?/search','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/(_locale).search-D9115CVF.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js','/assets/SearchFormPredictive-EqQuWGrx.js','/assets/Image-DDf6K-tA.js','/assets/Money-B57dmFnt.js','/assets/Aside-DQh46iyx.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/($locale).cart':{'id':'routes/($locale).cart','parentId':'root','path':':locale?/cart','index':undefined,'caseSensitive':undefined,'hasAction':true,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/(_locale).cart-CuU6p2Aq.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js','/assets/CartMain-ti85rl_j.js','/assets/index-CgNkdbnA.js','/assets/Aside-DQh46iyx.js','/assets/ProductPrice-BGyT_iki.js','/assets/Money-B57dmFnt.js','/assets/Image-DDf6K-tA.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/account_.login':{'id':'routes/account_.login','parentId':'root','path':'account/login','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':false,'hasErrorBoundary':false,'module':'/assets/account_.login-l0sNRNKZ.js','imports':[],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/[sitemap.xml]':{'id':'routes/[sitemap.xml]','parentId':'root','path':'sitemap.xml','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':false,'hasErrorBoundary':false,'module':'/assets/_sitemap.xml_-l0sNRNKZ.js','imports':[],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/[robots.txt]':{'id':'routes/[robots.txt]','parentId':'root','path':'robots.txt','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':false,'hasErrorBoundary':false,'module':'/assets/_robots.txt_-l0sNRNKZ.js','imports':[],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/account':{'id':'routes/account','parentId':'root','path':'account','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/account-DX9Kc8Hz.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/account.management':{'id':'routes/account.management','parentId':'routes/account','path':'management','index':undefined,'caseSensitive':undefined,'hasAction':true,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/account.management-Cn1VWGQE.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/account.addresses':{'id':'routes/account.addresses','parentId':'routes/account','path':'addresses','index':undefined,'caseSensitive':undefined,'hasAction':true,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/account.addresses-DMS5O9Vn.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/account.profile':{'id':'routes/account.profile','parentId':'routes/account','path':'profile','index':undefined,'caseSensitive':undefined,'hasAction':true,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/account.profile-CMDhGOai.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/account._index':{'id':'routes/account._index','parentId':'routes/account','path':undefined,'index':true,'caseSensitive':undefined,'hasAction':true,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/account._index-BDH5vbUN.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/account.orders':{'id':'routes/account.orders','parentId':'routes/account','path':'orders','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/account.orders-BI2FzCKb.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/account.orders._index':{'id':'routes/account.orders._index','parentId':'routes/account.orders','path':undefined,'index':true,'caseSensitive':undefined,'hasAction':true,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/account.orders._index-C7KvUGp0.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js','/assets/Money-B57dmFnt.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/account.orders.$id':{'id':'routes/account.orders.$id','parentId':'routes/account.orders','path':':id','index':undefined,'caseSensitive':undefined,'hasAction':true,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/account.orders._id-BkjMnmx6.js','imports':['/assets/chunk-6CSD65Y2-Yw5OWURN.js','/assets/Image-DDf6K-tA.js','/assets/Money-B57dmFnt.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined}},'url':'/assets/manifest-b799c103.js','version':'b799c103','sri':undefined};

const assetsBuildDirectory = "dist/client";
      const basename = "/";
      const future = {"unstable_optimizeDeps":true,"v8_passThroughRequests":true,"v8_trailingSlashAwareDataRequests":true,"unstable_previewServerPrerendering":false,"v8_middleware":true,"v8_splitRouteModules":true,"v8_viteEnvironmentApi":false};
      const ssr = true;
      const isSpaMode = false;
      const prerender = [];
      const routeDiscovery = {"mode":"lazy","manifestPath":"/__manifest"};
      const publicPath = "/";
      const entry = { module: entryServer };
      const routes = {
        "root": {
          id: "root",
          parentId: undefined,
          path: "",
          index: undefined,
          caseSensitive: undefined,
          module: route0
        },
  "routes/($locale).collections.$handle": {
          id: "routes/($locale).collections.$handle",
          parentId: "root",
          path: ":locale?/collections/:handle",
          index: undefined,
          caseSensitive: undefined,
          module: route1
        },
  "routes/($locale).collections._index": {
          id: "routes/($locale).collections._index",
          parentId: "root",
          path: ":locale?/collections",
          index: true,
          caseSensitive: undefined,
          module: route2
        },
  "routes/($locale).debug-availability": {
          id: "routes/($locale).debug-availability",
          parentId: "root",
          path: ":locale?/debug-availability",
          index: undefined,
          caseSensitive: undefined,
          module: route3
        },
  "routes/($locale).checkout_.success": {
          id: "routes/($locale).checkout_.success",
          parentId: "root",
          path: ":locale?/checkout/success",
          index: undefined,
          caseSensitive: undefined,
          module: route4
        },
  "routes/($locale).integration-test": {
          id: "routes/($locale).integration-test",
          parentId: "root",
          path: ":locale?/integration-test",
          index: undefined,
          caseSensitive: undefined,
          module: route5
        },
  "routes/($locale).policies.$handle": {
          id: "routes/($locale).policies.$handle",
          parentId: "root",
          path: ":locale?/policies/:handle",
          index: undefined,
          caseSensitive: undefined,
          module: route6
        },
  "routes/($locale).products.$handle": {
          id: "routes/($locale).products.$handle",
          parentId: "root",
          path: ":locale?/products/:handle",
          index: undefined,
          caseSensitive: undefined,
          module: route7
        },
  "routes/($locale).policies._index": {
          id: "routes/($locale).policies._index",
          parentId: "root",
          path: ":locale?/policies",
          index: true,
          caseSensitive: undefined,
          module: route8
        },
  "routes/sitemap.$type.$page[.xml]": {
          id: "routes/sitemap.$type.$page[.xml]",
          parentId: "root",
          path: "sitemap/:type/:page.xml",
          index: undefined,
          caseSensitive: undefined,
          module: route9
        },
  "routes/($locale).pages.$handle": {
          id: "routes/($locale).pages.$handle",
          parentId: "root",
          path: ":locale?/pages/:handle",
          index: undefined,
          caseSensitive: undefined,
          module: route10
        },
  "routes/($locale).checkout": {
          id: "routes/($locale).checkout",
          parentId: "root",
          path: ":locale?/checkout",
          index: undefined,
          caseSensitive: undefined,
          module: route11
        },
  "routes/($locale).checkout.payment": {
          id: "routes/($locale).checkout.payment",
          parentId: "routes/($locale).checkout",
          path: "payment",
          index: undefined,
          caseSensitive: undefined,
          module: route12
        },
  "routes/($locale).checkout.cancel": {
          id: "routes/($locale).checkout.cancel",
          parentId: "routes/($locale).checkout",
          path: "cancel",
          index: undefined,
          caseSensitive: undefined,
          module: route13
        },
  "routes/account_.authorize": {
          id: "routes/account_.authorize",
          parentId: "root",
          path: "account/authorize",
          index: undefined,
          caseSensitive: undefined,
          module: route14
        },
  "routes/($locale).contact": {
          id: "routes/($locale).contact",
          parentId: "root",
          path: ":locale?/contact",
          index: undefined,
          caseSensitive: undefined,
          module: route15
        },
  "routes/media.suppliers.$": {
          id: "routes/media.suppliers.$",
          parentId: "root",
          path: "media/suppliers/*",
          index: undefined,
          caseSensitive: undefined,
          module: route16
        },
  "routes/($locale)._index": {
          id: "routes/($locale)._index",
          parentId: "root",
          path: ":locale?",
          index: true,
          caseSensitive: undefined,
          module: route17
        },
  "routes/($locale).search": {
          id: "routes/($locale).search",
          parentId: "root",
          path: ":locale?/search",
          index: undefined,
          caseSensitive: undefined,
          module: route18
        },
  "routes/($locale).cart": {
          id: "routes/($locale).cart",
          parentId: "root",
          path: ":locale?/cart",
          index: undefined,
          caseSensitive: undefined,
          module: route19
        },
  "routes/account_.login": {
          id: "routes/account_.login",
          parentId: "root",
          path: "account/login",
          index: undefined,
          caseSensitive: undefined,
          module: route20
        },
  "routes/[sitemap.xml]": {
          id: "routes/[sitemap.xml]",
          parentId: "root",
          path: "sitemap.xml",
          index: undefined,
          caseSensitive: undefined,
          module: route21
        },
  "routes/[robots.txt]": {
          id: "routes/[robots.txt]",
          parentId: "root",
          path: "robots.txt",
          index: undefined,
          caseSensitive: undefined,
          module: route22
        },
  "routes/account": {
          id: "routes/account",
          parentId: "root",
          path: "account",
          index: undefined,
          caseSensitive: undefined,
          module: route23
        },
  "routes/account.management": {
          id: "routes/account.management",
          parentId: "routes/account",
          path: "management",
          index: undefined,
          caseSensitive: undefined,
          module: route24
        },
  "routes/account.addresses": {
          id: "routes/account.addresses",
          parentId: "routes/account",
          path: "addresses",
          index: undefined,
          caseSensitive: undefined,
          module: route25
        },
  "routes/account.profile": {
          id: "routes/account.profile",
          parentId: "routes/account",
          path: "profile",
          index: undefined,
          caseSensitive: undefined,
          module: route26
        },
  "routes/account._index": {
          id: "routes/account._index",
          parentId: "routes/account",
          path: undefined,
          index: true,
          caseSensitive: undefined,
          module: route27
        },
  "routes/account.orders": {
          id: "routes/account.orders",
          parentId: "routes/account",
          path: "orders",
          index: undefined,
          caseSensitive: undefined,
          module: route28
        },
  "routes/account.orders._index": {
          id: "routes/account.orders._index",
          parentId: "routes/account.orders",
          path: undefined,
          index: true,
          caseSensitive: undefined,
          module: route29
        },
  "routes/account.orders.$id": {
          id: "routes/account.orders.$id",
          parentId: "routes/account.orders",
          path: ":id",
          index: undefined,
          caseSensitive: undefined,
          module: route30
        }
      };
      
      const allowedActionOrigins = false;

export { allowedActionOrigins, serverManifest as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
