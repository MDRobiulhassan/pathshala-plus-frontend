"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { DM_Sans, Fredoka } from "next/font/google"
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react"

import { forgotPassword, verifyOtp, resetPassword } from "@/lib/api"
import { forgotPasswordSchema, verifyOtpSchema, resetPasswordSchema } from "@/lib/validation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

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

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [resetToken, setResetToken] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [message, setMessage] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSendOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const parsed = forgotPasswordSchema.safeParse({ email })
    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0]?.message ?? "Please check your email.")
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMsg("")
      setMessage("")
      
      await forgotPassword(parsed.data.email)
      
      setErrorMsg("")
      setMessage("")
      setStep(2)
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to send OTP")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleResendOtp() {
    try {
      setIsSubmitting(true)
      setErrorMsg("")
      setMessage("")
      
      await forgotPassword(email)
      
      setMessage("OTP has been sent again.")
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to resend OTP")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleVerifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const parsed = verifyOtpSchema.safeParse({ email, otp })
    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0]?.message ?? "Please check your OTP.")
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMsg("")
      
      const response = await verifyOtp(parsed.data.email, parsed.data.otp)
      
      setResetToken(response.resetToken)
      setErrorMsg("")
      setMessage("")
      setStep(3)
    } catch (error: any) {
      setErrorMsg(error.message || "Verification failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const parsed = resetPasswordSchema.safeParse({ resetToken, newPassword, confirmPassword })
    if (!parsed.success) {
      setErrorMsg(parsed.error.issues[0]?.message ?? "Please check your passwords.")
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMsg("")
      setMessage("")

      await resetPassword(parsed.data.resetToken, parsed.data.newPassword, parsed.data.confirmPassword)

      setMessage("Password reset successfully. Redirecting to login...")
      
      setOtp("")
      setResetToken("")
      setNewPassword("")
      setConfirmPassword("")

      setTimeout(() => {
        router.push("/auth/login")
      }, 1500)
    } catch (error: any) {
      setErrorMsg(error.message || "Password reset failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  const focusRingClasses = "focus:border-[#14B8A6]/50 focus:ring-1 focus:ring-[#14B8A6]/25 focus:shadow-[0_0_0_1px_rgba(20,184,166,0.25),0_0_18px_rgba(20,184,166,0.08)] focus-visible:border-[#14B8A6]/50 focus-visible:ring-[#14B8A6]/25 focus-visible:shadow-[0_0_0_1px_rgba(20,184,166,0.25),0_0_18px_rgba(20,184,166,0.08)] focus-visible:outline-none"

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-[#060910] overflow-hidden p-4 md:p-8">
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
              Reset your<br />
              password.<br />
              Secure your<br />
              account.
            </h2>
            <p className={cn(dmSans.className, "text-[14px] font-[400] text-[#F8FAFC]/55 mt-4 max-w-[340px]")}>
              Follow the simple steps to recover your access and continue your path to master exams.
            </p>
          </div>

          {/* Illustration with behind glow */}
          <div className="relative flex justify-center items-center w-full py-2 my-2 bg-transparent">
            {/* Radial Glow behind image */}
            <div className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,_rgba(20,184,166,0.18)_0%,_transparent_70%)] pointer-events-none" />
            <div className="relative w-[17.45625rem] h-[17.5rem] shrink-0 bg-transparent">
              <Image
                src="/icons/student_laptop.png"
                alt="Reset Password illustration"
                fill
                className="object-contain relative z-10 bg-transparent"
                priority
              />
            </div>
          </div>

          {/* Spacer */}
          <div className="h-[20px]" />
        </div>

        {/* RIGHT COLUMN: Forgot Password Form Steps */}
        <div className="w-full lg:w-[564px] lg:h-[803.9px] p-6 md:p-10 lg:p-[46px_48px_42px_48px] rounded-[32px] lg:rounded-[0_32px_32px_0] bg-[#0C1120] flex flex-col justify-center">
          
          {/* Logo */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <Image
              src="/icons/Icon.png"
              alt="Pathshala Logo"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className={cn(dmSans.className, "text-white text-[20px] font-[700]")}>
              Pathshala
            </span>
          </div>

          {/* STEP 1: Email Form */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-[16px] w-full">
              <div className="flex flex-col text-left">
                <h1 className={cn(dmSans.className, "text-[#F8FAFC] text-[48px] leading-[52px] font-[800] tracking-[-1px] mb-[6px]")}>
                  Forgot Password
                </h1>
                <p className={cn(dmSans.className, "text-[14px] font-[400] text-[#F8FAFC]/55")}>
                  Enter your email address to receive an OTP code.
                </p>
              </div>

              {message && (
                <div className="p-3 rounded-[12px] bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-[14px]">
                  {message}
                </div>
              )}

              {errorMsg && (
                <div className="p-3 rounded-[12px] bg-red-500/10 border border-red-500/20 text-red-500 text-[14px]">
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col gap-[4px] w-full mt-[10px]">
                <Label htmlFor="email" className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className={cn("h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 py-3 placeholder-[#334155] text-white text-[14px] font-[400] focus:outline-none transition-all duration-200", focusRingClasses)}
                />
              </div>

              <div className="flex flex-col gap-[10px] w-full mt-[12px]">
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
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>

                <p className="text-[14px] font-[300] text-white text-center mt-[4px]">
                  <Link
                    href="/auth/login"
                    className="text-[#14B8A6] font-[600] hover:underline transition-all inline-flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Log In
                  </Link>
                </p>
              </div>
            </form>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-[16px] w-full">
              <div className="flex flex-col text-left">
                <h1 className={cn(dmSans.className, "text-[#F8FAFC] text-[48px] leading-[52px] font-[800] tracking-[-1px] mb-[6px]")}>
                  Verify OTP
                </h1>
                <p className={cn(dmSans.className, "text-[14px] font-[400] text-[#F8FAFC]/55")}>
                  Verification code sent to <span className="text-white font-[500]">{email}</span>
                </p>
              </div>

              {message && (
                <div className="p-3 rounded-[12px] bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-[14px]">
                  {message}
                </div>
              )}

              {errorMsg && (
                <div className="p-3 rounded-[12px] bg-red-500/10 border border-red-500/20 text-red-500 text-[14px]">
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col gap-[4px] w-full mt-[10px]">
                <Label htmlFor="otp" className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
                  OTP Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  required
                  value={otp}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                  className={cn("h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] px-4 py-3 placeholder-[#334155] text-white text-[14px] font-[400] focus:outline-none transition-all duration-200", focusRingClasses)}
                />
              </div>

              <div className="flex flex-col gap-[10px] w-full mt-[12px]">
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
                      <span>Verifying...</span>
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>

                <p className="text-[14px] font-[300] text-[#F8FAFC]/55 text-center mt-[4px]">
                  Didn&apos;t receive the code?{" "}
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleResendOtp}
                    className="text-[#14B8A6] font-[600] hover:underline transition-all bg-transparent border-none cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Resending...</span>
                      </>
                    ) : (
                      "Resend OTP"
                    )}
                  </button>
                </p>

                <p className="text-[14px] font-[300] text-white text-center mt-[4px]">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      setStep(1)
                      setErrorMsg("")
                      setMessage("")
                    }}
                    className="text-[#14B8A6] font-[600] hover:underline transition-all inline-flex items-center gap-1.5 bg-transparent border-none cursor-pointer disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4" /> Change Email
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* STEP 3: Reset Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="flex flex-col gap-[16px] w-full">
              <div className="flex flex-col text-left">
                <h1 className={cn(dmSans.className, "text-[#F8FAFC] text-[48px] leading-[52px] font-[800] tracking-[-1px] mb-[6px]")}>
                  Reset Password
                </h1>
                <p className={cn(dmSans.className, "text-[14px] font-[400] text-[#F8FAFC]/55")}>
                  Set your new password below.
                </p>
              </div>

              {message && (
                <div className="p-3 rounded-[12px] bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-[14px]">
                  {message}
                </div>
              )}

              {errorMsg && (
                <div className="p-3 rounded-[12px] bg-red-500/10 border border-red-500/20 text-red-500 text-[14px] max-w-full break-words">
                  {errorMsg}
                </div>
              )}

              {/* Form Fields Stack */}
              <div className="flex flex-col gap-[12px] w-full mt-[10px]">
                
                {/* New Password */}
                <div className="flex flex-col gap-[4px] w-full">
                  <Label htmlFor="newPassword" className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
                    New Password
                  </Label>
                  <div className="relative w-full">
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={newPassword}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                      className={cn("h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] pl-4 pr-10 py-3 placeholder-[#334155] text-white text-[14px] font-[400] focus:outline-none transition-all duration-200", focusRingClasses)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-[4px] w-full">
                  <Label htmlFor="confirmPassword" className={cn(dmSans.className, "text-[12px] font-[700] tracking-[0.57px] text-white")}>
                    Confirm Password
                  </Label>
                  <div className="relative w-full">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={confirmPassword}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                      className={cn("h-[43px] w-full rounded-[12px] border-[0.8px] border-white/6 bg-white/[0.02] pl-4 pr-10 py-3 placeholder-[#334155] text-white text-[14px] font-[400] focus:outline-none transition-all duration-200", focusRingClasses)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(prev => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

              </div>

              <div className="flex flex-col gap-[10px] w-full mt-[12px]">
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
                      <span>Resetting Password...</span>
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  )
}
