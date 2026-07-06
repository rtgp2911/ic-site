"use client";

import { useEffect, useMemo, useState } from "react";

export function VideoNotesCard({
  videoId,
  title
}: {
  videoId: string;
  title: string;
  passages: string[];
}) {
  const storageKey = useMemo(() => `ivan-carluer-notes-${videoId}`, [videoId]);
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setNotes(window.localStorage.getItem(storageKey) ?? "");
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, notes);
  }, [notes, storageKey]);

  async function copyNotes() {
    await navigator.clipboard.writeText(notes);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function exportNotes() {
    const blob = new Blob([notes], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-notes.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <aside className="card notes-card">
      <h2>Mes notes</h2>
      <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Écrire une note…" />

      <div className="actions">
        <button className="btn secondary" type="button" onClick={copyNotes}>
          {copied ? "Copié" : "Copier"}
        </button>
        <button className="btn secondary" type="button" onClick={exportNotes}>
          Exporter
        </button>
        <a className="btn secondary" href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(notes)}`}>
          Email
        </a>
      </div>
    </aside>
  );
}
