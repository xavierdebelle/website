# XAVIER DE BELLE — Version History

The live site is always the files at the root of `Website Files`.
Every previous release is frozen, complete and runnable, under `versions/`.

---

## v4 — 2026-08-25

**Going live**
- Set up for deployment to GitHub Pages. Every push to `main` publishes.
- Added `404.html`, `.nojekyll`, `README.md` and a `.gitignore`.

**Privacy**
- Four tools are **not deployed**, because they expose client data:
  `package-builder` (real pricing, studio inquiry address),
  `video-corrections` (posts to a live CRM endpoint),
  `wedding-activities` (payment details, guest RSVP form), and
  `volley-bbq-zine` (ships a Firebase config for a database that answers
  unauthenticated reads — verified 200 on `GET /.json`).
  All four stay in this folder and still work locally.
- Both pages now detect whether they're served locally or publicly. Locally
  all 12 tools show; publicly the four are removed, the remaining cards
  renumber 01–08, categories left empty disappear from the map, the tools
  page and the text index, and every count is derived from what actually
  shipped rather than hard-coded.
- `versions/` is local-only — the snapshots contain copies of the private
  tools, and git carries the history from here on.

---

## v3 — 2026-08-25

**Tools**
- Every tool now opens in a **new tab**, so the hub stays put behind it.
- Card call-to-action arrow changed from `→` to `↗` to signal that, matching
  how outbound links are already marked across the site, with a screen-reader
  note carrying the same warning.

---

## v2 — 2026-08-25

**Map**
- All nodes now open by default. The full map is visible on arrival instead of
  revealing itself branch by branch; the timed auto-expand of TOOLS is gone.
- Centre node is the logo alone — the "XAVIER DE BELLE" lockup inside the box
  was removed. The name still reads in the corner wordmark.
- Added a fifth TOOLS branch, PERSONAL, to match the new tools category.
- Branch geometry rebalanced so sixteen simultaneous nodes still compose.

**Tools**
- "Client Ops" renamed **de Belle Photography Tools** (anchor `#client` → `#debelle`).
- **Budget Tracker** moved out to its own category, **Personal**.
- **Feed Planner** promoted to the first tool in Portfolio Makers.
- Sections renumbered 01–05, cards renumbered 01–12.

---

## v1 — 2026-08-10

Initial build.

- `index.html` — interactive force-directed mind map as the entry point.
- `tools.html` — all 12 browser tools, grouped in four categories, with live
  search, filter chips and category deep links.
- `work.html` — three-chapter portfolio: de Belle Photography, 333 Photo,
  real estate.
- Black / white / one-yellow brand system, shared in `assets/style.css`.
- Repaired Cloudflare email-obfuscation artifacts in two copied tools that had
  broken the Interac payment address on the wedding activities page.

---

## Conventions

- Cut a new version whenever a round of changes lands.
- Snapshot the outgoing version into `versions/vN/` **before** editing.
- Each snapshot is self-contained — open `versions/v1/index.html` and the whole
  old site works, tools included.
- Record what changed here, newest first.
