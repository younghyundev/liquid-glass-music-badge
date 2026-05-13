import Link from "next/link";
import BadgeTester from "../../src/components/BadgeTester";
import BackgroundFX from "../../src/components/BackgroundFX";
import GlassButton from "../../src/components/GlassButton";

export const metadata = {
  title: "Generate · Liquid Glass Music Badge",
  description: "Paste a YouTube link and generate your README-embeddable music badge."
};

export default function TryPage() {
  return (
    <main className="lp-tryPage">
      <BackgroundFX />

      <header className="lp-tryHeader">
        <div className="lp-backLinkRow">
          <GlassButton href="/" variant="ghost" width={200} height={44} ariaLabel="Back to overview">
            <span aria-hidden="true">←</span>
            <span>Back to overview</span>
          </GlassButton>
        </div>
        <p className="lp-eyebrow">README image tester</p>
        <h1>Generate your music badge.</h1>
        <p className="lp-tryLede">
          Paste any YouTube link below. We pull the title, artist, and thumbnail automatically, then return a
          ready-to-paste <code>&lt;img&gt;</code> tag.
        </p>
      </header>

      <section className="lp-tryBody" aria-label="Badge generator">
        <BadgeTester />
      </section>

      <footer className="lp-footer">
        <p>
          <Link href="/">← Home</Link> · <a href="/player.svg">View default SVG</a> ·{" "}
          <a href="/api/metadata?url=https%3A%2F%2Fyoutu.be%2F1JS5Td0MeNE">Inspect metadata</a>
        </p>
      </footer>
    </main>
  );
}
