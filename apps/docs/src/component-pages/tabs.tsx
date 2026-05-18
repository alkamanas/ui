import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Tabs is a interaction primitive in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "anatomy": [
    "Import Tabs from @alkamanas/ui and compose it with the documented subcomponents when the primitive is compound.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, primary, border animation and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Tabs treatment used in the component preview."
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
      "name": "defaultValue",
      "type": "string",
      "description": "Initial active tab."
    },
    {
      "name": "value",
      "type": "string",
      "description": "Controlled active tab."
    },
    {
      "name": "onValueChange",
      "type": "(value: string) => void",
      "description": "Called when the active tab changes."
    }
  ],
  "accessibility": [
    "Preserve the underlying Radix or native semantics when composing custom children.",
    "Keep interactive labels visible, or provide aria-label for icon-only controls.",
    "Keyboard focus states should remain visible against both glass and solid surfaces."
  ],
  "motion": [
    "The selected pill moves as a stable thumb behind the active item.",
    "Active text color changes after the pill starts moving."
  ],
  "tokens": [
    "--alka-tabs-pill-left",
    "--alka-tabs-pill-width",
    "--alka-radius-pill"
  ]
};

export function TabsPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
