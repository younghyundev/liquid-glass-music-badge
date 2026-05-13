import { NextRequest } from "next/server";
import { fetchYouTubeMetadata, metadataFromQuery } from "../../../src/youtube";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const query = metadataFromQuery(request.nextUrl.searchParams);
  const remote = await fetchYouTubeMetadata(query.url);

  return Response.json({
    ...remote,
    title: query.title || remote.title,
    artist: query.artist || remote.artist,
    videoId: query.videoId || remote.videoId
  });
}
