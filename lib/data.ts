import messages from "@/data/messages.json";
import type { Message } from "@/lib/types";
import { getYear } from "@/lib/format";
import { compareBibleBooks } from "@/lib/bible";

export function getMessages(): Message[] {
  return (messages as Message[]).slice().sort((a, b) => b.upload_date.localeCompare(a.upload_date));
}

export function getMessage(videoId: string) {
  return getMessages().find((message) => message.video_id === videoId);
}

export function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => {
    if (a === "Autre") return 1;
    if (b === "Autre") return -1;
    return a.localeCompare(b, "fr");
  });
}

export function getFacets(messagesList = getMessages()) {
  return {
    years: uniqueSorted(messagesList.map((message) => getYear(message.upload_date))).sort((a, b) => {
      if (a === "Date indisponible") return 1;
      if (b === "Date indisponible") return -1;
      return b.localeCompare(a);
    }),
    themes: uniqueSorted(messagesList.flatMap((message) => message.themes)),
    testaments: ["Ancien Testament", "Nouveau Testament"].filter((testament) =>
      messagesList.some((message) => message.testaments?.includes(testament))
    ),
    books: uniqueSorted(messagesList.flatMap((message) => message.livres_bibliques)).sort(compareBibleBooks),
    chapters: uniqueSorted(messagesList.flatMap((message) => message.chapitres_bibliques ?? [])),
    people: uniqueSorted(messagesList.flatMap((message) => message.personnages_bibliques)),
    keywords: uniqueSorted(messagesList.flatMap((message) => message.mots_cles_ia)),
    categories: uniqueSorted(messagesList.map((message) => message.category))
  };
}
