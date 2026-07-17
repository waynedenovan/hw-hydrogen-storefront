rogue@lnx-MS-7E27:~/Data/data/coding/github/shopify/app/hoseworld$ cd hw-hydrogen-storefront-node-docker
rogue@lnx-MS-7E27:~/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker$ claude
 ▐▛███▜▌   Claude Code v2.1.211
▝▜█████▛▘  Fable 5 · Claude Pro
  ▘▘ ▝▝    ~/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker

 ⚠ 1 MCP server needs authentication · run /mcp

❯ use hw-hydrogen-storefront-node-docker/todo.md for this tasks instructions                                                                                                             

  Read 1 file (ctrl+o to expand)

● I'll read the task's referenced files and my workflow memory first.

  Read 2 files, recalled 1 memory (ctrl+o to expand)

● The task calls for plan mode with MCP-Bridge lookups first. Let me load the tools I need and enter plan mode.

● Entered plan mode
  Claude is now exploring and designing an implementation approach.

● Following the debug ritual: MCP-Bridge lookup first, then explore the code and logs.

  Called MCP-Bridge 2 times (ctrl+o to expand)

● MCP-Bridge gave key context (self-hosted Node/Express hydrogen container, supplier-image architecture, no bind-mounts). Now let me examine the docker setup, server entry, and the logs
  directly.
 
  Searched for 1 pattern, read 4 files, listed 3 directories (ctrl+o to expand)

