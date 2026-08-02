"use client"

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { DM_Sans } from "next/font/google"
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
  EducationLevel,
  EducationLevelVariant,
  Language,
  UserProfileResponse,
} from "@/lib/api"

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

  useEffect(() => {
    async function loadData() {
      try {
        const [levels, langs] = await Promise.all([getEducationLevels(), getLanguages()])
        setEducationLevels(levels)
        setLanguages(langs)

        const currentLang = langs.find((l) => l.name === profile.preferredLanguage)
        if (currentLang) setPreferredLanguageCode(currentLang.code)

        const currentLevel = levels.find((lvl) => lvl.name === profile.educationLevel)
        if (currentLevel) {
          setDepartmentOptions(currentLevel.variants)
          const currentVariant = currentLevel.variants.find(
            (v) => v.department === profile.department
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    if (id === "name") setName(value)
    if (id === "phone") setPhone(value)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name || name.trim().length < 2) {
      alert("Name must be at least 2 characters")
      return
    }

    if (selectedEducationLevel && departmentOptions.length > 0 && !selectedDepartmentId) {
      alert("Please select a group/department")
      return
    }

    try {
      setIsSubmitting(true)
      const updated = await updateProfile({
        name,
        phone: phone || undefined,
        preferredLanguageCode: preferredLanguageCode || undefined,
        educationLevelId: selectedDepartmentId ? Number(selectedDepartmentId) : undefined,
      })
      onUpdated(updated)
      alert("Profile updated successfully")
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : "Failed to update profile")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[16px] w-full">
      <SectionCard title="Personal Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            <Label className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
              Email
            </Label>
            <Input
              type="email"
              value={profile.email}
              disabled
              className="h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.015] px-4 py-3 text-white/40 text-[14px] font-[400] cursor-not-allowed"
            />
          </div>
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
        <div className="flex flex-col gap-[4px] max-w-[300px]">
          <Label className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
            Language
          </Label>
          <Select value={preferredLanguageCode} onValueChange={setPreferredLanguageCode}>
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