import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Portfolio from "./_componets/Portfolio";

// 🛠️ CONFIGURATION MAJEURE SEO : Les métadonnées lues par les moteurs de recherche
export const metadata: Metadata = {
  title: "Nos Réalisations & Études de Cas | Law Clean Center",
  description: "Découvrez nos interventions de nettoyage technique et rénovation en Île-de-France. Résultats réels documentés, optimisations de performances et solutions B2B.",
  keywords: ["rénovation", "nettoyage technique", "polissage", "avant après", "études de cas", "Île-de-France", "B2B", "Law Clean Center"],
  
  // Open Graph pour un affichage professionnel lors des partages de liens
  openGraph: {
    title: "Nos Réalisations & Rénovations | Law Clean Center",
    description: "Interventions techniques documentées avec métriques d'impact de terrain.",
    type: "website",
    locale: "fr_FR",
    url: "https://lawcleancenter.com/portfolio", // Remplace par ton vrai nom de domaine définitif
  },
};

export default function PortfolioPage() {
  return (
    // 🛠️ SEO : Utilisation d'un fragment sémantique global, <main> est conservé à l'intérieur
    <>
      <Navbar />
      <main className="relative bg-background min-h-screen flex flex-col flex-grow pt-20">
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}