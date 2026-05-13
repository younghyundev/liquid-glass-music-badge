import test from "node:test";
import assert from "node:assert/strict";
import { renderPlayerSvg } from "../src/svg";

test("renders animated visualizer in README SVG output", () => {
  const svg = renderPlayerSvg({
    title: "Birds of a Feather",
    artist: "Billie Eilish",
    videoId: "dQw4w9WgXcQ"
  });

  assert.match(svg, /<animate attributeName="height"/);
  assert.match(svg, /<animate attributeName="y"/);
  assert.equal(svg.match(/<animate attributeName="height"/g)?.length, 5);
});

test("renders liquid glass filter primitives in README SVG output", () => {
  const svg = renderPlayerSvg({
    title: "Birds of a Feather",
    artist: "Billie Eilish",
    videoId: "dQw4w9WgXcQ"
  });

  assert.match(svg, /id="liquidGlassDisplacement"/);
  assert.match(svg, /<feTurbulence/);
  assert.match(svg, /<feDisplacementMap/);
  assert.match(svg, /id="liquidGlassSpecular"/);
  assert.match(svg, /<feSpecularLighting/);
  assert.match(svg, /id="liquidGlassChromatic"/);
  assert.match(svg, /filter="url\(#liquidGlassDisplacement\)"/);
});
