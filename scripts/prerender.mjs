// Build-time prerender: injects the app's static HTML into dist/public/index.html
// so search engines that don't run JavaScript can index the page content.
// Runs after `vite build` (see the "build" script in package.json).
import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptsDir, "..");
const bundlePath = path.join(projectRoot, "dist", ".prerender", "entry.mjs");
const indexPath = path.join(projectRoot, "dist", "public", "index.html");

await build({
  entryPoints: [path.join(scriptsDir, "prerender-entry.tsx")],
  bundle: true,
  format: "esm",
  platform: "node",
  packages: "external",
  jsx: "automatic",
  loader: { ".css": "empty" },
  outfile: bundlePath,
  logLevel: "silent",
});

const { render } = await import(pathToFileURL(bundlePath).href);
const appHtml = render();

const marker = '<div id="root"></div>';
let html = fs.readFileSync(indexPath, "utf-8");
if (!html.includes(marker)) {
  throw new Error("prerender: could not find #root marker in dist/public/index.html");
}
html = html.replace(marker, `<div id="root">${appHtml}</div>`);
fs.writeFileSync(indexPath, html, "utf-8");
fs.rmSync(path.dirname(bundlePath), { recursive: true, force: true });

console.log(`prerender: injected ${(appHtml.length / 1024).toFixed(1)}KB of static HTML into index.html`);
