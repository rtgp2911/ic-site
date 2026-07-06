import { Suspense } from "react";
import { getFacets, getMessages } from "@/lib/data";
import { MessageExplorer } from "@/components/MessageExplorer";

export default function MessagesPage() {
  const messages = getMessages();
  const allFacets = getFacets(messages);

  return (
    <main className="page">
      <section className="messages-hero">
        <div className="container">
          <p className="eyebrow">Enseignements</p>
          <h1>Tous les messages d’Ivan Carluer.</h1>
          <p>
            Parcourir les enseignements, retrouver une série, reprendre un passage biblique ou chercher un sujet précis.
            Les années et les thèmes restent toujours à portée de main.
          </p>
        </div>
      </section>
      <section className="container messages-shell">
        <Suspense fallback={<div className="empty">Chargement de la recherche...</div>}>
          <MessageExplorer
            messages={messages}
            facets={{
            years: allFacets.years,
            themes: allFacets.themes,
            testaments: allFacets.testaments,
            books: allFacets.books,
            chapters: allFacets.chapters,
            people: allFacets.people,
            keywords: allFacets.keywords
          }}
        />
        </Suspense>
      </section>
    </main>
  );
}
