import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Accordion is a interaction primitive in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "anatomy": [
    "Import Accordion from @alkamanas/ui and compose it with the documented subcomponents when the primitive is compound.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, primary, border animation and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Accordion treatment used in the component preview."
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
      "name": "type",
      "type": "single | multiple",
      "description": "Controls whether one or many items can be open."
    },
    {
      "name": "collapsible",
      "type": "boolean",
      "description": "Allows the active item to be closed."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Merged onto the visible root. Use border-animation-primary or an arbitrary CSS variable utility to assign the border accent."
    }
  ],
  "accessibility": [
    "Preserve the underlying Radix or native semantics when composing custom children.",
    "Keep interactive labels visible, or provide aria-label for icon-only controls.",
    "Keyboard focus states should remain visible against both glass and solid surfaces."
  ],
  "motion": [
    "Items expand using width, height, opacity and content-mask timing inspired by Apple product disclosure controls."
  ],
  "tokens": [
    "--alka-accordion-radius",
    "--alka-accordion-ease",
    "--alka-accordion-gradient-color",
    "--alka-border-animation-color",
    "--alka-border-animation-opacity"
  ]
};

export function AccordionPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
