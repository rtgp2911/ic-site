"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import type { Message } from "@/lib/types";
import { formatDate, formatDuration, getYear, normalizeVideoId, thumbnailUrl } from "@/lib/format";
import { TagLink } from "@/components/TagLink";

type MessageCardProps = {
  message: Message;
};

export function MessageCard({ message }: MessageCardProps) {
  const videoId = normalizeVideoId(message.video_id);
  const primaryTheme = message.themes[0] ?? "Autre";
  const primaryBook = message.livres_bibliques[0];

  return (
    <article className="message-card">
      <Link className="thumb" href={`/messages/${videoId}`} aria-label={`Voir ${message.title}`}>
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
      </Link>
      <div className="message-card-body">
        <div className="message-meta">
          <TagLink kind="theme" value={primaryTheme} />
          {primaryBook && <TagLink kind="book" value={primaryBook} />}
        </div>
        <h3>
          <Link href={`/messages/${videoId}`}>{message.title}</Link>
        </h3>
        <p>{message.resume}</p>
        <div className="tag-row compact">
          {message.themes.slice(0, 2).map((theme) => (
            <TagLink key={theme} kind="theme" value={theme} />
          ))}
          {message.livres_bibliques.slice(0, 1).map((book) => (
            <TagLink key={book} kind="book" value={book} />
          ))}
        </div>
        <div className="message-card-footer">
          <Link className="message-date-link" href={`/messages?year=${encodeURIComponent(getYear(message.upload_date))}`}>
            {formatDate(message.upload_date)}
          </Link>
          <span aria-hidden="true">｜</span>
          <span>{formatDuration(message.duration)}</span>
          <Link className="text-link" href={`/messages/${videoId}`}>
            Voir le message
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
