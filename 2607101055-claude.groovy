rogue@lnx-MS-7E27:~/Data/data/coding/github/shopify/app/hoseworld$ cd hw-hydrogen-storefront-node-docker
rogue@lnx-MS-7E27:~/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker$ claude
 ▐▛███▜▌   Claude Code v2.1.205
▝▜█████▛▘  Sonnet 5 · Claude Pro
  ▘▘ ▝▝    ~/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker
 ▐▛███▜▌   Claude Code v2.1.205
▝▜█████▛▘  Sonnet 5 · Claude Pro
 ▐▛███▜▌   Claude Code v2.1.205
▝▜█████▛▘  Sonnet 5 · Claude Pro
 ▐▛███▜▌   Claude Code v2.1.205
▝▜█████▛▘  Sonnet 5 · Claude Pro
  ▘▘ ▝▝    ~/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker

 ⚠ 1 MCP server needs authentication · run /mcp

❯ /mcp 
  ⎿  MCP dialog dismissed

❯ please make sure that the docker containers for this project both start with the system.                                                          
  Is container with "Id": "6f1a2eeada1e0ac408bc266a923a8938423fdd043ffde7e973a17c12ddf91207" needed, if not please remove                           
  
● Bash(docker ps -a --format 'table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Image}}' )
  ⎿  CONTAINER ID   NAMES                                                      STATUS                    IMAGE
     9bcc7a2798f5   WinBoat                                                    Up 35 minutes             ghcr.io/dockur/windows:5.14
     18cce1b1f1b9   hw-storefront-ui-node-docker-storefront-ui-1               Up 25 minutes             hw-storefront-ui-node-docker-storefron
     … +7 lines (ctrl+o to expand)

● Bash(docker inspect 6f1a2eeada1e0ac408bc266a923a8938423fdd043ffde7e973a17c12ddf91207 2>&1 | head -150)
  ⎿  [
         {
             "Id": "6f1a2eeada1e0ac408bc266a923a8938423fdd043ffde7e973a17c12ddf91207",
     … +147 lines (ctrl+o to expand)

● This is a leftover intermediate container from a failed docker build step (npm install --build-from-source=sqlite3 exited with code 1, dated
  2026-07-09) — not something running, not malicious. Safe to remove. Now let me check the restart policies and compose setup for the actual project
  containers.

● Bash(echo "=== hydrogen-storefront restart policy ===";
      docker inspect hw-hydrogen-storefront-node-docker-hydrogen-storefront-1 --format '{{.HostConfig.RestartPolicy…)
  ⎿  Waiting…

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 Bash command
     … +7 lines (ctrl+o to expand)

● Bash(docker inspect 6f1a2eeada1e0ac408bc266a923a8938423fdd043ffde7e973a17c12ddf91207 2>&1 | head -150)
  ⎿  [
         {
             "Id": "6f1a2eeada1e0ac408bc266a923a8938423fdd043ffde7e973a17c12ddf91207",
     … +147 lines (ctrl+o to expand)

● This is a leftover intermediate container from a failed docker build step (npm install --build-from-source=sqlite3 exited with code 1, dated
  2026-07-09) — not something running, not malicious. Safe to remove. Now let me check the restart policies and compose setup for the actual project
  containers.

● Bash(echo "=== hydrogen-storefront restart policy ===";
      docker inspect hw-hydrogen-storefront-node-docker-hydrogen-storefront-1 --format '{{.HostConfig.RestartPolicy…)
  ⎿  === hydrogen-storefront restart policy ===
     no
     === storefront-ui restart policy ===
     … +10 lines (ctrl+o to expand)

● Docker daemon itself is enabled at boot, but the two project containers (hydrogen-storefront-1, storefront-ui-1) have RestartPolicy: no, so they
  won't come back after a reboot. Let me check the compose files.

  Read 2 files (ctrl+o to expand)

● Neither compose file sets a restart policy, which is why those two containers are no. I'll add restart: unless-stopped to both, matching the
  mcp-bridge/qdrant containers, and then remove the dangling failed-build container.

● Update(docker-compose.yml)
  ⎿  Added 1 line
      1  services:
      2    hydrogen-storefront:
      3      build: .
      4 +    restart: unless-stopped                                                                                                         
      5      ports:
      6        - "5130:5130"
      7      volumes:

● Update(~/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/docker-compose.yml)
  ⎿  Added 1 line
      1  services:
      2    storefront-ui:
      3      build: .
      4 +    restart: unless-stopped                                                                                                         
      5      ports:
      6        - "3458:3000"
      7      volumes:
                                                                                           
● Bash(docker compose up -d 2>&1)
  ⎿   Container hw-hydrogen-storefront-node-docker-hydrogen-storefront-1 Recreate
      Container hw-hydrogen-storefront-node-docker-hydrogen-storefront-1 Recreated
      Container hw-hydrogen-storefront-node-docker-hydrogen-storefront-1 Starting
      Container hw-hydrogen-storefront-node-docker-hydrogen-storefront-1 Started

● Bash(cd /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker && docker compose up -d 2>&1)
  ⎿   Container hw-storefront-ui-node-docker-storefront-ui-1 Recreate
      Container hw-storefront-ui-node-docker-storefront-ui-1 Recreated
      Container hw-storefront-ui-node-docker-storefront-ui-1 Starting
      Container hw-storefront-ui-node-docker-storefront-ui-1 Started

● Both recreated cleanly. Now removing the stray container and verifying everything.

● Bash(docker rm 6f1a2eeada1e0ac408bc266a923a8938423fdd043ffde7e973a17c12ddf91207
      echo "--- r"CapDrop":inull,---"…)
             d  e"CgroupnsMode": "private",
     -    e    t "Dns":e[],
                 "DnsOptions": [],
        1        "DnsSearch":x[],d)
                 "ExtraH s s": null,
● Don            "GroupAdd": null,
                 "IpcMode": "private",
       iner ID 6f"Cgroup":e"",: Not needed — removed. It was angry_ptolemy, a leftover intermediate container from a failed docker build step (npm 
  install --build"Links":unull,qlite3, exit code 1, dated 2026-07-09). Nothing was running in it.
                 "OomScoreAdj"  0,
                 "PidMode": "",
  files, so they "Privileged": false,fter a host reboot (unlike hoseworld-mcp-bridge and qdrant, which already had unless-stopped). I added restart:
                 "PublishAllPorts": false,
        d  e    e"ReaaonlyRyotfs": f,lso,t
                 "SecurityOpt": nul ,
✻                "UTSMod ": "",
                 "UsernsMode": "",
 ─               "ShmSize":─67108864,───────────────────────────────────────────────────────────────────────────────────────────────────────────────
❯ commit this    "Runtime": "runc",
                 "Isolation": "",
             dits"CpuShares":a0,to cycle) · gh auth login · ← for agents                                                              ⧉ In todo.md
                 "Memory": 0,
                 "NanoCpus": 0,
                 "CgroupParent": "",
                 "BlkioWeight": 0,
                 "BlkioWeightDevice": null,
                 "BlkioDeviceReadBps": null,
                 "BlkioDeviceWriteBps": null,
                 "BlkioDeviceReadIOps": null,
                 "BlkioDeviceWriteIOps": null,
                 "CpuPeriod": 0,
                 "CpuQuota": 0,
                 "CpuRealtimePeriod": 0,
                 "CpuRealtimeRuntime": 0,
                 "CpusetCpus": "",
                 "CpusetMems": "",
                 "Devices": null,
                 "DeviceCgroupRules": null,
                 "DeviceRequests": null,
                 "MemoryReservation": 0,
                 "MemorySwap": 0,
                 "MemorySwappiness": null,
                 "OomKillDisable": null,
                 "PidsLimit": null,
                 "Ulimits": null,
                 "CpuCount": 0,
                 "CpuPercent": 0,
                 "IOMaximumIOps": 0,
                 "IOMaximumBandwidth": 0,
                 "MaskedPaths": [
                     "/proc/acpi",
                     "/proc/asound",
                     "/proc/interrupts",
                     "/proc/kcore",
                     "/proc/keys",
                     "/proc/latency_stats",
                     "/proc/sched_debug",
                     "/proc/scsi",
                     "/proc/timer_list",
                     "/proc/timer_stats",
                     "/sys/devices/virtual/powercap",
     "/sys/firmware"
                 ],
                 "ReadonlyPaths": [
                     "/proc/bus",
                     "/proc/fs",
                     "/proc/irq",
                     "/proc/sys",
     "/proc/sysrq-trigger"
                 ]
             },
             "GraphDriver": {
                 "Data": {
                     "ID": "6f1a2eeada1e0ac408bc266a923a8938423fdd043ffde7e973a17c12ddf91207",
                     "LowerDir": "/var/lib/docker/overlay2/b9e033fdfea1deb4d9a4c4c2d4c46c5065008ec9dc97ecbb0787f96c4ed6128f-init/diff:/var/lib/
     docker/overlay2/e26116f642211a1889ace39b99c02cbb4cf7e11e4dab4d60a3c74ee6a7eb568c/diff:/var/lib/docker/overlay2/39c2bf099d7a297eea416a9ced7
     88b5c6fd32cefbdb83684f8353e08d19ab77f/diff:/var/lib/docker/overlay2/f8bdfe27d213d67d93546bbd3d84e9853ed914f58683ab674220ea3fc4e03a0b/diff:
     /var/lib/docker/overlay2/2a777f862d13e10cb09c521396a68fa1dd319a143f97e3e7839829e182431878/diff:/var/lib/docker/overlay2/3757584035c587ad4f
     7167c841324a89f80be9daed8f1b72f88fa1b070702ead/diff:/var/lib/docker/overlay2/dd9eb356055fd2723fa42640e145daa108bd5a66b36cbb3a53ebe5e134b84
     ddf/diff:/var/lib/docker/overlay2/bbf88e1969093385b293a70e09a5ce7ac2f7e42dba9319db32cc300d9f88a4ec/diff",
                     "MergedDir": "/var/lib/docker/overlay2/b9e033fdfea1deb4d9a4c4c2d4c46c5065008ec9dc97ecbb0787f96c4ed6128f/merged",
                     "UpperDir": "/var/lib/docker/overlay2/b9e033fdfea1deb4d9a4c4c2d4c46c5065008ec9dc97ecbb0787f96c4ed6128f/diff",
                     "WorkDir": "/var/lib/docker/overlay2/b9e033fdfea1deb4d9a4c4c2d4c46c5065008ec9dc97ecbb0787f96c4ed6128f/work"
                 },
                 "Name": "overlay2"
             },
             "Mounts": [],
             "Config": {
                 "Hostname": "6f1a2eeada1e",
                 "Domainname": "",
                 "User": "",
                 "AttachStdin": false,
                 "AttachStdout": false,
                 "AttachStderr": false,
                 "Tty": false,
                 "OpenStdin": false,
                 "StdinOnce": false,
                 "Env": [

                                                                                                                    09:25 AM claude-sonnet-5
● This is a leftover intermediate container from a failed docker build step (npm install --build-from-source=sqlite3 exited with code 1, dated
  2026-07-09) — not something running, not malicious. Safe to remove. Now let me check the restart policies and compose setup for the actual project
  containers.

● Bash(echo "=== hydrogen-storefront restart policy ===";
      docker inspect hw-hydrogen-storefront-node-docker-hydrogen-storefront-1 --format '{{.HostConfig.RestartPolicy.Name}}';
      echo "=== storefront-ui restart policy ===";
      docker inspect hw-storefront-ui-node-docker-storefront-ui-1 --format '{{.HostConfig.RestartPolicy.Name}}';
      echo "=== mcp-bridge restart policy ===";
      docker inspect hoseworld-mcp-bridge --format '{{.HostConfig.RestartPolicy.Name}}';
      echo "=== qdrant restart policy ===";
      docker inspect qdrant --format '{{.HostConfig.RestartPolicy.Name}}';
      echo "=== docker daemon enabled on boot? ===";
      systemctl is-enabled docker 2>&1;
      echo "=== find compose files ===";
      find /home/rogue/Data/data/coding/github/shopify/app/hoseworld -maxdepth 2 -iname "docker-compose*.yml" -o -maxdepth 2 -iname "compose*.yml"
      2>/dev/null)
  ⎿  === hydrogen-storefront restart policy ===
     no
     === storefront-ui restart policy ===
     no
     === mcp-bridge restart policy ===
     unless-stopped
     === qdrant restart policy ===
     unless-stopped
     === docker daemon enabled on boot? ===
     enabled
     === find compose files ===
     /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker/docker-compose.yml
     /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/docker-compose.yml

                                                                                                                    09:26 AM claude-sonnet-5
● Docker daemon itself is enabled at boot, but the two project containers (hydrogen-storefront-1, storefront-ui-1) have RestartPolicy: no, so they
  won't come back after a reboot. Let me check the compose files.

● Read(/home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker/docker-compose.yml)
  ⎿  Read 20 lines

● Read(/home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/docker-compose.yml)
  ⎿  Read 18 lines

                                                                                                                    09:26 AM claude-sonnet-5
● Neither compose file sets a restart policy, which is why those two containers are no. I'll add restart: unless-stopped to both, matching the
  mcp-bridge/qdrant containers, and then remove the dangling failed-build container.

● Update(/home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker/docker-compose.yml)
  ⎿  Added 1 line
      1  services:
      2    hydrogen-storefront:
      3      build: .
      4 +    restart: unless-stopped                                                                                                         
      5      ports:
      6        - "5130:5130"
      7      volumes:

● Update(/home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/docker-compose.yml)
  ⎿  Added 1 line
      1  services:
      2    storefront-ui:
      3      build: .
      4 +    restart: unless-stopped                                                                                                         
      5      ports:
      6        - "3458:3000"
      7      volumes:

● Bash(docker compose up -d 2>&1)
  ⎿   Container hw-hydrogen-storefront-node-docker-hydrogen-storefront-1 Recreate
      Container hw-hydrogen-storefront-node-docker-hydrogen-storefront-1 Recreated
      Container hw-hydrogen-storefront-node-docker-hydrogen-storefront-1 Starting
      Container hw-hydrogen-storefront-node-docker-hydrogen-storefront-1 Started

● Bash(cd /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker && docker compose up -d 2>&1)
  ⎿   Container hw-storefront-ui-node-docker-storefront-ui-1 Recreate
      Container hw-storefront-ui-node-docker-storefront-ui-1 Recreated
      Container hw-storefront-ui-node-docker-storefront-ui-1 Starting
      Container hw-storefront-ui-node-docker-storefront-ui-1 Started

                                                                                                                    09:27 AM claude-sonnet-5
● Both recreated cleanly. Now removing the stray container and verifying everything.

● Bash(docker rm 6f1a2eeada1e0ac408bc266a923a8938423fdd043ffde7e973a17c12ddf91207
      echo "--- restart policies ---"
      for c in hw-hydrogen-storefront-node-docker-hydrogen-storefront-1 hw-storefront-ui-node-docker-storefront-ui-1 hoseworld-mcp-bridge qdrant
      playwright-mcp-server; do
        echo -n "$c: "; docker inspect "$c" --format '{{.HostConfig.RestartPolicy.Name}}'
      done
      echo "--- final ps ---"
      docker ps -a --format 'table {{.ID}}\t{{.Names}}\t{{.Status}}')
  ⎿  6f1a2eeada1e0ac408bc266a923a8938423fdd043ffde7e973a17c12ddf91207
     --- restart policies ---
     hw-hydrogen-storefront-node-docker-hydrogen-storefront-1: unless-stopped
     hw-storefront-ui-node-docker-storefront-ui-1: unless-stopped
     hoseworld-mcp-bridge: unless-stopped
     qdrant: unless-stopped
     playwright-mcp-server: always
● Bash(docker rm 6f1a2eeada1e0ac408bc266a923a8938423fdd043ffde7e973a17c12ddf91207
      echo "--- restart policies ---"…)
  ⎿  6f1a2eeada1e0ac408bc266a923a8938423fdd043ffde7e973a17c12ddf91207
     --- restart policies ---
     hw-hydrogen-storefront-node-docker-hydrogen-storefront-1: unless-stopped
     … +12 lines (ctrl+o to expand)

● Done.

  Container ID 6f1a2eeada1e...: Not needed — removed. It was angry_ptolemy, a leftover intermediate container from a failed docker build step (npm
 ▐▛███▜▌   Claude Code v2.1.205
▝▜█████▛▘  Fable 5 · Claude Pro
  ▘▘ ▝▝    ~/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker

 ⚠ 1 MCP server needs authentication · run /mcp

❯ /clear                                                                                                                                            

❯ /model                                                                                                                                            
  ⎿  Set model to Fable 5 and saved as your default for new sessions

❯  use hw-hydrogen-storefront-node-docker/todo.md for this tasks instructions                                                                       

● I'll read the task instructions in todo.md and check my workflow memory.
  
  Read 2 files, recalled 1 memory (ctrl+o to expand)

  Read 2 files, called MCP-Bridge 2 times (ctrl+o to expand)

● Bash(docker ps -a --format '{{.Names}}\t{{.Status}}\t{{.Image}}\t{{.Ports}}' | head -30)
  ⎿  hw-storefront-ui-node-docker-storefront-ui-1       Up 34 minutes   hw-storefront-ui-node-docker-storefront-ui      0.0.0.0:3458->3000/tcp,
     [::]:3458->3000
     /tcp
     hw-hydrogen-storefront-node-docker-hydrogen-storefront-1   Up 34
     minutes    hw-hydrogen-storefront-node-docker-hydrogen-storefront  0.0.0.0:5130->5
     … +6 lines (ctrl+o to expand)
  
  Searched for 1 pattern (ctrl+o to expand)

● Bash(docker logs --tail 120 hw-storefront-ui-node-docker-storefront-ui-1 2>&1 | tail -60)
  ⎿  > hw-storefront-ui@1.0.0 docker-start
     > npm run setup && npm run start
     … +27 lines (ctrl+o to expand)

  Read 2 files, listed 1 directory (ctrl+o to expand)

● Entered plan mode
  Claude is now exploring and designing an implementation approach.

● Entering exploration phase — I'll launch two Explore agents in parallel: one on the import app's code paths, one on the
  docker/persistence/session/tunnel layer.

● 2 Explore agents finished (ctrl+o to expand)
   ├ Explore import app architecture · 14 tool uses · 59.7k tokens
   │ ⎿  Done
   └ Explore docker/persistence/tunnel layer · 26 tool uses · 53.1k tokens
     ⎿  Done

● Plan(Design import redesign plan)
  ⎿  Done (12 tool uses · 79.2k tokens · 4m 34s)
  (ctrl+o to expand)

  Searched for 1 pattern (ctrl+o to expand)

● User answered Claude's questions:
  ⎿  · The import fails because each ~60s batch POST rides the Cloudflare tunnel for hours and a single 502 kills the whole run (the client loop has
     no retry). How should the retry/resilience mechanism be architected? → Server-side background job (Recommended)
     · The todo suggested moving Prisma from SQLite to Postgres if the db is the issue. Evidence says it isn't: no postgres exists anywhere, 
     hydrogen has no Prisma at all, and storefront-ui's SQLite (bind-mounted, persisted) is working — the 'postgres:5432' error in the tcpdump 
     analysis file doesn't appear in any real log. The real gap is that runtime-uploaded suppliers/ JSON isn't volume-mounted (wiped on rebuild). 
     Keep SQLite? → Keep SQLite (Recommended)

● Updated plan
  ⎿  /plan to preview

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 Ready to code?

 Here is Claude's plan:
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
 Supplier Import Redesign — fix failing import + incremental, disable-not-delete imports

 Repo (all app code): /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker
 Task file: 2607100950_todo.md · VERSION bump → 2026.07.6

 Context

 The Import app dies mid-run. Diagnosis (from real logs, cloudflared log, and code — the attached tcpdump analysis's "Can't reach postgres:5432"
 claim is disproven: no postgres exists anywhere, hydrogen has no Prisma, storefront-ui's SQLite is bind-mounted and healthy):

 1. Root cause: the client resubmit loop in app/routes/app.import.jsx (useEffect l.391-447) has no retry. Runs are ~137 batches × ~60s POSTs
 through the Cloudflare tunnel (app.hoseworld.store → localhost:3458); one 502/"context canceled" (seen in cloudflared log 2026-07-09 15:04, bare
 502 in admin screenshot) kills the whole run.
 2. runFinalizeBatch (suppliers.server.js l.561) hard-deletes products (productDelete + prisma.product.delete) and collections absent from the
 selection — todo requires disable+notice instead.
 3. Every run re-pushes all ~2,055 products (~6 GraphQL calls each) — todo requires incremental diff via Prisma.
 4. Infra gap: runtime-uploaded suppliers/ JSON lives only in the container FS (wiped on rebuild); only dev.sqlite is mounted.
 5. (Out of repo scope, flag to Wayne: hydrogen's exit-143 restart loop comes from an external host supervisor doing git pull && pnpm install — not
 in either repo.)

 Approved decisions (AskUserQuestion): server-side background job + polling (not client retry loop); keep SQLite (no postgres migration); failure
 bookkeeping in Prisma.

 Phase 0 — Persistence groundwork

 - docker-compose.yml: add - ./suppliers:/app/suppliers bind mount.
 - Migration add_import_run_models: ImportRun (id cuid, supplierName, shop, status running|completed|failed|cancelled|interrupted, phase
 importing|disabling|retrying|done, selections JSON, force, offset/total, counters:
 created/updated/skippedUnchanged/skippedDisabled/productsDisabled/collectionsCreated/collectionsUnpublished, errorsJson, noticesJson, heartbeatAt
 @updatedAt, startedAt, finishedAt) + ImportBatchFailure (runId FK cascade, phase import|disable, offset, batchSize, attempts, lastError,
 resolved).
 - Migration add_entity_disable_and_product_sync_fields: EntityDisable (supplierName, level
 collections|brands|subCollections|subCatCollections|product, value, reason manual|supplier_removed, note, @@unique([supplierName, level, value]))
 — precedent: MarkupRule. On Product: lastPushedHash, lastPushedAt, disabledReason (manual|deselected|supplier_removed), disabledAt.

 Phase 1 — Server-side job runner with retry state machine (the fix)

 New app/services/import-run.server.js:
 - Module-level activeRuns Map; singleton guard (in-memory run OR running row with heartbeat < 2min); stale running rows flipped to interrupted
 lazily on status read.
 - startImportRun({shop, supplierName, selections, force}): create ImportRun row, snapshot supplier JSON once via loadSupplierData, fire
 executeRun() unawaited, return runId. Fresh admin client per batch via unauthenticated.admin(shop) (shopify.server.js:31 — rides
 PrismaSessionStorage offline token + refresh; never hold one client for hours).
 - getRunStatus, cancelRun, resumeRun (resume restarts at persisted offset — importProductBatch is idempotent via prisma lookup).
 - Phases: importing → disabling (Phase 3 pass) → retrying (one revisit pass over unresolved ImportBatchFailures, mark resolved on success) → done.
 - runBatchWithRetry(fn, {retryWaitMs=30_000, sleep}) — exact todo spec: fail → wait 30s → retry; fail again → record ImportBatchFailure, skip
 forward (offset += intended slice); 5 consecutive failed batches → abort run failed; success resets streak; injectable sleep for deterministic
 tests. Note: per-product results.errors are NOT batch failures — a batch failure is runImportBatch throwing.
 - Counters flushed to ImportRun row after every batch (drives polling UI).

 app/routes/app.import.jsx: replace intents apply-supplier-import-batch/apply-supplier-import-finalize-batch with start-supplier-import,
 import-run-status, cancel-supplier-import, resume-supplier-import. Delete the resubmit useEffect + driver state; poll status every ~3s while live
 (clear on unmount/terminal). Show phase, offset/total, skipped/disabled counts, failed batches, Resume button on interrupted.

 Optional tweak: runImportBatch accepts prebuilt {publicationIds, collectionIdByTitle} context (fetch-once-per-run; fetch-when-absent keeps
 signature back-compatible).

 Phase 2 — Incremental import (hash skip)

 In app/services/suppliers.server.js:
 - IMPORT_HASH_VERSION = 1 (bump to force full re-push when mapping logic changes) + computeProductHash(product, pricingEntry, stockEntry,
 markupRule) = sha256 of raw inputs + resolved markup — covers price-file, MarkupRule, stock, detail, image changes.
 - importProductBatch: accept force; widen findUnique select to {shopifyProductId, lastPushedHash, active, disabledReason}; skip when !force &&
 shopifyProductId && active && lastPushedHash === hash (skippedUnchanged++). Persist hash via follow-up prisma.product.update only after publish +
 collection-add succeed; pushed products also get active:true, disabledReason:null, disabledAt:null (re-activation path).
 - UI: "Force full import" checkbox → force.

 Phase 3 — Disable instead of delete (nothing ever deleted)

 - app/services/product.server.js: generalize deactivateShopifyProduct (l.965) → exported setProductStatus(admin, gid, status); new
 unpublishResource (publishableUnpublish, mirror of publishResource l.1198). deleteProduct/deleteCollection remain only for the explicit Reset
 Store utility.
 - suppliers.server.js: deleteProductBatch → disableProductBatch (DRAFT via setProductStatus + prisma update {active:false, disabledReason,
 disabledAt}; drop the cross-supplier shared-title skip — drafting own product is safe). deleteCollectionBatch → unpublishCollectionBatch (keep
 cross-supplier check; unpublish; upsert EntityDisable notice). runFinalizeBatch → runDisablePass with reason resolution: manual EntityDisable →
 manual; tier deselected this run → deselected; absent from supplier file → supplier_removed ("deleted from supplier side" notice).
 - Reappearance: at ensureCollectionsExist, republish collections whose EntityDisable reason is supplier_removed/deselected and clear the row;
 manual rows never auto-clear.
 - Brand/sub-collection/sub-cat (metafields/vendor only, no Shopify object): disabling = draft all carrying products (the stale pass does this once
 excluded) + EntityDisable row as source of truth/notice.
 - runImportBatch filters toImport by passesSelection AND a disable index built from EntityDisable rows (product-level id + 4 dimension values;
 same walk shape as resolveMarkupRule) — manual disables never re-activate.
 - UI wording: hasPendingDeletions warning (app.import.jsx l.561-587) → "will be set to Draft (disabled) — never deleted"; "deleted" → "disabled"
 in results.

 Phase 4 — Granular disable UI

 1. Inline in app.import.jsx: Disable/Enable toggle + warning badge per NodeRow (all 4 tiers), loader supplies disablesByKey; per-row useFetcher
 (MarkupInputs pattern); intents save-entity-disable/remove-entity-disable.
 2. New route app/routes/app.disabled.jsx ("Disabled items", nav link in app/routes/app.jsx): EntityDisable rows grouped by level with re-enable;
 active:false products with reason badges (incl. supplier-deleted notices); product search (title/externalProductId) to disable individual
 products. Re-enabling deletes the row → next import re-pushes (skip requires active).

 Phase 5 — Tests (vitest)

 - app/services/suppliers.server.test.js (extend; existing fs/prisma/product.server mocks): hash-skip matrix (unchanged skips all GraphQL;
 price/markup/stock change re-pushes; force bypasses; hash only after success; inactive never skip-eligible), disable pass (DRAFT not delete,
 prisma.product.delete never called; reason mapping; collection unpublished not deleted; shared-supplier collection skipped; republish-on-reappear;
 manual disable filters toImport). Reuse negative-time-budget deadline precedent.
 - New app/services/import-run.server.test.js (mock suppliers.server, unauthenticated.admin, db.server; inject sleep): happy path; fail→30s
 retry→success (sleep called with 30000, streak reset); double-fail → ImportBatchFailure + skip + continue; 5 consecutive → failed; revisit pass
 resolves; concurrent start rejected; stale heartbeat → interrupted; resume from offset.
 - product.server.test.js: setProductStatus, unpublishResource mutation shapes.

 Phase 6 — Verification & exit ritual

 Live Playwright on /app/import is impossible outside the Shopify iframe (documented 410) — accepted standard is vitest + code-path verification:

● Plan(Design import redesign plan)
  ⎿  Done (12 tool uses · 79.2k tokens · 4m 34s)
  (ctrl+o to expand)

  Searched for 1 pattern (ctrl+o to expand)

● User answered Claude's questions:
  ⎿  · The import fails because each ~60s batch POST rides the Cloudflare tunnel for hours and a single 502 kills the whole run (the client loop has
     no retry). How should the retry/resilience mechanism be architected? → Server-side background job (Recommended)
     · The todo suggested moving Prisma from SQLite to Postgres if the db is the issue. Evidence says it isn't: no postgres exists anywhere,
     hydrogen has no Prisma at all, and storefront-ui's SQLite (bind-mounted, persisted) is working — the 'postgres:5432' error in the tcpdump
     analysis file doesn't appear in any real log. The real gap is that runtime-uploaded suppliers/ JSON isn't volume-mounted (wiped on rebuild).
     Keep SQLite? → Keep SQLite (Recommended)

● Updated plan
  ⎿  /plan to preview

● User approved Claude's plan
  ⎿  Plan saved to: ~/.claude/plans/joyful-shimmying-engelbart.md · /plan to edit
     Supplier Import Redesign — fix failing import + incremental, disable-not-delete imports

     Repo (all app code): /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker
     Task file: 2607100950_todo.md · VERSION bump → 2026.07.6

     Context

     The Import app dies mid-run. Diagnosis (from real logs, cloudflared log, and code — the attached tcpdump analysis's "Can't reach postgres:5432"
     claim is disproven: no postgres exists anywhere, hydrogen has no Prisma, storefront-ui's SQLite is bind-mounted and healthy):

     1. Root cause: the client resubmit loop in app/routes/app.import.jsx (useEffect l.391-447) has no retry. Runs are ~137 batches × ~60s POSTs
     through the Cloudflare tunnel (app.hoseworld.store → localhost:3458); one 502/"context canceled" (seen in cloudflared log 2026-07-09 15:04,
     bare 502 in admin screenshot) kills the whole run.
     2. runFinalizeBatch (suppliers.server.js l.561) hard-deletes products (productDelete + prisma.product.delete) and collections absent from the
     selection — todo requires disable+notice instead.
     3. Every run re-pushes all ~2,055 products (~6 GraphQL calls each) — todo requires incremental diff via Prisma.
     4. Infra gap: runtime-uploaded suppliers/ JSON lives only in the container FS (wiped on rebuild); only dev.sqlite is mounted.
     5. (Out of repo scope, flag to Wayne: hydrogen's exit-143 restart loop comes from an external host supervisor doing git pull && pnpm install —
     not in either repo.)

     Approved decisions (AskUserQuestion): server-side background job + polling (not client retry loop); keep SQLite (no postgres migration);
     failure bookkeeping in Prisma.

     Phase 0 — Persistence groundwork

     - docker-compose.yml: add - ./suppliers:/app/suppliers bind mount.
     - Migration add_import_run_models: ImportRun (id cuid, supplierName, shop, status running|completed|failed|cancelled|interrupted, phase
     importing|disabling|retrying|done, selections JSON, force, offset/total, counters:
     created/updated/skippedUnchanged/skippedDisabled/productsDisabled/collectionsCreated/collectionsUnpublished, errorsJson, noticesJson,
     heartbeatAt @updatedAt, startedAt, finishedAt) + ImportBatchFailure (runId FK cascade, phase import|disable, offset, batchSize, attempts,
     lastError, resolved).
     - Migration add_entity_disable_and_product_sync_fields: EntityDisable (supplierName, level
     collections|brands|subCollections|subCatCollections|product, value, reason manual|supplier_removed, note, @@unique([supplierName, level,
     value])) — precedent: MarkupRule. On Product: lastPushedHash, lastPushedAt, disabledReason (manual|deselected|supplier_removed), disabledAt.

     Phase 1 — Server-side job runner with retry state machine (the fix)

     New app/services/import-run.server.js:
     - Module-level activeRuns Map; singleton guard (in-memory run OR running row with heartbeat < 2min); stale running rows flipped to interrupted
     lazily on status read.
     - startImportRun({shop, supplierName, selections, force}): create ImportRun row, snapshot supplier JSON once via loadSupplierData, fire
     executeRun() unawaited, return runId. Fresh admin client per batch via unauthenticated.admin(shop) (shopify.server.js:31 — rides
     PrismaSessionStorage offline token + refresh; never hold one client for hours).
     - getRunStatus, cancelRun, resumeRun (resume restarts at persisted offset — importProductBatch is idempotent via prisma lookup).
     - Phases: importing → disabling (Phase 3 pass) → retrying (one revisit pass over unresolved ImportBatchFailures, mark resolved on success) →
     done.
     - runBatchWithRetry(fn, {retryWaitMs=30_000, sleep}) — exact todo spec: fail → wait 30s → retry; fail again → record ImportBatchFailure, skip
     forward (offset += intended slice); 5 consecutive failed batches → abort run failed; success resets streak; injectable sleep for deterministic
     tests. Note: per-product results.errors are NOT batch failures — a batch failure is runImportBatch throwing.
     - Counters flushed to ImportRun row after every batch (drives polling UI).

     app/routes/app.import.jsx: replace intents apply-supplier-import-batch/apply-supplier-import-finalize-batch with start-supplier-import,
     import-run-status, cancel-supplier-import, resume-supplier-import. Delete the resubmit useEffect + driver state; poll status every ~3s while
     live (clear on unmount/terminal). Show phase, offset/total, skipped/disabled counts, failed batches, Resume button on interrupted.

     Optional tweak: runImportBatch accepts prebuilt {publicationIds, collectionIdByTitle} context (fetch-once-per-run; fetch-when-absent keeps
     signature back-compatible).

     Phase 2 — Incremental import (hash skip)

     In app/services/suppliers.server.js:
     - IMPORT_HASH_VERSION = 1 (bump to force full re-push when mapping logic changes) + computeProductHash(product, pricingEntry, stockEntry,
     markupRule) = sha256 of raw inputs + resolved markup — covers price-file, MarkupRule, stock, detail, image changes.
     - importProductBatch: accept force; widen findUnique select to {shopifyProductId, lastPushedHash, active, disabledReason}; skip when !force &&
     shopifyProductId && active && lastPushedHash === hash (skippedUnchanged++). Persist hash via follow-up prisma.product.update only after publish
     + collection-add succeed; pushed products also get active:true, disabledReason:null, disabledAt:null (re-activation path).
     - UI: "Force full import" checkbox → force.

     Phase 3 — Disable instead of delete (nothing ever deleted)

     - app/services/product.server.js: generalize deactivateShopifyProduct (l.965) → exported setProductStatus(admin, gid, status); new
     unpublishResource (publishableUnpublish, mirror of publishResource l.1198). deleteProduct/deleteCollection remain only for the explicit Reset
     Store utility.
     - suppliers.server.js: deleteProductBatch → disableProductBatch (DRAFT via setProductStatus + prisma update {active:false, disabledReason,
     disabledAt}; drop the cross-supplier shared-title skip — drafting own product is safe). deleteCollectionBatch → unpublishCollectionBatch (keep
     cross-supplier check; unpublish; upsert EntityDisable notice). runFinalizeBatch → runDisablePass with reason resolution: manual EntityDisable →
     manual; tier deselected this run → deselected; absent from supplier file → supplier_removed ("deleted from supplier side" notice).
     - Reappearance: at ensureCollectionsExist, republish collections whose EntityDisable reason is supplier_removed/deselected and clear the row;
     manual rows never auto-clear.
     - Brand/sub-collection/sub-cat (metafields/vendor only, no Shopify object): disabling = draft all carrying products (the stale pass does this
     once excluded) + EntityDisable row as source of truth/notice.
     - runImportBatch filters toImport by passesSelection AND a disable index built from EntityDisable rows (product-level id + 4 dimension values;
     same walk shape as resolveMarkupRule) — manual disables never re-activate.
     - UI wording: hasPendingDeletions warning (app.import.jsx l.561-587) → "will be set to Draft (disabled) — never deleted"; "deleted" →
     "disabled" in results.

     Phase 4 — Granular disable UI

     1. Inline in app.import.jsx: Disable/Enable toggle + warning badge per NodeRow (all 4 tiers), loader supplies disablesByKey; per-row useFetcher
     (MarkupInputs pattern); intents save-entity-disable/remove-entity-disable.
     2. New route app/routes/app.disabled.jsx ("Disabled items", nav link in app/routes/app.jsx): EntityDisable rows grouped by level with
     re-enable; active:false products with reason badges (incl. supplier-deleted notices); product search (title/externalProductId) to disable
     individual products. Re-enabling deletes the row → next import re-pushes (skip requires active).

     Phase 5 — Tests (vitest)

     - app/services/suppliers.server.test.js (extend; existing fs/prisma/product.server mocks): hash-skip matrix (unchanged skips all GraphQL;
     price/markup/stock change re-pushes; force bypasses; hash only after success; inactive never skip-eligible), disable pass (DRAFT not delete,
     prisma.product.delete never called; reason mapping; collection unpublished not deleted; shared-supplier collection skipped;
     republish-on-reappear; manual disable filters toImport). Reuse negative-time-budget deadline precedent.
     - New app/services/import-run.server.test.js (mock suppliers.server, unauthenticated.admin, db.server; inject sleep): happy path; fail→30s
     retry→success (sleep called with 30000, streak reset); double-fail → ImportBatchFailure + skip + continue; 5 consecutive → failed; revisit pass
     resolves; concurrent start rejected; stale heartbeat → interrupted; resume from offset.
     - product.server.test.js: setProductStatus, unpublishResource mutation shapes.

     Phase 6 — Verification & exit ritual

     Live Playwright on /app/import is impossible outside the Shopify iframe (documented 410) — accepted standard is vitest + code-path
     verification:
     1. npm test green (117 existing + new).
     2. npx prisma migrate dev applies; npm run setup path (migrate deploy) clean for Docker.
     3. Grep: no deleteProduct/deleteCollection/prisma.product.delete call sites left in the supplier flow; old intents gone.
     4. Validate new/changed GraphQL (publishableUnpublish etc.) via shopify-dev-mcp before finalizing.
     5. Manual steps for Wayne (documented in the todo): rebuild → suppliers/ survives; start import, close tab, reopen → still running; kill tunnel
     briefly → run unaffected; deselect brand → products go Draft not deleted; re-select → restored; second run finishes in minutes with
     skippedUnchanged≈total; MarkupRule change re-pushes only affected; manual disable holds across imports.

     Exit ritual (per task workflow): update 2607100950_todo.md (not todo.md) with plan/issues/root-cause/resolution; bump VERSION → 2026.07.6;
     qdrant-store session summary + reusable patterns; no commits (Wayne commits manually). Both containers need docker compose build && up -d
     (recreate, not just restart) after changes — and docker cp the container's runtime suppliers/ files out before recreating (they're not yet
     mounted).

  Read 1 file (ctrl+o to expand)

● Schema read. Now reading the two core files.

  Read 2 files (ctrl+o to expand)

● Now the relevant sections of product.server.js.

  Searched for 1 pattern, read 1 file (ctrl+o to expand)

● I have full context now. Starting Phase 0: compose bind mount + schema changes.

● Update(~/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/docker-compose.yml)
  ⎿  File must be read first

● Reading 1 file, listing 1 directory… (ctrl+o to expand)
  ⎿  ~/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/docker-compose.yml

● Update(~/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/docker-compose.yml)
  ⎿  Added 4 lines
       6        - "3458:3000"
       7      volumes:
       8        - ./prisma/dev.sqlite:/app/prisma/dev.sqlite
       9 +      # Supplier JSON uploads are written at runtime (suppliers.server.js /                                                        
      10 +      # agrinet.server.js) — without this mount they land in the container's                                                       
      11 +      # writable layer and are silently wiped on every image rebuild/recreate.                                                     
      12 +      - ./suppliers:/app/suppliers                                                                                                 
      13      env_file:
      14        - .env
      15      environment:

● Now the schema additions.

● Update(~/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/prisma/schema.prisma)
  ⎿  Added 15 lines
      77    stockTurnOver     String?
      78    stockUpdatedAt    DateTime?
      79  
      80 +  // Incremental-import change detection: sha256 of the raw supplier inputs +                                                      
      81 +  // resolved markup that produced the last successful Shopify push (see                                                           
      82 +  // computeProductHash in suppliers.server.js). Written only AFTER the full                                                       
      83 +  // push (update/create + publish + collection-add) succeeds, so a partially                                                      
      84 +  // pushed product keeps its stale hash and is re-pushed next run.                                                                
      85 +  lastPushedHash    String?                                                                                                        
      86 +  lastPushedAt      DateTime?                                                                                                      
      87 +                                                                                                                                   
      88 +  // Why this product is inactive (active=false): "manual" (disabled via the                                                       
      89 +  // admin UI / EntityDisable), "deselected" (its tier was unchecked for an                                                        
      90 +  // import run), or "supplier_removed" (it disappeared from the supplier's                                                        
      91 +  // file — surfaced in the UI as "deleted from the supplier's side").                                                             
      92 +  disabledReason    String?                                                                                                        
      93 +  disabledAt        DateTime?                                                                                                      
      94 +                                                                                                                                   
      95    userDetail    UserDetail?
      96    productImages ProductImage[]
      97    enrichedData  EnrichedData?

● Update(~/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/prisma/schema.prisma)
  ⎿  Added 69 lines
      214    pricelistItem          String?
      215  }
      216  
      217 +// One row per server-side import run (see app/services/import-run.server.js).                                                    
      218 +// The run executes as an in-process background job; the UI polls this row for                                                    
      219 +// progress instead of holding long HTTP requests open through the Cloudflare                                                     
      220 +// tunnel. status: running | completed | failed | cancelled | interrupted                                                         
      221 +// (interrupted = the process died mid-run; resumable from `offset`).                                                             
      222 +// phase: importing | disabling | retrying | done.                                                                                
      223 +model ImportRun {                                                                                                                 
      224 +  id                     String    @id @default(cuid())                                                                           
      225 +  supplierName           String                                                                                                   
      226 +  shop                   String                                                                                                   
      227 +  status                 String    @default("running")                                                                            
      228 +  phase                  String    @default("importing")                                                                          
      229 +  selections             String // JSON snapshot of the UI's dimension selections for this run                                    
      230 +  force                  Boolean   @default(false)                                                                                
      231 +  offset                 Int       @default(0)                                                                                    
      232 +  total                  Int       @default(0)                                                                                    
      233 +  created                Int       @default(0)                                                                                    
      234 +  updated                Int       @default(0)                                                                                    
      235 +  skippedUnchanged       Int       @default(0)                                                                                    
      236 +  productsDisabled       Int       @default(0)                                                                                    
      237 +  collectionsCreated     Int       @default(0)                                                                                    
      238 +  collectionsUnpublished Int       @default(0)                                                                                    
      239 +  errorsJson             String    @default("[]")                                                                                 
      240 +  noticesJson            String    @default("[]")                                                                                 
      241 +  heartbeatAt            DateTime  @updatedAt                                                                                     
      242 +  startedAt              DateTime  @default(now())                                                                                
      243 +  finishedAt             DateTime?                                                                                                
      244 +  batchFailures          ImportBatchFailure[]                                                                                     
      245 +                                                                                                                                  
      246 +  @@index([supplierName, status])                                                                                                 
      247 +}                                                                                                                                 
      248 +                                                                                                                                  
      249 +// A batch that threw twice (initial attempt + one retry after a 30s wait).                                                       
      250 +// Recorded and skipped so the run can continue; the run's final "retrying"                                                       
      251 +// phase replays unresolved rows once more. phase: import | disable.                                                              
      252 +model ImportBatchFailure {                                                                                                        
      253 +  id        String    @id @default(cuid())                                                                                        
      254 +  runId     String                                                                                                                
      255 +  run       ImportRun @relation(fields: [runId], references: [id], onDelete: Cascade)                                             
      256 +  phase     String                                                                                                                
      257 +  offset    Int                                                                                                                   
      258 +  batchSize Int                                                                                                                   
      259 +  attempts  Int       @default(0)                                                                                                 
      260 +  lastError String                                                                                                                
      261 +  resolved  Boolean   @default(false)                                                                                             
      262 +  createdAt DateTime  @default(now())                                                                                             
      263 +                                                                                                                                  
      264 +  @@index([runId, resolved])                                                                                                      
      265 +}                                                                                                                                 
      266 +                                                                                                                                  
      267 +// Granular disable switches, mirroring MarkupRule's keying: "level" is one of                                                    
      268 +// the DIMENSION_ORDER keys (collections, brands, subCollections,                                                                 
      269 +// subCatCollections) or "product" (value = externalProductId). A row here                                                        
      270 +// excludes matching products from every import run (they are drafted, never                                                      
      271 +// deleted, and never re-activated while the row exists). reason: "manual"                                                        
      272 +// (set via the admin UI — never auto-cleared) or "supplier_removed" (the                                                         
      273 +// import recorded that the supplier's file no longer contains it).                                                               
      274 +model EntityDisable {                                                                                                             
      275 +  id           String   @id @default(cuid())                                                                                      
      276 +  supplierName String                                                                                                             
      277 +  level        String                                                                                                             
      278 +  value        String                                                                                                             
      279 +  reason       String   @default("manual")                                                                                        
      280 +  note         String?                                                                                                            
      281 +  createdAt    DateTime @default(now())                                                                                           
      282 +                                                                                                                                  
      283 +  @@unique([supplierName, level, value])                                                                                          
      284 +}                                                                                                                                 
      285 +                                                                                                                                  
      286  model ImportManifest {
      287    id         String   @id @default(cuid())
      288    fileType   String   @unique

● Bash(cd /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker && npx prisma migrate dev --name
      add_import_run_entity_disable_product…)
  ⎿  Environment variables loaded from .env
     Prisma schema loaded from prisma/schema.prisma
     Datasource "db": SQLite database "dev.sqlite" at "file:dev.sqlite"
     … +15 lines (ctrl+o to expand)
  ⎿  Allowed by auto mode classifier

  Called shopify-dev-mcp 2 times (ctrl+o to expand)

● Update(app/services/product.server.js)
  ⎿  Added 20 lines, removed 4 lines
      962    return product.id;
      963  }
      964  
      965 -async function deactivateShopifyProduct(admin, shopifyGid) {                                                                      
      965 +// Sets a product's status (ACTIVE | DRAFT | ARCHIVED). DRAFT is the                                                              
      966 +// disable-instead-of-delete mechanism: the product disappears from the                                                           
      967 +// storefront but keeps its Shopify id, media, and history, so re-enabling                                                        
      968 +// is a plain status flip rather than a full re-create.                                                                           
      969 +export async function setProductStatus(admin, shopifyGid, status) {                                                               
      970    const response = await admin.graphql(UPDATE_PRODUCT_MUTATION, {
      967 -    variables: { input: { id: shopifyGid, status: "DRAFT" } },                                                                    
      971 +    variables: { input: { id: shopifyGid, status } },                                                                             
      972    });
      973    const json = await response.json();
      970 -  if (json.data.productUpdate.userErrors?.length > 0) {                                                                           
      971 -    console.error("Deactivation errors:", json.data.productUpdate.userErrors);                                                    
      974 +  const userErrors = json.data.productUpdate.userErrors;                                                                          
      975 +  if (userErrors?.length > 0) {                                                                                                   
      976 +    throw new Error(`Status update failed for ${shopifyGid}: ${userErrors.map((e) => e.message).join(", ")}`);                    
      977    }
      978  }
      979  
      980 +async function deactivateShopifyProduct(admin, shopifyGid) {                                                                      
      981 +  try {                                                                                                                           
      982 +    await setProductStatus(admin, shopifyGid, "DRAFT");                                                                           
      983 +  } catch (err) {                                                                                                                 
      984 +    // Preserves this legacy call site's log-and-continue behavior for the                                                        
      985 +    // an-api comparison flow; the supplier flow calls setProductStatus                                                           
      986 +    // directly and handles errors per item.                                                                                      
      987 +    console.error("Deactivation errors:", err.message);                                                                           
      988 +  }                                                                                                                               
      989 +}                                                                                                                                 
      990 +                                                                                                                                  
      991  let cachedLocationId = null;
      992  
      993  async function getLocationId(admin) {

● Update(app/services/product.server.js)
  ⎿  Added 12 lines
      657    }
      658  `;
      659  
      660 +const PUBLISHABLE_UNPUBLISH_MUTATION = `#graphql                                                                                  
      661 +  mutation publishableUnpublish($id: ID!, $input: [PublicationInput!]!) {                                                         
      662 +    publishableUnpublish(id: $id, input: $input) {                                                                                
      663 +      publishable {                                                                                                               
      664 +        availablePublicationsCount { count }                                                                                      
      665 +        resourcePublicationsCount { count }                                                                                       
      666 +      }                                                                                                                           
      667 +      userErrors { field message }                                                                                                
      668 +    }                                                                                                                             
      669 +  }                                                                                                                               
      670 +`;                                                                                                                                
      671 +                                                                                                                                  
      672  const LIST_CATALOGS_QUERY = `#graphql
      673    query listCatalogs($first: Int!, $after: String) {
      674      catalogs(first: $first, after: $after, type: MARKET) {

● Update(app/services/product.server.js)
  ⎿  Added 18 lines
      1238  
      1239  export const publishCollection = publishResource;
      1240  
      1241 +// Removes a resource (product or collection) from the given publications —                                                      
      1242 +// the disable-instead-of-delete mechanism for collections: the collection                                                       
      1243 +// vanishes from all sales channels but keeps its Shopify id and product                                                         
      1244 +// associations, so re-enabling is a publishResource call rather than a                                                          
      1245 +// re-create + re-attach of every product.                                                                                       
      1246 +export async function unpublishResource(admin, resourceId, publicationIds) {                                                     
      1247 +  if (!publicationIds.length) return;                                                                                            
      1248 +  const input = publicationIds.map((publicationId) => ({ publicationId }));                                                      
      1249 +  const resp = await admin.graphql(PUBLISHABLE_UNPUBLISH_MUTATION, {                                                             
      1250 +    variables: { id: resourceId, input },                                                                                        
      1251 +  });                                                                                                                            
      1252 +  const json = await resp.json();                                                                                                
      1253 +  const { userErrors } = json.data.publishableUnpublish;                                                                         
      1254 +  if (userErrors?.length > 0) {                                                                                                  
      1255 +    throw new Error(`Unpublish failed for ${resourceId}: ${userErrors.map((e) => e.message).join(", ")}`);                       
      1256 +  }                                                                                                                              
      1257 +}                                                                                                                                
      1258 +                                                                                                                                 
      1259  export async function publishAllProducts(admin) {
      1260    const publicationIds = await getAllPublicationIds(admin);
      1261    if (!publicationIds.length) return { published: 0, errors: [] };

● Now checking how mapExternalToShopify sets product status (to confirm a re-imported drafted product gets restored to ACTIVE), then I'll write the
  suppliers.server.js changes.

● Bash(grep -n "status" /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/app/services/product.server.js | sed
      -n '1,25p')
  ⎿  341:      status: isActive ? "ACTIVE" : "DRAFT",
     365:        status
     399:        status
     … +25 lines (ctrl+o to expand)
  
  Read 1 file (ctrl+o to expand)

● Update(app/services/suppliers.server.js)
  ⎿  Added 3 lines, removed 2 lines
      1  import { existsSync, readdirSync, readFileSync } from "fs";
      2  import { resolve, join } from "path";
      3 +import { createHash } from "crypto";                                                                                                
      4  import prisma from "../db.server.js"; 
      5  import {
      6    mapExternalToShopify,
     ...
       9    saveProductLocally,
      10    listCollections,
      11    createCollection,
      11 -  deleteCollection,                                                                                                                
      12    addProductsToCollection,
      13    getAllPublicationIds,
      14    publishResource,
      15 -  deleteProduct,                                                                                                                   
      15 +  unpublishResource,                                                                                                               
      16 +  setProductStatus,                                                                                                                
      17    parsePriceField,
      18    applyMarkup,
      19    withNetworkRetry,

● Now the entity-disable helpers and content hash, inserted after the markup section.

● Update(app/services/suppliers.server.js)
  ⎿  Added 74 lines
      160    return null;
      161  }
      162  
      163 +// ---------------------------------------------------------------------------                                                    
      164 +// Entity disables — granular "never import / keep drafted" switches, keyed the                                                   
      165 +// same way as MarkupRule: level is "product" (value = externalProductId) or a                                                    
      166 +// DIMENSION_ORDER key (value = that tier's raw name). reason "manual" rows are                                                   
      167 +// set from the admin UI and are never auto-cleared; reason "supplier_removed"                                                    
      168 +// rows are written by the import itself as the "deleted from the supplier's                                                      
      169 +// side" notice, and are auto-cleared if the value reappears selected.                                                            
      170 +// ---------------------------------------------------------------------------                                                    
      171 +                                                                                                                                  
      172 +export async function getEntityDisables(supplierName) {                                                                           
      173 +  return prisma.entityDisable.findMany({ where: { supplierName } });                                                              
      174 +}                                                                                                                                 
      175 +                                                                                                                                  
      176 +export async function saveEntityDisable({ supplierName, level, value, reason = "manual", note = null }) {                         
      177 +  return prisma.entityDisable.upsert({                                                                                            
      178 +    where: { supplierName_level_value: { supplierName, level, value } },                                                          
      179 +    update: { reason, note },                                                                                                     
      180 +    create: { supplierName, level, value, reason, note },                                                                         
      181 +  });                                                                                                                             
      182 +}                                                                                                                                 
      183 +                                                                                                                                  
      184 +export async function removeEntityDisable({ supplierName, level, value }) {                                                       
      185 +  return prisma.entityDisable.deleteMany({ where: { supplierName, level, value } });                                              
      186 +}                                                                                                                                 
      187 +                                                                                                                                  
      188 +export function buildDisableIndex(rows) {                                                                                         
      189 +  const index = new Map();                                                                                                        
      190 +  for (const row of rows) index.set(`${row.level}:${row.value}`, row);                                                            
      191 +  return index;                                                                                                                   
      192 +}                                                                                                                                 
      193 +                                                                                                                                  
      194 +// A product is excluded from importing when it, or any dimension value it                                                        
      195 +// carries, has an EntityDisable row. Same walk shape as resolveMarkupRule.                                                       
      196 +export function isProductDisabled(disableIndex, product) {                                                                        
      197 +  if (disableIndex.size === 0) return false;                                                                                      
      198 +  if (disableIndex.has(`product:${product.productId}`)) return true;                                                              
      199 +  const ud = product.userDetail || {};                                                                                            
      200 +  for (const dimKey of DIMENSION_ORDER) {                                                                                         
      201 +    const value = (ud[DIMENSION_FIELDS[dimKey]] || "").trim();                                                                    
      202 +    if (value && disableIndex.has(`${dimKey}:${value}`)) return true;                                                             
      203 +  }                                                                                                                               
      204 +  return false;                                                                                                                   
      205 +}                                                                                                                                 
      206 +                                                                                                                                  
      207 +// ---------------------------------------------------------------------------                                                    
      208 +// Incremental-import change detection                                                                                            
      209 +// ---------------------------------------------------------------------------                                                    
      210 +                                                                                                                                  
      211 +// Bump this whenever mapExternalToShopify/saveProductLocally mapping logic                                                       
      212 +// changes shape — it invalidates every stored hash, forcing the next run to                                                      
      213 +// re-push the full catalog through the new mapping.                                                                              
      214 +export const IMPORT_HASH_VERSION = 1;                                                                                             
      215 +                                                                                                                                  
      216 +// Digest of every input that influences what gets pushed to Shopify (and what                                                    
      217 +// saveProductLocally persists): the raw product record (details, images,                                                         
      218 +// hierarchy), its pricing entry, its stock entry, and the RESOLVED markup —                                                      
      219 +// so a MarkupRule change re-pushes affected products even when the supplier                                                      
      220 +// files are unchanged.                                                                                                           
      221 +export function computeProductHash(product, pricingEntry, stockEntry, markupRule) {                                               
      222 +  return createHash("sha256")                                                                                                     
      223 +    .update(                                                                                                                      
      224 +      JSON.stringify({                                                                                                            
      225 +        v: IMPORT_HASH_VERSION,                                                                                                   
      226 +        product,                                                                                                                  
      227 +        pricing: pricingEntry ?? null,                                                                                            
      228 +        stock: stockEntry ?? null,                                                                                                
      229 +        markup: markupRule                                                                                                        
      230 +          ? { markupPct: markupRule.markupPct ?? null, markupFlat: markupRule.markupFlat ?? null }                                
      231 +          : null,                                                                                                                 
      232 +      }),                                                                                                                         
      233 +    )                                                                                                                             
      234 +    .digest("hex");                                                                                                               
      235 +}                                                                                                                                 
      236 +                                                                                                                                  
      237  // Re-resolves the current (post-markup) sales price for a batch of already-imported
      238  // Prisma Product rows, by re-reading each row's supplier's latest price file and
      239  // re-applying markup rules — since price is never persisted on Product itself (it's

● Now update ensureCollectionsExist (republish reappeared collections, honor manual disables) and importProductBatch (hash skip + post-success
  bookkeeping).

● Update(app/services/suppliers.server.js)
  ⎿  Added 5 lines, removed 1 line
      354  
      355  // Step 1: ensure a Shopify Collection exists for every selected Collection name.
      356  // Only needs to run once per apply run (the caller only calls this at offset === 0).
      357 -export async function ensureCollectionsExist(admin, selectedCollectionTitles, publicationIds) {                                   
      357 +// When supplierName is given, also reconciles EntityDisable state for the selected                                               
      358 +// titles: manually disabled collections are skipped entirely, and collections whose                                              
      359 +// disable was import-written (deselected / supplier_removed) are republished and                                                 
      360 +// their row cleared — re-selecting a collection un-disables it.                                                                  
      361 +export async function ensureCollectionsExist(admin, selectedCollectionTitles, publicationIds, supplierName = null) {              
      362    const errors = [];
      363    let collectionsCreated = 0;
      364    // Same degrade-instead-of-throw treatment as the offset!==0 listCollections() call

● Update(app/services/suppliers.server.js)
  ⎿  Added 19 lines, removed 1 line
      378      collectionIdByTitle = new Map();
      379    }
      380  
      381 +  let collectionDisables = new Map();                                                                                             
      382 +  if (supplierName) {                                                                                                             
      383 +    const rows = await prisma.entityDisable.findMany({ where: { supplierName, level: "collections" } });                          
      384 +    collectionDisables = new Map(rows.map((r) => [r.value, r]));                                                                  
      385 +  }                                                                                                                               
      386 +                                                                                                                                  
      387    for (const title of selectedCollectionTitles) {
      382 -    if (collectionIdByTitle.has(title)) continue;                                                                                 
      388 +    const disable = collectionDisables.get(title);                                                                                
      389 +    if (disable?.reason === "manual") continue; // stays disabled until cleared in the UI                                         
      390      try {
      391 +      if (collectionIdByTitle.has(title)) {                                                                                       
      392 +        // Re-selected after an import-written disable: republish and clear the notice.                                           
      393 +        if (disable) {                                                                                                            
      394 +          if (publicationIds.length) {                                                                                            
      395 +            await withNetworkRetry(() => publishResource(admin, collectionIdByTitle.get(title), publicationIds));                 
      396 +          }                                                                                                                       
      397 +          await removeEntityDisable({ supplierName, level: "collections", value: title });                                        
      398 +        }                                                                                                                         
      399 +        continue;                                                                                                                 
      400 +      }                                                                                                                           
      401        const collection = await createCollection(admin, title);
      402        collectionIdByTitle.set(title, collection.id);
      403        collectionsCreated++;
      404        if (publicationIds.length) await publishResource(admin, collection.id, publicationIds);
      405 +      if (disable) await removeEntityDisable({ supplierName, level: "collections", value: title });                               
      406      } catch (err) {
      407        errors.push({ stage: "create-collection", title, error: err.message });
      408      }

● Now importProductBatch — hash skip, force, and post-success hash persistence.

● Update(app/services/suppliers.server.js)
  ⎿  Added 20 lines, removed 4 lines
      416  // duration is bounded by wall-clock time, not just by how many products were handed
      417  // to it — see IMPORT_BATCH_TIME_BUDGET_MS above. `processed` reports how many were
      418  // actually attempted, which may be less than productSlice.length if cut short.
      419 -export async function importProductBatch(admin, { supplierName, productSlice, pricingMap, stockMap, markupIndex, collectionIdByTit
          -le, publicationIds, deadline = Infinity }) {                                                                                      
      420 -  const results = { created: 0, updated: 0, errors: [], processed: 0 };                                                           
      419 +export async function importProductBatch(admin, { supplierName, productSlice, pricingMap, stockMap, markupIndex, collectionIdByTit
          +le, publicationIds, deadline = Infinity, force = false }) {                                                                       
      420 +  const results = { created: 0, updated: 0, skippedUnchanged: 0, errors: [], processed: 0 };                                      
      421  
      422    for (const product of productSlice) {
      423      // Always attempt at least one product per call — guarantees forward progress
     ...
      434        const pricingEntry = pricingMap.get(product.productId) || null;
      435        const stockEntry = stockMap.get(product.productId) || null;
      436        const markupRule = resolveMarkupRule(markupIndex, product);
      437 -      const mapped = mapExternalToShopify(product, pricingEntry, stockEntry, markupRule, supplierName);                           
      437 +      const hash = computeProductHash(product, pricingEntry, stockEntry, markupRule);                                             
      438  
      439        const existingProduct = await prisma.product.findUnique({
      440          where: { externalProductId: product.productId },
      441 -        select: { shopifyProductId: true },                                                                                       
      441 +        select: { shopifyProductId: true, lastPushedHash: true, active: true },                                                   
      442        });
      443  
      444 +      // Incremental import: nothing that feeds the Shopify payload has changed                                                   
      445 +      // since the last fully-successful push, so skip all ~6 GraphQL round trips.                                                
      446 +      // Inactive (disabled) rows are never skip-eligible — a re-selected product                                                 
      447 +      // must be re-pushed to flip its Shopify status back to ACTIVE.                                                             
      448 +      if (                                                                                                                        
      449 +        !force &&                                                                                                                 
      450 +        existingProduct?.shopifyProductId &&                                                                                      
      451 +        existingProduct.active &&                                                                                                 
      452 +        existingProduct.lastPushedHash === hash                                                                                   
      453 +      ) {                                                                                                                         
      454 +        results.skippedUnchanged++;                                                                                               
      455 +        continue;                                                                                                                 
      456 +      }                                                                                                                           
      457 +                                                                                                                                  
      458 +      const mapped = mapExternalToShopify(product, pricingEntry, stockEntry, markupRule, supplierName);                           
      459 +                                                                                                                                  
      460        let shopifyGid = existingProduct?.shopifyProductId;
      461        if (shopifyGid) {
      462          await withNetworkRetry(() => updateShopifyProduct(admin, shopifyGid, mapped));

● Update(app/services/suppliers.server.js)
  ⎿  Added 14 lines
      487        // different Shopify GIDs).
      488        await saveProductLocally(product, shopifyGid, "suppliers-import", stockEntry, supplierName, mapped.salesCategory);
      489  
      490 +      let pushedCleanly = true;                                                                                                   
      491        if (publicationIds.length) {
      492          try {
      493            await withNetworkRetry(() => publishResource(admin, shopifyGid, publicationIds));
      494          } catch (pubErr) {
      495 +          pushedCleanly = false;                                                                                                  
      496            results.errors.push({ stage: "publish", productId: product.productId, error: pubErr.message });
      497          }
      498        }
     ...
      500        const collectionTitle = (product.userDetail?.assignedFirstMajorDescription || "").trim();
      501        const collectionId = collectionTitle ? collectionIdByTitle.get(collectionTitle) : null;
      502        if (collectionId) await addProductsToCollection(admin, collectionId, [shopifyGid]);
      503 +                                                                                                                                  
      504 +      // Persist the hash only after the ENTIRE push (create/update + publish +                                                   
      505 +      // collection-add) succeeded — a partial failure keeps the stale hash so the                                                
      506 +      // next run re-pushes this product instead of skipping it. Also the                                                         
      507 +      // re-activation path: a previously disabled product that just re-imported                                                  
      508 +      // gets its disable bookkeeping cleared.                                                                                    
      509 +      if (pushedCleanly) {                                                                                                        
      510 +        await prisma.product.update({                                                                                             
      511 +          where: { externalProductId: product.productId },                                                                        
      512 +          data: { lastPushedHash: hash, lastPushedAt: new Date(), active: true, disabledReason: null, disabledAt: null },         
      513 +        });                                                                                                                       
      514 +      }                                                                                                                           
      515      } catch (err) {
      516        results.errors.push({ stage: "import-product", productId: product.productId, error: err.message });
      517      }

● Now the disable-pass rewrite: replacing the delete batches.

● Update(app/services/suppliers.server.js)
  ⎿  Added 95 lines, removed 35 lines
      531  }
      532  
      533  // Same wall-clock early-exit as importProductBatch (see IMPORT_BATCH_TIME_BUDGET_MS)
      534 -// — deletions cost a per-item admin.graphql() round trip too, so the same latency-                                               
      535 -// variance risk applies. `processed` reports how many were actually attempted.                                                   
      536 -export async function deleteProductBatch(admin, staleSlice, supplierName, deadline = Infinity) {                                  
      537 -  const results = { deleted: 0, skippedDeletions: [], errors: [], processed: 0 };                                                 
      534 +// — each disable costs a per-item admin.graphql() round trip too, so the same                                                    
      535 +// latency-variance risk applies. `processed` reports how many were actually attempted.                                           
      536 +// NOTHING is deleted: the Shopify product is set to DRAFT (keeping its id, media and                                             
      537 +// history) and the local row flagged inactive with a reason ("manual" — an                                                       
      538 +// EntityDisable row covers it; "deselected" — its tier was unchecked this run;                                                   
      539 +// "supplier_removed" — it vanished from the supplier's file, surfaced as a notice).                                              
      540 +export async function disableProductBatch(admin, staleSlice, resolveReason, deadline = Infinity) {                                
      541 +  const results = { disabled: 0, notices: [], errors: [], processed: 0 };                                                         
      542  
      543    for (const stale of staleSlice) {
      544      if (results.processed > 0 && Date.now() >= deadline) break;
      545      results.processed++;
      546      try {
      543 -      const sharedNameCount = await prisma.product.count({                                                                        
      544 -        where: { title: stale.title, supplierName: { not: supplierName }, active: true },                                         
      547 +      const reason = (resolveReason && resolveReason(stale)) || "deselected";                                                     
      548 +      if (stale.shopifyProductId) {                                                                                               
      549 +        await withNetworkRetry(() => setProductStatus(admin, stale.shopifyProductId, "DRAFT"));                                   
      550 +      }                                                                                                                           
      551 +      await prisma.product.update({                                                                                               
      552 +        where: { id: stale.id },                                                                                                  
      553 +        data: { active: false, disabledReason: reason, disabledAt: new Date() },                                                  
      554        });
      546 -      if (sharedNameCount > 0) {                                                                                                  
      547 -        results.skippedDeletions.push({ type: "product", name: stale.title });                                                    
      548 -        continue;                                                                                                                 
      555 +      results.disabled++;                                                                                                         
      556 +      if (reason === "supplier_removed") {                                                                                        
      557 +        results.notices.push({                                                                                                    
      558 +          type: "product",                                                                                                        
      559 +          name: stale.title,                                                                                                      
      560 +          reason,                                                                                                                 
      561 +          message: `"${stale.title}" was deleted on the supplier's side — product disabled (set to Draft), not deleted.`,         
      562 +        });                                                                                                                       
      563        }
      550 -      if (stale.shopifyProductId) await deleteProduct(admin, stale.shopifyProductId);                                             
      551 -      await prisma.product.delete({ where: { id: stale.id } });                                                                   
      552 -      results.deleted++;                                                                                                          
      564      } catch (err) {
      554 -      results.errors.push({ stage: "delete-product", title: stale.title, error: err.message });                                   
      565 +      results.errors.push({ stage: "disable-product", title: stale.title, error: err.message });                                  
      566      }
      567    }
      568  
      569    return results;
      570  }
      571  
      561 -// Step 4: collections that were fully de-selected — unless another supplier still                                                
      562 -// has products assigned to that same collection name.                                                                            
      563 -export function computeCollectionsToDelete(products, selectedCollectionTitles) {                                                  
      564 -  const collectionNamesInFile = new Set(                                                                                          
      572 +// Step 4: collections to UNPUBLISH (never deleted) — with the reason for each:                                                   
      573 +// "deselected" (title still in the supplier file but unchecked this run) or                                                      
      574 +// "supplier_removed" (this supplier's local products carry the title but the new                                                 
      575 +// file no longer mentions it). Excludes titles that already have an EntityDisable                                                
      576 +// row (processed on a previous pass/run — this is also what makes the remaining                                                  
      577 +// count shrink across passes, since unpublished collections still appear in                                                      
      578 +// listCollections) and titles another supplier's active products still use                                                       
      579 +// (reported in `skipped`, collection stays published).                                                                           
      580 +export async function computeCollectionsToUnpublish(supplierName, products, selectedCollectionTitles, disableIndex) {             
      581 +  const reasonByTitle = new Map();                                                                                                
      582 +                                                                                                                                  
      583 +  const titlesInFile = new Set(                                                                                                   
      584      products.map((p) => (p.userDetail?.assignedFirstMajorDescription || "").trim()).filter(Boolean),
      585    );
      567 -  return [...collectionNamesInFile].filter((title) => !selectedCollectionTitles.has(title));                                      
      586 +  for (const title of titlesInFile) {                                                                                             
      587 +    if (!selectedCollectionTitles.has(title)) reasonByTitle.set(title, "deselected");                                             
      588 +  }                                                                                                                               
      589 +                                                                                                                                  
      590 +  const localRows = await prisma.product.findMany({                                                                               
      591 +    where: { supplierName },                                                                                                      
      592 +    select: { userDetail: { select: { assignedFirstMajorDescription: true } } },                                                  
      593 +  });                                                                                                                             
      594 +  for (const row of localRows) {                                                                                                  
      595 +    const title = (row.userDetail?.assignedFirstMajorDescription || "").trim();                                                   
      596 +    if (title && !titlesInFile.has(title)) reasonByTitle.set(title, "supplier_removed");                                          
      597 +  }                                                                                                                               
      598 +                                                                                                                                  
      599 +  const candidates = [];                                                                                                          
      600 +  const skipped = [];                                                                                                             
      601 +  for (const [title, reason] of reasonByTitle) {                                                                                  
      602 +    if (disableIndex?.has(`collections:${title}`)) continue; // already disabled                                                  
      603 +    const sharedNameCount = await prisma.product.count({                                                                          
      604 +      where: {                                                                                                                    
      605 +        supplierName: { not: supplierName },                                                                                      
      606 +        active: true,                                                                                                             
      607 +        userDetail: { is: { assignedFirstMajorDescription: title } },                                                             
      608 +      },                                                                                                                          
      609 +    });                                                                                                                           
      610 +    if (sharedNameCount > 0) {                                                                                                    
      611 +      skipped.push({ type: "collection", name: title });                                                                          
      612 +      continue;                                                                                                                   
      613 +    }                                                                                                                             
      614 +    candidates.push({ title, reason });                                                                                           
      615 +  }                                                                                                                               
      616 +                                                                                                                                  
      617 +  return { candidates, skipped };                                                                                                 
      618  }
      619  
      570 -export async function deleteCollectionBatch(admin, titlesSlice, collectionIdByTitle, supplierName, deadline = Infinity) {         
      571 -  const results = { collectionsDeleted: 0, skippedDeletions: [], errors: [], processed: 0 };                                      
      620 +export async function unpublishCollectionBatch(admin, candidateSlice, collectionIdByTitle, supplierName, publicationIds, deadline 
          += Infinity) {                                                                                                                     
      621 +  const results = { collectionsUnpublished: 0, notices: [], errors: [], processed: 0 };                                           
      622  
      573 -  for (const title of titlesSlice) {                                                                                              
      623 +  for (const { title, reason } of candidateSlice) {                                                                               
      624      if (results.processed > 0 && Date.now() >= deadline) break;
      625      results.processed++;
      576 -    const collectionId = collectionIdByTitle.get(title);                                                                          
      577 -    if (!collectionId) continue;                                                                                                  
      626      try {
      579 -      const sharedNameCount = await prisma.product.count({                                                                        
      580 -        where: {                                                                                                                  
      581 -          supplierName: { not: supplierName },                                                                                    
      582 -          active: true,                                                                                                           
      583 -          userDetail: { is: { assignedFirstMajorDescription: title } },                                                           
      584 -        },                                                                                                                        
      627 +      const collectionId = collectionIdByTitle.get(title);                                                                        
      628 +      if (collectionId && publicationIds.length) {                                                                                
      629 +        await withNetworkRetry(() => unpublishResource(admin, collectionId, publicationIds));                                     
      630 +      }                                                                                                                           
      631 +      // The EntityDisable row is both the persisted notice and the marker that                                                   
      632 +      // this title has been handled (see computeCollectionsToUnpublish).                                                         
      633 +      await saveEntityDisable({                                                                                                   
      634 +        supplierName,                                                                                                             
      635 +        level: "collections",                                                                                                     
      636 +        value: title,                                                                                                             
      637 +        reason,                                                                                                                   
      638 +        note:                                                                                                                     
      639 +          reason === "supplier_removed"                                                                                           
      640 +            ? "Deleted on the supplier's side — collection unpublished, not deleted."                                             
      641 +            : "De-selected in an import run — collection unpublished, not deleted.",                                              
      642        });
      586 -      if (sharedNameCount > 0) {                                                                                                  
      587 -        results.skippedDeletions.push({ type: "collection", name: title });                                                       
      588 -        continue;                                                                                                                 
      643 +      results.collectionsUnpublished++;                                                                                           
      644 +      if (reason === "supplier_removed") {                                                                                        
      645 +        results.notices.push({                                                                                                    
      646 +          type: "collection",                                                                                                     
      647 +          name: title,                                                                                                            
      648 +          reason,                                                                                                                 
      649 +          message: `Collection "${title}" was deleted on the supplier's side — unpublished from all sales channels, not deleted.`,
      650 +        });                                                                                                                       
      651        }
      590 -      await deleteCollection(admin, collectionId);                                                                                
      591 -      results.collectionsDeleted++;                                                                                               
      652      } catch (err) {
      593 -      results.errors.push({ stage: "delete-collection", title, error: err.message });                                             
      653 +      results.errors.push({ stage: "unpublish-collection", title, error: err.message });                                          
      654      }
      655    }
      656  

● Now runImportBatch and the runFinalizeBatch → runDisablePass rewrite.

● Update(app/services/suppliers.server.js)
  ⎿  Added 18 lines, removed 3 lines
      670  // above) rather than requiring a persisted job row; safe to resume from any offset
      671  // since importProductBatch's create/update decision is idempotent (always checked
      672  // against Prisma first).
      673 -export async function runImportBatch(admin, { supplierName, products, pricing = [], stock = [], selections, offset = 0, batchSize 
          -= IMPORT_BATCH_SIZE, timeBudgetMs = IMPORT_BATCH_TIME_BUDGET_MS }) {                                                              
      673 +export async function runImportBatch(admin, { supplierName, products, pricing = [], stock = [], selections, offset = 0, batchSize 
          += IMPORT_BATCH_SIZE, timeBudgetMs = IMPORT_BATCH_TIME_BUDGET_MS, force = false }) {                                               
      674    // Started before the collection-setup step below, so that work also counts
      675    // against the budget, not just the per-product loop.
      676    const deadline = Date.now() + timeBudgetMs;
     ...
      679    const pricingMap = new Map(pricing.map((e) => [e.productNumber, e]));
      680    const stockMap = new Map(stock.map((e) => [e.productNumber, e]));
      681    const markupIndex = buildMarkupIndex(await getMarkupRules(supplierName));
      682 -  const toImport = products.filter((p) => passesSelection(p, selectedSets));                                                      
      682 +  const disableIndex = buildDisableIndex(await getEntityDisables(supplierName));                                                  
      683  
      684 +  // Both filters are deterministic for a given (file snapshot, selections,                                                       
      685 +  // disable rows) so toImport stays stable across the run's offset-sliced calls.                                                 
      686 +  // skippedDisabled is the ABSOLUTE count for the whole selection, not a                                                         
      687 +  // per-batch increment — callers should set, not accumulate, it.                                                                
      688 +  let skippedDisabled = 0;                                                                                                        
      689 +  const toImport = [];                                                                                                            
      690 +  for (const p of products) {                                                                                                     
      691 +    if (!passesSelection(p, selectedSets)) continue;                                                                              
      692 +    if (isProductDisabled(disableIndex, p)) {                                                                                     
      693 +      skippedDisabled++;                                                                                                          
      694 +      continue;                                                                                                                   
      695 +    }                                                                                                                             
      696 +    toImport.push(p);                                                                                                             
      697 +  }                                                                                                                               
      698 +                                                                                                                                  
      699    const errors = [];
      700    let publicationIds = [];
      701    try {
     ...
      707    let collectionIdByTitle;
      708    let collectionsCreated = 0;
      709    if (offset === 0) {
      695 -    const ensured = await ensureCollectionsExist(admin, selectedSets.collections, publicationIds);                                
      710 +    const ensured = await ensureCollectionsExist(admin, selectedSets.collections, publicationIds, supplierName);                  
      711      collectionIdByTitle = ensured.collectionIdByTitle;
      712      collectionsCreated = ensured.collectionsCreated;
      713      errors.push(...ensured.errors);

● Update(app/services/suppliers.server.js)
  ⎿  Added 3 lines
      739      collectionIdByTitle,
      740      publicationIds,
      741      deadline,
      742 +    force,                                                                                                                        
      743    });
      744  
      745    return {
     ...
      747      total: toImport.length,
      748      created: batchResult.created,
      749      updated: batchResult.updated,
      750 +    skippedUnchanged: batchResult.skippedUnchanged,                                                                               
      751 +    skippedDisabled,                                                                                                              
      752      collectionsCreated,
      753      errors: [...errors, ...batchResult.errors],
      754    };

● Update(app/services/suppliers.server.js)
  ⎿  Added 56 lines, removed 25 lines
      755  }
      756  
      757  // Orchestrator for steps 3-4 (run only after runImportBatch reports offset >= total).
      758 -// Walks the stale-products list first, then the collections-to-delete list, chunked                                              
      759 -// the same way as runImportBatch — with one key difference from runImportBatch:                                                  
      760 -// deletion candidates SHRINK as a side effect of processing (a deleted product no                                                
      761 -// longer shows up in the next prisma.product.findMany(), a deleted collection no                                                 
      762 -// longer shows up in the next listCollections()). That means, unlike the static                                                  
      763 -// toImport list, an offset indexed into a freshly-requeried list would skip past                                                 
      764 -// remaining work or read stale positions. So each call always takes from the FRONT                                               
      765 -// of whatever's still there, and progress is reported as "remaining", not an offset.                                             
      766 -export async function runFinalizeBatch(admin, { supplierName, products, selections, batchSize = IMPORT_BATCH_SIZE, timeBudgetMs = 
          -IMPORT_BATCH_TIME_BUDGET_MS }) {                                                                                                  
      758 +// Formerly runFinalizeBatch, which hard-DELETED stale products and collections —                                                 
      759 +// this pass instead DISABLES: stale products go to Shopify status DRAFT (+ local                                                 
      760 +// active:false with a reason), stale collections are unpublished from all sales                                                  
      761 +// channels (+ an EntityDisable row as the persisted notice). Nothing is ever                                                     
      762 +// deleted from Shopify or the local db.                                                                                          
      763 +// Chunking works like the old finalize pass: candidates SHRINK as a side effect of                                               
      764 +// processing (a disabled product drops out of computeStaleProducts' active:true                                                  
      765 +// filter, an unpublished collection's EntityDisable row excludes it from                                                         
      766 +// computeCollectionsToUnpublish). So each call takes from the FRONT of whatever's                                                
      767 +// still there, and progress is reported as "remaining", not an offset.                                                           
      768 +export async function runDisablePass(admin, { supplierName, products, selections, batchSize = IMPORT_BATCH_SIZE, timeBudgetMs = IM
          +PORT_BATCH_TIME_BUDGET_MS }) {                                                                                                    
      769    const deadline = Date.now() + timeBudgetMs;
      770  
      771    const selectedSets = buildSelectedSets(selections);
      770 -  const toImport = products.filter((p) => passesSelection(p, selectedSets));                                                      
      772 +  const disableIndex = buildDisableIndex(await getEntityDisables(supplierName));                                                  
      773 +  const toImport = products.filter(                                                                                               
      774 +    (p) => passesSelection(p, selectedSets) && !isProductDisabled(disableIndex, p),                                               
      775 +  );                                                                                                                              
      776    const importedIds = new Set(toImport.map((p) => p.productId));
      777  
      778    const staleProducts = await computeStaleProducts(supplierName, importedIds);
      779  
      780    if (staleProducts.length > 0) {
      781 +    // Why is this product being disabled? Absent from the file entirely →                                                        
      782 +    // supplier_removed (surfaced as a "deleted on the supplier's side" notice);                                                  
      783 +    // present but covered by an EntityDisable row → manual; otherwise its tier                                                   
      784 +    // was unchecked for this run → deselected.                                                                                   
      785 +    const inFileById = new Map(products.map((p) => [p.productId, p]));                                                            
      786 +    const resolveReason = (stale) => {                                                                                            
      787 +      const fileProduct = inFileById.get(stale.externalProductId);                                                                
      788 +      if (!fileProduct) return "supplier_removed";                                                                                
      789 +      if (isProductDisabled(disableIndex, fileProduct)) return "manual";                                                          
      790 +      return "deselected";                                                                                                        
      791 +    };                                                                                                                            
      792 +                                                                                                                                  
      793      const slice = staleProducts.slice(0, batchSize);
      777 -    const result = await deleteProductBatch(admin, slice, supplierName, deadline);                                                
      794 +    const result = await disableProductBatch(admin, slice, resolveReason, deadline);                                              
      795      return {
      796        productsRemaining: staleProducts.length - result.processed,
      797        collectionsRemaining: null, // not yet known — collections phase hasn't started
      781 -      deleted: result.deleted,                                                                                                    
      782 -      collectionsDeleted: 0,                                                                                                      
      783 -      skippedDeletions: result.skippedDeletions,                                                                                  
      798 +      disabled: result.disabled,                                                                                                  
      799 +      collectionsUnpublished: 0,                                                                                                  
      800 +      skipped: [],                                                                                                                
      801 +      notices: result.notices,                                                                                                    
      802        errors: result.errors,
      803        done: false,
      804      };
     ...
      806  
      807    // Same degrade-instead-of-throw treatment as runImportBatch's listCollections() calls
      808    // (see ensureCollectionsExist and the offset!==0 branch above) — a bare admin.graphql()
      791 -  // failure here would otherwise propagate uncaught and abort the whole finalize run.                                            
      792 -  // Degrading to an empty map makes collectionsToDelete filter down to nothing this                                              
      793 -  // pass (no title matches), so this call self-heals on the next Apply/Finalize pass.                                            
      809 +  // failure here would otherwise propagate uncaught and abort the whole disable pass.                                            
      810 +  // Degrading to an empty map means collections just don't get unpublished this pass                                             
      811 +  // (their EntityDisable row is still written), self-healing on the next pass/run.                                               
      812    const preErrors = [];
      813    let collectionIdByTitle;
      814    try {
     ...
      818      preErrors.push({ stage: "list-collections", error: err.message });
      819      collectionIdByTitle = new Map();
      820    }
      803 -  const collectionsToDelete = computeCollectionsToDelete(products, selectedSets.collections)                                      
      804 -    .filter((title) => collectionIdByTitle.has(title));                                                                           
      821  
      806 -  const slice = collectionsToDelete.slice(0, batchSize);                                                                          
      807 -  const result = await deleteCollectionBatch(admin, slice, collectionIdByTitle, supplierName, deadline);                          
      808 -  const remaining = collectionsToDelete.length - result.processed;                                                                
      822 +  let publicationIds = [];                                                                                                        
      823 +  try {                                                                                                                           
      824 +    publicationIds = await getAllPublicationIds(admin);                                                                           
      825 +  } catch (err) {                                                                                                                 
      826 +    preErrors.push({ stage: "publications", error: err.message });                                                                
      827 +  }                                                                                                                               
      828  
      829 +  const { candidates, skipped } = await computeCollectionsToUnpublish(                                                            
      830 +    supplierName,                                                                                                                 
      831 +    products,                                                                                                                     
      832 +    selectedSets.collections,                                                                                                     
      833 +    disableIndex,                                                                                                                 
      834 +  );                                                                                                                              
      835 +                                                                                                                                  
      836 +  const slice = candidates.slice(0, batchSize);                                                                                   
      837 +  const result = await unpublishCollectionBatch(admin, slice, collectionIdByTitle, supplierName, publicationIds, deadline);       
      838 +  const remaining = candidates.length - result.processed;                                                                         
      839 +                                                                                                                                  
      840    return {
      841      productsRemaining: 0,
      842      collectionsRemaining: remaining,
      813 -    deleted: 0,                                                                                                                   
      814 -    collectionsDeleted: result.collectionsDeleted,                                                                                
      815 -    skippedDeletions: result.skippedDeletions,                                                                                    
      843 +    disabled: 0,                                                                                                                  
      844 +    collectionsUnpublished: result.collectionsUnpublished,                                                                        
      845 +    skipped,                                                                                                                      
      846 +    notices: result.notices,                                                                                                      
      847      errors: [...preErrors, ...result.errors],
      848      done: remaining <= 0,
      849    };

  Searched for 1 pattern (ctrl+o to expand)

● Write(app/services/import-run.server.js)
  ⎿  Wrote 440 lines to app/services/import-run.server.js
       1 // Server-side supplier-import job runner.
       2 //
       3 // Why this exists: the import used to be driven by the BROWSER — app.import.jsx
       4 // resubmitted one ~60s POST per 15-product batch, ~137 batches per full run,
       5 // every one of them held open through the Cloudflare tunnel. A single dropped
       6 // request (tunnel blip, 502 "context canceled", closed tab) killed the whole
       7 // multi-hour run, with no retry. Here the run executes as an in-process
       8 // background job instead: one short POST starts it, the UI polls the ImportRun
       9 // row every few seconds, and transport failures between browser and server can
      10 // no longer touch the run itself.
     … +430 lines (ctrl+o to expand)

● Update(app/routes/app.import.jsx)
  ⎿  Added 4 lines
      11    return import("../services/suppliers.server.js");
      12  }
      13  
      14 +async function getImportRunService() {                                                                                             
      15 +  return import("../services/import-run.server.js");                                                                               
      16 +}                                                                                                                                  
      17 +                                                                                                                                   
      18  const DIMENSION_KEYS = ["collections", "brands", "subCollections", "subCatCollections"];
      19  const DIMENSION_LABELS = {
      20    collections: "Collection",

● Update(app/routes/app.import.jsx)
  ⎿  Added 7 lines, removed 1 line
      56      const markupByKey = Object.fromEntries(
      57        markupRules.map((r) => [`${r.level}:${r.value}`, { markupPct: r.markupPct, markupFlat: r.markupFlat }]),
      58      );
      59 -    supplierData = { fileNames, hierarchy, existingSelections, productCount: products.length, markupByKey };                       
      59 +    const disableRows = await suppliersSvc.getEntityDisables(selectedSupplier);                                                    
      60 +    const disablesByKey = Object.fromEntries(                                                                                      
      61 +      disableRows.map((r) => [`${r.level}:${r.value}`, { reason: r.reason, note: r.note }]),                                       
      62 +    );                                                                                                                             
      63 +    const importRunSvc = await getImportRunService();                                                                              
      64 +    const runStatus = await importRunSvc.getRunStatus(selectedSupplier);                                                           
      65 +    supplierData = { fileNames, hierarchy, existingSelections, productCount: products.length, markupByKey, disablesByKey, runStatus
         + };                                                                                                                                
      66    }
      67  
      68    return { supplierFolders, selectedSupplier, supplierData };

● Update(app/routes/app.import.jsx)
  ⎿  Added 52 lines, removed 25 lines
      69  };
      70  
      71  export const action = async ({ request }) => {
      72 -  const { admin } = await authenticate.admin(request);                                                                             
      72 +  const { admin, session } = await authenticate.admin(request);                                                                    
      73    const formData = await request.formData();
      74    const intent = formData.get("intent");
      75    const svc = await getService();
      76  
      77 -  if (intent === "apply-supplier-import-batch") {                                                                                  
      77 +  // The import itself runs as a server-side background job (import-run.server.js)                                                 
      78 +  // — these intents only start/observe/steer it, so every request is short-lived                                                  
      79 +  // and a dropped poll can't hurt the run.                                                                                        
      80 +  if (intent === "start-supplier-import") {                                                                                        
      81      const supplierName = formData.get("supplierName");
      82      if (!supplierName) return { error: "No supplier selected" };
      83  
     ...
       87      } catch {
       88        return { error: "Invalid selections payload" };
       89      }
       87 -    const offset = Number(formData.get("offset")) || 0;                                                                           
       90 +    const force = formData.get("force") === "true";                                                                               
       91  
       92      try {
       90 -      const suppliersSvc = await getSuppliersService();                                                                           
       91 -      const { products, pricing, stock } = suppliersSvc.loadSupplierData(supplierName);                                           
       92 -      const result = await suppliersSvc.runImportBatch(admin, {                                                                   
       93 +      const importRunSvc = await getImportRunService();                                                                           
       94 +      const { runId } = await importRunSvc.startImportRun({                                                                       
       95 +        shop: session.shop,                                                                                                       
       96          supplierName,
       94 -        products,                                                                                                                 
       95 -        pricing,                                                                                                                  
       96 -        stock,                                                                                                                    
       97          selections,
       98 -        offset,                                                                                                                   
       98 +        force,                                                                                                                    
       99        });
      100 -      return { completed: true, intent: "apply-supplier-import-batch", supplierName, ...result };                                 
      100 +      return { completed: true, intent: "start-supplier-import", supplierName, runId };                                           
      101      } catch (err) {
      102 -      return { error: `Supplier import batch failed: ${err.message}` };                                                           
      102 +      return { error: `Starting supplier import failed: ${err.message}` };                                                        
      103      }
      104    }
      105  
      106 -  if (intent === "apply-supplier-import-finalize-batch") {                                                                        
      106 +  if (intent === "import-run-status") {                                                                                           
      107      const supplierName = formData.get("supplierName");
      108      if (!supplierName) return { error: "No supplier selected" };
      109 +    try {                                                                                                                         
      110 +      const importRunSvc = await getImportRunService();                                                                           
      111 +      const run = await importRunSvc.getRunStatus(supplierName);                                                                  
      112 +      return { completed: true, intent: "import-run-status", supplierName, run };                                                 
      113 +    } catch (err) {                                                                                                               
      114 +      return { error: `Fetching import status failed: ${err.message}` };                                                          
      115 +    }                                                                                                                             
      116 +  }                                                                                                                               
      117  
      110 -    let selections;                                                                                                               
      118 +  if (intent === "cancel-supplier-import") {                                                                                      
      119 +    const runId = formData.get("runId");                                                                                          
      120 +    if (!runId) return { error: "No run id" };                                                                                    
      121 +    const importRunSvc = await getImportRunService();                                                                             
      122 +    const result = importRunSvc.cancelRun(runId);                                                                                 
      123 +    return { completed: true, intent: "cancel-supplier-import", runId, ...result };                                               
      124 +  }                                                                                                                               
      125 +                                                                                                                                  
      126 +  if (intent === "resume-supplier-import") {                                                                                      
      127 +    const runId = formData.get("runId");                                                                                          
      128 +    if (!runId) return { error: "No run id" };                                                                                    
      129      try {
      112 -      selections = JSON.parse(formData.get("selections") || "{}");                                                                
      113 -    } catch {                                                                                                                     
      114 -      return { error: "Invalid selections payload" };                                                                             
      130 +      const importRunSvc = await getImportRunService();                                                                           
      131 +      await importRunSvc.resumeRun({ runId, shop: session.shop });                                                                
      132 +      return { completed: true, intent: "resume-supplier-import", runId };                                                        
      133 +    } catch (err) {                                                                                                               
      134 +      return { error: `Resuming import failed: ${err.message}` };                                                                 
      135      }
      136 +  }                                                                                                                               
      137  
      138 +  if (intent === "save-entity-disable" || intent === "remove-entity-disable") {                                                   
      139 +    const supplierName = formData.get("supplierName");                                                                            
      140 +    const level = formData.get("level");                                                                                          
      141 +    const value = formData.get("value");                                                                                          
      142 +    if (!supplierName || !level || !value) {                                                                                      
      143 +      return { error: "Missing supplierName, level, or value for disable toggle" };                                               
      144 +    }                                                                                                                             
      145      try {
      146        const suppliersSvc = await getSuppliersService();
      119 -      const { products } = suppliersSvc.loadSupplierData(supplierName);                                                           
      120 -      const result = await suppliersSvc.runFinalizeBatch(admin, {                                                                 
      121 -        supplierName,                                                                                                             
      122 -        products,                                                                                                                 
      123 -        selections,                                                                                                               
      124 -      });                                                                                                                         
      125 -      return { completed: true, intent: "apply-supplier-import-finalize-batch", supplierName, ...result };                        
      147 +      if (intent === "save-entity-disable") {                                                                                     
      148 +        await suppliersSvc.saveEntityDisable({ supplierName, level, value, reason: "manual" });                                   
      149 +      } else {                                                                                                                    
      150 +        await suppliersSvc.removeEntityDisable({ supplierName, level, value });                                                   
      151 +      }                                                                                                                           
      152 +      return { completed: true, intent, level, value, disabled: intent === "save-entity-disable" };                               
      153      } catch (err) {
      127 -      return { error: `Supplier import finalize failed: ${err.message}` };                                                        
      154 +      return { error: `Updating disable state failed: ${err.message}` };                                                          
      155      }
      156    }
      157  

● Now the UI components — disable toggle per row, then the panel rewrite.

● Update(app/routes/app.import.jsx)
  ⎿  Added 38 lines
      270    );
      271  }
      272  
      273 +// Per-row manual Disable/Enable toggle backed by an EntityDisable row. A disabled                                                
      274 +// tier's products are excluded from every import run and (once an import runs)                                                   
      275 +// set to Draft in Shopify — never deleted. Uses its own fetcher per row, same                                                    
      276 +// pattern as MarkupInputs. Local state is optimistic; the loader re-syncs it on                                                  
      277 +// the next page load.                                                                                                            
      278 +function DisableToggle({ supplierName, level, value, existingDisable }) {                                                         
      279 +  const fetcher = useFetcher();                                                                                                   
      280 +  const [disable, setDisable] = useState(existingDisable || null);                                                                
      281 +  const isSaving = fetcher.state !== "idle";                                                                                      
      282 +                                                                                                                                  
      283 +  function handleToggle() {                                                                                                       
      284 +    const next = disable ? null : { reason: "manual", note: null };                                                               
      285 +    fetcher.submit(                                                                                                               
      286 +      {                                                                                                                           
      287 +        intent: next ? "save-entity-disable" : "remove-entity-disable",                                                           
      288 +        supplierName,                                                                                                             
      289 +        level,                                                                                                                    
      290 +        value,                                                                                                                    
      291 +      },                                                                                                                          
      292 +      { method: "POST" },                                                                                                         
      293 +    );                                                                                                                            
      294 +    setDisable(next);                                                                                                             
      295 +  }                                                                                                                               
      296 +                                                                                                                                  
      297 +  return (                                                                                                                        
      298 +    <s-stack direction="inline" gap="small-200" alignItems="center">                                                              
      299 +      <s-button variant="tertiary" size="slim" {...(isSaving ? { loading: true } : {})} onClick={handleToggle}>                   
      300 +        {disable ? "Enable" : "Disable"}                                                                                          
      301 +      </s-button>                                                                                                                 
      302 +      {disable && (                                                                                                               
      303 +        <s-badge tone="warning">                                                                                                  
      304 +          {disable.reason === "supplier_removed" ? "Removed by supplier" : "Disabled"}                                            
      305 +        </s-badge>                                                                                                                
      306 +      )}                                                                                                                          
      307 +    </s-stack>                                                                                                                    
      308 +  );                                                                                                                              
      309 +}                                                                                                                                 
      310 +                                                                                                                                  
      311  function nodeIsEnabled(dimKey, node, selected) {
      312    return ANCESTOR_DIMENSIONS[dimKey].every((ancestorKey) => {
      313      const ancestorValues = node[ancestorKey] || [];

● Update(app/routes/app.import.jsx)
  ⎿  Added 7 lines, removed 1 line
      339    return { selectedGroup, availableGroup, disabledGroup };
      340  }
      341  
      342 -function NodeRow({ dimKey, node, checked, disabled, isNew, onToggle, supplierName, markupByKey }) {                               
      342 +function NodeRow({ dimKey, node, checked, disabled, isNew, onToggle, supplierName, markupByKey, disablesByKey }) {                
      343    return (
      344      <s-stack direction="block" gap="small-200">
      345        <s-stack direction="inline" gap="small-200" alignItems="center">
     ...
      350            onChange={() => onToggle(dimKey, node.name)}
      351          ></s-checkbox>
      352          {isNew && <s-badge tone="success">New</s-badge>}
      353 +        <DisableToggle                                                                                                            
      354 +          supplierName={supplierName}                                                                                             
      355 +          level={dimKey}                                                                                                          
      356 +          value={node.name}                                                                                                       
      357 +          existingDisable={disablesByKey[`${dimKey}:${node.name}`]}                                                               
      358 +        />                                                                                                                        
      359        </s-stack>
      360        <MarkupInputs
      361          supplierName={supplierName}

● Update(app/routes/app.import.jsx)
  ⎿  Added 1 line, removed 1 line
      381    );
      382  }
      383  
      384 -function HierarchyCheckboxList({ dimKey, nodes, selected, existingSelections, onToggle, onSelectAll, supplierName, markupByKey }) 
          -{                                                                                                                                 
      384 +function HierarchyCheckboxList({ dimKey, nodes, selected, existingSelections, onToggle, onSelectAll, supplierName, markupByKey, di
          +sablesByKey }) {                                                                                                                  
      385    const [collapsed, setCollapsed] = useState({ selected: false, available: false, disabled: true });
      386  
      387    if (nodes.length === 0) {

● Update(app/routes/app.import.jsx)
  ⎿  Added 1 line
      406          onToggle={onToggle}
      407          supplierName={supplierName}
      408          markupByKey={markupByKey}
      409 +        disablesByKey={disablesByKey}                                                                                             
      410        />
      411      );
      412    }

● Now the core panel rewrite — replacing the driver state machine with polling.

● Update(app/routes/app.import.jsx)
  ⎿  Added 51 lines, removed 76 lines
      437    );
      438  }
      439  
      440 -const EMPTY_RUN = {                                                                                                               
      441 -  active: false,                                                                                                                  
      442 -  phase: "idle", // idle | importing | finalizing | done                                                                          
      443 -  offset: 0,                                                                                                                      
      444 -  total: 0,                                                                                                                       
      445 -  productsRemaining: 0,                                                                                                           
      446 -  collectionsRemaining: 0,                                                                                                        
      447 -  productsCreated: 0,                                                                                                             
      448 -  productsUpdated: 0,                                                                                                             
      449 -  productsDeleted: 0,                                                                                                             
      450 -  collectionsCreated: 0,                                                                                                          
      451 -  collectionsDeleted: 0,                                                                                                          
      452 -  skippedDeletions: [],                                                                                                           
      453 -  errors: [],                                                                                                                     
      454 -};                                                                                                                                
      440 +const POLL_INTERVAL_MS = 3000;                                                                                                    
      441  
      442  function SupplierImportPanel({ supplierName, supplierData }) {
      457 -  const fetcher = useFetcher();                                                                                                   
      458 -  const isLoading = ["loading", "submitting"].includes(fetcher.state);                                                            
      459 -  const data = fetcher.data;                                                                                                      
      443 +  // The import runs as a server-side background job (import-run.server.js).                                                      
      444 +  // startFetcher issues the short-lived start/cancel/resume commands; statusFetcher                                              
      445 +  // polls the run row every few seconds while a run is live. Unlike the previous                                                 
      446 +  // browser-driven batch loop, a dropped request here (tunnel blip, 502, closed                                                  
      447 +  // tab) cannot kill the run — the next poll just picks the status back up.                                                      
      448 +  const startFetcher = useFetcher();                                                                                              
      449 +  const statusFetcher = useFetcher();                                                                                             
      450  
      461 -  const { hierarchy, existingSelections, fileNames, productCount, markupByKey } = supplierData;                                   
      451 +  const { hierarchy, existingSelections, fileNames, productCount, markupByKey, disablesByKey, runStatus } = supplierData;         
      452  
      453    const [selected, setSelected] = useState(() => toSelectionState(existingSelections));
      454    const [acknowledged, setAcknowledged] = useState(false);
      465 -  const [run, setRun] = useState(EMPTY_RUN);                                                                                      
      466 -  const selectionsRef = useRef(null); // captured once per run, so mid-run checkbox edits don't affect it                         
      467 -  const lastHandledRef = useRef(null);                                                                                            
      455 +  const [force, setForce] = useState(false);                                                                                      
      456 +  const [run, setRun] = useState(runStatus || null);                                                                              
      457  
      469 -  // Batched "Apply Changes" — each request only processes a small slice of products                                              
      470 -  // (see IMPORT_BATCH_SIZE in suppliers.server.js) to stay well under Cloudflare's                                               
      471 -  // ~100s edge timeout on large catalogs. This effect drives the batch/finalize loop                                             
      472 -  // forward every time a request settles, until the whole run is done.                                                           
      473 -  useEffect(() => {                                                                                                               
      474 -    if (!run.active || isLoading || !data || data === lastHandledRef.current) return;                                             
      475 -    lastHandledRef.current = data;                                                                                                
      458 +  const isStarting = startFetcher.state !== "idle";                                                                               
      459 +  const commandError = startFetcher.data?.error || null;                                                                          
      460  
      477 -    if (data.error) {                                                                                                             
      478 -      setRun((prev) => ({ ...prev, active: false, errors: [...prev.errors, { stage: "run", error: data.error }] }));              
      479 -      return;                                                                                                                     
      480 -    }                                                                                                                             
      481 -                                                                                                                                  
      482 -    if (data.intent === "apply-supplier-import-batch") {                                                                          
      483 -      setRun((prev) => ({                                                                                                         
      484 -        ...prev,                                                                                                                  
      461 +  // Reflect start/resume responses immediately (a synthetic "running" shell until                                                
      462 +  // the first poll lands with real numbers).                                                                                     
      463 +  useEffect(() => {                                                                                                               
      464 +    const data = startFetcher.data;                                                                                               
      465 +    if (!data) return;                                                                                                            
      466 +    if (data.intent === "start-supplier-import" && data.runId) {                                                                  
      467 +      setRun({                                                                                                                    
      468 +        id: data.runId,                                                                                                           
      469 +        status: "running",                                                                                                        
      470          phase: "importing",
      486 -        offset: data.offset,                                                                                                      
      487 -        total: data.total,                                                                                                        
      488 -        productsCreated: prev.productsCreated + data.created,                                                                     
      489 -        productsUpdated: prev.productsUpdated + data.updated,                                                                     
      490 -        collectionsCreated: prev.collectionsCreated + data.collectionsCreated,                                                    
      491 -        errors: [...prev.errors, ...data.errors],                                                                                 
      492 -      }));                                                                                                                        
      493 -                                                                                                                                  
      494 -      if (data.offset < data.total) {                                                                                             
      495 -        fetcher.submit(                                                                                                           
      496 -          { intent: "apply-supplier-import-batch", supplierName, selections: selectionsRef.current, offset: String(data.offset) },
      497 -          { method: "POST" },                                                                                                     
      498 -        );                                                                                                                        
      499 -      } else {                                                                                                                    
      500 -        fetcher.submit(                                                                                                           
      501 -          { intent: "apply-supplier-import-finalize-batch", supplierName, selections: selectionsRef.current },                    
      502 -          { method: "POST" },                                                                                                     
      503 -        );                                                                                                                        
      504 -      }                                                                                                                           
      505 -      return;                                                                                                                     
      471 +        offset: 0,                                                                                                                
      472 +        total: 0,                                                                                                                 
      473 +        created: 0,                                                                                                               
      474 +        updated: 0,                                                                                                               
      475 +        skippedUnchanged: 0,                                                                                                      
      476 +        productsDisabled: 0,                                                                                                      
      477 +        collectionsCreated: 0,                                                                                                    
      478 +        collectionsUnpublished: 0,                                                                                                
      479 +        errors: [],                                                                                                               
      480 +        notices: [],                                                                                                              
      481 +        batchFailures: [],                                                                                                        
      482 +      });                                                                                                                         
      483      }
      484 +    if (data.intent === "resume-supplier-import" && data.runId) {                                                                 
      485 +      setRun((prev) => (prev ? { ...prev, status: "running" } : prev));                                                           
      486 +    }                                                                                                                             
      487 +  }, [startFetcher.data]);                                                                                                        
      488  
      508 -    if (data.intent === "apply-supplier-import-finalize-batch") {                                                                 
      509 -      setRun((prev) => ({                                                                                                         
      510 -        ...prev,                                                                                                                  
      511 -        phase: data.done ? "done" : "finalizing",                                                                                 
      512 -        active: !data.done,                                                                                                       
      513 -        productsRemaining: data.productsRemaining,                                                                                
      514 -        collectionsRemaining: data.collectionsRemaining ?? prev.collectionsRemaining,                                             
      515 -        productsDeleted: prev.productsDeleted + data.deleted,                                                                     
      516 -        collectionsDeleted: prev.collectionsDeleted + data.collectionsDeleted,                                                    
      517 -        skippedDeletions: [...prev.skippedDeletions, ...data.skippedDeletions],                                                   
      518 -        errors: [...prev.errors, ...data.errors],                                                                                 
      519 -      }));                                                                                                                        
      489 +  useEffect(() => {                                                                                                               
      490 +    const data = statusFetcher.data;                                                                                              
      491 +    if (data?.intent === "import-run-status" && data.run) setRun(data.run);                                                       
      492 +  }, [statusFetcher.data]);                                                                                                       
      493  
      521 -      if (!data.done) {                                                                                                           
      522 -        fetcher.submit(                                                                                                           
      523 -          { intent: "apply-supplier-import-finalize-batch", supplierName, selections: selectionsRef.current },                    
      524 -          { method: "POST" },                                                                                                     
      525 -        );                                                                                                                        
      494 +  const isLive = run?.status === "running";                                                                                       
      495 +  useEffect(() => {                                                                                                               
      496 +    if (!isLive) return undefined;                                                                                                
      497 +    const interval = setInterval(() => {                                                                                          
      498 +      if (statusFetcher.state === "idle") {                                                                                       
      499 +        statusFetcher.submit({ intent: "import-run-status", supplierName }, { method: "POST" });                                  
      500        }
      527 -    }                                                                                                                             
      501 +    }, POLL_INTERVAL_MS);                                                                                                         
      502 +    return () => clearInterval(interval);                                                                                         
      503      // eslint-disable-next-line react-hooks/exhaustive-deps
      529 -  }, [run.active, isLoading, data]);                                                                                              
      504 +  }, [isLive, supplierName]);                                                                                                     
      505  
      506    function toggle(dimKey, name) {
      507      setSelected((prev) => {

● Update(app/routes/app.import.jsx)
  ⎿  Added 17 lines, removed 9 lines
      522      setAcknowledged(false);
      523    }
      524  
      525 -  const pendingDeletions = [];                                                                                                    
      525 +  const pendingDisables = [];                                                                                                     
      526    for (const dimKey of DIMENSION_KEYS) {
      527      for (const name of existingSelections[dimKey]) {
      528 -      if (!selected[dimKey].has(name)) pendingDeletions.push({ dimKey, name });                                                   
      528 +      if (!selected[dimKey].has(name)) pendingDisables.push({ dimKey, name });                                                    
      529      }
      530    }
      531 -  const hasPendingDeletions = pendingDeletions.length > 0;                                                                        
      532 -  const canApply = !hasPendingDeletions || acknowledged;                                                                          
      531 +  const hasPendingDisables = pendingDisables.length > 0;                                                                          
      532 +  const canApply = (!hasPendingDisables || acknowledged) && !isLive && !isStarting;                                               
      533  
      534    function handleApply() {
      535 -    selectionsRef.current = JSON.stringify({                                                                                      
      535 +    const selections = JSON.stringify({                                                                                           
      536        collections: [...selected.collections],
      537        brands: [...selected.brands],
      538        subCollections: [...selected.subCollections],
      539        subCatCollections: [...selected.subCatCollections],
      540      });
      541 -    lastHandledRef.current = null;                                                                                                
      542 -    setRun({ ...EMPTY_RUN, active: true, phase: "importing" });                                                                   
      543 -    fetcher.submit(                                                                                                               
      544 -      { intent: "apply-supplier-import-batch", supplierName, selections: selectionsRef.current, offset: "0" },                    
      541 +    startFetcher.submit(                                                                                                          
      542 +      { intent: "start-supplier-import", supplierName, selections, force: String(force) },                                        
      543        { method: "POST" },
      544      );
      545      setAcknowledged(false);
      546    }
      547  
      548 +  function handleCancel() {                                                                                                       
      549 +    if (run?.id) startFetcher.submit({ intent: "cancel-supplier-import", runId: run.id }, { method: "POST" });                    
      550 +  }                                                                                                                               
      551 +                                                                                                                                  
      552 +  function handleResume() {                                                                                                       
      553 +    if (run?.id) startFetcher.submit({ intent: "resume-supplier-import", runId: run.id }, { method: "POST" });                    
      554 +  }                                                                                                                               
      555 +                                                                                                                                  
      556 +  const unresolvedFailures = (run?.batchFailures || []).filter((f) => !f.resolved);                                               
      557 +                                                                                                                                  
      558    return (
      559      <>
      560        <s-section heading={`${supplierName} — ${productCount} products in ${fileNames.products || "(no file)"}`}>

● Bash(perl -0pi -e 's/(onSelectAll=\{selectAll\}\n              supplierName=\{supplierName\}\n              markupByKey=\{markupByKey\})\n
         \/>/$1\n…)
  ⎿  5
  ⎿  Allowed by auto mode classifier

  Searched for 1 pattern, read 1 file (ctrl+o to expand)

● Update(app/routes/app.import.jsx)
  ⎿  Added 71 lines, removed 28 lines
      627            </s-box>
      628          </s-stack>
      629  
      630 -        {hasPendingDeletions && (                                                                                                 
      630 +        {hasPendingDisables && (                                                                                                  
      631            <div
      632              style={{
      633 -              background: "rgb(180, 0, 0)",                                                                                       
      633 +              background: "rgb(180, 100, 0)",                                                                                     
      634                color: "#fff",
      635                fontWeight: "bold",
      636                padding: "12px",
     ...
      638                marginTop: "16px",
      639              }}
      640            >
      641 -            Warning: the following will be removed from the store — unless another                                                
      642 -            supplier's products still use the same name:                                                                          
      641 +            Note: the following will be DISABLED — products set to Draft and                                                      
      642 +            collections unpublished, never deleted. Re-select them (or re-enable                                                  
      643 +            in Disabled items) to restore. Items still used by another supplier                                                   
      644 +            are left untouched:                                                                                                   
      645              <ul>
      644 -              {pendingDeletions.map((d) => (                                                                                      
      646 +              {pendingDisables.map((d) => (                                                                                       
      647                  <li key={`${d.dimKey}-${d.name}`}>
      648                    {DIMENSION_LABELS[d.dimKey]}: {d.name}
      649                  </li>
     ...
      658          )}
      659  
      660          <s-box padding-block-start="300">
      659 -          <s-button                                                                                                               
      660 -            tone="primary"                                                                                                        
      661 -            {...(canApply && !run.active ? {} : { disabled: true })}                                                              
      662 -            {...(run.active ? { loading: true } : {})}                                                                            
      663 -            onClick={handleApply}                                                                                                 
      664 -          >                                                                                                                       
      665 -            Apply Changes                                                                                                         
      666 -          </s-button>                                                                                                             
      661 +          <s-stack direction="inline" gap="base" alignItems="center">                                                             
      662 +            <s-button                                                                                                             
      663 +              tone="primary"                                                                                                      
      664 +              {...(canApply ? {} : { disabled: true })}                                                                           
      665 +              {...(isLive || isStarting ? { loading: true } : {})}                                                                
      666 +              onClick={handleApply}                                                                                               
      667 +            >                                                                                                                     
      668 +              Apply Changes                                                                                                       
      669 +            </s-button>                                                                                                           
      670 +            {isLive && (                                                                                                          
      671 +              <s-button variant="secondary" onClick={handleCancel}>                                                               
      672 +                Cancel run                                                                                                        
      673 +              </s-button>                                                                                                         
      674 +            )}                                                                                                                    
      675 +            {run && ["interrupted", "failed"].includes(run.status) && (                                                           
      676 +              <s-button variant="secondary" onClick={handleResume}>                                                               
      677 +                Resume run                                                                                                        
      678 +              </s-button>                                                                                                         
      679 +            )}                                                                                                                    
      680 +            <s-checkbox                                                                                                           
      681 +              label="Force full import (ignore change detection)"                                                                 
      682 +              checked={force}                                                                                                     
      683 +              {...(isLive ? { disabled: true } : {})}                                                                             
      684 +              onChange={(e) => setForce(e.currentTarget.checked)}                                                                 
      685 +            ></s-checkbox>                                                                                                        
      686 +          </s-stack>                                                                                                              
      687          </s-box>
      688  
      669 -        {run.phase !== "idle" && (                                                                                                
      689 +        {run && (                                                                                                                 
      690            <s-box padding-block-start="300">
      691              <s-text variant="bodySm">
      672 -              {run.phase === "importing" && `Importing products: ${run.offset} / ${run.total}`}                                   
      673 -              {run.phase === "finalizing" &&                                                                                      
      674 -                `Removing de-selected products/collections: ${run.productsRemaining} product(s), ${run.collectionsRemaining} colle
          -ction(s) remaining`}                                                                                                              
      675 -              {run.phase === "done" && "Apply Changes complete."}                                                                 
      692 +              {run.status === "running" && run.phase === "importing" &&                                                           
      693 +                `Importing products: ${run.offset} / ${run.total || "…"} (${run.created} created, ${run.updated} updated, ${run.sk
          +ippedUnchanged} unchanged — skipped)`}                                                                                            
      694 +              {run.status === "running" && run.phase === "disabling" &&                                                           
      695 +                `Disabling de-selected/removed items (products → Draft, collections unpublished): ${run.productsDisabled} product(
          +s), ${run.collectionsUnpublished} collection(s) so far`}                                                                          
      696 +              {run.status === "running" && run.phase === "retrying" &&                                                            
      697 +                `Revisiting ${unresolvedFailures.length} failed batch(es)…`}                                                      
      698 +              {run.status === "completed" && "Apply Changes complete — run finished on the server."}                              
      699 +              {run.status === "failed" && "Import run failed — see results below. You can resume it."}                            
      700 +              {run.status === "cancelled" && "Import run cancelled."}                                                             
      701 +              {run.status === "interrupted" &&                                                                                    
      702 +                "Import run was interrupted (server restarted mid-run). Resume to continue from where it stopped."}               
      703              </s-text>
      704 +            {isLive && (                                                                                                          
      705 +              <s-text variant="bodySm" tone="subdued">                                                                            
      706 +                The import runs on the server — closing this page won't stop it.                                                  
      707 +              </s-text>                                                                                                           
      708 +            )}                                                                                                                    
      709            </s-box>
      710          )}
      711        </s-section>
      712  
      681 -      {run.phase === "done" && (                                                                                                  
      713 +      {run && ["completed", "failed", "cancelled", "interrupted"].includes(run.status) && (                                       
      714          <s-section heading="Import Results">
      683 -          <s-banner tone={run.errors.length > 0 ? "warning" : "success"}>                                                         
      715 +          <s-banner tone={run.status === "completed" && run.errors.length === 0 ? "success" : "warning"}>                         
      716              <s-text>
      685 -              Products: {run.productsCreated} created, {run.productsUpdated} updated, {run.productsDeleted} deleted.              
      686 -              {" "}Collections: {run.collectionsCreated} created, {run.collectionsDeleted} deleted.                               
      717 +              Products: {run.created} created, {run.updated} updated, {run.skippedUnchanged} unchanged (skipped),{" "}            
      718 +              {run.productsDisabled} disabled (set to Draft — nothing is deleted).                                                
      719 +              {" "}Collections: {run.collectionsCreated} created, {run.collectionsUnpublished} unpublished.                       
      720              </s-text>
      721            </s-banner>
      689 -          {run.skippedDeletions.length > 0 && (                                                                                   
      722 +          {run.notices.length > 0 && (                                                                                            
      723              <s-banner tone="info">
      691 -              <s-text variant="headingSm">Kept — still used by another supplier:</s-text>                                         
      692 -              {run.skippedDeletions.map((s, i) => (                                                                               
      693 -                <s-text key={i}>• {s.type}: {s.name}</s-text>                                                                     
      724 +              <s-text variant="headingSm">Notices</s-text>                                                                        
      725 +              {run.notices.map((n, i) => (                                                                                        
      726 +                <s-text key={i}>• {n.message || `${n.type}: ${n.name}`}</s-text>                                                  
      727                ))}
      728              </s-banner>
      729            )}
      730 +          {unresolvedFailures.length > 0 && (                                                                                     
      731 +            <s-banner tone="warning">                                                                                             
      732 +              <s-text variant="headingSm">Batches still failing after retries ({unresolvedFailures.length})</s-text>              
      733 +              {unresolvedFailures.map((f) => (                                                                                    
      734 +                <s-text key={f.id}>                                                                                               
      735 +                  • {f.phase} batch at offset {f.offset} ({f.attempts} attempts): {f.lastError}                                   
      736 +                </s-text>                                                                                                         
      737 +              ))}                                                                                                                 
      738 +            </s-banner>                                                                                                           
      739 +          )}                                                                                                                      
      740            {run.errors.length > 0 && (
      741              <s-box padding="base" borderWidth="base" borderRadius="base" background="subdued">
      742                <pre style={{ margin: 0, fontSize: "12px" }}>
     ...
      747          </s-section>
      748        )}
      749  
      707 -      {!run.active && data?.error && (                                                                                            
      750 +      {commandError && (                                                                                                          
      751          <s-section heading="Error">
      752            <s-banner tone="critical">
      710 -            <s-text>{data.error}</s-text>                                                                                         
      753 +            <s-text>{commandError}</s-text>                                                                                       
      754            </s-banner>
      755          </s-section>
      756        )}

  Searched for 1 pattern (ctrl+o to expand)

● Update(app/routes/app.import.jsx)
  ⎿  Added 1 line, removed 1 line
      1 -import { useEffect, useRef, useState } from "react";                                                                                
      1 +import { useEffect, useState } from "react";                                                                                        
      2  import { useFetcher, useLoaderData, useRevalidator, useSearchParams } from "react-router";
      3  import { boundary } from "@shopify/shopify-app-react-router/server";
      4  import { authenticate } from "../shopify.server";

  Read 1 file (ctrl+o to expand)

● Update(app/routes/app.import.jsx)
  ⎿  Added 9 lines, removed 5 lines
      1010            supplier is used.
      1011          </s-paragraph>
      1012          <s-paragraph>
      1013 -          Unchecking a Collection removes it from the store entirely, unless                                                     
      1014 -          another supplier still has products in it. Unchecking a Brand,                                                         
      1015 -          Sub-collection, or Sub-cat collection only removes the specific                                                        
      1016 -          products carrying that value, with the same cross-supplier                                                             
      1017 -          protection.                                                                                                            
      1013 +          Nothing is ever deleted by an import. Unchecking a Collection                                                          
      1014 +          unpublishes it from all sales channels (unless another supplier still                                                  
      1015 +          has products in it). Unchecking a Brand, Sub-collection, or Sub-cat                                                    
      1016 +          collection sets the specific products carrying that value to Draft,                                                    
      1017 +          with the same cross-supplier protection. Products that disappear from                                                  
      1018 +          the supplier's file are also set to Draft, with a "deleted on the                                                      
      1019 +          supplier's side" notice. Use the Disable buttons (or the Disabled                                                      
      1020 +          items page) to exclude items permanently; re-select or re-enable to                                                    
      1021 +          restore.                                                                                                               
      1022          </s-paragraph>
      1023        </s-section>
      1024      </s-page>

● Import page done. Now the "Disabled items" route — first check the nav structure.

  Read 1 file (ctrl+o to expand)

● Update(app/routes/app.jsx)
  ⎿  Added 1 line
      18        <s-app-nav>
      19          <s-link href="/app">Home</s-link>
      20          <s-link href="/app/import">Import</s-link>
      21 +        <s-link href="/app/disabled">Disabled items</s-link>                                                                       
      22          <s-link href="/app/catalogs">Catalogs</s-link>
      23          <s-link href="/app/xero">Xero</s-link>
      24          <s-link href="/app/payfast">PayFast</s-link>
     
● Write(app/routes/app.disabled.jsx)
  ⎿  Wrote 279 lines to app/routes/app.disabled.jsx
      1 import { useState } from "react";
      2 import { useFetcher, useLoaderData, useSearchParams } from "react-router";
      3 import { boundary } from "@shopify/shopify-app-react-router/server";
      4 import { authenticate } from "../shopify.server";
      5 import prisma from "../db.server.js";
      6 
      7 async function getSuppliersService() {
      8   return import("../services/suppliers.server.js");
      9 }
     … +269 lines (ctrl+o to expand)

● Phase 4 done. Now running the existing test suite to see what the refactor broke before extending tests.

● Bash(npx vitest run app/services/suppliers.server.test.js 2>&1 | tail -40)
  ⎿   ❯ app/services/suppliers.server.test.js:590:26
         588|     ]);
         589|
     … +38 lines (ctrl+o to expand)
  ⎿  Allowed by auto mode classifier
     
● Reading 1 file… (ctrl+o to expand)
  ⎿  app/services/suppliers.server.test.js

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 7 lines, removed 1 line
      17    readFileSync: vi.fn((p) => fsState.files[p]),
      18  }));
      19  
      20 -const { mockPrismaProduct, mockPrismaMarkupRule } = vi.hoisted(() => ({                                                            
      20 +const { mockPrismaProduct, mockPrismaMarkupRule, mockPrismaEntityDisable } = vi.hoisted(() => ({                                   
      21    mockPrismaProduct: {
      22      findMany: vi.fn().mockResolvedValue([]),
      23      findUnique: vi.fn().mockResolvedValue(null),
      24      count: vi.fn().mockResolvedValue(0),
      25 +    update: vi.fn().mockResolvedValue({}),                                                                                         
      26      delete: vi.fn(),
      27    },
      28    mockPrismaMarkupRule: {
      29      findMany: vi.fn().mockResolvedValue([]),
      30    },
      31 +  mockPrismaEntityDisable: {                                                                                                       
      32 +    findMany: vi.fn().mockResolvedValue([]),                                                                                       
      33 +    upsert: vi.fn().mockResolvedValue({}),                                                                                         
      34 +    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),                                                                           
      35 +  },                                                                                                                               
      36  }));
      37  
      38  // Mocking "@prisma/client" does NOT intercept db.server.js's real client — db.server.js

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 1 line
      44    default: {
      45      product: mockPrismaProduct,
      46      markupRule: mockPrismaMarkupRule,
      47 +    entityDisable: mockPrismaEntityDisable,                                                                                        
      48    },
      49  }));
      50  

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 2 lines, removed 2 lines
       93    saveProductLocally: vi.fn(async () => ({})),
       94    listCollections: vi.fn(async () => []),
       95    createCollection: vi.fn(async (_admin, title) => ({ id: `gid://shopify/Collection/${title}`, title })),
       96 -  deleteCollection: vi.fn(async () => {}),                                                                                        
       96    addProductsToCollection: vi.fn(async () => {}),
       97    getAllPublicationIds: vi.fn(async () => []),
       98    publishResource: vi.fn(async () => {}),
      100 -  deleteProduct: vi.fn(async () => {}),                                                                                           
       99 +  unpublishResource: vi.fn(async () => {}),                                                                                       
      100 +  setProductStatus: vi.fn(async () => {}),                                                                                        
      101    // Real retry/backoff timing is unit-tested directly against product.server.js's
      102    // actual implementation in product.server.test.js. Here it's a plain passthrough —
      103    // these tests only care how suppliers.server.js reacts once retries are already

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 4 lines, removed 1 line
      117    buildMarkupIndex,
      118    resolveMarkupRule,
      119    resolvePricingForProducts,
      120 +  buildDisableIndex,                                                                                                              
      121 +  isProductDisabled,                                                                                                              
      122 +  computeProductHash,                                                                                                             
      123    runImportBatch,
      121 -  runFinalizeBatch,                                                                                                               
      124 +  runDisablePass,                                                                                                                 
      125  } = await import("./suppliers.server.js");
      126  
      127  const fakeAdmin = {};

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 6 lines, removed 2 lines
      132    mockProductService.saveProductLocally.mockClear();
      133    mockProductService.listCollections.mockClear().mockResolvedValue([]);
      134    mockProductService.createCollection.mockClear();
      135 -  mockProductService.deleteCollection.mockClear();                                                                                
      135    mockProductService.addProductsToCollection.mockClear();
      136    mockProductService.getAllPublicationIds.mockClear().mockResolvedValue([]);
      137    mockProductService.publishResource.mockClear();
      139 -  mockProductService.deleteProduct.mockClear();                                                                                   
      138 +  mockProductService.unpublishResource.mockClear().mockResolvedValue(undefined);                                                  
      139 +  mockProductService.setProductStatus.mockClear().mockResolvedValue(undefined);                                                   
      140    mockProductService.withNetworkRetry.mockClear().mockImplementation((fn) => fn());
      141    mockPrismaProduct.findMany.mockClear().mockResolvedValue([]);
      142    mockPrismaProduct.findUnique.mockClear().mockResolvedValue(null);
      143    mockPrismaProduct.count.mockClear().mockResolvedValue(0);
      144 +  mockPrismaProduct.update.mockClear().mockResolvedValue({});                                                                     
      145    mockPrismaProduct.delete.mockClear();
      146    mockPrismaMarkupRule.findMany.mockClear().mockResolvedValue([]);
      147 +  mockPrismaEntityDisable.findMany.mockClear().mockResolvedValue([]);                                                             
      148 +  mockPrismaEntityDisable.upsert.mockClear().mockResolvedValue({});                                                               
      149 +  mockPrismaEntityDisable.deleteMany.mockClear().mockResolvedValue({ count: 0 });                                                 
      150  }
      151  
      152  const SUPPLIERS_DIR = `${process.cwd()}/suppliers`;

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 313 lines, removed 39 lines
      533    });
      534  });
      535  
      536 -describe("runFinalizeBatch", () => {                                                                                              
      536 +describe("runDisablePass", () => {                                                                                                
      537    const emptySelections = { collections: [], brands: [], subCollections: [], subCatCollections: [] };
      538  
      539    it("takes stale products from the front of a freshly-requeried list each call (no stale offset math)", async () => {
      540 -    // Simulates 3 stale rows on the first call; after "deleting" 2, only 1 remains on                                            
      541 -    // the DB the next time computeStaleProducts re-queries it — this is the scenario                                             
      542 -    // that broke an earlier offset-indexed version of this function.                                                             
      540 +    // Simulates 3 stale rows on the first call; after disabling 2 (they drop out of                                              
      541 +    // the active:true filter), only 1 remains the next time computeStaleProducts                                                 
      542 +    // re-queries — this is the scenario that broke an earlier offset-indexed version.                                            
      543      mockPrismaProduct.findMany
      544        .mockResolvedValueOnce([
      545          { id: "db1", externalProductId: "OLD-1", shopifyProductId: "gid://shopify/Product/1", title: "Old 1" },
     ...
      551        ])
      552        .mockResolvedValueOnce([]);
      553  
      554 -    const call1 = await runFinalizeBatch(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSiz
          -e: 2 });                                                                                                                          
      555 -    expect(call1.deleted).toBe(2);                                                                                                
      554 +    const call1 = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSize:
          + 2 });                                                                                                                            
      555 +    expect(call1.disabled).toBe(2);                                                                                               
      556      expect(call1.productsRemaining).toBe(1);
      557      expect(call1.done).toBe(false);
      558 -    expect(mockPrismaProduct.delete).toHaveBeenCalledTimes(2);                                                                    
      558 +    // DISABLED, never deleted: Shopify status DRAFT + local active:false.                                                        
      559 +    expect(mockPrismaProduct.delete).not.toHaveBeenCalled();                                                                      
      560 +    expect(mockProductService.setProductStatus).toHaveBeenCalledTimes(2);                                                         
      561 +    expect(mockProductService.setProductStatus).toHaveBeenCalledWith(fakeAdmin, "gid://shopify/Product/1", "DRAFT");              
      562 +    expect(mockPrismaProduct.update).toHaveBeenCalledWith(                                                                        
      563 +      expect.objectContaining({                                                                                                   
      564 +        where: { id: "db1" },                                                                                                     
      565 +        data: expect.objectContaining({ active: false, disabledReason: "supplier_removed" }),                                     
      566 +      }),                                                                                                                         
      567 +    );                                                                                                                            
      568  
      560 -    const call2 = await runFinalizeBatch(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSiz
          -e: 2 });                                                                                                                          
      561 -    expect(call2.deleted).toBe(1);                                                                                                
      569 +    const call2 = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSize:
          + 2 });                                                                                                                            
      570 +    expect(call2.disabled).toBe(1);                                                                                               
      571      expect(call2.productsRemaining).toBe(0);
      572      // The stale-products branch always reports done:false — it doesn't look ahead at
      573      // the collections phase. The NEXT call re-queries, finds no stale products left,
      574      // and (since this fixture has no collections either) reports done:true.
      575      expect(call2.done).toBe(false);
      576  
      568 -    const call3 = await runFinalizeBatch(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSiz
          -e: 2 });                                                                                                                          
      569 -    expect(call3.deleted).toBe(0);                                                                                                
      577 +    const call3 = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSize:
          + 2 });                                                                                                                            
      578 +    expect(call3.disabled).toBe(0);                                                                                               
      579      expect(call3.done).toBe(true);
      580    });
      581  
      573 -  it("moves to collection deletion once no stale products remain, and reports done when both lists are empty", async () => {      
      574 -    mockPrismaProduct.findMany.mockResolvedValueOnce([]); // no stale products                                                    
      582 +  it("resolves the disable reason per product: supplier_removed / manual / deselected", async () => {                             
      583 +    // OLD-GONE is absent from the file; OLD-MANUAL is in the file but covered by an                                              
      584 +    // EntityDisable row; OLD-DESEL is in the file but its collection is unchecked.                                               
      585 +    mockPrismaEntityDisable.findMany.mockResolvedValue([                                                                          
      586 +      { level: "product", value: "OLD-MANUAL", reason: "manual" },                                                                
      587 +    ]);                                                                                                                           
      588 +    mockPrismaProduct.findMany.mockResolvedValueOnce([                                                                            
      589 +      { id: "db1", externalProductId: "OLD-GONE", shopifyProductId: "gid://shopify/Product/1", title: "Gone" },                   
      590 +      { id: "db2", externalProductId: "OLD-MANUAL", shopifyProductId: "gid://shopify/Product/2", title: "Manual" },               
      591 +      { id: "db3", externalProductId: "OLD-DESEL", shopifyProductId: "gid://shopify/Product/3", title: "Desel" },                 
      592 +    ]);                                                                                                                           
      593 +                                                                                                                                  
      594 +    const products = [                                                                                                            
      595 +      makeProduct({ collection: "HOSES", productId: "OLD-MANUAL" }),                                                              
      596 +      makeProduct({ collection: "HOSES", productId: "OLD-DESEL" }),                                                               
      597 +    ];                                                                                                                            
      598 +    const result = await runDisablePass(fakeAdmin, {                                                                              
      599 +      supplierName: "agrinet",                                                                                                    
      600 +      products,                                                                                                                   
      601 +      selections: emptySelections,                                                                                                
      602 +      batchSize: 10,                                                                                                              
      603 +    });                                                                                                                           
      604 +                                                                                                                                  
      605 +    expect(result.disabled).toBe(3);                                                                                              
      606 +    const reasonsByRow = Object.fromEntries(                                                                                      
      607 +      mockPrismaProduct.update.mock.calls.map(([args]) => [args.where.id, args.data.disabledReason]),                             
      608 +    );                                                                                                                            
      609 +    expect(reasonsByRow).toEqual({ db1: "supplier_removed", db2: "manual", db3: "deselected" });                                  
      610 +    // Only supplier-removed products produce a "deleted on the supplier's side" notice.                                          
      611 +    expect(result.notices).toEqual([                                                                                              
      612 +      expect.objectContaining({ type: "product", name: "Gone", reason: "supplier_removed" }),                                     
      613 +    ]);                                                                                                                           
      614 +  });                                                                                                                             
      615 +                                                                                                                                  
      616 +  it("unpublishes (never deletes) de-selected collections and records the EntityDisable notice", async () => {                    
      617 +    mockPrismaProduct.findMany                                                                                                    
      618 +      .mockResolvedValueOnce([]) // no stale products                                                                             
      619 +      .mockResolvedValueOnce([]); // computeCollectionsToUnpublish local rows                                                     
      620      mockProductService.listCollections.mockResolvedValueOnce([{ id: "gid://shopify/Collection/OLDCOL", title: "OLDCOL" }]);
      621 +    mockProductService.getAllPublicationIds.mockResolvedValueOnce(["gid://shopify/Publication/1"]);                               
      622  
      623      const products = [makeProduct({ collection: "OLDCOL", productId: "P1" })];
      578 -    const result = await runFinalizeBatch(fakeAdmin, { supplierName: "agrinet", products, selections: emptySelections, batchSize: 
          -10 });                                                                                                                            
      624 +    const result = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products, selections: emptySelections, batchSize: 10
          + });                                                                                                                              
      625  
      626      expect(result.productsRemaining).toBe(0);
      581 -    expect(result.collectionsDeleted).toBe(1);                                                                                    
      627 +    expect(result.collectionsUnpublished).toBe(1);                                                                                
      628      expect(result.collectionsRemaining).toBe(0);
      629      expect(result.done).toBe(true);
      584 -    expect(mockProductService.deleteCollection).toHaveBeenCalledTimes(1);                                                         
      630 +    expect(mockProductService.unpublishResource).toHaveBeenCalledWith(                                                            
      631 +      fakeAdmin,                                                                                                                  
      632 +      "gid://shopify/Collection/OLDCOL",                                                                                          
      633 +      ["gid://shopify/Publication/1"],                                                                                            
      634 +    );                                                                                                                            
      635 +    expect(mockPrismaEntityDisable.upsert).toHaveBeenCalledWith(                                                                  
      636 +      expect.objectContaining({                                                                                                   
      637 +        create: expect.objectContaining({ level: "collections", value: "OLDCOL", reason: "deselected" }),                         
      638 +      }),                                                                                                                         
      639 +    );                                                                                                                            
      640    });
      641  
      587 -  it("is immediately done when there is nothing stale and nothing to delete", async () => {                                       
      588 -    mockPrismaProduct.findMany.mockResolvedValueOnce([]);                                                                         
      642 +  it("flags collections that vanished from the supplier file as supplier_removed, with a notice", async () => {                   
      643 +    mockPrismaProduct.findMany                                                                                                    
      644 +      .mockResolvedValueOnce([]) // no stale products                                                                             
      645 +      .mockResolvedValueOnce([{ userDetail: { assignedFirstMajorDescription: "GONECOL" } }]); // local rows                       
      646 +    mockProductService.listCollections.mockResolvedValueOnce([{ id: "gid://shopify/Collection/GONECOL", title: "GONECOL" }]);     
      647 +    mockProductService.getAllPublicationIds.mockResolvedValueOnce(["gid://shopify/Publication/1"]);                               
      648 +                                                                                                                                  
      649 +    // File no longer mentions GONECOL at all.                                                                                    
      650 +    const result = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSize
          +: 10 });                                                                                                                          
      651 +                                                                                                                                  
      652 +    expect(result.collectionsUnpublished).toBe(1);                                                                                
      653 +    expect(result.notices).toEqual([                                                                                              
      654 +      expect.objectContaining({ type: "collection", name: "GONECOL", reason: "supplier_removed" }),                               
      655 +    ]);                                                                                                                           
      656 +    expect(mockPrismaEntityDisable.upsert).toHaveBeenCalledWith(                                                                  
      657 +      expect.objectContaining({                                                                                                   
      658 +        create: expect.objectContaining({ level: "collections", value: "GONECOL", reason: "supplier_removed" }),                  
      659 +      }),                                                                                                                         
      660 +    );                                                                                                                            
      661 +  });                                                                                                                             
      662 +                                                                                                                                  
      663 +  it("leaves collections another supplier still uses untouched (skipped, no EntityDisable row)", async () => {                    
      664 +    mockPrismaProduct.findMany                                                                                                    
      665 +      .mockResolvedValueOnce([]) // no stale products                                                                             
      666 +      .mockResolvedValueOnce([]); // local rows                                                                                   
      667 +    mockPrismaProduct.count.mockResolvedValueOnce(3); // another supplier's active products use SHARED                            
      668 +    mockProductService.listCollections.mockResolvedValueOnce([{ id: "gid://shopify/Collection/SHARED", title: "SHARED" }]);       
      669 +                                                                                                                                  
      670 +    const products = [makeProduct({ collection: "SHARED", productId: "P1" })];                                                    
      671 +    const result = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products, selections: emptySelections, batchSize: 10
          + });                                                                                                                              
      672 +                                                                                                                                  
      673 +    expect(result.collectionsUnpublished).toBe(0);                                                                                
      674 +    expect(result.skipped).toEqual([{ type: "collection", name: "SHARED" }]);                                                     
      675 +    expect(result.done).toBe(true);                                                                                               
      676 +    expect(mockProductService.unpublishResource).not.toHaveBeenCalled();                                                          
      677 +    expect(mockPrismaEntityDisable.upsert).not.toHaveBeenCalled();                                                                
      678 +  });                                                                                                                             
      679 +                                                                                                                                  
      680 +  it("is immediately done when there is nothing stale and nothing to unpublish", async () => {                                    
      681 +    mockPrismaProduct.findMany.mockResolvedValueOnce([]).mockResolvedValueOnce([]);                                               
      682      mockProductService.listCollections.mockResolvedValueOnce([]);
      683  
      591 -    const result = await runFinalizeBatch(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSi
          -ze: 10 });                                                                                                                        
      684 +    const result = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSize
          +: 10 });                                                                                                                          
      685      expect(result.done).toBe(true);
      593 -    expect(result.deleted).toBe(0);                                                                                               
      594 -    expect(result.collectionsDeleted).toBe(0);                                                                                    
      686 +    expect(result.disabled).toBe(0);                                                                                              
      687 +    expect(result.collectionsUnpublished).toBe(0);                                                                                
      688    });
      689  
      597 -  it("stale-product deletion stops early once the time budget has elapsed, but always deletes at least one", async () => {        
      690 +  it("stale-product disabling stops early once the time budget has elapsed, but always disables at least one", async () => {      
      691      mockPrismaProduct.findMany.mockResolvedValueOnce([
      692        { id: "db1", externalProductId: "OLD-1", shopifyProductId: "gid://shopify/Product/1", title: "Old 1" },
      693        { id: "db2", externalProductId: "OLD-2", shopifyProductId: "gid://shopify/Product/2", title: "Old 2" },
      694        { id: "db3", externalProductId: "OLD-3", shopifyProductId: "gid://shopify/Product/3", title: "Old 3" },
      695      ]);
      696  
      604 -    const result = await runFinalizeBatch(fakeAdmin, {                                                                            
      697 +    const result = await runDisablePass(fakeAdmin, {                                                                              
      698        supplierName: "agrinet",
      699        products: [],
      700        selections: emptySelections,
     ...
      702        timeBudgetMs: -1,
      703      });
      704  
      612 -    expect(result.deleted).toBe(1);                                                                                               
      705 +    expect(result.disabled).toBe(1);                                                                                              
      706      expect(result.productsRemaining).toBe(2);
      707      expect(result.done).toBe(false);
      615 -    expect(mockPrismaProduct.delete).toHaveBeenCalledTimes(1);                                                                    
      708 +    expect(mockProductService.setProductStatus).toHaveBeenCalledTimes(1);                                                         
      709    });
      710  
      618 -  it("collection deletion stops early once the time budget has elapsed, but always deletes at least one", async () => {           
      619 -    mockPrismaProduct.findMany.mockResolvedValueOnce([]); // no stale products                                                    
      711 +  it("collection unpublishing stops early once the time budget has elapsed, but always processes at least one", async () => {     
      712 +    mockPrismaProduct.findMany                                                                                                    
      713 +      .mockResolvedValueOnce([]) // no stale products                                                                             
      714 +      .mockResolvedValueOnce([]); // local rows                                                                                   
      715      mockProductService.listCollections.mockResolvedValueOnce([
      716        { id: "gid://shopify/Collection/A", title: "A" },
      717        { id: "gid://shopify/Collection/B", title: "B" },
      718      ]);
      719 +    mockProductService.getAllPublicationIds.mockResolvedValueOnce(["gid://shopify/Publication/1"]);                               
      720  
      721      const products = [
      722        makeProduct({ collection: "A", productId: "P1" }),
      723        makeProduct({ collection: "B", productId: "P2" }),
      724      ];
      629 -    const result = await runFinalizeBatch(fakeAdmin, {                                                                            
      725 +    const result = await runDisablePass(fakeAdmin, {                                                                              
      726        supplierName: "agrinet",
      727        products,
      728        selections: emptySelections,
     ...
      730        timeBudgetMs: -1,
      731      });
      732  
      637 -    expect(result.collectionsDeleted).toBe(1);                                                                                    
      733 +    expect(result.collectionsUnpublished).toBe(1);                                                                                
      734      expect(result.collectionsRemaining).toBe(1);
      735      expect(result.done).toBe(false);
      640 -    expect(mockProductService.deleteCollection).toHaveBeenCalledTimes(1);                                                         
      736 +    expect(mockProductService.unpublishResource).toHaveBeenCalledTimes(1);                                                        
      737    });
      738  
      643 -  // Sibling of the two runImportBatch regression tests above: runFinalizeBatch's own                                             
      644 -  // listCollections(admin) call (collection-deletion phase) had the same unguarded shape.                                        
      645 -  it("continues with an empty collection map (instead of throwing) if listCollections fails during collection deletion", async () 
          -=> {                                                                                                                              
      646 -    mockPrismaProduct.findMany.mockResolvedValueOnce([]); // no stale products                                                    
      739 +  // Sibling of the two runImportBatch regression tests above: the disable pass's own                                             
      740 +  // listCollections(admin) call (collection phase) keeps the same degrade-not-throw shape.                                       
      741 +  it("continues (instead of throwing) if listCollections fails during the collection phase", async () => {                        
      742 +    mockPrismaProduct.findMany                                                                                                    
      743 +      .mockResolvedValueOnce([]) // no stale products                                                                             
      744 +      .mockResolvedValueOnce([]); // local rows                                                                                   
      745      mockProductService.listCollections.mockRejectedValueOnce(
      746        new Error("Http request error, no response available: GraphQL Client: fetch failed"),
      747      );
      748  
      749      const products = [makeProduct({ collection: "OLDCOL", productId: "P1" })];
      652 -    const result = await runFinalizeBatch(fakeAdmin, {                                                                            
      750 +    const result = await runDisablePass(fakeAdmin, {                                                                              
      751        supplierName: "agrinet",
      752        products,
      753        selections: emptySelections,
     ...
      757      expect(result.errors).toEqual(
      758        expect.arrayContaining([expect.objectContaining({ stage: "list-collections" })]),
      759      );
      662 -    // No collection titles resolve without the lookup, so nothing to delete this pass —                                          
      663 -    // self-heals on the next Finalize call instead of aborting.                                                                  
      664 -    expect(result.collectionsDeleted).toBe(0);                                                                                    
      760 +    // Without the lookup no Shopify id resolves, so no unpublish mutation fires — but                                            
      761 +    // the EntityDisable row is still written (the notice + processed marker), so the                                             
      762 +    // pass completes rather than aborting.                                                                                       
      763 +    expect(mockProductService.unpublishResource).not.toHaveBeenCalled();                                                          
      764 +    expect(result.collectionsUnpublished).toBe(1);                                                                                
      765      expect(result.done).toBe(true);
      666 -    expect(mockProductService.deleteCollection).not.toHaveBeenCalled();                                                           
      766    });
      767  });
      768 +                                                                                                                                  
      769 +describe("entity disables — gating and helpers", () => {                                                                          
      770 +  const selections = { collections: ["HOSES"], brands: [], subCollections: [], subCatCollections: [] };                           
      771 +                                                                                                                                  
      772 +  it("isProductDisabled matches product-level rows and every dimension the product carries", () => {                              
      773 +    const product = makeProduct({ collection: "HOSES", brand: "Vulcan", subCollection: "Fittings", subCatCollection: "Brass", prod
          +uctId: "P1" });                                                                                                                   
      774 +    expect(isProductDisabled(buildDisableIndex([]), product)).toBe(false);                                                        
      775 +    expect(isProductDisabled(buildDisableIndex([{ level: "product", value: "P1" }]), product)).toBe(true);                        
      776 +    expect(isProductDisabled(buildDisableIndex([{ level: "brands", value: "Vulcan" }]), product)).toBe(true);                     
      777 +    expect(isProductDisabled(buildDisableIndex([{ level: "subCatCollections", value: "Brass" }]), product)).toBe(true);           
      778 +    expect(isProductDisabled(buildDisableIndex([{ level: "brands", value: "OtherBrand" }]), product)).toBe(false);                
      779 +  });                                                                                                                             
      780 +                                                                                                                                  
      781 +  it("runImportBatch excludes disabled products from toImport and reports skippedDisabled", async () => {                         
      782 +    mockPrismaEntityDisable.findMany.mockResolvedValue([                                                                          
      783 +      { level: "product", value: "2", reason: "manual" },                                                                         
      784 +    ]);                                                                                                                           
      785 +    const products = ["1", "2", "3"].map((id) => makeProduct({ collection: "HOSES", productId: id }));                            
      786 +                                                                                                                                  
      787 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products, selections, offset: 0, batchSize: 10 });  
      788 +                                                                                                                                  
      789 +    expect(result.total).toBe(2); // "2" is excluded entirely                                                                     
      790 +    expect(result.skippedDisabled).toBe(1);                                                                                       
      791 +    expect(result.created).toBe(2);                                                                                               
      792 +    expect(mockProductService.createShopifyProduct).toHaveBeenCalledTimes(2);                                                     
      793 +  });                                                                                                                             
      794 +                                                                                                                                  
      795 +  it("re-selecting a collection with an import-written disable republishes it and clears the row", async () => {                  
      796 +    mockPrismaEntityDisable.findMany.mockResolvedValue([                                                                          
      797 +      { level: "collections", value: "HOSES", reason: "deselected" },                                                             
      798 +    ]);                                                                                                                           
      799 +    mockProductService.listCollections.mockResolvedValueOnce([{ id: "gid://shopify/Collection/HOSES", title: "HOSES" }]);         
      800 +    mockProductService.getAllPublicationIds.mockResolvedValueOnce(["gid://shopify/Publication/1"]);                               
      801 +    const products = [makeProduct({ collection: "HOSES", productId: "1" })];                                                      
      802 +                                                                                                                                  
      803 +    // NOTE: the collections-level EntityDisable row ALSO gates the products carrying                                             
      804 +    // that collection (isProductDisabled), so this run has nothing to import — but the                                           
      805 +    // offset-0 collection reconciliation must still republish + clear the row, which                                             
      806 +    // un-disables the collection for the NEXT run.                                                                               
      807 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products, selections, offset: 0, batchSize: 10 });  
      808 +                                                                                                                                  
      809 +    expect(mockProductService.publishResource).toHaveBeenCalledWith(fakeAdmin, "gid://shopify/Collection/HOSES", ["gid://shopify/P
          +ublication/1"]);                                                                                                                  
      810 +    expect(mockPrismaEntityDisable.deleteMany).toHaveBeenCalledWith({                                                             
      811 +      where: { supplierName: "agrinet", level: "collections", value: "HOSES" },                                                   
      812 +    });                                                                                                                           
      813 +    expect(result.skippedDisabled).toBe(1);                                                                                       
      814 +  });                                                                                                                             
      815 +                                                                                                                                  
      816 +  it("a manually disabled collection is never auto-republished or cleared", async () => {                                         
      817 +    mockPrismaEntityDisable.findMany.mockResolvedValue([                                                                          
      818 +      { level: "collections", value: "HOSES", reason: "manual" },                                                                 
      819 +    ]);                                                                                                                           
      820 +    mockProductService.listCollections.mockResolvedValueOnce([{ id: "gid://shopify/Collection/HOSES", title: "HOSES" }]);         
      821 +    const products = [makeProduct({ collection: "HOSES", productId: "1" })];                                                      
      822 +                                                                                                                                  
      823 +    await runImportBatch(fakeAdmin, { supplierName: "agrinet", products, selections, offset: 0, batchSize: 10 });                 
      824 +                                                                                                                                  
      825 +    expect(mockProductService.publishResource).not.toHaveBeenCalled();                                                            
      826 +    expect(mockPrismaEntityDisable.deleteMany).not.toHaveBeenCalled();                                                            
      827 +  });                                                                                                                             
      828 +});                                                                                                                               
      829 +                                                                                                                                  
      830 +describe("incremental import — computeProductHash and the unchanged-skip", () => {                                                
      831 +  const selections = { collections: ["HOSES"], brands: [], subCollections: [], subCatCollections: [] };                           
      832 +                                                                                                                                  
      833 +  it("computeProductHash changes when product details, pricing, stock, or resolved markup change", () => {                        
      834 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      835 +    const base = computeProductHash(product, null, null, null);                                                                   
      836 +    expect(computeProductHash(product, null, null, null)).toBe(base); // deterministic                                            
      837 +                                                                                                                                  
      838 +    const changedProduct = { ...product, desc: "renamed" };                                                                       
      839 +    expect(computeProductHash(changedProduct, null, null, null)).not.toBe(base);                                                  
      840 +    expect(computeProductHash(product, { priceCodes: [{ price: "9.99" }] }, null, null)).not.toBe(base);                          
      841 +    expect(computeProductHash(product, null, { available: 5 }, null)).not.toBe(base);                                             
      842 +    expect(computeProductHash(product, null, null, { markupPct: 10, markupFlat: null })).not.toBe(base);                          
      843 +  });                                                                                                                             
      844 +                                                                                                                                  
      845 +  function seedUnchangedRow(product) {                                                                                            
      846 +    mockPrismaProduct.findUnique.mockResolvedValue({                                                                              
      847 +      shopifyProductId: "gid://shopify/Product/EXISTING",                                                                         
      848 +      active: true,                                                                                                               
      849 +      lastPushedHash: computeProductHash(product, null, null, null),                                                              
      850 +    });                                                                                                                           
      851 +  }                                                                                                                               
      852 +                                                                                                                                  
      853 +  it("skips every Shopify call for an unchanged, active, already-pushed product", async () => {                                   
      854 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      855 +    seedUnchangedRow(product);                                                                                                    
      856 +                                                                                                                                  
      857 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products: [product], selections, offset: 0, batchSiz
          +e: 10 });                                                                                                                         
      858 +                                                                                                                                  
      859 +    expect(result.skippedUnchanged).toBe(1);                                                                                      
      860 +    expect(result.created).toBe(0);                                                                                               
      861 +    expect(result.updated).toBe(0);                                                                                               
      862 +    expect(result.offset).toBe(1); // a skip still advances the offset                                                            
      863 +    expect(mockProductService.createShopifyProduct).not.toHaveBeenCalled();                                                       
      864 +    expect(mockProductService.updateShopifyProduct).not.toHaveBeenCalled();                                                       
      865 +    expect(mockProductService.saveProductLocally).not.toHaveBeenCalled();                                                         
      866 +  });                                                                                                                             
      867 +                                                                                                                                  
      868 +  it("force: true bypasses the unchanged-skip", async () => {                                                                     
      869 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      870 +    seedUnchangedRow(product);                                                                                                    
      871 +                                                                                                                                  
      872 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products: [product], selections, offset: 0, batchSiz
          +e: 10, force: true });                                                                                                            
      873 +                                                                                                                                  
      874 +    expect(result.skippedUnchanged).toBe(0);                                                                                      
      875 +    expect(result.updated).toBe(1);                                                                                               
      876 +    expect(mockProductService.updateShopifyProduct).toHaveBeenCalledTimes(1);                                                     
      877 +  });                                                                                                                             
      878 +                                                                                                                                  
      879 +  it("a MarkupRule change re-pushes a product whose files are unchanged", async () => {                                           
      880 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      881 +    seedUnchangedRow(product); // hash stored with NO markup rule                                                                 
      882 +    mockPrismaMarkupRule.findMany.mockResolvedValue([                                                                             
      883 +      { level: "collections", value: "HOSES", markupPct: 15, markupFlat: null },                                                  
      884 +    ]);                                                                                                                           
      885 +                                                                                                                                  
      886 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products: [product], selections, offset: 0, batchSiz
          +e: 10 });                                                                                                                         
      887 +                                                                                                                                  
      888 +    expect(result.skippedUnchanged).toBe(0);                                                                                      
      889 +    expect(result.updated).toBe(1);                                                                                               
      890 +  });                                                                                                                             
      891 +                                                                                                                                  
      892 +  it("an inactive (disabled) row is never skip-eligible — re-import re-pushes and re-activates it", async () => {                 
      893 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      894 +    mockPrismaProduct.findUnique.mockResolvedValue({                                                                              
      895 +      shopifyProductId: "gid://shopify/Product/EXISTING",                                                                         
      896 +      active: false, // disabled earlier                                                                                          
      897 +      lastPushedHash: computeProductHash(product, null, null, null), // even with a matching hash                                 
      898 +    });                                                                                                                           
      899 +                                                                                                                                  
      900 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products: [product], selections, offset: 0, batchSiz
          +e: 10 });                                                                                                                         
      901 +                                                                                                                                  
      902 +    expect(result.skippedUnchanged).toBe(0);                                                                                      
      903 +    expect(result.updated).toBe(1);                                                                                               
      904 +    // Post-push bookkeeping clears the disable state and stores the fresh hash.                                                  
      905 +    expect(mockPrismaProduct.update).toHaveBeenCalledWith(                                                                        
      906 +      expect.objectContaining({                                                                                                   
      907 +        where: { externalProductId: "P1" },                                                                                       
      908 +        data: expect.objectContaining({ active: true, disabledReason: null, lastPushedHash: expect.any(String) }),                
      909 +      }),                                                                                                                         
      910 +    );                                                                                                                            
      911 +  });                                                                                                                             
      912 +                                                                                                                                  
      913 +  it("does not persist the hash when publishing fails — the next run re-pushes", async () => {                                    
      914 +    mockProductService.getAllPublicationIds.mockResolvedValueOnce(["gid://shopify/Publication/1"]);                               
      915 +    mockProductService.publishResource.mockRejectedValueOnce(new Error("network blip"));                                          
      916 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      917 +                                                                                                                                  
      918 +    // offset 1 of 2 products skips ensureCollectionsExist (whose publishResource call                                            
      919 +    // would consume the rejection) — same isolation trick as the save-before-publish test.                                       
      920 +    const products = [makeProduct({ collection: "HOSES", productId: "P0" }), product];                                            
      921 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products, selections, offset: 1, batchSize: 10 });  
      922 +                                                                                                                                  
      923 +    expect(result.errors).toEqual(expect.arrayContaining([expect.objectContaining({ stage: "publish" })]));                       
      924 +    expect(mockPrismaProduct.update).not.toHaveBeenCalled();                                                                      
      925 +  });                                                                                                                             
      926 +                                                                                                                                  
      927 +  it("persists the hash after a fully clean push", async () => {                                                                  
      928 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      929 +                                                                                                                                  
      930 +    await runImportBatch(fakeAdmin, { supplierName: "agrinet", products: [product], selections, offset: 0, batchSize: 10 });      
      931 +                                                                                                                                  
      932 +    expect(mockPrismaProduct.update).toHaveBeenCalledWith(                                                                        
      933 +      expect.objectContaining({                                                                                                   
      934 +        where: { externalProductId: "P1" },                                                                                       
      935 +        data: expect.objectContaining({                                                                                           
      936 +          lastPushedHash: computeProductHash(product, null, null, null),                                                          
      937 +          active: true,                                                                                                           
      938 +        }),                                                                                                                       
      939 +      }),                                                                                                                         
      940 +    );                                                                                                                            
      939 +      }),                                                                                                                         
      940 +    );                                                                                                                            
      941 +  });                                                                                                                             
      942 +});                                                                                                                               

● Bash(npx vitest run app/services/suppliers.server.test.js 2>&1 | tail -30)
  ⎿  npm warn Unknown project config "shamefully-hoist". This will stop working in the next major version of npm.

      RUN  v4.1.8 /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker


      Test Files  1 passed (1)
           Tests  48 passed (48)
        Start at  10:48:55
        Duration  163ms (transform 48ms, setup 0ms, import 64ms, tests 20ms, environment 0ms)

                                                                                                                     10:49 AM claude-fable-5
● All 48 suppliers tests pass. Now the job-runner test file.

  Write(/home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/app/services/import-run.server.test.js)
  ⎿  Wrote 405 lines to
     /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/app/services/import-run.server.test.js
        1 import { describe, it, expect, vi, beforeEach } from "vitest";
        2 
        3 // In-memory fakes for the two job tables — stateful so the runner's own
        4 // read-back paths (retry phase findMany, resume findUnique) see real effects.
        5 const db = vi.hoisted(() => ({ runs: new Map(), failures: new Map(), seq: { run: 1, failure: 1 } }));
        6
        7 const { mockImportRun, mockImportBatchFailure } = vi.hoisted(() => {
        8   const withFailures = (row) => ({
        9     ...row,
       10     batchFailures: [...db.failures.values()].filter((f) => f.runId === row.id),
       11   });
       12   return {
       13     mockImportRun: {
       14       create: vi.fn(async ({ data }) => {
       15         const row = {
       16           id: `run${db.seq.run++}`,
       17           status: "running",
       18           phase: "importing",
       19           offset: 0,
       20           total: 0,
       21           created: 0,
       22           updated: 0,
       23           skippedUnchanged: 0,
       24           productsDisabled: 0,
       25           collectionsCreated: 0,
       26           collectionsUnpublished: 0,
       27           errorsJson: "[]",
       28           noticesJson: "[]",
       29           finishedAt: null,
       30           startedAt: new Date(),
       31           heartbeatAt: new Date(),
       32           ...data,
       33         };
       34         db.runs.set(row.id, row);
       35         return { ...row };
       36       }),
       37       update: vi.fn(async ({ where, data, include }) => {
       38         const row = db.runs.get(where.id);
       39         for (const [k, v] of Object.entries(data)) row[k] = v;
       40         row.heartbeatAt = new Date();
       41         return include ? withFailures({ ...row }) : { ...row };
       42       }),
       43       findFirst: vi.fn(async ({ where = {}, include } = {}) => {
       44         const rows = [...db.runs.values()]
       45           .filter((r) => !where.supplierName || r.supplierName === where.supplierName)
       46           .filter((r) => !where.status || r.status === where.status)
       47           .sort((a, b) => b.startedAt - a.startedAt);
       48         const row = rows[0] || null;
       49         if (!row) return null;
       50         return include ? withFailures({ ...row }) : { ...row };
       51       }),
       52       findUnique: vi.fn(async ({ where }) => {
       53         const row = db.runs.get(where.id);
       54         return row ? { ...row } : null;
       55       }),
       56     },
       57     mockImportBatchFailure: {
       58       create: vi.fn(async ({ data }) => {
       59         const row = { id: `f${db.seq.failure++}`, resolved: false, ...data };
       60         db.failures.set(row.id, row);
       61         return { ...row };
       62       }),
       63       findMany: vi.fn(async ({ where = {} } = {}) => {
       64         return [...db.failures.values()]
       65           .filter((f) => (!where.runId || f.runId === where.runId))
       66           .filter((f) => (where.resolved === undefined ? true : f.resolved === where.resolved))
       67           .map((f) => ({ ...f }));
       68       }),
       69       update: vi.fn(async ({ where, data }) => {
       70         const row = db.failures.get(where.id);
       71         const { attempts, ...rest } = data;
       72         if (attempts?.increment) row.attempts += attempts.increment;
       73         for (const [k, v] of Object.entries(rest)) row[k] = v;
       74         return { ...row };
       75       }),
       76     },
       77   };
       78 });
       79
       80 vi.mock("../db.server.js", () => ({
       81   default: { importRun: mockImportRun, importBatchFailure: mockImportBatchFailure },
       82 }));
       83
       84 // Never exercised (tests inject deps.getAdmin), but the module imports it at top
       85 // level and the real shopify.server drags in env-dependent SDK setup.
       86 vi.mock("../shopify.server", () => ({
       87   unauthenticated: { admin: vi.fn(async () => ({ admin: {} })) },
       88 }));
       89
       90 const { mockSuppliers } = vi.hoisted(() => ({
       91   mockSuppliers: {
       92     loadSupplierData: vi.fn(() => ({ fileNames: {}, products: [], pricing: [], stock: [] })),
       93     runImportBatch: vi.fn(),
       94     runDisablePass: vi.fn(),
       95     IMPORT_BATCH_SIZE: 15,
       96   },
       97 }));
       98 vi.mock("./suppliers.server.js", () => mockSuppliers);
       99
      100 const {
      101   startImportRun,
      102   resumeRun,
      103   cancelRun,
      104   getRunStatus,
      105   IMPORT_RETRY_WAIT_MS,
      106   MAX_CONSECUTIVE_BATCH_FAILURES,
      107   STALE_HEARTBEAT_MS,
      108 } = await import("./import-run.server.js");
      109
      110 const fakeAdmin = { tag: "fake-admin" };
      111
      112 function importBatchResult(offset, total, extra = {}) {
      113   return {
      114     offset,
      115     total,
      116     created: 0,
      117     updated: 0,
      118     skippedUnchanged: 0,
      119     skippedDisabled: 0,
      120     collectionsCreated: 0,
      121     errors: [],
      122     ...extra,
      123   };
      124 }
      125
      126 function disableDone(extra = {}) {
      127   return {
      128     done: true,
      129     disabled: 0,
      130     collectionsUnpublished: 0,
      131     productsRemaining: 0,
      132     collectionsRemaining: 0,
      133     skipped: [],
      134     notices: [],
      135     errors: [],
      136     ...extra,
      137   };
      138 }
      139
      140 // The runner executes in the background (startImportRun doesn't await it) — wait
      141 // for the run row to reach a terminal status.
      142 async function waitForTerminal(runId) {
      143   await vi.waitFor(() => {
      144     const row = db.runs.get(runId);
      145     expect(["completed", "failed", "cancelled"]).toContain(row.status);
      146   });
      147   return db.runs.get(runId);
      148 }
      149
      150 const deps = () => ({
      151   sleep: vi.fn(async () => {}),
      152   getAdmin: vi.fn(async () => fakeAdmin),
      153   batchSize: 2,
      154 });
      155
      156 beforeEach(() => {
      157   db.runs.clear();
      158   db.failures.clear();
      159   db.seq.run = 1;
      160   db.seq.failure = 1;
      161   vi.clearAllMocks();
      162   mockSuppliers.loadSupplierData.mockReturnValue({ fileNames: {}, products: [], pricing: [], stock: [] });
      163   mockSuppliers.runDisablePass.mockResolvedValue(disableDone());
      164 });
      165
      166 describe("startImportRun — happy path", () => {
      167   it("runs import batches to completion, then the disable pass, then completes", async () => {
      168     mockSuppliers.runImportBatch
      169       .mockResolvedValueOnce(importBatchResult(2, 4, { created: 2 }))
      170       .mockResolvedValueOnce(importBatchResult(4, 4, { created: 1, skippedUnchanged: 1 }));
      171     const d = deps();
      172
      173     const { runId } = await startImportRun(
      174       { shop: "test.myshopify.com", supplierName: "agrinet", selections: { collections: ["HOSES"] } },
      175       d,
      176     );
      177     const row = await waitForTerminal(runId);
      178
      179     expect(row.status).toBe("completed");
      180     expect(row.phase).toBe("done");
      181     expect(row.offset).toBe(4);
      182     expect(row.total).toBe(4);
      183     expect(row.created).toBe(3);
      184     expect(row.skippedUnchanged).toBe(1);
      185     expect(row.finishedAt).not.toBeNull();
      186     expect(mockSuppliers.runImportBatch).toHaveBeenCalledTimes(2);
      187     expect(mockSuppliers.runDisablePass).toHaveBeenCalledTimes(1);
      188     // A FRESH admin client per batch (2 import + 1 disable) — never one for the whole run.
      189     expect(d.getAdmin).toHaveBeenCalledTimes(3);
      190     expect(d.sleep).not.toHaveBeenCalled();
      191   });
      192
      193   it("keeps calling the disable pass until it reports done", async () => {
      194     mockSuppliers.runImportBatch.mockResolvedValueOnce(importBatchResult(1, 1));
      195     mockSuppliers.runDisablePass
      196       .mockResolvedValueOnce(disableDone({ done: false, disabled: 2, productsRemaining: 1 }))
      197       .mockResolvedValueOnce(disableDone({ disabled: 1 }));
      198
      199     const { runId } = await startImportRun(
      200       { shop: "test.myshopify.com", supplierName: "agrinet", selections: {} },
      201       deps(),
      202     );
      203     const row = await waitForTerminal(runId);
      204
      205     expect(row.status).toBe("completed");
      206     expect(row.productsDisabled).toBe(3);
      207     expect(mockSuppliers.runDisablePass).toHaveBeenCalledTimes(2);
      208   });
      209 });
      210
      211 describe("batch failure policy", () => {
      212   it("a batch that fails once succeeds on the 30s retry — no failure recorded, streak reset", async () => {
      213     mockSuppliers.runImportBatch
      214       .mockRejectedValueOnce(new Error("tunnel blip"))
      215       .mockResolvedValueOnce(importBatchResult(2, 2, { created: 2 }));
      216     const d = deps();
      217
      218     const { runId } = await startImportRun(
      219       { shop: "test.myshopify.com", supplierName: "agrinet", selections: {} },
      220       d,
      221     );
      222     const row = await waitForTerminal(runId);
      223
      224     expect(row.status).toBe("completed");
      225     expect(d.sleep).toHaveBeenCalledTimes(1);
      226     expect(d.sleep).toHaveBeenCalledWith(IMPORT_RETRY_WAIT_MS);
      227     expect(mockImportBatchFailure.create).not.toHaveBeenCalled();
      228   });
      229
      230   it("a batch that fails twice is recorded, skipped, and replayed in the retrying phase", async () => {
      231     mockSuppliers.runImportBatch
      232       // batch at offset 0: initial attempt + 30s retry both fail
      233       .mockRejectedValueOnce(new Error("boom 1"))
      234       .mockRejectedValueOnce(new Error("boom 2"))
      235       // next batch (offset skipped forward to 2) succeeds and establishes total=4
      236       .mockResolvedValueOnce(importBatchResult(4, 4, { created: 2 }))
      237       // retrying phase replays the failed offset-0 slice
      238       .mockResolvedValueOnce(importBatchResult(2, 4, { created: 2 }));
      239     const d = deps();
      240
      241     const { runId } = await startImportRun(
      242       { shop: "test.myshopify.com", supplierName: "agrinet", selections: {} },
      243       d,
      244     );
      245     const row = await waitForTerminal(runId);
      246
      247     expect(row.status).toBe("completed");
      248     expect(row.created).toBe(4);
      249     expect(mockImportBatchFailure.create).toHaveBeenCalledTimes(1);
      250     expect(mockImportBatchFailure.create).toHaveBeenCalledWith(
      251       expect.objectContaining({
      252         data: expect.objectContaining({ phase: "import", offset: 0, batchSize: 2, lastError: "boom 2" }),
      253       }),
      254     );
      255     // Replay resolved it.
      256     const failure = [...db.failures.values()][0];
      257     expect(failure.resolved).toBe(true);
      258     // The replay call targeted exactly the failed slice.
      259     expect(mockSuppliers.runImportBatch).toHaveBeenLastCalledWith(
      260       fakeAdmin,
      261       expect.objectContaining({ offset: 0, batchSize: 2 }),
      262     );
      263   });
      264
      265   it(`${MAX_CONSECUTIVE_BATCH_FAILURES} consecutive batch failures end the run as failed`, async () => {
      266     mockSuppliers.runImportBatch.mockRejectedValue(new Error("persistent outage"));
      267     const d = deps();
      268
      269     const { runId } = await startImportRun(
      270       { shop: "test.myshopify.com", supplierName: "agrinet", selections: {} },
      271       d,
      272     );
      273     const row = await waitForTerminal(runId);
      274
      275     expect(row.status).toBe("failed");
      276     expect(JSON.parse(row.noticesJson)).toEqual(
      277       expect.arrayContaining([expect.objectContaining({ reason: "consecutive_failures" })]),
      278     );
      279     // 5 batches × (attempt + retry) = 10 rejected calls, then the run stops.
      280     expect(mockSuppliers.runImportBatch).toHaveBeenCalledTimes(MAX_CONSECUTIVE_BATCH_FAILURES * 2);
      281     expect(mockImportBatchFailure.create).toHaveBeenCalledTimes(MAX_CONSECUTIVE_BATCH_FAILURES);
      282   });
      283
      284   it("a success between failures resets the consecutive counter", async () => {
      285     mockSuppliers.runImportBatch
      286       .mockRejectedValueOnce(new Error("f1"))
      287       .mockRejectedValueOnce(new Error("f1 retry"))
      288       .mockResolvedValueOnce(importBatchResult(4, 8)) // resets streak (offset skipped 0->2, this covers 2-4)
      289       .mockRejectedValueOnce(new Error("f2"))
      290       .mockRejectedValueOnce(new Error("f2 retry"))
      291       .mockResolvedValueOnce(importBatchResult(8, 8)) // covers 6-8
      292       // retrying phase: two recorded failures replayed
      293       .mockResolvedValueOnce(importBatchResult(2, 8))
      294       .mockResolvedValueOnce(importBatchResult(6, 8));
      295
      296     const { runId } = await startImportRun(
      297       { shop: "test.myshopify.com", supplierName: "agrinet", selections: {} },
      298       deps(),
      299     );
      300     const row = await waitForTerminal(runId);
      301
      302     expect(row.status).toBe("completed"); // 2 non-consecutive failures ≠ abort
      303     expect(mockImportBatchFailure.create).toHaveBeenCalledTimes(2);
      304     expect([...db.failures.values()].every((f) => f.resolved)).toBe(true);
      305   });
      306
      307   it("a disable-pass double failure is recorded and revisited in the retrying phase", async () => {
      308     mockSuppliers.runImportBatch.mockResolvedValueOnce(importBatchResult(1, 1));
      309     mockSuppliers.runDisablePass
      310       .mockRejectedValueOnce(new Error("disable boom"))
      311       .mockRejectedValueOnce(new Error("disable boom retry"))
      312       .mockResolvedValueOnce(disableDone({ disabled: 2 }));
      313
      314     const { runId } = await startImportRun(
      315       { shop: "test.myshopify.com", supplierName: "agrinet", selections: {} },
      316       deps(),
      317     );
      318     const row = await waitForTerminal(runId);
      319
      320     expect(row.status).toBe("completed");
      321     expect(row.productsDisabled).toBe(2);
      322     expect(mockImportBatchFailure.create).toHaveBeenCalledWith(
      323       expect.objectContaining({ data: expect.objectContaining({ phase: "disable" }) }),
      324     );
      325     expect([...db.failures.values()][0].resolved).toBe(true);
      326   });
      327 });
      328
      329 describe("cancel / concurrency / interruption / resume", () => {
      330   it("cancelling mid-run stops before the next batch and marks the run cancelled", async () => {
      331     let capturedRunId;
      332     mockSuppliers.runImportBatch.mockImplementation(async () => {
      333       cancelRun(capturedRunId);
      334       return importBatchResult(2, 6);
      335     });
      336
      337     const { runId } = await startImportRun(
      338       { shop: "test.myshopify.com", supplierName: "agrinet", selections: {} },
      339       deps(),
      340     );
      341     capturedRunId = runId;
      342     const row = await waitForTerminal(runId);
      343
      344     expect(row.status).toBe("cancelled");
      345     expect(mockSuppliers.runImportBatch).toHaveBeenCalledTimes(1);
      346   });
      347
      348   it("rejects a start while a fresh run is already in progress for the supplier", async () => {
      349     // Never-resolving batch keeps run1 alive and in activeRuns.
      350     let release;
      351     mockSuppliers.runImportBatch.mockImplementation(() => new Promise((r) => (release = r)));
      352
      353     const { runId } = await startImportRun(
      354       { shop: "test.myshopify.com", supplierName: "agrinet", selections: {} },
      355       deps(),
      356     );
      357
      358     await expect(
      359       startImportRun({ shop: "test.myshopify.com", supplierName: "agrinet", selections: {} }, deps()),
      360     ).rejects.toThrow(/already in progress/);
      361
      362     release(importBatchResult(1, 1));
      363     await waitForTerminal(runId);
      364   });
      365
      366   it("getRunStatus flips a stale running row (dead process) to interrupted", async () => {
      367     const row = await mockImportRun.create({
      368       data: { supplierName: "agrinet", shop: "test.myshopify.com", selections: "{}", force: false },
      369     });
      370     db.runs.get(row.id).heartbeatAt = new Date(Date.now() - STALE_HEARTBEAT_MS - 1000);
      371
      372     const status = await getRunStatus("agrinet");
      373     expect(status.status).toBe("interrupted");
      374     expect(db.runs.get(row.id).status).toBe("interrupted");
      375   });
      376
      377   it("resume restarts an interrupted run from its persisted offset, keeping its counts", async () => {
      378     const row = await mockImportRun.create({
      379       data: { supplierName: "agrinet", shop: "test.myshopify.com", selections: JSON.stringify({ collections: ["HOSES"] }), force: f
          alse },
      380     });
      381     Object.assign(db.runs.get(row.id), { status: "interrupted", offset: 2, total: 4, created: 2 });
      382
      383     mockSuppliers.runImportBatch.mockResolvedValueOnce(importBatchResult(4, 4, { created: 2 }));
      384     const d = deps();
      834 +  );                                                                                                                              
      835 +                                                                                                                                  
      836 +  const slice = candidates.slice(0, batchSize);                                                                                   
      837 +  const result = await unpublishCollectionBatch(admin, slice, collectionIdByTitle, supplierName, publicationIds, deadline);       
      838 +  const remaining = candidates.length - result.processed;                                                                         
      839 +                                                                                                                                  
      840    return {
      841      productsRemaining: 0,
      842      collectionsRemaining: remaining,
      813 -    deleted: 0,                                                                                                                   
      814 -    collectionsDeleted: result.collectionsDeleted,                                                                                
      815 -    skippedDeletions: result.skippedDeletions,                                                                                    
      843 +    disabled: 0,                                                                                                                  
      844 +    collectionsUnpublished: result.collectionsUnpublished,                                                                        
      845 +    skipped,                                                                                                                      
      846 +    notices: result.notices,                                                                                                      
      847      errors: [...preErrors, ...result.errors],
      848      done: remaining <= 0,
      849    };

  Searched for 1 pattern (ctrl+o to expand)

● Write(app/services/import-run.server.js)
  ⎿  Wrote 440 lines to app/services/import-run.server.js
       1 // Server-side supplier-import job runner.
       2 //
       3 // Why this exists: the import used to be driven by the BROWSER — app.import.jsx
       4 // resubmitted one ~60s POST per 15-product batch, ~137 batches per full run,
       5 // every one of them held open through the Cloudflare tunnel. A single dropped
       6 // request (tunnel blip, 502 "context canceled", closed tab) killed the whole
       7 // multi-hour run, with no retry. Here the run executes as an in-process
       8 // background job instead: one short POST starts it, the UI polls the ImportRun
       9 // row every few seconds, and transport failures between browser and server can
      10 // no longer touch the run itself.
     … +430 lines (ctrl+o to expand)

● Update(app/routes/app.import.jsx)
  ⎿  Added 4 lines
      11    return import("../services/suppliers.server.js");
      12  }
      13  
      14 +async function getImportRunService() {                                                                                             
      15 +  return import("../services/import-run.server.js");                                                                               
      16 +}                                                                                                                                  
      17 +                                                                                                                                   
      18  const DIMENSION_KEYS = ["collections", "brands", "subCollections", "subCatCollections"];
      19  const DIMENSION_LABELS = {
      20    collections: "Collection",

● Update(app/routes/app.import.jsx)
  ⎿  Added 7 lines, removed 1 line
      56      const markupByKey = Object.fromEntries(
      57        markupRules.map((r) => [`${r.level}:${r.value}`, { markupPct: r.markupPct, markupFlat: r.markupFlat }]),
      58      );
      59 -    supplierData = { fileNames, hierarchy, existingSelections, productCount: products.length, markupByKey };                       
      59 +    const disableRows = await suppliersSvc.getEntityDisables(selectedSupplier);                                                    
      60 +    const disablesByKey = Object.fromEntries(                                                                                      
      61 +      disableRows.map((r) => [`${r.level}:${r.value}`, { reason: r.reason, note: r.note }]),                                       
      62 +    );                                                                                                                             
      63 +    const importRunSvc = await getImportRunService();                                                                              
      64 +    const runStatus = await importRunSvc.getRunStatus(selectedSupplier);                                                           
      65 +    supplierData = { fileNames, hierarchy, existingSelections, productCount: products.length, markupByKey, disablesByKey, runStatus
         + };                                                                                                                                
      66    }
      67  
      68    return { supplierFolders, selectedSupplier, supplierData };

● Update(app/routes/app.import.jsx)
  ⎿  Added 52 lines, removed 25 lines
      69  };
      70  
      71  export const action = async ({ request }) => {
      72 -  const { admin } = await authenticate.admin(request);                                                                             
      72 +  const { admin, session } = await authenticate.admin(request);                                                                    
      73    const formData = await request.formData();
      74    const intent = formData.get("intent");
      75    const svc = await getService();
      76  
      77 -  if (intent === "apply-supplier-import-batch") {                                                                                  
      77 +  // The import itself runs as a server-side background job (import-run.server.js)                                                 
      78 +  // — these intents only start/observe/steer it, so every request is short-lived                                                  
      79 +  // and a dropped poll can't hurt the run.                                                                                        
      80 +  if (intent === "start-supplier-import") {                                                                                        
      81      const supplierName = formData.get("supplierName");
      82      if (!supplierName) return { error: "No supplier selected" };
      83  
     ...
       87      } catch {
       88        return { error: "Invalid selections payload" };
       89      }
       87 -    const offset = Number(formData.get("offset")) || 0;                                                                           
       90 +    const force = formData.get("force") === "true";                                                                               
       91  
       92      try {
       90 -      const suppliersSvc = await getSuppliersService();                                                                           
       91 -      const { products, pricing, stock } = suppliersSvc.loadSupplierData(supplierName);                                           
       92 -      const result = await suppliersSvc.runImportBatch(admin, {                                                                   
       93 +      const importRunSvc = await getImportRunService();                                                                           
       94 +      const { runId } = await importRunSvc.startImportRun({                                                                       
       95 +        shop: session.shop,                                                                                                       
       96          supplierName,
       94 -        products,                                                                                                                 
       95 -        pricing,                                                                                                                  
       96 -        stock,                                                                                                                    
       97          selections,
       98 -        offset,                                                                                                                   
       98 +        force,                                                                                                                    
       99        });
      100 -      return { completed: true, intent: "apply-supplier-import-batch", supplierName, ...result };                                 
      100 +      return { completed: true, intent: "start-supplier-import", supplierName, runId };                                           
      101      } catch (err) {
      102 -      return { error: `Supplier import batch failed: ${err.message}` };                                                           
      102 +      return { error: `Starting supplier import failed: ${err.message}` };                                                        
      103      }
      104    }
      105  
      106 -  if (intent === "apply-supplier-import-finalize-batch") {                                                                        
      106 +  if (intent === "import-run-status") {                                                                                           
      107      const supplierName = formData.get("supplierName");
      108      if (!supplierName) return { error: "No supplier selected" };
      109 +    try {                                                                                                                         
      110 +      const importRunSvc = await getImportRunService();                                                                           
      111 +      const run = await importRunSvc.getRunStatus(supplierName);                                                                  
      112 +      return { completed: true, intent: "import-run-status", supplierName, run };                                                 
      113 +    } catch (err) {                                                                                                               
      114 +      return { error: `Fetching import status failed: ${err.message}` };                                                          
      115 +    }                                                                                                                             
      116 +  }                                                                                                                               
      117  
      110 -    let selections;                                                                                                               
      118 +  if (intent === "cancel-supplier-import") {                                                                                      
      119 +    const runId = formData.get("runId");                                                                                          
      120 +    if (!runId) return { error: "No run id" };                                                                                    
      121 +    const importRunSvc = await getImportRunService();                                                                             
      122 +    const result = importRunSvc.cancelRun(runId);                                                                                 
      123 +    return { completed: true, intent: "cancel-supplier-import", runId, ...result };                                               
      124 +  }                                                                                                                               
      125 +                                                                                                                                  
      126 +  if (intent === "resume-supplier-import") {                                                                                      
      127 +    const runId = formData.get("runId");                                                                                          
      128 +    if (!runId) return { error: "No run id" };                                                                                    
      129      try {
      112 -      selections = JSON.parse(formData.get("selections") || "{}");                                                                
      113 -    } catch {                                                                                                                     
      114 -      return { error: "Invalid selections payload" };                                                                             
      130 +      const importRunSvc = await getImportRunService();                                                                           
      131 +      await importRunSvc.resumeRun({ runId, shop: session.shop });                                                                
      132 +      return { completed: true, intent: "resume-supplier-import", runId };                                                        
      133 +    } catch (err) {                                                                                                               
      134 +      return { error: `Resuming import failed: ${err.message}` };                                                                 
      135      }
      136 +  }                                                                                                                               
      137  
      138 +  if (intent === "save-entity-disable" || intent === "remove-entity-disable") {                                                   
      139 +    const supplierName = formData.get("supplierName");                                                                            
      140 +    const level = formData.get("level");                                                                                          
      141 +    const value = formData.get("value");                                                                                          
      142 +    if (!supplierName || !level || !value) {                                                                                      
      143 +      return { error: "Missing supplierName, level, or value for disable toggle" };                                               
      144 +    }                                                                                                                             
      145      try {
      146        const suppliersSvc = await getSuppliersService();
      119 -      const { products } = suppliersSvc.loadSupplierData(supplierName);                                                           
      120 -      const result = await suppliersSvc.runFinalizeBatch(admin, {                                                                 
      121 -        supplierName,                                                                                                             
      122 -        products,                                                                                                                 
      123 -        selections,                                                                                                               
      124 -      });                                                                                                                         
      125 -      return { completed: true, intent: "apply-supplier-import-finalize-batch", supplierName, ...result };                        
      147 +      if (intent === "save-entity-disable") {                                                                                     
      148 +        await suppliersSvc.saveEntityDisable({ supplierName, level, value, reason: "manual" });                                   
      149 +      } else {                                                                                                                    
      150 +        await suppliersSvc.removeEntityDisable({ supplierName, level, value });                                                   
      151 +      }                                                                                                                           
      152 +      return { completed: true, intent, level, value, disabled: intent === "save-entity-disable" };                               
      153      } catch (err) {
      127 -      return { error: `Supplier import finalize failed: ${err.message}` };                                                        
      154 +      return { error: `Updating disable state failed: ${err.message}` };                                                          
      155      }
      156    }
      157  

● Now the UI components — disable toggle per row, then the panel rewrite.

● Update(app/routes/app.import.jsx)
  ⎿  Added 38 lines
      270    );
      271  }
      272  
      273 +// Per-row manual Disable/Enable toggle backed by an EntityDisable row. A disabled                                                
      274 +// tier's products are excluded from every import run and (once an import runs)                                                   
      275 +// set to Draft in Shopify — never deleted. Uses its own fetcher per row, same                                                    
      276 +// pattern as MarkupInputs. Local state is optimistic; the loader re-syncs it on                                                  
      277 +// the next page load.                                                                                                            
      278 +function DisableToggle({ supplierName, level, value, existingDisable }) {                                                         
      279 +  const fetcher = useFetcher();                                                                                                   
      280 +  const [disable, setDisable] = useState(existingDisable || null);                                                                
      281 +  const isSaving = fetcher.state !== "idle";                                                                                      
      282 +                                                                                                                                  
      283 +  function handleToggle() {                                                                                                       
      284 +    const next = disable ? null : { reason: "manual", note: null };                                                               
      285 +    fetcher.submit(                                                                                                               
      286 +      {                                                                                                                           
      287 +        intent: next ? "save-entity-disable" : "remove-entity-disable",                                                           
      288 +        supplierName,                                                                                                             
      289 +        level,                                                                                                                    
      290 +        value,                                                                                                                    
      291 +      },                                                                                                                          
      292 +      { method: "POST" },                                                                                                         
      293 +    );                                                                                                                            
      294 +    setDisable(next);                                                                                                             
      295 +  }                                                                                                                               
      296 +                                                                                                                                  
      297 +  return (                                                                                                                        
      298 +    <s-stack direction="inline" gap="small-200" alignItems="center">                                                              
      299 +      <s-button variant="tertiary" size="slim" {...(isSaving ? { loading: true } : {})} onClick={handleToggle}>                   
      300 +        {disable ? "Enable" : "Disable"}                                                                                          
      301 +      </s-button>                                                                                                                 
      302 +      {disable && (                                                                                                               
      303 +        <s-badge tone="warning">                                                                                                  
      304 +          {disable.reason === "supplier_removed" ? "Removed by supplier" : "Disabled"}                                            
      305 +        </s-badge>                                                                                                                
      306 +      )}                                                                                                                          
      307 +    </s-stack>                                                                                                                    
      308 +  );                                                                                                                              
      309 +}                                                                                                                                 
      310 +                                                                                                                                  
      311  function nodeIsEnabled(dimKey, node, selected) {
      312    return ANCESTOR_DIMENSIONS[dimKey].every((ancestorKey) => {
      313      const ancestorValues = node[ancestorKey] || [];

● Update(app/routes/app.import.jsx)
  ⎿  Added 7 lines, removed 1 line
      339    return { selectedGroup, availableGroup, disabledGroup };
      340  }
      341  
      342 -function NodeRow({ dimKey, node, checked, disabled, isNew, onToggle, supplierName, markupByKey }) {                               
      342 +function NodeRow({ dimKey, node, checked, disabled, isNew, onToggle, supplierName, markupByKey, disablesByKey }) {                
      343    return (
      344      <s-stack direction="block" gap="small-200">
      345        <s-stack direction="inline" gap="small-200" alignItems="center">
     ...
      350            onChange={() => onToggle(dimKey, node.name)}
      351          ></s-checkbox>
      352          {isNew && <s-badge tone="success">New</s-badge>}
      353 +        <DisableToggle                                                                                                            
      354 +          supplierName={supplierName}                                                                                             
      355 +          level={dimKey}                                                                                                          
      356 +          value={node.name}                                                                                                       
      357 +          existingDisable={disablesByKey[`${dimKey}:${node.name}`]}                                                               
      358 +        />                                                                                                                        
      359        </s-stack>
      360        <MarkupInputs
      361          supplierName={supplierName}

● Update(app/routes/app.import.jsx)
  ⎿  Added 1 line, removed 1 line
      381    );
      382  }
      383  
      384 -function HierarchyCheckboxList({ dimKey, nodes, selected, existingSelections, onToggle, onSelectAll, supplierName, markupByKey }) 
          -{                                                                                                                                 
      384 +function HierarchyCheckboxList({ dimKey, nodes, selected, existingSelections, onToggle, onSelectAll, supplierName, markupByKey, di
          +sablesByKey }) {                                                                                                                  
      385    const [collapsed, setCollapsed] = useState({ selected: false, available: false, disabled: true });
      386  
      387    if (nodes.length === 0) {

● Update(app/routes/app.import.jsx)
  ⎿  Added 1 line
      406          onToggle={onToggle}
      407          supplierName={supplierName}
      408          markupByKey={markupByKey}
      409 +        disablesByKey={disablesByKey}                                                                                             
      410        />
      411      );
      412    }

● Now the core panel rewrite — replacing the driver state machine with polling.

● Update(app/routes/app.import.jsx)
  ⎿  Added 51 lines, removed 76 lines
      437    );
      438  }
      439  
      440 -const EMPTY_RUN = {                                                                                                               
      441 -  active: false,                                                                                                                  
      442 -  phase: "idle", // idle | importing | finalizing | done                                                                          
      443 -  offset: 0,                                                                                                                      
      444 -  total: 0,                                                                                                                       
      445 -  productsRemaining: 0,                                                                                                           
      446 -  collectionsRemaining: 0,                                                                                                        
      447 -  productsCreated: 0,                                                                                                             
      448 -  productsUpdated: 0,                                                                                                             
      449 -  productsDeleted: 0,                                                                                                             
      450 -  collectionsCreated: 0,                                                                                                          
      451 -  collectionsDeleted: 0,                                                                                                          
      452 -  skippedDeletions: [],                                                                                                           
      453 -  errors: [],                                                                                                                     
      454 -};                                                                                                                                
      440 +const POLL_INTERVAL_MS = 3000;                                                                                                    
      441  
      442  function SupplierImportPanel({ supplierName, supplierData }) {
      457 -  const fetcher = useFetcher();                                                                                                   
      458 -  const isLoading = ["loading", "submitting"].includes(fetcher.state);                                                            
      459 -  const data = fetcher.data;                                                                                                      
      443 +  // The import runs as a server-side background job (import-run.server.js).                                                      
      444 +  // startFetcher issues the short-lived start/cancel/resume commands; statusFetcher                                              
      445 +  // polls the run row every few seconds while a run is live. Unlike the previous                                                 
      446 +  // browser-driven batch loop, a dropped request here (tunnel blip, 502, closed                                                  
      447 +  // tab) cannot kill the run — the next poll just picks the status back up.                                                      
      448 +  const startFetcher = useFetcher();                                                                                              
      449 +  const statusFetcher = useFetcher();                                                                                             
      450  
      461 -  const { hierarchy, existingSelections, fileNames, productCount, markupByKey } = supplierData;                                   
      451 +  const { hierarchy, existingSelections, fileNames, productCount, markupByKey, disablesByKey, runStatus } = supplierData;         
      452  
      453    const [selected, setSelected] = useState(() => toSelectionState(existingSelections));
      454    const [acknowledged, setAcknowledged] = useState(false);
      465 -  const [run, setRun] = useState(EMPTY_RUN);                                                                                      
      466 -  const selectionsRef = useRef(null); // captured once per run, so mid-run checkbox edits don't affect it                         
      467 -  const lastHandledRef = useRef(null);                                                                                            
      455 +  const [force, setForce] = useState(false);                                                                                      
      456 +  const [run, setRun] = useState(runStatus || null);                                                                              
      457  
      469 -  // Batched "Apply Changes" — each request only processes a small slice of products                                              
      470 -  // (see IMPORT_BATCH_SIZE in suppliers.server.js) to stay well under Cloudflare's                                               
      471 -  // ~100s edge timeout on large catalogs. This effect drives the batch/finalize loop                                             
      472 -  // forward every time a request settles, until the whole run is done.                                                           
      473 -  useEffect(() => {                                                                                                               
      474 -    if (!run.active || isLoading || !data || data === lastHandledRef.current) return;                                             
      475 -    lastHandledRef.current = data;                                                                                                
      458 +  const isStarting = startFetcher.state !== "idle";                                                                               
      459 +  const commandError = startFetcher.data?.error || null;                                                                          
      460  
      477 -    if (data.error) {                                                                                                             
      478 -      setRun((prev) => ({ ...prev, active: false, errors: [...prev.errors, { stage: "run", error: data.error }] }));              
      479 -      return;                                                                                                                     
      480 -    }                                                                                                                             
      481 -                                                                                                                                  
      482 -    if (data.intent === "apply-supplier-import-batch") {                                                                          
      483 -      setRun((prev) => ({                                                                                                         
      484 -        ...prev,                                                                                                                  
      461 +  // Reflect start/resume responses immediately (a synthetic "running" shell until                                                
      462 +  // the first poll lands with real numbers).                                                                                     
      463 +  useEffect(() => {                                                                                                               
      464 +    const data = startFetcher.data;                                                                                               
      465 +    if (!data) return;                                                                                                            
      466 +    if (data.intent === "start-supplier-import" && data.runId) {                                                                  
      467 +      setRun({                                                                                                                    
      468 +        id: data.runId,                                                                                                           
      469 +        status: "running",                                                                                                        
      470          phase: "importing",
      486 -        offset: data.offset,                                                                                                      
      487 -        total: data.total,                                                                                                        
      488 -        productsCreated: prev.productsCreated + data.created,                                                                     
      489 -        productsUpdated: prev.productsUpdated + data.updated,                                                                     
      490 -        collectionsCreated: prev.collectionsCreated + data.collectionsCreated,                                                    
      491 -        errors: [...prev.errors, ...data.errors],                                                                                 
      492 -      }));                                                                                                                        
      493 -                                                                                                                                  
      494 -      if (data.offset < data.total) {                                                                                             
      495 -        fetcher.submit(                                                                                                           
      496 -          { intent: "apply-supplier-import-batch", supplierName, selections: selectionsRef.current, offset: String(data.offset) },
      497 -          { method: "POST" },                                                                                                     
      498 -        );                                                                                                                        
      499 -      } else {                                                                                                                    
      500 -        fetcher.submit(                                                                                                           
      501 -          { intent: "apply-supplier-import-finalize-batch", supplierName, selections: selectionsRef.current },                    
      502 -          { method: "POST" },                                                                                                     
      503 -        );                                                                                                                        
      504 -      }                                                                                                                           
      505 -      return;                                                                                                                     
      471 +        offset: 0,                                                                                                                
      472 +        total: 0,                                                                                                                 
      473 +        created: 0,                                                                                                               
      474 +        updated: 0,                                                                                                               
      475 +        skippedUnchanged: 0,                                                                                                      
      476 +        productsDisabled: 0,                                                                                                      
      477 +        collectionsCreated: 0,                                                                                                    
      478 +        collectionsUnpublished: 0,                                                                                                
      479 +        errors: [],                                                                                                               
      480 +        notices: [],                                                                                                              
      481 +        batchFailures: [],                                                                                                        
      482 +      });                                                                                                                         
      483      }
      484 +    if (data.intent === "resume-supplier-import" && data.runId) {                                                                 
      485 +      setRun((prev) => (prev ? { ...prev, status: "running" } : prev));                                                           
      486 +    }                                                                                                                             
      487 +  }, [startFetcher.data]);                                                                                                        
      488  
      508 -    if (data.intent === "apply-supplier-import-finalize-batch") {                                                                 
      509 -      setRun((prev) => ({                                                                                                         
      510 -        ...prev,                                                                                                                  
      511 -        phase: data.done ? "done" : "finalizing",                                                                                 
      512 -        active: !data.done,                                                                                                       
      513 -        productsRemaining: data.productsRemaining,                                                                                
      514 -        collectionsRemaining: data.collectionsRemaining ?? prev.collectionsRemaining,                                             
      515 -        productsDeleted: prev.productsDeleted + data.deleted,                                                                     
      516 -        collectionsDeleted: prev.collectionsDeleted + data.collectionsDeleted,                                                    
      517 -        skippedDeletions: [...prev.skippedDeletions, ...data.skippedDeletions],                                                   
      518 -        errors: [...prev.errors, ...data.errors],                                                                                 
      519 -      }));                                                                                                                        
      489 +  useEffect(() => {                                                                                                               
      490 +    const data = statusFetcher.data;                                                                                              
      491 +    if (data?.intent === "import-run-status" && data.run) setRun(data.run);                                                       
      492 +  }, [statusFetcher.data]);                                                                                                       
      493  
      521 -      if (!data.done) {                                                                                                           
      522 -        fetcher.submit(                                                                                                           
      523 -          { intent: "apply-supplier-import-finalize-batch", supplierName, selections: selectionsRef.current },                    
      524 -          { method: "POST" },                                                                                                     
      525 -        );                                                                                                                        
      494 +  const isLive = run?.status === "running";                                                                                       
      495 +  useEffect(() => {                                                                                                               
      496 +    if (!isLive) return undefined;                                                                                                
      497 +    const interval = setInterval(() => {                                                                                          
      498 +      if (statusFetcher.state === "idle") {                                                                                       
      499 +        statusFetcher.submit({ intent: "import-run-status", supplierName }, { method: "POST" });                                  
      500        }
      527 -    }                                                                                                                             
      501 +    }, POLL_INTERVAL_MS);                                                                                                         
      502 +    return () => clearInterval(interval);                                                                                         
      503      // eslint-disable-next-line react-hooks/exhaustive-deps
      529 -  }, [run.active, isLoading, data]);                                                                                              
      504 +  }, [isLive, supplierName]);                                                                                                     
      505  
      506    function toggle(dimKey, name) {
      507      setSelected((prev) => {

● Update(app/routes/app.import.jsx)
  ⎿  Added 17 lines, removed 9 lines
      522      setAcknowledged(false);
      523    }
      524  
      525 -  const pendingDeletions = [];                                                                                                    
      525 +  const pendingDisables = [];                                                                                                     
      526    for (const dimKey of DIMENSION_KEYS) {
      527      for (const name of existingSelections[dimKey]) {
      528 -      if (!selected[dimKey].has(name)) pendingDeletions.push({ dimKey, name });                                                   
      528 +      if (!selected[dimKey].has(name)) pendingDisables.push({ dimKey, name });                                                    
      529      }
      530    }
      531 -  const hasPendingDeletions = pendingDeletions.length > 0;                                                                        
      532 -  const canApply = !hasPendingDeletions || acknowledged;                                                                          
      531 +  const hasPendingDisables = pendingDisables.length > 0;                                                                          
      532 +  const canApply = (!hasPendingDisables || acknowledged) && !isLive && !isStarting;                                               
      533  
      534    function handleApply() {
      535 -    selectionsRef.current = JSON.stringify({                                                                                      
      535 +    const selections = JSON.stringify({                                                                                           
      536        collections: [...selected.collections],
      537        brands: [...selected.brands],
      538        subCollections: [...selected.subCollections],
      539        subCatCollections: [...selected.subCatCollections],
      540      });
      541 -    lastHandledRef.current = null;                                                                                                
      542 -    setRun({ ...EMPTY_RUN, active: true, phase: "importing" });                                                                   
      543 -    fetcher.submit(                                                                                                               
      544 -      { intent: "apply-supplier-import-batch", supplierName, selections: selectionsRef.current, offset: "0" },                    
      541 +    startFetcher.submit(                                                                                                          
      542 +      { intent: "start-supplier-import", supplierName, selections, force: String(force) },                                        
      543        { method: "POST" },
      544      );
      545      setAcknowledged(false);
      546    }
      547  
      548 +  function handleCancel() {                                                                                                       
      549 +    if (run?.id) startFetcher.submit({ intent: "cancel-supplier-import", runId: run.id }, { method: "POST" });                    
      550 +  }                                                                                                                               
      551 +                                                                                                                                  
      552 +  function handleResume() {                                                                                                       
      553 +    if (run?.id) startFetcher.submit({ intent: "resume-supplier-import", runId: run.id }, { method: "POST" });                    
      554 +  }                                                                                                                               
      555 +                                                                                                                                  
      556 +  const unresolvedFailures = (run?.batchFailures || []).filter((f) => !f.resolved);                                               
      557 +                                                                                                                                  
      558    return (
      559      <>
      560        <s-section heading={`${supplierName} — ${productCount} products in ${fileNames.products || "(no file)"}`}>

● Bash(perl -0pi -e 's/(onSelectAll=\{selectAll\}\n              supplierName=\{supplierName\}\n              markupByKey=\{markupByKey\})\n
         \/>/$1\n…)
  ⎿  5

  Searched for 1 pattern, read 1 file (ctrl+o to expand)

● Update(app/routes/app.import.jsx)
  ⎿  Added 71 lines, removed 28 lines
      627            </s-box>
      628          </s-stack>
      629  
      630 -        {hasPendingDeletions && (                                                                                                 
      630 +        {hasPendingDisables && (                                                                                                  
      631            <div
      632              style={{
      633 -              background: "rgb(180, 0, 0)",                                                                                       
      633 +              background: "rgb(180, 100, 0)",                                                                                     
      634                color: "#fff",
      635                fontWeight: "bold",
      636                padding: "12px",
     ...
      638                marginTop: "16px",
      639              }}
      640            >
      641 -            Warning: the following will be removed from the store — unless another                                                
      642 -            supplier's products still use the same name:                                                                          
      641 +            Note: the following will be DISABLED — products set to Draft and                                                      
      642 +            collections unpublished, never deleted. Re-select them (or re-enable                                                  
      643 +            in Disabled items) to restore. Items still used by another supplier                                                   
      644 +            are left untouched:                                                                                                   
      645              <ul>
      644 -              {pendingDeletions.map((d) => (                                                                                      
      646 +              {pendingDisables.map((d) => (                                                                                       
      647                  <li key={`${d.dimKey}-${d.name}`}>
      648                    {DIMENSION_LABELS[d.dimKey]}: {d.name}
      649                  </li>
     ...
      658          )}
      659  
      660          <s-box padding-block-start="300">
      659 -          <s-button                                                                                                               
      660 -            tone="primary"                                                                                                        
      661 -            {...(canApply && !run.active ? {} : { disabled: true })}                                                              
      662 -            {...(run.active ? { loading: true } : {})}                                                                            
      663 -            onClick={handleApply}                                                                                                 
      664 -          >                                                                                                                       
      665 -            Apply Changes                                                                                                         
      666 -          </s-button>                                                                                                             
      661 +          <s-stack direction="inline" gap="base" alignItems="center">                                                             
      662 +            <s-button                                                                                                             
      663 +              tone="primary"                                                                                                      
      664 +              {...(canApply ? {} : { disabled: true })}                                                                           
      665 +              {...(isLive || isStarting ? { loading: true } : {})}                                                                
      666 +              onClick={handleApply}                                                                                               
      667 +            >                                                                                                                     
      668 +              Apply Changes                                                                                                       
      669 +            </s-button>                                                                                                           
      670 +            {isLive && (                                                                                                          
      671 +              <s-button variant="secondary" onClick={handleCancel}>                                                               
      672 +                Cancel run                                                                                                        
      673 +              </s-button>                                                                                                         
      674 +            )}                                                                                                                    
      675 +            {run && ["interrupted", "failed"].includes(run.status) && (                                                           
      676 +              <s-button variant="secondary" onClick={handleResume}>                                                               
      677 +                Resume run                                                                                                        
      678 +              </s-button>                                                                                                         
      679 +            )}                                                                                                                    
      680 +            <s-checkbox                                                                                                           
      681 +              label="Force full import (ignore change detection)"                                                                 
      682 +              checked={force}                                                                                                     
      683 +              {...(isLive ? { disabled: true } : {})}                                                                             
      684 +              onChange={(e) => setForce(e.currentTarget.checked)}                                                                 
      685 +            ></s-checkbox>                                                                                                        
      686 +          </s-stack>                                                                                                              
      687          </s-box>
      688  
      669 -        {run.phase !== "idle" && (                                                                                                
      689 +        {run && (                                                                                                                 
      690            <s-box padding-block-start="300">
      691              <s-text variant="bodySm">
      672 -              {run.phase === "importing" && `Importing products: ${run.offset} / ${run.total}`}                                   
      673 -              {run.phase === "finalizing" &&                                                                                      
      674 -                `Removing de-selected products/collections: ${run.productsRemaining} product(s), ${run.collectionsRemaining} colle
          -ction(s) remaining`}                                                                                                              
      675 -              {run.phase === "done" && "Apply Changes complete."}                                                                 
      692 +              {run.status === "running" && run.phase === "importing" &&                                                           
      693 +                `Importing products: ${run.offset} / ${run.total || "…"} (${run.created} created, ${run.updated} updated, ${run.sk
          +ippedUnchanged} unchanged — skipped)`}                                                                                            
      694 +              {run.status === "running" && run.phase === "disabling" &&                                                           
      695 +                `Disabling de-selected/removed items (products → Draft, collections unpublished): ${run.productsDisabled} product(
          +s), ${run.collectionsUnpublished} collection(s) so far`}                                                                          
      696 +              {run.status === "running" && run.phase === "retrying" &&                                                            
      697 +                `Revisiting ${unresolvedFailures.length} failed batch(es)…`}                                                      
      698 +              {run.status === "completed" && "Apply Changes complete — run finished on the server."}                              
      699 +              {run.status === "failed" && "Import run failed — see results below. You can resume it."}                            
      700 +              {run.status === "cancelled" && "Import run cancelled."}                                                             
      701 +              {run.status === "interrupted" &&                                                                                    
      702 +                "Import run was interrupted (server restarted mid-run). Resume to continue from where it stopped."}               
      703              </s-text>
      704 +            {isLive && (                                                                                                          
      705 +              <s-text variant="bodySm" tone="subdued">                                                                            
      706 +                The import runs on the server — closing this page won't stop it.                                                  
      707 +              </s-text>                                                                                                           
      708 +            )}                                                                                                                    
      709            </s-box>
      710          )}
      711        </s-section>
      712  
      681 -      {run.phase === "done" && (                                                                                                  
      713 +      {run && ["completed", "failed", "cancelled", "interrupted"].includes(run.status) && (                                       
      714          <s-section heading="Import Results">
      683 -          <s-banner tone={run.errors.length > 0 ? "warning" : "success"}>                                                         
      715 +          <s-banner tone={run.status === "completed" && run.errors.length === 0 ? "success" : "warning"}>                         
      716              <s-text>
      685 -              Products: {run.productsCreated} created, {run.productsUpdated} updated, {run.productsDeleted} deleted.              
      686 -              {" "}Collections: {run.collectionsCreated} created, {run.collectionsDeleted} deleted.                               
      717 +              Products: {run.created} created, {run.updated} updated, {run.skippedUnchanged} unchanged (skipped),{" "}            
      718 +              {run.productsDisabled} disabled (set to Draft — nothing is deleted).                                                
      719 +              {" "}Collections: {run.collectionsCreated} created, {run.collectionsUnpublished} unpublished.                       
      720              </s-text>
      721            </s-banner>
      689 -          {run.skippedDeletions.length > 0 && (                                                                                   
      722 +          {run.notices.length > 0 && (                                                                                            
      723              <s-banner tone="info">
      691 -              <s-text variant="headingSm">Kept — still used by another supplier:</s-text>                                         
      692 -              {run.skippedDeletions.map((s, i) => (                                                                               
      693 -                <s-text key={i}>• {s.type}: {s.name}</s-text>                                                                     
      724 +              <s-text variant="headingSm">Notices</s-text>                                                                        
      725 +              {run.notices.map((n, i) => (                                                                                        
      726 +                <s-text key={i}>• {n.message || `${n.type}: ${n.name}`}</s-text>                                                  
      727                ))}
      728              </s-banner>
      729            )}
      730 +          {unresolvedFailures.length > 0 && (                                                                                     
      731 +            <s-banner tone="warning">                                                                                             
      732 +              <s-text variant="headingSm">Batches still failing after retries ({unresolvedFailures.length})</s-text>              
      733 +              {unresolvedFailures.map((f) => (                                                                                    
      734 +                <s-text key={f.id}>                                                                                               
      735 +                  • {f.phase} batch at offset {f.offset} ({f.attempts} attempts): {f.lastError}                                   
      736 +                </s-text>                                                                                                         
      737 +              ))}                                                                                                                 
      738 +            </s-banner>                                                                                                           
      739 +          )}                                                                                                                      
      740            {run.errors.length > 0 && (
      741              <s-box padding="base" borderWidth="base" borderRadius="base" background="subdued">
      742                <pre style={{ margin: 0, fontSize: "12px" }}>
     ...
      747          </s-section>
      748        )}
      749  
      707 -      {!run.active && data?.error && (                                                                                            
      750 +      {commandError && (                                                                                                          
      751          <s-section heading="Error">
      752            <s-banner tone="critical">
      710 -            <s-text>{data.error}</s-text>                                                                                         
      753 +            <s-text>{commandError}</s-text>                                                                                       
      754            </s-banner>
      755          </s-section>
      756        )}

  Searched for 1 pattern (ctrl+o to expand)

● Update(app/routes/app.import.jsx)
  ⎿  Added 1 line, removed 1 line
      1 -import { useEffect, useRef, useState } from "react";                                                                                
      1 +import { useEffect, useState } from "react";                                                                                        
      2  import { useFetcher, useLoaderData, useRevalidator, useSearchParams } from "react-router";
      3  import { boundary } from "@shopify/shopify-app-react-router/server";
      4  import { authenticate } from "../shopify.server";

  Read 1 file (ctrl+o to expand)

● Update(app/routes/app.import.jsx)
  ⎿  Added 9 lines, removed 5 lines
      1010            supplier is used.
      1011          </s-paragraph>
      1012          <s-paragraph>
      1013 -          Unchecking a Collection removes it from the store entirely, unless                                                     
      1014 -          another supplier still has products in it. Unchecking a Brand,                                                         
      1015 -          Sub-collection, or Sub-cat collection only removes the specific                                                        
      1016 -          products carrying that value, with the same cross-supplier                                                             
      1017 -          protection.                                                                                                            
      1013 +          Nothing is ever deleted by an import. Unchecking a Collection                                                          
      1014 +          unpublishes it from all sales channels (unless another supplier still                                                  
      1015 +          has products in it). Unchecking a Brand, Sub-collection, or Sub-cat                                                    
      1016 +          collection sets the specific products carrying that value to Draft,                                                    
      1017 +          with the same cross-supplier protection. Products that disappear from                                                  
      1018 +          the supplier's file are also set to Draft, with a "deleted on the                                                      
      1019 +          supplier's side" notice. Use the Disable buttons (or the Disabled                                                      
      1020 +          items page) to exclude items permanently; re-select or re-enable to                                                    
      1021 +          restore.                                                                                                               
      1022          </s-paragraph>
      1023        </s-section>
      1024      </s-page>

● Import page done. Now the "Disabled items" route — first check the nav structure.

  Read 1 file (ctrl+o to expand)

● Update(app/routes/app.jsx)
  ⎿  Added 1 line
      18        <s-app-nav>
      19          <s-link href="/app">Home</s-link>
      20          <s-link href="/app/import">Import</s-link>
      21 +        <s-link href="/app/disabled">Disabled items</s-link>                                                                       
      22          <s-link href="/app/catalogs">Catalogs</s-link>
      23          <s-link href="/app/xero">Xero</s-link>
      24          <s-link href="/app/payfast">PayFast</s-link>

● Write(app/routes/app.disabled.jsx)
  ⎿  Wrote 279 lines to app/routes/app.disabled.jsx
      1 import { useState } from "react";
      2 import { useFetcher, useLoaderData, useSearchParams } from "react-router";
      3 import { boundary } from "@shopify/shopify-app-react-router/server";
      4 import { authenticate } from "../shopify.server";
      5 import prisma from "../db.server.js";
      6
      7 async function getSuppliersService() {
      8   return import("../services/suppliers.server.js");
      9 }
     … +269 lines (ctrl+o to expand)

● Phase 4 done. Now running the existing test suite to see what the refactor broke before extending tests.

● Bash(npx vitest run app/services/suppliers.server.test.js 2>&1 | tail -40)
  ⎿   ❯ app/services/suppliers.server.test.js:590:26
         588|     ]);
         589|
     … +38 lines (ctrl+o to expand)

  Read 1 file (ctrl+o to expand)

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 7 lines, removed 1 line
      17    readFileSync: vi.fn((p) => fsState.files[p]),
      18  }));
      19  
      20 -const { mockPrismaProduct, mockPrismaMarkupRule } = vi.hoisted(() => ({                                                            
      20 +const { mockPrismaProduct, mockPrismaMarkupRule, mockPrismaEntityDisable } = vi.hoisted(() => ({                                   
      21    mockPrismaProduct: {
      22      findMany: vi.fn().mockResolvedValue([]),
      23      findUnique: vi.fn().mockResolvedValue(null),
      24      count: vi.fn().mockResolvedValue(0),
      25 +    update: vi.fn().mockResolvedValue({}),                                                                                         
      26      delete: vi.fn(),
      27    },
      28    mockPrismaMarkupRule: {
      29      findMany: vi.fn().mockResolvedValue([]),
      30    },
      31 +  mockPrismaEntityDisable: {                                                                                                       
      32 +    findMany: vi.fn().mockResolvedValue([]),                                                                                       
      33 +    upsert: vi.fn().mockResolvedValue({}),                                                                                         
      34 +    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),                                                                           
      35 +  },                                                                                                                               
      36  }));
      37  
      38  // Mocking "@prisma/client" does NOT intercept db.server.js's real client — db.server.js

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 1 line
      44    default: {
      45      product: mockPrismaProduct,
      46      markupRule: mockPrismaMarkupRule,
      47 +    entityDisable: mockPrismaEntityDisable,                                                                                        
      48    },
      49  }));
      50  

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 2 lines, removed 2 lines
       93    saveProductLocally: vi.fn(async () => ({})),
       94    listCollections: vi.fn(async () => []),
       95    createCollection: vi.fn(async (_admin, title) => ({ id: `gid://shopify/Collection/${title}`, title })),
       96 -  deleteCollection: vi.fn(async () => {}),                                                                                        
       96    addProductsToCollection: vi.fn(async () => {}),
       97    getAllPublicationIds: vi.fn(async () => []),
       98    publishResource: vi.fn(async () => {}),
      100 -  deleteProduct: vi.fn(async () => {}),                                                                                           
       99 +  unpublishResource: vi.fn(async () => {}),                                                                                       
      100 +  setProductStatus: vi.fn(async () => {}),                                                                                        
      101    // Real retry/backoff timing is unit-tested directly against product.server.js's
      102    // actual implementation in product.server.test.js. Here it's a plain passthrough —
      103    // these tests only care how suppliers.server.js reacts once retries are already

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 4 lines, removed 1 line
      117    buildMarkupIndex,
      118    resolveMarkupRule,
      119    resolvePricingForProducts,
      120 +  buildDisableIndex,                                                                                                              
      121 +  isProductDisabled,                                                                                                              
      122 +  computeProductHash,                                                                                                             
      123    runImportBatch,
      121 -  runFinalizeBatch,                                                                                                               
      124 +  runDisablePass,                                                                                                                 
      125  } = await import("./suppliers.server.js");
      126  
      127  const fakeAdmin = {};

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 6 lines, removed 2 lines
      132    mockProductService.saveProductLocally.mockClear();
      133    mockProductService.listCollections.mockClear().mockResolvedValue([]);
      134    mockProductService.createCollection.mockClear();
      135 -  mockProductService.deleteCollection.mockClear();                                                                                
      135    mockProductService.addProductsToCollection.mockClear();
      136    mockProductService.getAllPublicationIds.mockClear().mockResolvedValue([]);
      137    mockProductService.publishResource.mockClear();
      139 -  mockProductService.deleteProduct.mockClear();                                                                                   
      138 +  mockProductService.unpublishResource.mockClear().mockResolvedValue(undefined);                                                  
      139 +  mockProductService.setProductStatus.mockClear().mockResolvedValue(undefined);                                                   
      140    mockProductService.withNetworkRetry.mockClear().mockImplementation((fn) => fn());
      141    mockPrismaProduct.findMany.mockClear().mockResolvedValue([]);
      142    mockPrismaProduct.findUnique.mockClear().mockResolvedValue(null);
      143    mockPrismaProduct.count.mockClear().mockResolvedValue(0);
      144 +  mockPrismaProduct.update.mockClear().mockResolvedValue({});                                                                     
      145    mockPrismaProduct.delete.mockClear();
      146    mockPrismaMarkupRule.findMany.mockClear().mockResolvedValue([]);
      147 +  mockPrismaEntityDisable.findMany.mockClear().mockResolvedValue([]);                                                             
      148 +  mockPrismaEntityDisable.upsert.mockClear().mockResolvedValue({});                                                               
      149 +  mockPrismaEntityDisable.deleteMany.mockClear().mockResolvedValue({ count: 0 });                                                 
      150  }
      151  
      152  const SUPPLIERS_DIR = `${process.cwd()}/suppliers`;

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 313 lines, removed 39 lines
      533    });
      534  });
      535  
      536 -describe("runFinalizeBatch", () => {                                                                                              
      536 +describe("runDisablePass", () => {                                                                                                
      537    const emptySelections = { collections: [], brands: [], subCollections: [], subCatCollections: [] };
      538  
      539    it("takes stale products from the front of a freshly-requeried list each call (no stale offset math)", async () => {
      540 -    // Simulates 3 stale rows on the first call; after "deleting" 2, only 1 remains on                                            
      541 -    // the DB the next time computeStaleProducts re-queries it — this is the scenario                                             
      542 -    // that broke an earlier offset-indexed version of this function.                                                             
      540 +    // Simulates 3 stale rows on the first call; after disabling 2 (they drop out of                                              
      541 +    // the active:true filter), only 1 remains the next time computeStaleProducts                                                 
      542 +    // re-queries — this is the scenario that broke an earlier offset-indexed version.                                            
      543      mockPrismaProduct.findMany
      544        .mockResolvedValueOnce([
      545          { id: "db1", externalProductId: "OLD-1", shopifyProductId: "gid://shopify/Product/1", title: "Old 1" },
     ...
      551        ])
      552        .mockResolvedValueOnce([]);
      553  
      554 -    const call1 = await runFinalizeBatch(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSiz
          -e: 2 });                                                                                                                          
      555 -    expect(call1.deleted).toBe(2);                                                                                                
      554 +    const call1 = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSize:
          + 2 });                                                                                                                            
      555 +    expect(call1.disabled).toBe(2);                                                                                               
      556      expect(call1.productsRemaining).toBe(1);
      557      expect(call1.done).toBe(false);
      558 -    expect(mockPrismaProduct.delete).toHaveBeenCalledTimes(2);                                                                    
      558 +    // DISABLED, never deleted: Shopify status DRAFT + local active:false.                                                        
      559 +    expect(mockPrismaProduct.delete).not.toHaveBeenCalled();                                                                      
      560 +    expect(mockProductService.setProductStatus).toHaveBeenCalledTimes(2);                                                         
      561 +    expect(mockProductService.setProductStatus).toHaveBeenCalledWith(fakeAdmin, "gid://shopify/Product/1", "DRAFT");              
      562 +    expect(mockPrismaProduct.update).toHaveBeenCalledWith(                                                                        
      563 +      expect.objectContaining({                                                                                                   
      564 +        where: { id: "db1" },                                                                                                     
      565 +        data: expect.objectContaining({ active: false, disabledReason: "supplier_removed" }),                                     
      566 +      }),                                                                                                                         
      567 +    );                                                                                                                            
      568  
      560 -    const call2 = await runFinalizeBatch(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSiz
          -e: 2 });                                                                                                                          
      561 -    expect(call2.deleted).toBe(1);                                                                                                
      569 +    const call2 = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSize:
          + 2 });                                                                                                                            
      570 +    expect(call2.disabled).toBe(1);                                                                                               
      571      expect(call2.productsRemaining).toBe(0);
      572      // The stale-products branch always reports done:false — it doesn't look ahead at
      573      // the collections phase. The NEXT call re-queries, finds no stale products left,
      574      // and (since this fixture has no collections either) reports done:true.
      575      expect(call2.done).toBe(false);
      576  
      568 -    const call3 = await runFinalizeBatch(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSiz
          -e: 2 });                                                                                                                          
      569 -    expect(call3.deleted).toBe(0);                                                                                                
      577 +    const call3 = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSize:
          + 2 });                                                                                                                            
      578 +    expect(call3.disabled).toBe(0);                                                                                               
      579      expect(call3.done).toBe(true);
      580    });
      581  
      573 -  it("moves to collection deletion once no stale products remain, and reports done when both lists are empty", async () => {      
      574 -    mockPrismaProduct.findMany.mockResolvedValueOnce([]); // no stale products                                                    
      582 +  it("resolves the disable reason per product: supplier_removed / manual / deselected", async () => {                             
      583 +    // OLD-GONE is absent from the file; OLD-MANUAL is in the file but covered by an                                              
      584 +    // EntityDisable row; OLD-DESEL is in the file but its collection is unchecked.                                               
      585 +    mockPrismaEntityDisable.findMany.mockResolvedValue([                                                                          
      586 +      { level: "product", value: "OLD-MANUAL", reason: "manual" },                                                                
      587 +    ]);                                                                                                                           
      588 +    mockPrismaProduct.findMany.mockResolvedValueOnce([                                                                            
      589 +      { id: "db1", externalProductId: "OLD-GONE", shopifyProductId: "gid://shopify/Product/1", title: "Gone" },                   
      590 +      { id: "db2", externalProductId: "OLD-MANUAL", shopifyProductId: "gid://shopify/Product/2", title: "Manual" },               
      591 +      { id: "db3", externalProductId: "OLD-DESEL", shopifyProductId: "gid://shopify/Product/3", title: "Desel" },                 
      592 +    ]);                                                                                                                           
      593 +                                                                                                                                  
      594 +    const products = [                                                                                                            
      595 +      makeProduct({ collection: "HOSES", productId: "OLD-MANUAL" }),                                                              
      596 +      makeProduct({ collection: "HOSES", productId: "OLD-DESEL" }),                                                               
      597 +    ];                                                                                                                            
      598 +    const result = await runDisablePass(fakeAdmin, {                                                                              
      599 +      supplierName: "agrinet",                                                                                                    
      600 +      products,                                                                                                                   
      601 +      selections: emptySelections,                                                                                                
      602 +      batchSize: 10,                                                                                                              
      603 +    });                                                                                                                           
      604 +                                                                                                                                  
      605 +    expect(result.disabled).toBe(3);                                                                                              
      606 +    const reasonsByRow = Object.fromEntries(                                                                                      
      607 +      mockPrismaProduct.update.mock.calls.map(([args]) => [args.where.id, args.data.disabledReason]),                             
      608 +    );                                                                                                                            
      609 +    expect(reasonsByRow).toEqual({ db1: "supplier_removed", db2: "manual", db3: "deselected" });                                  
      610 +    // Only supplier-removed products produce a "deleted on the supplier's side" notice.                                          
      611 +    expect(result.notices).toEqual([                                                                                              
      612 +      expect.objectContaining({ type: "product", name: "Gone", reason: "supplier_removed" }),                                     
      613 +    ]);                                                                                                                           
      614 +  });                                                                                                                             
      615 +                                                                                                                                  
      616 +  it("unpublishes (never deletes) de-selected collections and records the EntityDisable notice", async () => {                    
      617 +    mockPrismaProduct.findMany                                                                                                    
      618 +      .mockResolvedValueOnce([]) // no stale products                                                                             
      619 +      .mockResolvedValueOnce([]); // computeCollectionsToUnpublish local rows                                                     
      620      mockProductService.listCollections.mockResolvedValueOnce([{ id: "gid://shopify/Collection/OLDCOL", title: "OLDCOL" }]);
      621 +    mockProductService.getAllPublicationIds.mockResolvedValueOnce(["gid://shopify/Publication/1"]);                               
      622  
      623      const products = [makeProduct({ collection: "OLDCOL", productId: "P1" })];
      578 -    const result = await runFinalizeBatch(fakeAdmin, { supplierName: "agrinet", products, selections: emptySelections, batchSize: 
          -10 });                                                                                                                            
      624 +    const result = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products, selections: emptySelections, batchSize: 10
          + });                                                                                                                              
      625  
      626      expect(result.productsRemaining).toBe(0);
      581 -    expect(result.collectionsDeleted).toBe(1);                                                                                    
      627 +    expect(result.collectionsUnpublished).toBe(1);                                                                                
      628      expect(result.collectionsRemaining).toBe(0);
      629      expect(result.done).toBe(true);
      584 -    expect(mockProductService.deleteCollection).toHaveBeenCalledTimes(1);                                                         
      630 +    expect(mockProductService.unpublishResource).toHaveBeenCalledWith(                                                            
      631 +      fakeAdmin,                                                                                                                  
      632 +      "gid://shopify/Collection/OLDCOL",                                                                                          
      633 +      ["gid://shopify/Publication/1"],                                                                                            
      634 +    );                                                                                                                            
      635 +    expect(mockPrismaEntityDisable.upsert).toHaveBeenCalledWith(                                                                  
      636 +      expect.objectContaining({                                                                                                   
      637 +        create: expect.objectContaining({ level: "collections", value: "OLDCOL", reason: "deselected" }),                         
      638 +      }),                                                                                                                         
      639 +    );                                                                                                                            
      640    });
      641  
      587 -  it("is immediately done when there is nothing stale and nothing to delete", async () => {                                       
      588 -    mockPrismaProduct.findMany.mockResolvedValueOnce([]);                                                                         
      642 +  it("flags collections that vanished from the supplier file as supplier_removed, with a notice", async () => {                   
      643 +    mockPrismaProduct.findMany                                                                                                    
      644 +      .mockResolvedValueOnce([]) // no stale products                                                                             
      645 +      .mockResolvedValueOnce([{ userDetail: { assignedFirstMajorDescription: "GONECOL" } }]); // local rows                       
      646 +    mockProductService.listCollections.mockResolvedValueOnce([{ id: "gid://shopify/Collection/GONECOL", title: "GONECOL" }]);     
      647 +    mockProductService.getAllPublicationIds.mockResolvedValueOnce(["gid://shopify/Publication/1"]);                               
      648 +                                                                                                                                  
      649 +    // File no longer mentions GONECOL at all.                                                                                    
      650 +    const result = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSize
          +: 10 });                                                                                                                          
      651 +                                                                                                                                  
      652 +    expect(result.collectionsUnpublished).toBe(1);                                                                                
      653 +    expect(result.notices).toEqual([                                                                                              
      654 +      expect.objectContaining({ type: "collection", name: "GONECOL", reason: "supplier_removed" }),                               
      655 +    ]);                                                                                                                           
      656 +    expect(mockPrismaEntityDisable.upsert).toHaveBeenCalledWith(                                                                  
      657 +      expect.objectContaining({                                                                                                   
      658 +        create: expect.objectContaining({ level: "collections", value: "GONECOL", reason: "supplier_removed" }),                  
      659 +      }),                                                                                                                         
      660 +    );                                                                                                                            
      661 +  });                                                                                                                             
      662 +                                                                                                                                  
      663 +  it("leaves collections another supplier still uses untouched (skipped, no EntityDisable row)", async () => {                    
      664 +    mockPrismaProduct.findMany                                                                                                    
      665 +      .mockResolvedValueOnce([]) // no stale products                                                                             
      666 +      .mockResolvedValueOnce([]); // local rows                                                                                   
      667 +    mockPrismaProduct.count.mockResolvedValueOnce(3); // another supplier's active products use SHARED                            
      668 +    mockProductService.listCollections.mockResolvedValueOnce([{ id: "gid://shopify/Collection/SHARED", title: "SHARED" }]);       
      669 +                                                                                                                                  
      670 +    const products = [makeProduct({ collection: "SHARED", productId: "P1" })];                                                    
      671 +    const result = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products, selections: emptySelections, batchSize: 10
          + });                                                                                                                              
      672 +                                                                                                                                  
      673 +    expect(result.collectionsUnpublished).toBe(0);                                                                                
      674 +    expect(result.skipped).toEqual([{ type: "collection", name: "SHARED" }]);                                                     
      675 +    expect(result.done).toBe(true);                                                                                               
      676 +    expect(mockProductService.unpublishResource).not.toHaveBeenCalled();                                                          
      677 +    expect(mockPrismaEntityDisable.upsert).not.toHaveBeenCalled();                                                                
      678 +  });                                                                                                                             
      679 +                                                                                                                                  
      680 +  it("is immediately done when there is nothing stale and nothing to unpublish", async () => {                                    
      681 +    mockPrismaProduct.findMany.mockResolvedValueOnce([]).mockResolvedValueOnce([]);                                               
      682      mockProductService.listCollections.mockResolvedValueOnce([]);
      683  
      591 -    const result = await runFinalizeBatch(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSi
          -ze: 10 });                                                                                                                        
      684 +    const result = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSize
          +: 10 });                                                                                                                          
      685      expect(result.done).toBe(true);
      593 -    expect(result.deleted).toBe(0);                                                                                               
      594 -    expect(result.collectionsDeleted).toBe(0);                                                                                    
      686 +    expect(result.disabled).toBe(0);                                                                                              
      687 +    expect(result.collectionsUnpublished).toBe(0);                                                                                
      688    });
      689  
      597 -  it("stale-product deletion stops early once the time budget has elapsed, but always deletes at least one", async () => {        
      690 +  it("stale-product disabling stops early once the time budget has elapsed, but always disables at least one", async () => {      
      691      mockPrismaProduct.findMany.mockResolvedValueOnce([
      692        { id: "db1", externalProductId: "OLD-1", shopifyProductId: "gid://shopify/Product/1", title: "Old 1" },
      693        { id: "db2", externalProductId: "OLD-2", shopifyProductId: "gid://shopify/Product/2", title: "Old 2" },
      694        { id: "db3", externalProductId: "OLD-3", shopifyProductId: "gid://shopify/Product/3", title: "Old 3" },
      695      ]);
      696  
      604 -    const result = await runFinalizeBatch(fakeAdmin, {                                                                            
      697 +    const result = await runDisablePass(fakeAdmin, {                                                                              
      698        supplierName: "agrinet",
      699        products: [],
      700        selections: emptySelections,
     ...
      702        timeBudgetMs: -1,
      703      });
      704  
      612 -    expect(result.deleted).toBe(1);                                                                                               
      705 +    expect(result.disabled).toBe(1);                                                                                              
      706      expect(result.productsRemaining).toBe(2);
      707      expect(result.done).toBe(false);
      615 -    expect(mockPrismaProduct.delete).toHaveBeenCalledTimes(1);                                                                    
      708 +    expect(mockProductService.setProductStatus).toHaveBeenCalledTimes(1);                                                         
      709    });
      710  
      618 -  it("collection deletion stops early once the time budget has elapsed, but always deletes at least one", async () => {           
      619 -    mockPrismaProduct.findMany.mockResolvedValueOnce([]); // no stale products                                                    
      711 +  it("collection unpublishing stops early once the time budget has elapsed, but always processes at least one", async () => {     
      712 +    mockPrismaProduct.findMany                                                                                                    
      713 +      .mockResolvedValueOnce([]) // no stale products                                                                             
      714 +      .mockResolvedValueOnce([]); // local rows                                                                                   
      715      mockProductService.listCollections.mockResolvedValueOnce([
      716        { id: "gid://shopify/Collection/A", title: "A" },
      717        { id: "gid://shopify/Collection/B", title: "B" },
      718      ]);
      719 +    mockProductService.getAllPublicationIds.mockResolvedValueOnce(["gid://shopify/Publication/1"]);                               
      720  
      721      const products = [
      722        makeProduct({ collection: "A", productId: "P1" }),
      723        makeProduct({ collection: "B", productId: "P2" }),
      724      ];
      629 -    const result = await runFinalizeBatch(fakeAdmin, {                                                                            
      725 +    const result = await runDisablePass(fakeAdmin, {                                                                              
      726        supplierName: "agrinet",
      727        products,
      728        selections: emptySelections,
     ...
      730        timeBudgetMs: -1,
      731      });
      732  
      637 -    expect(result.collectionsDeleted).toBe(1);                                                                                    
      733 +    expect(result.collectionsUnpublished).toBe(1);                                                                                
      734      expect(result.collectionsRemaining).toBe(1);
      735      expect(result.done).toBe(false);
      640 -    expect(mockProductService.deleteCollection).toHaveBeenCalledTimes(1);                                                         
      736 +    expect(mockProductService.unpublishResource).toHaveBeenCalledTimes(1);                                                        
      737    });
      738  
      643 -  // Sibling of the two runImportBatch regression tests above: runFinalizeBatch's own                                             
      644 -  // listCollections(admin) call (collection-deletion phase) had the same unguarded shape.                                        
      645 -  it("continues with an empty collection map (instead of throwing) if listCollections fails during collection deletion", async () 
          -=> {                                                                                                                              
      646 -    mockPrismaProduct.findMany.mockResolvedValueOnce([]); // no stale products                                                    
      739 +  // Sibling of the two runImportBatch regression tests above: the disable pass's own                                             
      740 +  // listCollections(admin) call (collection phase) keeps the same degrade-not-throw shape.                                       
      741 +  it("continues (instead of throwing) if listCollections fails during the collection phase", async () => {                        
      742 +    mockPrismaProduct.findMany                                                                                                    
      743 +      .mockResolvedValueOnce([]) // no stale products                                                                             
      744 +      .mockResolvedValueOnce([]); // local rows                                                                                   
      745      mockProductService.listCollections.mockRejectedValueOnce(
      746        new Error("Http request error, no response available: GraphQL Client: fetch failed"),
      747      );
      748  
      749      const products = [makeProduct({ collection: "OLDCOL", productId: "P1" })];
      652 -    const result = await runFinalizeBatch(fakeAdmin, {                                                                            
      750 +    const result = await runDisablePass(fakeAdmin, {                                                                              
      751        supplierName: "agrinet",
      752        products,
      753        selections: emptySelections,
     ...
      757      expect(result.errors).toEqual(
      758        expect.arrayContaining([expect.objectContaining({ stage: "list-collections" })]),
      759      );
      662 -    // No collection titles resolve without the lookup, so nothing to delete this pass —                                          
      663 -    // self-heals on the next Finalize call instead of aborting.                                                                  
      664 -    expect(result.collectionsDeleted).toBe(0);                                                                                    
      760 +    // Without the lookup no Shopify id resolves, so no unpublish mutation fires — but                                            
      761 +    // the EntityDisable row is still written (the notice + processed marker), so the                                             
      762 +    // pass completes rather than aborting.                                                                                       
      763 +    expect(mockProductService.unpublishResource).not.toHaveBeenCalled();                                                          
      764 +    expect(result.collectionsUnpublished).toBe(1);                                                                                
      765      expect(result.done).toBe(true);
      666 -    expect(mockProductService.deleteCollection).not.toHaveBeenCalled();                                                           
      766    });
      767  });
      768 +                                                                                                                                  
      769 +describe("entity disables — gating and helpers", () => {                                                                          
      770 +  const selections = { collections: ["HOSES"], brands: [], subCollections: [], subCatCollections: [] };                           
      771 +                                                                                                                                  
      772 +  it("isProductDisabled matches product-level rows and every dimension the product carries", () => {                              
      773 +    const product = makeProduct({ collection: "HOSES", brand: "Vulcan", subCollection: "Fittings", subCatCollection: "Brass", prod
          +uctId: "P1" });                                                                                                                   
      774 +    expect(isProductDisabled(buildDisableIndex([]), product)).toBe(false);                                                        
      775 +    expect(isProductDisabled(buildDisableIndex([{ level: "product", value: "P1" }]), product)).toBe(true);                        
      776 +    expect(isProductDisabled(buildDisableIndex([{ level: "brands", value: "Vulcan" }]), product)).toBe(true);                     
      777 +    expect(isProductDisabled(buildDisableIndex([{ level: "subCatCollections", value: "Brass" }]), product)).toBe(true);           
      778 +    expect(isProductDisabled(buildDisableIndex([{ level: "brands", value: "OtherBrand" }]), product)).toBe(false);                
      779 +  });                                                                                                                             
      780 +                                                                                                                                  
      781 +  it("runImportBatch excludes disabled products from toImport and reports skippedDisabled", async () => {                         
      782 +    mockPrismaEntityDisable.findMany.mockResolvedValue([                                                                          
      783 +      { level: "product", value: "2", reason: "manual" },                                                                         
      784 +    ]);                                                                                                                           
      785 +    const products = ["1", "2", "3"].map((id) => makeProduct({ collection: "HOSES", productId: id }));                            
      786 +                                                                                                                                  
      787 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products, selections, offset: 0, batchSize: 10 });  
      788 +                                                                                                                                  
      789 +    expect(result.total).toBe(2); // "2" is excluded entirely                                                                     
      790 +    expect(result.skippedDisabled).toBe(1);                                                                                       
      791 +    expect(result.created).toBe(2);                                                                                               
      792 +    expect(mockProductService.createShopifyProduct).toHaveBeenCalledTimes(2);                                                     
      793 +  });                                                                                                                             
      794 +                                                                                                                                  
      795 +  it("re-selecting a collection with an import-written disable republishes it and clears the row", async () => {                  
      796 +    mockPrismaEntityDisable.findMany.mockResolvedValue([                                                                          
      797 +      { level: "collections", value: "HOSES", reason: "deselected" },                                                             
      798 +    ]);                                                                                                                           
      799 +    mockProductService.listCollections.mockResolvedValueOnce([{ id: "gid://shopify/Collection/HOSES", title: "HOSES" }]);         
      800 +    mockProductService.getAllPublicationIds.mockResolvedValueOnce(["gid://shopify/Publication/1"]);                               
      801 +    const products = [makeProduct({ collection: "HOSES", productId: "1" })];                                                      
      802 +                                                                                                                                  
      803 +    // NOTE: the collections-level EntityDisable row ALSO gates the products carrying                                             
      804 +    // that collection (isProductDisabled), so this run has nothing to import — but the                                           
      805 +    // offset-0 collection reconciliation must still republish + clear the row, which                                             
      806 +    // un-disables the collection for the NEXT run.                                                                               
      807 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products, selections, offset: 0, batchSize: 10 });  
      808 +                                                                                                                                  
      809 +    expect(mockProductService.publishResource).toHaveBeenCalledWith(fakeAdmin, "gid://shopify/Collection/HOSES", ["gid://shopify/P
          +ublication/1"]);                                                                                                                  
      810 +    expect(mockPrismaEntityDisable.deleteMany).toHaveBeenCalledWith({                                                             
      811 +      where: { supplierName: "agrinet", level: "collections", value: "HOSES" },                                                   
      812 +    });                                                                                                                           
      813 +    expect(result.skippedDisabled).toBe(1);                                                                                       
      814 +  });                                                                                                                             
      815 +                                                                                                                                  
      816 +  it("a manually disabled collection is never auto-republished or cleared", async () => {                                         
      817 +    mockPrismaEntityDisable.findMany.mockResolvedValue([                                                                          
      818 +      { level: "collections", value: "HOSES", reason: "manual" },                                                                 
      819 +    ]);                                                                                                                           
      820 +    mockProductService.listCollections.mockResolvedValueOnce([{ id: "gid://shopify/Collection/HOSES", title: "HOSES" }]);         
      821 +    const products = [makeProduct({ collection: "HOSES", productId: "1" })];                                                      
      822 +                                                                                                                                  
      823 +    await runImportBatch(fakeAdmin, { supplierName: "agrinet", products, selections, offset: 0, batchSize: 10 });                 
      824 +                                                                                                                                  
      825 +    expect(mockProductService.publishResource).not.toHaveBeenCalled();                                                            
      826 +    expect(mockPrismaEntityDisable.deleteMany).not.toHaveBeenCalled();                                                            
      827 +  });                                                                                                                             
      828 +});                                                                                                                               
      829 +                                                                                                                                  
      830 +describe("incremental import — computeProductHash and the unchanged-skip", () => {                                                
      831 +  const selections = { collections: ["HOSES"], brands: [], subCollections: [], subCatCollections: [] };                           
      832 +                                                                                                                                  
      833 +  it("computeProductHash changes when product details, pricing, stock, or resolved markup change", () => {                        
      834 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      835 +    const base = computeProductHash(product, null, null, null);                                                                   
      836 +    expect(computeProductHash(product, null, null, null)).toBe(base); // deterministic                                            
      837 +                                                                                                                                  
      838 +    const changedProduct = { ...product, desc: "renamed" };                                                                       
      839 +    expect(computeProductHash(changedProduct, null, null, null)).not.toBe(base);                                                  
      840 +    expect(computeProductHash(product, { priceCodes: [{ price: "9.99" }] }, null, null)).not.toBe(base);                          
      841 +    expect(computeProductHash(product, null, { available: 5 }, null)).not.toBe(base);                                             
      842 +    expect(computeProductHash(product, null, null, { markupPct: 10, markupFlat: null })).not.toBe(base);                          
      843 +  });                                                                                                                             
      844 +                                                                                                                                  
      845 +  function seedUnchangedRow(product) {                                                                                            
      846 +    mockPrismaProduct.findUnique.mockResolvedValue({                                                                              
      847 +      shopifyProductId: "gid://shopify/Product/EXISTING",                                                                         
      848 +      active: true,                                                                                                               
      849 +      lastPushedHash: computeProductHash(product, null, null, null),                                                              
      850 +    });                                                                                                                           
      851 +  }                                                                                                                               
      852 +                                                                                                                                  
      853 +  it("skips every Shopify call for an unchanged, active, already-pushed product", async () => {                                   
      854 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      855 +    seedUnchangedRow(product);                                                                                                    
      856 +                                                                                                                                  
      857 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products: [product], selections, offset: 0, batchSiz
          +e: 10 });                                                                                                                         
      858 +                                                                                                                                  
      859 +    expect(result.skippedUnchanged).toBe(1);                                                                                      
      860 +    expect(result.created).toBe(0);                                                                                               
      861 +    expect(result.updated).toBe(0);                                                                                               
      862 +    expect(result.offset).toBe(1); // a skip still advances the offset                                                            
      863 +    expect(mockProductService.createShopifyProduct).not.toHaveBeenCalled();                                                       
      864 +    expect(mockProductService.updateShopifyProduct).not.toHaveBeenCalled();                                                       
      865 +    expect(mockProductService.saveProductLocally).not.toHaveBeenCalled();                                                         
      866 +  });                                                                                                                             
      867 +                                                                                                                                  
      868 +  it("force: true bypasses the unchanged-skip", async () => {                                                                     
      869 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      870 +    seedUnchangedRow(product);                                                                                                    
      871 +                                                                                                                                  
      872 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products: [product], selections, offset: 0, batchSiz
          +e: 10, force: true });                                                                                                            
      873 +                                                                                                                                  
      874 +    expect(result.skippedUnchanged).toBe(0);                                                                                      
      875 +    expect(result.updated).toBe(1);                                                                                               
      876 +    expect(mockProductService.updateShopifyProduct).toHaveBeenCalledTimes(1);                                                     
      877 +  });                                                                                                                             
      878 +                                                                                                                                  
      879 +  it("a MarkupRule change re-pushes a product whose files are unchanged", async () => {                                           
      880 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      881 +    seedUnchangedRow(product); // hash stored with NO markup rule                                                                 
      882 +    mockPrismaMarkupRule.findMany.mockResolvedValue([                                                                             
      883 +      { level: "collections", value: "HOSES", markupPct: 15, markupFlat: null },                                                  
      884 +    ]);                                                                                                                           
      885 +                                                                                                                                  
      886 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products: [product], selections, offset: 0, batchSiz
          +e: 10 });                                                                                                                         
      887 +                                                                                                                                  
      888 +    expect(result.skippedUnchanged).toBe(0);                                                                                      
      889 +    expect(result.updated).toBe(1);                                                                                               
      890 +  });                                                                                                                             
      891 +                                                                                                                                  
      892 +  it("an inactive (disabled) row is never skip-eligible — re-import re-pushes and re-activates it", async () => {                 
      893 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      894 +    mockPrismaProduct.findUnique.mockResolvedValue({                                                                              
      895 +      shopifyProductId: "gid://shopify/Product/EXISTING",                                                                         
      896 +      active: false, // disabled earlier                                                                                          
      897 +      lastPushedHash: computeProductHash(product, null, null, null), // even with a matching hash                                 
      898 +    });                                                                                                                           
      899 +                                                                                                                                  
      900 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products: [product], selections, offset: 0, batchSiz
          +e: 10 });                                                                                                                         
      901 +                                                                                                                                  
      902 +    expect(result.skippedUnchanged).toBe(0);                                                                                      
      903 +    expect(result.updated).toBe(1);                                                                                               
      904 +    // Post-push bookkeeping clears the disable state and stores the fresh hash.                                                  
      905 +    expect(mockPrismaProduct.update).toHaveBeenCalledWith(                                                                        
      906 +      expect.objectContaining({                                                                                                   
      907 +        where: { externalProductId: "P1" },                                                                                       
      908 +        data: expect.objectContaining({ active: true, disabledReason: null, lastPushedHash: expect.any(String) }),                
      909 +      }),                                                                                                                         
      910 +    );                                                                                                                            
      911 +  });                                                                                                                             
      912 +                                                                                                                                  
      913 +  it("does not persist the hash when publishing fails — the next run re-pushes", async () => {                                    
      914 +    mockProductService.getAllPublicationIds.mockResolvedValueOnce(["gid://shopify/Publication/1"]);                               
      915 +    mockProductService.publishResource.mockRejectedValueOnce(new Error("network blip"));                                          
      916 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      917 +                                                                                                                                  
      918 +    // offset 1 of 2 products skips ensureCollectionsExist (whose publishResource call                                            
      919 +    // would consume the rejection) — same isolation trick as the save-before-publish test.                                       
      920 +    const products = [makeProduct({ collection: "HOSES", productId: "P0" }), product];                                            
      921 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products, selections, offset: 1, batchSize: 10 });  
      922 +                                                                                                                                  
      923 +    expect(result.errors).toEqual(expect.arrayContaining([expect.objectContaining({ stage: "publish" })]));                       
      924 +    expect(mockPrismaProduct.update).not.toHaveBeenCalled();                                                                      
      925 +  });                                                                                                                             
      926 +                                                                                                                                  
      927 +  it("persists the hash after a fully clean push", async () => {                                                                  
      928 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      929 +                                                                                                                                  
      930 +    await runImportBatch(fakeAdmin, { supplierName: "agrinet", products: [product], selections, offset: 0, batchSize: 10 });      
      931 +                                                                                                                                  
      932 +    expect(mockPrismaProduct.update).toHaveBeenCalledWith(                                                                        
      933 +      expect.objectContaining({                                                                                                   
      934 +        where: { externalProductId: "P1" },                                                                                       
      935 +        data: expect.objectContaining({                                                                                           
      936 +          lastPushedHash: computeProductHash(product, null, null, null),                                                          
      937 +          active: true,                                                                                                           
      938 +        }),                                                                                                                       
      939 +      }),                                                                                                                         
      940 +    );                                                                                                                            
      941 +  });                                                                                                                             
      942 +});                                                                                                                               

● Bash(npx vitest run app/services/suppliers.server.test.js 2>&1 | tail -30)
  ⎿  npm warn Unknown project config "shamefully-hoist". This will stop working in the next major version of npm.

      RUN  v4.1.8 /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker
     … +6 lines (ctrl+o to expand)

● All 48 suppliers tests pass. Now the job-runner test file.

● Write(app/services/import-run.server.test.js)
  ⎿  Wrote 405 lines to app/services/import-run.server.test.js
       1 import { describe, it, expect, vi, beforeEach } from "vitest";
       2
       3 // In-memory fakes for the two job tables — stateful so the runner's own
      388
      389     expect(mockSuppliers.runImportBatch).toHaveBeenCalledWith(
      390       fakeAdmin,
      391       expect.objectContaining({ offset: 2, selections: { collections: ["HOSES"] } }),
      392     );
      393     expect(finished.status).toBe("completed");
      394     expect(finished.created).toBe(4); // 2 preserved + 2 new
      395   });
      396
      397   it("refuses to resume a completed run", async () => {
      398     const row = await mockImportRun.create({
      399       data: { supplierName: "agrinet", shop: "test.myshopify.com", selections: "{}", force: false },
      400     });
      401     db.runs.get(row.id).status = "completed";
      402
      403     await expect(resumeRun({ runId: row.id, shop: "test.myshopify.com" }, deps())).rejects.toThrow(/only interrupted or failed/);
      404   });
      405 });

● Bash(npx vitest run app/services/import-run.server.test.js 2>&1 | tail -40)
  ⎿  Waiting…
  ⎿  npm warn Unknown project config "shamefully-hoist". This will stop working in the next major version of npm.

      RUN  v4.1.8 /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker

      ❯ app/services/import-run.server.test.js (12 tests | 1 failed) 515ms
          × cancelling mid-run stops before the next batch and marks the run cancelled 53ms

       6 // request (tunnel blip, 502 "context canceled", closed tab) killed the whole
       7 // multi-hour run, with no retry. Here the run executes as an in-process
       8 // background job instead: one short POST starts it, the UI polls the ImportRun
       9 // row every few seconds, and transport failures between browser and server can
      10 // no longer touch the run itself.
     … +430 lines (ctrl+o to expand)

● Update(app/routes/app.import.jsx)
  ⎿  Added 4 lines
      11    return import("../services/suppliers.server.js");
      12  }
      13  
      14 +async function getImportRunService() {                                                                                             
      15 +  return import("../services/import-run.server.js");                                                                               
      16 +}                                                                                                                                  
      17 +                                                                                                                                   
      18  const DIMENSION_KEYS = ["collections", "brands", "subCollections", "subCatCollections"];
      19  const DIMENSION_LABELS = {
      20    collections: "Collection",

● Update(app/routes/app.import.jsx)
  ⎿  Added 7 lines, removed 1 line
      56      const markupByKey = Object.fromEntries(
      57        markupRules.map((r) => [`${r.level}:${r.value}`, { markupPct: r.markupPct, markupFlat: r.markupFlat }]),
      58      );
      59 -    supplierData = { fileNames, hierarchy, existingSelections, productCount: products.length, markupByKey };                       
      59 +    const disableRows = await suppliersSvc.getEntityDisables(selectedSupplier);                                                    
      60 +    const disablesByKey = Object.fromEntries(                                                                                      
      61 +      disableRows.map((r) => [`${r.level}:${r.value}`, { reason: r.reason, note: r.note }]),                                       
      62 +    );                                                                                                                             
      63 +    const importRunSvc = await getImportRunService();                                                                              
      64 +    const runStatus = await importRunSvc.getRunStatus(selectedSupplier);                                                           
      65 +    supplierData = { fileNames, hierarchy, existingSelections, productCount: products.length, markupByKey, disablesByKey, runStatus
         + };                                                                                                                                
      66    }
      67  
      68    return { supplierFolders, selectedSupplier, supplierData };

● Update(app/routes/app.import.jsx)
  ⎿  Added 52 lines, removed 25 lines
      69  };
      70  
      71  export const action = async ({ request }) => {
      72 -  const { admin } = await authenticate.admin(request);                                                                             
      72 +  const { admin, session } = await authenticate.admin(request);                                                                    
      73    const formData = await request.formData();
      74    const intent = formData.get("intent");
      75    const svc = await getService();
      76  
      77 -  if (intent === "apply-supplier-import-batch") {                                                                                  
      77 +  // The import itself runs as a server-side background job (import-run.server.js)                                                 
      78 +  // — these intents only start/observe/steer it, so every request is short-lived                                                  
      79 +  // and a dropped poll can't hurt the run.                                                                                        
      80 +  if (intent === "start-supplier-import") {                                                                                        
      81      const supplierName = formData.get("supplierName");
      82      if (!supplierName) return { error: "No supplier selected" };
      83  
     ...
       87      } catch {
       88        return { error: "Invalid selections payload" };
       89      }
       87 -    const offset = Number(formData.get("offset")) || 0;                                                                           
       90 +    const force = formData.get("force") === "true";                                                                               
       91  
       92      try {
       90 -      const suppliersSvc = await getSuppliersService();                                                                           
       91 -      const { products, pricing, stock } = suppliersSvc.loadSupplierData(supplierName);                                           
       92 -      const result = await suppliersSvc.runImportBatch(admin, {                                                                   
       93 +      const importRunSvc = await getImportRunService();                                                                           
       94 +      const { runId } = await importRunSvc.startImportRun({                                                                       
       95 +        shop: session.shop,                                                                                                       
       96          supplierName,
       94 -        products,                                                                                                                 
       95 -        pricing,                                                                                                                  
       96 -        stock,                                                                                                                    
       97          selections,
       98 -        offset,                                                                                                                   
       98 +        force,                                                                                                                    
       99        });
      100 -      return { completed: true, intent: "apply-supplier-import-batch", supplierName, ...result };                                 
      100 +      return { completed: true, intent: "start-supplier-import", supplierName, runId };                                           
      101      } catch (err) {
      102 -      return { error: `Supplier import batch failed: ${err.message}` };                                                           
      102 +      return { error: `Starting supplier import failed: ${err.message}` };                                                        
      103      }
      104    }
      105  
      106 -  if (intent === "apply-supplier-import-finalize-batch") {                                                                        
      106 +  if (intent === "import-run-status") {                                                                                           
      107      const supplierName = formData.get("supplierName");
      108      if (!supplierName) return { error: "No supplier selected" };
      109 +    try {                                                                                                                         
      110 +      const importRunSvc = await getImportRunService();                                                                           
      111 +      const run = await importRunSvc.getRunStatus(supplierName);                                                                  
      112 +      return { completed: true, intent: "import-run-status", supplierName, run };                                                 
      113 +    } catch (err) {                                                                                                               
      114 +      return { error: `Fetching import status failed: ${err.message}` };                                                          
      115 +    }                                                                                                                             
      116 +  }                                                                                                                               
      117  
      110 -    let selections;                                                                                                               
      118 +  if (intent === "cancel-supplier-import") {                                                                                      
      119 +    const runId = formData.get("runId");                                                                                          
      120 +    if (!runId) return { error: "No run id" };                                                                                    
      121 +    const importRunSvc = await getImportRunService();                                                                             
      122 +    const result = importRunSvc.cancelRun(runId);                                                                                 
      123 +    return { completed: true, intent: "cancel-supplier-import", runId, ...result };                                               
      124 +  }                                                                                                                               
      125 +                                                                                                                                  
      126 +  if (intent === "resume-supplier-import") {                                                                                      
      127 +    const runId = formData.get("runId");                                                                                          
      128 +    if (!runId) return { error: "No run id" };                                                                                    
      129      try {
      112 -      selections = JSON.parse(formData.get("selections") || "{}");                                                                
      113 -    } catch {                                                                                                                     
      114 -      return { error: "Invalid selections payload" };                                                                             
      130 +      const importRunSvc = await getImportRunService();                                                                           
      131 +      await importRunSvc.resumeRun({ runId, shop: session.shop });                                                                
      132 +      return { completed: true, intent: "resume-supplier-import", runId };                                                        
      133 +    } catch (err) {                                                                                                               
      134 +      return { error: `Resuming import failed: ${err.message}` };                                                                 
      135      }
      136 +  }                                                                                                                               
      137  
      138 +  if (intent === "save-entity-disable" || intent === "remove-entity-disable") {                                                   
      139 +    const supplierName = formData.get("supplierName");                                                                            
      140 +    const level = formData.get("level");                                                                                          
      141 +    const value = formData.get("value");                                                                                          
      142 +    if (!supplierName || !level || !value) {                                                                                      
      143 +      return { error: "Missing supplierName, level, or value for disable toggle" };                                               
      144 +    }                                                                                                                             
      145      try {
      146        const suppliersSvc = await getSuppliersService();
      119 -      const { products } = suppliersSvc.loadSupplierData(supplierName);                                                           
      120 -      const result = await suppliersSvc.runFinalizeBatch(admin, {                                                                 
      121 -        supplierName,                                                                                                             
      122 -        products,                                                                                                                 
      123 -        selections,                                                                                                               
      124 -      });                                                                                                                         
      125 -      return { completed: true, intent: "apply-supplier-import-finalize-batch", supplierName, ...result };                        
      147 +      if (intent === "save-entity-disable") {                                                                                     
      148 +        await suppliersSvc.saveEntityDisable({ supplierName, level, value, reason: "manual" });                                   
      149 +      } else {                                                                                                                    
      150 +        await suppliersSvc.removeEntityDisable({ supplierName, level, value });                                                   
      151 +      }                                                                                                                           
      152 +      return { completed: true, intent, level, value, disabled: intent === "save-entity-disable" };                               
      153      } catch (err) {
      127 -      return { error: `Supplier import finalize failed: ${err.message}` };                                                        
      154 +      return { error: `Updating disable state failed: ${err.message}` };                                                          
      155      }
      156    }
      157  

● Now the UI components — disable toggle per row, then the panel rewrite.

● Update(app/routes/app.import.jsx)
  ⎿  Added 38 lines
      270    );
      271  }
      272  
      273 +// Per-row manual Disable/Enable toggle backed by an EntityDisable row. A disabled                                                
      274 +// tier's products are excluded from every import run and (once an import runs)                                                   
      275 +// set to Draft in Shopify — never deleted. Uses its own fetcher per row, same                                                    
      276 +// pattern as MarkupInputs. Local state is optimistic; the loader re-syncs it on                                                  
      277 +// the next page load.                                                                                                            
      278 +function DisableToggle({ supplierName, level, value, existingDisable }) {                                                         
      279 +  const fetcher = useFetcher();                                                                                                   
      280 +  const [disable, setDisable] = useState(existingDisable || null);                                                                
      281 +  const isSaving = fetcher.state !== "idle";                                                                                      
      282 +                                                                                                                                  
      283 +  function handleToggle() {                                                                                                       
      284 +    const next = disable ? null : { reason: "manual", note: null };                                                               
      285 +    fetcher.submit(                                                                                                               
      286 +      {                                                                                                                           
      287 +        intent: next ? "save-entity-disable" : "remove-entity-disable",                                                           
      288 +        supplierName,                                                                                                             
      289 +        level,                                                                                                                    
      290 +        value,                                                                                                                    
      291 +      },                                                                                                                          
      292 +      { method: "POST" },                                                                                                         
      293 +    );                                                                                                                            
      294 +    setDisable(next);                                                                                                             
      295 +  }                                                                                                                               
      296 +                                                                                                                                  
      297 +  return (                                                                                                                        
      298 +    <s-stack direction="inline" gap="small-200" alignItems="center">                                                              
      299 +      <s-button variant="tertiary" size="slim" {...(isSaving ? { loading: true } : {})} onClick={handleToggle}>                   
      300 +        {disable ? "Enable" : "Disable"}                                                                                          
      301 +      </s-button>                                                                                                                 
      302 +      {disable && (                                                                                                               
      303 +        <s-badge tone="warning">                                                                                                  
      304 +          {disable.reason === "supplier_removed" ? "Removed by supplier" : "Disabled"}                                            
      305 +        </s-badge>                                                                                                                
      306 +      )}                                                                                                                          
      307 +    </s-stack>                                                                                                                    
      308 +  );                                                                                                                              
      309 +}                                                                                                                                 
      310 +                                                                                                                                  
      311  function nodeIsEnabled(dimKey, node, selected) {
      312    return ANCESTOR_DIMENSIONS[dimKey].every((ancestorKey) => {
      313      const ancestorValues = node[ancestorKey] || [];

● Update(app/routes/app.import.jsx)
  ⎿  Added 7 lines, removed 1 line
      339    return { selectedGroup, availableGroup, disabledGroup };
      340  }
      341  
      342 -function NodeRow({ dimKey, node, checked, disabled, isNew, onToggle, supplierName, markupByKey }) {                               
      342 +function NodeRow({ dimKey, node, checked, disabled, isNew, onToggle, supplierName, markupByKey, disablesByKey }) {                
      343    return (
      344      <s-stack direction="block" gap="small-200">
      345        <s-stack direction="inline" gap="small-200" alignItems="center">
     ...
      350            onChange={() => onToggle(dimKey, node.name)}
      351          ></s-checkbox>
      352          {isNew && <s-badge tone="success">New</s-badge>}
      353 +        <DisableToggle                                                                                                            
      354 +          supplierName={supplierName}                                                                                             
      355 +          level={dimKey}                                                                                                          
      356 +          value={node.name}                                                                                                       
      357 +          existingDisable={disablesByKey[`${dimKey}:${node.name}`]}                                                               
      358 +        />                                                                                                                        
      359        </s-stack>
      360        <MarkupInputs
      361          supplierName={supplierName}

● Update(app/routes/app.import.jsx)
  ⎿  Added 1 line, removed 1 line
      381    );
      382  }
      383  
      384 -function HierarchyCheckboxList({ dimKey, nodes, selected, existingSelections, onToggle, onSelectAll, supplierName, markupByKey }) 
          -{                                                                                                                                 
      384 +function HierarchyCheckboxList({ dimKey, nodes, selected, existingSelections, onToggle, onSelectAll, supplierName, markupByKey, di
          +sablesByKey }) {                                                                                                                  
      385    const [collapsed, setCollapsed] = useState({ selected: false, available: false, disabled: true });
      386  
      387    if (nodes.length === 0) {

● Update(app/routes/app.import.jsx)
  ⎿  Added 1 line
      406          onToggle={onToggle}
      407          supplierName={supplierName}
      408          markupByKey={markupByKey}
      409 +        disablesByKey={disablesByKey}                                                                                             
      410        />
      411      );
      412    }

● Now the core panel rewrite — replacing the driver state machine with polling.

● Update(app/routes/app.import.jsx)
  ⎿  Added 51 lines, removed 76 lines
      437    );
      438  }
      439  
      440 -const EMPTY_RUN = {                                                                                                               
      441 -  active: false,                                                                                                                  
      442 -  phase: "idle", // idle | importing | finalizing | done                                                                          
      443 -  offset: 0,                                                                                                                      
      444 -  total: 0,                                                                                                                       
      445 -  productsRemaining: 0,                                                                                                           
      446 -  collectionsRemaining: 0,                                                                                                        
      447 -  productsCreated: 0,                                                                                                             
      448 -  productsUpdated: 0,                                                                                                             
      449 -  productsDeleted: 0,                                                                                                             
      450 -  collectionsCreated: 0,                                                                                                          
      451 -  collectionsDeleted: 0,                                                                                                          
      452 -  skippedDeletions: [],                                                                                                           
      453 -  errors: [],                                                                                                                     
      454 -};                                                                                                                                
      440 +const POLL_INTERVAL_MS = 3000;                                                                                                    
      441  
      442  function SupplierImportPanel({ supplierName, supplierData }) {
      457 -  const fetcher = useFetcher();                                                                                                   
      458 -  const isLoading = ["loading", "submitting"].includes(fetcher.state);                                                            
      459 -  const data = fetcher.data;                                                                                                      
      443 +  // The import runs as a server-side background job (import-run.server.js).                                                      
      444 +  // startFetcher issues the short-lived start/cancel/resume commands; statusFetcher                                              
      445 +  // polls the run row every few seconds while a run is live. Unlike the previous                                                 
      446 +  // browser-driven batch loop, a dropped request here (tunnel blip, 502, closed                                                  
      447 +  // tab) cannot kill the run — the next poll just picks the status back up.                                                      
      448 +  const startFetcher = useFetcher();                                                                                              
      449 +  const statusFetcher = useFetcher();                                                                                             
      450  
      461 -  const { hierarchy, existingSelections, fileNames, productCount, markupByKey } = supplierData;                                   
      451 +  const { hierarchy, existingSelections, fileNames, productCount, markupByKey, disablesByKey, runStatus } = supplierData;         
      452  
      453    const [selected, setSelected] = useState(() => toSelectionState(existingSelections));
      454    const [acknowledged, setAcknowledged] = useState(false);
      465 -  const [run, setRun] = useState(EMPTY_RUN);                                                                                      
      466 -  const selectionsRef = useRef(null); // captured once per run, so mid-run checkbox edits don't affect it                         
      467 -  const lastHandledRef = useRef(null);                                                                                            
      455 +  const [force, setForce] = useState(false);                                                                                      
      456 +  const [run, setRun] = useState(runStatus || null);                                                                              
      457  
      469 -  // Batched "Apply Changes" — each request only processes a small slice of products                                              
      470 -  // (see IMPORT_BATCH_SIZE in suppliers.server.js) to stay well under Cloudflare's                                               
      471 -  // ~100s edge timeout on large catalogs. This effect drives the batch/finalize loop                                             
      472 -  // forward every time a request settles, until the whole run is done.                                                           
      473 -  useEffect(() => {                                                                                                               
      474 -    if (!run.active || isLoading || !data || data === lastHandledRef.current) return;                                             
      475 -    lastHandledRef.current = data;                                                                                                
      458 +  const isStarting = startFetcher.state !== "idle";                                                                               
      459 +  const commandError = startFetcher.data?.error || null;                                                                          
      460  
      477 -    if (data.error) {                                                                                                             
      478 -      setRun((prev) => ({ ...prev, active: false, errors: [...prev.errors, { stage: "run", error: data.error }] }));              
      479 -      return;                                                                                                                     
      480 -    }                                                                                                                             
      481 -                                                                                                                                  
      482 -    if (data.intent === "apply-supplier-import-batch") {                                                                          
      483 -      setRun((prev) => ({                                                                                                         
      484 -        ...prev,                                                                                                                  
      461 +  // Reflect start/resume responses immediately (a synthetic "running" shell until                                                
      462 +  // the first poll lands with real numbers).                                                                                     
      463 +  useEffect(() => {                                                                                                               
      464 +    const data = startFetcher.data;                                                                                               
      465 +    if (!data) return;                                                                                                            
      466 +    if (data.intent === "start-supplier-import" && data.runId) {                                                                  
      467 +      setRun({                                                                                                                    
      468 +        id: data.runId,                                                                                                           
      469 +        status: "running",                                                                                                        
      470          phase: "importing",
      486 -        offset: data.offset,                                                                                                      
      487 -        total: data.total,                                                                                                        
      488 -        productsCreated: prev.productsCreated + data.created,                                                                     
      489 -        productsUpdated: prev.productsUpdated + data.updated,                                                                     
      490 -        collectionsCreated: prev.collectionsCreated + data.collectionsCreated,                                                    
      491 -        errors: [...prev.errors, ...data.errors],                                                                                 
      492 -      }));                                                                                                                        
      493 -                                                                                                                                  
      494 -      if (data.offset < data.total) {                                                                                             
      495 -        fetcher.submit(                                                                                                           
      496 -          { intent: "apply-supplier-import-batch", supplierName, selections: selectionsRef.current, offset: String(data.offset) },
      497 -          { method: "POST" },                                                                                                     
      498 -        );                                                                                                                        
      499 -      } else {                                                                                                                    
      500 -        fetcher.submit(                                                                                                           
      501 -          { intent: "apply-supplier-import-finalize-batch", supplierName, selections: selectionsRef.current },                    
      502 -          { method: "POST" },                                                                                                     
      503 -        );                                                                                                                        
      504 -      }                                                                                                                           
      505 -      return;                                                                                                                     
      471 +        offset: 0,                                                                                                                
      472 +        total: 0,                                                                                                                 
      473 +        created: 0,                                                                                                               
      474 +        updated: 0,                                                                                                               
      475 +        skippedUnchanged: 0,                                                                                                      
      476 +        productsDisabled: 0,                                                                                                      
      477 +        collectionsCreated: 0,                                                                                                    
      478 +        collectionsUnpublished: 0,                                                                                                
      479 +        errors: [],                                                                                                               
      480 +        notices: [],                                                                                                              
      481 +        batchFailures: [],                                                                                                        
      482 +      });                                                                                                                         
      483      }
      484 +    if (data.intent === "resume-supplier-import" && data.runId) {                                                                 
      485 +      setRun((prev) => (prev ? { ...prev, status: "running" } : prev));                                                           
      486 +    }                                                                                                                             
      487 +  }, [startFetcher.data]);                                                                                                        
      488  
      508 -    if (data.intent === "apply-supplier-import-finalize-batch") {                                                                 
      509 -      setRun((prev) => ({                                                                                                         
      510 -        ...prev,                                                                                                                  
      511 -        phase: data.done ? "done" : "finalizing",                                                                                 
      512 -        active: !data.done,                                                                                                       
      513 -        productsRemaining: data.productsRemaining,                                                                                
      514 -        collectionsRemaining: data.collectionsRemaining ?? prev.collectionsRemaining,                                             
      515 -        productsDeleted: prev.productsDeleted + data.deleted,                                                                     
      516 -        collectionsDeleted: prev.collectionsDeleted + data.collectionsDeleted,                                                    
      517 -        skippedDeletions: [...prev.skippedDeletions, ...data.skippedDeletions],                                                   
      518 -        errors: [...prev.errors, ...data.errors],                                                                                 
      519 -      }));                                                                                                                        
      489 +  useEffect(() => {                                                                                                               
      490 +    const data = statusFetcher.data;                                                                                              
      491 +    if (data?.intent === "import-run-status" && data.run) setRun(data.run);                                                       
      492 +  }, [statusFetcher.data]);                                                                                                       
      493  
      521 -      if (!data.done) {                                                                                                           
      522 -        fetcher.submit(                                                                                                           
      523 -          { intent: "apply-supplier-import-finalize-batch", supplierName, selections: selectionsRef.current },                    
      524 -          { method: "POST" },                                                                                                     
      525 -        );                                                                                                                        
      494 +  const isLive = run?.status === "running";                                                                                       
      495 +  useEffect(() => {                                                                                                               
      496 +    if (!isLive) return undefined;                                                                                                
      497 +    const interval = setInterval(() => {                                                                                          
      498 +      if (statusFetcher.state === "idle") {                                                                                       
      499 +        statusFetcher.submit({ intent: "import-run-status", supplierName }, { method: "POST" });                                  
      500        }
      527 -    }                                                                                                                             
      501 +    }, POLL_INTERVAL_MS);                                                                                                         
      502 +    return () => clearInterval(interval);                                                                                         
      503      // eslint-disable-next-line react-hooks/exhaustive-deps
      529 -  }, [run.active, isLoading, data]);                                                                                              
      504 +  }, [isLive, supplierName]);                                                                                                     
      505  
      506    function toggle(dimKey, name) {
      507      setSelected((prev) => {

● Update(app/routes/app.import.jsx)
  ⎿  Added 17 lines, removed 9 lines
      522      setAcknowledged(false);
      523    }
      524  
      525 -  const pendingDeletions = [];                                                                                                    
      525 +  const pendingDisables = [];                                                                                                     
      526    for (const dimKey of DIMENSION_KEYS) {
      527      for (const name of existingSelections[dimKey]) {
      528 -      if (!selected[dimKey].has(name)) pendingDeletions.push({ dimKey, name });                                                   
      528 +      if (!selected[dimKey].has(name)) pendingDisables.push({ dimKey, name });                                                    
      529      }
      530    }
      531 -  const hasPendingDeletions = pendingDeletions.length > 0;                                                                        
      532 -  const canApply = !hasPendingDeletions || acknowledged;                                                                          
      531 +  const hasPendingDisables = pendingDisables.length > 0;                                                                          
      532 +  const canApply = (!hasPendingDisables || acknowledged) && !isLive && !isStarting;                                               
      533  
      534    function handleApply() {
      535 -    selectionsRef.current = JSON.stringify({                                                                                      
      535 +    const selections = JSON.stringify({                                                                                           
      536        collections: [...selected.collections],
      537        brands: [...selected.brands],
      538        subCollections: [...selected.subCollections],
      539        subCatCollections: [...selected.subCatCollections],
      540      });
      541 -    lastHandledRef.current = null;                                                                                                
      542 -    setRun({ ...EMPTY_RUN, active: true, phase: "importing" });                                                                   
      543 -    fetcher.submit(                                                                                                               
      544 -      { intent: "apply-supplier-import-batch", supplierName, selections: selectionsRef.current, offset: "0" },                    
      541 +    startFetcher.submit(                                                                                                          
      542 +      { intent: "start-supplier-import", supplierName, selections, force: String(force) },                                        
      543        { method: "POST" },
      544      );
      545      setAcknowledged(false);
      546    }
      547  
      548 +  function handleCancel() {                                                                                                       
      549 +    if (run?.id) startFetcher.submit({ intent: "cancel-supplier-import", runId: run.id }, { method: "POST" });                    
      550 +  }                                                                                                                               
      551 +                                                                                                                                  
      552 +  function handleResume() {                                                                                                       
      553 +    if (run?.id) startFetcher.submit({ intent: "resume-supplier-import", runId: run.id }, { method: "POST" });                    
      554 +  }                                                                                                                               
      555 +                                                                                                                                  
      556 +  const unresolvedFailures = (run?.batchFailures || []).filter((f) => !f.resolved);                                               
      557 +                                                                                                                                  
      558    return (
      559      <>
      560        <s-section heading={`${supplierName} — ${productCount} products in ${fileNames.products || "(no file)"}`}>

● Bash(perl -0pi -e 's/(onSelectAll=\{selectAll\}\n              supplierName=\{supplierName\}\n              markupByKey=\{markupByKey\})\n
         \/>/$1\n…)
  ⎿  5

  Searched for 1 pattern, read 1 file (ctrl+o to expand)

● Update(app/routes/app.import.jsx)
  ⎿  Added 71 lines, removed 28 lines
      627            </s-box>
      628          </s-stack>
      629  
      630 -        {hasPendingDeletions && (                                                                                                 
      630 +        {hasPendingDisables && (                                                                                                  
      631            <div
      632              style={{
      633 -              background: "rgb(180, 0, 0)",                                                                                       
      633 +              background: "rgb(180, 100, 0)",                                                                                     
      634                color: "#fff",
      635                fontWeight: "bold",
      636                padding: "12px",
     ...
      638                marginTop: "16px",
      639              }}
      640            >
      641 -            Warning: the following will be removed from the store — unless another                                                
      642 -            supplier's products still use the same name:                                                                          
      641 +            Note: the following will be DISABLED — products set to Draft and                                                      
      642 +            collections unpublished, never deleted. Re-select them (or re-enable                                                  
      643 +            in Disabled items) to restore. Items still used by another supplier                                                   
      644 +            are left untouched:                                                                                                   
      645              <ul>
      644 -              {pendingDeletions.map((d) => (                                                                                      
      646 +              {pendingDisables.map((d) => (                                                                                       
      647                  <li key={`${d.dimKey}-${d.name}`}>
      648                    {DIMENSION_LABELS[d.dimKey]}: {d.name}
      649                  </li>
     ...
      658          )}
      659  
      660          <s-box padding-block-start="300">
      659 -          <s-button                                                                                                               
      660 -            tone="primary"                                                                                                        
      661 -            {...(canApply && !run.active ? {} : { disabled: true })}                                                              
      662 -            {...(run.active ? { loading: true } : {})}                                                                            
      663 -            onClick={handleApply}                                                                                                 
      664 -          >                                                                                                                       
      665 -            Apply Changes                                                                                                         
      666 -          </s-button>                                                                                                             
      661 +          <s-stack direction="inline" gap="base" alignItems="center">                                                             
      662 +            <s-button                                                                                                             
      663 +              tone="primary"                                                                                                      
      664 +              {...(canApply ? {} : { disabled: true })}                                                                           
      665 +              {...(isLive || isStarting ? { loading: true } : {})}                                                                
      666 +              onClick={handleApply}                                                                                               
      667 +            >                                                                                                                     
      668 +              Apply Changes                                                                                                       
      669 +            </s-button>                                                                                                           
      670 +            {isLive && (                                                                                                          
      671 +              <s-button variant="secondary" onClick={handleCancel}>                                                               
      672 +                Cancel run                                                                                                        
      673 +              </s-button>                                                                                                         
      674 +            )}                                                                                                                    
      675 +            {run && ["interrupted", "failed"].includes(run.status) && (                                                           
      676 +              <s-button variant="secondary" onClick={handleResume}>                                                               
      677 +                Resume run                                                                                                        
      678 +              </s-button>                                                                                                         
      679 +            )}                                                                                                                    
      680 +            <s-checkbox                                                                                                           
      681 +              label="Force full import (ignore change detection)"                                                                 
      682 +              checked={force}                                                                                                     
      683 +              {...(isLive ? { disabled: true } : {})}                                                                             
      684 +              onChange={(e) => setForce(e.currentTarget.checked)}                                                                 
      685 +            ></s-checkbox>                                                                                                        
      686 +          </s-stack>                                                                                                              
      687          </s-box>
      688  
      669 -        {run.phase !== "idle" && (                                                                                                
      689 +        {run && (                                                                                                                 
      690            <s-box padding-block-start="300">
      691              <s-text variant="bodySm">
      672 -              {run.phase === "importing" && `Importing products: ${run.offset} / ${run.total}`}                                   
      673 -              {run.phase === "finalizing" &&                                                                                      
      674 -                `Removing de-selected products/collections: ${run.productsRemaining} product(s), ${run.collectionsRemaining} colle
          -ction(s) remaining`}                                                                                                              
      675 -              {run.phase === "done" && "Apply Changes complete."}                                                                 
      692 +              {run.status === "running" && run.phase === "importing" &&                                                           
      693 +                `Importing products: ${run.offset} / ${run.total || "…"} (${run.created} created, ${run.updated} updated, ${run.sk
          +ippedUnchanged} unchanged — skipped)`}                                                                                            
      694 +              {run.status === "running" && run.phase === "disabling" &&                                                           
      695 +                `Disabling de-selected/removed items (products → Draft, collections unpublished): ${run.productsDisabled} product(
          +s), ${run.collectionsUnpublished} collection(s) so far`}                                                                          
      696 +              {run.status === "running" && run.phase === "retrying" &&                                                            
      697 +                `Revisiting ${unresolvedFailures.length} failed batch(es)…`}                                                      
      698 +              {run.status === "completed" && "Apply Changes complete — run finished on the server."}                              
      699 +              {run.status === "failed" && "Import run failed — see results below. You can resume it."}                            
      700 +              {run.status === "cancelled" && "Import run cancelled."}                                                             
      701 +              {run.status === "interrupted" &&                                                                                    
      702 +                "Import run was interrupted (server restarted mid-run). Resume to continue from where it stopped."}               
      703              </s-text>
      704 +            {isLive && (                                                                                                          
      705 +              <s-text variant="bodySm" tone="subdued">                                                                            
      706 +                The import runs on the server — closing this page won't stop it.                                                  
      707 +              </s-text>                                                                                                           
      708 +            )}                                                                                                                    
      709            </s-box>
      710          )}
      711        </s-section>
      712  
      681 -      {run.phase === "done" && (                                                                                                  
      713 +      {run && ["completed", "failed", "cancelled", "interrupted"].includes(run.status) && (                                       
      714          <s-section heading="Import Results">
      683 -          <s-banner tone={run.errors.length > 0 ? "warning" : "success"}>                                                         
      715 +          <s-banner tone={run.status === "completed" && run.errors.length === 0 ? "success" : "warning"}>                         
      716              <s-text>
      685 -              Products: {run.productsCreated} created, {run.productsUpdated} updated, {run.productsDeleted} deleted.              
      686 -              {" "}Collections: {run.collectionsCreated} created, {run.collectionsDeleted} deleted.                               
      717 +              Products: {run.created} created, {run.updated} updated, {run.skippedUnchanged} unchanged (skipped),{" "}            
      718 +              {run.productsDisabled} disabled (set to Draft — nothing is deleted).                                                
      719 +              {" "}Collections: {run.collectionsCreated} created, {run.collectionsUnpublished} unpublished.                       
      720              </s-text>
      721            </s-banner>
      689 -          {run.skippedDeletions.length > 0 && (                                                                                   
      722 +          {run.notices.length > 0 && (                                                                                            
      723              <s-banner tone="info">
      691 -              <s-text variant="headingSm">Kept — still used by another supplier:</s-text>                                         
      692 -              {run.skippedDeletions.map((s, i) => (                                                                               
      693 -                <s-text key={i}>• {s.type}: {s.name}</s-text>                                                                     
      724 +              <s-text variant="headingSm">Notices</s-text>                                                                        
      725 +              {run.notices.map((n, i) => (                                                                                        
      726 +                <s-text key={i}>• {n.message || `${n.type}: ${n.name}`}</s-text>                                                  
      727                ))}
      728              </s-banner>
      729            )}
      730 +          {unresolvedFailures.length > 0 && (                                                                                     
      731 +            <s-banner tone="warning">                                                                                             
      732 +              <s-text variant="headingSm">Batches still failing after retries ({unresolvedFailures.length})</s-text>              
      733 +              {unresolvedFailures.map((f) => (                                                                                    
      734 +                <s-text key={f.id}>                                                                                               
      735 +                  • {f.phase} batch at offset {f.offset} ({f.attempts} attempts): {f.lastError}                                   
      736 +                </s-text>                                                                                                         
      737 +              ))}                                                                                                                 
      738 +            </s-banner>                                                                                                           
      739 +          )}                                                                                                                      
      740            {run.errors.length > 0 && (
      741              <s-box padding="base" borderWidth="base" borderRadius="base" background="subdued">
      742                <pre style={{ margin: 0, fontSize: "12px" }}>
     ...
      747          </s-section>
      748        )}
      749  
      707 -      {!run.active && data?.error && (                                                                                            
      750 +      {commandError && (                                                                                                          
      751          <s-section heading="Error">
      752            <s-banner tone="critical">
      710 -            <s-text>{data.error}</s-text>                                                                                         
      753 +            <s-text>{commandError}</s-text>                                                                                       
      754            </s-banner>
      755          </s-section>
      756        )}

  Searched for 1 pattern (ctrl+o to expand)

● Update(app/routes/app.import.jsx)
  ⎿  Added 1 line, removed 1 line
      1 -import { useEffect, useRef, useState } from "react";                                                                                
      1 +import { useEffect, useState } from "react";                                                                                        
      2  import { useFetcher, useLoaderData, useRevalidator, useSearchParams } from "react-router";
      3  import { boundary } from "@shopify/shopify-app-react-router/server";
      4  import { authenticate } from "../shopify.server";

  Read 1 file (ctrl+o to expand)

● Update(app/routes/app.import.jsx)
  ⎿  Added 9 lines, removed 5 lines
      1010            supplier is used.
      1011          </s-paragraph>
      1012          <s-paragraph>
      1013 -          Unchecking a Collection removes it from the store entirely, unless                                                     
      1014 -          another supplier still has products in it. Unchecking a Brand,                                                         
      1015 -          Sub-collection, or Sub-cat collection only removes the specific                                                        
      1016 -          products carrying that value, with the same cross-supplier                                                             
      1017 -          protection.                                                                                                            
      1013 +          Nothing is ever deleted by an import. Unchecking a Collection                                                          
      1014 +          unpublishes it from all sales channels (unless another supplier still                                                  
      1015 +          has products in it). Unchecking a Brand, Sub-collection, or Sub-cat                                                    
      1016 +          collection sets the specific products carrying that value to Draft,                                                    
      1017 +          with the same cross-supplier protection. Products that disappear from                                                  
      1018 +          the supplier's file are also set to Draft, with a "deleted on the                                                      
      1019 +          supplier's side" notice. Use the Disable buttons (or the Disabled                                                      
      1020 +          items page) to exclude items permanently; re-select or re-enable to                                                    
      1021 +          restore.                                                                                                               
      1022          </s-paragraph>
      1023        </s-section>
      1024      </s-page>

● Import page done. Now the "Disabled items" route — first check the nav structure.

  Read 1 file (ctrl+o to expand)

● Update(app/routes/app.jsx)
  ⎿  Added 1 line
      18        <s-app-nav>
      19          <s-link href="/app">Home</s-link>
      20          <s-link href="/app/import">Import</s-link>
      21 +        <s-link href="/app/disabled">Disabled items</s-link>                                                                       
      22          <s-link href="/app/catalogs">Catalogs</s-link>
      23          <s-link href="/app/xero">Xero</s-link>
      24          <s-link href="/app/payfast">PayFast</s-link>

● Write(app/routes/app.disabled.jsx)
  ⎿  Wrote 279 lines to app/routes/app.disabled.jsx
      1 import { useState } from "react";
      2 import { useFetcher, useLoaderData, useSearchParams } from "react-router";
      3 import { boundary } from "@shopify/shopify-app-react-router/server";
      4 import { authenticate } from "../shopify.server";
      5 import prisma from "../db.server.js";
      6
      7 async function getSuppliersService() {
      8   return import("../services/suppliers.server.js");
      9 }
     … +269 lines (ctrl+o to expand)

● Phase 4 done. Now running the existing test suite to see what the refactor broke before extending tests.

● Bash(npx vitest run app/services/suppliers.server.test.js 2>&1 | tail -40)
  ⎿   ❯ app/services/suppliers.server.test.js:590:26
         588|     ]);
         589|
     … +38 lines (ctrl+o to expand)

  Read 1 file (ctrl+o to expand)

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 7 lines, removed 1 line
      17    readFileSync: vi.fn((p) => fsState.files[p]),
      18  }));
      19  
      20 -const { mockPrismaProduct, mockPrismaMarkupRule } = vi.hoisted(() => ({                                                            
      20 +const { mockPrismaProduct, mockPrismaMarkupRule, mockPrismaEntityDisable } = vi.hoisted(() => ({                                   
      21    mockPrismaProduct: {
      22      findMany: vi.fn().mockResolvedValue([]),
      23      findUnique: vi.fn().mockResolvedValue(null),
      24      count: vi.fn().mockResolvedValue(0),
      25 +    update: vi.fn().mockResolvedValue({}),                                                                                         
      26      delete: vi.fn(),
      27    },
      28    mockPrismaMarkupRule: {
      29      findMany: vi.fn().mockResolvedValue([]),
      30    },
      31 +  mockPrismaEntityDisable: {                                                                                                       
      32 +    findMany: vi.fn().mockResolvedValue([]),                                                                                       
      33 +    upsert: vi.fn().mockResolvedValue({}),                                                                                         
      34 +    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),                                                                           
      35 +  },                                                                                                                               
      36  }));
      37  
      38  // Mocking "@prisma/client" does NOT intercept db.server.js's real client — db.server.js

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 1 line
      44    default: {
      45      product: mockPrismaProduct,
      46      markupRule: mockPrismaMarkupRule,
      47 +    entityDisable: mockPrismaEntityDisable,                                                                                        
      48    },
      49  }));
      50  

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 2 lines, removed 2 lines
       93    saveProductLocally: vi.fn(async () => ({})),
       94    listCollections: vi.fn(async () => []),
       95    createCollection: vi.fn(async (_admin, title) => ({ id: `gid://shopify/Collection/${title}`, title })),
       96 -  deleteCollection: vi.fn(async () => {}),                                                                                        
       96    addProductsToCollection: vi.fn(async () => {}),
       97    getAllPublicationIds: vi.fn(async () => []),
       98    publishResource: vi.fn(async () => {}),
      100 -  deleteProduct: vi.fn(async () => {}),                                                                                           
       99 +  unpublishResource: vi.fn(async () => {}),                                                                                       
      100 +  setProductStatus: vi.fn(async () => {}),                                                                                        
      101    // Real retry/backoff timing is unit-tested directly against product.server.js's
      102    // actual implementation in product.server.test.js. Here it's a plain passthrough —
      103    // these tests only care how suppliers.server.js reacts once retries are already

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 4 lines, removed 1 line
      117    buildMarkupIndex,
      118    resolveMarkupRule,
      119    resolvePricingForProducts,
      120 +  buildDisableIndex,                                                                                                              
      121 +  isProductDisabled,                                                                                                              
      122 +  computeProductHash,                                                                                                             
      123    runImportBatch,
      121 -  runFinalizeBatch,                                                                                                               
      124 +  runDisablePass,                                                                                                                 
      125  } = await import("./suppliers.server.js");
      126  
      127  const fakeAdmin = {};

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 6 lines, removed 2 lines
      132    mockProductService.saveProductLocally.mockClear();
      133    mockProductService.listCollections.mockClear().mockResolvedValue([]);
      134    mockProductService.createCollection.mockClear();
      135 -  mockProductService.deleteCollection.mockClear();                                                                                
      135    mockProductService.addProductsToCollection.mockClear();
      136    mockProductService.getAllPublicationIds.mockClear().mockResolvedValue([]);
      137    mockProductService.publishResource.mockClear();
      139 -  mockProductService.deleteProduct.mockClear();                                                                                   
      138 +  mockProductService.unpublishResource.mockClear().mockResolvedValue(undefined);                                                  
      139 +  mockProductService.setProductStatus.mockClear().mockResolvedValue(undefined);                                                   
      140    mockProductService.withNetworkRetry.mockClear().mockImplementation((fn) => fn());
      141    mockPrismaProduct.findMany.mockClear().mockResolvedValue([]);
      142    mockPrismaProduct.findUnique.mockClear().mockResolvedValue(null);
      143    mockPrismaProduct.count.mockClear().mockResolvedValue(0);
      144 +  mockPrismaProduct.update.mockClear().mockResolvedValue({});                                                                     
      145    mockPrismaProduct.delete.mockClear();
      146    mockPrismaMarkupRule.findMany.mockClear().mockResolvedValue([]);
      147 +  mockPrismaEntityDisable.findMany.mockClear().mockResolvedValue([]);                                                             
      148 +  mockPrismaEntityDisable.upsert.mockClear().mockResolvedValue({});                                                               
      149 +  mockPrismaEntityDisable.deleteMany.mockClear().mockResolvedValue({ count: 0 });                                                 
      150  }
      151  
      152  const SUPPLIERS_DIR = `${process.cwd()}/suppliers`;

● Update(app/services/suppliers.server.test.js)
  ⎿  Added 313 lines, removed 39 lines
      533    });
      534  });
      535  
      536 -describe("runFinalizeBatch", () => {                                                                                              
      536 +describe("runDisablePass", () => {                                                                                                
      537    const emptySelections = { collections: [], brands: [], subCollections: [], subCatCollections: [] };
      538  
      539    it("takes stale products from the front of a freshly-requeried list each call (no stale offset math)", async () => {
      540 -    // Simulates 3 stale rows on the first call; after "deleting" 2, only 1 remains on                                            
      541 -    // the DB the next time computeStaleProducts re-queries it — this is the scenario                                             
      542 -    // that broke an earlier offset-indexed version of this function.                                                             
      540 +    // Simulates 3 stale rows on the first call; after disabling 2 (they drop out of                                              
      541 +    // the active:true filter), only 1 remains the next time computeStaleProducts                                                 
      542 +    // re-queries — this is the scenario that broke an earlier offset-indexed version.                                            
      543      mockPrismaProduct.findMany
      544        .mockResolvedValueOnce([
      545          { id: "db1", externalProductId: "OLD-1", shopifyProductId: "gid://shopify/Product/1", title: "Old 1" },
     ...
      551        ])
      552        .mockResolvedValueOnce([]);
      553  
      554 -    const call1 = await runFinalizeBatch(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSiz
          -e: 2 });                                                                                                                          
      555 -    expect(call1.deleted).toBe(2);                                                                                                
      554 +    const call1 = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSize:
          + 2 });                                                                                                                            
      555 +    expect(call1.disabled).toBe(2);                                                                                               
      556      expect(call1.productsRemaining).toBe(1);
      557      expect(call1.done).toBe(false);
      558 -    expect(mockPrismaProduct.delete).toHaveBeenCalledTimes(2);                                                                    
      558 +    // DISABLED, never deleted: Shopify status DRAFT + local active:false.                                                        
      559 +    expect(mockPrismaProduct.delete).not.toHaveBeenCalled();                                                                      
      560 +    expect(mockProductService.setProductStatus).toHaveBeenCalledTimes(2);                                                         
      561 +    expect(mockProductService.setProductStatus).toHaveBeenCalledWith(fakeAdmin, "gid://shopify/Product/1", "DRAFT");              
      562 +    expect(mockPrismaProduct.update).toHaveBeenCalledWith(                                                                        
      563 +      expect.objectContaining({                                                                                                   
      564 +        where: { id: "db1" },                                                                                                     
      565 +        data: expect.objectContaining({ active: false, disabledReason: "supplier_removed" }),                                     
      566 +      }),                                                                                                                         
      567 +    );                                                                                                                            
      568  
      560 -    const call2 = await runFinalizeBatch(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSiz
          -e: 2 });                                                                                                                          
      561 -    expect(call2.deleted).toBe(1);                                                                                                
      569 +    const call2 = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSize:
          + 2 });                                                                                                                            
      570 +    expect(call2.disabled).toBe(1);                                                                                               
      571      expect(call2.productsRemaining).toBe(0);
      572      // The stale-products branch always reports done:false — it doesn't look ahead at
      573      // the collections phase. The NEXT call re-queries, finds no stale products left,
      574      // and (since this fixture has no collections either) reports done:true.
      575      expect(call2.done).toBe(false);
      576  
      568 -    const call3 = await runFinalizeBatch(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSiz
          -e: 2 });                                                                                                                          
      569 -    expect(call3.deleted).toBe(0);                                                                                                
      577 +    const call3 = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSize:
          + 2 });                                                                                                                            
      578 +    expect(call3.disabled).toBe(0);                                                                                               
      579      expect(call3.done).toBe(true);
      580    });
      581  
      573 -  it("moves to collection deletion once no stale products remain, and reports done when both lists are empty", async () => {      
      574 -    mockPrismaProduct.findMany.mockResolvedValueOnce([]); // no stale products                                                    
      582 +  it("resolves the disable reason per product: supplier_removed / manual / deselected", async () => {                             
      583 +    // OLD-GONE is absent from the file; OLD-MANUAL is in the file but covered by an                                              
      584 +    // EntityDisable row; OLD-DESEL is in the file but its collection is unchecked.                                               
      585 +    mockPrismaEntityDisable.findMany.mockResolvedValue([                                                                          
      586 +      { level: "product", value: "OLD-MANUAL", reason: "manual" },                                                                
      587 +    ]);                                                                                                                           
      588 +    mockPrismaProduct.findMany.mockResolvedValueOnce([                                                                            
      589 +      { id: "db1", externalProductId: "OLD-GONE", shopifyProductId: "gid://shopify/Product/1", title: "Gone" },                   
      590 +      { id: "db2", externalProductId: "OLD-MANUAL", shopifyProductId: "gid://shopify/Product/2", title: "Manual" },               
      591 +      { id: "db3", externalProductId: "OLD-DESEL", shopifyProductId: "gid://shopify/Product/3", title: "Desel" },                 
      592 +    ]);                                                                                                                           
      593 +                                                                                                                                  
      594 +    const products = [                                                                                                            
      595 +      makeProduct({ collection: "HOSES", productId: "OLD-MANUAL" }),                                                              
      596 +      makeProduct({ collection: "HOSES", productId: "OLD-DESEL" }),                                                               
      597 +    ];                                                                                                                            
      598 +    const result = await runDisablePass(fakeAdmin, {                                                                              
      599 +      supplierName: "agrinet",                                                                                                    
      600 +      products,                                                                                                                   
      601 +      selections: emptySelections,                                                                                                
      602 +      batchSize: 10,                                                                                                              
      603 +    });                                                                                                                           
      604 +                                                                                                                                  
      605 +    expect(result.disabled).toBe(3);                                                                                              
      606 +    const reasonsByRow = Object.fromEntries(                                                                                      
      607 +      mockPrismaProduct.update.mock.calls.map(([args]) => [args.where.id, args.data.disabledReason]),                             
      608 +    );                                                                                                                            
      609 +    expect(reasonsByRow).toEqual({ db1: "supplier_removed", db2: "manual", db3: "deselected" });                                  
      610 +    // Only supplier-removed products produce a "deleted on the supplier's side" notice.                                          
      611 +    expect(result.notices).toEqual([                                                                                              
      612 +      expect.objectContaining({ type: "product", name: "Gone", reason: "supplier_removed" }),                                     
      613 +    ]);                                                                                                                           
      614 +  });                                                                                                                             
      615 +                                                                                                                                  
      616 +  it("unpublishes (never deletes) de-selected collections and records the EntityDisable notice", async () => {                    
      617 +    mockPrismaProduct.findMany                                                                                                    
      618 +      .mockResolvedValueOnce([]) // no stale products                                                                             
      619 +      .mockResolvedValueOnce([]); // computeCollectionsToUnpublish local rows                                                     
      620      mockProductService.listCollections.mockResolvedValueOnce([{ id: "gid://shopify/Collection/OLDCOL", title: "OLDCOL" }]);
      621 +    mockProductService.getAllPublicationIds.mockResolvedValueOnce(["gid://shopify/Publication/1"]);                               
      622  
      623      const products = [makeProduct({ collection: "OLDCOL", productId: "P1" })];
      578 -    const result = await runFinalizeBatch(fakeAdmin, { supplierName: "agrinet", products, selections: emptySelections, batchSize: 
          -10 });                                                                                                                            
      624 +    const result = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products, selections: emptySelections, batchSize: 10
          + });                                                                                                                              
      625  
      626      expect(result.productsRemaining).toBe(0);
      581 -    expect(result.collectionsDeleted).toBe(1);                                                                                    
      627 +    expect(result.collectionsUnpublished).toBe(1);                                                                                
      628      expect(result.collectionsRemaining).toBe(0);
      629      expect(result.done).toBe(true);
      584 -    expect(mockProductService.deleteCollection).toHaveBeenCalledTimes(1);                                                         
      630 +    expect(mockProductService.unpublishResource).toHaveBeenCalledWith(                                                            
      631 +      fakeAdmin,                                                                                                                  
      632 +      "gid://shopify/Collection/OLDCOL",                                                                                          
      633 +      ["gid://shopify/Publication/1"],                                                                                            
      634 +    );                                                                                                                            
      635 +    expect(mockPrismaEntityDisable.upsert).toHaveBeenCalledWith(                                                                  
      636 +      expect.objectContaining({                                                                                                   
      637 +        create: expect.objectContaining({ level: "collections", value: "OLDCOL", reason: "deselected" }),                         
      638 +      }),                                                                                                                         
      639 +    );                                                                                                                            
      640    });
      641  
      587 -  it("is immediately done when there is nothing stale and nothing to delete", async () => {                                       
      588 -    mockPrismaProduct.findMany.mockResolvedValueOnce([]);                                                                         
      642 +  it("flags collections that vanished from the supplier file as supplier_removed, with a notice", async () => {                   
      643 +    mockPrismaProduct.findMany                                                                                                    
      644 +      .mockResolvedValueOnce([]) // no stale products                                                                             
      645 +      .mockResolvedValueOnce([{ userDetail: { assignedFirstMajorDescription: "GONECOL" } }]); // local rows                       
      646 +    mockProductService.listCollections.mockResolvedValueOnce([{ id: "gid://shopify/Collection/GONECOL", title: "GONECOL" }]);     
      647 +    mockProductService.getAllPublicationIds.mockResolvedValueOnce(["gid://shopify/Publication/1"]);                               
      648 +                                                                                                                                  
      649 +    // File no longer mentions GONECOL at all.                                                                                    
      650 +    const result = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSize
          +: 10 });                                                                                                                          
      651 +                                                                                                                                  
      652 +    expect(result.collectionsUnpublished).toBe(1);                                                                                
      653 +    expect(result.notices).toEqual([                                                                                              
      654 +      expect.objectContaining({ type: "collection", name: "GONECOL", reason: "supplier_removed" }),                               
      655 +    ]);                                                                                                                           
      656 +    expect(mockPrismaEntityDisable.upsert).toHaveBeenCalledWith(                                                                  
      657 +      expect.objectContaining({                                                                                                   
      658 +        create: expect.objectContaining({ level: "collections", value: "GONECOL", reason: "supplier_removed" }),                  
      659 +      }),                                                                                                                         
      660 +    );                                                                                                                            
      661 +  });                                                                                                                             
      662 +                                                                                                                                  
      663 +  it("leaves collections another supplier still uses untouched (skipped, no EntityDisable row)", async () => {                    
      664 +    mockPrismaProduct.findMany                                                                                                    
      665 +      .mockResolvedValueOnce([]) // no stale products                                                                             
      666 +      .mockResolvedValueOnce([]); // local rows                                                                                   
      667 +    mockPrismaProduct.count.mockResolvedValueOnce(3); // another supplier's active products use SHARED                            
      668 +    mockProductService.listCollections.mockResolvedValueOnce([{ id: "gid://shopify/Collection/SHARED", title: "SHARED" }]);       
      669 +                                                                                                                                  
      670 +    const products = [makeProduct({ collection: "SHARED", productId: "P1" })];                                                    
      671 +    const result = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products, selections: emptySelections, batchSize: 10
          + });                                                                                                                              
      672 +                                                                                                                                  
      673 +    expect(result.collectionsUnpublished).toBe(0);                                                                                
      674 +    expect(result.skipped).toEqual([{ type: "collection", name: "SHARED" }]);                                                     
      675 +    expect(result.done).toBe(true);                                                                                               
      676 +    expect(mockProductService.unpublishResource).not.toHaveBeenCalled();                                                          
      677 +    expect(mockPrismaEntityDisable.upsert).not.toHaveBeenCalled();                                                                
      678 +  });                                                                                                                             
      679 +                                                                                                                                  
      680 +  it("is immediately done when there is nothing stale and nothing to unpublish", async () => {                                    
      681 +    mockPrismaProduct.findMany.mockResolvedValueOnce([]).mockResolvedValueOnce([]);                                               
      682      mockProductService.listCollections.mockResolvedValueOnce([]);
      683  
      591 -    const result = await runFinalizeBatch(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSi
          -ze: 10 });                                                                                                                        
      684 +    const result = await runDisablePass(fakeAdmin, { supplierName: "agrinet", products: [], selections: emptySelections, batchSize
          +: 10 });                                                                                                                          
      685      expect(result.done).toBe(true);
      593 -    expect(result.deleted).toBe(0);                                                                                               
      594 -    expect(result.collectionsDeleted).toBe(0);                                                                                    
      686 +    expect(result.disabled).toBe(0);                                                                                              
      687 +    expect(result.collectionsUnpublished).toBe(0);                                                                                
      688    });
      689  
      597 -  it("stale-product deletion stops early once the time budget has elapsed, but always deletes at least one", async () => {        
      690 +  it("stale-product disabling stops early once the time budget has elapsed, but always disables at least one", async () => {      
      691      mockPrismaProduct.findMany.mockResolvedValueOnce([
      692        { id: "db1", externalProductId: "OLD-1", shopifyProductId: "gid://shopify/Product/1", title: "Old 1" },
      693        { id: "db2", externalProductId: "OLD-2", shopifyProductId: "gid://shopify/Product/2", title: "Old 2" },
      694        { id: "db3", externalProductId: "OLD-3", shopifyProductId: "gid://shopify/Product/3", title: "Old 3" },
      695      ]);
      696  
      604 -    const result = await runFinalizeBatch(fakeAdmin, {                                                                            
      697 +    const result = await runDisablePass(fakeAdmin, {                                                                              
      698        supplierName: "agrinet",
      699        products: [],
      700        selections: emptySelections,
     ...
      702        timeBudgetMs: -1,
      703      });
      704  
      612 -    expect(result.deleted).toBe(1);                                                                                               
      705 +    expect(result.disabled).toBe(1);                                                                                              
      706      expect(result.productsRemaining).toBe(2);
      707      expect(result.done).toBe(false);
      615 -    expect(mockPrismaProduct.delete).toHaveBeenCalledTimes(1);                                                                    
      708 +    expect(mockProductService.setProductStatus).toHaveBeenCalledTimes(1);                                                         
      709    });
      710  
      618 -  it("collection deletion stops early once the time budget has elapsed, but always deletes at least one", async () => {           
      619 -    mockPrismaProduct.findMany.mockResolvedValueOnce([]); // no stale products                                                    
      711 +  it("collection unpublishing stops early once the time budget has elapsed, but always processes at least one", async () => {     
      712 +    mockPrismaProduct.findMany                                                                                                    
      713 +      .mockResolvedValueOnce([]) // no stale products                                                                             
      714 +      .mockResolvedValueOnce([]); // local rows                                                                                   
      715      mockProductService.listCollections.mockResolvedValueOnce([
      716        { id: "gid://shopify/Collection/A", title: "A" },
      717        { id: "gid://shopify/Collection/B", title: "B" },
      718      ]);
      719 +    mockProductService.getAllPublicationIds.mockResolvedValueOnce(["gid://shopify/Publication/1"]);                               
      720  
      721      const products = [
      722        makeProduct({ collection: "A", productId: "P1" }),
      723        makeProduct({ collection: "B", productId: "P2" }),
      724      ];
      629 -    const result = await runFinalizeBatch(fakeAdmin, {                                                                            
      725 +    const result = await runDisablePass(fakeAdmin, {                                                                              
      726        supplierName: "agrinet",
      727        products,
      728        selections: emptySelections,
     ...
      730        timeBudgetMs: -1,
      731      });
      732  
      637 -    expect(result.collectionsDeleted).toBe(1);                                                                                    
      733 +    expect(result.collectionsUnpublished).toBe(1);                                                                                
      734      expect(result.collectionsRemaining).toBe(1);
      735      expect(result.done).toBe(false);
      640 -    expect(mockProductService.deleteCollection).toHaveBeenCalledTimes(1);                                                         
      736 +    expect(mockProductService.unpublishResource).toHaveBeenCalledTimes(1);                                                        
      737    });
      738  
      643 -  // Sibling of the two runImportBatch regression tests above: runFinalizeBatch's own                                             
      644 -  // listCollections(admin) call (collection-deletion phase) had the same unguarded shape.                                        
      645 -  it("continues with an empty collection map (instead of throwing) if listCollections fails during collection deletion", async () 
          -=> {                                                                                                                              
      646 -    mockPrismaProduct.findMany.mockResolvedValueOnce([]); // no stale products                                                    
      739 +  // Sibling of the two runImportBatch regression tests above: the disable pass's own                                             
      740 +  // listCollections(admin) call (collection phase) keeps the same degrade-not-throw shape.                                       
      741 +  it("continues (instead of throwing) if listCollections fails during the collection phase", async () => {                        
      742 +    mockPrismaProduct.findMany                                                                                                    
      743 +      .mockResolvedValueOnce([]) // no stale products                                                                             
      744 +      .mockResolvedValueOnce([]); // local rows                                                                                   
      745      mockProductService.listCollections.mockRejectedValueOnce(
      746        new Error("Http request error, no response available: GraphQL Client: fetch failed"),
      747      );
      748  
      749      const products = [makeProduct({ collection: "OLDCOL", productId: "P1" })];
      652 -    const result = await runFinalizeBatch(fakeAdmin, {                                                                            
      750 +    const result = await runDisablePass(fakeAdmin, {                                                                              
      751        supplierName: "agrinet",
      752        products,
      753        selections: emptySelections,
     ...
      757      expect(result.errors).toEqual(
      758        expect.arrayContaining([expect.objectContaining({ stage: "list-collections" })]),
      759      );
      662 -    // No collection titles resolve without the lookup, so nothing to delete this pass —                                          
      663 -    // self-heals on the next Finalize call instead of aborting.                                                                  
      664 -    expect(result.collectionsDeleted).toBe(0);                                                                                    
      760 +    // Without the lookup no Shopify id resolves, so no unpublish mutation fires — but                                            
      761 +    // the EntityDisable row is still written (the notice + processed marker), so the                                             
      762 +    // pass completes rather than aborting.                                                                                       
      763 +    expect(mockProductService.unpublishResource).not.toHaveBeenCalled();                                                          
      764 +    expect(result.collectionsUnpublished).toBe(1);                                                                                
      765      expect(result.done).toBe(true);
      666 -    expect(mockProductService.deleteCollection).not.toHaveBeenCalled();                                                           
      766    });
      767  });
      768 +                                                                                                                                  
      769 +describe("entity disables — gating and helpers", () => {                                                                          
      770 +  const selections = { collections: ["HOSES"], brands: [], subCollections: [], subCatCollections: [] };                           
      771 +                                                                                                                                  
      772 +  it("isProductDisabled matches product-level rows and every dimension the product carries", () => {                              
      773 +    const product = makeProduct({ collection: "HOSES", brand: "Vulcan", subCollection: "Fittings", subCatCollection: "Brass", prod
          +uctId: "P1" });                                                                                                                   
      774 +    expect(isProductDisabled(buildDisableIndex([]), product)).toBe(false);                                                        
      775 +    expect(isProductDisabled(buildDisableIndex([{ level: "product", value: "P1" }]), product)).toBe(true);                        
      776 +    expect(isProductDisabled(buildDisableIndex([{ level: "brands", value: "Vulcan" }]), product)).toBe(true);                     
      777 +    expect(isProductDisabled(buildDisableIndex([{ level: "subCatCollections", value: "Brass" }]), product)).toBe(true);           
      778 +    expect(isProductDisabled(buildDisableIndex([{ level: "brands", value: "OtherBrand" }]), product)).toBe(false);                
      779 +  });                                                                                                                             
      780 +                                                                                                                                  
      781 +  it("runImportBatch excludes disabled products from toImport and reports skippedDisabled", async () => {                         
      782 +    mockPrismaEntityDisable.findMany.mockResolvedValue([                                                                          
      783 +      { level: "product", value: "2", reason: "manual" },                                                                         
      784 +    ]);                                                                                                                           
      785 +    const products = ["1", "2", "3"].map((id) => makeProduct({ collection: "HOSES", productId: id }));                            
      786 +                                                                                                                                  
      787 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products, selections, offset: 0, batchSize: 10 });  
      788 +                                                                                                                                  
      789 +    expect(result.total).toBe(2); // "2" is excluded entirely                                                                     
      790 +    expect(result.skippedDisabled).toBe(1);                                                                                       
      791 +    expect(result.created).toBe(2);                                                                                               
      792 +    expect(mockProductService.createShopifyProduct).toHaveBeenCalledTimes(2);                                                     
      793 +  });                                                                                                                             
      794 +                                                                                                                                  
      795 +  it("re-selecting a collection with an import-written disable republishes it and clears the row", async () => {                  
      796 +    mockPrismaEntityDisable.findMany.mockResolvedValue([                                                                          
      797 +      { level: "collections", value: "HOSES", reason: "deselected" },                                                             
      798 +    ]);                                                                                                                           
      799 +    mockProductService.listCollections.mockResolvedValueOnce([{ id: "gid://shopify/Collection/HOSES", title: "HOSES" }]);         
      800 +    mockProductService.getAllPublicationIds.mockResolvedValueOnce(["gid://shopify/Publication/1"]);                               
      801 +    const products = [makeProduct({ collection: "HOSES", productId: "1" })];                                                      
      802 +                                                                                                                                  
      803 +    // NOTE: the collections-level EntityDisable row ALSO gates the products carrying                                             
      804 +    // that collection (isProductDisabled), so this run has nothing to import — but the                                           
      805 +    // offset-0 collection reconciliation must still republish + clear the row, which                                             
      806 +    // un-disables the collection for the NEXT run.                                                                               
      807 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products, selections, offset: 0, batchSize: 10 });  
      808 +                                                                                                                                  
      809 +    expect(mockProductService.publishResource).toHaveBeenCalledWith(fakeAdmin, "gid://shopify/Collection/HOSES", ["gid://shopify/P
          +ublication/1"]);                                                                                                                  
      810 +    expect(mockPrismaEntityDisable.deleteMany).toHaveBeenCalledWith({                                                             
      811 +      where: { supplierName: "agrinet", level: "collections", value: "HOSES" },                                                   
      812 +    });                                                                                                                           
      813 +    expect(result.skippedDisabled).toBe(1);                                                                                       
      814 +  });                                                                                                                             
      815 +                                                                                                                                  
      816 +  it("a manually disabled collection is never auto-republished or cleared", async () => {                                         
      817 +    mockPrismaEntityDisable.findMany.mockResolvedValue([                                                                          
      818 +      { level: "collections", value: "HOSES", reason: "manual" },                                                                 
      819 +    ]);                                                                                                                           
      820 +    mockProductService.listCollections.mockResolvedValueOnce([{ id: "gid://shopify/Collection/HOSES", title: "HOSES" }]);         
      821 +    const products = [makeProduct({ collection: "HOSES", productId: "1" })];                                                      
      822 +                                                                                                                                  
      823 +    await runImportBatch(fakeAdmin, { supplierName: "agrinet", products, selections, offset: 0, batchSize: 10 });                 
      824 +                                                                                                                                  
      825 +    expect(mockProductService.publishResource).not.toHaveBeenCalled();                                                            
      826 +    expect(mockPrismaEntityDisable.deleteMany).not.toHaveBeenCalled();                                                            
      827 +  });                                                                                                                             
      828 +});                                                                                                                               
      829 +                                                                                                                                  
      830 +describe("incremental import — computeProductHash and the unchanged-skip", () => {                                                
      831 +  const selections = { collections: ["HOSES"], brands: [], subCollections: [], subCatCollections: [] };                           
      832 +                                                                                                                                  
      833 +  it("computeProductHash changes when product details, pricing, stock, or resolved markup change", () => {                        
      834 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      835 +    const base = computeProductHash(product, null, null, null);                                                                   
      836 +    expect(computeProductHash(product, null, null, null)).toBe(base); // deterministic                                            
      837 +                                                                                                                                  
      838 +    const changedProduct = { ...product, desc: "renamed" };                                                                       
      839 +    expect(computeProductHash(changedProduct, null, null, null)).not.toBe(base);                                                  
      840 +    expect(computeProductHash(product, { priceCodes: [{ price: "9.99" }] }, null, null)).not.toBe(base);                          
      841 +    expect(computeProductHash(product, null, { available: 5 }, null)).not.toBe(base);                                             
      842 +    expect(computeProductHash(product, null, null, { markupPct: 10, markupFlat: null })).not.toBe(base);                          
      843 +  });                                                                                                                             
      844 +                                                                                                                                  
      845 +  function seedUnchangedRow(product) {                                                                                            
      846 +    mockPrismaProduct.findUnique.mockResolvedValue({                                                                              
      847 +      shopifyProductId: "gid://shopify/Product/EXISTING",                                                                         
      848 +      active: true,                                                                                                               
      849 +      lastPushedHash: computeProductHash(product, null, null, null),                                                              
      850 +    });                                                                                                                           
      851 +  }                                                                                                                               
      852 +                                                                                                                                  
      853 +  it("skips every Shopify call for an unchanged, active, already-pushed product", async () => {                                   
      854 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      855 +    seedUnchangedRow(product);                                                                                                    
      856 +                                                                                                                                  
      857 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products: [product], selections, offset: 0, batchSiz
          +e: 10 });                                                                                                                         
      858 +                                                                                                                                  
      859 +    expect(result.skippedUnchanged).toBe(1);                                                                                      
      860 +    expect(result.created).toBe(0);                                                                                               
      861 +    expect(result.updated).toBe(0);                                                                                               
      862 +    expect(result.offset).toBe(1); // a skip still advances the offset                                                            
      863 +    expect(mockProductService.createShopifyProduct).not.toHaveBeenCalled();                                                       
      864 +    expect(mockProductService.updateShopifyProduct).not.toHaveBeenCalled();                                                       
      865 +    expect(mockProductService.saveProductLocally).not.toHaveBeenCalled();                                                         
      866 +  });                                                                                                                             
      867 +                                                                                                                                  
      868 +  it("force: true bypasses the unchanged-skip", async () => {                                                                     
      869 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      870 +    seedUnchangedRow(product);                                                                                                    
      871 +                                                                                                                                  
      872 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products: [product], selections, offset: 0, batchSiz
          +e: 10, force: true });                                                                                                            
      873 +                                                                                                                                  
      874 +    expect(result.skippedUnchanged).toBe(0);                                                                                      
      875 +    expect(result.updated).toBe(1);                                                                                               
      876 +    expect(mockProductService.updateShopifyProduct).toHaveBeenCalledTimes(1);                                                     
      877 +  });                                                                                                                             
      878 +                                                                                                                                  
      879 +  it("a MarkupRule change re-pushes a product whose files are unchanged", async () => {                                           
      880 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      881 +    seedUnchangedRow(product); // hash stored with NO markup rule                                                                 
      882 +    mockPrismaMarkupRule.findMany.mockResolvedValue([                                                                             
      883 +      { level: "collections", value: "HOSES", markupPct: 15, markupFlat: null },                                                  
      884 +    ]);                                                                                                                           
      885 +                                                                                                                                  
      886 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products: [product], selections, offset: 0, batchSiz
          +e: 10 });                                                                                                                         
      887 +                                                                                                                                  
      888 +    expect(result.skippedUnchanged).toBe(0);                                                                                      
      889 +    expect(result.updated).toBe(1);                                                                                               
      890 +  });                                                                                                                             
      891 +                                                                                                                                  
      892 +  it("an inactive (disabled) row is never skip-eligible — re-import re-pushes and re-activates it", async () => {                 
      893 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      894 +    mockPrismaProduct.findUnique.mockResolvedValue({                                                                              
      895 +      shopifyProductId: "gid://shopify/Product/EXISTING",                                                                         
      896 +      active: false, // disabled earlier                                                                                          
      897 +      lastPushedHash: computeProductHash(product, null, null, null), // even with a matching hash                                 
      898 +    });                                                                                                                           
      899 +                                                                                                                                  
      900 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products: [product], selections, offset: 0, batchSiz
          +e: 10 });                                                                                                                         
      901 +                                                                                                                                  
      902 +    expect(result.skippedUnchanged).toBe(0);                                                                                      
      903 +    expect(result.updated).toBe(1);                                                                                               
      904 +    // Post-push bookkeeping clears the disable state and stores the fresh hash.                                                  
      905 +    expect(mockPrismaProduct.update).toHaveBeenCalledWith(                                                                        
      906 +      expect.objectContaining({                                                                                                   
      907 +        where: { externalProductId: "P1" },                                                                                       
      908 +        data: expect.objectContaining({ active: true, disabledReason: null, lastPushedHash: expect.any(String) }),                
      909 +      }),                                                                                                                         
      910 +    );                                                                                                                            
      911 +  });                                                                                                                             
      912 +                                                                                                                                  
      913 +  it("does not persist the hash when publishing fails — the next run re-pushes", async () => {                                    
      914 +    mockProductService.getAllPublicationIds.mockResolvedValueOnce(["gid://shopify/Publication/1"]);                               
      915 +    mockProductService.publishResource.mockRejectedValueOnce(new Error("network blip"));                                          
      916 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      917 +                                                                                                                                  
      918 +    // offset 1 of 2 products skips ensureCollectionsExist (whose publishResource call                                            
      919 +    // would consume the rejection) — same isolation trick as the save-before-publish test.                                       
      920 +    const products = [makeProduct({ collection: "HOSES", productId: "P0" }), product];                                            
      921 +    const result = await runImportBatch(fakeAdmin, { supplierName: "agrinet", products, selections, offset: 1, batchSize: 10 });  
      922 +                                                                                                                                  
      923 +    expect(result.errors).toEqual(expect.arrayContaining([expect.objectContaining({ stage: "publish" })]));                       
      924 +    expect(mockPrismaProduct.update).not.toHaveBeenCalled();                                                                      
      925 +  });                                                                                                                             
      926 +                                                                                                                                  
      927 +  it("persists the hash after a fully clean push", async () => {                                                                  
      928 +    const product = makeProduct({ collection: "HOSES", productId: "P1" });                                                        
      929 +                                                                                                                                  
      930 +    await runImportBatch(fakeAdmin, { supplierName: "agrinet", products: [product], selections, offset: 0, batchSize: 10 });      
      931 +                                                                                                                                  
      932 +    expect(mockPrismaProduct.update).toHaveBeenCalledWith(                                                                        
      933 +      expect.objectContaining({                                                                                                   
      934 +        where: { externalProductId: "P1" },                                                                                       
      935 +        data: expect.objectContaining({                                                                                           
      936 +          lastPushedHash: computeProductHash(product, null, null, null),                                                          
      937 +          active: true,                                                                                                           
      938 +        }),                                                                                                                       
      939 +      }),                                                                                                                         
      940 +    );                                                                                                                            
      941 +  });                                                                                                                             
      942 +});                                                                                                                               

● Bash(npx vitest run app/services/suppliers.server.test.js 2>&1 | tail -30)
  ⎿  npm warn Unknown project config "shamefully-hoist". This will stop working in the next major version of npm.

      RUN  v4.1.8 /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker
     … +6 lines (ctrl+o to expand)

● All 48 suppliers tests pass. Now the job-runner test file.

● Write(app/services/import-run.server.test.js)
  ⎿  Wrote 405 lines to app/services/import-run.server.test.js
       1 import { describe, it, expect, vi, beforeEach } from "vitest";
       2
       3 // In-memory fakes for the two job tables — stateful so the runner's own
       4 // read-back paths (retry phase findMany, resume findUnique) see real effects.
       5 const db = vi.hoisted(() => ({ runs: new Map(), failures: new Map(), seq: { run: 1, failure: 1 } }));
       6
       7 const { mockImportRun, mockImportBatchFailure } = vi.hoisted(() => {
       8   const withFailures = (row) => ({
       9     ...row,
      10     batchFailures: [...db.failures.values()].filter((f) => f.runId === row.id),
     … +396 lines (ctrl+o to expand)

● Bash(npx vitest run app/services/import-run.server.test.js 2>&1 | tail -40)
  ⎿  npm warn Unknown project config "shamefully-hoist". This will stop working in the next major version of npm.

      RUN  v4.1.8 /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker
     … +24 lines (ctrl+o to expand)

● Update(app/services/import-run.server.test.js)
  ⎿  Added 3 lines, removed 3 lines
      328  
      329  describe("cancel / concurrency / interruption / resume", () => {
      330    it("cancelling mid-run stops before the next batch and marks the run cancelled", async () => {
      331 -    let capturedRunId;                                                                                                            
      331 +    // Cancel from INSIDE the first batch (the run row already exists by then) —                                                  
      332 +    // the loop must observe the flag before starting batch 2.                                                                    
      333      mockSuppliers.runImportBatch.mockImplementation(async () => {
      333 -      cancelRun(capturedRunId);                                                                                                   
      334 +      cancelRun([...db.runs.keys()][0]);                                                                                          
      335        return importBatchResult(2, 6);
      336      });
      337  
     ...
      339        { shop: "test.myshopify.com", supplierName: "agrinet", selections: {} },
      340        deps(),
      341      );
      341 -    capturedRunId = runId;                                                                                                        
      342      const row = await waitForTerminal(runId);
      343  
      344      expect(row.status).toBe("cancelled");

● Bash(npx vitest run app/services/import-run.server.test.js 2>&1 | tail -8)
  ⎿   RUN  v4.1.8 /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker
     … +4 lines (ctrl+o to expand)
  ⎿  Allowed by auto mode classifier

● Now the mutation-shape tests in product.server.test.js — checking its existing patterns first.

  Searched for 1 pattern, read 1 file (ctrl+o to expand)

● Bash(sed -n '1,40p' app/services/product.server.test.js)
  ⎿  import { describe, it, expect, vi } from "vitest";

     // Mocking "@prisma/client" does NOT intercept db.server.js's real client — db.server.js
     … +37 lines (ctrl+o to expand)
     
● Update(app/services/product.server.test.js)
  ⎿  Added 2 lines
      30    computeSupplierProductCode,
      31    withNetworkRetry,
      32    createShopifyProduct,
      33 +  setProductStatus,                                                                                                                
      34 +  unpublishResource,                                                                                                               
      35  } = await import("./product.server.js");
      36  
      37  // ---------------------------------------------------------------------------

● Update(app/services/product.server.test.js)
  ⎿  Added 52 lines
      479    });
      480  });
      481  
      482 +// The disable-instead-of-delete primitives for the supplier import flow.                                                         
      483 +describe("setProductStatus", () => {                                                                                              
      484 +  it("sends a productUpdate with just the id and target status", async () => {                                                    
      485 +    const admin = createMockAdmin([{ data: { productUpdate: { product: { id: "gid://shopify/Product/1" }, userErrors: [] } } }]); 
      486 +                                                                                                                                  
      487 +    await setProductStatus(admin, "gid://shopify/Product/1", "DRAFT");                                                            
      488 +                                                                                                                                  
      489 +    expect(admin.graphql).toHaveBeenCalledTimes(1);                                                                               
      490 +    const [mutation, options] = admin.graphql.mock.calls[0];                                                                      
      491 +    expect(mutation).toContain("productUpdate");                                                                                  
      492 +    expect(options.variables.input).toEqual({ id: "gid://shopify/Product/1", status: "DRAFT" });                                  
      493 +  });                                                                                                                             
      494 +                                                                                                                                  
      495 +  it("throws on userErrors so callers can record the failure", async () => {                                                      
      496 +    const admin = createMockAdmin([                                                                                               
      497 +      { data: { productUpdate: { product: null, userErrors: [{ field: ["status"], message: "invalid" }] } } },                    
      498 +    ]);                                                                                                                           
      499 +                                                                                                                                  
      500 +    await expect(setProductStatus(admin, "gid://shopify/Product/1", "DRAFT")).rejects.toThrow(/invalid/);                         
      501 +  });                                                                                                                             
      502 +});                                                                                                                               
      503 +                                                                                                                                  
      504 +describe("unpublishResource", () => {                                                                                             
      505 +  it("sends publishableUnpublish with one PublicationInput per publication id", async () => {                                     
      506 +    const admin = createMockAdmin([{ data: { publishableUnpublish: { publishable: {}, userErrors: [] } } }]);                     
      507 +                                                                                                                                  
      508 +    await unpublishResource(admin, "gid://shopify/Collection/1", ["pub1", "pub2"]);                                               
      509 +                                                                                                                                  
      510 +    expect(admin.graphql).toHaveBeenCalledTimes(1);                                                                               
      511 +    const [mutation, options] = admin.graphql.mock.calls[0];                                                                      
      512 +    expect(mutation).toContain("publishableUnpublish");                                                                           
      513 +    expect(options.variables).toEqual({                                                                                           
      514 +      id: "gid://shopify/Collection/1",                                                                                           
      515 +      input: [{ publicationId: "pub1" }, { publicationId: "pub2" }],                                                              
      516 +    });                                                                                                                           
      517 +  });                                                                                                                             
      518 +                                                                                                                                  
      519 +  it("is a no-op with no publication ids", async () => {                                                                          
      520 +    const admin = createMockAdmin([]);                                                                                            
      521 +    await unpublishResource(admin, "gid://shopify/Collection/1", []);                                                             
      522 +    expect(admin.graphql).not.toHaveBeenCalled();                                                                                 
      523 +  });                                                                                                                             
      524 +                                                                                                                                  
      525 +  it("throws on userErrors", async () => {                                                                                        
      526 +    const admin = createMockAdmin([                                                                                               
      527 +      { data: { publishableUnpublish: { publishable: null, userErrors: [{ message: "nope" }] } } },                               
      528 +    ]);                                                                                                                           
      529 +                                                                                                                                  
      530 +    await expect(unpublishResource(admin, "gid://shopify/Collection/1", ["pub1"])).rejects.toThrow(/nope/);                       
      531 +  });                                                                                                                             
      532 +});                                                                                                                               
      533 +                                                                                                                                  
      534  describe("listCatalogs", () => {
      535    it("returns parsed catalog list from paginated response", async () => {
      536      const admin = createMockAdmin([

● Bash(npm test 2>&1 | tail -30)
  ⎿  npm warn Unknown project config "shamefully-hoist". This will stop working in the next major version of npm.

     > hw-storefront-ui@1.0.0 test
     … +28 lines (ctrl+o to expand)

  Searched for 1 pattern (ctrl+o to expand)

● Bash(npx prisma migrate status 2>&1 | tail -5)
  ⎿  │  Run the following to update                            │
     │    npm i --save-dev prisma@latest                       │
     │    npm i @prisma/client@latest                          │
     … +2 lines (ctrl+o to expand)
  ⎿  Allowed by auto mode classifier
     
● Update(app/services/suppliers.server.js)
  ⎿  Added 5 lines, removed 5 lines
      335  // A single "Apply Changes" run can involve thousands of products, each costing ~6
      336  // sequential Shopify Admin GraphQL round trips (create/update, variant, inventory
      337  // tracking, inventory quantity, publish, collection-add) — traced at ~1.8-4.8s/product.
      338 -// Cloudflare's edge enforces a hard ~100s timeout per HTTP request through the tunnel                                            
      339 -// (not configurable), so anything beyond ~15-20 products in one request risks a 524.                                             
      340 -// IMPORT_BATCH_SIZE keeps each batch comfortably under that limit; runImportBatch/                                               
      341 -// runFinalizeBatch below are called repeatedly (client-driven, increasing offset) by                                             
      342 -// app.import.jsx instead of a single unbounded applySupplierSelections() call.                                                   
      338 +// IMPORT_BATCH_SIZE bounds one runImportBatch/runDisablePass call. Since the move to                                             
      339 +// the server-side job runner (import-run.server.js) these calls no longer traverse the                                           
      340 +// Cloudflare tunnel at all — the batch size now just sets checkpoint granularity:                                                
      341 +// how often progress/counters are flushed to the ImportRun row, and the unit that the                                            
      342 +// 30s-retry / skip / revisit failure policy operates on.                                                                         
      343  export const IMPORT_BATCH_SIZE = 15;
      344  
      345  // IMPORT_BATCH_SIZE alone assumes every product costs close to the AVERAGE traced

● Bash(npm run build 2>&1 | tail -15)
  ⎿  rendering chunks...
     [plugin vite:reporter]
     (!) /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-storefront-ui-node-docker/app/db.server.js is dynamically imported by /ho
     … +36 lines (ctrl+o to expand)

● Build succeeds (the chunk warnings are pre-existing). Verification is done. Now the exit ritual: VERSION bump, timestamped todo update, qdrant
  logging.
     
● Reading 2 files, listing 1 directory… (ctrl+o to expand)
  ⎿  ~/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker/2607100950_todo.md
     
● Update(~/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker/2607100950_todo.md)
  ⎿  Added 1 line, removed 1 line
      1  2607100950 claude
      2 -VERSION: 2026.07.5                                                                                                                  
      2 +VERSION: 2026.07.6 (bumped this task; was 2026.07.5)                                                                                
      3  
      4  "For this session, prioritize using primarily the "shopify-dev-mcp" MCP server to confirm correct pattern coding for this project es
         pecially when in "Plan" mode or "Debug" mode. Whenever debugin a bug or error first query the project_errors.db and then the "shopif
         y-dev-mcp" MCP server. Once the task is completed update the "MCP-Bridge" MCP server and the project_errors.db. Always check the ser
         ver for existing patterns before suggesting a fix. The "MCP-Bridge" MCP server has an example for context as needed if requiring sea
         rch parameters."
      5  

● Update(~/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker/2607100950_todo.md)
  ⎿  Added 120 lines, removed 1 line
       57      - update "MCP-Bridge" project plan
       58      - update the @project_errors.db
       59  
       60 -## --                                                                                                                             
       60   No newline at end of file
       61 +## --                                                                                                                             
       62 +                                                                                                                                  
       63 +# RESOLUTION — session 2607100950 (2026-07-10)                                                                                    
       64 +                                                                                                                                  
       65 +All app changes live in `hw-storefront-ui-node-docker`. 148/148 real tests passing                                                
       66 +(48 suppliers + 12 new import-run + product/others; same 2 pre-existing unrelated                                                 
       67 +suite failures as always: app.xero.test.jsx missing SHOPIFY_API_KEY, stray generated                                              
       68 +.react-router types file). `npm run build` clean. NOT committed (manual commits).                                                 
       69 +                                                                                                                                  
       70 +## Root cause — the "prisma/postgres not up" theory is DISPROVEN                                                                  
       71 +                                                                                                                                  
       72 +The tcpdump analysis file (2607100920-errors_issues_tcpdump_607091745.md, written by                                              
       73 +another AI) claims `PrismaClientInitializationError: Can't reach database server at                                               
       74 +postgres:5432` appears in hw-hydrogen.log. It does not — checked line by line:                                                    
       75 +                                                                                                                                  
       76 +- hw-hydrogen.log contains only bot-scanner 404s (`GET /*/.git/config`) and SIGTERM                                               
       77 +  restarts (exit 143). The hydrogen app has NO Prisma at all.                                                                     
       78 +- hw-storefront.log shows Prisma healthy on SQLite (`file:/app/prisma/dev.sqlite`,                                                
       79 +  11 migrations, none pending) and import POSTs returning 200.                                                                    
       80 +- `grep -ril postgres` over both repos: zero hits outside that analysis file itself.                                              
       81 +  `docker ps -a`: no postgres container exists and never did.                                                                     
       82 +- dev.sqlite IS persisted (bind mount in docker-compose.yml) — sessions survive                                                   
       83 +  recreates. SQLite kept (approved decision); no postgres migration.                                                              
       84 +                                                                                                                                  
       85 +## The ACTUAL error causing the import failures                                                                                   
       86 +                                                                                                                                  
       87 +Evidence: app/errors/260709150449-errors.png (bare 502 on the Import page,                                                        
       88 +2026-07-09 15:04) + cloudflare-errors-2607091505.md (`ERR Incoming request ended                                                  
       89 +abruptly: context canceled ... dest=https://app.hoseworld.store/app/import.data`).                                                
       90 +                                                                                                                                  
       91 +The import was driven by the BROWSER: app.import.jsx resubmitted one POST per                                                     
       92 +15-product batch, each taking ~60s (hw-storefront.log: 60004/60735/62452ms POSTs),                                                
       93 +~137 batches ≈ 2.3h, every request held open through the Cloudflare tunnel inside                                                 
       94 +the Shopify Admin iframe. The client loop had NO retry — on any dropped request                                                   
       95 +(tunnel blip → 502 "context canceled") the whole run silently died. Over thousands                                                
       96 +of long-lived tunnel requests per run, one failure is near-inevitable. That is the                                                
       97 +whole bug; the database was never involved.                                                                                       
       98 +                                                                                                                                  
       99 +Also fixed on the way: runtime-uploaded supplier JSON lived only in the container                                                 
      100 +FS (no volume) and was wiped on every rebuild — now bind-mounted.                                                                 
      101 +                                                                                                                                  
      102 +## Step-by-step resolution (hw-storefront-ui-node-docker)                                                                         
      103 +                                                                                                                                  
      104 +1. Prisma migration `20260710083134_add_import_run_entity_disable_product_sync`:                                                  
      105 +   new models `ImportRun` (job row: status/phase/offset/counters/heartbeat),                                                      
      106 +   `ImportBatchFailure` (a batch that failed twice), `EntityDisable` (granular                                                    
      107 +   disable switches, keyed supplierName+level+value like MarkupRule); `Product`                                                   
      108 +   gains `lastPushedHash/lastPushedAt/disabledReason/disabledAt`.                                                                 
      109 +2. docker-compose.yml: added `./suppliers:/app/suppliers` bind mount.                                                             
      110 +3. NEW app/services/import-run.server.js — server-side background job runner.                                                     
      111 +   One short POST starts the run; UI polls every 3s; tunnel failures can no longer                                                
      112 +   touch the run; closing the tab doesn't stop it. Fresh admin client per batch via                                               
      113 +   `unauthenticated.admin(shop)` (offline token + refresh — survives multi-hour                                                   
      114 +   runs). Batch-failure policy exactly per spec: throw → wait 30s → retry; second                                                 
      115 +   throw → record ImportBatchFailure + skip to next batch; 5 consecutive failures →                                               
      116 +   run ends `failed`; after import+disable phases, a `retrying` phase replays every                                               
      117 +   unresolved failure once. Runs interrupted by a server restart are detected via                                                 
      118 +   stale heartbeat (>2min) and are resumable from the persisted offset (safe —                                                    
      119 +   create-vs-update is re-derived from Prisma per product).                                                                       
      120 +4. Incremental imports (suppliers.server.js): `computeProductHash` = sha256 of raw                                                
      121 +   product+pricing+stock entries + resolved markup (+ IMPORT_HASH_VERSION). Batch                                                 
      122 +   skips a product when hash matches, row is active, and a shopifyProductId exists —                                              
      123 +   skipping all ~6 GraphQL round trips. Hash persisted only after a fully clean push                                              
      124 +   (update/create + publish + collection-add), so partial failures re-push next run.                                              
      125 +   MarkupRule changes change the hash → affected products re-push. "Force full                                                    
      126 +   import" checkbox bypasses. Repeat no-change runs now take minutes, not hours.                                                  
      127 +5. Disable-instead-of-delete: `runFinalizeBatch` → `runDisablePass`. Stale products                                               
      128 +   get Shopify status DRAFT (`setProductStatus`, replaces `productDelete`) + local                                                
      129 +   `active:false` with reason `manual` | `deselected` | `supplier_removed`; stale                                                 
      130 +   collections are UNPUBLISHED (`publishableUnpublish`, validated via                                                             
      131 +   shopify-dev-mcp; replaces `collectionDelete`) with an EntityDisable row as the                                                 
      132 +   persisted notice. Products/collections gone from the supplier file get the                                                     
      133 +   "deleted on the supplier's side" notice (UI banner + Disabled items page).                                                     
      134 +   Brands/sub-collections/sub-cat have no Shopify object (vendor/metafields) —                                                    
      135 +   disabling one drafts its products + records the EntityDisable row. Re-selecting                                                
      136 +   an import-disabled collection republishes it and clears the row; `manual` rows                                                 
      137 +   are never auto-cleared. Nothing in the supplier flow deletes anymore                                                           
      138 +   (deleteProduct/deleteCollection remain only in the explicit Reset Store utility).                                              
      139 +6. Granular disable UI: Disable/Enable toggle + badge on every Collection/Brand/                                                  
      140 +   Sub-collection/Sub-cat row on the Import page; NEW route /app/disabled                                                         
      141 +   ("Disabled items" nav entry) lists all disable switches per level with re-enable,                                              
      142 +   all inactive products with reason badges (incl. supplier-removed notices), and a                                               
      143 +   product search to disable individual products.                                                                                 
      144 +7. app.import.jsx rewired: old `apply-supplier-import-batch`/`finalize-batch`                                                     
      145 +   intents replaced by `start-supplier-import` / `import-run-status` (3s poll) /                                                  
      146 +   `cancel-supplier-import` / `resume-supplier-import`; progress shows phase,                                                     
      147 +   counts, failed batches; Resume button on interrupted/failed runs.                                                              
      148 +8. Tests: suppliers.server.test.js extended to 48 (hash-skip matrix, disable                                                      
      149 +   reasons, collection unpublish/republish, entity-disable gating); NEW                                                           
      150 +   import-run.server.test.js (12 — retry/skip/5-strikes/revisit/cancel/resume/                                                    
      151 +   stale-heartbeat, deterministic via injected sleep); product.server.test.js adds                                                
      152 +   setProductStatus + publishableUnpublish mutation shapes.                                                                       
      153 +                                                                                                                                  
      154 +## Deploy notes (Wayne)                                                                                                           
      155 +                                                                                                                                  
      156 +- `docker cp` the running container's `/app/suppliers` out FIRST (uploads are still                                               
      157 +  container-only until the new compose mount is live):                                                                            
      158 +  `docker cp hw-storefront-ui-node-docker-storefront-ui-1:/app/suppliers ./suppliers-backup`                                      
      159 +  then merge into ./suppliers before `docker compose build && docker compose up -d`                                               
      160 +  (recreate, not restart). Migration applies automatically via `npm run setup`.                                                   
      161 +- Live verification (can't be done from this env — /app/import 410s outside the                                                   
      162 +  Shopify Admin iframe): start an import, close the tab, reopen → still running;                                                  
      163 +  drop the tunnel briefly mid-run → run unaffected; deselect a brand → products go                                                
      164 +  Draft (not deleted), re-select → restored; 2nd unchanged run → skippedUnchanged≈                                                
      165 +  total in minutes; change one MarkupRule → only affected products re-push.                                                       
      166 +                                                                                                                                  
      167 +## New issues found (out of scope, not fixed)                                                                                     
      168 +                                                                                                                                  
      169 +- The hydrogen container's exit-143 restart loop: something OUTSIDE both repos runs                                               
      170 +  `git pull && pnpm install && start` (log: "Already up to date" + "Done in 295ms                                                 
      171 +  using pnpm") — the committed CMD is plain `pnpm run start`. Whatever                                                            
      172 +  supervisor/wrapper does this is host-side; worth finding, it periodically SIGTERMs                                              
      173 +  the storefront.                                                                                                                 
      174 +- hw-hydrogen.log shows constant `.git/config` scanner probes — bot noise, 404'd,                                                 
      175 +  but consider a WAF rule at Cloudflare.                                                                                          
      176 +                                                                                                                                  
      177 +## Indexing note                                                                                                                  
      178 +                                                                                                                                  
      179 +project_errors.db is read-only via MCP (search_errors); session + patterns stored                                                 
      180 +to qdrant `hoseworld-dev-knowledge` via MCP-Bridge qdrant-store per standing ritual.                                              
      181   No newline at end of file

  Called MCP-Bridge (ctrl+o to expand)

● Bash(git status --short; echo "--- hydrogen repo ---"; cd ../hw-hydrogen-storefront-node-docker && git status --short)
  ⎿  Error: claude-opus-4-8[1m] is temporarily unavailable, so auto mode cannot determine the safety of Bash right now. Wait briefly and then try 
     this action again. If it keeps failing, continue with other tasks that don't require this action and come back to it later. Note: reading 
     files, searching code, and other read-only operations do not require the classifier and can still be used.

● Bash(git status --short && echo "--- hydrogen repo ---" && git -C
      /home/rogue/Data/data/coding/github/shopify/app/hoseworld/hw-hydrogen-storefront-node-docker status…)
  ⎿   M app/routes/app.import.jsx
      M app/routes/app.jsx
      M app/services/product.server.js
     … +12 lines (ctrl+o to expand)

● Done. The import failure is fixed and the full redesign from the todo is implemented, tested (148/148), and documented — nothing committed, per
  your workflow.

  The actual root cause (and the disproven one)

  The "prisma/postgres not up" theory from the tcpdump analysis file is wrong — that postgres:5432 error appears in no real log, the hydrogen app
  has no Prisma at all, storefront-ui's SQLite is bind-mounted and healthy, and no postgres exists anywhere in either repo or Docker. SQLite stays
  (as you approved).

  The real killer, per the cloudflared log and your 502 screenshot: the import was browser-driven — one ~60-second POST per 15-product batch, ~137
  batches per run, every request held open through the Cloudflare tunnel, with no retry in the client loop. One dropped request ("context canceled"
  → 502) silently killed the whole multi-hour run.

  What was built (all in hw-storefront-ui-node-docker)

  - Server-side import job (app/services/import-run.server.js): one short POST starts the run, the page polls every 3s. Tunnel blips and closed tabs
  can't touch it anymore. Your exact retry spec is implemented server-side: fail → wait 30s → retry; fail again → record + skip to next batch; 5 in
  a row → end run; a final pass revisits all recorded failures. Interrupted runs (server restart) are detected and resumable from where they
  stopped.
  - Incremental imports: each product's last successfully-pushed state is hashed (including resolved markup rules) into the Prisma db; unchanged
  products skip all ~6 Shopify calls. A repeat run with no changes now takes minutes instead of hours; a price or markup change re-pushes only the
  affected products. A "Force full import" checkbox bypasses this.
  - Incremental imports: each product's last successfully-pushed state is hashed (including resolved markup rules) into the Prisma db; unchanged
  products skip all ~6 Shopify calls. A repeat run with no changes now takes minutes instead of hours; a price or markup change re-pushes only the
  affected products. A "Force full import" checkbox bypasses this.
  - Nothing is deleted anymore: de-selected/supplier-removed products go to Shopify Draft with a reason; collections are unpublished, not deleted;
  supplier-removed items get a "deleted on the supplier's side" notice. Re-selecting restores everything automatically.
  - Granular disable UI: Disable/Enable toggles on every collection/brand/sub-collection/sub-cat row on the Import page, plus a new Disabled items
  page (nav link added) for re-enabling, viewing supplier-removed notices, and disabling individual products via search.
  - Infra fix: ./suppliers is now bind-mounted — uploads previously vanished on every rebuild.

  Before you deploy

  docker cp hw-storefront-ui-node-docker-storefront-ui-1:/app/suppliers ./suppliers-backup first (current uploads are still container-only), merge
  into ./suppliers, then docker compose build && docker compose up -d. The migration applies automatically on container start.

  Bookkeeping

  VERSION → 2026.07.6, full write-up in 2607100950_todo.md, session + reusable patterns stored to qdrant. One open issue flagged: something
  host-side (outside both repos) restarts the hydrogen container with git pull && pnpm install loops (the exit-143 entries) — worth hunting down
  separately.

✻ Churned for 40m 11s