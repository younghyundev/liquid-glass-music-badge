import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { fetchYouTubeMetadata, metadataFromQuery } from "../src/youtube.js";
import { renderPlayerSvg } from "../src/svg.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const publicRoot = join(root, "public");
const controlAssetsPromise = loadControlAssets();

export default async function handler(request, response) {
  const currentUrl = new URL(request.url, `https://${request.headers.host || "localhost"}`);
  const query = metadataFromQuery(currentUrl.searchParams);
  const remote = await fetchYouTubeMetadata(query.url);
  const metadata = {
    ...remote,
    title: query.title || remote.title,
    artist: query.artist || remote.artist,
    videoId: query.videoId || remote.videoId
  };

  response.setHeader("content-type", "image/svg+xml; charset=utf-8");
  response.setHeader("cache-control", "public, max-age=3600, stale-while-revalidate=86400");
  response.status(200).send(renderPlayerSvg(metadata, { controls: await controlAssetsPromise }));
}

async function loadControlAssets() {
  const names = ["shuffle", "previous", "pause", "next", "repeat"];
  const entries = await Promise.all(
    names.map(async (name) => {
      const data = await readFile(join(publicRoot, "assets", "controls", `${name}.png`));
      return [name, `data:image/png;base64,${data.toString("base64")}`];
    })
  );

  return Object.fromEntries(entries);
}
