# Alkamanas UI

Alkamanas UI is a React component library and shadcn-style registry extracted from the Visetra Studio and Visetra Web interface systems. It focuses on dark, glass-first surfaces, smooth motion, section-aware navigation, and production-ready primitives for Alkamanas products.

## Workspace

- `@alkamanas/ui`: React components, hooks, theme tokens, layout shells, and motion patterns.
- `@alkamanas/cli`: Registry CLI package scaffold for future `alka` workflows.
- `@alkamanas/docs`: Vite documentation and component preview app.
- `registry/`: Registry manifest and component metadata for copy-and-customize distribution.

## Component Surface

The library currently includes core primitives such as Button, Input, Sheet, Dialog, Alert Dialog, Accordion, Carousel, Tabs, Sidebar, Select, Dropdown Menu, Command, Tooltip, Toast, Toggle, and form controls. It also includes Visetra-derived patterns:

- Section-aware navbar with light/dark section behavior.
- Smooth mobile navbar motion inspired by Visetra Web.
- Viewport-expanding flip cards.
- Apple-inspired sheet, carousel, tabs, and disclosure interactions.
- Shared glass panel and pill surface standards.
- Semantic `success`, `warning`, `info`, and `chart-1..5` tokens for dashboards, badges, and stat visuals.

## Install

```bash
pnpm add @alkamanas/ui
```

```tsx
import { Button, Card, Sheet, SectionAwareNavbar } from "@alkamanas/ui";
import "@alkamanas/ui/styles.css";
```

## Development

```bash
corepack enable
pnpm install
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm dev
```

The docs app runs with Vite and is the primary playground:

```bash
pnpm --filter @alkamanas/docs dev
```

This repository uses pnpm workspaces. Do not commit npm `package-lock.json`; `pnpm-lock.yaml` is the canonical lockfile.

## Package Format

`@alkamanas/ui` is ESM-only. CommonJS `require()` is not supported; older Jest or Node setups need ESM-aware configuration or transpilation. The package exposes one JavaScript entrypoint plus the stylesheet:

```tsx
import { Button, Card } from "@alkamanas/ui";
import "@alkamanas/ui/styles.css";
```

Subpath component exports are intentionally not listed until the build creates real per-component entrypoints.

## Publishing

Packages are scoped under the `@alkamanas` npm organization. Publishing should be performed by an npm account that has access to the `alkamanas` owner scope.

```bash
pnpm build
pnpm --filter @alkamanas/ui publish --access public
pnpm --filter @alkamanas/cli publish --access public
```

`@alkamanas/docs` is private and ignored by Changesets.

## Validation

Before pushing or publishing, run:

```bash
pnpm verify
```
