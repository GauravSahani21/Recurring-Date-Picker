"use client"

import { useEffect, useState, useMemo } from "react"
import { useRecurrence } from "@/contexts/recurring-date-context"
import { calculateRecurringDates, isSameDay } from "@/utils/date-utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MiniCalendarPreview() {
  const { state, dispatch } = useRecurrence()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Only watch the specific state properties that affect date calculation
  const {
    type,
    interval,
    startDate,
    endDate,
    weeklyPattern,
    monthlyPattern,
    maxOccurrences,
    includeTime,
    selectedTime,
    excludedDates,
  } = state

  // Memoize the preview dates calculation to avoid unnecessary recalculations
  const previewDates = useMemo(() => {
    return calculateRecurringDates(state, 100)
  }, [type, interval, startDate, endDate, weeklyPattern, monthlyPattern, maxOccurrences, includeTime, selectedTime])

  // Update the context with calculated dates only when they actually change
  useEffect(() => {
    // Only dispatch if the calculated dates are different from current preview dates
    const currentDatesString = JSON.stringify(state.previewDates.map((d) => d.getTime()))
    const newDatesString = JSON.stringify(previewDates.map((d) => d.getTime()))

    if (currentDatesString !== newDatesString) {
      dispatch({ type: "SET_PREVIEW_DATES", payload: previewDates })
    }
  }, [previewDates, state.previewDates, dispatch])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const isRecurringDate = (date: Date | null) => {
    if (!date) return false
    return previewDates.some((recurringDate) => isSameDay(date, recurringDate))
  }

  const isToday = (date: Date | null) => {
    if (!date) return false
    return isSameDay(date, new Date())
  }

  const isExcludedDate = (date: Date | null) => {
    if (!date) return false
    return excludedDates.some((excludedDate) => isSameDay(date, excludedDate))
  }

  const handleDateClick = (date: Date) => {
    const isExcluded = excludedDates.some((excluded) => isSameDay(excluded, date))

    if (isExcluded) {
      dispatch({ type: "REMOVE_EXCLUDED_DATE", payload: date })
    } else {
      dispatch({ type: "ADD_EXCLUDED_DATE", payload: date })
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const days = getDaysInMonth(currentMonth)
  const monthYear = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Preview Calendar</h3>
        <div className="text-xs text-muted-foreground">{previewDates.length} dates selected</div>
      </div>

      <div className="border rounded-lg p-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="font-medium text-sm">{monthYear}</div>
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div key={index} className="text-center text-xs font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center text-xs rounded-md relative cursor-pointer
                ${date ? "hover:bg-muted" : ""}
                ${isToday(date) ? "bg-primary text-primary-foreground font-medium" : ""}
                ${isRecurringDate(date) && !isToday(date) ? "bg-blue-100 text-blue-900 font-medium" : ""}
                ${isExcludedDate(date) ? "bg-red-100 text-red-900 line-through" : ""}
                ${!date ? "cursor-default" : ""}
              `}
              onClick={() => date && handleDateClick(date)}
            >
              {date && (
                <>
                  {date.getDate()}
                  {isRecurringDate(date) && (
                    <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full" />
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 text-xs flex-wrap">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary rounded-sm" />
            <span>Today</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded-sm" />
            <span>Recurring dates</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-100 border border-red-200 rounded-sm" />
            <span>Excluded dates</span>
          </div>
        </div>
      </div>
    </div>
  )
}
