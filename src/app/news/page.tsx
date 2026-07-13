import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getActiveAnnouncements } from "@/lib/db/announcements";
import { Megaphone } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News & Notices | VIMSMCH Paramedical Institute",
  description: "Latest announcements and notices from VIMSMCH Paramedical Institute.",
};

export default async function NewsPage() {
  const announcements = await getActiveAnnouncements();

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div className="bg-[#e6edf0] border-b border-[#cdd8de] py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs text-[#010608]/50 mb-2">Home / News &amp; Notices</p>
            <h1 className="text-3xl font-bold text-[#011e2c] mb-1">News &amp; Notices</h1>
            <div className="w-14 h-0.5 bg-[#2086b8] mt-3" />
          </div>
        </div>

        <section className="bg-white py-14 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            {announcements.length === 0 ? (
              <div className="text-center py-20 bg-[#f1f5f7] rounded-2xl border border-[#e6edf0]">
                <Megaphone size={40} className="text-[#010608]/20 mx-auto mb-3" />
                <p className="text-[#010608]/40 font-medium">No notices published yet. Check back soon.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {announcements.map((a) => (
                  <div key={a.id} className="bg-[#f1f5f7] border border-[#e6edf0] rounded-2xl p-6">
                    <div className="flex items-start gap-3 mb-2">
                      <Megaphone size={18} className="text-[#04415f] mt-0.5 shrink-0" />
                      <div>
                        <h3 className="text-[#011e2c] font-bold text-base leading-snug">{a.title}</h3>
                        <p className="text-[#010608]/40 text-xs mt-0.5">
                          {new Date(a.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#010608]/65 text-sm leading-relaxed pl-[30px] whitespace-pre-wrap">{a.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
