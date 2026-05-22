import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons"
import { DayPicker, DayFlag, SelectionState, UI, type ChevronProps, type DayPickerProps } from "react-day-picker"

import { cn } from "@/lib/utils"

function CalendarChevron({ className, orientation, ...props }: ChevronProps) {
  const Icon =
    orientation === "left"
      ? ChevronLeftIcon
      : orientation === "right"
        ? ChevronRightIcon
        : orientation === "up"
          ? ChevronUpIcon
          : ChevronDownIcon

  return <Icon aria-hidden="true" className={cn("h-4 w-4", className)} {...props} />
}

function Calendar({
  className,
  classNames,
  components,
  showOutsideDays = true,
  ...props
}: DayPickerProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("alka-calendar", className)}
      classNames={{
        [UI.Root]: "alka-calendar-root",
        [UI.Months]: "alka-calendar-months flex flex-col gap-4 sm:flex-row",
        [UI.Month]: "alka-calendar-month grid gap-3",
        [UI.MonthCaption]: "alka-calendar-caption relative flex h-9 items-center justify-center px-10",
        [UI.CaptionLabel]: "alka-calendar-caption-label text-sm font-semibold text-foreground",
        [UI.Nav]: "alka-calendar-nav absolute inset-x-0 top-0 flex h-9 items-center justify-between",
        [UI.PreviousMonthButton]:
          "alka-calendar-nav-button inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/35 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-40",
        [UI.NextMonthButton]:
          "alka-calendar-nav-button inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/35 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-40",
        [UI.MonthGrid]: "alka-calendar-grid w-full border-collapse",
        [UI.Weekdays]: "alka-calendar-weekdays flex",
        [UI.Weekday]: "alka-calendar-weekday flex h-8 w-10 items-center justify-center text-[0.72rem] font-medium text-muted-foreground",
        [UI.Weeks]: "alka-calendar-weeks grid gap-1",
        [UI.Week]: "alka-calendar-week flex w-full gap-1",
        [UI.Day]: "alka-calendar-day relative h-10 w-10 p-0 text-center text-sm",
        [UI.DayButton]:
          "alka-calendar-day-button inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none",
        [DayFlag.today]: "alka-calendar-day-today",
        [DayFlag.outside]: "alka-calendar-day-outside",
        [DayFlag.disabled]: "alka-calendar-day-disabled",
        [SelectionState.selected]: "alka-calendar-day-selected",
        [SelectionState.range_start]: "alka-calendar-day-range-start",
        [SelectionState.range_middle]: "alka-calendar-day-range-middle",
        [SelectionState.range_end]: "alka-calendar-day-range-end",
        ...classNames,
      }}
      components={{
        Chevron: CalendarChevron,
        ...components,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
export type { DayPickerProps as CalendarProps }
