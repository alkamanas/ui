import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { GlassElementLayers } from "@/components/surfaces/liquid-glass-filter"
import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    glass?: boolean
  }
>(({ children, className, align = "center", glass = true, sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 origin-[--radix-popover-content-transform-origin] rounded-3xl border border-border/70 p-4 text-popover-foreground shadow-[0_18px_54px_hsl(var(--alka-shadow-color)_/_0.28)] outline-none transition-[opacity,transform] duration-[520ms] ease-[var(--alka-ease-smooth)] data-[state=closed]:scale-[0.97] data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
        glass && "alka-popover-content alka-liquid-glass",
        className
      )}
      {...props}
    >
      {glass && <GlassElementLayers />}
      {children}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
