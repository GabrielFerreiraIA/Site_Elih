import { NextRequest, NextResponse } from "next/server";
import { digitsOnly } from "../../../../lib/leadPayload";
import { isValidCNPJ, type CNPJData } from "../../../../lib/cnpj";

const BRASILAPI_BASE =
  process.env.BRASILAPI_CNPJ_URL ?? "https://brasilapi.com.br/api/cnpj/v1";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ cnpj: string }> }
) {
  const { cnpj } = await params;
  const digits = digitsOnly(cnpj);

  if (!isValidCNPJ(digits)) {
    return NextResponse.json(
      { ok: false, error: "CNPJ inválido" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${BRASILAPI_BASE}/${digits}`, {
      headers: {
        Accept: "application/json",
        // A BrasilAPI bloqueia (403) requisições sem User-Agent.
        "User-Agent": "Elih-Seguros/1.0 (+https://elihseguros.com.br)",
      },
      // Dados cadastrais mudam raramente — cache de 24h alivia a BrasilAPI.
      next: { revalidate: 60 * 60 * 24 },
    });

    if (res.status === 404) {
      return NextResponse.json(
        { ok: false, error: "CNPJ não encontrado" },
        { status: 404 }
      );
    }

    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error(`[CNPJ Route] BrasilAPI respondeu com status ${res.status}`);
      return NextResponse.json(
        { ok: false, error: "Consulta indisponível" },
        { status: 502 }
      );
    }

    const raw = await res.json();

    const data: CNPJData = {
      cnpj: digits,
      razao_social: raw.razao_social ?? "",
      nome_fantasia: raw.nome_fantasia ?? "",
      situacao: raw.descricao_situacao_cadastral ?? "",
      porte: raw.porte ?? "",
      natureza_juridica: raw.natureza_juridica ?? "",
      municipio: raw.municipio ?? "",
      uf: raw.uf ?? "",
      cnae: raw.cnae_fiscal_descricao ?? "",
      mei: Boolean(raw.opcao_pelo_mei),
      simples: Boolean(raw.opcao_pelo_simples),
    };

    return NextResponse.json(data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[CNPJ Route] Erro ao consultar BrasilAPI:", e);
    return NextResponse.json(
      { ok: false, error: "Falha na consulta" },
      { status: 502 }
    );
  }
}
