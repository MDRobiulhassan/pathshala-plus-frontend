"use client"

import { useState, useEffect, type ChangeEvent, type ComponentProps, type FormEvent } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { DM_Sans, Fredoka } from "next/font/google"
import {
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react"
import {
  signupUser,
  getEducationLevels,
  EducationLevelVariant,
  getLanguages,
  EducationLevel,
  Language,
} from "@/lib/api"
import { toast } from "sonner"
import { signupSchema } from "@/lib/validation"
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
import { googleAuth } from "@/lib/api"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
})

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fredoka",
})

type SignupValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
  preferredLanguageCode: string
  educationLevelId: string
  role: "STUDENT" | "TEACHER"
}

export default function SignupForm({
  className,
  ...props
}: ComponentProps<"div">) {
  const router = useRouter()
  const [values, setValues] = useState<SignupValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    preferredLanguageCode: "en",
    educationLevelId: "",
    role: "STUDENT",

  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [educationLevels, setEducationLevels] =
    useState<EducationLevel[]>([])

  const [languages, setLanguages] =
    useState<Language[]>([])

  const [departmentOptions, setDepartmentOptions] =
    useState<EducationLevelVariant[]>([])

  const [selectedDepartmentId, setSelectedDepartmentId] =
    useState("")
  const [selectedEducationLevel, setSelectedEducationLevel] =
    useState("")

  useEffect(() => {
    async function loadData() {
      try {
        const [levels, langs] = await Promise.all([
          getEducationLevels(),
          getLanguages(),
        ])

        setEducationLevels(levels)
        setLanguages(langs)
      } catch (error) {
        console.error(error)
      }
    }

    loadData()
  }, [])


  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsed = signupSchema.safeParse(values)
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Please check your form"
      toast.error(message)
      return
    }

    if (!values.educationLevelId) {
      if (departmentOptions.length > 0) {
        toast.error("Please select a department.")
      } else {
        toast.error("Please select an education level.")
      }
      return
    }

    try {
      setIsSubmitting(true)

      const data = await signupUser({
        ...parsed.data,
        educationLevelId: Number(parsed.data.educationLevelId),
      })

      if (data.role === "TEACHER") {
        router.push("/teacher")
      } else {
        router.push("/student")
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Signup failed")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const focusRingClasses = "focus:border-[#14B8A6]/50 focus:ring-1 focus:ring-[#14B8A6]/25 focus:shadow-[0_0_0_1px_rgba(20,184,166,0.25),0_0_18px_rgba(20,184,166,0.08)] focus-visible:border-[#14B8A6]/50 focus-visible:ring-[#14B8A6]/25 focus-visible:shadow-[0_0_0_1px_rgba(20,184,166,0.25),0_0_18px_rgba(20,184,166,0.08)] focus-visible:outline-none"

  return (
    <div className={cn("relative flex items-center justify-center min-h-screen w-full bg-[#060910] overflow-hidden p-4 md:p-8", className)} {...props}>
      {/* Ambient Glows outside the card */}
      {/* Top left glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#14B8A6]/18 blur-[120px] pointer-events-none" />
      {/* Bottom center glow */}
      <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#14B8A6]/10 blur-[140px] pointer-events-none" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[1024px] h-auto lg:h-[806px] flex flex-col lg:flex-row rounded-[32px] border-[0.8px] border-white/6 bg-[#0C1120] overflow-hidden shadow-2xl">

        {/* LEFT COLUMN: Signup Form */}
        <div className="w-full lg:w-[564px] lg:h-[803.9px] p-6 md:p-10 lg:p-[46px_48px_42px_48px] rounded-[32px] lg:rounded-[32px_0_0_32px] bg-[#0C1120] flex flex-col justify-between">
          <form onSubmit={onSubmit} className="flex flex-col gap-[14px] w-full">

            {/* Header */}
            <div className="flex flex-col text-left">
              <span className={cn(fredoka.className, "text-[#14B8A6] text-[11px] font-[400] tracking-[1.54px] uppercase mb-[4px]")}>
                JOIN PATHSHALA
              </span>
              <h1 className={cn(dmSans.className, "text-[#F8FAFC] text-[37px] font-[800] tracking-[-1px] leading-none mb-[6px]")}>
                Create your account
              </h1>
              <p className={cn(dmSans.className, "text-[14px] font-[400] text-[#F8FAFC]/55")}>
                Start practicing smarter today – it only takes a minute.
              </p>
            </div>

            {/* Form Fields Stack */}
            <div className="flex flex-col gap-[10px] w-full">

              {/* Full Name */}
              <div className="flex flex-col gap-[4px] w-full">
                <Label htmlFor="name" className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={values.name}
                  onChange={onInputChange}
                  className={cn("h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 py-3 placeholder-[#334155] text-white text-[14px] font-[400] focus:outline-none transition-all duration-200", focusRingClasses)}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-[4px] w-full">
                <Label htmlFor="email" className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={values.email}
                  onChange={onInputChange}
                  className={cn("h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 py-3 placeholder-[#334155] text-white text-[14px] font-[400] focus:outline-none transition-all duration-200", focusRingClasses)}
                />
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-2 gap-[16px] w-full">
                <div className="flex flex-col gap-[4px]">
                  <Label htmlFor="password" className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={values.password}
                      onChange={onInputChange}
                      className={cn(
                        "h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 pr-10 py-3 placeholder-[#334155] text-white text-[14px] font-[400]",
                        focusRingClasses
                      )}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <Label htmlFor="confirmPassword" className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={values.confirmPassword}
                      onChange={onInputChange}
                      className={cn(
                        "h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 pr-10 py-3 placeholder-[#334155] text-white text-[14px] font-[400]",
                        focusRingClasses
                      )}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Preferred Language & Education Level */}
              <div className="grid grid-cols-2 gap-[16px] w-full">
                <div className="flex flex-col gap-[4px]">
                  <Label className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
                    Preferred Language
                  </Label>
                  <Select
                    value={values.preferredLanguageCode}
                    onValueChange={(value) =>
                      setValues((prev) => ({
                        ...prev,
                        preferredLanguageCode: value as SignupValues["preferredLanguageCode"],
                      }))
                    }
                  >
                    <SelectTrigger className={cn("h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 py-3 text-white text-[14px] font-[400] transition-all duration-200 cursor-pointer", focusRingClasses)}>
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
                    Education Level
                  </Label>
                  <Select
                    value={selectedEducationLevel}
                    onValueChange={(value) => {
                      setSelectedEducationLevel(value)

                      const selectedLevel = educationLevels.find(
                        (level) => level.name === value
                      )

                      if (!selectedLevel) return

                      const hasDepartments = selectedLevel.variants.some(
                        (v) => Boolean(v.department)
                      )

                      if (!hasDepartments && selectedLevel.variants.length > 0) {
                        const defaultVariantId = selectedLevel.variants[0].id.toString()
                        setSelectedDepartmentId(defaultVariantId)
                        setValues((prev) => ({
                          ...prev,
                          educationLevelId: defaultVariantId,
                        }))
                        setDepartmentOptions([])
                      } else {
                        setSelectedDepartmentId("")
                        setValues((prev) => ({
                          ...prev,
                          educationLevelId: "",
                        }))
                        setDepartmentOptions(selectedLevel.variants)
                      }
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
              </div>

              {/* Department Selector (conditionally shown when multiple variants) */}
              {departmentOptions.length > 0 && (
                <div className="flex flex-col gap-[4px] w-full">
                  <Label
                    className={cn(
                      dmSans.className,
                      "text-[12px] font-[700] tracking-[0.57px] text-white"
                    )}
                  >
                    Department
                  </Label>

                  <Select
                    value={selectedDepartmentId}
                    onValueChange={(value) => {
                      setSelectedDepartmentId(value)

                      setValues((prev) => ({
                        ...prev,
                        educationLevelId: value,
                      }))
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        "h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 py-3 text-white text-[14px] font-[400] transition-all duration-200 cursor-pointer",
                        focusRingClasses
                      )}
                    >
                      <SelectValue placeholder="Select department" />
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


              {/* Role Selector */}
              <div className="flex flex-col gap-[4px] w-full">
                <Label className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
                  Role
                </Label>
                <div className="grid grid-cols-2 gap-[12px] w-full">
                  <button
                    type="button"
                    onClick={() => setValues(prev => ({ ...prev, role: "STUDENT" }))}
                    className={cn(
                      dmSans.className,
                      "flex items-center justify-center text-[14px] font-[700] h-[40.4px] transition-all duration-200 cursor-pointer",
                      values.role === "STUDENT"
                        ? "rounded-[12px] border-[0.8px] border-[#14B8A6] bg-[rgba(20,184,166,0.08)] shadow-[inset_0_0_0_1px_#14B8A6,0_0_16px_rgba(20,184,166,0.12)] text-[#14B8A6]"
                        : "rounded-[12px] border-[0.8px] border-white/6 bg-transparent text-white/60 hover:text-white hover:border-white/20"
                    )}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    disabled
                    className={cn(
                      dmSans.className,
                      "flex items-center justify-center gap-1.5 text-[13px] font-[700] h-[40.4px] rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] text-white/40 cursor-not-allowed opacity-60"
                    )}
                  >
                    <span>Teacher</span>
                    <span className="text-[9px] font-[700] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                      Upcoming
                    </span>
                  </button>
                </div>
              </div>

            </div>

            {/* Action Buttons Stack */}
            <div className="flex flex-col gap-[10px] w-full mt-[2px]">

              {/* Create Account Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  dmSans.className,
                  "w-full h-[44.8px] rounded-[12px] bg-[#14B8A6] text-[#060910] hover:bg-[#14B8A6]/90 font-[900] text-[15px] uppercase tracking-wider shadow-[0_0_22px_rgba(20,184,166,0.25)] border-none transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* OR Divider */}
              <div className="flex items-center gap-4 w-full py-[2px]">
                <div className="h-[0.8px] bg-white/6 flex-1"></div>
                <span className="text-[12px] font-[500] text-white/45 tracking-wider">OR</span>
                <div className="h-[0.8px] bg-white/6 flex-1"></div>
              </div>

              {/* Google Button */}
              <Button
                type="button"
                onClick={googleAuth}
                className={cn(
                  dmSans.className,
                  "w-full h-[44px] rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] text-white hover:bg-white/[0.06] flex items-center justify-center gap-[10px] text-[14px] font-[500] transition-all duration-200 cursor-pointer"
                )}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.77-2.4 3.61v3h3.86c2.26-2.08 3.59-5.14 3.59-8.74z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.86-3c-1.08.72-2.45 1.16-4.1 1.16-3.15 0-5.81-2.13-6.76-5.01H1.31v3.1A12 12 0 0 0 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.24 14.24a7.22 7.22 0 0 1 0-4.48V6.66H1.31a12 12 0 0 0 0 10.68l3.93-3.1z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43A11.96 11.96 0 0 0 12 0 12 12 0 0 0 1.31 6.66l3.93 3.1c.95-2.88 3.61-5.01 6.76-5.01z"
                  />
                </svg>
                <span>Sign up with Google</span>
              </Button>

              {/* Login Redirect */}
              <p className="text-[14px] font-[300] text-white text-center mt-[2px]">
                Already registered?{" "}
                <a href="/auth/login" className="text-[#14B8A6] font-[600] hover:underline transition-all">
                  Log In
                </a>
              </p>

            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Illustration Panel */}
        <div
          className="hidden lg:flex flex-col justify-between w-[460px] h-[806px] rounded-[0_32px_32px_0] border-l-[0.8px] border-white/6 p-[56px_40px_48px_40px] select-none relative shrink-0 overflow-hidden"
          style={{ background: 'linear-gradient(165deg, #0A0F1E 7.74%, #060910 92.26%)' }}
        >
          {/* Top Right Glow */}
          <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full bg-[#14B8A6]/14 blur-[100px] pointer-events-none" />

          {/* Header Text */}
          <div className="flex flex-col text-left relative z-10">
            <h2 className={cn(dmSans.className, "text-[4rem] font-[800] leading-[1] tracking-[-0.0625rem] text-[#F8FAFC]")}>
              Practice<br />
              smarter.<br />
              Score <span className="text-[#14B8A6]">higher.</span>
            </h2>
            <p className={cn(dmSans.className, "text-[14px] font-[400] text-[#F8FAFC]/55 mt-4 max-w-[340px]")}>
              Join 50,000+ students using AI-powered practice to crack their exams.
            </p>
          </div>

          {/* Illustration with behind glow */}
          <div className="relative flex justify-center items-center w-full py-2 my-2 bg-transparent">
            {/* Radial Glow behind image */}
            <div className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,_rgba(20,184,166,0.18)_0%,_transparent_70%)] pointer-events-none" />
            <div className="relative w-[17.45625rem] h-[17.5rem] shrink-0 bg-transparent">
              <Image
                src="/icons/student.svg"
                alt="Signup illustration"
                fill
                className="object-contain relative z-10 bg-transparent"
                priority
              />
            </div>
          </div>

          {/* Bottom Stats Section */}
          <div className="grid grid-cols-2 gap-[24px] w-full relative z-10 px-2">
            {/* Card 1 */}
            <div className="flex items-center gap-[12px]">
              <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#14B8A6]/10 shrink-0">
                <Image
                  src="/icons/student.png"
                  alt="Students"
                  width={25}
                  height={25}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className={cn(dmSans.className, "text-[16px] font-[800] text-white leading-none")}>
                  50,000+
                </span>
                <span className={cn(dmSans.className, "text-[11px] font-[400] text-[#F8FAFC]/55 mt-[4px] whitespace-nowrap")}>
                  Active Learners
                </span>
              </div>
            </div>
            {/* Card 2 */}
            <div className="flex items-center gap-[12px]">
              <div className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#14B8A6]/10 shrink-0">
                <Image
                  src="/icons/score.png"
                  alt="Success Rate"
                  width={25}
                  height={25}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className={cn(dmSans.className, "text-[16px] font-[800] text-white leading-none")}>
                  90%
                </span>
                <span className={cn(dmSans.className, "text-[11px] font-[400] text-[#F8FAFC]/55 mt-[4px] whitespace-nowrap")}>
                  Success Rate
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
