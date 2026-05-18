import { InputGroup, InputGroupAddon, InputGroupInput } from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

function DomainInputGroup({
  borderAnimationColor,
  surface = "flat",
  surfaceGradientColor,
}: {
  borderAnimationColor?: "primary" | "contrast";
  surface?: "flat" | "gradient";
  surfaceGradientColor?: "primary" | "contrast";
}) {
  return (
    <InputGroup
      borderAnimationColor={borderAnimationColor}
      surface={surface}
      surfaceGradientColor={surfaceGradientColor}
    >
      <InputGroupAddon>https://</InputGroupAddon>
      <InputGroupInput placeholder="studio.visetra.app" />
      <InputGroupAddon>.com</InputGroupAddon>
    </InputGroup>
  );
}

const details: ComponentPageDetails = {
  "summary": "Input Group is a form control in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "examples": [
    {
      "id": "input-group-flat",
      "title": "Flat grouped field",
      "description": "Input Group combines addons and a floating-label input inside the same bordered pill and focus animation.",
      "preview": (
        <div className="grid w-full max-w-xl gap-4">
          <DomainInputGroup surface="flat" />
          <DomainInputGroup borderAnimationColor="contrast" surface="flat" />
        </div>
      ),
      "code": `import { InputGroup, InputGroupAddon, InputGroupInput } from "@alkamanas/ui";

export function FlatInputGroupExample() {
  return (
    <InputGroup surface="flat">
      <InputGroupAddon>https://</InputGroupAddon>
      <InputGroupInput placeholder="studio.visetra.app" />
      <InputGroupAddon>.com</InputGroupAddon>
    </InputGroup>
  );
}`
    },
    {
      "id": "input-group-gradient",
      "title": "Gradient grouped field",
      "description": "Use the gradient surface for grouped fields that need the same spotlight behavior as bordered Input.",
      "preview": (
        <div className="grid w-full max-w-xl gap-4">
          <DomainInputGroup surface="gradient" />
          <DomainInputGroup surfaceGradientColor="contrast" surface="gradient" />
        </div>
      ),
      "code": `import { InputGroup, InputGroupAddon, InputGroupInput } from "@alkamanas/ui";

export function GradientInputGroupExample() {
  return (
    <InputGroup surface="gradient" surfaceGradientColor="contrast">
      <InputGroupAddon>https://</InputGroupAddon>
      <InputGroupInput placeholder="studio.visetra.app" />
      <InputGroupAddon>.com</InputGroupAddon>
    </InputGroup>
  );
}`
    }
  ],
  "anatomy": [
    "Import InputGroup from @alkamanas/ui and compose it with the documented subcomponents when the primitive is compound.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, primary, border animation and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Input Group treatment used in the component preview."
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

export function InputGroupPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
