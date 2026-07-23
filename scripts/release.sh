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
