import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("merges conditional classes and resolves Tailwind conflicts", () => {
    const optionalClass = undefined;

    expect(cn("px-2 text-sm", optionalClass, "px-4")).toBe("text-sm px-4");
  });
});
