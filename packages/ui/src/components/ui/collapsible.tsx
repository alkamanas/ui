"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

import { cn } from "@/lib/utils"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, forceMount = true, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    forceMount={forceMount}
    className={cn(
      "grid overflow-hidden transition-[grid-template-rows,opacity,transform] duration-[620ms] ease-[var(--alka-ease-smooth)] data-[state=closed]:grid-rows-[0fr] data-[state=closed]:opacity-0 data-[state=closed]:-translate-y-1 data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100 data-[state=open]:translate-y-0",
      className
    )}
    {...props}
  >
    <div className="min-h-0">{children}</div>
  </CollapsiblePrimitive.Content>
))
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
