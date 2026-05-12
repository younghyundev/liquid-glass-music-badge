import test from "node:test";
import assert from "node:assert/strict";
import { parseYouTubeVideoId, normalizeYouTubeUrl, thumbnailUrl } from "../src/youtube.js";

test("parses common YouTube URL formats", () => {
  assert.equal(parseYouTubeVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ"), "dQw4w9WgXcQ");
  assert.equal(parseYouTubeVideoId("https://youtu.be/dQw4w9WgXcQ?si=abc"), "dQw4w9WgXcQ");
  assert.equal(parseYouTubeVideoId("https://www.youtube.com/embed/dQw4w9WgXcQ"), "dQw4w9WgXcQ");
  assert.equal(parseYouTubeVideoId("https://www.youtube.com/shorts/dQw4w9WgXcQ"), "dQw4w9WgXcQ");
  assert.equal(parseYouTubeVideoId("dQw4w9WgXcQ"), "dQw4w9WgXcQ");
});

test("normalizes and builds thumbnail URLs", () => {
  assert.equal(normalizeYouTubeUrl("https://youtu.be/dQw4w9WgXcQ"), "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  assert.equal(thumbnailUrl("dQw4w9WgXcQ"), "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg");
});

test("rejects invalid IDs", () => {
  assert.equal(parseYouTubeVideoId("https://example.com/watch?v=dQw4w9WgXcQ"), null);
  assert.equal(parseYouTubeVideoId("too-short"), null);
});

