import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { normalizePathname } from "./lib/pathname";

const rootElement = document.getElementById("root");
const currentPath = normalizePathname(window.location.pathname);
const app = (
  <React.StrictMode>
    <App currentPath={currentPath} />
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
