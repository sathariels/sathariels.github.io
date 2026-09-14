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
| Name, degree, graduation, certifications, skills | Original résumé and existing homepage |
| Applications of Artificial Intelligence in Engineering minor | Owner correction, September 10, 2026 |
| Neureal, Sentari AI, Carrier roles and dates | Original résumé and existing experience data, with owner title corrections below |
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

Static homepage plus four case-study routes. The established GitHub Pages structure and original résumé remain usable. White/off-white, deep and bright blue, one-pixel rules, Inter and IBM Plex Mono, numbered figures, visible motion loops with pause/resume controls and reduced-motion support, and explicit source links. The technical diagrams use code-native geometry; the separate decorative flower is a raster asset.


## SageRec addition · September 9, 2026

- Public source: https://github.com/sathariels/SageRec
- Source tree reviewed: `884159d373b986510b1d25b428b883c3c3d63e60`. Case-study source links are pinned to this snapshot.
- CSR construction and native sampling: `cpp/include/sagerec/bipartite_csr.hpp`, `cpp/src/bipartite_csr.cpp`.
- Python conversion, ownership, GIL release, and error behavior: `cpp/src/bindings.cpp`.
- Chronological per-user split and cold-start policy: `python/sagerec_prep.py`, ADR-003 in `docs/decisions.md`.
- Sampling policy: ADR-005; uniform without replacement, full stored neighborhood when k >= degree, local mt19937_64 state. Partial sampling copies O(degree) entries before O(k) shuffle work.
- MF implementation and ranking policy: `python/sagerec_baseline.py`, `python/sagerec_metrics.py`.
- Recorded Recall@10 0.03817603393425239 and NDCG@10 0.020303175177886473: `results/mf_movielens_100k.json`. One seed (7), one epoch, 16 factors, 2 negatives, 943 evaluated users, 1,682 movies. Result file records code commit `00940b6489d2d9fac1cee6950df580935d1e939f`. Display values are rounded, not new measurements.
- Implemented/planned boundary: current README and `docs/architecture.md`. GraphSAGE training, mini-batch integration, native/Python timing charts, and GNN/MF comparison are not implemented. No speedup, zero-copy, trained-GNN, or production-usage claims are made.
- The README's broad statement about held-out data never entering candidate filtering is narrower in the code: test ranking filters validation positives as well as training positives. The case study describes `sagerec_metrics.py` behavior. Training negative sampling filters training positives only.
- Interactive graph: original synthetic example, not MovieLens data or model output. Three users, four movies, seven undirected training edges, fourteen CSR entries. User adjacency is [3,4], [4,5,6], [3,6]. The browser computes offsets and neighbors from the drawn edges; controls inspect adjacency, not random sampling.
- Chronological figure: six illustrative interactions; first four train, fifth validation, sixth test.
- Typography: original 5×7 bitmap glyphs rendered as SVG paths; Making Software and the user-provided screenshot inform the visual style only.
- Motion is explanatory: engine stages enter in input/physics/render order; cache requests and memory cells pulse schematically; graph edges trace the selected adjacency; narrative flags highlight the eligible branch. These are illustrations, not execution traces or timing measurements.

## Owner correction · September 9, 2026

The owner corrected the current Neureal title to Software Engineering Intern. The homepage current-role summary, experience entry, and Person structured data use this title.

## Repeating motion · September 9, 2026

At the owner’s request, the pixel title and internal diagram sequences repeat on six-second cycles. Layout entrances still run once. Loops pause when offscreen or in background tabs; shared pause controls retain a per-tab preference across navigation. Reduced-motion users receive static diagrams. Illustrated data, graph selection, and reported metrics do not change between cycles.

## Owner corrections · September 10, 2026

The owner clarified the minor as Applications of Artificial Intelligence in Engineering and the Sentari AI role as Software Engineering Intern. The homepage education and experience sections use those exact names.


## Pixel flower · September 14, 2026

At the owner’s request, an original blue pixel-art flower sprig adds a decorative accent near Contact. The transparent PNG was generated specifically for this portfolio. It sits in the outer right margin at widths of 1,360px and above, and in the homepage footer on narrower screens. Its gentle sway uses the existing shared pause preference, offscreen/background pausing, and reduced-motion behavior. The image is decorative, has an empty alt attribute, and loads lazily; it represents no project output or biographical claim.
