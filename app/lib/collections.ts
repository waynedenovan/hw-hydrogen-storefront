/**
 * Walks every page of a `collections(first, after)` connection, accumulating
 * all nodes (task 2607271000 — total collection count crossed Shopify's
 * first:250 per-connection max once the Sub-Cat tier landed: 17 fixed +
 * ~120 sub + ~500 sub-cat = 600+ and growing). A single first:250 page used
 * to silently drop whichever collections fell outside it — Shopify's default
 * sort is NOT guaranteed to keep any particular subset (e.g. the fixed mains,
 * or newest-created collections) within the first page. This is the same
 * failure mode this codebase already hit once at an earlier first:100
 * threshold; every consumer of the full collection list must paginate
 * through hasNextPage, not just bump the page size again.
 *
 * `query` must declare a `$cursor: String` variable and select
 * `collections(first: 250, after: $cursor) { pageInfo { hasNextPage
 * endCursor } nodes { ... } }` — same query shape each caller already had,
 * just paginated instead of a single page.
 */
export async function fetchAllCollections<T>(
  storefront: {
    query: (
      query: string,
      options?: {variables?: Record<string, unknown>},
    ) => Promise<any>;
  },
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T[]> {
  const allNodes: T[] = [];
  let cursor: string | null = null;
  let hasNextPage = true;
  while (hasNextPage) {
    const data: any = await storefront.query(query, {
      variables: {...variables, cursor},
    });
    const {nodes, pageInfo} = data.collections ?? {
      nodes: [],
      pageInfo: {hasNextPage: false},
    };
    allNodes.push(...nodes);
    hasNextPage = pageInfo?.hasNextPage ?? false;
    cursor = pageInfo?.endCursor ?? null;
  }
  return allNodes;
}
