"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
  children: React.ReactNode
  allowedRole?: string
}

export default function ProtectedRoute({ children, allowedRole }: Props) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    const role = localStorage.getItem("role")

    // ❌ Not logged in
    if (!token) {
      router.push("/auth/login")
      return
    }

    // ❌ Role mismatch
    if (allowedRole && role !== allowedRole) {
      router.push("/")
      return
    }

    // ✅ Authorized
    setIsAuthorized(true)
  }, [router, allowedRole])

  // Prevent UI flicker
  if (!isAuthorized) return null

  return <>{children}</>
}