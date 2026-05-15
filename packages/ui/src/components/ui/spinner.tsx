import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASS: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "size-3",
  md: "size-4",
  lg: "size-6",
};

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size = "md", ...props }, ref) => (
    <Loader2
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn("animate-spin text-muted-foreground", SIZE_CLASS[size], className)}
      {...props}
    />
  ),
);
Spinner.displayName = "Spinner";

export default Spinner;
