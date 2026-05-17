"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { GlassElementLayers } from "@/components/surfaces/liquid-glass-filter"
import type { BorderAnimationColor, SurfaceGradientColor } from "@/lib/border-animation"
import { cn } from "@/lib/utils"

let openSelectCount = 0

function enableSelectPointerPassthrough() {
  if (typeof document === "undefined") return

  openSelectCount += 1
  document.body.dataset.alkaSelectOpen = "true"
}

function disableSelectPointerPassthrough() {
  if (typeof document === "undefined") return

  openSelectCount = Math.max(0, openSelectCount - 1)
  if (openSelectCount === 0) {
    delete document.body.dataset.alkaSelectOpen
  }
}

const SelectMotionContext = React.createContext<{
  closing: boolean
}>({
  closing: false,
})

function Select({
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>) {
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false)
  const currentOpen = isControlled ? open : internalOpen
  const [closing, setClosing] = React.useState(false)
  const pointerPassthroughRef = React.useRef(false)
  const closeTimeoutRef = React.useRef<number | undefined>(undefined)
  const rootOpen = Boolean(currentOpen || closing)

  const setPointerPassthrough = React.useCallback((enabled: boolean) => {
    if (enabled && !pointerPassthroughRef.current) {
      pointerPassthroughRef.current = true
      enableSelectPointerPassthrough()
      return
    }

    if (!enabled && pointerPassthroughRef.current) {
      pointerPassthroughRef.current = false
      disableSelectPointerPassthrough()
    }
  }, [])

  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
      setPointerPassthrough(false)
    }
  }, [setPointerPassthrough])

  React.useEffect(() => {
    setPointerPassthrough(rootOpen)
  }, [rootOpen, setPointerPassthrough])

  const handleOpenChange = (nextOpen: boolean) => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)

    if (nextOpen) {
      setClosing(false)
      setPointerPassthrough(true)
      if (!isControlled) setInternalOpen(true)
      onOpenChange?.(true)
      return
    } else {
      if (!currentOpen && !closing) return

      setClosing(true)
      setPointerPassthrough(true)
      if (!isControlled) setInternalOpen(false)
      onOpenChange?.(false)
      closeTimeoutRef.current = window.setTimeout(() => {
        setClosing(false)
      }, 300)
      return
    }
  }

  return (
    <SelectMotionContext.Provider value={{ closing }}>
      <SelectPrimitive.Root
        open={rootOpen}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </SelectMotionContext.Provider>
  )
}

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    borderAnimationColor?: BorderAnimationColor
    surface?: "flat" | "gradient" | "bare"
    surfaceGradientColor?: SurfaceGradientColor
  }
>(({ className, children, borderAnimationColor, surface = "gradient", surfaceGradientColor, ...props }, ref) => {
  const { closing } = React.useContext(SelectMotionContext)

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      data-border-animation-color={borderAnimationColor}
      data-closing={closing ? "true" : undefined}
      data-surface={surface}
      data-surface-gradient-color={surfaceGradientColor}
      className={cn(
        "alka-button-control alka-combobox-trigger flex h-[3.125rem] w-full cursor-pointer items-center justify-between whitespace-nowrap rounded-full border border-input bg-background/72 px-5 py-0 text-sm font-medium text-foreground shadow-sm ring-offset-background transition-[border-color,box-shadow,color] duration-500 ease-[var(--alka-ease-smooth)] data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", sideOffset = 8, onCloseAutoFocus, ...props }, ref) => {
  const { closing } = React.useContext(SelectMotionContext)

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        data-closing={closing ? "true" : undefined}
        onCloseAutoFocus={(event) => {
          onCloseAutoFocus?.(event)

          if (closing || document.activeElement !== document.body) {
            event.preventDefault()
          }
        }}
        className={cn(
          "alka-select-content alka-liquid-glass relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] origin-[--radix-select-content-transform-origin] overflow-hidden rounded-3xl border border-white/10 p-2 text-popover-foreground transition-[opacity,transform] duration-[520ms] ease-[var(--alka-ease-smooth)] data-[state=closed]:scale-[0.97] data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
          position === "popper" && "w-[var(--radix-select-trigger-width)]",
          className
        )}
        position={position}
        sideOffset={sideOffset}
        {...props}
      >
        <GlassElementLayers />
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "relative z-10 grid gap-1 px-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, style, onMouseEnter, onMouseLeave, onPointerMove, onPointerLeave, ...props }, ref) => {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "alka-select-option relative flex min-h-11 w-full cursor-pointer select-none items-center rounded-full border border-transparent bg-transparent py-2.5 pl-4 pr-12 text-sm font-medium outline-none transition-[background-color,border-color,box-shadow,color] duration-300 ease-[var(--alka-ease-smooth)] data-[highlighted]:bg-transparent data-[highlighted]:text-foreground data-[state=checked]:shadow-none data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      {...props}
      style={style}
      onMouseEnter={(event) => {
        onMouseEnter?.(event)
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event)
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event)
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
      }}
    >
      <span className="absolute right-4 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
