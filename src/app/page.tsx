import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowToEnroll from "@/components/home/HowToEnroll";
import QuickInquiry from "@/components/home/QuickInquiry";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturedCourses />
        <WhyChooseUs />
        <HowToEnroll />
        <QuickInquiry />
      </main>
      <Footer />
    </>
  );
}
