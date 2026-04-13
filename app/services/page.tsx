import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";

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
