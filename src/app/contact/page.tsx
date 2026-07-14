import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";
import { getSettings } from "@/lib/db/settings";
import { MapPin, Phone, Mail, Globe, Clock, MessageCircle, PhoneCall, FileText } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us | VIMSMCH Paramedical Institute",
  description:
    "Get in touch with VIMSMCH Paramedical Institute — admissions enquiries, course information, and general contact details.",
};

export default async function ContactPage() {
  const s = await getSettings(["contact.whatsapp", "contact.admissionHelpline", "prospectus.pdfUrl"]);
  const whatsapp = s["contact.whatsapp"];
  const admissionHelpline = s["contact.admissionHelpline"];
  const prospectusUrl = s["prospectus.pdfUrl"];
  const prospectusQrSrc = prospectusUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=140x140&margin=0&data=${encodeURIComponent(prospectusUrl)}`
    : null;

  const contactDetails = [
    {
      icon: MapPin,
      label: "Address",
      value: "Opp. Govt. Milk Dairy, Post – M.I.D.C., Vadgaon Gupta, Ahilyanagar – 414 111",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "1800 123 4858 | +91 241-2778042",
      href: "tel:+912412778042",
    },
    ...(admissionHelpline
      ? [
          {
            icon: PhoneCall,
            label: "Admission Helpline",
            value: admissionHelpline,
            href: `tel:${admissionHelpline.replace(/[^+\d]/g, "")}`,
          },
        ]
      : []),
    ...(whatsapp
      ? [
          {
            icon: MessageCircle,
            label: "WhatsApp",
            value: whatsapp,
            href: `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`,
          },
        ]
      : []),
    {
      icon: Mail,
      label: "Email",
      value: "dean@vimsmch.edu.in",
      href: "mailto:dean@vimsmch.edu.in",
    },
    {
      icon: Globe,
      label: "Website",
      value: "vimsmch.edu.in",
      href: "https://vimsmch.edu.in",
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: "Monday – Saturday: 9:00 AM – 5:00 PM",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Breadcrumb */}
        <div
          className="relative text-white py-16 px-4 sm:px-6 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #011e2c 0%, #04415f 100%)" }}
        >
          <div className="pointer-events-none absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#2086b8]/20 blur-[90px]" />
          <div className="absolute inset-0 bg-dot-grid opacity-[0.05] text-white" />
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs text-white/50 mb-3">Home / Contact</p>
            <span className="eyebrow eyebrow-light mb-4">Get In Touch</span>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-brand">Contact Us</h1>
          </div>
        </div>

        <section className="bg-[#f1f5f7] py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

            {/* Left — contact info */}
            <div>
              <span className="inline-block bg-[#04415f]/10 text-[#04415f] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                Get In Touch
              </span>
              <h2 className="text-2xl font-bold text-[#011e2c] mb-2">
                Admissions &amp; Enquiries
              </h2>
              <div className="w-14 h-0.5 bg-[#2086b8] mb-6" />
              <p className="text-[#010608]/60 text-sm leading-relaxed mb-8">
                Have a question about a course, admission process, or fee structure? Our counselling team is available Monday to Saturday. Fill in the form and we will reach out within 1 working day.
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
                  title="VIMSMCH Location"
                />
              </div>

              {/* Prospectus QR */}
              {prospectusQrSrc && (
                <div className="mt-6 flex items-center gap-4 bg-white rounded-xl p-4 border border-[#e6edf0] shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={prospectusQrSrc}
                    alt="Scan to download the prospectus"
                    width={64}
                    height={64}
                    className="rounded-lg border border-[#e6edf0] p-1 shrink-0"
                  />
                  <div>
                    <p className="text-[#010608]/40 text-xs mb-0.5 flex items-center gap-1.5">
                      <FileText size={13} /> Prospectus
                    </p>
                    <p className="text-[#011e2c] text-sm font-medium">Scan the QR code or</p>
                    <a
                      href={prospectusUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="text-[#04415f] text-sm font-semibold hover:text-[#2086b8] transition-colors"
                    >
                      download it directly →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right — form */}
            <div>
              <div className="bg-white rounded-2xl border border-[#e6edf0] shadow-sm p-8">
                <h2 className="text-xl font-bold text-[#011e2c] mb-1">Send an Enquiry</h2>
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
