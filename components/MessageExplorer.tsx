"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { Play } from "lucide-react";
import type { Message } from "@/lib/types";
import { formatDate, getYear, normalizeVideoId, thumbnailUrl } from "@/lib/format";
import { compareBibleBooks, compareBibleChapters, getBibleBook } from "@/lib/bible";
import { MessageGrid } from "@/components/MessageGrid";
import { SearchBar } from "@/components/SearchBar";

type Facets = {
  years: string[];
  themes: string[];
  testaments: string[];
  books: string[];
  chapters: string[];
  people: string[];
  keywords: string[];
};

type ActiveFilters = {
  year: string;
  theme: string;
  testament: string;
  book: string;
  chapter: string;
  person: string;
  keyword: string;
  passage: string;
};

type SortMode = "recent" | "oldest" | "biblical" | "title";

const labels: Record<keyof Facets, string> = {
  years: "Années",
  themes: "Thèmes",
  testaments: "Testament",
  books: "Livres",
  chapters: "Chapitres",
  people: "Personnages",
  keywords: "Mots-clés"
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getRelevance(message: Message, query: string) {
  const normalizedQuery = normalizeText(query.trim());
  if (!normalizedQuery) return [];

  const fields = [
    { label: "Titre", values: [message.title] },
    { label: "Résumé", values: [message.resume] },
    { label: "Thème", values: message.themes },
    { label: "Livre biblique", values: message.livres_bibliques },
    { label: "Chapitre", values: message.chapitres_bibliques },
    { label: "Personnage", values: message.personnages_bibliques },
    { label: "Passage", values: message.passages_bibliques },
    { label: "Mot-clé", values: message.mots_cles_ia }
  ];

  return fields
    .flatMap((field) =>
      field.values
        .filter((value) => value && normalizeText(value).includes(normalizedQuery))
        .map((value) => {
          const compactValue =
            field.label === "Résumé" || field.label === "Titre"
              ? query.trim()
              : value.length > 42
                ? `${value.slice(0, 39)}…`
                : value;
          return { label: field.label, value: compactValue };
        })
    )
    .slice(0, 5);
}

function getSearchSnippet(message: Message, query: string) {
  const normalizedQuery = normalizeText(query.trim());
  const source = message.resume || "Information indisponible";
  if (!normalizedQuery) return source;

  const sentences = source.split(/(?<=[.!?])\s+/);
  const match = sentences.find((sentence) => normalizeText(sentence).includes(normalizedQuery));
  return match ?? source;
}

export function MessageExplorer({ messages, facets }: { messages: Message[]; facets: Facets }) {
  const searchParams = useSearchParams();
  const initialFilters = useMemo<ActiveFilters>(() => {
    const book = searchParams.get("book") ?? "";
    return {
      year: searchParams.get("year") ?? "",
      theme: searchParams.get("theme") ?? "",
      testament: searchParams.get("testament") ?? "",
      book,
      chapter: searchParams.get("chapter") ?? "",
      person: searchParams.get("person") ?? "",
      keyword: searchParams.get("keyword") ?? "",
      passage: searchParams.get("passage") ?? ""
    };
  }, [searchParams]);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [active, setActive] = useState<ActiveFilters>(initialFilters);
  const [panel, setPanel] = useState<keyof Facets>(initialFilters.book ? "chapters" : "years");
  const [sortMode, setSortMode] = useState<SortMode>((searchParams.get("sort") as SortMode) ?? "recent");

  useEffect(() => {
    setActive(initialFilters);
    setQuery(searchParams.get("q") ?? "");
    setSortMode((searchParams.get("sort") as SortMode) ?? "recent");
    if (initialFilters.book) setPanel("chapters");
  }, [initialFilters, searchParams]);

  const fuse = useMemo(
    () =>
      new Fuse(messages, {
        threshold: 0.34,
        ignoreLocation: true,
        keys: [
          { name: "title", weight: 0.32 },
          { name: "resume", weight: 0.18 },
          { name: "themes", weight: 0.2 },
          { name: "personnages_bibliques", weight: 0.14 },
          { name: "passages_bibliques", weight: 0.16 },
          { name: "livres_bibliques", weight: 0.14 },
          { name: "chapitres_bibliques", weight: 0.14 },
          { name: "testaments", weight: 0.08 },
          { name: "mots_cles_ia", weight: 0.18 },
          { name: "category", weight: 0.08 },
          { name: "upload_date", weight: 0.08 }
        ]
      }),
    [messages]
  );

  const filtered = useMemo(() => {
    let result = query.trim() ? fuse.search(query.trim()).map((item) => item.item) : messages;

    result = result.filter((message) => {
      if (active.year && getYear(message.upload_date) !== active.year) return false;
      if (active.theme && !message.themes.includes(active.theme)) return false;
      if (active.testament && !message.testaments?.includes(active.testament)) return false;
      if (active.book && !message.livres_bibliques.includes(active.book)) return false;
      if (active.chapter && !message.chapitres_bibliques?.includes(active.chapter)) return false;
      if (active.person && !message.personnages_bibliques.includes(active.person)) return false;
      if (active.keyword && !message.mots_cles_ia.includes(active.keyword)) return false;
      if (active.passage && !message.passages_bibliques.includes(active.passage)) return false;
      return true;
    });

    return result.slice().sort((a, b) => sortMessages(a, b, sortMode));
  }, [active, fuse, messages, query, sortMode]);

  const chaptersForSelectedBook = useMemo(() => {
    const source = active.book
      ? facets.chapters.filter((chapter) => getBibleBook(chapter) === active.book)
      : facets.chapters;
    return source.sort(compareBibleChapters);
  }, [active.book, facets.chapters]);

  const valuesForPanel = panel === "chapters" ? chaptersForSelectedBook : facets[panel];

  function selectFilter(type: keyof Facets, value: string) {
    const keyByType = {
      years: "year",
      themes: "theme",
      testaments: "testament",
      books: "book",
      chapters: "chapter",
      people: "person",
      keywords: "keyword"
    } as const;
    const key = keyByType[type];

    setActive((current) => {
      const next = { ...current, [key]: current[key] === value ? "" : value };
      if (key === "book" && current.book !== value) {
        next.chapter = "";
        setPanel("chapters");
      }
      return next;
    });
  }

  const activeValues = Object.values(active).filter(Boolean);

  return (
    <div className="explorer">
      <div className="explorer-primary">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="filter-nav" aria-label="Filtres principaux">
        {(Object.keys(labels) as Array<keyof Facets>).map((type) => (
          <button
            key={type}
            className={panel === type ? "active" : ""}
            type="button"
            onClick={() => setPanel(type)}
          >
            {labels[type]}
          </button>
        ))}
      </div>

      <div className="filter-panel">
        {valuesForPanel.map((value) => (
          <button
            key={value}
            className={`chip ${
              (panel === "years" && active.year === value) ||
              (panel === "themes" && active.theme === value) ||
              (panel === "testaments" && active.testament === value) ||
              (panel === "books" && active.book === value) ||
              (panel === "chapters" && active.chapter === value) ||
              (panel === "people" && active.person === value) ||
              (panel === "keywords" && active.keyword === value)
                ? "active"
                : ""
            }`}
            type="button"
            onClick={() => selectFilter(panel, value)}
          >
            {value}
          </button>
        ))}
      </div>

      {activeValues.length > 0 && (
        <div className="active-filters">
          {activeValues.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() =>
                setActive((current) =>
                  Object.fromEntries(
                    Object.entries(current).map(([key, currentValue]) => [key, currentValue === value ? "" : currentValue])
                  ) as ActiveFilters
                )
              }
            >
              {value}
              <span>×</span>
            </button>
          ))}
        </div>
      )}

      <div className="result-toolbar">
        <div className="result-line">
          <strong>{filtered.length}</strong> message{filtered.length > 1 ? "s" : ""}
          {activeValues.length ? ` filtré${filtered.length > 1 ? "s" : ""}` : ""}
          {query.trim() ? ` pour “${query.trim()}”` : ""}
        </div>
        <label className="sort-control">
          <span>Trier</span>
          <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}>
            <option value="recent">Plus récent</option>
            <option value="oldest">Plus ancien</option>
            <option value="biblical">Toute la Bible</option>
            <option value="title">Titre A-Z</option>
          </select>
        </label>
      </div>

      {query.trim() ? (
        <div className="search-results-list">
          {filtered.map((message) => {
            const videoId = normalizeVideoId(message.video_id);
            const relevance = getRelevance(message, query);
            return (
              <Link key={message.video_id} className="search-result-card" href={`/messages/${videoId}`} aria-label={`Voir le message : ${message.title}`}>
                <span className="search-result-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnailUrl(message.video_id, message.thumbnail_path)}
                    alt={`Miniature du message : ${message.title}`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    }}
                  />
                  <span>
                    <Play size={16} fill="currentColor" />
                  </span>
                </span>
                <div className="search-result-body">
                  <div className="search-result-meta">
                    <span>{formatDate(message.upload_date)}</span>
                    {message.themes[0] && <span>{message.themes[0]}</span>}
                    {message.livres_bibliques[0] && <span>{message.livres_bibliques[0]}</span>}
                  </div>
                  <h2>{message.title}</h2>
                  <p className="search-snippet">{getSearchSnippet(message, query)}</p>
                  {relevance.length > 0 && (
                    <div className="relevance-row" aria-label="Correspondances trouvées">
                      {relevance.map((item) => (
                        <span className="relevance-pill" key={`${message.video_id}-${item.label}-${item.value}`}>
                          <strong>{item.label}</strong>
                          {item.value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <MessageGrid messages={filtered} />
      )}
    </div>
  );
}

function sortMessages(a: Message, b: Message, mode: SortMode) {
  if (mode === "title") return a.title.localeCompare(b.title, "fr");
  if (mode === "oldest") return compareDates(a.upload_date, b.upload_date, "asc");
  if (mode === "biblical") {
    const aChapter = a.chapitres_bibliques?.[0] ?? "";
    const bChapter = b.chapitres_bibliques?.[0] ?? "";
    if (aChapter && bChapter) {
      const chapterCompare = compareBibleChapters(aChapter, bChapter);
      if (chapterCompare !== 0) return chapterCompare;
    }
    if (aChapter && !bChapter) return -1;
    if (!aChapter && bChapter) return 1;

    const bookCompare = compareBibleBooks(a.livres_bibliques?.[0] ?? "", b.livres_bibliques?.[0] ?? "");
    if (bookCompare !== 0) return bookCompare;
    return compareDates(a.upload_date, b.upload_date, "desc");
  }
  return compareDates(a.upload_date, b.upload_date, "desc");
}

function compareDates(a: string, b: string, direction: "asc" | "desc") {
  const aValid = /^\d{4}-\d{2}-\d{2}/.test(a);
  const bValid = /^\d{4}-\d{2}-\d{2}/.test(b);
  if (!aValid && !bValid) return 0;
  if (!aValid) return 1;
  if (!bValid) return -1;
  return direction === "asc" ? a.localeCompare(b) : b.localeCompare(a);
}
