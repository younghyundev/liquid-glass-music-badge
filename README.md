# Liquid Glass Music Player

Animated iOS liquid-glass style music player cards for GitHub README files. Pass a YouTube link to `/player.svg`, and the service uses the YouTube thumbnail as the album cover plus the video title and channel name as track metadata.

```html
<img src="https://your-domain.example/player.svg?url=https%3A%2F%2Fyoutu.be%2FdQw4w9WgXcQ" alt="Liquid glass music player" width="860" />
```

## Local Development

```bash
npm run dev
```

Open `http://localhost:3000`, paste a YouTube URL, and copy the generated `<img>` tag.

## URL Parameters

| Param | Required | Description |
|-------|----------|-------------|
| `url` | Yes | YouTube video URL, Shorts URL, embed URL, youtu.be URL, or raw video ID |
| `title` | No | Override the fetched YouTube title |
| `artist` | No | Override the fetched YouTube channel name |

## Endpoints

- `/` - interactive generator and preview
- `/player.svg?url=...` - README-compatible animated SVG
- `/api/metadata?url=...` - metadata JSON for debugging

The SVG does not play audio. It uses animated equalizer bars, a moving progress glint, and glass highlights to look like playback is active.

