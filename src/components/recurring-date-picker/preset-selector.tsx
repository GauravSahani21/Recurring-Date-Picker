"use client"

import { useRecurrence } from "@/contexts/recurring-date-context"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PRESET_PATTERNS } from "@/data/presets"

export function PresetSelector() {
  const { state, dispatch } = useRecurrence()

  const handlePresetSelect = (presetId: string) => {
    const preset = PRESET_PATTERNS.find((p) => p.id === presetId)
    if (preset) {
      dispatch({ type: "APPLY_PRESET", payload: { ...preset.config, preset: presetId } })
    }
  }

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Quick Presets</Label>
      <div className="grid grid-cols-2 gap-2">
        {PRESET_PATTERNS.map((preset) => (
          <Button
            key={preset.id}
            variant={state.preset === preset.id ? "default" : "outline"}
            size="sm"
            onClick={() => handlePresetSelect(preset.id)}
            className="h-auto p-3 flex flex-col items-start gap-1"
          >
            <div className="flex items-center gap-2 w-full">
              <span className="text-base">{preset.icon}</span>
              <span className="font-medium text-xs">{preset.name}</span>
            </div>
            <span className="text-xs text-muted-foreground text-left">{preset.description}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
