import { MotionConfig } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="hide-native-cursor">
      <Preloader />
      <CustomCursor />
      <GrainOverlay />
      <MotionConfig transition={{ ease: [0.16, 1, 0.3, 1] }}>
        <SmoothScroll>
          <Navbar />
          <main className="relative flex flex-col min-h-screen bg-background pt-20">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </MotionConfig>
    </div>
  );
}
