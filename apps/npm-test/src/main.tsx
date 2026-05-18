import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@alkamanas/ui/styles.css";
import "./styles.css";
import { TestDashboard } from "./test-dashboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TestDashboard />
  </StrictMode>,
);
