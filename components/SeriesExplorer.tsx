"use client";

import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SeriesCard } from "@/components/SeriesCard";
import { SearchBar } from "@/components/SearchBar";
import { isPuissance7Series } from "@/lib/series";
import type { SeriesWithEpisodes } from "@/lib/series-types";

type SeriesExplorerProps = {
  series: SeriesWithEpisodes[];
  initialFilters?: {
    sort?: string;
    group?: string;
    q?: string;
  };
};

type SortMode = "alpha" | "recent" | "oldest";
type SeriesSearchResult = SeriesWithEpisodes & {
  searchReasons?: string[];
};

const matchLabels: Record<string, string> = {
  title: "titre",
  summary_short: "résumé",
  summary_long: "résumé",
  main_theme: "thèmes",
  secondary_themes: "thèmes",
  biblical_books: "livres bibliques",
  biblical_characters: "personnages",
  keywords: "mots-clés",
  episode_titles: "épisodes"
};

function parseSeriesDate(value: string) {
  if (!value) return 0;
  const compact = value.replaceAll("-", "").trim();
  if (/^\d{8}$/.test(compact)) {
    const year = Number(compact.slice(0, 4));
    const month = Number(compact.slice(4, 6)) - 1;
    const day = Number(compact.slice(6, 8));
    const time = new Date(year, month, day).getTime();
    return Number.isFinite(time) ? time : 0;
  }

  const time = Date.parse(value);
  return Number.isFinite(time) ? time : 0;
}

function latestEpisodeTime(series: SeriesWithEpisodes) {
  return Math.max(0, ...series.episodes.map((episode) => parseSeriesDate(episode.upload_date)));
}

function sortSeries<T extends SeriesWithEpisodes>(items: T[], sort: SortMode) {
  return [...items].sort((a, b) => {
    const alpha = a.title.localeCompare(b.title, "fr", { sensitivity: "base" });
    if (sort === "recent") return latestEpisodeTime(b) - latestEpisodeTime(a) || alpha;
    if (sort === "oldest") return latestEpisodeTime(a) - latestEpisodeTime(b) || alpha;
    return a.title.localeCompare(b.title, "fr", { sensitivity: "base" });
  });
}

function matchReasons(paths: Array<string | number>[] | undefined) {
  const reasons = new Set<string>();

  paths?.forEach((path) => {
    const key = String(path[0] ?? "");
    const label = matchLabels[key];
    if (label) reasons.add(label);
  });

  return Array.from(reasons);
}

export function SeriesExplorer({ series, initialFilters }: SeriesExplorerProps) {
  const searchParams = useSearchParams();
  const urlFilters = useMemo(
    () => ({
      q: searchParams.get("q") ?? initialFilters?.q ?? "",
      group: searchParams.get("group") ?? initialFilters?.group ?? "",
      sort: searchParams.get("sort") ?? initialFilters?.sort ?? ""
    }),
    [initialFilters?.group, initialFilters?.q, initialFilters?.sort, searchParams]
  );
  const [query, setQuery] = useState(urlFilters.q);
  const [sort, setSort] = useState<SortMode>(
    urlFilters.sort === "recent" || urlFilters.sort === "oldest" ? urlFilters.sort : "alpha"
  );
  const group = urlFilters.group;

  useEffect(() => {
    setQuery(urlFilters.q);
    setSort(urlFilters.sort === "recent" || urlFilters.sort === "oldest" ? urlFilters.sort : "alpha");
  }, [urlFilters.q, urlFilters.sort]);

  const fuse = useMemo(
    () =>
      new Fuse(series, {
        threshold: 0.34,
        ignoreLocation: true,
        includeMatches: true,
        keys: [
          "title",
          "summary_short",
          "summary_long",
          "main_theme",
          "secondary_themes",
          "biblical_books",
          "biblical_characters",
          "keywords",
          "episode_titles"
        ]
      }),
    [series]
  );

  const searched = useMemo(() => {
    const normalized = query.trim();
    if (!normalized) {
      return series.map((item) => ({ item, reasons: [] as string[] }));
    }

    return fuse.search(normalized).map((result) => ({
      item: result.item,
      reasons: matchReasons(result.matches?.map((match) => match.key?.split(".") ?? []))
    }));
  }, [fuse, query, series]);

  const filtered: SeriesSearchResult[] = sortSeries(
    searched
      .filter(({ item }) => {
        if (!group) return true;
        if (group === "puissance-7") return isPuissance7Series(item);
        if (group === "celebrations") return !isPuissance7Series(item);
        return true;
      })
      .map(({ item, reasons }) => ({ ...item, searchReasons: reasons })),
    sort
  );

  return (
    <section className="series-explorer" aria-label="Explorer les séries">
      <div className="explorer series-explorer-ui">
        <div className="explorer-primary series-explorer-primary">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Rechercher une série, un thème, un épisode..."
            ariaLabel="Rechercher dans les séries"
          />

          <div className="filter-nav series-filter-nav" aria-label="Tri des séries">
            <button type="button" className={sort === "alpha" ? "active" : ""} onClick={() => setSort("alpha")}>
              Ordre alphabétique
            </button>
            <button type="button" className={sort === "recent" ? "active" : ""} onClick={() => setSort("recent")}>
              Plus récent → plus ancien
            </button>
            <button type="button" className={sort === "oldest" ? "active" : ""} onClick={() => setSort("oldest")}>
              Plus ancien → plus récent
            </button>
          </div>
        </div>
      </div>

      <div className="series-results-heading">
        <h2>{filtered.length} série{filtered.length > 1 ? "s" : ""}</h2>
        <p>
          {query.trim()
            ? "Les correspondances indiquent pourquoi chaque série ressort dans la recherche."
            : "Des parcours complets pour avancer par thème, passage ou saison de vie."}
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="series-grid">
          {filtered.map((item) => (
            <SeriesCard key={item.slug} series={item} matchReasons={item.searchReasons} />
          ))}
        </div>
      ) : (
        <div className="series-empty">
          <h2>Aucune série trouvée</h2>
          <p>Essayez un autre mot-clé pour élargir l&apos;exploration.</p>
        </div>
      )}
    </section>
  );
}
