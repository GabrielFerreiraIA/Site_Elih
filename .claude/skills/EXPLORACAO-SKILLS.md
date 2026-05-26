# 🔍 Exploração de Skills - Guia Prático

## Entendendo as Skills Locais

Você tem **10 skills principais** linkadas neste projeto. Vamos explorar cada uma!

---

## 📂 Como Ver o Conteúdo de uma Skill

```bash
# Entrar na pasta da skill
cd .claude/skills/frontend-design/

# Ver estrutura
ls -la

# Ver README (sempre começa aqui!)
cat README.md

# Ver arquivos de prompts
ls prompts/

# Ver templates
ls templates/

# Ver exemplos
ls examples/
```

---

## 🎨 Explorando: frontend-design

**O que há dentro:**
```
frontend-design/
├── README.md              ← Comece aqui!
├── manifest.yaml          ← Metadados da skill
├── prompts/               ← Prompts específicos
│   ├── wireframe.md
│   ├── responsive.md
│   └── accessibility.md
├── templates/             ← Modelos prontos
│   ├── page-template.md
│   └── component-template.md
└── examples/              ← Exemplos reais
    ├── hero-section.md
    ├── pricing-page.md
    └── contact-form.md
```

**Como usar:**
```bash
# Ver todos os exemplos disponíveis
ls .claude/skills/frontend-design/examples/

# Estudar um exemplo
cat .claude/skills/frontend-design/examples/hero-section.md

# Ver prompts recomendados
cat .claude/skills/frontend-design/prompts/wireframe.md
```

---

## 🎨 Explorando: design-system

**O que há dentro:**
```
design-system/
├── README.md
├── prompts/
│   ├── color-palette.md
│   ├── typography.md
│   ├── spacing.md
│   └── components.md
├── templates/
│   ├── token-template.md
│   └── component-spec.md
└── examples/
    ├── tailwind-config.md
    ├── color-system.md
    └── button-component.md
```

**Para começar:**
```bash
# Ver exemplo de sistema de cores
cat .claude/skills/design-system/examples/color-system.md

# Ver como estruturar componentes
cat .claude/skills/design-system/examples/button-component.md
```

---

## 💻 Explorando: nextjs-turbopack

**O que há dentro:**
```
nextjs-turbopack/
├── README.md
├── prompts/
│   ├── project-setup.md
│   ├── app-router.md
│   ├── performance.md
│   └── deployment.md
├── templates/
│   ├── next.config.js
│   ├── tsconfig.json
│   └── layout.tsx
└── examples/
    ├── hello-world-app.md
    ├── api-routes.md
    └── image-optimization.md
```

**Para começar:**
```bash
# Ver setup recomendado
cat .claude/skills/nextjs-turbopack/prompts/project-setup.md

# Ver template de layout
cat .claude/skills/nextjs-turbopack/templates/layout.tsx
```

---

## 🛠️ Explorando Qualquer Skill

### Estrutura Padrão
```
skill-name/
├── README.md                  ← SEMPRE COMECE AQUI
├── manifest.yaml              ← Metadados
├── prompts/                   ← Como usar a skill
├── templates/                 ← Modelos prontos
├── examples/                  ← Exemplos práticos
└── docs/                      ← Documentação adicional
```

### Passos para Explorar
```bash
# 1. Entre na pasta da skill
cd .claude/skills/SEU-SKILL/

# 2. Leia o README
cat README.md

# 3. Veja os prompts
ls prompts/
cat prompts/*.md

# 4. Estude os exemplos
ls examples/
cat examples/*.md

# 5. Entenda os templates
ls templates/
cat templates/*
```

---

## 🎯 Roteiro de Exploração

### Dia 1: Conhecer as Skills
```
9h:  Leia README.md de cada skill (10 min cada = 1h40)
10:45h: Explore exemplos de frontend-design (30 min)
11:15h: Explore exemplos de design-system (30 min)
12h: Comece um novo projeto!
```

