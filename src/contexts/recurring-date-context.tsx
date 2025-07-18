"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { RecurrenceState, RecurrenceAction } from "../types/recurring-date"

const initialState: RecurrenceState = {
  type: "daily",
  interval: 1,
  startDate: new Date(),
  endDate: null,
  weeklyPattern: { days: [new Date().getDay()] },
  monthlyPattern: { type: "date", date: new Date().getDate() },
  previewDates: [],
  excludedDates: [],
  includeTime: false,
  selectedTime: "09:00",
  maxOccurrences: null,
  preset: null,
}

function recurrenceReducer(state: RecurrenceState, action: RecurrenceAction): RecurrenceState {
  switch (action.type) {
    case "SET_TYPE":
      return { ...state, type: action.payload, preset: null }
    case "SET_INTERVAL":
      return { ...state, interval: action.payload, preset: null }
    case "SET_START_DATE":
      return { ...state, startDate: action.payload }
    case "SET_END_DATE":
      return { ...state, endDate: action.payload }
    case "SET_WEEKLY_PATTERN":
      return { ...state, weeklyPattern: action.payload, preset: null }
    case "SET_MONTHLY_PATTERN":
      return { ...state, monthlyPattern: action.payload, preset: null }
    case "SET_PREVIEW_DATES":
      return { ...state, previewDates: action.payload }
    case "ADD_EXCLUDED_DATE":
      return {
        ...state,
        excludedDates: [...state.excludedDates, action.payload].sort((a, b) => a.getTime() - b.getTime()),
      }
    case "REMOVE_EXCLUDED_DATE":
      return {
        ...state,
        excludedDates: state.excludedDates.filter((date) => date.getTime() !== action.payload.getTime()),
      }
    case "SET_INCLUDE_TIME":
      return { ...state, includeTime: action.payload }
    case "SET_SELECTED_TIME":
      return { ...state, selectedTime: action.payload }
    case "SET_MAX_OCCURRENCES":
      return { ...state, maxOccurrences: action.payload }
    case "SET_PRESET":
      return { ...state, preset: action.payload }
    case "APPLY_PRESET":
      return { ...state, ...action.payload, preset: action.payload.preset || state.preset }
    default:
      return state
  }
}

const RecurrenceContext = createContext<{
  state: RecurrenceState
  dispatch: React.Dispatch<RecurrenceAction>
} | null>(null)

export function RecurrenceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(recurrenceReducer, initialState)

  return <RecurrenceContext.Provider value={{ state, dispatch }}>{children}</RecurrenceContext.Provider>
}

export function useRecurrence() {
  const context = useContext(RecurrenceContext)
  if (!context) {
    throw new Error("useRecurrence must be used within a RecurrenceProvider")
  }
  return context
}
