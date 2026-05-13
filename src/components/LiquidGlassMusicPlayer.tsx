"use client";

import type { CSSProperties } from "react";
import LiquidGlass from "liquid-glass-react";
import { boundedProgress, PLAYER_DEFAULTS, PLAYER_STYLE } from "../player-style";

type LiquidGlassMusicPlayerProps = {
  title?: string;
  artist?: string;
  currentTime?: string;
  remainingTime?: string;
  progress?: number;
  albumArtUrl?: string;
};

const iconProps = {
  viewBox: "0 0 64 64",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  focusable: false
};

function ShuffleIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 20h9.5c5.8 0 9.2 4.4 12.8 12 3.7 7.8 7.8 12 14.2 12H56" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 44h9.8c4.4 0 7.6-2.6 10.4-7.3" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M43 10l13 10-13 10" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M43 34l13 10-13 10" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PreviousIcon() {
  return (
    <svg {...iconProps}>
      <path d="M16 15v34" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M51 15L24 32l27 17V15Z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg {...iconProps}>
      <rect x="19" y="15" width="8" height="34" rx="3.5" fill="currentColor" />
      <rect x="37" y="15" width="8" height="34" rx="3.5" fill="currentColor" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg {...iconProps}>
      <path d="M48 15v34" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M13 15l27 17-27 17V15Z" fill="currentColor" />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg {...iconProps}>
      <path d="M18 18h24c7 0 12 5 12 12v2" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M43 8l11 10-11 10" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 46H22c-7 0-12-5-12-12v-2" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M21 56L10 46l11-10" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const controls = [
  { key: "shuffle", label: "Shuffle", Icon: ShuffleIcon },
  { key: "previous", label: "Previous track", Icon: PreviousIcon },
  { key: "pause", label: "Pause", Icon: PauseIcon },
  { key: "next", label: "Next track", Icon: NextIcon },
  { key: "repeat", label: "Repeat", Icon: RepeatIcon }
] as const;

const playerStyleVars = {
  "--lgmp-card-width": `${PLAYER_STYLE.card.width}px`,
  "--lgmp-card-radius": `${PLAYER_STYLE.card.radius}px`,
  "--lgmp-card-bg": PLAYER_STYLE.card.background,
  "--lgmp-card-tint": PLAYER_STYLE.card.tint,
  "--lgmp-card-bg-fallback": PLAYER_STYLE.card.fallbackBackground,
  "--lgmp-border": PLAYER_STYLE.card.border,
  "--lgmp-border-bright": PLAYER_STYLE.card.borderBright,
  "--lgmp-text": PLAYER_STYLE.colors.text,
  "--lgmp-muted": PLAYER_STYLE.colors.muted,
  "--lgmp-progress-track": PLAYER_STYLE.colors.progressTrack,
  "--lgmp-progress-fill-start": PLAYER_STYLE.colors.progressFillStart,
  "--lgmp-progress-fill-end": PLAYER_STYLE.colors.progressFillEnd,
  "--lgmp-shadow": PLAYER_STYLE.card.shadow,
  "--lgmp-art-size": `${PLAYER_STYLE.art.size}px`,
  "--lgmp-art-radius": `${PLAYER_STYLE.art.radius}px`,
  "--lgmp-title-size": `${PLAYER_STYLE.typography.title.size}px`,
  "--lgmp-title-weight": PLAYER_STYLE.typography.title.weight,
  "--lgmp-title-line-height": PLAYER_STYLE.typography.title.lineHeight,
  "--lgmp-artist-size": `${PLAYER_STYLE.typography.artist.size}px`,
  "--lgmp-artist-weight": PLAYER_STYLE.typography.artist.weight,
  "--lgmp-artist-line-height": PLAYER_STYLE.typography.artist.lineHeight,
  "--lgmp-artist-margin-top": `${PLAYER_STYLE.typography.artist.marginTop}px`,
  "--lgmp-time-size": `${PLAYER_STYLE.typography.time.size}px`,
  "--lgmp-time-weight": PLAYER_STYLE.typography.time.weight,
  "--lgmp-progress-height": `${PLAYER_STYLE.progress.height}px`
} as CSSProperties;

export default function LiquidGlassMusicPlayer({
  title = PLAYER_DEFAULTS.title,
  artist = PLAYER_DEFAULTS.artist,
  currentTime = PLAYER_DEFAULTS.currentTime,
  remainingTime = PLAYER_DEFAULTS.remainingTime,
  progress = PLAYER_DEFAULTS.progress,
  albumArtUrl = ""
}: LiquidGlassMusicPlayerProps) {
  const progressValue = boundedProgress(progress);

  return (
    <section className="lgmp-stage" aria-label="Liquid glass music player preview" style={playerStyleVars}>
      <LiquidGlass
        className="lgmp-liquidGlass"
        displacementScale={58}
        blurAmount={0.48}
        saturation={165}
        aberrationIntensity={2.4}
        elasticity={0}
        cornerRadius={38}
        padding="0"
        mode="prominent"
        globalMousePos={{ x: 0, y: 0 }}
        mouseOffset={{ x: 0, y: 0 }}
        style={{ position: "absolute", top: "50%", left: "50%" }}
      >
        <article className="lgmp-card">
          <div className="lgmp-cardSurface" />

          <div className="lgmp-content">
            <div className="lgmp-artWrap" aria-hidden="true">
              {albumArtUrl ? (
                <img className="lgmp-art" src={albumArtUrl} alt="" />
              ) : (
                <div className="lgmp-art lgmp-artFallback">
                  <span />
                </div>
              )}
            </div>

            <div className="lgmp-trackMeta">
              <h2>{title}</h2>
              <p>{artist}</p>
            </div>

            <div className="lgmp-progressRow" aria-label={`${currentTime} elapsed, ${remainingTime} remaining`}>
              <span>{currentTime}</span>
              <div className="lgmp-progressTrack" aria-hidden="true">
                <div className="lgmp-progressFill" style={{ width: `${progressValue}%` }} />
              </div>
              <span>{remainingTime}</span>
            </div>

            <div className="lgmp-controls" aria-label="Music controls">
              {controls.map(({ key, label, Icon }) => {
                const control = PLAYER_STYLE.controls[key];
                const controlVars = {
                  "--lgmp-control-svg-width": `${control.width}px`,
                  "--lgmp-control-svg-height": `${control.height}px`
                } as CSSProperties;

                return (
                  <button className={`lgmp-control lgmp-control-${control.tone}`} type="button" aria-label={label} key={label} style={controlVars}>
                    <Icon />
                  </button>
                );
              })}
            </div>
          </div>
        </article>
      </LiquidGlass>
    </section>
  );
}
