import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { GlassElementLayers } from "@/components/surfaces/liquid-glass-filter"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "relative overflow-hidden rounded-[var(--alka-radius-panel-lg)] border text-card-foreground transition-shadow duration-300 alka-glass-highlight",
  {
    variants: {
      variant: {
        default:
          "alka-card-surface alka-liquid-glass border-[hsl(var(--alka-panel-border))] shadow-[var(--alka-shadow-panel)]",
        soft:
          "alka-card-surface alka-liquid-glass border-border/70 shadow-[var(--alka-shadow-control)]",
        solid:
          "border-border bg-card shadow-[var(--alka-shadow-control)] after:hidden",
        outline:
          "border-border bg-transparent shadow-none after:hidden",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ children, className, variant, ...props }, ref) => {
  const useLiquidGlass = variant == null || variant === "default" || variant === "soft"

  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    >
      {useLiquidGlass ? <GlassElementLayers /> : null}
      {children}
    </div>
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("alka-card-header flex flex-col p-7", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("alka-card-title text-2xl font-semibold", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("alka-card-description text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("alka-card-content p-7 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-7 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
