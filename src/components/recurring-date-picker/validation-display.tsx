"use client"

import { useRecurrence } from "@/contexts/recurring-date-context"
import { validateRecurrenceState } from "@/utils/validation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function ValidationDisplay() {
  const { state } = useRecurrence()
  const errors = validateRecurrenceState(state)

  if (errors.length === 0) return null

  return (
    <div className="space-y-2">
      {errors.map((error, index) => (
        <Alert key={index} variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-sm">{error.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}
