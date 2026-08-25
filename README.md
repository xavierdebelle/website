# XAVIER DE BELLE

Personal site — an interactive mind map, a portfolio, and a hub for the
browser tools I've built. Plain HTML/CSS/JS, no build step, no dependencies.

**Live:** https://xavierdebelle.github.io/website/

## Structure

    index.html      the mind map — the entry point
    tools.html      the tool hub, five categories, search + filter
    work.html       portfolio: de Belle Photography, 333 Photo, real estate
    assets/         logo + shared design system
    tools/          the tools themselves, one self-contained file each
    versions/       local-only archive of past versions (not deployed)
    CHANGELOG.md    what changed, version by version

## Running it locally

    python3 -m http.server 8899

Then open http://localhost:8899. Served from `localhost` or opened as a
file, every tool is visible. Served from anywhere else, three tools are
hidden and their pages aren't deployed at all — see `.gitignore`.

## Deploying

Every push to `main` publishes automatically via GitHub Pages.

    git add -A && git commit -m "what changed" && git push
