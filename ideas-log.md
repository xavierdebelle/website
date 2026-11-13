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
- **Category:** Fix · **Effort:** S · **Impact:** ★★★ · **Status:** done (done in v94, 2026-10-16)
- No page has any analytics, so traffic, top tools and where visitors drop off are unknown, and any monetization would be guesswork. Add a Plausible or Umami script tag to every page and track key events (Package Builder export, enquiry clicks, tool opens).

### IDEA-015 · Meta descriptions on every tool page
- **Category:** SEO · **Effort:** S · **Impact:** ★★ · **Status:** done (done in v71, 2026-10-05)
- 17 of the 18 pages in tools/ have no meta description (only neural-mind-map.html has one), so search results show random text. Write one outcome-led sentence per tool.

### IDEA-016 · Move to a custom domain
- **Category:** SEO · **Effort:** S · **Impact:** ★★★ · **Status:** done (done in v87, 2026-10-12)
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
- **Category:** Feature · **Effort:** M · **Impact:** ★★ · **Status:** done (done in v124, 2026-10-25)
- Project Phases, Idea Bank and Budget Tracker already share one sign-in (assets/account.js) but feel like separate files. A single dashboard that lists your projects, ideas and budgets with links into each makes them feel like one product, which is a prerequisite for selling them.

### IDEA-025 · Shot-list builder paired with the Wedding Schedule
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** done (done in v129, 2026-10-29)
- Couples tick off family groupings and must-have shots, linked to the times in tools/wedding-schedule.html. It saves hours of back-and-forth before each wedding, and the result goes straight to the photographer on the day.

### IDEA-026 · Client portal for de Belle couples
- **Category:** Feature · **Effort:** L · **Impact:** ★★★ · **Status:** done (done in v129, 2026-10-29)
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
- **Category:** Feature · **Effort:** M · **Impact:** ★★ · **Status:** done (done in v148, 2026-11-10)
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
- **Category:** Monetization · **Effort:** M · **Impact:** ★★★ · **Status:** done (done in v131, 2026-10-29)
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

## 2026-10-09 — New tool ideas for photographers, couples, creators and real estate

### IDEA-059 · Sunset and golden-hour finder inside the Wedding Schedule
- **Category:** Tool · **Effort:** S · **Impact:** ★★★ · **Status:** new
- tools/wedding-schedule.html builds the day from fixed stages (ceremony, etc.) but never tells the couple when the light is best. Add a date and city field that shows sunset and golden-hour times (a small sunrise/sunset calculation, no server) and flags where the couple portraits fall against it. Couples constantly ask "when should we do portraits?", and it makes the free schedule a reason to hire a photographer who plans around light.

### IDEA-060 · Saved caption and hashtag sets in the Feed Planner
- **Category:** Tool · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/feed-planner.html lets you arrange posts and write captions, but has no hashtag support at all. Add named sets (Wedding, 333 Commercial, Real estate) that insert in one tap, plus a character counter for Instagram's limits. It saves Xavier repeat typing and is a feature other creators would actually share.

### IDEA-061 · Real-estate listing shoot brief for agents
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- The real-estate chapter on work.html has no entry point for agents. Build a one-page form where the agent enters address, square footage, property type and must-have shots (twilight, drone, floor plan), shows a price from the same fixed-rate logic as IDEA-027, and sends the brief to Xavier. This is different from the investor tools in IDEA-029: it targets agents who book repeatedly, which is natural continuity revenue.

### IDEA-062 · Model release and image-usage licence generator
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- No page on the site covers releases or licences, yet 333 Photo commercial and real-estate work depends on both. Add a tool that fills in a model release or a usage licence (term, territory, media) and exports a signable PDF. It protects Xavier, gives clients a professional touch, and licence length becomes a clear upsell lever (longer usage costs more).

## 2026-10-10 — Content, the blog, newsletter, Instagram, audience growth

### IDEA-063 · Let blog posts carry photos
- **Category:** Content · **Effort:** M · **Impact:** ★★★ · **Status:** new
- In food-for-thought.html, bodyNodes() turns the post text into paragraphs and links only; the composer has no way to add an image, so a photographer's blog is text-only. Let the composer accept a photo line (an uploaded image or a pasted URL, with a caption and alt text) and render it full-width in the post. Photo-led posts are the ones people save and share, and they double as portfolio proof.

### IDEA-064 · Share button on every blog post
- **Category:** Content · **Effort:** S · **Impact:** ★★ · **Status:** new
- Each post's meta row in food-for-thought.html offers only a "Link" anchor (#post-id). Replace or sit beside it with a "Share" button that calls the phone's native share sheet (navigator.share, with a copy-link fallback) carrying the post title. Sharing to WhatsApp, Instagram DMs and iMessage is how Montreal couples pass things around, and today it takes three taps and a hand-copied URL.

### IDEA-065 · "Turn this post into a carousel" button
- **Category:** Feature · **Effort:** M · **Impact:** ★★ · **Status:** new
- Xavier already owns tools/carousel-planner.html and tools/feed-planner.html, but a blog post never reaches them. In the composer on food-for-thought.html, add a button that splits the post into slide-sized chunks (title slide, one point per slide, final "read more" slide) and opens them as a draft in the Carousel Planner. One piece of writing then becomes a week of Instagram content, and the planner gets a real use inside Xavier's own workflow.

### IDEA-066 · A "Montreal wedding venues" guide series that ends in a booking nudge
- **Category:** Content · **Effort:** M · **Impact:** ★★★ · **Status:** new
- food-for-thought.html is all personal essays (reading, building, arguing), so nothing on the site answers what an engaged Montreal couple actually searches for. Write a recurring series of one post per venue or neighbourhood (light at golden hour, best photo spots, rain plan, a sample timeline from the Wedding Schedule tool) and end each with the date check or enquiry link. Xavier already knows these venues from shooting them, which makes this the cheapest high-intent content he can publish.

### IDEA-067 · A link-in-bio page for Instagram
- **Category:** Conversion · **Effort:** S · **Impact:** ★★★ · **Status:** new
- The site links out to instagram.com/xavierdebelle in every footer, but nothing receives traffic coming the other way: the bio link has to land on the full mind map in index.html. Add a small mobile-first links.html with four big buttons (latest post, book de Belle, 333 Photo, free tools), each tagged so GoHighLevel knows it came from Instagram. It gives every story and reel one short address to point at and shows which content actually sends people.

## 2026-10-11 — Wildcard (what the best photographer, creator and tool sites do that this one doesn't)

### IDEA-068 · FAQ block on work.html that answers the questions couples and clients actually ask
- **Category:** Conversion · **Effort:** S · **Impact:** ★★★ · **Status:** new
- No page of the public site (work.html, index.html, who-am-i.html) carries a FAQ; the only FAQ text lives inside tools like potluck.html. Top photographer sites answer the same 8 questions near the contact step: how far ahead to book, deposit and payment schedule, travel outside Montreal, how long until photos and video arrive, what happens if you are sick, can we meet first, do you shoot in French, what about raw files. Add a collapsible FAQ above the "Email me" call in each chapter (one set for de Belle, one for 333 Photo) and mark it up as FAQPage structured data, so the answers can also appear directly in Google. It removes the doubts that stop people writing.

### IDEA-069 · Referral link for past couples and vendors, with a thank-you gift
- **Category:** Monetization · **Effort:** M · **Impact:** ★★★ · **Status:** new
- Referrals are the biggest source for a 30-year wedding studio, yet nothing on work.html, in the tools or in the footers asks for one, and IDEA-053 only brings past couples back for themselves. Give each past couple and favourite vendor a personal link (work.html?ref=anna-and-marc) that GoHighLevel stores on the new lead, and automatically thank the referrer when that lead books, for example a free print or credit toward an anniversary session. The attraction cost drops to a gift, and the referrer is reminded of Xavier every time they share the link.

### IDEA-070 · "One job, start to finish" case studies for 333 Photo
- **Category:** Content · **Effort:** M · **Impact:** ★★★ · **Status:** new
- The 333 Photo chapter of work.html describes services in a spec list but never shows a job. Commercial buyers (restaurants, developers, agencies) choose on proof that the supplier delivers on time, so write three short pages: the brief, the shot list, a handful of finished images, turnaround time and the price range, ending in the 333 estimate request. Each one also becomes a LinkedIn post and a sales-outreach attachment, and it is the one kind of content the other photographer sites in Montreal rarely publish.

### IDEA-071 · Sticky "Check my date / Enquire" bar on phones
- **Category:** Conversion · **Effort:** S · **Impact:** ★★ · **Status:** new
- work.html is a long vertical scroll (de Belle, 333 Photo, real estate) and the only contact link sits at the bottom of each chapter, so a visitor who is convinced halfway down has to scroll to find it. Best photographer sites keep a slim bar fixed at the bottom of the phone screen with one button that follows you down, and it changes its wording to match the chapter on screen ("Check my wedding date", "Get a 333 estimate", "Talk property"). Pair it with the source tags from IDEA-041 so each bar button is measurable.

### IDEA-072 · "Ask Xavier" assistant that answers questions and books the call
- **Category:** Feature · **Effort:** L · **Impact:** ★★ · **Status:** new
- Kitchen (tools/kitchen.html) already shows the site can call Claude, but visitors to work.html get no instant answer outside office hours. Add a small chat on work.html, fed only by Xavier's own packages, FAQ (IDEA-068) and availability, that answers a couple's question, then asks for name, date and email and creates the GoHighLevel lead. It runs through a Firebase function so no key sits in the page, and it answers at 11pm on a Sunday when couples do most of their wedding planning.

## 2026-10-12 — Conversion and lead capture

### IDEA-073 · Tap-to-call and tap-to-text beside every "Email me"
- **Category:** Conversion · **Effort:** S · **Impact:** ★★ · **Status:** new
- The only way to reach Xavier from work.html (lines ~319 and ~342), the footers and the mind map is an email link, yet tools/package-builder.html already prints a phone number (514.887.4686) in its export. Many couples and small-business owners would rather text from their phone than compose an email. Add "Call or text" buttons (tel: and sms: links, with a pre-filled "Hi Xavier, I found you through your site" body) next to each email button, and tag them like IDEA-041 so GoHighLevel's conversation inbox sees the source.

### IDEA-074 · "Add $X more to unlock the next discount" nudge in the Package Builder
- **Category:** Conversion · **Effort:** S · **Impact:** ★★★ · **Status:** new
- tools/package-builder.html has a volume-discount ladder (getDiscount(), rising from 1% above $2,500 to 12% above $11,000) but the couple only sees the discount after reaching it. Show a quiet line under the total, "You're $180 away from 4% off ($150 saved)", that updates as they tick options. Couples nudged just below a threshold tend to add one more item, which lifts the average booking without Xavier saying a word.

### IDEA-075 · Turn the Get Access request into a tagged lead
- **Category:** Conversion · **Effort:** M · **Impact:** ★★ · **Status:** new
- access.html collects a Google sign-in from every person who wants Sync, which is a warm, self-selected list of people who like the tools, but today it only reaches Xavier as an approval request. Add one question ("I'm a couple / photographer / agent / just curious") and an optional checkbox to hear from Xavier, then send the answer to GoHighLevel as a contact with a tag. Only people who tick the box get contacted, which keeps it in line with the privacy policy (Law 25) and still gives the tools a real lead source.

### IDEA-076 · Give the Real Estate chapter its own two-way contact
- **Category:** Conversion · **Effort:** S · **Impact:** ★ · **Status:** new
- The Real Estate chapter in work.html (around line 319) ends in a generic "Talk property" mailto, but this lane is Xavier's own duplex project, so visitors are sellers, contractors, partners and agents, not clients. Replace the button with a short "I'm looking for: off-market duplexes in Montreal · renovation trades I can trust · investors to compare notes with" list and a mailto with a pre-filled subject for each. It attracts the people the lane needs and keeps property leads from mixing with wedding enquiries in GoHighLevel.

## 2026-10-13 — Monetization and offers

### IDEA-077 · Sell Glam Studio on its own to 333 Photo clients for corporate events
- **Category:** Monetization · **Effort:** S · **Impact:** ★★★ · **Status:** new
- tools/package-builder.html already prices Glam Studio as a standalone booking (glam_standalone, $2,000 for 5 hours with instant 4x6 B&W prints), described as "a full editorial portrait experience", but it only appears inside the wedding builder. The 333 Photo chapter of work.html lists fashion, product and lifestyle and never mentions events. Add an "Event portrait studio" line to that chapter and a short page for company parties, launches and galas, priced from the same $2,000 and sent to the 333 estimate request. The product, price and equipment exist already, so it is a new B2B buyer for an offer that needs no build.

### IDEA-078 · Parents' album and print reorder offer after the gallery is delivered
- **Category:** Monetization · **Effort:** M · **Impact:** ★★★ · **Status:** new
- package-builder.html sells Parent Album Duplicates ($500) and a Graphi Sleeve ($150) as add-ons chosen months before the wedding, when couples are not thinking about albums yet. Add a post-delivery step: a GoHighLevel email and text sequence, starting about 3 weeks after the gallery goes out, saying "Your parents will want these", with a link to a one-page order of parent albums, framed prints and canvases. This reaches the people who actually pay for it (parents, grandparents) at the moment the photos are exciting, and it is an upsell that needs no discount.

