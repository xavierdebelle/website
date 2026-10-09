# XAVIER DE BELLE — Version History

The live site is always the files at the root of `Website Files`.
Every previous release is frozen, complete and runnable, under `versions/`.

---

## v86 — 2026-10-09

**What's new** · Installs · [tools.html#maria]
### Cycle Calendar<br>works offline
Install it from its Install app button and it gets its own icon on the
home screen, opens with no connection, and syncs the moment it's back.

**Cycle Calendar — installable, offline**
- Manifest `tools/cycle-calendar.webmanifest` (short name "Cycle",
  #0d1117), icons `tools/icons/cycle-calendar-{180,192,512,maskable-512}.png`
  (a small calendar grid in the tool's pink / teal / yellow, drawn with
  PIL), head block + `pwa.js data-app="cycle-calendar"`, Install app button.
- `pwa-sw.js`: APPS + LIBS entries (Firebase library and the DM Mono / Syne
  Google Fonts stylesheet); VERSION v77 → v86.
- Card mentions offline; README lists every installable tool.
- Copy: "then it uses her real average" → "the real average".

**Tested (Playwright Chromium, fresh profile)**
- Online twice: no installability or manifest errors, worker active and
  controlling, app cache holds the page, manifest, icons, pwa.js,
  account.js, logo; shared cache holds the three Firebase files and both
  fonts. Logged a period.
- Server stopped and every host unreachable: opens, shows Day 20 and the
  logged period, fonts loaded, Install app shown, no console errors.
- Playwright reinstalled in this session's scratchpad venv (the earlier
  one had been cleared from /tmp).

---

## v85 — 2026-10-08

**What's new** · Kitchen · [tools/kitchen.html]
### No more sideways<br>in the recipe window
The window for adding or editing a recipe no longer slides from side to
side on a phone.

**Kitchen — `tools/kitchen.html`, source `Tools files/Tools/kitchen_v7.html`**
- Cause: iOS Safari draws `<input type="date">` at its own native width,
  ignoring `width:100%`, so on a phone the Date field ran past the column;
  the popup (`.sheet-box`, `overflow-y:auto`, which makes x scrollable too)
  then scrolled sideways. Xavier reported it after v84; it doesn't show in
  desktop Chromium.
- Date fields: `appearance:none`, block, `min-width:0`, `max-width:100%`,
  46 px tall, value left-aligned (editor date and the Plan it day).
- Popups: `overflow-x:hidden`, so nothing inside can scroll them sideways.
  The zoomed card photo still pans inside its own frame.

**Verified locally (375 px):** Date field inside the column, popup width =
screen, zoomed photo pans in its frame, header stays pinned. The iOS date
quirk itself can't be reproduced here.

---

## v84 — 2026-10-08

**What's new** · Kitchen · [tools/kitchen.html]
### Steadier<br>on phones
Kitchen sits still on a phone now. Tapping a field no longer zooms the page
or lets it slide sideways, the bottom bar stays out of the way while you
type, and an open recipe or editor always keeps its × in view, keyboard or
not.

**Kitchen — `tools/kitchen.html`, source `Tools files/Tools/kitchen_v6.html`**
- **Jumps and sideways scroll:** fields were 13–15px; iOS zooms the page
  into any field under 16px. Phones (≤ 760 px) now use 16px for every
  input, select and textarea. `body{overflow-x:clip}` as a backstop, and
  `overscroll-behavior-y:none` stops the rubber-band bounce.
- **The × out of view:** with the keyboard up, iOS keeps the page full
  height and slides the visible part, so a full-height popup lost its top.
  A small `visualViewport` watcher sets `--vvh` / `--vvt`; on phones the
  popup takes exactly the visible area. Its header also respects the
  status-bar inset.
- **Bottom bar bouncing up:** it rode up on the keyboard. It now hides
  while the keyboard is open (`body.kb`, visible height > 140 px short) and
  under a popup.
- **Overflow:** the photo buttons row (forced onto one line in v83) ran
  19 px past a 320 px screen; it wraps again.

**Verified locally (320 × 640 and 375 px)**
- Every tab, the recipe, editor (with a card photo), day and grocery popups:
  page width = screen width. Fields compute to 16px. Popup = visible height;
  bottom bar hidden under it and back after closing.
- Not testable here: a real iPhone keyboard. The watcher is the standard
  `visualViewport` approach; worth a quick try on the phone.

---

## v83 — 2026-10-08

