import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "./_components/Contact";

export const metadata: Metadata = {
  title: "Contactez-nous & Devis | Law Clean Center - Préparation B2B",
  description: "Contactez Law Clean Center pour toute demande de devis, de renfort opérationnel sur site ou de forfait de préparation esthétique et convoyage de véhicules en Île-de-France.",
  keywords: ["contact", "devis", "Law Clean Center", "préparateur auto", "convoyage", "B2B", "Île-de-France"],
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
