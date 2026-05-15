"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

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
        <div ref={ref} className={cn("w-full space-y-3", className)} {...props} />
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
            "group/accordion-item overflow-hidden rounded-[1.35rem] border border-border/70 bg-card/62 px-5 shadow-[var(--alka-shadow-control)] transition-[background-color,border-color,box-shadow] duration-500 ease-[var(--alka-ease-smooth)] data-[state=open]:border-primary/22 data-[state=open]:bg-card/86 data-[state=open]:shadow-[var(--alka-shadow-panel)]",
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
        "flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-[1.05rem] font-semibold text-foreground outline-none transition-colors duration-500 ease-[var(--alka-ease-smooth)] hover:text-primary focus-visible:text-primary disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={(event) => {
        props.onClick?.(event)
        if (event.defaultPrevented || !accordion || !item) return
        accordion.setItemOpen(item.value, !item.open)
      }}
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="relative grid size-8 shrink-0 place-items-center rounded-full bg-muted/70 text-muted-foreground transition-[background-color,color,transform] duration-500 ease-[var(--alka-ease-smooth)] group-data-[state=open]/accordion-item:rotate-180 group-data-[state=open]/accordion-item:bg-primary/12 group-data-[state=open]/accordion-item:text-primary"
      >
        <ChevronDown className="size-4" />
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
        "grid overflow-hidden text-[0.95rem] leading-7 text-muted-foreground transition-[grid-template-rows,opacity,transform] duration-[720ms] ease-[var(--alka-ease-smooth)] data-[state=closed]:grid-rows-[0fr] data-[state=closed]:opacity-0 data-[state=closed]:-translate-y-1 data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100 data-[state=open]:translate-y-0",
        className,
      )}
      {...props}
    >
      <div className="min-h-0 pb-5">{children}</div>
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
