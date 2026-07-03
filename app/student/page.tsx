import ProtectedRoute from "@/components/auth/ProtectedRoute"

export default function StudentPage() {
  return (
    <ProtectedRoute allowedRole="STUDENT">
      <div>Student Dashboard</div>
    </ProtectedRoute>
  )
}