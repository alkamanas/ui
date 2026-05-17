"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

type TabsMotionContextValue = {
  value?: string
}

const TabsMotionContext = React.createContext<TabsMotionContextValue>({
  value: undefined,
})

function setForwardedRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value)
    return
  }

  if (ref) {
    ;(ref as React.MutableRefObject<T | null>).current = value
  }
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ value, defaultValue, onValueChange, ...props }, ref) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const activeValue = value ?? uncontrolledValue

  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      if (value === undefined) setUncontrolledValue(nextValue)
      onValueChange?.(nextValue)
    },
    [onValueChange, value]
  )

  return (
    <TabsMotionContext.Provider value={{ value: activeValue }}>
      <TabsPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        {...props}
      />
    </TabsMotionContext.Provider>
  )
})
Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ children, className, style, ...props }, ref) => {
  const { value } = React.useContext(TabsMotionContext)
  const listRef = React.useRef<React.ElementRef<typeof TabsPrimitive.List> | null>(null)
  const [pill, setPill] = React.useState({ left: 0, width: 0, ready: false })

  const updatePill = React.useCallback(() => {
    const list = listRef.current
    const activeTrigger = list?.querySelector<HTMLElement>('[data-state="active"]')
    if (!list || !activeTrigger) {
      setPill((current) => ({ ...current, ready: false }))
      return
    }

    setPill({
      left: activeTrigger.offsetLeft,
      width: activeTrigger.offsetWidth,
      ready: true,
    })
  }, [])

  React.useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(updatePill)
    return () => window.cancelAnimationFrame(frame)
  }, [updatePill, value, children])

  React.useLayoutEffect(() => {
    const list = listRef.current
    if (!list || typeof ResizeObserver === "undefined") return

    const observer = new ResizeObserver(updatePill)
    observer.observe(list)
    Array.from(list.children).forEach((child) => observer.observe(child))
    window.addEventListener("resize", updatePill)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", updatePill)
    }
  }, [children, updatePill])

  return (
    <TabsPrimitive.List
      ref={(node) => {
        listRef.current = node
        setForwardedRef(ref, node)
      }}
      className={cn(
        "alka-tabs-list alka-pill-surface inline-flex h-[3.125rem] items-center justify-center rounded-full p-1 text-muted-foreground",
        className
      )}
      style={
        {
          ...style,
          "--alka-tabs-pill-left": `${pill.left}px`,
          "--alka-tabs-pill-opacity": pill.ready ? 1 : 0,
          "--alka-tabs-pill-width": `${pill.width}px`,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative z-10 inline-flex h-[2.625rem] cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-4 py-0 text-sm font-medium leading-none ring-offset-background transition-[color,opacity,transform] duration-500 ease-[var(--alka-ease-smooth)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-primary-foreground data-[state=active]:hover:text-primary-foreground",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, forceMount = true, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    forceMount={forceMount}
    className={cn(
      "alka-tabs-content mt-2 ring-offset-background transition-[opacity,transform] duration-500 ease-[var(--alka-ease-smooth)] data-[state=inactive]:pointer-events-none data-[state=inactive]:hidden data-[state=inactive]:translate-y-1 data-[state=inactive]:opacity-0 data-[state=active]:block data-[state=active]:translate-y-0 data-[state=active]:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
