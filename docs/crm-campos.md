# Guia de Campos CRM — Leads e Clientes

> Schema inspecionado diretamente no Supabase em **2026-06-09**.  
> Todos os campos listados já existem nas tabelas `leads` e `clientes`.

---

## Legenda de origens

| Ícone | Significado |
|---|---|
| 🌐 **Site** | Preenchido pelo próprio lead no formulário |
| 🤖 **IA via CNPJ** | Buscado automaticamente pela integração BrasilAPI/Receita Federal quando o lead informou o CNPJ. O consultor **não precisa preencher**. |
| 👤 **Manual** | Preenchido pelo consultor no CRM |
| 🔧 **Sistema** | Gerado automaticamente (datas, IDs, etc.) |
| ✦ | Coluna que já existia antes da migration de 2026-06-09 |

---

## Ficha de Lead — tabela `leads`

### Seção 1 — Identificação e Contato

| Campo CRM | Coluna Supabase | Origem | Obs. |
|---|---|---|---|
| Nome | `nome` ✦ | 🌐 Site | Obrigatório |
| E-mail | `email` ✦ | 👤 Manual | Coletado durante o processo comercial |
| Telefone | `telefone` ✦ | 🌐 Site | Formato `(XX) XXXXX-XXXX` |
| WhatsApp | `whatsapp` | 🌐 Site | Somente dígitos + DDI: `5581999998888` |
| Telefone normalizado | `telefone_normalizado` ✦ | 🌐 Site | Mesmo valor do WhatsApp (Evolution API) |

### Seção 2 — Origem e Rastreamento

| Campo CRM | Coluna Supabase | Origem | Obs. |
|---|---|---|---|
| Origem | `source` ✦ | 🔧 Sistema | Fixo: `"site-elih"` |
| Formulário | `form` | 🔧 Sistema | Fixo: `"cotacao-simplificada"` |
| Data de envio | `submitted_at` | 🔧 Sistema | Quando o form foi submetido (ISO UTC) |
| Data de cadastro | `created_at` ✦ | 🔧 Sistema | Inserção automática no banco |
| Status | `status` ✦ | 🔧/👤 Sistema + Manual | Inicial: `"Novo"` |
| Responsável | `responsavel_id` ✦ | 👤 Manual | FK para tabela `profiles` |
| Pipeline | `pipeline_id` ✦ | 👤 Manual | FK para `pipelines` |
| Etapa | `stage_id` ✦ | 👤 Manual | FK para `pipeline_stages` |
| Página de origem | `pagina` | 🔧 Sistema | URL completa da landing page |
| Referrer | `referrer` | 🔧 Sistema | Canal de aquisição (Google, direto, etc.) |
| Dispositivo | `device` ✦ | 🔧 Sistema | User-Agent: browser e SO |
| Payload completo | `webhook_payload` ✦ | 🔧 Sistema | JSON bruto para auditoria/reprocessamento |
| Último contato | `last_message_at` ✦ | 🔧 Sistema | Atualizado pela integração de WhatsApp |

> **Status sugerido:** `Novo` → `Em contato` → `Proposta enviada` → `Convertido` / `Perdido`

### Seção 3 — Perfil do Quiz (todos os leads)

| Campo CRM | Coluna Supabase | Origem | Valores |
|---|---|---|---|
| Tipo de cliente | `tipo_contrato` ✦ | 🌐 Site | `CPF` (Pessoa Física) \| `CNPJ` (Empresa) |
| Região | `regiao` ✦ | 🌐 Site | `N` \| `NE` \| `CO` \| `SE` \| `S` |
| Preferência de hospital | `preferencia_hospital` ✦ | 🌐 Site | `SIM` \| `NAO` |
| Já tem plano? | `tem_plano` | 🌐 Site | `SIM` \| `NAO` |
| Faixa do plano atual | `valor_faixa` ✦ | 🌐 Site | `0-500` \| `500-1000` \| `1000-2000` \| `2000+` |

> `valor_faixa` só é preenchido quando `tem_plano = SIM`.

### Seção 4A — Pessoa Física (apenas `tipo_contrato = CPF`)

| Campo CRM | Coluna Supabase | Origem | Valores |
|---|---|---|---|
| Tipo de plano | `plano_tipo` ✦ | 🌐 Site | `INDIVIDUAL` \| `FAMILIAR` |
| Faixa etária | `faixa_etaria` ✦ | 🌐 Site | `0-18` \| `19-28` \| `29-38` \| `39-48` \| `49-58` \| `59+` |
| Nº de vidas | `vidas` ✦ | 🌐 Site | Inteiro — total de beneficiários (só Familiar) |

