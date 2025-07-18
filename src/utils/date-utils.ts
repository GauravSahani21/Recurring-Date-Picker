import type { RecurrenceState, MonthlyPattern } from "../types/recurring-date"

/**
 * Calculate recurring dates based on the recurrence pattern
 */
export function calculateRecurringDates(state: RecurrenceState, maxDates = 100): Date[] {
  if (!state.startDate) return []

  const startDate = new Date(state.startDate)
  const endDate = state.endDate ? new Date(state.endDate) : null
  const maxOccurrences = state.maxOccurrences

  // Set end date to 2 years from start if not specified (for preview purposes)
  const previewEndDate = endDate || new Date(startDate.getFullYear() + 2, startDate.getMonth(), startDate.getDate())

  let dates: Date[] = []

  switch (state.type) {
    case "daily":
      dates = calculateDailyDates(startDate, previewEndDate, state.interval, maxDates)
      break
    case "weekly":
      dates = calculateWeeklyDates(startDate, previewEndDate, state.interval, state.weeklyPattern.days, maxDates)
      break
    case "monthly":
      dates = calculateMonthlyDates(startDate, previewEndDate, state.interval, state.monthlyPattern, maxDates)
      break
    case "yearly":
      dates = calculateYearlyDates(startDate, previewEndDate, state.interval, maxDates)
      break
    default:
      dates = []
  }

  // Apply max occurrences limit
  if (maxOccurrences && dates.length > maxOccurrences) {
    dates = dates.slice(0, maxOccurrences)
  }

  // Filter out excluded dates
  dates = dates.filter((date) => !state.excludedDates.some((excluded) => isSameDay(date, excluded)))

  // Add time if specified
  if (state.includeTime && state.selectedTime) {
    const [hours, minutes] = state.selectedTime.split(":").map(Number)
    dates = dates.map((date) => {
      const newDate = new Date(date)
      newDate.setHours(hours, minutes, 0, 0)
      return newDate
    })
  }

  return dates
}

function calculateDailyDates(startDate: Date, endDate: Date, interval: number, maxDates: number): Date[] {
  const dates: Date[] = []
  const current = new Date(startDate)

  while (current <= endDate && dates.length < maxDates) {
    dates.push(new Date(current))
    current.setDate(current.getDate() + interval)
  }

  return dates
}

function calculateWeeklyDates(
  startDate: Date,
  endDate: Date,
  interval: number,
  selectedDays: number[],
  maxDates: number,
): Date[] {
  const dates: Date[] = []
  const current = new Date(startDate)

  // Start from the beginning of the week containing startDate
  const startOfWeek = new Date(current)
  startOfWeek.setDate(current.getDate() - current.getDay())

  let weekCount = 0

  while (dates.length < maxDates) {
    const weekStart = new Date(startOfWeek)
    weekStart.setDate(startOfWeek.getDate() + weekCount * 7 * interval)

    if (weekStart > endDate) break

    // Add selected days of this week
    for (const day of selectedDays) {
      const dateToAdd = new Date(weekStart)
      dateToAdd.setDate(weekStart.getDate() + day)

      if (dateToAdd >= startDate && dateToAdd <= endDate) {
        dates.push(new Date(dateToAdd))
      }
    }

    weekCount++
  }

  return dates.sort((a, b) => a.getTime() - b.getTime()).slice(0, maxDates)
}

function calculateMonthlyDates(
  startDate: Date,
  endDate: Date,
  interval: number,
  pattern: MonthlyPattern,
  maxDates: number,
): Date[] {
  const dates: Date[] = []
  const current = new Date(startDate)

  while (current <= endDate && dates.length < maxDates) {
    if (pattern.type === "date") {
      // Specific date of month (e.g., 15th of every month)
      const targetDate = new Date(current.getFullYear(), current.getMonth(), pattern.date || 1)
      if (targetDate >= startDate && targetDate <= endDate) {
        dates.push(new Date(targetDate))
      }
    } else if (pattern.type === "weekday") {
      // Specific weekday of month (e.g., 2nd Tuesday of every month)
      const targetDate = getNthWeekdayOfMonth(
        current.getFullYear(),
        current.getMonth(),
        pattern.weekday || 0,
        pattern.week || 1,
      )
      if (targetDate && targetDate >= startDate && targetDate <= endDate) {
        dates.push(new Date(targetDate))
      }
    }

    current.setMonth(current.getMonth() + interval)
  }

  return dates
}

function calculateYearlyDates(startDate: Date, endDate: Date, interval: number, maxDates: number): Date[] {
  const dates: Date[] = []
  const current = new Date(startDate)

  while (current <= endDate && dates.length < maxDates) {
    dates.push(new Date(current))
    current.setFullYear(current.getFullYear() + interval)
  }

  return dates
}

function getNthWeekdayOfMonth(year: number, month: number, weekday: number, week: number): Date | null {
  const firstDay = new Date(year, month, 1)
  const firstWeekday = firstDay.getDay()

  let targetDate: number

  if (week === -1) {
    // Last occurrence of weekday in month
    const lastDay = new Date(year, month + 1, 0).getDate()
    const lastDayWeekday = new Date(year, month, lastDay).getDay()
    const daysBack = (lastDayWeekday - weekday + 7) % 7
    targetDate = lastDay - daysBack
  } else {
    // Nth occurrence of weekday in month
    const daysToAdd = (weekday - firstWeekday + 7) % 7
    targetDate = 1 + daysToAdd + (week - 1) * 7
  }

  // Check if the calculated date is valid for this month
  const lastDay = new Date(year, month + 1, 0).getDate()
  if (targetDate > lastDay) return null

  return new Date(year, month, targetDate)
}

export function formatDate(date: Date, includeTime = false): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  if (includeTime) {
    options.hour = "2-digit"
    options.minute = "2-digit"
  }

  return date.toLocaleDateString("en-US", options)
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6
}

export function isWeekday(date: Date): boolean {
  return !isWeekend(date)
}
