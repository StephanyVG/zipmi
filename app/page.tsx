import { Suspense } from "react"
import { Dashboard } from "@/components/dashboard"

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Dashboard />
    </Suspense>
  )
}
