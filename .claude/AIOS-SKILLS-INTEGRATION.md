# AIOS Skills Integration - Site Elih

## 🔗 Integração com Synkra AIOS

Este documento explica como usar as **200+ skills globais** dentro do framework **Synkra AIOS**.

---

## 📋 Mapeamento AIOS ↔ Skills

### Agent: @sm (Story Manager)
**Responsável:** Criar histórias de design/desenvolvimento
**Skills Recomendadas:**
```yaml
# Para criar stories de design
- @frontend-design      # Visualizar requisitos de UI/UX
- @design-system        # Entender componentes base
- @accessibility        # Incluir requisitos WCAG
```

**Exemplo de Story:**
```markdown
# Story 1.1: Homepage Design

Descrição: Criar design da página inicial para Elih Seguros

Acceptance Criteria:
- Hero section com CTA
- Features section (3 colunas)
- Testimonials
- Newsletter signup
- Footer com links

Skills Envolvidas:
- @frontend-design
- @brand-voice
- @design-system
```

---

### Agent: @po (Product Owner)
**Responsável:** Validar stories
**Skills Recomendadas:**
```yaml
# Para validar requisitos
- @design-system        # Verificar consistência
- @product-lens         # Perspectiva de usuário
- @seo                  # Verificar SEO requirements
```

**Checklist de Validação:**
```
[ ] Design está no brand guidelines
[ ] Acessibilidade considerada
[ ] SEO otimizado
[ ] Responsivo (mobile first)
[ ] Performance aceitável
```

---

### Agent: @dev (Developer)
**Responsável:** Implementar stories
**Skills Recomendadas:**
```yaml
# Para implementação
- @nextjs-turbopack     # Setup e build
- @frontend-patterns    # React patterns
- @frontend-design      # Referência visual
- @api-design           # Se houver backend
```

**Exemplo de Task:**
```markdown
# Task: Implementar Hero Section

Input: Design da story 1.1
Output: Componente React renderizável

Steps:
1. @nextjs-turbopack - Setup estrutura
2. @frontend-design - Referência visual
3. @frontend-patterns - Implementar padrões
4. Tailwind CSS - Styling
5. Responsividade - Mobile first
```

---

### Agent: @qa (QA/Testing)
**Responsável:** Testes e quality gate
**Skills Recomendadas:**
```yaml
# Para testes
- @accessibility        # WCAG audit
- @e2e-testing          # Testes Cypress
- @seo                  # Validar meta tags
- @browser-qa           # Testes visuais
```

**Checklist de QA:**
```
[ ] Acessibilidade (WCAG AA)
[ ] Responsividade (mobile, tablet, desktop)
[ ] Performance (Lighthouse > 90)
[ ] SEO (meta tags, schema)
[ ] Cross-browser (Chrome, Firefox, Safari)
[ ] Testes E2E passando
```

---

### Agent: @architect (System Design)
**Responsável:** Decisões arquiteturais
**Skills Recomendadas:**
```yaml
# Para arquitetura
- @design-system        # Sistema de tokens
- @frontend-patterns    # Padrões React
- @nextjs-turbopack     # Framework choice
- @deployment-patterns  # Deploy strategy
```

**Exemplo de Decision Record:**
```markdown
# ADR-001: Choice of Frontend Framework

**Decision:** Next.js com Turbopack
**Rationale:** 
- Otimizado para performance
- Built-in SEO
- API routes para backend
- Image optimization

Skills que apoiam:
- @nextjs-turbopack
- @deployment-patterns
```

---

### Agent: @devops (Deployment)
**Responsável:** Deploy e CI/CD
**Skills Recomendadas:**
```yaml
# Para deployment
- @docker-patterns      # Containerização
- @deployment-patterns  # CI/CD strategy
- @github-ops           # GitHub Actions
```

---

## 🎯 WORKFLOW: Story Development Cycle com Skills

