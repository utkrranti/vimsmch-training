import type { ReactNode } from "react";

type InstituteNotice = {
  unit1Title: string;
  unit1Text: string;
  unit2Title: string;
  unit2Text: string;
  unit2Extra: string;
  admissionLine: string;
};

type HeroCarouselProps = {
  instituteNotice?: InstituteNotice;
  children?: ReactNode;
};

const defaultNotice: InstituteNotice = {
  unit1Title: "1. Skill Development Institute",
  unit1Text: "Affiliated to Maharashtra State Board of Skill, Vocational Education and Training",
  unit2Title: "2. Vocational Training Centre",
  unit2Text: "Accredited by National Council of Vocational and Research Training, New Delhi",
  unit2Extra: "(Accreditation No - NCVRT/MH/35074/VTC)",
  admissionLine: "Admission is open for Vocational Training Centre for the Academic Year 2026-27",
};

export default function HeroCarousel({ instituteNotice, children }: HeroCarouselProps) {
  const notice = instituteNotice ?? defaultNotice;

  return (
    <section className="relative overflow-hidden bg-white text-[#011e2c]" aria-label="Paramedical Institute highlights">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(32,134,184,0.12),_transparent_70%)]" />

      <div className="relative mx-auto flex min-h-[420px] w-full max-w-7xl flex-col justify-between px-6 py-8 sm:px-12 sm:py-10 lg:px-20 lg:py-12">
        <div className="w-full pt-2 sm:pt-4">
          <div className="mx-auto w-full max-w-5xl rounded-[24px] border border-[#04415f]/10 bg-white/90 px-3 py-3 shadow-sm backdrop-blur-sm sm:px-6 lg:px-8">
            <div className="text-center text-[#04415f]">
              <p className="font-display text-base font-bold leading-tight sm:text-3xl 2xl:text-4xl">
                Dr. Vithalrao Vikhe Patil Foundation&apos;s
              </p>
              <p className="font-display text-base font-bold leading-tight sm:text-3xl 2xl:text-4xl">
                Paramedical Institute
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-4 w-full">
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

        {children}
      </div>
    </section>
  );
}
