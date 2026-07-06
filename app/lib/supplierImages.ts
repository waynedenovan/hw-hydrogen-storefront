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

// The card/primary image is always the bare {productId}.jpg file — no directory
// listing needed, so this can be wired up before the disk-reading route exists.
export function getProductCardImageSrc(
  supplierName: string | null | undefined,
  externalProductId: string | null | undefined,
): string | null {
  if (!supplierName || !externalProductId) return null;
  const prefix = getSupplierFolderPrefix(supplierName);
  return `/media/suppliers/${prefix}/${externalProductId}.jpg`;
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
  const suffixed = Array.from(
    {length: maxSuffix + 1},
    (_, i) => `/media/suppliers/${prefix}/${externalProductId}_${i}.jpg`,
  );
  return [cardSrc, ...suffixed];
}
