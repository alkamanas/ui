"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type InputOTPContextValue = {
  value: string[]
  maxLength: number
  setSlotValue: (index: number, value: string) => void
}

const InputOTPContext = React.createContext<InputOTPContextValue | null>(null)

export type InputOTPProps = React.HTMLAttributes<HTMLDivElement> & {
  maxLength?: number
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ className, maxLength = 6, value, defaultValue = "", onValueChange, ...props }, ref) => {
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
      <InputOTPContext.Provider value={{ value: slots, maxLength, setSlotValue }}>
        <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
      </InputOTPContext.Provider>
    )
  },
)
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
  ),
)
InputOTPGroup.displayName = "InputOTPGroup"

export type InputOTPSlotProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  index: number
}

const InputOTPSlot = React.forwardRef<HTMLInputElement, InputOTPSlotProps>(
  ({ className, index, onKeyDown, ...props }, ref) => {
    const context = React.useContext(InputOTPContext)
    if (!context) throw new Error("InputOTPSlot must be used inside <InputOTP />")

    return (
      <input
        ref={ref}
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={1}
        value={context.value[index] ?? ""}
        className={cn(
          "grid size-12 place-items-center rounded-2xl border border-border/80 bg-background/76 text-center text-base font-semibold text-foreground shadow-[0_10px_28px_hsl(var(--alka-shadow-color)_/_0.12)] outline-none transition-[border-color,box-shadow,transform] duration-500 ease-[var(--alka-ease-smooth)] focus:border-primary/40 focus:shadow-[0_0_0_4px_hsl(var(--primary)_/_0.065),0_18px_42px_hsl(var(--alka-shadow-color)_/_0.2)] focus:-translate-y-0.5",
          className,
        )}
        onChange={(event) => {
          const nextValue = event.target.value.replace(/\D/g, "").slice(-1)
          context.setSlotValue(index, nextValue)
          if (nextValue) {
            const nextInput = event.currentTarget.parentElement?.querySelector<HTMLInputElement>(
              `input[data-otp-index="${index + 1}"]`,
            )
            nextInput?.focus()
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.defaultPrevented) return
          if (event.key === "Backspace" && !context.value[index]) {
            const previousInput = event.currentTarget.parentElement?.querySelector<HTMLInputElement>(
              `input[data-otp-index="${index - 1}"]`,
            )
            previousInput?.focus()
          }
        }}
        data-otp-index={index}
        {...props}
      />
    )
  },
)
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("h-1 w-3 rounded-full bg-muted-foreground/40", className)} {...props} />
  ),
)
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
