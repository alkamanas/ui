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
          <Textarea wrapperClassName="border-animation-primary" surface="flat" placeholder="Custom border..." />
        </div>
      ),
      "code": `import { Textarea } from "@alkamanas/ui";

export function FlatTextareaExample() {
  return (
    <div className="grid gap-4">
      <Textarea surface="flat" placeholder="Write a note..." />
      <Textarea
        wrapperClassName="border-animation-primary"
        surface="flat"
        placeholder="Custom border..."
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
          <Textarea surface="gradient" placeholder="Default spotlight..." />
          <Textarea wrapperClassName="gradient-primary/50" surface="gradient" placeholder="Primary / 50 spotlight..." />
        </div>
      ),
      "code": `import { Textarea } from "@alkamanas/ui";

export function GradientTextareaExample() {
  return (
    <Textarea
      surface="gradient"
      wrapperClassName="gradient-primary/50"
      placeholder="Primary / 50 spotlight..."
    />
  );
}`
    }
  ],
  "anatomy": [
    "Import Textarea from @alkamanas/ui and compose it with the documented subcomponents when the primitive is compound.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, default border animation, default gradient and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Textarea treatment used in the component preview."
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
      "name": "wrapperClassName",
      "type": "string",
      "description": "Merged onto the visible field wrapper. Use utilities such as gradient-primary/50 and border-animation-primary to assign gradient and focus colors."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Merged onto the native textarea control."
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
    "--alka-gradient-color",
    "--alka-gradient-opacity",
    "--alka-border-animation-color",
    "--alka-border-animation-opacity",
    "--alka-panel-bg"
  ]
};

export function TextareaPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