**What's new** · Kitchen · [tools/kitchen.html]
### Say what it is,<br>and room to edit
**Snap a dish** now has a *What is it?* box above the photo. Tell Claude
the dish, and anything special about how you made it ("lasagna, with
ground turkey"), and it writes that recipe instead of guessing. Leave it
empty and it still guesses.

On phones, the photo no longer takes over the screen while you fix the
recipe. A dish photo scrolls away like the rest of the page. A handwritten
card stays pinned so you can read it while typing, but smaller, and
**Hide photo** folds it out of the way.

**Kitchen — `tools/kitchen.html`, source `Tools files/Tools/kitchen_v5.html`**
- *What is it?* (`#ed-dishname`, kept in `ed.dishHint` across redraws)
  shown in the dish panel when a Claude key is set. Sent as "The cook says
  it's: …" (falls back to a typed name); the system prompt now also says to
  follow details about how they made it. Toast names the recipe's title.
- Phones (≤ 900 px): only `.card-photo` is sticky, frame 22vh (was 32vh,
  plus the row and padding: ~410 px of an 812 px screen → 242 px); dish
  frame 34vh, not pinned. Hide photo / Show photo (`ed.fold`) on phones
  only; folded = 63 px. "Remove photo" → "Remove" so the row stays on one
  line.

**Verified locally (mock + stand-in Claude endpoint, 375 px)**
- What-is-it text reached the request; dish photo scrolls off; card pinned
  at 242 px, folded 63 px, no sideways scroll.

---

## v82 — 2026-10-08

**What's new** · Kitchen · [tools/kitchen.html]
### Snap a dish,<br>get the recipe
Cooked something good? Tap **Snap a dish** in the Book and photograph the
plate. Claude works out what it is and writes the ingredients and method
into a new recipe card, ready for you to adjust to how you actually made it.
If you've already typed its name, it writes the recipe for that dish. The
photo stays with the recipe.

Also: the "Take a photo of the card" box in handwritten recipes now looks
like a box.

**Kitchen — `tools/kitchen.html`, source `Tools files/Tools/kitchen_v4.html`**
- **Snap a dish** (Book header, shown only with a Claude key) opens a new
  home-made recipe with a dish photo panel and the camera. Any home-made
  recipe without a photo gets **+ Photo of the dish** in the editor.
  Recipes with a dish photo reopen with it; Retake no longer turns a dish
  photo into a handwritten card.
- **Guess the recipe:** `claude-sonnet-5-5`, effort `medium`, JSON schema
  (title, category, serves, minutes, ingredients, steps, notes, confidence
  high / medium / low). The brief carries their categories and, if typed,
  "The cook says it's: …". Fills an empty name, category (only one of
  theirs), serves, minutes and "from" (Me); replaces ingredients and
  method (asks first if some were typed); notes get "Claude's guess from
  the photo (sure / fairly sure / not sure): …". The toast names the dish.
- Dish photos are kept like card photos (IndexedDB, this device only). The
  recipe view says "The photo is kept on the device that took it" for both.
  The monthly count in Taste lists dishes.
- **Fix:** the empty photo box was a `<label>` left inline, so its dashed
  border wrapped the text in pieces; now a full-width box. On phones only a
  real photo stays pinned under the header while typing.

**Verified locally (mock database + the stand-in Claude endpoint)**
- Snap a dish → photo → Guess the recipe: every field filled, confidence in
  the notes, saved as home made with its photo shown in the recipe view.
- Typed name first → + Photo of the dish → the request carried "The cook
  says it's: Mom's lasagna", the name kept. Box fix at 375 px and desktop.
- Not tried against the real API; same call as v81's features, which
  Xavier confirmed work.

---

## v81 — 2026-10-07

**What's new** · Kitchen · [tools/kitchen.html]
### Kitchen learns<br>to read
With a Claude key added (Taste → Claude), Kitchen can now:

- **Read a recipe card.** Photograph Grandma's card and tap *Read it for
  me*. It copies the card into the form as written, French stays French,
  and anything it can't make out is marked [?] for you to check against the
  photo beside it.
- **See what's in the fridge.** Snap the fridge and tap *What's in there?*.
  The food it recognises appears as chips; untick what's wrong, add the rest.
- **Suggest new dishes.** *Ideas from Claude* (in Leftovers and Ideas) gives
  three dishes that aren't in your book yet, built around what's in the
  fridge and what you like to cook. Save one, cook it tonight, or send what's
  missing to the grocery list.

Nothing is sent unless you press one of those buttons. Without a key,
Kitchen works exactly as before.

**Kitchen — `tools/kitchen.html`, source `Tools files/Tools/kitchen_v3.html`**
- Model `claude-sonnet-5-5` (Xavier's choice), official SDK
  `@anthropic-ai/sdk@0.132.0` loaded from jsDelivr (`+esm`) the first time a
  Claude button is used, `dangerouslyAllowBrowser: true` (the key is the
  person's own, on their own device). Structured output
  (`output_config.format` JSON schema) for each feature; server-side refusal
  fallback on (`fallbacks: "default"`, beta `server-side-fallback-2026-07-01`).
  Effort: card `medium`, fridge `low`, ideas `medium`.
- **Key:** Xavier's, on his bill. Pasted once per account in Taste → Claude;
  kept in `xdb.kitchen.ai` on the device and at
  `users/{uid}/tools/kitchen-ai` = `{ key, updatedAt }` (newer copy wins,
  watched live; the existing `users` rule covers it — **no rules change**).
  Never in the page, the cookbook doc, a backup or Send the book. Until an
  account is approved the key stays on the device. Replace / Remove / Test.
  A per-device monthly count with a cost estimate ($2 / $10 per million
  tokens).
- **Read it for me** (card editor, with a photo): sends the stored card photo
  (≤1800 px JPEG). Copies as written, no translating or correcting, `[?]` /
  `[illegible]` where unsure, margins → notes. Fills empty name / from /
  serves / minutes, replaces ingredients and method (asks first if you'd
  typed some), appends notes; the toast counts the `[?]` marks.
- **What's in there?** (Leftovers, with a photo): items as plain singular
  English, `sure` flag; unsure ones start unticked; ones already listed shown
  as ✓; Add puts the ticked ones in the fridge. A new photo clears it.
- **Ideas from Claude** (Leftovers when the fridge has something; Ideas → Ask
  Claude, mood applied): a text brief (on hand, mood, date and season,
  top categories and ingredients, diet, never-use, pantry basics, loved / no
  ideas, categories, book titles to avoid). Three dishes with why, uses,
  ingredients with amounts and steps; Save to the book (from "Claude", tag
  `ai`), Tonight, + Missing to the list.
- Errors in plain words: no key, key refused (401), out of credit, rate or
  spending limit (429), Claude busy (5xx), no connection, library didn't
  load, declined, incomplete answer.

**Privacy page:** a "Kitchen with Claude" entry (EN/FR) and Anthropic +
jsDelivr in "Who else handles it"; updated October 7, 2026.

**Scan.** No key anywhere in the published code (only the `sk-ant-…`
placeholder). The scan's "email address" `sdk@0.132.0` is the SDK version.
New outside hosts at use time: `cdn.jsdelivr.net`, `api.anthropic.com`.

**Verified locally (mock database + a stand-in Claude endpoint)**
- The request carries the key, `anthropic-version`, the browser-access
  header, the fallback beta, `claude-sonnet-5-5`, the JSON schema, and the
  photo as base64 JPEG.
- Key: saved on a device whose account wasn't approved yet → stayed local;
  approved → appeared at `users/{uid}/tools/kitchen-ai` (not in the cookbook
  doc); cleared on the device and reloaded → came back from the account.
- Card read filled every field and flagged the `[?]`; fridge list with an
  unsure item unticked, untick + add; ideas in Leftovers and in Ideas with
  a mood, save / tonight / missing to the list. Wrong key, no credit and no
  connection each give their message. 375 px: no sideways scroll.
- **Not tested against the real Claude API** (no key here): the first real
  read is the live check.

---

## v80 — 2026-10-07

**What's new** · Kitchen · [tools/kitchen.html]
### Swap recipes<br>between kitchens
Every recipe now has a **Share** button. It sends the recipe as tidy text,
and the other person pastes it into *Paste a whole recipe*, where it sorts
itself back into name, who it's from, ingredients and method.

To swap the whole book, use **Send the book** at the bottom of the Book
tab, and the other person taps **Import recipes**. New recipes are added
and edited ones updated. Their menus, grocery lists, stars and favourites
are left alone.

**Kitchen — `tools/kitchen.html`, source `Tools files/Tools/kitchen_v2.html`**
- Chosen over a shared cookbook (that would need a shared database path and
  per-recipe sync): two accounts, each with its own Kitchen, swap recipes by
  hand. No Firebase or rules change.
- **Share** (recipe view): `recipeText()` writes name, `From:`, `Category:`,
  serves, total time, link, Ingredients, Method (numbered), Notes. Phones
  open the share sheet; elsewhere it copies. The paste reader now picks up
  `From:` / `Category:` lines (also `By:`, `De:`, `Par:`, `Catégorie:`).
- **Send the book (.json)**: `{ kitchenRecipes: 1, recipes }` without stars,
  favourite or photo flag (personal). Phones share the file (AirDrop,
  Messages, email); elsewhere it downloads.
- **Import recipes** (also takes a full Kitchen backup, recipes only): same
  id → updated if theirs is newer, keeping this side's stars, favourite and
  photo; same name and same "from" under another id → left alone; anything
  else added. Toast counts new / updated / already here, with Undo.
  Deletions don't travel.
- Taste → Backup is unchanged (everything, for your own devices).

**Verified locally (mock database)**
- Share text → Paste a whole recipe round-trips both test recipes exactly
  (name, from, category, serves, time, link, every ingredient and step).
- Import on a second device with its own book: older copy updated with its
  own 3 stars kept; a separately typed recipe of the same name left alone,
  then added once removed; third import → "Nothing new". Favourites
  untouched. 375 px: no sideways scroll.

---

## v79 — 2026-10-07

**What's new** · Library · [library.html#recommended]
### One book,<br>two shelves
A book I've read and would hand you now sits on Read and on Recommended
at the same time — one book, not two copies.

**Library — Read and Recommended at once**
- A book now has a **status** (Read / Want to Read / Neither) and,
  separately, **Recommended** (yes/no). Read + Recommended shows the same
  book on both shelves; editing it once changes both.
- Card: **Recommend / Unrecommend** button (signed in). Refuses on a book
  that is only on Recommended, so nothing ends up on no shelf; Edit moves it.
- Editor: Status select + a Recommended toggle; must be on at least one
  shelf. Delete says it removes the book from every shelf it's on.
- Import: a book already in the library is put on the chosen shelf too
  (instead of skipped); skipped only if it's already there.
- Data: `books/{id}` gains `status` and `recommended`. Old books with only
  `shelf` convert on read (read → Read, want → Want, recommended →
  Recommended only); nothing to migrate by hand. `shelf` is still written
  (status, else "recommended") so a pre-v79 tab shows each book somewhere —
  but a save from a pre-v79 tab would drop the Recommended flag on books
  that are also Read. Reload open tabs. No rules change.

**Tested on the mock**
- Read-only copy of the live library (18 books, all Read). Recommend from
  the card → on both shelves, saved `status: read, recommended: true,
  shelf: read`. Greenlights via Edit → both shelves. Neither + not
  recommended → refused. Import onto Recommended of 2 existing + 1 new →
  1 added, 1 joined, 1 already there. Recommended-only card button refuses.

---

## v78 — 2026-10-07

**Library — Import list, and tidier shelves**
- **Import list** (admin bar, signed in as Xavier): paste one book per line,
  `Title, Author` (leading numbers ignored; author = after the last comma),
  choose a shelf, one save. Books already in the library (title match,
  case and punctuation ignored) are skipped and named. New books get
  rotating spine colours, no genre/rating/notes.
- Spine titles wrap onto two or three lines instead of being cut off;
  spine width follows the title length.
- The bottom row of every shelf now shows its yellow board (it sat just
  outside the rack before).
- Why: Xavier asked to add 17 books. His library already holds saved data
  in Firebase (only his account can write it), so the page gets an import
  rather than a new starter list.

**Tested on the mock**
- Loaded a read-only copy of the live `pages/library` (12 books) into the
  mock, signed in as owner, imported his 17-line list onto Read: 16 added,
  $100M Offers skipped, the 12 existing books unchanged. No full titles
  clipped at desktop; at 375px no sideways scroll, one long-word title
  (The Photographer's Eye) clips by a few pixels.

---

## v77 — 2026-10-07

**What's new** · New tool · [tools.html#personal]
### Cards: every<br>loyalty card, one place
Scan a loyalty card's barcode once, with the camera or from a photo, or
type its number. At the till, tap the card: it fills the screen, big and
sharp, and the screen stays on. Cards sync between your devices, install as
an app, and work offline.

**Cards — `tools/cards.html`, source `Tools files/Tools/cards_v1.html`**
- Wallet grid: favourites first (shown yellow), then most used, then
  newest; search. Tap → full-screen white view with the barcode as SVG, the
  number spaced out, the note, and a Wake Lock so the screen stays on (the
  use count goes up each time). Edit / Delete with Undo.
- Add: **Scan** (rear camera, scan frame, torch where the phone allows it),
  **From a photo** (tries the picture at three sizes), **Type it** (a valid
  EAN-13 / UPC-A / EAN-8 is recognised by its check digit, anything else
  becomes Code 128). The preview draws the barcode before saving; a number
  that can't be drawn in the chosen type is refused with a plain message.
- 13 formats: Code 128, EAN-13, EAN-8, UPC-A, UPC-E, Code 39, Code 93, ITF,
  Codabar, QR, PDF417, Aztec, Data Matrix.
- Reading: the browser's `BarcodeDetector` where it exists (Chrome on
  Android and Mac), otherwise ZXing (`@zxing/library@0.23.0`, loaded only
  when scanning) — that is the iPhone/Safari path. Chrome's "EAN-13 with a
  leading 0" is stored as the UPC-A printed on the card. Drawing: bwip-js
  4.11.4. Both from unpkg with SRI, kept offline by `pwa-sw.js` (LIBS).
- Data `xdb.cards.v1` = `{ cards: [{ id, name, code, format, note, fav, uses, lastUsed, createdAt, updatedAt }] }`;
  sync doc `cards` (no rules change); in `TOOLS` in `assets/account.js`;
  installable (manifest, icons, `pwa-sw.js` VERSION v77). Export / Import
  .json (merges by id, newer wins).

**Verified locally (mock database, Playwright Chromium)**
- Photos of 8 real barcodes (EAN-13, Code 128, UPC-A, QR, Code 39, PDF417,
  EAN-8, ITF — rotated, blurred, noisy) read correctly with the browser's
  reader and with it switched off (ZXing, as on an iPhone). Camera: a fake
  camera playing a card (EAN-13, QR) read with both readers; the camera
  turns off after a read.
- Typing picks EAN-13 vs Code 128; a wrong type is refused; QR, PDF417 and
  EAN-13 draw full-screen. Found and fixed before release: PDF417 failed to
  draw (bwip-js refuses `height: undefined`).
- Two devices: nothing pushed from an empty wallet; a card from A appears
  on B; B's rename shows on A live; reload writes nothing.
- Installable, no manifest errors; with every host unreachable it opened,
  read a barcode from a photo with ZXing and drew a card. 375 px: no
  sideways scroll.

**Not testable here:** a real phone camera and a real till scanner. Screen
brightness can't be raised by a web page; the show view says to turn it up.

---

## v76 — 2026-10-07

**What's new** · Now syncs · [tools.html#maria]
### Cycle Calendar,<br>on every device
Sign in and the period log follows you between phone and computer, live.
Signed out, it works exactly as before, on this device only.

**Cycle Calendar — sync**
- The shared sync core (`add-cloud-sync/assets/sync-core.js`) pasted
  verbatim inside the tool's IIFE; buttons bound with addEventListener
  rather than onclick. Adapter: doc `cycle-calendar` →
  `users/{uid}/tools/cycle-calendar`, payload `{starts, manual, cycle,
  period}`, storage key unchanged (`debelle.cycle-calendar.v1`, so data
  already on a device carries over), `clean()` rebuilds a dropped empty list.
- Added to `TOOLS` in `assets/account.js` (account panel, Sync now).
- Card says Syncs. Privacy page: the sign-in & sync section now lists every
  synced tool (Notes, Journal and Kitchen had been missing since v73/v74)
  and Cycle Calendar left the local-only list.
- Like Kitchen, it lives on **whoever signs in** — Maria on her own account
  once approved on Access. No rules change, no console step.

**Tested on the mock (two devices, 127.0.0.1 and localhost)**
- Untouched device signs in → nothing written. A logs 3 periods → cloud has
  them; B signs in → takes them silently. B changes period length → A shows
  it live; A deletes every period (empty list) → B shows none, then B adds
  one → round trip fine.
- Both edit offline → reload → conflict bar in plain words; "Use the other
  Mac's" adopts it and keeps a 7-day backup. Reload → still Live, no write.
- Non-owner signs in → Access requested, only a `requests` entry; approved
  on access.html → goes live without reload, writes only under its own uid;
  Xavier's copy untouched. Console clean; no sideways scroll at 375px.

## v75 — 2026-10-07

**What's new** · New page · [library.html]
### The Library
Three shelves: what I've read, what I'd recommend, and what's still on the
pile. Pull a book off the shelf for the genre, a rating and what I thought
of it.

**What's new** · New tool · [tools.html#maria]
### Cycle Calendar
Log the first day of each period. As the log grows it works out the real
average cycle, then marks the next period, the fertile window and the peak
day on a two-month calendar. Everything stays on the phone it's used on.

**Library (`library.html`) — new page**
- Three shelves (Read, Recommended, Want to Read) drawn as spines on a
  yellow board, title and author in vertical text, one colour per book.
  Click a spine → card with title, author, genre, rating (1–5), notes, and
  date read on the Read shelf.
- Books live at `pages/library` = `{title, books: {id: book}, updatedAt}` in
  xdb-tools, under the existing `pages/$page` rule: public read, Xavier's
  account only for writes. **No rules change, no console step.**
- Admin mode = signed in as Xavier (account button). Shows Add book, Edit
  and Delete. The brief asked for a hashed password in localStorage; Xavier
  chose Firebase sign-in instead (2026-10-07), because localStorage books
  would only ever show in his own browser and a client-side password guards
  nothing.
- Last copy cached in localStorage `debelle.library.v1` for instant draw and
  offline. Until the first save, everyone sees 12 starter books (Hormozi ×3
  and Sell Like Crazy on Read; the rest Recommended / Want to Read), no
  ratings or dates — Xavier to edit.
- Spine colours go beyond black/white/yellow, as the brief asked; the page
  chrome stays on brand.
- Linked from: the map (Personal → Library — a new node, so the layout
  regrows), the Index, and every page footer beside Food for Thought.

**Cycle Calendar (`tools/cycle-calendar.html`) — new tool, Maria's Tools**
- Asked for as "Baby Maker"; Xavier chose a neutral name and slug
  (2026-10-07) so the public site says nothing personal.
- Period start dates in localStorage `debelle.cycle-calendar.v1`, local only,
  never synced. Back up / Restore as .json.
- Learns: average of the last 6 logged gaps between 18 and 45 days (others
  flagged as probable missed logs and left out). Settings: learn from log or
  set cycle length by hand (default 28), period length (default 5).
- Peak day = 14 days before the next period; fertile window = peak −4 to +3
  (days 10–17 of a 28-day cycle). Two-month calendar with period, expected
  period, fertile window, peak day, today; tap a day to log or remove a
  start. Late periods are flagged.
- Card in Maria's Tools; Privacy page lists it among local-only tools and
  Google Fonts users.

**Verified**
- Both scripts parse (JavaScriptCore). Scan: library — the same Firebase
  config and pages rule as Who Am I? (already live); cycle calendar — no
  backend.
- **Not clicked through in a browser** — the preview test was stopped this
  session. Check both after the push.

## v74 — 2026-10-05

**What's new** · New section · [tools.html#maria]
### Maria's Tools,<br>and a Kitchen
A new corner of the workshop, built for Maria. The first tool in it is a
kitchen.

- **The book.** Every recipe keeps who it came from and when: Mom's,
  Grandma's, yours, or the one saved from Instagram or TikTok, with its link.
  Paste a whole recipe and it sorts the ingredients from the steps.
- **Grandma's cards.** Photograph a handwritten card and it stays on screen
  beside the form while you type it in. The photo is kept with the recipe.
- **Ideas** for when nobody knows what to make, from your own book and
  seventy-odd everyday dishes.
- **Leftovers.** Say what's in the fridge (a photo helps you remember) and it
  finds what you can make, best match first.
- **A menu for the month**, filled in one tap if you like, and the grocery
  list that comes out of it, added up and sorted by aisle.
- **It learns.** What you cook, rate and love moves what it suggests.

It syncs between your devices once you're signed in, installs as an app,
and works offline.

**Kitchen — `tools/kitchen.html`, source `Tools files/Tools/kitchen_v1.html`**
- Six tabs (a bottom bar on phones): Book, Ideas, Leftovers, Menu, Groceries,
  Taste.
- **Book:** recipes with category, from (person or creator), date, kind
  (home made / handwritten / from online + link, site detected: Instagram,
  TikTok, YouTube, Pinterest, Facebook or the domain), serves, minutes,
  ingredients, method, notes, tags, favourite, 1–5 stars. Search, filter by
  category / person / kind, sort (newest, A–Z, most cooked, best rated,
  oldest). Recipe view: scale ½–3×, tick ingredients, tap through steps,
  Cooked it today, Add to the menu, Ingredients → groceries (pantry basics
  left out), print. Delete with Undo.
- **Paste a whole recipe:** headings (English or French) split it; without
  headings, quantity lines are ingredients and sentences after them are
  steps; picks up serves, total time and a link.
- **Handwritten:** photo shrunk to 1800 px JPEG, kept in IndexedDB
  (`xdb-kitchen` / `photos`) on the device that took it, **never synced**
  (one doc carries every recipe; photos would make each sync heavy). Other
  devices say where the photo is. Sticky beside the form; tap to zoom.
- **Ingredient reader:** quantities (fractions, ½, ranges), units in English
  and French (c. à soupe, tasse, gousse…), descriptors dropped, plurals and
  ~150 synonyms folded (boeuf haché → ground beef, poivron → bell pepper,
  chicken broth → broth so it never counts as chicken). Things like peanut
  butter and coconut milk never match butter or milk.
- **Ideas:** 74 built-in dishes (category, minutes, tags, season, main
  ingredients, one-line method), moods (quick, comfort, healthy,
  vegetarian, fish, kids, fancy, budget, one pot, breakfast, sweet, our book,
  something new). Cook it tonight / Plan it / Love it / Not for us (hidden,
  reversible in Taste) / Save to the book.
- **Scoring (rebuilt from the data each time, nothing stored):** own recipes,
  favourites and stars first; affinity for the categories, ingredients and
  tags you cook (cooking lately weighs more), love/no on ideas, the menu;
  cooked in the last 3/7/14 days pushed down, favourites not made in 45 days
  and recipes saved but never cooked pushed up; season (October–April cold);
  what's in the fridge. Each suggestion says why.
- **Leftovers:** fridge list (synced; typed, or quick picks in four groups;
  "half a pepper" → bell pepper), optional photo for reference only (not
  saved). Matches from book and ideas, pantry basics count as had; shows
  uses / also needs; Tonight; + missing to the list.
- **Menu:** month grid (a list of days on phones), Breakfast/Lunch/Dinner
  per Taste. Day sheet: add a recipe, an idea or free text ("eating out"),
  Suggest, tick Cooked (logs it, which is what the learning feeds on).
  **Fill empty days** from today: no repeat within 10 days, no same category
  two days running, repeats in the month cost extra; Undo.
- **Grocery list from the menu:** next 7 days / the 7 after / rest of month /
  whole month; skip pantry basics, what's in the fridge, meals already
  cooked; preview with untick; amounts summed per unit. List by aisle (10
  aisles), typed adds ("2 lemons, 500 g ground beef"), same item merges,
  Share (phone share sheet, or copied), clear checked / all with Undo.
  **Often bought:** learned from what gets ticked off.
- **Taste:** counts, where the book comes from, what gets cooked, most
  cooked, ingredients you come back to, forgotten favourites, a few lines in
  plain words. Settings: diet (vegetarian, pescatarian, no pork, gluten-free,
  dairy-free), never suggest, pantry basics, meals on the menu, people,
  categories, hidden ideas, export / import (.json, merges).
- Data `xdb.kitchen.v1` = `{ recipes, menu, grocery, fridge, cooked, ideaFb,
  bought, prefs }`; `prefs.v` marks a saved copy so an emptied list stays
  empty after the database drops it.

**Sync, install, account**
- `sync-core.js` pasted verbatim with its adapter: doc `kitchen` under
  `users/{uid}/tools/` — **no Firebase rules change**. Maria signs in with
  her own Google account; her request appears on Access for Xavier to
  approve, then it syncs on her devices. Her kitchen is hers — Xavier's
  account would hold a separate one.
- `TOOLS` in `assets/account.js`; installable (manifest, icons, `pwa.js`);
  `pwa-sw.js` VERSION v74, `kitchen` in APPS and LIBS (Firebase only).

**Site**
- New category `maria`: chip, band "04 / Maria's Tools" (Events → 05, Art →
  06), map node Tools → Maria's Tools (map re-baked for 24 nodes, no regrow
  at load), text index link, README "six categories".

**Scan.** Same Firebase project as every synced tool — nothing new public.

**Verified locally (mock database, built-in browser)**
- Paste → sort → save (online, Instagram link); card photo → type in → save
  (photo kept on device, not in the cloud doc); scale, stars, favourite,
  cooked, ingredients → groceries; plan, fill the month, day sheet add /
  suggest / cooked; grocery list from the menu with untick; typed adds;
  often bought after two ticks; leftovers; ideas moods, love, not for us;
  Taste. 375 px: no sideways scroll on any tab.
- Sync: a non-member signing in files a request and writes nothing else;
  approved → live without reload, writes only under its own uid; edits flow
  both ways live; reload writes nothing; both edited offline → the choice
  bar in plain words, Keep works. Empty lists survive the round trip.
- Not run: the offline launch in Playwright (not installed here). Kitchen's
  offline files all exist and its setup matches Notes and Journal, which
  were tested offline in v73.

## v73 — 2026-10-05

**What's new** · New tools · [tools.html#personal]
### Notes and<br>a Journal
**Notes:** open it and type. The first line is the title and everything
saves as you go. A dash and a space makes a bullet; Enter keeps the list
going, Enter on an empty bullet ends it. Numbered lists work the same way.

**Journal:** a page a day. How it went, three good things, and whatever
else needs writing down, with a prompt when you're stuck. A calendar, a
streak, and what you wrote on this day last year.

Both sync between your devices once you're signed in, install as apps, and
work offline.

**Notes — `tools/notes.html`, source `Tools files/Tools/notes_v1.html`**
- One textarea per note; first non-empty line = title (list markers
  stripped). List, search (`/`), pin, copy, delete with Undo, Alt+N new
  note; an empty note is dropped when you leave it. Phones: list and note
  are separate screens (← Notes).
- List typing (shared with Journal): `- ` or `* ` at a line start → `• `;
  Enter continues `• ` and `1.`/`1)` lists (numbers count up), Enter on an
  empty item ends the list; Backspace on a bare `•` removes it; Tab /
  Shift+Tab indent a list line. Edits go through `execCommand('insertText')`
  so Undo works (Undo turns a bullet back into the dash); the caret is set
  explicitly afterwards (Chrome put it one short after removing the last
  line).
- Data `xdb.notes.v1` = `{ notes: [{ id, text, pinned, createdAt, updatedAt }] }`;
  starts with one welcome note. Export / Import (.json, merges by id, newer
  wins).

**Journal — `tools/journal.html`, source `Tools files/Tools/journal_v1.html`**
- One entry per day: mood 1–5 (Rough, Low, Okay, Good, Great; tap again to
  clear), three good things, free writing with list typing and **Prompt
  me** (18 prompts; Use it adds one to the text), tags with suggestions
  from earlier entries. An entry exists only while something is filled in;
  clearing everything removes it. No future days.
- Calendar (written = white, good/great = yellow, today outlined), stats
  (streak, longest, this month, words, mood over 30 days, entries), On this
  day (same date in earlier years, a month ago, a week ago). Entries tab:
  search, mood filter, tag filter, grouped by month. Export as text (.md) or
  backup (.json); Import merges by date, newer wins. Alt+← / Alt+→ change
  day. Under 980 px the calendar and stats become their own tab.
- Data `xdb.journal.v1` = `{ entries: [{ date, mood, good[3], body, tags[], createdAt, updatedAt }] }`.

**Sync, install, account**
- Both paste `sync-core.js` verbatim with their own adapter: docs `notes`
  and `journal` under `users/{uid}/tools/` — **no Firebase rules change**.
  Added to `TOOLS` in `assets/account.js` (account panel lists them).
- Installable: manifests, icons, `pwa.js`; `pwa-sw.js` (VERSION v73) gains
  `notes` and `journal` in APPS and LIBS (Firebase library only; no web
  fonts, both use the site's system type).
- Cards in Personal; the section line now ends "and what's worth writing
  down".

**Verified locally (mock database, Playwright Chromium)**
- Typing: dash-space → bullet, Enter continues, Tab/Shift+Tab, empty item
  ends the list, numbered 1. → 2., Backspace on a bare bullet, Undo.
- Notes: empty note dropped, search, pin, delete + Undo. Journal: mood,
  good things, bullets, tags, prompt; calendar and streak (2 days after
  writing yesterday); entries list, tag and text filters; clearing a day
  removes its entry.
- Two devices: sign-in with only the welcome note pushes nothing; a note
  from A appears on B, B's edit shows on A live; reload writes nothing;
  journal mood and text flow both ways, calendar updates live.
- Installable with no manifest errors; both open with the server stopped
  and every other host unreachable. 375 px phones: no sideways scroll.

---

## v72 — 2026-10-04

**What's new** · Budget, Phases, Idea Bank · [tools.html#personal]
### Three more apps<br>that work offline
Budget Tracker, Project Phases and Idea Bank now install like apps, with
their own icon, and open without a connection. Work offline as usual:
everything saves on the device, and the moment you're back online it syncs
to your account and your other devices.

- Chrome, Edge and Android: **Install app** (in Idea Bank, under Manage).
- iPhone and iPad: open the tool in Safari, tap Share, then Add to Home
  Screen.

**Installable — `tools/budget-tracker.html`, `project-tracker.html`, `idea-bank.html`**
- Manifests `tools/<app>.webmanifest`, icons in `tools/icons/` (180, 192,
  512, maskable 512) in each tool's own colours. Scope `tools/<app>`, so each
  is its own app (Idea Bank's scope covers its `idea-bank/` folder too).
- `pwa-sw.js` (VERSION v72): the three join `APPS` with the files they load
  from the site (incl. `assets/account.js`, Idea Bank's `idea-bank/` files).
  New `LIBS` + shared cache `xdb-app-lib`: the Firebase library (10.12.2),
  React/ReactDOM/Babel for Idea Bank, and the font stylesheets, fetched at
  install; version-pinned code and font files are kept as first fetched,
  font stylesheets are refreshed in the background. Database traffic is
  never cached or touched.
- `pwa.js`: `window.xdbPwa.can()/install()` and an `xdb-pwa` event, for
  pages that draw their own Install button (Idea Bank → Manage → Install
  app). Budget Tracker and Project Phases have an Install app button beside
  the sync button (hidden in Project Phases' client view).

**Sync while offline — all three tools + `add-cloud-sync/assets/sync-core.js`**
- No connection now reads **Offline · saved here** with "No connection.
  Everything still saves on this device and will sync when you are back
  online." instead of "Sync failed (failed)". New `errCode()` maps Firebase's
  codeless "Client is offline", network and module-load errors (and
  `navigator.onLine === false`) to `unavailable`. Sync logic unchanged: on
  reconnect the existing `online` listener and live listener push the
  offline edits; if another device also changed things meanwhile, the usual
  choice with a 7-day backup appears.
- New originals: `budget_tracker_app_v18.html`, `project_tracker_v15.html`,
  `ideas-v10/` (Install app in Manage; offline wording). (While making
  these, `budget_tracker_app_v17.html` and `project_tracker_v13.html` were
  overwritten by mistake; both were restored byte for byte from the copies
  published in v62 and v61. Publishing copies originals verbatim — checked
  against `project_tracker_v14.html` and v64.)

**Verified (Playwright Chromium; built-in browser can't run service workers)**
- All three: installable, no manifest errors; after one online visit they
  opened with the server stopped and every other host unreachable — fonts,
  React and the Firebase library from the kept copies.
- Mock database: Idea Bank and Project Phases — edit online → in the cloud;
  go offline → edit → "Offline · saved here", not in the cloud; reload while
  offline → the edit is still there; back online → edit in the cloud,
  "Live". Budget Tracker: offline label, reload offline, back to Live.

**Not verifiable here:** signing in *inside* an installed iPhone app (Google
sign-in in Home Screen apps can be refused by iOS). The iPhone app also has
its own storage, separate from Safari: it starts empty and fills from the
account after sign-in.

---

## v71 — 2026-10-05

**What's new** · Feed & Carousel Planner · [tools.html#portfolio]
### Install them. Use them offline.
Feed Planner and Carousel Planner now install like apps, with their own icon
on your phone or computer, and open without a connection.

- iPhone and iPad: open the tool in Safari, tap Share, then Add to Home Screen.
  The Install button shows you how.
- Chrome, Edge and Android: tap Install.

**What's new** · Privacy · [privacy.html]
### A privacy policy, in English and French
One page for the whole site and every tool: what's collected, why, who sees
it, how long it's kept, and how to see, correct or delete your information.
Written for Québec's Law 25.

**What's new** · The whole site
### Links that look like something
Share any page or tool and it now shows a proper preview card: title, one
line about it, and an image in the site's colours.

**Installable apps — `tools/feed-planner.html`, `tools/carousel-planner.html`**
- Each has a manifest (`tools/<app>.webmanifest`) and icons in `tools/icons/`
  (192, 512, maskable 512, 180 for Apple). Scope is `tools/<app>`, so each
  installs as its own app and nothing else on the site is captured by it.
- `tools/pwa.js` (loaded with `data-app`) registers `tools/pwa-sw.js` for that
  app's scope only, shows the page's Install button when the browser offers
  installation (Chrome/Edge/Android prompt; iPhone/iPad get a "Share → Add to
  Home Screen" note), and asks for persistent storage once installed.
- `pwa-sw.js`: network first with a 3.5 s fallback to the kept copy; it caches
  only the app's own files (page, manifest, icons, pwa.js). Photos and layouts
  stay in IndexedDB/localStorage as before. Bump `VERSION` when editing it.
- Install button: Feed Planner in the masthead actions, Carousel Planner in
  the top bar beside Preview swipe. Hidden until installation is possible.
- iOS note: an installed Home Screen app has its own storage, separate from
  Safari — work started in Safari doesn't appear in the app.

**Privacy — `privacy.html`**
- One policy, English and French (buttons; `#fr` opens French; a French
  browser gets French). Person in charge, what each tool collects, purposes
  and consent, service providers and storage outside Québec, cookies and
  browser storage, retention, rights (access, correction, deletion,
  de-indexing, portability, withdrawal), complaints to the CAI, security,
  incidents, under-14s.
- Linked from every footer, the Index (The Site), the account panel
  (`assets/account.js`), and under the guest sign-up buttons in Activity
  Planner and Potluck.
- Commitments Xavier keeps: delete accounts within 30 days of a request;
  delete events/potlucks 12 months after their date; incident register.

**Social previews — every page and tool**
- Open Graph + Twitter card tags, canonical URL, and a meta description where
  one was missing (16 tools). One 1200×630 image per page/tool in
  `assets/og/`, made from the site's type and colours.
- URLs are absolute (`https://xavierdebelle.github.io/website/`) — update
  them if the site moves to its own domain.
- Liquid Silver and Organic Loops: tab title was "Bundled Page", now the
  piece's name.

---

## v70 — 2026-10-02

**What's new** · Activity Planner · [tools/activity-planner.html]
### A quieter way back to your booking
The big "View and modify your reservation" box is now a small button inside
"Join an activity". Each activity's own page has it too.

**Activity Planner v3 — `tools/activity-planner.html`, source `Tools files/Events/activity_planner_v3.html`**
- Lookup card and "new here?" divider removed; "Already registered? View or
  change your booking" pill in the Join card opens the email field (Enter or
  Find), closes again once the booking opens.
- Activity pages (`&a=`) carry the same pill as a link to `?e=<id>&find=1`,
  which opens the main page with the field open and focused.
- Booking edit / "updated" messages now sit above the Join card.

**Tested on the mock** (signed-out guest, real clicks): pill opens field,
email + Enter opens the booking; activity page pill lands on the main page
with the field focused.

---

## v69 — 2026-10-02

**What's new** · Potluck · [tools/potluck.html]
### Potluck goes online
Potlucks now live in a real database, so guests sign up and claim dishes
from their own phones and everyone sees the same list, live. Organisers
sign in with Google; guests never need an account.

- Start a potluck, send the link, watch the dishes fill in.
- Starting potlucks is by invitation, like the synced tools.

**Potluck v2 — `tools/potluck.html`, source `Tools files/Events/Potluck - Zine _standalone_ v2.html`**
- Storage: Firebase xdb-tools through `assets/account.js` (site sign-in).
  `potlucks/{id}` (id = 32 random hex chars = the link; read by exact id
  only, never listed) and the host's own list at `users/{uid}/potlucks/{id}`
  (covered by the existing `users` rule).
- Guests write only `attendees/{k}` ({name, party 1–20}) and `claims/{k}`
  ({claimedBy}); a claimed dish can be freed but not overwritten. Settings,
  categories, history, reset and delete belong to the host (`owner`) and
  Xavier. Every action writes just the paths it changed (multi-path update).
- Admin password removed: the control panel opens for the Google account
  that started the potluck. Creating needs owner or member status;
  unapproved accounts see "your access request is with Xavier".
- Auto reset / repeat weekly run on the host's device only (guests can't
  write history); guests already see the rolled-forward date.
- v1 (browser-only trial, live since v67) kept as the source file; its
  browser data does not carry over.

**Rules** — `potlucks` added to `firebase-rules.json` (alongside v68's
`events`/`eventIndex`); mock mirror in `harness/server.py`. Xavier
published the combined file. Checked from outside: `potlucks.json` 401,
`potlucks/<id>.json` 200, guest write to a non-existent potluck 401;
`users`, `requests`, `members`, `events`, `eventIndex` still 401.

**Tested on the mock** (two devices, real clicks)
- Signed out → sign-in prompt; owner creates a potluck → control panel,
  index written. Guest (signed out, other device) RSVPs with party size and
  claims a dish → host sees it live; theme and a new category reach the
  guest live; save & reset files history and clears the guest's list live;
  delete removes the potluck and its index entry.
- Approved member hosts their own; on Xavier's potluck the control panel
  refuses them ("that account didn't start this potluck"), and a direct
  write is refused. Unapproved account → request filed, no create form.
- As a guest: edit settings, overwrite a claim, oversized party, extra
  fields, write to a missing potluck, create, delete, list → all refused.
- No horizontal scroll at phone width; no console errors.

---

## v68 — 2026-10-02

**What's new** · Activity Planner · [tools/activity-planner.html]
### Activity Planner goes online
Events now live in a real database, so guests can sign up from their own
phones. Organisers sign in with Google; guests never need an account.

- Guests see the activities, the spots left and who's coming. Their email,
  phone and payments stay private to the organiser.
- A guest can still find and change their booking by typing their email.
- Creating events is by invitation, like the synced tools.

**Activity Planner v2 — `tools/activity-planner.html`, source `Tools files/Events/activity_planner_v2.html`**
- Storage: Firebase xdb-tools through `assets/account.js` (site sign-in).
  `events/{id}/meta|activities|roster|guests|pay` and `eventIndex/{uid}/{id}`.
  Event id = 24 random hex chars; booking key = SHA-256(event id + email).
- Public: meta, activities, roster (first, last, spots). Guests write their
  own `guests/{k}` + `roster/{k}` (never delete, never `pay`). Organiser
  (meta.owner) and Xavier read/write everything in the event. Paid amounts
  per activity are derived from `pay/{k}/paymentLog` on load, never stored,
  so guest edits can't touch money and repricing writes nothing.
- Per-event password removed; the dashboard opens for the organiser's
  Google account. Creating an event needs owner or member status.
- v1 (browser-only) kept as `activity_planner_v1.html`; its browser data
  does not carry over (it was a trial).

**Rules** — `events` and `eventIndex` added to `firebase-rules.json`; mock
mirror added to `harness/server.py`. The file also holds the potluck rules
another session added today (v67) — the whole file is what to paste.

**Tested on the mock** (two devices, real clicks for the guest side)
- Signed out → sign-in prompt; stranger signs in → "Access requested",
  request filed, no create form; not-organiser on a dashboard → refused.
- Owner creates event, adds activities, sets payment text; index written.
- Guest (signed out, other device) books → roster public, list of guests
  and payments refused (401); organiser sees it live, records $30; guest
  finds booking by email (any case) → paid, locked, $0 due; adds an
  activity → saved, payment intact.
- As a guest: fake payment, delete a booking, change event, add activity,
  read an organiser's index → all refused.
- Approved member creates and deletes their own event.

**Outstanding**
- Xavier: paste the full rules into Firebase → Realtime Database → Rules
  → Publish. Until then the live planner can't create or load events.

---

## v67 — 2026-10-02

**What's new** · New tool · [tools.html#events]
### Potluck
The Volley & BBQ zine, minus the volleyball. Anyone can start a potluck
with its own link and password. Guests sign up with how many they're
bringing, the dish slots grow with the headcount, and whoever hasn't
claimed a dish shows up in red. Trial version: saved in your browser only.

**Potluck v1 — `tools/potluck.html`** (source
`Tools files/Events/Potluck - Zine _standalone_ v1.html`; Volley v3 untouched)
- Same logic as the Volley zine: RSVP list, slots scaling with headcount,
  "no dish" list, admin panel, save & reset into history, repeat weekly,
  auto reset, event info, theme.
- Generic: start screen creates any number of potlucks (`?p=<id>`), each
  with its own title, "presented by", tagline, admin password, BYOB toggle.
- RSVP is name + party size; slots scale with total people.
- Organiser edits categories (name, icon, hint, dishes per 10 people, min).
- Unbundled: fonts embedded as data URIs (latin subsets only), no external
  hosts at all. No Firebase — it does not touch the volleyball database.

**Scan**
- Clean: no hosts, endpoints, secrets or personal data. Storage is
  `localStorage` under `potluck-zine.v1.<id>` (the scanner reports none
  because the key is built from a prefix). Admin passwords live in the
  visitor's own browser only.

**Verified locally**
- Real clicks: create a potluck → admin; RSVP with party size; claim and
  free a dish; edit and save categories (incl. removing a claimed one);
  save & reset → history; home list. Checked no inline handler name
  clashes with a `document` property (the v66 bug). No console errors;
  no horizontal scroll at phone width.

---

## v66 — 2026-10-02

**What's new** · Fix · [tools/activity-planner.html]
### Create event works
The Activity Planner's Create event button did nothing. It does now. The
example text in the form is also lighter, so it no longer looks filled in.

**Activity Planner v1 (fix) — `tools/activity-planner.html`**
- The button's inline `onclick="createEvent()"` resolved to the browser's
  built-in `document.createEvent` (inline handlers look on `document`
  first), which threw. Renamed to `createNewEvent`. Checked every other
  inline handler name against document/element properties — no other clash.
- v65's test called the function directly, so it never went through the
  button. This time every new button was tested with real clicks.
- Placeholders lighter (`::placeholder`) and prefixed "e.g." on the create form.

**Verified locally**
- Real clicks: empty form → "Give your event a name."; filled → event
  created, dashboard opens; Add activity and Save event details save.
  No console errors.

---

## v65 — 2026-10-02

**What's new** · New tool · [tools.html#events]
### Activity Planner
The wedding activities app with the wedding taken out. Create an event, add
its activities with dates, spots and prices, and share the link. Guests sign
up, say how many are coming, and can come back to change it; you see who has
paid and who still owes.

- Each event has its own password, currency and payment instructions.
- Every activity gets its own sign-up link.
- Trial version: everything is saved in your browser only, so it is for
  trying the flow, not yet for a real event.

**Activity Planner v1 — `tools/activity-planner.html`, source `Tools files/Events/activity_planner_v1.html`**
- Built from the embedded app in `agreco_wedding_activities_v20.html`
  (the GoHighLevel page wrapper and Cloudflare scripts dropped). The
  original is untouched and still runs the wedding.
- Same logic throughout: capacity guards, find-by-email edit, paid
  activities locked, payment log spread over activities, By activity
  view, Edit activities, per-activity RSVP page, CSV export.
- Storage: localStorage key `activity-planner/v1`, tree
  `events/{id}/{meta,activities,guests}`, behind ref/get/set/remove/onValue
  functions shaped like Firebase's so a shared database can replace them.
  Notifications are synchronous, like Firebase's local events.
- New: home page (create an event, list this browser's events), Event
  settings tab (name, organiser, dates, place, currency, welcome text,
  payment instructions, closing line, password, guest link, delete).
  URLs: `?e=<event>`, `&admin=1` for the dashboard, `&a=<activity>`.
- Password is hashed (non-cryptographic) per event; the session remembers
  it after creation or sign-in. Not real security — noted in the code.
- Fixed in the copy only: activity cards inherited `.field label` styles
  (all caps, checkbox stacked above the name).
- Neutral palette instead of the wedding navy; same fonts.

**Scan**
- Only placeholders flagged (example.com addresses, a 555 number). No
  backend, no real contact or payment details.

**Verified locally**
- Created an event in EUR, added four activities (paid, free, TBD), set
  payment text; guest sign-up with 2 spots, totals in €, find-by-email
  with amount due; wrong password refused in a fresh session, right one
  accepted; partial payment recorded; activity link shows correct spots
  left; unknown event link shows "Event not found"; phone width has no
  sideways scroll; deleting the event empties storage. No console errors.

---

## v64 — 2026-09-29

**What's new** · Project Phases · [tools/project-tracker.html]
### Client links stay quiet while you work
A client watching their project link no longer sees a timer ticking. Time
shows up there once you stop it.

**Project Phases v14 — `tools/project-tracker.html`, source `Tools files/Tools/project_tracker_v14.html`**
- `sharePayload` sends only finished log entries (`end != null`), so the
  running bar and the live step time never appear on a client link.
- The client view also drops any open entry it receives — covers links
  published before this; those are rewritten anyway on the next sync
  (every share is republished once per page load).
- Starting a timer still moves a To-do step to In progress, which the
  client sees; that is the step status, not the timer.

**Verified locally**
- Tool loads with no console errors; own-view timer bar unchanged. The
  share path itself was not exercised (needs the database).

---

## v63 — 2026-09-29

**What's new** · Updated piece · [tools/neural-mind-map.html]
### A Mind Map<br>Of Your Own
The Neural Mind Map now grows a map for whoever opens it. The first time,
it asks a few questions — what you do, what you're making, who your people
are, where you're headed. Each answer becomes a branch; write
*Photography: weddings, portraits* and it grows twigs too.

- Your name sits in the top left, your initial in the middle.
- Pick an accent colour. It lights up whatever fires.
- Double-tap the letter and the piece turns white: that's edit mode. Add,
  rename, delete. Double-tap again to save.
- Settings changes your name and colour, or asks the questions again.
- It lives in your browser. Nobody else sees it.

**Neural Mind Map v11 — `tools/neural-mind-map.html`, source `Tools files/Tools/neural_mind_map_v11.html`**
- First run: a question sheet (name + six questions + accent swatches /
  any colour). Answers → branches Work, Projects, Play, People, Learning,
  Goals; unanswered ones are skipped. One node per line (max 8), text after
  a colon → comma-separated children (max 8). The map is then grown fresh
  (`regrow()`), never laid on the baked demo layout.
- Stored at `localStorage["neural-mind-map/personal/v1"]` as
  `{ profile:{name, accent, answers}, map, grown }`. The old
  `neural-mind-map/v9` key is no longer read (it only held local edits of
  the site-structure demo).
- Name top left (`#who`, caps, accent square), initial drawn at the centre
  in place of the mark; both follow the light theme in edit mode. Accent
  drives `THEME.dark.accent`; the light theme gets the same hue darkened
  (white → near-black) so it still reads on white.
- **Settings** (top right): name, accent with live preview (Esc/tap
  outside reverts), Answer the questions again (prefilled, replaces the
  map after a confirm), Start over.
- Edit mode unchanged in feel — double-tap the centre, whole piece inverts,
  double-tap to save and leave — but **the password gate is gone**: it is
  each visitor's own map in their own browser. Bake & export and Revert
  removed (they baked Xavier's demo map into the source file).
- Growth budget per branch now scales with its size
  (`18 + 5×nodes`, 32–72) instead of the demo map's fixed list.
- Hint now says how to edit: "TAP THE LETTER · DOUBLE-TAP TO EDIT".
- Card copy rewritten to match.

**Disclosed**
- Nothing new becomes public. The old edit password `xavierdebelle` is
  removed from the current file, but stays in git history (disclosed v34).
- `scan_tool.py` still reports "storage: none" — its pattern misses keys
  containing `/`. Same blind spot noted in v34.

**Verified**
- Local server, desktop 800×600 and phone 375×812: form → map blooms with
  the answered branches only; name, initial and accent correct; double-tap
  inverts to white, + Child regrows one cluster in the accent; double-tap
  saves; Settings rename + colour persist across reload with the same
  layout; redo prefills and rebuilds; a crowded branch (8 nodes, 8 twigs)
  grows and pans. No console errors. Test data cleared afterwards.

---

## v62 — 2026-09-29

**What's new** · Budget Tracker · [tools/budget-tracker.html]
### Try It Before<br>You Move
The Budget Tracker has a **Simulate** button. It makes a scratch copy of
your budget: change the rent, add a mortgage, drop an income, and it shows
what that does to each month next to the real numbers. Nothing in it is
saved. End it and your real budget is exactly where you left it.

Also new: an **investment calculator** — what you have now, what you add each
month, a yearly return and a number of years, drawn as a chart. **Export**
now makes a spreadsheet or a printable PDF of every saved month. The old
Import and Export buttons live under **Save session**, for anyone not
signed in to sync.

**Budget Tracker v17 — `tools/budget-tracker.html`, source `Tools files/Tools/budget_tracker_app_v17.html`**
- **Simulate / End simulation:** `simBase` holds the real budget while
  `state` is a deep copy. Every edit, month, template and Copy month works
  inside it. `saveNow()` writes `realState()` only; the sync payload,
  `untouched()` and the Save session file read the real budget too, so a
  simulation never reaches localStorage or Firebase. A change arriving from
  another device mid-simulation updates the real budget underneath and the
  simulation carries on. Loading a saved file ends it. Dashed amber outline
  and a bar comparing real vs simulated: planned left / mo, actual left /
  mo, closing balance (a month only in the simulation shows "new").
- **Investment calculator (Invest):** starting amount, monthly addition,
  yearly return (default 7%), years (default 20). Monthly compounding,
  money added at the end of each month. Final value, total put in, growth;
  stacked area chart (put in / growth) with hover or tap readout; year-by-
  year table. Shortcuts fill in the current month's assets total and
  planned savings. Says plainly it is not a promise or advice.
- **Export ▾:** Spreadsheet (.csv, UTF-8 with BOM) — one row per line,
  asset and monthly summary (opening, each section, remaining, closing),
  planned and actual plus per-month equivalents; names that start with
  = + - @ are prefixed with ' so they can't run as formulas. PDF — a print
  view (overview table, then one page per month with planned vs actual,
  every section and assets) through the browser's Save as PDF.
- **Save session ▾:** Save to a file / Load a saved file — the same .json
  export and import as before, with a note on why you'd want it.
- Storage key, saved shape and sync doc unchanged.

**Verified locally (scratch copy, not signed in — no live database)**
- Simulation: stored budget byte-identical after edits, a new month and a
  save inside it; sync payload kept the real figures; comparison bar
  correct (rent +$600 → −$600 left); ending restored the real month; a
  simulated remote update during a simulation landed in the real budget
  and localStorage while the screen kept the simulation.
- Investment: $10,000 + $500/mo at 7% for 20 years = $300,851, matching
  the closed-form formula; $130,000 put in. Tooltip on hover.
- CSV rows and summary checked; a `=SUM(A1)` name exported as `'=SUM(A1)`.
  PDF document built with overview and a page per month; print called.
- Desktop and phone layouts (menus open as a sheet on phones); no console
  errors. Scan: Firebase and template figures, both already live.

---

## v61 — 2026-09-29

**What's new** · Project Phases · [tools/project-tracker.html]
### Project Phases,<br>easier to find your way
A timer left running in another project now says so, in black, with a
button to jump back to it. A search box finds anything in any project.
Points to discuss can carry a note under them, and both they and the
client's homework can be dragged into order.

**Project Phases v13 — `tools/project-tracker.html`, source `Tools files/Tools/project_tracker_v13.html`**
- Running bar: when the timer belongs to another project it turns black
  with a yellow "Running in <project>" tag, Split is swapped for **Go to
  project**, and the project picker marks that project "— timer running".
- Search box in the top bar (or press `/`): steps, phases, project names,
  homework (open and done), points to discuss and their notes, meeting
  notes and time-log notes, across every project. Open project first,
  arrow keys + Enter, matches highlighted; picking one opens the project
  and tab, expands the phase or note, and flashes the item. Hidden on
  client links.
- To discuss: the quick-add box is a growing text box. One line = quick
  point; Return adds lines, which become the point's note (`body`). Add or
  ⌘/Ctrl+Return saves. Only the first line shows, with a NOTE tag that
  opens it in place; the edit dialog has Point + Note. "Insert the points
  to discuss" in a meeting note brings the notes along, indented.
- Drag to reorder (grip, or arrow keys on it) for To discuss and open
  homework. Homework gains `pos`; items without one get the order they
  used to show in (dated first, soonest first, then oldest), so nothing
  moves on upgrade. New homework goes to the end. `pos` travels in the
  client link, so the client sees the same order.
- Fix: a dialog could open with a black **Delete** button (e.g. the first
  meeting note after deleting something) — every dialog now starts with
  Save.
- Data: `agenda[].body`, `homework[].pos` added; same storage key and sync
  doc. An older page open elsewhere would drop both if it saved — reload
  other devices.

**Verified locally (browser storage, not signed in)**
- Timer from project A shown in black on project B; Go to project; picker
  label. Delete → New note shows Save. Point with note: tag opens/closes;
  mouse drag and arrow keys reorder points and homework and survive a
  reload; old-format homework keeps its dated-first order; search jumps to
  a step in another project and to a note. 375 px phone: no sideways
  scroll. No console errors.

---

## v60 — 2026-09-29

**What's new** · Idea Bank · [tools/idea-bank.html]
### Fewer buttons
The six buttons under the project picker are down to two: your sync
status and **Manage**, which holds New project, Rename, Delete, Export
and Import. A new project can also be started from the picker itself.

**Idea Bank v9 — `tools/idea-bank.html`, source `Tools files/Tools/ideas-v9/`**
- Row under the project picker: sync button (unchanged, now stretches) +
  **Manage ▾** menu (New project, Rename, Delete — greyed with a reason when
  it's the only project — then Export, Import; Sign out appears there only
  when a tool runs without the site-wide account). Each item has a one-line
  hint. Closes on a choice, a tap outside, or Escape.
- Project picker ends with "+ New project…", which opens the same dialog.
- No data or sync change.

**Verified locally (mock database)**
- Menu opens/closes; New project from the menu and from the picker; Delete
  disabled with one project, enabled with two; 375 px phone and desktop,
  no sideways scroll.

---

## v59 — 2026-09-28

**What's new** · Idea Bank · [tools/idea-bank.html]
### Idea Bank,<br>tightened up
Scoring an idea no longer throws it somewhere down the list: it stays put
until you press Re-sort, then takes you to it. Build gets a timer on every
card, a box to add a project straight to Next up, and a way back to
Prioritise. Plan steps can be moved up and down, and long descriptions
show in full.

**Idea Bank v8 — `tools/idea-bank.html`, source `Tools files/Tools/ideas-v8/`**
- Ranking: the old "hold still for 1.4 s" froze the order *after* the new
  score was applied, so the idea jumped at once. Now the order is taken
  before the change and held until **Re-sort by score** (a yellow bar that
  sticks to the bottom of the list); the idea you scored is outlined and
  scrolled into view after re-sorting. Changing tab or area filter re-sorts.
- Build: **Add to build** box (title + area → Next up); ← on a Next-up
  card sends it back to Prioritise; drawer gains **Back to Prioritise** for
  Next up, In progress and Shipped.
- Timer: ▶ Timer on every Next-up / In-progress card, Start/Stop plus
  −15 / +15 min in the drawer. One timer at a time (starting one stops the
  other); starting on Next up moves the card to In progress; shipping,
  parking or sending an idea back stops it. Stored per idea as `spent` (ms)
  and `timerStart` (ms, 0 when stopped), so a running timer carries on
  across reloads and devices. Totals show on cards and in Copy as text.
- Plan steps: ↑ / ↓ to reorder.
- "What it actually is" and Notes grow to fit their text (CSS
  `field-sizing`, with a measured fallback for Safari and Firefox).
- "Copy plan" → **Copy as text**: it copied only when the browser allowed
  the clipboard and said "Plan copied" either way. Now it falls back to the
  older copy method and says plainly when it couldn't.
- Parked: "Not now. Not never." removed.
- Sync: payload carries `ideaBank: 8`. A save from an older page (no
  marker, no time fields) keeps this device's time on those ideas instead
  of wiping it. Same doc (`idea-bank`), same storage key — nothing to migrate.

**Verified locally (mock database)**
- Scoring held the order, bar appeared, Re-sort moved the idea and
  outlined it; quick add → Next up; ← → Prioritised; timer moved a card to
  In progress, switching timers banked the first; steps reordered; ±15 min;
  Copy as text with a real click; long description shown in full; 375 px
  phone, no sideways scroll; synced with the marker and times; a simulated
  v7 save came through with its edit and the times kept.

**Parked, remind Xavier later:** linking Idea Bank to Project Phases for
big projects.

---

## v58 — 2026-09-27

**What's new** · What Is This Website? · [what-is-this.html]
### What Is This<br>Website?
An experiment, a lab, a digital mind map, a place for the tools — and a
page that says so. On the map (About → What is this website?) and in the
Index.

**New page — `what-is-this.html`**
- Built from `who-am-i.html` (the editable-page recipe): same look and
  editor, saves to `pages/what-is-this`. No Firebase change — the `pages`
  rule covers every editable page.
- Map node repointed (was `soon.html#what-is-this`, which now forwards
  here); Index list gains "What Is This Website?".

**Verified locally (mock database)**
- Visitor sees the text, no Edit; Xavier gets Edit, saves to
  `pages/what-is-this` (separate from Who Am I?); 360px phone fits.

---

## v57 — 2026-09-27

**What's new** · Who Am I? · [who-am-i.html]
### Who<br>Am I?
A new page, and a short answer to a long question. It's on the map
(About → Who am I?) and in the Index.

**New page — `who-am-i.html`**
- Title and text, set large; no date. The first paragraph is the big one,
  any after it read as body text. Plain text in: blank line = paragraph,
  links made clickable, nothing parsed as HTML.
- Editable by Xavier: signed in, an **Edit page** bar appears; the editor
  (Title, Text, Save, Cancel) saves to `pages/who-am-i` = `{title, body,
  updatedAt}` in Firebase and the page updates live for anyone reading.
  Nobody else sees Edit, and the rules refuse anyone else's save.
- The words are also built into the page, so it reads correctly before
  anything is saved, if the database can't be reached, or before the rules
  below are published.
- Linked from the map node (was `soon.html#who-am-i`, which now forwards
  here) and the Index list (The Site → Who Am I?).

**Outstanding — Xavier publishes the rules**
- Firebase → Realtime Database → Rules: paste the whole of
  `.claude/skills/add-cloud-sync/assets/firebase-rules.json` (adds a
  `pages` section: public read, owner write) → Publish. Until then the page
  shows its built-in words and Save reports the rules are missing.

**Verified locally (mock database)**
- Visitor: built-in title and text, no Edit. Xavier: Edit → prefilled →
  save → page, tab title and database updated; another device showed the
  change live; a visitor there saw no Edit; with reads refused the page
  keeps its built-in words; HTML typed in shows as text; links clickable.
- Found and fixed: the text column was measured against the small base
  size and came out a few words wide.
- Desktop and 375px phone, page and editor, no sideways scroll.

---

## v56 — 2026-09-27

**What's new** · The Site · [index.html]
### Two Buttons,<br>That's It
Every page's top bar is down to two buttons: **Index**, which opens the
whole site as one list, and **Sign in** (your account, once you're signed
in). The home page drops its shortcuts too — the map is the way in.

**Top bars** (work, tools, food-for-thought, changelog, access, soon, 404)
- The link row is replaced by **Index** + the account button; the
  wordmark stays, linking home. One row on phones too (header 61px, was
  ~135px). Signed in on a phone, the account button shows avatar and dot
  only, so a long status word never reaches the name.
- **Index** (new `assets/site-index.js`) opens the same list as the map's
  own Index button, over the page you're on, with **The Map** and **Close**
  (Esc closes). The list is read from `index.html`, so there is one list to
  maintain; a short fallback list shows if it can't be read.
- The index list gains **Sync & Access**.

**Home page**
- Desktop shortcut buttons removed (Tools, Work, What's New, Instagram);
  only the account button remains in that corner. Phones unchanged.

**Verified locally**
- Desktop and 375/360px: two buttons, one row, no sideways scroll; Index
  opens with all four columns, root-relative links, Map and Close; a
  signed-in "Not approved" button on a 360px phone stays clear of the
  name; home page shows only the account button. Footers unchanged.

---

## v55 — 2026-09-27

**What's new** · Accounts · [access.html]
### One Sign-In<br>For Everything
Sign in once and you're signed in everywhere — every page, and Project
Phases, Budget Tracker and Idea Bank all connect by themselves. An account
button in every page's top bar (and on each tool's sync button) shows
who's signed in and whether sync is on; tap it for your account panel:
your status, your synced tools and when each last synced, and Sign out.

**Site-wide account** (new `assets/account.js`, loaded by every page and
the three synced tools)
- One sign-in for the whole site: a site-wide note (`xdb.account`) tells
  every page and tool this device is signed in, and Google's session does
  the rest — no second popup. Sign out anywhere signs out everywhere on the
  device, other open tabs included.
- Google's account picker is always shown (`prompt: select_account`), so
  switching or adding an account works on shared computers.
- Account button: initial (or Google photo) with a status dot — yellow
  filled = synced, yellow ring = waiting for approval, grey ring = not
  approved — plus a word (Owner / Synced / Waiting / Not approved). In the
  top bar of every page, at the end of the map's shortcuts, and in the
  map's corner on phones (avatar only, clear of the name). Xavier's shows
  a count of requests waiting.
- Account panel: sign in (with a line on what sync is), or name, email,
  status explained, the three tools with "synced 2 min ago" / "syncing —
  nothing saved yet" / "not opened on this device yet", **Sync now** for the
  tool you're in, Sign out ("signs you out of the whole site on this
  device"). Xavier also gets "N waiting → Manage access". Phones: a sheet
  from the bottom.
- A one-time welcome when an account is approved: "You're in. …"
- Food for Thought and the Access page use the same sign-in; Food for
  Thought's desk appears without pressing Write when you're signed in.

**Synced tools** (Project Phases v12, Budget Tracker v16, Idea Bank v7)
- Shared sync code: uses the site account's connection and sign-in when
  it's there, connects automatically when the device is signed in, starts
  syncing when someone signs in from the panel, and its button shows the
  account avatar and opens the panel. Without `account.js` (a tool opened
  on its own) it signs in by itself as before, account picker included.
- Access page: requests from Project Phases now say so (the label map
  used the wrong name).

**Verified locally (mock database)**
- Two devices: a guest signs in from the panel (picker requested) → request
  filed, button "Waiting"; opens Budget Tracker → connected with no tap;
  Xavier signs in from the button → "1 waiting" → Manage access → Approve
  → the guest's open tool goes live with the welcome message; Project
  Phases and Idea Bank connect by themselves; the panel lists the tools
  with Sync now; Sign out in Idea Bank → Project Phases in another tab
  signs out; signing in from a tool's button signs the other tab in.
- Xavier's Food for Thought desk shows without Write; the button appears
  on every page, the map (desktop bar, phone corner); 375/360px phones
  fit with no sideways scroll; a tool without the account file still
  signs in alone; no console errors.
- Found and fixed: tool list said "not synced here yet" for tools that
  were live but had nothing saved; the phone map button could reach the
  name with a long status word (now avatar only there).
- Testing slip, no effect: one test copy of the account file briefly
  pointed at the real Firebase library in the test browser. With no one
  signed in to the real service there, it only reported "signed out" — no
  database reads or writes happen without a signed-in user. Test copies
  are now refreshed only through the mock rewrite.

---

## v54 — 2026-09-27

**What's new** · The Map · [index.html]
### The Whole Map,<br>On Your Phone
On a phone the mind map now opens every branch as soon as it blooms, and
frames the five main nodes at a size you can read — the smaller branches
fan out around them, a drag away. Before, phones opened only the five main
nodes and you had to tap each one.

**Map (phones only — desktop and tablet unchanged)**
- Every branch starts open on small screens too (`expanded: true`; was
  collapsed below 620px).
- New phone fit (`fitSmall`): frames the five main nodes with their labels
  measured, leaving room for the name above and the buttons below (less
  when the phone is sideways). Child branches may run past the edges.
- Lowest zoom 0.42 → 0.28, so pinching out can take in the whole open map.

**Verified locally**
- The preview browser throttles the map's animation to a frame every few
  seconds, so the map was checked through a temporary instrumented copy
  (deleted) that reports its state and steps the real animation: map open,
  all 5 branches open, main nodes on screen at 375×812 (zoom 1.06),
  360×740 (0.98) and 812×375 sideways (0.86); canvas snapshots confirmed the
  labels. Desktop code path untouched.
- Tried and dropped along the way, at Xavier's call: fitting the entire map
  on screen (too small to read on a phone) and stretching it vertically.

---

## v53 — 2026-09-27

**What's new** · Tools · [tools.html#personal]
### Clearer Choices,<br>With an Undo
When two versions of your work meet — a browser with its own data signing
in for the first time, or two devices that both changed things before they
could sync — Project Phases, Budget Tracker and Idea Bank now say so in
plain words: what each side holds, when it was saved, and which is newer.

Whichever version you don't pick is kept on that device for 7 days, with
a Restore button. Restoring can itself be undone.

**The choice** (shared sync code — all three tools)
- First sign-in on a browser with its own data: "This browser already has
  its own work (2 projects, 9 phases, 132 time entries). Your account has …,
  last saved from your iPhone today at 13:57. Which should this browser
  use?" — **Keep this browser's** / **Use my account's**.
- Two devices changed things apart: "This Mac, today at 13:59: … Your
  iPhone, today at 13:57: … (newer)." — **Keep this Mac's** / **Use the
  iPhone's**. Two devices with the same name read "your other Mac".
- The status button says **Pick a version** (was "Both changed").
- Summaries: Project Phases counts projects, phases and time entries;
  Budget Tracker months and the latest month; Idea Bank projects and ideas.

**Backup and undo**
- The version not chosen is saved on this device for 7 days
  (`<storage key>.backup`). The bar says what was kept and offers
  **Restore it** / **OK**; after a restore, **Switch back** / **OK**.
  Restoring makes that version the newest edit and syncs it; the version it
  replaced becomes the backup. The note stays until OK; older than 7 days,
  it's gone.
- Sources: `project_tracker_v11.html`, `budget_tracker_app_v15.html`,
  `ideas-v6/` (Idea Bank's buttons now take their labels from the sync code).
  Shared core still byte-identical across the classic tools and the skill.

**Verified locally (mock database, never the live one)**
- Project Phases: first-sign-in wording; Use my account's → backup →
  Restore → Switch back → OK; two same-named devices, one offline-edited
  while the other changed → both-changed wording with times and "(newer)";
  Keep this Mac's → cloud takes it, the other device follows live with no
  prompt; Restore brings the other version back everywhere.
- Budget Tracker: first sign-in, Use my account's, Restore (synced).
- Idea Bank: wording and relabelled buttons render in the redesigned bar;
  Use my account's → Restore → Switch back → OK.
- A backup older than 7 days no longer shows.
- Found and fixed during testing: the status still read "Both changed";
  identical counts on both sides were unhelpful (added phases, and a time
  for this device's side); "already has budget of its own" → "its own
  budget".

---

## v52 — 2026-09-27

**What's new** · Project Phases · [tools.html#personal]
### Notes, Homework,<br>Real Times
Project Phases has a new **Client** tab for each project: meeting notes,
the points you want to raise next time, and the client's homework — what
they owe you, with due dates that turn red when they slip. Clients see
their homework on their client link.

Logging time by hand now takes real start and end times. Type any two of
start, end and duration and the third fills itself in.

**Client tab** (per project, synced)
- **Client homework** — quick add with an optional due date; overdue /
  due today / due tomorrow labels; tick off to a "Done" list with the date;
  edit, delete. The tab shows a count of what's open.
- **To discuss** — points for the next meeting; tick as discussed, "Clear
  discussed" removes them.
- **Meeting notes** — dated, titled, free-text notes, newest first; long
  notes fold with "Show all". "Insert the points to discuss" drops the open
  points into the note.
- Client links now include **homework only**, read-only, under a
  "Homework" tab. Points to discuss and meeting notes never leave your
  account.

**Time entries**
- The Log time / Edit time entry dialog has Start, End and Time spent,
  kept in step; an end before the start means the next day; a live summary
  line shows the result and warns when it overlaps another entry.
- Refused: under a minute, over 24 hours, ending in the future. Only a
  duration still works as before.
- Editing a running timer now moves its start and **keeps it running** —
  in v9 saving that dialog quietly stopped the timer.

**Keeping older pages from losing the new items**
- A page still on v9 (a phone not yet reloaded) saves projects without the
  Client tab's items. v10 marks its own saves; when a copy written by an
  older version reaches it — from the cloud or from this browser's own
  storage — it restores the items and sends them back, and it re-fetches
  the cloud copy once rather than trusting a stripped local one. If that
  device also had unsynced edits it asks, and "Keep this device" carries
  the client items across.
- Real deletions made in v10 are respected everywhere.
- Saved as `Tools files/Tools/project_tracker_v10.html`. Shared sync code
  unchanged (still byte-identical to the skill's copy).

**Verified locally (mock database, never the live one)**
- Client tab: add/tick/edit/delete in all three sections, due labels,
  counts, done list, HTML typed in shown as text, notes ordering, "Show all",
  insert points; works on the starter project and on a project made with
  New project (found and fixed: those two paths created projects without
  the new lists).
- Time dialog: start+end, start+duration, end+duration, crossing midnight,
  overlap warning, future and zero-length refused (found and fixed: equal
  start and end read as 24 hours), editing an entry, moving a running
  timer's start.
- Mixed versions, two devices: v9 edits while v10 holds notes → restored,
  both changes kept, settles with no loop; a v9 device that had absorbed a
  stripped copy upgrades → pulls the full copy (found and fixed during
  testing — it initially trusted its stripped copy); offline v9 edits then
  upgrade → asks; keep this device → offline edit + all client items; a
  deletion on the upgraded device propagates.
- Client link: homework present, notes/points absent, read-only.
- Desktop and 375px phone (found and fixed: time-spent field squeezed on
  phones); no console errors.

---

## v51 — 2026-09-25

**What's new** · Tools · [access.html]
### Bring Your<br>Own Account
Project Phases, Budget Tracker and Idea Bank can now sync for friends and
family too — by invitation. Sign in with Google in any of them (or on the
new Access page) and your request comes to me; once it's approved, your own
data follows you between phone and computer, live.

Every tool now starts clean, too: a fresh budget with the usual lines at
zero, a blank starter project, neutral idea areas. And anyone approved can
make client links in Project Phases.

**Sync by invitation**
- New `access.html`. Signed out: what sync is, sign in to ask. A signed-in
  friend: waiting / approved (with links to the three tools) / not
  approved. Xavier: live lists of requests (Approve, Decline), members
  (Remove) and declined accounts (Allow again). Approve and decline are one
  atomic write each. Not in the main nav; linked from the tools page intro,
  its footer, and every sync message.
- Shared sync core (all three tools; Idea Bank's component port too): after
  sign-in, Xavier's account syncs as before; any other account is watched
  live at `members/{uid}`. Not a member → files `requests/{uid}` once per
  session and shows "Access requested"; refused (declined) → "No access".
  Both keep the tool fully local. Approval starts sync without a reload;
  removal stops it. Messages link to the Access page.
- Each account's data stays under its own `users/{uid}`. Removing someone
  keeps their stored data for if they come back.

**Neutral starting data (new accounts and signed-out visitors)**
- Project Phases: a fresh browser gets a generic "My project" (Discovery /
  Design / Build / Launch) instead of the Cours à Bois plan, which is gone
  from the file. v9, `Tools files/Tools/project_tracker_v9.html`.
- Budget Tracker: the usual lines at $0 instead of a sample couple's budget;
  the worked-example templates are unchanged. v14,
  `budget_tracker_app_v14.html`.
- Idea Bank: areas Work / Personal / Home / Money / Health, general prompts,
  "e.g. Side project" placeholder. Areas already used on ideas still appear,
  so an existing bank keeps its own. v5, `Tools files/Tools/ideas-v5/`.
- Existing data is untouched everywhere; only what a fresh browser starts
  with changed.

**Client links for everyone approved**
- Every link now records `owner`. The rules let only that account (or
  Xavier) change or remove it, so members can make links and nobody can
  touch another's. Xavier's existing links gain an owner the next time
  they refresh.

**Rules** — new full ruleset in
`.claude/skills/add-cloud-sync/assets/firebase-rules.json`: `users` for
owner + members; `members` (owner writes, each member reads their own);
`requests` (an account may file its own, with its real email, unless
declined or already a member); `blocked` (owner only); `shares` with
owners; `blog` unchanged.

**Outstanding — Xavier publishes the rules**
- Paste the whole of `firebase-rules.json` into Firebase → Realtime Database
  → Rules → Publish. Until then nothing changes for Xavier (his own sync
  never depends on the new sections) and friends see "No access"; the
  Access page's lists say the rules need the members section.
- Food for Thought's `blog` section is included, so this also completes
  that earlier outstanding item if it wasn't done.

**Verified locally (mock database, never the live one)**
- 25 rule checks over HTTP: requests only for yourself, only with your own
  email; no self-approval; members can't read the member list or anyone
  else's data; declined accounts can't re-ask; members can't overwrite,
  delete or claim another's client link; removed members lose their data
  and links; Xavier can do all of it.
- Two devices, end to end: a fresh visitor sees the neutral budget; the
  brother signs in → "Access requested", request lands, his edit stays
  local; Xavier approves on the Access page → the brother's open tool goes
  live with no reload and uploads to his own space only; his Project Phases
  starts as "My project", makes a client link owned by him that opens
  read-only elsewhere; his Idea Bank shows neutral areas and goes live;
  Remove → his tool drops to "Access requested" with the link, local data
  kept; Decline → "No access" in the tools and "Not approved" on the Access
  page; Allow again + Approve → back live with his data, no conflict.
- Xavier's own sync unchanged: edit and push, and a fresh device takes his
  cloud copy quietly.
- Desktop and 375px phone, no horizontal scroll; no new console errors.
- Test harness fixes found on the way: the mock now keeps an already
  signed-in account on sign-in (like Google), sends the account email so
  the request rule can be checked, supports multi-path updates, and drops
  emptied parents like the real database.

---

## v50 — 2026-09-22

**What's new** · Idea Bank · [tools.html#personal]
### Idea Bank,<br>Redesigned
Idea Bank now wears the site's own look — black, white and one volt of
yellow — with a big header showing how many ideas are in the pile, shipped
and in flight. Your ideas, projects and live sync carry over untouched.

**Idea Bank — redesign**
- Replaced with Xavier's redesign, archived as `Tools files/Tools/ideas-v4/`
  (`ideas-v4.html` plus the files it needs).
- Built with the site's design system, so it is no longer a single file: the
  page loads `tools/idea-bank/support.js` (the design runtime), the design
  system bundle under `tools/idea-bank/_ds/`, and `idea-bank-sync.js`. At
  runtime it also loads React, ReactDOM and Babel from unpkg.com, each pinned
  with an integrity hash.
- Site copy only: asset paths point into `tools/idea-bank/`; the header and
  footer links (placeholders in the design file) now go to the map, work and
  tools pages, and the footer's Project Tracker link to
  `project-tracker.html`; added a page title and icon.
- Sync: `idea-bank-sync.js` is the shared sync core, ported to paint through
  the component instead of the DOM. Same document (`idea-bank`), same local
  key (`ideabank.v1`), same saved shape — so v3 and v4 read each other's data.

**Home**
- Removed the Food for Thought button from the map's shortcut bar (the map
  node and the text index still link to it). The 900px breakpoint added for a
  fifth button is reverted to 820px.

**Verified locally (mock database, never the live one)**
- Upgrade: a device holding a signed-in v3 bank (two projects, steps, tags,
  scores, dates) opened v4 — every idea identical, still "Live", and no write
  to the cloud on load.
- v4 and v3 on two origins as two devices: an idea added in v4 appeared live
  in v3 and vice versa; saved ideas keep exactly v3's fields.
- Enter-to-add and "Add to the pile" work; desktop and 375px phone checked,
  no horizontal scroll.
- Known and harmless: the design runtime logs one "Cannot set properties of
  undefined (setting 'jsx')" on load — the component bundle is tried once
  before React is ready, then loaded properly.

---

## v49 — 2026-09-22

**What's new** · Project Phases · [tools.html#personal]
### Project Phases,<br>Redesigned
Project Phases has a new look in the 333 Photo & Design style: a proper
header with the 333 mark, the open project's name in large type across the
top, and new type and colours throughout. It works exactly as before —
phases, the timer, Split, sync and client links are all unchanged.

**Project Phases — visual redesign**
- Replaced with `Tools files/Tools/project_tracker_v8.html` (Xavier's
  redesign of v7).
- New header with the 333 Photo & Design mark, a hero showing the open
  project's name (kept in step with the project picker, including in client
  view), restyled throughout. Page title is now "Project Phases · 333 Photo".
- Fonts: Adobe Fonts kit `zxm4vjv` (Owners) plus Inter Tight from Google
  Fonts. The Adobe kit is new to the site; it serves on this domain.
- Split bar colours follow the new palette.
- Logic unchanged: the only script changes are the split colours and the
  small block that mirrors the project picker into the hero. Sync core, client
  links and Split are line-for-line the v7 code, so no sync re-test was
  needed.

---

## v48 — 2026-09-22

**What's new** · Food for Thought · [food-for-thought.html]
### Food for<br>Thought
A new page for writing. Short pieces on what I'm reading, watching, building
and arguing with, newest first, each with its own link.

New posts show up for anyone who has the page open, without a refresh.

**New page — `food-for-thought.html`**
- Public blog: title and body per post, newest first, numbered, dated, with a
  reading time and a permanent link (`food-for-thought.html#<post id>`).
- Body is plain text: blank line = new paragraph, single line break kept,
  `http(s)` links made clickable. Nothing typed is ever treated as HTML.
- Writing: "Write" in the footer signs in with Google. Xavier's account gets a
  composer above the posts (title, body, Publish) and Edit / Delete on every
  post. Any other account is told it can only read. Publishing, editing and
  deleting are live for every reader at once.
- The draft of a new post is kept on the device until it publishes, and
  survives an edit of another post in between. If the connection drops, the
  text stays, and retrying can't post the same thing twice (the post keeps
  its id until it lands).
- Stored in the existing Firebase Realtime Database (`xdb-tools`) at
  `blog/posts/{id}` = `{title, body, createdAt, updatedAt}`. Anyone can read;
  only Xavier's account can write — enforced by the rules, not the page.

**Site**
- "Food for Thought" added to the top navigation and footers of every page,
  the map's shortcut bar and the text index. The map's Personal → Food for
  Thought node now opens the page; the old `soon.html#food-for-thought` link
  forwards to it.
- Map: the shortcut bar now hides below 900px (was 820px). With five buttons
  it covered the name between 821 and ~850px.

**Outstanding — Xavier publishes the rules**
- The page shows "not open to readers yet" until the Firebase rules gain a
  `blog` section. Add this inside `"rules"`, beside `users` and `shares`:

      "blog": {
        ".read": true,
        "posts": {
          "$post": {
            ".write": "auth != null && auth.uid === 'jGJdt3h4EeaOL3mYWUHA4yMZsRx2'",
            ".validate": "newData.hasChildren(['title', 'body', 'createdAt'])",
            "title": { ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 200" },
            "body": { ".validate": "newData.isString() && newData.val().length <= 50000" },
            "createdAt": { ".validate": "newData.isNumber()" },
            "updatedAt": { ".validate": "newData.isNumber()" },
            "$other": { ".validate": false }
          }
        }
      }

**Verified locally (mock database, never the live one)**
- Two browser origins as two devices: publish from the author, reader sees it
  live; edit keeps `createdAt` and updates in place; delete asks first
  (declining keeps it); HTML in a body renders as text; link trailing
  punctuation excluded; draft restored after reload and after an edit;
  offline publish keeps the text and a retry lands exactly once; another
  Google account sees no composer or edit buttons and its forced write is
  refused; sign-out clears the author state; `#<id>` scrolls to the post;
  refused reads show "not open to readers yet".
- Found and fixed during testing: saving an edit threw away a parked new-post
  draft; "Cancel edit" showed when nothing was being edited; phone post
  details overflowed the screen.
- Against the real Firebase library (read only): the page loads, the read is
  refused as expected before the rules exist, no console errors.
- Desktop, 860–905px map and 375px phone layouts checked.

---

## v47 — 2026-09-22

**What's new** · Liquid Silver · [tools.html#art]
### Full Screen,<br>On A Phone Too
Tapping a piece in Liquid Silver now fills the screen on a phone, the way it
always has on a laptop. iPhones never allowed a page to make anything but a
video full screen, so the tap did nothing at all there.

Tap a piece to open it, tap it again — or the ✕ in the corner — to go back to
the six.

**Full screen on mobile**
- Native full screen is still used where the browser has it (laptops, Android
  Chrome). Where it doesn't, or where it's refused, the piece is laid over the
  whole viewport instead, so the result is the same.
- A ✕ button sits in the top corner, clear of the notch and the rounded
  corners, because there is no browser chrome to escape with on a phone.
- Esc closes it on a laptop, and leaving full screen from the browser's own
  control drops the overlay with it.
- The renderer refits to the new size on the way in and out — full resolution
  when open, back to the tile when closed.
- The other five pieces stop drawing while one is open, which is what keeps it
  smooth on a phone.

**Verified in a real browser, at phone and laptop size**
- Phone (390×664, native full screen removed as on iOS): tap grows the piece
  from 129×332 to the full 390×664, canvas rebuilt at 780×1328, ✕ shown; ✕ and
  a second tap both return to the grid.
- Laptop (1280×800): tap enters native full screen on the piece itself; Esc
  exits and clears the overlay; all six pieces resume drawing.

---

## v46 — 2026-09-18

**What's new** · Project Phases · [tools.html#personal]
### Forgot To Switch?<br>Split It
Deep in the work, it's easy to leave the timer on the wrong step. Any time
entry — including the one running right now — can now be split between steps
after the fact.

Tap the bar to cut it, drag a cut to where you actually switched, or type the
exact time, then give each piece its step. The pieces always add up to exactly
the time that was logged: nothing lost, nothing counted twice. Split the running
timer and the last piece keeps running on the step you're really on.

**Split time entries**
- ✂ Split on every row of the time log, and a Split button beside Stop on the
  running timer.
- Editor: a bar of the entry's span with draggable cuts (click the bar to add
  one), exact time fields, arrow keys to nudge a focused cut by a minute (five
  with Shift), "+ Add a cut" to halve the longest piece, and a bin on each
  piece to remove its cut. Each piece gets a step and its own note.
- Pieces are contiguous and exactly cover the original entry; every piece is
  at least a minute. Neighbouring pieces left on the same step save as one
  entry. The first piece keeps the entry's id; a step that was "To do" becomes
  "In progress" when it receives time, as with the timer.
- Splitting the running timer closes the earlier pieces and leaves the last
  one running. If the timer is stopped (here or on another device) before you
  save, a cut past the stop is refused rather than restarting the timer.
- Entries crossing midnight show dates, and a typed time means the first such
  time after the previous cut.
- Save refuses anything that isn't a clean, forward, minute-or-longer set of
  pieces, and an entry that changed on another device while open.
- Client view: the Split controls are hidden and refused, like every other edit.
- Saved as `Tools files/Tools/project_tracker_v7.html`.

**Verified locally (no live database involved)**
- 31 checks, all passing, driven through the real modal: button in the log
  row; opens with a midpoint cut; click, typed, arrow-key and dragged cuts,
  including a drag clamped at its neighbour; an impossible typed time refused;
  add and remove a cut; save gives three contiguous entries summing to the
  original 3h with the right steps, times, id, notes and statuses;
  same-step neighbours joined; running timer split from the running bar keeps
  running on the new step with the bar updated; a timer stopped before the cut
  is refused; a sub-two-minute entry is refused; an overnight entry shows dates
  and accepts a time after midnight.
- Found and fixed during testing: with a zero-width layout (a hidden preview
  pane), a drag computed `NaN` times and saved broken entries. Measurements are
  now ignored when there is nothing to measure against, and save validates
  every piece — a deliberately corrupted cut was refused.
- Desktop and phone layouts checked. No console errors.

---

## v45 — 2026-09-16

**What's new** · Budget Tracker · [tools.html#personal]
### For The Things<br>That Happen Once
Every line in the Budget Tracker now has a **Once** frequency (shown as 1×).
A car repair, a tax refund, a one-time bill — it counts in full in the month
you add it, and it is never copied into the months after.

If it pushes the month over budget, that still carries into next month's
starting balance, the way real money does. It just doesn't come back as a
recurring cost.

**Once frequency**
- New `once` frequency: counts at full value, in its own month only. Marked
  in violet with a note under the line ("One-off · only in September 2026 —
  not copied to later months"); its delete button no longer claims it removes
  anything from later months.
- **Never leaves its month:** edits, renames and deletes of a one-off are not
  carried forward; new months (forward or back-filled) never inherit one;
  Copy month doesn't copy them and leaves a target month's own one-offs in
  place; templates never save one, and applying a template in replace mode
  keeps the month's one-offs.
- **Switching frequency:** turning a recurring line into Once removes the
  copies later months were given; turning a one-off into a recurring line
  carries it forward like a new line.
- **Rows are now lined up across months by position among recurring lines
  only.** Edits find their matching line in later months partly by position,
  so a one-off sitting mid-list would otherwise have shifted a new, still
  blank line onto the wrong row. With no one-offs anywhere, matching is
  exactly what it was.
- The goals calculator's average monthly saving ignores one-offs — a single
  big month should not change what a typical month looks like.
- Nothing about sync changed: one-offs travel inside their month.
- Saved as `Tools files/Tools/budget_tracker_app_v13.html`.

**Verified locally (no live database involved)**
- **Regression:** the same edit sequence with no one-offs — add, rename,
  amount, reorder, delete, frequency change, blank-named row, asset reorder,
  copy month — produced a byte-identical budget in v12 and v13.
- **One-offs, 29 checks, all passing:** stays in its month and out of later
  ones; month total and next month's opening balance move by exactly its
  amount while next month's own flow doesn't; goals average unchanged; moving
  it moves nothing elsewhere; with a one-off above them, a newly typed line
  and a second blank line land on the right rows in later months and an
  existing line's edit reaches the right row; deleting a line below it removes
  the right one; once → monthly → once adds then removes the forward copies;
  forward and back-filled new months, Copy month, template import, template
  export and template replace all behave as above; choosing 1× from the
  dropdown works; a database-shaped sync copy keeps the frequency. Desktop and
  phone layouts checked. No console errors.

**Outstanding**
- Reload the Budget Tracker on every device. A tab still on the previous
  version doesn't know "Once" and would treat those lines as monthly.

---

## v44 — 2026-09-15

**What's new** · Idea Bank · [tools.html#personal]
### One Bank,<br>Many Projects
The Idea Bank can now hold separate projects — one for each business, client
or part of life — each with its own pile, priorities and board. Start one,
rename it, switch between them from the top bar, or move an idea from one
project to another without losing its score, plan or notes.

Your existing ideas are waiting in the first project, "My ideas".

**Projects in Idea Bank**
- Project picker with idea counts, New, Rename and Delete in the top bar.
  Names must be unique. The last project cannot be deleted.
- Deleting asks first and offers Undo; moving an idea (from the idea panel's
  new Project picker, shown once there are two projects) offers Undo too.
- Brain dump, Prioritise, Build, Shipped & parked, areas, stats and search all
  work on the open project.
- **The rest of the tool was left untouched.** `state.ideas` is now a live,
  non-enumerable view of the open project's list, so every existing capture,
  rank, board and archive path works as before, and saving, export and sync
  only ever see ideas inside their projects — never a second copy.
- An existing bank migrates into "My ideas" with a fixed id, so phone and
  laptop migrating the same bank agree. Old export files still import (as one
  project); new exports carry every project.
- **Sync** carries every project and its ideas. Which project is open, and the
  theme, stay per device — switching projects is not an edit. A copy written
  by a device still on the single-bank page is refused wherever it could erase
  projects, instead of flattening them.
- Shared sync core unchanged and still byte-identical to the other tools.
- Saved as `Tools files/Tools/ideas-v3.html`.

**Verified against the local Firebase stand-in — no writes to the live database**
- A saved single-bank browser opened as "My ideas (2)" with both ideas.
- New project: duplicate name refused (case-insensitive), then created and
  opened empty; an idea captured there stayed out of "My ideas".
- Rename kept the prefill and updated the picker. Move to another project and
  Undo both updated counts and piles. Delete asked "Delete “333 Photo Co” and
  its 1 idea?", removed it, and Undo restored it with its idea.
- Saved data: `version, projects, currentId, theme` — no top-level ideas.
- Two devices: the migrated computer uploaded both projects on sign-in
  (without `currentId` or theme); switching projects did not change the cloud;
  the phone pulled both; a project it created appeared on the computer live
  without moving the computer off its open project; an old single-bank copy
  arriving was refused and all three projects stayed. Phone-width header
  checked. No console errors.

**Outstanding**
- Reload the Idea Bank on every device — a tab still on the single-bank page
  cannot read projects (it refuses the copy rather than damaging it).

---

## v43 — 2026-09-15

**What's new** · Idea Bank · [tools.html#personal]
### Your Ideas,<br>On Every Device
The Idea Bank now syncs the same way Project Phases and the Budget Tracker do.
Sign in on your phone and your laptop, jot an idea down on one, and it shows
up on the other a second or two later. Stay signed out and nothing changes:
it saves only in your own browser.

**Sync added to Idea Bank**
- Same shared sync core as the other two tools, verified byte-identical in all
  three, plus a small adapter. Stored at `users/{uid}/tools/idea-bank` under
  the existing locked rules — no console change needed.
- The ideas travel; the light/dark choice stays per device.
- Storage key unchanged (`ideabank.v1`), so existing ideas carry over. A
  browser that already holds ideas and has never synced is treated as holding
  unsynced work, so it asks rather than being overwritten; an empty one takes
  the cloud copy quietly.
- An empty cloud copy is refused rather than wiping the bank.
- Sign in / Sync status / Sign out sit in the header; the "both changed" bar
  uses the tool's own warning colours in light and dark.
- Saved as `Tools files/Tools/ideas-v2.html`; `ideas-v1.html` untouched.

**Verified against the local Firebase stand-in — no writes to the live database**
- Visitor: no Firebase SDK requested before Sign in is pressed.
- Signing in with an empty bank wrote nothing; adding an idea reached the
  cloud; toggling the theme did not count as an edit.
- Second device pulled on sign-in; an idea added on it appeared on the first
  live, and a deletion on the first disappeared from the second live.
- Offline idea on the phone showed "No connection", then "Both changed" on
  reconnect instead of overwriting; Keep cloud copy took the other device's
  ideas. Sign-out works. No console errors.

**Outstanding**
- End-to-end on the real Firebase, which only Xavier can do.

---

## v42 — 2026-09-15

**What's new** · Project Phases · [tools.html#personal]
### A Link For<br>The Client
Every project in Project Phases can now have its own client link. Your client
opens it and sees the project exactly as you do — phases, steps, estimates,
logged time and notes — updating live as you work. They cannot change, add or
remove anything.

Turn a link off, or replace it with a new one, whenever you like.

**Client links**
- "Client link" button in the top bar, shown only when signed in as the owner.
  Create, copy, open, replace with a new link, or turn off.
- Each link carries a random 128-bit token. A copy of just that project —
  no other projects, no sync bookkeeping — lives at `shares/{token}` and is
  refreshed after every completed sync, so the client sees changes within a
  couple of seconds.
- Turning a link off deletes that copy; the old link then shows "This link is
  not active". Replacing does the same and issues a new token. Deleting a
  shared project turns its link off too, and the confirmation says so. A
  device that is signed out when a link is turned off queues the removal and
  finishes it on next sign-in.
- The token travels with the project, so a link made on the laptop keeps
  updating from the phone.
- **The client page is the tool itself, opened with `#view=<token>`.** In that
  mode it never reads or writes the visitor's storage, never loads sign-in,
  hides every editing control, and a capture-phase guard refuses those
  controls even if one were showing. Tabs, expanding phases, log filters and
  the CSV download still work. The token sits in the URL fragment, which
  browsers do not send to the server.
- The real protection is the database rules: `shares` can be read only by
  exact token (no listing) and written only by the owner uid.
- The shared sync core is untouched and still identical to Budget Tracker's;
  this tool listens in on its status changes instead of adding a hook.

**Verified against the local Firebase stand-in — no writes to the live database**
- Button hidden before sign-in, shown after, hidden again after sign-out.
- Creating a link writes only the project and its log; the token syncs into
  the owner's document.
- Client on a separate origin: project name and "View only" shown, no editing
  controls visible; clicking status, timer, delete, edit, add and drag
  handles changed nothing and opened nothing; tabs and collapse worked;
  storage stayed empty throughout.
- Owner rename, status change and a new log note reached the client live, with
  the client's collapsed phase kept.
- Turn off → client shows not active without reloading. Create, then replace →
  only the newest token remains. Delete shared project → its copy removed, no
  queued leftovers. No console errors.
- Saved as `Tools files/Tools/project_tracker_v6.html`.

**Outstanding**
- **The Firebase rules must gain a `shares` section before links work.** Until
  then, creating a link shows "The database refused the client link".
- A link turned off on one device could come back if another device holding
  the old copy chose "Keep this device" in a sync conflict before seeing the
  change. Narrow, but real — replace the link if that ever happens.

---

## v41 — 2026-09-15

**What's new** · Budget Tracker &amp; Project Phases · [tools.html#personal]
### Changes Now<br>Arrive Live
Sign in on your phone and your laptop, change a number on one, and it appears
on the other within a second or two — no reloading, no tapping to sync.

Signed out, nothing is different: both tools still save only in your own
browser.

**Sync was broken in two ways — both mine, both fixed**
- **After any page load, sync stuck on "Syncing…" and never pulled.** Sign-in
  set the status to working, and the sync pass refused to start while the
  status said working. A freshly opened computer therefore never picked up
  phone edits — exactly what Xavier reported. Pulls only resumed once that
  device had itself pushed something.
- **Edits were pushed without looking at the cloud first.** The conflict check
  ran only on the load/focus path; the save path wrote straight over whatever
  was there. Reproduced: a phone that had never pulled overwrote the
  computer's newer budget on its first keystroke. Silent data loss, not a
  cosmetic bug.
- Project Phases also stamped an "edit" every time the page was hidden, so an
  untouched phone looked changed to the other device.
- Both were in Project Phases since v37 and in Budget Tracker since v40.

**Rebuilt as one shared sync core**
- Both tools now carry an identical sync block; everything tool-specific
  lives in a small adapter above it. No more two drifting copies.
- **Every write is read-compare-act.** A device that is behind cannot
  overwrite a newer copy; if both changed, it asks.
- **Live:** the cloud copy is watched while signed in. A device ignores the
  echo of its own writes.
- One sync pass at a time; anything that asks mid-pass gets another pass
  afterwards instead of being dropped.
- Edits arriving mid-push are not lost: if the data changed while a write was
  in flight, it stays marked unsynced and goes out next.
- Stamps always move forward past the watermark, so a phone clock a second
  behind the laptop cannot make a fresh edit look older than the copy.
- Going to the background flushes pending saves and sends them immediately,
  since a phone suspends the page soon after.
- A change arriving while the cursor sits in a field puts the cursor back.
- Project Phases now syncs projects and the time log but not which project is
  open, and no longer loads the Firebase SDK for visitors. It gains the
  existing-data guard Budget Tracker had.
- Label reads **Live · hh:mm** when connected.

**Verified against a local stand-in for Firebase — no writes to the live database**
- Built a mock Realtime Database (drops empty arrays/objects like the real one,
  echoes a client's own writes before acknowledging them) and ran two browser
  origins as two devices.
- The failure reproduced on the v40 code first: stuck "Syncing…", no pull on
  the phone, phone edit overwrote the computer.
- New Budget Tracker: sample-only device signs in without writing; edit
  reaches the cloud; second device pulls on sign-in; edits appear live in both
  directions with no reload or focus; offline phone edit shows "No connection",
  then "Both changed" on reconnect instead of overwriting; Keep this device
  pushes and the computer updates live with its cursor kept in the field;
  reload stays Live; sign-out works. No console errors.
- New Project Phases: same live round trip; a copy written by the old v39
  shape (full state, empty phase without steps, another device's current
  project) adopts correctly and keeps the local open project; an empty cloud
  copy is refused and nothing is wiped.
- Saved as `Tools files/Tools/budget_tracker_app_v12.html` and
  `project_tracker_v5.html`. Storage keys unchanged.

**Outstanding**
- Any tab still open on the old version keeps the old behaviour until
  reloaded — reload on every device.
- Data written while the bugs were live cannot be recovered by the fix. If a
  budget or project looks wrong, the device still holding the right version
  will show "Both changed" once edited; choose Keep this device there.
- End-to-end on the real Firebase, which only Xavier can do.

---

## v40 — 2026-09-14

**What's new** · Budget Tracker · [tools.html#personal]
### Your Budget,<br>On Every Device
The Budget Tracker can now follow you between phone and laptop, the same way
Project Phases does. Sign in and your months and saved templates are kept in
step; stay signed out and it behaves exactly as it always has, saving only in
your own browser.

If both devices changed since they last agreed, it stops and asks which copy
to keep rather than quietly picking one.

**Sync added to Budget Tracker**
- Same module and same locked project as Project Phases (`xdb-tools`), stored
  at `users/{uid}/tools/budget-tracker`. The published rules already cover
  every path under the owner's uid, so no console change was needed.
- Saved as `Tools files/Tools/budget_tracker_app_v11.html`; v10 untouched.
  Storage key unchanged (`debelle.budget-tracker.v3`), so existing budgets
  carry over.
- **Months and custom templates sync as one document. The month being viewed
  does not** — flipping months on the phone should not make the laptop think
  something changed.
- **Edits are detected by content, not by save calls.** This tool re-saves on
  load, on month changes and on the way out; stamping every save would have
  made every device permanently "disagree". A fingerprint of the synced data
  decides instead.
- **A device that already held a budget before sync existed is marked as
  holding unsynced work.** Without that, its missing watermark reads as "never
  edited" and the cloud would replace it silently on first sign-in; now the
  worst case is being asked. A device holding only the untouched sample budget
  is not marked, so a new phone takes the cloud copy without a question.
  Project Phases lacks this guard — harmless there now that both devices have
  synced, but worth carrying into Idea Bank.
- **The Firebase SDK is no longer fetched for visitors.** It loads only after
  Sign in has been pressed on that browser. Project Phases still loads it for
  everyone (no data sent, but a request made).
- The popup-to-redirect fallback now triggers only on a blocked popup, not
  when the user closes the window — closing it should cancel, not redirect.

**Verified locally (no writes to the live database)**
- Loads with no console errors and no request to `gstatic.com`; sign-in
  control present.
- Reconcile truth table 8/8.
- Opening a new month counts as an edit; switching between existing months
  does not; re-saving right after adopting a cloud copy does not.
- A database-shaped copy — empty sections and assets dropped, templates
  returned as an object — adopts whole: every section rebuilt as a list,
  frequencies kept, current month preserved, templates restored.
- An empty cloud copy is refused rather than wiping the budget.
- Existing budget with no watermark boots marked as unsynced; conflict,
  private and error bars render on desktop and at phone width.

**Outstanding**
- End-to-end sign-in round trip on the live site, which only Xavier can do.

---

## Verified — 2026-09-11

**Project Phases sync is confirmed working end to end**
Closing the items left open across v35–v39.

- `xavierdebelle.github.io` is on the authorised domains list.
- Rules are published and locked to a single uid. Re-checked from outside:
  anonymous requests to the root, `/users`, Xavier's own node, a stranger's
  node and a write probe all return `401 Permission denied`. His own node
  refusing an unauthenticated caller is the point — access needs the account,
  not knowledge of the path.
- Xavier confirms sign-in and sync work on the live site.
- The pilot is therefore done: local-first behaviour for visitors, private
  cloud sync for one account, conflict detection rather than last-write-wins,
  and failures that explain themselves.

---

## v39 — 2026-09-11

**Sync is now private to one account**
- The published rules allowed *any* signed-in Google account its own private
  subtree. Sandboxed from each other, but broader than the original brief,
  which was visitors local and Xavier synced. Narrowed to a single uid.
- The tool checks the account client-side purely as a courtesy: a stranger who
  signs in now reads "Sync on this site is private to one account. Your work
  still saves in this browser exactly as before, and nothing is sent
  anywhere," and no database call is attempted. The rules are what enforce it;
  the check only exists so nobody meets a raw permission error.
- Sign-out is offered to anyone signed in, not only the owner, so a visitor is
  never stuck in a signed-in state they cannot leave.
- The owner uid sits in client source, which is fine — it is an identifier,
  not a credential, and editing it away changes nothing the server does.

**Outstanding**
- Rules must be republished in the console for the lock to take effect; the
  client change alone does not restrict anything.
- End-to-end round trip still unconfirmed, and the authorised-domain entry for
  `xavierdebelle.github.io` was still missing at the time of writing.

---

## v38 — 2026-09-11

**Sync failures now say what is wrong**
- Sign-in was failing on the live site with nothing shown but "Sync failed".
  The cause was `auth/unauthorized-domain`: Firebase only allowed `localhost`,
  `xdb-tools.firebaseapp.com` and `xdb-tools.web.app`, so the button could only
  ever have worked locally. Fixed in the console by authorising
  `xavierdebelle.github.io` — no code change needed for that part.
- The real fault was mine: the failure reason was buried in a tooltip, so the
  tool needed a diagnostic run against the Identity Toolkit API to explain
  itself. Errors now appear in the notice bar in plain language, naming the
  actual hostname and the exact console path to fix it.
- Covered: unauthorised domain, provider not enabled, popup blocked, popup
  closed, no network, and rules refusing the account. Anything unrecognised
  still shows its raw code rather than swallowing it.
- The conflict bar's Keep-this-device / Keep-cloud buttons hide on an error,
  since there is nothing to choose between.

---

## v37 — 2026-09-11

**What's new** · Project Phases · [tools.html#personal]
### Your Phases,<br>On Every Device
Project Phases can now follow you between phone and laptop. Sign in and your
projects, phases and time log are kept in step; stay signed out and it behaves
exactly as it always has, saving only in your own browser.

If both devices changed since they last agreed, it stops and asks which copy
to keep rather than quietly picking one.

**Sync switched on**
- Realtime Database wired to Project Phases, project `xdb-tools`.
- **Rules verified before any data went near it.** Unauthenticated `curl`
  against the root, `/users`, and a write probe all returned
  `401 Permission denied`. Confirmed, not assumed.
- Verified in the browser: SDK loads, sign-in control appears, no console
  errors, tool renders and saves as before.
- Config is committed in the clear, which is correct — `apiKey` and
  `databaseURL` are public identifiers that ship in every Firebase web app.
  The rules are the protection.

**Outstanding**
- End-to-end round trip still untested: signing in needs Xavier's Google
  account, so laptop → phone → laptop is his to confirm.
- Rules currently give *any* signed-in Google account its own private subtree.
  Visitors' data would be isolated from his, but it would use his quota. Worth
  a deliberate decision: leave it open, or lock the rules to his uid.
- Budget Tracker and Idea Bank still to adopt the same module.

---

## v36 — 2026-09-11

**Sync moved from Firestore to the Realtime Database**
- Better fit for the shape: the tool's state *is* a JSON tree, which is what
  RTDB stores natively. Firestore would nest it in a document with a 1 MiB
  ceiling, and none of what Firestore is actually good at — querying,
  indexing, compound filters — is used here. The tool fetches one blob from a
  known path.
- The deciding factor: RTDB has a REST endpoint, so its rules can be *proved*
  with a single unauthenticated `curl` returning 401. Firestore has no
  equivalently trivial check. After the volleyball database, being able to
  verify the lock rather than trust it is worth more than the feature gap.
- Swap was contained to the storage calls — `getDatabase`/`ref`/`get`/`set`
  replacing `getFirestore`/`doc`/`getDoc`/`setDoc`. Reconcile, watermarks,
  debouncing and the conflict UI are untouched. `databaseURL` is now what
  switches the whole thing on.

**A quirk worth knowing**
- RTDB does not store empty arrays or objects, so `phases: []` reads back as
  absent rather than empty. Verified `normalise()` survives a simulated
  round-trip: top-level `log`, a project with no phases, and a phase with
  emptied steps all come back as arrays, with counts and the current project
  preserved. This is the kind of thing that silently breaks a `.push()` three
  weeks later.

---

## v35 — 2026-09-11

**Project Phases: cloud sync, built but dormant**
- Groundwork for saving tool data across devices, piloted on Project Phases.
  Nothing is visible or different yet: the Firebase config is empty, so no SDK
  is fetched, no network call is made, and the sync controls stay hidden.
  Verified in the browser — zero requests to gstatic, tool renders and saves
  exactly as before.
- Local first by design. Without an account the tool behaves as it always has,
  entirely in localStorage. Signing in adds a second copy under your own user
  id; it never replaces the local one.
- Conflict handling is real rather than last-write-wins, because phone and
  laptop is the actual use case. A watermark records the cloud stamp both
  sides last agreed on, so "both changed since then" is detectable instead of
  silently destroying one side — it stops and asks which to keep.
- Reconcile logic is unit-tested through `window.__app.sync` against an
  eight-case truth table: fresh device, local-only, cloud-only, both idle,
  both changed, first sign-in with existing cloud data. All pass.
- Writes are debounced 1.5s and always trail the local save, so typing never
  waits on the network. Pulls happen on load and whenever the tab regains
  focus, which is the moment a phone edit should appear on the laptop.
- The scanner now reports `www.gstatic.com` for this tool. That is the Firebase
  SDK URL sitting in the source; it is only fetched once configured and signed
  in.

**Outstanding**
- Needs a Firebase project, Google sign-in enabled, Firestore created and its
  rules pasted before any of this does anything. Config goes in `FIREBASE` at
  the top of the sync block.
- No public-facing note this release: none of it is visible to a visitor yet.

---

## v34 — 2026-09-11

**What's new** · Updated piece · [tools.html#art]
### The Map Now Grows<br>This Site
The Neural Mind Map used to branch into placeholder words — reading, cooking,
a cabin somewhere. It now grows the shape of this site instead: the work, the
tools, the ways to get in touch. The piece and the thing it describes are
finally the same object.

- A branch that leads somewhere can be opened. Tap once to arm it, tap again
  to go, so nothing launches from a stray finger.
- Every node still fires when you tap it, and the signal still takes its time
  reaching the other end.

**Landed**

- `tools/neural-mind-map.html` replaced with the v10 engine. Same slug, same
  URL, so any shared link still works.
- Content is now the real site structure — Work, Tools, Connect, About,
  Personal — grown and baked for both the portrait and landscape arrangements.
- Nodes carry an optional link. A node opens only when its box is ticked and
  the address is genuine http(s); `javascript:`, `data:` and other schemes are
  refused, so a stored address can never become script.
- Opening takes two deliberate taps with a 4.5s arming window, cleared when
  the map closes. An earlier build keyed this off "is this node selected",
  which meant a node left selected opened on the very next tap — fixed before
  it shipped.
- Card copy corrected: it promised "double-click to flip the light", which
  this build no longer does. It now describes what the piece actually does.
- Homepage untouched beyond the footer version marker — Xavier asked for the
  art piece only, and the map on `index.html` is a separate build.

**Disclosed**

- The build carries a client-side edit mode behind the password
  `xavierdebelle`. This repo is public, so that string is now public
  permanently, git history included. It guards nothing shared: edit mode
  writes only to the visitor's own browser storage and cannot reach this
  repo, any backend, or what anyone else sees. The real cost is the string
  itself — if it is reused anywhere that matters, change it there.
- `scan_tool.py` reported this file clean and missed both facts. Its password
  pattern only matches `ADMIN_PASSWORD`/`adminPassword` (this one is
  `EDIT_PASS`), and its storage-key pattern rejects keys containing `/` (this
  one is `neural-mind-map/v9`). Worth widening before the next tool relies on
  it.

**Verified**

- Loaded from the local server and used: drag, wheel zoom, tap-to-fire,
  anchors expanding and collapsing, the mark opening and closing the map.
- Link flow exercised end to end with `window.open` stubbed: first tap arms
  and opens nothing, second opens once, arming expires after 4.5s, a node
  without a link never opens anything.
- Bake & export rebuilt a complete HTML file with `fetch` blocked, to prove
  the `file://` path; the exported file was then booted in an iframe and ran.
- No console output on load. 23 nodes, 26 links, no regrow at load, ~1.1ms a
  frame at 1280×820.

---

## v33 — 2026-09-11

**What's new** · Project Phases · [tools.html#personal]
### Steps That Move,<br>Between Phases Too
A plan never survives its first week in the order you wrote it. Every step and
every phase now has a grip on its left: drag it where it belongs, including
into a completely different phase, and the hours already logged against it
move with it.

- Drag the grip and a label follows your finger while a dashed band shows
  exactly where the step will land. Works with a mouse and works with a thumb,
  which it never did before.
- Drop a step onto a phase that is collapsed and it goes to the end of it —
  no need to open the phase first.
- Prefer the keyboard? Focus a grip and press the arrow keys. A step at the
  top or bottom of its phase steps into the next one rather than stopping.
- Editing a step now offers a Phase dropdown, so you can rename it, re-estimate
  it and re-home it in a single save.
- Importing a backup asks for the file instead of asking you to paste the
  contents of it. It reads the file first and tells you what is inside —
  "3 projects · 14 phases · 82 entries" — before you agree to replace anything.

**Reordering, on the board**
- Steps and phases both carry a drag handle. Pointer events rather than HTML5
  drag-and-drop, because the latter does nothing on iOS; `touch-action: none`
  on the grip alone, so a finger on the handle drags while a finger anywhere
  else still scrolls the page.
- The dragged element hides and a placeholder is inserted at the live drop
  position, so the target index is read straight off the DOM with the source
  already out of the way — the same number `moveStep` wants after its splice.
- Dragging near the top or bottom of the window auto-scrolls the board.
  Escape cancels mid-drag and nothing changes.
- Arrow keys on a focused grip do the same two moves. A step leaving its phase
  expands the neighbour it lands in, and focus follows the item across the
  re-render so you can keep pressing.
- Time entries store a `phaseId` alongside the step. A step that changes phase
  rewrites it on every entry, so the log, the filters and the report all agree
  about where those hours belong.

**Import takes a file**
- A drop zone with a file picker, replacing the paste-a-blob textarea. The
  file is read and validated on selection, not on submit, so the button only
  ever commits something already parsed.
- Non-JSON, wrong extension and empty-submit each get their own message, and
  cancelling clears the armed file so a stale one can never be committed by
  the next import.

**Housekeeping**
- The tool Xavier handed over was a browser "save page as" capture of the live
  one: 180KB of it was rendered board HTML that the app throws away and
  rebuilds on every load. Stripped back to empty containers — 242KB to 73KB,
  identical behaviour. Confirmed the capture's code was byte-identical to the
  deployed file first, so nothing on the site was rolled back by taking it as
  the base.
- Storage key is unchanged at `ptt.v1`, so existing projects and time entries
  load untouched.

**Verified**
- Scan clean: no external hosts, no endpoints, no secrets, no personal data.
- Exercised in the browser against the final file: drag within a phase, drag
  across phases, drop onto a collapsed phase, Escape-cancel, arrow keys in
  both directions and across the phase boundary, phase reorder, the modal
  move, all four import paths, plus timer, CSV export, collapse-all and
  delete-step as regressions. No console errors.
- Persistence checked over the local server rather than a `file://` URL, which
  is the only place `localStorage` actually runs: moved a step into another
  phase, reloaded, and found it still there with its time entry re-filed under
  the new phase.

---

## v32 — 2026-09-11

**What's new** · Fixed · [tools.html]
### The Filter Bar,<br>Actually Scrollable
The row of filters on the tools page was wider than the screen it sat on, so
its last few buttons were cut off with no way to reach them. It scrolls
properly now, all the way to the end.

**The chip track overflowed its own container**
- The rail's base rule carries `flex-wrap: wrap`. Turning it into a column for
  phones meant a *wrapping column*, which lays its items out in columns sized
  to their content rather than stretching them to the container. The chip
  track came out 575px wide inside a 390px rail, overflowed, and was then
  clipped by `body { overflow-x: hidden }` — so the tail was both invisible
  and unreachable.
- `flex-wrap: nowrap` on the mobile rail fixes it: the track is now 358px
  inside a 390px bar and scrolls its full range.
- Added momentum scrolling for iOS and a little run-off on the right, so the
  last chip clears the edge instead of sitting flush against it and reading as
  the end of the list.
- Checked at 360, 390 and 900 wide: the track fits its rail, reaches its end,
  and the page never scrolls sideways. Above the breakpoint the rail is still
  a row with the chips wrapping and search on the right.

---

## v31 — 2026-09-11

**What's new** · Fixed · [tools.html]
### The Tools Page,<br>Uncrammed
On a phone the header took three rows, the filter bar was half hidden behind
it, and between them they ate 40% of the screen before a single tool showed.

The header is two clean rows now, the filters scroll sideways in one line, and
nothing sits on top of anything else.

**The tools page on a phone**
- Two sticky elements were both pinned to `top: 0` — the header at z-index 50
  and the filter rail at 30 — so on scroll the rail slid *underneath* the
  header and lost its top half. That is why the chips were clipped. The rail
  now sits below the header, offset by its measured height rather than a
  guessed constant, so it survives the nav wrapping at any width. This was
  broken on desktop too, by 62px.
- Header: 135px → 87px. Five nav items beside the wordmark wrapped to three
  rows; on narrow screens it stacks instead, with the nav as one row that
  scrolls sideways if it must.
- Filter rail: 201px → 100px. Chips now live in their own track that scrolls
  horizontally instead of wrapping, with search full width beneath.
- Sticky furniture overall: 336px → 187px of an 844px screen.
- Section headings stack their number, title and description rather than
  colliding beside each other.

**Housekeeping**
- The stylesheet is requested as `style.css?v=31` so a CSS change is never
  served from cache. Bump it with the version marker. This bit me while
  testing — the fix was live on the server and the page kept using the old
  copy, which is exactly what a visitor would have hit.

---

## v30 — 2026-09-11

**What's new** · The map · [index.html]
### The Map<br>Grew Two Branches
About opened up into Who am I?, the changelog and what this website even is.
A new Personal branch joined it — Food for Thought, Digital Archives, Self
Improvement — and Connect gained a way to submit a tool.

Most of those pages don't exist yet, so they say so plainly rather than
leading nowhere.

**Map rebuilt on the v8 engine**
- Two new clusters and one new leaf: About became a parent (Who am I?,
  Changelog, What is this website?), Personal joined as a fifth cluster (Food
  for Thought, Digital Archives, Self Improvement), and Connect gained Submit
  a Tool. Twenty-two nodes, up from fourteen.
- Taken wholesale rather than porting the branches into the old engine: the
  grown layout is baked per hierarchy and the engine only regrows when the
  node **count** changes, so the old bake would have been stale and the map
  would have regrown on every load. Both baked arrays now match 22 nodes.
- Labels and nesting are exactly as v8 ships them, so the bake stays valid;
  only destinations were added.
- The engine's own bottom hint line came back with v8 and was removed again,
  with its state — it duplicates the page's instruction line and sits on top
  of the controls.

**Where the new branches lead**
- `Changelog` goes to the What's New page, which already existed.
- The other six have no page yet, so they point at a new `soon.html`, named by
  fragment: one page, a real URL each, swapped for a proper page later by
  changing a single href.
- Each states what is planned rather than showing a generic holding message,
  and two carry a useful interim action — Who am I? points at the work page,
  Submit a Tool offers email until the form exists.

**Checked before publishing**
- Scan clean. All seventeen destinations resolve; anchors and `soon.html`
  fragments verified against their targets. Console silent on every page.

**Note**
- There are now two nodes labelled "Personal": the tools category, and the new
  cluster. They lead to different places and the map handles it, but the
  repetition is visible.

---

## v29 — 2026-09-11

**What's new** · The map
### Click A Node,<br>Go There
The map no longer explains itself. Clicking a node takes you straight to the
thing it names, in a new tab, so the map stays where it is behind you. The
text index still lists everything in plain form for anyone who wants it.

**The map navigates instead of describing**
- The readout card is gone: its markup, styles and wiring, plus the node copy
  that fed it. Node data is now label, destination and structure only.
- Leaves open their destination in a new tab with `rel="noopener"`. Email is
  the exception — a new tab for `mailto:` strands an empty one in most
  browsers, so it goes direct.
- Parents (Work, Tools, Connect) are structure: they still expand and collapse
  rather than lead anywhere.
- **About** had no destination once the panel went, since the site has no
  about page. It points at `work.html`, which opens on the three lanes.

**The What's New page builds itself**
- `changelog.html` is now generated from this file by
  `scripts/update_changelog.py`, so the two cannot drift.
- Only what an entry explicitly marks with a `**What's new**` block is
  published. A release with nothing worth announcing never reaches the page,
  and the build-log voice and the "Outstanding" sections never leak.
- Backfilled that block into the thirteen releases worth announcing.
- Added to the skill as a workflow step and to its pre-push gate via
  `--check`. The skill's map instructions were rewritten too: adding a tool to
  an existing category now needs no map edit at all.

**Checked before publishing**
- All eleven leaf destinations match their text-index entry. Console silent,
  every page 200, readout fully removed with no dead selectors or comments.

---

## v28 — 2026-09-11

**What's new** · The site
### This Page,<br>And A Quieter Map
This page. Everything that changes on the site now gets written up here in
plain language, newest first.

The map also stopped explaining itself — clicking a node used to slide a panel
over it. Now it just takes you where you were going.

**The map's readout replaced the slide-in panel**
- Clicking a node no longer pushes a full-height drawer in from the right over
  a dimmed map. It opens a bordered card where it is — no slide, no scrim — so
  the cloud stays visible and still takes a drag or a zoom while you read.
- On a phone the card sits above the controls, full width, and scrolls inside
  itself. Selecting another node swaps the contents; clearing the selection or
  closing the map closes it.

**What's New page**
- New `changelog.html`, written for visitors rather than as a build log:
  what landed, in plain language, newest first. Linked from every page's nav
  and footer, from the homepage text index, and from the noscript fallback.
- Hand-authored rather than rendered from this file, deliberately — see below.

**Work page**
- de Belle Photography body copy replaced with Xavier's text. The spec list
  and the buttons are unchanged.

**Housekeeping**
- The topbar nav wraps now that it carries five items, instead of overflowing
  on a narrow screen.

**Outstanding**
- This file is deployed, so it is readable at /CHANGELOG.md, and its
  "Outstanding" sections describe the zine's open Firebase database and the
  live CRM webhook. That predates this release and is Xavier's call, but it is
  why the public page is hand-written instead of rendered from here.

---

## v27 — 2026-09-11

**What's new** · New tool · [tools.html#personal]
### Project Phases
A phase tracker with a time log. Break a project into phases, move through
them, and keep an honest record of where the hours actually went.

**New tool — Project Phases (Personal, 16th build)**

A project breaks into phases, a phase into steps, and every step has time logged
against it. Two halves that stay in sync because one derives from the other:

- **The plan.** Phases hold steps; a step has a status (to do → in progress → done)
  and an optional estimate. Phases reorder and collapse, and the collapsed state
  sticks — the demo plan is 13 phases and 78 steps, which is a 5,300px scroll open
  and fits one screen closed.
- **The time log.** A flat list of entries, each pinned to one step, and the only
  place time is stored. Every total on the board and in the report is summed back
  out of it on each render, never written alongside it — so editing or deleting an
  entry moves every total that depended on it, and deleting a step or a phase takes
  its entries with it instead of leaving orphans nothing will ever show.

Time goes in two ways. A **timer** runs in the header and survives a reload, because
it stores the start timestamp rather than a counter; starting a second step closes
the first, so nothing is ever double-counted. Or **log it by hand** against any step
— durations are read loosely, so `1h 30m`, `90`, `1:30` and `1.5h` all mean the same.

Three views: the board, the time log (filter by phase, step and date; export CSV),
and a report of logged against estimated time per phase *and* per step, plus a
fortnight of daily totals. Export and import move the whole store as JSON.

**One bug worth recording.** Storage is a single `localStorage` key. A write made
moments before the page goes away can still be sitting in the browser's pending
commit batch when the document is torn down: a reload straight after saving lost the
write 2 times in 25. The store is now re-committed as the page hides — 0 in 25 after.

Built and tested in the `claude-code` repo, where it carries 73 of its own checks
driving the real UI in Chromium.

---

## v26 — 2026-09-10

**What's new** · Rebuilt · [tools.html#personal]
### Budget Tracker,<br>Twice Over
Assets, per-line frequencies and templates, so it handles money that doesn't
arrive in neat monthly lumps. Then a second pass so the whole thing reads
properly on a phone rather than asking you to pinch at a spreadsheet.

**Budget Tracker v10 — reads properly on a phone**
- The tool had no viewport tag, so phones laid it out at ~980px and shrank the
  whole thing to fit — the "too zoomed out" everyone was seeing. Added, along
  with the rest of the mobile work that only matters once the page is at real size.
- **Rows go two-storey under 640px**: the name gets the full width on top, the
  frequency, planned, actual and % sit underneath, aligned to the column headers.
  Section totals follow the same shape. Under 360px the % column drops out to
  give the numbers room.
- **Every field is 16px on mobile**, because iOS zooms the page when you focus
  anything smaller and then leaves you there.
- **Drag to reorder works on touch.** HTML5 drag-and-drop does not fire on a
  phone at all, so the handle now runs on pointer events for touch and keeps
  native drag on the desktop. Drop markers and forward propagation behave the same.
- Controls that only appeared on hover — drag handles, delete buttons — are
  pinned visible on touch devices, where there is no hover to reveal them.
- Header stacks, buttons become a 3-up grid, month nav gets thumb-sized arrows,
  summary cards go 3-up (2-up on small phones), modals become full-height sheets
  with the footer on the bottom edge.
- Fixed the section grid forcing a 400px track on a 360px screen, which was
  pushing the page sideways.

**Also fixed, and it was a desktop bug too:** the Assets total row had a spare
spacer cell in a four-column grid, so the change-since-last-month figure wrapped
onto its own line. One cell removed, it sits where it belongs at every width.

**Verified** at 360, 375, 414, 768 and desktop widths under real viewport
emulation: no horizontal overflow at any of them, nothing wider than the screen,
inputs at 16px, and a simulated touch drag reordering a row and propagating it
forward. Desktop layout re-checked after the change — rows still single-line,
13px, handles still hidden until hover.

---

## v25 — 2026-09-10

**Budget Tracker v9 — assets, frequencies, templates**
- **Assets.** A sixth card tracks money already saved as account balances,
  with a change-since-last-month figure per account and for the total. Balances
  carry forward like every other row: set it once, it holds until changed.
- **Rollover reworked.** It is a carry-forward chain now, not a number you
  retype. Auto takes last month's closing balance, so a correction in March
  ripples through every later month; Manual freezes whatever Auto was showing
  so nothing jumps. A chain readout underneath shows opening, remaining, closing,
  and warns when the next month is set to Manual and will not pick it up.
- **Remaining per month** has its own box at the top — income minus everything
  out, rollover deliberately left out of it, with a "before savings" figure beside it.
- **Copy month.** Push a month into any others: everything, plan only, or rows
  only. Can create and fill the next N months in one go.
- **Drag to reorder** rows within a section, or `Alt + arrow` from the keyboard.
  The new order propagates forward.
- **A frequency per line** — daily, weekly, bi-weekly, monthly, yearly. Amounts
  are entered as they actually happen and every total runs on the monthly equivalent.
- **Templates.** Six built in (Student, First apartment, Couple, Family, Freelancer,
  Retired), applied as "add missing rows" or "replace everything". A month can be
  saved out as a `.json` template and imported by someone else — the point being
  friends and family start from something rather than a blank page.
- Goal calculator takes an explicit monthly contribution, counts what is already
  saved, and says when a target needs more per month than there actually is spare.

**Scan.** The sample figures baked into a first-run month (the $9,200 / $7,200
paychecks, $3,400 rent) are unchanged from the version already live — public
since the tracker first shipped, and Xavier's call as before. No backends, no
credentials.

**Storage.** The key moved from `debelle.budget-tracker.v2` to `.v3`. v9 reads
v3 first and falls back to v2, so existing saved months load on first open and
are rewritten under the new key. Old exports import cleanly: rows without a
frequency become Monthly, and old rollovers land as Manual so no figure shifts.

**Verified.** Frequency maths, the auto-rollover chain across three months,
drag reorder propagating forward, copy-month in all three modes, template apply
and `.json` round-trip, and the v2 migration — all exercised in the browser with
a clean console. Name fields measured at 1440, 1280, 1100 and 900 px: every
built-in and template name fits without clipping.

---

## v24 — 2026-09-01

**What's new** · New homepage · [index.html]
### The Map Became<br>A Point Cloud
The homepage mind map is no longer boxes joined by lines. It's a single field
of particles that forms the nodes and the links themselves, with the mark held
sharp at the centre while everything around it drifts.

The layout is grown rather than placed -- by space colonization, the algorithm
behind tree branching and leaf venation -- and then kept, so it doesn't
rearrange itself every time you open it.

**The homepage map is now the particle point cloud**
- The old DOM map — absolutely-positioned node boxes, an SVG wire layer and a
  spring simulation — is gone, not layered over. No `#stage`, `#world`,
  `#wires`, `.node`, `.wire`, and no second render loop. One canvas, one
  camera, one loop; the particles *are* the nodes and the links.
- The layout is grown by space colonization and stored, so it does not
  regenerate on load. Breath and firing behaviour, monochrome cloud with
  yellow kept for signal and selection, and the mark that never dissolves.
- Portrait and landscape have separate arrangements; verified at 380px wide.

**Map content**
- Work (Real Estate, 333 Photo, De Belle Photo), Tools (Portfolio Makers,
  De Belle Tools, Personal, Events, Art), Connect (Email, Instagram), and
  About as a childless anchor. Clusters left deliberately uneven.
- Every node leads where its text-index entry leads — checked link by link.
  External nodes open in a new tab and keep the ↗ marker; Email is a mailto.

**Kept exactly as it was**
- Header, tagline and the Tools / Work / Instagram links. The zoom, Recentre
  and Index controls, rewired to the new camera — Recentre restores the
  default view. The full text index and all twelve of its links, the
  "Back to the map" control, the noscript fallback, the skip link, the detail
  panel and its close control, and all existing styling and meta.
- The instruction line stays; its wording now names the interactions that
  actually changed (tap the mark to open, twice to invert).
- The engine drew its own hint line along the bottom, which duplicated that
  instruction and collided with the controls. Removed, along with its state,
  rather than left as dead code.

**Quality floor**
- Focus stays visible on every control, and closing the index returns focus to
  the button that opened it. `prefers-reduced-motion` is respected by the
  engine and the panel. The loop stops on `visibilitychange`. With JavaScript
  off, the existing fallback still lists everything.

**A note on testing**
- The map appearing not to open in earlier sessions was my test environment,
  not the tool: the preview pane is hidden between screenshots, so
  `requestAnimationFrame` is paused and the clock never reached the 1.6s
  auto-open. Instrumenting the page directly showed `mapOpen: true` and the
  expected 15 nodes. A stale browser cache was also masking edits. Both worth
  remembering — earlier notes calling this a possible tool bug were wrong.

---

## v23 — 2026-09-01

**What's new** · New piece · [tools.html#art]
### Neural<br>Mind Map
The generative piece the homepage grew out of. Added to Art, then rebuilt so
its structure is grown rather than positioned by hand.

**Neural Mind Map updated to v5**
- The layout is now **grown rather than placed**. A space-colonization grower
  — the algorithm behind tree branching and leaf venation — scatters
  attraction points and steps branches toward them, consuming each as it
  arrives. Labels hang off the resulting tips.
- The grown layout is **baked**: it only regrows when the hierarchy or the
  growth constants change, never on a normal load, so the map does not
  rearrange itself every time it opens.
- The hierarchy is real and three deep — Work, Personal, Family, Dreams,
  About, down to de Belle, 333 Photo, Patagonia, Darkroom.
- +31KB over v4, ~765 lines added, about 73% of the file unchanged. Same slug,
  so the live URL is unchanged.

**Checked before publishing**
- Scan clean: no external hosts, no endpoints, no credentials, nothing stored.
- Verified it renders and animates, the mark holds sharp, zoom works and the
  double-click invert works. Console silent.
- **Still could not confirm the labelled map state.** Tapping the mark did not
  visibly form the labelled structure in any capture, at any zoom, on v4 or
  v5. Canvas instrumentation was inconclusive — the hooks never fired even for
  the hint line that plainly renders, so this is not evidence the labels are
  missing, only that the check could not see them. Worth Xavier's own eyes.
- Card copy therefore describes the growth, which is verifiable from the
  source, rather than promising labels I have not seen render.

---

## v22 — 2026-09-01

**New piece**
- **Neural Mind Map** added to Art & Experiments, after Organic Loops. A
  particle field that gathers itself into a mind map, with the logo mark held
  sharp at the centre while the cloud around it dissolves and reforms. Tap the
  mark to toggle the map, double-click to invert the theme, drag to pan,
  scroll or pinch to zoom. One pointer code path for mouse and touch.
- It draws the mark from the same four-triangle coordinates as
  `assets/logo.svg`, so the piece and the site share one geometry.
- That makes 15 tools, and Art becomes 3 Pieces.

**Checked before publishing**
- Scan came back clean: no external hosts, no endpoints, no credentials,
  nothing persisted.
- Verified it renders and animates, the mark stays sharp, the double-click
  invert works, and the console is silent. The labelled-node phase is in the
  source but I did not manage to capture it in a still, so the card describes
  the behaviour without naming the labels.

**Skill**
- The `publish-tool` skill did this end to end for the first time. Using it
  turned up a false positive in its scanner — "INTERACTION" matched the
  "interac" payment pattern — now fixed with word boundaries, since a scanner
  that cries wolf gets ignored.

---

## v21 — 2026-09-03

**What's new** · Fixes · [tools.html#portfolio]
### Carousel Planner<br>On A Phone
Several rounds of it, honestly. Phones are unforgiving about memory, and a
carousel of full-resolution photos is exactly the thing they give up on.

- Fixed views that were unusable on a small screen
- Stopped the page reloading itself mid-edit
- Slides past the fifth now behave -- the fix that needed three attempts

**Carousel Planner v10 — the slides past the fifth, actually fixed**
Built from v8. v9 guessed at this and guessed wrong; this time the bug was
reproduced and measured before anything was changed.

- **The rail was stretching the page.** The slide-by-slide rail is a row of
  thumbnails inside a grid column that was sized to its widest content. Once
  there were more thumbnails than fit the screen the column grew, and the
  canvas above it grew with it — both laid out wider than the phone, with
  `body { overflow: hidden }` clipping the excess and no way to scroll to it.
  The far slides and the far thumbnails were rendered, just placed where a
  finger could not go. Measured at 375px wide: no overflow at four slides,
  then 80, 168, 256, 344 pixels out of reach at five, six, seven, eight.
- Five CSS lines constrain that column and the two rows inside it. No
  JavaScript changed, the dividers are v8's, and nothing from v9 is here.

*On v9, for the record:* it read the same "five works, six doesn't" boundary
as a GPU texture ceiling — 1080px a slide at 3x crosses 16,384 between the
fifth and sixth — and removed the dividers' blend mode on that theory. The
arithmetic was a coincidence. It was rolled back in v20.

**Checked before publishing**
- Scan: storage key unchanged, saved carousels carry over; the same
  `dataTransfer` false positive as the last three releases.
- Measured at 4, 6, 8, 12 and 20 slides: page overflow zero at every count,
  the canvas exactly the screen width, the last slide reachable, the rail
  scrolling to its last thumbnail. Import, drag, select and the stepper
  still work; desktop keeps its sidebar, zoom and Fit. No console errors.
- The rail's "1080 × 1350 px each" label was being clipped off-screen and now
  sits where it belongs — the same overflow, visible on the page all along.

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

**What's new** · Rebuilt · [tools.html#portfolio]
### Feed Planner,<br>Properly Portable
Carousels, export post by post, and enough memory discipline that a phone can
hold a full grid without dropping it. Drag to reorder now works with a finger,
which it never did.

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

**What's new** · New tool · [tools.html#personal]
### Idea Bank
Dump it, rank it, ship it. Every idea scored on impact, confidence and ease,
plotted on a matrix, then pushed across a board until it's done or honestly
parked.

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

**What's new** · Updated · [tools.html#events]
### Volley &amp; BBQ
The Monday night zine now notices who's coming to eat but hasn't claimed a
dish, and keeps that in each week's history. Gently accusatory, as intended.

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

**What's new** · New tool · [tools.html#portfolio]
### Carousel Planner
Build an Instagram carousel that reads as one picture. Photos span across
slides, snap to the edges, and export ready to post.

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

**What's new** · Opened up · [tools.html]
### Every Tool,<br>Public
The whole workshop is on the site now rather than half of it. Sixteen builds
across five categories, all running in the browser, none of them needing an
install.

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

**What's new** · Live
### The Site<br>Went Up
First public version. The map, the tools hub and the work page, in black,
white and one yellow.

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

**What's new** · Built
### Day One
An interactive mind map as the front door, a hub for everything I'd built, and
a page for the three things I actually spend my life on.

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
