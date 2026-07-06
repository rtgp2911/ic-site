import type { Metadata } from "next";
import { Suspense } from "react";
import { SeriesExplorer } from "@/components/SeriesExplorer";
import { getSeries } from "@/lib/series";

export const metadata: Metadata = {
  title: "Séries | Ivan Carluer",
  description:
    "Explorez les séries MLK, recherchez par thème, livre biblique, personnage, mot-clé ou épisode, et retrouvez les parcours associés."
};

export default function SeriesPage() {
  const series = getSeries();

  return (
    <main className="page-shell series-page">
      <section className="series-hero">
        <div className="series-hero-bg" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/series/series-hero-bw.png" alt="" />
        </div>
        <div className="series-hero-copy">
          <span className="section-eyebrow">Séries</span>
          <h1>Découvrez nos séries</h1>
        </div>
      </section>

      {series.length > 0 ? (
        <Suspense fallback={<div className="series-loading">Chargement des séries...</div>}>
          <SeriesExplorer series={series} />
        </Suspense>
      ) : (
        <section className="series-empty">
          <h2>Les séries arrivent bientôt</h2>
          <p>
            La page est prête. Les séries seront affichées dès que les feuilles Google Sheets auront été synchronisées
            avec le projet.
          </p>
        </section>
      )}
    </main>
  );
}
