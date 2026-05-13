"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import GlassButton from "./GlassButton";

const embedWidth = 920;

export default function BadgeTester() {
  const [youtubeUrl, setYoutubeUrl] = useState("https://youtu.be/dQw4w9WgXcQ");
  const [titleOverride, setTitleOverride] = useState("");
  const [artistOverride, setArtistOverride] = useState("");
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  const playerUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("url", youtubeUrl.trim());
    if (titleOverride.trim()) params.set("title", titleOverride.trim());
    if (artistOverride.trim()) params.set("artist", artistOverride.trim());
    return `/player.svg?${params.toString()}`;
  }, [artistOverride, titleOverride, youtubeUrl]);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const absoluteUrl = origin ? new URL(playerUrl, origin).toString() : playerUrl;
  const snippet = `<img src="${absoluteUrl}" alt="Liquid glass music badge" width="${embedWidth}" />`;

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="shell" aria-labelledby="tester-title">
      <section className="workspace">
        <form className="controls" aria-label="README SVG player tester" onSubmit={handleSubmit}>
          <p className="eyebrow">README image tester</p>
          <h1 id="tester-title">Generate an embeddable player</h1>
          <p className="copy">
            Paste a YouTube link to preview the static SVG that can be used in a GitHub README with an{" "}
            <code>img</code> tag.
          </p>

          <label htmlFor="youtubeUrl">
            YouTube link
            <input
              id="youtubeUrl"
              name="youtubeUrl"
              type="url"
              inputMode="url"
              autoComplete="url"
              value={youtubeUrl}
              placeholder="https://youtu.be/..."
              onChange={(event) => setYoutubeUrl(event.target.value)}
            />
          </label>

          <div className="row">
            <label htmlFor="titleOverride">
              Title override optional
              <input
                id="titleOverride"
                name="titleOverride"
                type="text"
                value={titleOverride}
                placeholder="Birds of a Feather"
                onChange={(event) => setTitleOverride(event.target.value)}
              />
            </label>
            <label htmlFor="artistOverride">
              Artist override optional
              <input
                id="artistOverride"
                name="artistOverride"
                type="text"
                value={artistOverride}
                placeholder="Billie Eilish"
                onChange={(event) => setArtistOverride(event.target.value)}
              />
            </label>
          </div>

          <div className="actions">
            <GlassButton type="submit" variant="primary" width={186} height={50} ariaLabel="Refresh preview">
              Refresh preview
            </GlassButton>
            <GlassButton
              variant="ghost"
              width={170}
              height={50}
              onClick={copySnippet}
              ariaLabel="Copy img tag"
            >
              {copied ? "Copied" : "Copy img tag"}
            </GlassButton>
          </div>

          <pre tabIndex={0} aria-live="polite">
            {snippet}
          </pre>
        </form>

        <section className="previewPanel" aria-label="Generated SVG preview">
          <img src={playerUrl} alt="Generated README liquid glass music player SVG preview" />
        </section>
      </section>
    </div>
  );
}
