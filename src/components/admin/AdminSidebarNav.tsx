"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  LayoutDashboard, BookOpen, MessageSquare, ClipboardList,
  Users, Award, UserCog, Settings, CalendarRange, Images, Megaphone, Briefcase,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/enrollments", label: "Enrollments", icon: ClipboardList },
  { href: "/admin/batches", label: "Batches", icon: CalendarRange },
  { href: "/admin/faculty", label: "Faculty", icon: Users },
  { href: "/admin/certificates", label: "Certificates", icon: Award },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/placements", label: "Placements", icon: Briefcase },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/users", label: "Admin Users", icon: UserCog },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-0.5">
      <p className="text-white/25 text-[9px] uppercase tracking-[0.18em] font-semibold px-3 mb-3">Navigation</p>
      {navItems.map((item, i) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3, ease: "easeOut" }}
          >
            <Link
              href={item.href}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? "text-white bg-white/15 shadow-sm"
                  : "text-white/55 hover:text-white/90 hover:bg-white/8"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-xl bg-white/12 border border-white/15"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <item.icon
                size={16}
                className={`relative shrink-0 transition-colors ${active ? "text-[#7dd3fc]" : "text-white/40 group-hover:text-white/70"}`}
              />
              <span className="relative">{item.label}</span>
              {active && (
                <span className="relative ml-auto w-1.5 h-1.5 rounded-full bg-[#7dd3fc]" />
              )}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
}
