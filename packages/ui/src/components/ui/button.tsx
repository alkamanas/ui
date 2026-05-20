import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { GlassElementLayers } from "@/components/surfaces/liquid-glass-filter"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "alka-button-control inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border border-transparent bg-primary text-primary-foreground shadow",
        flat: "border border-transparent bg-primary text-primary-foreground shadow",
        solid: "border border-transparent bg-primary text-primary-foreground shadow",
        glass:
          "alka-liquid-glass text-foreground",
        glassPrimary:
          "alka-liquid-glass text-primary",
        glassSecondary:
          "alka-liquid-glass text-muted-foreground",
        glassDestructive:
          "alka-liquid-glass text-destructive",
        destructive:
          "border border-transparent bg-destructive text-destructive-foreground shadow-sm",
        outline:
          "border border-border/70 text-foreground",
        secondary:
          "border border-border/70 bg-background/35 text-foreground shadow-sm backdrop-blur-xl",
        ghost: "border border-transparent bg-transparent text-foreground",
        link: "border border-transparent bg-transparent text-primary underline-offset-4",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-10 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "flat",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, asChild = false, ...props }, ref) => {
    const buttonClassName = cn(buttonVariants({ variant, size, className }))
    const resolvedSize = size ?? "default"
    const childArray = React.Children.toArray(children)
    const isTextOnlyIcon =
      resolvedSize === "icon" && childArray.length === 1 && typeof childArray[0] === "string"
    const isLiquidGlass =
      !asChild &&
      (variant === "glass" ||
        variant === "glassPrimary" ||
        variant === "glassSecondary" ||
        variant === "glassDestructive" ||
        variant === "outline")
    const content = (
      <span
        className={cn(
          "alka-button-content relative z-[2] inline-flex items-center justify-center gap-2 text-center",
          resolvedSize === "icon" && "alka-button-icon-content h-full w-full",
        )}
        data-text-icon={isTextOnlyIcon ? "true" : undefined}
      >
        {children}
      </span>
    )

    if (asChild) {
      return (
        <Slot
          className={buttonClassName}
          data-variant={variant ?? "flat"}
          data-size={size ?? "default"}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        className={buttonClassName}
        data-glass-effect={isLiquidGlass ? "blurry" : undefined}
        data-variant={variant ?? "flat"}
        data-size={size ?? "default"}
        ref={ref}
        {...props}
      >
        {isLiquidGlass && <GlassElementLayers effect="blurry" />}
        {content}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
