export function formatSeriesDate(value: string) {
  const raw = value?.trim();
  if (!raw) return "";

  const compact = raw.replace(/[./-]/g, "");
  if (!/^\d{8}$/.test(compact)) return "";

  const date = new Date(`${compact.slice(0, 4)}-${compact.slice(4, 6)}-${compact.slice(6, 8)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

export function formatSeriesDuration(durationString: string, durationSeconds?: number) {
  const raw = durationString?.trim();
  if (raw) {
    const parts = raw.split(":").map((part) => Number(part));
    if (parts.length === 3 && parts.every(Number.isFinite)) {
      const [first, second, third] = parts;
      if (third === 0 && first >= 10) return `${first} min ${String(second).padStart(2, "0")} s`;
      if (first === 0) return `${second} min ${String(third).padStart(2, "0")} s`;
      return `${first} h ${String(second).padStart(2, "0")} min`;
    }

    if (parts.length === 2 && parts.every(Number.isFinite)) {
      return `${parts[0]} min ${String(parts[1]).padStart(2, "0")} s`;
    }

    return raw;
  }

  if (!durationSeconds) return "";

  const minutes = Math.round(durationSeconds / 60);
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}

export function youtubeThumbnail(videoId: string, thumbnailHd?: string, thumbnailUrl?: string) {
  if (thumbnailHd) return thumbnailHd;
  if (thumbnailUrl) return thumbnailUrl;
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
}

export function isDisplayableSeriesValue(value?: string) {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return Boolean(
    normalized &&
      normalized !== "information indisponible" &&
      normalized !== "indisponible" &&
      normalized !== "non renseigné" &&
      normalized !== "n/a" &&
      normalized !== "na" &&
      normalized !== "-"
  );
}

export function hasBibleBookName(value?: string) {
  return Boolean(value && /[A-Za-zÀ-ÿ]/.test(value));
}

export function formatSeriesBibleReferences(values: string[], books: string[] = []) {
  const visibleBooks = books.filter(isDisplayableSeriesValue);
  const fallbackBook = visibleBooks[0] ?? "";

  return values
    .filter(isDisplayableSeriesValue)
    .map((value) => value.trim())
    .map((value) => {
      if (hasBibleBookName(value)) return value;
      if (fallbackBook && /^[\d\s:,;-]+$/.test(value)) return `${fallbackBook} ${value}`.trim();
      return "";
    })
    .filter(Boolean);
}
