"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { MenuToggleIcon } from "./ui/menu-toggle-icon";

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
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll + ESC close when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4">
      {/* Floating white pill — shrinks & lifts on scroll */}
      <div
        className={cn(
          "relative mx-auto mt-3 overflow-hidden rounded-full bg-white border border-neutral-200/80 shadow-[var(--shadow-sm)]",
          "transition-all duration-500 ease-out",
          scrolled
            ? "max-w-4xl mt-2 shadow-[var(--shadow-md)]"
            : "max-w-6xl shadow-[var(--shadow-sm)]"
        )}
      >
        <nav
          className={cn(
            "relative flex items-center justify-between gap-4 px-4 sm:px-5",
            "transition-all duration-500 ease-out",
            scrolled ? "h-14" : "h-16"
          )}
          aria-label="Navegação principal"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="Elih Seguros — página inicial"
          >
            <img
              src="/img/logo/elih-seguros-wordmark-navy.png"
              alt="Elih Seguros"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop links — centered */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 rounded-full text-sm font-semibold text-neutral-600 hover:text-navy-900 hover:bg-navy-50/50 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-500"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contato"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy-900 text-white text-sm font-semibold hover:bg-navy-950 transition-colors duration-200 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900 shrink-0 font-display"
          >
            Solicitar cotação
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-neutral-700 hover:text-navy-900 hover:bg-navy-50 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-500"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </button>
        </nav>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 top-[4.75rem] z-40 bg-white border-t border-neutral-100"
          >
            <div className="flex h-full flex-col justify-between gap-y-6 px-6 pb-10 pt-6">
              <nav className="grid gap-1.5" aria-label="Menu de navegação mobile">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 + i * 0.06 }}
                    className="flex items-center px-4 py-4 text-lg font-medium text-neutral-800 hover:text-navy-900 hover:bg-navy-50 rounded-xl transition-colors duration-150"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
              <motion.a
                href="#contato"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.3 }}
                className="inline-flex w-full items-center justify-center gap-2 px-5 py-4 rounded-full bg-navy-900 text-white text-base font-semibold hover:bg-navy-950 transition-colors duration-200 font-display shadow-[var(--shadow-sm)]"
                onClick={() => setOpen(false)}
              >
                Solicitar cotação
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
