"use client";

import { useEffect, useRef, useState } from "react";
import { EPISODES } from "@/lib/content";
import { live, scrollToY, timecode, useLive } from "@/lib/live";

const MARKS = [
  { id: "inicio", label: "Início" },
  ...EPISODES.map((e) => ({ id: `ep-${e.id}`, label: e.marker })),
  { id: "chat", label: "Chat" },
];

export default function Hud() {
  const on = useLive((s) => s.on);
  const booted = useLive((s) => s.booted);
  const clockRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [marks, setMarks] = useState<{ id: string; label: string; at: number; y: number }[]>([]);

  // relógio: tempo real que o visitante está na transmissão
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (clockRef.current && live.startedAt) clockRef.current.textContent = timecode(Date.now() - live.startedAt);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (fillRef.current && max > 0) fillRef.current.style.transform = `scaleX(${window.scrollY / max})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // posição dos marcadores de capítulo
  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      setMarks(
        MARKS.map((m) => {
          const el = document.getElementById(m.id);
          const y = el ? el.getBoundingClientRect().top + window.scrollY : 0;
          return { ...m, y, at: Math.min(y / max, 1) };
        }),
      );
    };
    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 600);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [booted]);

  return (
    <div className={`hud ${booted ? "is-booted" : ""} ${on ? "" : "is-off"}`}>
      <div className="hud-top">
        <p className="live-badge">
          <span className="dot" aria-hidden="true" />
          Ao vivo
        </p>
        <p className="watch">
          A ver há <span ref={clockRef} className="tc">00:00:00</span>
        </p>
      </div>

      <nav className="timeline" aria-label="Capítulos">
        <div className="track">
          <div className="fill" ref={fillRef} />
        </div>
        {marks.map((m) => (
          <button
            key={m.id}
            className="mark"
            style={{ left: `${m.at * 100}%` }}
            onClick={() => scrollToY(m.y + 2)}
          >
            <span className="mark-label">{m.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
