import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SeriesWithEpisodes } from "@/lib/series-types";
import { getSeriesCoverTone } from "@/lib/series-colors";
import { isDisplayableSeriesValue } from "@/lib/series-format";

type SeriesCardProps = {
  series: SeriesWithEpisodes;
  matchReasons?: string[];
};

export function SeriesCard({ series, matchReasons = [] }: SeriesCardProps) {
  const tones = getSeriesCoverTone(series.title);
  const themes = series.secondary_themes.filter(isDisplayableSeriesValue).slice(0, 3);
  const count = series.computed_episodes_count || series.episodes.length;
  const countLabel = count > 0 ? `${count} épisode${count > 1 ? "s" : ""}` : "Plusieurs épisodes";
  const summary = [series.summary_short, series.summary_long].find(isDisplayableSeriesValue) || "Une série d'enseignements à explorer.";

  return (
    <article className="series-card">
      <Link className="series-card-link" href={`/series/${series.slug}`} aria-label={`Voir la série ${series.title}`}>
        <div
          className="series-card-cover"
          style={{
            background: `radial-gradient(circle at 20% 20%, ${tones[2]}, transparent 35%), linear-gradient(135deg, ${tones[0]}, ${tones[1]})`
          }}
        >
          <strong>{series.title}</strong>
        </div>
        <div className="series-card-body">
          <h2>{series.title}</h2>
          <div className="series-card-count">{countLabel}</div>
          {themes.length > 0 && (
            <div className="series-card-tags">
              {themes.map((theme) => (
                <span key={theme}>{theme}</span>
              ))}
            </div>
          )}
          {matchReasons.length > 0 && (
            <div className="series-match-reasons">
              Correspondance : {matchReasons.join(", ")}
            </div>
          )}
          <p>
            {summary}
            <span> Voir la série</span>
          </p>
          <span className="series-card-cta">
            Voir la série
            <ArrowRight size={15} />
          </span>
        </div>
      </Link>
    </article>
  );
}
