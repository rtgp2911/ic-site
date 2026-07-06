import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import type { SeriesEpisode } from "@/lib/series-types";
import { normalizeVideoId } from "@/lib/format";
import {
  formatSeriesBibleReferences,
  formatSeriesDate,
  formatSeriesDuration,
  isDisplayableSeriesValue,
  youtubeThumbnail
} from "@/lib/series-format";

type SeriesEpisodeCardProps = {
  episode: SeriesEpisode;
  compact?: boolean;
};

export function SeriesEpisodeCard({ episode, compact = false }: SeriesEpisodeCardProps) {
  const title = episode.episode_title || episode.title || "Épisode";
  const videoId = normalizeVideoId(episode.video_id);
  const thumbnail = youtubeThumbnail(videoId, episode.thumbnail_hd, episode.thumbnail_url);
  const books = episode.biblical_books.filter(isDisplayableSeriesValue).slice(0, 1);
  const references = formatSeriesBibleReferences([...episode.chapters, ...episode.verses], episode.biblical_books);
  const bibleInfo = [...books, ...references].slice(0, 3);
  const date = formatSeriesDate(episode.upload_date);
  const duration = formatSeriesDuration(episode.duration_string, episode.duration_seconds);
  const messageHref = `/messages/${encodeURIComponent(videoId)}`;
  const speaker = isDisplayableSeriesValue(episode.speaker) ? episode.speaker : "";
  const summary = isDisplayableSeriesValue(episode.summary_short) ? episode.summary_short : "";

  return (
    <Link className={`series-episode-card${compact ? " compact" : ""}`} href={messageHref} aria-label={`Voir l'épisode : ${title}`}>
      <span className="series-episode-thumb">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbnail} alt={`Miniature de l'épisode : ${title}`} loading="lazy" />
        ) : (
          <span>{episode.playlist_index}</span>
        )}
        <span>
          <Play size={15} fill="currentColor" />
        </span>
      </span>
      <div className="series-episode-content">
        <div className="series-episode-meta">
          {episode.playlist_index > 0 && <span>Épisode {episode.playlist_index}</span>}
          {speaker && <span>{speaker}</span>}
          {date && <span>{date}</span>}
          {duration && <span>{duration}</span>}
        </div>
        <h3>{title}</h3>
        {summary && <p>{summary}</p>}
        <div className="series-episode-tags">
          {bibleInfo.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="series-episode-actions">
          <span className="series-episode-primary">
            Voir la vidéo
            <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}
