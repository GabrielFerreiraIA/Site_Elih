# Skills Importadas para Site Elih

## Configuração de Skills Globais

Este projeto tem acesso às skills globais disponíveis em `c:\Users\gabri\.claude\skills`. Abaixo estão as skills mais relevantes para desenvolvimento deste site.

---

## 🎨 Skills de Design (PRINCIPAL)

### frontend-design
**Descrição:** Design de interfaces frontend profissional
**Localização:** `/c/Users/gabri/.agents/skills/frontend-design`
**Use para:** Componentes UI, layouts responsivos, protótipos de página

### design-system
**Descrição:** Criação e manutenção de design systems
**Localização:** `/c/Users/gabri/.agents/skills/design-system`
**Use para:** Tokens de design, paleta de cores, tipografia, componentes reutilizáveis

### liquid-glass-design
**Descrição:** Design moderno com efeitos glass morphism
**Localização:** `/c/Users/gabri/.agents/skills/liquid-glass-design`
**Use para:** Componentes com efeitos visuais modernos, glassmorphism

### frontend-patterns
**Descrição:** Padrões e melhores práticas de frontend
**Localização:** `/c/Users/gabri/.agents/skills/frontend-patterns`
**Use para:** Estrutura de componentes, arquitetura frontend

### ui-demo
**Descrição:** Demonstração de componentes UI
**Localização:** `/c/Users/gabri/.agents/skills/ui-demo`
**Use para:** Criar showcases de componentes, storybook

### brand-voice
**Descrição:** Definição de identidade visual e voz de marca
**Localização:** `/c/Users/gabri/.agents/skills/brand-voice`
**Use para:** Diretrizes de branding, tom de comunicação

---

## 💻 Skills de Desenvolvimento Web

### nextjs-turbopack
**Descrição:** Next.js com Turbopack (build rápido)
**Localização:** `/c/Users/gabri/.agents/skills/nextjs-turbopack`
**Use para:** Framework principal do site, otimização de performance

### frontend-slides
**Descrição:** Criação de slides/apresentações interativas
**Localização:** `/c/Users/gabri/.agents/skills/frontend-slides`
**Use para:** Apresentações, demo interativa

### api-design
**Descrição:** Design de APIs RESTful e consultas
**Localização:** `/c/Users/gabri/.agents/skills/api-design`
**Use para:** Endpoints, integração com backend

---

## 📊 Skills de Qualidade & Acessibilidade

### accessibility
**Descrição:** Conformidade WCAG e acessibilidade web
**Localização:** `/c/Users/gabri/.agents/skills/accessibility`
**Use para:** Testes de acessibilidade, ARIA, contraste

### e2e-testing
**Descrição:** Testes end-to-end
**Localização:** `/c/Users/gabri/.agents/skills/e2e-testing`
**Use para:** Testes Cypress/Playwright

### seo
**Descrição:** SEO e otimização de busca
**Localização:** `/c/Users/gabri/.agents/skills/seo`
**Use para:** Meta tags, estrutura semântica, performance

---

## 🚀 Skills de DevOps & Performance

### docker-patterns
**Descrição:** Containerização com Docker
**Localização:** `/c/Users/gabri/.agents/skills/docker-patterns`
**Use para:** Deploy, CI/CD

### deployment-patterns
**Descrição:** Padrões de deployment
**Localização:** `/c/Users/gabri/.agents/skills/deployment-patterns`
**Use para:** Estratégias de release, zero-downtime

---

## 📚 Como Usar as Skills

### Invocar uma Skill via Claude Code
```bash
# Usar skill diretamente no prompt
@frontend-design "Crie um componente de hero section"

# Ou via comando de skill
/skill frontend-design
```

### Verificar Disponibilidade
Todas as skills estão disponíveis como symlinks em `c:\Users\gabri\.claude\skills\`

### Documentação
Para ver documentação completa de uma skill:
```bash
cat /c/Users/gabri/.agents/skills/{skill-name}/README.md
```

---

## 🎯 Workflow Recomendado para Site Elih

1. **Planejamento Design** → Use `frontend-design` + `design-system` + `brand-voice`
2. **Desenvolvimento** → Use `nextjs-turbopack` + `frontend-patterns`
3. **Componentes Interativos** → Use `liquid-glass-design` + `ui-demo`
4. **SEO & Performance** → Use `seo` + `deployment-patterns`
5. **Acessibilidade** → Use `accessibility` + `e2e-testing`
6. **Qualidade** → Use `security-review` + `plankton-code-quality`

---

## 📦 Skills Complementares Disponíveis

Caso precise, também estão disponíveis:
- `security-review` - Análise de segurança
- `security-scan` - Varredura de vulnerabilidades
- `plankton-code-quality` - Qualidade de código
- `coding-standards` - Padrões de código
- `documentation-lookup` - Pesquisa de documentação
- `market-research` - Pesquisa de mercado (para briefing)
- `codebase-onboarding` - Onboarding do projeto

---

## ✅ Próximos Passos

1. Defina a identidade visual do site (brand-voice)
2. Crie o design system (design-system)
3. Desenvolva os componentes principais (frontend-design)
4. Implemente a estrutura Next.js (nextjs-turbopack)
5. Adicione testes e acessibilidade (accessibility + e2e-testing)
6. Otimize SEO (seo)
7. Deploy e performance (deployment-patterns)
