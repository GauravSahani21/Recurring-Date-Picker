"use client"

import { useRecurrence } from "@/contexts/recurring-date-context"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { exportRecurringDates } from "@/utils/export"
import { Download, FileText, Table, Calendar } from "lucide-react"

export function ExportOptions() {
  const { state } = useRecurrence()

  const handleExport = (format: "json" | "csv" | "ical") => {
    exportRecurringDates(state, format)
  }

  const isDisabled = !state.startDate || state.previewDates.length === 0

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium flex items-center gap-1">
        <Download className="h-3 w-3" />
        Export Dates
      </Label>
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleExport("json")}
          disabled={isDisabled}
          className="flex flex-col items-center gap-1 h-auto p-2"
        >
          <FileText className="h-4 w-4" />
          <span className="text-xs">JSON</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleExport("csv")}
          disabled={isDisabled}
          className="flex flex-col items-center gap-1 h-auto p-2"
        >
          <Table className="h-4 w-4" />
          <span className="text-xs">CSV</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleExport("ical")}
          disabled={isDisabled}
          className="flex flex-col items-center gap-1 h-auto p-2"
        >
          <Calendar className="h-4 w-4" />
          <span className="text-xs">iCal</span>
        </Button>
      </div>
    </div>
  )
}