### IDEA-079 · Put a named guarantee beside the Package Builder total
- **Category:** Monetization · **Effort:** S · **Impact:** ★★ · **Status:** new
- The total in tools/package-builder.html is followed only by the export button, and no page on the site (work.html, the builder, who-am-i.html) states any promise that lowers a couple's risk. A $6,000 purchase from a person they have never met needs one. Add a short, specific guarantee under the total, for example "Every key moment on your schedule is covered, or the album design is free", and repeat it in the de Belle chapter of work.html. It is the cheapest way to raise the share of couples who go from pricing to enquiring, and it sets the studio apart from competitors that promise nothing.

### IDEA-080 · "Team headshot day" as a fixed-price 333 Photo offer
- **Category:** Monetization · **Effort:** M · **Impact:** ★★★ · **Status:** new
- The 333 Photo chapter in work.html leads with fashion, product and lifestyle, but small companies, clinics and real-estate offices mostly need one thing: current headshots for their whole team. Productize it in a single page: "Team headshot day, from $X per person, minimum 6 people, on-site, edited files in 48 hours", with a per-head price that drops at 10 and 20 people and a headcount field that sends the request into GoHighLevel. It is easy to understand, sells repeatedly as people join the team (continuity), and every attendee is a possible lead for the rest of 333 Photo.

## 2026-10-14 — Monetization and offers

### IDEA-081 · Stop the site publish from wiping the ideas log
- **Category:** Fix · **Effort:** S · **Impact:** ★★★ · **Status:** done (done in xdb-workspace@11f3bbc, 2026-10-16)
- The v90 publish (copied from xdb-workspace by publish-site.yml) overwrote ideas-log.md with an older copy, deleting IDEA-073 to IDEA-080 and resetting IDEA-016 to "new"; they were restored by hand on 2026-10-14. The workspace's `Website Files/` has no copy of the daily log commits, so every publish will do this again. Either pull ideas-log.md into the workspace before each release, or list it in publish-site.yml as a file the copy must never overwrite (or move the log into the workspace and have this routine write there).

### IDEA-082 · Price "Round 3+" and offer an extra cut on the Video Corrections thank-you screen
- **Category:** Monetization · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/video-corrections.html lets a couple pick "Round 3+ · Further refinements" as freely as Round 1, and its thank-you screen ("Your corrections have been received") offers nothing but "Submit another correction". State the policy on the Round 3+ card ("Rounds 1 and 2 are included; each further round is $X") and, on the thank-you screen, offer the deliverables they didn't select in the form (for example a Vertical Reel or the Full Feature) at a set price with a link to pay. Couples are watching their film at the most emotional point of the whole relationship, which is the best moment for an upsell, and pricing extra rounds protects the editor's time.

### IDEA-083 · Prepaid hour blocks for 333 Photo, shown live in the Project Phases client link
- **Category:** Monetization · **Effort:** M · **Impact:** ★★★ · **Status:** new
- tools/project-tracker.html already logs every hour against a project, sums it in the Report (with This month since v91) and shares a read-only Client link, but has no idea of how many hours the client has paid for. Add an "Hours purchased" field per project and a meter in the Report and the client view ("6.5 of 10 hours used this month"), with a "Top up 10 hours" payment link when fewer than 2 remain. That lets 333 Photo sell design, web and marketing work as a monthly hour block (continuity) that clients can see being used, which removes the "what am I paying for?" doubt that ends most retainers.

### IDEA-084 · "Add a photographer for 2 hours" on the organiser view of Activity Planner and Potluck
- **Category:** Monetization · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/activity-planner.html and tools/potluck.html are used by organisers planning birthdays, team events and weekend gatherings, but nothing in them offers what Xavier sells; IDEA-042 only targets guests, for weddings. On the organiser's own screen (signed-in view only), add one card: "Want this remembered? 2 hours of event photos, 100 edited images in a week, from $X", sending the event name and date to GoHighLevel. It is a small attraction offer for non-wedding events that turns a free tool's best users into paying clients, and each event's guests then see the photos with Xavier's name on them.

### IDEA-085 · Hosted Claude credits so Kitchen's photo features work without a key
- **Category:** Monetization · **Effort:** M · **Impact:** ★★ · **Status:** new
- Builds on IDEA-034. tools/kitchen.html only reads recipe cards, fridge photos and dish photos once the user pastes their own Anthropic key ("Add a Claude key in Taste first"), which almost no friend or family member will have. Offer "Kitchen Plus", about $3 a month or $25 a year, that routes those calls through a Firebase function on Xavier's key with a monthly cap per account, using the same member flag as the Pro tier. The AI features are the tool's most impressive part, and this turns them from a setup hurdle into the thing people pay for.

## 2026-10-15 — SEO, performance, accessibility, mobile

### IDEA-086 · Let guests pinch-zoom the Activity Planner and Wedding Activities pages
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/activity-planner.html and tools/wedding-activities.html set `maximum-scale=1.0` in their viewport tag, which stops anyone from zooming in on a phone. These are the pages shared with groups of guests, including older relatives, and blocking zoom fails a basic accessibility rule (WCAG text resize). The usual reason for the lock (iPhone zooming into small inputs) is already handled, because activity-planner.html forces inputs to 16px. Remove `maximum-scale=1.0` from both.

### IDEA-087 · Make the Package Builder usable with a keyboard and a screen reader
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- In tools/package-builder.html every choice (option-card, addon-row, album-type-card) is a `<div onclick>`, so it can't be reached with Tab, can't be picked with Enter or Space, and a screen reader doesn't say whether it is selected. The running total also changes without being announced. Turn each card into a `<button aria-pressed>` (styles stay the same) and add `aria-live="polite"` to the total. It is the most valuable page on the site for bookings, and Lighthouse's accessibility score counts it.

### IDEA-088 · Search-ready page titles and headings
- **Category:** SEO · **Effort:** S · **Impact:** ★★★ · **Status:** new
- The title tags (the blue link Google shows) read "WORK — XAVIER DE BELLE", "TOOLS — XAVIER DE BELLE", and on tools just "Portfolio", "Potluck" or "Carousel Planner"; work.html's main heading is "Three Lanes", and carousel-planner, freecanvas, portfolio-grid and portfolio-masonry have no h1 at all. None of them contain the words people actually search for. Rewrite each title in normal case with the search phrase first (for example "Montreal Wedding & Commercial Photographer · Xavier de Belle", "Free Instagram Grid Planner · Feed Planner"), and add a visually hidden h1 where a tool has none. It is the cheapest ranking change on the site and makes every result look less like shouting.

### IDEA-089 · Self-host the fonts in one shared folder
- **Category:** Fix · **Effort:** M · **Impact:** ★★ · **Status:** new
- tools/potluck.html weighs 677 KB because 16 fonts are pasted into it as base64 text, and at least two of them twice (lines ~47/65 and ~56/74 are identical), so every guest opening a potluck link on mobile data downloads over half a megabyte before seeing anything. Budget Tracker, Cycle Calendar and Activity Planner load Google Fonts through a CSS `@import`, which delays the page further. Put the few typefaces actually used as .woff2 files in assets/fonts/ with `font-display: swap`, link them from each tool, and drop the duplicates. Pages load faster, files cache between tools, and privacy.html can delete its paragraph about Google seeing visitors' IP addresses.

### IDEA-090 · A "What does a wedding photographer cost in Montreal?" guide page
- **Category:** SEO · **Effort:** M · **Impact:** ★★★ · **Status:** new
- No page on the site targets the question couples type most before contacting anyone, and the real price data already sits in tools/package-builder.html (PHOTO_OPTIONS, VIDEO_OPTIONS, the discount ladder). Unlike the one-line teaser in IDEA-003, this is a standalone, crawlable page: typical ranges for photo, video and albums in Montreal, what drives the price, what to watch out for, and a "build your exact package" button into the Package Builder. Mark it up as an article with a few FAQ answers, and update the figures each January. It brings in couples who are actively shopping, and they arrive already knowing the range, so the enquiries that follow are better qualified.

## 2026-10-16 — New tool ideas for photographers, couples, creators and real estate

### IDEA-091 · Photo Corrections: pin retouch notes on a 333 Photo image
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** done (done in v99, 2026-10-21)
- tools/video-corrections.html already turns a wedding couple's video notes into one structured submission posted to GoHighLevel (`corrections-sent`), but commercial clients of 333 Photo still send photo retouch requests as long emails ("the third one, a bit brighter on the left"). Build the photo version from the same form and webhook: the client pastes a gallery link or drops a low-res proof, taps the spot on the image to drop a numbered pin, types the fix, and sends the whole list in one go. It cuts revision back-and-forth on every commercial job and gives Xavier a clean record of what was asked, which also makes it easy to bill a third round (the same logic as IDEA-082).

### IDEA-092 · "Will it print?" size checker that ends in a print order
- **Category:** Tool · **Effort:** S · **Impact:** ★★ · **Status:** new
- Builds on IDEA-078. No tool on the site helps anyone after the photos are delivered, and package-builder.html only sells prints and albums before the wedding. Add a small free tool: drop any photo, it reads the pixel size in the browser (nothing uploaded) and shows which print sizes look sharp (4×6 up to 24×36 and canvas), with the crop each frame ratio will cut, then an "Order this print from Xavier" button that sends the size and file name to GoHighLevel. Anyone printing a phone photo can use it, and it gives the parents' print offer in IDEA-078 a page to land on.

### IDEA-093 · Montreal photo-spot finder for engagement and portrait sessions
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- The Package Builder sells an "Engagement / Casual Photoshoot" ($350, oa_engagement) and the wedding schedule asks for locations, but nothing helps a couple choose where to shoot. Build a filterable list or map of 15–20 spots Xavier actually uses (Old Port, Mount Royal lookout, Jean-Talon, Westmount library…) with season, best time of day, whether a permit or fee applies and one sample photo each, ending in "Book your engagement session here". It answers a question couples genuinely search for, gives Instagram something to link to every week, and leads straight into the $350 session.

### IDEA-094 · One-tap vendor sheets from the Wedding Day Schedule
- **Category:** Feature · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/wedding-schedule.html collects every vendor (vendorBlocks, with phone numbers) and the full timeline, but its only output is one "Print / Save as PDF" of the whole day. Add a "Vendor sheets" button that prints one page per vendor: only the times and places that vendor is needed, the planner's and photographer's phone numbers, and a small "Timeline prepared with de Belle Photography" footer. Couples currently retype this for the DJ, florist and caterer; doing it for them makes the tool worth sharing, and every vendor in Montreal who receives a sheet sees Xavier's name.

### IDEA-095 · Guest photo drop: a QR code at the reception for everyone's phone photos
- **Category:** Monetization · **Effort:** L · **Impact:** ★★★ · **Status:** new
- Package Builder already sells a guest-facing extra (Same Night Prints) and IDEA-035 covers a guest website, but nothing collects the hundreds of phone photos guests take. Build a page where guests scan a table card QR, add photos without an account (Firebase storage, one folder per wedding, size-capped), and the couple sees them all in one gallery the next day, branded de Belle. Sell it as a $99–149 add-on in the Package Builder (or free with the top bundle) and as a stand-alone product for weddings Xavier doesn't shoot; apps like this charge couples directly, and every guest who scans it sees his name on the night.

## 2026-10-17 — Content, the blog, newsletter, Instagram, audience growth

### IDEA-096 · Topics and a contents list on Food for Thought
- **Category:** Content · **Effort:** S · **Impact:** ★★ · **Status:** new
- render() in food-for-thought.html prints every post in full, one after another, with no excerpt, no topic and no list of titles, so by post ten a visitor has to scroll through thousands of words to find the one they came for, and nobody can see at a glance what the blog is about. Add an optional "Topic" field to the composer (for example Building, Reading, Weddings, Business) and a compact contents list at the top of the page: number, title, topic, minutes, with topic chips that filter it. It turns one long scroll into a library people can browse, and shows a first-time reader in two seconds whether the blog is for them.

### IDEA-097 · A "next step" card at the end of each blog post
- **Category:** Conversion · **Effort:** S · **Impact:** ★★ · **Status:** new
- Every post in food-for-thought.html ends with nothing: no link onward, so a reader who just finished and liked it simply closes the tab. Add an optional "Next step" picker to the composer (a tool from tools.html, a book from library.html, or a chapter of work.html) that renders as one card under the post, for example a post about planning ending in "Try the Wedding Day Schedule" or a post about a book ending in its Library card. Each post then points readers at the one thing on the site it naturally leads to, and Umami (v94) shows which posts actually send people on.

### IDEA-098 · Schedule blog posts to go live on set days
- **Category:** Feature · **Effort:** S · **Impact:** ★★ · **Status:** new
- The composer in food-for-thought.html has one button, Publish, which makes the post public immediately; the only draft is one copy kept on the device. Add a "Publish on" date and time and a list of queued posts that only Xavier sees, with the page showing a post only once its time has passed (and the database rules hiding it until then). Xavier can write three posts on a quiet Sunday and have them appear on a steady Tuesday and Thursday rhythm, and a predictable rhythm is what turns occasional readers into people who come back.

