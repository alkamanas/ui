import { Calendar } from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const singleDate = new Date(2026, 4, 20);
const rangeStart = new Date(2026, 4, 12);
const rangeEnd = new Date(2026, 4, 18);

const details: ComponentPageDetails = {
  "summary": "Calendar is a date selection primitive built on React DayPicker and styled with Alkamanas token-driven selection, hover and range states.",
  "examples": [
    {
      "id": "calendar-single",
      "title": "Single date",
      "description": "Use mode=\"single\" for a focused date selection surface.",
      "preview": <Calendar mode="single" selected={singleDate} defaultMonth={singleDate} />,
      "code": `"use client";

import * as React from "react";
import { Calendar } from "@alkamanas/ui";

export function CalendarSingleExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 4, 20));

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={date}
    />
  );
}`
    },
    {
      "id": "calendar-range",
      "title": "Range calendar",
      "description": "Use mode=\"range\" for booking, reporting and filtering flows that need a bounded interval.",
      "preview": (
        <Calendar
          mode="range"
          selected={{ from: rangeStart, to: rangeEnd }}
          defaultMonth={rangeStart}
          numberOfMonths={2}
        />
      ),
      "code": `"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";
import { Calendar } from "@alkamanas/ui";

export function CalendarRangeExample() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 4, 12),
    to: new Date(2026, 4, 18),
  });

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      defaultMonth={range?.from}
      numberOfMonths={2}
    />
  );
}`
    }
  ],
  "anatomy": [
    "Import Calendar from @alkamanas/ui.",
    "Calendar wraps React DayPicker and forwards DayPicker props for modes, selection, disabled dates, locale and month navigation.",
    "Selection states use shared primary, foreground, muted and radius tokens so light and dark sections can coexist."
  ],
  "variants": [
    {
      "name": "single",
      "description": "One selected date with primary selected state and today ring."
    },
    {
      "name": "range",
      "description": "Start, middle and end dates receive distinct range treatments while keeping the same day button geometry."
    }
  ],
  "sizes": [
    {
      "name": "cell",
      "description": "Default day cells are 2.5rem square and can be adjusted through className when needed."
    }
  ],
  "props": [
    {
      "name": "mode",
      "type": "single | multiple | range",
      "description": "Passed through to React DayPicker to choose the selection model."
    },
    {
      "name": "selected / onSelect",
      "type": "DayPicker selection props",
      "description": "Use controlled selection for app forms and filters."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Merged onto the visible calendar root."
    }
  ],
  "accessibility": [
    "Calendar keeps React DayPicker grid, button and keyboard semantics.",
    "Use visible form labels around composed DatePicker fields when the trigger text is not enough."
  ],
  "motion": [
    "Hover and focus states use tokenized color transitions without shifting cell layout."
  ],
  "tokens": [
    "--alka-radius-pill",
    "--primary",
    "--primary-foreground",
    "--muted"
  ]
};

export function CalendarPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
