import { Toaster as Sonner } from "sonner";
import type { ComponentProps } from "react";

type SonnerToasterProps = ComponentProps<typeof Sonner>;
type SwipeDirection = NonNullable<SonnerToasterProps["swipeDirections"]>[number];

export type ToasterProps = SonnerToasterProps & {
  pullToClose?: boolean;
};

function getPullToCloseDirections(position: SonnerToasterProps["position"]): SwipeDirection[] {
  if (position?.endsWith("left")) return ["left"];
  if (position?.endsWith("right")) return ["right"];
  return ["left", "right"];
}

export const Toaster = ({
  className,
  closeButton = true,
  expand = true,
  position = "top-right",
  pullToClose = true,
  richColors = true,
  swipeDirections,
  theme = "dark",
  toastOptions,
  ...props
}: ToasterProps) => {
  const resolvedSwipeDirections = pullToClose
    ? swipeDirections ?? getPullToCloseDirections(position)
    : [];

  return (
    <Sonner
      theme={theme}
      richColors={richColors}
      closeButton={closeButton}
      expand={expand}
      position={position}
      swipeDirections={resolvedSwipeDirections}
      className={["alka-toaster", className].filter(Boolean).join(" ")}
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast:
            "alka-toast alka-liquid-glass group toast border border-border/70 text-popover-foreground",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
};
