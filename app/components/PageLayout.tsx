import {Await, Link, useLocation} from 'react-router';
import {Suspense, useEffect, useId} from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';
import {CartMain} from '~/components/CartMain';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  footerBanner?: Promise<string | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  customerFirstName?: Promise<string | null>;
  publicStoreDomain: string;
  children?: React.ReactNode;
}

export function PageLayout({
  cart,
  children = null,
  footer,
  footerBanner,
  header,
  isLoggedIn,
  customerFirstName,
  publicStoreDomain,
}: PageLayoutProps) {
  const location = useLocation();
  const isHomePage =
    location.pathname === '/' ||
    /^\/(en-nz|en-au|en-us|en-za)\/?$/.test(location.pathname);
  const isProductPage =
    /^(\/(en-nz|en-au|en-us|en-za))?\/products\//.test(location.pathname);
  const isAccountPage =
    /^(\/(en-nz|en-au|en-us|en-za))?\/account/.test(location.pathname);
  const isContactPage =
    /^(\/(en-nz|en-au|en-us|en-za|pages))?\/contact/.test(location.pathname);
  const isCartPage =
    /^(\/(en-nz|en-au|en-us|en-za))?\/cart/.test(location.pathname);
  const isCheckoutPage =
    /^(\/(en-nz|en-au|en-us|en-za))?\/checkout/.test(location.pathname);

  useEffect(() => {
    if (isHomePage) {
      document.body.classList.add('home-page');
    } else {
      document.body.classList.remove('home-page');
    }
    if (isProductPage) {
      document.body.classList.add('product-page');
    } else {
      document.body.classList.remove('product-page');
    }
    if (isAccountPage) {
      document.body.classList.add('account-page');
    } else {
      document.body.classList.remove('account-page');
    }
    if (isContactPage) {
      document.body.classList.add('contact-page');
    } else {
      document.body.classList.remove('contact-page');
    }
    if (isCartPage) {
      document.body.classList.add('cart-page');
    } else {
      document.body.classList.remove('cart-page');
    }
    if (isCheckoutPage) {
      document.body.classList.add('checkout-page');
    } else {
      document.body.classList.remove('checkout-page');
    }
    return () => {
      document.body.classList.remove('home-page');
      document.body.classList.remove('product-page');
      document.body.classList.remove('account-page');
      document.body.classList.remove('contact-page');
      document.body.classList.remove('cart-page');
      document.body.classList.remove('checkout-page');
    };
  }, [isHomePage, isProductPage, isAccountPage, isContactPage, isCartPage, isCheckoutPage]);

  return (
    <Aside.Provider>
      <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
      {header && (
        <Header
          header={header}
          cart={cart}
          isLoggedIn={isLoggedIn}
          customerFirstName={customerFirstName}
          publicStoreDomain={publicStoreDomain}
          isHomePage={isHomePage}
        />
      )}
      <main>{children}</main>
      <Footer
        footer={footer}
        footerBanner={footerBanner}
        header={header}
        publicStoreDomain={publicStoreDomain}
      />
    </Aside.Provider>
  );
}

function CartAside({cart}: {cart: PageLayoutProps['cart']}) {
  return (
    <Aside type="cart" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <SearchFormPredictive>
          {({fetchResults, goToSearch, inputRef}) => (
            <>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
              />
              &nbsp;
              <button onClick={goToSearch}>Search</button>
            </>
          )}
        </SearchFormPredictive>

        <SearchResultsPredictive>
          {({items, total, term, state, closeSearch}) => {
            const {articles, collections, pages, products, queries} = items;

            if (state === 'loading' && term.current) {
              return <div>Loading...</div>;
            }

            if (!total) {
              return <SearchResultsPredictive.Empty term={term} />;
            }

            return (
              <>
                <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                />
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Collections
                  collections={collections}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Pages
                  pages={pages}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Articles
                  articles={articles}
                  closeSearch={closeSearch}
                  term={term}
                />
                {term.current && total ? (
                  <Link
                    onClick={closeSearch}
                    to={`${SEARCH_ENDPOINT}?q=${term.current}`}
                  >
                    <p>
                      View all results for <q>{term.current}</q>
                      &nbsp; →
                    </p>
                  </Link>
                ) : null}
              </>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}

function MobileMenuAside({
  header,
  publicStoreDomain,
}: {
  header: PageLayoutProps['header'];
  publicStoreDomain: PageLayoutProps['publicStoreDomain'];
}) {
  return (
    header.menu &&
    header.shop.primaryDomain?.url && (
      <Aside type="mobile" heading="MENU">
        <HeaderMenu
          menu={header.menu}
          viewport="mobile"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
      </Aside>
    )
  );
}
