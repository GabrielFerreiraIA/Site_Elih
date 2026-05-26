# Quick Reference - Design Skills

## 🎨 Skills de Design Principais

### 1. Frontend Design
**Skill:** `@frontend-design`
**Para:** Wireframes, layouts, componentes UI
```bash
# Exemplos de uso:
@frontend-design Crie hero section com gradiente
@frontend-design Desenhe card de produto com rating
@frontend-design Layout responsivo com menu hambúrguer
```

### 2. Design System
**Skill:** `@design-system`
**Para:** Tokens, componentes base, diretrizes
```bash
# Exemplos de uso:
@design-system Crie tokens de spacing, tipografia e cores
@design-system Defina componentes base: Button, Input, Card
@design-system Paleta de cores para seguros (confiança + modernidade)
```

### 3. Liquid Glass Design
**Skill:** `@liquid-glass-design`
**Para:** Efeitos modernos, glassmorphism
```bash
# Exemplos de uso:
@liquid-glass-design Cards com glassmorphism effect
@liquid-glass-design Floating buttons com backdrop blur
@liquid-glass-design Gradient overlays animados
```

### 4. Brand Voice
**Skill:** `@brand-voice`
**Para:** Identidade visual, tom de comunicação
```bash
# Exemplos de uso:
@brand-voice Defina identidade para marca de seguros
@brand-voice Crie guidelines de voz e tom
@brand-voice Logo concepts e variações
```

### 5. UI Demo
**Skill:** `@ui-demo`
**Para:** Showcase de componentes
```bash
# Exemplos de uso:
@ui-demo Crie Storybook para componentes
@ui-demo Dashboard com múltiplos componentes
@ui-demo Galeria de padrões de UI
```

---

## 💻 Skills de Implementação

### 6. Next.js + Turbopack
**Skill:** `@nextjs-turbopack`
**Para:** Setup e otimização do framework
```bash
# Exemplos de uso:
@nextjs-turbopack Estrutura otimizada com App Router
@nextjs-turbopack Crie layout componentes reutilizáveis
@nextjs-turbopack Configure SEO metadata
```

### 7. Frontend Patterns
**Skill:** `@frontend-patterns`
**Para:** Arquitetura, padrões React
```bash
# Exemplos de uso:
@frontend-patterns Padrão de formulário com validação
@frontend-patterns Custom hooks para state management
@frontend-patterns Component composition patterns
```

### 8. Accessibility
**Skill:** `@accessibility`
**Para:** WCAG, ARIA, contraste
```bash
# Exemplos de uso:
@accessibility Audit de acessibilidade
@accessibility Adicione ARIA labels
@accessibility Teste de contraste e keyboard navigation
```

### 9. SEO
**Skill:** `@seo`
**Para:** Meta tags, estrutura semântica
```bash
# Exemplos de uso:
@seo Meta tags para site de seguros
@seo Schema.org para empresas
@seo Sitemap e robots.txt
```

---

## 🗂️ Ordem Recomendada

```
DIA 1: DESIGN
┌─────────────────────────┐
│ @brand-voice            │ → Identidade
└─────────────────────────┘
         ↓
┌─────────────────────────┐
│ @design-system          │ → Tokens & Componentes
└─────────────────────────┘
         ↓
┌─────────────────────────┐
│ @frontend-design        │ → Wireframes & Layouts
└─────────────────────────┘
         ↓
┌─────────────────────────┐
│ @liquid-glass-design    │ → Efeitos Modernos
└─────────────────────────┘

DIA 2-3: IMPLEMENTAÇÃO
┌─────────────────────────┐
│ @nextjs-turbopack       │ → Setup Projeto
└─────────────────────────┘
         ↓
┌─────────────────────────┐
│ @frontend-patterns      │ → Componentes React
└─────────────────────────┘
         ↓
┌─────────────────────────┐
│ @ui-demo                │ → Showcase
└─────────────────────────┘

DIA 4: QUALIDADE
┌─────────────────────────┐
│ @accessibility          │ → WCAG Compliance
└─────────────────────────┘
         ↓
┌─────────────────────────┐
│ @seo                    │ → Otimização
└─────────────────────────┘
```

---

## 🎯 Atalhos Úteis

### Design System Completo
```
@design-system Crie:
- Paleta de cores (primária, secundária, neutros)
- Tipografia (headings, body, labels)
- Spacing scale (4px, 8px, 16px, 32px...)
- Componentes base: Button, Input, Card, Badge
```

### Hero Section Completo
```
@frontend-design Crie hero section:
- Headline com subtítulo
- CTA button
- Background image/gradient
- Responsivo (mobile first)
- Acessível (alt text, contraste)
```

### Página Inicial Completa
```
@frontend-design Protótipo da homepage:
1. Hero section
2. Features/benefícios (3 colunas)
3. Pricing (cards com comparison)
4. Testimonials
5. CTA final
6. Footer

Tudo responsivo e acessível
```

---

## 📝 Checklist de Design

- [ ] Brand voice definida
- [ ] Paleta de cores criada
- [ ] Tipografia selecionada
- [ ] Componentes base desenhados
- [ ] Homepage prototipada
- [ ] Páginas internas desenhadas
- [ ] Responsividade validada
- [ ] Acessibilidade verificada
- [ ] SEO otimizado
- [ ] Design system documentado

---

## 🔍 Como Procurar Skills Específicas

```bash
# Se precisa de uma skill que não lembra o nome:
ls c:\Users\gabri\.claude\skills | grep keyword

# Exemplos:
# ls c:\Users\gabri\.claude\skills | grep design
# ls c:\Users\gabri\.claude\skills | grep frontend
# ls c:\Users\gabri\.claude\skills | grep test
# ls c:\Users\gabri\.claude\skills | grep pattern
```

---

## 💡 Dicas Profissionais

✅ **Comece com brand voice** → Cria contexto visual
✅ **Use design system** → Garante consistência
✅ **Prototipe em design** → Visualize antes de codificar
✅ **Implemente em Next.js** → Otimizado e moderno
✅ **Teste acessibilidade desde o início** → Mais fácil que depois
✅ **Adicione liquid glass com cuidado** → Não abuse de efeitos

---

## 🚫 Armadilhas Comuns

❌ Pular design system → Inconsistência depois
❌ Não considerar acessibilidade → Usuários excluídos
❌ Design sem responsividade → Quebra em mobile
❌ Muitos efeitos (glassmorphism) → Fica kitsch
❌ SEO no final → Ranking ruim

---

## 📞 Precisa de Ajuda?

Se as skills não aparecem:
- Use exatamente: `@frontend-design` (com @)
- Ou invoke via comando

Se precisa de referência:
```bash
cat c:\Users\gabri\.claude\skills\frontend-design\README.md
```

Se quer listar todas:
```bash
ls c:\Users\gabri\.claude\skills | sort
```

---

**🚀 Você está pronto para criar um site profissional!**
