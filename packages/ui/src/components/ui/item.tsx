import * as React from "react"

import { GlassElementLayers } from "@/components/surfaces/liquid-glass-filter"
import type { BorderAnimationColor } from "@/lib/border-animation"
import { cn } from "@/lib/utils"

export type ItemProps = React.HTMLAttributes<HTMLDivElement> & {
  surface?: "solid" | "glass"
  borderAnimation?: boolean
  borderAnimationColor?: BorderAnimationColor
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ children, className, surface = "solid", borderAnimation = false, borderAnimationColor, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "alka-item-surface group/item flex items-center gap-4 rounded-3xl border border-border/70 p-5 text-card-foreground shadow-[var(--alka-shadow-control)] transition-[--alka-button-angle,border-color,background-color,box-shadow,transform] duration-500 ease-[var(--alka-ease-smooth)]",
        surface === "glass" ? "alka-liquid-glass" : "bg-card/72",
        className,
      )}
      data-surface={surface}
      data-border-animation={borderAnimation ? "true" : undefined}
      data-border-animation-color={borderAnimationColor}
      {...props}
    >
      {surface === "glass" && <GlassElementLayers />}
      <span aria-hidden="true" className="alka-item-border" />
      {children}
    </div>
  ),
)
Item.displayName = "Item"

const ItemMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid size-10 shrink-0 place-items-center rounded-2xl bg-muted text-muted-foreground", className)}
      {...props}
    />
  ),
)
ItemMedia.displayName = "ItemMedia"

const ItemContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("min-w-0 flex-1", className)} {...props} />,
)
ItemContent.displayName = "ItemContent"

const ItemTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("alka-item-title truncate text-sm font-semibold", className)} {...props} />
  ),
)
ItemTitle.displayName = "ItemTitle"

const ItemDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("alka-item-description truncate text-sm text-muted-foreground", className)} {...props} />
  ),
)
ItemDescription.displayName = "ItemDescription"

const ItemActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ml-auto flex items-center gap-2", className)} {...props} />
  ),
)
ItemActions.displayName = "ItemActions"

export { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions }
