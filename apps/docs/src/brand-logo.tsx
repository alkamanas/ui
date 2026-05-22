import type * as React from "react";

const brandmarkUrl = new URL("../../../public/assets/logo/brandmarksvg.svg", import.meta.url).href;
const wordmarkForDarkUrl = new URL("../../../public/assets/logo/wordmark-horizontal-for-dark.svg", import.meta.url).href;
const wordmarkForLightUrl = new URL("../../../public/assets/logo/wordmark-horizontal-for-light.svg", import.meta.url).href;

type LogoImageProps = {
  alt?: string;
  className?: string;
};

export function DocsLogoMark({ alt = "", className }: LogoImageProps) {
  return (
    <img
      src={brandmarkUrl}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}

export function DocsWordmark({
  alt = "Alkamanas UI",
  className,
  tone,
}: LogoImageProps & { tone: "dark" | "light" }) {
  return (
    <img
      src={tone === "dark" ? wordmarkForDarkUrl : wordmarkForLightUrl}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}

export function DocsThemeAwareWordmark({ alt = "Alkamanas UI", className }: LogoImageProps) {
  return (
    <span className={className}>
      <DocsWordmark tone="dark" alt={alt} className="docs-logo-for-dark h-full w-full object-contain" />
      <DocsWordmark tone="light" alt={alt} className="docs-logo-for-light h-full w-full object-contain" />
    </span>
  );
}

export const docsNavbarLogo = {
  wide: {
    dark: <DocsWordmark tone="dark" className="h-7 w-full object-contain" />,
    light: <DocsWordmark tone="light" className="h-7 w-full object-contain" />,
  },
  compact: {
    dark: <DocsLogoMark alt="Alkamanas UI" className="h-7 w-full object-contain" />,
    light: <DocsLogoMark alt="Alkamanas UI" className="h-7 w-full object-contain" />,
  },
  widths: {
    wide: "13.5rem",
    compact: "2.35rem",
  } satisfies Partial<Record<"wide" | "compact", React.CSSProperties["width"]>>,
};
