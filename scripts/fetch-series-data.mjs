import fs from "node:fs/promises";
import path from "node:path";

const sheetId = "1rT1vgqh3E1uqdhuDmDHJUdw2ADQC-CW_bQxWdk59qbY";
const sheets = {
  series: "469438470",
  episodes: "487514081"
};

const bibleBooks = [
  "Genèse",
  "Exode",
  "Lévitique",
  "Nombres",
  "Deutéronome",
  "Josué",
  "Juges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Rois",
  "2 Rois",
  "1 Chroniques",
  "2 Chroniques",
  "Esdras",
  "Néhémie",
  "Esther",
  "Job",
  "Psaumes",
  "Proverbes",
  "Ecclésiaste",
  "Cantique",
  "Isaïe",
  "Jérémie",
  "Lamentations",
  "Ézéchiel",
  "Daniel",
  "Osée",
  "Joël",
  "Amos",
  "Abdias",
  "Jonas",
  "Michée",
  "Nahum",
  "Habacuc",
  "Sophonie",
  "Aggée",
  "Zacharie",
  "Malachie",
  "Matthieu",
  "Marc",
  "Luc",
  "Jean",
  "Actes",
  "Romains",
  "1 Corinthiens",
  "2 Corinthiens",
  "Galates",
  "Éphésiens",
  "Philippiens",
  "Colossiens",
  "1 Thessaloniciens",
  "2 Thessaloniciens",
  "1 Timothée",
  "2 Timothée",
  "Tite",
  "Philémon",
  "Hébreux",
  "Jacques",
  "1 Pierre",
  "2 Pierre",
  "1 Jean",
  "2 Jean",
  "3 Jean",
  "Jude",
  "Apocalypse"
];

const aliases = {
  Psaume: "Psaumes",
  "Ésaïe": "Isaïe",
  "Esaïe": "Isaïe"
};

function parseCsv(text) {
  const rows = [];
  let current = "";
  let row = [];
  let insideQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && insideQuotes && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      row.push(current);
      current = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
    } else {
      current += char;
    }
  }

  if (current || row.length) {
    row.push(current);
    rows.push(row);
  }

  const [headers, ...dataRows] = rows.filter((csvRow) => csvRow.some((cell) => cell.trim()));
  return dataRows.map((csvRow) =>
    Object.fromEntries(headers.map((header, index) => [header.replace(/^\uFEFF/, "").trim(), (csvRow[index] ?? "").trim()]))
  );
}

function splitList(value = "") {
  return value
    .split(/[,;|\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function toNumber(value = "") {
  const number = Number(String(value).replace(/\s/g, ""));
  return Number.isFinite(number) ? number : 0;
}

function toBoolean(value = "") {
  return ["true", "1", "yes", "oui", "x"].includes(String(value).trim().toLowerCase());
}

function slugify(value = "") {
  return value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeBook(book) {
  return aliases[book] ?? book;
}

function onlyBibleBooks(values) {
  return splitList(values)
    .map(normalizeBook)
    .filter((book) => bibleBooks.includes(book));
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function cleanVideoId(value = "") {
  return value.trim().replace(/^\/+/, "");
}

async function fetchSheet(gid) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Impossible de récupérer la feuille ${gid}: ${response.status}`);
  return parseCsv(await response.text());
}

function normalizeSeries(row) {
  const title = row.title || row.series_group || "Série sans titre";
  const slug = slugify(title || row.series_group);

  return {
    id: row.series_group || slug,
    slug,
    title,
    summary_short: row.summary_short || "",
    summary_long: row.summary_long || "",
    main_theme: row.main_theme || "",
    secondary_themes: splitList(row.secondary_themes),
    biblical_books: unique(onlyBibleBooks(row.biblical_books)),
    biblical_characters: splitList(row.biblical_characters),
    keywords: splitList(row.keywords),
    who_should_watch: row.who_should_watch || "",
    what_you_will_learn: row.what_you_will_learn || "",
    entry_point: row.entry_point || "",
    series_group: row.series_group || title,
    episodes_count: toNumber(row.episodes_count)
  };
}

function normalizeEpisode(row) {
  const videoId = cleanVideoId(row.video_id);

  return {
    series_group: row.series_group || row.playlist_title || "",
    playlist_title: row.playlist_title || "",
    playlist_index: toNumber(row.playlist_index),
    video_id: videoId,
    episode_title: row.episode_title || row.title || "Épisode sans titre",
    speaker: row.speaker || "",
    episode_url: row.episode_url || (videoId ? `https://www.youtube.com/watch?v=${videoId}` : ""),
    thumbnail_hd: row.thumbnail_hd || "",
    thumbnail_url: row.thumbnail_url || "",
    upload_date: row.upload_date || "",
    duration_string: row.duration_string || "",
    duration_seconds: toNumber(row.duration_seconds),
    channel: row.channel || "",
    view_count: toNumber(row.view_count),
    has_transcript: toBoolean(row.has_transcript),
    analysis_status: row.analysis_status || "",
    title: row.title || row.episode_title || "",
    summary_short: row.summary_short || "",
    summary_long: row.summary_long || "",
    main_theme: row.main_theme || "",
    secondary_themes: splitList(row.secondary_themes),
    biblical_books: unique([...onlyBibleBooks(row.biblical_book), ...onlyBibleBooks(row.other_books)]),
    testament: row.testament || "",
    chapters: splitList(row.chapters),
    verses: splitList(row.verses),
    biblical_characters: splitList(row.biblical_characters),
    keywords: splitList(row.keywords),
    audience: row.audience || "",
    level: row.level || "",
    quote: row.quote || "",
    call_to_action: row.call_to_action || ""
  };
}

async function main() {
  const [seriesRows, episodeRows] = await Promise.all([fetchSheet(sheets.series), fetchSheet(sheets.episodes)]);

  const series = seriesRows.map(normalizeSeries).filter((item) => item.title);
  const episodes = episodeRows.map(normalizeEpisode).filter((item) => item.series_group || item.video_id);

  const outputDir = path.join(process.cwd(), "data");
  await fs.mkdir(outputDir, { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(outputDir, "series.json"), JSON.stringify(series, null, 2)),
    fs.writeFile(path.join(outputDir, "series-episodes.json"), JSON.stringify(episodes, null, 2))
  ]);

  console.log(`Séries synchronisées : ${series.length} séries, ${episodes.length} épisodes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
