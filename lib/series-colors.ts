export function getSeriesCoverTone(title: string) {
  const tones = [
    ["#111111", "#2f6fed", "#f45b35"],
    ["#060606", "#6d5dfc", "#f5d36b"],
    ["#111111", "#0f766e", "#38bdf8"],
    ["#050505", "#b91c1c", "#f97316"],
    ["#111827", "#2563eb", "#a855f7"],
    ["#09090b", "#16a34a", "#facc15"]
  ];

  const seed = title.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return tones[seed % tones.length];
}
