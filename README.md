# nithilan.dev

An editorial portfolio for Nithilan Kumaran, centered on game engines, concurrent systems, recommendation infrastructure, model-upgrade evaluation, and procedural narrative. The homepage supports a quick scan; five project case studies explain the implementation and its tradeoffs.

The site is plain HTML, CSS, and a small progressively enhanced JavaScript file. It has no runtime dependencies, framework, or package installation step. All content and technical figures are available without JavaScript. Three small blue pixel lilies accent Selected Work, About, and Contact. They sit in the margins on wide screens; on narrower screens, the first two use section spacing and the last sits in the footer. Inter and IBM Plex Mono load with `font-display: swap` from Google Fonts, with system fallbacks.

## Run locally

From this repository:

```sh
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000). Use HTTP rather than opening HTML files directly because navigation and assets use root-relative paths.

## Edit

- `index.html`: homepage, experience, skills, selected writing, and contact.
- `projects/jevcheck/index.html`: typed behavioral contracts, baseline comparison, identity checks, and CI reporting.
- `projects/meridian/index.html`: cache concurrency, routing, benchmark context, and replication.
- `projects/sagerec/index.html`: train-only CSR construction, seeded sampling, Python bindings, and the recorded MF baseline.
- `projects/2d-game-engine/index.html`: engine loop, collision broadphase, object lifetime, and layout tradeoffs.
- `projects/shadow-index/index.html`: actual event dependencies, candidate selection, ASCII renderer, and save/load boundaries.
- `assets/styles.css`: shared design tokens, layout, diagrams, responsive rules, print styles, and reduced motion.
- `assets/site.js`: keyboard-accessible collision and CSR interactions, visible figure loops, background pausing, and shared pause/resume controls.
- `resume.pdf`: original résumé, preserved without modification.
- `docs/content-sources.md`: evidence inventory and claims deliberately omitted or corrected.

The diagrams are inline SVG or semantic HTML. The collision example contains eight illustrative colliders: 28 possible pairs, of which three share a grid cell. Its counts describe that example, not a project benchmark. The cache graph uses the repository's stated baseline, with the workload and hardware adjacent to the numbers.

## Validate and package

```sh
python3 scripts/build.py
node --check assets/site.js
```

The build validates page structure, metadata, unique IDs, accessible SVG names, and all internal links/assets. It stages only public files in `dist/`. Node is optional for serving; it is used here only to check JavaScript syntax.

## Deployment

GitHub Pages can continue serving the repository root on `main`. `CNAME` still points to `nithilan.dev`; no bundler or workflow migration is required. The redesign does not push to GitHub automatically.

A private Sites deployment uses the same static public files in `dist/`, configured in `.openai/hosting.json`. Canonical URLs remain on the established `nithilan.dev` domain.

## Accessibility and motion

Semantic landmarks and headings, a skip link, visible focus outlines, native links and buttons, status announcements for the collision and graph interactions, and `prefers-reduced-motion` support. JS-only controls stay hidden if scripts are unavailable. Illustrations and the pixel heading loop in six-second cycles with a settled interval. The Contact/footer lily sways gently on a seven-second cycle and shares the same pause and visibility controls; the other two lilies stay still. Animations pause offscreen and in background tabs. Pause/resume controls stop all motion and remember the choice for the current browser tab across page navigation; controls are hidden when reduced motion is requested. The blue pixel heading is an original inline SVG with an accessible text equivalent. Technical content stays visible; there are no hover-only facts or autoplay sounds.

## License

[MIT](LICENSE). Personal details, résumé, and writing remain Nithilan's.
