# Ideas log

Running list of ideas for improving, growing and monetizing the site. Every idea keeps
its ID forever. Statuses: new, planned, in progress, done, dropped.

## 2026-10-04 — Wildcard (competitors and other creators' sites)

### IDEA-001 · "Now" page
- **Category:** Content · **Effort:** S · **Impact:** ★★ · **Status:** new
- Many creator sites (the /now convention) keep one short page of what the owner is working on this month. The site already ships a version every few days (CHANGELOG.md, changelog.html), but nothing says it in human terms on the home page. Add a now.html node on the mind map in index.html, fed by Xavier's editable-page pattern used in who-am-i.html, so returning visitors have a reason to come back and a booking nudge sits at the bottom.

### IDEA-002 · Social-share cards (Open Graph) on every page
- **Category:** SEO · **Effort:** S · **Impact:** ★★★ · **Status:** done (done in v71, 2026-10-05)
- Only who-am-i.html and what-is-this.html contain og: tags; index.html, work.html, tools.html and food-for-thought.html have none, so links pasted in Instagram DMs, iMessage or LinkedIn show a bare URL. Add og:title, og:description, og:image (a branded 1200×630 from assets/logo.svg) and a canonical link to each page. Every tool and blog link shared becomes a visible ad.

### IDEA-003 · Pricing-range teasers on work.html
- **Category:** Conversion · **Effort:** S · **Impact:** ★★★ · **Status:** new
- work.html only ends in "Email me" (mailto:) and plain external links to debellephotography.com and 333photo.com. Top photographers' sites show a "starting at" line and a three-step "how it works" per service, which pre-qualifies leads. Add a one-line starting price and a "what happens after you email" strip under each of the three sections.

### IDEA-004 · Replace mailto with a short enquiry form
- **Category:** Conversion · **Effort:** M · **Impact:** ★★★ · **Status:** new
- The only contact route on work.html (lines ~306 and ~329) is a mailto: link, which does nothing for people on a shared or work computer without a mail client and captures no details. Competitors use a 4-field form (service, date, budget, message) posting to a GoHighLevel form or webhook so every lead lands in the CRM tagged by service. Keep the mailto as the fallback.

### IDEA-005 · Public "Tools" showcase with one-line outcomes
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- tools.html lists 16 tools with search and filter, but tool names like Liquid Silver or Organic Loops don't say who they help. Indie-tool sites (e.g. Notion template shops) lead each card with an outcome sentence and a screenshot, and put a single "Most useful" row on top. Add a pinned row of three tools (Package Builder, Wedding Schedule, Budget Tracker) with outcome-led captions and an email capture for "new tools" updates.

## 2026-10-04 — Wildcard (second pass: what the best creator and tool sites do)

### IDEA-006 · Give every blog post its own crawlable page
- **Category:** SEO · **Effort:** M · **Impact:** ★★ · **Status:** new
- food-for-thought.html loads posts from Firebase after the page opens and opens a single post through a #hash (line ~488), so Google sees an empty page and no post has a real URL to share. Top creator blogs give each post its own address and plain HTML. Have the composer also write a static post page (or a small build step that snapshots blog/posts into /food-for-thought/<slug>.html) so every post can rank, be linked and be previewed.

### IDEA-007 · "Send this package to Xavier" in the Package Builder
- **Category:** Conversion · **Effort:** M · **Impact:** ★★★ · **Status:** new
- tools/package-builder.html ends in exportSummary(), which only downloads a .txt file, so the most qualified couples on the site (they just priced a full wedding) leave without Xavier ever knowing. Add a "Send this to Xavier" button that posts the selections, total and the couple's name, email and date to the GoHighLevel endpoint from IDEA-004 (builds on IDEA-004), tagged "package-builder". Each export becomes a warm lead with the exact package attached.

### IDEA-008 · robots.txt, sitemap.xml and structured data
- **Category:** SEO · **Effort:** S · **Impact:** ★★ · **Status:** new
- The site root has no robots.txt or sitemap.xml, and no page carries schema.org JSON-LD. Add a sitemap listing the public pages, a robots.txt pointing to it (and hiding access.html), and Person plus LocalBusiness/Photographer markup on work.html with the two business sites as sameAs. It helps search engines show the right name, services and area.

