"use strict";
// Progressive enhancement: every project and diagram is readable without JS.
for (const figure of document.querySelectorAll("[data-physics]")) {
  const controls = figure.querySelector(".diagram-controls");
  const svg = figure.querySelector(".physics-svg");
  const result = figure.querySelector(".diagram-result");
  if (!controls || !svg || !result) continue;
  controls.hidden = false;
  controls.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-mode]");
    if (!button) return;
    const mode = button.dataset.mode;
    svg.dataset.mode = mode;
    for (const option of controls.querySelectorAll("button")) {
      option.setAttribute("aria-pressed", String(option === button));
    }
    result.textContent = mode === "near"
      ? `${result.dataset.near} candidate pairs instead of ${result.dataset.all}.`
      : `${result.dataset.all} pairs checked, including distant objects.`;
  });
}

// Inspect the illustrative CSR graph. This is an adjacency demonstration,
// not a browser port of the native random sampler or a model prediction.
for (const figure of document.querySelectorAll("[data-sage]")) {
  const controls = figure.querySelector(".diagram-controls");
  const edges = [...figure.querySelectorAll(".sage-edge")];
  const users = [...figure.querySelectorAll(".sage-user")];
  const movies = [...figure.querySelectorAll(".sage-movie")];
  const range = figure.querySelector("[data-sage-range]");
  const status = figure.querySelector("[data-sage-status]");
  if (!controls || !range || !status) continue;
  const adjacency = Array.from({ length: users.length + movies.length }, () => []);
  for (const edge of edges) {
    const user = Number(edge.dataset.user);
    const movie = Number(edge.dataset.movie);
    adjacency[user].push(movie);
    adjacency[movie].push(user);
  }
  const offsets = [0];
  const neighbors = [];
  for (const list of adjacency) {
    neighbors.push(...[...new Set(list)].sort((a, b) => a - b));
    offsets.push(neighbors.length);
  }
  controls.hidden = false;
  controls.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-user]");
    if (!button || !controls.contains(button)) return;
    const user = Number(button.dataset.user);
    const start = offsets[user], end = offsets[user + 1];
    const selected = neighbors.slice(start, end);
    for (const option of controls.querySelectorAll("button")) {
      option.setAttribute("aria-pressed", String(option === button));
    }
    for (const edge of edges) edge.dataset.active = String(Number(edge.dataset.user) === user);
    for (const node of users) node.dataset.active = String(Number(node.dataset.user) === user);
    for (const node of movies) node.dataset.active = String(selected.includes(Number(node.dataset.movie)));
    range.textContent = `neighbors[${start}:${end}] → [${selected.join(", ")}]`;
    status.textContent = `User ${user} has ${selected.length} training neighbors.`;
  });
}

// Every sequence finishes in under four seconds. Content is visible before
// enhancement, and motion never changes the meaning or data in a figure.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const figures = [...document.querySelectorAll(".reveal-figure, .hero-figure, .benchmark, .baseline-result")];
const replayButtons = [];
function playFigure(figure) {
  if (reducedMotion.matches) return;
  figure.classList.remove("is-entering", "motion-active");
  // Restart the finite CSS sequence only on entry or an explicit replay.
  void figure.offsetWidth;
  figure.classList.add("is-entering", "motion-active");
}
for (const figure of figures) {
  if (!figure.matches(".hero-figure, .sage-diagram, .narrative") && !figure.querySelector(".cache-flow")) continue;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "motion-replay";
  button.textContent = "Replay motion ↻";
  const label = [...figure.querySelectorAll(".figure-label > span")]
    .map((span) => span.textContent.trim().replace(/\s+/g, " ")).join(" / ") || "this figure";
  button.setAttribute("aria-label", `Replay motion: ${label}`);
  button.hidden = reducedMotion.matches;
  button.addEventListener("click", () => playFigure(figure));
  figure.append(button);
  replayButtons.push(button);
}
let observer;
function updateMotionPreference() {
  observer?.disconnect();
  for (const button of replayButtons) button.hidden = reducedMotion.matches;
  if (reducedMotion.matches) {
    for (const figure of figures) figure.classList.remove("is-entering", "motion-active");
    return;
  }
  if (!("IntersectionObserver" in window)) return;
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      playFigure(entry.target);
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.15 });
  for (const figure of figures) observer.observe(figure);
}
updateMotionPreference();
reducedMotion.addEventListener("change", updateMotionPreference);
