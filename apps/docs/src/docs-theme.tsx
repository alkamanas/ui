import * as React from "react";
import { ChevronRight, Moon, Sparkles, Sun } from "lucide-react";
import { GlassElementLayers, Label, Separator, Switch } from "@alkamanas/ui";

export type DocsThemeModeId = "dark" | "light";
export type PrimaryThemeId = "white" | "visetra" | "red" | "blue" | "turquoise" | "green" | "purple";
export type GlassEffectId = "blurry" | "realistic";

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
    label: "Gold",
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

function resolvePrimaryThemeOption(theme: PrimaryThemeId, themeMode: DocsThemeModeId) {
  const option = primaryThemeOptions[theme];

  if (theme === "white" && themeMode === "light") {
    return {
      ...option,
      label: "Black",
      primary: "0 0% 0%",
      primaryForeground: "0 0% 100%",
      swatch: "#000000",
    };
  }

  return option;
}

export function getPrimaryThemeStyle(theme: PrimaryThemeId, themeMode: DocsThemeModeId = "dark"): React.CSSProperties {
  const resolvedOption = resolvePrimaryThemeOption(theme, themeMode);

  return {
    "--primary": resolvedOption.primary,
    "--primary-foreground": resolvedOption.primaryForeground,
    "--accent": resolvedOption.primary,
    "--accent-foreground": resolvedOption.primaryForeground,
    "--ring": resolvedOption.primary,
    "--sidebar-primary": resolvedOption.primary,
    "--sidebar-primary-foreground": resolvedOption.primaryForeground,
  } as React.CSSProperties;
}

export function PrimaryColorSwitcher({
  className,
  value,
  onChange,
  themeMode,
  onThemeModeChange,
  glassEffect,
  onGlassEffectChange,
}: {
  className?: string;
  value: PrimaryThemeId;
  onChange: (value: PrimaryThemeId) => void;
  themeMode: DocsThemeModeId;
  onThemeModeChange: (value: DocsThemeModeId) => void;
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
            Theme
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Appearance</p>
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
        {([
          ["dark", "Dark", Moon],
          ["light", "Light", Sun],
        ] as const).map(([key, label, Icon]) => {
          const isActive = themeMode === key;

          return (
            <button
              key={key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onThemeModeChange(key)}
              className={[
                "flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-full border px-3 text-xs font-semibold transition-[background-color,border-color,color] duration-300 ease-[var(--alka-ease-smooth)]",
                isActive
                  ? "border-primary/30 bg-primary/[0.16] text-foreground"
                  : "border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:border-primary/20 hover:bg-primary/10 hover:text-foreground",
              ].join(" ")}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          );
        })}
      </div>
      <Separator className="my-3 bg-white/[0.08]" />
      <p className="mb-2 px-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-muted-foreground/70">
        Primary
      </p>
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(primaryThemeOptions) as PrimaryThemeId[]).map((key) => {
          const option = resolvePrimaryThemeOption(key, themeMode);
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
