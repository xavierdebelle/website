# XAVIER DE BELLE — Version History

The live site is always the files at the root of `Website Files`.
Every previous release is frozen, complete and runnable, under `versions/`.

---

## v20 — 2026-09-03

**Carousel Planner rolled back to v8**
v9 was worse on the iPhone than v8, by Xavier's report, so the site serves
v8 again while the cause is looked at. v9's two changes — divider lines
without a blend mode, and `dvh` for the app and sheet heights — are
withdrawn together; which of them did the damage is not yet known. The v9
file stays in the tool folder for the next attempt.

**Checked before publishing**
- The served file matches `carousel_planner_v8.html` byte for byte, the copy
  that was live as v18.

---

## v19 — 2026-09-03

**Carousel Planner v9 — the sixth slide**
Two reports from the iPhone on v8: everything from the sixth slide on
vanished, and the slide rail at the bottom could not be scrolled into view.
Both are WebKit limits, not logic, and the "five works, six doesn't" line
gave the first one away.

- **Slides beyond the fifth were unpaintable.** The divider lines between
  slides used `mix-blend-mode`, which makes WebKit render the whole strip as
  a single GPU texture at its unscaled size: 1080px a slide, times three on a
  phone. Five slides is 16,200 pixels wide; six is 19,440; the GPU's ceiling
  is 16,384. Past that the texture is refused and nothing draws. The lines
  now take their contrast from a dark edge instead of a blend, the strip is
  ordinary content again, and any count paints.
- **The rail sat behind the browser bar.** The app was `height: 100%`, which
  Chrome on iOS resolves to the taller viewport behind its toolbar, so the
  bottom of the page — the rail — was off-screen with the page unable to
  scroll. The app and the bottom sheet now use `dvh`, the visible height.

**Checked before publishing**
- Scan: storage key unchanged; the same `dataTransfer` false positive as
  before.
- Under phone emulation with thirteen slides: all fourteen dividers present
  with no blend mode, the app and rail bottom aligned to the visible screen,
  the end of the strip reachable, no console errors.

**Outstanding**
- The texture ceiling cannot be reproduced here; the arithmetic matches the
  report exactly, and the device confirms it or it doesn't.

---

## v18 — 2026-09-03

**Carousel Planner v8 — the phone, second pass**
v7 held up on the iPhone: no more crashes. Four things it left awkward, all
reported from the device.

- **The last slide is reachable.** After adding a slide the strip could not be
  scrolled far enough to see it. Chromium at phone size reached the end fine,
  so this is WebKit's doing; rather than chase it, the canvas now has room
  after the last slide so it can be centred like any other, and the rail keeps
  the current slide's thumbnail in view.
- **− and + beside the slide count**, on desktop too. The number field needed
  a return key to apply on a phone. They stop at 2 and 20, typing still works,
  and adding a slide scrolls to it.
- **The 1-slide / 2½-slide toggle is gone.** The 2½-slide view is the phone
  view.
- **Export on a phone.** The popup was taller than the visible screen (`vh`
  counts the space behind the browser bar), so Cancel was out of reach. It is
  now sized to the visible area. Where the share sheet is available the ZIP
  and per-slide download buttons step aside and the one button reads
  *Download N slides* — the share sheet's Save Images is the download on a
  phone. Without share support the ZIP button stays. Desktop unchanged.

**Checked before publishing**
- Scan: the same single false positive as v17 (`dataTransfer` matching the
  "e-transfer" pattern). Storage keys unchanged.
- Under phone emulation: stepper at both limits, typed count applied, rail
  marker and nudge, export popup with Cancel visible, no console errors.
  Desktop: stepper, zoom buttons, Fit, ZIP and per-row downloads all present.

**Outstanding**
- The end-of-strip fix is a workaround for a WebKit behaviour not reproduced
  here; the device confirms it or it doesn't.
- The share sheet path is still unverified on a real iPhone, though v7's
  version of it reportedly worked.

---

## v17 — 2026-09-03

**Carousel Planner v7 — fixed views on a phone**
v6 stopped the reload loop at start-up and the phone still died, now while
pinching, panning, or resizing a photo. That is the editor, not the import: a
strip up to twenty slides wide, scaled with a transform, with every photo on
its own GPU layer. Each pinch step and each resize step re-rasterised all of
them at 3x, and the slide rail was rebuilt as fresh canvases six times a
second underneath. The Feed Planner shows the same photos as a plain grid of
thumbnails, which is why it never had the problem.

