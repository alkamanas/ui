import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { LiquidGlassFilter } from "@/components/surfaces/liquid-glass-filter"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "alka-switch-track peer inline-flex h-9 w-[5.125rem] shrink-0 cursor-pointer items-center rounded-full border border-white/10 p-1 shadow-sm transition-[background-color,border-color,box-shadow] duration-500 ease-[var(--alka-ease-smooth)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary/28 data-[state=unchecked]:border-white/10",
      className
    )}
    {...props}
    ref={ref}
  >
    <LiquidGlassFilter />
    <SwitchPrimitives.Thumb
      className={cn(
        "alka-switch-thumb alka-liquid-glass pointer-events-none relative z-10 block h-7 w-10 rounded-full border border-white/14 ring-0 transition-[transform,box-shadow,opacity] duration-500 ease-[var(--alka-ease-smooth)]"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
