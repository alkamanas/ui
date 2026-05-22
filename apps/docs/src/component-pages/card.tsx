import { Card, CardDescription, CardHeader, CardTitle } from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Card is a display primitive in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "examples": [
    {
      "id": "card-glass",
      "title": "Glass card",
      "description": "The default Card is a true Alkamanas glass surface, suitable for dashboards and rich dark sections.",
      "preview": (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Glass default</CardTitle>
            <CardDescription>Floating, blurred, token-driven surface.</CardDescription>
          </CardHeader>
        </Card>
      ),
      "code": `import { Card, CardDescription, CardHeader, CardTitle } from "@alkamanas/ui";

export function GlassCardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Glass default</CardTitle>
        <CardDescription>Floating, blurred, token-driven surface.</CardDescription>
      </CardHeader>
    </Card>
  );
}`
    },
    {
      "id": "card-solid",
      "title": "Solid card",
      "description": "Use solid cards when the surface is already inside a glass shell and needs less optical distortion.",
      "preview": (
        <Card variant="solid" className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Solid</CardTitle>
            <CardDescription>Use inside dense content areas.</CardDescription>
          </CardHeader>
        </Card>
      ),
      "code": `import { Card, CardDescription, CardHeader, CardTitle } from "@alkamanas/ui";

export function SolidCardExample() {
  return (
    <Card variant="solid">
      <CardHeader>
        <CardTitle>Solid</CardTitle>
        <CardDescription>Use inside dense content areas.</CardDescription>
      </CardHeader>
    </Card>
  );
}`
    }
  ],
  "anatomy": [
    "Import Card from @alkamanas/ui and compose it with the documented subcomponents when the primitive is compound.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, primary, border animation and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Card treatment used in the component preview."
    },
    {
      "name": "themed",
      "description": "Responds to primary color, dark/light section and glass mode changes from the docs selector."
    }
  ],
  "sizes": [
    {
      "name": "content",
      "description": "Uses intrinsic sizing unless a fixed control size is documented for this component."
    },
    {
      "name": "responsive",
      "description": "Keeps text and controls within their parent bounds on mobile and desktop layouts."
    }
  ],
  "props": [
    {
      "name": "className",
      "type": "string",
      "description": "Merged onto the visible root when the primitive renders one."
    },
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Used for composition in compound primitives."
    }
  ],
  "accessibility": [
    "Preserve the underlying Radix or native semantics when composing custom children.",
    "Keep interactive labels visible, or provide aria-label for icon-only controls.",
    "Keyboard focus states should remain visible against both glass and solid surfaces."
  ],
  "motion": [
    "Motion uses --alka-motion-* and --alka-ease-* tokens and should respect prefers-reduced-motion.",
    "Open, close, hover and focus states avoid layout shift by keeping stable dimensions."
  ],
  "tokens": [
    "--alka-ease-smooth",
    "--alka-radius-card",
    "--alka-panel-bg"
  ]
};

export function CardPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
