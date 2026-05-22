import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { GlassElementLayers } from "@/components/surfaces/liquid-glass-filter"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "alka-switch-track peer inline-flex h-8 w-[4.5rem] shrink-0 cursor-pointer items-center rounded-full border border-border/70 p-1 shadow-sm transition-[background-color,border-color,box-shadow] duration-500 ease-[var(--alka-ease-smooth)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary/28 data-[state=unchecked]:border-border/70",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "alka-switch-thumb alka-liquid-glass pointer-events-none relative z-10 block h-6 w-9 rounded-full ring-0 transition-[transform,box-shadow,opacity] duration-500 ease-[var(--alka-ease-smooth)]"
      )}
      data-glass-effect="blurry"
    >
      <GlassElementLayers effect="blurry" />
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