### IDEA-009 · Make the tools installable on a phone (PWA)
- **Category:** Feature · **Effort:** M · **Impact:** ★★ · **Status:** new
- No page or tool has a web manifest, theme-color or home-screen icon, yet tools like Wedding Schedule, Potluck and Activity Planner get used on a phone at the event itself. Add a manifest.json, icons from assets/logo.svg and a tiny service worker so guests and couples can "Add to Home Screen" and open them offline. Creator tool sites that feel like apps get reopened, and each reopen is another brand impression.

### IDEA-010 · Paid "Wedding Planner Pack" as the downsell for couples who don't book
- **Category:** Monetization · **Effort:** M · **Impact:** ★★★ · **Status:** new
- Wedding Schedule, Budget Tracker, Activity Planner and Potluck in tools/ are already polished but are free and unframed. Bundle them as a $29 "Wedding Planner Pack" (signed-in access plus printable PDFs) offered after a couple declines the Package Builder quote, and included free with any booking as a bonus. It turns tire-kickers into paying customers (downsell), keeps them in Xavier's world, and adds a bonus line to the main offer.

## 2026-10-04 — Xavier's site review (added by request)

### IDEA-011 · Put real photos and reels on the site
- **Category:** Fix · **Effort:** M · **Impact:** ★★★ · **Status:** new
- The only image on work.html and who-am-i.html is the logo, and index.html has none, so a photographer's site shows no photography. Give each chapter of work.html (de Belle, 333 Photo, real estate) a full-bleed hero image and a short reel, and put at least one image on the home page.

### IDEA-012 · Fix the tools-page count and card numbers in the HTML
- **Category:** Fix · **Effort:** S · **Impact:** ★ · **Status:** new
- tools.html hard-codes "12 builds" (line ~304) while it has 18 cards, and the card numbers repeat (02 twice, 09 and 10 twice, three 00s). A script (lines ~589–602) corrects both after the page loads, so visitors see the right numbers, but crawlers, link previews and no-JS readers see the wrong ones. Write the correct count and numbers into the HTML.

### IDEA-013 · Split tools.html by audience
- **Category:** Conversion · **Effort:** M · **Impact:** ★★ · **Status:** new
- Client tools (Package Builder), personal tools (Budget Tracker) and art (Liquid Silver) sit side by side, so a shopping couple, a fellow photographer and a friend all land on the same grid. Open the page with three doors (For couples and clients / For creators / Experiments) so each visitor reaches their tools and the right offer.

### IDEA-014 · Add privacy-friendly analytics
- **Category:** Fix · **Effort:** S · **Impact:** ★★★ · **Status:** new
- No page has any analytics, so traffic, top tools and where visitors drop off are unknown, and any monetization would be guesswork. Add a Plausible or Umami script tag to every page and track key events (Package Builder export, enquiry clicks, tool opens).

### IDEA-015 · Meta descriptions on every tool page
- **Category:** SEO · **Effort:** S · **Impact:** ★★ · **Status:** done (done in v71, 2026-10-05)
- 17 of the 18 pages in tools/ have no meta description (only neural-mind-map.html has one), so search results show random text. Write one outcome-led sentence per tool.

### IDEA-016 · Move to a custom domain
- **Category:** SEO · **Effort:** S · **Impact:** ★★★ · **Status:** new
- The site lives at xavierdebelle.github.io/website. A domain such as xavierdebelle.com is easier to remember, builds search authority that you own, and looks more credible on cards and in emails. Set it up with a CNAME on GitHub Pages (or on the new host from IDEA-039).

### IDEA-017 · Home page that says who it's for, with three doors
- **Category:** Conversion · **Effort:** M · **Impact:** ★★★ · **Status:** new
- index.html opens on a canvas with "Tap the mark to open the map · twice to invert it". That's charming for regulars but friction for a stranger, and search engines only see the fallback text index. Keep the map, but add a visible one-line answer to "who is this and what can I do here" and three doors: Hire me / Use the tools / Read.

### IDEA-018 · Privacy policy (Quebec Law 25)
- **Category:** Legal · **Effort:** S · **Impact:** ★★★ · **Status:** done (done in v71, 2026-10-05)
- There's no privacy policy anywhere, yet Activity Planner and Potluck collect guests' names, emails and phone numbers into Firebase. Quebec's Law 25 requires a published policy and a named person in charge of personal information. Add privacy.html, link it in every footer and next to every form.

### IDEA-019 · French version of the public pages
- **Category:** SEO · **Effort:** L · **Impact:** ★★ · **Status:** new
- Everything is English-only for a Montreal business. A French version of work.html, the home page and the client tools reaches French searches and, for commercial pages, meets the Charter of the French Language. Start with work.html and the Package Builder.

