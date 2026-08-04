# nithilan.dev

My personal site — a portfolio laid out as a card game. Each section of the site
is a card in a hand; playing a card deals its section onto the board.

**Live:** [nithilan.dev](https://nithilan.dev) (also served at
[sathariels.github.io](https://sathariels.github.io))

## Stack

None, deliberately. The whole site is one static `index.html`: markup, styles,
and a small vanilla-JS script, with fonts from Google Fonts. There is no build
step, no bundler, no dependencies, and nothing to install — which is the right
amount of machinery for a page that ships as a single file.

```
index.html   the entire site
resume.pdf   linked from the RESUME button in the sidebar
CNAME        custom domain for GitHub Pages
```

## Running it locally

Open `index.html` in a browser. That's it.

If you want it over HTTP instead of `file://` (closer to production):

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Layout

Two columns. The left **run panel** is static: name, availability, resume, and
every outbound link. It never changes, so contact details are always one glance
away no matter which section is open.

The right **board** is the part that swaps. A section plate names the current
card, the panel below shows that section, and the hand at the bottom picks
between six: about, projects, experience, skills, writing, contact.

Sections are all present in the DOM and toggled with `hidden`, so there is no
render cost to switching and no flash of unstyled content.

### Responsive behavior

| Width | Layout |
| --- | --- |
| ≥ 821px | Sidebar is a full-height sticky column beside the board |
| ≤ 820px | Sidebar goes full width and sits above the board |
| ≤ 560px | The fanned card hand is replaced by a wrapped row of poker chips |

The fanned cards need horizontal room to read as a hand — below 560px they'd
overlap into mush, so the nav becomes chips instead. Same six targets, same
selected-state treatment, laid out to wrap.

### Keyboard and motion

Left and right arrows move through the sections and follow focus onto whichever
picker is currently visible. Under `prefers-reduced-motion` all transitions and
animations are disabled, and the pointer-tracked tilt on project cards is
skipped entirely rather than just shortened.

## Editing content

Everything is data at the top of the `<script>` block in `index.html` — no
markup surgery required:

| Constant | Drives |
| --- | --- |
| `CARDS` | The six sections: rank, glyph, colors, title, kicker |
| `PROJECTS` | Project cards, including the hover debug readout |
| `ABOUT_STATS` | The stat grid on the about section |
| `EXPERIENCE` | Roles, dates, badges, blurbs |
| `SKILL_GROUPS` | Skill groupings and their tags |
| `WRITING` | Medium posts |
| `CONTACTS` | Contact cards |

A handful of feel knobs sit just above the data:

| Constant | Default | Effect |
| --- | --- | --- |
| `FAN_SPREAD` | `5` | Degrees of rotation between fanned cards |
| `CARD_TILT` | `true` | Pointer-tracked tilt on project cards |
| `GLOW_INTENSITY` | `0.6` | Strength of the selected-card and hover glows |
| `SCANLINES` | `true` | CRT scanline overlay |

Adding a section means adding an entry to `CARDS` and a matching
`<section id="sec-{id}">` in the played panel. The card counter, the plate, and
the arrow-key wraparound all read from `CARDS`, so they pick it up on their own.

## Design source

The visual design was built as a component in Claude Design and ported here by
hand. The port swaps that runtime's dynamic inline styles for CSS classes with
per-item custom properties, which is what lets the hover and focus rules read
each card's own color.

## Deployment

GitHub Pages builds from `main`. Push and it deploys; there is no action or
workflow in front of it. `CNAME` points the site at `nithilan.dev`.

## License

[MIT](LICENSE). The code is free to reuse — the résumé, writing, and personal
details in it are mine.
