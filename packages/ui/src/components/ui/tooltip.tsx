import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { GlassElementLayers } from "@/components/surfaces/liquid-glass-filter"
import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ children, className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "alka-tooltip-content alka-liquid-glass z-50 origin-[--radix-tooltip-content-transform-origin] overflow-hidden rounded-2xl border border-white/10 px-3.5 py-2 text-xs font-medium text-popover-foreground shadow-[0_12px_34px_hsl(var(--alka-shadow-color)_/_0.22)] transition-[opacity,transform] duration-300 ease-[var(--alka-ease-smooth)] data-[state=closed]:scale-[0.98] data-[state=closed]:opacity-0 data-[state=delayed-open]:scale-100 data-[state=delayed-open]:opacity-100 data-[state=instant-open]:scale-100 data-[state=instant-open]:opacity-100",
        className
      )}
      {...props}
    >
      <GlassElementLayers />
      {children}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