### IDEA-020 · Rewrite "Who Am I?" with a face, a story and credentials
- **Category:** Content · **Effort:** S · **Impact:** ★★ · **Status:** new
- who-am-i.html is one philosophical paragraph with no photo, no story and no credentials. Keep the line about change, then add a portrait, the 30+ years and 3,000+ weddings, and what Xavier is building now.

### IDEA-021 · Decide whether the personal Wedding Activities page stays public
- **Category:** Legal · **Effort:** S · **Impact:** ★ · **Status:** new
- tools/wedding-activities.html is listed publicly and names "Xavier & Maria" (8 mentions) with a real guest guide. Either unlist it (noindex, removed from tools.html) or turn it into an anonymised demo for the guest-hub offer in IDEA-035.

### IDEA-022 · Newsletter sign-up and RSS feed
- **Category:** Content · **Effort:** M · **Impact:** ★★★ · **Status:** new
- food-for-thought.html and tools.html have no way to follow along. Add an email sign-up (into GoHighLevel) on both pages and an RSS feed for the blog. An email list is the one audience Xavier owns outright.

### IDEA-023 · "Made with this tool" proof under each tool
- **Category:** Conversion · **Effort:** M · **Impact:** ★★ · **Status:** new
- Builds on IDEA-005. Beyond outcome captions, show real results under each tool: an exported grid from Portfolio Grid, a finished schedule, a Feed Planner layout. Proof of real use convinces visitors to try the tool.

### IDEA-024 · One "Projects" hub for the synced tools
- **Category:** Feature · **Effort:** M · **Impact:** ★★ · **Status:** new
- Project Phases, Idea Bank and Budget Tracker already share one sign-in (assets/account.js) but feel like separate files. A single dashboard that lists your projects, ideas and budgets with links into each makes them feel like one product, which is a prerequisite for selling them.

### IDEA-025 · Shot-list builder paired with the Wedding Schedule
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- Couples tick off family groupings and must-have shots, linked to the times in tools/wedding-schedule.html. It saves hours of back-and-forth before each wedding, and the result goes straight to the photographer on the day.

### IDEA-026 · Client portal for de Belle couples
- **Category:** Feature · **Effort:** L · **Impact:** ★★★ · **Status:** new
- Schedule, video corrections, package, payments and gallery link already exist as separate tools (wedding-schedule, video-corrections, package-builder). One private link per couple that gathers them is a premium client experience and the core of the white-label product in IDEA-033.

### IDEA-027 · 333 Photo rate calculator / quote builder
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- A B2B version of the Package Builder using 333 Photo's fixed rates (same logic as the 333 estimator skill), so business clients self-quote and the request lands in GoHighLevel.

### IDEA-028 · Mood board / reference collector
- **Category:** Tool · **Effort:** M · **Impact:** ★ · **Status:** new
- A place for clients and creators to drop reference images and notes before a shoot, pairing with tools/freecanvas.html. It's useful for 333 shoot prep and for couples' style briefs.

### IDEA-029 · Real estate tools for the third lane
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- work.html has a real-estate chapter but no tools for it. Add a renovation budget (fork of budget-tracker.html), a duplex cash-flow calculator and a contractor and quote tracker.

### IDEA-030 · Stripe payment links in the Activity Planner
- **Category:** Feature · **Effort:** M · **Impact:** ★★ · **Status:** new
- tools/activity-planner.html already tracks who has paid, but payment happens elsewhere. A Stripe payment link per activity closes the loop and is the first step toward charging for the tool itself.

### IDEA-031 · "Lock this price for 7 days, book a call" in the Package Builder
- **Category:** Monetization · **Effort:** S · **Impact:** ★★★ · **Status:** new
- Builds on IDEA-007. Once the package is sent to GoHighLevel, give the couple a reason to act now: hold the quoted price for 7 days if they book a call, with the booking calendar right under the total.

### IDEA-032 · Creator tools → 333 content retainer
- **Category:** Monetization · **Effort:** S · **Impact:** ★★★ · **Status:** new
- Feed Planner and Carousel Planner users are planning content they still have to shoot. Add an offer inside both: "Want us to shoot the content for this grid?", leading to a monthly 333 Photo content retainer. It's a free tool turning into continuity, with no new product needed.

