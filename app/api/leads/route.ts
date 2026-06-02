import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ??
  "https://automacoes-n8n.o1ltcv.easypanel.host/webhook/leads";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // 1. Proxy server-side para o N8N (Webhook de automação)
    const n8nRes = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!n8nRes.ok) {
      // eslint-disable-next-line no-console
      console.error(`[Leads Route] n8n responded with status ${n8nRes.status}`);
    }

    // 2. Inserir direto no banco de dados do Supabase (opcional — requer SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY)
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Prefer": "return=minimal",
          },
          body: JSON.stringify({
            nome: payload.lead.nome,
            email: payload.lead.email,
            telefone: payload.lead.telefone,
            empresa: payload.lead.cnpj,
            cnpj: payload.lead.cnpj,
            vidas: Number(payload.lead.vidas || 0),
            device: payload.meta.device,
            source: payload.source,
            status: "Novo",
          }),
        });

        if (!dbRes.ok) {
          // eslint-disable-next-line no-console
          console.error(`[Leads Route] Supabase responded with status ${dbRes.status}`);
        }
      } catch (dbErr) {
        // eslint-disable-next-line no-console
        console.error("[Leads Route] Error saving to Supabase:", dbErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "unknown error" },
      { status: 500 }
    );
  }
}
