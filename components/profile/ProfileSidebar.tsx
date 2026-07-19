"use client"

import { User, Lock, LogOut } from "lucide-react"
import { DM_Sans } from "next/font/google"
import { cn } from "@/lib/utils"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
})

export type ProfileTab = "info" | "security"

type ProfileSidebarProps = {
  activeTab: ProfileTab
  onTabChange: (tab: ProfileTab) => void
  onLogout: () => void
  userName: string
  userEmail: string
}

export default function ProfileSidebar({
  activeTab,
  onTabChange,
  onLogout,
  userName,
  userEmail,
}: ProfileSidebarProps) {
  const navItems: { id: ProfileTab; label: string; icon: typeof User }[] = [
    { id: "info", label: "Profile Information", icon: User },
    { id: "security", label: "Security", icon: Lock },
  ]

  return (
    <div className="w-full lg:w-[280px] shrink-0 rounded-[24px] border-[0.8px] border-white/6 bg-[#0C1120] p-6 flex flex-col gap-6 h-fit">
      {/* User identity block */}
      <div className="flex flex-col items-center text-center gap-3 pb-6 border-b-[0.8px] border-white/6">
        <div className="w-16 h-16 rounded-full bg-[#14B8A6]/10 border-[0.8px] border-[#14B8A6]/30 flex items-center justify-center">
          <span className={cn(dmSans.className, "text-[#14B8A6] text-[22px] font-[700]")}>
            {userName ? userName.charAt(0).toUpperCase() : "?"}
          </span>
        </div>
        <div>
          <p className={cn(dmSans.className, "text-white text-[15px] font-[700] truncate max-w-[200px]")}>
            {userName || "—"}
          </p>
          <p className={cn(dmSans.className, "text-white/45 text-[12px] font-[400] truncate max-w-[200px]")}>
            {userEmail || "—"}
          </p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-[6px]">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className={cn(
              dmSans.className,
              "flex items-center gap-3 h-[42px] px-4 rounded-[12px] text-[14px] font-[500] transition-all duration-200 cursor-pointer text-left",
              activeTab === id
                ? "bg-[rgba(20,184,166,0.08)] border-[0.8px] border-[#14B8A6]/40 text-[#14B8A6] shadow-[0_0_16px_rgba(20,184,166,0.10)]"
                : "border-[0.8px] border-transparent text-white/60 hover:text-white hover:bg-white/[0.03]"
            )}
          >
            <Icon className="w-[18px] h-[18px] shrink-0" />
            {label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        type="button"
        onClick={onLogout}
        className={cn(
          dmSans.className,
          "flex items-center gap-3 h-[42px] px-4 rounded-[12px] text-[14px] font-[500] text-white/50 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-200 cursor-pointer mt-auto"
        )}
      >
        <LogOut className="w-[18px] h-[18px] shrink-0" />
        Log Out
      </button>
    </div>
  )
}