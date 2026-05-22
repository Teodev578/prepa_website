import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "./_components/Contact";

export const metadata: Metadata = {
  title: "Contactez-nous & Devis | Law Clean Center - Préparation B2B",
  description: "Contactez Law Clean Center pour toute demande de devis, de renfort opérationnel sur site ou de forfait de préparation esthétique et convoyage de véhicules en Île-de-France.",
  keywords: ["contact", "devis", "Law Clean Center", "préparateur auto", "convoyage", "B2B", "Île-de-France"],
  alternates: { canonical: "https://lawcleancenter.com/contact" },
  openGraph: {
    title: "Contact & Devis | Law Clean Center",
    description: "Demande de devis pour préparation esthétique B2B et convoyage de véhicules en Île-de-France. Réponse sous 24h.",
    url: "https://lawcleancenter.com/contact",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Law Clean Center - Devis Préparation & Convoyage",
    description: "Contactez-nous pour externaliser votre pôle esthétique automobile.",
    images: ["/twitter-image.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="relative bg-background min-h-screen flex flex-col pt-20 md:pt-24">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
