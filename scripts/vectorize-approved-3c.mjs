import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const potrace = require("/tmp/quipraia-vector-tools/node_modules/potrace");

const root = process.cwd();
const approvalDir = path.join(root, "public/brand/approval");
const outputDir = path.join(root, "public/brand/final");
const temporaryDir = "/tmp/quipraia-3c-trace";

await fs.mkdir(temporaryDir, { recursive: true });

const assets = [
  { name: "lockup", input: "3c-lockup-master-transparent.png" },
  { name: "symbol", input: "3c-symbol-master-transparent.png" },
  { name: "wordmark", input: "3c-wordmark-master-transparent.png" },
];

function trace(maskPath, color) {
  return new Promise((resolve, reject) => {
    potrace.trace(
      maskPath,
      {
        color,
        background: "transparent",
        threshold: 128,
        turdSize: 1,
        optCurve: true,
        optTolerance: 0.08,
      },
      (error, svg) => {
        if (error) return reject(error);
        const match = svg.match(/<path d="([^"]+)"/);
        if (!match) return reject(new Error(`Path ausente em ${maskPath}`));
        resolve(match[1]);
      },
    );
  });
}

function svgDocument({ width, height, foamPath, coralPath, foamColor, title }) {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
  <path d="${foamPath}" fill="${foamColor}"/>
  <path d="${coralPath}" fill="#FF6B57"/>
</svg>\n`;
}

for (const asset of assets) {
  const inputPath = path.join(approvalDir, asset.input);
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const foamMask = Buffer.alloc(info.width * info.height);
  const coralMask = Buffer.alloc(info.width * info.height);

  for (let source = 0, target = 0; source < data.length; source += 4, target += 1) {
    const red = data[source];
    const green = data[source + 1];
    const blue = data[source + 2];
    const alpha = data[source + 3];
    const isCoral = red > 245 && green < 150 && blue < 140;
    foamMask[target] = 255 - (isCoral ? 0 : alpha);
    coralMask[target] = 255 - (isCoral ? alpha : 0);
  }

  const foamMaskPath = path.join(temporaryDir, `${asset.name}-foam.png`);
  const coralMaskPath = path.join(temporaryDir, `${asset.name}-coral.png`);
  await sharp(foamMask, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toFile(foamMaskPath);
  await sharp(coralMask, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toFile(coralMaskPath);

  const [foamPath, coralPath] = await Promise.all([
    trace(foamMaskPath, "#F4F6F7"),
    trace(coralMaskPath, "#FF6B57"),
  ]);

  const variants = [
    { suffix: "dark", foamColor: "#F4F6F7" },
    { suffix: "light", foamColor: "#0B1D2D" },
  ];

  for (const variant of variants) {
    const svg = svgDocument({
      width: info.width,
      height: info.height,
      foamPath,
      coralPath,
      foamColor: variant.foamColor,
      title: `QuiPraia 3C ${asset.name} ${variant.suffix}`,
    });
    await fs.writeFile(
      path.join(outputDir, `quipraia-3c-${asset.name}-${variant.suffix}-approved.svg`),
      svg,
    );
  }
}
