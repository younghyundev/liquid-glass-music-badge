# Requirements: Liquid Glass Music Player

**Defined:** 2026-05-12
**Core Value:** Generate a polished animated music-player image from a YouTube link that works inside a GitHub README `img` tag.

## v1 Requirements

### SVG Generation

- [ ] **SVG-01**: User can request `/player.svg` with a YouTube URL parameter and receive an `image/svg+xml` response.
- [ ] **SVG-02**: User can embed the generated SVG in a GitHub README using a standard HTML `img` tag.
- [ ] **SVG-03**: The generated SVG includes visual playback animation while not playing real audio.

### YouTube Metadata

- [ ] **META-01**: User can pass a watch URL, youtu.be URL, embed URL, Shorts URL, or raw video ID.
- [ ] **META-02**: The generated player uses the YouTube thumbnail as the album cover when a valid video ID is provided.
- [ ] **META-03**: The generated player displays the YouTube title and channel/artist name when metadata lookup succeeds.
- [ ] **META-04**: User can override title and artist through query parameters.
- [ ] **META-05**: The generator returns a graceful fallback player when metadata lookup fails.

### Visual Design

- [ ] **VIS-01**: The player presents an iOS liquid-glass visual style with translucent panels, highlights, depth, and a modern music player layout.
- [ ] **VIS-02**: Text remains inside the player bounds for typical YouTube title and channel lengths.
- [ ] **VIS-03**: The design works as a standalone image at README-friendly dimensions.

### Preview App

- [ ] **APP-01**: User can open a local web page, enter a YouTube link, and preview the generated SVG.
- [ ] **APP-02**: User can copy a ready-to-use README `img` tag from the preview page.
- [ ] **APP-03**: The preview page remains usable on mobile and desktop widths.

## v2 Requirements

### Deployment Polish

- **DEP-01**: Provide one-click deployment presets for Vercel or another Node-compatible host.
- **DEP-02**: Add configurable themes beyond automatic accent selection.
- **DEP-03**: Add badges or compact player sizes for narrow README layouts.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real media playback | GitHub README images are non-interactive and cannot play audio |
| OAuth or user accounts | The generator is stateless in v1 |
| Playlist support | Single-track cards satisfy the requested README use case |
| Client-only metadata fetching | README embeds cannot run page JavaScript |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SVG-01 | Phase 1 | Pending |
| SVG-02 | Phase 1 | Pending |
| SVG-03 | Phase 1 | Pending |
| META-01 | Phase 1 | Pending |
| META-02 | Phase 1 | Pending |
| META-03 | Phase 1 | Pending |
| META-04 | Phase 1 | Pending |
| META-05 | Phase 1 | Pending |
| VIS-01 | Phase 2 | Pending |
| VIS-02 | Phase 2 | Pending |
| VIS-03 | Phase 2 | Pending |
| APP-01 | Phase 3 | Pending |
| APP-02 | Phase 3 | Pending |
| APP-03 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0

---
*Requirements defined: 2026-05-12*
*Last updated: 2026-05-12 after initial definition*

