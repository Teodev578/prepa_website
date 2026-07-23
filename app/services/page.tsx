import { Metadata } from 'next';
import Services from "./_components/Services";

// 🚀 Métadonnées lues par les robots de Google (SEO)
export const metadata: Metadata = {
  title: 'Prestations & Logistique B2B pour Parcs Automobiles | Île-de-France',
  description: 'Optimisez la rotation de vos véhicules d\'occasion. Solutions de renfort sur site, convoyage sécurisé et gestion globale de votre pôle préparation en IDF.',
  keywords: [
    'préparateur esthétique automobile b2b', 
    'gestion parc automobile occasion', 
    'convoyage véhicule ile-de-france', 
    'detailing professionnel concessionnaire',
    'externalisation pôle préparation auto',
    'law clean center services'
  ],
  alternates: { canonical: "https://lawcleancenter.com/services" },
  openGraph: {
    title: 'Solutions de Préparation & Logistique Automobile B2B',
    description: 'Transformez vos charges fixes en coûts 100% variables. Standard de qualité unique pour concessions et parcs automobiles.',
    url: "https://lawcleancenter.com/services",
    siteName: 'Law Clean Center',
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Services Law Clean Center - Préparation et convoyage B2B" }],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Services Préparation & Convoyage B2B | Law Clean Center",
    description: "Externalisation pôle esthétique et logistique pour professionnels de l'automobile en IDF.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ServicesPage() {
  return (
    <>
      <>
        <Services />
      </>
    </>
  );
}