"use client";

import { useEffect, useRef, useState } from "react";
import { live, prefersReducedMotion, set, useLive } from "@/lib/live";

/** "A ligar a transmissão": contagem 3-2-1 e o ring light acende. */
export default function Preloader() {
  const booted = useLive((s) => s.booted);
  const [count, setCount] = useState(3);
  const [gone, setGone] = useState(false);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const total = reduced ? 300 : 2400;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const t = Math.min((performance.now() - start) / total, 1);
      setCount(3 - Math.min(Math.floor(t * 3), 2));
      if (pctRef.current) pctRef.current.style.transform = `scaleX(${t})`;
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        live.startedAt = Date.now();
        set("booted", true);
        window.setTimeout(() => setGone(true), reduced ? 0 : 900);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;
  return (
    <div className={`preloader ${booted ? "is-done" : ""}`} role="status" aria-live="polite">
      <p className="pre-label">A ligar a transmissão</p>
      <p className="pre-count" aria-hidden="true">{count}</p>
      <div className="pre-bar" aria-hidden="true">
        <span ref={pctRef} />
      </div>
    </div>
  );
}
