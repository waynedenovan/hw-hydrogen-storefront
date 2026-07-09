# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## MCP infrastructure — read before touching `mcp/`, `project_errors.db`, or `.claude/skills`

As of 2026-07-09 this project's MCP setup is **consolidated with the other 3 hoseworld projects** (`hw-hydrogen-storefront`, `hw-storefront-ui`, `hw-storefront-ui-node-docker`) into one shared Docker container. Full history in `todo.md` at the repo root above (`/home/rogue/Data/data/coding/github/shopify/app/hoseworld/todo.md`). Last verified against live state: 2026-07-09.

- `mcp/` in this repo (bridge.mjs/server.js/error-parser) is the pre-consolidation copy, superseded by the shared image at `/home/rogue/mcp-bridge/docker/` (same Legacy-Error code, plus Qdrant-Search), running as container `hoseworld-mcp-bridge` on port 4000. `.mcp.json` points at `http://localhost:4000/sse`. Verify: `docker ps --filter name=hoseworld-mcp-bridge` should show it `Up`; if it's gone or `.mcp.json` points elsewhere, this section is stale — check `todo.md` history before trusting it.
- `project_errors.db` in this repo predates consolidation; its 11 rows were merged into the consolidated db. Writes to this file are inert — the live db is `/home/rogue/mcp-bridge/data/project_errors.db`, bind-mounted into the container. Verify: results from the `search_errors` tool should reflect the consolidated db, not edits made here.
- Qdrant: this project's old collection `ws-hw-hydrogen-storefront-dev` was merged into shared collection `hoseworld-dev-knowledge` on the `qdrant` container, along with `ws-shopify-ai-dev`. Verify: querying the old collection names should 404; `hoseworld-dev-knowledge` should exist on the `qdrant` container.
- `.claude/skills` is a symlink to `/home/rogue/mcp-bridge/skills/` — one canonical copy shared by all 4 projects (includes this repo's own `collection-page-style` skill plus API reference skills from the storefront-ui projects). The pre-consolidation directory is backed up at `.claude/skills.bak-2607091300`. Verify: `ls -la .claude/skills` should show it as a symlink; edit skills at the target, not by breaking the link.
