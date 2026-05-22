import * as React from "react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const Drawer = Sheet
const DrawerTrigger = SheetTrigger
const DrawerClose = SheetClose
const DrawerPortal = SheetPortal
const DrawerOverlay = SheetOverlay
const DrawerTitle = SheetTitle
const DrawerDescription = SheetDescription
const DrawerFooter = SheetFooter

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof SheetContent>,
  React.ComponentPropsWithoutRef<typeof SheetContent>
>(({ className, side = "bottom", ...props }, ref) => (
  <SheetContent
    ref={ref}
    side={side}
    className={cn(
      "rounded-t-[2rem] border-border/70 data-[state=open]:duration-700 data-[state=closed]:duration-500",
      className,
    )}
    {...props}
  />
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <SheetHeader className={cn("text-left", className)} {...props} />
)
DrawerHeader.displayName = "DrawerHeader"

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
