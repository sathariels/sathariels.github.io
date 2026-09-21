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

// Display the repository's two replay examples; this does not call a model.
const jevReplays = {
  unchanged: {
    rows: [["billing", "0.93", "Unchanged"], ["general", "0.88", "Unchanged"], ["billing", "0.92", "Unchanged"]],
    summary: "Compatible · exit 0. All three cases are unchanged within the contract’s rules.",
    note: "All expected fields pass against the recorded baseline. Intent fields shown. Repository replay fixtures, not live model results."
  },
  breaking: {
    rows: [["billing", "0.93", "Unchanged"], ["billing", "0.81", "Answer flip"], ["billing", "0.71", "Confidence drop"]],
    summary: "Breaking · exit 1. One unchanged case, one answer flip, one confidence regression.",
    note: "Ticket 003 keeps “billing,” but drops below its 0.85 confidence floor. Intent fields shown; its urgency confidence also regresses. Repository replay fixtures, not live model results."
  }
};
for (const figure of document.querySelectorAll("[data-jevcheck]")) {
  const controls = figure.querySelector(".diagram-controls");
  const rows = [...figure.querySelectorAll(".jev-table tbody tr")];
  const status = figure.querySelector("[data-jev-status]");
  const note = figure.querySelector("[data-jev-note]");
  if (!controls || rows.length !== 3 || !status || !note) continue;
  controls.hidden = false;
  controls.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-replay]");
    if (!button || !controls.contains(button)) return;
    const replay = jevReplays[button.dataset.replay];
    if (!replay) return;
    for (const option of controls.querySelectorAll("button")) {
      option.setAttribute("aria-pressed", String(option === button));
    }
    rows.forEach((row, i) => {
      const [answer, confidence, outcome] = replay.rows[i];
      row.querySelector("[data-candidate]").textContent = answer;
      row.querySelector("[data-confidence]").textContent = `${confidence} confidence`;
      row.querySelector("[data-outcome]").textContent = outcome;
    });
    status.textContent = replay.summary;
    note.textContent = replay.note;
  });
}

// Loop visible illustrations, with a shared pause preference across pages.
// Offscreen/background animations pause; reduced motion keeps a static view.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const fallingLilies = document.querySelector(".falling-lilies");
const figures = [...document.querySelectorAll(".reveal-figure, .hero-grid, .benchmark, .baseline-result, .flower-accent")];
const loopingFigures = new Set();
const visibleFigures = new Set();
const motionButtons = [];
let motionPaused = false;
try {
  motionPaused = sessionStorage.getItem("portfolio-motion-paused") === "true";
} catch { /* Motion controls also work when browser storage is unavailable. */ }
for (const figure of figures) {
  if (!figure.matches(".hero-grid, .sage-diagram, .jev-diagram, .narrative, .split-diagram, .benchmark, .flower-accent") && !figure.querySelector(".cache-flow")) continue;
  loopingFigures.add(figure);
  const button = document.createElement("button");
  button.type = "button";
  button.className = "motion-toggle";
  button.addEventListener("click", () => {
    motionPaused = !motionPaused;
    try {
      sessionStorage.setItem("portfolio-motion-paused", String(motionPaused));
    } catch { /* The in-memory preference remains usable. */ }
    updateMotionState();
  });
  // Keep the flower decorative; its shared motion control belongs in the footer.
  const controlsHost = figure.matches(".flower-accent")
    ? figure.parentElement
    : figure.querySelector(".hero-figure") || figure;
  controlsHost.append(button);
  motionButtons.push(button);
}
function updateMotionState() {
  document.documentElement.dataset.motionPaused = String(motionPaused);
  // The fixed edge decoration shares the existing controls, without adding a
  // button inside an aria-hidden element or observing individual moving images.
  if (fallingLilies) {
    fallingLilies.classList.toggle("motion-active", !reducedMotion.matches && !motionPaused);
    fallingLilies.classList.toggle("motion-paused", document.hidden);
  }
  for (const button of motionButtons) {
    button.hidden = reducedMotion.matches;
    button.textContent = motionPaused ? "Resume motion ▶" : "Pause motion Ⅱ";
    button.setAttribute("aria-label", motionPaused ? "Resume all animations" : "Pause all animations");
  }
  for (const figure of figures) {
    const visible = visibleFigures.has(figure);
    if (reducedMotion.matches) {
      figure.classList.remove("is-entering", "motion-active");
    } else if (visible && !motionPaused) {
      figure.classList.add("is-entering");
      if (loopingFigures.has(figure)) figure.classList.add("motion-active");
    }
    figure.classList.toggle("motion-paused", !visible || document.hidden);
  }
}
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.15) visibleFigures.add(entry.target);
      else visibleFigures.delete(entry.target);
    }
    updateMotionState();
  }, { threshold: 0.15 });
  for (const figure of figures) observer.observe(figure);
} else {
  for (const figure of figures) visibleFigures.add(figure);
}
updateMotionState();
reducedMotion.addEventListener("change", updateMotionState);
document.addEventListener("visibilitychange", updateMotionState);
