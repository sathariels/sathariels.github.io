# Content sources and editorial decisions

Verified 2026-09-09. The existing portfolio, original résumé, and public project source are the factual inputs. Making Software informs art direction only.

## Source inventory

- Existing portfolio: https://nithilan.dev/ and the original `index.html` at commit `4018f0b`.
- Local `resume.pdf`, read in full via PDFKit; retained without modification.
- GitHub profile: https://github.com/sathariels
- Design reference: https://www.makingsoftware.com/

### Meridian
- Source tree reviewed: `b961d8412d70115f472e96546458ce702e7799fe`.
- https://github.com/sathariels/Meridian
- Relevant source-file links are included directly in the case study.

### 2DGameEngine
- Source tree reviewed: `bda636c461da5820f1ba62b2c2624efb17b9077e`.
- https://github.com/sathariels/2DGameEngine
- Relevant source-file links are included directly in the case study.

### shadowIndex
- Source tree reviewed: `28ba0aaa8624d748458ead38c4f1510b12e1fde8`.
- https://github.com/sathariels/shadowIndex
- Relevant source-file links are included directly in the case study.

## Claim-to-source map

| Portfolio content | Evidence |
| --- | --- |
| Name, education, Game Design minor, graduation, certifications, skills | Original résumé and existing homepage |
| Neureal, Sentari AI, Carrier roles and dates | Original résumé and existing experience data |
| 5% gameplay latency reduction, 15% production defect reduction | Original résumé; no newly inferred metrics |
| Meridian throughput: 838K, 5.3M, 10.3M ops/sec | Current Meridian README baseline; Apple M3, 8 threads, 4M in-process operations |
| LRU reads mutate recency; striped mutexes; hash remixing | Meridian `src/cache/lru_cache.cpp` and `striped_cache.cpp` |
| kqueue/epoll, consistent hashing, WAL and replication | Meridian README and source tree |
| 120 Hz default, accumulator, interpolation, frame-boundary cleanup | 2DGameEngine `include/Engine.h` and `src/Engine.cpp` |
| Shared-cell candidate generation and pair deduplication | 2DGameEngine `src/Physics.cpp` |
| Component objects versus ECS storage experiment | 2DGameEngine `experiments/README.md` |
| has_device → device_activation | shadowIndex `data/events/core_events.txt` and `src/EventLibrary.cpp` |
| ASCII renderer and save/load boundaries | shadowIndex `src/Renderer.cpp` and `src/GameState.cpp` |
| Item-shop fuzzy search, Excalibur query example | Existing homepage project data and linked Medium writeup |
| Medium articles, Sketchfab link, public contact | Existing homepage and profile |

## Corrections and omitted claims

- The old engine description used “ECS” and “zero mid-frame heap allocs.” The current engine explicitly uses heap-allocated component objects. The rebuild says component-object model and explains the separate ECS storage experiment.
- The old Shadow Index copy claimed non-repeating story beats and a valid story graph. Source only checks prerequisite flags; it has no visited set or general DAG validator. Those guarantees are not claimed.
- Shadow Index stores the initial seed, not the full generator state. The case study distinguishes repeatable new runs from identical continuation after loading.
- The Shadow Index README calls the first stat Resonance; source calls it Resolve. The case study follows source. The device choice label says Curiosity, while its effect modifies Clarity; the excerpt calls out the discrepancy.
- The original résumé reports learned eviction, network throughput, and p99 latency for Meridian. The current README explicitly excludes learned eviction from the v1 baseline and does not retain those network results, so they are omitted from the new web copy. The résumé itself is intentionally unchanged.
- No current visit counts, writing readership, or unverifiable live metrics were added.
- No GitHub forks or unrelated profile repositories are represented as original selected work.

## Visual truthfulness

- The hero is a conceptual exploded diagram of the input/physics/render stages, not a screenshot of the engine.
- Four cache stripes are schematic; the measured graph separately states actual stripe counts and workload.
- The collision drawing is an illustrative scene, calculated with the source shared-cell rule: eight objects, 28 possible pairs, three candidate pairs. It is not a performance measurement.
- The narrative diagram uses real event names and flags. It shows eligibility, not guaranteed next-event sequencing.
- The ASCII menu is a labeled condensed reconstruction of the renderer, not fabricated captured terminal output.

## Architecture and design

Static homepage plus three case-study routes. The established GitHub Pages structure and original résumé remain usable. White/off-white, deep and bright blue, one-pixel rules, Inter and IBM Plex Mono, numbered figures, restrained one-time motion, and explicit source links. No raster assets are needed for these technical diagrams.
