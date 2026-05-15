"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  floatingLabel?: boolean
  label?: React.ReactNode
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
      defaultValue,
      disabled,
      floatingLabel = true,
      id,
      label,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      type,
      value,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const [isSelected, setIsSelected] = React.useState(false)
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

    return (
      <span
        className={cn("alka-input-field", wrapperClassName)}
        data-disabled={disabled ? "true" : undefined}
        data-filled={hasValue ? "true" : undefined}
        data-has-label={hasLabel ? "true" : "false"}
        data-selected={isSelected ? "true" : undefined}
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
            setIsSelected(false)
            onBlur?.(event)
          }}
          onChange={(event) => {
            setHasValue(hasInputValue(event.currentTarget.value))
            onChange?.(event)
          }}
          onFocus={(event) => {
            setIsSelected(true)
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
