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
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-entering");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.15 });
  for (const figure of document.querySelectorAll(".reveal-figure")) observer.observe(figure);
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) observer.disconnect();
  }, { once: true });
}
