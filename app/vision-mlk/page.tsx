import type { Metadata } from "next";
import { ArrowRight, ExternalLink, MapPin, Youtube } from "lucide-react";

export const metadata: Metadata = {
  title: "Église MLK - Église protestante évangélique à Créteil",
  description:
    "Découvrez l'histoire, la vision et les informations pratiques de l'Église MLK, fondée à Créteil par Ivan Carluer.",
  alternates: {
    canonical: "/vision-mlk"
  },
  openGraph: {
    title: "Église MLK - Aimé. Aimer mieux. Aimer plus.",
    description:
      "Une Église protestante évangélique à Créteil, ouverte à tous, fondée par Ivan Carluer.",
    images: [
      {
        url: "/images/mlk-history/eglise-mlk-banner.png",
        width: 2048,
        height: 1024,
        alt: "Célébration à l'Église MLK à Créteil"
      }
    ]
  }
};

const vision = [
  {
    title: "Aimé",
    text: "Parce que chacun a besoin de découvrir l'amour de Dieu et de trouver une communauté où il est accueilli avec bienveillance."
  },
  {
    title: "Aimer mieux",
    text: "Parce que la foi est appelée à grandir. Grandir dans la connaissance de Dieu, dans la maturité spirituelle et dans la ressemblance à Jésus-Christ."
  },
  {
    title: "Aimer plus",
    text: "Parce que l'Évangile transforme aussi notre manière de servir notre prochain, dans l'Église comme dans la société."
  }
];

const history = [
  {
    step: "01",
    date: "Fin 2004",
    title: "Les débuts à Créteil",
    image: "/images/mlk-history/inauguration-grand-paris.jpg",
    text: [
      "L'Église MLK est implantée à Créteil par Ivan Carluer, Christophe et Christiane Ename et une dizaine de personnes.",
      "Les premiers cultes sont organisés au 113 rue du Général Leclerc, dans les locaux de l'Église Réformée de Créteil-Charenton."
    ]
  },
  {
    step: "02",
    date: "Septembre 2008",
    title: "Les premiers locaux",
    image: "/images/mlk-history/ivan-hug.jpg",
    text: [
      "Face à la croissance de la communauté, l'Église acquiert l'ancienne agence ANPE située au 1 rue Tirard à Créteil.",
      "Après plusieurs mois de travaux, le bâtiment accueille environ 200 personnes."
    ]
  },
  {
    step: "03",
    date: "2016-2017",
    title: "Un nouveau chapitre",
    image: "/images/mlk-history/jesus-stage.jpg",
    text: [
      "Une opportunité permet d'acquérir un bâtiment situé de l'autre côté de la rue.",
      "Après une importante rénovation, l'Église MLK s'y installe au printemps 2017 afin d'accueillir une communauté devenue plus nombreuse."
    ]
  },
  {
    step: "04",
    date: "Avril 2021",
    title: "L'Espace Martin Luther King Grand Paris",
    image: "/images/mlk-history/welcome.jpg",
    text: [
      "L'Église commence à organiser ses célébrations dans l'Espace Martin Luther King Grand Paris.",
      "Ce nouveau lieu permet d'accueillir plusieurs milliers de personnes chaque semaine et d'accompagner le développement des activités de l'Église."
    ]
  },
  {
    step: "05",
    date: "Aujourd'hui",
    title: "Une Église tournée vers l'avenir",
    image: "/images/mlk-history/worship-team.jpg",
    text: [
      "Aujourd'hui, l'Église MLK rassemble plusieurs milliers de personnes chaque week-end.",
      "Au-delà des célébrations, elle développe des groupes de vie, des formations, des ministères pour tous les âges, des actions solidaires et une importante diffusion d'enseignements bibliques en ligne afin de rendre l'Évangile accessible au plus grand nombre."
    ]
  }
];

const facts = [
  ["Nom", "Église MLK (Martin Luther King)"],
  ["Type", "Église protestante évangélique"],
  ["Fondation", "2004"],
  ["Pasteur principal", "Ivan Carluer"],
  ["Ville", "Créteil"],
  ["Département", "Val-de-Marne"],
  ["Région", "Île-de-France"],
  ["Vision", "Aimé. Aimer mieux. Aimer plus."],
  ["Activités", "Cultes, enseignements bibliques, groupes de vie, conférences, formations, jeunesse, enfants"],
  ["Audience", "Plusieurs milliers de personnes chaque semaine"]
];

const faq = [
  ["Qu'est-ce que l'Église MLK ?", "L'Église MLK (Martin Luther King) est une Église protestante évangélique fondée en 2004 à Créteil par Ivan Carluer."],
  ["Où se trouve l'Église MLK ?", "L'Église est située au 1 Rue Martin Luther King, 94000 Créteil, dans le Val-de-Marne."],
  ["Qui est le pasteur de l'Église MLK ?", "Le pasteur principal de l'Église MLK est Ivan Carluer."],
  ["Quelle est la vision de l'Église MLK ?", "La vision de l'Église MLK est résumée par trois mots : Aimé. Aimer mieux. Aimer plus."],
  ["Peut-on suivre les cultes en ligne ?", "Oui. Les prédications et de nombreux enseignements sont disponibles gratuitement sur la chaîne YouTube officielle de l'Église MLK ainsi que sur ce site."],
  ["Depuis quand existe l'Église MLK ?", "L'Église MLK a été fondée en 2004 à Créteil."]
];

const churchJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Church", "Organization"],
  name: "Église MLK",
  alternateName: "Église Martin Luther King",
  url: "https://eglisemlk.fr",
  foundingDate: "2004",
  founder: {
    "@type": "Person",
    name: "Ivan Carluer"
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 Rue Martin Luther King",
    postalCode: "94000",
    addressLocality: "Créteil",
    addressRegion: "Val-de-Marne",
    addressCountry: "FR"
  },
  sameAs: ["https://www.youtube.com/@EgliseMLKCreteil"]
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer
    }
  }))
};

const gallery = [
  ["welcome.jpg", "Bienvenue à l'Église MLK"],
  ["jesus-stage.jpg", "Temps de louange à MLK"],
  ["worship-team.jpg", "Équipe de louange"],
  ["baptism-blue.jpg", "Baptême à l'Église MLK"],
  ["ivan-hug.jpg", "Accueil pastoral"],
  ["prayer-couple.jpg", "Temps de prière"],
  ["worship-purple.jpg", "Louange"],
  ["cross.jpg", "Croix"]
];

export default function VisionMlkPage() {
  return (
    <main className="page mlk-page mlk-redesign-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="mlk-page-hero compact-hero">
        <div className="container compact-hero-shell mlk-redesign-hero">
          <figure className="compact-hero-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/mlk-history/eglise-mlk-banner.png" alt="Célébration à l'Église MLK à Créteil" />
          </figure>
          <div className="compact-hero-copy">
            <p className="eyebrow">Église MLK</p>
            <h1>Une Église protestante évangélique à Créteil, ouverte à tous</h1>
          </div>
        </div>
      </section>

      <section className="container mlk-intro-card-section">
        <article className="mlk-intro-card">
          <p className="eyebrow">Créteil · Val-de-Marne</p>
          <p>
            Fondée en 2004 par Ivan Carluer, l'Église MLK est une Église protestante évangélique située à Créteil, dans
            le Val-de-Marne.
          </p>
          <p>
            De ses débuts dans une salle prêtée à Créteil jusqu'à l'Espace Martin Luther King Grand Paris, son histoire
            est portée par une même vision : Aimé. Aimer mieux. Aimer plus.
          </p>
          <a className="button warm" href="https://eglisemlk.fr" target="_blank" rel="noreferrer">
            Site officiel de l'Église MLK
            <ExternalLink size={18} />
          </a>
        </article>
      </section>

      <section className="section mlk-vision-block">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Notre vision</p>
              <h2 className="section-title">Trois mots pour dire une direction.</h2>
            </div>
          </div>
          <div className="mlk-vision-grid">
            {vision.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section mlk-history-redesign">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Histoire</p>
              <h2 className="section-title">Cinq étapes pour comprendre l'histoire de l'Église MLK.</h2>
            </div>
          </div>
          <div className="mlk-chapter-timeline">
            {history.map((item, index) => (
              <article key={item.step} style={{ ["--delay" as string]: `${index * 90}ms` }}>
                <div className="mlk-chapter-index">
                  <span>{item.step}</span>
                </div>
                <div className="mlk-chapter-copy">
                  <time>{item.date}</time>
                  <h3>{item.title}</h3>
                  {item.text.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={`${item.title} - Église MLK`} />
                </figure>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section mlk-facts-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">En quelques mots</p>
              <h2 className="section-title">Une fiche claire pour situer MLK.</h2>
            </div>
          </div>
          <div className="mlk-facts-grid">
            {facts.map(([label, value]) => (
              <article key={label}>
                <span>{label}</span>
                <p>{value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section mlk-practical-section">
        <div className="container mlk-practical-grid">
          <article>
            <MapPin size={22} />
            <h2>Informations pratiques</h2>
            <p>
              Église MLK - Espace Martin Luther King Grand Paris
              <br />
              1 Rue Martin Luther King
              <br />
              94000 Créteil
              <br />
              Val-de-Marne, Île-de-France, France
            </p>
            <a href="https://eglisemlk.fr" target="_blank" rel="noreferrer">
              https://eglisemlk.fr
            </a>
          </article>
          <article>
            <Youtube size={24} />
            <h2>YouTube</h2>
            <p>
              La chaîne YouTube de l'Église MLK rassemble plusieurs centaines de milliers d'abonnés et propose plus de
              1 500 vidéos : prédications, enseignements bibliques, conférences, séries et événements.
            </p>
            <a href="https://www.youtube.com/@EgliseMLKCreteil" target="_blank" rel="noreferrer">
              Chaîne YouTube officielle
              <ArrowRight size={16} />
            </a>
          </article>
        </div>
      </section>

      <section className="section mlk-gallery-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Communauté</p>
              <h2 className="section-title">Des visages, des moments, une maison.</h2>
            </div>
          </div>
          <div className="mlk-history-gallery mlk-redesign-gallery">
            {gallery.map(([image, alt]) => (
              <figure key={image}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/mlk-history/${image}`} alt={alt} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section mlk-faq-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Questions fréquentes</p>
              <h2 className="section-title">Les réponses essentielles.</h2>
            </div>
          </div>
          <div className="mlk-faq-list">
            {faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
