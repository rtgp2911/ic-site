const months = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre"
];

export function formatDate(value: string) {
  if (!/^\d{8}$/.test(value)) {
    return "Date indisponible";
  }

  const year = value.slice(0, 4);
  const month = Number(value.slice(4, 6));
  const day = Number(value.slice(6, 8));

  if (!month || month > 12 || !day) {
    return "Date indisponible";
  }

  return `${day} ${months[month - 1]} ${year}`;
}

export function formatMonthYear(value: string) {
  if (!/^\d{8}$/.test(value)) {
    return "Date indisponible";
  }

  const year = value.slice(0, 4);
  const month = Number(value.slice(4, 6));

  if (!month || month > 12) {
    return "Date indisponible";
  }

  return `${months[month - 1]} ${year}`;
}

export function formatDuration(value: string) {
  const seconds = Number(value);
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "Durée indisponible";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours} h ${minutes.toString().padStart(2, "0")} min`;
  }

  return `${minutes} min`;
}

export function getYear(value: string) {
  return /^\d{4}/.test(value) ? value.slice(0, 4) : "Date indisponible";
}

export function normalizeVideoId(videoId: string) {
  return videoId.trim().replace(/^\/+/, "");
}

export function thumbnailUrl(videoId: string, thumbnailPath?: string) {
  const normalizedId = normalizeVideoId(videoId);
  if (thumbnailPath?.startsWith("/")) {
    return thumbnailPath;
  }

  return `https://img.youtube.com/vi/${normalizedId}/hqdefault.jpg`;
}
