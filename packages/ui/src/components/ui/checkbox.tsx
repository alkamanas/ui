import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "group/checkbox peer relative m-0 grid size-6 shrink-0 cursor-pointer appearance-none place-items-center overflow-hidden rounded-[0.55rem] border-2 border-solid border-muted-foreground/50 bg-transparent p-0 text-primary shadow-none transition-[border-color,box-shadow,color,transform] duration-500 ease-[var(--alka-ease-smooth)] hover:border-primary/70 hover:shadow-[0_0_0_6px_hsl(var(--primary)_/_0.045)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary",
      className
    )}
    {...props}
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[0.45rem] bg-primary opacity-0 shadow-[0_0_14px_hsl(var(--primary)_/_0.24)] transition-[opacity,transform] duration-500 ease-[var(--alka-ease-smooth)] group-data-[state=checked]/checkbox:scale-100 group-data-[state=checked]/checkbox:opacity-100 group-data-[state=unchecked]/checkbox:scale-[0.45] group-data-[state=unchecked]/checkbox:opacity-0"
    />
    <CheckboxPrimitive.Indicator
      forceMount
      className="relative z-10 m-0 grid size-full place-items-center p-0 text-primary-foreground opacity-0 transition-[opacity,transform] duration-500 ease-[var(--alka-ease-smooth)] data-[state=checked]:scale-100 data-[state=checked]:opacity-100 data-[state=unchecked]:scale-[0.72] data-[state=unchecked]:opacity-0"
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
