"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type ToggleGroupContextValue = {
  type: "single" | "multiple"
  value: string[]
  setPressed: (value: string, pressed: boolean) => void
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null)

export type ToggleGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "single" | "multiple"
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

function normalizeToggleValue(value?: string | string[]) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, type = "single", value, defaultValue, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(() => normalizeToggleValue(defaultValue))
    const currentValue = value === undefined ? internalValue : normalizeToggleValue(value)

    const setPressed = (itemValue: string, pressed: boolean) => {
      let nextValue: string[]
      if (type === "single") nextValue = pressed ? [itemValue] : []
      else {
        const nextSet = new Set(currentValue)
        if (pressed) nextSet.add(itemValue)
        else nextSet.delete(itemValue)
        nextValue = Array.from(nextSet)
      }

      if (value === undefined) setInternalValue(nextValue)
      onValueChange?.(type === "single" ? nextValue[0] ?? "" : nextValue)
    }

    return (
      <ToggleGroupContext.Provider value={{ type, value: currentValue, setPressed }}>
        <div
          ref={ref}
          role="group"
          className={cn("inline-flex items-center gap-1 rounded-full bg-muted/70 p-1", className)}
          {...props}
        />
      </ToggleGroupContext.Provider>
    )
  },
)
ToggleGroup.displayName = "ToggleGroup"

export type ToggleGroupItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string
}

const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, value, onClick, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext)
    const pressed = context?.value.includes(value) ?? false

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        data-state={pressed ? "on" : "off"}
        className={cn(
          "inline-flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-medium text-muted-foreground outline-none transition-[background-color,color,box-shadow] duration-500 ease-[var(--alka-ease-smooth)] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-[var(--alka-shadow-control)]",
          className,
        )}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) context?.setPressed(value, !pressed)
        }}
        {...props}
      />
    )
  },
)
ToggleGroupItem.displayName = "ToggleGroupItem"

export { ToggleGroup, ToggleGroupItem }
