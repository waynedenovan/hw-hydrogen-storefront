import {PassThrough} from 'node:stream';
import {createReadableStreamFromReadable} from '@react-router/node';
import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToPipeableStream} from 'react-dom/server';
import {
  createContentSecurityPolicy,
  type HydrogenRouterContextProvider,
} from '@shopify/hydrogen';
import type {EntryContext} from 'react-router';

// Node's react-dom/server only exports the stream-based renderToPipeableStream
// (Web Streams' renderToReadableStream is edge/Workers-only, e.g. react-dom/server.edge).
const ABORT_DELAY = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: HydrogenRouterContextProvider,
): Promise<Response> {
  const devTunnel = context.env.DEV_TUNNEL_DOMAIN;
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    ...(devTunnel
      ? {connectSrc: [`wss://${devTunnel}:*`]}
      : {}),
  });

  return new Promise<Response>((resolve, reject) => {
    let shellRendered = false;
    const userAgent = request.headers.get('user-agent');
    const readyOption: 'onAllReady' | 'onShellReady' =
      userAgent && isbot(userAgent) ? 'onAllReady' : 'onShellReady';

    const {pipe, abort} = renderToPipeableStream(
      <NonceProvider>
        <ServerRouter
          context={reactRouterContext}
          url={request.url}
          nonce={nonce}
        />
      </NonceProvider>,
      {
        nonce,
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');
          responseHeaders.set('Content-Security-Policy', header);

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

// React Router sanitizes action/loader errors before they reach the client in
// production — this hook is the documented way to still see them server-side.
export function handleError(error: unknown, {request}: {request: Request}) {
  if (!request.signal.aborted) {
    console.error('[handleError]', request.method, request.url, error);
  }
}
