import { thumbnailUrl } from "./youtube.js";
import { PLAYER_DEFAULTS, PLAYER_STYLE } from "./player-style.js";

export function renderPlayerSvg(metadata) {
  const { card, colors, art, typography, progress, controls: controlStyle } = PLAYER_STYLE;
  const videoId = metadata.videoId;
  const cover = metadata.thumbnail || thumbnailUrl(videoId) || "";
  const title = truncate(metadata.title || PLAYER_DEFAULTS.title, 92);
  const artist = truncate(metadata.artist || PLAYER_DEFAULTS.artist, 28);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${card.width}" height="${card.height}" viewBox="0 0 ${card.width} ${card.height}" role="img" aria-label="${xmlAttr(title)} by ${xmlAttr(artist)}">
  <defs>
    <linearGradient id="cardGlass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="42%" stop-color="#0a0710" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.24"/>
    </linearGradient>
    <linearGradient id="edgeLight" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.42"/>
      <stop offset="36%" stop-color="#ffffff" stop-opacity="0.09"/>
      <stop offset="68%" stop-color="#ffffff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.26"/>
    </linearGradient>
    <linearGradient id="specular" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="44%" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="58%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="progressFill" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${colors.progressFillStart}" stop-opacity="0.96"/>
      <stop offset="100%" stop-color="${colors.progressFillEnd}" stop-opacity="0.94"/>
    </linearGradient>
    <filter id="softShadow" x="-16%" y="-24%" width="132%" height="152%">
      <feDropShadow dx="0" dy="30" stdDeviation="34" flood-color="#000000" flood-opacity="0.45"/>
      <feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="#ffffff" flood-opacity="0.16"/>
    </filter>
    <filter id="surfaceBlur">
      <feGaussianBlur stdDeviation="18"/>
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
  </defs>

  <g filter="url(#softShadow)">
    <g clip-path="url(#cardClip)">
      <rect width="${card.width}" height="${card.height}" rx="${card.radius}" fill="url(#cardGlass)"/>
      <rect x="-20" y="-22" width="${card.width + 40}" height="${card.height + 46}" fill="#ffffff" opacity=".075"/>
      <path d="M-120 316C96 142 214 65 454 103c153 24 271 5 578-165v532H-120Z" fill="#ffffff" opacity=".06" filter="url(#surfaceBlur)"/>
      <rect x="-20" y="58" width="${card.width + 40}" height="84" fill="url(#specular)" opacity=".72" transform="rotate(-22 ${card.width / 2} 100)"/>
      <rect x="1" y="1" width="${card.width - 2}" height="${card.height - 2}" rx="${card.radius - 1}" fill="none" stroke="url(#edgeLight)" stroke-width="2"/>
      <rect x="2.5" y="2.5" width="${card.width - 5}" height="${card.height - 5}" rx="${card.radius - 2.5}" fill="none" stroke="#ffffff" stroke-opacity=".12"/>

      <g clip-path="url(#coverClip)">
        ${cover ? `<image href="${xmlAttr(cover)}" x="${art.x}" y="${art.y}" width="${art.size}" height="${art.size}" preserveAspectRatio="xMidYMid slice"/>` : renderFallbackCover()}
        <rect x="${art.x}" y="${art.y}" width="${art.size}" height="${art.size}" fill="#ffffff" opacity=".05"/>
      </g>

      ${renderTitle(title)}
      <text x="${typography.artist.x}" y="${typography.artist.y}" class="artist">${xmlText(artist)}</text>

      <text x="${progress.currentTimeX}" y="${progress.timeY}" class="time">${PLAYER_DEFAULTS.currentTime}</text>
      <rect x="${progress.x}" y="${progress.y}" width="${progress.width}" height="${progress.height}" rx="${progress.radius}" fill="#ffffff" opacity=".22"/>
      <rect x="${progress.x}" y="${progress.y}" width="${progress.fillWidth}" height="${progress.height}" rx="${progress.radius}" fill="url(#progressFill)"/>
      <text x="${progress.remainingTimeX}" y="${progress.timeY}" class="time">${PLAYER_DEFAULTS.remainingTime}</text>

      <g opacity=".98">
        ${renderControlIcon("shuffle", controlStyle.shuffle)}
        ${renderControlIcon("previous", controlStyle.previous)}
        ${renderControlIcon("pause", controlStyle.pause)}
        ${renderControlIcon("next", controlStyle.next)}
        ${renderControlIcon("repeat", controlStyle.repeat)}
      </g>
    </g>
  </g>
</svg>`;
}

function renderControlIcon(name, box) {
  const icon = {
    shuffle: `
      <path d="M8 20h9.5c5.8 0 9.2 4.4 12.8 12 3.7 7.8 7.8 12 14.2 12H56" stroke="currentColor" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 44h9.8c4.4 0 7.6-2.6 10.4-7.3" stroke="currentColor" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M43 10l13 10-13 10" stroke="currentColor" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M43 34l13 10-13 10" stroke="currentColor" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    previous: `
      <path d="M16 15v34" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
      <path d="M51 15L24 32l27 17V15Z" fill="currentColor"/>`,
    pause: `
      <rect x="19" y="15" width="8" height="34" rx="3.5" fill="currentColor"/>
      <rect x="37" y="15" width="8" height="34" rx="3.5" fill="currentColor"/>`,
    next: `
      <path d="M48 15v34" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
      <path d="M13 15l27 17-27 17V15Z" fill="currentColor"/>`,
    repeat: `
      <path d="M18 18h24c7 0 12 5 12 12v2" stroke="currentColor" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M43 8l11 10-11 10" stroke="currentColor" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M46 46H22c-7 0-12-5-12-12v-2" stroke="currentColor" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M21 56L10 46l11-10" stroke="currentColor" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>`
  }[name];

  return `<svg x="${box.x}" y="${box.y}" width="${box.width}" height="${box.height}" viewBox="0 0 64 64" fill="none" color="#ffffff" overflow="visible" filter="url(#iconShadow)" aria-hidden="true">${icon}</svg>`;
}

