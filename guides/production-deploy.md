# Production deploy — update the prod containers without rebuilding them

Task 2607170910. Applies to both containers:
`hw-hydrogen-storefront` (this repo) and `hw-storefront-ui` (../hw-storefront-ui-node-docker).

## The model

- **Dev machine builds, production only pulls.** Every rebuild of the
  development container produces a version-tagged image; production picks up
  the change with `docker compose pull && up -d` — it never runs `docker build`.
- Images are tagged from the repo-root `VERSION` file (single running counter,
  e.g. `2026.07.17`) plus `:latest`. Rollback = deploy an older tag.
- Runtime state never lives in the image: supplier images, the sqlite DB,
  supplier JSON uploads and app data are host bind mounts on the VPS under
  `/srv/hoseworld/`, so they survive every image update.

## One-time setup

1. Pick a **private** registry namespace: Docker Hub (`docker.io/<namespace>`)
   or GitHub Container Registry (`ghcr.io/<user>`).
2. `docker login <registry>` on the dev machine, and once on the VPS.
3. On the VPS create the state directories:
   ```sh
   sudo mkdir -p /srv/hoseworld/media/suppliers \
                 /srv/hoseworld/storefront-ui/prisma \
                 /srv/hoseworld/storefront-ui/suppliers \
                 /srv/hoseworld/storefront-ui/data
   ```
   Seed `storefront-ui/prisma/dev.sqlite` with a copy of the current DB
   (the compose file bind-mounts the file itself, so it must exist first).
4. Copy each repo's `docker-compose.prod.yml` to the VPS, and create a
   `.env.production` next to each with the production values (domains, tokens).
   `.env.production` stays on the VPS — never committed, never baked into images.
5. When live traffic moves to the VPS, run the domain-migration checklist
   (cloudflared tunnel config, Shopify custom domain, Customer Account API
   application setup, Xero redirect URI, PayFast URLs — see the
   `hoseworld-domain-migration-checklist` memory / session 2607160950 notes).

## Every release (dev machine)

```sh
# after bumping VERSION and finishing the dev rebuild/testing cycle:
REGISTRY=docker.io/<namespace> ./scripts/release.sh        # both images
REGISTRY=docker.io/<namespace> ./scripts/release.sh hydrogen   # or just one
```

`release.sh` builds via each repo's normal `docker compose build` (so dev and
prod run byte-identical images), tags `:$(cat VERSION)` + `:latest`, and pushes.

## Every release (VPS) — this is the whole "update without rebuilding" step

```sh
cd /srv/hoseworld/<repo-dir>
REGISTRY=docker.io/<namespace> TAG=2026.07.17 \
  docker compose -f docker-compose.prod.yml pull
REGISTRY=docker.io/<namespace> TAG=2026.07.17 \
  docker compose -f docker-compose.prod.yml up -d
```

`up -d` recreates only if the image changed; a few seconds of downtime.
Rollback: rerun with the previous `TAG`.

## Supplier images (still being collected — no rebuild/restart needed)

The hydrogen container serves `/media/suppliers/*` straight from the bind
mount per-request (`server.ts` express.static — task 2607170910), so new
images only need an rsync, nothing else:

```sh
rsync -av --delete \
  /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront/media/suppliers/ \
  <vps>:/srv/hoseworld/media/suppliers/
```

They serve immediately — no container restart, no image rebuild, on dev or prod.