### IDEA-033 · White-label studio tools for wedding vendors
- **Category:** Monetization · **Effort:** L · **Impact:** ★★★ · **Status:** new
- Package Builder, Video Corrections, Wedding Day Schedule and Activity Planner, sold with each studio's own branding and prices at about $29–49/month. They're proven on a 30-year studio and tie into the Wedding Experts / vendor CRM idea. Waive the setup fee on annual plans. Pre-sell to 5–10 photographers before building billing.

### IDEA-034 · Freemium Pro tier for creator tools
- **Category:** Monetization · **Effort:** M · **Impact:** ★★ · **Status:** new
- Feed Planner, Carousel Planner and the Portfolio makers stay free with a watermark or limited exports. Pro (about $19 one-time or $4/month) removes limits and adds sync. The invitation-only member system in assets/account.js is a paywall in waiting: swap "Xavier approves" for a Stripe payment that sets the member flag.

### IDEA-035 · Wedding guest hub as a de Belle upsell
- **Category:** Monetization · **Effort:** M · **Impact:** ★★ · **Status:** new
- Wedding Activities plus Activity Planner is effectively a guest-website product. Add it to the Package Builder as a $199–299 add-on ("you can't have a destination wedding without a guest hub").

### IDEA-036 · "How a photographer built 18 tools with AI" newsletter → workshop
- **Category:** Content · **Effort:** M · **Impact:** ★★ · **Status:** new
- The story behind the site is itself content for photographers and creatives in Montreal. Run it as a newsletter series (via IDEA-022) that leads to a paid workshop or course.

### IDEA-037 · Affiliate links for real gear and software
- **Category:** Monetization · **Effort:** S · **Impact:** ★ · **Status:** new
- Add a "What I use" page and affiliate links to the cameras, lenses and software Xavier actually uses. It's low-effort income that fills gaps in the money model.

### IDEA-038 · Sell the art loops
- **Category:** Monetization · **Effort:** S · **Impact:** ★ · **Status:** new
- tools/liquid-silver.html and tools/organic-loops.html could be sold as 4K loops for events, screens and VJs on Gumroad, or as prints. Low effort, low priority.

### IDEA-039 · Move hosting off GitHub Pages before charging
- **Category:** Legal · **Effort:** M · **Impact:** ★★ · **Status:** new
- GitHub Pages' terms say it shouldn't be used primarily for commercial transactions or SaaS. Move to Cloudflare Pages, Netlify or Vercel (similar deploy-from-main setup) before any paid tier goes live.

### IDEA-040 · Usage limits on the free tier in Firebase
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- Firebase costs grow with usage. Before opening tools to the public or a free tier, cap what free accounts can store (number of potlucks, events, projects) and set a billing alert on xdb-tools.

## 2026-10-05 — Conversion and lead capture

### IDEA-041 · Tag every outbound link so GoHighLevel knows the lead came from this site
- **Category:** Conversion · **Effort:** S · **Impact:** ★★ · **Status:** new
- The buttons in work.html to debellephotography.com and 333photo.com, and the "Email me" / "Talk property" mailto links, carry no source tag, so a lead arriving from this site looks identical to one from Google. Add ?utm_source=xavierdebelle&utm_medium=site&utm_campaign=work-debelle (or -333, -tools) to each outbound link, and a pre-filled mailto subject per section ("Wedding enquiry – from your site"). GoHighLevel then records the source on each contact and Xavier can see which page actually produces bookings.

### IDEA-042 · "Planning your own wedding?" footer on guest-facing tool views
- **Category:** Conversion · **Effort:** S · **Impact:** ★★★ · **Status:** new
- Potluck and Activity Planner are shared by link with groups of guests (potluck.html has a footer-links block at line ~1315, activity-planner.html a summary footer), yet none of those guest views mention de Belle Photography. Guests at a wedding or event are the warmest future-couple audience there is. Add a quiet "Made by Xavier de Belle · Photographing weddings in Montreal for 30 years" line linking to work.html#de-belle on the guest-visible screens only, never on the organiser's own view.

### IDEA-043 · "Is my date free?" checker on work.html
- **Category:** Conversion · **Effort:** M · **Impact:** ★★★ · **Status:** new
- work.html asks couples to email blind, so the first question they have (is my date available?) takes a day to answer. Add a date picker in the de Belle chapter that reads a small list of booked dates (a JSON file or GoHighLevel calendar) and replies "That date is open, tell me about your day" or "Taken, here are nearby dates". Either answer reveals the contact step (builds on IDEA-004), and the date is captured with the lead.

