"use client"

import { useState, type ChangeEvent, type ComponentProps, type FormEvent } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { DM_Sans, Fredoka } from "next/font/google"
import { Eye, EyeOff } from "lucide-react"

import { loginUser } from "@/lib/api"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
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

type LoginValues = {
  email: string
  password: string
}

export default function LoginForm({
  className,
  ...props
}: ComponentProps<"div">) {
  const router = useRouter()
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!values.email || !values.password) {
      alert("Email and password are required")
      return
    }

    try {
      setIsSubmitting(true)
      const data = await loginUser(values)

      console.log("LOGIN RESPONSE", data)

      localStorage.setItem("id", data.id.toString())
      localStorage.setItem("role", data.role)

      if (data.role === "TEACHER") {
        router.push("/teacher")
      } else if (data.role === "STUDENT") {
        router.push("/student")
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error(error)

      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert("Login failed")
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

        {/* LEFT COLUMN: Illustration Panel */}
        <div
          className="hidden lg:flex flex-col justify-between w-[460px] h-[806px] rounded-[32px_0_0_32px] border-r-[0.8px] border-white/6 p-[56px_40px_48px_40px] select-none relative shrink-0 overflow-hidden"
          style={{ background: 'linear-gradient(165deg, #0A0F1E 7.74%, #060910 92.26%)' }}
        >
          {/* Top Right Glow */}
          <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full bg-[#14B8A6]/14 blur-[100px] pointer-events-none" />

          {/* Header Text */}
          <div className="flex flex-col text-left relative z-10">
            <h2 className={cn(dmSans.className, "text-[4rem] font-[800] leading-[1] tracking-[-0.0625rem] text-[#F8FAFC]")}>
              Welcome back.<br />
              Keep the <span className="text-[#14B8A6]">streak</span><br />
              going.
            </h2>
            <p className={cn(dmSans.className, "text-[14px] font-[400] text-[#F8FAFC]/55 mt-4 max-w-[340px]")}>
              Log in to continue your path to master exams with smart practice.
            </p>
          </div>

          {/* Illustration with behind glow */}
          <div className="relative flex justify-center items-center w-full py-2 my-2 bg-transparent">
            {/* Radial Glow behind image */}
            <div className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,_rgba(20,184,166,0.18)_0%,_transparent_70%)] pointer-events-none" />
            <div className="relative w-[17.45625rem] h-[17.5rem] shrink-0 bg-transparent">
              <Image
                src="/icons/student_laptop.png"
                alt="Login illustration"
                fill
                className="object-contain relative z-10 bg-transparent"
                priority
              />
            </div>
          </div>

          {/* Spacer */}
          <div className="h-[20px]" />
        </div>

        {/* RIGHT COLUMN: Login Form */}
        <div className="w-full lg:w-[564px] lg:h-[803.9px] p-6 md:p-10 lg:p-[46px_48px_42px_48px] rounded-[32px] lg:rounded-[0_32px_32px_0] bg-[#0C1120] flex flex-col justify-center">
          <form onSubmit={onSubmit} className="flex flex-col gap-[16px] w-full">

            {/* Header / Logo */}
            <div className="flex flex-col text-left">

              <div className="flex justify-center items-center gap-2 mb-8">
                <Image
                  src="/icons/Icon.png"
                  alt="Pathshala Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />

                <span
                  className={cn(
                    dmSans.className,
                    "text-white text-[20px] font-[700]"
                  )}
                >
                  Pathshala
                </span>
              </div>
              <h1 className={cn(dmSans.className, "text-[#F8FAFC] text-[48px] leading-[52px] font-[800] tracking-[-1px] leading-none mb-[6px]")}>
                Log in to your account
              </h1>
              <p className={cn(dmSans.className, "text-[14px] font-[400] text-[#F8FAFC]/55")}>
                Welcome back! Please enter your details.
              </p>
            </div>

            {/* Form Fields Stack */}
            <div className="flex flex-col gap-[12px] w-full mt-[10px]">

              {/* Email Address */}
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

              {/* Password */}
              <div className="flex flex-col gap-[4px] w-full">
                <div className="flex items-center justify-between w-full">
                  <Label htmlFor="password" className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
                    Password
                  </Label>
                  <Link
                    href="/auth/forgot-password"
                    className={cn(dmSans.className, "text-[12px] text-[#14B8A6] hover:underline font-[500] transition-all")}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative w-full">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={values.password}
                    onChange={onInputChange}
                    className={cn("h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] pl-4 pr-10 py-3 placeholder-[#334155] text-white text-[14px] font-[400] focus:outline-none transition-all duration-200", focusRingClasses)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

            </div>

            {/* Action Buttons Stack */}
            <div className="flex flex-col gap-[10px] w-full mt-[12px]">

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  dmSans.className,
                  "w-full h-[44.8px] rounded-[12px] bg-[#14B8A6] text-[#060910] hover:bg-[#14B8A6]/90 font-[900] text-[15px] uppercase tracking-wider shadow-[0_0_22px_rgba(20,184,166,0.25)] border-none transition-all duration-200 cursor-pointer disabled:opacity-50"
                )}
              >
                {isSubmitting ? "Logging in..." : "Log In"}
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
                <span>Continue with Google</span>
              </Button>

              {/* Redirect to Signup */}
              <p className="text-[14px] font-[300] text-white text-center mt-[4px]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-[#14B8A6] font-[600] hover:underline transition-all"
                >
                  Sign Up
                </Link>
              </p>

            </div>
          </form>
        </div>

      </div>
    </div>
  )
}
