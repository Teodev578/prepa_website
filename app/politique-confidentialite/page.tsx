import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PolitiqueConfidentialiteContent from "./_components/PolitiqueConfidentialiteContent";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Law Clean Center - RGPD",
  description: "Découvrez comment Law Clean Center collecte, utilise et protège vos données personnelles conformément au RGPD.",
  keywords: ["politique de confidentialité", "RGPD", "protection des données", "Law Clean Center", "cookies", "données personnelles"],
  alternates: { canonical: "https://lawcleancenter.com/politique-confidentialite" },
  openGraph: {
    title: "Politique de Confidentialité | Law Clean Center",
    description: "Protection de vos données personnelles et respect du RGPD par Law Clean Center.",
    url: "https://lawcleancenter.com/politique-confidentialite",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Politique de Confidentialité Law Clean Center" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Politique de Confidentialité | Law Clean Center",
    description: "Comment nous protégeons vos données personnelles.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main className="relative bg-background min-h-screen flex flex-col pt-24 md:pt-32 pb-20 overflow-hidden">
        <PolitiqueConfidentialiteContent />
      </main>
      <Footer />
    </>
  );
}
