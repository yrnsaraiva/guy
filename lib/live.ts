"use client";

import { useSyncExternalStore } from "react";

/**
 * Estado partilhado da transmissão.
 * Os valores contínuos (progress, velocity, tint…) são lidos directamente por rAF, sem re-render.
 * Só `index`, `phase` e `on` notificam o React.
 */
type Phase = "stage" | "chat" | "outro";

export const live = {
  index: 0,
  phase: "stage" as Phase,
  on: true,
  booted: false,
  velocity: 0,
  ringScale: 1.2,
  power: 1,
  tint: [1, 0.9, 0.78] as [number, number, number],
  frame: null as HTMLElement | null,
  startedAt: 0,
  endedAfter: 0,
};

const listeners = new Set<() => void>();
let version = 0;

export function emit() {
  version++;
  listeners.forEach((l) => l());
}

export function set<K extends "index" | "phase" | "on" | "booted">(k: K, v: (typeof live)[K]) {
  if (live[k] === v) return;
  live[k] = v;
  emit();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useLive<T>(pick: (s: typeof live) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => pick(live),
    () => pick(live),
  );
}

// re-export so consumers can depend on change counter if needed
export const getVersion = () => version;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function timecode(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${ss}`;
}

export function scrollToEl(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

export function scrollToY(y: number) {
  window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
