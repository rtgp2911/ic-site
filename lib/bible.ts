export const oldTestament = [
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
  "Malachie"
];

export const newTestament = [
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

const bibleOrder = [...oldTestament, ...newTestament];

const aliases: Record<string, string> = {
  Psaume: "Psaumes",
  Ésaïe: "Isaïe",
  Esaïe: "Isaïe",
  Cantique: "Cantique"
};

export const officialBibleBooks = bibleOrder;

export function normalizeBibleBook(book: string) {
  const trimmed = book.trim();
  return aliases[trimmed] ?? trimmed;
}

export function isBibleBook(book: string) {
  return bibleOrder.includes(normalizeBibleBook(book));
}

export function getTestament(book: string) {
  const normalized = normalizeBibleBook(book);
  if (oldTestament.includes(normalized)) return "Ancien Testament";
  if (newTestament.includes(normalized)) return "Nouveau Testament";
  return "Référence biblique";
}

export function getBibleBook(reference: string) {
  const match = reference.trim().match(/^(?:(?:[1-3])\s+)?[A-Za-zÀ-ÿ-]+/);
  const book = match?.[0] ?? "";
  return isBibleBook(book) ? normalizeBibleBook(book) : "";
}

export function getBibleChapter(reference: string) {
  const trimmed = reference.trim();
  const match = trimmed.match(/^((?:(?:[1-3])\s+)?[A-Za-zÀ-ÿ-]+)\s+(\d+)/);
  if (!match) return "";
  const book = normalizeBibleBook(match[1]);
  return isBibleBook(book) ? `${book} ${match[2]}` : "";
}

export function compareBibleBooks(a: string, b: string) {
  const indexA = bibleOrder.indexOf(normalizeBibleBook(a));
  const indexB = bibleOrder.indexOf(normalizeBibleBook(b));

  if (indexA !== -1 && indexB !== -1) return indexA - indexB;
  if (indexA !== -1) return -1;
  if (indexB !== -1) return 1;
  return a.localeCompare(b, "fr");
}

export function compareBibleChapters(a: string, b: string) {
  const bookA = getBibleBook(a);
  const bookB = getBibleBook(b);
  const bookCompare = compareBibleBooks(bookA, bookB);
  if (bookCompare !== 0) return bookCompare;

  const chapterA = Number(a.match(/\d+$/)?.[0] ?? 0);
  const chapterB = Number(b.match(/\d+$/)?.[0] ?? 0);
  return chapterA - chapterB;
}

export function bibleSearchUrl(passages: string[]) {
  const query = passages[0] || "";
  return `https://www.bible.com/fr/search/bible?q=${encodeURIComponent(query)}`;
}
