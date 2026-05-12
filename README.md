# Liquid Glass Music Player

Static iOS liquid-glass style music player cards for GitHub README files. Pass a YouTube link to `/player.svg`, and the service uses the YouTube thumbnail as the album cover plus the video title and channel name as track metadata.

```html
<img src="https://your-domain.example/player.svg?url=https%3A%2F%2Fyoutu.be%2FdQw4w9WgXcQ" alt="Liquid glass music player" width="860" />
```

## Local Development

```bash
npm run dev
```

Open `http://localhost:3000` to preview the React player. Use `/player.svg?url=...` for README embeds.

## URL Parameters

| Param | Required | Description |
|-------|----------|-------------|
| `url` | Yes | YouTube video URL, Shorts URL, embed URL, youtu.be URL, or raw video ID |
| `title` | No | Override the fetched YouTube title |
| `artist` | No | Override the fetched YouTube channel name |

## Endpoints

- `/` - React preview
- `/player.svg?url=...` - README-compatible static SVG
- `/api/metadata?url=...` - metadata JSON for debugging

The SVG does not play audio and does not use hover effects, because GitHub README images are static embeds.