function renderTitle(title) {
  const { x, y, clipWidth } = PLAYER_STYLE.typography.title;
  const estimatedWidth = estimateTitleWidth(title);
  const overflow = Math.max(0, estimatedWidth - clipWidth);

  if (!overflow) {
    return `<g clip-path="url(#titleClip)"><text x="${x}" y="${y}" class="title">${xmlText(title)}</text></g>`;
  }

  const travel = Math.min(overflow + 60, 900);
  const duration = Math.min(18, Math.max(9, title.length * 0.2));

  return `<g clip-path="url(#titleClip)">
        <text x="${x}" y="${y}" class="title">${xmlText(title)}
          <animateTransform attributeName="transform" type="translate" values="0 0; -${travel} 0; -${travel} 0; 0 0" keyTimes="0; .42; .72; 1" dur="${duration}s" begin="1s" repeatCount="indefinite"/>
        </text>
      </g>`;
}

function estimateTitleWidth(value) {
  return [...String(value)].reduce((width, char) => {
    if (/\s/.test(char)) return width + 13;
    if (/[ilI.,'|!]/.test(char)) return width + 11;
    if (/[mwMW@#%&]/.test(char)) return width + 34;
    if (char.charCodeAt(0) > 255) return width + 42;
    return width + 25;
  }, 0);
}

function renderFallbackCover() {
  const { art } = PLAYER_STYLE;

  return `
        <rect x="${art.x}" y="${art.y}" width="${art.size}" height="${art.size}" fill="#7b5731"/>
        <circle cx="142" cy="83" r="42" fill="#f6dfb6" opacity=".88"/>
        <path d="M78 216c12-58 36-92 73-101 30-7 49 26 42 101Z" fill="#ead0a7" opacity=".9"/>
        <path d="M42 56h164v168H42z" fill="#20170f" opacity=".18"/>`;
}

function truncate(value, max) {
  return value.length > max ? `${value.slice(0, max - 1)}...` : value;
}

function xmlText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function xmlAttr(value) {
  return xmlText(value).replaceAll('"', "&quot;");
}
