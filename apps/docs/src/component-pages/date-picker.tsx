import { DatePicker } from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Date Picker composes Button, Popover and Calendar into a single-date field for forms, filters and scheduling surfaces.",
  "examples": [
    {
      "id": "date-picker-default",
      "title": "Date picker",
      "description": "The trigger uses the flat secondary control language and opens a glass popover calendar.",
      "preview": <DatePicker defaultValue={new Date(2026, 4, 20)} />,
      "code": `"use client";

import { DatePicker } from "@alkamanas/ui";

export function DatePickerExample() {
  return <DatePicker defaultValue={new Date(2026, 4, 20)} />;
}`
    },
    {
      "id": "date-picker-placeholder",
      "title": "Placeholder",
      "description": "Use placeholder for empty form states and pass calendarProps through when the calendar needs constraints.",
      "preview": (
        <DatePicker
          placeholder="Select launch date"
          calendarProps={{
            disabled: { before: new Date(2026, 4, 1) },
            defaultMonth: new Date(2026, 4, 1),
          }}
        />
      ),
      "code": `"use client";

import { DatePicker } from "@alkamanas/ui";

export function DatePickerPlaceholderExample() {
  return (
    <DatePicker
      placeholder="Select launch date"
      calendarProps={{
        disabled: { before: new Date(2026, 4, 1) },
        defaultMonth: new Date(2026, 4, 1),
      }}
    />
  );
}`
    }
  ],
  "anatomy": [
    "Import DatePicker from @alkamanas/ui.",
    "The trigger is a Button variant=\"secondary\" and accepts className on the visible root.",
    "The calendar is rendered inside PopoverContent and receives calendarProps for DayPicker configuration."
  ],
  "variants": [
    {
      "name": "default",
      "description": "Single-date picker with uncontrolled defaultValue or controlled value/onValueChange."
    }
  ],
  "props": [
    {
      "name": "value / defaultValue",
      "type": "Date",
      "description": "Use value for controlled forms or defaultValue for local picker state."
    },
    {
      "name": "onValueChange",
      "type": "(date: Date | undefined) => void",
      "description": "Called when a date is selected from the calendar."
    },
    {
      "name": "calendarProps",
      "type": "CalendarProps",
      "description": "Passed through to the inner Calendar except mode, selected and onSelect."
    },
    {
      "name": "formatDate",
      "type": "(date: Date) => string",
      "description": "Overrides the trigger label formatting."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Merged onto the visible trigger button."
    }
  ],
  "accessibility": [
    "The trigger is a real button and the popup calendar preserves DayPicker keyboard behavior.",
    "Use nearby Label text in forms where the placeholder alone is not a persistent label."
  ],
  "motion": [
    "Popover open and close motion follows the shared Popover surface timing."
  ],
  "tokens": [
    "--alka-ease-smooth",
    "--alka-panel-bg",
    "--primary",
    "--muted"
  ]
};

export function DatePickerPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
