import { ABOUT, BUSINESSES, CONTACT, EVENTS, FACTS, HERO, MARQUEE, NAV, PARTNERS, PERSON, TIMELINE } from "@/lib/content";
import ContactForm from "./ContactForm";
import Header from "./Header";
import Motion from "./Motion";
import Photo from "./Photo";

function Marquee({ words, dir = 1 }: { words: string[]; dir?: number }) {
  const row = [...words, ...words];
  return (
    <div className="marquee" data-marquee={dir} aria-hidden="true">
      <div className="marquee-track">
        {[...row, ...row].map((w, i) => (
          <span key={i} className={i % 2 ? "mq-word mq-outline" : "mq-word"}>
            {w}
            <i className="mq-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div className="preloader" aria-hidden="true">
        <span className="pre-name">Guyzelh Ramos</span>
        <span className="pre-num">000</span>
      </div>
      <div className="cursor" aria-hidden="true">
        <span className="cursor-label" />
      </div>
      <Motion />
      <a href="#conteudo" className="skip">Saltar para o conteúdo</a>
      <Header />

      <main id="conteudo">
        {/* Hero */}
        <section id="topo" className="hero">
          <div className="container hero-grid">
            <div className="hero-text">
              <h1 data-split="chars" className="hero-title">
                {PERSON.name.split(" ")[0]}
                <br />
                {PERSON.name.split(" ").slice(1).join(" ")}
              </h1>
              <p className="lead hero-in" style={{ ["--d" as string]: "0.55s" }}>{HERO.lead}</p>
              <div className="actions hero-in" style={{ ["--d" as string]: "0.7s" }}>
                <a href="#contacto" className="btn btn-primary" data-magnetic>Falar connosco</a>
                <a href="#negocios" className="btn btn-ghost" data-magnetic>Ver negócios</a>
              </div>
            </div>
            <Photo photo={HERO.photo} className="hero-photo" cursor="Guyzelh" />
          </div>

          <div className="container">
            <dl className="facts" data-stagger>
              {FACTS.map((f) => (
                <div key={f.label} className="fact">
                  <dt
                    data-count={f.count}
                    data-from={f.from}
                    data-prefix={f.prefix}
                    data-suffix={f.suffix}
                    data-plain={f.plain ? "true" : undefined}
                  >
                    {f.prefix}
                    {f.plain ? f.count : f.count.toLocaleString("pt-PT").replace(/\s/g, ".")}
                    {f.suffix}
                  </dt>
                  <dd>{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Marquee words={MARQUEE} />

        {/* Sobre */}
        <section id="sobre" className="section">
          <div className="container about-grid">
            <Photo photo={ABOUT.photo} ratio="4 / 5" className="about-photo" cursor="Bastidores" />
            <div>
              <p className="kicker" data-reveal="up">Sobre</p>
              <h2 data-split="words">{ABOUT.title}</h2>
              <div className="prose" data-stagger>
                {ABOUT.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Negócios */}
        <section id="negocios" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <p className="kicker" data-reveal="up">Negócios</p>
              <h2 data-split="words">Onde trabalha</h2>
            </div>
            <ul className="biz" data-stagger>
              {BUSINESSES.map((b) => (
                <li key={b.name} className="biz-item">
                  <h3>{b.name}</h3>
                  <p className="biz-area">{b.area}</p>
                  <p className="biz-text">{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Eventos */}
        <section id="eventos" className="section">
          <div className="container">
            <div className="section-head section-head-row">
              <div>
                <p className="kicker" data-reveal="up">Eventos</p>
                <h2 data-split="words">Eventos recentes</h2>
              </div>
              <a href="#contacto" className="link" data-reveal="up">Levar um artista ao teu evento</a>
            </div>
            <ul className="events" data-stagger>
              {EVENTS.map((e) => (
                <li key={`${e.title}-${e.date}-${e.place}`} className="event">
                  <Photo photo={e.photo} ratio="4 / 3" cursor="Ver" />
                  <p className="event-meta">
                    {e.date}, {e.place}
                  </p>
                  <h3>{e.title}</h3>
                  <p className="event-artists">Com {e.artists}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Percurso */}
        <section id="percurso" className="section section-alt">
          <div className="container timeline-grid">
            <div className="section-head">
              <p className="kicker" data-reveal="up">Percurso</p>
              <h2 data-split="words">Mais de uma década de trabalho</h2>
            </div>
            <ol className="timeline" data-progress data-stagger>
              {TIMELINE.map((t) => (
                <li key={t.year + t.title}>
                  <span className="t-year">{t.year}</span>
                  <div>
                    <h3>{t.title}</h3>
                    <p>{t.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Parcerias */}
        <section className="section">
          <div className="container partners-grid">
            <div>
              <p className="kicker" data-reveal="up">Parcerias</p>
              <h2 data-split="words">{PARTNERS.title}</h2>
              <p className="prose-lead" data-reveal="up">{PARTNERS.text}</p>
            </div>
            <ul className="services" data-stagger>
              {PARTNERS.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="container">
            <ul className="logos" aria-label="Parceiros" data-stagger>
              {PARTNERS.logos.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="section contact">
          <div className="container contact-grid">
            <div>
              <p className="kicker kicker-light" data-reveal="up">Contacto</p>
              <h2 data-split="words">Vamos trabalhar juntos</h2>
              <p className="prose-lead" data-reveal="up">Parcerias, eventos ou imprensa: deixa uma mensagem e a equipa responde.</p>
              <ul className="direct" data-stagger>
                <li>
                  <span>E-mail</span>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </li>
                <li>
                  <span>WhatsApp</span>
                  <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">{CONTACT.whatsappLabel}</a>
                </li>
                <li>
                  <span>Instagram</span>
                  <a href={CONTACT.instagram} target="_blank" rel="noreferrer">Seguir no Instagram</a>
                </li>
              </ul>
            </div>
            <ContactForm />
          </div>
          <div className="contact-marquee">
            <Marquee words={["Vamos trabalhar juntos"]} dir={-1} />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} {PERSON.name}. {PERSON.city}.
          </p>
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
