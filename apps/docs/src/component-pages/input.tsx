import { Input } from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Input is a form control in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "examples": [
    {
      "id": "input-underline",
      "title": "Underline input",
      "description": "The single-line variant keeps only the bottom rule. The focus highlight enters from the field boundary and exits back to the same point on blur.",
      "preview": (
        <div className="grid w-full max-w-md gap-6">
          <Input placeholder="workspace-name" />
          <Input wrapperClassName="border-animation-primary" placeholder="custom-border" />
        </div>
      ),
      "code": `import { Input } from "@alkamanas/ui";

export function UnderlineInputExample() {
  return (
    <div className="grid gap-6">
      <Input placeholder="workspace-name" />
      <Input wrapperClassName="border-animation-primary" placeholder="custom-border" />
    </div>
  );
}`
    },
    {
      "id": "input-pill-flat",
      "title": "Bordered pill input",
      "description": "The pill variant matches Select and Combobox geometry with the same focus and blur border animation.",
      "preview": (
        <div className="grid w-full max-w-md gap-4">
          <Input variant="pill" surface="flat" placeholder="studio.visetra.app" />
          <Input wrapperClassName="border-animation-primary" variant="pill" surface="flat" placeholder="custom focus" />
        </div>
      ),
      "code": `import { Input } from "@alkamanas/ui";

export function BorderedInputExample() {
  return (
    <div className="grid gap-4">
      <Input variant="pill" surface="flat" placeholder="studio.visetra.app" />
      <Input
        wrapperClassName="border-animation-primary"
        variant="pill"
        surface="flat"
        placeholder="custom focus"
      />
    </div>
  );
}`
    },
    {
      "id": "input-pill-gradient",
      "title": "Subtle gradient surface",
      "description": "Use the gradient surface when the field should carry a low-contrast spotlight. Add a gradient utility class to assign a color per field or per parent scope.",
      "preview": (
        <div className="grid w-full max-w-md gap-4">
          <Input variant="pill" surface="gradient" placeholder="default spotlight" />
          <Input wrapperClassName="gradient-primary/50" variant="pill" surface="gradient" placeholder="primary / 50 spotlight" />
        </div>
      ),
      "code": `import { Input } from "@alkamanas/ui";

export function GradientInputExample() {
  return (
    <div className="grid gap-4">
      <Input variant="pill" surface="gradient" placeholder="default spotlight" />
      <Input
        wrapperClassName="gradient-primary/50"
        variant="pill"
        surface="gradient"
        placeholder="primary / 50 spotlight"
      />
    </div>
  );
}`
    },
    {
      "id": "input-pill-glass",
      "title": "Glass pill input",
      "description": "Glass is available for pill inputs. The field removes its own border, uses the shared liquid glass surface and animates the glass border on focus while tinting the glass gradient.",
      "preview": (
        <div className="grid w-full max-w-md gap-4">
          <Input variant="pill" surface="glass" placeholder="glass default" />
          <Input wrapperClassName="gradient-primary/50 border-animation-primary" variant="pill" surface="glass" placeholder="glass primary utility" />
        </div>
      ),
      "code": `import { Input } from "@alkamanas/ui";

export function GlassInputExample() {
  return (
    <div className="grid gap-4">
      <Input variant="pill" surface="glass" placeholder="glass default" />
      <Input
        wrapperClassName="gradient-primary/50 border-animation-primary"
        variant="pill"
        surface="glass"
        placeholder="glass primary utility"
      />
    </div>
  );
}`
    }
  ],
  "anatomy": [
    "Import Input from @alkamanas/ui and compose it with the documented subcomponents when the primitive is compound.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, default border animation, default gradient and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Input treatment used in the component preview."
    },
    {
      "name": "themed",
      "description": "Responds to dark/light section and glass mode changes from the docs selector. Primary is opt-in through utility classes."
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
      "name": "variant",
      "type": "underline | pill",
      "description": "Chooses between single-line underline input and full bordered pill input."
    },
    {
      "name": "surface",
      "type": "flat | gradient | glass",
      "description": "Controls the pill field surface. Glass is intentionally scoped to variant=\"pill\"; underline inputs keep the one-line treatment."
    },
    {
      "name": "wrapperClassName",
      "type": "string",
      "description": "Merged onto the visible field wrapper. Use utilities such as gradient-primary/50 and border-animation-primary to assign gradient and focus colors."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Merged onto the native input control."
    },
  ],
  "accessibility": [
    "Preserve the underlying Radix or native semantics when composing custom children.",
    "Keep interactive labels visible, or provide aria-label for icon-only controls.",
    "Keyboard focus states should remain visible against both glass and solid surfaces."
  ],
  "motion": [
    "Focus and blur animate the border highlight from the component boundary, including a closing animation on blur."
  ],
  "tokens": [
    "--alka-border-animation-color",
    "--alka-border-animation-opacity",
    "--alka-gradient-color",
    "--alka-gradient-opacity",
    "--alka-liquid-glass-bg",
    "--alka-radius-pill"
  ]
};

export function InputPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
