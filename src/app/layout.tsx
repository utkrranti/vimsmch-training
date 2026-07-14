import type { Metadata } from "next";
import { Work_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "VIMSMCH Paramedical Institute | paramedical.vimsmch.edu.in",
  description:
    "One-year certificate courses in paramedical skills at Dr. Vithalrao Vikhe Patil Foundation's Paramedical Institute — hands-on hospital training in Ahilyanagar.",
  keywords: "VIMSMCH, vocational training, paramedical courses, skill development, certificate courses, Ahilyanagar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${workSans.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-[#f1f5f7] text-[#010608] flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
