# XAVIER DE BELLE — Version History

The live site is always the files at the root of `Website Files`.
Every previous release is frozen, complete and runnable, under `versions/`.

---

## v11 — 2026-09-01

**Carousel Planner updated to v3 — it works on a phone now**
- **The controls became a bottom sheet.** Below 860px the side panel was simply
  hidden, and it took every control with it — cover slide, span a photo across
  slides, crop, layers, delete. It now lives in a sheet at the bottom: a 52px
  bar naming what's selected with Undo / Copy / Delete always in reach, and a
  tap raises the full panel to half height. Opening it with a photo selected
  lands on the fit and crop block rather than the position fields.
- **Touch gestures on the canvas.** One finger on a photo moves it, one finger
  anywhere else pans, two fingers pinch to zoom, and a tap on empty canvas
  deselects. A second finger arriving mid-drag cancels the nudge the first one
  started, instead of leaving the photo wherever it slipped to.
- The canvas reserves the height the open sheet covers, so the strip you are
  cropping stays visible above it rather than hiding underneath.
- Handles go from 11px to 20px on touch and the rotation handle moves further
  out. Two-row compact header, smaller slide previews, and the keyboard
  shortcuts panel is hidden since there is no keyboard.
- **Export can hand off to the share sheet.** On a phone a download lands in
  Files, which is the wrong place for something you are about to post. Where
  the browser can share files there is now a Share slides button that opens the
  OS share sheet. The slides are rendered when the dialog opens so the share
  call happens inside the tap that asked for it, which is what iOS requires.
  Where it isn't supported the button hides itself and the .zip works as before.

**Checked before publishing**
- Exercised at 375×812 with real touch events: pinch ran 8% → 15% → 23% across
  a spread, one-finger pan scrolled the canvas, tap selected and deselected,
  drag moved a photo, and the sheet opened scrolled to the crop controls with
  the strip still visible above it. Export dialog and swipe preview both fit
  inside the screen.
- Desktop re-checked afterwards and is unchanged — static sidebar, no sheet
  bar, 11px handles, `touch-action` untouched — and the exporter is still
  pixel-accurate: a known test square measured 538px against 540 predicted at
  200% crop zoom, in a 1080×1350 slide.
- Still no network calls of any kind. Layout in `localStorage`, photos in
  IndexedDB, same keys as before, so a carousel saved in a browser survives
  the update.

**Outstanding**
- The share button is unverified on a real iPhone. The test browser doesn't
  expose `navigator.share`, so only the fallback was actually exercised — it
  hides itself and leaves the .zip.
- One desktop-visible change came along with it: the canvas now centres
  vertically when the strip is smaller than the window, instead of sitting at
  the top. It is the same mechanism the phone layout uses to reserve space.

---

## v10 — 2026-09-01

**Feed Planner updated to v8 — it works on a phone now**
- **Drag to reorder on iPhone.** Touch has no HTML5 drag-and-drop, so the drag
  is built by hand: a press-and-hold of 250ms lifts a photo, a copy of it
  follows your finger, the frame numbers renumber live as it passes its
  neighbours, and releasing drops it. The hold is what tells the three gestures
  apart — a tap still opens the editor, a swipe still scrolls the page, and only
  a hold picks a photo up. Dragging near the top or bottom edge auto-scrolls.
- The editor is a full-screen sheet on a phone with a sticky header, instead of
  a centred dialog that had no room left once the keyboard came up. Crop stage
  sized to the viewport and re-measured on rotate.
- Pinch to zoom in the crop stage. It sets `touch-action: none`, so a pinch
  there used to be a dead gesture.
- Bio, caption and the follower counts bumped to 16px, which is what stops iOS
  zooming the whole page when a field takes focus. Full-width Export / Clear
  all, 44px minimum on every button, safe-area padding at the bottom.

**Checked before publishing**
- Exercised in a 375×812 viewport with real touch events, light and dark: the
  hold-drag reorders and persists, a tap opens the editor, a swipe never lifts
  a photo, and the release that ends a drag doesn't open the editor. Pinch ran
  1.00× → 2.50× without jerking the crop when a finger lifted.
- Desktop is untouched by all of this — mouse drag-to-reorder and
  drop-a-file-onto-a-tile-to-replace both still work.
- Same `feed-planner-state-v1` storage key, so any grid saved in a browser
  survives the update. Still no network calls of any kind.

**Outstanding**
- The tile delete (×) still has no confirmation and is permanently visible on
  touch. That is unchanged from before, but a mis-tap on a phone is easier than
  a mis-click on a desktop, and there is no undo.

---

## v9 — 2026-08-27

