"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SimpleCalendarProps {
  selected?: Date
  onSelect?: (date: Date) => void
  disabled?: (date: Date) => boolean
  onDateClick?: (date: Date) => void
}

export function SimpleCalendar({
  selected,
  onSelect,
  disabled,
  onDateClick,
}: SimpleCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date())

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

  const isSelected = (date: Date | null) => {
    if (!date || !selected) return false
    return (
      date.getFullYear() === selected.getFullYear() &&
      date.getMonth() === selected.getMonth() &&
      date.getDate() === selected.getDate()
    )
  }

  const isDisabled = (date: Date | null) => {
    if (!date || !disabled) return false
    return disabled(date)
  }

  const days = getDaysInMonth(currentMonth)
  const monthYear = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <div className="p-3">
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
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
          <div key={index} className="text-center text-xs font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <Button
            key={index}
            variant={isSelected(date) ? "default" : "ghost"}
            size="sm"
            className={`
              h-8 w-8 p-0 font-normal
              ${!date ? "invisible" : ""}
              ${isDisabled(date) ? "opacity-50 cursor-not-allowed" : ""}
            `}
            onClick={() => {
              if (date && !isDisabled(date)) {
                if (onSelect) {
                  onSelect(date)
                }
                if (onDateClick) {
                  onDateClick(date)
                }
              }
            }}
            disabled={isDisabled(date)}
          >
            {date?.getDate()}
          </Button>
        ))}
      </div>
    </div>
  )
}
