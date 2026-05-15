import { cn } from "@/lib/utils";

export const PageContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("space-y-6", className)}>{children}</div>
);

export default PageContent;
