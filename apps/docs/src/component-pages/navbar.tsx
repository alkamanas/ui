import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Navbar is a navigation primitive in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "anatomy": [
    "Import Navbar from @alkamanas/ui/navbar and pair it with @alkamanas/ui/navbar.css for focused consumer installs.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, primary, border animation and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Navbar treatment used in the component preview."
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
      "name": "logo",
      "type": "ReactNode | NavbarLogoConfig",
      "description": "Accepts wide and compact logo variants, each with optional dark and light alternatives."
    },
    {
      "name": "logoWidths",
      "type": "{ wide?: CSSProperties['width']; compact?: CSSProperties['width'] }",
      "description": "Sets explicit wrapper widths for wide and compact logo variants. Logo config also accepts widths, wideWidth and compactWidth."
    },
    {
      "name": "NavbarCTA",
      "type": "component",
      "description": "Standalone CTA component for desktop slots, mobile footer slots or custom navbar layouts."
    },
    {
      "name": "NavbarMenuItem",
      "type": "component",
      "description": "Reusable menu item renderer shared by the built-in desktop menu and custom menu compositions."
    },
    {
      "name": "rightSlot",
      "type": "ReactNode",
      "description": "Renders custom desktop actions, such as locale or account controls, beside the CTA."
    },
    {
      "name": "mobileFooterSlot",
      "type": "ReactNode",
      "description": "Renders custom controls in the mobile menu footer beside or instead of the CTA."
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

export function NavbarPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
