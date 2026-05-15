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
