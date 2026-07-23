import { Metadata } from 'next';
import MentionsLegalesContent from "./_components/MentionsLegalesContent";

export const metadata: Metadata = {
  title: "Mentions Légales | Law Clean Center - Préparation & Convoyage Automobile",
  description: "Consultez les mentions légales du site Law Clean Center : éditeur, hébergeur Vercel, conditions d'accès, propriété intellectuelle et responsabilité.",
  keywords: ["mentions légales", "Law Clean Center", "éditeurs", "Vercel", "EURL", "Pontoise", "CGV", "propriété intellectuelle"],
  alternates: { canonical: "https://lawcleancenter.com/mentions-legales" },
  openGraph: {
    title: "Mentions Légales | Law Clean Center",
    description: "Mentions légales réglementaires de Law Clean Center - EURL au capital de 300€.",
    url: "https://lawcleancenter.com/mentions-legales",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Mentions Légales Law Clean Center" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentions Légales | Law Clean Center",
    description: "Informations légales et réglementaires de la société Law Clean Center.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function MentionsLegalesPage() {
  return (
      <div className="pb-20 overflow-hidden">
        <MentionsLegalesContent />
      </div>
  );
}
