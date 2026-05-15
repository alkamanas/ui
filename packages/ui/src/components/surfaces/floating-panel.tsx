import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const floatingPanelVariants = cva(
  "relative overflow-hidden border text-foreground transition-shadow alka-glass-highlight",
  {
    variants: {
      variant: {
        default:
          "border-[hsl(var(--alka-panel-border))] bg-[hsl(var(--alka-panel-bg))] shadow-[var(--alka-shadow-floating)] backdrop-blur-[var(--alka-blur-panel)]",
        soft:
          "border-border/70 bg-card/70 shadow-[var(--alka-shadow-panel)] backdrop-blur-[var(--alka-blur-soft)]",
        solid: "border-border bg-card shadow-[var(--alka-shadow-panel)] after:hidden",
        outline: "border-border bg-transparent shadow-none after:hidden",
      },
      radius: {
        default: "rounded-[var(--alka-radius-panel)]",
        lg: "rounded-[var(--alka-radius-panel-lg)]",
        modal: "rounded-[var(--alka-radius-modal)]",
        pill: "rounded-[var(--alka-radius-pill)]",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        default: "p-5",
        lg: "p-7",
      },
    },
    defaultVariants: {
      variant: "default",
      radius: "default",
      padding: "default",
    },
  },
);

export interface FloatingPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof floatingPanelVariants> {}

export const FloatingPanel = React.forwardRef<HTMLDivElement, FloatingPanelProps>(
  ({ className, variant, radius, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(floatingPanelVariants({ variant, radius, padding, className }))}
      {...props}
    />
  ),
);

FloatingPanel.displayName = "FloatingPanel";

export { floatingPanelVariants };
