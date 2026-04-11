import ProtectedRoute from "@/components/custom/ProtectedRoute"

export default function TeacherPage() {
  return (
    <ProtectedRoute allowedRole="TEACHER">
      <div>Teacher Dashboard</div>
    </ProtectedRoute>
  )
}