"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

import { cn } from "@/lib/utils"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    className={cn("alka-collapsible-trigger", className)}
    {...props}
  />
))
CollapsibleTrigger.displayName = CollapsiblePrimitive.CollapsibleTrigger.displayName

export type CollapsibleContentProps = React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> & {
  containerClassName?: string
}

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  CollapsibleContentProps
>(({ className, children, containerClassName, forceMount = true, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    forceMount={forceMount}
    className={cn(
      "alka-collapsible-content grid overflow-hidden transition-[grid-template-rows] duration-[620ms] ease-[var(--alka-ease-smooth)] data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]",
      containerClassName
    )}
    {...props}
  >
    <div className={cn("alka-collapsible-inner min-h-0", className)}>{children}</div>
  </CollapsiblePrimitive.Content>
))
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
