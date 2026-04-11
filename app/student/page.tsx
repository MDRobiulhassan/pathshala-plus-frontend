import ProtectedRoute from "@/components/custom/ProtectedRoute"

export default function StudentPage() {
  return (
    <ProtectedRoute allowedRole="STUDENT">
      <div>Student Dashboard</div>
    </ProtectedRoute>
  )
}