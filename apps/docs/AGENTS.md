# Docs App Rules

- The first screen is a working component playground, not a marketing page.
- Every new component demo should show light and dark section behavior when relevant.
- Use local package imports from `@alkamanas/ui`.
- Keep docs copy concise and structured for humans and agents.
- Component Code tabs must be real examples for the visible preview, including important props and variants.
- Keep the Blocks page separate from the component directory; blocks should compose real `@alkamanas/ui` components for regression testing.
- The sticky primary selector controls primary color, border animation color, surface gradient color and glass realistic mode; do not create parallel controls.
- Docs glass panels should use the same `alka-liquid-glass` system as package components.
- Do not put glass item rows inside glass panels; use `surface="bare"` or a flat treatment for child rows in composed glass examples.
