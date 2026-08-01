"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  GraduationCap,
  Stethoscope,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    image: "/images/hospital-building.webp",
    alt: "VIMSMCH teaching hospital campus",
    eyebrow: "Admissions Open — 2026 Batch",
    title: "Learn Skills.",
    accent: "Build Your Career.",
    description:
      "Affordable one-year job-oriented paramedical courses with practical hospital training at the Paramedical Institute.",
    action: "Apply Now",
    href: "/admission/apply",
    position: "object-center",
  },
  {
    image: "/images/hospital-hero.webp",
    alt: "Clinical training facilities at VIMSMCH",
    eyebrow: "Hospital-Based Education",
    title: "Train Where",
    accent: "Healthcare Happens.",
    description:
      "Develop practical confidence through theory, laboratory sessions, and supervised clinical exposure in a teaching hospital.",
    action: "Explore Courses",
    href: "/courses",
    position: "object-center",
  },
  {
    image: "/college-photo.png",
    alt: "Dr. Vithalrao Vikhe Patil Foundation campus",
    eyebrow: "Vocational Training Centre",
    title: "A Strong Foundation",
    accent: "For Your Future.",
    description:
      "Begin a focused healthcare career journey with experienced faculty, structured training, and employment-oriented learning.",
    action: "View Admission Details",
    href: "/admission/apply",
    position: "object-center",
  },
] as const;

const highlights = [
  { icon: Stethoscope, label: "Hospital-Based Training" },
  { icon: GraduationCap, label: "Experienced Medical Faculty" },
  { icon: Clock3, label: "One-Year Courses" },
];

type HeroCarouselProps = {
  prospectusUrl?: string;
};

export default function HeroCarousel({ prospectusUrl }: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const showSlide = useCallback((next: number, nextDirection: number) => {
    setDirection(nextDirection);
    setActive((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActive((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const slide = slides[active];

  return (
    <section
      className="relative min-h-[650px] overflow-hidden bg-[#04415f] text-white lg:min-h-[680px]"
      aria-roledescription="carousel"
      aria-label="Paramedical Institute highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.image}
          custom={direction}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            sizes="100vw"
            className={`object-cover ${slide.position}`}
            priority={active === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-[#022f47]/95 via-[#034f70]/82 to-[#087eaa]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#011e2c]/70 via-transparent to-[#011e2c]/15" />
      <div className="absolute inset-0 bg-dot-grid text-white opacity-[0.035]" />

      <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-6 py-20 sm:px-12 lg:min-h-[680px] lg:px-20">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 38 : -38 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -24 : 24 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8cddf6] shadow-[0_0_0_4px_rgba(140,221,246,0.15)]" />
              {slide.eyebrow}
            </div>

            <h1 className="font-display text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white drop-shadow-md sm:text-6xl lg:text-[4.8rem]">
              {slide.title}
              <br />
              <span className="italic text-[#c9f0ff]">{slide.accent}</span>
            </h1>

            <p className="mt-7 max-w-2xl border-l-2 border-[#8cddf6] pl-5 text-base leading-relaxed text-white/88 sm:text-lg">
              {slide.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={slide.href}
                className="group inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 font-bold text-[#04415f] shadow-[0_14px_32px_rgba(1,30,44,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#edf9fd]"
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
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3.5 font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/18"
                >
                  <Download size={16} /> Download Prospectus
                </a>
              )}
            </div>

            <div className="mt-10 grid max-w-2xl gap-2 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-white/15 bg-[#011e2c]/25 px-3 py-2.5 text-xs font-semibold text-white/90 backdrop-blur-md"
                >
                  <Icon size={14} className="shrink-0 text-[#9fe5fa]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => showSlide(active - 1, -1)}
        className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#011e2c]/25 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#04415f] sm:flex lg:left-6"
        aria-label="Previous slide"
      >
        <ChevronLeft size={21} />
      </button>
      <button
        type="button"
        onClick={() => showSlide(active + 1, 1)}
        className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#011e2c]/25 text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#04415f] sm:flex lg:right-6"
        aria-label="Next slide"
      >
        <ChevronRight size={21} />
      </button>

      <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-2" role="tablist" aria-label="Choose slide">
        {slides.map((item, index) => (
          <button
            key={item.image}
            type="button"
            onClick={() => showSlide(index, index >= active ? 1 : -1)}
            className={`h-2 rounded-full transition-all duration-300 ${index === active ? "w-9 bg-white" : "w-2 bg-white/45 hover:bg-white/75"}`}
            aria-label={`Show slide ${index + 1}: ${item.eyebrow}`}
            aria-selected={index === active}
            role="tab"
          />
        ))}
      </div>

      <div className="absolute bottom-5 right-6 hidden text-[11px] font-semibold tracking-[0.16em] text-white/65 sm:block">
        {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>
    </section>
  );
}
