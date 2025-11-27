import HeroSection from "@/components/client/HeroSection";
import PromoSection from "@/components/client/PromoSection";
import GallerySection from "@/components/client/GallerySection";
import TestimoniSection from "@/components/client/TestimoniSection";
import Footer from "@/components/client/Footer";
import Navbar from "@/components/client/Navbar";

export default function UserHome() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <PromoSection />
      <GallerySection />
      <TestimoniSection />
      <Footer />
    </>
  );
}
