# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## This repo is frozen — active development happens in `hw-hydrogen-storefront-node-docker`

Per session notes recovered during the 2026-07-09 MCP consolidation: this "main" (non-docker) checkout stopped advancing at the "Moving to git branch: node-docker" commit and has no `todo.md`. Both variants share the same git remote. Confirm with `git log` before assuming this copy is current.

## MCP infrastructure — read before touching `.mcp.json` or `.claude/skills`

As of 2026-07-09 this project's MCP setup is **consolidated with the other 3 hoseworld projects** (`hw-hydrogen-storefront-node-docker`, `hw-storefront-ui`, `hw-storefront-ui-node-docker`) into one shared Docker container. Full history in `todo.md` at the repo root above (`/home/rogue/Data/data/coding/github/shopify/app/hoseworld/todo.md`). Last verified against live state: 2026-07-09.

- This repo never had its own `mcp/` folder, `project_errors.db`, or MCP wiring before consolidation. `.mcp.json` was added for consistency with the other 3 projects, pointing at shared bridge container `hoseworld-mcp-bridge` on `http://localhost:4000/sse` (Legacy-Error + Qdrant-Search, backed by the consolidated db and the `hoseworld-dev-knowledge` Qdrant collection). Verify: `docker ps --filter name=hoseworld-mcp-bridge` should show it `Up`; if it's gone or `.mcp.json` points elsewhere, this section is stale — check `todo.md` history before trusting it.
- `.claude/skills` is a symlink to `/home/rogue/mcp-bridge/skills/` — one canonical copy shared by all 4 projects, including the `collection-page-style` skill originally written for the `-node-docker` variant. Verify: `ls -la .claude/skills` should show it as a symlink.
