import * as React from "react"

import { GlassElementLayers } from "@/components/surfaces/liquid-glass-filter"
import type { BorderAnimationColor } from "@/lib/border-animation"
import { cn } from "@/lib/utils"

export type ItemProps = React.HTMLAttributes<HTMLDivElement> & {
  surface?: "flat" | "glass" | "solid"
  borderAnimation?: boolean
  borderAnimationColor?: BorderAnimationColor
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ children, className, surface = "flat", borderAnimation: _borderAnimation, borderAnimationColor: _borderAnimationColor, ...props }, ref) => {
    const resolvedSurface = surface === "solid" ? "flat" : surface

    return (
      <div
        ref={ref}
        className={cn(
          "alka-item-surface group/item flex items-center gap-4 rounded-3xl border border-border/70 p-5 text-card-foreground shadow-[var(--alka-shadow-control)] transition-[border-color,background-color,box-shadow,transform] duration-500 ease-[var(--alka-ease-smooth)]",
          resolvedSurface === "glass" ? "alka-liquid-glass" : "bg-card/72",
          className,
        )}
        data-surface={resolvedSurface}
        {...props}
      >
        {resolvedSurface === "glass" && <GlassElementLayers />}
        {children}
      </div>
    )
  },
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
