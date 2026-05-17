"use client"

import * as React from "react"
import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

export const LIQUID_GLASS_FILTER_ID = "alka-liquid-glass-lens"
export type GlassEffect = "blurry" | "realistic"

export type DisplacementOptions = {
  height: number
  width: number
  radius: number
  depth: number
  strength?: number
  chromaticAberration?: number
}

export const getDisplacementMap = ({
  height,
  width,
  radius,
  depth,
}: Omit<DisplacementOptions, "chromaticAberration" | "strength">) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <style>
        .mix { mix-blend-mode: screen; }
    </style>
    <defs>
        <linearGradient
          id="Y"
          x1="0"
          x2="0"
          y1="${Math.ceil((radius / height) * 15)}%"
          y2="${Math.floor(100 - (radius / height) * 15)}%">
            <stop offset="0%" stop-color="#0F0" />
            <stop offset="100%" stop-color="#000" />
        </linearGradient>
        <linearGradient
          id="X"
          x1="${Math.ceil((radius / width) * 15)}%"
          x2="${Math.floor(100 - (radius / width) * 15)}%"
          y1="0"
          y2="0">
            <stop offset="0%" stop-color="#F00" />
            <stop offset="100%" stop-color="#000" />
        </linearGradient>
    </defs>

    <rect x="0" y="0" height="${height}" width="${width}" fill="#808080" />
    <g filter="blur(2px)">
      <rect x="0" y="0" height="${height}" width="${width}" fill="#000080" />
      <rect
          x="0"
          y="0"
          height="${height}"
          width="${width}"
          fill="url(#Y)"
          class="mix"
      />
      <rect
          x="0"
          y="0"
          height="${height}"
          width="${width}"
          fill="url(#X)"
          class="mix"
      />
      <rect
          x="${depth}"
          y="${depth}"
          height="${height - 2 * depth}"
          width="${width - 2 * depth}"
          fill="#808080"
          rx="${radius}"
          ry="${radius}"
          filter="blur(${depth}px)"
      />
    </g>
</svg>`)

export const getDisplacementFilter = ({
  height,
  width,
  radius,
  depth,
  strength = 100,
  chromaticAberration = 0,
}: DisplacementOptions) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <filter id="displace" color-interpolation-filters="sRGB">
            <feImage x="0" y="0" height="${height}" width="${width}" href="${getDisplacementMap({
              height,
              width,
              radius,
              depth,
            })}" result="displacementMap" />
            <feDisplacementMap
                transform-origin="center"
                in="SourceGraphic"
                in2="displacementMap"
                scale="${strength + chromaticAberration * 2}"
                xChannelSelector="R"
                yChannelSelector="G"
            />
            <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="displacedR"
                    />
            <feDisplacementMap
                in="SourceGraphic"
                in2="displacementMap"
                scale="${strength + chromaticAberration}"
                xChannelSelector="R"
                yChannelSelector="G"
            />
            <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="displacedG"
                    />
            <feDisplacementMap
                    in="SourceGraphic"
                    in2="displacementMap"
                    scale="${strength}"
                    xChannelSelector="R"
                    yChannelSelector="G"
                />
                <feColorMatrix
                type="matrix"
                values="0 0 0 0 0
                        0 0 0 0 0
                        0 0 1 0 0
                        0 0 0 1 0"
                result="displacedB"
                        />
              <feBlend in="displacedR" in2="displacedG" mode="screen"/>
              <feBlend in2="displacedB" mode="screen"/>
        </filter>
    </defs>
</svg>`) +
  "#displace"

