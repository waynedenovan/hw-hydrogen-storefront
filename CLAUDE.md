# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## MCP infrastructure — read before touching `mcp/`, `project_errors.db`, or `.claude/skills`

As of 2026-07-09 this project's MCP setup is **consolidated with the other 3 hoseworld projects** (`hw-hydrogen-storefront`, `hw-storefront-ui`, `hw-storefront-ui-node-docker`) into one shared Docker container. Full history in `todo.md` at the repo root above (`/home/rogue/Data/data/coding/github/shopify/app/hoseworld/todo.md`).

- **`mcp/` (this repo's copy of bridge.mjs/server.js/error-parser) is dead code — do not run it, edit it as "the" error server, or treat it as live.** It's superseded by the single shared image at `/home/rogue/mcp-bridge/docker/` (same Legacy-Error code, plus Qdrant-Search, running as one Docker container `hoseworld-mcp-bridge` on port 4000). `.mcp.json` already points every project at `http://localhost:4000/sse` — nothing to change here.
- **`project_errors.db` in this repo is stale/frozen** (its 11 rows were already merged into the consolidated db). The live `search_errors` tool reads from `/home/rogue/mcp-bridge/data/project_errors.db`, bind-mounted into the container — not from this file. Don't edit this local copy expecting it to affect tool results.
- **Qdrant**: this project's old collection `ws-hw-hydrogen-storefront-dev` was merged into one shared collection, `hoseworld-dev-knowledge`, on the existing `qdrant` container, along with `ws-shopify-ai-dev`. Neither old collection exists anymore.
- **`.claude/skills`** is now a symlink to `/home/rogue/mcp-bridge/skills/` — one canonical copy shared by all 4 projects (includes this repo's own `collection-page-style` skill plus API reference skills from the storefront-ui projects). Edit skills there, not by breaking the symlink. The pre-consolidation real directory is backed up at `.claude/skills.bak-2607091300`.
