import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getFacets, getMessages } from "@/lib/data";
import { getThemeBySlug, themeEntries } from "@/lib/themes";
import { MessageExplorer } from "@/components/MessageExplorer";

export function generateStaticParams() {
  return themeEntries.map((theme) => ({ slug: theme.slug }));
}

export default function ThemePage({ params }: { params: { slug: string } }) {
  const theme = getThemeBySlug(params.slug);
  if (!theme) notFound();

  const messages = getMessages().filter((message) => message.themes.includes(theme.name));
  const facets = getFacets(messages);

  return (
    <main className="page theme-page">
      <section className="theme-hero">
        <div className="container theme-hero-inner">
          <div className="theme-hero-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={theme.image} alt={`Messages sur le thème ${theme.name}`} />
          </div>
          <div className="theme-hero-copy">
            <p className="eyebrow">Thème</p>
            <h1>{theme.name}</h1>
            <p>{theme.description}</p>
            <span>{messages.length} messages</span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Suspense fallback={<div className="empty">Chargement des messages…</div>}>
            <MessageExplorer messages={messages} facets={facets} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
