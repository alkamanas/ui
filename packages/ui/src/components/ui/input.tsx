"use client"

import * as React from "react"

import type { BorderAnimationColor, SurfaceGradientColor } from "@/lib/border-animation"
import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  borderAnimationColor?: BorderAnimationColor
  floatingLabel?: boolean
  label?: React.ReactNode
  surface?: "flat" | "gradient"
  surfaceGradientColor?: SurfaceGradientColor
  variant?: "underline" | "pill"
  wrapperClassName?: string
}

function hasInputValue(value: unknown) {
  if (Array.isArray(value)) return value.length > 0
  return value !== undefined && value !== null && String(value).length > 0
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      borderAnimationColor,
      defaultValue,
      disabled,
      floatingLabel = true,
      id,
      label,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      surface = "flat",
      surfaceGradientColor,
      type,
      value,
      variant = "underline",
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const [isSelected, setIsSelected] = React.useState(false)
    const [isClosing, setIsClosing] = React.useState(false)
    const closeTimeoutRef = React.useRef<number | undefined>(undefined)
    const [hasValue, setHasValue] = React.useState(() =>
      hasInputValue(value ?? defaultValue)
    )
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const labelContent = floatingLabel
      ? label ?? (typeof placeholder === "string" ? placeholder : undefined)
      : undefined
    const hasLabel =
      labelContent !== undefined && labelContent !== null && labelContent !== ""

    React.useEffect(() => {
      if (value !== undefined) setHasValue(hasInputValue(value))
    }, [value])

    React.useEffect(() => {
      return () => {
        if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
      }
    }, [])

    return (
      <span
        className={cn("alka-input-field", wrapperClassName)}
        data-closing={isClosing ? "true" : undefined}
        data-border-animation-color={borderAnimationColor}
        data-surface={surface}
        data-surface-gradient-color={surfaceGradientColor}
        data-variant={variant}
        data-disabled={disabled ? "true" : undefined}
        data-filled={hasValue ? "true" : undefined}
        data-has-label={hasLabel ? "true" : "false"}
        data-selected={isSelected ? "true" : undefined}
        onBlurCapture={(event) => {
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) return

          if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
          setIsSelected(false)
          setIsClosing(true)
          closeTimeoutRef.current = window.setTimeout(() => setIsClosing(false), 620)
        }}
        onFocusCapture={() => {
          if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
          setIsSelected(true)
          setIsClosing(false)
        }}
      >
        <input
          id={inputId}
          type={type}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          placeholder={hasLabel ? " " : placeholder}
          data-filled={hasValue ? "true" : undefined}
          data-selected={isSelected ? "true" : undefined}
          className={cn(
            "alka-input-control flex w-full text-base text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          onBlur={(event) => {
            onBlur?.(event)
          }}
          onChange={(event) => {
            setHasValue(hasInputValue(event.currentTarget.value))
            onChange?.(event)
          }}
          onFocus={(event) => {
            onFocus?.(event)
          }}
          {...props}
        />
        {hasLabel ? (
          <label className="alka-input-label" htmlFor={inputId}>
            {labelContent}
          </label>
        ) : null}
      </span>
    )
  }
)
Input.displayName = "Input"

export { Input }