### IDEA-044 · Testimonial strip and review count on work.html
- **Category:** Conversion · **Effort:** S · **Impact:** ★★★ · **Status:** new
- work.html states "30+ years, 3000+ weddings" in a spec list but shows no word from an actual client, and neither the de Belle nor the 333 Photo chapter links to reviews. Add three short couple and client quotes with first names plus a "4.9 on Google, 120 reviews" link directly above the "Email me" call at the bottom of the page. A stranger deciding whether to write is persuaded by other people far more than by the studio's own description.

### IDEA-045 · Free "Wedding timeline" PDF in exchange for email and wedding date
- **Category:** Conversion · **Effort:** M · **Impact:** ★★★ · **Status:** new
- tools/wedding-schedule.html gives couples a finished day plan but captures nothing. Offer a branded PDF of their schedule, plus a "how long each part really takes" cheat sheet, after they enter name, email and wedding date; the details go to GoHighLevel and start a 4-email nurture sequence ending with a consult invitation. It is a free attraction offer, distinct from the paid pack in IDEA-010, and the wedding date tells Xavier how soon each lead needs an answer.

## 2026-10-06 — One tool in full: Portfolio Masonry

### IDEA-046 · Stop Portfolio Masonry from quietly losing photos
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/portfolio-masonry.html stores every photo as a 1080px base64 JPEG inside localStorage (about 5 MB per site), and when it fills up saveState() only writes a console warning, so the wall looks fine until the page is reloaded and the newest photos are gone. Move the photos to IndexedDB (as the installable planners do), or at minimum show a visible "Storage full, export now" banner and a "x of about y photos" counter next to the count in the top bar. A photographer building a client wall must never lose work silently.

### IDEA-047 · Real page basics and alt text for the photo-wall tools
- **Category:** Fix · **Effort:** S · **Impact:** ★ · **Status:** new
- portfolio-masonry.html, portfolio-grid.html, feed-planner.html and freecanvas.html have no doctype (so browsers render them in quirks mode) and no lang attribute, and Portfolio Masonry sets every photo to alt="" (line ~275). Add the doctype and lang="en" to all four, and add an optional "Describe this photo" field in the crop dialog that fills the alt text. It fixes layout surprises and makes the walls readable by screen readers.

### IDEA-048 · Export presets for Portfolio Masonry
- **Category:** Feature · **Effort:** M · **Impact:** ★★ · **Status:** new
- composeMasonryCanvas() in portfolio-masonry.html always exports three columns, 356px each, on white, as one tall image, which fits neither an Instagram post nor a printed page. Add a small preset picker in the Export menu: Instagram 4:5 (1080×1350, auto-split into carousel slides), Letter/A4 PDF pages for a printed leave-behind, and a column, gap and background colour control. Add an optional name-and-site footer so every exported wall carries Xavier's brand.

### IDEA-049 · "Pick your favourites" mode for client galleries
- **Category:** Tool · **Effort:** L · **Impact:** ★★ · **Status:** new
- The masonry wall already handles any photo shape, reordering and crops, but only the owner can see it. Add a Share button that creates a read-only link where a client taps a heart on their favourites and sends the picks back (saved in Firebase, with a note to Xavier). It turns the wall into a proofing tool for album and print selection, gives each wedding a reason to return to the site, and slots into the couple portal from IDEA-026.

## 2026-10-07 — Monetization and offers

### IDEA-050 · Three ready-made wedding bundles on top of the Package Builder
- **Category:** Monetization · **Effort:** M · **Impact:** ★★★ · **Status:** new
- tools/package-builder.html is 100% à la carte: PHOTO_OPTIONS, VIDEO_OPTIONS, VIDEO_ADDONS, GLAM_OPTIONS and OTHER_ADDONS (about 25 line items) with no anchor, so a couple faces a blank page and the total only goes up as fast as they dare to click. Add a row at the top with three one-click bundles (for example Essential, Signature, Full Story) that pre-fill the cart, show the price next to "if bought separately", and mark the middle one "Most booked". Bundles raise the average sale and make the decision a pick between three, not a build from scratch.

