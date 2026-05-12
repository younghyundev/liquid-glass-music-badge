# Roadmap: Liquid Glass Music Player

**Created:** 2026-05-12
**Granularity:** Coarse
**Core Value:** Generate a polished animated music-player image from a YouTube link that works inside a GitHub README `img` tag.

## Phase Overview

| # | Phase | Goal | Requirements | UI hint |
|---|-------|------|--------------|---------|
| 1 | SVG Endpoint and Metadata | Generate README-compatible SVG cards from YouTube links | SVG-01, SVG-02, SVG-03, META-01, META-02, META-03, META-04, META-05 | yes |
| 2 | Liquid Glass Player Design | Make the generated card look polished, animated, and bounded | VIS-01, VIS-02, VIS-03 | yes |
| 3 | Preview and Copy App | Provide a local page for previewing and copying the README tag | APP-01, APP-02, APP-03 | yes |

## Phase Details

### Phase 1: SVG Endpoint and Metadata

**Goal:** Build the server endpoint that turns a YouTube link into a GitHub README-compatible SVG player image.

**Requirements:** SVG-01, SVG-02, SVG-03, META-01, META-02, META-03, META-04, META-05

**Success Criteria:**
1. `/player.svg?url=...` returns `image/svg+xml`.
2. Common YouTube URL formats resolve to the correct video ID.
3. YouTube thumbnail, title, and channel are used when available.
4. Title and artist query overrides are reflected in the generated SVG.
5. Metadata failure still returns a usable fallback card.

### Phase 2: Liquid Glass Player Design

**Goal:** Polish the SVG so it clearly reads as an iOS liquid-glass music player with playback-like motion.

**Requirements:** VIS-01, VIS-02, VIS-03

**Success Criteria:**
1. The SVG has translucent glass, highlights, depth, and album cover treatment.
2. Equalizer, progress, and highlight animations imply active playback.
3. Long titles and artist names are truncated before they overflow.
4. The image is legible at normal README widths.

### Phase 3: Preview and Copy App

**Goal:** Add a usable local site for generating and copying the README `img` tag.

**Requirements:** APP-01, APP-02, APP-03

**Success Criteria:**
1. The home page accepts a YouTube link and optional title/artist overrides.
2. The preview updates to the generated SVG URL.
3. The page exposes a ready-to-use `<img>` snippet.
4. Layout remains coherent on desktop and mobile widths.

## Coverage

All 14 v1 requirements are mapped to exactly one phase.

---
*Roadmap created: 2026-05-12*
*Last updated: 2026-05-12 after initial roadmap*

