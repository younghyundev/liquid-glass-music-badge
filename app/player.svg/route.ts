import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextRequest } from "next/server";
import { fetchYouTubeMetadata, metadataFromQuery } from "../../src/youtube.js";
import { renderPlayerSvg } from "../../src/svg.js";

export const runtime = "nodejs";

const controlAssetsPromise = loadControlAssets();

export async function GET(request: NextRequest) {
  const query = metadataFromQuery(request.nextUrl.searchParams);
  const remote = await fetchYouTubeMetadata(query.url);
  const metadata = {
    ...remote,
    title: query.title || remote.title,
    artist: query.artist || remote.artist,
    videoId: query.videoId || remote.videoId
  };

  return new Response(renderPlayerSvg(metadata, { controls: await controlAssetsPromise }), {
    status: 200,
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400"
    }
  });
}

async function loadControlAssets() {
  const names = ["shuffle", "previous", "pause", "next", "repeat"];
  const entries = await Promise.all(
    names.map(async (name) => {
      const data = await readFile(join(process.cwd(), "public", "assets", "controls", `${name}.png`));
      return [name, `data:image/png;base64,${data.toString("base64")}`];
    })
  );

  return Object.fromEntries(entries);
}
