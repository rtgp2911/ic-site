"use client";

import { BookOpen, ExternalLink } from "lucide-react";
import { useState } from "react";
import { bibleSearchUrl } from "@/lib/bible";

export function BiblePanel({ passages }: { passages: string[] }) {
  const [open, setOpen] = useState(true);

  if (!passages.length) {
    return null;
  }

  return (
    <section className="bible-panel">
      <div className="bible-panel-head">
        <div>
          <p className="eyebrow">Bible</p>
          <h2>Lire le passage biblique</h2>
        </div>
        <button type="button" onClick={() => setOpen((value) => !value)}>
          <BookOpen size={18} />
          {open ? "Fermer" : "Ouvrir"}
        </button>
      </div>
      {open && (
        <div className="bible-panel-body">
          <div className="bible-reader">
            <strong>{passages[0]}</strong>
            <p>Sélectionnez une référence puis ouvrez le texte complet dans YouVersion.</p>
          </div>
          <div className="tag-row">
            {passages.map((passage) => (
              <span key={passage}>{passage}</span>
            ))}
          </div>
          <a className="text-link" href={bibleSearchUrl(passages)} target="_blank" rel="noreferrer">
            Ouvrir dans YouVersion
            <ExternalLink size={17} />
          </a>
        </div>
      )}
    </section>
  );
}
