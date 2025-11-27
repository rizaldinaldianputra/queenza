import Navbar from "@/components/client/Navbar";
import HeroSection from "@/components/client/HeroSection";
import PromoSection from "@/components/client/PromoSection";
import GallerySection from "@/components/client/GallerySection";
import TestimoniSection from "@/components/client/TestimoniSection";
import Footer from "@/components/client/Footer";
import ServicesSection from "@/components/client/ServicesSection";
import Marquee from "@/components/client/Marquee";

export default function UserHome() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <Marquee />
      <ServicesSection />
      <PromoSection />
      <GallerySection />
      <TestimoniSection />
      <Footer />
    </main>
  );
}