### IDEA-051 · Engagement session as a $350 front-end offer that credits toward the wedding
- **Category:** Monetization · **Effort:** S · **Impact:** ★★★ · **Status:** new
- The engagement session already exists as one add-on in package-builder.html (oa_engagement, $350, 1 hour, top 50 images) but is buried at the bottom, and work.html's only first step is "Email me". Turn it into a stand-alone attraction offer on the de Belle chapter: "Meet me first: engagement session, $350, fully credited if you book your wedding within 60 days". Couples get to know Xavier at low risk, he is paid for his time, and the credit makes the wedding booking the natural next step.

### IDEA-052 · Show "or $X a month" under the Package Builder total
- **Category:** Monetization · **Effort:** S · **Impact:** ★★ · **Status:** new
- The total shown in package-builder.html (renderSummary, total-display and total-tax-display) is a single lump sum that easily lands between $5,000 and $10,000 for photo plus video plus an album. Add a line under it, "or about $X a month over 10 months before your date", computed from the wedding date once entered, with a deposit-then-instalments schedule sent through GoHighLevel invoices. Price objections are mostly cash-flow objections, and a visible monthly figure removes the biggest one.

### IDEA-053 · Anniversary club for past couples (continuity)
- **Category:** Monetization · **Effort:** M · **Impact:** ★★★ · **Status:** new
- Xavier has shot 3,000+ weddings (work.html spec list), yet nothing on the site invites those couples back; every product is a one-time sale. Create a yearly offer, for example "Anniversary session plus a printed 8x10, $149 a year or $99 for the first-year anniversary", sold by a GoHighLevel automation that fires on each couple's wedding date. It is the only continuity offer in the model, it reuses a contact list that already exists, and it brings family portraits and referrals as the couples grow.

### IDEA-054 · Preferred-vendor spots inside the Wedding Schedule
- **Category:** Monetization · **Effort:** M · **Impact:** ★★ · **Status:** new
- tools/wedding-schedule.html already has a Vendors Information step (the VENDORS array: Venue, Planner, DJ, Hairdresser, Make-up, Florist, Cake, Boutique, Decor, Jewelry), so every couple tells the tool who they still need. Add a small "Need a florist? Xavier's trusted pick" card next to each empty row, linking to a partner vendor who pays a monthly listing fee or a referral fee per booked couple. It makes money from a free tool without charging couples, and the recommendations deepen Xavier's authority as the person who knows everyone in Montreal weddings.

## 2026-10-08 — SEO, performance, accessibility, mobile

### IDEA-055 · Raise the tiny 9–11px labels to a readable minimum
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- The small uppercase labels that carry real information are set at 9–11px: tools.html (lines ~77, 188, 214, 235 at 9–10px), work.html (lines ~93 and ~137 at 10–11px) and food-for-thought.html (lines ~70, 101, 124). On a phone in daylight, grey (--dust) on black at that size is hard to read, and it is exactly where the chapter tags, tool categories and post dates live. Set a 12px floor (13px on mobile) with a shared CSS variable in assets/style.css so every page gets it at once, keeping the letter-spacing look.

### IDEA-056 · Pause and calm the two WebGL art pages
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/organic-loops.html draws six live shader canvases at once and its visibilitychange handler restarts the animation loop even when the tab is hidden; liquid-silver.html has no prefers-reduced-motion rule at all (the count is 0 in both). On a phone this drains battery and heats the device, and for visitors who have reduced motion turned on it is the one thing that ignores their setting. Stop the loop when the tab is hidden or the tiles are off-screen, draw one still frame when reduced motion is on, and render only the focused tile when one is open.

### IDEA-057 · Make the domain switch a one-line change
- **Category:** SEO · **Effort:** S · **Impact:** ★★ · **Status:** new
- Builds on IDEA-016. The address xavierdebelle.github.io/website is written into every page: the canonical link, og:image and og:url (for example work.html line ~15) and the `<base href="/website/">` in 404.html. The day a custom domain goes live, all of those would point at the old address and split search credit. Before the switch, move the site address into one build-time or search-and-replace constant, and add a short checklist (CNAME file, update sitemap, Search Console address change) so the move loses no ranking.

### IDEA-058 · Automatic Lighthouse and accessibility check on every push
- **Category:** Fix · **Effort:** M · **Impact:** ★★ · **Status:** new
- The site ships a new version every day or two (v71 to v81 in under a week), and speed and accessibility have only been fixed by hand, one page at a time. Add a GitHub Action that runs Lighthouse CI and pa11y against index, work, tools, food-for-thought and the Package Builder, and fails the push if scores drop below a set floor. The same pass can add `defer` to the assets/account.js script tag that currently blocks rendering at the top of every page.
