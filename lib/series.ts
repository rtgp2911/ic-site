import rawSeries from "@/data/series.json";
import rawEpisodes from "@/data/series-episodes.json";
import { compareBibleBooks } from "@/lib/bible";
import type { Series, SeriesEpisode, SeriesWithEpisodes } from "@/lib/series-types";

function clean(value?: string) {
  return (value ?? "").trim();
}

export function slugifySeries(value: string) {
  return clean(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function key(value: string) {
  return clean(value).toLowerCase();
}

function normalizedKey(value: string) {
  return key(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeSeriesVideoId(value: string) {
  return clean(value).replace(/^\/+/, "");
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.map(clean).filter(Boolean))).sort((a, b) => a.localeCompare(b, "fr"));
}

function matchesSeries(series: Series, episode: SeriesEpisode) {
  const seriesGroup = key(series.series_group);
  const episodeGroup = key(episode.series_group);
  const title = key(series.title);
  const playlistTitle = key(episode.playlist_title);

  return Boolean(
    (seriesGroup && episodeGroup && seriesGroup === episodeGroup) ||
      (title && playlistTitle && title === playlistTitle) ||
      (seriesGroup && playlistTitle && seriesGroup === playlistTitle)
  );
}

export function getSeries(): SeriesWithEpisodes[] {
  const episodes = rawEpisodes as SeriesEpisode[];

  return (rawSeries as Series[])
    .map((series) => {
      const linkedEpisodes = episodes
        .filter((episode) => matchesSeries(series, episode))
        .sort((a, b) => a.playlist_index - b.playlist_index);

      const levels = uniqueSorted(linkedEpisodes.map((episode) => episode.level));
      const hasAnalysis = linkedEpisodes.some((episode) => clean(episode.analysis_status));

      return {
        ...series,
        episodes: linkedEpisodes,
        episode_titles: linkedEpisodes.map((episode) => episode.episode_title || episode.title).filter(Boolean),
        levels,
        has_transcript: linkedEpisodes.some((episode) => episode.has_transcript),
        has_analysis: hasAnalysis,
        computed_episodes_count: series.episodes_count || linkedEpisodes.length
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, "fr"));
}

export function getSeriesBySlug(slug: string) {
  if (slug === "puissance-7") {
    return getPuissance7Series();
  }

  return getSeries().find((series) => series.slug === slug);
}

export function isPuissance7Series(series: SeriesWithEpisodes | Series) {
  const source = [series.title, series.series_group, "episodes" in series ? series.episodes.map((episode) => episode.playlist_title).join(" ") : ""]
    .map(normalizedKey)
    .join(" ");

  return source.includes("puissance 7") || source.includes("mercredi c est puissance 7") || source.includes("mercredi cest puissance 7");
}

export function getPuissance7Series() {
  return getSeries().find(isPuissance7Series);
}

export function getSeriesEpisodeContext(videoId: string) {
  const id = normalizeSeriesVideoId(videoId);

  for (const series of getSeries()) {
    const episode = series.episodes.find((item) => normalizeSeriesVideoId(item.video_id) === id);
    if (episode) {
      return { series, episode };
    }
  }

  return null;
}

export function getSeriesFacets(seriesList = getSeries()) {
  const episodes = seriesList.flatMap((series) => series.episodes);

  return {
    testaments: uniqueSorted(episodes.map((episode) => episode.testament)),
    books: uniqueSorted([
      ...seriesList.flatMap((series) => series.biblical_books),
      ...episodes.flatMap((episode) => episode.biblical_books)
    ]).sort(compareBibleBooks),
    chapters: uniqueSorted(episodes.flatMap((episode) => episode.chapters)),
    characters: uniqueSorted([
      ...seriesList.flatMap((series) => series.biblical_characters),
      ...episodes.flatMap((episode) => episode.biblical_characters)
    ]),
    keywords: uniqueSorted([
      ...seriesList.flatMap((series) => series.keywords),
      ...episodes.flatMap((episode) => episode.keywords)
    ])
  };
}
