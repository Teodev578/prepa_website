import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  openGraph: {
    title: 'Solutions de Préparation & Logistique Automobile B2B',
    description: 'Transformez vos charges fixes en coûts 100% variables. Standard de qualité unique pour concessions et parcs automobiles.',
    type: 'website',
    locale: 'fr_FR',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ServicesPage() {
  return (
    <main className="relative bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Services />
      </div>
      <Footer />
    </main>
  );
}