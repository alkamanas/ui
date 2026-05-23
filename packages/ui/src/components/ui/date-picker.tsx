import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"

import { GlassElementLayers } from "@/components/surfaces/liquid-glass-filter"
import { Calendar, type CalendarProps } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type DatePickerSize = "default" | "lg" | "sm"
type DatePickerSurface = "bare" | "flat" | "glass" | "gradient"

type DatePickerProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "defaultValue" | "onChange" | "value"> & {
  align?: "center" | "end" | "start"
  calendarProps?: Omit<CalendarProps, "mode" | "onSelect" | "selected">
  defaultValue?: Date
  formatDate?: (date: Date) => string
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  size?: DatePickerSize
  surface?: DatePickerSurface
  value?: Date
}

const datePickerCloseTimeout = 620

const datePickerSizeClasses: Record<DatePickerSize, string> = {
  default: "h-[3.125rem] px-5 text-sm",
  sm: "h-10 px-4 text-xs",
  lg: "h-12 px-6 text-base",
}

const defaultDateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      align = "center",
      calendarProps,
      className,
      defaultValue,
      disabled,
      formatDate,
      onValueChange,
      placeholder = "Pick a date",
      size = "default",
      surface = "flat",
      value,
      ...props
    },
    ref
  ) => {
    const {
      defaultMonth: calendarDefaultMonth,
      month: calendarMonth,
      onMonthChange: onCalendarMonthChange,
      ...restCalendarProps
    } = calendarProps ?? {}
    const [open, setOpen] = React.useState(false)
    const [closing, setClosing] = React.useState(false)
    const closeTimeoutRef = React.useRef<number | undefined>(undefined)
    const triggerRef = React.useRef<HTMLButtonElement | null>(null)
    const calendarFrameRef = React.useRef<HTMLDivElement | null>(null)
    const calendarContentRef = React.useRef<HTMLDivElement | null>(null)
    const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue)
    const selectedDate = value ?? internalValue
    const [visibleMonth, setVisibleMonth] = React.useState<Date | undefined>(selectedDate ?? calendarDefaultMonth)
    const [calendarHeight, setCalendarHeight] = React.useState<number | undefined>(undefined)
    const label = selectedDate ? (formatDate ?? defaultDateFormatter.format)(selectedDate) : placeholder
    const popoverOpen = open || closing
    const resolvedCalendarMonth = calendarMonth ?? visibleMonth ?? selectedDate ?? calendarDefaultMonth

    const measureCalendarHeight = React.useCallback(() => {
      const calendarContent = calendarContentRef.current
      const calendarFrame = calendarFrameRef.current
      if (!calendarContent) return

      const nextHeight = calendarContent.getBoundingClientRect().height
      if (calendarFrame) calendarFrame.style.height = `${nextHeight}px`
      setCalendarHeight(nextHeight)
    }, [])

    const setCalendarContentNode = React.useCallback(
      (node: HTMLDivElement | null) => {
        calendarContentRef.current = node
        if (!node) return

        window.requestAnimationFrame(measureCalendarHeight)
      },
      [measureCalendarHeight]
    )

    React.useEffect(() => {
      return () => {
        if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
      }
    }, [])

    React.useEffect(() => {
      if (calendarMonth !== undefined || selectedDate === undefined) return
      setVisibleMonth(selectedDate)
    }, [calendarMonth, selectedDate])

    React.useLayoutEffect(() => {
      const calendarContent = calendarContentRef.current
      if (!popoverOpen || !calendarContent) {
        setCalendarHeight(undefined)
        return
      }

      measureCalendarHeight()
      const frame = window.requestAnimationFrame(measureCalendarHeight)
      const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measureCalendarHeight)
      observer?.observe(calendarContent)

      return () => {
        window.cancelAnimationFrame(frame)
        observer?.disconnect()
      }
    }, [measureCalendarHeight, popoverOpen, resolvedCalendarMonth])

    const closeDatePicker = React.useCallback(() => {
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)

      if (!open && !closing) return

      setOpen(false)
      setClosing(true)
      requestAnimationFrame(() => triggerRef.current?.blur())
      closeTimeoutRef.current = window.setTimeout(() => setClosing(false), datePickerCloseTimeout)
    }, [closing, open])

    const handleOpenChange = (nextOpen: boolean) => {
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)

      if (nextOpen) {
        if (calendarMonth === undefined) setVisibleMonth(selectedDate ?? calendarDefaultMonth)
        setClosing(false)
        setOpen(true)
        return
      }

      closeDatePicker()
    }

    const handleCalendarMonthChange = React.useCallback(
      (nextMonth: Date) => {
        if (calendarMonth === undefined) setVisibleMonth(nextMonth)
        onCalendarMonthChange?.(nextMonth)
      },
      [calendarMonth, onCalendarMonthChange]
    )

    return (
      <Popover open={popoverOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button
            ref={(node) => {
              triggerRef.current = node
              if (typeof ref === "function") {
                ref(node)
              } else if (ref) {
                ref.current = node
              }
            }}
            type="button"
            disabled={disabled}
            aria-expanded={popoverOpen}
            data-closing={closing ? "true" : undefined}
            data-size={size}
            data-state={popoverOpen ? "open" : "closed"}
            data-surface={surface}
            data-variant="outline"
            onClick={(event) => {
              if (!open && !closing) return

              event.preventDefault()
              closeDatePicker()
            }}
            className={cn(
              "alka-button-control alka-combobox-trigger flex w-[17rem] cursor-pointer items-center whitespace-nowrap rounded-full border border-input bg-transparent py-0 font-medium text-foreground shadow-sm ring-offset-background transition-[border-color,box-shadow,color] duration-500 ease-[var(--alka-ease-smooth)] hover:text-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              surface === "glass" && "alka-liquid-glass",
              datePickerSizeClasses[size],
              !selectedDate && "text-muted-foreground",
              className
            )}
            {...props}
          >
            {surface === "glass" ? <GlassElementLayers /> : null}
            <span className="relative z-10 min-w-0 flex-1 truncate text-left">{label}</span>
            <CalendarIcon aria-hidden="true" className="relative z-10 ml-3 h-4 w-4 shrink-0 opacity-60" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align={align}
          glass={false}
          sideOffset={8}
          data-closing={closing ? "true" : undefined}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            triggerRef.current?.blur()
          }}
          className="alka-select-content alka-liquid-glass w-auto overflow-hidden rounded-3xl p-3"
        >
          <GlassElementLayers />
          <div
            ref={calendarFrameRef}
            className="relative z-10 overflow-hidden transition-[height] duration-300 ease-[var(--alka-ease-smooth)] motion-reduce:transition-none"
            style={calendarHeight === undefined ? undefined : { height: `${calendarHeight}px` }}
          >
            <div ref={setCalendarContentNode}>
              <Calendar
                mode="single"
                selected={selectedDate}
                month={resolvedCalendarMonth}
                defaultMonth={selectedDate ?? calendarDefaultMonth}
                onMonthChange={handleCalendarMonthChange}
                onSelect={(nextDate) => {
                  if (value === undefined) setInternalValue(nextDate)
                  if (calendarMonth === undefined) setVisibleMonth(nextDate ?? calendarDefaultMonth)
                  onValueChange?.(nextDate)
                  closeDatePicker()
                }}
                {...restCalendarProps}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)
DatePicker.displayName = "DatePicker"

export { DatePicker }
export type { DatePickerProps, DatePickerSize, DatePickerSurface }
