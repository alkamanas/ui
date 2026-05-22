"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { GlassElementLayers } from "@/components/surfaces/liquid-glass-filter"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type ComboboxOption = {
  value: string
  label: string
  keywords?: string[]
}

export type ComboboxSize = "default" | "sm" | "lg"

export type ComboboxProps = {
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  surface?: "flat" | "gradient" | "glass" | "bare"
  size?: ComboboxSize
  className?: string
  onValueChange?: (value: string) => void
}

const comboboxSizeClasses: Record<ComboboxSize, string> = {
  default: "h-[3.125rem] px-5 text-sm",
  sm: "h-10 px-4 text-xs",
  lg: "h-12 px-6 text-base",
}

const comboboxCloseTimeout = 620

function Combobox({
  options,
  value,
  defaultValue,
  placeholder = "Select option",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  surface = "flat",
  size = "default",
  className,
  onValueChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [closing, setClosing] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const closeTimeoutRef = React.useRef<number | undefined>(undefined)
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const selectedValue = value ?? internalValue
  const selectedOption = options.find((option) => option.value === selectedValue)
  const popoverOpen = open || closing

  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  const closeCombobox = React.useCallback(() => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)

    if (!open && !closing) return

    setOpen(false)
    setClosing(true)
    requestAnimationFrame(() => triggerRef.current?.blur())
    closeTimeoutRef.current = window.setTimeout(() => setClosing(false), comboboxCloseTimeout)
  }, [closing, open])

  const handleOpenChange = (nextOpen: boolean) => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)

    if (nextOpen) {
      setClosing(false)
      setOpen(true)
      return
    }

    closeCombobox()
  }

  const selectValue = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
    closeCombobox()
  }

  return (
    <Popover open={popoverOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-label={selectedOption?.label ?? placeholder}
          aria-expanded={popoverOpen}
          data-closing={closing ? "true" : undefined}
          data-size={size}
          data-state={popoverOpen ? "open" : "closed"}
          data-surface={surface}
          data-variant="outline"
          onClick={(event) => {
            if (!open && !closing) return

            event.preventDefault()
            closeCombobox()
          }}
          className={cn(
            "alka-button-control alka-combobox-trigger flex w-full cursor-pointer items-center justify-between whitespace-nowrap rounded-full border border-input bg-transparent py-0 font-medium text-foreground shadow-sm ring-offset-background transition-[border-color,box-shadow,color] duration-500 ease-[var(--alka-ease-smooth)] hover:text-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            surface === "glass" && "alka-liquid-glass",
            comboboxSizeClasses[size],
            className
          )}
        >
          {surface === "glass" ? <GlassElementLayers /> : null}
          <span className={cn("min-w-0 truncate whitespace-nowrap", !selectedOption && "text-muted-foreground")}>
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronsUpDown className="size-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        glass={false}
        sideOffset={8}
        data-closing={closing ? "true" : undefined}
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          triggerRef.current?.blur()
        }}
        className="alka-select-content alka-liquid-glass w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-3xl p-2"
      >
        <GlassElementLayers />
        <Command glass={false} className="relative z-10 gap-1 rounded-[1.5rem] bg-transparent [&_[cmdk-group]]:grid [&_[cmdk-group]]:gap-1 [&_[cmdk-group]]:p-0 [&_[cmdk-input-wrapper]]:mx-1 [&_[cmdk-input-wrapper]]:mb-2 [&_[cmdk-input-wrapper]]:mt-1 [&_[cmdk-input-wrapper]]:rounded-none [&_[cmdk-input-wrapper]]:border-0 [&_[cmdk-input-wrapper]]:border-b [&_[cmdk-input-wrapper]]:border-border/70 [&_[cmdk-input-wrapper]]:bg-transparent [&_[cmdk-input-wrapper]]:px-4 [&_[cmdk-input-wrapper]]:backdrop-blur-none [&_[cmdk-input]]:h-11">
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList className="max-h-[18rem]">
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup className="p-0 [&_[cmdk-group-items]]:grid [&_[cmdk-group-items]]:gap-1 [&_[cmdk-group-items]]:px-1">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={[option.value, option.label, ...(option.keywords ?? [])].join(" ")}
                  data-current={selectedValue === option.value ? "true" : undefined}
                  className={cn(
                    "alka-combobox-option min-h-11 cursor-pointer rounded-full border border-transparent bg-transparent py-2.5 pl-4 pr-12 font-medium transition-[background-color,border-color,box-shadow,color] duration-300 ease-[var(--alka-ease-smooth)]"
                  )}
                  onSelect={() => selectValue(option.value)}
                >
                  <span className="min-w-0 truncate whitespace-nowrap">{option.label}</span>
                  <Check className={cn("absolute right-4 size-4", selectedValue === option.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox }
