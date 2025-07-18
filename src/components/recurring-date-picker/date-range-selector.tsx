"use client"

import { useRecurrence } from "@/contexts/recurring-date-context"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CalendarIcon, X } from "lucide-react"
import { formatDate } from "@/utils/date-utils"
import { SimplePopover } from "./simple-popover"
import { SimpleCalendar } from "./simple-calendar"

export function DateRangeSelector() {
  const { state, dispatch } = useRecurrence()

  const handleStartDateChange = (date: Date) => {
    dispatch({ type: "SET_START_DATE", payload: date })
  }

  const handleEndDateChange = (date: Date) => {
    dispatch({ type: "SET_END_DATE", payload: date })
  }

  const clearEndDate = () => {
    dispatch({ type: "SET_END_DATE", payload: null })
  }

  return (
    <div className="space-y-4">
      {/* Start Date */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Start Date</Label>
        <SimplePopover
          trigger={
            <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {state.startDate ? formatDate(state.startDate) : "Select start date"}
            </Button>
          }
          content={<SimpleCalendar selected={state.startDate || undefined} onSelect={handleStartDateChange} />}
        />
      </div>

      {/* End Date */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">End Date (Optional)</Label>
        <div className="flex gap-2">
          <SimplePopover
            trigger={
              <Button variant="outline" className="flex-1 justify-start text-left font-normal bg-transparent">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {state.endDate ? formatDate(state.endDate) : "No end date"}
              </Button>
            }
            content={
              <SimpleCalendar
                selected={state.endDate || undefined}
                onSelect={handleEndDateChange}
                disabled={(date) => (state.startDate ? date < state.startDate : false)}
              />
            }
          />
          {state.endDate && (
            <Button variant="outline" size="icon" onClick={clearEndDate}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
