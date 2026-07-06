export default function MentionsLegalesPage() {
  return (
    <main className="page legal-page">
      <section className="legal-hero">
        <div className="container">
          <p className="eyebrow">Informations légales</p>
          <h1>Mentions légales</h1>
        </div>
      </section>

      <section className="container legal-content">
        <article>
          <h2>Éditeur du site</h2>
          <p>Le site ivancarluer.fr est édité par :</p>
          <p>
            Église Martin Luther King (Association)
            <br />
            Siège social
            <br />
            2 Rue Tirard
            <br />
            94000 Créteil
            <br />
            France
          </p>
          <p>Email : secretariat@eglisemlk.fr</p>
        </article>

        <article>
          <h2>Directeur de la publication</h2>
          <p>
            Nathalie Carluer
            <br />
            Contact : contact@eglisemlk.fr
          </p>
        </article>

        <article>
          <h2>Direction du pôle communication</h2>
          <p>
            Florent Carluer
            <br />
            Contact : florent.carluer@eglisemlk.fr
          </p>
        </article>

        <article>
          <h2>Hébergement</h2>
          <p>
            Amazon Web Services, Inc.
            <br />
            P.O. Box 81226
            <br />
            Seattle, WA 98108-1226
            <br />
            États-Unis
          </p>
          <a href="https://aws.amazon.com" target="_blank" rel="noreferrer">
            https://aws.amazon.com
          </a>
        </article>

        <article>
          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur le site ivancarluer.fr, notamment les textes, prédications, sermons,
            enseignements bibliques, photographies, vidéos, illustrations, graphismes, logos, documents téléchargeables
            et éléments multimédias, est protégé par le Code de la propriété intellectuelle ainsi que par les conventions
            internationales relatives au droit d'auteur.
          </p>
          <p>
            Toute reproduction, représentation, diffusion, adaptation ou exploitation, totale ou partielle, sans
            autorisation écrite préalable de l'Église Martin Luther King, est interdite.
          </p>
        </article>

        <article>
          <h2>Crédits</h2>
          <p>Les photographies et illustrations utilisées sur ce site proviennent notamment des sources suivantes :</p>
          <ul>
            <li>Shutterstock</li>
            <li>Unsplash</li>
            <li>Freepik</li>
          </ul>
          <p>Certaines photographies et vidéos sont également réalisées par les équipes de communication de l'Église MLK.</p>
        </article>
      </section>
    </main>
  );
}
