import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Progress } from "./progress";

describe("Progress", () => {
  it("renders the scoped progress class for composition spacing", () => {
    const markup = renderToStaticMarkup(<Progress value={50} aria-label="Loading" />);

    expect(markup).toContain("alka-progress");
  });
});
