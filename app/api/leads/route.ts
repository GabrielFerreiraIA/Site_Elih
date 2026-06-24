import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ??
  "https://automacoes-n8n.o1ltcv.easypanel.host/webhook/leads";

const SUPABASE_URL              = process.env.SUPABASE_URL ?? "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export async function POST(req: NextRequest) {
  let savedToSupabase = false;
  try {
    const payload = await req.json();

    // ── 1. N8N — payload completo (respostas + resumo + meta) ─────────────────
    const n8nRes = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!n8nRes.ok) {
      // eslint-disable-next-line no-console
      console.error(`[Leads Route] n8n respondeu com status ${n8nRes.status}`);
    }

    // ── 2. Supabase — mapeado para os nomes reais de colunas da tabela `leads` ─
    // Schema inspecionado em 2026-06-09. Colunas existentes reutilizadas onde
    // já existiam; novas colunas adicionadas via migration 20260609000000.
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const r        = (payload.resumo ?? {}) as Record<string, string | null>;
        const isCNPJ   = r.tipo === "CNPJ";
        const totalVidas = r.vidas_total ? Number(r.vidas_total) : 0;

        const row = {
          // ── Contato ──────────────────────────────────────────────────────────
          nome:                 payload.lead?.nome     ?? null,
          telefone:             payload.lead?.telefone ?? null,
          whatsapp:             payload.lead?.whatsapp ?? null,
          telefone_normalizado: payload.lead?.whatsapp ?? null, // col. existente

          // ── Origem ───────────────────────────────────────────────────────────
          source:       payload.source       ?? "site-elih",
          form:         payload.form         ?? "cotacao-simplificada",
          submitted_at: payload.submitted_at ?? new Date().toISOString(),
          // Deve casar com o 1º estágio do funil do CRM (company.status_type[0]).
          status:       "Novo Lead",

          // ── Perfil do quiz ───────────────────────────────────────────────────
          tipo_contrato:      r.tipo     ?? null,  // col. existente — CPF | CNPJ
          regiao:             r.regiao   ?? null,  // col. existente — N|NE|CO|SE|S
          preferencia_hospital: r.hospital ?? null, // col. existente — SIM | NAO
          tem_plano:          r.tem_plano ?? null, // nova col. — SIM | NAO
          valor_faixa:        r.valor    ?? null,  // col. existente — faixa valor atual

          // ── CPF — Pessoa Física ───────────────────────────────────────────────
          plano_tipo:   !isCNPJ ? (r.plano  ?? null) : null, // col. existente — INDIVIDUAL | FAMILIAR
          faixa_etaria: !isCNPJ ? (r.idade  ?? null) : null, // col. existente — ex: "29-38"
          vidas:        !isCNPJ ? totalVidas          : null, // col. existente — beneficiários

          // ── CNPJ — Empresa (resposta do formulário) ───────────────────────────
          empresa:      isCNPJ ? (r.razao_social ?? r.porte ?? null) : null, // col. existente
          porte_empresa: isCNPJ ? (r.porte ?? null) : null, // nova col. — MEI|ME_EPP|LTDA|SA
          funcionarios:  isCNPJ ? totalVidas           : null, // nova col. — funcionários no plano

          // ── CNPJ — Dados da Receita Federal (preenchimento automático via BrasilAPI) ──
          // ⚡ Estes campos chegam automaticamente quando o usuário informa o CNPJ no form
          cnpj:               r.cnpj               ?? null, // col. existente
          razao_social:       r.razao_social        ?? null, // nova col.
          situacao_cadastral: r.situacao_cadastral  ?? null, // nova col.
          porte_receita:      r.porte_receita       ?? null, // nova col.
          natureza_juridica:  r.natureza_juridica   ?? null, // nova col.
          municipio_uf:       r.municipio_uf        ?? null, // nova col.
          cnae:               r.cnae                ?? null, // nova col.

          // ── Metadados técnicos ────────────────────────────────────────────────
          device:   payload.meta?.user_agent ?? null, // col. existente — browser/OS
          pagina:   payload.meta?.pagina     ?? null, // nova col. — URL da página
          referrer: payload.meta?.referrer   ?? null, // nova col. — URL de origem

          // ── Payload completo (jsonb) — para auditoria e reprocessamento ───────
          webhook_payload: payload, // col. existente — payload bruto completo
        };

        const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
          method: "POST",
          headers: {
            "Content-Type":  "application/json",
            "apikey":        SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Prefer":        "return=minimal",
          },
          body: JSON.stringify(row),
        });

        if (!dbRes.ok) {
          // Lê a mensagem real do PostgREST (status sozinho não diz o motivo).
          const errBody = await dbRes.text().catch(() => "");
          // eslint-disable-next-line no-console
          console.error(`[Leads Route] Supabase falhou ${dbRes.status}: ${errBody}`);
        } else {
          savedToSupabase = true;
        }
      } catch (dbErr) {
        // Tipicamente acontece quando o projeto Supabase está PAUSADO (free tier)
        // ou as envs SUPABASE_* não estão configuradas no deploy.
        // eslint-disable-next-line no-console
        console.error("[Leads Route] Erro ao salvar no Supabase:", dbErr);
      }
    } else {
      // eslint-disable-next-line no-console
      console.error("[Leads Route] SUPABASE_URL/SERVICE_ROLE_KEY ausentes — lead NÃO salvo no CRM");
    }

    // savedToSupabase=false => lead foi só pro n8n; verifique env/pausa do projeto.
    return NextResponse.json({ ok: true, savedToSupabase });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "unknown error" },
      { status: 500 }
    );
  }
}
