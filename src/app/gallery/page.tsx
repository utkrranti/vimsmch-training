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
  { value: "campus", label: "Campus" },
  { value: "hospital", label: "Hospital" },
  { value: "laboratories", label: "Laboratories" },
  { value: "clinical-training", label: "Clinical Training" },
  { value: "events", label: "Events" },
  { value: "convocation", label: "Convocation" },
  { value: "guest-lectures", label: "Guest Lectures" },
  { value: "students", label: "Students" },
];

export default async function GalleryPage() {
  const items = await getAllGalleryItems();

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div
          className="relative text-white py-16 px-4 sm:px-6 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #011e2c 0%, #04415f 100%)" }}
        >
          <div className="pointer-events-none absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#2086b8]/20 blur-[90px]" />
          <div className="absolute inset-0 bg-dot-grid opacity-[0.05] text-white" />
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs text-white/50 mb-3">Home / Gallery</p>
            <span className="eyebrow eyebrow-light mb-4">Moments &amp; Milestones</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-brand">Gallery</h1>
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