### IDEA-099 · Real wedding stories that credit every vendor
- **Category:** Content · **Effort:** M · **Impact:** ★★★ · **Status:** new
- Builds on IDEA-063. tools/wedding-schedule.html already collects each couple's vendors (the VENDORS list: venue, planner, DJ, florist, make-up and more), but none of the 3,000+ weddings appears anywhere on the site. Once posts can carry photos, publish one short story per wedding with the couple's permission (their day in 8 to 12 images, one moment Xavier remembers) and end it with a vendor credit block pulled from their schedule, each name linked. The couple shares it with family and friends, every credited vendor shares it with their own followers, and each post is a page an engaged couple can find by searching the venue's name.

## 2026-10-19 — Conversion and lead capture

### IDEA-100 · Keep the mind map's Work branch on the site
- **Category:** Conversion · **Effort:** S · **Impact:** ★★ · **Status:** new
- In index.html the MAP data sends "De Belle Photo" and "333 Photo" straight to debellephotography.com and 333photo.com (external:true), and only "Real Estate" opens work.html, so the home page's two money nodes skip the one page built to sell them (and where Umami counts the visit). Point those two leaves at work.html#de-belle and work.html#333-photo, where the outside-site buttons still sit, and add a fourth "Price your wedding" leaf under Connect that opens tools/package-builder.html. Visitors from the home page then see the studio story, the specs and the tools before they leave, and every step stays measurable.

### IDEA-101 · "Price your wedding in 2 minutes" button in the de Belle chapter
- **Category:** Conversion · **Effort:** S · **Impact:** ★★★ · **Status:** new
- The de Belle chapter of work.html (around line 251) offers only "debellephotography.com ↗" and "The tools behind it →" (which lands on the tools.html grid), so a couple reading about the studio is never handed the Package Builder, the most qualifying page on the site. Add a solid button "Price your wedding in 2 minutes →" straight to tools/package-builder.html, opened in the same tab, as the chapter's first action. A couple who builds a package has told themselves the price before they write, which makes every enquiry that follows warmer, and it is the entry point IDEA-007 and IDEA-031 need to get traffic.

### IDEA-102 · Remember the package and let the couple share it with a link
- **Category:** Conversion · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/package-builder.html keeps nothing (no localStorage, no URL state), so a reload or a closed tab wipes the whole build, and the only output is a .txt download. Save the selections on the device as they change, and add a "Share this package" button that writes them into the link (for example ?p=…) and opens the phone's share sheet, so the same package reopens exactly for a partner or parents. Wedding budgets are decided by two to four people, often with parents paying, and a link that opens the live, priced package travels further than a text file, with Xavier's brand on every open.

### IDEA-103 · Autosave the Wedding Day Schedule as it's filled in
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/wedding-schedule.html has 31 fields plus repeating vendor blocks, says "everything stays on your device until you print or save", but stores nothing, so a reload, a phone locking the tab or a stray "Clear Form" tap loses an evening's work. Save the form to localStorage on every change, restore it on open, and ask for confirmation before Clear. Couples who lose a half-built schedule don't come back, and the ones who finish it are the ones who reach the PDF and email step in IDEA-045.

## 2026-10-20 — One tool in full: Journal

### IDEA-104 · Encrypt the Journal before it syncs, with an optional passcode
- **Category:** Fix · **Effort:** M · **Impact:** ★★ · **Status:** new
- tools/journal.html sends every entry (moods, "three good things", the free writing) to Firebase as plain text through pushNow(), and privacy.html says outright that the database administrator "could technically open it". A diary is the most private thing anyone will ever type on the site, and that sentence is enough to stop a friend from trusting it. Add an optional passcode: the browser derives a key from it (Web Crypto, PBKDF2 + AES-GCM) and only the encrypted entries go into users/{uid}/tools/journal, with a lock screen when the app opens. Then privacy.html can say "not even I can read your journal", which is also the first thing a paying user of IDEA-034's Pro tier would ask about.

### IDEA-105 · One photo a day in the Journal
- **Category:** Feature · **Effort:** M · **Impact:** ★★★ · **Status:** new
- The Journal's own prompt list asks "If today were a photo, what would be in the frame?", yet an entry can only hold a mood, three lines, text and tags. Let each day carry one photo (shrunk to about 1080px in the browser and kept in IndexedDB, not localStorage, so it can't fill up like IDEA-046), show it as a thumbnail on the calendar days in renderAside() and next to each memory in "On this day". A photographer's journal that builds a photo-a-day diary is a natural fit for the brand, a strong reason to open it every evening, and it is what makes the printed book in IDEA-108 worth buying.

### IDEA-106 · "Remind me every evening" calendar reminder
- **Category:** Feature · **Effort:** S · **Impact:** ★★ · **Status:** new
- The Journal is built around a streak (streaks() and the stats panel), but nothing ever reminds anyone to write, and an installed web app can't send its own push notifications without a server. Add a "Remind me" button that downloads a small .ics file: a daily repeating event at the time the person picks (for example 21:00) whose link opens tools/journal.html straight on today. It works on every phone and computer calendar with no server, and a daily nudge is what keeps a streak, and a habit, alive past the first week.

### IDEA-107 · "What makes a good day" insights from moods and tags
- **Category:** Feature · **Effort:** S · **Impact:** ★★ · **Status:** new
- The Journal already stores a 1–5 mood and tags for every day, but the stats panel only shows the streak, entries this month, a 30-day average mood and total words. Add a small "Patterns" panel: the tags that show up most on Good and Great days versus Low and Rough ones ("#training on 80% of your good days"), the best and worst weekday, and the mood by month as a row of coloured squares. It turns months of entries into something people learn from, which is the moment someone tells a friend about a tool.

### IDEA-108 · "Print your year": a hardcover book of the Journal, sold each December
- **Category:** Monetization · **Effort:** M · **Impact:** ★★ · **Status:** new
- The Journal can export everything as .md or .json, and Xavier already sells printed albums through the Package Builder (album types, Parent Album Duplicates), so the lab and the design know-how exist. Add an "Order my year as a book" button in the Entries view that sends the year's entries (and photos, with IDEA-105) to a GoHighLevel order form, and lay them out as a hardcover: one page per day, mood and good things in the margin, at about $89–149. It sells again every December (continuity), makes a natural gift, and gives anyone who journals with the tool a reason to buy from Xavier without ever booking a shoot.

## 2026-10-21 — Monetization and offers

### IDEA-109 · "All approved? Pay the balance, get your finals" in Photo Review
- **Category:** Monetization · **Effort:** M · **Impact:** ★★★ · **Status:** new
- In tools/photo-review.html the client's "✓ Approve this photo" button (btnApprove, line ~528) only writes an `ok: true` note, and once every photo is approved nothing happens: no next step, no invoice, no delivery. Let the host paste a GoHighLevel invoice or payment link and a finals link per review; when the last photo is approved, the client sees one closing card ("All 24 photos approved. Pay the balance of $X and your full-resolution files are here"), with the finals link shown once Xavier marks the review paid. The moment of approval is when a client is happiest and the work is fresh, so the balance gets paid then instead of being chased for weeks.

### IDEA-110 · Ask for a Google review the moment a client approves
- **Category:** Conversion · **Effort:** S · **Impact:** ★★★ · **Status:** new
- Video Review (v98) and Photo Review (v99) now capture the exact moment a couple or a 333 client says "this is perfect" (an approval, or the host marking the last note done), yet no screen on the site ever asks for a review; IDEA-044 only displays reviews, it doesn't collect them. Right after the toast "Approved ✓", show a short card: "Glad you love it. Would you tell others? Leave a Google review", linking to the de Belle or 333 Photo review page set per review, and track it with `xdbTrack('review-ask')`. Reviews asked for at the peak moment come in far more often, and every one feeds the strip in IDEA-044 and the ranking of both businesses on Google Maps.

### IDEA-111 · "Free photo check of your website" offer after Web Squeeze
- **Category:** Monetization · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/web-squeeze.html ends with a summary ("12 done · 48 MB → 3.1 MB") and "Download all (.zip)", and its users are, by definition, small-business owners and creators fixing the photos on their own website, which is exactly 333 Photo's buyer. Under the summary, once files are done, add one card: "Smaller files fix the speed. Better photos fix the sales. Send me your site and I'll tell you which 5 photos to reshoot, free", posting the site address and email to GoHighLevel tagged "web-squeeze". It turns a free utility into a 333 Photo attraction offer (free audit, then a website photo shoot), aimed at people who already care about their site's images.

### IDEA-112 · One-page brand sheet from Colour Wheel, sold as a 333 Photo add-on
- **Category:** Feature · **Effort:** M · **Impact:** ★★ · **Status:** new
- tools/colour-wheel.html already pulls five colours out of a photo (k-means in OKLab), names what each colour makes people feel, checks contrast, and exports .ase, but the only outputs are swatch files a client can't read. Add an "Export brand sheet" button that lays out one printable page: the palette with hex/CMYK, the "How it feels" summary, which colour pairs pass contrast for text, and the source photo. Offer it on 333 Photo shoots as a $150–250 add-on ("your brand colours, taken from your own photos") and as a free sample for leads from IDEA-111. It is a deliverable the tool can already almost produce, and it gives commercial clients a reason to spend more per shoot.

## 2026-10-22 — SEO, performance, accessibility, mobile

### IDEA-113 · Live total bar on phones in the Package Builder
- **Category:** Conversion · **Effort:** S · **Impact:** ★★★ · **Status:** new
- In tools/package-builder.html the summary and total sit in `.sidebar`, which comes after `.builder-main` in the page, and below 960px the CSS turns it from sticky to `position:relative` (line ~182). So on a phone, where most couples browse, the total and discount only appear after scrolling past every option; tapping a $2,000 add-on changes nothing they can see. Add a slim bar fixed to the bottom of the screen on phones only ("Your package · $6,450 · View"), updated in renderSummary() and scrolling to the summary on tap. Seeing the price move with each choice is what makes a builder feel like shopping, and it is where IDEA-052, IDEA-074 and IDEA-079 would be read on mobile.

### IDEA-114 · Phone-ready fields in the Wedding Day Schedule
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- Every one of the 27 inputs in tools/wedding-schedule.html is a plain text box: phones and emails (lines ~177–180) open the letter keyboard, guest counts and the payment amount have no number pad, the Pinterest link isn't `type="url"`, nothing has `autocomplete`, and no `<label>` is tied to its input (no `for`/`id`, no wrapping), so a screen reader reads "edit text" with no name and tapping a label doesn't focus the field. Add `type="tel"`/`"email"`/`"url"`, `inputmode="numeric"`, `autocomplete="name"`/`"tel"`/`"email"`/`"street-address"` on the addresses, and link each label to its input (also in the JS-built timeline and vendor blocks, lines ~254–279). Couples fill this in on their phone, and fewer keyboard switches and autofilled contact details mean more of them reach the end.

