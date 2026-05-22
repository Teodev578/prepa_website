import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Portfolio from "./_components/Portfolio";
import AboutSection from "./_components/AboutSection";

// 🛠️ CONFIGURATION MAJEURE SEO : Les métadonnées lues par les moteurs de recherche
// A la base il s'agissais d'une section portfolio, mais j'ai décidé de faire une page dédiée pour mieux structurer le discours et les réalisations. D'où ce titre plus global.
export const metadata: Metadata = {
  title: "À Propos & Réalisations | Law Clean Center",
  description: "Transformez votre préparation automobile en charge variable. Découvrez l'expertise de Law Clean Center et nos études de cas de nettoyage technique en Île-de-France.",
  keywords: ["externalisation", "rénovation", "nettoyage technique", "polissage", "avant après", "études de cas", "Île-de-France", "B2B", "Law Clean Center"],
  
  openGraph: {
    title: "Expertise & Réalisations | Law Clean Center",
    description: "Externalisation de préparation automobile et convoyage. Métriques d'impact et optimisation des coûts.",
    type: "website",
    locale: "fr_FR",
    url: "https://lawcleancenter.com/portfolio",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="relative bg-background min-h-screen flex flex-col pt-20 md:pt-24">
        {/* 🛠️ Le discours commercial et stratégique */}
        <AboutSection />
        {/* 🛠️ La preuve par l'image (Études de cas) */}
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}