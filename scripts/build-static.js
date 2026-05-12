import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const root = fileURLToPath(new URL("..", import.meta.url));
const publicAssets = join(root, "public", "assets");

await mkdir(publicAssets, { recursive: true });

await copyFile(
  join(root, "src", "components", "LiquidGlassMusicPlayer.css"),
  join(publicAssets, "liquid-glass-player.css")
);

await esbuild.build({
  entryPoints: [join(root, "src", "main.jsx")],
  bundle: true,
  format: "esm",
  platform: "browser",
  outfile: join(publicAssets, "react-preview.js"),
  jsx: "automatic",
  minify: true,
  logLevel: "info"
});
