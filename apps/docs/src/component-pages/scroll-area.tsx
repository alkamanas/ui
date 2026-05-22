import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Scroll Area is an overflow primitive with desktop overlay scrollbar behavior for Windows and Linux. It keeps tracks transparent and reveals the thumb while scrolling without changing layout.",
  "anatomy": [
    "Import ScrollArea from @alkamanas/ui and place overflowing content inside the root.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "On Windows and Linux desktop pointers, the scrollbar uses Radix scroll mode with a 1000ms hide delay."
  ],
  "variants": [
    {
      "name": "default",
      "description": "Transparent track with an overlay thumb that appears while scrolling for Windows and Linux desktop users."
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
      "name": "type",
      "type": "\"auto\" | \"always\" | \"scroll\" | \"hover\"",
      "description": "Passed to Radix ScrollArea. Defaults to scroll on Windows and Linux desktop, otherwise Radix default behavior."
    },
    {
      "name": "scrollHideDelay",
      "type": "number",
      "description": "Delay before the scrollbar hides. Defaults to 1000ms on Windows and Linux desktop overlay mode."
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
    "Scrollbar visibility uses --alka-motion-* and --alka-ease-* tokens and respects prefers-reduced-motion.",
    "The overlay scrollbar is absolutely positioned against the root so content width does not shift while scrolling."
  ],
  "tokens": [
    "--alka-ease-smooth",
    "--alka-motion-panel",
    "--alka-radius-control",
    "--alka-panel-bg",
    "--foreground"
  ]
};

export function ScrollAreaPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
