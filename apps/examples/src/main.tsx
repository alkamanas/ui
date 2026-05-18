import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/globals.css";
import "./styles.css";
import { ExamplesApp } from "./examples-app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExamplesApp />
  </StrictMode>,
);
