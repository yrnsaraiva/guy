"use client";

import { useEffect, useState } from "react";
import { NAV } from "@/lib/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <a href="#topo" className="logo" aria-label="Guyzelh Ramos, início">
          <span className="logo-mark" aria-hidden="true">GR</span>
          <span className="logo-name">Guyzelh Ramos</span>
        </a>

        <nav className={`nav ${open ? "is-open" : ""}`} id="menu" aria-label="Principal">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contacto" className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
            Falar connosco
          </a>
        </nav>

        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          <span className="menu-icon" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
