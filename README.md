# XAVIER DE BELLE

Personal site — an interactive mind map, a portfolio, and a hub for the
browser tools I've built. Plain HTML/CSS/JS, no build step, no dependencies.

**Live:** https://xavierdebelle.github.io/website/

## Structure

    index.html      the mind map — the entry point
    tools.html      the tool hub, six categories, search + filter
    work.html       portfolio: de Belle Photography, 333 Photo, real estate
    food-for-thought.html   the blog — posts live in Firebase, public read, owner write
    library.html            the bookshelf — books at pages/library in Firebase, public read, owner write
    access.html     sync by invitation — request access; Xavier approves here
    who-am-i.html   about page — text editable by Xavier, stored at pages/who-am-i
    what-is-this.html  about the site — editable the same way, at pages/what-is-this
    privacy.html    one privacy policy for the site and every tool (Law 25), English + French
    assets/         logo + shared design system
    assets/og/      social preview images, one per page and tool (1200×630)
    assets/account.js   site-wide sign-in: account button, panel, used by every page and synced tool
    tools/          the tools themselves, one self-contained file each
    tools/pwa.js, tools/pwa-sw.js   install + offline for Feed Planner, Carousel Planner,
                                    Budget Tracker, Project Phases, Idea Bank, Notes,
                                    Journal, Kitchen, Cards and Cycle Calendar
    versions/       local-only archive of past versions (not deployed)
    CHANGELOG.md    what changed, version by version

## Running it locally

    python3 -m http.server 8899

Then open http://localhost:8899. All 16 tools are published, so local and
live show the same thing. The pages can still hide a tool from the public
site if that's ever wanted again — see the note in `.gitignore`.

## Deploying

Every push to `main` publishes automatically via GitHub Pages.

    git add -A && git commit -m "what changed" && git push
