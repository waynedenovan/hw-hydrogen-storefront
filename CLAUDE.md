# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## MCP infrastructure — read before touching `mcp/`, `project_errors.db`, or `.claude/skills`

As of 2026-07-09 this project's MCP setup is **consolidated with the other 3 hoseworld projects** (`hw-hydrogen-storefront`, `hw-storefront-ui`, `hw-storefront-ui-node-docker`) into one shared Docker container. Full history in `todo.md` at the repo root above (`/home/rogue/Data/data/coding/github/shopify/app/hoseworld/todo.md`). Last verified against live state: 2026-07-09.

- `mcp/` in this repo (bridge.mjs/server.js/error-parser) is the pre-consolidation copy, superseded by the shared image at `/home/rogue/mcp-bridge/docker/` (same Legacy-Error code, plus Qdrant-Search), running as container `hoseworld-mcp-bridge` on port 4000. `.mcp.json` points at `http://localhost:4000/sse`. Verify: `docker ps --filter name=hoseworld-mcp-bridge` should show it `Up`; if it's gone or `.mcp.json` points elsewhere, this section is stale — check `todo.md` history before trusting it.
- `project_errors.db` in this repo predates consolidation; its 11 rows were merged into the consolidated db. Writes to this file are inert — the live db is `/home/rogue/mcp-bridge/data/project_errors.db`, bind-mounted into the container. Verify: results from the `search_errors` tool should reflect the consolidated db, not edits made here.
- Qdrant: this project's old collection `ws-hw-hydrogen-storefront-dev` was merged into shared collection `hoseworld-dev-knowledge` on the `qdrant` container, along with `ws-shopify-ai-dev`. Verify: querying the old collection names should 404; `hoseworld-dev-knowledge` should exist on the `qdrant` container.
- `.claude/skills` is a symlink to `/home/rogue/mcp-bridge/skills/` — one canonical copy shared by all 4 projects (includes this repo's own `collection-page-style` skill plus API reference skills from the storefront-ui projects). The pre-consolidation directory is backed up at `.claude/skills.bak-2607091300`. Verify: `ls -la .claude/skills` should show it as a symlink; edit skills at the target, not by breaking the link.

### Available MCP servers — standardized names

Task instructions in `todo.md` reference three distinct MCP servers/tools, sometimes loosely (e.g. "the MCP server: hoseworld-dev-knowledge"). This wording is standardized identically across all 4 hoseworld projects — use these exact names, not ad-hoc ones:

- **MCP-Bridge** — the shared bridge server described above. Provides `qdrant-find`/`qdrant-store` against the Qdrant collection `hoseworld-dev-knowledge` (session summaries, reusable patterns, error history) plus the legacy-error lookup backed by `/home/rogue/mcp-bridge/data/project_errors.db`. **"hoseworld-dev-knowledge" is a Qdrant collection name, not a server name** — the server is "MCP-Bridge".
- **shopify-dev-mcp** — the official Shopify Dev MCP server. Call `learn_shopify_api` then `search_docs_chunks` / `validate_graphql_codeblocks` / `validate_theme` / `validate_component_codeblocks` to confirm correct Shopify API/GraphQL/theme patterns before proposing a fix.
- **Playwright MCP** — live browser automation for physically verifying UI/behavior changes against the running site — never assume a fix works without this.

Standing debug-mode order of operations: MCP-Bridge (`qdrant-find`) first → shopify-dev-mcp if a Shopify API pattern is in question → implement → verify live via Playwright MCP → log the outcome back to MCP-Bridge (`qdrant-store`).

## Storefront-ui database — cross-project note

**As of 2026-07-30 (session 2607301540), `hw-storefront-ui-node-docker`'s live
database is PostgreSQL, not SQLite.** The real cutover happened that session:
`docker-compose.yml` runs a real `postgres` service (container
`hw-storefront-ui-postgres`), `prisma/schema.prisma`'s datasource is
`postgresql`, and the old `./prisma/dev.sqlite` bind mount is gone. A separate,
still-isolated PostgreSQL *rehearsal* target (`docker-compose.postgres-test.yml`,
project `hoseworld-postgres-migration-lab`) also exists for practicing future
migrations (e.g. before an eventual VPS deploy) — don't confuse the two.
Verify before trusting either claim: `grep datasource
../hw-storefront-ui-node-docker/prisma/schema.prisma` should show `postgresql`,
and `docker ps --filter name=hw-storefront-ui-postgres` should show it `Up`.
Full history in MCP-Bridge/Qdrant under `hoseworld-dev-knowledge`; use
`qdrant-find` before cross-project work that touches imports, storefront
settings, or deployment assumptions.

Hydrogen (this repo) does not connect directly to that database either way —
it only ever reads Shopify's Storefront API and calls `hw-storefront-ui-node-docker`'s
own HTTP API (`STOREFRONT_UI_API_URL`) for cross-repo customer data, so this
cutover required zero changes here. Details and lifecycle commands for the
rehearsal lab are in
`../hw-storefront-ui-node-docker/guides/postgres-migration-lab.md`.
