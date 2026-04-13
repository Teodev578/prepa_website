import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-background">
      <Navbar />
      <Hero />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
