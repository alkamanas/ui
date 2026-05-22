import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Calendar, type CalendarProps } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type DatePickerProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "defaultValue" | "onChange" | "value"> & {
  align?: "center" | "end" | "start"
  calendarProps?: Omit<CalendarProps, "mode" | "onSelect" | "selected">
  defaultValue?: Date
  formatDate?: (date: Date) => string
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  value?: Date
}

const defaultDateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      align = "start",
      calendarProps,
      className,
      defaultValue,
      disabled,
      formatDate,
      onValueChange,
      placeholder = "Pick a date",
      value,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue)
    const selectedDate = value ?? internalValue
    const label = selectedDate ? (formatDate ?? defaultDateFormatter.format)(selectedDate) : placeholder

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            type="button"
            variant="secondary"
            disabled={disabled}
            className={cn(
              "w-[17rem] justify-between px-4 text-left font-medium",
              !selectedDate && "text-muted-foreground",
              className
            )}
            {...props}
          >
            <span className="truncate">{label}</span>
            <CalendarIcon aria-hidden="true" className="h-4 w-4 opacity-70" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align={align} className="w-auto p-3">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(nextDate) => {
              if (value === undefined) setInternalValue(nextDate)
              onValueChange?.(nextDate)
              setOpen(false)
            }}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    )
  }
)
DatePicker.displayName = "DatePicker"

export { DatePicker }
export type { DatePickerProps }
