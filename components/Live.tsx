"use client";

import { useEffect } from "react";
import { live } from "@/lib/live";
import Chat from "./Chat";
import Hud from "./Hud";
import Outro, { OffScreen } from "./Outro";
import Preloader from "./Preloader";
import SignalCanvas from "./SignalCanvas";
import Stage from "./Stage";

export default function Live() {
  // velocidade do scroll (alimenta a interferência do sinal e a largura do nome)
  // e intensidade da luz conforme a secção
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      const v = Math.abs(y - last) / Math.max(window.innerHeight * 0.06, 1);
      live.velocity += (v - live.velocity) * 0.2;
      last = y;

      const chat = document.getElementById("chat");
      if (chat) {
        const top = chat.getBoundingClientRect().top;
        const p = 1 - Math.min(Math.max(top / window.innerHeight, 0), 1);
        live.power = 1 - p * 0.72;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <SignalCanvas />
      <Preloader />
      <Hud />
      <main>
        <Stage />
        <Chat />
        <Outro />
      </main>
      <OffScreen />
    </>
  );
}
