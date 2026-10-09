"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT, TOPICS } from "@/lib/content";

type Topic = (typeof TOPICS)[number];
type Msg =
  | { id: number; from: "regie"; text: string; links?: { label: string; href: string }[] }
  | { id: number; from: "tu"; name: string; topic: Topic; text: string };

let uid = 0;

export default function Chat() {
  const [topic, setTopic] = useState<Topic>(TOPICS[0]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: ++uid, from: "regie", text: "Este é o chat da equipa do Guyzelh. Escolhe o assunto e escreve como escreverias numa live." },
  ]);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Escreve a mensagem antes de enviar.");
      return;
    }
    setError("");
    const who = name.trim() || "Sem nome";
    const body = `[${topic}] ${who}: ${text.trim()}`;
    setMsgs((m) => [...m, { id: ++uid, from: "tu", name: who, topic, text: text.trim() }]);
    setText("");
    window.setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          id: ++uid,
          from: "regie",
          text: `Mensagem pronta para a equipa (${topic.toLowerCase()}). Escolhe por onde a enviar:`,
          links: [
            { label: "Enviar por WhatsApp", href: `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(body)}` },
            { label: "Enviar por e-mail", href: `mailto:${CONTACT.email}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}` },
          ],
        },
      ]);
    }, 700);
  };

  return (
    <section id="chat" className="chat-section" aria-labelledby="chat-title">
      <div className="chat-intro">
        <h2 id="chat-title">Entra no chat.</h2>
        <p>
          Marcas que querem estar na próxima live, promotores com uma data por fechar, jornalistas com uma pergunta.
          Tudo começa aqui.
        </p>
      </div>

      <div className="chat-window">
        <ol className="chat-list" ref={listRef} aria-live="polite">
          {msgs.map((m) =>
            m.from === "regie" ? (
              <li key={m.id} className="bubble bubble-regie">
                <b>Régie</b>
                <span>{m.text}</span>
                {m.links ? (
                  <span className="bubble-links">
                    {m.links.map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    ))}
                  </span>
                ) : null}
              </li>
            ) : (
              <li key={m.id} className="bubble bubble-tu">
                <b>{m.name}</b>
                <em>{m.topic}</em>
                <span>{m.text}</span>
              </li>
            ),
          )}
        </ol>

        <form className="chat-form" onSubmit={send} noValidate>
          <fieldset className="topics">
            <legend className="sr-only">Assunto</legend>
            {TOPICS.map((t) => (
              <label key={t} className={`chip ${topic === t ? "is-on" : ""}`}>
                <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} />
                {t}
              </label>
            ))}
          </fieldset>
          <label className="field">
            <span className="sr-only">O teu nome ou empresa</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="O teu nome ou empresa" autoComplete="name" />
          </label>
          <div className="send-row">
            <label className="field grow">
              <span className="sr-only">Mensagem</span>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escreve um comentário…"
                aria-invalid={!!error}
                aria-describedby={error ? "chat-error" : undefined}
              />
            </label>
            <button type="submit" className="send">Enviar mensagem</button>
          </div>
          {error ? (
            <p id="chat-error" className="chat-error">
              {error}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
