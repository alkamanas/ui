import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "group/radio peer m-0 grid size-6 shrink-0 cursor-pointer appearance-none place-items-center rounded-full border-2 border-solid border-muted-foreground/50 bg-transparent p-0 text-primary shadow-none transition-[border-color,box-shadow,color,transform] duration-500 ease-[var(--alka-ease-smooth)] hover:border-primary/70 hover:shadow-[0_0_0_6px_hsl(var(--primary)_/_0.045)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        forceMount
        className="m-0 grid size-full place-items-center rounded-full p-0 text-current opacity-0 transition-[opacity,transform] duration-500 ease-[var(--alka-ease-smooth)] data-[state=checked]:scale-100 data-[state=checked]:opacity-100 data-[state=unchecked]:scale-[0.45] data-[state=unchecked]:opacity-0"
      >
        <span className="block size-3 rounded-full bg-current shadow-[0_0_14px_hsl(var(--primary)_/_0.24)] transition-transform duration-500 ease-[var(--alka-ease-smooth)] group-data-[state=checked]/radio:scale-100 group-data-[state=unchecked]/radio:scale-50" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
