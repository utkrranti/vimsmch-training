import { getSettings } from "@/lib/db/settings";
import { MapPin, Phone, Mail, Globe, Clock, MessageCircle, PhoneCall } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default async function ContactDetails() {
  const s = await getSettings(["contact.whatsapp", "contact.admissionHelpline"]);
  const whatsapp = s["contact.whatsapp"];
  const admissionHelpline = s["contact.admissionHelpline"];

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
    <section id="contact" className="bg-white py-16 sm:py-20 px-4 sm:px-6 border-t border-[#e6edf0]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="eyebrow mb-4">Get In Touch</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#011e2c] mb-3 tracking-tight">Contact Details</h2>
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
                title="VIMSMCH Location"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
