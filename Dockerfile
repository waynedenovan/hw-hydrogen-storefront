FROM node:22-alpine AS build
WORKDIR /app
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

# `pnpm run start` runs `tsx server.ts` directly in production (see
# server.ts) rather than executing a pre-compiled bundle, so tsx — and the
# server-side source it resolves at runtime (server.ts, app/lib/context.ts
# and its imports, via the `~/*` tsconfig path alias) — must be present in
# this image, not just the react-router build output in dist/. tsx lives in
# "dependencies" in package.json for exactly this reason, so a plain
# `pnpm install --frozen-lockfile` here (no --prod) still gets it.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY server.ts tsconfig.json react-router.config.ts ./
COPY app ./app

EXPOSE 5130

USER node

CMD ["pnpm", "run", "start"]
