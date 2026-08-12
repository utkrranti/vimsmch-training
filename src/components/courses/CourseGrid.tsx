"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Users, IndianRupee, ArrowRight, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { CourseRow as Course } from "@/lib/db/courses";
import { getCourseImage } from "@/lib/course-images";
import { pickLocale, pickLocaleArray, type AppLocale } from "@/lib/i18n/pickLocale";

type Filter = "all" | "short-term" | "long-term";

export default function CourseGrid({ courses }: { courses: Course[] }) {
  const t = useTranslations("courseGrid");
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchCat = filter === "all" || c.category === filter;
      const matchQ =
        query.trim() === "" ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchCat && matchQ;
    });
  }, [courses, filter, query]);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#010608]/30" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white border border-[#cdd8de] text-[#010608] placeholder-[#010608]/30 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#04415f] focus:ring-2 focus:ring-[#04415f]/10 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "short-term", "long-term"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                filter === f
                  ? "bg-[#04415f] text-white shadow-sm"
                  : "bg-white border border-[#cdd8de] text-[#04415f] hover:border-[#04415f]"
              }`}
            >
              {f === "all" ? t("filterAll") : f === "short-term" ? t("filterShortTerm") : t("filterLongTerm")}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-[#010608]/40 text-sm mb-6">
        {t("showingCount", { shown: filtered.length, total: courses.length })}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#010608]/40 bg-white rounded-2xl border border-[#cdd8de]">
          <p className="text-lg font-semibold mb-2">{t("noCoursesFound")}</p>
          <p className="text-sm">{t("noCoursesHint")}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
          {filtered.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function CourseCard({ course: c }: { course: Course }) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("courseGrid");
  const title = pickLocale(locale, c.title, c.titleMr);
  const shortDesc = pickLocale(locale, c.shortDesc, c.shortDescMr);
  const eligibility = pickLocale(locale, c.eligibility, c.eligibilityMr);
  const certBy = pickLocale(locale, c.certBy, c.certByMr);
  const tags = pickLocaleArray(locale, c.tags, c.tagsMr);

  return (
    <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(4,65,95,0.1)] transition-all duration-300 group border border-[#e6edf0]">
      {/* Photo */}
      <div className="relative h-36 w-full">
        <Image src={c.imageUrl || getCourseImage(c.slug)} alt={title} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
      </div>

      {/* Header */}
      <div className="px-6 py-5 border-b border-[#e6edf0] flex items-start justify-between gap-3">
        <h3 className="text-[#011e2c] font-semibold text-sm leading-snug group-hover:text-[#04415f] transition-colors">
          {title}
        </h3>
        <span className="shrink-0 bg-[#04415f] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
          {t("oneYearBadge")}
        </span>
      </div>

      <div className="px-6 py-5 flex-1 flex flex-col gap-3">
        <p className="text-[#010608]/55 text-xs leading-relaxed">{shortDesc}</p>

        {/* Key info grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { label: t("durationLabel"), value: t("months", { count: c.durationMonths }), icon: Clock },
            { label: t("seatsLabel"), value: t("seatsPerBatch", { count: c.seats }), icon: Users },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-[#f1f5f7] rounded-lg p-2.5">
              <p className="text-[#010608]/40 mb-0.5">{label}</p>
              <p className="text-[#011e2c] font-medium flex items-center gap-1">
                <Icon size={10} className="text-[#04415f]" />
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Eligibility */}
        <p className="text-xs">
          <span className="text-[#010608]/40">{t("eligibilityLabel")} </span>
          <span className="text-[#010608]/70">{eligibility}</span>
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-[#04415f]/8 border border-[#04415f]/20 text-[#04415f] px-2 py-0.5 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Cert authority */}
        <p className="text-[10px] text-[#010608]/40 border-t border-[#e6edf0] pt-3">
          <span className="text-[#04415f] font-medium">{t("certByLabel")} </span>
          {certBy}
        </p>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <IndianRupee size={13} className="text-[#04415f]" />
            <span className="text-[#011e2c] text-xl font-bold">{c.fees.toLocaleString("en-IN")}</span>
            <span className="text-[#010608]/40 text-xs ml-1">{t("perYear")}</span>
          </div>
          <Link
            href={`/courses/${c.slug}`}
            className="flex items-center gap-1.5 text-[#04415f] hover:text-[#011e2c] text-xs font-semibold transition-colors"
          >
            {t("fullDetails")} <ArrowRight size={12} />
          </Link>
        </div>
        <Link
          href={`/enquire/${c.slug}`}
          className="flex items-center justify-center gap-2 w-full bg-[#04415f] hover:bg-[#011e2c] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          {t("enquireNow")}
        </Link>
      </div>
    </div>
  );
}
