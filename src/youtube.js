const OEMBED_ENDPOINT = "https://www.youtube.com/oembed";

export function parseYouTubeVideoId(input) {
  if (!input || typeof input !== "string") return null;

  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      if (url.searchParams.has("v")) {
        const id = url.searchParams.get("v");
        return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
      }

      const parts = url.pathname.split("/").filter(Boolean);
      const knownPrefixes = new Set(["embed", "shorts", "live"]);
      if (knownPrefixes.has(parts[0]) && /^[a-zA-Z0-9_-]{11}$/.test(parts[1] || "")) {
        return parts[1];
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function normalizeYouTubeUrl(input) {
  const id = parseYouTubeVideoId(input);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
}

export function thumbnailUrl(videoId) {
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}

export async function fetchYouTubeMetadata(input, fetchImpl = globalThis.fetch) {
  const normalized = normalizeYouTubeUrl(input);
  const videoId = parseYouTubeVideoId(input);

  if (!normalized || !videoId) {
    return {
      ok: false,
      title: "YouTube Track",
      artist: "Unknown Artist",
      thumbnail: null,
      videoId: null
    };
  }

  if (typeof fetchImpl !== "function") {
    return fallbackMetadata(videoId);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetchImpl(`${OEMBED_ENDPOINT}?format=json&url=${encodeURIComponent(normalized)}`, {
      signal: controller.signal,
      headers: {
        "user-agent": "liquid-glass-music-player/0.1"
      }
    });

    if (!response.ok) return fallbackMetadata(videoId);

    const data = await response.json();
    return {
      ok: true,
      title: cleanText(data.title) || "YouTube Track",
      artist: cleanText(data.author_name) || "Unknown Artist",
      thumbnail: thumbnailUrl(videoId),
      videoId
    };
  } catch {
    return fallbackMetadata(videoId);
  } finally {
    clearTimeout(timeout);
  }
}

export function metadataFromQuery(searchParams) {
  const url = searchParams.get("url") || searchParams.get("youtube") || searchParams.get("v") || "";
  const videoId = parseYouTubeVideoId(url);
  return {
    url,
    videoId,
    title: cleanText(searchParams.get("title")),
    artist: cleanText(searchParams.get("artist") || searchParams.get("author")),
    theme: cleanText(searchParams.get("theme"))
  };
}

function fallbackMetadata(videoId) {
  return {
    ok: false,
    title: "YouTube Track",
    artist: "Unknown Artist",
    thumbnail: thumbnailUrl(videoId),
    videoId
  };
}

function cleanText(value) {
  if (!value || typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, 120);
}

