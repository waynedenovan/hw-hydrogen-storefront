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
# repo/namespace. TAG is always taken from the hydrogen repo-root VERSION file
# (single running counter shared by the whole project); :latest is tagged too.
#
# On the VPS afterwards (per repo):
#   REGISTRY=... TAG=<version> docker compose -f docker-compose.prod.yml pull
#   REGISTRY=... TAG=<version> docker compose -f docker-compose.prod.yml up -d
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HYDROGEN_DIR="$(dirname "$SCRIPT_DIR")"
UI_DIR="$HYDROGEN_DIR/../hw-storefront-ui-node-docker"

REGISTRY="${REGISTRY:?Set REGISTRY, e.g. REGISTRY=docker.io/<namespace> or ghcr.io/<user>}"
TAG="$(tr -d '[:space:]' <"$HYDROGEN_DIR/VERSION")"
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

release() {
  local dir="$1" name="$2"
  local image="$REGISTRY/$name"
  echo "==> Building $image:$TAG from $dir"
  (cd "$dir" && REGISTRY="$REGISTRY" TAG="$TAG" docker compose build)
  docker tag "$image:$TAG" "$image:latest"
  if [ "$PUSH" = "1" ]; then
    echo "==> Pushing $image:$TAG and $image:latest"
    docker push "$image:$TAG"
    docker push "$image:latest"
  else
    echo "==> PUSH=0 — skipped push for $image"
  fi
}

case "$TARGET" in
  all)
    release "$HYDROGEN_DIR" hw-hydrogen-storefront
    release "$UI_DIR" hw-storefront-ui
    ;;
  hydrogen) release "$HYDROGEN_DIR" hw-hydrogen-storefront ;;
  ui) release "$UI_DIR" hw-storefront-ui ;;
  *)
    echo "Unknown target '$TARGET' (expected: all | hydrogen | ui)" >&2
    exit 1
    ;;
esac

echo "==> Done. Deploy on the VPS with:"
echo "    REGISTRY=$REGISTRY TAG=$TAG docker compose -f docker-compose.prod.yml pull"
echo "    REGISTRY=$REGISTRY TAG=$TAG docker compose -f docker-compose.prod.yml up -d"