export function LiquidGlassFilter() {
  return (
    <svg
      aria-hidden="true"
      className="alka-liquid-glass-filter-defs"
      focusable="false"
      height="0"
      width="0"
    >
      <filter
        id={LIQUID_GLASS_FILTER_ID}
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        filterUnits="objectBoundingBox"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.026 0.034"
          numOctaves="2"
          seed="11"
          result="noise"
        />
        <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="alphaBlur" />
        <feComposite in="noise" in2="alphaBlur" operator="in" result="maskedNoise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="maskedNoise"
          scale="88"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}

type GlassEffectMetrics = {
  height: number
  width: number
  radius: number
}

function getDocumentGlassEffect(): GlassEffect {
  if (typeof document === "undefined") return "blurry"
  return document.documentElement.dataset.glassEffect === "realistic" ? "realistic" : "blurry"
}

function useGlassEffect(effect?: GlassEffect) {
  const [resolvedEffect, setResolvedEffect] = React.useState<GlassEffect>(() => effect ?? getDocumentGlassEffect())

  React.useEffect(() => {
    if (effect) {
      setResolvedEffect(effect)
      return
    }

    const updateEffect = () => setResolvedEffect(getDocumentGlassEffect())
    updateEffect()
    const observer = new MutationObserver(updateEffect)
    observer.observe(document.documentElement, {
      attributeFilter: ["data-glass-effect"],
      attributes: true,
    })

    return () => observer.disconnect()
  }, [effect])

  return resolvedEffect
}

export type GlassElementEffectOptions = {
  effect?: GlassEffect
  blur?: number
  depth?: number
  strength?: number
  chromaticAberration?: number
  debug?: boolean
}

export interface GlassElementBackdropProps extends React.HTMLAttributes<HTMLSpanElement>, GlassElementEffectOptions {}

export const GlassElementBackdrop = React.forwardRef<HTMLSpanElement, GlassElementBackdropProps>(
  (
    {
      effect,
      className,
      blur = 2,
      depth = 8,
      strength = 72,
      chromaticAberration = 8,
      debug = false,
      style,
      ...props
    },
    forwardedRef,
  ) => {
    const resolvedEffect = useGlassEffect(effect)
    const localRef = React.useRef<HTMLSpanElement | null>(null)
    const [metrics, setMetrics] = React.useState<GlassEffectMetrics | null>(null)

    const setRef = React.useCallback(
      (node: HTMLSpanElement | null) => {
        localRef.current = node
        if (typeof forwardedRef === "function") {
          forwardedRef(node)
        } else if (forwardedRef) {
          forwardedRef.current = node
        }
      },
      [forwardedRef],
    )

    React.useLayoutEffect(() => {
      if (resolvedEffect !== "realistic") return
      const node = localRef.current
      if (!node) return

      const updateMetrics = () => {
        const rect = node.getBoundingClientRect()
        const computedStyle = window.getComputedStyle(node)
        const nextMetrics = {
          height: Math.max(1, Math.round(rect.height)),
          width: Math.max(1, Math.round(rect.width)),
          radius: Math.max(0, Math.round(parseFloat(computedStyle.borderTopLeftRadius) || 0)),
        }

        setMetrics((current) =>
          current &&
          current.height === nextMetrics.height &&
          current.width === nextMetrics.width &&
          current.radius === nextMetrics.radius
            ? current
            : nextMetrics,
        )
      }

      updateMetrics()
      const resizeObserver = new ResizeObserver(updateMetrics)
      resizeObserver.observe(node)
      return () => resizeObserver.disconnect()
    }, [resolvedEffect])

    const effectStyle = React.useMemo<CSSProperties>(() => {
      if (resolvedEffect !== "realistic") return style as CSSProperties
      if (!metrics) return style as CSSProperties

      const filter = `blur(${blur / 2}px) url("${getDisplacementFilter({
        ...metrics,
        depth,
        strength,
        chromaticAberration,
      })}") blur(${blur}px) brightness(1.1) saturate(1.5)`

      return {
        ...style,
        backgroundImage: debug
          ? `url("${getDisplacementMap({
              ...metrics,
              depth,
            })}")`
          : undefined,
        boxShadow: debug ? "none" : undefined,
        WebkitBackdropFilter: debug ? undefined : filter,
        backdropFilter: debug ? undefined : filter,
      }
    }, [blur, chromaticAberration, debug, depth, metrics, resolvedEffect, strength, style])

    if (resolvedEffect !== "realistic") return null

    return (
      <span
        aria-hidden="true"
        className={cn("alka-glass-element__backdrop", className)}
        ref={setRef}
        style={effectStyle}
        {...props}
      />
    )
  },
)
GlassElementBackdrop.displayName = "GlassElementBackdrop"

export function GlassElementLayers(props: GlassElementBackdropProps) {
  const resolvedEffect = useGlassEffect(props.effect)

  return (
    <>
      <LiquidGlassFilter />
      {resolvedEffect === "realistic" ? (
        <>
          <GlassElementBackdrop {...props} effect={resolvedEffect} />
          <span aria-hidden="true" className="alka-glass-element__tint" />
          <span aria-hidden="true" className="alka-glass-element__shine" />
        </>
      ) : null}
    </>
  )
}

export interface GlassElementProps extends React.HTMLAttributes<HTMLDivElement>, GlassElementEffectOptions {
  children?: ReactNode
  contentClassName?: string
}

export const GlassElement = React.forwardRef<HTMLDivElement, GlassElementProps>(
  ({ children, className, contentClassName, blur, depth, strength, chromaticAberration, debug, ...props }, ref) => (
    <div ref={ref} className={cn("alka-glass-element alka-liquid-glass", className)} {...props}>
      <GlassElementLayers
        blur={blur}
        depth={depth}
        strength={strength}
        chromaticAberration={chromaticAberration}
        debug={debug}
      />
      <div className={cn("alka-glass-element__content", contentClassName)}>{children}</div>
    </div>
  ),
)
GlassElement.displayName = "GlassElement"
