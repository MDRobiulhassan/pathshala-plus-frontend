import { Suspense } from "react"
import LoginForm from "../../../components/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}