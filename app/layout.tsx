import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://ivancarluer.fr"),
  title: {
    default: "Ivan Carluer - Messages, prédications et enseignements bibliques",
    template: "%s | Ivan Carluer"
  },
  description:
    "Découvrez les messages, prédications et enseignements bibliques d'Ivan Carluer, pasteur et fondateur de l'Église MLK à Créteil.",
  applicationName: "Ivan Carluer",
  keywords: [
    "Ivan Carluer",
    "Église MLK",
    "Martin Luther King Créteil",
    "prédications Ivan Carluer",
    "enseignements bibliques",
    "messages chrétiens",
    "pasteur évangélique",
    "Bible",
    "grâce",
    "foi chrétienne"
  ],
  authors: [{ name: "Église Martin Luther King", url: "https://eglisemlk.fr" }],
  creator: "Église Martin Luther King",
  publisher: "Église Martin Luther King",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ivancarluer.fr",
    siteName: "Ivan Carluer",
    title: "Ivan Carluer - Messages, prédications et enseignements bibliques",
    description:
      "Un accès clair aux messages, prédications et enseignements bibliques d'Ivan Carluer et de l'Église MLK.",
    images: [
      {
        url: "/images/ivan/ivan-couple-banner.png",
        width: 1600,
        height: 900,
        alt: "Ivan Carluer, pasteur et enseignant de la Bible"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivan Carluer - Messages et enseignements bibliques",
    description:
      "Explorez les messages, prédications et enseignements bibliques d'Ivan Carluer.",
    images: ["/images/ivan/ivan-couple-banner.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
