"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT, PERSON } from "@/lib/content";
import { live, prefersReducedMotion, set, timecode, useLive } from "@/lib/live";

/** Rodapé com o botão "Terminar transmissão". */
export default function Outro() {
  const end = () => {
    live.endedAfter = Date.now() - live.startedAt;
    set("on", false);
    document.documentElement.classList.add("is-off");
  };

  return (
    <footer id="fim" className="outro">
      <p className="outro-lead">Por hoje é tudo. A próxima live não tem hora marcada.</p>
      <div className="outro-actions">
        <button className="end-btn" onClick={end}>
          <span className="end-dot" aria-hidden="true" />
          Terminar transmissão
        </button>
        <a className="outro-link" href={CONTACT.instagram} target="_blank" rel="noreferrer">
          Seguir no Instagram
        </a>
      </div>
      <p className="outro-small">
        © {new Date().getFullYear()} {PERSON.name}
      </p>
    </footer>
  );
}

/** Ecrã depois de desligar: o ecrã colapsa como um tubo antigo e mostra quanto tempo ficaste. */
export function OffScreen() {
  const on = useLive((s) => s.on);
  const [duration, setDuration] = useState("00:00:00");
  const restartRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (on) return;
    setDuration(timecode(live.endedAfter));
    const t = window.setTimeout(() => restartRef.current?.focus(), prefersReducedMotion() ? 0 : 900);
    return () => clearTimeout(t);
  }, [on]);

  const restart = () => {
    document.documentElement.classList.remove("is-off");
    live.startedAt = Date.now();
    set("on", true);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <div
      className={`off-screen ${on ? "" : "is-shown"}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={on}
      aria-label="Transmissão terminada"
    >
      <div className="off-inner">
        <p className="off-title">Transmissão terminada</p>
        <p className="off-time">
          Estiveste cá <span className="tc">{duration}</span>
        </p>
        <div className="off-actions">
          <button ref={restartRef} className="end-btn" onClick={restart} tabIndex={on ? -1 : 0}>
            Ver outra vez
          </button>
          <a className="outro-link" href={CONTACT.instagram} target="_blank" rel="noreferrer" tabIndex={on ? -1 : 0}>
            Seguir no Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
