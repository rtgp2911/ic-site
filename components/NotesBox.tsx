"use client";

import { Clipboard, Download, Mail } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function NotesBox({ videoId, title }: { videoId: string; title: string }) {
  const storageKey = useMemo(() => `ivan-carluer-notes-${videoId}`, [videoId]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setNotes(window.localStorage.getItem(storageKey) ?? "");
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, notes);
  }, [notes, storageKey]);

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
    <section className="notes-box" aria-labelledby="notes-title">
      <h2 id="notes-title">Mes notes</h2>
      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Écrire une note personnelle..."
      />
      <div className="notes-actions">
        <button type="button" onClick={() => navigator.clipboard.writeText(notes)}>
          <Clipboard size={17} />
          Copier
        </button>
        <button type="button" onClick={exportNotes}>
          <Download size={17} />
          Exporter
        </button>
        <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(notes)}`}>
          <Mail size={17} />
          Email
        </a>
      </div>
    </section>
  );
}
