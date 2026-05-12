# Repository Instructions

This project is a small Node web service that generates animated SVG music player cards for GitHub README embeds.

- Keep the SVG endpoint README-compatible: it must return `image/svg+xml` and work through a normal `<img>` tag.
- Do not add real audio playback; the product is visual-only.
- Prefer Node built-ins and static files unless a dependency removes substantial complexity.
- Keep generated SVG text bounded and escaped.
- Run `npm test` after changing URL parsing or metadata logic.

