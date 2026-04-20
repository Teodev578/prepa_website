import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechnicalServices from "@/components/TechnicalServices";
import ExcellencePhilosophy from "@/components/ExcellencePhilosophy";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-background">
      <Navbar />
      <Hero />
      <TechnicalServices />
      <ExcellencePhilosophy />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
