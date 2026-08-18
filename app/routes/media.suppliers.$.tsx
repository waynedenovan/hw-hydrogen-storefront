import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import type {LoaderFunctionArgs} from 'react-router';

const SUPPLIERS_ROOT = path.resolve(process.cwd(), 'media', 'suppliers');

// This route now serves both the image gallery (media/suppliers/{prefix}/*.jpg)
// and doc links (media/suppliers/{prefix}/docs/*.pdf) — content type must be
// inferred per file rather than hardcoded to image/jpeg.
const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
};

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

  const ext = path.extname(resolved).toLowerCase();
  const contentType = CONTENT_TYPES[ext] ?? 'application/octet-stream';

  return new Response(new Uint8Array(file), {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
