import fs from "node:fs/promises";
import path from "node:path";

const sheetId = "1rT1vgqh3E1uqdhuDmDHJUdw2ADQC-CW_bQxWdk59qbY";
const gid = "1834025931";
const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  const headers = rows.shift()?.map((header) => header.trim()) ?? [];
  return rows
    .filter((values) => values.some((value) => value.trim()))
    .map((values) =>
      Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]))
    );
}

function splitList(value) {
  return String(value ?? "")
    .split(/[,;]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getCategory(title) {
  return title.toLowerCase().includes("puissance 7") ? "Puissance 7" : "Célébration";
}

function getBibleBook(reference) {
  const match = reference.trim().match(/^(?:(?:[1-3])\s+)?[A-Za-zÀ-ÿ-]+/);
  const book = match?.[0] ?? "";
  return isBibleBook(book) ? normalizeBibleBook(book) : "";
}

const oldTestament = new Set([
  "Genèse", "Exode", "Lévitique", "Nombres", "Deutéronome", "Josué", "Juges", "Ruth", "1 Samuel",
  "2 Samuel", "1 Rois", "2 Rois", "1 Chroniques", "2 Chroniques", "Esdras", "Néhémie", "Esther",
  "Job", "Psaumes", "Proverbes", "Ecclésiaste", "Cantique", "Isaïe", "Jérémie",
  "Lamentations", "Ézéchiel", "Daniel", "Osée", "Joël", "Amos", "Abdias", "Jonas", "Michée",
  "Nahum", "Habacuc", "Sophonie", "Aggée", "Zacharie", "Malachie"
]);

const newTestament = new Set([
  "Matthieu", "Marc", "Luc", "Jean", "Actes", "Romains", "1 Corinthiens", "2 Corinthiens", "Galates",
  "Éphésiens", "Philippiens", "Colossiens", "1 Thessaloniciens", "2 Thessaloniciens", "1 Timothée",
  "2 Timothée", "Tite", "Philémon", "Hébreux", "Jacques", "1 Pierre", "2 Pierre", "1 Jean",
  "2 Jean", "3 Jean", "Jude", "Apocalypse"
]);

const aliases = new Map([
  ["Psaume", "Psaumes"],
  ["Ésaïe", "Isaïe"],
  ["Esaïe", "Isaïe"]
]);

function normalizeBibleBook(book) {
  const trimmed = book.trim();
  return aliases.get(trimmed) ?? trimmed;
}

function isBibleBook(book) {
  const normalized = normalizeBibleBook(book);
  return oldTestament.has(normalized) || newTestament.has(normalized);
}

function getTestament(book) {
  const normalized = normalizeBibleBook(book);
  if (oldTestament.has(normalized)) return "Ancien Testament";
  if (newTestament.has(normalized)) return "Nouveau Testament";
  return "";
}

function getBibleChapter(reference) {
  const match = reference.trim().match(/^((?:(?:[1-3])\s+)?[A-Za-zÀ-ÿ-]+)\s+(\d+)/);
  if (!match) return "";
  const book = normalizeBibleBook(match[1]);
  return isBibleBook(book) ? `${book} ${match[2]}` : "";
}

function normalizeRow(row) {
  const hasTranscript = String(row.has_transcript).toUpperCase() === "TRUE";
  const themes = hasTranscript
    ? [row.theme_1, row.theme_2].map((theme) => theme?.trim()).filter(Boolean)
    : ["Autre"];
  const passages = hasTranscript ? splitList(row.passages_bibliques) : [];
  const bibleBooks = Array.from(new Set(passages.map(getBibleBook).map(normalizeBibleBook).filter(isBibleBook)));
  const bibleChapters = Array.from(new Set(passages.map(getBibleChapter).filter(Boolean)));
  const testaments = Array.from(new Set(bibleBooks.map(getTestament).filter(Boolean)));

  return {
    video_id: row.video_id?.trim() ?? "",
    title: row.title?.trim() ?? "Message sans titre",
    url: row.url?.trim() ?? "",
    upload_date: row.upload_date?.trim() ?? "",
    duration: row.duration?.trim() ?? "",
    description: row.description?.trim() ?? "",
    thumbnail_path: row.thumbnail_path?.trim() ?? "",
    transcript_path: row.transcript_path?.trim() ?? "",
    has_transcript: hasTranscript,
    resume: hasTranscript ? row.resume?.trim() || "Autre" : "Autre",
    themes,
    passages_bibliques: passages,
    livres_bibliques: bibleBooks,
    chapitres_bibliques: bibleChapters,
    testaments,
    personnages_bibliques: hasTranscript ? splitList(row.personnages_bibliques) : [],
    mots_cles_ia: hasTranscript ? splitList(row.mots_cles_ia) : [],
    confiance: row.confiance?.trim() ?? "",
    category: getCategory(row.title ?? "")
  };
}

const response = await fetch(csvUrl);
if (!response.ok) {
  throw new Error(`Impossible de télécharger la feuille: ${response.status}`);
}

const csv = await response.text();
const messages = parseCsv(csv).map(normalizeRow).filter((message) => message.video_id);
const outputPath = path.join(process.cwd(), "data", "messages.json");

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, `${JSON.stringify(messages, null, 2)}\n`);

console.log(`Generated ${messages.length} messages in ${outputPath}`);
