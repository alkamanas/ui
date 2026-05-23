import { DatePicker } from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Date Picker composes an input-like trigger, Popover and Calendar into a single-date field for forms, filters and scheduling surfaces.",
  "examples": [
    {
      "id": "date-picker-default",
      "title": "Date picker",
      "description": "The trigger uses the same pill border animation and subtle focus gradient as grouped inputs.",
      "preview": <DatePicker defaultValue={new Date(2026, 4, 20)} />,
      "code": `"use client";

import { DatePicker } from "@alkamanas/ui";

export function DatePickerExample() {
  return <DatePicker defaultValue={new Date(2026, 4, 20)} />;
}`
    },
    {
      "id": "date-picker-surfaces",
      "title": "Surfaces",
      "description": "Use gradient or glass surfaces when a date field should follow the surrounding form treatment.",
      "preview": (
        <div className="grid gap-3">
          <DatePicker surface="gradient" defaultValue={new Date(2026, 4, 20)} />
          <DatePicker surface="glass" placeholder="Glass date field" calendarProps={{ defaultMonth: new Date(2026, 4, 1) }} />
        </div>
      ),
      "code": `"use client";

import { DatePicker } from "@alkamanas/ui";

export function DatePickerSurfacesExample() {
  return (
    <div className="grid gap-3">
      <DatePicker surface="gradient" defaultValue={new Date(2026, 4, 20)} />
      <DatePicker
        surface="glass"
        placeholder="Glass date field"
        calendarProps={{ defaultMonth: new Date(2026, 4, 1) }}
      />
    </div>
  );
}`
    },
    {
      "id": "date-picker-sizes",
      "title": "Sizes",
      "description": "Use size to align the date picker with compact or large form rows.",
      "preview": (
        <div className="grid gap-3">
          <DatePicker size="sm" defaultValue={new Date(2026, 4, 20)} />
          <DatePicker size="default" defaultValue={new Date(2026, 4, 20)} />
          <DatePicker size="lg" defaultValue={new Date(2026, 4, 20)} />
        </div>
      ),
      "code": `"use client";

import { DatePicker } from "@alkamanas/ui";

export function DatePickerSizesExample() {
  return (
    <div className="grid gap-3">
      <DatePicker size="sm" defaultValue={new Date(2026, 4, 20)} />
      <DatePicker size="default" defaultValue={new Date(2026, 4, 20)} />
      <DatePicker size="lg" defaultValue={new Date(2026, 4, 20)} />
    </div>
  );
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
    "The trigger is an input-like pill control and accepts className on the visible root.",
    "The calendar icon is aligned to the trailing edge of the trigger.",
    "The calendar is rendered inside the same animated glass popover surface used by select and combobox content."
  ],
  "variants": [
    {
      "name": "surface",
      "description": "Use flat, gradient or glass surfaces to match input and combobox field treatments."
    },
    {
      "name": "size",
      "description": "Use sm, default or lg sizing for dense, standard and expanded form rows."
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
      "name": "size",
      "type": "\"sm\" | \"default\" | \"lg\"",
      "description": "Controls trigger height, padding and text scale."
    },
    {
      "name": "surface",
      "type": "\"flat\" | \"gradient\" | \"glass\" | \"bare\"",
      "description": "Controls the trigger surface and focus treatment."
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
    "The trigger border uses the shared input/combobox focus animation.",
    "The calendar popover opens and closes with the same scale and opacity motion as select and combobox content."
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
