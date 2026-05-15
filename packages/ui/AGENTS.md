# @alkamanas/ui Implementation Rules

- Keep copied Visetra Studio primitive APIs stable unless a change is required for package safety.
- Components in `components/ui` should remain shadcn/Radix-compatible.
- Visetra Web patterns must be generalized through props instead of app routing or i18n imports.
- Public exports live in `src/index.ts`.
- New visual components must use Alkamanas tokens and support `className`.
