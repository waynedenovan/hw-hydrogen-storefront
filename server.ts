import 'dotenv/config';
import {setDefaultResultOrder} from 'node:dns';
import compression from 'compression';
import express, {type Request as ExpressRequest, type Response as ExpressResponse} from 'express';
import morgan from 'morgan';
import {
  createReadableStreamFromReadable,
  writeReadableStreamToWritable,
} from '@react-router/node';
import {createRequestHandler, storefrontRedirect} from '@shopify/hydrogen';
import {createHydrogenRouterContext} from '~/lib/context';

// Node's happy-eyeballs DNS resolution can try an unreachable AAAA (IPv6)
// record first inside a container whose IPv6 routing is broken, hanging
// outbound fetch() calls to Shopify's API until ETIMEDOUT — a well-known
// Node-in-Docker gotcha, not something the Workers/Oxygen runtime ever hit.
setDefaultResultOrder('ipv4first');

// Node's undici requires an explicit `duplex` option on any fetch() call whose
// body is a ReadableStream (Workers' fetch has no such requirement, so this
// never surfaces under Oxygen). Hydrogen's own bundled code — e.g. its
// /api/*/graphql.json storefront-proxy route — forwards incoming request
// bodies via fetch() without setting it, which throws under Node. Patching it
// in here transparently rather than forking Hydrogen's dist bundle.
type RequestInitWithDuplex = RequestInit & {duplex?: 'half'};
const originalFetch = globalThis.fetch;
globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInitWithDuplex) => {
  if (init?.body instanceof ReadableStream && init.duplex === undefined) {
    return originalFetch(input, {...init, duplex: 'half'} as RequestInit);
  }
  return originalFetch(input, init);
}) as typeof fetch;

// Matches react-router.config.ts's hydrogenPreset(), which sets
// buildDirectory: 'dist' (not react-router's own 'build' default).
const BUILD_PATH = './dist/server/index.js';
const PORT = Number(process.env.PORT) || 5130;
const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.use(compression());
app.disable('x-powered-by');

let vite: import('vite').ViteDevServer | undefined;

if (isProduction) {
  app.use(morgan('tiny'));
  app.use(
    '/assets',
    express.static('dist/client/assets', {immutable: true, maxAge: '1y'}),
  );
  app.use(express.static('dist/client', {maxAge: '1h'}));
} else {
  const {createServer} = await import('vite');
  vite = await createServer({
    server: {middlewareMode: true},
    configFile: 'vite.config.ts',
  });
  app.use(vite.middlewares);
}

app.all('*', async (req, res) => {
  try {
    const request = createFetchRequest(req, res);
    const hydrogenContext = await createHydrogenRouterContext(
      request,
      process.env as unknown as Env,
    );

    const build = vite
      ? await vite.ssrLoadModule('virtual:react-router/server-build')
      : await import(BUILD_PATH);

    const handleRequest = createRequestHandler({
      build,
      mode: process.env.NODE_ENV,
      getLoadContext: () => hydrogenContext,
    });

    let response = await handleRequest(request);

    if (hydrogenContext.session.isPending) {
      response.headers.append(
        'Set-Cookie',
        await hydrogenContext.session.commit(),
      );
    }

    if (response.status === 404) {
      // Check for redirects only when there's a 404 from the app. If the
      // redirect doesn't exist, storefrontRedirect passes through the 404.
      response = await storefrontRedirect({
        request,
        response,
        storefront: hydrogenContext.storefront,
      });
    }

    await sendFetchResponse(res, response);
  } catch (error) {
    if (vite) vite.ssrFixStacktrace(error as Error);
    console.error(error);
    res.status(500).send('An unexpected error occurred');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server listening at http://0.0.0.0:${PORT}`);
});

function createFetchRequest(req: ExpressRequest, res: ExpressResponse): Request {
  const origin = `${req.protocol}://${req.get('host')}`;
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();
  // req.on('close') fires once the request body has been fully read, not
  // just on a real client disconnect — that false-positive was aborting the
  // signal mid-action, causing react-router to silently discard the result
  // and return an empty 500 (its request-aborted handling). res.on('close')
  // combined with checking the response hasn't already finished is the
  // correct way to detect an actual client disconnect.
  res.on('close', () => {
    if (!res.writableEnded) controller.abort();
  });

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value == null) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, value);
    }
  }

  const init: RequestInit & {duplex?: 'half'} = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = createReadableStreamFromReadable(req);
    init.duplex = 'half';
  }

  return new Request(url.href, init);
}

async function sendFetchResponse(
  res: ExpressResponse,
  response: Response,
): Promise<void> {
  res.status(response.status);
  res.statusMessage = response.statusText;

  for (const [key, value] of response.headers.entries()) {
    const lowerKey = key.toLowerCase();
    if (lowerKey === 'set-cookie') continue;
    // undici's fetch() transparently decompresses the body but leaves
    // Content-Encoding/Content-Length describing the original compressed
    // payload — forwarding them verbatim breaks the client's decoder for
    // any response Hydrogen has itself fetch()ed and passed through (e.g.
    // its /api/*/graphql.json storefront proxy).
    if (lowerKey === 'content-encoding' || lowerKey === 'content-length') {
      continue;
    }
    res.append(key, value);
  }

  // Multiple Set-Cookie headers collapse into one comma-joined string under
  // Headers#entries() — getSetCookie() (Node 18.14.1+/undici) preserves them.
  const headers = response.headers as Headers & {getSetCookie?: () => string[]};
  if (typeof headers.getSetCookie === 'function') {
    for (const cookie of headers.getSetCookie()) {
      res.append('Set-Cookie', cookie);
    }
  }

  if (response.body) {
    await writeReadableStreamToWritable(response.body, res);
  } else {
    res.end();
  }
}
