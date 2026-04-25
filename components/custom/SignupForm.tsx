"use client"

import { useState, type ChangeEvent, type ComponentProps, type FormEvent } from "react"
import { useRouter } from "next/navigation"

import { signupUser } from "@/lib/api"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SignupValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: "STUDENT" | "TEACHER"
  preferredLanguageCode: "EN" | "HI"
  educationLevelId: string
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
    role: "STUDENT",
    preferredLanguageCode: "EN",
    educationLevelId: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!values.name || !values.email || !values.password || !values.confirmPassword) {
      alert("Please fill all required fields")
      return
    }

    if (values.password.length < 8) {
      alert("Password must be at least 8 characters")
      return
    }

    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      setIsSubmitting(true)
      const data = await signupUser({
        ...values,
        educationLevelId: values.educationLevelId ? Number(values.educationLevelId) : null,
      })

      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      localStorage.setItem("userId", data.userId.toString())
      localStorage.setItem("role", data.role)

      if (data.role === "TEACHER") {
        router.push("/teacher")
      } else {
        router.push("/student")
      }
    } catch (error) {
      console.error(error)
      alert("Signup failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={onSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Enter your details below to create your account
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={values.name}
                  onChange={onInputChange}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={values.email}
                  onChange={onInputChange}
                />
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your email with anyone else.
                </FieldDescription>
              </Field>

              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={values.password}
                    onChange={onInputChange}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={values.confirmPassword}
                    onChange={onInputChange}
                  />
                </Field>
              </Field>

              <FieldDescription>Must be at least 8 characters long.</FieldDescription>

              <Field>
                <FieldLabel>Role</FieldLabel>
                <Select
                  value={values.role}
                  onValueChange={(value) =>
                    setValues((prev) => ({ ...prev, role: value as SignupValues["role"] }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STUDENT">Student</SelectItem>
                    <SelectItem value="TEACHER">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel>Preferred Language</FieldLabel>
                <Select
                  value={values.preferredLanguageCode}
                  onValueChange={(value) =>
                    setValues((prev) => ({
                      ...prev,
                      preferredLanguageCode: value as SignupValues["preferredLanguageCode"],
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EN">English</SelectItem>
                    <SelectItem value="HI">Hindi</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel>Education Level</FieldLabel>
                <Select
                  value={values.educationLevelId || undefined}
                  onValueChange={(value) =>
                    setValues((prev) => ({
                      ...prev,
                      educationLevelId: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">School</SelectItem>
                    <SelectItem value="2">College</SelectItem>
                    <SelectItem value="3">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <Field>
                <Button variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Sign up with Google</span>
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Already have an account? <a href="/auth/login">Sign in</a>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
