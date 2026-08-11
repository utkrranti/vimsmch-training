import Image from "next/image";
import { Sprout, BookOpen, Megaphone } from "lucide-react";

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
};

const defaultNotice: InstituteNotice = {
  unit1Title: "1. Skill Development Institute",
  unit1Text: "Affiliated to Maharashtra State Board of Skill, Vocational Education and Training",
  unit2Title: "2. Vocational Training Centre",
  unit2Text: "Accredited by National Council of Vocational and Research Training, New Delhi",
  unit2Extra: "(Accreditation No - NCVRT/MH/35074/VTC)",
  admissionLine: "Admission is open for Vocational Training Centre for the Academic Year 2026-27",
};

export default function HeroCarousel({ instituteNotice }: HeroCarouselProps) {
  const notice = instituteNotice ?? defaultNotice;

  return (
    <section
      className="relative min-h-[420px] flex-1 overflow-hidden bg-white text-[#011e2c]"
      aria-label="Paramedical Institute highlights"
    >
      <Image
        src="/images/campus-entrance.jpg"
        alt="Dr. Vithalrao Vikhe Patil Foundation's Medical College campus entrance"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-white/55" />

      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-8 px-6 py-10 sm:px-12 sm:py-14 lg:px-20">
        {/* Heading */}
        <div className="text-center">
          <p className="font-display text-xl font-bold leading-tight text-[#04415f] sm:text-3xl">
            Dr. Vithalrao Vikhe Patil Foundation&apos;s
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-[#011e2c] sm:text-5xl lg:text-6xl">
            Paramedical Institute
          </h1>
          <div className="mx-auto mt-4 h-px w-40 bg-gradient-to-r from-transparent via-[#a4802f] to-transparent" />
        </div>

        {/* Tagline pill */}
        <div className="rounded-full bg-[#04415f] px-6 py-2.5 text-center text-xs font-semibold tracking-wide text-white sm:text-sm">
          EMPOWERING HEALTHCARE PROFESSIONALS FOR A BETTER TOMORROW
        </div>

        {/* Notice cards */}
        <div className="w-full max-w-[780px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
            <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-2xl border border-black/5 bg-white/95 p-5 shadow-[0_12px_32px_rgba(4,65,95,0.12)]">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0bb672] to-[#05713f] shadow-md ring-4 ring-[#059652]/10">
                  <Sprout size={22} className="text-white" />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#059652] sm:text-xs">
                    Dr. Vithalrao Vikhe Patil Foundation&apos;s
                  </p>
                  <p className="mt-0.5 text-base font-bold text-[#011e2c] leading-snug sm:text-lg">{notice.unit1Title}</p>
                </div>
              </div>
              <p className="text-left text-sm leading-relaxed text-[#010608]/60 sm:text-base">{notice.unit1Text}</p>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-2xl border border-black/5 bg-white/95 p-5 shadow-[0_12px_32px_rgba(4,65,95,0.12)]">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2fa5d6] to-[#04415f] shadow-md ring-4 ring-[#2086b8]/10">
                  <BookOpen size={22} className="text-white" />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#2086b8] sm:text-xs">
                    Dr. Vithalrao Vikhe Patil Foundation&apos;s
                  </p>
                  <p className="mt-0.5 text-base font-bold text-[#011e2c] leading-snug sm:text-lg">{notice.unit2Title}</p>
                </div>
              </div>
              <p className="text-left text-sm leading-relaxed text-[#010608]/60 sm:text-base">
                {notice.unit2Text}
                <span className="block mt-1 text-[#010608]/45">{notice.unit2Extra}</span>
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3.5 rounded-2xl border border-black/5 bg-white/95 p-4 shadow-[0_12px_32px_rgba(4,65,95,0.1)]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#059652]/10">
              <Megaphone size={18} className="text-[#059652]" />
            </div>
            <p className="flex-1 text-left text-sm font-medium leading-relaxed text-[#04415f] sm:text-center sm:text-base">
              {notice.admissionLine}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
