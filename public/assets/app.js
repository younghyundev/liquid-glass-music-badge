const youtubeUrl = document.querySelector("#youtubeUrl");
const titleOverride = document.querySelector("#titleOverride");
const artistOverride = document.querySelector("#artistOverride");
const preview = document.querySelector("#preview");
const snippet = document.querySelector("#snippet");
const refresh = document.querySelector("#refresh");
const copy = document.querySelector("#copy");
const form = document.querySelector(".controls");

const origin = window.location.origin;
const embedWidth = 920;

function playerUrl() {
  const params = new URLSearchParams();
  params.set("url", youtubeUrl.value.trim());
  if (titleOverride.value.trim()) params.set("title", titleOverride.value.trim());
  if (artistOverride.value.trim()) params.set("artist", artistOverride.value.trim());
  return `${origin}/player.svg?${params.toString()}`;
}

function render() {
  const src = playerUrl();
  preview.src = src;
  const tag = `<img src="${src}" alt="Liquid glass music player" width="${embedWidth}" />`;
  snippet.textContent = tag;
}

refresh.addEventListener("click", render);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  render();
});
youtubeUrl.addEventListener("input", render);
titleOverride.addEventListener("input", render);
artistOverride.addEventListener("input", render);

copy.addEventListener("click", async () => {
  const value = snippet.textContent;
  try {
    await navigator.clipboard.writeText(value);
    copy.textContent = "Copied";
    setTimeout(() => {
      copy.textContent = "Copy img tag";
    }, 1200);
  } catch {
    snippet.focus();
  }
});

render();
