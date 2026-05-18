import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { GlassElementLayers } from "@/components/surfaces/liquid-glass-filter"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
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
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<number[]>(
      () => value ?? defaultValue ?? [min]
    )
    const currentValue = value ?? internalValue
    const firstValue = currentValue[0] ?? min
    const range = Math.max(max - min, 1)
    const percent = Math.min(100, Math.max(0, ((firstValue - min) / range) * 100))

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex h-10 w-full touch-none select-none items-center",
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
            "--alka-slider-fill-percent": `${percent}%`,
          } as React.CSSProperties
        }
        value={value}
        {...props}
      >
        <SliderPrimitive.Track className="alka-slider-track relative h-3 grow overflow-hidden rounded-full">
          <SliderPrimitive.Range className="alka-slider-range absolute h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          aria-label={ariaLabelledBy ? undefined : ariaLabel ?? "Slider value"}
          aria-labelledby={ariaLabelledBy}
          className="alka-slider-thumb alka-liquid-glass relative z-10 block h-8 w-12 cursor-pointer rounded-full border border-white/14 transition-[transform,box-shadow,opacity] duration-300 ease-[var(--alka-ease-smooth)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-[orientation=horizontal]:-translate-y-0 data-[state=active]:scale-x-105 data-[state=active]:scale-y-[0.98]"
        >
          <span aria-hidden="true" className="alka-slider-thumb-backdrop" />
          <GlassElementLayers />
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    )
  }
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
