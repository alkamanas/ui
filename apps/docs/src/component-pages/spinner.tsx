import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Spinner is a display primitive in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "anatomy": [
    "Import Spinner from @alkamanas/ui for loading states that need a compact visual indicator.",
    "The visible root is an SVG that accepts className so product teams can size or recolor it without forking the primitive.",
    "The component inherits currentColor and defaults to the nearest primary token."
  ],
  "variants": [
    {
      "name": "default",
      "description": "A single stroked circle with a smooth rotating dash."
    },
    {
      "name": "themed",
      "description": "Responds to primary color and dark/light section changes from the docs selector."
    }
  ],
  "sizes": [
    {
      "name": "sm",
      "description": "Compact inline loading states."
    },
    {
      "name": "md",
      "description": "Default control and menu loading state."
    },
    {
      "name": "lg",
      "description": "Large empty or centered loading state."
    }
  ],
  "props": [
    {
      "name": "className",
      "type": "string",
      "description": "Merged onto the visible root when the primitive renders one."
    },
    {
      "name": "size",
      "type": "\"sm\" | \"md\" | \"lg\"",
      "description": "Controls the rendered SVG size."
    }
  ],
  "accessibility": [
    "Preserve the underlying Radix or native semantics when composing custom children.",
    "Keep interactive labels visible, or provide aria-label for icon-only controls.",
    "Keyboard focus states should remain visible against both glass and solid surfaces."
  ],
  "motion": [
    "The SVG rotates linearly while the circle stroke breathes through dasharray and dashoffset keyframes.",
    "The animation respects prefers-reduced-motion by holding a static segmented mark."
  ],
  "tokens": [
    "--alka-ease-smooth",
    "--primary",
    "--foreground"
  ]
};

export function SpinnerPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
