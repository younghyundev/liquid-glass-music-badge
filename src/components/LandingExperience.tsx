"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import BackgroundFX from "./BackgroundFX";
import GlassButton from "./GlassButton";
import { SHOWCASE_TRACKS, buildPlayerSvgUrl, type ShowcaseTrack } from "../showcase-tracks";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function LandingExperience() {
  return (
    <main className="lp-landing">
      <BackgroundFX />
      <Hero />
      <FeatureBand />
      <Showcase />
      <HowItWorks />
      <CtaBanner />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="lp-hero lp-heroSolo" aria-labelledby="lp-hero-title">
      <div className="lp-heroInner">
        <p className="lp-eyebrow">
          <span className="lp-pulseDot" aria-hidden="true" />
          GitHub README music badge
        </p>
        <h1 id="lp-hero-title" className="lp-heroTitle">
          <span className="lp-titleLine lp-titleLine-1">Liquid glass</span>
          <span className="lp-titleLine lp-titleLine-2">music cards</span>
          <span className="lp-titleLine lp-titleLine-3">for your profile.</span>
        </h1>
        <p className="lp-heroText">
          Drop a YouTube link. Get a polished, animated SVG that works inside a plain README{" "}
          <code>img</code> tag. No JavaScript, no playback, no friction.
        </p>
        <div className="lp-heroActions">
          <GlassButton href="/try" variant="primary" width={220} height={56} ariaLabel="Open the generator">
            <span>Generate yours</span>
            <ArrowIcon />
          </GlassButton>
          <GlassButton href="#showcase" variant="ghost" width={210} height={56} ariaLabel="See live examples">
            See live examples
          </GlassButton>
        </div>

        <dl className="lp-stats" aria-label="Key facts">
          <div>
            <dt>Format</dt>
            <dd>SVG</dd>
          </div>
          <div>
            <dt>Render</dt>
            <dd>&lt; 1s</dd>
          </div>
          <div>
            <dt>Size</dt>
            <dd>920 × 424</dd>
          </div>
          <div>
            <dt>Runtime</dt>
            <dd>Edge-friendly</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function FeatureBand() {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="lp-featureBand lp-reveal" aria-label="Product highlights">
      <FeatureCard index="01" title="README safe">
        Returned as <code>image/svg+xml</code> and embedded with a plain image tag.
      </FeatureCard>
      <FeatureCard index="02" title="Auto metadata">
        Pulls title, artist, and cover art straight from the YouTube link you paste.
      </FeatureCard>
      <FeatureCard index="03" title="Polished by default">
        Liquid glass card, animated visualizer, and tasteful typography out of the box.
      </FeatureCard>
    </section>
  );
}

function FeatureCard({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <div className="lp-featureCard">
      <span className="lp-featureIndex">{index}</span>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

function Showcase() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  const activeTrack = SHOWCASE_TRACKS[activeIndex];
  const playerSrc = useMemo(() => buildPlayerSvgUrl(activeTrack), [activeTrack]);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const absoluteUrl = origin ? new URL(playerSrc, origin).toString() : playerSrc;
  const snippet = `<img src="${absoluteUrl}" alt="Liquid glass music badge" width="920" />`;

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  const accentVars = { "--lp-accent": activeTrack.accent } as CSSProperties;

  return (
    <section ref={ref} id="showcase" className="lp-showcase lp-reveal" aria-labelledby="lp-showcase-title">
      <header className="lp-showcaseHeader">
        <p className="lp-eyebrow">Live preview</p>
        <h2 id="lp-showcase-title">Tap a track. Watch the SVG rerender.</h2>
        <p className="lp-showcaseLede">
          Each chip swaps the actual <code>/player.svg</code> response. This is exactly what GitHub will fetch.
        </p>
      </header>

      <div className="lp-trackChips" role="tablist" aria-label="Sample tracks">
        {SHOWCASE_TRACKS.map((track, index) => (
          <ChipButton
            key={track.id}
            track={track}
            active={index === activeIndex}
            onSelect={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <div className="lp-showcaseStage" style={accentVars}>
        <div className="lp-showcasePreview">
          <span className="lp-glow" aria-hidden="true" />
          <img
            key={activeTrack.id}
            src={playerSrc}
            alt={`Liquid glass music badge preview for ${activeTrack.title} by ${activeTrack.artist}`}
            width={920}
            height={424}
          />
        </div>

        <aside className="lp-snippet" aria-label="Embed snippet">
          <header>
            <span className="lp-snippetTag">README markdown</span>
            <GlassButton
              variant="ghost"
              width={96}
              height={38}
              onClick={copySnippet}
              ariaLabel="Copy embed snippet"
            >
              {copied ? "Copied!" : "Copy"}
            </GlassButton>
          </header>
          <pre tabIndex={0}>
            <code>{snippet}</code>
          </pre>
          <p className="lp-snippetHint">
            Paste this into any <code>README.md</code>. GitHub renders the SVG inline.
          </p>
        </aside>
      </div>
    </section>
  );
}

function ChipButton({
  track,
  active,
  onSelect
}: {
  track: ShowcaseTrack;
  active: boolean;
  onSelect: () => void;
}) {
  const accentVars = { "--lp-accent": track.accent } as CSSProperties;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={`lp-chip${active ? " is-active" : ""}`}
      style={accentVars}
      onClick={onSelect}
    >
      <span className="lp-chipDot" aria-hidden="true" />
      <span className="lp-chipLabel">{track.label}</span>
      <span className="lp-chipMeta">
        {track.artist} · {track.title}
      </span>
    </button>
  );
}

function HowItWorks() {
  const ref = useScrollReveal<HTMLDivElement>();
  const steps = [
    {
      title: "Paste a YouTube link",
      body: "Any watch URL, Shorts URL, youtu.be, or raw 11-character ID works."
    },
    {
      title: "Customize if you want",
      body: "Override the title or artist. Otherwise we pull oEmbed data and the thumbnail for you."
    },
    {
      title: "Embed in your README",
      body: "Copy the <img> tag. GitHub fetches the SVG and your profile renders it instantly."
    }
  ];

  return (
    <section ref={ref} className="lp-steps lp-reveal" aria-labelledby="lp-steps-title">
      <header className="lp-stepsHeader">
        <p className="lp-eyebrow">How it works</p>
        <h2 id="lp-steps-title">Three steps to a polished profile badge.</h2>
      </header>
      <ol className="lp-stepsGrid">
        {steps.map((step, index) => (
          <li key={step.title} className="lp-step" style={{ "--lp-step-index": index } as CSSProperties}>
            <span className="lp-stepNumber">Step {String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CtaBanner() {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="lp-ctaBanner lp-reveal" aria-labelledby="lp-cta-title">
      <h2 id="lp-cta-title">Ready to ship your badge?</h2>
      <p>Open the generator, paste a link, copy the snippet. Under a minute.</p>
      <GlassButton href="/try" variant="primary" width={240} height={58} ariaLabel="Open the generator">
        <span>Open the generator</span>
        <ArrowIcon />
      </GlassButton>
    </section>
  );
}

function Footer() {
  return (
    <footer className="lp-footer">
      <p>
        Built with Next.js · <a href="/player.svg">View default SVG</a> ·{" "}
        <a href="/api/metadata?url=https%3A%2F%2Fyoutu.be%2F1JS5Td0MeNE">Inspect metadata</a>
      </p>
    </footer>
  );
}

function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      node.classList.add("is-visible");
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 8h9M8 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
