import fs from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const fontkit = require("/tmp/quipraia-vector-tools/node_modules/fontkit");

const width = 735;
const height = 375;
const outputDir = "public/brand/final";

function loadFont(path) {
  return fontkit.openSync(path);
}

function extractPaths(svg) {
  return [...svg.matchAll(/<path d="([^"]+)" fill="([^"]+)"\/>/g)].map(
    ([, d, fill]) => ({ d, fill }),
  );
}

function trackedText(font, text, size, tracking) {
  const scale = size / font.unitsPerEm;
  const glyphs = [...text].map((character) => font.glyphForCodePoint(character.codePointAt(0)));
  let x = 0;
  const pieces = [];
  for (const glyph of glyphs) {
    const d = glyph.path.toSVG();
    if (d) pieces.push(`<path d="${d}" transform="translate(${x.toFixed(2)} 0) scale(${scale} ${-scale})"/>`);
    x += glyph.advanceWidth * scale + tracking;
  }
  return { markup: pieces.join(""), width: x - tracking };
}

const [symbolSvg, wordmarkSvg, sora, inter] = await Promise.all([
  fs.readFile(`${outputDir}/quipraia-3c-symbol-dark-approved.svg`, "utf8"),
  fs.readFile(`${outputDir}/quipraia-3c-wordmark-dark-approved.svg`, "utf8"),
  loadFont("/tmp/quipraia-vector-tools/node_modules/@fontsource/sora/files/sora-latin-600-normal.woff"),
  loadFont("/tmp/quipraia-vector-tools/node_modules/@fontsource/inter/files/inter-latin-700-normal.woff"),
]);

const symbolPaths = extractPaths(symbolSvg);
const wordmarkPaths = extractPaths(wordmarkSvg);
const tagline = trackedText(sora, "QUAL PRAIA HOJE?", 21, 20.8);
const dataLine = trackedText(inter, "SWELL · MARÉ · VENTO", 13, 9.8);

function pathGroup(paths, transform, foamColor) {
  return `<g transform="${transform}">${paths
    .map(({ d, fill }) => `<path d="${d}" fill="${fill === "#F4F6F7" ? foamColor : fill}"/>`)
    .join("")}</g>`;
}

function build({ foamColor, background, suffix }) {
  const taglineX = (width - tagline.width) / 2;
  const dataX = (width - dataLine.width) / 2;
  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="QuiPraia 3C assinatura ${suffix}">
  <rect width="${width}" height="${height}" fill="${background}"/>
  ${pathGroup(symbolPaths, "translate(250 6)", foamColor)}
  ${pathGroup(wordmarkPaths, "translate(18 186)", foamColor)}
  <g fill="${suffix === "dark" ? "#9FD3C6" : "#0B1D2D"}" transform="translate(${taglineX.toFixed(2)} 307)">${tagline.markup}</g>
  <g fill="#FF6B57" transform="translate(${dataX.toFixed(2)} 360)">${dataLine.markup}</g>
</svg>\n`;
  return fs.writeFile(`${outputDir}/quipraia-3c-lockup-${suffix}-final.svg`, svg);
}

await Promise.all([
  build({ foamColor: "#F4F6F7", background: "#0B1D2D", suffix: "dark" }),
  build({ foamColor: "#0B1D2D", background: "#F4F6F7", suffix: "light" }),
]);
