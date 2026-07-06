"use client";

import Link from "next/link";
import { ChevronDown, Heart, Search } from "lucide-react";
import { useState } from "react";
import { getFacets } from "@/lib/data";
import { slugifyTheme } from "@/lib/themes";

export function Header() {
  const facets = getFacets();
  const [megaClosed, setMegaClosed] = useState(false);
  const [seriesMegaClosed, setSeriesMegaClosed] = useState(false);
  const closeMega = () => setMegaClosed(true);
  const openMega = () => setMegaClosed(false);
  const closeSeriesMega = () => setSeriesMegaClosed(true);
  const openSeriesMega = () => setSeriesMegaClosed(false);

  return (
    <header className="site-header">
      <div className="header-shell">
        <Link className="brand" href="/" aria-label="Accueil Ivan Carluer">
          Ivan Carluer
        </Link>

        <nav className="desktop-nav" aria-label="Navigation principale">
          <Link href="/">Accueil</Link>
          <div className={`nav-mega-item${megaClosed ? " mega-closed" : ""}`} onMouseEnter={openMega}>
            <Link className="mega-trigger" href="/messages" aria-haspopup="true" onClick={closeMega}>
              Messages
              <ChevronDown size={14} />
            </Link>
            <div className="mega-menu" aria-label="Menu messages">
              <div className="mega-menu-inner">
                <div className="mega-feature">
                  <span>Bibliothèque</span>
                  <h2>Tous les messages d'Ivan Carluer</h2>
                  <p>Rechercher par année, thème, testament ou chemin biblique.</p>
                  <Link href="/messages" onClick={closeMega}>Tous les messages</Link>
                </div>
                <div className="mega-links-panel">
                  <div className="mega-column">
                    <h3>Par année</h3>
                    <Link className="mega-all-link" href="/messages" onClick={closeMega}>
                      Tout voir
                    </Link>
                    {facets.years.slice(0, 7).map((year) => (
                      <Link key={year} href={`/messages?year=${encodeURIComponent(year)}`} onClick={closeMega}>
                        {year}
                      </Link>
                    ))}
                  </div>
                  <div className="mega-column">
                    <h3>Par thème</h3>
                    <Link className="mega-all-link" href="/messages" onClick={closeMega}>
                      Tout voir
                    </Link>
                    {facets.themes.slice(0, 7).map((theme) => (
                      <Link key={theme} href={`/themes/${slugifyTheme(theme)}`} onClick={closeMega}>
                        {theme}
                      </Link>
                    ))}
                  </div>
                  <div className="mega-column">
                    <h3>Choix du testament</h3>
                    <Link href="/messages?testament=Ancien%20Testament" onClick={closeMega}>Ancien Testament</Link>
                    <Link href="/messages?testament=Nouveau%20Testament" onClick={closeMega}>Nouveau Testament</Link>
                    <Link href="/messages?sort=biblical" onClick={closeMega}>Toute la Bible</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`nav-mega-item series-nav-item${seriesMegaClosed ? " mega-closed" : ""}`} onMouseEnter={openSeriesMega}>
            <Link className="mega-trigger" href="/series" aria-haspopup="true" onClick={closeSeriesMega}>
              Séries
              <ChevronDown size={14} />
            </Link>
            <div className="mega-menu series-mega-menu" aria-label="Menu séries">
              <div className="mega-menu-inner series-menu-inner">
                <div className="mega-feature series-feature">
                  <span>Parcours</span>
                  <h2>Explorer les séries MLK</h2>
                  <p>Des enseignements regroupés pour suivre un sujet dans l'ordre.</p>
                  <Link href="/series" onClick={closeSeriesMega}>Toutes les séries</Link>
                </div>
                <div className="mega-links-panel series-links-panel">
                  <div className="mega-column">
                    <h3>Séries</h3>
                    <Link href="/series?group=celebrations" onClick={closeSeriesMega}>Célébrations</Link>
                    <Link href="/series/puissance-7" onClick={closeSeriesMega}>Puissance 7</Link>
                    <Link href="/series" onClick={closeSeriesMega}>Toutes les séries</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link className="search-nav-link" href="/rechercher">
            <Search size={15} aria-hidden="true" />
            Explorer
          </Link>
          <Link href="/vision-mlk">Église&nbsp;MLK</Link>
          <Link href="/ivan-carluer">Ivan&nbsp;Carluer</Link>
        </nav>

        <div className="header-actions">
          <a className="donate-link" href="https://jeveuxdonner.fr" target="_blank" rel="noreferrer">
            <Heart size={16} />
            Donner
          </a>
        </div>

        <details className="mobile-menu">
          <summary>Menu</summary>
          <div className="mobile-menu-panel">
            <Link href="/">Accueil</Link>
            <Link href="/series">Séries</Link>
            <Link href="/rechercher">
              <Search size={15} aria-hidden="true" />
              Explorer
            </Link>
            <div className="mobile-menu-group">
              <strong>Séries</strong>
              <Link href="/series?group=celebrations">Célébrations</Link>
              <Link href="/series/puissance-7">Puissance 7</Link>
              <Link href="/series">Toutes les séries</Link>
            </div>
            <div className="mobile-menu-group">
              <strong>Messages</strong>
              <Link href="/messages">Tous les messages</Link>
              <Link href={`/messages?year=${encodeURIComponent(facets.years[0] ?? "")}`}>Dernière année</Link>
              <Link href="/messages?sort=biblical">Toute la Bible</Link>
              <Link href="/messages?testament=Ancien%20Testament">Ancien Testament</Link>
              <Link href="/messages?testament=Nouveau%20Testament">Nouveau Testament</Link>
            </div>
            <Link href="/vision-mlk">Église MLK</Link>
            <Link href="/ivan-carluer">Ivan Carluer</Link>
            <a href="https://jeveuxdonner.fr" target="_blank" rel="noreferrer">Donner</a>
          </div>
        </details>
      </div>
    </header>
  );
}
