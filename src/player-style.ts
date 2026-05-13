export type ControlName = "shuffle" | "previous" | "pause" | "next" | "repeat";
export type ControlTone = "quiet" | "standard" | "primary";
export type GlassMode = "standard" | "polar" | "prominent" | "shader";

export type ControlBox = {
  x: number;
  y: number;
  width: number;
  height: number;
  tone: ControlTone;
};

export const PLAYER_DEFAULTS = {
  title: "Birds of a Feather",
  artist: "Billie Eilish",
  currentTime: "0:33",
  remainingTime: "-1:40",
  progress: 42
};

export const PLAYER_STYLE = {
  glass: {
    displacementScale: 100,
    saturation: 140,
    aberrationIntensity: 2.4,
    mode: "standard" as const
  },
  svgGlass: {
    displacementScale: 4,
    turbulenceBaseFrequency: "0.002 0.005",
    turbulenceOctaves: 1,
    turbulenceSeed: 12
  },
  card: {
    width: 920,
    height: 424,
    radius: 38,
    innerRadius: 32,
    background: "rgba(255, 255, 255, 0.075)",
    tint: "rgba(8, 7, 12, 0.11)",
    fallbackBackground: "rgba(31, 29, 37, 0.54)",
    border: "rgba(255, 255, 255, 0.34)",
    borderBright: "rgba(255, 255, 255, 0.5)",
    shadow: "0 34px 88px rgba(0, 0, 0, 0.46), 0 1px 0 rgba(255, 255, 255, 0.18) inset"
  },
  colors: {
    text: "#ffffff",
    muted: "rgba(255, 255, 255, 0.64)",
    progressTrack: "rgba(255, 255, 255, 0.22)",
    progressFillStart: "#f7f4fb",
    progressFillEnd: "#ddd7e6"
  },
  art: {
    x: 38,
    y: 56,
    size: 168,
    radius: 20
  },
  typography: {
    fontStack: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    title: {
      x: 236,
      y: 119,
      clipX: 236,
      clipY: 66,
      clipWidth: 544,
      clipHeight: 64,
      size: 44,
      weight: 730,
      lineHeight: 1.06
    },
    artist: {
      x: 236,
      y: 178,
      size: 38,
      weight: 500,
      lineHeight: 1.05,
      marginTop: 14
    },
    time: {
      size: 30,
      weight: 540
    }
  },
  progress: {
    x: 140,
    y: 268,
    width: 626,
    height: 18,
    radius: 9,
    fillWidth: 263,
    currentTimeX: 50,
    timeY: 285,
    remainingTimeX: 796
  },
  controls: {
    shuffle: { x: 72, y: 334, width: 44, height: 34, tone: "quiet" },
    previous: { x: 279, y: 323, width: 58, height: 61, tone: "standard" },
    pause: { x: 434, y: 323, width: 53, height: 61, tone: "primary" },
    next: { x: 583, y: 323, width: 58, height: 61, tone: "standard" },
    repeat: { x: 804, y: 334, width: 46, height: 34, tone: "quiet" }
  } satisfies Record<ControlName, ControlBox>,
  visualizer: {
    x: 802,
    y: 84,
    width: 56,
    height: 38,
    barWidth: 6,
    gap: 6,
    radius: 3,
    heights: [12, 26, 18, 34, 16],
    durations: [0.62, 0.48, 0.56, 0.72, 0.52],
    delays: [0, 0.1, 0.04, 0.16, 0.08]
  }
};

export function boundedProgress(value: unknown): number {
  return Math.min(100, Math.max(0, Number(value) || 0));
}
