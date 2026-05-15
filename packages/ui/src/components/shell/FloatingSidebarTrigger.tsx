import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFloatingSidebar } from "./FloatingSidebarProvider";

export const FloatingSidebarTrigger: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { state, isMobile, mobileOpen, toggle } = useFloatingSidebar();
  const isOpen = isMobile ? mobileOpen : state === "expanded";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-8", className)}
      onClick={toggle}
      aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
    >
      {isOpen ? (
        <PanelLeftClose className="size-4" />
      ) : (
        <PanelLeftOpen className="size-4" />
      )}
    </Button>
  );
};

export default FloatingSidebarTrigger;
