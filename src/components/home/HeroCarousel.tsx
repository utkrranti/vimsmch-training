"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroSlide = {
  title: string;
  accent: string;
  action: string;
  href: string;
};

type InstituteNotice = {
  unit1Title: string;
  unit1Text: string;
  unit2Title: string;
  unit2Text: string;
  unit2Extra: string;
  admissionLine: string;
};

type HeroCarouselProps = {
  prospectusUrl?: string;
  carouselSlides?: HeroSlide[];
  instituteNotice?: InstituteNotice;
};

const defaultSlides: HeroSlide[] = [
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
];

const defaultNotice: InstituteNotice = {
  unit1Title: "1. Skill Development Institute",
  unit1Text: "Affiliated to Maharashtra State Board of Skill, Vocational Education and Training",
  unit2Title: "2. Vocational Training Centre",
  unit2Text: "Accredited by National Council of Vocational and Research Training, New Delhi",
  unit2Extra: "(Accreditation No - NCVRT/MH/35074/VTC)",
  admissionLine: "Admission is open for Vocational Training Centre for the Academic Year 2026-27",
};

export default function HeroCarousel({ prospectusUrl, carouselSlides, instituteNotice }: HeroCarouselProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = (carouselSlides && carouselSlides.length ? carouselSlides : defaultSlides) as HeroSlide[];
  const notice = instituteNotice ?? defaultNotice;
  const slide = slides[slideIndex % slides.length];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      className="relative h-[80vh] min-h-[560px] overflow-hidden bg-white text-[#011e2c]"
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

      <div className="relative mx-auto flex h-full min-h-[560px] w-full max-w-7xl flex-col justify-between px-6 py-20 sm:px-12 lg:px-20">
        <div className="w-full pt-4 sm:pt-6">
          <div className="mx-auto w-full max-w-5xl rounded-[24px] border border-[#04415f]/10 bg-white/90 px-3 py-3 shadow-sm backdrop-blur-sm sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5">
              <div className="flex w-full items-center justify-center gap-3 sm:w-auto sm:gap-5">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center sm:h-24 sm:w-24">
                  <Image
                    src="/images/foundation-logo.png"
                    alt="Dr. Vithalrao Vikhe Patil Foundation"
                    width={200}
                    height={151}
                    className="h-12 w-auto sm:h-20"
                  />
                </div>

                <div className="min-w-0 text-center text-[#04415f]">
                  <p className="font-display text-base font-bold leading-tight sm:text-3xl 2xl:text-4xl">
                    Dr. Vithalrao Vikhe Patil Foundation&apos;s
                  </p>
                  <p className="font-display text-base font-bold leading-tight sm:text-3xl 2xl:text-4xl">
                    Paramedical Institute
                  </p>
                </div>

                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center sm:h-24 sm:w-24">
                  <Image
                    src="/images/paramedical-institute-logo.png"
                    alt="Paramedical Institute"
                    width={150}
                    height={150}
                    className="h-12 w-auto sm:h-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mb-14 mt-4 w-full sm:mb-16 lg:mb-20">
          <div className="mx-auto flex max-w-[760px] flex-col gap-2 text-left text-[10px] font-medium tracking-[0.01em] text-[#04415f]/80 sm:text-sm 2xl:text-base">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
              <div className="min-w-0 flex-1 rounded-2xl border border-[#04415f]/10 bg-[#f8fbfd] p-3">
                <p className="font-semibold text-[#04415f]">{notice.unit1Title}</p>
                <p className="mt-1 leading-relaxed">{notice.unit1Text}</p>
              </div>
              <div className="min-w-0 flex-1 rounded-2xl border border-[#04415f]/10 bg-[#fffdf7] p-3">
                <p className="font-semibold text-[#04415f]">{notice.unit2Title}</p>
                <p className="mt-1 leading-relaxed">{notice.unit2Text}</p>
                <p className="mt-1 leading-relaxed">{notice.unit2Extra}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#04415f]/10 bg-[#f6fcf7] p-3 text-[#04415f]">
              <p className="leading-relaxed">{notice.admissionLine}</p>
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
