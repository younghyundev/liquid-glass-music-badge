import { CONTROL_ICON_DATA_URIS } from "./control-icons";
import { PLAYER_DEFAULTS, PLAYER_STYLE, type ControlBox, type ControlName } from "./player-style";
import { thumbnailUrl } from "./youtube";

type PlayerSvgMetadata = {
  title?: string | null;
  artist?: string | null;
  thumbnail?: string | null;
  videoId?: string | null;
};

type SvgText = {
  title: string;
  artist: string;
};

export function renderPlayerSvg(metadata: PlayerSvgMetadata): string {
  const cover = metadata.thumbnail || thumbnailUrl(metadata.videoId) || "";
  const text = {
    title: truncate(metadata.title || PLAYER_DEFAULTS.title, 92),
    artist: truncate(metadata.artist || PLAYER_DEFAULTS.artist, 28)
  };
  const { card } = PLAYER_STYLE;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${card.width}" height="${card.height}" viewBox="0 0 ${card.width} ${card.height}" role="img" aria-label="${xmlAttr(text.title)} by ${xmlAttr(text.artist)}">
  ${renderDefs()}

  <g filter="url(#softShadow)">
    <g clip-path="url(#cardClip)">
      ${renderCardBackground()}
      ${renderArtwork(cover)}
      ${renderMetadata(text)}
      ${renderProgress()}
      ${renderControls()}
    </g>
  </g>
</svg>`;
}

function renderDefs(): string {
  const { card, colors, art, typography, svgGlass } = PLAYER_STYLE;

  return `<defs>
    <linearGradient id="cardGlass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.11"/>
      <stop offset="42%" stop-color="#0a0710" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.2"/>
    </linearGradient>
    <linearGradient id="edgeLight" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.34"/>
      <stop offset="36%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="68%" stop-color="#ffffff" stop-opacity="0.035"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.22"/>
    </linearGradient>
    <linearGradient id="specular" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="46%" stop-color="#ffffff" stop-opacity="0.18"/>
      <stop offset="56%" stop-color="#ffffff" stop-opacity="0.075"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="glassGlowTop" cx="16%" cy="12%" r="72%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="48%" stop-color="#ffffff" stop-opacity="0.045"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glassGlowBottom" cx="88%" cy="90%" r="68%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.09"/>
      <stop offset="54%" stop-color="#ffffff" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="progressFill" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${colors.progressFillStart}" stop-opacity="0.96"/>
      <stop offset="100%" stop-color="${colors.progressFillEnd}" stop-opacity="0.94"/>
    </linearGradient>
    <filter id="softShadow" x="-16%" y="-24%" width="132%" height="152%">
      <feDropShadow dx="0" dy="30" stdDeviation="34" flood-color="#000000" flood-opacity="0.45"/>
      <feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="#ffffff" flood-opacity="0.16"/>
    </filter>
    <filter id="surfaceBlur">
      <feGaussianBlur stdDeviation="11"/>
    </filter>
    <filter id="liquidGlassDisplacement" x="-6%" y="-10%" width="112%" height="120%" filterUnits="objectBoundingBox" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="${svgGlass.turbulenceBaseFrequency}" numOctaves="${svgGlass.turbulenceOctaves}" seed="${svgGlass.turbulenceSeed}" result="liquidNoise"/>
      <feDisplacementMap in="SourceGraphic" in2="liquidNoise" scale="${svgGlass.displacementScale}" xChannelSelector="R" yChannelSelector="G" result="refractedGlass"/>
      <feColorMatrix in="refractedGlass" type="matrix" values="1.04 0 0 0 0  0 1.02 0 0 0  0 0 1.08 0 0  0 0 0 1 0"/>
    </filter>
    <filter id="iconShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.18"/>
    </filter>
    <clipPath id="cardClip">
      <rect x="0" y="0" width="${card.width}" height="${card.height}" rx="${card.radius}"/>
    </clipPath>
    <clipPath id="coverClip">
      <rect x="${art.x}" y="${art.y}" width="${art.size}" height="${art.size}" rx="${art.radius}"/>
    </clipPath>
    <clipPath id="titleClip">
      <rect x="${typography.title.clipX}" y="${typography.title.clipY}" width="${typography.title.clipWidth}" height="${typography.title.clipHeight}"/>
    </clipPath>
    <style>
      .title { font: ${typography.title.weight} ${typography.title.size}px ${typography.fontStack}; fill: ${colors.text}; letter-spacing: 0; }
      .artist { font: ${typography.artist.weight} ${typography.artist.size}px ${typography.fontStack}; fill: ${colors.muted}; letter-spacing: 0; }
      .time { font: ${typography.time.weight} ${typography.time.size}px ${typography.fontStack}; fill: ${colors.text}; letter-spacing: 0; }
    </style>
  </defs>`;
}

function renderCardBackground(): string {
  const { card } = PLAYER_STYLE;

  return `<g filter="url(#liquidGlassDisplacement)">
        <rect width="${card.width}" height="${card.height}" rx="${card.radius}" fill="url(#cardGlass)"/>
        <rect x="-20" y="-22" width="${card.width + 40}" height="${card.height + 46}" fill="#ffffff" opacity=".045"/>
        <rect width="${card.width}" height="${card.height}" rx="${card.radius}" fill="url(#glassGlowTop)" opacity=".9"/>
        <rect width="${card.width}" height="${card.height}" rx="${card.radius}" fill="url(#glassGlowBottom)" opacity=".85"/>
      </g>
      <rect x="-20" y="58" width="${card.width + 40}" height="84" fill="url(#specular)" opacity=".44" transform="rotate(-22 ${card.width / 2} 100)"/>
      <rect x="1" y="1" width="${card.width - 2}" height="${card.height - 2}" rx="${card.radius - 1}" fill="none" stroke="url(#edgeLight)" stroke-width="2"/>
      <rect x="2.5" y="2.5" width="${card.width - 5}" height="${card.height - 5}" rx="${card.radius - 2.5}" fill="none" stroke="#ffffff" stroke-opacity=".09"/>`;
}

function renderArtwork(cover: string): string {
  const { art } = PLAYER_STYLE;

  if (!cover) {
    return `<g clip-path="url(#coverClip)">
        ${renderFallbackCover()}
        <rect x="${art.x}" y="${art.y}" width="${art.size}" height="${art.size}" fill="#ffffff" opacity=".05"/>
      </g>`;
  }

  // YouTube's hqdefault.jpg is 480x360 (4:3). For 16:9 videos it places the
  // actual frame at y=45..315 with 45px black letterboxes top and bottom.
  // Scale the image so the 480x270 video band fills the square album slot and
  // the letterboxes fall outside the clip path.
  const SOURCE_W = 480;
  const SOURCE_H = 360;
  const LETTERBOX_TOP = 45;
  const VIDEO_HEIGHT = 270;
  const scale = art.size / VIDEO_HEIGHT;
  const renderedW = SOURCE_W * scale;
  const renderedH = SOURCE_H * scale;
  const imageX = art.x - (renderedW - art.size) / 2;
  const imageY = art.y - LETTERBOX_TOP * scale;

  return `<g clip-path="url(#coverClip)">
        <image href="${xmlAttr(cover)}" x="${imageX.toFixed(2)}" y="${imageY.toFixed(2)}" width="${renderedW.toFixed(2)}" height="${renderedH.toFixed(2)}" preserveAspectRatio="none"/>
        <rect x="${art.x}" y="${art.y}" width="${art.size}" height="${art.size}" fill="#ffffff" opacity=".05"/>
      </g>`;
}

function renderMetadata(text: SvgText): string {
  const { typography } = PLAYER_STYLE;

  return `${renderTitle(text.title)}
      ${renderVisualizer()}
      <text x="${typography.artist.x}" y="${typography.artist.y}" class="artist">${xmlText(text.artist)}</text>`;
}

function renderVisualizer(): string {
  const { visualizer } = PLAYER_STYLE;
  const bars = visualizer.heights
    .map((height, index) => {
      const x = visualizer.x + index * (visualizer.barWidth + visualizer.gap);
      const y = visualizer.y + (visualizer.height - height) / 2;
      const centerY = visualizer.y + visualizer.height / 2;
      const minHeight = Math.max(6, Math.round(height * 0.38));
      const minY = centerY - minHeight / 2;
      const duration = visualizer.durations[index];
      const delay = visualizer.delays[index];

      return `<rect x="${x}" y="${y}" width="${visualizer.barWidth}" height="${height}" rx="${visualizer.radius}" fill="#ffffff" opacity=".92">
          <animate attributeName="height" values="${minHeight};${height};${Math.max(8, height * 0.72)};${height};${minHeight}" dur="${duration}s" begin="${delay}s" repeatCount="indefinite"/>
          <animate attributeName="y" values="${minY};${y};${centerY - Math.max(8, height * 0.72) / 2};${y};${minY}" dur="${duration}s" begin="${delay}s" repeatCount="indefinite"/>
        </rect>`;
    })
    .join("");

  return `<g aria-hidden="true">${bars}</g>`;
}

function renderProgress(): string {
  const { progress } = PLAYER_STYLE;

  return `<text x="${progress.currentTimeX}" y="${progress.timeY}" class="time">${PLAYER_DEFAULTS.currentTime}</text>
      <rect x="${progress.x}" y="${progress.y}" width="${progress.width}" height="${progress.height}" rx="${progress.radius}" fill="#ffffff" opacity=".22"/>
      <rect x="${progress.x}" y="${progress.y}" width="${progress.fillWidth}" height="${progress.height}" rx="${progress.radius}" fill="url(#progressFill)"/>
      <text x="${progress.remainingTimeX}" y="${progress.timeY}" class="time">${PLAYER_DEFAULTS.remainingTime}</text>`;
}

function renderControls(): string {
  const { controls } = PLAYER_STYLE;

  return `<g opacity=".98">
        ${renderControlIcon("shuffle", controls.shuffle)}
        ${renderControlIcon("previous", controls.previous)}
        ${renderControlIcon("pause", controls.pause)}
        ${renderControlIcon("next", controls.next)}
        ${renderControlIcon("repeat", controls.repeat)}
      </g>`;
}

function renderControlIcon(name: ControlName, box: ControlBox): string {
  const href = CONTROL_ICON_DATA_URIS[name];

  return `<image href="${href}" x="${box.x}" y="${box.y}" width="${box.width}" height="${box.height}" preserveAspectRatio="xMidYMid meet" filter="url(#iconShadow)" aria-hidden="true"/>`;
}

function renderTitle(title: string): string {
  const { x, y, clipWidth } = PLAYER_STYLE.typography.title;
  const estimatedWidth = estimateTitleWidth(title);

  if (estimatedWidth <= clipWidth) {
    return `<g clip-path="url(#titleClip)"><text x="${x}" y="${y}" class="title">${xmlText(title)}</text></g>`;
  }

  // iOS-style infinite one-direction marquee: two copies separated by a gap.
  // When the first copy scrolls fully off-screen left, the second copy lands
  // exactly where the first one started, so the reset to 0 is invisible.
  const PX_PER_SECOND = 38;
  const GAP = 80;
  const loopDistance = estimatedWidth + GAP;
  const duration = (loopDistance / PX_PER_SECOND).toFixed(2);
  const secondCopyX = x + loopDistance;
  const escaped = xmlText(title);

  return `<g clip-path="url(#titleClip)">
        <g>
          <text x="${x}" y="${y}" class="title">${escaped}</text>
          <text x="${secondCopyX}" y="${y}" class="title">${escaped}</text>
          <animateTransform attributeName="transform" type="translate" from="0 0" to="-${loopDistance} 0" dur="${duration}s" begin="1.5s" repeatCount="indefinite"/>
        </g>
      </g>`;
}

function estimateTitleWidth(value: string): number {
  return [...value].reduce((width, char) => {
    if (/\s/.test(char)) return width + 13;
    if (/[ilI.,'|!]/.test(char)) return width + 11;
    if (/[mwMW@#%&]/.test(char)) return width + 34;
    if (char.charCodeAt(0) > 255) return width + 42;
    return width + 25;
  }, 0);
}

function renderFallbackCover(): string {
  const { art } = PLAYER_STYLE;

  return `
        <rect x="${art.x}" y="${art.y}" width="${art.size}" height="${art.size}" fill="#7b5731"/>
        <circle cx="142" cy="83" r="42" fill="#f6dfb6" opacity=".88"/>
        <path d="M78 216c12-58 36-92 73-101 30-7 49 26 42 101Z" fill="#ead0a7" opacity=".9"/>
        <path d="M42 56h164v168H42z" fill="#20170f" opacity=".18"/>`;
}

function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}...` : value;
}

function xmlText(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function xmlAttr(value: string): string {
  return xmlText(value).replaceAll('"', "&quot;");
}
