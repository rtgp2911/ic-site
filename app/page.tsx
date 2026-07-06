import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { getFacets, getMessages } from "@/lib/data";
import { ContentRail } from "@/components/ContentRail";
import { HomeDiscoveryAssistant } from "@/components/HomeDiscoveryAssistant";
import { slugifyTheme } from "@/lib/themes";

export default function HomePage() {
  const messages = getMessages();
  const facets = getFacets(messages);
  const latest = messages.slice(0, 8);
  const trialMessages = messages.filter((message) => message.themes.includes("Épreuves")).slice(0, 8);
  const oldTestamentMessages = messages.filter((message) => message.testaments.includes("Ancien Testament")).slice(0, 8);
  const newTestamentMessages = messages.filter((message) => message.testaments.includes("Nouveau Testament")).slice(0, 8);

  return (
    <main className="page">
      <section className="home-hero">
        <div className="container hero-luminous-shell">
          <picture className="hero-main-picture">
            <source media="(max-width: 760px)" srcSet="/images/ivan-home-mobile.png" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-main-photo" src="/images/ivan-carluer-hero.png" alt="Ivan Carluer" />
          </picture>
          <div className="hero-lightwash" />
          <div className="hero-copy">
            <h1>Ivan Carluer</h1>
            <p>
              Pasteur, enseignant et fondateur de l’Église MLK, Ivan Carluer porte un message centré sur Jésus, l’amour
              de Dieu, la grâce et une foi qui transforme la vie.
            </p>
            <div className="hero-actions">
              <Link className="button warm" href="/messages">
                <PlayCircle size={19} />
                Découvrir ses messages
              </Link>
              <Link className="button ghost-on-dark" href="/vision-mlk">
                Découvrir l’Église MLK
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HomeDiscoveryAssistant messages={messages} />

      <ContentRail title="Derniers enseignements" kicker="À écouter maintenant" messages={latest} href="/messages" />
      <ContentRail title="Traverser les épreuves" messages={trialMessages} href="/themes/epreuves" />
      <ContentRail title="Ancien Testament" messages={oldTestamentMessages} href="/messages?testament=Ancien%20Testament" />
      <ContentRail title="Nouveau Testament" messages={newTestamentMessages} href="/messages?testament=Nouveau%20Testament" />

      <section className="section about-home-section">
        <div className="container about-home-grid">
          <div>
            <p className="eyebrow">À propos d’Ivan Carluer</p>
            <h2>Une voix pastorale pour une foi vivante.</h2>
          </div>
          <div>
            <p>
              Ivan Carluer enseigne une foi centrée sur Jésus, enracinée dans la Bible et attentive aux vies réelles.
              Ses messages abordent la grâce, l’amour de Dieu, la transformation intérieure et l’appel à servir.
            </p>
            <Link className="button secondary" href="/ivan-carluer">
              Découvrir son parcours
            </Link>
          </div>
        </div>
      </section>

      <section className="section mlk-home-section">
        <div className="container mlk-home-grid">
          <div className="mlk-home-copy">
            <p className="eyebrow">Église MLK</p>
            <h2>Une église qui veut aimer, aimer mieux, aimer plus.</h2>
            <p>
              L'Église MLK grandit autour d’une conviction simple : être aimé, apprendre à aimer mieux, et aimer plus
              largement.
            </p>
            <Link className="button" href="/vision-mlk">
              Découvrir l’Église MLK
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="mlk-media-wall" aria-hidden="true">
            <div className="mlk-tile large" />
            <div className="mlk-tile" />
            <div className="mlk-tile soft" />
            <div className="mlk-tile wide" />
            <div className="mlk-tile calm" />
            <div className="mlk-tile bright" />
            <div className="mlk-tile community" />
          </div>
        </div>
      </section>

      <section className="section quick-access">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Trouver un message</p>
              <h2 className="section-title">Rechercher par année, thème ou texte biblique.</h2>
            </div>
            <Link className="button secondary" href="/messages">
              Tous les messages
            </Link>
          </div>
          <div className="access-grid">
            <div>
              <h2>Années</h2>
              <div className="chip-cloud">
                {facets.years.slice(0, 12).map((year) => (
                  <Link className="chip" key={year} href={`/messages?year=${encodeURIComponent(year)}`}>
                    {year}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2>Thèmes</h2>
              <div className="chip-cloud">
                {facets.themes.slice(0, 12).map((theme) => (
                  <Link className="chip" key={theme} href={`/themes/${slugifyTheme(theme)}`}>
                    {theme}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
