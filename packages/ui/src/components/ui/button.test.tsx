import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("renders the shared control class and glass content layer", () => {
    const markup = renderToStaticMarkup(<Button variant="glassPrimary">Primary glass</Button>);

    expect(markup).toContain("alka-button-control");
    expect(markup).toContain("alka-liquid-glass");
    expect(markup).toContain("alka-button-content");
    expect(markup).toContain("Primary glass");
  });

  it("marks text-only icon buttons so their glyphs can be visually centered", () => {
    const markup = renderToStaticMarkup(
      <Button aria-label="More actions" size="icon" variant="glass">
        ...
      </Button>,
    );

    expect(markup).toContain("alka-button-icon-content");
    expect(markup).toContain('data-text-icon="true"');
  });

  it("uses Radix Slot semantics for asChild", () => {
    const markup = renderToStaticMarkup(
      <Button asChild>
        <a href="/docs">Docs</a>
      </Button>,
    );

    expect(markup.startsWith("<a ")).toBe(true);
    expect(markup).toContain('href="/docs"');
    expect(markup).toContain("alka-button-control");
  });
});
