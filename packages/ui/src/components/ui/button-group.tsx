import * as React from "react"

import { GlassElementLayers } from "@/components/surfaces/liquid-glass-filter"
import { cn } from "@/lib/utils"

type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "default" | "lg"
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, size = "default", ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      data-glass-effect="blurry"
      data-size={size}
      className={cn(
        "alka-button-group alka-liquid-glass inline-flex items-center rounded-full",
        className,
      )}
      {...props}
    >
      <GlassElementLayers effect="blurry" />
      {children}
    </div>
  ),
)
ButtonGroup.displayName = "ButtonGroup"

const ButtonGroupSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} aria-hidden="true" className={cn("alka-button-group-separator mx-1 w-px", className)} {...props} />
  ),
)
ButtonGroupSeparator.displayName = "ButtonGroupSeparator"

export { ButtonGroup, ButtonGroupSeparator }
