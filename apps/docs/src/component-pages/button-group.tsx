import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, ButtonGroup, ButtonGroupSeparator } from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Button Group is a interaction primitive in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "examples": [
    {
      "id": "button-group-navigation",
      "title": "Icon navigation group",
      "description": "Use the shared glass pill for paired icon actions. Hover feedback stays local to the active side while the separator remains stable.",
      "preview": (
        <ButtonGroup aria-label="Carousel navigation">
          <Button variant="ghost" size="icon" aria-label="Previous">
            <ChevronLeft />
          </Button>
          <ButtonGroupSeparator />
          <Button variant="ghost" size="icon" aria-label="Next">
            <ChevronRight />
          </Button>
        </ButtonGroup>
      ),
      "code": `import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, ButtonGroup, ButtonGroupSeparator } from "@alkamanas/ui";

export function ButtonGroupNavigationExample() {
  return (
    <ButtonGroup aria-label="Carousel navigation">
      <Button variant="ghost" size="icon" aria-label="Previous">
        <ChevronLeft />
      </Button>
      <ButtonGroupSeparator />
      <Button variant="ghost" size="icon" aria-label="Next">
        <ChevronRight />
      </Button>
    </ButtonGroup>
  );
}`
    },
    {
      "id": "button-group-sizes",
      "title": "Size scale",
      "description": "Button Group follows the same size language as Button: sm, default and lg. Child icon buttons keep their own icon semantics.",
      "preview": (
        <div className="grid w-full justify-items-center gap-5">
          {(["sm", "default", "lg"] as const).map((size) => (
            <div key={size} className="flex items-center gap-4">
              <span className="w-16 text-right text-sm text-muted-foreground">{size}</span>
              <ButtonGroup size={size} aria-label={`${size} navigation`}>
                <Button variant="ghost" size="icon" aria-label={`${size} previous`}>
                  <ChevronLeft />
                </Button>
                <ButtonGroupSeparator />
                <Button variant="ghost" size="icon" aria-label={`${size} next`}>
                  <ChevronRight />
                </Button>
              </ButtonGroup>
            </div>
          ))}
        </div>
      ),
      "code": `import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, ButtonGroup, ButtonGroupSeparator } from "@alkamanas/ui";

export function ButtonGroupSizeExample() {
  return (
    <div className="grid gap-4">
      {(["sm", "default", "lg"] as const).map((size) => (
        <ButtonGroup key={size} size={size} aria-label={\`\${size} navigation\`}>
          <Button variant="ghost" size="icon" aria-label={\`\${size} previous\`}>
            <ChevronLeft />
          </Button>
          <ButtonGroupSeparator />
          <Button variant="ghost" size="icon" aria-label={\`\${size} next\`}>
            <ChevronRight />
          </Button>
        </ButtonGroup>
      ))}
    </div>
  );
}`
    }
  ],
  "anatomy": [
    "Import ButtonGroup and ButtonGroupSeparator from @alkamanas/ui, then compose icon or text buttons inside the shared pill surface.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, primary, border animation and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "A liquid glass pill with local hover highlights and an optional separator for paired actions."
    },
    {
      "name": "icon navigation",
      "description": "Use icon-sized buttons with aria-labels for previous/next or compact toolbar actions."
    },
    {
      "name": "themed",
      "description": "Responds to primary color, dark/light section and glass mode changes from the docs selector."
    }
  ],
  "sizes": [
    {
      "name": "sm",
      "description": "Compact grouped actions aligned with the small Button scale."
    },
    {
      "name": "default",
      "description": "The standard grouped control size, parallel to Button's default size."
    },
    {
      "name": "lg",
      "description": "A larger grouped control for prominent navigation or toolbar actions."
    }
  ],
  "props": [
    {
      "name": "size",
      "type": "\"sm\" | \"default\" | \"lg\"",
      "description": "Controls the group shell, child control height and icon scale."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Merged onto the visible root when the primitive renders one."
    },
    {
      "name": "ButtonGroupSeparator",
      "type": "HTMLDivElement props",
      "description": "Optional visual divider between grouped actions. It is aria-hidden by default."
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

export function ButtonGroupPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
