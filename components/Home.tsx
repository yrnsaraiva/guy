import { ABOUT, BUSINESSES, CONTACT, EVENTS, FACTS, HERO, NAV, PARTNERS, PERSON, TIMELINE } from "@/lib/content";
import ContactForm from "./ContactForm";
import Header from "./Header";
import Photo from "./Photo";

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="skip">Saltar para o conteúdo</a>
      <Header />

      <main id="conteudo">
        {/* Hero */}
        <section id="topo" className="hero">
          <div className="container hero-grid">
            <div className="hero-text">
              <h1>{HERO.title}</h1>
              <p className="lead">{HERO.lead}</p>
              <div className="actions">
                <a href="#contacto" className="btn btn-primary">Falar connosco</a>
                <a href="#negocios" className="btn btn-ghost">Ver negócios</a>
              </div>
            </div>
            <Photo photo={HERO.photo} className="hero-photo" />
          </div>

          <div className="container">
            <dl className="facts">
              {FACTS.map((f) => (
                <div key={f.value} className="fact">
                  <dt>{f.value}</dt>
                  <dd>{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className="section">
          <div className="container about-grid">
            <Photo photo={ABOUT.photo} ratio="4 / 5" className="about-photo" />
            <div>
              <p className="kicker">Sobre</p>
              <h2>{ABOUT.title}</h2>
              <div className="prose">
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
              <p className="kicker">Negócios</p>
              <h2>Onde trabalha</h2>
            </div>
            <ul className="biz">
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
                <p className="kicker">Eventos</p>
                <h2>Eventos recentes</h2>
              </div>
              <a href="#contacto" className="link">Levar um artista ao teu evento</a>
            </div>
            <ul className="events">
              {EVENTS.map((e) => (
                <li key={`${e.title}-${e.date}-${e.place}`} className="event">
                  <Photo photo={e.photo} ratio="4 / 3" />
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
              <p className="kicker">Percurso</p>
              <h2>Mais de uma década de trabalho</h2>
            </div>
            <ol className="timeline">
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
              <p className="kicker">Parcerias</p>
              <h2>{PARTNERS.title}</h2>
              <p className="prose-lead">{PARTNERS.text}</p>
            </div>
            <ul className="services">
              {PARTNERS.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="container">
            <ul className="logos" aria-label="Parceiros">
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
              <p className="kicker kicker-light">Contacto</p>
              <h2>Vamos trabalhar juntos</h2>
              <p className="prose-lead">Parcerias, eventos ou imprensa: deixa uma mensagem e a equipa responde.</p>
              <ul className="direct">
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
