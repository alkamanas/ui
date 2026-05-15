import * as React from "react"

import { cn } from "@/lib/utils"

const Kbd = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-border/80 bg-muted/70 px-1.5 font-mono text-[0.72rem] font-medium text-muted-foreground shadow-[inset_0_-1px_0_hsl(var(--border))]",
        className,
      )}
      {...props}
    />
  ),
)
Kbd.displayName = "Kbd"

export { Kbd }
