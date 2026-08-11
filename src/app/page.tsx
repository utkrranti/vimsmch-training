import Image from "next/image";
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
import TopContactBar from "@/components/home/TopContactBar";
import { getActiveAnnouncements } from "@/lib/db/announcements";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const announcements = await getActiveAnnouncements();

  return (
    <>
      {/* Masthead fills exactly one viewport: hero grows to push the marquee to the bottom edge */}
      <div className="flex min-h-screen flex-col">
        <div className="border-b border-[#04415f]/10 bg-white">
          <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/images/foundation-logo.png"
                alt="Dr. Vithalrao Vikhe Patil Foundation"
                width={200}
                height={151}
                className="h-14 w-auto shrink-0 sm:h-20"
              />
              <div className="leading-tight text-[#04415f]">
                <p className="font-display text-lg font-bold sm:text-2xl lg:text-4xl">
                  Dr. Vithalrao Vikhe Patil
                </p>
                <p className="font-display text-lg font-bold sm:text-2xl lg:text-4xl">
                  Foundation
                </p>
              </div>
            </div>
            <Image
              src="/images/paramedical-institute-logo.png"
              alt="Dr. Vithalrao Vikhe Patil Foundation's Paramedical Institute, Ahilyanagar"
              width={150}
              height={150}
              className="h-14 w-auto shrink-0 sm:h-20"
            />
          </div>
        </div>
        <Navbar />
        <HeroSection />
        <TopContactBar />
        <AnnouncementBanner announcements={announcements} />
        <StatsSection />
      </div>
      <main className="flex-1">
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
