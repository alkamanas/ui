import { ArrowRight, Settings } from "lucide-react";
import { Button } from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Button is the primary action primitive. It supports flat and glass treatments, preserves fixed control geometry, and keeps hover feedback subtle instead of lifting the control.",
  "examples": [
    {
      "id": "button-flat-actions",
      "title": "Flat action set",
      "description": "Use flat buttons for primary decisions and dialog actions. Secondary matches the cancel action treatment used across overlays.",
      "preview": (
        <div className="flex w-full max-w-3xl flex-wrap items-center justify-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Inline link</Button>
        </div>
      ),
      "code": `import { Button } from "@alkamanas/ui";

export function FlatButtonExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Inline link</Button>
    </div>
  );
}`
    },
    {
      "id": "button-glass-actions",
      "title": "Glass action set",
      "description": "Glass buttons use the shared liquid surface. Primary and destructive keep color in the surface while outline stays neutral.",
      "preview": (
        <div className="flex w-full max-w-3xl flex-wrap items-center justify-center gap-3">
          <Button variant="glassPrimary">Primary glass</Button>
          <Button variant="glassSecondary">Secondary glass</Button>
          <Button variant="glassDestructive">Destructive glass</Button>
          <Button variant="outline">Outline</Button>
        </div>
      ),
      "code": `import { Button } from "@alkamanas/ui";

export function GlassButtonExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="glassPrimary">Primary glass</Button>
      <Button variant="glassSecondary">Secondary glass</Button>
      <Button variant="glassDestructive">Destructive glass</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}`
    },
    {
      "id": "button-size-matrix",
      "title": "Sizes and icon controls",
      "description": "Button sizes keep stable geometry. Icon-only controls should always expose an accessible name.",
      "preview": (
        <div className="grid w-full max-w-3xl gap-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" size="sm">Small outline</Button>
            <Button variant="outline">Default outline</Button>
            <Button variant="outline" size="lg">Large outline</Button>
          </div>
        </div>
      ),
      "code": `import { Settings } from "lucide-react";
import { Button } from "@alkamanas/ui";

export function ButtonSizeExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Settings">
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
}`
    },
    {
      "id": "button-as-child",
      "title": "Polymorphic link action",
      "description": "Use asChild when a router link or anchor owns navigation semantics but should inherit button styling.",
      "preview": (
        <div className="flex w-full max-w-3xl items-center justify-center">
          <Button asChild>
            <a href="#components">
              Browse components
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      ),
      "code": `import { ArrowRight } from "lucide-react";
import { Button } from "@alkamanas/ui";

export function ButtonAsChildExample() {
  return (
    <Button asChild>
      <a href="#components">
        Browse components
        <ArrowRight className="h-4 w-4" />
      </a>
    </Button>
  );
}`
    }
  ],
  "anatomy": [
    "Root renders a native button by default and delegates to Radix Slot when asChild is true.",
    "Glass variants add liquid-glass layers only when the root is the rendered button.",
    "The text and icon row stays centered through inline-flex alignment and stable size classes."
  ],
  "variants": [
    {
      "name": "default",
      "description": "Primary flat action using the active primary token."
    },
    {
      "name": "flat",
      "description": "Named primary flat action and the default Button variant."
    },
    {
      "name": "solid",
      "description": "Compatibility alias for the primary flat action."
    },
    {
      "name": "glass",
      "description": "Neutral liquid-glass surface for secondary actions on rich backgrounds."
    },
    {
      "name": "glassPrimary",
      "description": "Primary-tinted glass action with subtle token color in the surface."
    },
    {
      "name": "glassSecondary",
      "description": "Secondary liquid-glass action while the flat secondary variant remains unchanged."
    },
    {
      "name": "glassDestructive",
      "description": "Destructive glass action for lower-emphasis risk controls."
    },
    {
      "name": "destructive",
      "description": "Flat destructive action using the destructive token."
    },
    {
      "name": "outline",
      "description": "Bordered low-emphasis control with the same sizing as flat buttons."
    },
    {
      "name": "secondary",
      "description": "Soft secondary button used in dialogs and dense panels."
    },
    {
      "name": "ghost",
      "description": "Transparent action for compact toolbars."
    },
    {
      "name": "link",
      "description": "Inline text action with button semantics."
    }
  ],
  "sizes": [
    {
      "name": "default",
      "description": "44px high control for standard forms and dialogs."
    },
    {
      "name": "sm",
      "description": "40px high compact control for filters and inline command rows."
    },
    {
      "name": "lg",
      "description": "48px high emphasis control for hero or footer actions."
    },
    {
      "name": "icon",
      "description": "Square 44px icon-only button. Always provide an aria-label."
    }
  ],
  "props": [
    {
      "name": "variant",
      "type": "ButtonVariant",
      "description": "Visual treatment. Includes flat, glass, destructive, outline, ghost, link and primary glass variants."
    },
    {
      "name": "size",
      "type": "ButtonSize",
      "description": "Control height and padding. Keeps the layout stable across hover and active states."
    },
    {
      "name": "asChild",
      "type": "boolean",
      "description": "Renders the child through Radix Slot so links and router components can inherit button styling safely."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Merged onto the visible root."
    }
  ],
  "accessibility": [
    "Use a visible label or aria-label for icon-only buttons.",
    "Keep destructive actions explicit and pair them with AlertDialog when the action cannot be undone.",
    "asChild should receive exactly one valid React element because Radix Slot owns prop merging."
  ],
  "motion": [
    "Hover state uses subtle opacity and color feedback; it does not translate upward.",
    "Glass variants reuse the liquid-glass surface layer and respect prefers-reduced-motion through shared CSS tokens."
  ],
  "tokens": [
    "--alka-radius-pill",
    "--alka-ease-smooth",
    "--alka-glass-element-bg",
    "--alka-primary",
    "--destructive"
  ]
};

export function ButtonPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
