/**
 * Estrutura canônica de saída do lead da cotação simplificada.
 * Este é o contrato único de JSON enviado para o N8N (e, futuramente,
 * para o Supabase / CRM). Mantenha esta forma estável: integrações
 * externas dependem dela.
 */

export interface LeadContact {
  nome: string;
  /** Telefone formatado para leitura humana: "(11) 99999-8888". */
  telefone: string;
  /** Padrão E.164: "+5511999998888". */
  telefone_e164: string;
  /** Pronto para a Evolution API (somente dígitos, com DDI 55): "5511999998888". */
  whatsapp: string;
}

/** Uma resposta respondida no quiz, com rótulo legível para o CRM. */
export interface RespostaEntry {
  campo: string; // chave técnica, ex: "tipo"
  pergunta: string; // texto exibido ao usuário
  valor: string; // valor bruto, ex: "CNPJ"
  rotulo: string; // rótulo legível, ex: "Empresa"
}

export interface LeadPayload {
  source: string; // origem fixa: "site-elih"
  form: string; // identificador do formulário
  submitted_at: string; // ISO 8601 UTC
  lead: LeadContact;
  respostas: RespostaEntry[];
  /** Mapa plano campo->valor, conveniente para colunas de CRM/planilha. */
  resumo: Record<string, string | null>;
  meta: {
    user_agent: string | null;
    pagina: string | null;
    referrer: string | null;
  };
}

// ─── Telefone (BR) ────────────────────────────────────────────────────────────

export function digitsOnly(value: string): string {
  return (value || "").replace(/\D/g, "");
}

/** Máscara progressiva enquanto o usuário digita: (XX) XXXXX-XXXX. */
export function formatPhoneBR(value: string): string {
  const d = digitsOnly(value).slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Normaliza para envio (DDI 55 + DDD + número). Evolution API usa `whatsapp`. */
export function normalizePhoneBR(value: string): {
  digits: string;
  e164: string;
  whatsapp: string;
} {
  let d = digitsOnly(value);
  // A máscara limita a 11 dígitos (DDD + número), então sempre prefixamos o DDI.
  if (d.length <= 11) d = "55" + d;
  return { digits: d, e164: `+${d}`, whatsapp: d };
}

// ─── Builder ──────────────────────────────────────────────────────────────────

export interface BuildLeadInput {
  contact: { nome: string; telefone: string };
  respostas: RespostaEntry[];
}

export function buildLeadPayload({ contact, respostas }: BuildLeadInput): LeadPayload {
  const resumo: Record<string, string | null> = {};
  for (const r of respostas) resumo[r.campo] = r.valor;

  const tel = normalizePhoneBR(contact.telefone);

  return {
    source: "site-elih",
    form: "cotacao-simplificada",
    submitted_at: new Date().toISOString(),
    lead: {
      nome: contact.nome.trim(),
      telefone: contact.telefone.trim(),
      telefone_e164: tel.e164,
      whatsapp: tel.whatsapp,
    },
    respostas,
    resumo,
    meta: {
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      pagina: typeof window !== "undefined" ? window.location.href : null,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
    },
  };
}

/** Envia o lead pela rota interna (/api/leads), que faz o proxy para o N8N. */
export async function submitLead(
  payload: LeadPayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "network error" };
  }
}
