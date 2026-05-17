"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LiquidGlassFilter } from "@/components/surfaces/liquid-glass-filter"
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

export type ComboboxProps = {
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  onValueChange?: (value: string) => void
}

function Combobox({
  options,
  value,
  defaultValue,
  placeholder = "Select option",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  className,
  onValueChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [closing, setClosing] = React.useState(false)
  const closeTimeoutRef = React.useRef<number | undefined>(undefined)
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const [hoveredValue, setHoveredValue] = React.useState<string | null>(null)
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
    closeTimeoutRef.current = window.setTimeout(() => setClosing(false), 300)
  }, [closing, open])

  const handleOpenChange = (nextOpen: boolean) => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)

    if (nextOpen) {
      setClosing(false)
      setHoveredValue(null)
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
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          data-closing={closing ? "true" : undefined}
          onClick={(event) => {
            if (!open && !closing) return

            event.preventDefault()
            closeCombobox()
          }}
          className={cn(
            "alka-combobox-trigger h-[3.125rem] w-full justify-between rounded-full bg-background/72 px-5 py-0 font-medium text-foreground shadow-sm transition-[border-color,box-shadow,color] duration-500 ease-[var(--alka-ease-smooth)] hover:bg-background/72 hover:text-foreground data-[state=open]:bg-background/72",
            className
          )}
        >
          <span className={cn(!selectedOption && "text-muted-foreground")}>
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronsUpDown className="size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={8}
        data-closing={closing ? "true" : undefined}
        className="alka-select-content alka-liquid-glass w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-3xl p-2"
      >
        <LiquidGlassFilter />
        <Command glass={false} className="relative z-10 gap-1 rounded-[1.5rem] bg-transparent [&_[cmdk-group]]:grid [&_[cmdk-group]]:gap-1 [&_[cmdk-group]]:p-0 [&_[cmdk-input-wrapper]]:mx-1 [&_[cmdk-input-wrapper]]:mb-2 [&_[cmdk-input-wrapper]]:mt-1 [&_[cmdk-input-wrapper]]:rounded-none [&_[cmdk-input-wrapper]]:border-0 [&_[cmdk-input-wrapper]]:border-b [&_[cmdk-input-wrapper]]:border-white/10 [&_[cmdk-input-wrapper]]:bg-transparent [&_[cmdk-input-wrapper]]:px-4 [&_[cmdk-input-wrapper]]:backdrop-blur-none [&_[cmdk-input]]:h-11">
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
                  style={{
                    backgroundColor:
                      hoveredValue === option.value || selectedValue === option.value
                        ? "hsl(var(--primary))"
                        : "transparent",
                    borderColor: "transparent",
                    boxShadow: "none",
                    color:
                      hoveredValue === option.value || selectedValue === option.value
                        ? "hsl(var(--primary-foreground))"
                        : "hsl(var(--foreground))",
                  }}
                  onMouseEnter={() => setHoveredValue(option.value)}
                  onMouseLeave={() => setHoveredValue(null)}
                  onSelect={() => selectValue(option.value)}
                >
                  {option.label}
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
