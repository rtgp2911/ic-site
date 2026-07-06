import { Suspense } from "react";
import { MessageExplorer } from "@/components/MessageExplorer";
import { getFacets, getMessages } from "@/lib/data";

export default function SearchPage() {
  const messages = getMessages();
  const facets = getFacets(messages);
  const featured = messages.slice(0, 3);

  return (
    <main className="page search-page">
      <section className="search-hero">
        <div className="container search-hero-shell">
          <div className="search-hero-copy">
            <p className="eyebrow">Explorer</p>
            <h1>Trouver un message, une question, un passage.</h1>
            <p>
              Recherchez dans les titres, résumés, thèmes, passages bibliques, personnages et mots-clés des
              enseignements d'Ivan Carluer.
            </p>
          </div>
          <div className="search-hero-thumbs">
            {featured.map((message, index) => (
              <figure key={message.video_id} style={{ ["--i" as string]: index }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${message.video_id.replace(/^\/+/, "")}/hqdefault.jpg`}
                  alt={`Miniature du message : ${message.title}`}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="section search-main-section">
        <div className="container">
          <Suspense fallback={<div className="empty">Chargement de la recherche...</div>}>
            <MessageExplorer messages={messages} facets={facets} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
