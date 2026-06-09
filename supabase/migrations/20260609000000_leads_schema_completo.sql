-- ─────────────────────────────────────────────────────────────────────────────
-- Migração: schema completo da tabela `leads`
-- Origem dos dados: formulário de cotação simplificada — Site Elih
-- Data: 2026-06-09
-- Executar com: supabase db push  OU  colar no SQL Editor do Supabase Studio
-- Seguro para re-executar (usa ADD COLUMN IF NOT EXISTS em tudo)
-- ─────────────────────────────────────────────────────────────────────────────

-- Garante que a tabela existe com colunas mínimas
CREATE TABLE IF NOT EXISTS leads (
  id         BIGSERIAL    PRIMARY KEY,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── Contato ───────────────────────────────────────────────────────────────────
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS nome      TEXT,
  ADD COLUMN IF NOT EXISTS telefone  TEXT,   -- formato legível: "(11) 99999-8888"
  ADD COLUMN IF NOT EXISTS whatsapp  TEXT;   -- Evolution API: "5511999998888"

-- ── Origem ────────────────────────────────────────────────────────────────────
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS source       TEXT DEFAULT 'site-elih',
  ADD COLUMN IF NOT EXISTS form         TEXT DEFAULT 'cotacao-simplificada',
  ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMPTZ,  -- ISO 8601 UTC — quando o form foi enviado
  ADD COLUMN IF NOT EXISTS status       TEXT DEFAULT 'Novo';
  -- Valores de status sugeridos: 'Novo' | 'Em contato' | 'Proposta enviada' | 'Convertido' | 'Perdido'

-- ── Perfil do quiz (todos os perfis) ─────────────────────────────────────────
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS tipo_cliente       TEXT,   -- 'CPF' | 'CNPJ'
  ADD COLUMN IF NOT EXISTS regiao             TEXT,   -- 'N' | 'NE' | 'CO' | 'SE' | 'S'
  ADD COLUMN IF NOT EXISTS hospital           TEXT,   -- 'SIM' | 'NAO' — preferência por rede
  ADD COLUMN IF NOT EXISTS tem_plano          TEXT,   -- 'SIM' | 'NAO' — já possui plano?
  ADD COLUMN IF NOT EXISTS valor_plano_atual  TEXT;   -- faixa: '0-500' | '500-1000' | '1000-2000' | '2000+'
  -- valor_plano_atual só é preenchido quando tem_plano = 'SIM'

-- ── Pessoa Física (CPF) ───────────────────────────────────────────────────────
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS plano  TEXT,     -- 'INDIVIDUAL' | 'FAMILIAR'
  ADD COLUMN IF NOT EXISTS idade  TEXT,     -- faixa: '0-18' | '19-28' | '29-38' | '39-48' | '49-58' | '59+'
  ADD COLUMN IF NOT EXISTS vidas  INTEGER;  -- total de beneficiários (plano familiar)
  -- `vidas` só é preenchido para CPF + plano FAMILIAR

-- ── Empresa (CNPJ) — resposta do formulário ───────────────────────────────────
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS porte_empresa  TEXT,     -- 'MEI' | 'ME_EPP' | 'LTDA' | 'SA'  (escolha no form)
  ADD COLUMN IF NOT EXISTS funcionarios   INTEGER;  -- total de funcionários que entrarão no plano
  -- `funcionarios` = contagem por faixas etárias, preenchida no quiz de "vidas" (para CNPJ)

-- ── Empresa (CNPJ) — dados enriquecidos via BrasilAPI / Receita Federal ───────
--    ⚠️  Estes campos são preenchidos AUTOMATICAMENTE pela IA quando o usuário
--    informa o CNPJ no formulário. O consultor NUNCA precisa preencher manualmente.
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS cnpj               TEXT,   -- somente dígitos: "62867408000112"
  ADD COLUMN IF NOT EXISTS razao_social       TEXT,   -- nome oficial: "JOAO GABRIEL FERREIRA..."
  ADD COLUMN IF NOT EXISTS situacao_cadastral TEXT,   -- 'ATIVA' | 'BAIXADA' | 'SUSPENSA' | etc
  ADD COLUMN IF NOT EXISTS porte_receita      TEXT,   -- classificação Receita: 'MICRO EMPRESA' | 'PEQUENO PORTE' | etc
  ADD COLUMN IF NOT EXISTS natureza_juridica  TEXT,   -- ex: 'Empresário (Individual)'
  ADD COLUMN IF NOT EXISTS municipio_uf       TEXT,   -- ex: 'RECIFE/PE'
  ADD COLUMN IF NOT EXISTS cnae               TEXT;   -- descrição da atividade principal

-- ── Metadados técnicos ────────────────────────────────────────────────────────
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS user_agent  TEXT,   -- browser/dispositivo do usuário
  ADD COLUMN IF NOT EXISTS pagina      TEXT,   -- URL completa da página no momento do envio
  ADD COLUMN IF NOT EXISTS referrer    TEXT;   -- URL de origem (de onde o usuário veio)

-- ─────────────────────────────────────────────────────────────────────────────
-- Índices para filtros e ordenação no CRM
-- ─────────────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS leads_tipo_cliente_idx  ON leads (tipo_cliente);
CREATE INDEX IF NOT EXISTS leads_status_idx        ON leads (status);
CREATE INDEX IF NOT EXISTS leads_cnpj_idx          ON leads (cnpj);
CREATE INDEX IF NOT EXISTS leads_submitted_at_idx  ON leads (submitted_at DESC);
CREATE INDEX IF NOT EXISTS leads_regiao_idx        ON leads (regiao);
CREATE INDEX IF NOT EXISTS leads_porte_empresa_idx ON leads (porte_empresa);

-- ─────────────────────────────────────────────────────────────────────────────
-- Tabela `clientes` — mesmos campos de leads, acrescidos de campos comerciais
-- Criada quando o lead é convertido em cliente
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clientes (
  id         BIGSERIAL    PRIMARY KEY,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  lead_id    BIGINT       REFERENCES leads(id) ON DELETE SET NULL -- vínculo com o lead de origem
);

-- Contato
ALTER TABLE clientes
  ADD COLUMN IF NOT EXISTS nome      TEXT,
  ADD COLUMN IF NOT EXISTS telefone  TEXT,
  ADD COLUMN IF NOT EXISTS whatsapp  TEXT,
  ADD COLUMN IF NOT EXISTS email     TEXT;

-- Origem
ALTER TABLE clientes
  ADD COLUMN IF NOT EXISTS source       TEXT,
  ADD COLUMN IF NOT EXISTS form         TEXT,
  ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMPTZ,  -- data de cadastro original (do form)
  ADD COLUMN IF NOT EXISTS convertido_em TIMESTAMPTZ; -- data em que virou cliente

-- Perfil
ALTER TABLE clientes
  ADD COLUMN IF NOT EXISTS tipo_cliente       TEXT,
  ADD COLUMN IF NOT EXISTS regiao             TEXT,
  ADD COLUMN IF NOT EXISTS hospital           TEXT,
  ADD COLUMN IF NOT EXISTS tinha_plano        TEXT,   -- renomeado de tem_plano → tinha_plano (histórico)
  ADD COLUMN IF NOT EXISTS valor_plano_antigo TEXT;   -- faixa de valor do plano que tinha antes

-- CPF
ALTER TABLE clientes
  ADD COLUMN IF NOT EXISTS plano  TEXT,
  ADD COLUMN IF NOT EXISTS idade  TEXT,
  ADD COLUMN IF NOT EXISTS vidas  INTEGER;

-- CNPJ — formulário
ALTER TABLE clientes
  ADD COLUMN IF NOT EXISTS porte_empresa  TEXT,
  ADD COLUMN IF NOT EXISTS funcionarios   INTEGER;

-- CNPJ — BrasilAPI
ALTER TABLE clientes
  ADD COLUMN IF NOT EXISTS cnpj               TEXT,
  ADD COLUMN IF NOT EXISTS razao_social       TEXT,
  ADD COLUMN IF NOT EXISTS situacao_cadastral TEXT,
  ADD COLUMN IF NOT EXISTS porte_receita      TEXT,
  ADD COLUMN IF NOT EXISTS natureza_juridica  TEXT,
  ADD COLUMN IF NOT EXISTS municipio_uf       TEXT,
  ADD COLUMN IF NOT EXISTS cnae               TEXT;

-- Dados do plano contratado (preenchidos após conversão)
ALTER TABLE clientes
  ADD COLUMN IF NOT EXISTS operadora       TEXT,
  ADD COLUMN IF NOT EXISTS plano_nome      TEXT,
  ADD COLUMN IF NOT EXISTS valor_mensal    NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS data_vigencia   DATE,
  ADD COLUMN IF NOT EXISTS consultor_resp  TEXT;

-- Metadados
ALTER TABLE clientes
  ADD COLUMN IF NOT EXISTS user_agent  TEXT,
  ADD COLUMN IF NOT EXISTS pagina      TEXT,
  ADD COLUMN IF NOT EXISTS referrer    TEXT;

-- Índices
CREATE INDEX IF NOT EXISTS clientes_cnpj_idx         ON clientes (cnpj);
CREATE INDEX IF NOT EXISTS clientes_tipo_cliente_idx  ON clientes (tipo_cliente);
CREATE INDEX IF NOT EXISTS clientes_lead_id_idx       ON clientes (lead_id);
