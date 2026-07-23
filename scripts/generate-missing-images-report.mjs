// Regenerates suppliers/agrinet/prod/missing_images.md: a flat bullet list of
// Agrinet externalProductId values that have no displayable image today (no
// Shopify featuredImage, and no local media/suppliers/{prefix}/{id}.jpg file).
// Fully regenerating the file each run is what gives the "add newly-missing,
// remove newly-found" behavior the task asks for -- there's no stale state to
// reconcile, the file always reflects the current image gap.
//
// Usage: node scripts/generate-missing-images-report.mjs

import 'dotenv/config';
import {existsSync} from 'node:fs';
import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';

const STORE_DOMAIN = process.env.PUBLIC_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.PUBLIC_STOREFRONT_API_TOKEN;
const SUPPLIER = 'agrinet';
const OUTPUT_FILE = path.resolve('suppliers', 'agrinet', 'prod', 'missing_images.md');
const MEDIA_ROOT = path.resolve('media', 'suppliers');
const SUPPLIER_PREFIX_LENGTH = 4;

function getSupplierFolderPrefix(supplierName) {
  const lower = supplierName.toLowerCase();
  return lower.length <= SUPPLIER_PREFIX_LENGTH ? lower : lower.slice(0, SUPPLIER_PREFIX_LENGTH);
}

const PRODUCTS_QUERY = `#graphql
  query MissingImagesReport($first: Int) {
    products(first: $first) {
      nodes {
        featuredImage { url }
        supplierName: metafield(namespace: "custom", key: "supplier_name") { value }
        externalProductId: metafield(namespace: "custom", key: "external_product_id") { value }
      }
    }
  }
`;

async function fetchAllProducts() {
  if (!STORE_DOMAIN || !STOREFRONT_TOKEN) {
    throw new Error(
      'Missing PUBLIC_STORE_DOMAIN / PUBLIC_STOREFRONT_API_TOKEN in .env -- cannot query the Storefront API.',
    );
  }
  const response = await fetch(`https://${STORE_DOMAIN}/api/2025-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({query: PRODUCTS_QUERY, variables: {first: 250}}),
  });
  const json = await response.json();
  if (json.errors) {
    throw new Error(`Storefront API error: ${JSON.stringify(json.errors)}`);
  }
  return json.data.products.nodes;
}

async function main() {
  const products = await fetchAllProducts();
  const agrinetProducts = products.filter(
    (p) => p.supplierName?.value?.toLowerCase() === SUPPLIER && p.externalProductId?.value,
  );

  const missing = [];
  for (const product of agrinetProducts) {
    const productId = product.externalProductId.value;
    if (product.featuredImage) continue;
    const prefix = getSupplierFolderPrefix(SUPPLIER);
    const localPath = path.join(MEDIA_ROOT, prefix, `${productId}.jpg`);
    if (existsSync(localPath)) continue;
    missing.push(productId);
  }
  missing.sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));

  await mkdir(path.dirname(OUTPUT_FILE), {recursive: true});
  const body = missing.map((id) => `- ${id}`).join('\n');
  await writeFile(OUTPUT_FILE, body ? `${body}\n` : '');

  console.log(
    `[missing-images] Checked ${agrinetProducts.length} Agrinet products, ${missing.length} missing an image. Wrote ${OUTPUT_FILE}.`,
  );
}

main().catch((err) => {
  console.error('[missing-images] Fatal error:', err);
  process.exitCode = 1;
});
