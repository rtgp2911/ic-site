import Link from "next/link";
import { ArrowRight } from "lucide-react";

const intro = [
  "Depuis plus de vingt ans, Ivan Carluer enseigne la Bible avec une approche à la fois rigoureuse, accessible et profondément centrée sur l'Évangile. Pasteur protestant évangélique français et fondateur de l'Église MLK (Martin Luther King) à Créteil, il accompagne chaque semaine des milliers de personnes à découvrir Jésus-Christ, comprendre les Écritures et grandir dans leur foi.",
  "Son parcours est marqué par une histoire personnelle de reconstruction, une solide formation universitaire et théologique, ainsi qu'une conviction : bâtir une Église ouverte à toutes les générations, toutes les cultures et toutes les histoires."
];

const chapters = [
  {
    title: "Une foi reconstruite",
    image: "/images/mlk-history/ivan-smile.jpg",
    paragraphs: [
      "Né en 1980 à Brest, en Bretagne, Ivan Carluer grandit dans une communauté protestante évangélique très conservatrice, marquée par le contrôle, la peur, le légalisme et une forte fermeture au monde extérieur.",
      "À l'âge de quatorze ans, sa famille quitte cette communauté après en avoir dénoncé les dérives.",
      "Cette rupture aurait pu devenir une rupture avec Dieu. Elle devient au contraire le point de départ d'une reconstruction spirituelle.",
      "Ivan Carluer ne quitte pas Dieu. Il redécouvre Dieu.",
      "Cette expérience influence durablement sa compréhension de la Bible, de la grâce et du ministère pastoral. Elle façonne également sa manière d'accompagner les personnes et de construire une Église où la foi repose sur l'amour de Dieu, la vérité de l'Évangile et la liberté en Jésus-Christ."
    ]
  },
  {
    title: "Comprendre avant d'enseigner",
    image: "/images/ivan/ivan-carluer-2.jpg",
    paragraphs: [
      "Avant de devenir pasteur, Ivan Carluer étudie le droit privé, l'économie-gestion et le management des organisations à la Sorbonne. Il obtient ensuite l'agrégation d'économie-gestion avant de poursuivre une formation théologique à la Southwestern Assemblies of God University, au Texas.",
      "Cette double formation nourrit une approche où se rejoignent réflexion, pédagogie et profondeur biblique.",
      "Ses prédications cherchent à rendre les Écritures compréhensibles sans en réduire la richesse. Elles s'appuient sur le contexte historique, culturel et littéraire des textes afin d'aider chacun à mieux comprendre la Bible et à l'appliquer dans sa vie quotidienne."
    ],
    tags: [
      "Jésus-Christ",
      "la grâce",
      "les Évangiles",
      "la foi chrétienne",
      "la prière",
      "le Saint-Esprit",
      "le pardon",
      "le couple et la famille",
      "les émotions",
      "la souffrance",
      "le leadership chrétien",
      "la mission",
      "l'Église",
      "la vie de disciple"
    ]
  },
  {
    title: "Une Église née d'un rêve",
    image: "/images/mlk-history/inauguration-grand-paris.jpg",
    paragraphs: [
      "En 2004, Ivan Carluer implante l'Église MLK (Martin Luther King) à Créteil avec une dizaine de personnes.",
      "L'Église MLK est une Église protestante évangélique située à Créteil, dont la vision est de permettre à chacun de découvrir l'amour de Dieu, de grandir dans sa foi et de vivre l'Évangile au quotidien.",
      "Le choix du nom exprime une conviction : construire une communauté ouverte, accueillante et profondément centrée sur Jésus-Christ.",
      "Aujourd'hui, l'Église MLK rassemble plus de 3 000 personnes chaque week-end et poursuit cette mission grâce à ses célébrations, ses groupes, ses formations et la diffusion de centaines de prédications et d'enseignements bibliques accessibles gratuitement en ligne."
    ]
  },
  {
    title: "Aimé. Aimer mieux. Aimer plus.",
    image: "/images/mlk-history/ivan-hug.jpg",
    paragraphs: ["La vision de l'Église MLK repose sur trois mouvements."],
    movements: [
      ["Aimé", "Découvrir l'amour de Dieu et être accueilli dans une communauté où chacun a sa place."],
      ["Aimer mieux", "Grandir dans la connaissance de Dieu, dans le caractère, la maturité spirituelle et la ressemblance à Jésus-Christ."],
      ["Aimer plus", "Vivre l'Évangile au quotidien en servant les autres dans sa famille, son travail, son Église et la société."]
    ]
  },
  {
    title: "Une croissance accompagnée de responsabilité",
    image: "/images/mlk-history/worship-team.jpg",
    paragraphs: [
      "Depuis son implantation en 2004, l'Église MLK connaît une croissance importante.",
      "De douze personnes à ses débuts, elle rassemble aujourd'hui plus de 3 000 personnes chaque week-end, auxquelles s'ajoutent les nombreuses personnes qui suivent les prédications et les enseignements bibliques en ligne.",
      "Pour Ivan Carluer, cette croissance s'accompagne d'une forte culture de responsabilité.",
      "Marqué par son histoire personnelle, il porte une attention particulière aux dérives de pouvoir qui peuvent exister dans les organisations religieuses.",
      "L'Église MLK met ainsi en avant une gouvernance collégiale, une transparence financière, une redevabilité pastorale et des mécanismes destinés à favoriser un fonctionnement responsable."
    ]
  }
];

