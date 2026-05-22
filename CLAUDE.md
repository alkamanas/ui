# Claude Guide

Alkamanas UI is a Tailwind-first React library. Keep Visetra Studio primitive names and Visetra Web motion patterns recognizable, but remove app-specific routing, i18n, stores and services from public components.

Prefer:

- `@alkamanas/ui` package imports for broad primitive usage.
- Focused subpath imports for consumer apps that need narrow dependency and CSS surfaces, for example `@alkamanas/ui/navbar` with `@alkamanas/ui/navbar.css`.
- Registry metadata for agent-readable component selection.
- Namespaced section-level theme scopes (`.alka-theme-light`, `.alka-theme-dark`) instead of global-only theme assumptions.
- Token-driven primary, border animation and gradient colors instead of fixed white/blue/gold values.
- The shared `alka-liquid-glass` surface for glass components; switch between `data-glass-effect="blurry"` and `data-glass-effect="realistic"` rather than creating separate glass systems.
- Non-glass child surfaces inside glass panels; rows such as `Item` should use `surface="bare"` or another flat treatment instead of nested `surface="glass"`.
- Component visual overrides are token/class driven: use utilities such as `gradient-primary`, `gradient-primary/50`, `border-animation-primary`, `border-animation-primary/50` plus `surface="flat" | "gradient" | "bare"` where supported. Do not reintroduce `primary|contrast` border or gradient props.

Avoid:

- Importing application services or routes into package components.
- Hard-coding brand colors outside token definitions.
- Forking primitive source when a `className` override is enough.
- Adding new published CSS selectors for generic `.theme-light` or `.theme-dark`; package output should use `.alka-theme-light` and `.alka-theme-dark`.
- Importing `react-hook-form` from the root package barrel or unrelated component subpaths. Form integrations live behind `@alkamanas/ui/form`.
- Reintroducing generic docs snippets such as `<Button />` only. Code examples should match the visible preview and include important variant/animation props.

Recent implementation notes:

- `Navbar` is the public component name. `SectionAwareNavbar` remains as a backwards-compatible alias only.
- Navbar supports wide/compact logo variants with dark/light alternatives through the `logo` prop, and exports `NavbarCTA`, `NavbarMenuItem` and `NavbarMenuSecondaryItem` for composition.
- Every public component should build to a JS/DTS subpath and a CSS subpath, such as `@alkamanas/ui/button` and `@alkamanas/ui/button.css`.
- `styles.css` remains the full-library stylesheet, but consumer examples should prefer focused component CSS when possible.
- Buttons no longer use the old hover border effect. Solid and glass variants are separate; glass primary/destructive keep readable text, shared padding and subtle opacity feedback.
- Inputs, input groups, textareas, selects and comboboxes share the bordered pill animation language. Flat and gradient examples should both remain documented.
- Select, combobox, command and sidebar menu items use medium primary-aware hover/selected backgrounds.
- Carousel paging follows the Apple-style compact control: selected dot stretches, play/pause and prev/next controls use the shared glass surface.
- Accordion follows the Apple-style disclosure stack with full-width items and quick width/height motion.
- Slider fill must meet the center of the thumb; do not make the track full width unless the thumb math is updated.