- **No pinch or wheel zoom on a phone.** Two fixed views instead: an overview
  of two and a half slides on load, and a *Show 1 slide* button for close
  work. Switching keeps the slide you were on. Desktop keeps its zoom.
- **Panning is the browser's own scroll.** A finger on empty canvas or a
  locked photo scrolls the strip; a finger on a photo moves it. Tapping a slide
  in the rail scrolls to it, and the rail now outlines the slide under the
  middle of the screen.
- **Photos are no longer separate GPU layers**, and the rail waits until the
  finger lifts before redrawing. Those two were the per-frame churn.
- **Import saves after every photo.** A tab killed mid-batch keeps what was
  already done; v6 threw the whole batch away and then deleted the stored
  copies on the next load, which read as "keeps failing".
- **The fallback decode is cheap.** When the bitmap decoder refuses a file, v6
  decoded it at full size — 200MB for a 48MP phone photo. It now goes through
  an image element drawn small, which iOS subsamples. The normal path also asks
  for exact dimensions, so a rotated iPhone photo stores at a full 1800x2400
  rather than 1786x2382.
- iOS guards: `-webkit-user-select`, `-webkit-touch-callout`,
  `overscroll-behavior` (no pull-to-refresh in Chrome on iOS), and a second
  finger can no longer start a second drag.

**Checked before publishing**
- Scan: one flag, a false positive — its "e-transfer" pattern matches the word
  `dataTransfer` in the drag-and-drop code. Storage keys unchanged, so saved
  carousels carry over.
- Under phone emulation: boot at 13% showing 2½ slides, the view toggle, tap
  to select, drag, corner resize, the rail not rebuilding mid-drag, a second
  finger ignored, restore from storage, the fallback decode path producing
  1800x2400, and a reload mid-import keeping the finished photos. No console
  errors. Desktop layout keeps Fit, the zoom buttons and wheel zoom.

**Outstanding**
- Still not verified on the iPhone itself: this Mac has no Xcode for the
  simulator and Safari's remote automation is off. The device remains the
  real test, and resizing a photo in the 1-slide view is the case to try.
- The rail's smooth scroll could not be exercised in a hidden tab.
- The share button is still unverified on a real iPhone.

---

## v16 — 2026-09-01

**Feed Planner updated to v12 — IndexedDB, and sharper exports**

*Storage*
- Photos move out of `localStorage` and into IndexedDB. They were being kept as
  base64 text in a store meant for settings: ~33% larger than the file itself,
  and capped around 5MB. Measured on a normal portrait that was **~24 images
  total** — one twenty-slide carousel was very nearly the whole budget. The new
  quota on this machine reports **3,189MB** against roughly 5.
- Each photo is now three records: the full one, only ever read to build an
  export, plus a 720px copy for the editor and a 320px one for tiles and chips.
  They are separate records on purpose, so fetching a 5KB thumbnail does not
  drag the 110KB original out of the database with it.
- Deleting a photo, removing a slide, or discarding an edit collects the images
  nothing points at any more. Clear all leaves zero records behind, verified.
- Saving is no longer "rewrite everything": the plan is a small piece of JSON
  naming which image goes where, and images are written once when added.

*Sharper exports*
- The import ceiling goes from 1080px to 2400px on the long side, at quality
  0.92. This is what actually decides sharpness — PNG only removed the loss on
  the way out, and the loss was happening on the way in.
- Every shape now feeds the export more real pixels than it needs, instead of
  being stretched to fill it:

  | Source | Before | After |
  |---|---|---|
  | iPhone 4:3 | 648x810 — 36% of the export | 1440x1800 — 178% |
  | Portrait 4:5 | 864x1080 — 64% | 1920x2400 — 316% |
  | Portrait 2:3 | 720x900 — 44% | 1600x2000 — 219% |
  | Landscape 3:2 | 576x720 — 28% | 1280x1600 — 140% |

- 4.9x more pixel data in every case, and a 1080x1350 export is now a genuine
  downsample rather than an upscale. Worth being straight about the size of it:
  measured on a structured test pattern the contrast improvement is about 8%,
  because even the old 1.25x upscale on a 4:5 crop was fairly gentle. The
  clear-cut part is that nothing is invented any more, which is what shows on
  texture — hair, fabric, foliage.
