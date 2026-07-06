export default function AboutPage() {
  return (
    <main className="page">
      <section className="about-hero">
        <div className="container">
          <p className="eyebrow">À propos</p>
          <h1>Ivan Carluer et la vision MLK.</h1>
        </div>
      </section>

      <section className="section about-content">
        <div className="container about-grid">
          <article>
            <h2>Ivan Carluer</h2>
            <p>
              Découvrir son parcours, sa manière de transmettre et l’accès à ses messages.
            </p>
            <a className="text-link" href="/ivan-carluer">Lire la page</a>
          </article>
          <article>
            <h2>Vision MLK</h2>
            <p>
              Comprendre la vision portée par l’Église MLK et poursuivre vers les ressources officielles.
            </p>
            <a className="text-link" href="/vision-mlk">Lire la page</a>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container cta-row">
          <h2>Site officiel de l’Église MLK</h2>
          <a className="button" href="https://eglisemlk.fr" target="_blank" rel="noreferrer">
            Ouvrir
          </a>
        </div>
      </section>
    </main>
  );
}
