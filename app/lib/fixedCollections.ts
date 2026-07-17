/**
 * The fixed main Collection list (task 2607171535). Mirrors FIXED_COLLECTIONS in
 * hw-storefront-ui-node-docker/app/services/collections.server.js — keep the two
 * in sync. Collections carrying metafield custom.collection_role = "main" are the
 * homepage tiles; this list only supplies their display ORDER (matched
 * case-insensitively by title), unknown mains sort last alphabetically.
 */
export const FIXED_COLLECTION_ORDER = [
  'Agricultural',
  'Automotive',
  'Construction',
  'Electrical',
  'Fire Protection',
  'Garden & Lawn',
  'Irrigation',
  'Garden Irrigation',
  'Hardware & Tools',
  'Household',
  'Livestock & Animals',
  'Outdoor',
  'Paint & Related',
  'Plumbing',
  'Power Products',
  'Welding',
  'PPE',
];

const orderIndex = new Map(
  FIXED_COLLECTION_ORDER.map((title, i) => [title.toLowerCase(), i]),
);

export function sortMainCollections<T extends {title: string}>(collections: T[]): T[] {
  return [...collections].sort((a, b) => {
    const ia = orderIndex.get(a.title.trim().toLowerCase());
    const ib = orderIndex.get(b.title.trim().toLowerCase());
    if (ia !== undefined && ib !== undefined) return ia - ib;
    if (ia !== undefined) return -1;
    if (ib !== undefined) return 1;
    return a.title.localeCompare(b.title);
  });
}
