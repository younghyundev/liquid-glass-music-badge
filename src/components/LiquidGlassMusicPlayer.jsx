import React from "react";

const iconProps = {
  viewBox: "0 0 64 64",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  focusable: "false"
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
  { label: "Shuffle", Icon: ShuffleIcon, tone: "quiet" },
  { label: "Previous track", Icon: PreviousIcon, tone: "standard" },
  { label: "Pause", Icon: PauseIcon, tone: "primary" },
  { label: "Next track", Icon: NextIcon, tone: "standard" },
  { label: "Repeat", Icon: RepeatIcon, tone: "quiet" }
];

export default function LiquidGlassMusicPlayer({
  title = "Birds of a Feather",
  artist = "Billie Eilish",
  currentTime = "0:33",
  remainingTime = "-1:40",
  progress = 42,
  albumArtUrl = ""
}) {
  const boundedProgress = Math.min(100, Math.max(0, Number(progress) || 0));

  return (
    <section className="lgmp-stage" aria-label="Liquid glass music player preview">
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
              <div className="lgmp-progressFill" style={{ width: `${boundedProgress}%` }} />
            </div>
            <span>{remainingTime}</span>
          </div>

          <div className="lgmp-controls" aria-label="Music controls">
            {controls.map(({ label, Icon, tone }) => (
              <button className={`lgmp-control lgmp-control-${tone}`} type="button" aria-label={label} key={label}>
                <Icon />
              </button>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
