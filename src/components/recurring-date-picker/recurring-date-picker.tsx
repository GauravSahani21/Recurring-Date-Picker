"use client"

import { RecurrenceProvider } from "@/contexts/recurring-date-context"
import { RecurrenceOptions } from "./recurrence-options"
import { DateRangeSelector } from "./date-range-selector"
import { MiniCalendarPreview } from "./mini-calendar-preview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PresetSelector } from "./preset-selector"
import { AdvancedOptions } from "./advanced-options"
import { ValidationDisplay } from "./validation-display"
import { ExportOptions } from "./export-options"
import { RecurrenceSummary } from "./recurrence-summary"

export function RecurringDatePicker() {
  return (
    <RecurrenceProvider>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Recurring Date Picker</CardTitle>
            <p className="text-sm text-muted-foreground">
              Configure recurring dates with flexible patterns and preview the results
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <ValidationDisplay />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Configuration */}
              <div className="space-y-6">
                <PresetSelector />
                <Separator />
                <RecurrenceOptions />
                <Separator />
                <DateRangeSelector />
                <Separator />
                <AdvancedOptions />
                <Separator />
                <ExportOptions />
              </div>

              {/* Right Column - Preview */}
              <div className="space-y-6">
                <RecurrenceSummary />
                <MiniCalendarPreview />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </RecurrenceProvider>
  )
}