### Seção 4B — Empresa (apenas `tipo_contrato = CNPJ`)

#### 4B.1 — Informado pelo lead no formulário

| Campo CRM | Coluna Supabase | Origem | Valores |
|---|---|---|---|
| Empresa | `empresa` ✦ | 🌐 Site / 🤖 IA | Nome da empresa (razão social se veio do CNPJ) |
| Constituição | `porte_empresa` | 🌐 Site | `MEI` \| `ME_EPP` \| `LTDA` \| `SA` |
| Funcionários no plano | `funcionarios` | 🌐 Site | Inteiro — total por faixas etárias |

#### 4B.2 — Dados enriquecidos via CNPJ ⚡

> 🤖 **Preenchidos automaticamente pela IA** quando o lead informa o CNPJ no formulário.  
> Fonte: **BrasilAPI → Receita Federal**, consultada em tempo real.  
> O consultor **não precisa preencher** — pode corrigir se detectar divergência.

| Campo CRM | Coluna Supabase | O que é | Exemplo |
|---|---|---|---|
| CNPJ | `cnpj` ✦ | Número do CNPJ (somente dígitos) | `62867408000112` |
| Razão Social | `razao_social` | Nome oficial na Receita | `JOAO GABRIEL FERREIRA CORDEIRO` |
| Situação Cadastral | `situacao_cadastral` | Status atual | `ATIVA` |
| Porte (Receita) | `porte_receita` | Classificação oficial | `MICRO EMPRESA` |
| Natureza Jurídica | `natureza_juridica` | Tipo societário | `Empresário (Individual)` |
| Município/UF | `municipio_uf` | Sede da empresa | `RECIFE/PE` |
| Atividade (CNAE) | `cnae` | Atividade econômica principal | `Comércio varejista de equip...` |

> 💡 Com esses dados, o consultor já sabe antes da primeira ligação: porte real, se é MEI/Simples, cidade e segmento — sem precisar perguntar.

---

## Ficha de Cliente — tabela `clientes`

A ficha de cliente herda o contexto do lead e adiciona campos do processo comercial e do plano contratado.

### Campos já existentes no schema (✦)

| Campo | Coluna | Obs. |
|---|---|---|
| ID | `id` ✦ | UUID gerado automaticamente |
| Lead de origem | `lead_id` ✦ | FK → `leads.id` — rastreia de qual lead virou cliente |
| Empresa (company) | `company_id` ✦ | FK → `company.id` |
| Responsável | `responsavel_id` ✦ | FK → perfil do consultor |
| Criado por | `created_by` ✦ | FK → perfil do usuário |
| Nome | `nome` ✦ | |
| E-mail | `email` ✦ | |
| Telefone | `telefone` ✦ | |
| CPF | `cpf` ✦ | |
| Data de nascimento | `data_nascimento` ✦ | |
| Gênero | `genero` ✦ | |
| Cidade | `cidade` ✦ | |
| Estado | `estado` ✦ | |
| CNPJ | `cnpj` ✦ | |
| Razão Social | `razao_social` ✦ | |
| Plano nome | `plano_nome` ✦ | Plano contratado |
| Plano tipo | `plano_tipo` ✦ | Tipo/categoria do plano |
| Plano operadora | `plano_operadora` ✦ | |
| Plano número | `plano_numero` ✦ | Número da apólice |
| Plano categoria | `plano_categoria` ✦ | |
| Plano início | `plano_inicio` ✦ | Data de vigência |
| Plano vencimento | `plano_vencimento` ✦ | |
| Plano valor | `plano_valor` ✦ | Valor mensal em R$ |
| Plano registro ANS | `plano_registro_ans` ✦ | Número do registro na ANS |
| Plano segmentação | `plano_segmentacao` ✦ | |
| Plano acomodação | `plano_acomodacao` ✦ | |
| Plano abrangência | `plano_abrangencia` ✦ | |
| Plano anterior | `plano_anterior` ✦ | Plano que tinha antes |
| Nº de vidas | `vidas` ✦ | Default 1 |
| Data da venda | `data_venda` ✦ | Default: data atual |
| Origem | `origem` ✦ | Canal de origem |
| Status | `status` ✦ | Default: `"ativo"` |
| Notas | `notas` ✦ | Texto livre |
| Tags | `tags` ✦ | Array de texto |
| Data de cadastro | `created_at` ✦ | |
| Última atualização | `updated_at` ✦ | |
| Endereço completo | `endereco`, `endereco_numero`, `bairro`, `cep` ✦ | |
| RG | `rg` ✦ | |
| Nome da mãe/pai | `nome_mae`, `nome_pai` ✦ | |
| Peso / Altura | `peso`, `altura` ✦ | |
| CNH | `cnh_categoria`, `cnh_validade` ✦ | |
| Estado civil | `estado_civil` ✦ | |
| Cônjuge | `conjuge` ✦ | |

