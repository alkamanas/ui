"use client"

import * as React from "react"

import type { BorderAnimationColor, SurfaceGradientColor } from "@/lib/border-animation"
import { cn } from "@/lib/utils"

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  borderAnimationColor?: BorderAnimationColor
  surface?: "flat" | "gradient"
  surfaceGradientColor?: SurfaceGradientColor
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, borderAnimationColor, onBlurCapture, onFocusCapture, surface = "flat", surfaceGradientColor, ...props }, ref) => {
    const [isSelected, setIsSelected] = React.useState(false)
    const [isClosing, setIsClosing] = React.useState(false)
    const closeTimeoutRef = React.useRef<number | undefined>(undefined)

    React.useEffect(() => {
      return () => {
        if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
      }
    }, [])

    return (
      <div
        ref={ref}
        className={cn("alka-input-group", className)}
        data-border-animation-color={borderAnimationColor}
        data-closing={isClosing ? "true" : undefined}
        data-selected={isSelected ? "true" : undefined}
        data-surface={surface}
        data-surface-gradient-color={surfaceGradientColor}
        onBlurCapture={(event) => {
          onBlurCapture?.(event)
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) return

          if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
          setIsSelected(false)
          setIsClosing(true)
          closeTimeoutRef.current = window.setTimeout(() => setIsClosing(false), 620)
        }}
        onFocusCapture={(event) => {
          onFocusCapture?.(event)
          if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
          setIsSelected(true)
          setIsClosing(false)
        }}
        {...props}
      />
    )
  },
)
InputGroup.displayName = "InputGroup"

const InputGroupAddon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("alka-input-group-addon", className)}
      {...props}
    />
  ),
)
InputGroupAddon.displayName = "InputGroupAddon"

export interface InputGroupInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  floatingLabel?: boolean
  label?: React.ReactNode
}

function hasInputValue(value: unknown) {
  if (Array.isArray(value)) return value.length > 0
  return value !== undefined && value !== null && String(value).length > 0
}

const InputGroupInput = React.forwardRef<HTMLInputElement, InputGroupInputProps>(
  (
    {
      className,
      defaultValue,
      floatingLabel = true,
      id,
      label,
      onChange,
      placeholder,
      value,
      ...props
    },
    ref,
  ) => {
    const [hasValue, setHasValue] = React.useState(() =>
      hasInputValue(value ?? defaultValue),
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

    return (
      <span
        className="alka-input-group-input-wrap"
        data-filled={hasValue ? "true" : undefined}
        data-has-label={hasLabel ? "true" : "false"}
      >
        <input
          ref={ref}
          id={inputId}
          value={value}
          defaultValue={defaultValue}
          placeholder={hasLabel ? " " : placeholder}
          className={cn("alka-input-group-input", className)}
          onChange={(event) => {
            setHasValue(hasInputValue(event.currentTarget.value))
            onChange?.(event)
          }}
          {...props}
        />
        {hasLabel ? (
          <label className="alka-input-group-label" htmlFor={inputId}>
            {labelContent}
          </label>
        ) : null}
      </span>
    )
  },
)
InputGroupInput.displayName = "InputGroupInput"

export { InputGroup, InputGroupAddon, InputGroupInput }