```
┌─────────────────────────────────────────┐
│ 1. CREATE STORY (@sm)                   │
│   - Use @frontend-design para visualizar│
│   - Use @brand-voice para contexto      │
│   - Use @accessibility para requisitos  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 2. VALIDATE STORY (@po)                 │
│   - @design-system → consistência       │
│   - @product-lens → business value      │
│   - @seo → SEO reqs                    │
│   Result: GO / NO-GO                    │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 3. IMPLEMENT (@dev)                     │
│   Phase 1: Setup                        │
│   → @nextjs-turbopack                   │
│                                         │
│   Phase 2: Components                   │
│   → @frontend-patterns                  │
│   → @frontend-design (referência)       │
│                                         │
│   Phase 3: Styling                      │
│   → @design-system (tokens)             │
│   → @liquid-glass-design (efeitos)      │
│                                         │
│   Phase 4: CodeRabbit Review            │
│   → Auto-fix CRITICAL/HIGH              │
│   Max 2 iterações                       │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 4. QA GATE (@qa)                        │
│   - @accessibility → WCAG audit         │
│   - @e2e-testing → Testes               │
│   - @seo → Meta tags                   │
│   - @browser-qa → Visual                │
│   Result: PASS / CONCERNS / FAIL        │
│   (Max 5 iterações de revisão)          │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 5. DEPLOY (@devops)                     │
│   - @docker-patterns → Build            │
│   - @deployment-patterns → Release      │
│   - @github-ops → CI/CD                 │
│   Status: Done                          │
└─────────────────────────────────────────┘
```

---

## 📊 Exemplo Real: Story Completa

### Story 1.1: Implementar Hero Section

```markdown
---
id: 1.1
title: Hero Section - Homepage
status: Draft
---

## Description
Criar hero section responsivo com CTA para homepage de Elih Seguros.

## Acceptance Criteria
- [ ] Visualmente conforme design
- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Acessível (WCAG AA)
- [ ] Otimizado para SEO
- [ ] Testes E2E passando
- [ ] Lighthouse > 90

## Skills Utilizadas
- `@brand-voice` - Contexto visual
- `@frontend-design` - Referência
- `@design-system` - Tokens
- `@nextjs-turbopack` - Setup
- `@frontend-patterns` - Componentes
- `@liquid-glass-design` - Efeitos
- `@accessibility` - WCAG
- `@e2e-testing` - Testes
- `@seo` - Meta tags

## Workflow

### Phase 1: CREATE (@sm)
```bash
# Story criada
status: Draft

