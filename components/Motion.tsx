"use client";

import { useEffect } from "react";

/**
 * Camada de movimento do site. Não renderiza nada: liga efeitos a atributos data-* no HTML.
 *
 *  data-split="chars|words"   texto que sobe letra a letra / palavra a palavra ao entrar no ecrã
 *  data-reveal="up|mask"      bloco que sobe e aparece / foto revelada por máscara
 *  data-stagger               os filhos directos entram em cascata
 *  data-parallax              conteúdo que se desloca mais devagar que o scroll
 *  data-count                 número que conta até ao valor final
 *  data-marquee               faixa contínua cuja velocidade reage ao scroll
 *  data-progress              linha que se preenche conforme o scroll
 *  data-magnetic              botão que segue ligeiramente o cursor
 *  data-cursor="Texto"        o cursor mostra este texto por cima do elemento
 *
 * Com prefers-reduced-motion, tudo aparece no estado final e nada se move.
 */

const reduced = () => document.documentElement.classList.contains("rm");
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function splitText(el: HTMLElement) {
  if (el.dataset.splitDone) return;
  el.dataset.splitDone = "1";
  const mode = el.dataset.split;
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text.replace(/\s+/g, " ").trim());
  // preserva quebras <br> como linhas
  const lines = el.innerHTML.split(/<br\s*\/?>/i).map((l) => l.replace(/<[^>]+>/g, "").trim());
  el.innerHTML = "";
  let i = 0;
  lines.forEach((line, li) => {
    const words = line.split(/\s+/).filter(Boolean);
    words.forEach((word, wi) => {
      const w = document.createElement("span");
      w.className = "sw";
      w.setAttribute("aria-hidden", "true");
      if (mode === "chars") {
        [...word].forEach((ch) => {
          const c = document.createElement("span");
          c.className = "sc";
          c.textContent = ch;
          c.style.setProperty("--i", String(i++));
          w.appendChild(c);
        });
      } else {
        const inner = document.createElement("span");
        inner.className = "sc";
        inner.textContent = word;
        inner.style.setProperty("--i", String(i++));
        w.appendChild(inner);
      }
      el.appendChild(w);
      if (wi < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
    if (li < lines.length - 1) el.appendChild(document.createElement("br"));
  });
}

function formatNumber(n: number) {
  return Math.round(n).toLocaleString("pt-PT").replace(/ |\s/g, ".");
}

function countUp(el: HTMLElement) {
  const to = Number(el.dataset.count);
  const from = Number(el.dataset.from ?? 0);
  const plain = el.dataset.plain === "true";
  const prefix = el.dataset.prefix ?? "";
  const suffix = el.dataset.suffix ?? "";
  const fmt = (v: number) => prefix + (plain ? String(Math.round(v)) : formatNumber(v)) + suffix;
  if (reduced()) {
    el.textContent = fmt(to);
    return;
  }
  const dur = 1800;
  const t0 = performance.now();
  const step = (now: number) => {
    const t = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - t, 4);
    el.textContent = fmt(from + (to - from) * e);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const cleanups: (() => void)[] = [];

    /* ── texto dividido ── */
    document.querySelectorAll<HTMLElement>("[data-split]").forEach(splitText);

    /* ── cascata ── */
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((list) => {
      [...list.children].forEach((child, i) => (child as HTMLElement).style.setProperty("--i", String(i)));
    });

    /* ── preloader ── */
    const pre = document.querySelector<HTMLElement>(".preloader");
    const preNum = pre?.querySelector<HTMLElement>(".pre-num");
    const start = () => root.classList.add("is-loaded");
    if (pre && !reduced()) {
      const dur = 1500;
      const t0 = performance.now();
      let raf = 0;
      const tick = (now: number) => {
        const t = Math.min((now - t0) / dur, 1);
        const e = 1 - Math.pow(1 - t, 3);
        if (preNum) preNum.textContent = String(Math.round(e * 100)).padStart(3, "0");
        if (t < 1) raf = requestAnimationFrame(tick);
        else {
          pre.classList.add("is-done");
          window.setTimeout(start, 250);
        }
      };
      raf = requestAnimationFrame(tick);
      cleanups.push(() => cancelAnimationFrame(raf));
    } else {
      pre?.classList.add("is-done");
      start();
    }

    /* ── entradas ao fazer scroll ── */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("is-in");
          if (el.dataset.count && !el.dataset.counted) {
            el.dataset.counted = "1";
            // espera pela abertura da página para os números do hero
            const go = () => countUp(el);
            if (root.classList.contains("is-loaded")) go();
            else {
              const mo = new MutationObserver(() => {
                if (root.classList.contains("is-loaded")) {
                  mo.disconnect();
                  window.setTimeout(go, 500);
                }
              });
              mo.observe(root, { attributes: true, attributeFilter: ["class"] });
            }
          }
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );
    document
      .querySelectorAll<HTMLElement>("[data-split], [data-reveal], [data-stagger], [data-count]")
      .forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    if (reduced()) return () => cleanups.forEach((c) => c());

    /* ── parallax, marquee, linha do tempo: um único ciclo rAF ── */
    const parallax = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    const marquees = [...document.querySelectorAll<HTMLElement>("[data-marquee]")].map((el) => ({
      el,
      track: el.querySelector<HTMLElement>(".marquee-track")!,
      x: 0,
    }));
    const progress = [...document.querySelectorAll<HTMLElement>("[data-progress]")];
    let lastY = window.scrollY;
    let vel = 0;
    let raf = 0;
    let lastT = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastT) / 16.67, 3);
      lastT = now;
      const y = window.scrollY;
      const vh = window.innerHeight;
      vel += (y - lastY - vel) * 0.12;
      lastY = y;

      for (const el of parallax) {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const p = (r.top + r.height / 2 - vh / 2) / vh; // -1 … 1
        el.style.transform = `translate3d(0, ${(p * -9).toFixed(2)}%, 0) scale(1.18)`;
      }

      for (const m of marquees) {
        const half = m.track.scrollWidth / 2;
        const dir = Number(m.el.dataset.marquee || 1);
        m.x -= (0.6 + Math.min(Math.abs(vel) * 0.25, 14)) * dt * dir;
        if (m.x <= -half) m.x += half;
        if (m.x > 0) m.x -= half;
        const skew = Math.max(Math.min(vel * 0.15, 8), -8);
        m.track.style.transform = `translate3d(${m.x.toFixed(2)}px,0,0) skewX(${(-skew).toFixed(2)}deg)`;
      }

      for (const el of progress) {
        const r = el.getBoundingClientRect();
        const p = Math.min(Math.max((vh * 0.6 - r.top) / r.height, 0), 1);
        el.style.setProperty("--progress", p.toFixed(4));
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    cleanups.push(() => cancelAnimationFrame(raf));

    /* ── cursor e botões magnéticos (só rato) ── */
    if (finePointer()) {
      const cursor = document.querySelector<HTMLElement>(".cursor");
      const label = cursor?.querySelector<HTMLElement>(".cursor-label");
      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const cur = { ...pos };
      let craf = 0;
      root.classList.add("has-cursor");

      const update = (t: HTMLElement | null) => {
        if (!t) return;
        const withLabel = t.closest<HTMLElement>("[data-cursor]");
        const interactive = t.closest("a, button, select, input, textarea, label");
        cursor?.classList.toggle("is-label", !!withLabel);
        cursor?.classList.toggle("is-link", !withLabel && !!interactive);
        if (label && withLabel) label.textContent = withLabel.dataset.cursor ?? "";
      };
      const onMove = (e: PointerEvent) => {
        pos.x = e.clientX;
        pos.y = e.clientY;
        cursor?.classList.add("is-visible");
        update(e.target as HTMLElement);
      };
      // ao fazer scroll o elemento debaixo do cursor muda sem o rato se mexer
      const onScroll = () => update(document.elementFromPoint(pos.x, pos.y) as HTMLElement | null);
      window.addEventListener("scroll", onScroll, { passive: true });
      const onLeave = () => cursor?.classList.remove("is-visible");
      const follow = () => {
        cur.x += (pos.x - cur.x) * 0.2;
        cur.y += (pos.y - cur.y) * 0.2;
        if (cursor) cursor.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
        craf = requestAnimationFrame(follow);
      };
      craf = requestAnimationFrame(follow);
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        cancelAnimationFrame(craf);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("pointerleave", onLeave);
        root.classList.remove("has-cursor");
      });

      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((btn) => {
        const move = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.3;
          const y = (e.clientY - r.top - r.height / 2) * 0.4;
          btn.style.transform = `translate(${x}px, ${y}px)`;
        };
        const leave = () => (btn.style.transform = "");
        btn.addEventListener("pointermove", move);
        btn.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          btn.removeEventListener("pointermove", move);
          btn.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
