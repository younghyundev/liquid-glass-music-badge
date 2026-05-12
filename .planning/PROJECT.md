# Liquid Glass Music Player

## What This Is

Liquid Glass Music Player is a small web service that generates GitHub README-compatible animated music player images. A user passes a YouTube link as a URL parameter, and the generated SVG uses the video's thumbnail as the album cover while displaying the title and channel/artist name in an iOS liquid-glass style.

The image is decorative and status-like, not a real audio player. It should feel like music is playing through subtle SVG animation while still being safe to embed with a normal HTML `img` tag.

## Core Value

Generate a polished animated music-player image from a YouTube link that works inside a GitHub README `img` tag.

## Requirements

### Validated

(None yet - ship to validate)

### Active

- [ ] User can create a README-compatible animated SVG by passing a YouTube link.
- [ ] The SVG uses the YouTube thumbnail as the album cover.
- [ ] The SVG displays the video title and channel/artist name.
- [ ] The visual design reads as iOS liquid glass with a music player layout.
- [ ] The player appears active through animation without actually playing audio.
- [ ] A local web page lets the user preview the generated player and copy an `img` tag.

### Out of Scope

- Real audio/video playback - README images cannot provide an interactive media player.
- User accounts or saved playlists - the first version is a stateless generator.
- Heavy frontend framework - a dependency-free implementation is enough for the first release.
- Client-only GitHub Pages deployment - YouTube metadata lookup needs a server-side request for reliable README embeds.

## Context

The requested output must be usable in GitHub README markdown through an HTML `img` tag. That means the primary artifact should be an SVG image endpoint, not only a normal HTML web app. SVG animations can provide the "currently playing" feeling while remaining image-compatible.

The service should accept common YouTube URL formats, including watch URLs, youtu.be short URLs, embed URLs, Shorts URLs, and raw 11-character video IDs. Metadata should come from YouTube oEmbed when available, with optional title and artist overrides for cases where network lookup fails or the user wants custom text.

## Constraints

- **Embed compatibility**: Output must be `image/svg+xml` so GitHub README files can render it through `<img>`.
- **No real playback**: The player is visual-only because README images cannot control audio playback.
- **Server-side metadata**: YouTube title and channel lookup happens on the server so the README embed can resolve without browser JavaScript.
- **Small stack**: Use Node built-ins and static assets to keep deployment simple.
- **Responsive preview**: The local generator page must work on desktop and mobile without text overlap.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Build a dynamic SVG endpoint | README `img` compatibility requires an image response, not a web page | - Pending |
| Use YouTube oEmbed for metadata | It provides title and author without scraping the page | - Pending |
| Keep the service dependency-free | The scope is small and Node built-ins are sufficient | - Pending |
| Add title and artist overrides | Gives users control when metadata lookup fails or needs cleanup | - Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check - still the right priority?
3. Audit Out of Scope - reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-12 after initialization*

