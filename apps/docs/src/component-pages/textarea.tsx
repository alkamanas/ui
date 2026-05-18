import { Textarea } from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Textarea is a form control in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "examples": [
    {
      "id": "textarea-flat",
      "title": "Flat textarea",
      "description": "Textarea follows the bordered input model with a larger editable area and the same focus/blur border timing.",
      "preview": (
        <div className="grid w-full max-w-xl gap-4">
          <Textarea surface="flat" placeholder="Write a note..." />
          <Textarea borderAnimationColor="contrast" surface="flat" placeholder="Contrast border..." />
        </div>
      ),
      "code": `import { Textarea } from "@alkamanas/ui";

export function FlatTextareaExample() {
  return (
    <div className="grid gap-4">
      <Textarea surface="flat" placeholder="Write a note..." />
      <Textarea
        borderAnimationColor="contrast"
        surface="flat"
        placeholder="Contrast border..."
      />
    </div>
  );
}`
    },
    {
      "id": "textarea-gradient",
      "title": "Gradient textarea",
      "description": "Use the subtle gradient surface for richer form sections while keeping the field readable.",
      "preview": (
        <div className="grid w-full max-w-xl gap-4">
          <Textarea surface="gradient" placeholder="Primary spotlight..." />
          <Textarea surfaceGradientColor="contrast" surface="gradient" placeholder="Contrast spotlight..." />
        </div>
      ),
      "code": `import { Textarea } from "@alkamanas/ui";

export function GradientTextareaExample() {
  return (
    <Textarea
      surface="gradient"
      surfaceGradientColor="contrast"
      placeholder="Contrast spotlight..."
    />
  );
}`
    }
  ],
  "anatomy": [
    "Import Textarea from @alkamanas/ui and compose it with the documented subcomponents when the primitive is compound.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, primary, border animation and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Textarea treatment used in the component preview."
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
    "--alka-radius-control",
    "--alka-panel-bg"
  ]
};

export function TextareaPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
