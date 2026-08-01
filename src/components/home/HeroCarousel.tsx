"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Download, GraduationCap, Clock3, BedDouble, CalendarCheck } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Learn Skills. Save Lives.",
    accent: "Build Your Career.",
    action: "Apply Now",
    href: "/admission/apply",
  },
  {
    title: "Train Where",
    accent: "Healthcare Happens.",
    action: "Explore Courses",
    href: "/courses",
  },
  {
    title: "A Strong Foundation",
    accent: "For Your Future.",
    action: "View Admission Details",
    href: "/admission/apply",
  },
] as const;

const stats = [
  { icon: GraduationCap, value: "5", label: "Certificate Courses", sub: "One-Year Programmes" },
  { icon: Clock3, value: "1 Year", label: "Course Duration", sub: "Theory + Practical + Clinical" },
  { icon: BedDouble, value: "800+", label: "Bed Teaching Hospital", sub: "Hands-On Clinical Training" },
  { icon: CalendarCheck, value: "2026", label: "First Batch", sub: "Admissions Open Now" },
] as const;

type HeroCarouselProps = {
  prospectusUrl?: string;
};

export default function HeroCarousel({ prospectusUrl }: HeroCarouselProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");
  const [statIndex, setStatIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStatIndex((i) => (i + 1) % stats.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[slideIndex];
  const fullText = `${slide.title} ${slide.accent}`;

  useEffect(() => {
    let timeout: number;

    if (phase === "typing") {
      if (charCount < fullText.length) {
        timeout = window.setTimeout(() => setCharCount((c) => c + 1), 45);
      } else {
        timeout = window.setTimeout(() => setPhase("deleting"), 2400);
      }
    } else {
      if (charCount > 0) {
        timeout = window.setTimeout(() => setCharCount((c) => c - 1), 22);
      } else {
        timeout = window.setTimeout(() => {
          setSlideIndex((i) => (i + 1) % slides.length);
          setPhase("typing");
        }, 350);
      }
    }
    return () => window.clearTimeout(timeout);
  }, [charCount, phase, fullText]);

  const visibleText = fullText.slice(0, charCount);
  const titleLen = slide.title.length;
  const visibleTitle = visibleText.slice(0, Math.min(charCount, titleLen));
  const visibleAccent = visibleText.slice(titleLen).replace(/^ /, "");

  return (
    <section
      className="relative h-screen min-h-[560px] overflow-hidden bg-white text-[#011e2c]"
      aria-label="Paramedical Institute highlights"
    >
      {/* Single fixed background image */}
      <Image
        src="/images/campus-entrance.jpg"
        alt="Dr. Vithalrao Vikhe Patil Foundation's Medical College campus entrance"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-dot-grid text-[#04415f] opacity-[0.04]" />

      <div className="relative mx-auto flex h-full min-h-[560px] max-w-7xl flex-col items-center justify-center px-6 py-16 sm:px-12 lg:px-20">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-white/50" />
          <div className="relative">
        <div className="mb-8 flex flex-nowrap items-center justify-center gap-3 sm:gap-6 text-center">
          <div className="relative shrink-0 flex items-center justify-center h-20 w-20 sm:h-40 sm:w-40">
            <div className="absolute inset-0 rounded-full p-[3px] sm:p-[4px] bg-[conic-gradient(from_0deg,#22c55e,#2086b8,#22c55e)] shadow-[0_8px_30px_rgba(4,65,95,0.2)] animate-spin-slow">
              <div className="h-full w-full rounded-full bg-white" />
            </div>
            <Image
              src="/images/foundation-logo.png"
              alt="Dr. Vithalrao Vikhe Patil Foundation"
              width={200}
              height={151}
              className="relative h-12 sm:h-28 w-auto"
            />
          </div>
          <div className="text-[#04415f]">
            <p className="font-display text-lg sm:text-4xl 2xl:text-5xl font-bold leading-tight">
              Dr. Vithalrao Vikhe Patil Foundation&apos;s
            </p>
            <p className="font-display text-lg sm:text-4xl 2xl:text-5xl font-bold leading-tight">
              Paramedical Institute
            </p>
            <p className="mt-1.5 hidden sm:block text-sm 2xl:text-base font-semibold text-[#04415f]/70">
              Affiliated to NCVRT, New Delhi — Registered Number REG/NCVRT/MH/35074/VTC.
            </p>
          </div>
          <div className="relative shrink-0 flex items-center justify-center h-20 w-20 sm:h-40 sm:w-40">
            <div className="absolute inset-0 rounded-full p-[3px] sm:p-[4px] bg-[conic-gradient(from_0deg,#22c55e,#2086b8,#22c55e)] shadow-[0_8px_30px_rgba(4,65,95,0.2)] animate-spin-slow">
              <div className="h-full w-full rounded-full bg-white" />
            </div>
            <Image
              src="/images/paramedical-institute-logo.png"
              alt="Paramedical Institute"
              width={150}
              height={150}
              className="relative h-12 sm:h-28 w-auto"
            />
          </div>
        </div>

        <div className="max-w-3xl text-center mx-auto">
          <h1 className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#011e2c] sm:text-4xl lg:text-5xl">
            <span className="block min-h-[1.1em]">
              {visibleTitle}
              {visibleTitle.length < titleLen && (
                <span className="inline-block w-[2px] h-[0.9em] bg-[#04415f] ml-0.5 align-middle animate-pulse" />
              )}
            </span>
            <span className="block italic text-[#2086b8] min-h-[1.1em]">
              {visibleAccent}
              {visibleTitle.length >= titleLen && (
                <span className="inline-block w-[2px] h-[0.85em] bg-[#2086b8] ml-0.5 align-middle animate-pulse" />
              )}
            </span>
          </h1>

          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${slideIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                href={slide.href}
                className="group inline-flex items-center gap-3 rounded-xl bg-[#04415f] px-6 py-3.5 font-bold text-white shadow-[0_14px_32px_rgba(4,65,95,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#011e2c]"
              >
                {slide.action}
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Link>
              {prospectusUrl && (
                <a
                  href={prospectusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 rounded-xl border border-[#04415f]/25 bg-[#04415f]/5 px-5 py-3.5 font-semibold text-[#04415f] transition-colors hover:bg-[#04415f]/10"
                >
                  <Download size={16} /> Download Prospectus
                </a>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`stat-${statIndex}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 rounded-2xl border border-[#04415f]/12 bg-white/75 px-5 py-3 backdrop-blur-md shadow-sm"
              >
                {(() => {
                  const Stat = stats[statIndex];
                  const Icon = Stat.icon;
                  return (
                    <>
                      <Icon size={20} className="shrink-0 text-[#2086b8]" />
                      <span className="font-display text-xl font-bold text-[#04415f]">{Stat.value}</span>
                      <span className="text-sm font-semibold text-[#011e2c]">{Stat.label}</span>
                      <span className="hidden sm:inline text-xs text-[#04415f]/55">— {Stat.sub}</span>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-2">
        {slides.map((item, index) => (
          <span
            key={item.title}
            className={`h-2 rounded-full transition-all duration-300 ${index === slideIndex ? "w-9 bg-[#04415f]" : "w-2 bg-[#04415f]/25"}`}
          />
        ))}
      </div>
    </section>
  );
}
