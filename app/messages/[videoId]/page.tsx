import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { getMessage, getMessages } from "@/lib/data";
import { formatDate, formatDuration, normalizeVideoId } from "@/lib/format";
import { bibleSearchUrl } from "@/lib/bible";
import { slugifyTheme } from "@/lib/themes";
import { VideoNotesCard } from "@/components/VideoNotesCard";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SeriesEpisodeCard } from "@/components/SeriesEpisodeCard";
import { getSeries, getSeriesEpisodeContext } from "@/lib/series";
import {
  formatSeriesBibleReferences,
  formatSeriesDate,
  formatSeriesDuration,
  hasBibleBookName,
  isDisplayableSeriesValue
} from "@/lib/series-format";
import type { SeriesEpisode, SeriesWithEpisodes } from "@/lib/series-types";

const paramByKind = {
  book: "book",
  chapter: "chapter",
  person: "person",
  passage: "passage",
  keyword: "keyword"
} as const;

export function generateStaticParams() {
  const ids = new Set<string>();
  getMessages().forEach((message) => ids.add(message.video_id));
  getSeries().forEach((series) => {
    series.episodes.forEach((episode) => {
      if (episode.video_id) {
        try {
          ids.add(normalizeVideoId(episode.video_id));
        } catch {
          // Ignore malformed source rows instead of blocking every message page.
        }
      }
    });
  });
  return Array.from(ids).map((videoId) => ({ videoId }));
}

