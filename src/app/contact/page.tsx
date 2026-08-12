import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { getSettings } from "@/lib/db/settings";
import { getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail, Globe, Clock, MessageCircle, PhoneCall, FileText } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us | VIMSMCH Paramedical Institute",
  description:
    "Get in touch with VIMSMCH Paramedical Institute — admissions enquiries, course information, and general contact details.",
};

export default async function ContactPage() {
  const [s, t, tc, tf] = await Promise.all([
    getSettings(["contact.whatsapp", "contact.admissionHelpline", "prospectus.pdfUrl"]),
    getTranslations("contactPage"),
    getTranslations("contactDetails"),
    getTranslations("footer"),
  ]);
  const whatsapp = s["contact.whatsapp"];
  const admissionHelpline = s["contact.admissionHelpline"];
  const prospectusUrl = s["prospectus.pdfUrl"];
  const prospectusQrSrc = prospectusUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=140x140&margin=0&data=${encodeURIComponent(prospectusUrl)}`
    : null;

  const contactDetails = [
    {
      icon: MapPin,
      label: tc("addressLabel"),
      value: tf("address"),
    },
    {
      icon: Phone,
      label: tc("phoneLabel"),
      value: "1800 123 4858 | +91 8956263701",
      href: "tel:+918956263701",
    },
    ...(admissionHelpline
      ? [
          {
            icon: PhoneCall,
            label: tc("admissionHelplineLabel"),
            value: admissionHelpline,
            href: `tel:${admissionHelpline.replace(/[^+\d]/g, "")}`,
          },
        ]
      : []),
    ...(whatsapp
      ? [
          {
            icon: MessageCircle,
            label: tc("whatsappLabel"),
            value: whatsapp,
            href: `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`,
          },
        ]
      : []),
    {
      icon: Mail,
      label: tc("emailLabel"),
      value: "dean@vimsmch.edu.in",
      href: "mailto:dean@vimsmch.edu.in",
    },
    {
      icon: Globe,
      label: tc("websiteLabel"),
      value: "vimsmch.edu.in",
      href: "https://vimsmch.edu.in",
    },
    {
      icon: Clock,
      label: tc("officeHoursLabel"),
      value: tc("officeHoursValue"),
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div
          className="relative text-[#011e2c] py-16 px-4 sm:px-6 overflow-hidden"
          style={{ background: "linear-gradient(90deg, #d6ecfa 0%, #a9d8f2 50%, #d6ecfa 100%)" }}
        >
          <div className="pointer-events-none absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#2086b8]/20 blur-[90px]" />
          <div className="absolute inset-0 bg-dot-grid opacity-[0.06] text-[#04415f]" />
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs text-[#04415f]/60 mb-3">{t("breadcrumb")}</p>
            <span className="eyebrow mb-4">{t("eyebrow")}</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#011e2c]">{t("heading")}</h1>
          </div>
        </div>

        <section className="bg-[#f1f5f7] py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

            {/* Left — contact info */}
            <div>
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                {t("sideEyebrow")}
              </span>
              <h2 className="text-2xl font-bold text-[#011e2c] mb-2">
                {t("sideHeading")}
              </h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mb-6" />
              <p className="text-[#010608]/60 text-sm leading-relaxed mb-8">
                {t("intro")}
              </p>

              <div className="space-y-4">
                {contactDetails.map((d) => (
                  <div key={d.label} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-[#e6edf0] shadow-sm">
                    <div className="w-9 h-9 bg-[#04415f]/8 rounded-lg flex items-center justify-center shrink-0">
                      <d.icon size={16} className="text-[#04415f]" />
                    </div>
                    <div>
                      <p className="text-[#010608]/40 text-xs mb-0.5">{d.label}</p>
                      {d.href ? (
                        <a
                          href={d.href}
                          target={d.href.startsWith("http") ? "_blank" : undefined}
                          rel={d.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-[#011e2c] text-sm font-medium hover:text-[#04415f] transition-colors"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <p className="text-[#011e2c] text-sm font-medium">{d.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map embed */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-[#e6edf0] shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.5!2d74.7386!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc5f3bbbbbbbb%3A0x0!2sDr.%20Vithalrao%20Vikhe%20Patil%20Medical%20College!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t("mapTitle")}
                />
              </div>

              {/* Prospectus QR */}
              {prospectusQrSrc && (
                <div className="mt-6 flex items-center gap-4 bg-white rounded-xl p-4 border border-[#e6edf0] shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={prospectusQrSrc}
                    alt={t("prospectusQrAlt")}
                    width={64}
                    height={64}
                    className="rounded-lg border border-[#e6edf0] p-1 shrink-0"
                  />
                  <div>
                    <p className="text-[#010608]/40 text-xs mb-0.5 flex items-center gap-1.5">
                      <FileText size={13} /> {t("prospectusLabel")}
                    </p>
                    <p className="text-[#011e2c] text-sm font-medium">{t("prospectusScan")}</p>
                    <a
                      href={prospectusUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="text-[#04415f] text-sm font-semibold hover:text-[#2086b8] transition-colors"
                    >
                      {t("prospectusDownload")}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right — form */}
            <div>
              <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-8">
                <h2 className="text-xl font-bold text-[#011e2c] mb-1">{t("formHeading")}</h2>
                <div className="w-10 h-0.5 bg-[#2086b8] mb-6" />
                <ContactForm />
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