# Using @brand-voice
Color: Blue (#0066FF)
Font: Poppins Bold

# Using @frontend-design
Layout: Hero with CTA button, background image
```

### Phase 2: VALIDATE (@po)
```
✓ Critério de aceitação claro
✓ Alinhado com PRD
✓ Acessibilidade considerada
✓ SEO planning presente

Result: GO → Status: Ready
```

### Phase 3: IMPLEMENT (@dev)

#### Subtask 3.1: Setup
```bash
@nextjs-turbopack
- Create app/page.tsx
- Configure next.config.js
- Setup Tailwind
```

#### Subtask 3.2: Component
```bash
@frontend-patterns
- Create HeroSection component
- Props: title, subtitle, ctaText, bgImage
- Responsive breakpoints
```

#### Subtask 3.3: Design System
```bash
@design-system
- Use color tokens (primary-600)
- Font sizes from scale
- Spacing (gap-4, gap-8)
- Border radius (rounded-lg)
```

#### Subtask 3.4: Effects
```bash
@liquid-glass-design
- Add gradient overlay
- Subtle animation on scroll
- Glassmorphism on CTA button
```

#### Subtask 3.5: Accessibility
```bash
@accessibility
- Add semantic HTML
- ARIA labels
- Color contrast check
- Keyboard navigation
```

#### Subtask 3.6: CodeRabbit
```
Auto-fix CRITICAL/HIGH (max 2 iterations)
```

Status: InProgress → InReview

### Phase 4: QA GATE (@qa)

#### Check 1: Accessibility (@accessibility)
```
[ ] WCAG AA passed
[ ] Lighthouse >= 95
```

#### Check 2: E2E Tests (@e2e-testing)
```
[ ] Click CTA button
[ ] Navigate to pricing
[ ] All tests passing
```

#### Check 3: SEO (@seo)
```
[ ] Meta description
[ ] H1 tag
[ ] Image alt text
```

#### Check 4: Visual (@browser-qa)
```
[ ] Chrome
[ ] Firefox
[ ] Safari
[ ] Mobile Safari
```

Result: PASS → Status: InReview

### Phase 5: DEPLOY (@devops)
```
@docker-patterns
@deployment-patterns
@github-ops

Status: Done
```

## File List
- [ ] app/components/HeroSection.tsx
- [ ] app/page.tsx (updated)
- [ ] styles/hero.module.css (Tailwind)
- [ ] __tests__/HeroSection.e2e.ts
- [ ] public/hero-bg.jpg

## Change Log
- 2026-05-25: Story created
- 2026-05-25: Validated by @po (GO)
- 2026-05-26: Implemented by @dev
- 2026-05-26: Approved by @qa
- 2026-05-26: Deployed by @devops
```

---

## 🎓 Uso de Skills em Agent Commands

### Command: *develop

```bash
# Quando @dev inicia desenvolvimento
*develop story=1.1

# Sistema automaticamente:
1. Carrega story 1.1
2. Identifica skills: @nextjs-turbopack, @frontend-patterns
3. Oferece contexto de design (@frontend-design)
4. Prepara environment
```

### Command: *qa-gate

```bash
# Quando @qa inicia review
*qa-gate story=1.1

# Sistema automaticamente:
1. Executa @accessibility check
2. Executa @e2e-testing
3. Executa @seo validation
4. Genera relatório
```

### Command: *coderabbit-review

```bash
# Autofix CodeRabbit (faz parte de @dev workflow)
*coderabbit-review mode=self-healing max_iterations=2 severity=CRITICAL,HIGH
```

---

## 🛠️ Extensões & Customização

### Adicionar skill nova ao projeto

```bash
# 1. Copiar para projeto (opcional)
cp -r /c/Users/gabri/.agents/skills/nova-skill ./.claude/skills/

# 2. Referenciar em settings.json
{
  "skills": {
    "custom": ["nova-skill"]
  }
}

# 3. Usar em story
Skills Utilizadas:
- `@nova-skill`
```

### Criar skill própria (avançado)

```bash
# Estrutura
./.claude/skills/meu-skill/
├── README.md
├── manifest.yaml
├── prompts/
│   ├── design.md
│   └── implementation.md
└── examples/
    └── hero-section.md
```

---

## 📈 Métricas de Qualidade

### Por Agent (@dev)

```yaml
developer:
  avg_time_per_story: 4h
  quality_gates_passed: 95%
  coderabbit_fixes_iteration_1: 85%
  
skills_used:
  - @nextjs-turbopack: 40h
  - @frontend-patterns: 30h
  - @frontend-design: 20h
```

### Por Skill

```yaml
skills:
  frontend-design:
    usage_count: 25
    quality_impact: "High"
    time_saved: "20h"
    
  accessibility:
    audits_passed: 23/25 (92%)
    wcag_issues_fixed: 8
```

---

## 🚀 Checklist: Pronto para Começar

- [x] Skills importadas (200+)
- [x] Documentação criada
- [x] AIOS integration mapped
- [x] Exemplos reais
- [ ] **Escolher 1ª story**
- [ ] **Executar Phase 1 (@sm)**
- [ ] **Executar Phase 2 (@po)**
- [ ] **Iniciar implementação (@dev)**

---

**Localização dos Documentos:**
- Configuração: `.\.claude\settings.json`
- Quick Ref: `.\.claude\DESIGN-SKILLS-QUICK-REF.md`
- Todas Skills: `.\.claude\TODAS-SKILLS-DISPONÍVEIS.md`
- Setup: `.\SKILLS-SETUP.md`

**Framework AIOS:** Synkra AIOS v2.0
**Skills Source:** `c:\Users\gabri\.claude\skills\`
