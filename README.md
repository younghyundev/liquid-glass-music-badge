<img width="2172" height="724" alt="image" src="https://github.com/user-attachments/assets/6f33c4fe-187e-4fc3-aaf1-2b8e97d0face" />

# Liquid Glass Music Badge

A README-embeddable liquid glass music badge generated from YouTube links.

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
- YouTube thumbnail album artwork (embedded as a data URI in the SVG)
- Optional title and artist overrides via query params
- Liquid glass landing page with mouse-parallax background, scroll-reveal
  sections, and Apple-style refractive glass buttons
- Live preview that fetches the actual `/player.svg` response — what you see is
  what GitHub fetches

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the landing page. Hit
`http://localhost:3000/try` for the generator form.

For a production check:

```bash
npm run build
npm run start
```

Run the test suite (URL parsing + SVG output sanity checks):

```bash
npm test
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
Safari and Firefox only partially support the displacement effect on the
landing page's `LiquidGlass` buttons; the SVG badge itself renders identically
across browsers.
