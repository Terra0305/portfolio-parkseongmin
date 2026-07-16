import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

const container = document.getElementById("root")!;
const app = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// Production builds prerender the page into #root (scripts/prerender.mjs) for SEO;
// reuse that HTML via hydration. Dev serves an empty #root, so render from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
