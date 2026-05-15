# @alkamanas/ui

Premium React UI primitives, motion patterns, and design tokens for Alkamanas applications.

The package is extracted from the Visetra Studio and Visetra Web interface systems. It preserves the dark glass dashboard aesthetic, section-aware navbar behavior, smooth mobile navigation motion, and viewport-expanding flip card pattern.

## Install

```bash
npm install @alkamanas/ui
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
- Black/white primary color system.
- Smooth conic-gradient button hover borders.
- Apple-inspired bottom-attached Sheet with `size="sm" | "md" | "lg" | "xl"`.
- Animated Tabs and Carousel pagination with glass pill surfaces.
- Code-copy friendly primitives powered by Radix UI.
- Visetra Web style section-aware navbar and flip cards.

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
npm run build -w @alkamanas/ui
npm publish -w @alkamanas/ui --access public
```
