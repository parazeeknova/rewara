FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat openssl
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

FROM base AS deps
WORKDIR /app

COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/config/package.json ./packages/config/
COPY packages/db/package.json ./packages/db/
COPY packages/ ./packages/

COPY pnpm-lock.yaml ./

RUN pnpm install

FROM base AS builder
WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages/*/node_modules ./packages/*/node_modules

WORKDIR /app/packages/db
RUN npx prisma generate

WORKDIR /app
RUN pnpm build --filter=web...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/next.config.js ./
COPY --from=builder /app/apps/web/package.json ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

COPY --from=builder /app/packages/db/node_modules/.prisma/client ./packages/db/node_modules/.prisma/client

RUN mkdir -p .next && \
  chown nextjs:nodejs .next

USER nextjs

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
