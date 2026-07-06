import type { Message } from "@/lib/types";

function overlap(a: string[], b: string[]) {
  const set = new Set(a.map((item) => item.toLowerCase()));
  return b.reduce((score, item) => score + (set.has(item.toLowerCase()) ? 1 : 0), 0);
}

export function getSimilarMessages(current: Message, messages: Message[], limit = 6) {
  return messages
    .filter((message) => message.video_id !== current.video_id)
    .map((message) => ({
      message,
      score:
        overlap(current.themes, message.themes) * 4 +
        overlap(current.personnages_bibliques, message.personnages_bibliques) * 2 +
        overlap(current.mots_cles_ia, message.mots_cles_ia)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.message.upload_date.localeCompare(a.message.upload_date))
    .slice(0, limit)
    .map((item) => item.message);
}
