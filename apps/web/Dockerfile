FROM node:20-alpine AS base

# Install system dependencies
RUN apk add --no-cache libc6-compat openssl
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Install dependencies
FROM base AS deps
WORKDIR /app

# Copy all workspace configuration files
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/config/package.json ./packages/config/
COPY packages/db/package.json ./packages/db/

# Copy the entire packages directory because we need the source files
COPY packages/ ./packages/

# Copy lockfile
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Builder
FROM base AS builder
WORKDIR /app

# Copy all source files
COPY . .

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages/*/node_modules ./packages/*/node_modules

# Generate Prisma Client
WORKDIR /app/packages/db
RUN npx prisma generate

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

# Copy Prisma generated files (updated path)
COPY --from=builder /app/packages/db/node_modules/.prisma/client ./packages/db/node_modules/.prisma/client

# Set permissions
RUN mkdir -p .next && \
  chown nextjs:nodejs .next

USER nextjs

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
