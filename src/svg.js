import { thumbnailUrl } from "./youtube.js";

export function renderPlayerSvg(metadata, options = {}) {
  const videoId = metadata.videoId;
  const cover = metadata.thumbnail || thumbnailUrl(videoId) || "";
  const title = truncate(metadata.title || "Birds of a Feather", 32);
  const artist = truncate(metadata.artist || "Billie Eilish", 28);
  const controls = {
    shuffle: "/assets/controls/shuffle.png",
    previous: "/assets/controls/previous.png",
    pause: "/assets/controls/pause.png",
    next: "/assets/controls/next.png",
    repeat: "/assets/controls/repeat.png",
    ...(options.controls || {})
  };

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="920" height="424" viewBox="0 0 920 424" role="img" aria-label="${xmlAttr(title)} by ${xmlAttr(artist)}">
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
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.96"/>
      <stop offset="100%" stop-color="#d8d3dc" stop-opacity="0.94"/>
    </linearGradient>
    <filter id="softShadow" x="-16%" y="-24%" width="132%" height="152%">
      <feDropShadow dx="0" dy="30" stdDeviation="34" flood-color="#000000" flood-opacity="0.45"/>
      <feDropShadow dx="0" dy="2" stdDeviation="1" flood-color="#ffffff" flood-opacity="0.16"/>
    </filter>
    <filter id="surfaceBlur">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
    <clipPath id="cardClip">
      <rect x="0" y="0" width="920" height="424" rx="38"/>
    </clipPath>
    <clipPath id="coverClip">
      <rect x="38" y="56" width="168" height="168" rx="20"/>
    </clipPath>
    <style>
      .title { font: 730 44px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #ffffff; letter-spacing: 0; }
      .artist { font: 500 38px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: rgba(255,255,255,.64); letter-spacing: 0; }
      .time { font: 760 30px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; fill: #ffffff; letter-spacing: 0; }
    </style>
  </defs>

  <g filter="url(#softShadow)">
    <g clip-path="url(#cardClip)">
      <rect width="920" height="424" rx="38" fill="url(#cardGlass)"/>
      <rect x="-20" y="-22" width="960" height="470" fill="#ffffff" opacity=".075"/>
      <path d="M-120 316C96 142 214 65 454 103c153 24 271 5 578-165v532H-120Z" fill="#ffffff" opacity=".06" filter="url(#surfaceBlur)"/>
      <path d="M-20 58h960v84H-20z" fill="url(#specular)" opacity=".74" transform="rotate(-22 460 100)"/>
      <path d="M28 25H760c64 0 111 38 126 91" fill="none" stroke="#ffffff" stroke-opacity=".26" stroke-width="2"/>
      <rect x="1" y="1" width="918" height="422" rx="37" fill="none" stroke="url(#edgeLight)" stroke-width="2"/>
      <rect x="8" y="8" width="904" height="408" rx="32" fill="none" stroke="#ffffff" stroke-opacity=".11"/>

      <g clip-path="url(#coverClip)">
        ${cover ? `<image href="${xmlAttr(cover)}" x="38" y="56" width="168" height="168" preserveAspectRatio="xMidYMid slice"/>` : renderFallbackCover()}
        <rect x="38" y="56" width="168" height="168" fill="#ffffff" opacity=".05"/>
      </g>

      <text x="236" y="119" class="title">${xmlText(title)}</text>
      <text x="236" y="178" class="artist">${xmlText(artist)}</text>

      <text x="50" y="285" class="time">0:33</text>
      <rect x="140" y="268" width="626" height="18" rx="9" fill="#ffffff" opacity=".22"/>
      <rect x="140" y="268" width="263" height="18" rx="9" fill="url(#progressFill)"/>
      <text x="796" y="285" class="time">-1:40</text>

      <g opacity=".98">
        <image href="${xmlAttr(controls.shuffle)}" x="72" y="334" width="44" height="34" preserveAspectRatio="xMidYMid meet"/>
        <image href="${xmlAttr(controls.previous)}" x="270" y="313" width="76" height="80" preserveAspectRatio="xMidYMid meet"/>
        <image href="${xmlAttr(controls.pause)}" x="422" y="312" width="78" height="82" preserveAspectRatio="xMidYMid meet"/>
        <image href="${xmlAttr(controls.next)}" x="574" y="313" width="76" height="80" preserveAspectRatio="xMidYMid meet"/>
        <image href="${xmlAttr(controls.repeat)}" x="804" y="334" width="46" height="34" preserveAspectRatio="xMidYMid meet"/>
      </g>
    </g>
  </g>
</svg>`;
}

function renderFallbackCover() {
  return `
        <rect x="38" y="56" width="168" height="168" fill="#7b5731"/>
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
