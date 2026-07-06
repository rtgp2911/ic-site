"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import type { Message } from "@/lib/types";
import { formatDate, formatDuration, normalizeVideoId, thumbnailUrl } from "@/lib/format";

type MessageCardProps = {
  message: Message;
};

export function MessageCard({ message }: MessageCardProps) {
  const videoId = normalizeVideoId(message.video_id);
  const href = `/messages/${videoId}`;
  const primaryTheme = message.themes[0] ?? "Autre";
  const primaryBook = message.livres_bibliques[0];

  return (
    <article className="message-card">
      <Link className="message-card-link" href={href} aria-label={`Voir le message : ${message.title}`}>
        <span className="thumb">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnailUrl(message.video_id, message.thumbnail_path)}
            alt={`Miniature du message : ${message.title}`}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <span className="play-pill">
            <Play size={15} fill="currentColor" />
          </span>
          <span className="card-badge">{primaryTheme}</span>
        </span>
        <div className="message-card-body">
          <div className="message-meta">
            <span className="tag-link">{primaryTheme}</span>
            {primaryBook && <span className="tag-link">{primaryBook}</span>}
          </div>
          <h3>{message.title}</h3>
          <p>{message.resume}</p>
          <div className="tag-row compact">
            {message.themes.slice(0, 2).map((theme) => (
              <span className="tag-link" key={theme}>{theme}</span>
            ))}
            {message.livres_bibliques.slice(0, 1).map((book) => (
              <span className="tag-link" key={book}>{book}</span>
            ))}
          </div>
          <div className="message-card-footer">
            <span className="message-date-link">{formatDate(message.upload_date)}</span>
            <span aria-hidden="true">｜</span>
            <span>{formatDuration(message.duration)}</span>
            <span className="text-link">
            Voir le message
            <ArrowRight size={15} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
