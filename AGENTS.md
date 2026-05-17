# Alkamanas UI Agent Guide

Use package imports for primitives and stable patterns:

```tsx
import { Button, Card, SectionAwareNavbar } from "@alkamanas/ui";
```

Use registry copy when the component is expected to be customized deeply in the target project.

Implementation rules:

- Preserve `components/ui`, `components/shell` and `components/skeletons` naming unless there is a clear migration reason.
- Every public component accepts `className` when it renders a visible root.
- Prefer CSS variables over hard-coded visual values.
- Light and dark sections must work inside the same page through `.alka-theme-light`, `.alka-theme-dark`, `.theme-light` and `.theme-dark` scopes.
- Navbar theme switching follows sections marked with `data-navbar-theme="light|dark"` and optional `data-theme-color`.
- Motion uses `--alka-motion-*` and `--alka-ease-*` tokens where practical, and must respect `prefers-reduced-motion`.
- Components that rely on browser APIs must be client components.
- Add docs examples for light and dark scopes when adding new public visual components.

Current system conventions:

- Primary color is token-driven. Keep `--alka-primary`, `--primary`, `--alka-primary-foreground` and `--primary-foreground` aligned; do not hard-code component highlight colors.
- Border animation color is configurable at app level through `data-border-animation-color="primary|contrast"` and can be overridden per supported component with `borderAnimationColor`.
- Spotlight/subtle surface gradients are configurable through `data-surface-gradient-color="primary|contrast"` and per-component `surfaceGradientColor`.
- Glass surfaces use one shared `alka-liquid-glass` system with `data-glass-effect="blurry|realistic"`. `blurry` is the default; `realistic` enables the chromatic SVG displacement glass.
- Components with selectable surfaces should prefer `surface="flat" | "gradient"`; use `surface="bare"` only in composed glass panels where the parent panel supplies the background.
- `Button` has solid variants and glass variants (`glassPrimary`, `glassDestructive`, `outline`). Glass buttons should keep the same padding as solid buttons and should not use the old conic hover border effect.
- `Input`, `InputGroup`, `Textarea`, `SelectTrigger` and `Combobox` should keep matching pill/bordered focus behavior, close/open motion and optional gradient variants.
- `CommandItem`, select options, combobox options and sidebar menu items share the command-like rounded item language with primary-aware hover/selected states.
- `Slider` track is intentionally shorter by one thumb width and centered so the filled range ends at the thumb center at 0 and 100.
- Docs component Code tabs must show real, copyable examples for each component and its important props, not a generic `<Component />` placeholder.
