// lib/api.ts
import api from "./axios"
const BASE_URL = "http://localhost:8080"

// -----------------------------
// Types
// -----------------------------

export type LoginResponse = {
  id: number
  role: string
}
export type SignupResponse = {
  userId: number
  role: string
}

export type EducationLevelVariant = {
  id: number
  department: string | null
}

export type EducationLevel = {
  name: string
  variants: EducationLevelVariant[]
}

export type RefreshResponse = {
  accessToken: string
}
export type VerifyOtpResponse = {
  resetToken: string
}

export type Language = {
  id: number
  name: string
  code: string
}
// -----------------------------
// Question Bank Types
// -----------------------------

export type Institute = {
  id: number
  name: string
  shortName: string
  logoUrl: string | null
  hasUnits: boolean
}

export type Subject = {
  subjectId: number
  subjectName: string
  educationLevelId: number
}

export type Unit = {
  id: number
  name: string
  instituteId: number
}

export type ExamSession = {
  id: number
  sessionLabel: string
  startYear: number
  endYear: number | null
  instituteId: number
  unitId: number | null
  hasShift: boolean
}

export type Shift = {
  id: number
  shiftNumber: number
}
export type ExamInfo = {
  id: number
  testId: number
  examType: string
  totalMarks: number
  durationInMinutes: number
}
export type QuestionOption = {
  optionId: number
  optionLabel: string
  optionText: string
  optionImageUrl: string | null
  isCorrect: boolean
}

export type Question = {
  questionId: number
  questionText: string
  questionImageUrl: string | null
  explanation: string | null
  difficulty: string
  isApproved: boolean

  instituteName: string | null
  unitName: string | null
  sessionLabel: string | null

  options: QuestionOption[]
}

export type Passage = {
  passageId: number | null
  passageText: string | null
  passageImageUrl: string | null

  questions: Question[]
}

export type SubjectQuestionResponse = {
  subjectId: number;
  subjectName: string;

  page: number;
  size: number;

  totalElements: number;
  totalPages: number;

  passages: Passage[];
};
export type Chapter = {
  chapterId: number | null
  chapterName: string | null
  passages: Passage[]
}

export type SubjectQuestions = {
  subjectId: number
  subjectName: string
  chapters: Chapter[]
}

export type ExamQuestionResponse = {
  examInfo: {
    examInfoId: number
    examType: string
    totalMarks: number
    durationInMinutes: number
  }
  languageCode: string
  subjects: SubjectQuestions[]
}

// -----------------------------
// Helpers
// -----------------------------






// -----------------------------
// Signup API
// -----------------------------

export async function signupUser(data: {
  name: string
  email: string
  password: string
  confirmPassword: string
  preferredLanguageCode: string
  educationLevelId?: number | null
  role: "STUDENT" | "TEACHER"
}): Promise<SignupResponse> {
  try {
    const response = await api.post(
      "/auth/signup",
      data
    )

    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      error.response?.data?.message ??
      "Signup failed"
    )
  }
}
// -----------------------------
// Auth APIs
// -----------------------------

export async function loginUser(data: {
  email: string
  password: string
}): Promise<LoginResponse> {
  try {
    const response = await api.post(
      "/auth/login",
      data
    )

    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      error.response?.data?.message ??
      "Login failed"
    )
  }
}

// -----------------------------
// Example Protected API
// -----------------------------

export async function getProfile() {
  try {
    const response = await api.get("/auth/me")
    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Failed to fetch profile"
    )
  }
}

// -----------------------------
// Generic Request Helper (ADVANCED)
// -----------------------------

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(error || "API request failed")
  }

  return res.json()
}


// Education level api


export async function getEducationLevels():
  Promise<EducationLevel[]> {
  const res = await fetch(
    `${BASE_URL}/api/v1/education-levels`
  )

  if (!res.ok) {
    throw new Error(
      "Failed to fetch education levels"
    )
  }

  const response = await res.json()
  return response.data
}


export function googleAuth() {
  window.location.href = `${BASE_URL}/api/v1/auth/oauth2/google`
}


// Logout api

export async function logoutUser() {
  try {
    await api.post("/auth/logout")
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Logout failed"
    )
  }
}


// Refresh token api
export async function refreshToken() {
  try {
    await api.post("/auth/refresh")
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Refresh failed"
    )
  }
}


// forget password 

