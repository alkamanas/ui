import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { GlassElementLayers } from "@/components/surfaces/liquid-glass-filter"
import { cn } from "@/lib/utils"

type SliderVariant = "default" | "range"

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  variant?: SliderVariant
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      defaultValue,
      max = 100,
      min = 0,
      onValueChange,
      style,
      value,
      variant = "default",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<number[]>(
      () => value ?? defaultValue ?? (variant === "range" ? [min, max] : [min])
    )
    const currentValue = value ?? internalValue
    const range = Math.max(max - min, 1)
    const valuePercents = currentValue.map((item) =>
      Math.min(100, Math.max(0, ((item - min) / range) * 100))
    )
    const rangeStart = valuePercents.length > 1 ? Math.min(...valuePercents) : 0
    const rangeEnd = valuePercents.length ? Math.max(...valuePercents) : 0
    const thumbCount = Math.max(1, currentValue.length, variant === "range" ? 2 : 1)

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "alka-slider-root relative flex touch-none select-none data-[orientation=horizontal]:h-8 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:items-center data-[orientation=vertical]:h-64 data-[orientation=vertical]:w-8 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-center data-[orientation=vertical]:justify-center",
          className
        )}
        defaultValue={defaultValue}
        max={max}
        min={min}
        onValueChange={(nextValue) => {
          if (value === undefined) setInternalValue(nextValue)
          onValueChange?.(nextValue)
        }}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        style={
          {
            ...style,
            "--alka-slider-range-start": `${rangeStart}%`,
            "--alka-slider-range-size": `${Math.max(0, rangeEnd - rangeStart)}%`,
          } as React.CSSProperties
        }
        value={value}
        {...props}
      >
        <SliderPrimitive.Track className="alka-slider-track relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5">
          <SliderPrimitive.Range className="alka-slider-range absolute h-full" />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }).map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            aria-label={ariaLabelledBy ? undefined : ariaLabel ?? `Slider value ${index + 1}`}
            aria-labelledby={ariaLabelledBy}
            data-glass-effect="blurry"
            className="alka-slider-thumb alka-liquid-glass relative z-10 block cursor-pointer rounded-full border border-border/70 transition-[transform,box-shadow,opacity] duration-300 ease-[var(--alka-ease-smooth)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-[orientation=horizontal]:h-6 data-[orientation=horizontal]:w-9 data-[orientation=horizontal]:-translate-y-0 data-[orientation=vertical]:h-9 data-[orientation=vertical]:w-6 data-[state=active]:scale-x-[1.04] data-[state=active]:scale-y-[0.98]"
          >
            <span aria-hidden="true" className="alka-slider-thumb-backdrop" />
            <GlassElementLayers effect="blurry" />
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>
    )
  }
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
