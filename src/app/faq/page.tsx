import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getActiveFaqItems } from "@/lib/db/faq";
import { HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FAQ | VIMSMCH Paramedical Institute",
  description: "Frequently asked questions about admission, fees, and eligibility for VIMSMCH Paramedical Institute's certificate courses.",
};

export default async function FaqPage() {
  const faqs = await getActiveFaqItems();

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div
          className="relative text-white py-16 px-4 sm:px-6 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1a5578 0%, #2589b8 100%)" }}
        >
          <div className="pointer-events-none absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#2086b8]/20 blur-[90px]" />
          <div className="absolute inset-0 bg-dot-grid opacity-[0.05] text-white" />
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs text-white/50 mb-3">Home / FAQ</p>
            <span className="eyebrow eyebrow-light mb-4">Got Questions?</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-brand">Frequently Asked Questions</h1>
          </div>
        </div>

        <section className="bg-white py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.length === 0 ? (
              <div className="text-center py-16 bg-[#f1f5f7] rounded-2xl border border-[#e6edf0]">
                <HelpCircle size={32} className="text-[#010608]/20 mx-auto mb-3" />
                <p className="text-[#010608]/40 font-medium text-sm">Questions will be published shortly.</p>
              </div>
            ) : (
              faqs.map((f) => (
                <div key={f.id} className="bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-6">
                  <div className="flex items-start gap-3 mb-2">
                    <HelpCircle size={18} className="text-[#04415f] mt-0.5 shrink-0" />
                    <h3 className="text-[#011e2c] font-bold text-base leading-snug">{f.question}</h3>
                  </div>
                  <p className="text-[#010608]/65 text-sm leading-relaxed pl-[30px]">
                    {f.answer || "This is being finalised — please contact the admissions office for the latest update."}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
