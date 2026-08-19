#!/usr/bin/env bash
# Build + tag + push production images for both hoseworld containers.
# Run from anywhere on the DEV machine; production never builds (it pulls).
#
# Usage:
#   REGISTRY=docker.io/<namespace> ./scripts/release.sh          # build+push both
#   REGISTRY=ghcr.io/<user> ./scripts/release.sh hydrogen        # just hydrogen
#   REGISTRY=... ./scripts/release.sh ui                         # just storefront-ui
#   REGISTRY=... PUSH=0 ./scripts/release.sh                     # build+tag only
#
# One-time setup on the dev machine: `docker login <registry>` with a private
# repo/namespace. Each app is tagged from its OWN repo-root VERSION file
# (hoseworld-online from HYDROGEN_DIR/VERSION, admin-online from
# UI_DIR/VERSION — they are independent commit-count counters per repo, see
# hoseworld-dev-knowledge / project_hydrogen_version_scheme, NOT a single
# counter shared across both apps as this comment used to claim; fixed
# 2026-08-19 after that false assumption nearly shipped admin-online tagged
# with hydrogen's version number). :latest is tagged too, per app.
#
# On the VPS afterwards (per repo):
#   REGISTRY=... TAG=<version> docker compose -f docker-compose.prod.yml pull
#   REGISTRY=... TAG=<version> docker compose -f docker-compose.prod.yml up -d
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HYDROGEN_DIR="$(dirname "$SCRIPT_DIR")"
# hw-storefront-ui (not hw-storefront-ui-node-docker) — the dedicated
# main-only worktree, mirroring HYDROGEN_DIR's own role. Keeps this
# main-only guard meaningful even while hw-storefront-ui-node-docker sits on
# a long-lived dev/feature branch (import-bulk-operations as of 2026-08-18)
# used as a buffer for testing before merging up to main. See
# ../../hoseworld-infra/docs/10-deployment.md §0b.
UI_DIR="$HYDROGEN_DIR/../hw-storefront-ui"

REGISTRY="${REGISTRY:?Set REGISTRY, e.g. REGISTRY=docker.io/<namespace> or ghcr.io/<user>}"
PUSH="${PUSH:-1}"
TARGET="${1:-all}"

# Guard: the VPS never touches git — it only ever `docker compose pull`s a
# tagged image from the registry, so nothing except this check guarantees a
# pushed image was actually built from the reviewed, merged `main` branch
# rather than whatever happened to be checked out. Applies to both repos
# independently, since they're separate git repos with separate remotes and
# can drift independently. See ../../hoseworld-infra/docs/10-deployment.md.
# Escape hatch for a deliberate exception: RELEASE_ALLOW_DIRTY=1.
check_release_branch() {
  local dir="$1"
  local branch
  branch="$(git -C "$dir" rev-parse --abbrev-ref HEAD)"
  if [ "$branch" != "main" ]; then
    echo "Refusing to release: $dir is on branch '$branch', not main." >&2
    exit 1
  fi
  if [ -n "$(git -C "$dir" status --porcelain)" ]; then
    echo "Refusing to release: $dir has uncommitted changes." >&2
    exit 1
  fi
  git -C "$dir" fetch origin main --quiet
  local local_sha remote_sha
  local_sha="$(git -C "$dir" rev-parse main)"
  remote_sha="$(git -C "$dir" rev-parse origin/main)"
  if [ "$local_sha" != "$remote_sha" ]; then
    echo "Refusing to release: $dir's local main ($local_sha) differs from origin/main ($remote_sha)." >&2
    echo "Push or pull to reconcile before releasing." >&2
    exit 1
  fi
}

if [ "${RELEASE_ALLOW_DIRTY:-0}" != "1" ]; then
  case "$TARGET" in
    all) check_release_branch "$HYDROGEN_DIR"; check_release_branch "$UI_DIR" ;;
    hydrogen) check_release_branch "$HYDROGEN_DIR" ;;
    ui) check_release_branch "$UI_DIR" ;;
  esac
else
  echo "==> RELEASE_ALLOW_DIRTY=1 — skipping main-branch guard" >&2
fi

# Runs via the official trivy image over the docker socket rather than
# requiring a local trivy install — the dev machine doesn't have one, and
# this keeps release.sh self-contained (only needs Docker, same as every
# other step here).
#
# REPORT-ONLY as of 2026-08-18 (Wayne's decision): no --exit-code 1, so
# findings print but never fail the release. The current images already
# have real HIGH/CRITICAL findings (22 HIGH + 1 CRITICAL on
# hoseworld-online:2026.07.201, mostly transitive Go-stdlib CVEs, not app
# code) that haven't been triaged yet — turning on hard enforcement today
# would block every release starting now, not just future regressions.
# Revisit in the Phase 11 pass (docs/11-security-review.md): once current
# findings are triaged/patched, delete this comment block and add back
# `--exit-code 1` (and drop the `|| true`) to make it blocking, matching
# the original spec in that doc.
scan_image() {
  local image="$1"
  if [ "${RELEASE_SKIP_TRIVY:-0}" = "1" ]; then
    echo "==> RELEASE_SKIP_TRIVY=1 — skipping vulnerability scan for $image" >&2
    return 0
  fi
  echo "==> Scanning $image for HIGH/CRITICAL vulnerabilities (trivy, report-only)"
  docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$HOME/.cache/trivy:/root/.cache/" \
    aquasec/trivy:latest image --severity HIGH,CRITICAL "$image" || true
}

release() {
  local dir="$1" name="$2"
  local tag
  tag="$(tr -d '[:space:]' <"$dir/VERSION")"
  local image="$REGISTRY/$name"
  echo "==> Building $image:$tag from $dir"
  (cd "$dir" && REGISTRY="$REGISTRY" TAG="$tag" docker compose build)
  docker tag "$image:$tag" "$image:latest"
  scan_image "$image:$tag"
  if [ "$PUSH" = "1" ]; then
    echo "==> Pushing $image:$tag and $image:latest"
    docker push "$image:$tag"
    docker push "$image:latest"
  else
    echo "==> PUSH=0 — skipped push for $image"
  fi
  echo "$name:$tag" >>"$RELEASED_LOG"
}

RELEASED_LOG="$(mktemp)"
trap 'rm -f "$RELEASED_LOG"' EXIT

case "$TARGET" in
  all)
    release "$HYDROGEN_DIR" hoseworld-online
    release "$UI_DIR" admin-online
    ;;
  hydrogen) release "$HYDROGEN_DIR" hoseworld-online ;;
  ui) release "$UI_DIR" admin-online ;;
  *)
    echo "Unknown target '$TARGET' (expected: all | hydrogen | ui)" >&2
    exit 1
    ;;
esac

echo "==> Done. Deploy on the VPS with (per app — tags differ, do not mix them up):"
while IFS=: read -r name tag; do
  case "$name" in
    hoseworld-online) compose_dir="../hw-hydrogen-storefront-node-docker" ;;
    admin-online) compose_dir="../hw-storefront-ui-node-docker" ;;
  esac
  echo "    # $name"
  echo "    REGISTRY=$REGISTRY TAG=$tag docker compose -f $compose_dir/docker-compose.prod.yml pull"
  echo "    REGISTRY=$REGISTRY TAG=$tag docker compose -f $compose_dir/docker-compose.prod.yml up -d"
done <"$RELEASED_LOG"
