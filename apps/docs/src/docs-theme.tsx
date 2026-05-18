import * as React from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { GlassElementLayers, Label, Separator, Switch } from "@alkamanas/ui";

export type PrimaryThemeId = "white" | "visetra" | "red" | "blue" | "turquoise" | "green" | "purple";
export type GlassEffectId = "blurry" | "realistic";
export type BorderAnimationColorId = "primary" | "contrast";
export type SurfaceGradientColorId = "primary" | "contrast";

const primaryThemeOptions: Record<PrimaryThemeId, {
  label: string;
  primary: string;
  primaryForeground: string;
  swatch: string;
}> = {
  white: {
    label: "White",
    primary: "0 0% 100%",
    primaryForeground: "0 0% 2%",
    swatch: "#ffffff",
  },
  visetra: {
    label: "Visetra Gold",
    primary: "41 39% 59%",
    primaryForeground: "0 0% 2%",
    swatch: "#c0a46d",
  },
  red: {
    label: "Red",
    primary: "5 100% 50%",
    primaryForeground: "0 0% 100%",
    swatch: "#ff1200",
  },
  blue: {
    label: "Blue",
    primary: "221 83% 53%",
    primaryForeground: "0 0% 100%",
    swatch: "#2563eb",
  },
  turquoise: {
    label: "Turquoise",
    primary: "187 92% 45%",
    primaryForeground: "0 0% 2%",
    swatch: "#06b6d4",
  },
  green: {
    label: "Green",
    primary: "142 71% 45%",
    primaryForeground: "0 0% 2%",
    swatch: "#22c55e",
  },
  purple: {
    label: "Purple",
    primary: "258 90% 66%",
    primaryForeground: "0 0% 100%",
    swatch: "#8b5cf6",
  },
};

export function getPrimaryThemeStyle(theme: PrimaryThemeId): React.CSSProperties {
  const option = primaryThemeOptions[theme];

  return {
    "--alka-primary": option.primary,
    "--alka-primary-foreground": option.primaryForeground,
    "--primary": option.primary,
    "--primary-foreground": option.primaryForeground,
    "--alka-accent": option.primary,
    "--alka-accent-foreground": option.primaryForeground,
    "--accent": option.primary,
    "--accent-foreground": option.primaryForeground,
    "--alka-ring": option.primary,
    "--ring": option.primary,
    "--sidebar-primary": option.primary,
    "--sidebar-primary-foreground": option.primaryForeground,
  } as React.CSSProperties;
}

export function PrimaryColorSwitcher({
  className,
  value,
  onChange,
  borderAnimationColor,
  onBorderAnimationColorChange,
  surfaceGradientColor,
  onSurfaceGradientColorChange,
  glassEffect,
  onGlassEffectChange,
}: {
  className?: string;
  value: PrimaryThemeId;
  onChange: (value: PrimaryThemeId) => void;
  borderAnimationColor: BorderAnimationColorId;
  onBorderAnimationColorChange: (value: BorderAnimationColorId) => void;
  surfaceGradientColor: SurfaceGradientColorId;
  onSurfaceGradientColorChange: (value: SurfaceGradientColorId) => void;
  glassEffect: GlassEffectId;
  onGlassEffectChange: (value: GlassEffectId) => void;
}) {
  const realisticModeId = React.useId();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div
      className={["docs-primary-switcher alka-liquid-glass rounded-3xl border p-3 text-sm", className].filter(Boolean).join(" ")}
      data-collapsed={isCollapsed ? "true" : undefined}
    >
      <GlassElementLayers />
      <div className="docs-primary-switcher-header mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-muted-foreground/70">
            Primary
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Color token</p>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.1] bg-white/[0.04]">
          <Sparkles className="h-4 w-4 text-primary" />
        </span>
        <button
          type="button"
          aria-label={isCollapsed ? "Show selector panel" : "Hide selector panel"}
          aria-expanded={!isCollapsed}
          onClick={() => setIsCollapsed((current) => !current)}
          className="docs-primary-switcher-toggle grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-white/[0.1] bg-white/[0.04] text-muted-foreground transition-[background-color,border-color,color] duration-300 ease-[var(--alka-ease-smooth)] hover:border-primary/25 hover:bg-primary/10 hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(primaryThemeOptions) as PrimaryThemeId[]).map((key) => {
          const option = primaryThemeOptions[key];
          const isActive = value === key;

          return (
            <button
              key={key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(key)}
              className={[
                "flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-3 text-left text-xs font-semibold transition-[background-color,border-color,color,box-shadow] duration-300 ease-[var(--alka-ease-smooth)]",
                isActive
                  ? "border-primary/30 bg-primary/[0.18] text-foreground shadow-[inset_0_1px_0_hsl(var(--primary)_/_0.16)]"
                  : "border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:border-primary/20 hover:bg-primary/10 hover:text-foreground"
              ].join(" ")}
            >
              <span
                className="h-4 w-4 shrink-0 rounded-full border border-white/20 shadow-[0_0_16px_hsl(var(--primary)_/_0.18)]"
                style={{ backgroundColor: option.swatch }}
              />
              <span className="min-w-0 truncate">{option.label}</span>
            </button>
          );
        })}
      </div>
      <Separator className="my-3 bg-white/[0.08]" />
      <div className="grid gap-3">
        <p className="px-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-muted-foreground/70">
          Border
        </p>
        <div className="grid grid-cols-2 gap-2">
          {([
            ["primary", "Primary"],
            ["contrast", "Contrast"],
          ] as const).map(([key, label]) => {
            const isActive = borderAnimationColor === key;

            return (
              <button
                key={key}
                type="button"
                aria-pressed={isActive}
                onClick={() => onBorderAnimationColorChange(key)}
                className={[
                  "flex min-h-10 cursor-pointer items-center justify-center rounded-full border px-3 text-xs font-semibold transition-[background-color,border-color,color] duration-300 ease-[var(--alka-ease-smooth)]",
                  isActive
                    ? "border-primary/30 bg-primary/[0.16] text-foreground"
                    : "border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:border-primary/20 hover:bg-primary/10 hover:text-foreground"
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>
        <p className="px-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-muted-foreground/70">
          Gradient
        </p>
        <div className="grid grid-cols-2 gap-2">
          {([
            ["primary", "Primary"],
            ["contrast", "Contrast"],
          ] as const).map(([key, label]) => {
            const isActive = surfaceGradientColor === key;

            return (
              <button
                key={key}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSurfaceGradientColorChange(key)}
                className={[
                  "flex min-h-10 cursor-pointer items-center justify-center rounded-full border px-3 text-xs font-semibold transition-[background-color,border-color,color] duration-300 ease-[var(--alka-ease-smooth)]",
                  isActive
                    ? "border-primary/30 bg-primary/[0.16] text-foreground"
                    : "border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:border-primary/20 hover:bg-primary/10 hover:text-foreground"
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <Separator className="my-3 bg-white/[0.08]" />
      <div className="flex items-center justify-between gap-4 rounded-[1.35rem] px-2 py-1.5">
        <Label htmlFor={realisticModeId} className="min-w-0 cursor-pointer">
          <span className="block text-xs font-semibold text-foreground">Realistic mode</span>
          <span className="mt-1 block text-[0.68rem] leading-4 text-muted-foreground">
            Chromatic glass effect
          </span>
        </Label>
        <Switch
          id={realisticModeId}
          checked={glassEffect === "realistic"}
          onCheckedChange={(checked) => onGlassEffectChange(checked ? "realistic" : "blurry")}
        />
      </div>
    </div>
  );
}
