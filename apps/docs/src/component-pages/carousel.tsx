import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Carousel is a interaction primitive in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "anatomy": [
    "Import Carousel from @alkamanas/ui and compose it with the documented subcomponents when the primitive is compound.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, primary, border animation and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Carousel treatment used in the component preview."
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
      "name": "autoplay",
      "type": "boolean",
      "description": "Enables the play/pause control pattern."
    },
    {
      "name": "children",
      "type": "ReactNode",
      "description": "Compose CarouselContent, CarouselItem, navigation and dots."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Merged onto the carousel root."
    }
  ],
  "accessibility": [
    "Preserve the underlying Radix or native semantics when composing custom children.",
    "Keep interactive labels visible, or provide aria-label for icon-only controls.",
    "Keyboard focus states should remain visible against both glass and solid surfaces."
  ],
  "motion": [
    "Dots keep stable spacing while only the current and next current indicators animate.",
    "Navigation and play controls use the shared liquid-glass surface."
  ],
  "tokens": [
    "--alka-panel-bg",
    "--alka-radius-pill",
    "--alka-ease-smooth"
  ]
};

export function CarouselPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