export async function forgotPassword(
  email: string
) {
  try {
    const response = await api.post(
      "/auth/forgot-password",
      { email }
    )
    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      error.response?.data?.message ??
      "Failed to send OTP"
    )
  }
}

// verify otp 

export async function verifyOtp(
  email: string,
  otp: string
): Promise<VerifyOtpResponse> {
  try {
    const response = await api.post(
      "/auth/verify-otp",
      { email, otp }
    )
    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      error.response?.data?.message ??
      "Invalid OTP"
    )
  }
}


// reset api 
export async function resetPassword(
  resetToken: string,
  newPassword: string,
  confirmPassword: string
) {
  try {
    const response = await api.post(
      "/auth/reset-password",
      {
        resetToken,
        newPassword,
        confirmPassword,
      }
    )
    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      error.response?.data?.message ??
      "Password reset failed"
    )
  }
}

// language api

export async function getLanguages(): Promise<Language[]> {
  const res = await fetch(
    `${BASE_URL}/api/v1/languages`
  )

  if (!res.ok) {
    throw new Error("Failed to load languages")
  }

  const response = await res.json()
  return response.data
}


// -----------------------------
// Student Dashboard
// -----------------------------

export async function getStudentDashboard() {
  try {
    const response = await api.get("/dashboard/student")
    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Failed to fetch dashboard"
    )
  }
}

export async function getInstitutes(
  educationLevelId: number
): Promise<Institute[]> {
  try {
    const response = await api.get(
      `/${educationLevelId}/institutes`
    );

    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Failed to fetch institutes"
    );
  }
}

export async function getSubjects(
  educationLevelId: number
): Promise<Subject[]> {
  try {
    const response = await api.get(
      `/subjects/education-level/${educationLevelId}`
    )

    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Failed to fetch subjects"
    )
  }
}

export async function getUnits(
  instituteId: number
): Promise<Unit[]> {
  try {
    const response = await api.get(
      `/institutes/${instituteId}/units`
    )

    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Failed to fetch units"
    )
  }
}

export async function getExamSessions(
  instituteId: number
): Promise<ExamSession[]> {
  try {
    const response = await api.get(
      `/institutes/${instituteId}/exam-sessions`
    )

    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Failed to fetch exam sessions"
    )
  }
}

export async function getSubjectQuestions(
  subjectId: number,
  page = 0,
  size = 20
): Promise<SubjectQuestionResponse> {
  try {
    const response = await api.get(
      `/questions/subject/${subjectId}`,
      {
        params: {
          page,
          size,
        },
      }
    )

    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Failed to fetch questions"
    )
  }
}

// ----------------------------------------------------
// Additional Question Bank APIs
// ----------------------------------------------------

export async function getInstituteExamSessions(
  instituteId: number
): Promise<ExamSession[]> {
  try {
    const response = await api.get(
      `/institutes/${instituteId}/exam-sessions`
    )

    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Failed to fetch institute exam sessions"
    )
  }
}

export async function getUnitExamSessions(
  instituteId: number,
  unitId: number
): Promise<ExamSession[]> {
  try {
    const response = await api.get(
      `/institutes/${instituteId}/units/${unitId}/exam-sessions`
    )

    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Failed to fetch unit exam sessions"
    )
  }
}

export async function getShifts(
  unitId: number,
  examSessionId: number
): Promise<Shift[]> {
  try {
    const response = await api.get(
      `/units/${unitId}/exam-sessions/${examSessionId}/shifts`
    )

    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Failed to fetch shifts"
    )
  }
}

export async function getExamInfoByUnit(
  unitId: number,
  examSessionId: number
): Promise<ExamInfo[]> {
  try {
    const response = await api.get(
      `/unit/${unitId}/exam-session/${examSessionId}/exam-info`
    )

    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Failed to fetch exam info"
    )
  }
}

export async function getExamInfoByShift(
  examSessionId: number,
  shiftId: number
): Promise<ExamInfo[]> {
  try {
    const response = await api.get(
      `/exam-session/${examSessionId}/shift/${shiftId}/exam-info`
    )

    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Failed to fetch shift exam info"
    )
  }
}

export async function getExamQuestions(
  examInfoId: number
): Promise<ExamQuestionResponse> {
  try {
    const response = await api.get(
      `/exam-info/${examInfoId}/questions`
    )

    return response.data.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message ??
      "Failed to fetch exam questions"
    )
  }
}