import * as React from "react"

import { cn } from "@/lib/utils"

const Item = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "group/item flex items-center gap-4 rounded-2xl border border-border/70 bg-card/72 p-4 text-card-foreground shadow-[var(--alka-shadow-control)] transition-[border-color,background-color,box-shadow] duration-500 ease-[var(--alka-ease-smooth)] hover:border-primary/24 hover:bg-card",
        className,
      )}
      {...props}
    />
  ),
)
Item.displayName = "Item"

const ItemMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground", className)}
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
    <div ref={ref} className={cn("truncate text-sm font-semibold", className)} {...props} />
  ),
)
ItemTitle.displayName = "ItemTitle"

const ItemDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("truncate text-sm text-muted-foreground", className)} {...props} />
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
