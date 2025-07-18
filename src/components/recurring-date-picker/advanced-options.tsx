"use client"

import { useRecurrence } from "@/contexts/recurring-date-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Clock, Hash } from 'lucide-react'
import { formatDateShort } from "@/utils/date-utils"

export function AdvancedOptions() {
  const { state, dispatch } = useRecurrence()

  const handleTimeToggle = (checked: boolean) => {
    dispatch({ type: "SET_INCLUDE_TIME", payload: checked })
  }

  const handleTimeChange = (time: string) => {
    dispatch({ type: "SET_SELECTED_TIME", payload: time })
  }

  const handleMaxOccurrencesChange = (value: string) => {
    const num = value === "" ? null : Number.parseInt(value) || null
    dispatch({ type: "SET_MAX_OCCURRENCES", payload: num })
  }

  const removeExcludedDate = (date: Date) => {
    dispatch({ type: "REMOVE_EXCLUDED_DATE", payload: date })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Advanced Options</h3>

        {/* Time Selection */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="include-time" checked={state.includeTime} onCheckedChange={handleTimeToggle} />
            <Label htmlFor="include-time" className="text-sm flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Include specific time
            </Label>
          </div>

          {state.includeTime && (
            <div className="ml-6">
              <Input
                type="time"
                value={state.selectedTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-32"
              />
            </div>
          )}
        </div>

        {/* Max Occurrences */}
        <div className="space-y-2">
          <Label className="text-sm flex items-center gap-1">
            <Hash className="h-3 w-3" />
            Maximum occurrences (optional)
          </Label>
          <Input
            type="number"
            min="1"
            max="1000"
            placeholder="No limit"
            value={state.maxOccurrences || ""}
            onChange={(e) => handleMaxOccurrencesChange(e.target.value)}
            className="w-32"
          />
        </div>

        {/* Excluded Dates */}
        <div className="space-y-3">
          <Label className="text-sm">Excluded Dates</Label>
          <p className="text-xs text-muted-foreground">Click on dates in the preview calendar to exclude them</p>

          {state.excludedDates.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {state.excludedDates.map((date, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {formatDateShort(date)}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-transparent"
                    onClick={() => removeExcludedDate(date)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
