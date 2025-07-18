"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"

interface SimplePopoverProps {
  trigger: ReactNode
  content: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SimplePopover({ trigger, content, open: controlledOpen, onOpenChange }: SimplePopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, setOpen])

  return (
    <div className="relative">
      <div ref={triggerRef} onClick={() => setOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-md shadow-lg"
          style={{ minWidth: "200px" }}
        >
          {content}
        </div>
      )}
    </div>
  )
}
