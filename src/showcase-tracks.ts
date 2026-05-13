export type ShowcaseTrack = {
  id: string;
  label: string;
  videoId: string;
  url: string;
  thumbnail: string;
  title: string;
  artist: string;
  accent: string;
};

function youtubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function youtubeShareUrl(videoId: string): string {
  return `https://youtu.be/${videoId}`;
}

export const SHOWCASE_TRACKS: ShowcaseTrack[] = [
  {
    id: "birds",
    label: "Indie pop",
    videoId: "1JS5Td0MeNE",
    url: youtubeShareUrl("1JS5Td0MeNE"),
    thumbnail: youtubeThumbnail("1JS5Td0MeNE"),
    title: "Birds of a Feather",
    artist: "Billie Eilish",
    accent: "#ffe0ba"
  },
  {
    id: "lofi",
    label: "Lo-fi study",
    videoId: "jfKfPfyJRdk",
    url: youtubeShareUrl("jfKfPfyJRdk"),
    thumbnail: youtubeThumbnail("jfKfPfyJRdk"),
    title: "lofi hip hop radio",
    artist: "Lofi Girl",
    accent: "#b994ff"
  },
  {
    id: "synthwave",
    label: "Synthwave",
    videoId: "MV_3Dpw-BRY",
    url: youtubeShareUrl("MV_3Dpw-BRY"),
    thumbnail: youtubeThumbnail("MV_3Dpw-BRY"),
    title: "Midnight Drive",
    artist: "The Midnight",
    accent: "#9ec8ff"
  },
  {
    id: "jazz",
    label: "Late night jazz",
    videoId: "Dx5qFachd3A",
    url: youtubeShareUrl("Dx5qFachd3A"),
    thumbnail: youtubeThumbnail("Dx5qFachd3A"),
    title: "Blue in Green",
    artist: "Miles Davis",
    accent: "#ffd1f0"
  }
];

export function buildPlayerSvgUrl(track: ShowcaseTrack): string {
  const params = new URLSearchParams();
  params.set("url", track.url);
  params.set("title", track.title);
  params.set("artist", track.artist);
  return `/player.svg?${params.toString()}`;
}
