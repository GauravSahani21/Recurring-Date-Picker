import type { PresetPattern } from "../types/recurring-date"

export const PRESET_PATTERNS: PresetPattern[] = [
  {
    id: "daily",
    name: "Every Day",
    description: "Occurs every single day",
    icon: "☀️",
    config: {
      type: "daily",
      interval: 1,
    },
  },
  {
    id: "weekdays",
    name: "Weekdays Only",
    description: "Monday through Friday",
    icon: "💼",
    config: {
      type: "weekly",
      interval: 1,
      weeklyPattern: { days: [1, 2, 3, 4, 5] },
    },
  },
  {
    id: "weekends",
    name: "Weekends Only",
    description: "Saturday and Sunday",
    icon: "🎉",
    config: {
      type: "weekly",
      interval: 1,
      weeklyPattern: { days: [0, 6] },
    },
  },
  {
    id: "weekly",
    name: "Weekly",
    description: "Same day every week",
    icon: "📅",
    config: {
      type: "weekly",
      interval: 1,
      weeklyPattern: { days: [new Date().getDay()] },
    },
  },
  {
    id: "biweekly",
    name: "Bi-weekly",
    description: "Every two weeks",
    icon: "📆",
    config: {
      type: "weekly",
      interval: 2,
      weeklyPattern: { days: [new Date().getDay()] },
    },
  },
  {
    id: "monthly",
    name: "Monthly",
    description: "Same date every month",
    icon: "🗓️",
    config: {
      type: "monthly",
      interval: 1,
      monthlyPattern: { type: "date", date: new Date().getDate() },
    },
  },
  {
    id: "quarterly",
    name: "Quarterly",
    description: "Every 3 months",
    icon: "📊",
    config: {
      type: "monthly",
      interval: 3,
      monthlyPattern: { type: "date", date: new Date().getDate() },
    },
  },
  {
    id: "yearly",
    name: "Yearly",
    description: "Same date every year",
    icon: "🎂",
    config: {
      type: "yearly",
      interval: 1,
    },
  },
]
