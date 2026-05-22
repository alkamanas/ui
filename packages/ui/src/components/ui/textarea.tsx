"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  floatingLabel?: boolean
  label?: React.ReactNode
  surface?: "flat" | "gradient"
  wrapperClassName?: string
}

function hasTextareaValue(value: unknown) {
  if (Array.isArray(value)) return value.length > 0
  return value !== undefined && value !== null && String(value).length > 0
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
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
      value,
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const [isSelected, setIsSelected] = React.useState(false)
    const [isClosing, setIsClosing] = React.useState(false)
    const closeTimeoutRef = React.useRef<number | undefined>(undefined)
    const [hasValue, setHasValue] = React.useState(() =>
      hasTextareaValue(value ?? defaultValue),
    )
    const generatedId = React.useId()
    const textareaId = id ?? generatedId
    const labelContent = floatingLabel
      ? label ?? (typeof placeholder === "string" ? placeholder : undefined)
      : undefined
    const hasLabel =
      labelContent !== undefined && labelContent !== null && labelContent !== ""

    React.useEffect(() => {
      if (value !== undefined) setHasValue(hasTextareaValue(value))
    }, [value])

    React.useEffect(() => {
      return () => {
        if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
      }
    }, [])

    return (
      <span
        className={cn("alka-textarea-field", wrapperClassName)}
        data-closing={isClosing ? "true" : undefined}
        data-disabled={disabled ? "true" : undefined}
        data-filled={hasValue ? "true" : undefined}
        data-has-label={hasLabel ? "true" : "false"}
        data-selected={isSelected ? "true" : undefined}
        data-surface={surface}
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
        <textarea
          id={textareaId}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          placeholder={hasLabel ? " " : placeholder}
          className={cn("alka-textarea-control", className)}
          ref={ref}
          onBlur={(event) => {
            onBlur?.(event)
          }}
          onChange={(event) => {
            setHasValue(hasTextareaValue(event.currentTarget.value))
            onChange?.(event)
          }}
          onFocus={(event) => {
            onFocus?.(event)
          }}
          {...props}
        />
        {hasLabel ? (
          <label className="alka-textarea-label" htmlFor={textareaId}>
            {labelContent}
          </label>
        ) : null}
      </span>
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea }
