import * as React from "react"

import { cn } from "@/lib/utils"

const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex min-h-12 items-center overflow-hidden rounded-[1.15rem] border border-border/72 bg-background/76 shadow-[0_10px_28px_hsl(var(--alka-shadow-color)_/_0.14)] transition-[border-color,box-shadow] duration-500 ease-[var(--alka-ease-smooth)] focus-within:border-primary/35 focus-within:shadow-[0_0_0_4px_hsl(var(--primary)_/_0.065),0_18px_42px_hsl(var(--alka-shadow-color)_/_0.22)]",
        className,
      )}
      {...props}
    />
  ),
)
InputGroup.displayName = "InputGroup"

const InputGroupAddon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex h-full items-center px-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  ),
)
InputGroupAddon.displayName = "InputGroupAddon"

const InputGroupInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 min-w-0 flex-1 bg-transparent px-1 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
)
InputGroupInput.displayName = "InputGroupInput"

export { InputGroup, InputGroupAddon, InputGroupInput }
