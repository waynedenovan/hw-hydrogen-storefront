import {useEffect, useState} from 'react';
import {useFetcher} from 'react-router';
import type {CookieConsent} from '~/lib/cookieConsent.server';

interface CookieConsentGateProps {
  consent: CookieConsent | null;
  // Set true when the visitor reopens preferences from the Footer's "Cookie
  // Preferences" link — unlike the first-visit gate, that view is dismissible
  // since site use is no longer blocked.
  forceOpen: boolean;
  onForceOpenHandled: () => void;
}

const cardStyle: React.CSSProperties = {
  background: 'rgba(50, 50, 50, 0.95)',
  borderRadius: '8px',
  padding: '1.5rem',
  color: 'white',
};

const labelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.875rem',
  color: 'rgba(255,255,255,0.85)',
  marginBottom: '0.5rem',
};

const buttonBaseStyle: React.CSSProperties = {
  border: '1px solid rgba(255, 255, 255, 0.3)',
  padding: '0.5rem 1.25rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.875rem',
};

// First-visit, POPIA-compliant cookie consent banner. Blocks site use (no
// Escape/backdrop/X close) until the visitor makes a choice, then persists
// that choice in a long-lived cookie (app/lib/cookieConsent.server.ts) and,
// for logged-in customers, also in the hw-storefront-ui-node-docker backend so
// it can be amended later from /account/cookie-preferences.
export function CookieConsentGate({
  consent,
  forceOpen,
  onForceOpenHandled,
}: CookieConsentGateProps) {
  const [managePanelOpen, setManagePanelOpen] = useState(false);
  const fetcher = useFetcher<{success?: boolean}>();

  const isBlocking = !consent;
  const isDismissibleReopen = Boolean(consent) && forceOpen;
  const visible = isBlocking || isDismissibleReopen;

  useEffect(() => {
    if (isDismissibleReopen && fetcher.state === 'idle' && fetcher.data?.success) {
      onForceOpenHandled();
      setManagePanelOpen(false);
    }
  }, [isDismissibleReopen, fetcher.state, fetcher.data, onForceOpenHandled]);

  useEffect(() => {
    if (!isDismissibleReopen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onForceOpenHandled();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDismissibleReopen, onForceOpenHandled]);

  if (!visible) return null;

  const close = isDismissibleReopen ? onForceOpenHandled : undefined;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
      onClick={close}
    >
      <div
        style={{...cardStyle, maxWidth: '32rem', width: '100%', maxHeight: '85vh', overflowY: 'auto'}}
        onClick={(event) => event.stopPropagation()}
      >
        <div style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem'}}>
          We value your privacy
        </div>
        <div style={{fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1rem', lineHeight: 1.5}}>
          We use cookies to run this site (essential), remember your preferences
          (functional), understand how the site is used (analytics), and show
          relevant offers (marketing). Essential cookies are always on. You can
          accept all, reject non-essential cookies, or choose exactly which
          categories to allow — see our Privacy Policy in the footer for
          details. You can change your choice at any time via the &ldquo;Cookie
          Preferences&rdquo; link in the footer{consent ? ' or here in your account.' : '.'}
        </div>

        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: managePanelOpen ? '1rem' : 0}}>
          <fetcher.Form method="post" action="/cookie-consent">
            <input type="hidden" name="intent" value="accept_all" />
            <button
              type="submit"
              style={{...buttonBaseStyle, background: 'rgba(104, 211, 145, 0.2)', color: '#68d391', borderColor: 'rgba(104, 211, 145, 0.4)'}}
            >
              Accept All
            </button>
          </fetcher.Form>
          <fetcher.Form method="post" action="/cookie-consent">
            <input type="hidden" name="intent" value="reject_non_essential" />
            <button type="submit" style={{...buttonBaseStyle, background: 'rgba(255,255,255,0.08)', color: 'white'}}>
              Reject Non-Essential
            </button>
          </fetcher.Form>
          <button
            type="button"
            onClick={() => setManagePanelOpen((open) => !open)}
            style={{...buttonBaseStyle, background: 'transparent', color: 'rgba(255,255,255,0.85)'}}
          >
            Manage Preferences
          </button>
        </div>

        {managePanelOpen && (
          <fetcher.Form method="post" action="/cookie-consent">
            <input type="hidden" name="intent" value="manage_preferences" />

            <label style={labelStyle}>
              <input type="checkbox" checked disabled style={{width: 'auto', margin: 0}} />
              Essential (always active)
            </label>
            <label style={labelStyle}>
              <input
                type="checkbox"
                name="functional"
                defaultChecked={consent?.functional ?? false}
                style={{width: 'auto', margin: 0}}
              />
              Functional
            </label>
            <label style={labelStyle}>
              <input
                type="checkbox"
                name="analytics"
                defaultChecked={consent?.analytics ?? false}
                style={{width: 'auto', margin: 0}}
              />
              Analytics
            </label>
            <label style={{...labelStyle, marginBottom: '1rem'}}>
              <input
                type="checkbox"
                name="marketing"
                defaultChecked={consent?.marketing ?? false}
                style={{width: 'auto', margin: 0}}
              />
              Marketing
            </label>

            <button
              type="submit"
              style={{...buttonBaseStyle, background: 'rgba(255, 255, 255, 0.15)', color: 'white'}}
            >
              Save Preferences
            </button>
          </fetcher.Form>
        )}
      </div>

      {isDismissibleReopen && (
        <button
          type="button"
          onClick={onForceOpenHandled}
          aria-label="Close cookie preferences"
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-black text-xl leading-none hover:bg-white"
        >
          ×
        </button>
      )}
    </div>
  );
}
