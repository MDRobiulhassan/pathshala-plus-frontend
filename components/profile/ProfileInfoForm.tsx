"use client"

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { DM_Sans } from "next/font/google"
import { useQueryClient } from "@tanstack/react-query"
import { AUTH_SESSION_QUERY_KEY } from "@/hooks/useAuthSession"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  getEducationLevels,
  getLanguages,
  updateProfile,
  googleAuth,
  EducationLevel,
  EducationLevelVariant,
  Language,
  UserProfileResponse,
} from "@/lib/api"
import { toast } from "sonner"
import { profileInfoSchema } from "@/lib/validation"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-dm-sans",
})

const focusRingClasses =
  "focus:border-[#14B8A6]/50 focus:ring-1 focus:ring-[#14B8A6]/25 focus:shadow-[0_0_0_1px_rgba(20,184,166,0.25),0_0_18px_rgba(20,184,166,0.08)] focus-visible:border-[#14B8A6]/50 focus-visible:ring-[#14B8A6]/25 focus-visible:shadow-[0_0_0_1px_rgba(20,184,166,0.25),0_0_18px_rgba(20,184,166,0.08)] focus-visible:outline-none"

type ProfileInfoFormProps = {
  profile: UserProfileResponse
  onUpdated: (updated: UserProfileResponse) => void
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[20px] border-[0.8px] border-white/6 bg-[#0C1120] p-6">
      <h3 className={cn(dmSans.className, "text-white text-[16px] font-[800] mb-4")}>{title}</h3>
      {children}
    </div>
  )
}

