import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | VIMSMCH Paramedical Institute",
  description: "Frequently asked questions about admission, fees, and eligibility for VIMSMCH Paramedical Institute's certificate courses.",
};

const faqs = [
  {
    q: "Is the course recognized for government jobs?",
    a: "No.",
  },
  {
    q: "Can I pay the fees in installments?",
    a: "This is being finalised — please contact the admissions office for the latest update.",
  },
  {
    q: "What happens if I fail the medical fitness test?",
    a: "This is being finalised — please contact the admissions office for the latest update.",
  },
  {
    q: "Are there any age limits for admission?",
    a: "This is being finalised — please contact the admissions office for the latest update.",
  },
];

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div className="bg-[#e6edf0] border-b border-[#cdd8de] py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-[#010608]/50 mb-2">Home / FAQ</p>
            <h1 className="text-3xl font-bold text-[#011e2c] mb-1">Frequently Asked Questions</h1>
            <div className="w-14 h-0.5 bg-[#2086b8] mt-3" />
          </div>
        </div>

        <section className="bg-white py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-2">
                  <HelpCircle size={18} className="text-[#04415f] mt-0.5 shrink-0" />
                  <h3 className="text-[#011e2c] font-bold text-base leading-snug">{f.q}</h3>
                </div>
                <p className="text-[#010608]/65 text-sm leading-relaxed pl-[30px]">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
