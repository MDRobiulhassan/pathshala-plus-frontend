"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"

import { signupUser } from "@/lib/api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ---------------- Schema ----------------
const formSchema = z
  .object({
    name: z.string().min(1, "Name required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Min 8 chars"),
    confirmPassword: z.string(),
    preferredLanguageCode: z.string().min(1),
    educationLevelId: z.string().optional(),
    role: z.enum(["STUDENT", "TEACHER"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// ---------------- Component ----------------
export default function SignupForm() {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      preferredLanguageCode: "EN",
      educationLevelId: "",
      role: "STUDENT",
    },
  })

  async function onSubmit(values: any) {
    console.log("Submitting:", values)
    try {
      const payload = {
        ...values,
        educationLevelId: values.educationLevelId
          ? Number(values.educationLevelId)
          : null,
      }

      const data = await signupUser(payload)

      // ✅ store tokens
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      localStorage.setItem("role", data.role)

      // ✅ redirect
      if (data.role === "TEACHER") {
        router.push("/teacher")
      } else {
        router.push("/student")
      }

    } catch (err) {
      console.error(err)
      alert("Signup failed")
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-4">

          <Input placeholder="Name" {...form.register("name")} />
          <Input placeholder="Email" {...form.register("email")} />
          <Input type="password" placeholder="Password" {...form.register("password")} />
          <Input type="password" placeholder="Confirm Password" {...form.register("confirmPassword")} />

          <Input placeholder="Language (EN)" {...form.register("preferredLanguageCode")} />

          <Input placeholder="Education Level ID (optional)" {...form.register("educationLevelId")} />

          {/* Role Select */}
         <Select
            value={form.watch("role")}
            onValueChange={(value) => {
                form.setValue("role", value as "STUDENT" | "TEACHER", {
                shouldValidate: true,
                })
            }}
            >
            <SelectTrigger>
                <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="STUDENT">Student</SelectItem>
                <SelectItem value="TEACHER">Teacher</SelectItem>
            </SelectContent>
            </Select>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}