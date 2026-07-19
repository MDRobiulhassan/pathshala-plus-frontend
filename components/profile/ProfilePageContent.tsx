"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getProfile, logoutUser, UserProfileResponse } from "@/lib/api"
import { logoutLocally } from "@/lib/axios"
import ProfileSidebar, { type ProfileTab } from "./ProfileSidebar"
import ProfileInfoForm from "./ProfileInfoForm"
import SecurityForm from "./SecurityForm"

export default function ProfilePageContent() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfileResponse | null>(null)
  const [activeTab, setActiveTab] = useState<ProfileTab>("info")
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile()
        setProfile(data)
      } catch (error) {
        console.error(error)
        setLoadError(error instanceof Error ? error.message : "Failed to load profile")
      } finally {
        setIsLoading(false)
      }
    }
    loadProfile()
  }, [])

  async function handleLogout() {
    try {
      await logoutUser()
    } catch (error) {
      console.error(error)
    } finally {
      logoutLocally()
      router.push("/auth/login")
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-[#060910] overflow-hidden p-4 md:p-8">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#14B8A6]/18 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#14B8A6]/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1024px] mx-auto py-8">
        {isLoading && (
          <div className="flex items-center justify-center h-[400px] text-white/50">
            Loading your profile...
          </div>
        )}

        {!isLoading && loadError && (
          <div className="flex flex-col items-center justify-center h-[400px] gap-3 text-center">
            <p className="text-red-400 text-[14px]">{loadError}</p>
            <p className="text-white/40 text-[13px]">
              Try refreshing the page, or log in again if the problem continues.
            </p>
          </div>
        )}

        {!isLoading && !loadError && profile && (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <ProfileSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onLogout={handleLogout}
              userName={profile.name}
              userEmail={profile.email}
            />

            <div className="flex-1 w-full rounded-[24px] border-[0.8px] border-white/6 bg-[#0C1120] p-6 md:p-8">
              {activeTab === "info" && (
                <ProfileInfoForm profile={profile} onUpdated={setProfile} />
              )}
              {activeTab === "security" && <SecurityForm />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}