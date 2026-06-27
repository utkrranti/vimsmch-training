"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="flex items-center gap-2 w-full text-white/50 hover:text-white/80 text-xs transition-colors px-2 py-1.5 rounded-lg hover:bg-white/5"
    >
      <LogOut size={13} />
      Sign Out
    </button>
  );
}
