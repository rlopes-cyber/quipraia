/**
 * Copies the MapLibre GL worker bundle into public/ so it can be served as a
 * plain static asset and loaded with maplibre-gl's setWorkerUrl().
 *
 * Vite exposed this file through a `?worker&url` import. Next.js has no
 * equivalent import suffix, so the worker file is copied to a fixed public
 * path instead and referenced by that path at runtime.
 */
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDir = join(projectRoot, "node_modules", "maplibre-gl", "dist");
const targetDir = join(projectRoot, "public", "maplibre");

const files = ["maplibre-gl-worker.mjs"];

mkdirSync(targetDir, { recursive: true });

for (const file of files) {
  const source = join(sourceDir, file);
  const target = join(targetDir, file);
  if (!existsSync(source)) {
    console.error(`[copy-maplibre-assets] Missing expected file: ${source}`);
    process.exit(1);
  }
  copyFileSync(source, target);
  console.log(`[copy-maplibre-assets] Copied ${file} -> public/maplibre/${file}`);
}
