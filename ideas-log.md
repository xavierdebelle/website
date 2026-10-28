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

## 2026-10-28 — Monetization and offers

### IDEA-140 · Price travel beyond 100 km in the Package Builder
- **Category:** Fix · **Effort:** S · **Impact:** ★★ · **Status:** new
- tools/package-builder.html says "Travel included within 100 km of Montreal" under the total (line ~285) and in the exported summary (line ~780), but has no field or price for anything further, so a couple marrying in Mont-Tremblant, the Eastern Townships or Quebec City sees a total that is wrong and Xavier either eats the cost or has to raise the price after the quote. Add a "Where is the wedding?" choice (Within 100 km · 100–200 km · 200 km+ / overnight) with a travel line in the summary (for example $1/km past 100 km, or a flat fee plus a hotel night), editable in package-builder-admin.html like the other SETTINGS. It protects margin on the longest days and makes the quote the couple sees the one they actually pay.

### IDEA-141 · "Your day runs past your coverage" check in the Wedding Day Schedule
- **Category:** Feature · **Effort:** M · **Impact:** ★★★ · **Status:** new
- tools/wedding-schedule.html collects an Arrival and Departure for every stage (groom prep through reception, STAGES), but they are free text and nothing compares the day's length with the hours the couple booked. Add an "Hours booked" field (or ?hours=8 in the link Xavier sends), read the earliest arrival and the reception departure on Generate Schedule, and when the day is longer show a card: "Your day runs 9h30 and your coverage is 8h. Add 1.5 hours now at $400/h (on the night it's $500/h)", with a button that replies by email or opens a GoHighLevel invoice. Overtime is the easiest upsell in weddings, the couple is looking at proof they need it, and selling it a month ahead at a lower rate beats an awkward conversation at 11 pm.

### IDEA-142 · Rehearsal dinner and day-after session add-ons
- **Category:** Monetization · **Effort:** S · **Impact:** ★★ · **Status:** new
- OTHER_ADDONS in tools/package-builder.html (line ~336) offers an assistant, an engagement shoot, a slideshow and album extras, but nothing for the other events around a wedding. Add "Rehearsal dinner / welcome party, 2 hours" (about $700) and "Day-after session in your wedding outfits, 1.5 hours" (about $450) as add-ons, both editable in package-builder-admin.html. Couples who already chose de Belle for the big day are the easiest yes for a second, smaller event, and each one also raises the subtotal toward the next volume-discount tier.

### IDEA-143 · Off-peak date savings shown in the Package Builder (downsell)
- **Category:** Monetization · **Effort:** M · **Impact:** ★★ · **Status:** new
- The Package Builder has no wedding date at all, and its only price lever is the volume discount (SETTINGS.discounts), so a couple whose budget falls short can only remove services. Add a date field at the top and, when the date is a Friday or Sunday or falls between November and April, show a line in the summary: "Off-peak date: 10% off photography and video". Set the days, months and percentage in package-builder-admin.html. It is a downsell that keeps the full package and protects Saturday prices, it fills dates that would otherwise stay empty, and the same date field is what IDEA-052 needs for its monthly figure.
