# Liquid Glass Music Badge

A README-embeddable liquid glass music badge generated from YouTube links. Built
with Next.js, React, and TypeScript for straightforward Vercel deployment.

The project serves a static SVG at `/player.svg`. Pass a YouTube URL, and the
badge uses the video's thumbnail as the album cover. It also shows the fetched
YouTube title and channel name, or custom title/artist overrides when provided.

The badge is visual only. It does not play audio, and hover effects are disabled
so it works cleanly as a GitHub README `<img>` embed.

## Preview

<img src="https://liquid-glass-music-badge.vercel.app/player.svg?url=https%3A%2F%2Fyoutu.be%2F1JS5Td0MeNE%3Fsi%3DecOPZLccoV28Niip&v=2" alt="Liquid glass music badge" width="920" />

```html
<img src="https://liquid-glass-music-badge.vercel.app/player.svg?url=https%3A%2F%2Fyoutu.be%2F1JS5Td0MeNE%3Fsi%3DecOPZLccoV28Niip&v=2" alt="Liquid glass music badge" width="920" />
```

## Features

- GitHub README-compatible SVG output
- YouTube thumbnail album artwork
- Optional title and artist overrides
- Liquid glass style card with embedded control assets
- Local React preview of the liquid glass player
- In-page tester that generates the final README `<img>` tag
- Next.js route handlers for Vercel-friendly deployment

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to preview the React player and test README SVG
generation from a YouTube link.

For a production check:

```bash
npm run build
npm run start
```

## URL Parameters

| Param | Required | Description |
| --- | --- | --- |
| `url` | Yes | YouTube video URL, Shorts URL, embed URL, youtu.be URL, or raw video ID |
| `title` | No | Override the fetched YouTube title |
| `artist` | No | Override the fetched YouTube channel name |

Example:

```text
http://localhost:3000/player.svg?url=https%3A%2F%2Fyoutu.be%2FdQw4w9WgXcQ&title=Test%20Track&artist=Test%20Artist
```

## Endpoints

- `/` - React preview and README SVG tester
- `/player.svg?url=...` - README-compatible static SVG
- `/api/metadata?url=...` - metadata JSON for debugging

## Notes

GitHub README files cannot run JavaScript inside an image embed, so the README
badge is intentionally rendered as a static SVG. The local React preview keeps
the richer liquid glass implementation for development and visual tuning.
