"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { DM_Sans } from "next/font/google"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateProfile } from "@/lib/api"
import { passwordSchema } from "@/lib/validation"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-dm-sans",
})

const focusRingClasses =
  "focus:border-[#14B8A6]/50 focus:ring-1 focus:ring-[#14B8A6]/25 focus:shadow-[0_0_0_1px_rgba(20,184,166,0.25),0_0_18px_rgba(20,184,166,0.08)] focus-visible:border-[#14B8A6]/50 focus-visible:ring-[#14B8A6]/25 focus-visible:shadow-[0_0_0_1px_rgba(20,184,166,0.25),0_0_18px_rgba(20,184,166,0.08)] focus-visible:outline-none"

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/

type PasswordValues = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export default function SecurityForm() {
  const [values, setValues] = useState<PasswordValues>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsed = passwordSchema.safeParse(values)
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Please check your password form"
      toast.error(message)
      return
    }

    try {
      setIsSubmitting(true)
      await updateProfile({
        currentPassword: parsed.data.currentPassword,
        newPassword: parsed.data.newPassword,
        confirmNewPassword: parsed.data.confirmNewPassword,
      })
      toast.success("Password updated successfully")
      setValues({ currentPassword: "", newPassword: "", confirmNewPassword: "" })
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : "Failed to update password")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[16px] w-full">
      <div className="rounded-[20px] border-[0.8px] border-white/6 bg-[#0C1120] p-6">
        <h3 className={cn(dmSans.className, "text-white text-[16px] font-[800] mb-4")}>
          Change Password
        </h3>

        <div className="flex flex-col gap-[14px]">
          <div className="flex flex-col gap-[4px] w-full">
            <Label htmlFor="currentPassword" className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
              Current Password
            </Label>
            <div className="relative w-full">
              <Input
                id="currentPassword"
                type={showCurrent ? "text" : "password"}
                placeholder="••••••••"
                value={values.currentPassword}
                onChange={onChange}
                className={cn(
                  "h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] pl-4 pr-10 py-3 placeholder-[#334155] text-white text-[14px] font-[400]",
                  focusRingClasses
                )}
              />
              <button
                type="button"
                onClick={() => setShowCurrent((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] w-full">
            <div className="flex flex-col gap-[4px]">
              <Label htmlFor="newPassword" className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  placeholder="••••••••"
                  value={values.newPassword}
                  onChange={onChange}
                  className={cn(
                    "h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 pr-10 py-3 placeholder-[#334155] text-white text-[14px] font-[400]",
                    focusRingClasses
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowNew((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <Label htmlFor="confirmNewPassword" className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmNewPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={values.confirmNewPassword}
                  onChange={onChange}
                  className={cn(
                    "h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 pr-10 py-3 placeholder-[#334155] text-white text-[14px] font-[400]",
                    focusRingClasses
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          dmSans.className,
          "w-full md:w-fit md:self-end h-[44px] px-8 rounded-[12px] bg-[#14B8A6] text-[#060910] hover:bg-[#14B8A6]/90 font-[900] text-[14px] uppercase tracking-wider shadow-[0_0_22px_rgba(20,184,166,0.25)] border-none transition-all duration-200 cursor-pointer disabled:opacity-50"
        )}
      >
        {isSubmitting ? "Updating..." : "Update Password"}
      </Button>
    </form>
  )
}