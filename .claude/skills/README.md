# Skills Locais do Projeto - Site Elih

## 📁 Estrutura de Skills Customizadas

Esta pasta contém skills específicas para o projeto **Site Elih**. Você pode:

1. **Copiar skills globais** para cá (se quiser versão local)
2. **Criar skills customizadas** do projeto
3. **Referenciar skills globais** (padrão - sem copiar)

---

## 🎨 Skills de Design Disponíveis Localmente

### Como Adicionar Skills Aqui

#### Opção 1: Copiar da Global (Recomendado para customização)
```bash
# Copiar frontend-design
cp -r /c/Users/gabri/.agents/skills/frontend-design ./frontend-design

# Copiar design-system
cp -r /c/Users/gabri/.agents/skills/design-system ./design-system

# Copiar nextjs-turbopack
cp -r /c/Users/gabri/.agents/skills/nextjs-turbopack ./nextjs-turbopack
```

#### Opção 2: Usar Symlinks (Recomendado para economizar espaço)
```bash
# Criar symlink para frontend-design
ln -s /c/Users/gabri/.agents/skills/frontend-design ./frontend-design

# Criar symlink para design-system
ln -s /c/Users/gabri/.agents/skills/design-system ./design-system

# Criar symlink para nextjs-turbopack
ln -s /c/Users/gabri/.agents/skills/nextjs-turbopack ./nextjs-turbopack
```

---

## 📋 Skills para Copiar/Linkar

### Design (Essencial)
- [ ] `frontend-design` - Wireframes e layouts
- [ ] `design-system` - Tokens e componentes
- [ ] `brand-voice` - Identidade visual
- [ ] `liquid-glass-design` - Efeitos modernos
- [ ] `accessibility` - WCAG compliance

### Development (Essencial)
- [ ] `nextjs-turbopack` - Framework
- [ ] `frontend-patterns` - React patterns
- [ ] `api-design` - API design

### QA & Deployment
- [ ] `e2e-testing` - Testes
- [ ] `seo` - SEO optimization
- [ ] `deployment-patterns` - Deploy
- [ ] `docker-patterns` - Containerização

---

## 🛠️ Criar Skills Customizadas

Se precisar criar uma skill específica para Site Elih:

### Estrutura de uma Skill
```
site-elih-design-tokens/
├── README.md                    # Descrição da skill
├── manifest.yaml                # Metadados
├── prompts/                     # Prompts específicos
│   ├── design-tokens.md
│   ├── color-palette.md
│   └── typography.md
├── templates/                   # Templates
│   ├── component-template.tsx
│   └── page-template.tsx
└── examples/                    # Exemplos
    ├── hero-section.md
    └── feature-card.md
```

### Exemplo: Criar Skill de Design Tokens de Site Elih
```bash
mkdir -p ./site-elih-design-tokens/{prompts,templates,examples}

# Criar README
cat > ./site-elih-design-tokens/README.md << 'EOF'
# Site Elih - Design Tokens

Skill customizada para gerenciar design tokens do projeto Site Elih.

## Capabilities
- Definir paleta de cores
- Criar escala de tipografia
- Gerar spacing tokens
- Documentar componentes base

## Usando esta skill
@site-elih-design-tokens "Crie tokens de espaçamento"
EOF
```

---

## 🔄 Próximos Passos

### Para Começar Rápido:

1. **Execute o comando abaixo** (vou fazer para você):
```bash
# Criar symlinks para as skills principais
ln -s /c/Users/gabri/.agents/skills/frontend-design ./frontend-design
ln -s /c/Users/gabri/.agents/skills/design-system ./design-system
ln -s /c/Users/gabri/.agents/skills/nextjs-turbopack ./nextjs-turbopack
ln -s /c/Users/gabri/.agents/skills/frontend-patterns ./frontend-patterns
ln -s /c/Users/gabri/.agents/skills/accessibility ./accessibility
ln -s /c/Users/gabri/.agents/skills/e2e-testing ./e2e-testing
ln -s /c/Users/gabri/.agents/skills/seo ./seo
ln -s /c/Users/gabri/.agents/skills/liquid-glass-design ./liquid-glass-design
```

2. **Usar skills localmente**:
```
@frontend-design Crie hero section
```

3. **Customizar conforme necessário**:
```bash
# Se quiser customizar frontend-design:
cp -r /c/Users/gabri/.agents/skills/frontend-design ./frontend-design-custom
# Editar ./frontend-design-custom/README.md, etc
```

---

## 📊 Visão Atual

```
.claude/skills/
├── README.md (este arquivo)
├── (vazio - aguardando criação de symlinks ou cópias)
└── (será preenchido conforme você adicionar skills)
```

---

## 💡 Recomendação

**Comece com symlinks** → São leves e refletem atualizações das skills globais
**Se precisar customizar** → Faça uma cópia local e edite

---

## 🔗 Relacionados

- [Skills Globais](../../.claude/skills/)
- [Todas as Skills Disponíveis](..\..\TODAS-SKILLS-DISPONÍVEIS.md)
- [Quick Reference](../DESIGN-SKILLS-QUICK-REF.md)
- [AIOS Integration](../AIOS-SKILLS-INTEGRATION.md)
