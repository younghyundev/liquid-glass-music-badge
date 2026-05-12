import { thumbnailUrl } from "./youtube.js";

export function renderPlayerSvg(metadata) {
  const videoId = metadata.videoId;
  const cover = metadata.thumbnail || thumbnailUrl(videoId) || "";
  const title = truncate(metadata.title || "YouTube Track", 44);
  const artist = truncate(metadata.artist || "Unknown Artist", 38);
  const accent = chooseAccent(videoId || title);
  const darkAccent = shade(accent, -36);
  const lightAccent = shade(accent, 52);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="860" height="320" viewBox="0 0 860 320" role="img" aria-label="${xmlAttr(title)} by ${xmlAttr(artist)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#eef7ff"/>
      <stop offset="42%" stop-color="${xmlAttr(lightAccent)}"/>
      <stop offset="100%" stop-color="#f7f4ff"/>
    </linearGradient>
    <radialGradient id="liquidA" cx="20%" cy="15%" r="70%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.92"/>
      <stop offset="55%" stop-color="${xmlAttr(accent)}" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="${xmlAttr(darkAccent)}" stop-opacity="0.08"/>
    </radialGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.74"/>
      <stop offset="48%" stop-color="#ffffff" stop-opacity="0.36"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.19"/>
    </linearGradient>
    <linearGradient id="progress" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${xmlAttr(darkAccent)}"/>
      <stop offset="58%" stop-color="${xmlAttr(accent)}"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-30%" width="140%" height="160%">
      <feDropShadow dx="0" dy="22" stdDeviation="26" flood-color="#263248" flood-opacity="0.2"/>
    </filter>
    <filter id="blur">
      <feGaussianBlur stdDeviation="15"/>
    </filter>
    <clipPath id="coverClip">
      <rect x="82" y="64" width="192" height="192" rx="34"/>
    </clipPath>
    <clipPath id="progressClip">
      <rect x="340" y="223" width="328" height="10" rx="5"/>
    </clipPath>
    <style>
      .title { font: 700 34px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #172033; }
      .artist { font: 500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #546078; }
      .time { font: 600 15px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #69738b; }
      .glassStroke { stroke: rgba(255,255,255,.78); stroke-width: 1.4; }
      .bar { transform-origin: center bottom; animation: bounce 1.05s ease-in-out infinite; }
      .bar:nth-child(2) { animation-delay: .12s; }
      .bar:nth-child(3) { animation-delay: .22s; }
      .bar:nth-child(4) { animation-delay: .34s; }
      .pulse { animation: pulse 2.2s ease-in-out infinite; }
      .glint { animation: glide 2.8s ease-in-out infinite; }
      .needle { animation: nudge 1.8s ease-in-out infinite; transform-origin: 694px 138px; }
      @keyframes bounce { 0%,100% { transform: scaleY(.42); } 45% { transform: scaleY(1); } }
      @keyframes pulse { 0%,100% { opacity: .55; transform: scale(1); } 50% { opacity: .95; transform: scale(1.04); } }
      @keyframes glide { 0% { transform: translateX(-160px); opacity: 0; } 24%,62% { opacity: .72; } 100% { transform: translateX(410px); opacity: 0; } }
      @keyframes nudge { 0%,100% { transform: rotate(-3deg); } 50% { transform: rotate(4deg); } }
    </style>
  </defs>

  <rect width="860" height="320" fill="url(#bg)"/>
  <circle cx="158" cy="70" r="118" fill="url(#liquidA)" filter="url(#blur)" opacity=".78"/>
  <circle cx="706" cy="248" r="146" fill="${xmlAttr(accent)}" filter="url(#blur)" opacity=".24"/>
  <path d="M580 28C681-3 820 38 849 122c30 86-41 157-122 147-101-11-104-105-176-130-75-27-72-81 29-111Z" fill="#fff" opacity=".33" filter="url(#blur)"/>

  <rect x="48" y="38" width="764" height="244" rx="52" fill="url(#glass)" class="glassStroke" filter="url(#softShadow)"/>
  <rect x="58" y="48" width="744" height="224" rx="44" fill="#ffffff" opacity=".13"/>
  <path d="M92 58H700c42 0 72 26 81 61" fill="none" stroke="#ffffff" stroke-width="2" opacity=".72"/>

  <g clip-path="url(#coverClip)">
    ${cover ? `<image href="${xmlAttr(cover)}" x="82" y="64" width="192" height="192" preserveAspectRatio="xMidYMid slice"/>` : `<rect x="82" y="64" width="192" height="192" fill="${xmlAttr(darkAccent)}"/>`}
    <rect x="82" y="64" width="192" height="192" fill="url(#glass)" opacity=".16"/>
    <path class="glint" d="M34 53h74l-86 219h-74z" fill="#ffffff" opacity=".55"/>
  </g>
  <rect x="82" y="64" width="192" height="192" rx="34" fill="none" stroke="#ffffff" stroke-opacity=".78" stroke-width="1.5"/>

  <text x="340" y="112" class="title">${xmlText(title)}</text>
  <text x="340" y="148" class="artist">${xmlText(artist)}</text>

  <g transform="translate(340 171)">
    <rect x="0" y="0" width="44" height="44" rx="22" fill="#ffffff" opacity=".48" class="glassStroke"/>
    <path d="M18 14l15 8-15 8z" fill="${xmlAttr(darkAccent)}"/>
    <rect class="bar" x="58" y="15" width="6" height="24" rx="3" fill="${xmlAttr(darkAccent)}" opacity=".86"/>
    <rect class="bar" x="71" y="9" width="6" height="30" rx="3" fill="${xmlAttr(darkAccent)}" opacity=".72"/>
    <rect class="bar" x="84" y="18" width="6" height="21" rx="3" fill="${xmlAttr(darkAccent)}" opacity=".62"/>
    <rect class="bar" x="97" y="5" width="6" height="34" rx="3" fill="${xmlAttr(darkAccent)}" opacity=".8"/>
  </g>

  <rect x="340" y="223" width="328" height="10" rx="5" fill="#ffffff" opacity=".44"/>
  <g clip-path="url(#progressClip)">
    <rect class="glint" x="340" y="223" width="172" height="10" fill="url(#progress)"/>
    <rect x="340" y="223" width="178" height="10" rx="5" fill="url(#progress)" opacity=".76"/>
  </g>
  <text x="340" y="252" class="time">1:17</text>
  <text x="637" y="252" class="time">3:46</text>

  <g transform="translate(694 138)">
    <circle r="54" fill="#ffffff" opacity=".34" class="glassStroke pulse"/>
    <circle r="34" fill="${xmlAttr(accent)}" opacity=".22"/>
    <circle r="13" fill="#ffffff" opacity=".82"/>
    <path class="needle" d="M7-44c24 8 40 26 44 52" fill="none" stroke="${xmlAttr(darkAccent)}" stroke-width="6" stroke-linecap="round" opacity=".68"/>
  </g>
</svg>`;
}

export function chooseAccent(seed) {
  const palette = ["#5e8cff", "#22a699", "#ff7a59", "#b56cff", "#e0507d", "#2d9cdb"];
  let hash = 0;
  for (const char of seed || "liquid") hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return palette[hash % palette.length];
}

function shade(hex, amount) {
  const raw = hex.replace("#", "");
  const n = Number.parseInt(raw, 16);
  const r = clamp((n >> 16) + amount);
  const g = clamp(((n >> 8) & 255) + amount);
  const b = clamp((n & 255) + amount);
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function clamp(value) {
  return Math.max(0, Math.min(255, value));
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
