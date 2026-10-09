"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/content";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const topic = String(data.get("topic") || "");
    const message = String(data.get("message") || "").trim();

    const next: Errors = {};
    if (!name) next.name = "Indica o teu nome ou o da empresa.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Indica um e-mail válido, por exemplo nome@empresa.co.mz.";
    if (message.length < 10) next.message = "Escreve pelo menos uma frase sobre o pedido.";
    setErrors(next);
    if (Object.keys(next).length) return;

    // Sem servidor: abre o e-mail do visitante com a mensagem preenchida.
    // Para envio directo, ligar a um serviço de formulários (ex.: Netlify Forms, Formspree).
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="form-row">
        <label className="field">
          <span>Nome ou empresa</span>
          <input name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
          {errors.name ? <small id="err-name" className="error">{errors.name}</small> : null}
        </label>
        <label className="field">
          <span>E-mail</span>
          <input name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
          {errors.email ? <small id="err-email" className="error">{errors.email}</small> : null}
        </label>
      </div>
      <label className="field">
        <span>Assunto</span>
        <select name="topic" defaultValue={CONTACT.topics[0]}>
          {CONTACT.topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Mensagem</span>
        <textarea name="message" rows={5} aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} />
        {errors.message ? <small id="err-message" className="error">{errors.message}</small> : null}
      </label>
      <button type="submit" className="btn btn-primary">Enviar mensagem</button>
      {sent ? (
        <p className="form-note" role="status">
          A mensagem abriu no teu programa de e-mail. Se não abriu, escreve para {CONTACT.email}.
        </p>
      ) : null}
    </form>
  );
}