### IDEA-115 · Unwrap the three "bundler" pages into plain HTML
- **Category:** Fix · **Effort:** M · **Impact:** ★★ · **Status:** new
- tools/liquid-silver.html (412 KB), tools/organic-loops.html (125 KB) and tools/volley-bbq-zine.html (544 KB) are design-tool exports: the real page is a JSON string inside a script (line ~197–200), with its JavaScript and fonts packed as base64 (volley's line ~189 holds 443 KB of woff2 fonts), and the visible page is only a "loading" badge until a script unpacks it. The outer page has no viewport tag and no `lang`, so Google, link-preview bots and anyone with a slow phone see an empty cream or black screen first. Export each one as the plain inner HTML (it already has its own viewport tag) with the fonts as files, as IDEA-089 proposes for Potluck; the volley page is the one shared by link with a group, so it gains the most.

### IDEA-116 · Load Photo Review images at the size of the screen
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- srcsOf() in tools/photo-review.html always asks Google's image server for the 3000 px review copy (`=w3000`, line ~414), and ShootProof photos load their largest `/3x/` file, even on a 390 px phone; a 24-photo review then downloads tens of megabytes over mobile data, and each swipe waits for a full-size file. Request a width from the screen instead (`min(3000, viewport width × devicePixelRatio)`, so about 1200 px on a phone), switch to the 3000 px copy only when the client zooms in, and fetch the next photo in the background. Pins and drawings are stored relative to the image, so they land in the same spot at any size; clients see each photo faster, which is when they are most likely to approve it.

## 2026-10-23 — New tool ideas for photographers, couples, creators and real estate

### IDEA-117 · "Real estate listing" preset in Web Squeeze that orders and renames the photos
- **Category:** Tool · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/web-squeeze.html has "Made for" presets for Website, Instagram, TikTok, YouTube and Newsletter, keeps the original camera file names and always zips to "web-squeeze.zip", so the real-estate lane on work.html gets nothing from the newest tool. Add a "Real estate listing" preset sized for what Centris and Realtor.ca accept, a drag-to-order list with room labels (01-facade, 02-living-room, 03-kitchen…) that renames each file, and a zip named after the address typed at the top. Agents re-sort and rename every delivery by hand before uploading, so this saves them time on each listing, and it doubles as the way Xavier hands over his own real-estate shoots.

### IDEA-118 · Seating chart planner with printable table cards
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- tools/wedding-schedule.html asks for "Approx. number of guests" and guests per location, and Potluck and Activity Planner already handle guest lists, but nothing on the site helps with the job couples dread most in the last month: who sits where. Build a planner where the couple pastes their guest list, drags names onto round or long tables (with "keep together" and "keep apart" flags), then prints an alphabetical escort list for the entrance, one card per table and a table-by-table sheet for the venue, each with a small "Planned with de Belle Photography" line. Couples search for this tool and share it with their planner and parents, and the table cards are the natural place for the guest photo drop QR code from IDEA-095.

### IDEA-119 · "What should I charge?" price calculator for photographers
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- Xavier just built tools/package-builder-admin.html (v118) to set his own prices, but other photographers, the buyers of the white-label tools in IDEA-033 and the workshop in IDEA-036, mostly guess theirs. Build a free calculator: yearly costs (gear, software, insurance, car), the salary they want, weddings or shoots per year, and the real hours per job including culling, editing and emails, giving the minimum price per wedding and per hour, plus a "your current price vs. what you need" check. End with "Want your own Package Builder with these prices? Join the waitlist", tagged "photographer" in GoHighLevel. It is the most shared kind of tool among photographers, and it builds the list of studios Xavier needs before pre-selling IDEA-033.

### IDEA-120 · Call sheet maker for 333 Photo shoots
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- tools/project-tracker.html (Project Phases) tracks hours and phases for 333 Photo jobs and IDEA-094 makes vendor sheets for weddings, but no tool covers the commercial shoot day itself: the client still gets times, address and parking in a long email. Build a one-page call sheet: date, address with a map link, parking and entrance notes, call time per person (crew, talent, client contact), the shot list in order, sunrise/sunset and the forecast for the day, and every phone number, shared as a read-only link and a PDF headed "Produced by 333 Photo". Clients forward it to their whole team, so it looks professional to the people who decide on the next job, and it cuts the "what time do we need to be there?" messages on shoot morning.

### IDEA-121 · Album spread proofing in Photo Review, with extra pages priced live
- **Category:** Monetization · **Effort:** M · **Impact:** ★★★ · **Status:** new
- tools/package-builder.html sells albums by the page ($30 to $75 a page, 24 or 30 pages minimum), and tools/photo-review.html already lets a client pin notes and approve, but only one photo at a time, so album design approval still happens over email with PDFs. Add an "Album" review type that shows the designed spreads two pages at a time, lets the couple pin notes or ask to swap a photo, and keeps a live line: "28 pages · 4 more than your 24 · $260 at $65 a page", with approve and pay together at the end. Couples almost always want more pages once they see their own photos laid out, and pricing the extra spreads right there turns that wish into an upsell instead of an awkward follow-up email.

## 2026-10-24 — Content, the blog, newsletter, Instagram, audience growth

### IDEA-122 · "Reply to this post" button that opens a conversation with Xavier
- **Category:** Content · **Effort:** S · **Impact:** ★★ · **Status:** new
- In food-for-thought.html each post's meta row has only a "Link" anchor and the post body ends with nothing, so the only way for a reader to answer is the generic "Email" link in the footer. The best newsletter writers grow by asking readers to hit reply. Add a quiet "Reply to Xavier" line under every post that opens an email (or a text on phones) with the subject "Re: <post title>" already filled in, tracked with `xdbTrack('post-reply')`. Replies tell Xavier which posts land, give him the next post's topic, and each one is a real person starting a conversation he can later invite to the newsletter (IDEA-022).

### IDEA-123 · Draft a monthly "What I read" post straight from the Library
- **Category:** Feature · **Effort:** S · **Impact:** ★★ · **Status:** new
- library.html already stores every book with a date read, a star rating, notes and a Recommended shelf (pages/library in Firebase), but none of it ever reaches the blog, which only grows when Xavier sits down to write from scratch. Add a "Draft this month's reading" button in the Food for Thought composer (owner only) that pulls the books with a `dateRead` in the past month and fills the draft with title, author, rating and his notes, ready to edit and publish. It gives the blog a steady monthly post that takes ten minutes, shows the Library to people who would never find it, and a reading list is the kind of post readers save and forward.

### IDEA-124 · Posting dates in the Feed Planner and a GoHighLevel Social Planner export
- **Category:** Tool · **Effort:** M · **Impact:** ★★★ · **Status:** new
- tools/feed-planner.html plans the grid order and the caption for each post, but no post has a date, and its exports are images, a numbered posts zip and "Copy captions", so the plan stops at the grid and everything is retyped into GoHighLevel's Social Planner. Add an optional date and time per post (with a "every Tue and Thu at 9:00" fill) and an "Export for GoHighLevel" option that uploads each image to Firebase Storage and writes the bulk-upload CSV with caption, time and image link in the columns GoHighLevel expects. Xavier plans a month of de Belle and 333 Photo posts in one sitting and schedules them in one import, and a consistent posting rhythm is what grows an Instagram account.

### IDEA-125 · "Tool of the week" reels, made easy by a sample-data button in each tool
- **Category:** Content · **Effort:** M · **Impact:** ★★ · **Status:** new
- tools.html lists a few dozen tools, but on Instagram they don't exist, and tools like tools/wedding-schedule.html and tools/package-builder.html open empty, so filming one means typing in a fake wedding first. Add a "Show me an example" button (or `?demo=1`) to the public tools that fills in one realistic sample, then film a 20–30 second screen recording of one tool a week ("Couples: plan your whole wedding day in 5 minutes"), each pointing to the link-in-bio page (IDEA-067). That's a year of ready-made reels from work that's already done, aimed at couples and creators searching for exactly these tools, and the same button lets a site visitor see a finished result before typing anything.

### IDEA-126 · A paid "Build session" call for photographers and creators who read the blog
- **Category:** Monetization · **Effort:** S · **Impact:** ★★ · **Status:** new
- Food for Thought writes about building, the changelog (changelog.html) shows 120+ versions of tools made by a working photographer, and the readers this attracts are peers, not clients, so nothing on the site sells to them; the white-label product (IDEA-033) and the workshop (IDEA-036) are both still unbuilt. Offer one fixed-price 60-minute call, for example "Build session with Xavier, $175: we map the one tool or automation your studio needs and how to make it with AI", booked through a GoHighLevel calendar with payment up front and linked from the bottom of the building posts and from changelog.html. It earns from the audience the blog actually has right now, and every call shows which tool other studios would pay for before Xavier builds it.

## 2026-10-25 — Wildcard (what the best photographer, creator and tool sites do that this one doesn't)

### IDEA-127 · Holiday mini-session days for families, sold to past couples first
- **Category:** Monetization · **Effort:** M · **Impact:** ★★★ · **Status:** new
- work.html lists "Also: Studio sessions, albums, prints" in the de Belle spec list, but no page sells a session, and the Package Builder only prices weddings. Most busy portrait studios run seasonal mini-sessions every November: 20-minute slots on two set days, a fixed price (for example $195 for 15 edited images, delivered before mid-December), booked by picking a slot in a GoHighLevel calendar with payment up front. Add a one-page offer reached from the de Belle chapter and send it first to the 3,000+ past couples, many of whom now have kids; it fills the quiet winter weeks, brings old clients back without a discount, and each family is a natural lead for the anniversary club (IDEA-053) and for referrals.

### IDEA-128 · "Give a session" gift cards for the holidays
- **Category:** Monetization · **Effort:** S · **Impact:** ★★ · **Status:** new
- Nothing on the site can be bought as a present, though the products already exist with fixed prices in tools/package-builder.html (Engagement / Casual Photoshoot $350, Glam Studio $2,000, prints and albums). Photographer sites sell gift cards from late October to Valentine's Day: add a small gift page with three amounts or named sessions, paid through a GoHighLevel or Stripe payment link, that emails the buyer a printable de Belle-branded card with a code and an expiry date. Parents buying for engaged children and partners buying for each other pay now for work booked in the quiet season, and some cards are never fully redeemed.

### IDEA-129 · Public "vote for the next tool" board with a notify-me email
- **Category:** Feature · **Effort:** M · **Impact:** ★★ · **Status:** new
- soon.html says "This branch of the map exists before the page does", and the next tools live only in Xavier's private Idea Bank (tools/idea-bank.html) and in this log, so visitors never see what is coming or get a say. Indie tool makers grow by showing a short public roadmap: add a section on tools.html with 5–8 candidate tools (for example the seating chart, shot list and price calculator from IDEA-118, IDEA-025 and IDEA-119), one "I'd use this" button each, and an optional email to be told when it ships, tagged per tool in GoHighLevel. Xavier builds what people actually want first, and every launch goes out to a list of people who asked for that exact tool.

### IDEA-130 · "Put this tool on your site" embed for planners and venues
- **Category:** SEO · **Effort:** M · **Impact:** ★★ · **Status:** new
- The couple-facing tools (tools/wedding-schedule.html, and the golden-hour finder from IDEA-059 once built) are only reachable on Xavier's own site, and the site earns links from nobody. Calculator and planner sites grow by offering a free embed: add a "Put this on your website" button that gives a one-line iframe code with a small "by de Belle Photography" credit link at the foot, and offer it directly to Montreal planners, venues and officiants. Every venue that embeds it gives the site a permanent link from a wedding page that Google trusts, and every couple who uses it there sees Xavier's name; this is free and credited, unlike the paid white-label version in IDEA-033.

## 2026-10-26 — Conversion and lead capture

### IDEA-131 · Offer de Belle video and extras when a couple answers "NO" in the Wedding Day Schedule
- **Category:** Conversion · **Effort:** S · **Impact:** ★★★ · **Status:** new
- The first card of tools/wedding-schedule.html asks "Is de Belle Photography your videographer?" and the same for Photo Booth / Same Night Prints / Red Carpet / Slideshow (selects cine_yn and extras_yn), and when a booked couple picks NO the form just asks "If not us, who?". That is the one moment a couple tells the studio exactly what they haven't bought yet. When NO is picked, show a small card under the field ("No videographer yet? de Belle films too: 8-hour coverage from $3,200, and your photo and video team already know each other") with a button into tools/package-builder.html opened on the video section, tracked with `xdbTrack('schedule-crosssell')`. It is an upsell to people who have already booked and trust Xavier, aimed at the exact service they are missing.

### IDEA-132 · Keep couples inside the Package Builder (logo and admin link)
- **Category:** Fix · **Effort:** S · **Impact:** ★ · **Status:** new
- In tools/package-builder.html the top logo (nav-logo, line ~190) opens debellephotography.com in a new tab, and the footer (line ~295) shows every couple a "Studio · prices" link to package-builder-admin.html. A couple halfway through pricing can tap away to another site, or land on a sign-in screen meant for Xavier, and neither brings them back to the total. Point the logo to the top of the builder (or to work.html#de-belle in the same tab), and hide the admin link unless Xavier is signed in (assets/account.js already knows). Every couple who stays to the end of the builder is one who can reach the send and book-a-call steps in IDEA-007 and IDEA-031.

### IDEA-133 · Retargeting pixel with a consent banner on work.html and the Package Builder
- **Category:** Conversion · **Effort:** M · **Impact:** ★★ · **Status:** new
- No page on the site carries a Meta or Google ads tag (only Umami, which counts visits but can't follow anyone afterward), so the couple who priced a $7,000 wedding in tools/package-builder.html and left without writing is gone for good. Add the Meta Pixel (and the GoHighLevel tracking script if Xavier runs ads from there) to work.html and the Package Builder only, loaded after a small "Allow ads cookies?" banner, as Law 25 requires, and list it in privacy.html. Then build ad audiences such as "opened the Package Builder in the last 30 days, no enquiry" for de Belle and "visited the 333 Photo chapter" for commercial, and show them a testimonial or the engagement-session offer. Retargeting warm visitors usually costs a fraction of cold ads, and it turns the site's best traffic into a list Xavier can reach again.

### IDEA-134 · "Book your next shoot" card in the client portal for 333 Photo clients
- **Category:** Monetization · **Effort:** S · **Impact:** ★★ · **Status:** new
- The client portal in tools/video-review.html (?p=, renderPortal) shows a client only "Your reviews" and, when empty, "Nothing here yet", even though it is the one page a commercial client opens again and again during a job. Add an optional per-portal card the host fills in when creating the portal (for example "Spring menu shoot? Book before March 1 at this year's rates") with a GoHighLevel calendar or estimate link, shown under the reviews once the latest review is approved. A repeat client is the cheapest sale 333 Photo can make, and the portal is already bookmarked on their phone, so the next job gets booked while the last one is still fresh. It is different from the balance payment (IDEA-109) and the review ask (IDEA-110), which close the current job; this opens the next one.

## 2026-10-27 — One tool in full: Pipelines

### IDEA-135 · Stop paid jobs counting as open work in Pipelines
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- In tools/pipelines.html only one stage per pipeline can be ticked "Done" (a radio button in pipeDlg()), and both templates put a stage after it: Wedding video ends Done → Accounting, Commercial shoot ends Delivered → Paid (TEMPLATES, line ~293). So a card moved to Paid counts as open in the tab badge, keeps its ▶ timer, turns "stuck 14+ days" two weeks later, and its price stays in the "$X budget open" total (render(), line ~470). Treat every stage from the Done stage rightwards as finished (or allow more than one Done tick), and let the money total read "to collect" for cards in Delivered/Accounting only, so the board shows what is really still owed.

### IDEA-136 · Real hourly rate on every card and per pipeline
- **Category:** Feature · **Effort:** S · **Impact:** ★★★ · **Status:** new
- Pipelines already knows both halves: a Money field (Price, Budget) and the time logged by the card timer (cardMs()). Nothing divides one by the other. Show "$X/h" beside the ⏱ chip once a card has a price and time, and in the summary row an average for finished cards ("Wedding video: $68/h over 12 jobs"), with the lowest three listed. That tells Xavier which packages and clients actually pay, which is the number to feed into the Package Builder prices (package-builder-admin.html) and the decision on which work to stop taking.

### IDEA-137 · A "Link" field type that opens with one tap
- **Category:** Feature · **Effort:** S · **Impact:** ★★ · **Status:** new
- FIELD_TYPES in tools/pipelines.html (line ~291) offers Text, Multi-line, Number, Money and Date, so a Video Review portal, a ShootProof gallery, a Drive folder or the client's GoHighLevel contact can only be pasted as dead text. Add a Link type that shows as a small "↗ Gallery" button on the card and in the card window, and add "Review link" and "GHL contact" fields to the Wedding video and Commercial templates. Every job then opens from one place instead of a search across four apps.

### IDEA-138 · "Nudge the client" button when a card waits on them
- **Category:** Conversion · **Effort:** S · **Impact:** ★★ · **Status:** new
- Cards sitting in Client Review or Quote sent show "Nd in stage" and turn red after 14 days, but the board can only watch them wait. When a card has been 5+ days in a stage that waits on the client, show a "Nudge" item in the ⋯ menu that opens a ready-written text or email (sms:/mailto:, using a client email/phone field added to both templates) and logs a dated comment "Nudged". Approvals and quotes that move a week sooner mean final payments and bookings land a week sooner.

### IDEA-139 · An "After delivery" stage that schedules the review ask, the album offer and the next shoot
- **Category:** Monetization · **Effort:** S · **Impact:** ★★★ · **Status:** new
- Builds on IDEA-053, IDEA-078 and IDEA-110: those offers exist only as ideas, with nothing in Xavier's own workflow to make them happen. In the Wedding video and Commercial shoot templates in tools/pipelines.html, add a stage after Done/Paid whose checklist items get due dates counted from the day the card arrives: day 3 ask for a Google review, day 30 offer the parents' album or prints, day 330 the anniversary session or (for 333 Photo) "book your next shoot". The existing due chips and late counts then turn every delivered job into three dated chances to sell again.

## 2026-10-29 — SEO, performance, accessibility, mobile

### IDEA-140 · Stop iPhones from wiping a couple's Wedding Hub
- **Category:** Fix · **Effort:** S · **Impact:** ★★★ · **Status:** new
- tools/wedding-hub.html keeps the whole checklist, budget, vendors and family list in localStorage only (`debelle.weddinghub.v1`), never calls `navigator.storage.persist()`, and has no web manifest, so it can't be added to the home screen as an app. Safari on iPhone deletes a site's stored data after 7 days without a visit unless the page is installed, and couples open a wedding planner in bursts weeks apart, so the hub can come back empty with no warning. Ask for persistent storage on setup, add a manifest and an "Add to Home Screen" tip in the welcome screen (installed web apps are exempt from the 7-day rule), and show a "Last saved copy: never / 3 weeks ago" line next to Save a copy. The hub is the studio's first private product for booked couples, and one lost budget is enough to make a couple stop trusting it.

### IDEA-141 · One Wedding Hub for both partners, with a couple code
- **Category:** Feature · **Effort:** M · **Impact:** ★★★ · **Status:** new
- Builds on IDEA-026 (done as the v129 Wedding Hub). The hub lives in one browser, so when one partner ticks "Book a venue" or adds a payment on their phone, the other partner, a parent paying for part of it and the studio see nothing; the only way across is exporting a .json file. Give each couple a short private code (set up by Xavier with the booking) that syncs the hub through Firebase without a Google sign-in, so both phones open the same checklist and budget, and Xavier can glance at the family photo list and vendors before the day. Two people plan a wedding, and a shared hub makes it the place where the planning actually happens, which is what keeps de Belle in the couple's week for a whole year. It also fixes IDEA-140 for good, because the data no longer lives on a single phone.

### IDEA-142 · Give the 16 dead-end tool pages a way back into the site
- **Category:** SEO · **Effort:** S · **Impact:** ★★ · **Status:** new
- 16 pages in tools/ (among them feed-planner, carousel-planner, portfolio-grid, portfolio-masonry, wedding-schedule, video-corrections and wedding-hub) contain no link to tools.html or the home page, and tools.html opens all 34 cards with `target="_blank"`, so on a phone each tool lands in a new tab with no back button and no route to anything else. A creator who finds the Feed Planner on Google never learns the rest of the site exists, and search engines see those pages as islands with no internal links. Add one tiny shared footer line through a script every tool already can load (for example "A free tool by Xavier de Belle · More tools · Work", with the de Belle version on the wedding tools), tracked with `xdbTrack('tool-footer')`, and open the cards in the same tab on touch screens. It costs a few lines and turns each tool into a door to the portfolio.

### IDEA-143 · Keep the private workspace apps out of Google
- **Category:** SEO · **Effort:** S · **Impact:** ★ · **Status:** new
- tools/production-hub.html, pipelines.html, project-tracker.html and idea-bank.html are Xavier's own business workspace (sign-in only, "The Biz" and Archived Tools on tools.html), yet none carries `noindex`, while package-builder-admin.html, wedding-hub.html and the gated Package Builder already do. Someone searching Xavier's name can land on an empty sign-in screen for his task list instead of on work.html. Add `<meta name="robots" content="noindex">` to the owner-only apps (and leave them out of the sitemap in IDEA-008), so the pages Google shows for his name are the ones that sell.

## 2026-10-30 — New tool ideas for photographers, couples, creators and real estate

### IDEA-144 · "Gifts & thank-yous" tab in the Wedding Hub that sizes the thank-you card order
- **Category:** Feature · **Effort:** S · **Impact:** ★★ · **Status:** new
- Builds on IDEA-026 (done as the v129 Wedding Hub). The hub's after-the-wedding tabs in tools/wedding-hub.html are Delivery, Photo Review, Film Review, Keepsakes and Share the Love, and Keepsakes already sells "Thank you cards" (ty_cards, minimum 25, "your favourite photograph on the front"), but nothing helps the couple with the job those cards are for. Add a "Gifts & thank-yous" tab: one line per guest or family (from a pasted list), what they gave, and a "Thank-you sent" tick, with a counter ("112 to write, 38 done") and a button that opens Keepsakes with the thank-you card quantity already set to the number still to send. Every couple dreads this chore in the weeks the photos arrive, so the tab gets opened often, and it turns an optional keepsake into an order sized from their own list.

### IDEA-145 · Before/after reveal maker that exports a wipe reel
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- The Real Estate chapter of work.html is Xavier's own duplex renovation ("Buying, renovating, holding · In progress"), photographers and retouchers post edit comparisons constantly, and tools/web-squeeze.html already encodes video in the browser (VideoEncoder), yet no tool on the site makes a before/after. Build one: drop two photos (raw vs. edit, before vs. after renovation, empty vs. staged), line them up, and export a drag-slider link plus a 1080×1920 or 1080×1350 MP4 where a line sweeps across, with an optional small "xavierdebelle.com" mark. Before/after posts are among the most saved formats on Instagram, it gives the duplex lane a steady stream of content, and every exported reel a creator posts carries Xavier's name.

### IDEA-146 · Bilingual listing description writer for Quebec agents, from the listing photos
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- Kitchen (tools/kitchen.html) already shows the site reading photos with Claude, and IDEA-061, IDEA-117 and IDEA-029 give agents a brief, a photo preset and investor maths, but nothing helps with the part of a listing agents write by hand in two languages. Build a tool where an agent drops 10–20 listing photos and a few facts (rooms, year, square footage, neighbourhood) and gets a French and an English description sized for Centris and Realtor.ca, plus a room list that matches the photos, run through a Firebase function so no key sits in the page (the same plumbing as IDEA-085). End with "Photos looking tired? Book a listing shoot", tagged "listing-writer" in GoHighLevel. Agents relist all year, so a tool that saves them 30 minutes per listing gets reused weekly, and it puts Xavier in front of exactly the buyers of real-estate photography.

### IDEA-147 · Save-the-date maker whose missing ingredient is an engagement session
- **Category:** Monetization · **Effort:** M · **Impact:** ★★★ · **Status:** new
- Builds on IDEA-051. The Wedding Hub budget lists Stationery (Invitations $600) and its checklist has no save-the-date step, the Package Builder sells the engagement session ($350, oa_engagement), and nothing connects the two, though a save-the-date is the first thing a newly engaged couple needs and it needs a great photo. Build a free save-the-date maker in the de Belle design system: drop a photo, choose one of four layouts, add names, date and city, and export a print-ready PDF (5×7, with bleed) plus an Instagram story; when no photo is added, the empty frame says "No photo you love yet? Engagement session, $350, credited to your wedding" with a booking link, tracked with `xdbTrack('std-engagement')`. It reaches couples 12–18 months before the wedding, at the exact moment they discover they need professional photos, and sells the front-end offer that leads to the wedding booking.

## 2026-10-31 — Content, the blog, newsletter, Instagram, audience growth

### IDEA-148 · Pinterest: tall pins and a "Save" button on posts and couple tools
- **Category:** Content · **Effort:** M · **Impact:** ★★ · **Status:** new
- tools/wedding-schedule.html asks every couple for their "Pinterest board link" (line ~183), so the studio knows that's where couples plan, yet the site has no Pinterest presence: no pin-sized image anywhere (every page shares one 1200×630 card, food-for-thought.html uses the same one for all posts), no Save button, no account linked in any footer. Make one 1000×1500 pin per public couple tool (Wedding Day Schedule, Package Builder, the venue guides from IDEA-066 when written) and per wedding-related post, add a small "Save to Pinterest" button beside each, and pin them weekly from a de Belle business account. Pins keep sending visitors for months or years, unlike an Instagram post that's gone in two days, and Pinterest is where engaged couples search before they ever look for a photographer.

### IDEA-149 · Fill "Digital Archives" with a weekly "From the archive" series
- **Category:** Content · **Effort:** M · **Impact:** ★★★ · **Status:** new
- The mind map in index.html has a "Digital Archives" leaf that only opens soon.html ("The keeping place. Old work, old notes…"), while 30 years and 3,000+ weddings of photos sit unseen; IDEA-099 covers recent wedding stories, not the back catalogue. Make digital-archives.html a running series: one image a week from a past year (a 1998 film-era first dance, a 2009 church exit), the year, one short memory, posted the same day to Instagram as a throwback, and ending in "Married with us in 19XX or 20XX? Write to me". No other Montreal studio can publish three decades of its own work, it gives Instagram a no-effort weekly post, and every past couple who answers is a lead for the anniversary club (IDEA-053) and family sessions.

### IDEA-150 · "Share this line" quote cards from blog posts
- **Category:** Feature · **Effort:** S · **Impact:** ★★ · **Status:** new
- In food-for-thought.html readers can only share a whole post's link (the "Link" anchor, and IDEA-064's share button), and IDEA-065 turns a full post into a carousel for Xavier only. Let any reader select a sentence in a post and get a small "Share this line" button that draws it onto a 1080×1920 card in the blog's own type and colours, with "Xavier de Belle · Food for Thought" and the site address at the foot, and opens the phone's share sheet with the image (download on desktop). One good sentence is what people actually post to their Instagram story, and each card carries the name and address to everyone who sees it.

### IDEA-151 · "Xavier reads it": an audio version of each post and a podcast feed
- **Category:** Content · **Effort:** M · **Impact:** ★★ · **Status:** new
- Posts in food-for-thought.html are text only (title, body, a "min read" count), and the composer has no place for audio. Add an optional audio file to the composer (Xavier reads the post on his phone, uploaded to Firebase Storage), show a simple "Listen · 6 min" player under the title, and publish the recordings as a podcast feed (a podcast RSS file, which Apple Podcasts and Spotify read) so the same essays reach people on walks and drives. Hearing his voice builds trust faster than text, it's a second audience channel for writing that's already done, and the podcast listing is one more place his name shows up in search.

### IDEA-152 · A "season wrap" post each November with next year's open dates
- **Category:** Content · **Effort:** S · **Impact:** ★★★ · **Status:** new
- The Production Hub (tools/production-hub.html) tracks goals like "40 weddings booked" and Pipelines holds every job of the year, but none of that ever becomes something the public sees, and November, right before the holiday engagement season, is when couples start comparing photographers. Publish one post every November: the season in numbers (weddings, venues, the rainiest day, favourite moment), a dozen of the year's best frames, and a closing line that lists next year's still-open Saturdays ("June 2027: 2 left"), linked to the enquiry or date check (IDEA-043 when built). Cut the same content into a reel and a carousel. It's a yearly ritual readers and past couples look forward to, it shows proof of demand, and honest scarcity is what moves an undecided couple to book.

## 2026-11-01 — Wildcard (what the best photographer, creator and tool sites do that this one doesn't)

### IDEA-153 · Point "Write a review" straight at the Google review box
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- In tools/wedding-hub.html the "Share the love" tab's "→ Write a review" button uses `REVIEW_URL = 'https://www.google.com/search?q=de+Belle+Photography+Montreal+reviews'`, so a happy couple lands on a page of search results and has to find the listing, open it and hunt for the review button, on a phone. Replace it with the Google Business Profile's direct "Ask for reviews" link (the g.page/r/…/review short link, which opens the star box at once), and reuse the same constant wherever a review is asked for. Every extra tap loses reviewers, and reviews are what the next couple reads before writing.

### IDEA-154 · "Add our dates to my calendar" in the Wedding Hub
- **Category:** Feature · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/wedding-hub.html already knows every date that matters: budget lines with a due date (nextPayment() shows only the next one, in the header), the checklist's "By <month>" deadlines from dueBy(), and the Delivery timeline (first look at 7 days, gallery at 56, film at 112). Wedding apps that couples stick with push those dates into the phone's own calendar. Add one button that downloads a .ics file with the payment dues (with a reminder 3 days before), the open checklist deadlines and the expected delivery dates, regenerated whenever the couple asks. Payments arrive on time without Xavier chasing, and the studio's name shows up in the couple's calendar all year.

### IDEA-155 · "Sooner, please" priority editing offered on the Delivery tab
- **Category:** Monetization · **Effort:** S · **Impact:** ★★ · **Status:** new
- The Delivery tab of tools/wedding-hub.html tells every couple their film arrives about 16 weeks after the wedding (DELIVERY: film at 112 days, gallery at 56), and nothing offers a faster option, though many studios sell priority editing for couples who want the film for a party, an anniversary dinner or family abroad. Add a quiet line under the film and gallery steps, "Want it by <date 6 weeks sooner>? Priority editing, $X", that sends a request like the Keepsakes order (and add the same item to the Package Builder catalog so it can be chosen at booking). It is an upsell with almost no extra cost, only a change in the editing queue, and it lands right when couples feel the wait.

### IDEA-156 · "Reserve your date" online: sign the contract and pay the retainer in one go
- **Category:** Monetization · **Effort:** M · **Impact:** ★★★ · **Status:** new
- Builds on IDEA-007. The Package Builder (tools/package-builder.html, now behind the client password) and the Wedding Hub's "Photography & Film" tab end in "Design your coverage", "Write to us" or a phone number, so even a couple who has chosen everything still has to wait for an email, a contract and an invoice. Top studios let a ready couple book on the spot: add a "Reserve your date" button under the total that opens a GoHighLevel Documents & Contracts template pre-filled with the package and total, with the retainer payment built into the signing step. The couple who is ready at 11 pm books at 11 pm, before they price a competitor, and Xavier wakes up to a signed, paid date.

### IDEA-157 · Send each vendor a credited mini-gallery after the wedding
- **Category:** Conversion · **Effort:** M · **Impact:** ★★★ · **Status:** new
- The Vendors tab of tools/wedding-hub.html collects the couple's planner, venue, florist, DJ and others with emails (sendVendors() mails them to the studio), and the Wedding Day Schedule collects the same list, yet nothing ever goes back to those vendors. The best wedding photographers grow through planners and venues by giving first: a week after the gallery, each vendor gets 10–15 images of their own work, free to post with the credit "Photo: de Belle Photography" and a tag. Add a "Vendor galleries" step (a Pipelines checklist item plus a ready-written email per vendor from the hub's list), separate from the referral link and gift in IDEA-069. Vendors who post Xavier's photos advertise him to their own clients every week, and the planner who gets beautiful images is the one who recommends him next.

## 2026-11-02 — Conversion and lead capture

### IDEA-158 · "No password yet? Get it by email" on the Package Builder gate
- **Category:** Conversion · **Effort:** S · **Impact:** ★★★ · **Status:** new
- Since v131, tools/package-builder.html opens on a gate with one Password field and an Enter button, and nothing else: no explanation, no contact, no way to ask. tools.html sends visitors there with the card tag "Password", so a couple who finds it from the site, a search or a shared link hits a dead end. Add a line under the field, "New here? Send me the password", that opens three fields (names, email, wedding date) posting to a GoHighLevel form tagged "pkg-gate", with an automatic email that sends the password and starts the nurture. The gate then works like an opt-in: every couple who wants to price their wedding becomes a known lead with a date before they see a single price, instead of leaving.

### IDEA-159 · Replace "Bride" and "Groom" in the Package Builder's PDF form
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- The "Tell us about your day" form in tools/package-builder.html (client-modal, before both PDFs) labels its two required name fields "Bride" and "Groom", while the Wedding Hub already uses "Your name" and "Your partner's name" (and "Partner one / Partner two" in its family groupings). A same-sex couple in Montreal, a big part of the market, is asked to pick a wrong box right at the moment they're about to take home a quote. Change the labels to "Your name" and "Your partner's name" (keeping the stored name1/name2), and check the PDF text and collection copy for the same words. It costs two lines and stops the studio's most important page from quietly telling some couples it isn't for them.

### IDEA-160 · Send every wedding enquiry to the studio inbox, not Xavier's personal one
- **Category:** Conversion · **Effort:** S · **Impact:** ★★ · **Status:** new
- The de Belle client tools (package-builder.html, wedding-hub.html with STUDIO_EMAIL) write to yourwedding@debellephotography.com, but every public page (work.html's "Email me", the footers of all main pages: 23 links) points to xavier@debellephotography.com. So a couple who writes from work.html lands in Xavier's personal inbox, where nobody else on the studio team sees it, and it may never reach the GoHighLevel conversation inbox the studio answers from. Point the wedding contacts (the de Belle chapter and its closing call) at yourwedding@ with a pre-filled subject, keep xavier@ for 333, property and personal mail, and connect yourwedding@ to GoHighLevel if it isn't yet. The couple who gets an answer first usually books, and a shared inbox means someone answers even on a day Xavier is shooting.

### IDEA-161 · "Pay the deposit now" on the Wedding Hub Keepsakes order
- **Category:** Monetization · **Effort:** M · **Impact:** ★★ · **Status:** new
- Builds on IDEA-078. The Keepsakes tab of tools/wedding-hub.html already lets a couple pick albums, parent duplicates and cards with a live "Estimate before taxes", but sendKeep() only opens an email draft (mailto) and promises "we will be in touch to finish the details", so the order depends on the couple's mail app, on them pressing Send, and on a follow-up that can slip for weeks. Post the selection to GoHighLevel instead (an order with the items and estimate on the couple's contact) and show a "Pay a 50% deposit now" button that opens a GoHighLevel payment link for that amount, with the mail draft kept as a fallback. Money taken while the couple is excited about their photos turns a "maybe later" into a confirmed order, and every request lands somewhere the studio can track.


## 2026-11-03 — One tool in full: Cycle Calendar

### IDEA-162 · Slide the predictions forward when a period is late
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- In tools/cycle-calendar.html, cycles() predicts every future period as `last + k × L` from the last logged start, and renderHero() then picks the "next window" from that same grid. When a period runs late, the calendar keeps painting a dashed "expected period" on days already gone, and the Fertile window and Peak day tiles show dates worked out from a period that never came; past 17 days late, both land in the past too. While it is late, start the predictions from today instead of from the missed date, show "Waiting for the period. Fertile window shows once it's logged" in the two tiles, and bring the predictions back when "Period started today" is pressed. A tracker that shows confident dates it can't know is the one way it can mislead the person relying on it.

### IDEA-163 · Mark more than the first day: period end and a positive ovulation test
- **Category:** Feature · **Effort:** M · **Impact:** ★★★ · **Status:** new
- The tool stores only first days (`state.starts`); period length is one setting for every cycle (f-period), and the peak day is always "14 days before the next period" (the fixed `LUTEAL = 14`), which is the least accurate method there is for anyone whose cycles vary. When a day is tapped, offer a small menu instead of the yes/no confirm(): "Period started", "Period ended", "Positive ovulation test" (an LH strip from the pharmacy). Learn the period length from the end dates, move that cycle's peak to the day after a positive test, and learn her own luteal length (test to next period) to replace the 14 in future predictions. It turns a calendar guess into predictions fitted to one person, which is the whole reason to log every month.

### IDEA-164 · Encrypt the Cycle Calendar before it syncs (builds on IDEA-104)
- **Category:** Legal · **Effort:** M · **Impact:** ★★ · **Status:** new
- Builds on IDEA-104. SYNC.payload() in tools/cycle-calendar.html sends every period date to Firebase as plain text under `users/{uid}/tools/cycle-calendar`, and privacy.html lists Cycle Calendar among the tools whose data the database holds. Under Quebec's Law 25, health information counts as sensitive personal information, and period dates are exactly that. Once the Journal's passcode encryption exists, move it into the shared sync block (the one already copied identically into every synced tool) so any tool can turn it on, and switch it on here first: encrypt in payload(), decrypt in apply(). That's one piece of code covering both of the site's most private tools, and privacy.html can then say plainly that nobody, Xavier included, can read them.

### IDEA-165 · "Add to my calendar" for the next three periods and fertile windows (builds on IDEA-106)
- **Category:** Feature · **Effort:** S · **Impact:** ★★ · **Status:** new
- Builds on IDEA-106 (reuse its .ics helper). Cycle Calendar is only useful when someone opens it, and nothing tells her a period is due in two days or that the fertile window starts tomorrow; there's no server to send a push notification. Add an "Add to my calendar" button under the four hero tiles that downloads an .ics file (a calendar file every phone opens) with the next three predicted periods and fertile windows, each with an alert two days before, and a line saying to tap it again after logging a period so the dates stay current. It puts the predictions where she already looks every day, so she plans trips, shoots and evenings around them without opening the app.

### IDEA-166 · "We're expecting" mode: due-date countdown that times the maternity and newborn sessions
- **Category:** Monetization · **Effort:** M · **Impact:** ★★ · **Status:** new
- Cycle Calendar already holds the one date a due date is worked out from (the first day of the last period: due date = that day + 280 days), but when a period stops coming it just counts days late; and work.html sells no maternity or newborn session at all (zero mentions). Add a "We're expecting" switch that she turns on herself and that is never suggested, which swaps the calendar for a week-by-week countdown and a quiet card: "Maternity photos look best at 28–34 weeks · newborn sessions in the first two weeks", linking to a de Belle maternity + newborn bundle booked through a GoHighLevel calendar. On its own it's a small funnel, but the bundle itself is the real step: it adds the rung between the wedding and the family sessions (IDEA-053, IDEA-127) that de Belle's past couples reach first.

## 2026-11-04 — Monetization and offers

### IDEA-167 · Give the next promotion as free extras, not 20% off
- **Category:** Monetization · **Effort:** S · **Impact:** ★★★ · **Status:** new
- The November promotion in tools/package-builder.html (`PROMO`, v141) cuts every price 20%, collections and à la carte alike, so The Ultimate drops from $12,450 to $9,960: about $2,500 of margin gone per booking, and a lower price anchor that couples who book in December will remember. The page already has the tool for the alternative: collections carry `gifts` (the `EXTRAS` items shown as included at no charge). For the next promotion, add a "gift" mode to `PROMO` that keeps prices whole and adds extras worth the same to the couple but costing far less to deliver (engagement session, parent albums, social reel, Same Night Prints), shown on the cards as "Included this month: $1,350 of extras". It's the same urgency with most of the margin kept, and prices never look like they were padded to be discounted.

### IDEA-168 · Lower prices for Fridays, Sundays and November–April dates in the Package Builder
- **Category:** Feature · **Effort:** M · **Impact:** ★★★ · **Status:** new
- The Package Builder prices a June Saturday and a February Friday exactly the same, and only asks for the wedding date at the very end, in the PDF modal (`c-date`), where it's printed on the PDF and never used in the maths. A studio can only sell each peak Saturday once, while weekday and winter dates usually go unbooked. Ask for the date first (reusing `client.date`), then apply an editable "flexible date" rate in the sidebar ("Friday in March · 15% off"), set from the edit bar like the volume tiers, with full price on peak Saturdays. Couples with a smaller budget get a real reason to pick a quiet date instead of leaving, and Xavier fills days that would otherwise earn nothing.

### IDEA-169 · An "Intimate wedding" collection under The Essential as the downsell
- **Category:** Monetization · **Effort:** S · **Impact:** ★★ · **Status:** new
- The cheapest collection in tools/package-builder.html is The Essential at $4,400 (full-day photo or film). Below that there's only à la carte "Hourly Photography, $400 per hour, 2-hour minimum", which a city-hall, elopement or 30-guest couple has to assemble themselves, with nothing telling them it's made for them. Add a fourth, named collection at the bottom ("The Intimate: 4 hours of photography, 150+ edited images, online gallery, from $1,800"), using the existing collection editor, with a line pointing up to The Essential for bigger days. It's the Hormozi downsell: the couple who would have closed the tab at $4,400 books a smaller day instead, and becomes a past client for the anniversary, family and referral offers (IDEA-053, IDEA-069, IDEA-127).

## 2026-11-05 — SEO, performance, accessibility, mobile

### IDEA-170 · Read the public pages through a plain web address instead of the full Firebase toolkit
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- food-for-thought.html, library.html, who-am-i.html and what-is-this.html load firebase-app.js and firebase-database.js from gstatic (about 70 KB, in a chain of requests) and then open a live connection, all before a reader sees a single post; food-for-thought.html shows only "Loading" until then. tools/package-builder.html already solved this with a single fetch of `…firebaseio.com/catalog/package-builder.json` (CATALOG_URL, line ~1802). Do the same for readers: one fetch of `blog/posts.json` (and the library and page paths), keep the last copy in localStorage so a repeat visit shows the text instantly, and load the SDK only when Xavier signs in to edit. Every visitor from Instagram on mobile data gets the words in a fraction of the time, and it's the cheapest speed win on the content pages.

### IDEA-171 · Make the small links big enough to tap
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- Measured on an iPhone-sized screen: the footer links on work.html, tools.html, who-am-i.html and library.html (`.foot__links a` in assets/style.css) are 18 px tall, the "Link" button under each post in food-for-thought.html is 48×13 px, changelog.html's 110 "See it →" links are 16 px tall, and the studio email and website links in the Package Builder footer are only 11 px tall. Accessibility guidance (WCAG 2.2) asks for at least 24 px, and Apple recommends 44 px, so thumbs miss or hit the neighbour. Add vertical padding (an inline-block with `padding: 12px 0` keeps the look), more gap in `.foot__links`, and a `min-height: 44px` on the blog's Link button. This is separate from text size (IDEA-055): it's the touchable area, and the Package Builder's contact links are the ones a ready-to-book couple taps.

### IDEA-172 · Proper tab and home-screen icons for the public pages and the client tools
- **Category:** SEO · **Effort:** S · **Impact:** ★ · **Status:** new
- The public pages only declare `assets/logo.svg` as their icon, there is no `favicon.ico` or `apple-touch-icon` at the root (so every browser's automatic /favicon.ico request is a 404, and iPhones show a grey letter when the page is bookmarked or shared), and the pages clients actually open (package-builder.html, wedding-hub.html, wedding-schedule.html, potluck.html, video-corrections.html) declare no icon at all, so their tab and Google result show a blank globe. The synced tools already have a full icon set in tools/icons/ (180, 192, 512 px). Make the same set for the site (Xavier de Belle mark) and for the de Belle client pages (de Belle mark), add favicon.ico, an apple-touch-icon and a theme-color, and link them in each head. A recognisable icon in a couple's open tabs and in search results makes the studio's pages look finished and easier to find again.

### IDEA-173 · Open the Package Builder in French when the couple's phone is in French (builds on IDEA-019)
- **Category:** Conversion · **Effort:** S · **Impact:** ★★ · **Status:** new
- v143 gave tools/package-builder.html a full Quebec French version, but it starts in English unless the visitor finds the 9 px "FR" button in the corner (`.lang-switch`, line ~419) or has a `?lang=fr` link; the starting language (line ~662) only reads the saved choice. When there is no saved choice and no `?lang=`, start in French if `navigator.languages` begins with "fr". At the same time, give the two buttons `aria-pressed`, `lang="fr"` / `aria-label="Français"` (so a screen reader doesn't spell out "F R"), and a 12 px label with a 44 px tap area. French-speaking couples land on a page already in their language, the work Xavier just paid for actually gets seen, and it meets the expectation under Quebec's language law that French is offered first to Quebec customers.

## 2026-11-06 — New tool ideas for photographers, couples, creators and real estate

### IDEA-174 · "Keep my credit" in Web Squeeze: drop the location, keep the photographer's name
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/web-squeeze.html removes all EXIF on every export (the note under the photo settings, line ~209: "Location and camera data (EXIF) are removed"), which is right for GPS but also strips the Artist and Copyright fields, so every file Xavier sends to a vendor, an agent or a 333 client leaves with no name in it. Add a "Keep my credit" switch (on by default, name saved on the device) that writes only Artist, Copyright ("© 2026 Xavier de Belle · xavierdebelle.com") and a short description back into the JPEG, while GPS, serial numbers and camera data stay removed; AVIF and WebP get the same text in their XMP block. Photos shared on by vendors and agents keep pointing back to Xavier, and the credited vendor galleries in IDEA-157 carry the credit inside the file, not just in the email.

### IDEA-175 · Proposal planner with a "hidden photographer" session
- **Category:** Monetization · **Effort:** M · **Impact:** ★★★ · **Status:** new
- Every couple tool on the site starts after the engagement (the Package Builder, the Wedding Hub, the save-the-date maker in IDEA-147), and the earliest offer is the $350 engagement session (oa_engagement), so the moment before "yes" is invisible. Build a free tools/proposal-planner.html for the person planning to propose: pick a spot (the list from IDEA-093 when it exists, or free text), get the sunset time for that date, write the plan minute by minute, set a signal ("when I kneel by the fountain"), and share a private link with whoever helps; the last step offers "Want it photographed without them knowing? Hidden photographer, 45 minutes plus a short couple session, $X, credited toward your wedding if you book with de Belle", sent to GoHighLevel with the date and spot. It is a new front-end offer (attraction) that reaches couples a full step before any competitor does, and a proposal client is the warmest possible wedding lead.

### IDEA-176 · Speech helper for the people giving toasts, with Video Supplements offered to the couple
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- tools/wedding-schedule.html has no speeches block at all, and the only place speeches appear on the site is the $300 "Video Supplements" line in the Keepsakes list (tools/wedding-hub.html line ~680, "Approx. 10 minutes of speeches, first dance and more"). Build a share link the couple sends to each speaker: the speaker writes or pastes the toast, sees an estimated length at a calm speaking pace, gets a gentle warning above 4 minutes, rehearses with a large-text teleprompter view, and marks it "ready"; the couple's view lists every speaker, their order and the total time, which can drop straight into the schedule. Couples get a calmer reception with no 15-minute toasts, the photographer knows exactly when to be in place, and when the couple's view shows "6 speeches · 19 minutes" it can say "Keep every word: Video Supplements, $300" with a link to the order.

### IDEA-177 · "Get your home photo-ready" checklist that agents send to sellers
- **Category:** Tool · **Effort:** S · **Impact:** ★★ · **Status:** new
- The Real Estate chapter of work.html is about Xavier's duplex, and the agent ideas so far (IDEA-061 shoot brief, IDEA-117 Web Squeeze preset, IDEA-146 listing writer) all speak to the agent, never to the homeowner whose house is actually in the photos. Build a one-page, room-by-room checklist the agent shares with the seller (lights on and bulbs matched, counters cleared, toilet lids down, cars off the driveway, pets and personal photos away), with ticks that save on the phone, a "shoot day" countdown and a printable version, branded "Prepared by 333 Photo" with the agent's name added through `?agent=`. A prepared house photographs better in less time, the agent looks organised to their client, and the page brings agents back to Xavier every time they list.

### IDEA-178 · "Do our team photos match?" checker that leads to a Team headshot day (builds on IDEA-080)
- **Category:** Tool · **Effort:** S · **Impact:** ★★ · **Status:** new
- IDEA-080 sets the Team headshot day offer, but nothing shows a company why it needs one. tools/portfolio-grid.html already lays photos into an even grid in the browser; reuse it so an office manager drops in the team's current headshots and sees them side by side at the same crop, with simple flags read from each file (low resolution, landscape vs. portrait, very different brightness or background colour). The result screen says "7 photos, 4 different backgrounds, 2 too small for your website" and offers "Make them match: Team headshot day, from $X per person" into GoHighLevel tagged "headshot-check". Most team pages are a patchwork of selfies and old photos, and seeing it laid out is the moment the buyer decides to fix it.

## 2026-11-07 — Content, the blog, newsletter, Instagram, audience growth

### IDEA-179 · "Thought of the day" on the home page map
- **Category:** Content · **Effort:** S · **Impact:** ★★ · **Status:** new
- Food for Thought now holds 16 posts, and they are short (5 to 117 words, about 35 on average: "Love is not enough", "Quick Wins", "The Pillars"), yet index.html only reaches them through a "Food for Thought" leaf in the map and the Index list. Show one post a day under the name and tagline in the home page's left-hand panel (picked by date from blog/posts, so everyone sees the same one that day), in italics, with "Read more thoughts →" linking to food-for-thought.html#<id>. Posts this short are made to be read in passing, the home page gets something new every day for people who come back, and the blog gets traffic from the page most people land on.

### IDEA-180 · "Five questions" interviews with Montreal wedding vendors
- **Category:** Content · **Effort:** M · **Impact:** ★★ · **Status:** new
- The wedding-related content ideas so far are written by Xavier alone (venue guides IDEA-066, real weddings IDEA-099, season wrap IDEA-152), and food-for-thought.html has no other voices. Start a monthly post where one planner, florist, DJ or venue coordinator answers the same five couple-facing questions ("What do couples wish they'd booked sooner?", "One thing to cut from the budget?"), with their portrait and links, and end it with "Planning yours? Check my date." Each vendor shares the interview with their own followers and links to it from their site, so every post borrows an audience Xavier doesn't have yet and starts a referral relationship before any wedding together.

### IDEA-181 · Sell the scroll invitation as a de Belle product
- **Category:** Monetization · **Effort:** M · **Impact:** ★★★ · **Status:** new
- v146 shipped tools/wedding-invite.html for Enya & Sami: an envelope that opens on scroll, a Baja desert that follows the day, a countdown and a timeline, all drawn in code. Couples already budget for this: the Wedding Hub lists Invitations at $600 (tools/wedding-hub.html, line 334). Turn the piece into a template driven by one data block (names, date, place, palette, schedule) and offer it in the Package Builder as "Animated invitation — $450, made in your colours," with a short reel of Enya & Sami's envelope opening as the launch post on Instagram. It sells something no other Montreal photographer offers, costs a few hours per couple once templated, and every guest who opens it sees de Belle's work before the wedding.

### IDEA-182 · RSVP and meal choice inside the Wedding Invite
- **Category:** Feature · **Effort:** M · **Impact:** ★★ · **Status:** new
- tools/wedding-invite.html tells guests when and where, but ends without asking them anything, so the couple still has to chase answers by text and the gift cards only say "soon." Add an RSVP card after the timeline (name, attending yes/no, number of guests, meal choice, a note for the couple) that saves to Firebase, and a private list for the couple with totals they can export. An invitation that collects the replies is what makes it worth paying for (IDEA-181), and the guest count can feed the "Make a guest list" step in the Wedding Hub.

## 2026-11-08 — Wildcard (what the best photographer, creator and tool sites do that this one doesn't)

### IDEA-183 · A 404 page that guesses where you meant to go
- **Category:** Fix · **Effort:** S · **Impact:** ★ · **Status:** new
- 404.html says "This page moved, or it never existed" and offers only the map and the tools page, while tools keep moving and getting renamed (v144 archived Video Corrections; old links to tools sit in Instagram bios, DMs and client emails). Good tool sites read the broken address and suggest the closest match. Compare the missing path (for example /tools/feedplanner or /tools/video-corrections.html) with the links in the Index that assets/site-index.js already loads from index.html, show "Were you looking for Feed Planner?" as the first button, and send the missing path to Umami with `xdbTrack('404', path)` so Xavier sees which old links people still use and can fix them at the source.

### IDEA-184 · Type to find anything in the Index
- **Category:** Feature · **Effort:** S · **Impact:** ★★ · **Status:** new
- Every page has an Index button (assets/site-index.js) that opens the whole site as columns of links, and tools.html has its own search, but nothing searches across the site: with 30+ tools, 16 posts and the Library, a visitor who remembers "the thing for Instagram grids" has to scan everything. Tool sites like Linear or Raycast answer this with a type-to-find box. Add a search field at the top of the Index dialog that filters its links as you type (matching names and the one-line tool descriptions), opens with the "/" key on desktop, and also lists matching Food for Thought post titles. People find the right tool in two keystrokes instead of giving up, and the search terms (sent to Umami) show which tools people want that don't exist yet.

### IDEA-185 · Publish a flat destination fee and the trips already planned
- **Category:** Monetization · **Effort:** S · **Impact:** ★★ · **Status:** new
- work.html lists "Range: Local & destination weddings" but shows no destination work, and tools/package-builder.html only says "Additional travel fees may apply beyond this area or for destination weddings" (line ~1075), so a couple marrying in Mexico or Europe can't tell if de Belle is even an option. Top destination photographers publish where they'll be and a flat travel fee. Add a "Destination" option in the Package Builder with a fixed price by region (for example Caribbean/Mexico, Europe) and a short "Where we'll be" line on work.html, starting with Los Cabos in November 2027 (the trip behind tools/wedding-invite.html), offering two shoots there with no travel fee. Destination couples spend more, the trip partly pays for itself, and a clear fee turns "may apply" into a yes.

### IDEA-186 · Sell the de Belle colour look as a preset pack
- **Category:** Monetization · **Effort:** M · **Impact:** ★★ · **Status:** new
- The site already attracts other photographers and creators (Food for Thought, the creator tools, the changelog), and work.html promises a "documentary approach, editorial finish" built over 30 years and 3000+ weddings, but there is nothing a peer can buy for under a few hundred dollars. Many of the best-known photographer sites sell their editing look first. Package de Belle's Lightroom look as presets: 3 free presets in exchange for an email (tagged in GoHighLevel as "creator"), the full pack of 12 at about $39, with a before/after slider on its own page. It is a cheap attraction offer for an audience that doesn't hire wedding photographers, it can be made once and sold forever, and buyers become the warm list for the build session (IDEA-126) and the workshop (IDEA-036).

## 2026-11-09 — Conversion and lead capture

### IDEA-187 · Missed-call text-back on the studio number
- **Category:** Conversion · **Effort:** S · **Impact:** ★★★ · **Status:** new
- Builds on IDEA-073. The number 514-887-4686 is printed on every quote and schedule couples take home and forward to parents: the Package Builder PDF footer (tools/package-builder.html, line ~2498), the Wedding Day Schedule PDF (tools/wedding-schedule.html, line ~368) and the Wedding Hub footer (tools/wedding-hub.html, line ~258). But the calls come in on Saturdays, exactly when Xavier is shooting. Route that line through a GoHighLevel number (or forward it to one) and switch on missed-call text-back: within a minute the caller gets "Sorry I missed you, I'm photographing a wedding today. Tell me your date here, or pick a time to talk:" with the booking link, and the thread sits in the GHL conversation inbox. A caller who gets a text right away stays yours; one who hits voicemail calls the next photographer on the list.

### IDEA-188 · "Comment PRICE" on a reel and get the Package Builder by DM
- **Category:** Conversion · **Effort:** S · **Impact:** ★★★ · **Status:** new
- Builds on IDEA-158. Since v131 tools/package-builder.html sits behind a password (and since v143 it's in English and French), and every page's footer sends people to instagram.com/xavierdebelle, but nothing turns an interested follower into a contact who has that password. Set up a GoHighLevel Instagram automation: anyone who comments "PRICE" (or "PRIX") on a wedding reel gets an automatic DM asking for their wedding date and email, then the link and password, tagged "ig-price" in GHL with the nurture started. Comments also push the reel to more people, and every follower who wants to know the price becomes a lead with a date, without leaving Instagram.

### IDEA-189 · New enquiries at the top of the Production Hub's Today tab, with a reply clock
- **Category:** Feature · **Effort:** M · **Impact:** ★★ · **Status:** new
- tools/production-hub.html is the page Xavier opens every morning (Today, In Production, Big Picture, Goals), but new leads live only in GoHighLevel, so a busy edit day can push an enquiry's first reply to the evening. Have a GHL workflow ("new contact tagged wedding / 333 / property") call a small Firebase function that writes the lead's name, source and time into his private hub doc, and show it as a red card at the top of Today: "Sofia & Marc · from Package Builder · 47 min ago · Reply", which opens the GHL conversation. The card clears when GHL marks the conversation replied. The studio that answers first usually books, and this puts the leads where his day starts, not in another app.

### IDEA-190 · "Date taken? Book our second team" instead of a dead end
- **Category:** Monetization · **Effort:** S · **Impact:** ★★ · **Status:** new
- Builds on IDEA-043. The planned date checker only answers "Taken, here are nearby dates", but a wedding date can't be moved, so for most couples "taken" is a lost lead. And on peak Saturdays de Belle (work.html: "we're a family", 3000+ weddings) is turned away exactly when demand is highest. When a date is booked, offer the studio's second photographer or team at its own price (or the next collection down), with a line like "Xavier is booked, but the de Belle second team is free, same editing and album", and capture the lead in GHL tagged "date-taken". It earns money from demand that today goes to a competitor, and the overflow is the busiest, highest-priced dates of the year.

## 2026-11-10 — One tool in full: Galaxy Map

### IDEA-191 · Let Galaxy Map read its branches from the home page, and stop it showing "Maria's Tools"
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/galaxy-map.html carries its own hand-copied `MAP` (line ~308), which has already drifted from index.html: it still says "Maria's Tools" and "De Belle Tools" where the home page now says "My Wife's Tools" and "The Biz", and it's missing "All Tools" and "Archived" (v144). So the public page still shows a name the rest of the site no longer does. assets/site-index.js already solves this ("one list to maintain, never two") by reading `#index-view .index__grid` from index.html. Have Galaxy Map build its constellations from that same list (keeping the current array only as an offline fallback), and do the same for tools/neural-mind-map.html, which has its own copy too. Every rename on the home page then reaches all three maps without anyone having to remember.

### IDEA-192 · "The sky on your wedding night": a star-map keepsake built on the Galaxy Map's stars
- **Category:** Monetization · **Effort:** M · **Impact:** ★★ · **Status:** new
- Galaxy Map already draws thousands of stars, glowing constellations and giant type in the browser (three.js, render-target passes, the site's gold `uGold`), but they're decoration; nothing on the site sells a keepsake people would hang on a wall, and the Keepsakes tab in tools/wedding-hub.html offers only albums, cards and video. Reuse the engine with a small bright-star catalogue (the free Yale Bright Star list, about 9,000 stars) to draw the real sky over the venue at the minute of the vows: the couple types the place, date and time, sees their sky turn into place, and orders a print-ready poster (names, date, coordinates in the de Belle type) as a Keepsakes item, for example $89 print or $189 framed. Star-map posters are a proven gift product, it suits the paper anniversary and the anniversary offers (IDEA-053), and it can be sold to couples Xavier didn't photograph.

### IDEA-193 · Settle the homepage redesign with a two-week test
- **Category:** Conversion · **Effort:** S · **Impact:** ★★ · **Status:** new
- Galaxy Map started as "homepage redesign experiment v9" (CHANGELOG v92), and the home page was deliberately left unchanged, so it now lives under Art and the question of which map works better was never answered. Neither map records what people click: index.html and galaxy-map.html load stats.js for page views but don't fire `xdbTrack` when a topic is opened. Add one event to both (`xdbTrack('map-open', {map, label})`), add a small "Try the galaxy view →" link on the home page's left panel, and after two weeks compare in Umami how many visits from each map go on to work.html, tools.html or the Package Builder. Xavier gets a real answer before spending more evenings on either map, and he learns which branches people actually want, which also helps with IDEA-017.

### IDEA-194 · Sell the galaxy intro to 333 Photo clients as a website centrepiece
- **Category:** Monetization · **Effort:** M · **Impact:** ★★ · **Status:** new
- The Galaxy Map is already driven by data: the logo is four triangles taken from an SVG (`LOGO`), the sections come from one list (`MAP`), and every visual setting (speed, colours, star count, gold) sits in one `T` block. That means the same piece can be rebuilt for another brand in hours, not weeks: their logo as the mark the camera flies through, their services as constellations, their colours. Offer it on the 333 Photo side as a fixed-price "Signature intro" for restaurants, venues, developers and creative studios (for example $1,500–2,500, sold with a photo or brand shoot), with Galaxy Map itself as the live demo. It turns an art experiment into a high-margin add-on that no other photographer in Montreal can offer, and every client site that runs one is a showcase linking back to 333 Photo.

## 2026-11-12 — SEO, performance, accessibility, mobile

### IDEA-195 · Give the Wedding Invite its own share picture
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/wedding-invite.html is a link that gets sent to every guest by WhatsApp, iMessage and email, but its `og:image` (line ~18) is `assets/og/home.png`, the black "Xavier de Belle" site card, while its alt text promises "Enya & Sami — wedding invitation". So the first thing each guest sees in the chat is Xavier's personal brand, not the couple. Make a 1200×630 card in the invite's own look (bone #efe4d4, clay, Cormorant Garamond: "Enya & Sami · 11 · 11 · 2027 · Los Cabos") as `assets/og/wedding-invite.png` and point the tag at it, plus an `apple-touch-icon` in the same palette for guests who save it to their home screen. The preview is the invitation's envelope; when invites become a product (IDEA-181), a matching card should be part of every one.

### IDEA-196 · Load the small build of three.js in the Wedding Invite and Galaxy Map
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- Both tools/wedding-invite.html (line ~283) and tools/galaxy-map.html import `three@0.169.0/build/three.module.js`, the full unminified file: 1.3 MB for the phone to parse, 261 KB over the wire. The same release ships `three.module.min.js`, which is 687 KB to parse and 138 KB over the wire (measured on jsdelivr today), with the same code. Change the import map line in both pages to the `.min.js` file and add a `<link rel="modulepreload">` for it so the download starts with the page. Guests opening the invite on hotel Wi-Fi or roaming data in Mexico see the envelope sooner, and the Galaxy Map intro starts faster for anyone testing it as the new home page (IDEA-193).

### IDEA-197 · Swipe between photos and pinch to zoom in Photo Review
- **Category:** Feature · **Effort:** S · **Impact:** ★★ · **Status:** new
- In tools/photo-review.html, moving between photos and zooming only works with a mouse or keyboard: the stage's pointer handler ignores anything that isn't `pointerType === 'mouse'` (line ~875, "Touch scrolls natively"), and Arrow keys and +/− (line ~893) do the rest. A client reviewing on a phone, which is most of them, has to scroll down to the thumbnails to change photo and use the zoom buttons to look at detail. Add a horizontal swipe (when not zoomed in and not drawing) that calls `goPhoto()`, and a two-finger pinch that calls `zoomTo()`, the gestures every phone gallery has taught people. It makes the review feel like their camera roll, so clients go through all the photos in one sitting and reach the approval sooner. Separate from IDEA-116, which is about image file size, not gestures.

### IDEA-198 · Pre-fill the guest's email and booking on the Stripe link (builds on IDEA-030)
- **Category:** Monetization · **Effort:** S · **Impact:** ★★ · **Status:** new
- v148 added a "Pay by card" button to tools/activity-planner.html (line ~906) that opens the organiser's bare Stripe payment link and asks the guest to "use the name you booked with" so the organiser can match it by hand. Stripe payment links accept `?prefilled_email=` and `?client_reference_id=` in the address, so append the guest's booking email and a reference made of the event id and the booking's public roster key (`rk`, letters and numbers only, so it fits Stripe's rules). The guest doesn't retype their email on a phone keyboard, and every Stripe payment arrives already labelled with the event and the guest, so the organiser records it with method Stripe in seconds instead of guessing. It is also the groundwork for marking bookings paid automatically if the planner is ever sold as a paid tool.

## 2026-11-13 — New tool ideas for photographers, couples, creators and real estate

### IDEA-199 · Show the Feed Planner grid at Instagram's new 3:4 crop
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/feed-planner.html draws every grid tile at `aspect-ratio: 4 / 5` (lines ~334, 588, 921) and its crop frame "marks the exact region that survives the 4:5 crop" (line ~807), but Instagram's profile grid now shows posts as taller 3:4 tiles, trimming the sides of a 4:5 post. So the grid Xavier (or any creator) approves in the planner is not the grid people see. Add a "Grid: 3:4 (current) / 4:5 (classic)" switch that redraws the tiles and shows the side margins that get hidden as a faint overlay, while exports stay 4:5 (1080×1350). It keeps the planner's one promise, "see the grid before it exists", true.

### IDEA-200 · "Rain or shine on our date?" odds in the Wedding Day Schedule (builds on IDEA-059)
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- tools/wedding-schedule.html already asks for a "Backup rain location" and its address for every stage (line ~351), but nothing tells the couple how likely they are to need it. Once IDEA-059 adds the date and city, pull the last 20 years of that calendar week from a free historical-weather source (Open-Meteo's archive, no key needed) and show "It rained on 6 of the last 20 Sept 19ths · usual high 21°C · sunset 7:01 pm", with a nudge to fill the rain-plan fields when the odds pass 30%. Couples worry about rain more than anything else, and a photographer who plans for it in the free tool is the one they trust with the day.

### IDEA-201 · Tips and final payments: an envelope list in the Wedding Hub's Vendors tab
- **Category:** Tool · **Effort:** S · **Impact:** ★★ · **Status:** new
- Builds on IDEA-026 (done as the v129 Wedding Hub). The Vendors tab in tools/wedding-hub.html (line ~623) already holds each vendor's name and sends the list to de Belle, but couples' most common last-week question, "who do we tip, how much, and who hands it over?", has no home. Add a "Tip" and "Balance due on the day" column per vendor with suggested Quebec ranges (a tap fills a default the couple can change), a total, and a printable sheet of labelled envelopes for the person designated to hand them out. A public mini-version ("How much to tip your wedding vendors in Montreal") is also a page people search for, ending in the Package Builder link.

### IDEA-202 · Wedding sign maker: unplugged ceremony, welcome and bar signs, printed through Keepsakes
- **Category:** Monetization · **Effort:** M · **Impact:** ★★ · **Status:** new
- Keepsakes in tools/wedding-hub.html sells albums, prints and "Thank you cards" (line ~690) but nothing guests see on the day itself, and the site's invite style (tools/wedding-invite.html: bone paper, Cormorant Garamond) is already a finished look. Build a small sign maker: pick a template (welcome, "unplugged ceremony: please put your phones away, our photographer has it covered", bar menu, table numbers), type the names and date, download a print-ready PDF at 18×24", with a "Have it printed on foam board · $X" line added to Keepsakes. The unplugged sign alone improves every ceremony photo, and each sign carries a small "photographs by de Belle" line seen by 150 guests.

### IDEA-203 · Open-house sign-in kit for agents, with a QR code and 333 Photo branding
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- The real-estate lane has the agent brief and quote (IDEA-061) and the seller checklist (IDEA-177), but nothing agents use every weekend. Build a one-page kit: the agent enters the address and three listing photos, and gets a printable easel sign with a QR code; visitors scan it and sign in on their phone (name, email, phone, "working with an agent?"), and the agent gets the list by email or as a CSV for their CRM, all saved through the existing Firebase pattern. Every visitor sees "Photos by 333 Photo" on the form, and an agent who collects buyers with it every Sunday has a reason to book the next listing shoot with Xavier.