- **Photos already in the grid keep the resolution they were imported at.** Only
  new imports benefit; re-add anything you want at the new quality.

*The import crash the Carousel Planner hit in v15, pre-empted here*
- That tool's start-up rebuilt thumbnails by decoding every stored photo at full
  size, ran out of memory, reloaded, and did it again. This tool cannot loop that
  way, because its thumbnails are stored rather than rebuilt — but its **import**
  had the same underlying fault: a 12MP photo was decoded to a ~47MB bitmap
  before being scaled down.
- The decoder is now asked for the size wanted up front, so that bitmap never
  exists. A 4032x3024 import writes 2400x1800, 720x540 and 320x240 without
  materialising the original.
- Peak live bitmap, twelve posts with one twenty-slide carousel: **50.4
  megapixels (~202MB) in v10, 6.4 in v11, now 3.5 (~14MB)**, and the grid on its
  own is 1.0. Closing the editor releases the chips and stage image rather than
  leaving twenty decoded.

**Checked before publishing**
- Scan clean: no external hosts, no endpoints, no secrets, no personal data.
- Migration from the old `localStorage` plan verified end to end, twice: profile,
  captions, carousels and crops all carried over, it runs once rather than on
  every load, and **the old copy is deliberately left in place, untouched**, as
  the fallback. Its notice is no longer styled as an error.
- ZIP validated by recomputing every CRC with an independent implementation
  (itself checked against the standard vector); exports are 1080x1350 PNG in
  posting order; share hands over real PNG `File` objects and survives a
  dismissed sheet. Reorder-to-database, orphan collection, discard-on-close and
  the grid sheet all verified.
- Hit-testing for drag could not be exercised — `elementFromPoint` returns null
  in a hidden preview pane — so the drag engine was diffed against v11, where it
  was verified with the pane visible, and confirmed byte-identical; the new part,
  writing a reorder to the database, was tested directly.

**Still outstanding**
- Safari can clear script-writable storage for sites left unvisited, and that
  applies to IndexedDB as much as it did to localStorage. This bought room, not
  durability — the ZIP export is still the only real backup.
- No crash guard on start-up. The Carousel Planner needed one because its boot
  decoded photos; this one's does not, so it was left out rather than added
  speculatively.

---

## v15 — 2026-09-01

**Carousel Planner v6 — the reload loop**
A screenshot of the failure changed the diagnosis. It wasn't a slow leak: the
tab was being killed and reloaded over and over until Chrome gave up on it.

- **Start-up was re-running whatever had just killed the tab.** Restoring a
  carousel decoded every stored photo at full size to rebuild its thumbnails.
  If that ran the tab out of memory the page reloaded and did exactly the same
  thing again, so it could never get back in — and because nothing was saved
  before the crash, it never got further the second time either.
- **The photos are now stored as binary rather than base64 text.** They were
  always in IndexedDB, but as text, which is a third larger and has to be held
  in memory as a string. 2.9MB instead of 4.7MB for six photos, and the bytes
  can live outside the JS heap.
- **A photo is never decoded at full size any more.** Importing used to decode
  the original before shrinking it — for a 12MP phone photo that is a 47MB
  bitmap per photo, invisible to every measurement taken so far, and it
  happened once per photo added, which is why trouble arrived with the second
  and third. The decoder is now asked for the size wanted up front, using a
  32px probe to read the aspect ratio after EXIF rotation, so the full frame
  never exists. Import also got about fifteen times faster as a side effect —
  0.9s for six photos, against roughly 2.3s each.
- **A crash now has a way out.** A flag is set while starting up and cleared
  once the page has survived a few seconds. A run that finds it still set knows
  the last attempt died, skips loading the photos, and says so, with a Try
  again and a Clear photos button. The saved layout is left untouched, so
  nothing is lost either way.

**Checked before publishing**
- Exports still identical: the known test square measures 538px at 200% crop
  zoom, the same figure v11, v12 and v13 produced.
- A carousel saved by v13 opens in v14, its base64 photos converted to binary
  on load with no decode, layout intact.
- The crash guard was exercised by simulating a killed load: banner shown,
  photos held back, saved layout preserved, Try again recovering fully.