export default function ProfileInfoForm({ profile, onUpdated }: ProfileInfoFormProps) {
  const queryClient = useQueryClient()
  const [name, setName] = useState(profile.name ?? "")
  const [phone, setPhone] = useState(profile.phone ?? "")

  const [languages, setLanguages] = useState<Language[]>([])
  const [educationLevels, setEducationLevels] = useState<EducationLevel[]>([])
  const [departmentOptions, setDepartmentOptions] = useState<EducationLevelVariant[]>([])

  const [preferredLanguageCode, setPreferredLanguageCode] = useState("")
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(profile.educationLevel ?? "")
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingOptions, setIsLoadingOptions] = useState(true)

  const [themePreference, setThemePreference] = useState<"dark" | "light">("dark")

  const applyTheme = (theme: "dark" | "light") => {
    setThemePreference(theme)
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)
      if (theme === "light") {
        document.documentElement.classList.add("light")
        document.documentElement.classList.remove("dark")
      } else {
        document.documentElement.classList.add("dark")
        document.documentElement.classList.remove("light")
      }
    }
  }

  const handleLanguageChange = (value: string) => {
    setPreferredLanguageCode(value)
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLanguage", value)
      document.documentElement.lang = value
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemePreference(savedTheme)
        if (savedTheme === "light") {
          document.documentElement.classList.add("light")
          document.documentElement.classList.remove("dark")
        } else {
          document.documentElement.classList.add("dark")
          document.documentElement.classList.remove("light")
        }
      }
    }
  }, [])

  const roleLabel = profile.roles?.[0]
    ? profile.roles[0]
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "—"

  useEffect(() => {
    async function loadData() {
      try {
        const [levels, langs] = await Promise.all([getEducationLevels(), getLanguages()])
        setEducationLevels(levels)
        setLanguages(langs)

        const currentLang = langs.find(
          (l) =>
            l.code.toLowerCase() === profile.preferredLanguage?.toLowerCase() ||
            l.name.toLowerCase() === profile.preferredLanguage?.toLowerCase()
        )
        if (currentLang) {
          setPreferredLanguageCode(currentLang.code)
        } else if (profile.preferredLanguage) {
          setPreferredLanguageCode(profile.preferredLanguage)
        } else if (typeof window !== "undefined") {
          const savedLang = localStorage.getItem("preferredLanguage")
          if (savedLang) setPreferredLanguageCode(savedLang)
        }

        const currentLevel = levels.find((lvl) => lvl.name === profile.educationLevel)
        if (currentLevel) {
          setDepartmentOptions(currentLevel.variants)
          const currentVariant = currentLevel.variants.find(
            (v) => v.department?.toLowerCase() === profile.department?.toLowerCase()
          )
          if (currentVariant) setSelectedDepartmentId(currentVariant.id.toString())
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingOptions(false)
      }
    }
    loadData()
  }, [profile.department, profile.educationLevel, profile.preferredLanguage])

  useEffect(() => {
    if (languages.length > 0 && profile.preferredLanguage) {
      const currentLang = languages.find(
        (l) =>
          l.code.toLowerCase() === profile.preferredLanguage?.toLowerCase() ||
          l.name.toLowerCase() === profile.preferredLanguage?.toLowerCase()
      )
      if (currentLang) {
        setPreferredLanguageCode(currentLang.code)
      } else {
        setPreferredLanguageCode(profile.preferredLanguage)
      }
    }
  }, [profile.preferredLanguage, languages])

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    if (id === "name") setName(value)
    if (id === "phone") setPhone(value)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsed = profileInfoSchema.safeParse({ name, phone })
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Please check your form"
      toast.error(message)
      return
    }

    if (selectedEducationLevel && departmentOptions.length > 0 && !selectedDepartmentId) {
      toast.error("Please select a group/department")
      return
    }

    try {
      setIsSubmitting(true)
      const updated = await updateProfile({
        name: parsed.data.name,
        phone: parsed.data.phone || undefined,
        preferredLanguageCode: preferredLanguageCode || undefined,
        educationLevelId: selectedDepartmentId ? Number(selectedDepartmentId) : undefined,
      })
      onUpdated(updated)
      if (typeof window !== "undefined" && preferredLanguageCode) {
        localStorage.setItem("preferredLanguage", preferredLanguageCode)
        document.documentElement.lang = preferredLanguageCode
      }
      queryClient.setQueryData(AUTH_SESSION_QUERY_KEY, updated)
      queryClient.invalidateQueries({ queryKey: AUTH_SESSION_QUERY_KEY })
      toast.success("Profile updated successfully")
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : "Failed to update profile")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[16px] w-full">
      <SectionCard title="Personal Details">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
    <div className="flex flex-col gap-[4px]">
      <Label htmlFor="name" className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
        Full Name
      </Label>
      <Input
        id="name"
        type="text"
        placeholder="John Doe"
        required
        value={name}
        onChange={onTextChange}
        className={cn(
          "h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 py-3 placeholder-[#334155] text-white text-[14px] font-[400] focus:outline-none transition-all duration-200",
          focusRingClasses
        )}
      />
    </div>
    <div className="flex flex-col gap-[4px]">
      <Label className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
        Role
      </Label>
      <div className="h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.015] px-4 py-3 text-white/40 text-[14px] font-[400] flex items-center cursor-not-allowed">
        {roleLabel}
      </div>
    </div>
    <div className="flex flex-col gap-[4px]">
      <Label className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
        Email
      </Label>
      <Input
        type="email"
        value={profile.email}
        disabled
        title={profile.email}
        className="h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.015] px-4 py-3 text-white/40 text-[14px] font-[400] cursor-not-allowed truncate"
      />
    </div>
    <div className="flex flex-col gap-[4px]">
      <Label htmlFor="phone" className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
        Phone
      </Label>
      <Input
        id="phone"
        type="tel"
        placeholder="+880 1XXXXXXXXX"
        value={phone}
        onChange={onTextChange}
        className={cn(
          "h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 py-3 placeholder-[#334155] text-white text-[14px] font-[400]",
          focusRingClasses
        )}
      />
    </div>
  </div>
