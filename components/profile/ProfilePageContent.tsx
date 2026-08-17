"use client"

import { useEffect, useState } from "react"
import { UserProfileResponse } from "@/lib/api"
import ProfilePhotoHeader from "./ProfilePhotoHeader"
import ProfileInfoForm from "./ProfileInfoForm"
import SecurityForm from "./SecurityForm"
import { useAuthSession } from "@/hooks/useAuthSession"

export default function ProfilePageContent() {
  const [profile, setProfile] = useState<UserProfileResponse | null>(null)
  const { profile: sessionProfile, isLoading, error } = useAuthSession()

  useEffect(() => {
    if (sessionProfile) {
      setProfile(sessionProfile)
    }
  }, [sessionProfile])

  const loadError = error ? error.message : null

  return (
    <div className="max-w-[640px] mx-auto py-6 flex flex-col gap-6">
      {isLoading && (
        <div className="flex items-center justify-center h-[300px] text-white/50">
          Loading your profile...
        </div>
      )}

      {!isLoading && loadError && (
        <div className="flex flex-col items-center justify-center h-[300px] gap-3 text-center">
          <p className="text-red-400 text-[14px]">{loadError}</p>
          <p className="text-white/40 text-[13px]">
            Try refreshing the page, or log in again if the problem continues.
          </p>
        </div>
      )}

      {!isLoading && !loadError && profile && (
        <>
          <ProfilePhotoHeader
            name={profile.name}
            avatarUrl={profile.avatarUrl}
            onAvatarUpdated={(newUrl) =>
              setProfile((prev) => (prev ? { ...prev, avatarUrl: newUrl } : prev))
            }
          />
          <ProfileInfoForm profile={profile} onUpdated={setProfile} />
          <SecurityForm />
        </>
      )}
    </div>
  )
}