- Phone path: 4 photos across 6 slides, 512px copies in the editor, no broken
  images, no console errors, pinch and pan working.
- Also fixed a stray request for a file called "undefined" caused by an image
  source being set before its URL existed.

**Outstanding**
- Still diagnosed on a desktop browser at phone size. The device remains the
  real test.
- The failure was in Chrome on iOS with 83 tabs open, which shares one memory
  budget across the app — worth closing tabs regardless of what this tool does.
- The share button is still unverified on a real iPhone.

---

## v14 — 2026-09-01

**Feed Planner updated to v11 — carousels, per-post export, phone memory**

*Carousels*
- A tile is now a post that can hold up to 20 slides rather than a single
  photo. The editor gained a slide strip: `+` adds images, each slide keeps its
  own crop and zoom, and slides reorder by hold-and-drag (mouse too, not just
  touch). Slide 1 is what shows in the grid, and carousel tiles carry a
  stacked-squares badge with the slide count.
- **Preview carousel** opens a swipeable 4:5 preview with dots and the caption,
  built on scroll-snap so the swipe is native on iOS.
- The editor now works on a copy: Save commits, closing asks before discarding.
  That is a change — Replace photo used to apply instantly — and it is what
  makes adding five slides and changing your mind safe.

*Export*
- New **Posts, in order** group. The grid reads newest-first, so posting runs
  the other way: files are numbered in the order they get posted, and named
  `post-01_frame-04.png` so both orders stay legible. Carousels expand to
  `_slide-1`, `_slide-2`. A `captions.txt` carries every caption in the same
  order.
- **Save to Photos** uses the share sheet, so on an iPhone the images go
  straight into the camera roll instead of seven downloads landing in Files.
  It only appears where the browser can actually share files. The sheet opens
  on a second, deliberate tap because iOS spends the first one on the render.
- Images export as lossless PNG at 1080x1350. Note the ceiling: photos are
  stored at 1080px on the long side, so a 4:5 crop is still upscaled 1.25x
  (1.67x for a 4:3 phone photo). PNG removes the export-side loss, not the
  import-side one. Deliberately left as is — raising the import cap roughly
  doubles per-photo storage.
- PDF removed from the grid sheet, along with the hand-rolled PDF writer it
  needed. Grid sheet is PNG and JPEG.

*The same phone memory bug v12 and v13 fixed next door*
- Found before publishing, not after: this tool had the same shape of problem
  the Carousel Planner had just been through. Grid tiles and 54px slide chips
  were holding the stored 864x1080 images, and the carousel preview decoded
  every slide at once.
- Twelve posts with one twenty-slide carousel: **50.4 megapixels (~202MB) of
  live bitmap with the preview open, now 6.4 (~25MB)**. Display copies at 480px
  for tiles and 160px for chips, the preview windowed to the current slide and
  its neighbours, every throwaway canvas zeroed, and the contact sheet decodes
  one photo at a time instead of holding all of them.
- Exports were checked against this, since display copies must never reach
  output: a striped test image exports with all 108 stripes intact and zero
  midtone pixels, so the full stored original is still the source.

**Checked before publishing**
- Scan clean: no external hosts, no endpoints, no secrets, no personal data.
- Same `feed-planner-state-v1` key, and grids saved by earlier versions migrate
  into the new shape on load. A bug in that migration used to be swallowed by a
  `catch` and shown as an empty grid — a wiped plan looking like a fresh start.
  The catch now only covers JSON parsing.
- Verified in a 375x812 viewport, light and dark: slides add, remove and
  reorder; carousel preview; discard-on-close; ZIP validated by recomputing
  every CRC with an independent implementation; share sends real PNG `File`
  objects in posting order and handles a dismissed sheet without an error; no
  regressions in touch drag, desktop drag, or the grid sheet.

**Housekeeping**
- The footer version marker still read v9 — it was never bumped for v10, v11,
  v12 or v13. Now v14 on all four pages.

---

## v13 — 2026-09-01

**Carousel Planner v5 — the rest of the memory problem**
v12 cut the worst of it and the phone still misbehaved once more than a
couple of photos were loaded. v12 fixed the previews; what was left was the
editor itself, and it cost per photo, which is why it only showed up with
several.

