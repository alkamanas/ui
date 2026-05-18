"use client"

import * as React from "react"

import type { BorderAnimationColor, SurfaceGradientColor } from "@/lib/border-animation"
import { cn } from "@/lib/utils"

type InputOTPContextValue = {
  borderAnimationColor?: BorderAnimationColor
  surfaceGradientColor?: SurfaceGradientColor
  value: string[]
  maxLength: number
  setSlotValue: (index: number, value: string) => void
}

const InputOTPContext = React.createContext<InputOTPContextValue | null>(null)

export type InputOTPProps = React.HTMLAttributes<HTMLDivElement> & {
  borderAnimationColor?: BorderAnimationColor
  surfaceGradientColor?: SurfaceGradientColor
  maxLength?: number
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ className, borderAnimationColor, surfaceGradientColor, maxLength = 6, value, defaultValue = "", onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const currentValue = value ?? internalValue
    const slots = Array.from({ length: maxLength }, (_, index) => currentValue[index] ?? "")

    const setSlotValue = (index: number, nextChar: string) => {
      const nextSlots = [...slots]
      nextSlots[index] = nextChar.slice(-1)
      const nextValue = nextSlots.join("")
      if (value === undefined) setInternalValue(nextValue)
      onValueChange?.(nextValue)
    }

    return (
      <InputOTPContext.Provider value={{ borderAnimationColor, surfaceGradientColor, value: slots, maxLength, setSlotValue }}>
        <div
          ref={ref}
          className={cn("alka-input-otp flex items-center", className)}
          data-border-animation-color={borderAnimationColor}
          data-surface-gradient-color={surfaceGradientColor}
          {...props}
        />
      </InputOTPContext.Provider>
    )
  },
)
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("alka-input-otp-group", className)} {...props} />
  ),
)
InputOTPGroup.displayName = "InputOTPGroup"

export type InputOTPSlotProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  borderAnimationColor?: BorderAnimationColor
  surfaceGradientColor?: SurfaceGradientColor
  index: number
}

const InputOTPSlot = React.forwardRef<HTMLInputElement, InputOTPSlotProps>(
  ({ className, borderAnimationColor, surfaceGradientColor, index, onBlur, onFocus, onKeyDown, ...props }, ref) => {
    const context = React.useContext(InputOTPContext)
    if (!context) throw new Error("InputOTPSlot must be used inside <InputOTP />")
    const [focused, setFocused] = React.useState(false)
    const [closing, setClosing] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const closeTimeoutRef = React.useRef<number | undefined>(undefined)

    const setInputRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref],
    )

    React.useEffect(() => {
      return () => {
        if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
      }
    }, [])

    return (
      <span
        className={cn(
          "alka-input-otp-slot",
          className,
        )}
        data-border-animation-color={borderAnimationColor ?? context.borderAnimationColor}
        data-surface-gradient-color={surfaceGradientColor ?? context.surfaceGradientColor}
        data-closing={closing ? "true" : undefined}
        data-filled={context.value[index] ? "true" : undefined}
        data-selected={focused ? "true" : undefined}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          ref={setInputRef}
          aria-label={`Digit ${index + 1} of ${context.maxLength}`}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={context.value[index] ?? ""}
          onChange={(event) => {
            const nextValue = event.target.value.replace(/\D/g, "").slice(-1)
            context.setSlotValue(index, nextValue)
            if (nextValue) {
              const nextInput = event.currentTarget
                .closest(".alka-input-otp-group")
                ?.querySelector<HTMLInputElement>(`input[data-otp-index="${index + 1}"]`)
              nextInput?.focus()
            }
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event)
            if (event.defaultPrevented) return
            if (event.key === "Backspace" && !context.value[index]) {
              const previousInput = event.currentTarget
                .closest(".alka-input-otp-group")
                ?.querySelector<HTMLInputElement>(`input[data-otp-index="${index - 1}"]`)
              previousInput?.focus()
            }
          }}
          onBlur={(event) => {
            onBlur?.(event)
            if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
            setFocused(false)
            setClosing(true)
            closeTimeoutRef.current = window.setTimeout(() => setClosing(false), 620)
          }}
          onFocus={(event) => {
            onFocus?.(event)
            if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
            setFocused(true)
            setClosing(false)
          }}
          data-otp-index={index}
          {...props}
        />
      </span>
    )
  },
)
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("alka-input-otp-separator", className)} {...props} />
  ),
)
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
