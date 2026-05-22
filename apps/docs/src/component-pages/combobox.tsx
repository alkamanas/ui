import { Combobox } from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const productOptions = [
  { value: "studio", label: "Visetra Studio" },
  { value: "web", label: "Visetra Web" },
  { value: "ui", label: "Alkamanas UI" },
];

const details: ComponentPageDetails = {
  "summary": "Combobox is a form control in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "examples": [
    {
      "id": "combobox-flat",
      "title": "Flat searchable trigger",
      "description": "The flat Combobox keeps the trigger quiet while retaining the same option styling, close animation and selected-state behavior.",
      "preview": (
        <div className="grid w-full max-w-md gap-4">
          <Combobox surface="flat" options={productOptions} />
          <Combobox className="border-animation-primary" surface="flat" options={productOptions} />
        </div>
      ),
      "code": `import { Combobox } from "@alkamanas/ui";

const productOptions = [
  { value: "studio", label: "Visetra Studio" },
  { value: "web", label: "Visetra Web" },
  { value: "ui", label: "Alkamanas UI" },
];

export function FlatComboboxExample() {
  return <Combobox surface="flat" options={productOptions} />;
}`
    },
    {
      "id": "combobox-gradient",
      "title": "Gradient searchable trigger",
      "description": "Gradient Combobox triggers share the Input spotlight model and can receive color through gradient utility classes.",
      "preview": (
        <div className="grid w-full max-w-md gap-4">
          <Combobox surface="gradient" options={productOptions} />
          <Combobox className="gradient-primary/50" surface="gradient" options={productOptions} />
        </div>
      ),
      "code": `import { Combobox } from "@alkamanas/ui";

const productOptions = [
  { value: "studio", label: "Visetra Studio" },
  { value: "web", label: "Visetra Web" },
  { value: "ui", label: "Alkamanas UI" },
];

export function GradientComboboxExample() {
  return (
    <Combobox
      surface="gradient"
      className="gradient-primary/50"
      options={productOptions}
    />
  );
}`
    },
    {
      "id": "combobox-glass",
      "title": "Glass searchable trigger",
      "description": "Glass Combobox triggers remove the component border, use the shared liquid glass surface and animate the glass border on focus/open.",
      "preview": (
        <div className="grid w-full max-w-md gap-4">
          <Combobox surface="glass" options={productOptions} />
          <Combobox className="gradient-primary/50 border-animation-primary" surface="glass" options={productOptions} />
        </div>
      ),
      "code": `import { Combobox } from "@alkamanas/ui";

const productOptions = [
  { value: "studio", label: "Visetra Studio" },
  { value: "web", label: "Visetra Web" },
  { value: "ui", label: "Alkamanas UI" },
];

export function GlassComboboxExample() {
  return (
    <Combobox
      surface="glass"
      className="gradient-primary/50 border-animation-primary"
      options={productOptions}
    />
  );
}`
    },
    {
      "id": "combobox-size",
      "title": "Control sizes",
      "description": "Use the same size vocabulary as Button for compact toolbars, default forms and larger hero controls.",
      "preview": (
        <div className="grid w-full max-w-md gap-4">
          <Combobox size="sm" surface="flat" placeholder="Small combobox" options={productOptions} />
          <Combobox surface="flat" placeholder="Default combobox" options={productOptions} />
          <Combobox size="lg" surface="flat" placeholder="Large combobox" options={productOptions} />
        </div>
      ),
      "code": `import { Combobox } from "@alkamanas/ui";

const productOptions = [
  { value: "studio", label: "Visetra Studio" },
  { value: "web", label: "Visetra Web" },
  { value: "ui", label: "Alkamanas UI" },
];

export function ComboboxSizesExample() {
  return (
    <div className="grid gap-4">
      <Combobox size="sm" surface="flat" options={productOptions} />
      <Combobox surface="flat" options={productOptions} />
      <Combobox size="lg" surface="flat" options={productOptions} />
    </div>
  );
}`
    }
  ],
  "anatomy": [
    "Import Combobox from @alkamanas/ui and compose it with the documented subcomponents when the primitive is compound.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component inherits theme, default border animation, default gradient and glass-mode tokens from the nearest Alkamanas scope."
  ],
  "variants": [
    {
      "name": "default",
      "description": "The standard Combobox treatment used in the component preview."
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
      "name": "options",
      "type": "ComboboxOption[]",
      "description": "Searchable option list with value, label and optional keywords."
    },
    {
      "name": "surface",
      "type": "flat | gradient | glass | bare",
      "description": "Selects the trigger surface treatment. Glass removes the trigger border and routes focus color into the liquid glass border and tint."
    },
    {
      "name": "size",
      "type": "default | sm | lg",
      "description": "Controls trigger height, padding and text scale using the same naming as Button."
    },
    {
      "name": "onValueChange",
      "type": "(value: string) => void",
      "description": "Called after a value is selected."
    }
  ],
  "accessibility": [
    "The trigger exposes role combobox, aria-expanded and a readable aria-label.",
    "Command items remain keyboard searchable through cmdk."
  ],
  "motion": [
    "Clicking outside or clicking the trigger while open plays the same close animation."
  ],
  "tokens": [
    "--alka-border-animation-color",
    "--alka-border-animation-opacity",
    "--alka-gradient-color",
    "--alka-gradient-opacity",
    "--alka-liquid-glass-bg",
    "--alka-panel-bg"
  ]
};

export function ComboboxPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
