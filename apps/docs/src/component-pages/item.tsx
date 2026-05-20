import { Sparkles, User } from "lucide-react";
import {
  Badge,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Item is a display primitive in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "examples": [
    {
      "id": "item-flat",
      "title": "Flat item",
      "description": "The default flat item keeps hover calm and leaves border animation disabled.",
      "preview": (
        <Item className="w-full max-w-xl">
          <ItemMedia><User className="h-4 w-4" /></ItemMedia>
          <ItemContent>
            <ItemTitle>Default item</ItemTitle>
            <ItemDescription>Default item keeps hover calm without border animation.</ItemDescription>
          </ItemContent>
          <ItemActions><Badge variant="secondary">Active</Badge></ItemActions>
        </Item>
      ),
      "code": `import {
  Badge,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@alkamanas/ui";

export function FlatItemExample() {
  return (
    <Item>
      <ItemMedia />
      <ItemContent>
        <ItemTitle>Default item</ItemTitle>
        <ItemDescription>Default item keeps hover calm.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge variant="secondary">Active</Badge>
      </ItemActions>
    </Item>
  );
}`
    },
    {
      "id": "item-glass",
      "title": "Glass item",
      "description": "Glass items use the shared glass panel while keeping hover states calm.",
      "preview": (
        <div className="grid w-full max-w-xl gap-3">
          <Item surface="glass">
            <ItemMedia><Sparkles className="h-4 w-4" /></ItemMedia>
            <ItemContent>
              <ItemTitle>Glass item</ItemTitle>
              <ItemDescription>Hover keeps the standard border without animation.</ItemDescription>
            </ItemContent>
            <ItemActions><Badge>Live</Badge></ItemActions>
          </Item>
          <Item surface="glass">
            <ItemMedia><Sparkles className="h-4 w-4" /></ItemMedia>
            <ItemContent>
              <ItemTitle>Calm glass item</ItemTitle>
              <ItemDescription>Surface, border and shadow tokens still follow theme.</ItemDescription>
            </ItemContent>
            <ItemActions><Badge variant="secondary">Contrast</Badge></ItemActions>
          </Item>
        </div>
      ),
      "code": `import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@alkamanas/ui";

export function GlassItemExample() {
  return (
    <Item surface="glass">
      <ItemMedia />
      <ItemContent>
        <ItemTitle>Glass item</ItemTitle>
        <ItemDescription>Hover keeps the standard border without animation.</ItemDescription>
      </ItemContent>
    </Item>
  );
}`
    }
  ],
  "anatomy": [
    "Import Item from @alkamanas/ui and compose it with the documented subcomponents when the primitive is compound.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, primary and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Item treatment used in the component preview."
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
      "name": "surface",
      "type": "flat | glass",
      "description": "Controls the root surface. Defaults to flat; solid is kept as a compatibility alias for flat."
    },
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
    "Keyboard focus states should remain visible against both flat and glass surfaces."
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

export function ItemPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
