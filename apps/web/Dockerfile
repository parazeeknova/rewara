FROM node:20-alpine

RUN apk add --no-cache libc6-compat openssl
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY . .

RUN pnpm install

WORKDIR /app/packages/db
RUN npx prisma generate

WORKDIR /app

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=development

CMD ["pnpm", "dev", "--filter=web"]
