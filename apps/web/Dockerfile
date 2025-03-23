FROM node:20-alpine AS base

# Install system dependencies
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Install dependencies
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/*/package.json ./packages/*/

# Copy lockfile
COPY pnpm-lock.yaml ./

RUN pnpm install

# Builder
FROM base AS builder
WORKDIR /app

# Copy all files
COPY . .

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages/*/node_modules ./packages/*/node_modules

# Generate Prisma Client
WORKDIR /app/packages/db
RUN pnpm prisma generate

# Build the app
WORKDIR /app
RUN pnpm build --filter=web...

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/apps/web/next.config.js ./
COPY --from=builder /app/apps/web/package.json ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Set permissions
RUN mkdir .next && \
  chown nextjs:nodejs .next

USER nextjs

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
