"use client";

import { useEffect, useRef, useState } from "react";
import { EPISODES } from "@/lib/content";
import { useLive } from "@/lib/live";

type Msg = { id: number; who: "regie" | "sistema"; text: string };

let uid = 0;

/** Chat da régie: a cada episódio, a régie publica as notas desse momento, como numa live. */
export default function Feed() {
  const index = useLive((s) => s.index);
  const booted = useLive((s) => s.booted);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!booted) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const batch: Omit<Msg, "id">[] =
      index === 0
        ? [
            { who: "sistema", text: "Entraste na transmissão" },
            { who: "regie", text: "Boa noite. Hoje passam cinco episódios." },
          ]
        : [
            { who: "sistema", text: `Episódio ${index}: ${EPISODES[index - 1].title}` },
            ...EPISODES[index - 1].feed.map((text) => ({ who: "regie" as const, text })),
          ];
    batch.forEach((m, n) => {
      const t = window.setTimeout(() => {
        setMsgs((prev) => [...prev, { ...m, id: ++uid }].slice(-6));
      }, 250 + n * 650);
      timers.current.push(t);
    });
    return () => timers.current.forEach(clearTimeout);
  }, [index, booted]);

  return (
    <aside className="feed" aria-label="Chat da transmissão">
      <ol aria-live="polite">
        {msgs.map((m, n) => (
          <li key={m.id} className={`msg msg-${m.who}`} style={{ ["--age" as string]: msgs.length - 1 - n }}>
            {m.who === "regie" ? <b>Régie</b> : null}
            <span>{m.text}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
