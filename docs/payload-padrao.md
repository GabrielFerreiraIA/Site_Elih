# Padrão de Payload — Formulário de Cotação Elih

**Arquivo de contrato:** `lib/leadPayload.ts`  
**Endpoint de envio:** `POST /api/leads`  
**Destinos:** N8N webhook + Supabase (tabela `leads`)  
**Schema inspecionado em:** 2026-06-09

---

## Visão geral do fluxo

```
[Usuário preenche o quiz]
         ↓
[FinalCTA.tsx — monta respostas + consulta CNPJ via BrasilAPI se aplicável]
         ↓
[buildLeadPayload() — lib/leadPayload.ts]
         ↓
[submitLead() → POST /api/leads]
         ↓
   ┌─────┴──────┐
   ↓            ↓
 N8N         Supabase
(payload    (colunas reais
 completo)   da tabela leads)
```

---

## Estrutura do payload enviado ao N8N

O N8N recebe o payload **completo** abaixo. Nenhuma transformação — tudo que o formulário capturou chega intacto.

```json
{
  "source": "site-elih",
  "form": "cotacao-simplificada",
  "submitted_at": "2026-06-09T14:35:00.000Z",

  "lead": {
    "nome": "João Silva",
    "telefone": "(81) 99999-8888",
    "telefone_e164": "+5581999998888",
    "whatsapp": "5581999998888"
  },

  "respostas": [
    { "campo": "tipo",             "pergunta": "Para começar, qual o seu perfil?",          "valor": "CNPJ",        "rotulo": "Empresa" },
    { "campo": "porte",            "pergunta": "Como a empresa está constituída?",           "valor": "LTDA",        "rotulo": "LTDA" },
    { "campo": "cnpj",             "pergunta": "CNPJ informado",                             "valor": "62867408000112", "rotulo": "62.867.408/0001-12" },
    { "campo": "razao_social",     "pergunta": "Razão social",                               "valor": "JOAO GABRIEL FERREIRA CORDEIRO", "rotulo": "JOAO GABRIEL FERREIRA CORDEIRO" },
    { "campo": "situacao_cadastral","pergunta": "Situação cadastral",                        "valor": "ATIVA",       "rotulo": "ATIVA" },
    { "campo": "porte_receita",    "pergunta": "Porte (Receita)",                            "valor": "MICRO EMPRESA","rotulo": "MICRO EMPRESA" },
    { "campo": "natureza_juridica","pergunta": "Natureza jurídica",                          "valor": "Empresário (Individual)", "rotulo": "Empresário (Individual)" },
    { "campo": "municipio_uf",     "pergunta": "Município/UF",                               "valor": "RECIFE/PE",   "rotulo": "RECIFE/PE" },
    { "campo": "cnae",             "pergunta": "Atividade (CNAE)",                           "valor": "Comércio varejista...", "rotulo": "Comércio varejista..." },
    { "campo": "regiao",           "pergunta": "Em qual região você está?",                  "valor": "NE",          "rotulo": "Nordeste" },
    { "campo": "vidas_total",      "pergunta": "Total de vidas",                             "valor": "5",           "rotulo": "5 vidas" },
    { "campo": "vidas_19-28",      "pergunta": "Vidas 19 – 28 anos",                         "valor": "3",           "rotulo": "3 vidas" },
    { "campo": "vidas_29-38",      "pergunta": "Vidas 29 – 38 anos",                         "valor": "2",           "rotulo": "2 vidas" },
    { "campo": "hospital",         "pergunta": "Tem preferência por hospital ou rede?",      "valor": "NAO",         "rotulo": "Quero o melhor custo-benefício" },
    { "campo": "tem_plano",        "pergunta": "Você tem plano de saúde hoje?",              "valor": "SIM",         "rotulo": "Sim, já tenho" },
    { "campo": "valor",            "pergunta": "Quanto você investe no plano de saúde hoje?","valor": "500-1000",    "rotulo": "R$ 500 a R$ 1.000" }
  ],

  "resumo": {
    "tipo":               "CNPJ",
    "porte":              "LTDA",
    "cnpj":               "62867408000112",
    "razao_social":       "JOAO GABRIEL FERREIRA CORDEIRO",
    "situacao_cadastral": "ATIVA",
    "porte_receita":      "MICRO EMPRESA",
    "natureza_juridica":  "Empresário (Individual)",
    "municipio_uf":       "RECIFE/PE",
    "cnae":               "Comércio varejista...",
    "regiao":             "NE",
    "vidas_total":        "5",
    "hospital":           "NAO",
    "tem_plano":          "SIM",
    "valor":              "500-1000"
  },

  "meta": {
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
    "pagina":     "https://www.elihseguros.com.br/",
    "referrer":   "https://www.google.com/"
  }
}
```

---

## Origem de cada campo do `resumo`

### Campos universais (todos os leads)
| `campo` | Aparece quando | Valores possíveis |
|---|---|---|
| `tipo` | Sempre | `CPF` \| `CNPJ` |
| `regiao` | Sempre | `N` \| `NE` \| `CO` \| `SE` \| `S` |
| `hospital` | Sempre | `SIM` \| `NAO` |
| `tem_plano` | Sempre | `SIM` \| `NAO` |
| `valor` | Apenas quando `tem_plano = SIM` | `0-500` \| `500-1000` \| `1000-2000` \| `2000+` |

