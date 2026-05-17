import { Sheet, SheetContent } from "@/components/ui/sheet";
import { LiquidGlassFilter } from "@/components/surfaces/liquid-glass-filter";
import { cn } from "@/lib/utils";
import { useFloatingSidebar } from "./FloatingSidebarProvider";

export const SIDEBAR_WIDTH_EXPANDED = 260;
export const SIDEBAR_WIDTH_COLLAPSED = 64;

export const FloatingSidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { state, isMobile, mobileOpen, setMobileOpen } = useFloatingSidebar();

  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-[280px] border-r-0 bg-transparent p-0 shadow-none"
          style={{ "--alka-sheet-width": "280px" } as React.CSSProperties}
        >
          <div className="alka-liquid-glass relative m-3 flex h-[calc(100%-1.5rem)] flex-col overflow-hidden rounded-3xl border">
            <LiquidGlassFilter />
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      data-state={state}
      data-floating-sidebar=""
      className={cn(
        "alka-liquid-glass fixed bottom-4 left-4 top-4 z-30 flex flex-col overflow-hidden rounded-3xl border",
        "transition-[width] duration-200 ease-out",
      )}
      style={{
        width:
          state === "expanded"
            ? SIDEBAR_WIDTH_EXPANDED
            : SIDEBAR_WIDTH_COLLAPSED,
      }}
    >
      <LiquidGlassFilter />
      {children}
    </aside>
  );
};

export const FloatingSidebarHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("border-b border-white/[0.06] px-3 py-3", className)}>
    {children}
  </div>
);

export const FloatingSidebarContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={cn("flex-1 overflow-y-auto overflow-x-hidden px-2 py-2", className)}
  >
    {children}
  </div>
);

export const FloatingSidebarFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("border-t border-white/[0.06] px-3 py-3", className)}>
    {children}
  </div>
);
