"use client";

import { useEffect, useRef } from "react";
import { EPISODES, HERO, PERSON, type Media } from "@/lib/content";
import { live, prefersReducedMotion, set, useLive } from "@/lib/live";
import Feed from "./Feed";

const SEGMENTS = EPISODES.length + 1; // hero + episódios

function Shot({ media, shot, label, tint }: { media?: Media; shot: string; label: string; tint: [number, number, number] }) {
  const rgb = tint.map((c) => Math.round(c * 255)).join(" ");
  if (media?.type === "video") {
    return <video className="shot-media" src={media.src} autoPlay muted loop playsInline aria-label={media.alt} />;
  }
  if (media?.type === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="shot-media" src={media.src} alt={media.alt} />;
  }
  return (
    <div className="shot-placeholder" style={{ ["--tint" as string]: rgb }}>
      {label ? <span className="shot-year" aria-hidden="true">{label}</span> : null}
      <p className="shot-brief">
        <span>Plano a filmar</span>
        {shot}
      </p>
    </div>
  );
}

export default function Stage() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const index = useLive((s) => s.index);
  const booted = useLive((s) => s.booted);
  const first = useRef(true);

  // regista o ecrã para o shader seguir a sua posição
  useEffect(() => {
    live.frame = frameRef.current;
    return () => {
      live.frame = null;
    };
  }, []);

  // progresso dentro do palco → episódio activo
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = sectionRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const travel = r.height - window.innerHeight;
        const p = Math.min(Math.max(-r.top / travel, 0), 0.9999);
        const i = Math.floor(p * SEGMENTS);
        if (i !== live.index) set("index", i);
        const t = i === 0 ? null : EPISODES[i - 1].tint;
        live.tint = t ?? [1, 0.9, 0.78];
        live.ringScale = i === 0 ? 1.22 : 1.02;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // corte de régie quando muda o episódio
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    screenRef.current?.animate(
      [
        { clipPath: "inset(0 0 0 0)", transform: "translateX(0)", filter: "none" },
        { clipPath: "inset(12% 0 58% 0)", transform: "translateX(-3%)", filter: "hue-rotate(80deg) saturate(2)", offset: 0.25 },
        { clipPath: "inset(64% 0 8% 0)", transform: "translateX(4%)", filter: "hue-rotate(-60deg) contrast(1.6)", offset: 0.5 },
        { clipPath: "inset(30% 0 40% 0)", transform: "translateX(-1%)", filter: "brightness(1.8)", offset: 0.7 },
        { clipPath: "inset(0 0 0 0)", transform: "translateX(0)", filter: "none" },
      ],
      { duration: 380, easing: "steps(6, end)" },
    );
    copyRef.current?.querySelectorAll<HTMLElement>(".is-active [data-line]").forEach((line, n) => {
      line.animate(
        [
          { transform: "translateY(105%)", opacity: 0 },
          { transform: "translateY(0)", opacity: 1 },
        ],
        { duration: 700, delay: 120 + n * 70, easing: "cubic-bezier(.2,.7,.1,1)", fill: "backwards" },
      );
    });
  }, [index]);

  // nome estica com a velocidade (largura variável da Archivo)
  const nameRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    let w = 125;
    const tick = () => {
      const target = 125 - Math.min(live.velocity, 1) * 63;
      w += (target - w) * 0.12;
      if (nameRef.current) nameRef.current.style.fontVariationSettings = `"wdth" ${w.toFixed(1)}`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="palco"
      ref={sectionRef}
      className="stage"
      style={{ height: `${SEGMENTS * 100 + 40}svh` }}
      aria-label="Transmissão"
      data-booted={booted}
    >
      {/* âncoras para a barra de progresso */}
      <div className="anchors" aria-hidden="true">
        <span id="inicio" style={{ top: 0 }} />
        {EPISODES.map((ep, i) => (
          <span key={ep.id} id={`ep-${ep.id}`} style={{ top: `${(i + 1) * 100 + 4}svh` }} />
        ))}
      </div>

      <div className="stage-sticky" data-index={index}>
        <h1 className={`hero-name ${index === 0 ? "is-on" : ""}`} ref={nameRef}>
          <span>{PERSON.first}</span>
          <span>{PERSON.last}</span>
        </h1>

        <div className="stage-copy" ref={copyRef}>
          <div className={`copy-block hero-copy ${index === 0 ? "is-active" : ""}`} aria-hidden={index !== 0}>
            {HERO.lines.map((l) => (
              <p className="line" key={l}>
                <span data-line>{l}</span>
              </p>
            ))}
            <p className="hint">
              <span className="hint-arrow" aria-hidden="true" />
              {HERO.hint}
            </p>
          </div>

          {EPISODES.map((ep, i) => (
            <article
              key={ep.id}
              className={`copy-block ${index === i + 1 ? "is-active" : ""}`}
              aria-hidden={index !== i + 1}
            >
              <p className="ep-count">
                <span data-line>
                  Episódio {i + 1} de {EPISODES.length} <em>{ep.years}</em>
                </span>
              </p>
              <h2 className="ep-title">
                <span data-line>{ep.title}</span>
              </h2>
              <div className="ep-text">
                {ep.lines.map((l) => (
                  <p className="line" key={l}>
                    <span data-line>{l}</span>
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="frame" ref={frameRef}>
          <div className="screen" ref={screenRef}>
            <div className={`shot shot-hero ${index === 0 ? "is-active" : ""}`}>
              <Shot media={HERO.media} shot={HERO.shot} label="" tint={[1, 0.9, 0.78]} />
            </div>
            {EPISODES.map((ep, i) => (
              <div key={ep.id} className={`shot ${index === i + 1 ? "is-active" : ""}`}>
                <Shot media={ep.media} shot={ep.shot} label={ep.marker === "A seguir" ? "?" : ep.marker} tint={ep.tint} />
              </div>
            ))}
            <div className="screen-top">
              <span className="avatar" aria-hidden="true">G</span>
              <span className="handle">{PERSON.name}</span>
              <span className="badge-mini">Ao vivo</span>
            </div>
          </div>
        </div>

        <Feed />
      </div>
    </section>
  );
}
