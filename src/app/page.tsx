import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProspectusSection from "@/components/home/ProspectusSection";
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
      </main>
      <Footer />
    </>
  );
}
