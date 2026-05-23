# Alkamanas UI Agent Guide

Use package imports for primitives and stable patterns:

```tsx
import { Button, Card } from "@alkamanas/ui";
```

Use focused subpath imports when a target app should avoid pulling unrelated component dependencies or global CSS:

```tsx
import { Navbar, NavbarCTA } from "@alkamanas/ui/navbar";
import "@alkamanas/ui/navbar.css";

import { Button } from "@alkamanas/ui/button";
import "@alkamanas/ui/button.css";
```

Use registry copy when the component is expected to be customized deeply in the target project.

Implementation rules:

- Preserve `components/ui`, `components/shell` and `components/skeletons` naming unless there is a clear migration reason.
- Every public component accepts `className` when it renders a visible root.
- Prefer CSS variables over hard-coded visual values.
- Light and dark sections must work inside the same page through namespaced `.alka-theme-light` / `.alka-theme-dark` scopes and through `data-theme`, `data-section-theme` or `data-navbar-theme` values. Do not add new package selectors that target generic `.theme-light` or `.theme-dark`.
- Navbar theme switching follows sections marked with `data-navbar-theme="light|dark"` and optional `data-theme-color`.
- Components should inherit light/dark tokens from their closest section theme; if a section is not marked, they should fall back to the global app theme.
- The public navbar component is `Navbar`. `SectionAwareNavbar` is only a backwards-compatible alias.
- Navbar supports `logo` variants for `wide` and `compact`, each with optional `light` and `dark` alternatives. Use `NavbarCTA`, `NavbarMenuItem` and `NavbarMenuSecondaryItem` for composed navbar actions and menus.
- Motion uses `--alka-motion-*` and `--alka-ease-*` tokens where practical, and must respect `prefers-reduced-motion`.
- Components that rely on browser APIs must be client components.
- Add docs examples for light and dark scopes when adding new public visual components.
- Every public component should remain available through both the root package barrel and focused `@alkamanas/ui/<component>` plus `@alkamanas/ui/<component>.css` exports.

Current system conventions:

- Primary color is token-driven through the shadcn-compatible `--primary` and `--primary-foreground` tokens; do not introduce parallel vendor-prefixed aliases or hard-code component highlight colors.
- Package CSS output strips generic `.theme-light` and `.theme-dark` selectors. Keep compatibility inside docs/apps only when needed, not in published CSS.
- `styles.css` is the full library stylesheet. Prefer component CSS subpaths such as `@alkamanas/ui/card.css` or `@alkamanas/ui/navbar.css` for consumer apps that already own Tailwind/theme globals.
- `react-hook-form` is optional and must only be imported by `@alkamanas/ui/form`; root imports and unrelated component subpaths must not depend on it.
- `lucide-react` is optional with a broad `>=0.469.0 <1.0.0` peer range. Icon-forward component subpaths may require it, but unrelated subpaths should not.
- Border animation color is token-driven through `--alka-border-animation-color` and `--alka-border-animation-opacity`. Defaults are theme-aware: dark scopes use the foreground-like border token, light scopes use the dedicated white border token. Do not reintroduce `primary|contrast` data attributes or visual props.
- Spotlight/subtle surface gradients are token-driven through `--alka-gradient-color` and `--alka-gradient-opacity`. Defaults are theme-aware: dark scopes use the foreground-like gradient token, light scopes use the dedicated white gradient token. Assign overrides with utility classes such as `gradient-primary`, `gradient-primary/50`, `border-animation-primary` or `border-animation-primary/50` on a component or parent scope.
- Glass surfaces use one shared `alka-liquid-glass` system with `data-glass-effect="blurry|realistic"`. `blurry` is the default; `realistic` enables the chromatic SVG displacement glass.
- Components with selectable surfaces should prefer `surface="flat" | "gradient"`; use `surface="bare"` only in composed glass panels where the parent panel supplies the background.
- Do not nest glass surfaces inside glass panels. Items and similar child rows inside a glass `Card`, panel or navbar menu should use `surface="bare"` or a flat/non-glass treatment instead of `surface="glass"`.
- `Button` defaults to the flat variant. `solid` remains a compatibility alias, while glass variants (`glassPrimary`, `glassDestructive`, `outline`) opt into the glass treatment. Glass buttons should keep the same padding as flat buttons and should not use the old conic hover border effect.
- `Input`, `InputGroup`, `Textarea`, `SelectTrigger` and `Combobox` should keep matching pill/bordered focus behavior, close/open motion and optional gradient variants.
- `CommandItem`, select options, combobox options and sidebar menu items share the command-like rounded item language with primary-aware hover/selected states.
- `Slider` track is intentionally shorter by one thumb width and centered so the filled range ends at the thumb center at 0 and 100.
- Docs component Code tabs must show real, copyable examples for each component and its important props, not a generic `<Component />` placeholder.
