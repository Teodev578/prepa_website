import Hero from "@/components/home/Hero";
import TechnicalServices from "@/components/home/TechnicalServices";
import ExcellencePhilosophy from "@/components/home/ExcellencePhilosophy";
import Stats from "@/components/home/Stats";
// import Testimonials from "@/components/home/Testimonials";
import Ticker from "@/components/home/Ticker"; // Ton nouveau composant
import CTA from "@/components/home/CTA";
export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Law Clean Center",
    "description": "Externalisation de la préparation esthétique VN/VO et le convoyage de véhicules pour les professionnels de l'automobile en Île-de-France.",
    "url": "https://lawcleancenter.com",
    "email": "lawcleancenter@outlook.com",
    "taxID": "922 386 131 00010",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Roissy-en-France",
      "addressRegion": "Île-de-France",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "49.0974",
      "longitude": "2.5065"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Île-de-France"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de préparation esthétique et convoyage B2B",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Préparation esthétique automobile B2B",
            "description": "Nettoyage technique VN/VO, detailing intérieur/extérieur et rénovation de véhicules pour concessionnaires et parcs automobiles."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Convoyage de véhicules",
            "description": "Transport sécurisé et convoyage de flottes automobiles en Île-de-France avec traçabilité complète."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Externalisation pôle préparation",
            "description": "Gestion externalisée du pôle esthétique et logistique pour transformer charges fixes en coûts variables."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Rénovation et detailing de parc",
            "description": "Remise en état complète de véhicules d'occasion pour maximiser la valeur de revente."
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <>
        <Hero />
        <Ticker />
        <Stats />
        <ExcellencePhilosophy />
        <TechnicalServices />
        {/* <Testimonials /> */}
        <CTA />
      </>
    </>
  );
}
