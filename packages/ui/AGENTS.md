# @alkamanas/ui Implementation Rules

- Keep copied Visetra Studio primitive APIs stable unless a change is required for package safety.
- Components in `components/ui` should remain shadcn/Radix-compatible.
- Visetra Web patterns must be generalized through props instead of app routing or i18n imports.
- Public exports live in `src/index.ts`.
- New visual components must use Alkamanas tokens and support `className`.
- Use shared visual props where relevant: `borderAnimationColor`, `surfaceGradientColor`, `surface="flat" | "gradient" | "bare"` and glass effect controlled by `data-glass-effect`.
- Keep option-like items consistent across `Command`, `Select`, `Combobox`, `DropdownMenu`, `ContextMenu` and `SidebarMenuButton`.
- Do not duplicate glass implementations. Reuse `alka-liquid-glass`, `GlassElementLayers` and `LiquidGlassFilter`.
- Preserve slider geometry: the track is centered and shorter by one thumb width so fill aligns with the thumb center.
