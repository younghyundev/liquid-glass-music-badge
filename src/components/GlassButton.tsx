"use client";

import Link from "next/link";
import LiquidGlass from "liquid-glass-react";
import type { CSSProperties, ReactNode } from "react";

type GlassButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost";
  width?: number;
  height?: number;
  ariaLabel?: string;
  className?: string;
};

const DEFAULT_WIDTH = 220;
const DEFAULT_HEIGHT = 54;

export default function GlassButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ariaLabel,
  className = ""
}: GlassButtonProps) {
  const shellStyle = { width: `${width}px`, height: `${height}px` } as CSSProperties;
  const labelStyle = { width: `${width}px`, height: `${height}px` } as CSSProperties;
  const containerClass = `lp-glassBtn lp-glassBtn-${variant} ${className}`.trim();

  const glass = (
    <LiquidGlass
      cornerRadius={Math.min(height / 2, 999)}
      padding="0"
      displacementScale={variant === "primary" ? 64 : 48}
      blurAmount={0.1}
      saturation={130}
      aberrationIntensity={2}
      elasticity={0.3}
      mode="standard"
      onClick={noop}
      style={{ position: "absolute", top: "50%", left: "50%" }}
    >
      <span
        className={`lp-glassBtn-label lp-glassBtn-label-${variant}`}
        style={labelStyle}
      >
        {children}
      </span>
    </LiquidGlass>
  );

  if (href) {
    return (
      <Link href={href} className={containerClass} style={shellStyle} aria-label={ariaLabel}>
        {glass}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={containerClass}
      style={shellStyle}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {glass}
    </button>
  );
}

function noop() {}