**New tool**
- **Idea Bank** added to Personal, after the Budget Tracker. Capture ideas
  without judging them, score each on impact × confidence × ease, see them
  plotted on an impact/ease matrix, then push them across a Next / In progress
  / Shipped board. Steps, owners, due dates, JSON export and import.
- Tool count is now 14, in five categories.

**Checked before publishing**
- The cleanest tool on the site: **no external URLs at all**, no network calls
  of any kind, no credentials, and it starts empty rather than seeded. Data
  lives in `localStorage` under `ideabank.v1` and in files you download.
- Exercised the real pipeline before shipping — captured, scored (auto-switches
  to Prioritise, plots on the matrix), committed to the board, and confirmed it
  persisted. No console errors.

**Copy**
- The Personal section blurb and the map's action label were both written when
  that category held a single tool. Both now read for more than one.

---

## v8 — 2026-08-26

**Volley & BBQ Zine updated to v3**
- Adds "no dish" tracking: BBQ attendees who haven't claimed a potluck slot
  are flagged in the admin list as well as the public chips, and the list is
  frozen into each week's history snapshot so past weeks keep the record.
  Week summaries now show a "N no dish" count.
- Shared helpers pulled out (`eatsBBQ`, `claimerSet`, `noDishNames`) so the
  public view, admin list and history all derive the same answer.
- Otherwise unchanged — 98.6% identical to the previous build.
- Card and map copy rewritten: it was billed as a standalone zine, but it's a
  working RSVP and potluck coordinator with an admin panel and weekly history.

**Unchanged, and still outstanding**
- Same Firebase project, still no authentication, `ADMIN_PASSWORD` still
  hardcoded as a literal in the client source. The v3 update does not touch
  any of that, so the analysis from earlier still stands in full.
- The new `noDish` field adds names to history. The append-only history rule
  drafted earlier still fits it — no rule changes needed.

---

## v7 — 2026-08-25

**Budget Tracker replaced with v3**
- Now actually saves. The previous version kept nothing — a refresh wiped the
  month. This one persists to `localStorage` under `debelle.budget-tracker.v2`.
  Nothing to migrate, since the old one stored nothing.
- Planned vs actual per row, with a percentage badge on each.
- Real month navigation: a new month seeds itself from the previous one and
  carries the remaining balance forward as its rollover.
- Row edits propagate to later months; earlier months stay as they were.
- Export and import the whole history as JSON.
- Card and map copy updated to describe what it now does.

**Checked before shipping**
- Only outbound request is Google Fonts. No endpoints, no credentials.
  Budget data never leaves the browser — `localStorage` plus a local file
  download.
- Verified live: persistence, month seeding (rollover carried forward
  correctly) and forward propagation all behave.

**Note**
- The seeded starter figures — paycheques, rent, savings — are visible to
  anyone opening the tool. Unchanged from the previous version, which shipped
  the same numbers, but worth a deliberate decision. Blanking them is a small
  edit to `defaultMonth()`.

---

## v6 — 2026-08-25

**New tool**
- **Carousel Planner** added to Portfolio Makers, directly after Feed Planner.
  Builds seamless Instagram carousels — photos span across slides, snap to the
  edges, export ready to post. 4:5, 1:1 and 1.91:1.
- Checked before publishing: fully self-contained, no external endpoints, no
  credentials, no personal data.

**Cleanup this made worth doing**
- Card numbering, the total count and the category chips are now derived from
  the cards present in *both* local and public modes — previously only the
  public path recalculated them, so local showed stale hard-coded numbers.
  Adding, removing or reordering a tool now needs no manual renumbering.
- Fixed a stale comment in `tools.html` still claiming three tools were
  withheld from the deploy; that stopped being true in v5.

---

## v5 — 2026-08-25

**All tools public**
- The four tools held back in v4 are now published: `package-builder`,
  `video-corrections`, `wedding-activities` and `volley-bbq-zine`.
  Deliberate call — the site is a complete hub again, 12 tools in five
  categories, and Events is back on the map.
- Verified first that none of them carry a real secret: no private keys, no
  service-account credentials, no API tokens. The Firebase `apiKey` in the
  zine is a public identifier; database *rules* are what protect that data.
- Copy on the 404 page and in the README no longer claims some tools are
  undeployed, because that stopped being true.
- The hiding mechanism stays in place, unused, so a tool can be pulled back
  off the public site in one line if that's ever wanted.

**Still outstanding (unchanged by this release)**
- The zine's Firebase Realtime Database answers unauthenticated reads and
  very likely writes. Publishing the page widens who can find it.
- `video-corrections` ships a live inbound CRM webhook URL, now public.

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
