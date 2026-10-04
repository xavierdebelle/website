# Ideas Log

A running list of ideas for the site: fixes, features, tools and ways to make money.
A daily automation adds new ideas at the bottom. **No idea is ever repeated.** Before
adding one, the automation checks every entry below, including those marked done or dropped.

**Status:** `new` · `planned` · `in progress` · `done` · `dropped`
**Effort:** S (an hour or two) · M (a day) · L (a week or more)
**Impact:** ★ to ★★★

---

## 2026-10-04 — First audit (v70)

### IDEA-001 · Put photos on the site
- **Category:** Fix · **Effort:** M · **Impact:** ★★★ · **Status:** new
- The only image anywhere on the site is the logo. Give each chapter of `work.html` (de Belle, 333, Real Estate) a full-bleed hero image and a short reel, and put at least one image on the home page.

### IDEA-002 · Fix the tool count and numbering on the tools page
- **Category:** Fix · **Effort:** S · **Impact:** ★ · **Status:** new
- `tools.html` says "12 builds" but shows 18 cards. Numbers repeat: "02" twice, "09" and "10" twice each, and three cards are "00".

### IDEA-003 · Separate the audiences on the tools page
- **Category:** Fix · **Effort:** M · **Impact:** ★★ · **Status:** new
- Client tools (Package Builder), personal tools (Budget Tracker) and art share one page. Give couples, fellow creators and friends their own way in.

### IDEA-004 · Add privacy-friendly analytics
- **Category:** SEO · **Effort:** S · **Impact:** ★★★ · **Status:** new
- There's no analytics at all. Plausible or Umami is a single script tag. Needed before any monetization decision.

### IDEA-005 · Social preview tags on every page
- **Category:** SEO · **Effort:** S · **Impact:** ★★ · **Status:** new
- No page has Open Graph tags, so shared links on Instagram, iMessage and WhatsApp show up bare. Add a title, description and preview image per page and per tool.

### IDEA-006 · Meta descriptions, robots.txt and sitemap.xml
- **Category:** SEO · **Effort:** S · **Impact:** ★★ · **Status:** new
- 16 of the 18 tools have no meta description. There's no `robots.txt` or `sitemap.xml`.

### IDEA-007 · Custom domain
- **Category:** SEO · **Effort:** S · **Impact:** ★★★ · **Status:** new
- Move from `xavierdebelle.github.io/website` to something like `xavierdebelle.com`. Remember to update `<base href>` in `404.html`.

### IDEA-008 · Home page that says who it's for
- **Category:** Conversion · **Effort:** M · **Impact:** ★★★ · **Status:** new
- Keep the mind map, but add a one-line answer to "who is this, what can I do here" and three doors: Hire me / Use the tools / Read. The canvas isn't crawlable and "tap the mark… twice to invert it" is friction for a first-time visitor.

### IDEA-009 · Real inquiry form connected to GoHighLevel
- **Category:** Conversion · **Effort:** M · **Impact:** ★★★ · **Status:** new
- Every contact path is a `mailto:` link. Replace it with a form that drops leads straight into GHL.

### IDEA-010 · Package Builder captures the lead
- **Category:** Conversion · **Effort:** M · **Impact:** ★★★ · **Status:** new
- Couples build a full priced package, then "Export Package Summary" downloads it and nothing reaches the studio. Send the package plus contact details to GHL, with a "Lock this price for 7 days, book a call" offer.

### IDEA-011 · Privacy policy
- **Category:** Legal · **Effort:** S · **Impact:** ★★ · **Status:** new
- Activity Planner and Potluck collect guests' names, emails and phone numbers. Quebec's Law 25 requires a privacy policy, and none exists.

### IDEA-012 · French version
- **Category:** SEO · **Effort:** L · **Impact:** ★★ · **Status:** new
- Everything is English-only for a Montreal business. A French version helps search ranking, and the Charter of the French Language applies to commercial pages.

### IDEA-013 · A fuller "Who am I?" page
- **Category:** Content · **Effort:** S · **Impact:** ★★ · **Status:** new
- Keep the line about change, then add a photo, the story, the 30+ years and 3,000+ weddings, and what you're building now.

### IDEA-014 · Decide whether Wedding Activities stays public
- **Category:** Fix · **Effort:** S · **Impact:** ★ · **Status:** new
- The page carries "Xavier & Maria" and a personal guest guide. Choose public, unlisted or hidden (the `.gitignore` hiding mechanism already exists).

