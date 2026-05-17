export const LIQUID_GLASS_FILTER_ID = "alka-liquid-glass-lens";

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
          scale="68"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