</SectionCard>

      <SectionCard title="Academics">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <Label className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
              Education Level
            </Label>
            <Select
              value={selectedEducationLevel}
              onValueChange={(value) => {
                setSelectedEducationLevel(value)
                setSelectedDepartmentId("")
                const level = educationLevels.find((lvl) => lvl.name === value)
                setDepartmentOptions(level ? level.variants : [])
              }}
            >
              <SelectTrigger
                className={cn(
                  "h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 py-3 text-white text-[14px] font-[400] transition-all duration-200 cursor-pointer",
                  focusRingClasses
                )}
              >
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent className="bg-[#0C1120] border-white/10 text-white">
                {educationLevels.map((level) => (
                  <SelectItem
                    key={level.name}
                    value={level.name}
                    className="focus:bg-white/10 focus:text-white cursor-pointer"
                  >
                    {level.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {departmentOptions.length > 0 && (
            <div className="flex flex-col gap-[4px]">
              <Label className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
                Group
              </Label>
              <Select value={selectedDepartmentId} onValueChange={setSelectedDepartmentId}>
                <SelectTrigger
                  className={cn(
                    "h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 py-3 text-white text-[14px] font-[400] transition-all duration-200 cursor-pointer",
                    focusRingClasses
                  )}
                >
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent className="bg-[#0C1120] border-white/10 text-white">
                  {departmentOptions.map((variant) => (
                    <SelectItem
                      key={variant.id}
                      value={variant.id.toString()}
                      className="focus:bg-white/10 focus:text-white cursor-pointer"
                    >
                      {variant.department ?? "General"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Preferences">
  <div className="flex flex-col gap-[24px]">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
      <div className="flex flex-col gap-[4px]">
        <Label className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
          Language
        </Label>
        <Select value={preferredLanguageCode} onValueChange={handleLanguageChange}>
          <SelectTrigger
            className={cn(
              "h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 py-3 text-white text-[14px] font-[400] transition-all duration-200 cursor-pointer",
              focusRingClasses
            )}
          >
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="bg-[#0C1120] border-white/10 text-white">
            {languages.map((language) => (
              <SelectItem
                key={language.id}
                value={language.code}
                className="focus:bg-white/10 focus:text-white cursor-pointer"
              >
                {language.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-[4px]">
        <Label className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
          Theme
        </Label>
        <div className="h-[43px] flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={themePreference === "dark"}
              onChange={() => applyTheme("dark")}
              className="h-4 w-4 accent-[#14B8A6] cursor-pointer"
            />
            <span className={cn(dmSans.className, "text-[14px] text-white")}>Dark</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="theme"
              value="light"
              checked={themePreference === "light"}
              onChange={() => applyTheme("light")}
              className="h-4 w-4 accent-[#14B8A6] cursor-pointer"
            />
            <span className={cn(dmSans.className, "text-[14px] text-white")}>Light</span>
          </label>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-[8px]">
      <Label className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
        Connect Your Social Account
      </Label>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={googleAuth}
          className="h-[43px] flex items-center gap-2 rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 text-white text-[14px] font-[400] hover:bg-white/[0.05] transition-colors cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.5 0-14 4.2-17.7 10.7z"/>
            <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.6C29.6 34.9 26.9 36 24 36c-5.3 0-9.7-3.1-11.3-7.9l-6.6 5.1C9.9 39.7 16.4 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6.6 5.6C41.4 36 44 30.6 44 24c0-1.3-.1-2.7-.4-3.5z"/>
          </svg>
          {(profile.providers ?? []).includes("GOOGLE") ? "Google Connected" : "Connect Google"}
        </button>

        <button
          type="button"
          disabled
          title="Facebook login coming soon"
          className="h-[43px] flex items-center gap-2 rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 text-white/40 text-[14px] font-[400] cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
            <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.83c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z"/>
          </svg>
          Connect Facebook
        </button>
      </div>
    </div>
  </div>
</SectionCard>

      <Button
        type="submit"
        disabled={isSubmitting || isLoadingOptions}
        className={cn(
          dmSans.className,
          "w-full md:w-fit md:self-end h-[44px] px-8 rounded-[12px] bg-[#14B8A6] text-[#060910] hover:bg-[#14B8A6]/90 font-[900] text-[14px] uppercase tracking-wider shadow-[0_0_22px_rgba(20,184,166,0.25)] border-none transition-all duration-200 cursor-pointer disabled:opacity-50"
        )}
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}