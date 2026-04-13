import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Portfolio from "@/components/Portfolio";

export default function PortfolioPage() {
  return (
    <main className="relative bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-20">
        <Portfolio />
      </div>
      <Footer />
    </main>
  );
}
