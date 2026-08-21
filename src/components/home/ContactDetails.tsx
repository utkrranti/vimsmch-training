import { getSettings } from "@/lib/db/settings";
import { getTranslations } from "next-intl/server";
import { MapPin, Mail, Globe, Clock, MessageCircle, PhoneCall, Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default async function ContactDetails() {
  const [s, t, tFooter] = await Promise.all([
    getSettings(["contact.whatsapp", "contact.admissionHelpline", "contact.footerEmail"]),
    getTranslations("contactDetails"),
    getTranslations("footer"),
  ]);
  const whatsapp = s["contact.whatsapp"];
  const admissionHelpline = s["contact.admissionHelpline"];
  const footerEmail = s["contact.footerEmail"] || "paramedical.vimsmch@gmail.com";

  const contactDetails = [
    {
      icon: MapPin,
      label: t("addressLabel"),
      value: tFooter("address"),
    },
    {
      icon: Phone,
      label: t("phoneLabel"),
      value: "+91 8956263701",
      href: "tel:+918956263701",
    },
    ...(admissionHelpline
      ? [
          {
            icon: PhoneCall,
            label: t("admissionHelplineLabel"),
            value: admissionHelpline,
            href: `tel:${admissionHelpline.replace(/[^+\d]/g, "")}`,
          },
        ]
      : []),
    ...(whatsapp
      ? [
          {
            icon: MessageCircle,
            label: t("whatsappLabel"),
            value: whatsapp,
            href: `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`,
          },
        ]
      : []),
    {
      icon: Mail,
      label: t("emailLabel"),
      value: footerEmail,
      href: `mailto:${footerEmail}`,
    },
    {
      icon: Globe,
      label: t("websiteLabel"),
      value: "vimsmch.edu.in",
      href: "https://vimsmch.edu.in",
    },
    {
      icon: Clock,
      label: t("officeHoursLabel"),
      value: t("officeHoursValue"),
    },
  ];

  return (
    <section id="contact" className="bg-white py-16 sm:py-20 px-4 sm:px-6 border-t border-[#e6edf0]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="eyebrow mb-4">{t("eyebrow")}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#011e2c] mb-3 tracking-tight">{t("heading")}</h2>
            <div className="w-16 h-1 bg-[#2086b8] mx-auto rounded" />
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal delay={0.06}>
            <div className="grid sm:grid-cols-2 gap-4">
              {contactDetails.map((d) => (
                <div key={d.label} className="flex items-start gap-4 bg-[#f1f5f7] rounded-xl p-4 border border-[#e6edf0]">
                  <div className="w-9 h-9 bg-[#04415f]/8 rounded-lg flex items-center justify-center shrink-0">
                    <d.icon size={16} className="text-[#04415f]" />
                  </div>
                  <div className="min-w-0">
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
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-2xl overflow-hidden border border-[#e6edf0] shadow-sm h-full min-h-[220px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.5!2d74.7386!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc5f3bbbbbbbb%3A0x0!2sDr.%20Vithalrao%20Vikhe%20Patil%20Medical%20College!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 220 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("mapTitle")}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
