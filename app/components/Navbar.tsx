"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Método", href: "#metodo" },
  { label: "Cobertura", href: "#cobertura" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-dark border-b border-platinum/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-baseline gap-2 group"
            aria-label="Elih Seguros — página inicial"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-pristine">
              ELIH
            </span>
            <span className="overline text-platinum/50 group-hover:text-platinum/80 transition-colors">
              Seguros
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-platinum/70 hover:text-pristine transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contato"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-pristine text-obsidian text-sm font-semibold hover:bg-platinum transition-colors duration-200"
          >
            Agendar Assessoria
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-[10px] text-platinum hover:bg-platinum/5"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="md:hidden pb-6 pt-2 space-y-1 border-t border-platinum/10">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-2 py-3 text-base text-platinum/80 hover:text-pristine transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contato"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-[10px] bg-pristine text-obsidian text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              Agendar Assessoria
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
