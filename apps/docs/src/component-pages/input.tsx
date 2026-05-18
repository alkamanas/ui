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
          <Input borderAnimationColor="contrast" placeholder="contrast-border" />
        </div>
      ),
      "code": `import { Input } from "@alkamanas/ui";

export function UnderlineInputExample() {
  return (
    <div className="grid gap-6">
      <Input placeholder="workspace-name" />
      <Input borderAnimationColor="contrast" placeholder="contrast-border" />
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
          <Input borderAnimationColor="contrast" variant="pill" surface="flat" placeholder="contrast focus" />
        </div>
      ),
      "code": `import { Input } from "@alkamanas/ui";

export function BorderedInputExample() {
  return (
    <div className="grid gap-4">
      <Input variant="pill" surface="flat" placeholder="studio.visetra.app" />
      <Input
        borderAnimationColor="contrast"
        variant="pill"
        surface="flat"
        placeholder="contrast focus"
      />
    </div>
  );
}`
    },
    {
      "id": "input-pill-gradient",
      "title": "Subtle gradient surface",
      "description": "Use the gradient surface when the field should carry a low-contrast spotlight. The gradient color can follow primary or contrast tokens per field.",
      "preview": (
        <div className="grid w-full max-w-md gap-4">
          <Input variant="pill" surface="gradient" placeholder="primary spotlight" />
          <Input surfaceGradientColor="contrast" variant="pill" surface="gradient" placeholder="contrast spotlight" />
        </div>
      ),
      "code": `import { Input } from "@alkamanas/ui";

export function GradientInputExample() {
  return (
    <div className="grid gap-4">
      <Input variant="pill" surface="gradient" placeholder="primary spotlight" />
      <Input
        surfaceGradientColor="contrast"
        variant="pill"
        surface="gradient"
        placeholder="contrast spotlight"
      />
    </div>
  );
}`
    }
  ],
  "anatomy": [
    "Import Input from @alkamanas/ui and compose it with the documented subcomponents when the primitive is compound.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, primary, border animation and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Input treatment used in the component preview."
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
      "name": "variant",
      "type": "underline | pill",
      "description": "Chooses between single-line underline input and full bordered pill input."
    },
    {
      "name": "surface",
      "type": "flat | gradient",
      "description": "Controls whether the field uses the subtle spotlight surface."
    },
    {
      "name": "borderAnimationColor",
      "type": "primary | contrast",
      "description": "Selects the focus border highlight color per component."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Merged onto the visible field wrapper."
    }
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
    "--alka-surface-gradient-color",
    "--alka-radius-pill"
  ]
};

export function InputPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
