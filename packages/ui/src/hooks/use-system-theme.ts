"use client";

import { useMediaQuery } from "./useMediaQuery";

export type SystemTheme = "light" | "dark";

export function useSystemTheme(): SystemTheme {
  return useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light";
}
