import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-[1.15rem] border border-input bg-background/76 px-4 py-3 text-base shadow-[0_10px_28px_hsl(var(--alka-shadow-color)_/_0.14)] transition-[border-color,box-shadow,transform] duration-500 ease-[var(--alka-ease-smooth)] placeholder:text-muted-foreground focus-visible:-translate-y-0.5 focus-visible:border-primary/35 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