export default function MessagePage({ params }: { params: { videoId: string } }) {
  const message = getMessage(params.videoId);
  const seriesContext = getSeriesEpisodeContext(params.videoId);

  if (!message) {
    if (seriesContext) {
      return <SeriesEpisodeMessagePage episode={seriesContext.episode} series={seriesContext.series} />;
    }
    notFound();
  }

  const videoId = normalizeVideoId(message.video_id);
  const passages = message.passages_bibliques.slice(0, 4);
  const keyPassages = message.passages_bibliques.slice(0, 2);
  const mainTheme = message.themes[0] ?? message.category;
  const summaryPreview = truncateSummary(message.resume);

  return (
    <main className="page video-template-page">
      <ReadingProgress />
      <div className="breadcrumb">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <Link href="/messages">Prédications</Link>
        <span>/</span>
        <span>{message.themes[0] ?? message.category}</span>
      </div>

      <section className="intro-grid" aria-label="Présentation de la prédication">
        <article className="intro-card intro-title">
          <div className="intro-title-copy">
            <h1>{message.title}</h1>
            <p>
              {summaryPreview.text}
              {summaryPreview.isTruncated && (
                <>
                  {" "}
                  <Link className="inline-read-more" href="#resume-complet">
                    Lire la suite
                  </Link>
                </>
              )}
            </p>
          </div>

          <div className="meta-row" aria-label="Métadonnées">
            <span className="chip">{formatDate(message.upload_date)}</span>
            <span className="chip">{formatDuration(message.duration)}</span>
            {message.themes.slice(0, 3).map((theme) => (
              <Link className="chip" key={theme} href={`/themes/${slugifyTheme(theme)}`}>
                {theme}
              </Link>
            ))}
            {passages.slice(0, 2).map((passage) => (
              <Tag key={passage} kind="passage" value={passage} />
            ))}
          </div>
        </article>

        <article className="card video-card">
          <div className="video-context-row" aria-label="Repères rapides">
            <div className="video-context-tags">
              {keyPassages.map((passage) => (
                <Tag key={passage} kind="passage" value={passage} />
              ))}
              {mainTheme && (
                <Link className="tag context-theme" href={`/themes/${slugifyTheme(mainTheme)}`}>
                  {mainTheme}
                </Link>
              )}
            </div>
            {!!keyPassages.length && (
              <a className="btn bible-video-button" href={bibleSearchUrl(keyPassages)} target="_blank" rel="noopener noreferrer">
                Lire dans la Bible
              </a>
            )}
          </div>
          <div className="video-embed">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0&modestbranding=1&playsinline=1`}
              title={message.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </article>
      </section>

      {summaryPreview.isTruncated && (
        <section id="resume-complet" className="card full-summary-card" aria-label="Résumé complet">
          <h2>Résumé</h2>
          <p>{message.resume}</p>
        </section>
      )}

      <section className="watch-grid" aria-label="Notes et lecture biblique">
        <VideoNotesCard videoId={message.video_id} title={message.title} passages={message.passages_bibliques} />

        <section className="repere-section" aria-label="Repères">
          <div className="repere-head">
            <h2>Repères</h2>
            <p>Les thèmes, passages et mots-clés pour retrouver le fil de la prédication.</p>
          </div>

          <div className="section-grid">
            <InfoCard title="Thèmes" values={message.themes} kind="theme" />
            <InfoCard title="Livres" values={message.livres_bibliques} kind="book" />
            <InfoCard title="Chapitres" values={message.chapitres_bibliques} kind="chapter" />
            <InfoCard title="Personnages" values={message.personnages_bibliques} kind="person" />
            <InfoCard title="Passages" values={message.passages_bibliques} kind="passage" />
            {!!message.mots_cles_ia.length && <InfoCard title="Mots-clés" values={message.mots_cles_ia} kind="keyword" />}
          </div>
        </section>
      </section>

      <section className="card prayer-card" aria-label="Demande de prière">
        <div>
          <h2>Besoin de prière ?</h2>
          <p>Envoyez une demande à l’équipe de prière MLK.</p>
        </div>
        <a className="btn prayer-button" href="mailto:priere@eglisemlk.fr">
          <Mail size={17} />
          Demander une prière
        </a>
      </section>

      {seriesContext && <OtherSeriesEpisodes series={seriesContext.series} currentVideoId={message.video_id} />}
    </main>
  );
}

function truncateSummary(summary: string) {
  const limit = 310;
  if (summary.length <= limit) {
    return { text: summary, isTruncated: false };
  }

  const slice = summary.slice(0, limit);
  const lastSpace = slice.lastIndexOf(" ");
  return {
    text: `${slice.slice(0, lastSpace > 220 ? lastSpace : limit).trim()}...`,
    isTruncated: true
  };
}

function InfoCard({
  title,
  values,
  kind
}: {
  title: string;
  values: string[];
  kind: "theme" | "book" | "chapter" | "person" | "passage" | "keyword";
}) {
  const visibleValues = values.filter((value) => isVisibleTagValue(value, kind));
  if (!visibleValues.length) return null;

  return (
    <article className="mini-card">
      <h3>{title}</h3>
      <div className="tags">
        {visibleValues.map((value) => (
          <Tag key={value} kind={kind} value={value} />
        ))}
      </div>
    </article>
  );
}

function isVisibleTagValue(
  value: string,
  kind: "theme" | "book" | "chapter" | "person" | "passage" | "keyword"
) {
  if (!isDisplayableSeriesValue(value)) return false;
  if (kind === "chapter" || kind === "passage") return hasBibleBookName(value);
  return true;
}

function Tag({
  kind,
  value
}: {
  kind: "theme" | "book" | "chapter" | "person" | "passage" | "keyword";
  value: string;
}) {
  if (!isVisibleTagValue(value, kind)) return null;

  const href = kind === "theme" ? `/themes/${slugifyTheme(value)}` : `/messages?${paramByKind[kind]}=${encodeURIComponent(value)}`;
  return (
    <Link className="tag" href={href}>
      {value}
    </Link>
  );
}

function SeriesEpisodeMessagePage({
  episode,
  series
}: {
  episode: SeriesEpisode;
  series: SeriesWithEpisodes;
}) {
  const videoId = normalizeVideoId(episode.video_id);
  const title = episode.episode_title || episode.title || "Épisode";
  const passages = formatSeriesBibleReferences(episode.verses.length ? episode.verses : episode.chapters, episode.biblical_books);
  const keyPassages = passages.slice(0, 2);
  const mainTheme = (isDisplayableSeriesValue(episode.main_theme) ? episode.main_theme : series.main_theme) || "";
  const date = formatSeriesDate(episode.upload_date);
  const duration = formatSeriesDuration(episode.duration_string, episode.duration_seconds);
  const summary = episode.summary_short || episode.summary_long || series.summary_short || series.summary_long || "";
  const summaryPreview = truncateSummary(summary || "Cet épisode appartient à une série d'enseignements MLK.");

  return (
    <main className="page video-template-page">
      <ReadingProgress />
      <div className="breadcrumb">
        <Link href="/">Accueil</Link>
        <span>/</span>
        <Link href="/series">Séries</Link>
        <span>/</span>
        <Link href={`/series/${series.slug}`}>{series.title}</Link>
      </div>

      <section className="intro-grid" aria-label="Présentation de l'épisode">
        <article className="intro-card intro-title">
          <div className="intro-title-copy">
            <h1>{title}</h1>
            <p>
              {summaryPreview.text}
              {summaryPreview.isTruncated && (
                <>
                  {" "}
                  <Link className="inline-read-more" href="#resume-complet">
                    Lire la suite
                  </Link>
                </>
              )}
            </p>
          </div>

          <div className="meta-row" aria-label="Métadonnées">
            {date && <span className="chip">{date}</span>}
            {duration && <span className="chip">{duration}</span>}
            {isDisplayableSeriesValue(mainTheme) && (
              <Link className="chip" href={`/series?keyword=${encodeURIComponent(mainTheme)}`}>
                {mainTheme}
              </Link>
            )}
            <Link className="chip" href={`/series/${series.slug}`}>
              {series.title}
            </Link>
          </div>
        </article>

        <article className="card video-card">
          <div className="video-context-row" aria-label="Repères rapides">
            <div className="video-context-tags">
              {keyPassages.map((passage) => (
                <Link className="tag" key={passage} href={`/messages?passage=${encodeURIComponent(passage)}`}>
                  {passage}
                </Link>
              ))}
              {isDisplayableSeriesValue(mainTheme) && (
                <Link className="tag context-theme" href={`/series?keyword=${encodeURIComponent(mainTheme)}`}>
                  {mainTheme}
                </Link>
              )}
            </div>
            {!!keyPassages.length && (
              <a className="btn bible-video-button" href={bibleSearchUrl(keyPassages)} target="_blank" rel="noopener noreferrer">
                Lire dans la Bible
              </a>
            )}
          </div>
          <div className="video-embed">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0&modestbranding=1&playsinline=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </article>
      </section>

      {summaryPreview.isTruncated && (
        <section id="resume-complet" className="card full-summary-card" aria-label="Résumé complet">
          <h2>Résumé</h2>
          <p>{summary}</p>
        </section>
      )}

      <section className="watch-grid" aria-label="Notes et repères">
        <VideoNotesCard videoId={episode.video_id} title={title} passages={passages} />
        <section className="repere-section" aria-label="Repères">
          <div className="repere-head">
            <h2>Repères</h2>
            <p>Les thèmes, passages et mots-clés pour retrouver le fil de l'épisode.</p>
          </div>
          <div className="section-grid">
            <InfoCard title="Thèmes" values={[mainTheme, ...episode.secondary_themes].filter(isDisplayableSeriesValue)} kind="keyword" />
            <InfoCard title="Livres" values={episode.biblical_books} kind="book" />
            <InfoCard title="Chapitres" values={formatSeriesBibleReferences(episode.chapters, episode.biblical_books)} kind="chapter" />
            <InfoCard title="Personnages" values={episode.biblical_characters} kind="person" />
            <InfoCard title="Passages" values={formatSeriesBibleReferences(episode.verses, episode.biblical_books)} kind="passage" />
            {!!episode.keywords.length && <InfoCard title="Mots-clés" values={episode.keywords} kind="keyword" />}
          </div>
        </section>
      </section>

      <OtherSeriesEpisodes series={series} currentVideoId={episode.video_id} />
    </main>
  );
}

function OtherSeriesEpisodes({
  series,
  currentVideoId
}: {
  series: SeriesWithEpisodes;
  currentVideoId: string;
}) {
  const current = normalizeVideoId(currentVideoId);
  const others = series.episodes
    .filter((episode) => normalizeVideoId(episode.video_id) !== current)
    .sort((a, b) => a.playlist_index - b.playlist_index)
    .slice(0, 6);

  if (!others.length) return null;

  return (
    <section className="series-episodes-section series-episode-related">
      <div className="section-heading-row">
        <div>
          <span className="section-eyebrow">Série</span>
          <h2>Autres épisodes de cette série</h2>
        </div>
        <Link className="text-link" href={`/series/${series.slug}`}>
          Voir toute la série
        </Link>
      </div>
      <div className="series-episode-list compact-list">
        {others.map((episode) => (
          <SeriesEpisodeCard key={`${episode.video_id}-${episode.playlist_index}`} episode={episode} compact />
        ))}
      </div>
    </section>
  );
}
