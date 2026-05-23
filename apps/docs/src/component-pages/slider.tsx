import { Slider } from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  "summary": "Slider is a form control in the Alkamanas system. This page documents composition, public props, expected motion and the tokens that keep it consistent across dark and light scopes.",
  "examples": [
    {
      "id": "slider-default",
      "title": "Default slider",
      "description": "The standard horizontal slider keeps the track shorter by one thumb width so the filled range lands at the thumb center.",
      "preview": <Slider defaultValue={[42]} max={100} step={1} className="w-full max-w-xl" aria-label="Progress" />,
      "code": `import { Slider } from "@alkamanas/ui";

export function SliderDefaultExample() {
  return <Slider defaultValue={[42]} max={100} step={1} aria-label="Progress" />;
}`
    },
    {
      "id": "slider-range",
      "title": "Range slider",
      "description": "Use variant=\"range\" with two values when the selected region should sit between two thumbs.",
      "preview": <Slider variant="range" defaultValue={[24, 76]} max={100} step={1} className="w-full max-w-xl" aria-label="Budget range" />,
      "code": `import { Slider } from "@alkamanas/ui";

export function SliderRangeExample() {
  return (
    <Slider
      variant="range"
      defaultValue={[24, 76]}
      max={100}
      step={1}
      aria-label="Budget range"
    />
  );
}`
    },
    {
      "id": "slider-vertical",
      "title": "Vertical slider",
      "description": "Use orientation=\"vertical\" for compact mixer, intensity or level controls.",
      "preview": (
        <div className="flex h-72 items-center justify-center gap-8">
          <Slider orientation="vertical" defaultValue={[62]} max={100} step={1} aria-label="Level" />
          <Slider orientation="vertical" variant="range" defaultValue={[18, 82]} max={100} step={1} aria-label="Vertical range" />
        </div>
      ),
      "code": `import { Slider } from "@alkamanas/ui";

export function SliderVerticalExample() {
  return (
    <div className="flex h-72 items-center gap-8">
      <Slider orientation="vertical" defaultValue={[62]} max={100} step={1} aria-label="Level" />
      <Slider
        orientation="vertical"
        variant="range"
        defaultValue={[18, 82]}
        max={100}
        step={1}
        aria-label="Vertical range"
      />
    </div>
  );
}`
    }
  ],
  "anatomy": [
    "Import Slider from @alkamanas/ui.",
    "The visible root accepts className so product teams can place it without forking the primitive.",
    "The component renders one thumb per value and keeps the selected range token-driven for horizontal and vertical orientations."
  ],
  "variants": [
    {
      "name": "default",
      "description": "Single-value slider with one glass thumb and a primary filled range from the minimum value."
    },
    {
      "name": "range",
      "description": "Two-value slider for selecting a bounded range. If no value is provided, it starts at min and max."
    }
  ],
  "sizes": [
    {
      "name": "horizontal",
      "description": "Fills the available width and keeps the track inset by half the thumb width."
    },
    {
      "name": "vertical",
      "description": "Uses a stable 16rem default height and keeps the track inset by half the thumb height."
    }
  ],
  "props": [
    {
      "name": "variant",
      "type": "default | range",
      "description": "Controls the default value shape and documents when the slider should behave as a range selector."
    },
    {
      "name": "orientation",
      "type": "horizontal | vertical",
      "description": "Switches the track, range and thumb geometry between horizontal and vertical layouts."
    },
    {
      "name": "defaultValue / value",
      "type": "number[]",
      "description": "One value renders one thumb. Two or more values render a thumb for each value and fill between the min and max selected values."
    },
    {
      "name": "className",
      "type": "string",
      "description": "Merged onto the visible root."
    }
  ],
  "accessibility": [
    "Provide aria-label or aria-labelledby so each thumb has an accessible name.",
    "Keyboard focus remains visible on both horizontal and vertical thumbs.",
    "Use disabled when range changes should not be interactive."
  ],
  "motion": [
    "Thumb active states use --alka-ease-smooth and keep stable dimensions.",
    "Track and range updates avoid layout shift by updating CSS variables on the root."
  ],
  "tokens": [
    "--alka-slider-range-start",
    "--alka-slider-range-size",
    "--alka-radius-pill",
    "--alka-ease-smooth"
  ]
};

export function SliderPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