- **A phone no longer loads a big copy of anything.** The editor canvas was
  still handing each photo over at 1600px — about 7.7MB of bitmap each, so
  six photos meant roughly 46MB before anything else. On a phone the strip is
  shown between 8% and 40%, where a whole slide is 90 to 400 pixels wide, so
  the 512px copy the previews already load is finer than the screen can
  resolve. Touch devices now use that copy in the editor too, and skip making
  the desktop-sized one at all.
- **Canvas backing stores are released explicitly.** iOS keeps the memory
  behind a canvas alive well after the canvas itself is garbage. Every
  throwaway canvas — three per photo on import, one per slide on export, and
  every preview replaced during a drag — is now zeroed the moment it's done.
- **Exports no longer finish holding every original decoded.** They're
  released as it goes, so a ten-slide export holds two at a time rather than
  ten.
- Measured the same way each time, six 4032×3024 photos across ten slides:
  1,055 megapixels in v11, 12.7 in v12, and **2.4 on a phone in v13** — about
  10MB of images, down from roughly 4GB.

**Checked before publishing**
- Exports are untouched by any of it. Recorded what actually gets drawn into
  the export canvases on a phone: only the 2400px originals, never the 512px
  copy the editor shows. The known test square still measures 538px at 200%
  crop zoom — the same figure v11 and v12 produced.
- Phone re-checked end to end: pinch 10% → 35%, pan, tap to select, the sheet,
  and a ten-slide export. Desktop still uses the full-size copy in the editor
  and is otherwise unchanged. No console errors.
- Ruled out EXIF orientation as a cause with a rotated test file rather than
  assuming: `naturalWidth` and canvas drawing agree, so iPhone photos are not
  being turned sideways.

**Outstanding**
- This was diagnosed by measuring in a desktop browser at phone size, not on
  the actual iPhone that reported it. The numbers are much healthier, but the
  device itself is still the real test.
- Import writes two sizes per photo on a phone and three on a desktop, one
  photo at a time, so a large batch takes a while. That work could move off
  the main thread if it becomes the annoying part.
- The share button is still unverified on a real iPhone.

---

## v12 — 2026-09-01

**Carousel Planner v4 — fixes the phone reloading the page**
v3 made the tool usable on a phone and then ran it out of memory. Reported as
"the page keeps on crashing", which is what iOS does when a tab exceeds its
budget: it discards the tab and reloads.

- **The cause was resolution, not the layout.** Every preview was a real copy
  of every photo at full size. With six 12MP photos across ten slides the page
  held 124 `<img>` elements referencing 1,055 megapixels — about 4GB of bitmap
  if the browser decoded it all — to paint previews needing 3. The slide rail
  built one full copy of every photo per slide (310× more pixels than it
  drew), and the layers list fed 12MP originals into 30px squares (9,711×).
- **Each photo is now kept at three sizes**: 2400px for export, 1600px for the
  editor canvas, 400px for thumbnails. Nothing is handed a source larger than
  it draws.
- **The slide rail and the swipe preview are drawn, not cloned.** Both now
  paint into a small canvas through the same routine the exporter uses, so ten
  slides cost ten canvases instead of a hundred copies of the strip. That also
  removes the rebuild of a hundred image elements that ran during every drag.
- **Originals are decoded only while an export is being written**, one slide's
  worth at a time, and released afterwards.
- Same measurement after the change: 12 `<img>` elements, 12.2 megapixels,
  about 47MB — down from roughly 4GB, an 86× reduction.

**Checked before publishing**
- Same stress test both sides: six 4032×3024 photos across ten slides.
- Exported files are unchanged. Captured the actual canvases handed to the
  encoder: the known test square measures 538px at 200% crop zoom, the same
  figure v3 produced, and empty slides come out as background.
- A carousel saved by v3 opens in v4 — the older photos have their smaller
  copies rebuilt on load, written back, and the layout restores intact.
- Phone behaviour re-checked: pinch 10% → 35%, one-finger pan, tap to select,
  sheet opening with the crop zoom in reach, and the swipe preview now using
  canvases and no image clones. Desktop unchanged, no console errors.

**Outstanding**
- Importing now writes three sizes per photo, so adding a batch takes longer
  than it did. It runs one photo at a time on purpose, to avoid holding
  several full decodes at once.
- The share button is still unverified on a real iPhone.

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
