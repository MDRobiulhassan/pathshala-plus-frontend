"use client"

import { useRef, useState, type ChangeEvent } from "react"
import { Camera } from "lucide-react"
import { DM_Sans } from "next/font/google"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { uploadAvatar } from "@/lib/api"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-dm-sans",
})

type ProfilePhotoHeaderProps = {
  name: string
  avatarUrl: string | null
  onAvatarUpdated: (newUrl: string) => void
}

export default function ProfilePhotoHeader({
  name,
  avatarUrl,
  onAvatarUpdated,
}: ProfilePhotoHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  async function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      toast.error("Invalid file format. Only JPG, PNG, and WEBP images are allowed.")
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }

    const maxSizeBytes = 2 * 1024 * 1024 // 2MB
    if (file.size > maxSizeBytes) {
      toast.error("File size exceeds 2MB limit.")
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }

    try {
      setIsUploading(true)
      const newUrl = await uploadAvatar(file)
      onAvatarUpdated(newUrl)
      toast.success("Profile photo updated successfully")
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : "Failed to upload photo")
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col items-center text-center gap-3 py-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={onFileSelected}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="group relative w-24 h-24 rounded-full cursor-pointer disabled:cursor-wait"
      >
        <div className="w-24 h-24 rounded-full bg-[#14B8A6]/10 border-[0.8px] border-[#14B8A6]/30 flex items-center justify-center overflow-hidden">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className={cn(dmSans.className, "text-[#14B8A6] text-[32px] font-[700]")}>
              {name ? name.charAt(0).toUpperCase() : "?"}
            </span>
          )}
        </div>

        <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isUploading ? (
            <span className={cn(dmSans.className, "text-white text-[10px] font-[500]")}>
              Uploading...
            </span>
          ) : (
            <Camera className="w-6 h-6 text-white" />
          )}
        </div>
      </button>

      <div>
        <p className={cn(dmSans.className, "text-white text-[18px] font-[800]")}>{name}</p>
        <p className={cn(dmSans.className, "text-white/40 text-[11px] font-[400] mt-1 max-w-[240px]")}>
          Click on the image to upload a new profile picture. JPG, PNG, or WEBP. Max 2MB.
        </p>
      </div>
    </div>
  )
}