export type RecurrenceType = "daily" | "weekly" | "monthly" | "yearly"

export type WeeklyPattern = {
  days: number[] // 0 = Sunday, 1 = Monday, etc.
}

export type MonthlyPattern = {
  type: "date" | "weekday" // e.g., "15th of every month" vs "2nd Tuesday of every month"
  date?: number // for date type
  weekday?: number // 0-6 for weekday type
  week?: number // 1-4 for "first", "second", etc., -1 for "last"
}

export interface RecurrenceState {
  type: RecurrenceType
  interval: number // every X days/weeks/months/years
  startDate: Date | null
  endDate: Date | null
  weeklyPattern: WeeklyPattern
  monthlyPattern: MonthlyPattern
  previewDates: Date[]
  excludedDates: Date[]
  includeTime: boolean
  selectedTime: string
  maxOccurrences: number | null
  preset: string | null
}

export type RecurrenceAction =
  | { type: "SET_TYPE"; payload: RecurrenceType }
  | { type: "SET_INTERVAL"; payload: number }
  | { type: "SET_START_DATE"; payload: Date | null }
  | { type: "SET_END_DATE"; payload: Date | null }
  | { type: "SET_WEEKLY_PATTERN"; payload: WeeklyPattern }
  | { type: "SET_MONTHLY_PATTERN"; payload: MonthlyPattern }
  | { type: "SET_PREVIEW_DATES"; payload: Date[] }
  | { type: "ADD_EXCLUDED_DATE"; payload: Date }
  | { type: "REMOVE_EXCLUDED_DATE"; payload: Date }
  | { type: "SET_INCLUDE_TIME"; payload: boolean }
  | { type: "SET_SELECTED_TIME"; payload: string }
  | { type: "SET_MAX_OCCURRENCES"; payload: number | null }
  | { type: "SET_PRESET"; payload: string | null }
  | { type: "APPLY_PRESET"; payload: Partial<RecurrenceState> }

export interface PresetPattern {
  id: string
  name: string
  description: string
  icon: string
  config: Partial<RecurrenceState>
}

export interface ValidationError {
  field: string
  message: string
}

export interface ExportFormat {
  format: "json" | "csv" | "ical"
  filename: string
}
