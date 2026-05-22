import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Avatar is a display primitive in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "examples": [
    {
      "id": "avatar-basic",
      "title": "Basic avatar",
      "description": "Avatar wraps a Radix image and fallback for representing a user or workspace.",
      "preview": (
        <Avatar>
          <AvatarImage src="/assets/sectors/automotive-light.webp" alt="Workspace avatar" />
          <AvatarFallback>VS</AvatarFallback>
        </Avatar>
      ),
      "code": `import { Avatar, AvatarFallback, AvatarImage } from "@alkamanas/ui";

export function BasicAvatarExample() {
  return (
    <Avatar>
      <AvatarImage src="/assets/sectors/automotive-light.webp" alt="Workspace avatar" />
      <AvatarFallback>VS</AvatarFallback>
    </Avatar>
  );
}`
    },
    {
      "id": "avatar-group",
      "title": "Avatar group",
      "description": "AvatarGroup overlaps avatars and AvatarGroupCount summarizes additional members.",
      "preview": (
        <AvatarGroup>
          <Avatar><AvatarFallback>CN</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>LR</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>ER</AvatarFallback></Avatar>
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
      ),
      "code": `import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@alkamanas/ui";

export function AvatarGroupExample() {
  return (
    <AvatarGroup>
      <Avatar><AvatarFallback>CN</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>LR</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>ER</AvatarFallback></Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  );
}`
    }
  ],
  "anatomy": [
    "Import Avatar, AvatarImage, AvatarFallback, AvatarGroup and AvatarGroupCount from @alkamanas/ui.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "AvatarGroup applies overlap and ring separation to child avatars while AvatarGroupCount behaves like an avatar-sized summary item."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Avatar treatment used in the component preview."
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
    },
    {
      "name": "AvatarGroup className",
      "type": "string",
      "description": "Merged onto the overlapping group root."
    },
    {
      "name": "AvatarGroupCount className",
      "type": "string",
      "description": "Merged onto the count item shown inside an avatar group."
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
    "--background",
    "--muted"
  ]
};

export function AvatarPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
