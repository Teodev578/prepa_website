import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import TechnicalServices from "@/components/home/TechnicalServices";
import ExcellencePhilosophy from "@/components/home/ExcellencePhilosophy";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
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
