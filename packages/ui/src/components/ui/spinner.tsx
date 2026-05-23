import * as React from "react";

import { cn } from "@/lib/utils";

interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASS: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-8",
};

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size = "md", ...props }, ref) => (
    <svg
      ref={ref}
      role="status"
      aria-label="Loading"
      viewBox="25 25 50 50"
      className={cn("alka-spinner text-primary", SIZE_CLASS[size], className)}
      {...props}
    >
      <circle className="alka-spinner-circle" cx="50" cy="50" r="20" fill="none" strokeWidth="4" />
    </svg>
  ),
);
Spinner.displayName = "Spinner";

export default Spinner;
