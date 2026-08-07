import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import QuickAccessGrid from "@/components/home/QuickAccessGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import StatsSection from "@/components/home/StatsSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import DirectorMessage from "@/components/home/DirectorMessage";
import HowToEnroll from "@/components/home/HowToEnroll";
import QuickResourceLinks from "@/components/home/QuickResourceLinks";
import ProspectusSection from "@/components/home/ProspectusSection";
import QuickInquiry from "@/components/home/QuickInquiry";
import ContactDetails from "@/components/home/ContactDetails";
import AnnouncementBanner from "@/components/home/AnnouncementBanner";
import { getActiveAnnouncements } from "@/lib/db/announcements";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const announcements = await getActiveAnnouncements();

  return (
    <>
      <Navbar />
      <AnnouncementBanner announcements={announcements} />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <QuickAccessGrid />
        <WhyChooseUs />
        <FeaturedCourses />
        <DirectorMessage />
        <HowToEnroll />
        <QuickResourceLinks />
        <ProspectusSection />
        <QuickInquiry />
        <ContactDetails />
      </main>
      <Footer />
    </>
  );
}
