import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

function ProductSelect({
  className,
  size,
  surface = "flat",
  placeholder = "Select product",
}: {
  className?: string;
  size?: "default" | "sm" | "lg";
  surface?: "flat" | "gradient" | "glass";
  placeholder?: string;
}) {
  return (
    <Select>
      <SelectTrigger
        className={className}
        size={size}
        surface={surface}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="studio">Visetra Studio</SelectItem>
        <SelectItem value="web">Visetra Web</SelectItem>
        <SelectItem value="ui">Alkamanas UI</SelectItem>
      </SelectContent>
    </Select>
  );
}

const details: ComponentPageDetails = {
  "summary": "Select is a form control in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "examples": [
    {
      "id": "select-flat",
      "title": "Flat select",
      "description": "The flat trigger has no spotlight gradient. Opening and closing the options list should match Combobox motion.",
      "preview": (
        <div className="grid w-full max-w-md gap-4">
          <ProductSelect surface="flat" />
          <ProductSelect className="border-animation-primary" surface="flat" />
        </div>
      ),
      "code": `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@alkamanas/ui";

export function FlatSelectExample() {
  return (
    <Select>
      <SelectTrigger surface="flat">
        <SelectValue placeholder="Select product" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="studio">Visetra Studio</SelectItem>
        <SelectItem value="web">Visetra Web</SelectItem>
        <SelectItem value="ui">Alkamanas UI</SelectItem>
      </SelectContent>
    </Select>
  );
}`
    },
    {
      "id": "select-gradient",
      "title": "Gradient select",
      "description": "The gradient trigger uses the same subtle surface controls as Input and Combobox. Assign custom color with gradient utility classes.",
      "preview": (
        <div className="grid w-full max-w-md gap-4">
          <ProductSelect surface="gradient" />
          <ProductSelect className="gradient-primary/50" surface="gradient" />
        </div>
      ),
      "code": `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@alkamanas/ui";

export function GradientSelectExample() {
  return (
    <Select>
      <SelectTrigger className="gradient-primary/50" surface="gradient">
        <SelectValue placeholder="Select product" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="studio">Visetra Studio</SelectItem>
        <SelectItem value="web">Visetra Web</SelectItem>
        <SelectItem value="ui">Alkamanas UI</SelectItem>
      </SelectContent>
    </Select>
  );
}`
    },
    {
      "id": "select-glass",
      "title": "Glass select",
      "description": "Glass Select triggers use the same liquid glass treatment as glass Input and Combobox. Focus/open animates the glass border while utility classes can assign the tint.",
      "preview": (
        <div className="grid w-full max-w-md gap-4">
          <ProductSelect surface="glass" />
          <ProductSelect className="gradient-primary/50 border-animation-primary" surface="glass" />
        </div>
      ),
      "code": `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@alkamanas/ui";

export function GlassSelectExample() {
  return (
    <Select>
      <SelectTrigger
        className="gradient-primary/50 border-animation-primary"
        surface="glass"
      >
        <SelectValue placeholder="Select product" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="studio">Visetra Studio</SelectItem>
        <SelectItem value="web">Visetra Web</SelectItem>
        <SelectItem value="ui">Alkamanas UI</SelectItem>
      </SelectContent>
    </Select>
  );
}`
    },
    {
      "id": "select-size",
      "title": "Control sizes",
      "description": "SelectTrigger supports the same small, default and large scale used by Button and Combobox.",
      "preview": (
        <div className="grid w-full max-w-md gap-4">
          <ProductSelect size="sm" surface="flat" placeholder="Small select" />
          <ProductSelect surface="flat" placeholder="Default select" />
          <ProductSelect size="lg" surface="flat" placeholder="Large select" />
        </div>
      ),
      "code": `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@alkamanas/ui";

export function SelectSizesExample() {
  return (
    <div className="grid gap-4">
      <Select>
        <SelectTrigger size="sm" surface="flat">
          <SelectValue placeholder="Small select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="studio">Visetra Studio</SelectItem>
          <SelectItem value="web">Visetra Web</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger surface="flat">
          <SelectValue placeholder="Default select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="studio">Visetra Studio</SelectItem>
          <SelectItem value="web">Visetra Web</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger size="lg" surface="flat">
          <SelectValue placeholder="Large select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="studio">Visetra Studio</SelectItem>
          <SelectItem value="web">Visetra Web</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}`
    }
  ],
  "anatomy": [
    "Import Select from @alkamanas/ui and compose it with the documented subcomponents when the primitive is compound.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, default border animation, default gradient and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Select treatment used in the component preview."
    },
    {
      "name": "themed",
      "description": "Responds to dark/light section and glass mode changes from the docs selector. Primary is opt-in through utility classes."
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
      "name": "children",
      "type": "ReactNode",
      "description": "Compose SelectTrigger, SelectContent and SelectItem primitives."
    },
    {
      "name": "value",
      "type": "string",
      "description": "Controlled selected value."
    },
    {
      "name": "onValueChange",
      "type": "(value: string) => void",
      "description": "Called when an option is selected."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Merged onto the relevant primitive root."
    },
    {
      "name": "SelectTrigger size",
      "type": "default | sm | lg",
      "description": "Controls trigger height, padding and text scale using the same naming as Button."
    },
    {
      "name": "SelectTrigger surface",
      "type": "flat | gradient | glass | bare",
      "description": "Controls trigger surface treatment. Glass removes the trigger border and animates the liquid glass border on focus/open."
    }
  ],
  "accessibility": [
    "Preserve the underlying Radix or native semantics when composing custom children.",
    "Keep interactive labels visible, or provide aria-label for icon-only controls.",
    "Keyboard focus states should remain visible against both glass and solid surfaces."
  ],
  "motion": [
    "Options open and close with the same smooth popper timing as Combobox.",
    "Selected and highlighted options use primary-tinted middle-tone backgrounds."
  ],
  "tokens": [
    "--alka-border-animation-color",
    "--alka-border-animation-opacity",
    "--alka-gradient-color",
    "--alka-gradient-opacity",
    "--alka-liquid-glass-bg",
    "--alka-panel-bg",
    "--alka-ease-smooth"
  ]
};

export function SelectPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
