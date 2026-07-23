import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cgv from "./_components/Cgv";

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente | Law Clean Center',
  description: 'Conditions générales de vente et de prestation de services de Law Clean Center.',
  alternates: { canonical: "https://lawcleancenter.com/cgv" },
  robots: {
    index: false,
    follow: true,
  }
};

export default function CgvPage() {
  return (
    <>
      <Navbar />
      <main className="relative bg-background min-h-screen flex flex-col pt-20 md:pt-24">
        <Cgv />
      </main>
      <Footer />
    </>
  );
}