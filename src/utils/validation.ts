import type { RecurrenceState, ValidationError } from "../types/recurring-date"

export function validateRecurrenceState(state: RecurrenceState): ValidationError[] {
  const errors: ValidationError[] = []

  // Start date validation
  if (!state.startDate) {
    errors.push({
      field: "startDate",
      message: "Start date is required",
    })
  }

  // End date validation
  if (state.endDate && state.startDate && state.endDate < state.startDate) {
    errors.push({
      field: "endDate",
      message: "End date must be after start date",
    })
  }

  // Interval validation
  if (state.interval < 1 || state.interval > 365) {
    errors.push({
      field: "interval",
      message: "Interval must be between 1 and 365",
    })
  }

  // Weekly pattern validation
  if (state.type === "weekly" && state.weeklyPattern.days.length === 0) {
    errors.push({
      field: "weeklyPattern",
      message: "At least one day must be selected for weekly recurrence",
    })
  }

  // Monthly pattern validation
  if (state.type === "monthly") {
    if (state.monthlyPattern.type === "date") {
      const date = state.monthlyPattern.date || 1
      if (date < 1 || date > 31) {
        errors.push({
          field: "monthlyPattern",
          message: "Day of month must be between 1 and 31",
        })
      }
    }
  }

  // Max occurrences validation
  if (state.maxOccurrences !== null && (state.maxOccurrences < 1 || state.maxOccurrences > 1000)) {
    errors.push({
      field: "maxOccurrences",
      message: "Max occurrences must be between 1 and 1000",
    })
  }

  // Time validation
  if (state.includeTime && state.selectedTime) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!timeRegex.test(state.selectedTime)) {
      errors.push({
        field: "selectedTime",
        message: "Invalid time format. Use HH:MM format",
      })
    }
  }

  return errors
}

export function getRecurrenceDescription(state: RecurrenceState): string {
  if (!state.startDate) return "No recurrence configured"

  let description = ""

  switch (state.type) {
    case "daily":
      description = state.interval === 1 ? "Daily" : `Every ${state.interval} days`
      break
    case "weekly":
      if (state.interval === 1) {
        description = "Weekly"
      } else {
        description = `Every ${state.interval} weeks`
      }
      if (state.weeklyPattern.days.length > 0) {
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        const selectedDays = state.weeklyPattern.days.map((day) => dayNames[day]).join(", ")
        description += ` on ${selectedDays}`
      }
      break
    case "monthly":
      if (state.interval === 1) {
        description = "Monthly"
      } else {
        description = `Every ${state.interval} months`
      }
      if (state.monthlyPattern.type === "date") {
        description += ` on the ${state.monthlyPattern.date}${getOrdinalSuffix(state.monthlyPattern.date || 1)}`
      } else {
        const weekNames = ["First", "Second", "Third", "Fourth", "Last"]
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const week = state.monthlyPattern.week === -1 ? "Last" : weekNames[(state.monthlyPattern.week || 1) - 1]
        const day = dayNames[state.monthlyPattern.weekday || 0]
        description += ` on the ${week} ${day}`
      }
      break
    case "yearly":
      description = state.interval === 1 ? "Yearly" : `Every ${state.interval} years`
      break
  }

  if (state.includeTime) {
    description += ` at ${state.selectedTime}`
  }

  if (state.maxOccurrences) {
    description += ` (max ${state.maxOccurrences} times)`
  }

  return description
}

function getOrdinalSuffix(num: number): string {
  const j = num % 10
  const k = num % 100
  if (j === 1 && k !== 11) return "st"
  if (j === 2 && k !== 12) return "nd"
  if (j === 3 && k !== 13) return "rd"
  return "th"
}
