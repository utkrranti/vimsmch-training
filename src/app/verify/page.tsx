import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CertVerifyForm from "@/components/verify/CertVerifyForm";
import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verify Certificate | VIMSMCH Vocational Training",
  description:
    "Verify the authenticity of a VIMSMCH Vocational Training certificate by entering the certificate number.",
};

export default function VerifyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div className="bg-[#e6edf0] border-b border-[#cdd8de] py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-[#010608]/50 mb-2">Home / Verify Certificate</p>
            <h1 className="text-3xl font-bold text-[#011e2c] mb-1">Verify Certificate</h1>
            <div className="w-14 h-0.5 bg-[#2086b8] mt-3" />
          </div>
        </div>

        <section className="bg-[#f1f5f7] py-20 px-4 sm:px-6">
          <div className="max-w-xl mx-auto">

            {/* Icon header */}
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-[#04415f] rounded-2xl flex items-center justify-center mx-auto mb-5">
                <ShieldCheck size={30} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#011e2c] mb-2">Certificate Verification</h2>
              <div className="w-12 h-0.5 bg-[#2086b8] mx-auto mb-4" />
              <p className="text-[#010608]/55 text-sm leading-relaxed">
                Enter the certificate number printed on your VIMSMCH Vocational Training certificate to verify its authenticity.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-8">
              <CertVerifyForm />
            </div>

            <p className="text-center text-xs text-[#010608]/40 mt-6">
              For issues with verification, contact{" "}
              <a href="mailto:dean@vimsmch.edu.in" className="text-[#04415f] hover:text-[#2086b8] transition-colors">
                dean@vimsmch.edu.in
              </a>
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
