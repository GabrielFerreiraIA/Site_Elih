# Elih Seguros — Landing Page

Landing institucional premium B2B para Elih Seguros, corretora/consultoria de planos de saúde corporativos, odonto empresarial e seguro de vida coletivo.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 3.4** com paleta Elih em `tailwind.config.ts`
- **Framer Motion 11** para animações sutis
- **Lucide React** para ícones
- Fontes **Inter** + **Space Grotesk** via `next/font`

## Rodar localmente

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — dev server com hot reload
- `npm run build` — build de produção
- `npm run start` — servir build
- `npm run lint` — ESLint

## Estrutura

```
app/
├── layout.tsx              ← fontes + metadata SEO
├── page.tsx                ← landing (importa seções)
├── globals.css             ← Tailwind + tokens custom + keyframes
└── components/
    ├── Navbar.tsx
    ├── Footer.tsx
    ├── sections/           ← 7 seções da landing
    └── primitives/         ← GlassPanel, botões, Overline, etc

lib/
└── tokens.ts               ← cores e motion variants em TS

Referencias Visuais/        ← mockups das 5 seções principais (PNG)
volta-ev.aura.build/        ← design system de referência (HTML)
```

## Design Tokens

Paleta dark/executive (obsidian, corp-navy, graphite, platinum) e light/clinical (pristine, clinical, soft-slate) definidos em `tailwind.config.ts` e replicados em `lib/tokens.ts` para uso em código TS.

## Status (fases)

- [x] **Fase A** — Foundation: setup, tokens, Navbar, Footer
- [x] **Fase B** — Hero (split-screen, glass panel com microdados, CTAs)
- [x] **Fase C** — Trust Bar (marquee monocromático) + Método Elih (3 colunas)
- [x] **Fase D** — Cobertura Nacional (mapa SVG do Brasil) + Soluções (3 abas com AnimatePresence)
- [x] **Fase E** — Provas & Métricas (depoimento + grid 4 KPIs) + Final CTA (formulário consultivo)
- [x] **Fase F** — Build de produção validado: zero erros TS/ESLint, 4 páginas estáticas, 154kB First Load JS

## TODOs para próxima rodada

- Substituir `PhotoPlaceholder` por fotos reais corporativas em `public/img/`
- Trocar nomes-texto das operadoras por SVGs reais (após autorização)
- Integrar formulário do `FinalCTA` com backend (CRM / e-mail / WhatsApp)
- Adicionar páginas internas: Sobre, detalhes por Solução, LGPD
- Configurar analytics (GA4 / GTM)
- Deploy em Vercel ou Netlify
