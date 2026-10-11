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
const figures = [...document.querySelectorAll(".reveal-figure, .hero-grid, .benchmark, .baseline-result, .flower-accent")];
const loopingFigures = new Set();
const visibleFigures = new Set();
const motionButtons = [];
let motionPaused = false;
let finishIntro = () => {};
let settleScrollBuilds = () => {};
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
  if (motionPaused || reducedMotion.matches || document.hidden) {
    finishIntro();
    settleScrollBuilds();
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

// A short, optional opening scene. Content remains ordinary HTML; no scroll
// locking, simulated loading, or dependency on the animation finishing.
(() => {
  const hero = document.querySelector(".hero");
  const controls = document.querySelector(".intro-controls");
  if (!hero || !controls) return;
  const seenKey = "portfolio-intro-seen-v1";
  let seen = false;
  try { seen = sessionStorage.getItem(seenKey) === "true"; } catch {}
  if (seen || motionPaused || reducedMotion.matches || document.hidden || location.hash || window.scrollY > 64) return;
  try { sessionStorage.setItem(seenKey, "true"); } catch {}

  let timer;
  const skip = controls.querySelector("button");
  const onScroll = () => { if (window.scrollY > 64) finishIntro(); };
  const onKey = event => { if (event.key === "Escape" || event.key === "Tab") finishIntro(); };
  const onClick = event => { if (event.target.closest("a, button")) finishIntro(); };
  finishIntro = () => {
    clearTimeout(timer);
    hero.classList.remove("intro-playing");
    if (document.activeElement === skip) document.querySelector("#hero-title").focus({preventScroll: true});
    controls.hidden = true;
    window.removeEventListener("scroll", onScroll);
    document.removeEventListener("keydown", onKey);
    document.removeEventListener("click", onClick);
    finishIntro = () => {};
  };
  hero.classList.add("intro-playing");
  controls.hidden = false;
  window.addEventListener("scroll", onScroll, {passive: true});
  document.addEventListener("keydown", onKey);
  document.addEventListener("click", onClick);
  timer = setTimeout(() => finishIntro(), 5500);
})();

// Assemble each homepage block once as it enters view. Nothing is hidden while
// waiting for the observer: no-JS, find-in-page, and fast scrolling stay usable.
(() => {
  if (!document.querySelector(".hero") || !("IntersectionObserver" in window)) return;
  const blocks = [...document.querySelectorAll(
    ".section-heading, .oss-summary, .oss-card, .project-copy, .project-visual, .small-work, .subsection-head, .experience-row, .about-copy, .skills, .writing-list, .contact"
  )];
  const pending = new Set(blocks);
  const active = new Map();
  const cursorTemplate = document.querySelector(".cursor-type");
  let anchorTarget = null;
  try { anchorTarget = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch {}
  const finish = block => {
    clearTimeout(active.get(block));
    active.delete(block);
    pending.delete(block);
    block.classList.remove("scroll-building");
    block.querySelector(".scroll-build-cursor")?.remove();
    observer.unobserve(block);
  };
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const block = entry.target;
      if (!entry.isIntersecting) {
        if (active.has(block)) finish(block);
        continue;
      }
      if (!pending.has(block) || active.has(block)) continue;
      if (motionPaused || reducedMotion.matches || document.hidden || block.contains(document.activeElement)) {
        finish(block);
        continue;
      }
      if (cursorTemplate) {
        const cursor = cursorTemplate.cloneNode(true);
        cursor.className = "build-cursor scroll-build-cursor";
        cursor.querySelector("span").textContent = block.matches(".project-visual") ? "Draw" : "Type";
        block.append(cursor);
      }
      block.classList.add("scroll-building");
      active.set(block, setTimeout(() => finish(block), 1400));
    }
  }, {threshold: 0, rootMargin: "0px 0px -48px 0px"});

  for (const block of blocks) {
    block.classList.add("scroll-build");
    if (block.matches(".project-visual")) block.classList.add("scroll-build-visual");
    [...block.children].forEach((part, index) => {
      part.classList.add("scroll-build-part");
      part.style.setProperty("--build-step", Math.min(index, 5));
    });
    // Preserve restored positions and direct section links on initial load.
    if (block.getBoundingClientRect().top < window.innerHeight ||
        (anchorTarget && (anchorTarget.contains(block) || block.contains(anchorTarget)))) finish(block);
    else observer.observe(block);
  }
  settleScrollBuilds = () => {
    for (const block of [...active.keys()]) finish(block);
  };
  document.addEventListener("focusin", event => {
    const block = event.target.closest(".scroll-build");
    if (block) finish(block);
  });
  document.addEventListener("pointerdown", event => {
    const block = event.target.closest(".scroll-build");
    if (block) finish(block);
  });
})();
