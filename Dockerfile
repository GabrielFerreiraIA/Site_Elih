# ──────────────────────────────────────────────────────────────────────────────
# Elih Seguros — Dockerfile multi-stage (Next.js standalone)
#
# Stages:
#   1. deps     — instala dependências de produção + desenvolvimento
#   2. builder  — compila o projeto (next build)
#   3. runner   — imagem final mínima (~200 MB) com apenas o necessário
#
# Build:
#   docker build -t elih-site .
#
# Run local:
#   docker run -p 3000:3000 --env-file .env.local elih-site
# ──────────────────────────────────────────────────────────────────────────────

FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ── Builder ───────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Variáveis de build (sem segredos — só NEXT_PUBLIC_* se precisar)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ── Runner ────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Usuário não-root por segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Arquivos públicos e estáticos gerados
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
