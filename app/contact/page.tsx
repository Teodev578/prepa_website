import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export default function ContactPage() {
  return (
    <main className="relative bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
