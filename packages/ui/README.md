# @alkamanas/ui

Premium React UI primitives, motion patterns, and design tokens for Alkamanas applications.

The package is extracted from the Visetra Studio and Visetra Web interface systems. It preserves the dark glass dashboard aesthetic, section-aware navbar behavior, smooth mobile navigation motion, and viewport-expanding flip card pattern.

## Install

```bash
pnpm add @alkamanas/ui
```

```tsx
import { Button, Input, Sheet, Tabs } from "@alkamanas/ui";
import "@alkamanas/ui/styles.css";
```

## Usage

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from "@alkamanas/ui";
import "@alkamanas/ui/styles.css";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Continue</Button>
      </CardContent>
    </Card>
  );
}
```

## Highlights

- Token-driven light and dark themes.
- Token-driven primary color system with white default in dark mode.
- Semantic `success`, `warning`, `info` and `chart-1..5` tokens for product dashboards and status surfaces.
- Shared glass system with blurry and realistic chromatic modes.
- Solid and glass button variants with subtle hover feedback.
- Apple-inspired bottom-attached Sheet with `size="sm" | "md" | "lg" | "xl"`.
- Animated Tabs and Carousel pagination with glass pill surfaces.
- Code-copy friendly primitives powered by Radix UI.
- Visetra Web style section-aware navbar and flip cards.

## Package Format

This package is ESM-only and publishes a single JavaScript entrypoint. CommonJS `require()` is not supported; older Jest or Node setups need ESM-aware configuration or transpilation. Component subpath exports are intentionally omitted until the build emits real per-component chunks and declarations.

## Exports

The main package export includes all components:

```tsx
import { Button, Dialog, Sheet, SectionAwareNavbar, FlipCard } from "@alkamanas/ui";
```

Styles are exported separately:

```tsx
import "@alkamanas/ui/styles.css";
```

## Publish

This package is intended to be published under the `@alkamanas` npm organization:

```bash
pnpm --filter @alkamanas/ui build
pnpm --filter @alkamanas/ui publish --access public
```
