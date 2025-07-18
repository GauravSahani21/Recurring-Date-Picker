"use client"

import { useRecurrence } from "@/contexts/recurring-date-context"
import { getRecurrenceDescription } from "@/utils/validation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Hash, XIcon } from "lucide-react"

export function RecurrenceSummary() {
  const { state } = useRecurrence()

  const description = getRecurrenceDescription(state)
  const nextDates = state.previewDates.slice(0, 5)

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-2">
          <Calendar className="h-4 w-4 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-blue-900">Recurrence Pattern</h4>
            <p className="text-sm text-blue-700">{description}</p>
          </div>
        </div>

        {state.previewDates.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Hash className="h-3 w-3 text-blue-600" />
              <span className="text-xs font-medium text-blue-900">{state.previewDates.length} dates generated</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-blue-700">Next occurrences:</span>
              <div className="flex flex-wrap gap-1">
                {nextDates.map((date, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                    {date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      ...(state.includeTime && {
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                    })}
                  </Badge>
                ))}
                {state.previewDates.length > 5 && (
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                    +{state.previewDates.length - 5} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}

        {state.excludedDates.length > 0 && (
          <div className="flex items-center gap-2">
            <XIcon className="h-3 w-3 text-orange-600" />
            <span className="text-xs text-orange-700">{state.excludedDates.length} date(s) excluded</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
