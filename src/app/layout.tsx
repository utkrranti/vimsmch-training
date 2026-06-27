import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VIMSMCH Vocational Training | training.vimsmch.edu.in",
  description:
    "UGC recognised vocational training programmes at VIMSMCH. NSQF-aligned skill development courses in healthcare, computer applications, and allied sciences.",
  keywords: "VIMSMCH, vocational training, UGC, NSQF, skill development, medical courses",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={workSans.variable}>
      <body className="min-h-screen bg-[#f1f5f7] text-[#010608] flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
