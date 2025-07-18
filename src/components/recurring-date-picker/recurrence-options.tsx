
"use client"

import { useRecurrence } from "@/contexts/recurring-date-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { SimpleSelect } from "@/components/ui/simple-select"
import type { RecurrenceType } from "@/types/recurring-date"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const WEEK_POSITIONS = [
  { value: "1", label: "First" },
  { value: "2", label: "Second" },
  { value: "3", label: "Third" },
  { value: "4", label: "Fourth" },
  { value: "-1", label: "Last" },
]

export function RecurrenceOptions() {
  const { state, dispatch } = useRecurrence()

  const handleTypeChange = (type: string) => {
    dispatch({ type: "SET_TYPE", payload: type as RecurrenceType })
  }

  const handleIntervalChange = (value: string) => {
    const interval = Number.parseInt(value) || 1
    dispatch({ type: "SET_INTERVAL", payload: interval })
  }

  const handleWeekdayToggle = (dayIndex: number, checked: boolean) => {
    const newDays = checked
      ? [...state.weeklyPattern.days, dayIndex].sort()
      : state.weeklyPattern.days.filter((d) => d !== dayIndex)

    dispatch({ type: "SET_WEEKLY_PATTERN", payload: { days: newDays } })
  }

  const handleMonthlyPatternChange = (field: string, value: string | number) => {
    dispatch({
      type: "SET_MONTHLY_PATTERN",
      payload: { ...state.monthlyPattern, [field]: value },
    })
  }

  return (
    <div className="space-y-6">
      {/* Recurrence Type Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Repeat</Label>
        <div className="grid grid-cols-4 gap-2">
          {["daily", "weekly", "monthly", "yearly"].map((type) => (
            <Button
              key={type}
              variant={state.type === type ? "default" : "outline"}
              size="sm"
              onClick={() => handleTypeChange(type)}
              className="capitalize"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Interval Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Every {state.interval}{" "}
          {state.type === "daily"
            ? "day(s)"
            : state.type === "weekly"
              ? "week(s)"
              : state.type === "monthly"
                ? "month(s)"
                : "year(s)"}
        </Label>
        <Input
          type="number"
          min="1"
          max="365"
          value={state.interval}
          onChange={(e) => handleIntervalChange(e.target.value)}
          className="w-20"
        />
      </div>

      {/* Weekly Pattern */}
      {state.type === "weekly" && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Repeat on</Label>
          <div className="flex gap-2 flex-wrap">
            {WEEKDAYS.map((day, index) => (
              <div key={day} className="flex items-center space-x-1">
                <Checkbox
                  id={`day-${index}`}
                  checked={state.weeklyPattern.days.includes(index)}
                  onCheckedChange={(checked) => handleWeekdayToggle(index, checked as boolean)}
                />
                <Label htmlFor={`day-${index}`} className="text-xs">
                  {day}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Pattern */}
      {state.type === "monthly" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Monthly Pattern</Label>
            <div className="flex gap-2">
              <Button
                variant={state.monthlyPattern.type === "date" ? "default" : "outline"}
                size="sm"
                onClick={() => handleMonthlyPatternChange("type", "date")}
              >
                By Date
              </Button>
              <Button
                variant={state.monthlyPattern.type === "weekday" ? "default" : "outline"}
                size="sm"
                onClick={() => handleMonthlyPatternChange("type", "weekday")}
              >
                By Weekday
              </Button>
            </div>
          </div>

          {state.monthlyPattern.type === "date" && (
            <div className="space-y-2">
              <Label className="text-sm">Day of month</Label>
              <Input
                type="number"
                min="1"
                max="31"
                value={state.monthlyPattern.date || 1}
                onChange={(e) => handleMonthlyPatternChange("date", Number.parseInt(e.target.value) || 1)}
                className="w-20"
              />
            </div>
          )}

          {state.monthlyPattern.type === "weekday" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Week</Label>
                <SimpleSelect
                  value={state.monthlyPattern.week?.toString() || "1"}
                  onValueChange={(value) => handleMonthlyPatternChange("week", Number.parseInt(value))}
                  options={WEEK_POSITIONS}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Weekday</Label>
                <SimpleSelect
                  value={state.monthlyPattern.weekday?.toString() || "0"}
                  onValueChange={(value) => handleMonthlyPatternChange("weekday", Number.parseInt(value))}
                  options={WEEKDAYS.map((day, index) => ({ value: index.toString(), label: day }))}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
