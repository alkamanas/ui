"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

function prefersDesktopOverlayScrollbars() {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false

  const hasFinePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false
  if (!hasFinePointer) return false

  const platform = [
    navigator.platform,
    navigator.userAgent,
    // navigator.userAgentData is Chromium-only and intentionally optional.
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()

  return /win|linux|x11/.test(platform) && !/android|iphone|ipad|ipod/.test(platform)
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({
  className,
  children,
  type,
  scrollHideDelay,
  onBlur,
  onFocus,
  onPointerEnter,
  onPointerLeave,
  ...props
}, ref) => {
  const [usesDesktopOverlay, setUsesDesktopOverlay] = React.useState(false)
  const [isScrollbarVisible, setIsScrollbarVisible] = React.useState(false)
  const hideTimerRef = React.useRef<number | undefined>(undefined)

  React.useEffect(() => {
    setUsesDesktopOverlay(prefersDesktopOverlayScrollbars())
  }, [])

  React.useEffect(() => {
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
    }
  }, [])

  const showScrollbar = React.useCallback(() => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
    setIsScrollbarVisible(true)
  }, [])

  const hideScrollbar = React.useCallback(() => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
    hideTimerRef.current = window.setTimeout(() => {
      setIsScrollbarVisible(false)
    }, scrollHideDelay ?? 1000)
  }, [scrollHideDelay])

  const handleViewportScroll = React.useCallback(() => {
    if (!usesDesktopOverlay) return
    showScrollbar()
    hideScrollbar()
  }, [hideScrollbar, showScrollbar, usesDesktopOverlay])

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      type={type ?? (usesDesktopOverlay ? "scroll" : undefined)}
      scrollHideDelay={scrollHideDelay ?? (usesDesktopOverlay ? 1000 : undefined)}
      data-desktop-overlay-scrollbar={usesDesktopOverlay ? "" : undefined}
      data-scrollbar-visible={usesDesktopOverlay && isScrollbarVisible ? "true" : undefined}
      className={cn("alka-scroll-area relative overflow-hidden", className)}
      onBlur={(event) => {
        onBlur?.(event)
      }}
      onFocus={(event) => {
        onFocus?.(event)
      }}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
      }}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]" onScroll={handleViewportScroll}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar forceMount={usesDesktopOverlay ? true : undefined} />
      <ScrollAreaPrimitive.Corner className="bg-transparent" />
    </ScrollAreaPrimitive.Root>
  )
})
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "alka-scroll-area-scrollbar flex touch-none select-none bg-transparent transition-[opacity,transform] duration-[var(--alka-motion-normal)] ease-[var(--alka-ease-smooth)]",
      orientation === "vertical" &&
        "bottom-0 right-0 top-0 h-full w-2.5 p-[1px]",
      orientation === "horizontal" &&
        "bottom-0 left-0 right-0 h-2.5 flex-col p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="alka-scroll-area-thumb relative flex-1 rounded-full bg-foreground/28 transition-[background-color,opacity,transform] duration-[var(--alka-motion-normal)] ease-[var(--alka-ease-smooth)] hover:bg-foreground/42" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