### Campos adicionados na migration 2026-06-09

| Campo | Coluna | Origem | Obs. |
|---|---|---|---|
| WhatsApp | `whatsapp` | 🌐 Site | |
| Formulário | `form` | 🔧 Sistema | |
| Data envio form | `submitted_at` | 🔧 Sistema | Quando preencheu o form |
| Tipo de cliente | `tipo_cliente` | 🌐 Site | `CPF` \| `CNPJ` |
| Região | `regiao` | 🌐 Site | |
| Tinha plano? | `tinha_plano` | 🌐 Site | Histórico — `SIM` \| `NAO` |
| Valor plano antigo | `valor_plano_antigo` | 🌐 Site | Faixa antes de contratar Elih |
| Plano modalidade | `plano_modalidade` | 🌐 Site | `INDIVIDUAL` \| `FAMILIAR` |
| Faixa etária | `faixa_etaria` | 🌐 Site | Só CPF Individual |
| Constituição empresa | `porte_empresa` | 🌐 Site | `MEI`\|`ME_EPP`\|`LTDA`\|`SA` |
| Funcionários | `funcionarios` | 🌐 Site | Só CNPJ |
| Situação cadastral | `situacao_cadastral` | 🤖 IA via CNPJ | |
| Porte (Receita) | `porte_receita` | 🤖 IA via CNPJ | |
| Natureza jurídica | `natureza_juridica` | 🤖 IA via CNPJ | |
| Município/UF | `municipio_uf` | 🤖 IA via CNPJ | |
| CNAE | `cnae` | 🤖 IA via CNPJ | |
| Tel. normalizado | `telefone_normalizado` | 🌐 Site | Evolution API |
| Página de origem | `pagina` | 🔧 Sistema | |
| Referrer | `referrer` | 🔧 Sistema | |
| Dispositivo | `device` | 🔧 Sistema | |
| Payload completo | `webhook_payload` | 🔧 Sistema | jsonb bruto |

---

## Checklist de implantação no CRM (campos a exibir nas fichas)

### Ficha de Lead — campos a exibir (já existem no banco):
- [ ] **Seção Contato:** nome, telefone, whatsapp, email
- [ ] **Seção Origem:** source, form, submitted_at, created_at, pagina, referrer, device
- [ ] **Seção Status:** status, responsavel_id, pipeline_id, stage_id, last_message_at
- [ ] **Seção Perfil:** tipo_contrato, regiao, preferencia_hospital, tem_plano, valor_faixa
- [ ] **Seção CPF** *(visível só quando tipo_contrato = CPF):* plano_tipo, faixa_etaria, vidas
- [ ] **Seção Empresa** *(visível só quando tipo_contrato = CNPJ):* empresa, porte_empresa, funcionarios
- [ ] **Seção "Dados da Receita Federal — preenchido automaticamente"** *(visível só quando tipo_contrato = CNPJ):*
  - cnpj, razao_social, situacao_cadastral, porte_receita, natureza_juridica, municipio_uf, cnae

### Ficha de Cliente — campos adicionais a exibir:
- [ ] lead_id (link para o lead de origem)
- [ ] submitted_at (data de entrada original no funil)
- [ ] tinha_plano + valor_plano_antigo (histórico do plano anterior)
- [ ] Todos os campos de plano contratado: plano_nome, plano_operadora, plano_valor, plano_inicio, etc.
- [ ] Campos pessoais avançados: cpf, data_nascimento, genero, estado_civil, endereco completo

---

## Nota para o time comercial

> 🤖 **Os campos da seção "Dados da Receita Federal" são preenchidos automaticamente pela IA** quando o lead digita o CNPJ no site.  
> Aparecem na ficha **antes do primeiro contato** — o consultor já sabe razão social, situação (ativa/baixada), porte e segmento de atuação sem precisar perguntar.
>
> O campo `webhook_payload` guarda o JSON bruto completo — útil para reprocessamento ou debug caso algum campo não tenha populado corretamente.