### IDEA-015 · Newsletter sign-up
- **Category:** Feature · **Effort:** S · **Impact:** ★★★ · **Status:** new
- Put it on the blog and the tools pages. Email is the audience you own.

### IDEA-016 · RSS feed for Food for Thought
- **Category:** Feature · **Effort:** M · **Impact:** ★ · **Status:** new
- A `feed.xml` regenerated whenever a post is published (posts live in Firebase). Its main use is as a trigger that sends each new post to the email list automatically.

### IDEA-017 · "Made with this tool" proof on each tool
- **Category:** Feature · **Effort:** S · **Impact:** ★★ · **Status:** new
- A screenshot or real exported example under each tool card.

### IDEA-018 · Installable apps (PWA) for the daily tools
- **Category:** Feature · **Effort:** S · **Impact:** ★★ · **Status:** new
- Add a manifest and icons, plus an optional service worker for offline use, to Budget Tracker, Idea Bank and Project Phases, so they install on the phone's home screen. Start with Budget Tracker as the trial.

### IDEA-019 · One Projects hub for the synced tools
- **Category:** Feature · **Effort:** M · **Impact:** ★★ · **Status:** new
- Project Phases, Idea Bank and Budget Tracker share sign-in. One dashboard linking them makes them feel like a single product.

### IDEA-020 · Shot-list builder
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- Pairs with the Wedding Day Schedule. Couples tick off family groupings, which saves hours of back-and-forth.

### IDEA-021 · Client portal for de Belle couples
- **Category:** Tool · **Effort:** L · **Impact:** ★★★ · **Status:** new
- Schedule, video corrections, package, payments and gallery link in one link per couple. About 70% is already built as separate tools.

### IDEA-022 · 333 Photo quote builder
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- A B2B Package Builder for commercial clients, using the same rates as the 333 estimator.

### IDEA-023 · Mood board / reference collector
- **Category:** Tool · **Effort:** M · **Impact:** ★ · **Status:** new
- Builds on FreeCanvas.

### IDEA-024 · Real estate tools
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- A renovation budget (fork the Budget Tracker), a duplex cash-flow calculator, and a contractor and quote tracker.

### IDEA-025 · Payments in the Activity Planner
- **Category:** Tool · **Effort:** M · **Impact:** ★★ · **Status:** new
- It already tracks who has paid. Add a Stripe link per activity to close the loop.

### IDEA-026 · Free tools lead into a 333 content retainer
- **Category:** Monetization · **Effort:** S · **Impact:** ★★★ · **Status:** new
- Feed Planner and Carousel Planner users see "Want us to shoot the content for this grid?", leading to a monthly 333 retainer. Attraction → continuity with no new product needed.

### IDEA-027 · White-label studio tools for other wedding vendors
- **Category:** Monetization · **Effort:** L · **Impact:** ★★★ · **Status:** new
- Package Builder, Video Corrections, Wedding Day Schedule and Activity Planner with the studio's own branding and prices, at about $29–49/month. Use a waived setup fee on an annual plan for continuity. Ties into Wedding Experts. Pre-sell to 5–10 photographers before building billing.

### IDEA-028 · Freemium creator tools
- **Category:** Monetization · **Effort:** M · **Impact:** ★★ · **Status:** new
- Feed Planner, Carousel Planner and the Portfolio makers stay free, with a watermark or export limits. Pro at about $19 one-time or $4/month adds sync. Swap "Xavier approves" in the members system for a Stripe payment that sets the member flag.

### IDEA-029 · Wedding guest site as a de Belle upsell
- **Category:** Monetization · **Effort:** M · **Impact:** ★★ · **Status:** new
- Wedding Activities plus Activity Planner sold at about $199–299 as an add-on inside the Package Builder.

### IDEA-030 · "How a photographer built 18 tools with AI"
- **Category:** Monetization · **Effort:** L · **Impact:** ★★ · **Status:** new
- A newsletter series that leads to a workshop or course for creatives. Add affiliate links to the gear and software you actually use.

### IDEA-031 · Sell the generative art
- **Category:** Monetization · **Effort:** S · **Impact:** ★ · **Status:** new
- Liquid Silver and Organic Loops as 4K loops for events, screens and VJs on Gumroad, or as prints.

### IDEA-032 · Move hosting before charging
- **Category:** Fix · **Effort:** M · **Impact:** ★★ · **Status:** new
- GitHub Pages' terms say it shouldn't be used primarily for commercial transactions or SaaS. Move to Cloudflare Pages, Netlify or Vercel before paid tiers go live, and cap the free tier's Firebase usage.
