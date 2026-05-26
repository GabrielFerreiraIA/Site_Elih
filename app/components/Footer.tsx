const cols = [
  {
    title: "Elih Seguros",
    items: ["Sobre", "Método", "Contato", "LGPD"],
  },
  {
    title: "Soluções",
    items: ["Saúde Empresarial", "Odonto Corporativo", "Vida em Grupo"],
  },
  {
    title: "Para o RH",
    items: ["Concierge", "Reembolsos", "Inclusões", "Suporte"],
  },
  {
    title: "Contato",
    items: ["contato@elih.com.br", "+55 (11) 0000-0000", "São Paulo · SP"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-platinum/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="overline text-platinum/40 mb-4">{c.title}</h4>
              <ul className="space-y-2.5">
                {c.items.map((it) => (
                  <li key={it}>
                    <span className="text-sm text-platinum/70 hover:text-pristine transition-colors cursor-default">
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-platinum/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold tracking-tight text-pristine">
              ELIH
            </span>
            <span className="overline text-platinum/40">Seguros</span>
          </div>
          <p className="text-xs text-platinum/40">
            © {new Date().getFullYear()} Elih Seguros · Consultoria premium em
            saúde corporativa
          </p>
        </div>
      </div>
    </footer>
  );
}
