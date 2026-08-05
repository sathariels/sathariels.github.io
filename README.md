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
| ≥ 821px | Sidebar is a full-height sticky column beside the board; card fan |
| ≤ 820px | Sidebar goes full width above the board; chip nav replaces the fan |
| ≤ 560px | Padding tightens throughout |

The fanned cards need horizontal room to read as a hand — narrower than that
they'd overlap into mush, so the nav becomes a wrapped row of poker chips. Same
six targets, same selected-state treatment.

### Keyboard and motion

Left and right arrows move through the sections and follow focus onto whichever
picker is currently visible. Under `prefers-reduced-motion` all transitions and
animations are disabled, and the pointer-tracked tilt on project cards is
skipped entirely rather than just shortened.

### Sound

The SFX and the looping backing track are both synthesized at runtime with Web
Audio — oscillators, filtered noise, and a step sequencer — so there are no
audio files in the repo and the page stays a single document.

Browsers won't start an `AudioContext` before a user gesture, so nothing is
constructed until the first click or keypress. The toggle in the section plate
persists to `localStorage` under `nk-sound`, and a visitor who has muted never
instantiates any audio at all.

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
| `SOUND_ON` | `true` | Master switch for the whole audio layer |
| `VOLUME` | `0.15` | Master gain |
| `AMBIENCE` | `true` | The looping backing track; SFX stay on without it |

Adding a section means adding an entry to `CARDS` and a matching
`<section id="sec-{id}">` in the played panel. The card counter, the plate, and
the arrow-key wraparound all read from `CARDS`, so they pick it up on their own.

## Deployment

GitHub Pages builds from `main`. Push and it deploys; there is no action or
workflow in front of it. `CNAME` points the site at `nithilan.dev`.

## License

[MIT](LICENSE). The code is free to reuse — the résumé, writing, and personal
details in it are mine.