### Dia 2: Começar Projeto
```
9h:  Use @brand-voice para definir identidade
11h: Use @design-system para tokens
14h: Use @frontend-design para wireframes
```

### Dia 3: Implementar
```
9h:  Use @nextjs-turbopack para setup
11h: Use @frontend-patterns para componentes
14h: Use @accessibility para validar
```

---

## 💡 Dicas de Exploração

✅ **README é sagrado** → Sempre comece lendo README.md
✅ **Exemplos são ouro** → Estude os exemplos, copie o padrão
✅ **Prompts guiam** → Leia prompts para ver como usar
✅ **Templates economizam tempo** → Use templates prontos
✅ **Combine skills** → design-system + frontend-design = sucesso

---

## 🔗 Links Rápidos para Explorar

### Design
- `.claude/skills/frontend-design/examples/`
- `.claude/skills/design-system/examples/`
- `.claude/skills/brand-voice/examples/`

### Development
- `.claude/skills/nextjs-turbopack/templates/`
- `.claude/skills/frontend-patterns/examples/`

### Quality
- `.claude/skills/accessibility/prompts/`
- `.claude/skills/seo/templates/`

---

## 🎓 Entender Metadados (manifest.yaml)

Cada skill tem um `manifest.yaml` com:

```yaml
name: frontend-design
version: 1.0.0
description: UI/UX design and prototyping
author: Anthropic

capabilities:
  - wireframing
  - responsive design
  - component design
  - user flows

tags:
  - design
  - ui
  - ux
  - frontend

prompts:
  - name: Create Wireframe
    file: prompts/wireframe.md
  - name: Responsive Design
    file: prompts/responsive.md
```

---

## 📊 Checklist de Exploração

Para cada skill:
- [ ] Leia README.md
- [ ] Veja estrutura de pastas
- [ ] Estude 2-3 exemplos
- [ ] Leia prompts recomendados
- [ ] Explore templates
- [ ] Teste com Claude Code

**Total:** ~30 min por skill = 5 horas para todas as 10

---

## 🚀 Começar Agora

### Quick Exploration (5 min)
```bash
# Ver índice
cat .claude/skills/SKILLS-INDEX.md

# Ver um exemplo
cat .claude/skills/frontend-design/examples/hero-section.md

# Pronto! Agora use:
@frontend-design Crie hero section
```

### Deep Dive (30 min por skill)
```bash
# Explorar frontend-design completamente
cd .claude/skills/frontend-design/
cat README.md
ls -la examples/
cat examples/hero-section.md
```

---

## 📝 Documento de Anotações

Enquanto explora, tome notas:

```
# Anotações de Exploração - Site Elih

## frontend-design
- Tem exemplos para: hero, pricing, contact
- Template padrão em: templates/page-template.md
- Melhor para: wireframes antes de codificar

## design-system
- Define: cores, tipografia, spacing
- Base: Tailwind CSS
- Componentes: Button, Input, Card, Badge

## nextjs-turbopack
- Setup: npm create next-app@latest
- Usar: App Router (moderno)
- Config: next.config.js

## Próximos passos
1. Criar design tokens
2. Fazer wireframe homepage
3. Setup Next.js
```

---

## ✨ Resultado Final

Após exploração completa você terá:
- ✅ Entendimento de cada skill
- ✅ Conhecimento de exemplos práticos
- ✅ Templates prontos para usar
- ✅ Confiança para começar projeto

**Tempo estimado:** 5 horas
**Resultado:** Projeto pronto para começar!

---

## 🎯 Próximo Passo Recomendado

```
1. Explore frontend-design (30 min)
2. Explore design-system (30 min)
3. Use @brand-voice (1h)
4. Use @design-system (2h)
5. Use @frontend-design (3h)
6. Comece implementação!
```

---

**Feliz explorando! 🚀**