● Bash(docker ps -a --format '{{.Names}}\t{{.Status}}\t{{.Image}}' | head -15; echo ---; docker inspect --format '{{.Name}} RestartCount={{.RestartCount}} StartedAt={{…)
  ⎿  hw-hydrogen-storefront-node-docker-hydrogen-storefront-1   Up About an hour        hw-hydrogen-storefront-node-docker-hydrogen-storefront
     hw-storefront-ui-node-docker-storefront-ui-1       Up About an hour        hw-storefront-ui-node-docker-storefront-ui
     hoseworld-mcp-bridge       Up About an hour        hoseworld-mcp-bridge:latest
     … +10 lines (ctrl+o to expand)
  ⎿  Allowed by auto mode classifier

  Searched for 1 pattern (ctrl+o to expand)

● Bash(grep -c "docker-start" app/errors/hw-storefront.log; last reboot 2>/dev/null | head -5; uptime; echo ---; grep -n '"dev"\|"start"\|"build"' package.json)
  ⎿  2
      09:22:13 up  1:21,  1 user,  load average: 0.73, 0.65, 0.53
     ---
     … +3 lines (ctrl+o to expand)
  ⎿  Allowed by auto mode classifier

● Bash(npm view @shopify/shopify-app-session-storage-prisma versions --json 2>/dev/null | tail -8; npm view @shopify/shopify-app-session-storage-prisma@latest version…)
  ⎿    "7.0.1",
       "7.0.2",
       "7.0.3",
     … +14 lines (ctrl+o to expand)

● Bash(npm view prisma versions --json 2>/dev/null | grep '"6\.' | tail -3; echo ---; grep -rn "generated/prisma\|@prisma/client" ../hw-storefront-ui-node-docker/prism…)
  ⎿    "6.20.0-integration-next.20",
       "6.20.0-integration-oidc-truster-publishers.1",
       "6.20.0-integration-oidc-truster-publishers.2",
     … +4 lines (ctrl+o to expand)

● Evidence is complete. Per the task's standing order, let me confirm the storefrontRedirect behavior against Shopify docs before locking the plan.

  Called shopify-dev-mcp 2 times, searched memories (ctrl+o to expand)

● User answered Claude's questions:
  ⎿  · Where will the production containers run? This determines how builds and the media/suppliers image folder get shipped to it. → Remote server / VPS
     · How should dev-built changes reach the production container without rebuilding it there? → Registry push/pull (Recommended)
     · Prisma announces 6.19.3 → 7.8.0, but Shopify's session-storage lib (@shopify/shopify-app-session-storage-prisma, latest 9.0.1) still requires Prisma ^6.19.0 and does a bare 
     require('@prisma/client') — Prisma 7 removes that classic client and the Rust engine. How should we handle the update notice? → Defer until Shopify supports it (Recommended)
 
● All decisions are in. Writing the plan file now.
 
  Searched for 1 pattern (ctrl+o to expand)

● Updated plan
  ⎿  /plan to preview

─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 Ready to code?

 Here is Claude's plan:
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
 Task 2607170910 — Cloudflare tunnel 404 latency, Prisma update, prod-container pipeline

 Context

 todo.md task 2607170910 has three parts:

 1. Review app/errors/2607170850-cloudflare_tunnel_issues.md (suggestions derived from the Cloudflare log + both container logs) — agree/disagree and implement a fix. Constraint: Wayne
 is still collecting product images (404s stay common for a while), and the images live in a folder on his PC (bind-mounted ../hw-hydrogen-storefront/media:/app/media:ro), not inside
 the container — both must keep working.
 2. Prisma update notice 6.19.3 → 7.8.0 (app/errors/2607170853-container_prisma_update.md).
 3. Design how a future production container gets updated after every dev rebuild without rebuilding on prod — changes just get uploaded and take effect.

 Wayne's decisions (asked this session): prod will run on a remote server/VPS; deploy flow = registry push/pull; Prisma 7 = defer (blocked upstream).

 Findings — verdict on the suggestions file

 Suggestion 1 (slow 404 images) — AGREE, with a sharper root cause.
 Confirmed in app/errors/hw-hydrogen.log: 404s take 353–755 ms vs 2–9 ms for 200s. The media.suppliers.$.tsx loader itself 404s quickly; the cost is in server.ts:

 - Every /media/... request runs the full catch-all (server.ts:62): Hydrogen context + react-router SSR pipeline.
 - The main cost: server.ts:89-97 calls storefrontRedirect() on every 404 response — confirmed via shopify-dev-mcp docs: it "queries the Storefront API to see if there is any redirect
 created for the current route". So each missing image = one live Shopify API round-trip (~350–750 ms, ZA→Shopify RTT). This also explains the Cloudflare "stream canceled by remote"
 errors (client gives up while dozens of missing-image lookups queue).

 Suggestion 2 (container restart loop) — DISAGREE, no bug exists.
 - docker inspect: RestartCount=0 on both app containers; all 6 containers on the host started the same second (06:01:21Z) = Docker daemon start at host boot (restart: unless-stopped).
 hw-storefront.log contains exactly 2 docker-start sequences with clean startups and no error between them — docker logs simply concatenates output across 2 boots. Host boot time
 (~08:01 local = 06:01Z) matches exactly.
 - "Liveness probe failure" is impossible: no healthcheck is configured anywhere.
 - "Port mismatch 5130 vs 3000" is wrong: the tunnel routes hoseworld.store→localhost:5130 (hydrogen publishes 5130:5130) and app.hoseworld.store→localhost:3458 (ui publishes
 3458:3000). Both correct.
 - Action: document only; no code change.

 Prisma 6.19.3→7.8.0 — blocked upstream, defer.
 @shopify/shopify-app-session-storage-prisma latest (9.0.1) peer-requires prisma ^6.19.0 / @prisma/client ^6.19.0 and does a bare require('@prisma/client') (noted in
 prisma/schema.prisma:10); Prisma 7 removes the classic client + Rust engine. 6.19.3 is already the newest 6.x. Upgrading would risk breaking Shopify session persistence (auth) — defer
 and silence the nag.

 Implementation

 Fix 1 — short-circuit /media at the Express layer (hw-hydrogen-storefront-node-docker/server.ts)

 Register before the existing static/vite middlewares (works in dev too — dev script also runs server.ts):

 app.use(
   '/media/suppliers',
   express.static('media/suppliers', {maxAge: '1y', immutable: true, index: false, redirect: false}),
   (req, res) => res.status(404).end(),   // instant 404 on miss — never reaches the SSR pipeline
 );

 - Hits are served straight from the bind-mounted host folder (new images Wayne drops in appear immediately, no rebuild needed — mount is read per-request). Misses 404 in ~1 ms.
 express.static also fixes the hardcoded image/jpeg Content-Type and handles traversal/Range itself.
 - Belt-and-braces in the catch-all: skip redirect lookups for media paths —
 if (response.status === 404 && !new URL(request.url).pathname.startsWith('/media/')) before calling storefrontRedirect (server.ts:89).
 - Keep app/routes/media.suppliers.$.tsx as a now-unreachable fallback (zero cost; still covers any non-Express context).
 - Rebuild + recreate the hydrogen container (docker compose build && docker compose up -d).

 Fix 2 — restart "loop": documentation only (no change)

 Recorded in the timestamped todo as a non-issue with the evidence above.

 Fix 3 — Prisma: defer + silence

 - No version change. Add PRISMA_HIDE_UPDATE_MESSAGE: "1" to hw-storefront-ui-node-docker/docker-compose.yml environment: so npm run setup stops nagging on every start.
 - Document the re-check trigger: upgrade to Prisma 7 only once @shopify/shopify-app-session-storage-prisma publishes a release whose peerDependencies allow prisma ^7 (check npm view
 @shopify/shopify-app-session-storage-prisma@latest peerDependencies), then follow https://pris.ly/d/major-version-upgrade (SQLite driver adapter, generator change, db.server.js
 constructor).
 - Container recreate for the env var (can ride along with any next ui-repo rebuild; it's cosmetic).

 Fix 4 — prod-container update pipeline (registry push/pull, remote VPS)

 Per repo (hw-hydrogen-storefront-node-docker, hw-storefront-ui-node-docker):

 1. Tag images: in dev docker-compose.yml, add image: ${REGISTRY:-docker.io/<namespace>}/hw-hydrogen-storefront:${TAG:-latest} (resp. hw-storefront-ui) alongside build: . so local
 builds are push-ready.
 2. docker-compose.prod.yml (new, in each repo): image: only — no build: — plus prod bind mounts (/srv/hoseworld/media:/app/media:ro for hydrogen; sqlite/suppliers/data paths for ui),
 env_file: .env.production (never baked into the image), ports, restart: unless-stopped.
 3. scripts/release.sh (new, hydrogen repo root, handles both repos): reads repo-root VERSION → docker compose build → tag :$(VERSION) + :latest → docker push both. Registry
 namespace/login is a manual one-time Wayne step (Docker Hub private or GHCR — parameterized via REGISTRY).
 4. Prod update procedure (documented in a new guides/production-deploy.md): on the VPS, docker compose -f docker-compose.prod.yml pull && docker compose -f docker-compose.prod.yml up
 -d. No rebuild ever happens on prod; rollback = TAG=<old VERSION> ... up -d.
 5. Images folder on prod: rsync -av --delete ~/…/hw-hydrogen-storefront/media/suppliers/ vps:/srv/hoseworld/media/suppliers/ — because Fix 1 serves from the bind mount per-request,
 newly rsynced images appear on prod with no container restart, which is exactly the "still collecting images" requirement.
 6. Note in the guide: when hoseworld.store traffic moves to the VPS, run the [[hoseworld-domain-migration-checklist]] memory items (cloudflared tunnel config moves too).

 This session delivers the files/scripts/docs; actual registry account + first push are Wayne's manual steps (needs his credentials).

 Files to modify / create

 - hw-hydrogen-storefront-node-docker/server.ts — media static handler + storefrontRedirect gate
 - hw-hydrogen-storefront-node-docker/docker-compose.yml — image: tag
 - hw-hydrogen-storefront-node-docker/docker-compose.prod.yml — NEW
 - hw-hydrogen-storefront-node-docker/scripts/release.sh — NEW
 - hw-hydrogen-storefront-node-docker/guides/production-deploy.md — NEW
 - hw-storefront-ui-node-docker/docker-compose.yml — image: tag + PRISMA_HIDE_UPDATE_MESSAGE
 - hw-storefront-ui-node-docker/docker-compose.prod.yml — NEW
     - hw-hydrogen-storefront-node-docker/guides/production-deploy.md — NEW
     - hw-storefront-ui-node-docker/docker-compose.yml — image: tag + PRISMA_HIDE_UPDATE_MESSAGE
     - hw-storefront-ui-node-docker/docker-compose.prod.yml — NEW
     - hw-hydrogen-storefront-node-docker/VERSION — 2026.07.16 → 2026.07.17
     - hw-hydrogen-storefront-node-docker/2607170910_todo.md — full resolution write-up (todo.md itself untouched)

     Verification

     1. Rebuild + recreate hydrogen container; docker logs (morgan) must show /media/... 404s at <10 ms (was 350–755 ms) and 200s unchanged/faster.
     2. curl -o /dev/null -w '%{http_code} %{time_total}\n' against localhost:5130 for one known-present and one known-missing image; repeat via https://hoseworld.store.
     3. Playwright MCP: load a collection page + a product detail page on https://hoseworld.store — images render, no console/image regressions (first request after recreate may
     500/ETIMEDOUT once; retry).
     4. Drop-in test: touch a new dummy jpg into the host media folder, confirm it serves 200 without any container restart, then remove it.
     5. docker compose -f docker-compose.prod.yml config in both repos to validate the prod compose files; bash -n scripts/release.sh.
     6. Wrap-up per ritual: qdrant-store session summary (MCP-Bridge), update 2607170910_todo.md. No git commits (Wayne commits manually).

