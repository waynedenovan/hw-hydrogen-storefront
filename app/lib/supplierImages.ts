// Resolves local supplier product images (media/suppliers/{prefix}/{productId}.jpg)
// into URLs the storefront can render.
//
// The media/ directory isn't servable yet — this app runs on Shopify Oxygen's
// edge runtime (see server.ts), which has no persistent filesystem. These URLs
// point at a /media/suppliers/* resource route that will read from disk once
// hw-hydrogen-storefront is migrated to a self-hosted Node/Express adapter
// (tracked in todo_docker.md). Until that route exists, these URLs 404 and
// callers must fail gracefully (e.g. an <img onError> that hides the element)
// rather than assuming the image is guaranteed to load.

const SUPPLIER_PREFIX_LENGTH = 4;

// "Agrinet" -> "agri"; a name shorter than 4 chars is used in full (e.g. "Dab" -> "dab").
export function getSupplierFolderPrefix(supplierName: string): string {
  const lower = supplierName.toLowerCase();
  return lower.length <= SUPPLIER_PREFIX_LENGTH ? lower : lower.slice(0, SUPPLIER_PREFIX_LENGTH);
}

// Supplier image files on disk are named without the " " and "/" characters that
// some raw product ids carry (e.g. product "AO757/0813" -> file "AO7570813.jpg"),
// so both must be excluded when linking a productId to an image filename. Kept in
// sync with hasLocalSupplierImage in hw-storefront-ui-node-docker's
// dataQuality.server.js, which matches the same files.
export function normalizeProductIdForImage(
  externalProductId: string | null | undefined,
): string | null {
  if (!externalProductId) return null;
  const normalized = externalProductId.replace(/[ /]/g, '');
  return normalized || null;
}

// The card/primary image is always the bare {productId}.jpg file — no directory
// listing needed, so this can be wired up before the disk-reading route exists.
export function getProductCardImageSrc(
  supplierName: string | null | undefined,
  externalProductId: string | null | undefined,
): string | null {
  const productId = normalizeProductIdForImage(externalProductId);
  if (!supplierName || !productId) return null;
  const prefix = getSupplierFolderPrefix(supplierName);
  return `/media/suppliers/${prefix}/${productId}.jpg`;
}

// Detail-view gallery: additional images are named {productId}_0.jpg, {productId}_1.jpg,
// etc. We don't know ahead of time how many exist (that requires reading the
// directory), so this returns a bounded list of candidate URLs — including the
// bare card image first — for the caller to render with onError-drop (each <img>
// removes itself from the gallery if its candidate file doesn't exist).
export function getProductGalleryImageSrcs(
  supplierName: string | null | undefined,
  externalProductId: string | null | undefined,
  maxSuffix = 9,
): string[] {
  const cardSrc = getProductCardImageSrc(supplierName, externalProductId);
  if (!cardSrc) return [];
  const prefix = getSupplierFolderPrefix(supplierName as string);
  const productId = normalizeProductIdForImage(externalProductId);
  const suffixed = Array.from(
    {length: maxSuffix + 1},
    (_, i) => `/media/suppliers/${prefix}/${productId}_${i}.jpg`,
  );
  return [cardSrc, ...suffixed];
}

// Technical Information / User Manual links (custom.tech_info_pdf /
// custom.user_manual_pdf metafields): the value is either a full URL —
// rendered as-is, no local file involved — or a bare filename resolved
// against media/suppliers/{prefix}/docs/{filename}, a docs/ subfolder kept
// separate from the image gallery files under the same per-supplier root.
export function getSupplierDocSrc(
  supplierName: string | null | undefined,
  value: string | null | undefined,
): string | null {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (!supplierName) return null;
  const prefix = getSupplierFolderPrefix(supplierName);
  return `/media/suppliers/${prefix}/docs/${value}`;
}

// Task 2607240845: custom.images / custom.tech_info_pdf / custom.user_manual_pdf
// can each hold multiple ";"-delimited values (built by
// hw-storefront-ui-node-docker's scripts/generate-agrinet-media.mjs from a
// per-supplier media file, not the products JSON). Splits on ";" and trims
// each entry; empty entries are kept (not filtered) so a product with gallery
// images but no main image — e.g. "" followed by real filenames — can still
// be told apart from "nothing at all" by callers that care (see
// getImagesFromMetafield below).
export function parseDelimitedMediaValue(value: string | null | undefined): string[] {
  if (!value) return [];
  return value.split(';').map((entry) => entry.trim());
}

// custom.images: first value is the main image (Product Card + Detail page),
// any further values are Detail-page-only gallery images — the same
// card/gallery split getProductCardImageSrc/getProductGalleryImageSrcs
// already render, just from an explicit list instead of guessed
// {productId}_0..9 filenames (real files use _1.._16+, so the guess was
// already an approximation). Returns full URLs in order, main first, with
// empty entries dropped — callers that already treat position 0 as "main"
// (ProductCard's localImageSrc, the Detail page's gallerySrcs[0]) don't need
// any other change.
export function getImagesFromMetafield(
  supplierName: string | null | undefined,
  imagesValue: string | null | undefined,
): string[] {
  if (!supplierName) return [];
  const entries = parseDelimitedMediaValue(imagesValue).filter((entry) => entry !== '');
  if (entries.length === 0) return [];
  const prefix = getSupplierFolderPrefix(supplierName);
  return entries.map((filename) => `/media/suppliers/${prefix}/${filename}`);
}

// custom.tech_info_pdf / custom.user_manual_pdf: each ";"-delimited value
// resolved the same way getSupplierDocSrc resolves a single value (full URL
// as-is, or a local media/suppliers/{prefix}/docs/{filename} path).
export function getSupplierDocSrcs(
  supplierName: string | null | undefined,
  value: string | null | undefined,
): string[] {
  return parseDelimitedMediaValue(value)
    .filter((entry) => entry !== '')
    .map((entry) => getSupplierDocSrc(supplierName, entry))
    .filter((src): src is string => src !== null);
}
