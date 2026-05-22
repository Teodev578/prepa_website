import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import TechnicalServices from "@/components/home/TechnicalServices";
import ExcellencePhilosophy from "@/components/home/ExcellencePhilosophy";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoServices",
    "name": "Law Clean Center",
    "description": "Externalisation de la préparation esthétique VN/VO et du convoyage de véhicules pour les professionnels de l'automobile en Île-de-France.",
    "url": "https://lawcleancenter.com",
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Île-de-France"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Roissy-en-France",
      "addressRegion": "Île-de-France",
      "addressCountry": "FR"
    },
    "serviceType": [
      "Préparation esthétique automobile B2B",
      "Convoyage de véhicule",
      "Nettoyage technique VN/VO",
      "Rénovation de parc automobile"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="relative bg-background pt-20 md:pt-24">
        <Hero />
        <TechnicalServices />
        <ExcellencePhilosophy />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
