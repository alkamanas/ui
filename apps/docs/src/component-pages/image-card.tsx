import { ImageCard } from "@alkamanas/ui";

import { ComponentPageTemplate, type ComponentPageDetails, type ComponentPageProps } from "./shared";

const details: ComponentPageDetails = {
  summary:
    "Image Card is a pattern for editorial and product surfaces where a full-bleed image needs readable copy without hiding the image behind an opaque panel.",
  examples: [
    {
      id: "image-card-product",
      title: "Product image card",
      description:
        "The copy area is separated by a gradient-masked blur layer. The image remains visible while title, subtitle and description stay readable.",
      preview: (
        <div className="w-full max-w-[26rem]">
          <ImageCard
            className="aspect-[3/4] min-h-0"
            imageSrc="/assets/sectors/automotive-light.webp"
            imageAlt="Close-up of an automotive manufacturing surface"
            subtitle="Manufacturing"
            title="Industrial intelligence"
            description="A full-bleed image card for product pages, sector cards and operational dashboards that need strong imagery with readable copy."
          />
        </div>
      ),
      code: `import { ImageCard } from "@alkamanas/ui";

export function ProductImageCardExample() {
  return (
    <ImageCard
      className="aspect-[3/4] min-h-0"
      imageSrc="/assets/sectors/automotive-light.webp"
      imageAlt="Close-up of an automotive manufacturing surface"
      subtitle="Manufacturing"
      title="Industrial intelligence"
      description="A full-bleed image card with a gradient-masked blurred copy area."
    />
  );
}`,
    },
    {
      id: "image-card-compact",
      title: "Compact image card",
      description:
        "Use className for layout-specific sizing. The content treatment stays the same, so compact cards still read against busy imagery.",
      preview: (
        <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
          <ImageCard
            className="aspect-[3/4] min-h-0"
            imageSrc="/assets/sectors/tire-light.webp"
            imageAlt="Industrial tire detail"
            subtitle="Mobility"
            title="Heavy-load systems"
            description="Short copy can sit closer to the bottom while the masked blur keeps the image visible."
          />
          <ImageCard
            className="aspect-[3/4] min-h-0"
            imageSrc="/assets/sectors/automotive-light.webp"
            imageAlt="Automotive lighting detail"
            subtitle="Quality"
            title="Precision surfaces"
            description="The title, subtitle and description remain grouped as one readable content block."
          />
        </div>
      ),
      code: `import { ImageCard } from "@alkamanas/ui";

export function CompactImageCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ImageCard
        className="aspect-[3/4] min-h-0"
        imageSrc="/assets/sectors/tire-light.webp"
        imageAlt="Industrial tire detail"
        subtitle="Mobility"
        title="Heavy-load systems"
        description="Short copy can sit closer to the bottom."
      />
      <ImageCard
        className="aspect-[3/4] min-h-0"
        imageSrc="/assets/sectors/automotive-light.webp"
        imageAlt="Automotive lighting detail"
        subtitle="Quality"
        title="Precision surfaces"
        description="The content remains grouped as one readable block."
      />
    </div>
  );
}`,
    },
  ],
  anatomy: [
    "Root renders a relative card surface with overflow clipping, border and panel radius tokens.",
    "The image fills the full card and scales subtly on hover.",
    "The content area owns a masked backdrop blur pseudo-layer so copy is readable without becoming an opaque bottom sheet.",
  ],
  variants: [
    {
      name: "default",
      description: "Full-bleed image with bottom copy area, masked blur and primary-tinted subtitle.",
    },
    {
      name: "compact",
      description: "Use className to set smaller min-height values for grids and card collections.",
    },
  ],
  props: [
    {
      name: "imageSrc",
      type: "string",
      description: "Image source rendered as the full-bleed media layer.",
    },
    {
      name: "imageAlt",
      type: "string",
      description: "Accessible alt text for the image.",
    },
    {
      name: "title",
      type: "ReactNode",
      description: "Main card title.",
    },
    {
      name: "subtitle",
      type: "ReactNode",
      description: "Optional compact label above the title.",
    },
    {
      name: "description",
      type: "ReactNode",
      description: "Optional supporting copy below the title.",
    },
  ],
  accessibility: [
    "Always provide meaningful imageAlt text unless the surrounding context already describes the image.",
    "Keep title text concise because the card is designed for scanning.",
  ],
  motion: [
    "Hover scales only the image layer and respects prefers-reduced-motion.",
    "The content layer itself stays stable so text does not shift while reading.",
  ],
  tokens: [
    "--alka-radius-panel",
    "--alka-panel-border",
    "--alka-shadow-panel",
    "--alka-ease-smooth",
    "--primary",
  ],
};

export function ImageCardPage({ doc }: ComponentPageProps) {
  return <ComponentPageTemplate doc={doc} details={details} />;
}