### Campos exclusivos CPF
| `campo` | Aparece quando | Valores possíveis |
|---|---|---|
| `plano` | `tipo = CPF` | `INDIVIDUAL` \| `FAMILIAR` |
| `idade` | `tipo = CPF` + `plano = INDIVIDUAL` | `0-18` \| `19-28` \| `29-38` \| `39-48` \| `49-58` \| `59+` |
| `vidas_total` | `tipo = CPF` + `plano = FAMILIAR` | Número inteiro (string) |
| `vidas_{faixa}` | `tipo = CPF` + `plano = FAMILIAR` | Ex: `vidas_19-28`, `vidas_59+` |

### Campos exclusivos CNPJ — formulário
| `campo` | Aparece quando | Valores possíveis |
|---|---|---|
| `porte` | `tipo = CNPJ` | `MEI` \| `ME_EPP` \| `LTDA` \| `SA` |
| `vidas_total` | `tipo = CNPJ` | Total de funcionários no plano |
| `vidas_{faixa}` | `tipo = CNPJ` | Funcionários por faixa etária |

### Campos CNPJ — enriquecimento automático via BrasilAPI ⚡
> Preenchidos **automaticamente** quando o usuário digita um CNPJ válido no formulário.

| `campo` | BrasilAPI → campo original | Exemplo |
|---|---|---|
| `cnpj` | (normalizado pelo form) | `62867408000112` |
| `razao_social` | `razao_social` | `JOAO GABRIEL FERREIRA CORDEIRO` |
| `situacao_cadastral` | `descricao_situacao_cadastral` | `ATIVA` |
| `porte_receita` | `porte` | `MICRO EMPRESA` |
| `natureza_juridica` | `natureza_juridica` | `Empresário (Individual)` |
| `municipio_uf` | `municipio` + `uf` | `RECIFE/PE` |
| `cnae` | `cnae_fiscal_descricao` | `Comércio varejista...` |

### Campos `meta`
| Campo | Origem |
|---|---|
| `user_agent` | `navigator.userAgent` |
| `pagina` | `window.location.href` |
| `referrer` | `document.referrer` |

---

## Mapeamento payload → Supabase (nomes reais das colunas)

> Schema inspecionado diretamente via API em 2026-06-09.  
> Colunas marcadas com ✦ já existiam antes desta migration; demais foram adicionadas.

| Coluna Supabase (`leads`) | Origem no payload | Nota |
|---|---|---|
| `nome` ✦ | `lead.nome` | |
| `telefone` ✦ | `lead.telefone` | |
| `whatsapp` | `lead.whatsapp` | |
| `telefone_normalizado` ✦ | `lead.whatsapp` | Coluna existente reutilizada |
| `source` ✦ | `source` | Fixo: `"site-elih"` |
| `form` | `form` | Fixo: `"cotacao-simplificada"` |
| `submitted_at` | `submitted_at` | ISO 8601 UTC |
| `status` ✦ | — | Fixo: `"Novo"` |
| `tipo_contrato` ✦ | `resumo.tipo` | `CPF` ou `CNPJ` |
| `regiao` ✦ | `resumo.regiao` | |
| `preferencia_hospital` ✦ | `resumo.hospital` | |
| `tem_plano` | `resumo.tem_plano` | |
| `valor_faixa` ✦ | `resumo.valor` | Faixa do plano atual |
| `plano_tipo` ✦ | `resumo.plano` | Só CPF: INDIVIDUAL\|FAMILIAR |
| `faixa_etaria` ✦ | `resumo.idade` | Só CPF Individual |
| `vidas` ✦ | `resumo.vidas_total` | Só CPF — beneficiários |
| `empresa` ✦ | `resumo.razao_social` | Nome da empresa (CPF = null) |
| `porte_empresa` | `resumo.porte` | Só CNPJ: MEI\|ME_EPP\|LTDA\|SA |
| `funcionarios` | `resumo.vidas_total` | Só CNPJ — funcionários no plano |
| `cnpj` ✦ | `resumo.cnpj` | Só se CNPJ foi digitado |
| `razao_social` | `resumo.razao_social` | ⚡ BrasilAPI |
| `situacao_cadastral` | `resumo.situacao_cadastral` | ⚡ BrasilAPI |
| `porte_receita` | `resumo.porte_receita` | ⚡ BrasilAPI |
| `natureza_juridica` | `resumo.natureza_juridica` | ⚡ BrasilAPI |
| `municipio_uf` | `resumo.municipio_uf` | ⚡ BrasilAPI |
| `cnae` | `resumo.cnae` | ⚡ BrasilAPI |
| `device` ✦ | `meta.user_agent` | Browser/SO |
| `pagina` | `meta.pagina` | URL da página |
| `referrer` | `meta.referrer` | Canal de aquisição |
| `webhook_payload` ✦ | payload completo | jsonb — auditoria/reprocessamento |

---

## Separação `vidas` × `funcionarios`

| Coluna | Quem preenche | O que representa |
|---|---|---|
| `vidas` | Somente `tipo = CPF` | Beneficiários do plano familiar |
| `funcionarios` | Somente `tipo = CNPJ` | Funcionários que entrarão no plano empresarial |

Ambas leem `resumo.vidas_total`; a rota mapeia para colunas distintas com base em `resumo.tipo`, evitando conflito com a pergunta de vidas do quiz.

No N8N, `vidas_total` chega sempre com esse nome — usar `tipo` para interpretar o contexto.

---

## Atualizar este documento

Ao adicionar perguntas ao quiz ou modificar `lib/leadPayload.ts`:
1. Adicionar à tabela "Origem de cada campo".
2. Adicionar à tabela "Mapeamento Supabase".
3. Rodar `ALTER TABLE leads ADD COLUMN IF NOT EXISTS ...` via API.
4. Atualizar `docs/crm-campos.md` com o novo campo.
