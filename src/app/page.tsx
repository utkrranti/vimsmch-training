import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProspectusSection from "@/components/home/ProspectusSection";
import StatsSection from "@/components/home/StatsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
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
        <ProspectusSection />
        <StatsSection />
        <WhyChooseUs />
        <ContactDetails />
      </main>
      <Footer />
    </>
  );
}
