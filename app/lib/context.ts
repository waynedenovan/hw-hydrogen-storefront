import {
  createHydrogenContext,
  InMemoryCache,
  type I18nBase,
  type CountryCode,
  type LanguageCode,
} from '@shopify/hydrogen';
import {AppSession} from '~/lib/session';
import {CART_QUERY_FRAGMENT} from '~/lib/fragments';

export interface I18nLocale extends I18nBase {
  language: LanguageCode;
  country: CountryCode;
  pathPrefix: string;
}

const DEFAULT_LOCALE: I18nLocale = {
  language: 'EN' as LanguageCode,
  country: 'ZA' as CountryCode,
  pathPrefix: '',
};

const LOCALE_MAP: Record<string, I18nLocale> = {
  '/en-za': {language: 'EN' as LanguageCode, country: 'ZA' as CountryCode, pathPrefix: '/en-za'},
  '/en-nz': {language: 'EN' as LanguageCode, country: 'NZ' as CountryCode, pathPrefix: '/en-nz'},
  '/en-au': {language: 'EN' as LanguageCode, country: 'AU' as CountryCode, pathPrefix: '/en-au'},
  '/en-us': {language: 'EN' as LanguageCode, country: 'US' as CountryCode, pathPrefix: '/en-us'},
};

function getLocaleFromRequest(request: Request): I18nLocale {
  const url = new URL(request.url);
  const pathPrefix = `/${url.pathname.split('/')[1]?.toLowerCase() ?? ''}`;
  return LOCALE_MAP[pathPrefix] ?? DEFAULT_LOCALE;
}

const additionalContext = {} as const;

type AdditionalContextType = typeof additionalContext;

declare global {
  interface HydrogenAdditionalContext extends AdditionalContextType {}
}

// Node has no Cache API (caches.open) or Workers-style waitUntil — a single
// process-lifetime in-memory cache replaces the per-isolate Workers cache,
// and a fire-and-forget shim replaces executionContext.waitUntil.
const cache = new InMemoryCache();

function waitUntil(promise: Promise<unknown>): void {
  promise.catch((error: unknown) => console.error(error));
}

export async function createHydrogenRouterContext(request: Request, env: Env) {
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }

  const session = await AppSession.init(request, [env.SESSION_SECRET]);

  const locale = getLocaleFromRequest(request);

  const hydrogenContext = createHydrogenContext(
    {
      env,
      request,
      cache,
      waitUntil,
      session,
      i18n: locale,
      cart: {
        queryFragment: CART_QUERY_FRAGMENT,
        numCartLines: 100,
      },
      customerAccount: {
        useCustomAuthDomain: true,
      },
      buyerIdentity: {
        countryCode: locale.country,
      },
    },
    additionalContext,
  );

  return hydrogenContext;
}
