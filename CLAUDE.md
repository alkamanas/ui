# Claude Guide

Alkamanas UI is a Tailwind-first React library. Keep Visetra Studio primitive names and Visetra Web motion patterns recognizable, but remove app-specific routing, i18n, stores and services from public components.

Prefer:

- `@alkamanas/ui` package imports for primitives.
- Registry metadata for agent-readable component selection.
- Section-level theme scopes instead of global-only theme assumptions.
- Token-driven primary, border animation and gradient colors instead of fixed white/blue/gold values.
- The shared `alka-liquid-glass` surface for glass components; switch between `data-glass-effect="blurry"` and `data-glass-effect="realistic"` rather than creating separate glass systems.
- Component props for local visual overrides: `borderAnimationColor`, `surfaceGradientColor`, `surface="flat" | "gradient" | "bare"` where supported.

Avoid:

- Importing application services or routes into package components.
- Hard-coding brand colors outside token definitions.
- Forking primitive source when a `className` override is enough.
- Reintroducing generic docs snippets such as `<Button />` only. Code examples should match the visible preview and include important variant/animation props.

Recent implementation notes:

- Buttons no longer use the old hover border effect. Solid and glass variants are separate; glass primary/destructive keep readable text, shared padding and subtle opacity feedback.
- Inputs, input groups, textareas, selects and comboboxes share the bordered pill animation language. Flat and gradient examples should both remain documented.
- Select, combobox, command and sidebar menu items use medium primary-aware hover/selected backgrounds.
- Carousel paging follows the Apple-style compact control: selected dot stretches, play/pause and prev/next controls use the shared glass surface.
- Accordion follows the Apple-style disclosure stack with full-width items, quick width/height motion and optional `borderGradientColor`.
- Slider fill must meet the center of the thumb; do not make the track full width unless the thumb math is updated.
