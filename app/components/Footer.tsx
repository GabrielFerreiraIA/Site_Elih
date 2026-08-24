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
    items: ["contato@elihseguros.com.br", "+55 11 99657-9499", "São Paulo · SP"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="overline text-white/40 mb-4">{c.title}</h4>
              <ul className="space-y-2.5">
                {c.items.map((it) => (
                  <li key={it}>
                    <span className="text-sm text-white/70 hover:text-white transition-colors cursor-default">
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <img
              src="/img/logo/elih-seguros-lockup-white-on-navy.png"
              alt="Elih Seguros"
              className="h-9 w-auto object-contain"
            />
          </div>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Elih Seguros · Consultoria premium em
            saúde corporativa
          </p>
        </div>
      </div>
    </footer>
  );
}