● Plan approved — implementing. Starting with the server.ts media short-circuit.

● Update(server.ts)
  ⎿  Added 19 lines
      43  
      44  let vite: import('vite').ViteDevServer | undefined;
      45  
      46 +// Serve supplier images straight from disk (the read-only host bind mount),                                                                                            
      47 +// short-circuiting the SSR pipeline entirely. Without this, every request —                                                                                            
      48 +// including the very common miss (the image set is still being collected) —                                                                                            
      49 +// ran through the full react-router render AND storefrontRedirect()'s live                                                                                             
      50 +// Storefront-API urlRedirects query, turning a "file not found" into a                                                                                                 
      51 +// 350–750ms Shopify round-trip (observed in hw-hydrogen.log; caused the                                                                                                
      52 +// Cloudflare stream-cancellation errors). New files dropped into the host                                                                                              
      53 +// folder are picked up per-request — no rebuild or restart needed.                                                                                                     
      54 +app.use(                                                                                                                                                                
      55 +  '/media/suppliers',                                                                                                                                                   
      56 +  express.static('media/suppliers', {                                                                                                                                   
      57 +    maxAge: '1y',                                                                                                                                                       
      58 +    immutable: true,                                                                                                                                                    
      59 +    index: false,                                                                                                                                                       
      60 +    redirect: false,                                                                                                                                                    
      61 +  }),                                                                                                                                                                   
      62 +  (_req, res) => res.status(404).end(),                                                                                                                                 
      63 +);                                                                                                                                                                      
      64 +                                                                                                                                                                        
      65  if (isProduction) {
      66    app.use(morgan('tiny'));
      67    app.use(

● Update(server.ts)
  ⎿  Added 8 lines, removed 1 line
      105        );
      106      }
      107  
      108 -    if (response.status === 404) {                                                                                                                                     
      108 +    if (                                                                                                                                                               
      109 +      response.status === 404 &&                                                                                                                                       
      110 +      !new URL(request.url).pathname.startsWith('/media/')                                                                                                             
      111 +    ) {                                                                                                                                                                
      112        // Check for redirects only when there's a 404 from the app. If the
      113        // redirect doesn't exist, storefrontRedirect passes through the 404.
      114 +      // /media/ paths never have Shopify URL redirects — each lookup is a                                                                                             
      115 +      // live Storefront API query, so a missing image must not trigger one                                                                                            
      116 +      // (belt-and-braces; the express.static handler above already catches                                                                                            
      117 +      // these before they reach the router).                                                                                                                          
      118        response = await storefrontRedirect({
      119          request,
      120          response,

● Update(docker-compose.yml)
  ⎿  Added 5 lines
       1  services:
       2    hydrogen-storefront:
       3      build: .
       4 +    # Tag local builds so they're push-ready for the production registry flow                                                                                           
       5 +    # (see guides/production-deploy.md). REGISTRY example: docker.io/<namespace>                                                                                        
       6 +    # or ghcr.io/<user>. TAG normally comes from the repo-root VERSION file via                                                                                         
       7 +    # scripts/release.sh; plain `docker compose build` still works unchanged.                                                                                           
       8 +    image: ${REGISTRY:-hoseworld}/hw-hydrogen-storefront:${TAG:-latest}                                                                                                 
       9      restart: unless-stopped
      10      ports:
      11        - "5130:5130"

● Bash(cd ../hw-storefront-ui-node-docker && git status --short | head -5 && git branch --show-current)
  ⎿  node-docker-migration
  ⎿  Shell cwd was reset to /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker
  ⎿  Allowed by auto mode classifier

● Update(~/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/docker-compose.yml)
  ⎿  Added 3 lines
      1  services:
      2    storefront-ui:
      3      build: .
      4 +    # Tag local builds so they're push-ready for the production registry flow                                                                                            
      5 +    # (see ../hw-hydrogen-storefront-node-docker/guides/production-deploy.md).                                                                                           
      6 +    image: ${REGISTRY:-hoseworld}/hw-storefront-ui:${TAG:-latest}                                                                                                        
      7      restart: unless-stopped
      8      ports:
      9        - "3458:3000"
  ⎿  Allowed by auto mode classifier

● Update(~/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/docker-compose.yml)
  ⎿  Added 7 lines
      26        - .env
      27      environment:
      28        DATABASE_URL: file:/app/prisma/dev.sqlite
      29 +      # Prisma 6.19.3 -> 7.x major upgrade is DEFERRED: the latest                                                                                                      
      30 +      # @shopify/shopify-app-session-storage-prisma (9.0.1) peer-requires                                                                                               
      31 +      # prisma ^6.19.0 and bare-requires('@prisma/client'), which Prisma 7                                                                                              
      32 +      # removes. Re-check when that package's peerDependencies allow ^7,                                                                                                
      33 +      # then follow https://pris.ly/d/major-version-upgrade. Until then,                                                                                                
      34 +      # silence the update nag printed by `npm run setup` on every start.                                                                                               
      35 +      PRISMA_HIDE_UPDATE_MESSAGE: "1"                                                                                                                                   
      36        HYDROGEN_MEDIA_SUPPLIERS_DIR: /app/hydrogen-media-suppliers
      37        APP_DATA_DIR: /app/data
      38  
  ⎿  Allowed by auto mode classifier

● Write(docker-compose.prod.yml)
  ⎿  Wrote 32 lines to docker-compose.prod.yml
       1 # Production compose file — runs on the remote VPS. There is deliberately NO
       2 # `build:` section: production never rebuilds. The dev machine builds and
       3 # pushes a version-tagged image (scripts/release.sh) and the VPS only pulls:
       4 #
       5 #   REGISTRY=<registry>/<namespace> TAG=<VERSION> \
       6 #     docker compose -f docker-compose.prod.yml pull && \
       7 #   REGISTRY=<registry>/<namespace> TAG=<VERSION> \
       8 #     docker compose -f docker-compose.prod.yml up -d
       9 #
      10 # Rollback = rerun with an older TAG. Full procedure: guides/production-deploy.md
     … +22 lines (ctrl+o to expand)

● Write(~/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/docker-compose.prod.yml)
  ⎿  Wrote 35 lines to ../hw-storefront-ui-node-docker/docker-compose.prod.yml
       1 # Production compose file — runs on the remote VPS. No `build:` on purpose:
       2 # production only pulls images built+pushed from the dev machine
       3 # (../hw-hydrogen-storefront-node-docker/scripts/release.sh). Procedure:
       4 # ../hw-hydrogen-storefront-node-docker/guides/production-deploy.md
       5 services:
       6   storefront-ui:
       7     image: ${REGISTRY:-hoseworld}/hw-storefront-ui:${TAG:-latest}
       8     restart: unless-stopped
       9     ports:
      10       - "3458:3000"
     … +25 lines (ctrl+o to expand)
  ⎿  Allowed by auto mode classifier

● Write(scripts/release.sh)
  ⎿  Wrote 59 lines to scripts/release.sh
       1 #!/usr/bin/env bash
       2 # Build + tag + push production images for both hoseworld containers.
       3 # Run from anywhere on the DEV machine; production never builds (it pulls).
       4 #
       5 # Usage:
       6 #   REGISTRY=docker.io/<namespace> ./scripts/release.sh          # build+push both
       7 #   REGISTRY=ghcr.io/<user> ./scripts/release.sh hydrogen        # just hydrogen
       8 #   REGISTRY=... ./scripts/release.sh ui                         # just storefront-ui
       9 #   REGISTRY=... PUSH=0 ./scripts/release.sh                     # build+tag only
      10 #
     … +49 lines (ctrl+o to expand)

❯ Before you complete this task we are going to have to change the font size for the "price" specifically for the small screen:                                                          
  - please reduct the font size by 1pt and apply to all screen sizes                                                                                                                     
    - hw-hydrogen-storefront-node-docker/app/errors/260717092143-errors.jpeg shows the issue                                                                                             
    - Please confirm with the image that 1pt will be sufficiant and that we don't need to reduce by 2pt?                                                                                 

  Searched for 1 pattern, read 2 files (ctrl+o to expand)

  Listed 1 directory, called playwright-shared-docker 9 times (ctrl+o to expand)

● Update(app/styles/app.css)
  ⎿  Added 7 lines, removed 1 line
      144    font-weight: 250;
      145  }
      146  
      147 +/* Price is 12px at every tier (task 2607170910, -2pt from 14px): the widest                                                                                           
      148 +   real price (ZAR 146,497.59) measures 103.8px at 14px / 96.4px at 13px but                                                                                           
      149 +   only ~91px fits a card on Wayne's phone (effective ~305px viewport), and                                                                                            
      150 +   the Intl currency formatter uses a non-breaking space so the price can                                                                                              
      151 +   never wrap — 12px (89px) is the first size that fits. Measured live via                                                                                             
      152 +   canvas measureText with the element's real font stack. */                                                                                                           
      153  .product-price-display {
      148 -  font-size: 14px;                                                                                                                                                     
      154 +  font-size: 12px;                                                                                                                                                     
      155    font-weight: 400;
      156  }
      157  

● Update(app/styles/app.css)
  ⎿  Added 1 line, removed 1 line
      175    }
      176  
      177    .product-price-display {
      178 -    font-size: 14px;                                                                                                                                                   
      178 +    font-size: 12px;                                                                                                                                                   
      179      font-weight: 500;
      180    }
      181  

● Update(app/styles/app.css)
  ⎿  Added 1 line, removed 1 line
      200    }
      201  
      202    .product-price-display {
      203 -    font-size: 0.875rem;                                                                                                                                               
      203 +    font-size: 0.75rem;                                                                                                                                                
      204      font-weight: 600;
      205    }
      206  

● Update(app/styles/app.css)
  ⎿  Added 4 lines, removed 4 lines
      119     its h1/h3/p/price/table rules are declared together with .product-card's.
      120  
      121     Three tiers (task 2607161525; small tier +2pt and medium re-midpointed
      122 -   per Wayne, task 2607161650):                                                                                                                                        
      122 +   per Wayne, task 2607161650; price -2pt at all tiers, task 2607170910):                                                                                              
      123     - Small (default, <45em): title 12px/350, brand/type/body 11px/250,
      124 -     price 14px/400.                                                                                                                                                   
      124 +     price 12px/400.                                                                                                                                                   
      125     - Medium (45em–64em): midpoints between small and large —
      126 -     title 15px/350, body 13px/275, price 14px/500.                                                                                                                    
      126 +     title 15px/350, body 13px/275, price 12px/500.                                                                                                                    
      127     - Large (>=64em): original (pre-shrink) sizes with adjusted weights —
      128 -     title 1.1rem/350, body 1rem/300, price 0.875rem/600 (task 2607161425). */                                                                                         
      128 +     title 1.1rem/350, body 1rem/300, price 0.75rem/600. */                                                                                                            
      129  .product-card h3,
      130  .product-main h1,
      131  .product-main h3 {

● Write(guides/production-deploy.md)
  ⎿  Wrote 75 lines to guides/production-deploy.md
       1 # Production deploy — update the prod containers without rebuilding them
       2 
       3 Task 2607170910. Applies to both containers:
       4 `hw-hydrogen-storefront` (this repo) and `hw-storefront-ui` (../hw-storefront-ui-node-docker).
       5 
       6 ## The model
       7
       8 - **Dev machine builds, production only pulls.** Every rebuild of the
       9   development container produces a version-tagged image; production picks up
      10   the change with `docker compose pull && up -d` — it never runs `docker build`.
     … +65 lines (ctrl+o to expand)

● Write(VERSION)
  ⎿  Error writing file

  Read 1 file (ctrl+o to expand)

● Write(VERSION)
  ⎿  Added 1 line, removed 1 line
      1 -2026.07.16                                                                                                                                                               
      1   No newline at end of file
      2 +2026.07.17                                                                                                                                                               
     
● Bash(printf '2026.07.17' > VERSION && xxd VERSION | tail -1; grep -n "VERSION" app/components/Footer.tsx | head -3)
  ⎿  00000000: 3230 3236 2e30 372e 3137                 2026.07.17
     4:import VERSION from '../../VERSION?raw';
     60:      <span className="footer-version">v{VERSION.trim()}</span>

● Bash(chmod +x scripts/release.sh && bash -n scripts/release.sh && echo script-ok; REGISTRY=docker.io/test TAG=2026.07.17 docker compose -f docker-compose.prod.yml co…)
  ⎿  Error: Exit code 1
     script-ok
     env file /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker/.env.production not found: stat 
     /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker/.env.production: no such file or directory
     env file /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/.env.production not found: stat 
     /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/.env.production: no such file or directory

● Bash(cd /home/rogue/Data/data/coding/github/shopify/app/hoseworld && touch hw-hydrogen-storefront-node-docker/.env.production hw-storefront-ui-node-docker/.env.produ…)
  ⎿  hydrogen-prod-ok
     ui-prod-ok
     ui-dev-ok
     hydrogen-dev-ok
  ⎿  Shell cwd was reset to /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker
  ⎿  Allowed by auto mode classifier

● Bash(docker compose build 2>&1 | tail -5 && docker compose up -d 2>&1 | tail -3)
  ⎿  #12 DONE 0.3s

     #13 resolving provenance for metadata file
     … +5 lines (ctrl+o to expand)
  ⎿  (timeout 10m)

● Bash(sleep 5; docker logs hw-hydrogen-storefront-node-docker-hydrogen-storefront-1 --since 2m 2>&1 | head -10)
  ⎿  Already up to date
     Done in 294ms using pnpm v11.10.0
     $ cross-env NODE_ENV=production tsx server.ts
     Express server listening at http://0.0.0.0:5130

● Server is up. Verifying the 404 fix with curl timings against a known-present and known-missing image:

● Bash(for f in BZ457530.jpg FC3M1500.jpg; do for i in 1 2; do curl -s -o /dev/null -w "$f try$i: %{http_code} %{time_total}s ct=%{content_type}\n" "http://localhost:5…)
  ⎿  BZ457530.jpg try1: 200 0.004504s ct=image/jpeg
     BZ457530.jpg try2: 200 0.002154s ct=image/jpeg
     FC3M1500.jpg try1: 404 0.000790s ct=
     … +3 lines (ctrl+o to expand)
  ⎿  Allowed by auto mode classifier

● Bash(cp media/suppliers/agri/BZ457530.jpg /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront/media/suppliers/agri/CLAUDE-DROPIN-TEST.jp…)
  ⎿  dropin: 200 0.002523s
  ⎿  Allowed by auto mode classifier

● Bash(curl -s -o /dev/null -w "live-hit: %{http_code} %{time_total}s\n" "https://hoseworld.store/media/suppliers/agri/BZ457530.jpg"; curl -s -o /dev/null -w "live-mis…)
  ⎿  live-hit: 200 2.449901s
     live-miss: 404 1.004215s
     
● Bash(for i in 1 2 3; do curl -s -o /dev/null -w "live-miss$i: %{http_code} %{time_total}s\n" "https://hoseworld.store/media/suppliers/agri/FC3M1500.jpg"; done; docke…)
  ⎿  live-miss1: 404 0.795870s
     live-miss2: 404 0.799279s
     live-miss3: 404 0.795211s
     … +4 lines (ctrl+o to expand)
  ⎿  Allowed by auto mode classifier

● Update(server.ts)
  ⎿  Removed 19 lines
      43  
      44  let vite: import('vite').ViteDevServer | undefined;
      45  
      46 -// Serve supplier images straight from disk (the read-only host bind mount),                                                                                            
      47 -// short-circuiting the SSR pipeline entirely. Without this, every request —                                                                                            
      48 -// including the very common miss (the image set is still being collected) —                                                                                            
      49 -// ran through the full react-router render AND storefrontRedirect()'s live                                                                                             
      50 -// Storefront-API urlRedirects query, turning a "file not found" into a                                                                                                 
      51 -// 350–750ms Shopify round-trip (observed in hw-hydrogen.log; caused the                                                                                                
      52 -// Cloudflare stream-cancellation errors). New files dropped into the host                                                                                              
      53 -// folder are picked up per-request — no rebuild or restart needed.                                                                                                     
      54 -app.use(                                                                                                                                                                
      55 -  '/media/suppliers',                                                                                                                                                   
      56 -  express.static('media/suppliers', {                                                                                                                                   
      57 -    maxAge: '1y',                                                                                                                                                       
      58 -    immutable: true,                                                                                                                                                    
      59 -    index: false,                                                                                                                                                       
      60 -    redirect: false,                                                                                                                                                    
      61 -  }),                                                                                                                                                                   
      62 -  (_req, res) => res.status(404).end(),                                                                                                                                 
      63 -);                                                                                                                                                                      
      64 -                                                                                                                                                                        
      46  if (isProduction) {
      47    app.use(morgan('tiny'));
      48    app.use(

● Update(server.ts)
  ⎿  Added 21 lines
      59    app.use(vite.middlewares);
      60  }
      61  
      62 +// Serve supplier images straight from disk (the read-only host bind mount),                                                                                            
      63 +// short-circuiting the SSR pipeline entirely. Without this, every request —                                                                                            
      64 +// including the very common miss (the image set is still being collected) —                                                                                            
      65 +// ran through the full react-router render AND storefrontRedirect()'s live                                                                                             
      66 +// Storefront-API urlRedirects query, turning a "file not found" into a                                                                                                 
      67 +// 350–750ms Shopify round-trip (observed in hw-hydrogen.log; caused the                                                                                                
      68 +// Cloudflare stream-cancellation errors). New files dropped into the host                                                                                              
      69 +// folder are picked up per-request — no rebuild or restart needed.                                                                                                     
      70 +// Registered after morgan on purpose: the 404 log lines are how missing                                                                                                
      71 +// images get noticed while the image set is still being collected.                                                                                                     
      72 +app.use(                                                                                                                                                                
      73 +  '/media/suppliers',                                                                                                                                                   
      74 +  express.static('media/suppliers', {                                                                                                                                   
      75 +    maxAge: '1y',                                                                                                                                                       
      76 +    immutable: true,                                                                                                                                                    
      77 +    index: false,                                                                                                                                                       
      78 +    redirect: false,                                                                                                                                                    
      79 +  }),                                                                                                                                                                   
      80 +  (_req, res) => res.status(404).end(),                                                                                                                                 
      81 +);                                                                                                                                                                      
      82 +                                                                                                                                                                        
      83  app.all('*', async (req, res) => {
      84    try {
      85      const request = createFetchRequest(req, res);

● Bash(docker compose build 2>&1 | tail -2 && docker compose up -d 2>&1 | tail -1 && sleep 6 && for f in BZ457530.jpg FC3M1500.jpg; do curl -s -o /dev/null -w "$f: %{h…)
  ⎿  #13 DONE 0.0s
      Image hoseworld/hw-hydrogen-storefront:latest Built
      Container hw-hydrogen-storefront-node-docker-hydrogen-storefront-1 Started
     … +5 lines (ctrl+o to expand)
  ⎿  (timeout 10m)
  ⎿  Allowed by auto mode classifier

  Called playwright-shared-docker 2 times (ctrl+o to expand)

● Large tier confirmed live at 12px/600. Now the small-screen tier with the worst-case price:

  Called playwright-shared-docker 2 times (ctrl+o to expand)

● 280px is the extreme floor — Wayne's phone measured ~305px effective. Checking at that width:

  Read 2 files, called playwright-shared-docker 5 times (ctrl+o to expand)

● Update(2607170910_todo.md)
  ⎿  Added 135 lines, removed 1 line
       36  - update with latest updated project plan and any new issues found, the errors causing the issue and the step by step resolution:
       37      - hoseworld-dev-knowledge and any other MCP server that is relevent
       38  
       39 -## --                                                                                                                                                                  
       39   No newline at end of file
       40 +## --                                                                                                                                                                  
       41 +                                                                                                                                                                       
       42 +---                                                                                                                                                                    
       43 +                                                                                                                                                                       
       44 +# RESOLUTION — session 2607170910 (2026-07-17)                                                                                                                         
       45 +                                                                                                                                                                       
       46 +**VERSION: 2026.07.16 → 2026.07.17** (footer shows it after the hydrogen container rebuild done this session)                                                          
       47 +                                                                                                                                                                       
       48 +## 1. Cloudflare tunnel suggestions file (2607170850) — verdict and fix                                                                                                
       49 +                                                                                                                                                                       
       50 +### Suggestion 1: "Slow 404 image requests (750ms+)" — AGREED, fixed, live-verified                                                                                    
       51 +                                                                                                                                                                       
       52 +**Actual root cause (sharper than the file's "booting the entire app"):** every                                                                                        
       53 +`/media/suppliers/*` request ran through the Express catch-all into the full                                                                                           
       54 +react-router SSR pipeline, and — the dominant cost — `server.ts` called                                                                                                
       55 +Hydrogen's `storefrontRedirect()` on **every 404**. Confirmed via shopify-dev-mcp                                                                                      
       56 +docs: storefrontRedirect "queries the Storefront API to see if there is any                                                                                            
       57 +redirect created for the current route". So each missing image = one live                                                                                              
       58 +Shopify API round-trip (~350–750ms, matching hw-hydrogen.log exactly: 404s                                                                                             
       59 +353–755ms vs 200s 2.3–8.6ms). Dozens of parallel missing-image lookups per                                                                                             
       60 +page is what triggered the Cloudflare "stream canceled by remote" errors.                                                                                              
       61 +                                                                                                                                                                       
       62 +**Fix (`server.ts`):**                                                                                                                                                 
       63 +1. `express.static('media/suppliers', {maxAge:'1y', immutable, index:false, redirect:false})`                                                                          
       64 +   mounted at `/media/suppliers`, followed by an instant `404` handler —                                                                                               
       65 +   registered after morgan (so missing-image log lines are kept for tracking                                                                                           
       66 +   which images are still to be collected) but before the SSR catch-all.                                                                                               
       67 +2. Belt-and-braces: the catch-all now skips `storefrontRedirect()` for any                                                                                             
       68 +   `/media/` path (no Shopify redirect can exist for those).                                                                                                           
       69 +3. `app/routes/media.suppliers.$.tsx` kept as a now-unreachable fallback.                                                                                              
       70 +                                                                                                                                                                       
       71 +**Constraints honored:** images stay OUTSIDE the container (host bind mount                                                                                            
       72 +`../hw-hydrogen-storefront/media:/app/media:ro`); express.static reads the                                                                                             
       73 +mount per-request, so images Wayne is still collecting can be dropped into the                                                                                         
       74 +host folder and serve immediately — verified live with a drop-in test file                                                                                             
       75 +(200 in 2.5ms, zero restart/rebuild).                                                                                                                                  
       76 +                                                                                                                                                                       
       77 +**Live verification (after `docker compose build && up -d`):**                                                                                                         
       78 +- miss: 404 in **0.4–1.1ms** (was 353–755ms — ~500x faster); hit: 200 in 2–7ms, correct Content-Type                                                                   
       79 +- path traversal (`/media/suppliers/../../package.json`) → 404                                                                                                         
       80 +- via https://hoseworld.store: hit 200 / miss 404, no stream errors                                                                                                    
       81 +- a real visitor's miss (`MSSET120605AN_3.jpg`) already served at 0.36ms in the container log                                                                          
       82 +                                                                                                                                                                       
       83 +### Suggestion 2: "Container restart loop" — DISAGREED, no bug exists                                                                                                  
       84 +                                                                                                                                                                       
       85 +Evidence (all checked live):                                                                                                                                           
       86 +- `docker inspect`: **RestartCount=0** on both app containers; ALL six                                                                                                 
       87 +  containers on the host started the same second (06:01:21Z ≈ 08:01 local =                                                                                            
       88 +  host boot). `restart: unless-stopped` brings everything up at daemon start.                                                                                          
       89 +- hw-storefront.log contains exactly 2 clean `docker-start` sequences with no                                                                                          
       90 +  error between them — `docker logs` concatenates output across 2 host boots.                                                                                          
       91 +- "Liveness probe failure": impossible — no healthcheck is configured anywhere.                                                                                        
       92 +- "Port mismatch 5130 vs 3000": wrong — cloudflared routes                                                                                                             
       93 +  `hoseworld.store→localhost:5130` (hydrogen publishes 5130:5130) and                                                                                                  
       94 +  `app.hoseworld.store→localhost:3458` (storefront-ui publishes 3458:3000). Both correct.                                                                              
       95 +                                                                                                                                                                       
       96 +No change made. (The slow-404 fix removes the load that made the suggestion plausible.)                                                                                
       97 +                                                                                                                                                                       
       98 +## 2. Prisma 6.19.3 → 7.8.0 — DEFERRED (blocked upstream), nag silenced                                                                                                
       99 +                                                                                                                                                                       
      100 +- `@shopify/shopify-app-session-storage-prisma` latest (9.0.1) peer-requires                                                                                           
      101 +  `prisma ^6.19.0` / `@prisma/client ^6.19.0` and bare-`require`s                                                                                                      
      102 +  `'@prisma/client'` (see prisma/schema.prisma comment) — Prisma 7 removes the                                                                                         
      103 +  classic client + Rust engine, so upgrading now risks breaking Shopify session                                                                                        
      104 +  persistence (login/auth). 6.19.3 is already the newest 6.x.                                                                                                          
      105 +- Added `PRISMA_HIDE_UPDATE_MESSAGE: "1"` to hw-storefront-ui-node-docker's                                                                                            
      106 +  docker-compose.yml (dev + prod) so `npm run setup` stops printing the nag.                                                                                           
      107 +  Takes effect on that container's next rebuild/recreate (cosmetic only).                                                                                              
      108 +- **Re-check trigger:** `npm view @shopify/shopify-app-session-storage-prisma@latest peerDependencies`                                                                 
      109 +  — once it allows `^7`, follow https://pris.ly/d/major-version-upgrade                                                                                                
      110 +  (SQLite driver adapter, generator change, db.server.js constructor). Any dep                                                                                         
      111 +  change is automatically covered by the Dockerfile (`COPY package.json` +                                                                                             
      112 +  `npm install` at build).                                                                                                                                             
      113 +                                                                                                                                                                       
      114 +## 3. Production container update pipeline — built (registry push/pull, remote VPS)                                                                                    
      115 +                                                                                                                                                                       
      116 +Decision (Wayne, this session): prod runs on a remote VPS; deploy = registry push/pull.                                                                                
      117 +**Prod never rebuilds — it only pulls images the dev machine already built.**                                                                                          
      118 +                                                                                                                                                                       
      119 +- Both dev docker-compose.yml files now tag builds:                                                                                                                    
      120 +  `image: ${REGISTRY:-hoseworld}/hw-hydrogen-storefront:${TAG:-latest}` (resp. hw-storefront-ui)                                                                       
      121 +- NEW `docker-compose.prod.yml` in both repos: `image:` only (no `build:`),                                                                                            
      122 +  state under `/srv/hoseworld/` bind mounts, `env_file: .env.production`                                                                                               
      123 +  (VPS-only, never committed/baked in)                                                                                                                                 
      124 +- NEW `scripts/release.sh` (this repo): reads VERSION → builds both repos via                                                                                          
      125 +  their normal compose build → tags `:VERSION` + `:latest` → pushes                                                                                                    
      126 +- NEW `guides/production-deploy.md`: one-time setup (registry login, /srv dirs,                                                                                        
      127 +  sqlite seed, domain-migration checklist pointer) + the per-release two                                                                                               
      128 +  commands on the VPS: `docker compose -f docker-compose.prod.yml pull && up -d`;                                                                                      
      129 +  rollback = older TAG                                                                                                                                                 
      130 +- Supplier images on prod: `rsync` into `/srv/hoseworld/media/suppliers/` —                                                                                            
      131 +  served immediately per-request thanks to fix 1, no restart/rebuild                                                                                                   
      132 +- Wayne's manual one-time steps: pick private registry namespace                                                                                                       
      133 +  (docker.io/<ns> or ghcr.io/<user>), `docker login` on dev + VPS                                                                                                      
      134 +- All 4 compose files validated with `docker compose config`; `bash -n` on release.sh                                                                                  
      135 +                                                                                                                                                                       
      136 +## 4. Mid-session addition: price font overflow on phones (260717092143-errors.jpeg)                                                                                   
      137 +                                                                                                                                                                       
      138 +Wayne asked for price −1pt on all screen sizes and to confirm whether −1pt                                                                                             
      139 +suffices or −2pt is needed. **Measured: −2pt is required, −1pt is not enough.**                                                                                        
      140 +                                                                                                                                                                       
      141 +- Measured live (canvas measureText with the element's real font stack): widest                                                                                        
      142 +  real price "ZAR 146,497.59" = 103.8px @14px, 96.4px @13px, 89px @12px.                                                                                               
      143 +- From the screenshot's geometry his phone's effective CSS viewport ≈ 305px                                                                                            
      144 +  → card content width 91px (measured live at that viewport). The Intl currency                                                                                        
      145 +  formatter uses a non-breaking space, so the price can never wrap.                                                                                                    
      146 +- ⇒ 13px still overflows by ~5px; 12px fits with ~2px margin.                                                                                                          
      147 +- Applied in app.css: `.product-price-display` 14px→**12px** (small), 14px→**12px**                                                                                    
      148 +  (medium 45–64em), 0.875rem→**0.75rem** (large ≥64em); weights unchanged                                                                                              
      149 +  (400/500/600). Tier comment block updated.                                                                                                                           
      150 +- Live-verified via Playwright getComputedStyle (per standing rule — not                                                                                               
      151 +  screenshots): 12px at 305px/280px/1280px viewports; worst-case price FITS at                                                                                         
      152 +  305px; product detail page price also 12px; no horizontal page overflow.                                                                                             
      153 +- Residual edge: below ~290px effective viewport a 6-digit price would still                                                                                           
      154 +  poke out a few px even at 12px — if that ever shows up, allow                                                                                                        
      155 +  `overflow-wrap: anywhere` on `.product-price-display` rather than shrinking                                                                                          
      156 +  further. **Wayne to confirm on his phone** (standing rule for phone-reported issues).                                                                                
      157 +                                                                                                                                                                       
      158 +## Files changed this session                                                                                                                                          
      159 +                                                                                                                                                                       
      160 +- hw-hydrogen-storefront-node-docker/server.ts — media static short-circuit + storefrontRedirect gate                                                                  
      161 +- hw-hydrogen-storefront-node-docker/app/styles/app.css — price 12px all tiers + comment                                                                               
      162 +- hw-hydrogen-storefront-node-docker/docker-compose.yml — image tag                                                                                                    
      163 +- hw-hydrogen-storefront-node-docker/docker-compose.prod.yml — NEW                                                                                                     
      164 +- hw-hydrogen-storefront-node-docker/scripts/release.sh — NEW                                                                                                          
      165 +- hw-hydrogen-storefront-node-docker/guides/production-deploy.md — NEW                                                                                                 
      166 +- hw-hydrogen-storefront-node-docker/VERSION — 2026.07.17                                                                                                              
      167 +- hw-hydrogen-storefront-node-docker/2607170910_todo.md — this write-up                                                                                                
      168 +- hw-storefront-ui-node-docker/docker-compose.yml — image tag + PRISMA_HIDE_UPDATE_MESSAGE                                                                             
      169 +- hw-storefront-ui-node-docker/docker-compose.prod.yml — NEW                                                                                                           
      170 +                                                                                                                                                                       
      171 +Hydrogen container rebuilt + recreated this session (fixes are live).                                                                                                  
      172 +Storefront-ui container NOT rebuilt (its only change is the cosmetic env var +                                                                                         
      173 +image tag — rides along with its next rebuild).                                                                                                                        
      174 +No git commits (Wayne commits manually).                                                                                                                               
      175   No newline at end of file

● Now logging the session to MCP-Bridge (qdrant-store) and updating the stale price values in my auto-memory:

  Called MCP-Bridge, wrote 1 memory (ctrl+o to expand)

● Bash(git status --short; echo ---UI---; git -C ../hw-storefront-ui-node-docker status --short)
  ⎿   M 2607170910_todo.md
      M VERSION
      M app/styles/app.css
     … +9 lines (ctrl+o to expand)

● Task 2607170910 complete — all fixes are live on hoseworld.store. Here's the TLDR:

  1. Slow 404 images — fixed, and the real cause was sharper than the suggestions file

  The file's diagnosis was right in spirit, but the dominant cost wasn't generic routing: server.ts calls Hydrogen's storefrontRedirect() on every 404, which (confirmed via
  shopify-dev-mcp docs) makes a live Shopify Storefront API query per missing image — that's the 350–755ms. Fix: /media/suppliers is now served by express.static straight off the bind
  mount with an instant 404 on miss, plus the catch-all skips redirect lookups for /media/ paths. Verified live after rebuild: misses 404 in 0.4–1.1ms (~500× faster), hits unchanged,
  traversal guarded, and a drop-in test image served immediately with no restart — your still-collecting-images workflow keeps working exactly as before (I kept the handler after morgan
  so the 404 log lines still show which images are missing).

  2. "Container restart loop" — I disagree; there is no loop

  docker inspect shows RestartCount=0 on both containers, and all six containers on your machine started the same second (host boot — restart: unless-stopped). The log just concatenates
  output across 2 reboots. There's also no healthcheck configured (so no probe could be killing anything), and the "port mismatch" claim is wrong — the tunnel correctly routes
  hoseworld.store→5130 and app.hoseworld.store→3458. No change needed.

  3. Prisma 7 — deferred, it's blocked upstream

  3. Prisma 7 — deferred, it's blocked upstream

  @shopify/shopify-app-session-storage-prisma (latest, 9.0.1) still requires Prisma ^6.19 and requires the classic @prisma/client that Prisma 7 removes — upgrading now would risk your
  Shopify session/auth. You're already on the newest 6.x. I silenced the update nag via PRISMA_HIDE_UPDATE_MESSAGE in the ui compose and documented the re-check trigger in the todo.

  4. Production updates without rebuilding — pipeline built (per your answers: VPS + registry)

  New docker-compose.prod.yml in both repos (pull-only, no build:), scripts/release.sh (builds both images, tags with VERSION, pushes), and guides/production-deploy.md. Updating prod =
  two commands on the VPS: pull && up -d; rollback = older tag. New supplier images just rsync to the VPS folder and serve immediately. Your one manual step: pick a private registry
  (Docker Hub/GHCR) and docker login.

  5. Price font — your question answered: 1pt is NOT enough, I applied 2pt

  I measured rather than eyeballed: the widest price ZAR 146,497.59 is 96.4px at 13px but your phone's card only has ~91px of content width (effective viewport ~305px, and the
  currency's non-breaking space means it can't wrap). At 12px it's 89px — fits. So .product-price-display is now 12px at all three tiers (weights unchanged), verified live via
  getComputedStyle at phone and desktop widths. Please confirm on your phone when you get a chance.

  VERSION bumped to 2026.07.17, resolution written to 2607170910_todo.md (todo.md untouched), session logged to MCP-Bridge. No commits made — that's yours.

✻ Crunched for 22m 51s