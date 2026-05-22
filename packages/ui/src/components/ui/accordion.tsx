"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

type AccordionContextValue = {
  type: "single" | "multiple"
  value: string[]
  collapsible: boolean
  setItemOpen: (value: string, open: boolean) => void
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

export type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "single" | "multiple"
  value?: string | string[]
  defaultValue?: string | string[]
  collapsible?: boolean
  onValueChange?: (value: string | string[]) => void
}

function normalizeValue(value?: string | string[]) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      type = "single",
      value,
      defaultValue,
      collapsible = true,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(() => normalizeValue(defaultValue))
    const currentValue = value === undefined ? internalValue : normalizeValue(value)

    const setItemOpen = React.useCallback(
      (itemValue: string, open: boolean) => {
        let nextValue: string[]

        if (type === "single") {
          if (open) {
            nextValue = [itemValue]
          } else {
            nextValue = collapsible ? [] : currentValue
          }
        } else {
          const nextSet = new Set(currentValue)
          if (open) nextSet.add(itemValue)
          else nextSet.delete(itemValue)
          nextValue = Array.from(nextSet)
        }

        if (value === undefined) setInternalValue(nextValue)
        onValueChange?.(type === "single" ? nextValue[0] ?? "" : nextValue)
      },
      [collapsible, currentValue, onValueChange, type, value],
    )

    return (
      <AccordionContext.Provider value={{ type, value: currentValue, collapsible, setItemOpen }}>
        <div
          ref={ref}
          className={cn("alka-accordion-controls w-full", className)}
          {...props}
        />
      </AccordionContext.Provider>
    )
  },
)
Accordion.displayName = "Accordion"

type AccordionItemContextValue = {
  value: string
  open: boolean
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null)

export type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, ...props }, ref) => {
    const accordion = React.useContext(AccordionContext)
    const open = accordion?.value.includes(value) ?? false

    return (
      <AccordionItemContext.Provider value={{ value, open }}>
        <div
          ref={ref}
          data-state={open ? "open" : "closed"}
          className={cn(
            "alka-accordion-item group/accordion-item",
            className
          )}
          {...props}
        />
      </AccordionItemContext.Provider>
    )
  },
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const accordion = React.useContext(AccordionContext)
  const item = React.useContext(AccordionItemContext)

  return (
    <button
      ref={ref}
      type="button"
      data-state={item?.open ? "open" : "closed"}
      className={cn(
        "alka-accordion-trigger",
        className,
      )}
      onClick={(event) => {
        props.onClick?.(event)
        if (event.defaultPrevented || !accordion || !item) return
        accordion.setItemOpen(item.value, !item.open)
      }}
      {...props}
    >
      <span className="alka-accordion-trigger-label">{children}</span>
      <span
        aria-hidden="true"
        className="alka-accordion-trigger-icon"
      >
        <Plus className="size-4" />
      </span>
    </button>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const item = React.useContext(AccordionItemContext)

  return (
    <div
      ref={ref}
      data-state={item?.open ? "open" : "closed"}
      className={cn(
        "alka-accordion-content",
        className,
      )}
      {...props}
    >
      <div className="alka-accordion-content-mask">
        <div className="alka-accordion-content-inner">{children}</div>
      </div>
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
