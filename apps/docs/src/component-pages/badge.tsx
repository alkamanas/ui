import { Badge } from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Badge is a display primitive in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "examples": [
    {
      "id": "badge-variants",
      "title": "Variants",
      "description": "Badges default to a compact size for dense status labels and metadata.",
      "preview": (
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      ),
      "code": `import { Badge } from "@alkamanas/ui";

export function BadgeVariantsExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}`
    },
    {
      "id": "badge-sizes",
      "title": "Sizes",
      "description": "Use md or lg only when the badge needs to align with larger controls or card headers.",
      "preview": (
        <div className="flex flex-wrap items-center gap-2">
          <Badge size="sm" variant="outline">Small</Badge>
          <Badge size="md" variant="outline">Medium</Badge>
          <Badge size="lg" variant="outline">Large</Badge>
        </div>
      ),
      "code": `import { Badge } from "@alkamanas/ui";

export function BadgeSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm" variant="outline">Small</Badge>
      <Badge size="md" variant="outline">Medium</Badge>
      <Badge size="lg" variant="outline">Large</Badge>
    </div>
  );
}`
    }
  ],
  "anatomy": [
    "Import Badge from @alkamanas/ui and compose it with the documented subcomponents when the primitive is compound.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, primary, border animation and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Badge treatment used in the component preview."
    },
    {
      "name": "themed",
      "description": "Responds to primary color, dark/light section and glass mode changes from the docs selector."
    }
  ],
  "sizes": [
    {
      "name": "sm",
      "description": "Default compact badge for status labels, filters and metadata."
    },
    {
      "name": "md",
      "description": "Previous roomy badge size for card headers or larger toolbar labels."
    },
    {
      "name": "lg",
      "description": "High-emphasis badge for larger marketing or feature labels."
    }
  ],
  "props": [
    {
      "name": "variant",
      "type": "default | secondary | destructive | success | warning | info | outline",
      "description": "Visual treatment and semantic color."
    },
    {
      "name": "size",
      "type": "sm | md | lg",
      "description": "Controls badge height, padding and font size. Defaults to sm."
    },
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
    "--alka-radius-control",
    "--alka-panel-bg"
  ]
};

export function BadgePage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
