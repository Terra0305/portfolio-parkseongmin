import { renderToString } from "react-dom/server";
import App from "../client/src/App";

// Renders the static portfolio page to an HTML string.
// Used at build time only (scripts/prerender.mjs) so crawlers that don't
// execute JavaScript (e.g. Naver Yeti) can read the page content.
export function render(): string {
  return renderToString(<App />);
}
