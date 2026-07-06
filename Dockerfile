FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 5130

CMD ["pnpm", "run", "start"]
