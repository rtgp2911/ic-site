import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeriesEpisodeCard } from "@/components/SeriesEpisodeCard";
import { getSeries, getSeriesBySlug } from "@/lib/series";
import { getSeriesCoverTone } from "@/lib/series-colors";
import { isDisplayableSeriesValue } from "@/lib/series-format";

type SeriesDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  const params = getSeries().map((series) => ({ slug: series.slug }));
  if (!params.some((param) => param.slug === "puissance-7")) {
    params.push({ slug: "puissance-7" });
  }
  return params;
}

export function generateMetadata({ params }: SeriesDetailPageProps): Metadata {
  const series = getSeriesBySlug(params.slug);

  if (!series && params.slug === "puissance-7") {
    return {
      title: "Puissance 7 | Séries Ivan Carluer",
      description: "Retrouver les enseignements Puissance 7 de l'Église MLK."
    };
  }

  if (!series) {
    return {
      title: "Série introuvable | Ivan Carluer"
    };
  }

  return {
    title: `${series.title} | Séries Ivan Carluer`,
    description: series.summary_short || series.summary_long || `Regarder la série ${series.title}.`
  };
}

export default function SeriesDetailPage({ params }: SeriesDetailPageProps) {
  const series = getSeriesBySlug(params.slug);
  if (!series && params.slug === "puissance-7") {
    const tones = getSeriesCoverTone("Puissance 7");
    return (
      <main className="page-shell series-detail-page">
        <section
          className="series-detail-hero tone-hero"
          style={{
            ["--series-tone-a" as string]: tones[0],
            ["--series-tone-b" as string]: tones[1],
            ["--series-tone-c" as string]: tones[2]
          }}
        >
          <div className="series-detail-heading">
            <span className="section-eyebrow">Série</span>
            <h1>Puissance 7</h1>
          </div>
        </section>
      </main>
    );
  }

  if (!series) notFound();

  const tones = getSeriesCoverTone(series.title);
  const summary = [series.summary_long, series.summary_short].find(isDisplayableSeriesValue);
  const audience = isDisplayableSeriesValue(series.who_should_watch) ? series.who_should_watch : "";
  const learning = isDisplayableSeriesValue(series.what_you_will_learn) ? series.what_you_will_learn : "";

  return (
    <main className="page-shell series-detail-page">
      <section
        className="series-detail-hero tone-hero"
        style={{
          ["--series-tone-a" as string]: tones[0],
          ["--series-tone-b" as string]: tones[1],
          ["--series-tone-c" as string]: tones[2]
        }}
      >
        <div className="series-detail-heading">
          <span className="section-eyebrow">Série</span>
          <h1>{series.title}</h1>
        </div>
      </section>

      <section className="series-detail-grid">
        <article className="series-detail-panel main">
          <h2>Pourquoi regarder cette série ?</h2>
          <p>{summary || "Cette série rassemble plusieurs enseignements à parcourir dans l'ordre."}</p>
        </article>
        <aside className="series-detail-panel">
          {audience && (
            <div>
              <h2>Pour qui ?</h2>
              <p>{audience}</p>
            </div>
          )}
          {learning && (
            <div>
              <h2>Ce que vous allez apprendre</h2>
              <p>{learning}</p>
            </div>
          )}
        </aside>
      </section>

      <section className="series-episodes-section">
        <div className="section-heading-row">
          <div>
            <span className="section-eyebrow">Épisodes</span>
            <h2>Regarder la série</h2>
          </div>
          <p>{series.episodes.length} épisode{series.episodes.length > 1 ? "s" : ""} dans l&apos;ordre de la playlist.</p>
        </div>

        {series.episodes.length > 0 ? (
          <div className="series-episode-list">
            {series.episodes.map((episode) => (
              <SeriesEpisodeCard key={`${episode.video_id}-${episode.playlist_index}`} episode={episode} />
            ))}
          </div>
        ) : (
          <div className="series-empty compact">
            <h2>Épisodes en cours de synchronisation</h2>
            <p>Les épisodes associés à cette série apparaîtront dès que la feuille “Vidéos Séries” sera disponible.</p>
          </div>
        )}
      </section>
    </main>
  );
}
