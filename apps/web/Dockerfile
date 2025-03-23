FROM node:20-alpine AS base

# Install necessary Alpine packages and setup pnpm
RUN apk add --no-cache libc6-compat openssl
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# -------------------------------------------------------
# DEPS STAGE: Install all dependencies
# -------------------------------------------------------
FROM base AS deps
WORKDIR /app

# Copy root config files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Create all package directories
RUN mkdir -p apps/web packages/config packages/auth packages/db packages/ui

# Copy all package.json files
COPY apps/web/package.json ./apps/web/
COPY packages/config/package.json ./packages/config/
COPY packages/auth/package.json ./packages/auth/
COPY packages/db/package.json ./packages/db/
COPY packages/ui/package.json ./packages/ui/

# Install all dependencies at workspace level
RUN pnpm install --frozen-lockfile

# -------------------------------------------------------
# BUILDER STAGE: Build the application
# -------------------------------------------------------
FROM base AS builder
WORKDIR /app

# Copy all source files
COPY . .

# Copy all node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages/config/node_modules ./packages/config/node_modules
COPY --from=deps /app/packages/auth/node_modules ./packages/auth/node_modules
COPY --from=deps /app/packages/db/node_modules ./packages/db/node_modules
COPY --from=deps /app/packages/ui/node_modules ./packages/ui/node_modules

# Explicitly install TailwindCSS in the UI package
WORKDIR /app/packages/ui
RUN pnpm install
RUN echo "Installed UI dependencies: $(ls -la node_modules | grep tailwind)"

# Generate Prisma client
WORKDIR /app/packages/db
RUN npx prisma generate

# Build the web application
WORKDIR /app
RUN pnpm build --filter=web

# -------------------------------------------------------
# DEVELOPMENT STAGE: Final development image
# -------------------------------------------------------
FROM base AS development
WORKDIR /app

# Copy the entire app with node_modules and built files
COPY --from=builder /app ./

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=development

CMD ["pnpm", "dev", "--filter=web"]
