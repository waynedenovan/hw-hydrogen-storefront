import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import type {LoaderFunctionArgs} from 'react-router';

const SUPPLIERS_ROOT = path.resolve(process.cwd(), 'media', 'suppliers');

export async function loader({params}: LoaderFunctionArgs) {
  const splat = params['*'] ?? '';
  const resolved = path.resolve(SUPPLIERS_ROOT, splat);

  // Path traversal guard — this is a public route, reject anything that
  // escapes media/suppliers (e.g. `../../../etc/passwd`).
  if (
    resolved !== SUPPLIERS_ROOT &&
    !resolved.startsWith(SUPPLIERS_ROOT + path.sep)
  ) {
    return new Response(null, {status: 404});
  }

  let file: Buffer;
  try {
    file = await fs.readFile(resolved);
  } catch {
    // Expected/common case — e.g. every gallery suffix beyond what actually
    // exists for a given product. The frontend's onError handling relies on
    // this being a clean 404, not an exception.
    return new Response(null, {status: 404});
  }

  return new Response(new Uint8Array(file), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