const facts = [
  ["Nom", "Ivan Carluer"],
  ["Fonction", "Pasteur protestant évangélique"],
  ["Église", "Église MLK (Martin Luther King)"],
  ["Fondation de l'Église", "2004"],
  ["Ville", "Créteil"],
  ["Département", "Val-de-Marne"],
  ["Région", "Île-de-France"],
  ["Spécialités", "Prédications, sermons, enseignement de la Bible, leadership chrétien"],
  ["Public", "Plusieurs milliers de personnes chaque semaine"]
];

const timeline = [
  ["1980", "Naissance à Brest."],
  ["1994", "Sa famille quitte une communauté religieuse marquée par des dérives."],
  ["2003", "Obtention de l'agrégation d'économie-gestion."],
  ["2004", "Implantation de l'Église Martin Luther King à Créteil."],
  ["2006", "Mariage avec Nathalie."],
  ["2008", "Premier bâtiment de l'Église MLK."],
  ["2021", "Inauguration de l'Espace Martin Luther King Grand Paris."],
  ["Aujourd'hui", "Ses enseignements sont suivis chaque semaine en présentiel et en ligne."]
];

export default function IvanCarluerPage() {
  return (
    <main className="page ivan-documentary ivan-public-page">
      <section className="ivan-public-hero">
        <div className="container">
          <div className="ivan-public-hero-copy">
            <p className="eyebrow">Ivan Carluer</p>
            <h1>Pasteur, enseignant de la Bible et fondateur de l'Église MLK</h1>
            <Link className="button warm" href="/messages">
              Découvrir les messages
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="container ivan-intro-card-section">
        <article className="ivan-intro-card">
          <p className="eyebrow">Son ministère</p>
          {intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </section>

      <section className="ivan-public-stack container" aria-label="Histoire d'Ivan Carluer">
        {chapters.map((chapter, index) => (
          <article className="ivan-public-card" key={chapter.title}>
            <div className="ivan-public-number">{String(index + 1).padStart(2, "0")}</div>
            <div className="ivan-public-copy">
              <h2>{chapter.title}</h2>
              {chapter.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {chapter.tags && (
                <div className="ivan-theme-list" aria-label="Thèmes principaux">
                  {chapter.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
              {chapter.movements && (
                <div className="ivan-movement-grid">
                  {chapter.movements.map(([title, text]) => (
                    <div key={title}>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={chapter.image} alt={`${chapter.title} - Ivan Carluer`} />
            </figure>
          </article>
        ))}
      </section>

      <section className="container ivan-facts-section">
        <p className="eyebrow">En quelques mots</p>
        <div className="ivan-facts-grid">
          {facts.map(([label, value]) => (
            <article key={label}>
              <span>{label}</span>
              <p>{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container ivan-public-timeline-section">
        <p className="eyebrow">Repères</p>
        <h2>Les étapes qui éclairent son parcours.</h2>
        <div className="ivan-public-timeline">
          {timeline.map(([year, text], index) => (
            <article key={year} style={{ ["--delay" as string]: `${index * 90}ms` }}>
              <span>{year}</span>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container ivan-mlk-info" aria-label="Église MLK">
        <div>
          <p className="eyebrow">Église MLK</p>
          <h2>Église MLK (Martin Luther King)</h2>
          <p>
            L'Espace Martin Luther King Grand Paris accueille les célébrations, conférences, formations et événements
            organisés par l'Église MLK tout au long de l'année.
          </p>
        </div>
        <div className="ivan-mlk-card">
          <h3>Adresse</h3>
          <p>
            1 Rue Martin Luther King
            <br />
            94000 Créteil
            <br />
            Val-de-Marne, Île-de-France
            <br />
            France
          </p>
          <a href="https://eglisemlk.fr" target="_blank" rel="noreferrer">
            Site officiel de l'église
          </a>
          <a href="https://www.youtube.com/@EgliseMLKCreteil" target="_blank" rel="noreferrer">
            Chaîne YouTube officielle
          </a>
          <p>
            La chaîne YouTube officielle de l'Église MLK propose plus de 1 500 vidéos, comprenant des prédications, des
            sermons, des séries bibliques, des conférences et des enseignements accessibles gratuitement.
          </p>
          <Link className="button warm" href="/messages">
            Découvrir les enseignements d'Ivan Carluer
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
