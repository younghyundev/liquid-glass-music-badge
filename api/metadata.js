import { fetchYouTubeMetadata, metadataFromQuery } from "../src/youtube.js";

export default async function handler(request, response) {
  const currentUrl = new URL(request.url, `https://${request.headers.host || "localhost"}`);
  const query = metadataFromQuery(currentUrl.searchParams);
  const remote = await fetchYouTubeMetadata(query.url);

  response.status(200).json({
    ...remote,
    title: query.title || remote.title,
    artist: query.artist || remote.artist,
    videoId: query.videoId || remote.videoId
  });
}
