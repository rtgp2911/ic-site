import Link from "next/link";
import { getFacets } from "@/lib/data";

export function Footer() {
  const facets = getFacets();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link href="/">Ivan Carluer</Link>
        </div>
        <div className="footer-grid">
          <FooterColumn
            title="Messages"
            links={[
              ["Tous les messages", "/messages"],
              ["Séries", "/series"],
              ["Par année", `/messages?year=${encodeURIComponent(facets.years[0] ?? "")}`],
              ["Par thème", `/messages?theme=${encodeURIComponent(facets.themes[0] ?? "")}`],
              ["Livres bibliques", "/messages?testament=Ancien%20Testament"],
              ["Personnages bibliques", "/messages?person=Jésus"]
            ]}
          />
          <FooterColumn
            title="Ivan Carluer"
            links={[
              ["Ivan Carluer", "/ivan-carluer"],
              ["Vision", "/vision-mlk"],
              ["Demander une prière", "mailto:priere@eglisemlk.fr"]
            ]}
          />
          <FooterColumn
            title="Église MLK"
            links={[
              ["Site de l'Église MLK", "https://eglisemlk.fr"],
              ["Nous rejoindre", "https://eglisemlk.fr"],
              ["Faire un don", "https://jeveuxdonner.fr"]
            ]}
          />
          <FooterColumn
            title="Ressources"
            links={[
              ["YouTube", "https://www.youtube.com/@EgliseMLKCreteil"],
              ["Instagram", "https://www.instagram.com/ivancarluer/"],
              ["Spotify", "https://open.spotify.com/show/6ljq9z0T5fUbJcqsJfu7vK"]
            ]}
          />
        </div>
        <div className="footer-bottom">
          <span>Français</span>
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/politique-confidentialite">Politique de confidentialité</Link>
          <span>© 2026 Ivan Carluer</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div className="footer-column">
      <h2>{title}</h2>
      {links.map(([label, href]) =>
        href.startsWith("http") || href.startsWith("mailto:") ? (
          <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            {label}
          </a>
        ) : (
          <Link key={label} href={href}>
            {label}
          </Link>
        )
      )}
    </div>
  );
}
