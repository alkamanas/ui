import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@alkamanas/ui/styles.css";
import "./styles.css";
import { ExamplesApp } from "./examples-app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExamplesApp />
  </StrictMode>,
);
