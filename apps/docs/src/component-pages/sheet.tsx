import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Sheet is a overlay in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "anatomy": [
    "Import Sheet from @alkamanas/ui and compose it with the documented subcomponents when the primitive is compound.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, primary, border animation and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Sheet treatment used in the component preview."
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
      "name": "size",
      "type": "sm | md | lg | xl",
      "description": "Controls the Apple-style bottom-attached sheet width."
    },
    {
      "name": "side",
      "type": "top | right | bottom | left | center",
      "description": "Chooses the motion origin and placement."
    },
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Compose SheetTrigger, SheetContent and header/footer sections."
    }
  ],
  "accessibility": [
    "Preserve the underlying Radix or native semantics when composing custom children.",
    "Keep interactive labels visible, or provide aria-label for icon-only controls.",
    "Keyboard focus states should remain visible against both glass and solid surfaces."
  ],
  "motion": [
    "Sheet content uses the same modal enter/exit timing as dialog and drawer.",
    "Bottom sheets remain attached to the viewport bottom."
  ],
  "tokens": [
    "--alka-sheet-width",
    "--alka-panel-bg",
    "--alka-ease-smooth"
  ]
};

export function SheetPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
