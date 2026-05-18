import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("renders the shared control class and glass content layer", () => {
    const markup = renderToStaticMarkup(<Button variant="glassPrimary">Primary glass</Button>);

    expect(markup).toContain("alka-button-control");
    expect(markup).toContain("alka-liquid-glass");
    expect(markup).toContain("Primary glass");
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
