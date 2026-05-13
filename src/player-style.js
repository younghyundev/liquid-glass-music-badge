export const PLAYER_DEFAULTS = {
  title: "Birds of a Feather",
  artist: "Billie Eilish",
  currentTime: "0:33",
  remainingTime: "-1:40",
  progress: 42
};

export const PLAYER_STYLE = {
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
      clipWidth: 622,
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
      weight: 760
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
    previous: { x: 270, y: 313, width: 76, height: 80, tone: "standard" },
    pause: { x: 422, y: 312, width: 78, height: 82, tone: "primary" },
    next: { x: 574, y: 313, width: 76, height: 80, tone: "standard" },
    repeat: { x: 804, y: 334, width: 46, height: 34, tone: "quiet" }
  }
};

export function boundedProgress(value) {
  return Math.min(100, Math.max(0, Number(value) || 0));
}
