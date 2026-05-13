import { NextRequest } from "next/server";
import { fetchYouTubeMetadata, metadataFromQuery } from "../../src/youtube.js";
import { renderPlayerSvg } from "../../src/svg.js";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const query = metadataFromQuery(request.nextUrl.searchParams);
  const remote = await fetchYouTubeMetadata(query.url);
  const metadata = {
    ...remote,
    title: query.title || remote.title,
    artist: query.artist || remote.artist,
    videoId: query.videoId || remote.videoId
  };
  const embeddedThumbnail = await fetchImageDataUri(metadata.thumbnail);

  return new Response(renderPlayerSvg({ ...metadata, thumbnail: embeddedThumbnail }), {
    status: 200,
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=300, stale-while-revalidate=3600"
    }
  });
}

async function fetchImageDataUri(url?: string | null) {
  if (!url) return "";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return "";

    const contentType = response.headers.get("content-type")?.split(";")[0] || "image/jpeg";
    if (!contentType.startsWith("image/")) return "";

    const data = await response.arrayBuffer();
    if (data.byteLength > 2_000_000) return "";

    return `data:${contentType};base64,${Buffer.from(data).toString("base64")}`;
  } catch {
    return "";
  } finally {
    clearTimeout(timeout);
  }
}
