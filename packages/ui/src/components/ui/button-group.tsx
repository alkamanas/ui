import * as React from "react"

import { cn } from "@/lib/utils"

const ButtonGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        "inline-flex items-center rounded-full border border-border/80 bg-background/72 p-1 shadow-[var(--alka-shadow-control)] backdrop-blur-[var(--alka-blur-soft)] [&_.alka-button-control]:rounded-full [&_.alka-button-control]:shadow-none",
        className,
      )}
      {...props}
    />
  ),
)
ButtonGroup.displayName = "ButtonGroup"

const ButtonGroupSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} aria-hidden="true" className={cn("mx-1 h-5 w-px bg-border/80", className)} {...props} />
  ),
)
ButtonGroupSeparator.displayName = "ButtonGroupSeparator"

export { ButtonGroup, ButtonGroupSeparator }
