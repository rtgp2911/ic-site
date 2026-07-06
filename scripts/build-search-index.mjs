import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const messagesPath = path.join(root, "data", "messages.json");
const transcriptsDir = path.join(root, "data", "transcripts");
const outputPath = path.join(root, "data", "search-index.json");

function clean(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function normalizeId(videoId) {
  return clean(videoId).replace(/^\/+/, "");
}

const messages = JSON.parse(fs.readFileSync(messagesPath, "utf8"));
let transcriptsFound = 0;

const index = messages.map((message) => {
  const videoId = normalizeId(message.video_id);
  const transcriptPath = path.join(transcriptsDir, `${videoId}.txt`);
  const transcript = fs.existsSync(transcriptPath) ? clean(fs.readFileSync(transcriptPath, "utf8")) : "";
  if (transcript) transcriptsFound += 1;

  return {
    video_id: videoId,
    title: clean(message.title),
    upload_date: message.upload_date,
    duration: message.duration,
    thumbnail_path: message.thumbnail_path,
    resume: clean(message.resume),
    themes: message.themes ?? [],
    passages_bibliques: message.passages_bibliques ?? [],
    livres_bibliques: message.livres_bibliques ?? [],
    chapitres_bibliques: message.chapitres_bibliques ?? [],
    testaments: message.testaments ?? [],
    personnages_bibliques: message.personnages_bibliques ?? [],
    mots_cles_ia: message.mots_cles_ia ?? [],
    category: message.category,
    has_transcript: Boolean(transcript),
    search_text: [
      message.title,
      message.resume,
      ...(message.themes ?? []),
      ...(message.passages_bibliques ?? []),
      ...(message.livres_bibliques ?? []),
      ...(message.chapitres_bibliques ?? []),
      ...(message.testaments ?? []),
      ...(message.personnages_bibliques ?? []),
      ...(message.mots_cles_ia ?? []),
      transcript
    ]
      .map(clean)
      .filter(Boolean)
      .join("\n")
  };
});

fs.writeFileSync(outputPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(`Search index generated: ${index.length} messages, ${transcriptsFound} transcripts.`);
