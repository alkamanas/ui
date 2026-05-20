# @alkamanas/ui

React primitives, theme tokens, motion patterns, and glass surface components for Alkamanas interfaces.

This package contains the public component library used by the Alkamanas UI workspace. It is built for product screens that need dense layouts, polished form controls, animated overlays, section-aware navigation, and reusable glass surfaces.

## Install

```bash
pnpm add @alkamanas/ui
```

Import styles once in your application:

```tsx
import "@alkamanas/ui/styles.css";
```

Then import components from the package entrypoint:

```tsx
import { Button, Card, Input, Sheet, Tabs } from "@alkamanas/ui";
```

## Peer Dependencies

The package expects React and React DOM from the host app:

```bash
pnpm add react react-dom
```

Optional peers:

- `lucide-react`: used by examples and icon-forward components.
- `react-hook-form`: used only by form integrations imported from `@alkamanas/ui/form`.

## Quick Example

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@alkamanas/ui";
import "@alkamanas/ui/styles.css";

export function LoginPanel() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Access workspace</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Input variant="pill" placeholder="Email address" />
        <Button>Continue</Button>
      </CardContent>
    </Card>
  );
}
```

## Component Catalog

### Actions

- `Button`
- `ButtonGroup`
- `Toggle`
- `ToggleGroup`

### Forms

- `Checkbox`
- `Combobox`
- `Input`
- `InputGroup`
- `InputOTP`
- `Label`
- `RadioGroup`
- `Select`
- `Slider`
- `Switch`
- `Textarea`

### Overlays

- `AlertDialog`
- `ContextMenu`
- `Dialog`
- `Drawer`
- `DropdownMenu`
- `Popover`
- `Sheet`
- `Toast`
- `Tooltip`

### Navigation

- `Breadcrumb`
- `Menubar`
- `Navbar`
- `Sidebar`
- `Tabs`

### Display And Feedback

- `Accordion`
- `Avatar`
- `Badge`
- `Card`
- `Carousel`
- `Collapsible`
- `Direction`
- `FlipCard`
- `ImageCard`
- `Item`
- `Kbd`
- `Progress`
- `ScrollArea`
- `Separator`
- `Spinner`

### Command And Shell

- `Command`
- `CommandPalette`
- `FloatingPanel`

## Glass Surfaces

The library includes a shared glass system used by cards, nav surfaces, overlays, items, and shell panels.

```tsx
import { GlassProvider } from "@alkamanas/ui";
import { Navbar, NavbarCTA } from "@alkamanas/ui/navbar";
import "@alkamanas/ui/navbar.css";

export function Shell() {
  return (
    <GlassProvider effect="blurry" realisticStrategy="auto">
      <Navbar
        theme="dark"
        logo={{
          wide: { dark: <span>Alkamanas UI</span>, light: <span>Alkamanas UI</span> },
          compact: { dark: <span>A</span>, light: <span>A</span> },
        }}
        logoWidths={{ wide: "10rem", compact: "2.25rem" }}
        links={[{ href: "#components", label: "Components" }]}
        rightSlot={<NavbarCTA href="#install">Install</NavbarCTA>}
      />
    </GlassProvider>
  );
}
```

Glass options:

- `effect="blurry"`: default cost-efficient blur treatment.
- `effect="realistic"`: chromatic displacement glass.
- `realisticStrategy="auto"`: automatic cost-aware strategy.
- `realisticStrategy="static"`: shared static lens treatment.
- `realisticStrategy="premium"`: per-surface displacement treatment.

Individual components can override provider defaults when they expose glass props, for example:

```tsx
<Navbar
  theme="dark"
  glassEffect="realistic"
  glassRealisticStrategy="premium"
  brand={<span>Alkamanas UI</span>}
/>
```

## Theme Scopes

Use theme scopes when light and dark surfaces live on the same route:

```tsx
<section className="alka-theme-dark">
  <DarkDashboard />
</section>

<section className="alka-theme-light">
  <LightPanel />
</section>
```

The token system includes primary color, semantic status colors, chart colors, glass surfaces, border animation colors, surface gradients, radius, shadow, blur, and motion variables.

## Section-Aware Navbar

`Navbar` can follow page sections marked with `data-navbar-theme`:

```tsx
<section data-navbar-theme="dark" data-theme-color="#050505">
  <DarkHero />
</section>

<section data-navbar-theme="light" data-theme-color="#f5f5f7">
  <LightContent />
</section>
```

The navbar can switch contrast, sync theme metadata, and hide the panel while it is at the top of the page.

## Package Format

`@alkamanas/ui` is ESM-only. CommonJS `require()` is not supported.

```tsx
import { Button, Dialog, Sheet } from "@alkamanas/ui";
import "@alkamanas/ui/styles.css";
```

The package publishes a full JavaScript entrypoint plus focused subpaths for dependency-sensitive integrations:

```tsx
import { Navbar } from "@alkamanas/ui/navbar";
import "@alkamanas/ui/navbar.css";

import { Form, FormField } from "@alkamanas/ui/form";
```

## Development

From the workspace root:

```bash
pnpm --filter @alkamanas/ui typecheck
pnpm --filter @alkamanas/ui test
pnpm --filter @alkamanas/ui build
```

Update registry metadata after changing public component source:

```bash
pnpm registry:update
```

## Publishing

```bash
pnpm --filter @alkamanas/ui build
pnpm --filter @alkamanas/ui publish --access public
```
