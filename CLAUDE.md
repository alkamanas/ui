# Claude Guide

Alkamanas UI is a Tailwind-first React library. Keep Visetra Studio primitive names and Visetra Web motion patterns recognizable, but remove app-specific routing, i18n, stores and services from public components.

Prefer:

- `@alkamanas/ui` package imports for primitives.
- Registry metadata for agent-readable component selection.
- Section-level theme scopes instead of global-only theme assumptions.

Avoid:

- Importing application services or routes into package components.
- Hard-coding brand colors outside token definitions.
- Forking primitive source when a `className` override is enough.
