import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fetchYouTubeMetadata, metadataFromQuery } from "./youtube.js";
import { renderPlayerSvg } from "./svg.js";

const root = join(fileURLToPath(new URL("..", import.meta.url)));
const publicRoot = join(root, "public");
const port = Number(process.env.PORT || 3000);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png"
};

const controlAssetsPromise = loadControlAssets();

export async function handleRequest(request, response) {
  const currentUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (currentUrl.pathname === "/player.svg") {
    const query = metadataFromQuery(currentUrl.searchParams);
    const remote = await fetchYouTubeMetadata(query.url);
    const metadata = {
      ...remote,
      title: query.title || remote.title,
      artist: query.artist || remote.artist,
      videoId: query.videoId || remote.videoId
    };

    response.writeHead(200, {
      "content-type": contentTypes[".svg"],
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400"
    });
    response.end(renderPlayerSvg(metadata, { controls: await controlAssetsPromise }));
    return;
  }

  if (currentUrl.pathname === "/api/metadata") {
    const query = metadataFromQuery(currentUrl.searchParams);
    const remote = await fetchYouTubeMetadata(query.url);
    const body = JSON.stringify({
      ...remote,
      title: query.title || remote.title,
      artist: query.artist || remote.artist,
      videoId: query.videoId || remote.videoId
    });

    response.writeHead(200, { "content-type": contentTypes[".json"] });
    response.end(body);
    return;
  }

  const pathname = currentUrl.pathname === "/" ? "/index.html" : currentUrl.pathname;
  const safePath = pathname.replace(/^\/+/, "");

  if (safePath.includes("..")) {
    response.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
    response.end("Bad request");
    return;
  }

  try {
    const filePath = join(publicRoot, safePath);
    const data = await readFile(filePath);
    response.writeHead(200, {
      "content-type": contentTypes[extname(filePath)] || "application/octet-stream"
    });
    response.end(data);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
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

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createServer(handleRequest).listen(port, () => {
    console.log(`Liquid Glass Music Player listening on http://localhost:${port}`);
  });
}
