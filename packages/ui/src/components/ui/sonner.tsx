import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="dark"
    richColors
    closeButton
    position="top-right"
    className="alka-toaster"
    toastOptions={{
      classNames: {
        toast:
          "alka-toast alka-liquid-glass group toast border border-white/10 text-popover-foreground",
        description: "group-[.toast]:text-muted-foreground",
        actionButton:
          "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
        cancelButton:
          "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
      },
    }}
    {...props}
  />
);
