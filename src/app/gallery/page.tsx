import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GalleryGrid from "./GalleryGrid";
import { getAllGalleryItems } from "@/lib/db/gallery";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery | VIMSMCH Paramedical Institute",
  description: "Photos and moments from VIMSMCH Paramedical Institute classes, events, and certificate ceremonies.",
};

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "general", label: "Campus" },
  { value: "facility", label: "Facilities" },
  { value: "event", label: "Events" },
  { value: "ceremony", label: "Ceremonies" },
];

export default async function GalleryPage() {
  const items = await getAllGalleryItems();

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div className="bg-[#e6edf0] border-b border-[#cdd8de] py-8 sm:py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-[#010608]/50 mb-2">Home / Gallery</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#011e2c] mb-1">Gallery</h1>
            <div className="w-14 h-0.5 bg-[#2086b8] mt-3" />
          </div>
        </div>

        <section className="bg-white py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <GalleryGrid items={items} categories={CATEGORIES} />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
