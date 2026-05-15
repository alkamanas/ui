import { cn } from "@/lib/utils";

export type PageContainerWidth = "narrow" | "default" | "wide" | "full";

const WIDTH_CLASSES: Record<PageContainerWidth, string> = {
  narrow: "max-w-2xl",
  default: "max-w-5xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

export const PageContainer: React.FC<{
  children: React.ReactNode;
  width?: PageContainerWidth;
  className?: string;
}> = ({ children, width = "default", className }) => (
  <div
    className={cn(
      "mx-auto w-full px-4 py-6 md:px-6 md:py-8",
      WIDTH_CLASSES[width],
      className,
    )}
  >
    {children}
  </div>
);

export default PageContainer;
