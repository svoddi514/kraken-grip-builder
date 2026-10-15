# Kraken Grip — Build Your Own Grip Kit (clickable prototype)

A front-end-only mockup of a "Build Your Own Grip Kit" bundle builder, for pitching the
concept. **No backend, no Shopify, no real cart** — plain HTML/CSS/JS.

**Live demo:** https://svoddi514.github.io/kraken-grip-builder/

## Run it

Double-click **`index.html`** (opens in your browser). That's it.

Optional, if you prefer a local server: `python3 -m http.server 8080` in this folder → http://localhost:8080

## Update the live link

Commit and `git push` — GitHub Pages republishes in about a minute (same URL).
When you change `app.js` or `styles.css`, bump the `?v=` number on both links in `index.html` so browsers don't mix a cached old script with the new page.

## The flow

1. **Pick a Kit** — All Black / All Pink / All Blue (one tap → straight to Review) or **Customize Your Own**.
2. **Customize** — the same "Your Kit" list as Review; tap **Change Color** on any item (Carry bag, Grip stick style + color, Spray, Pop-top) to open its swatches inline. Review's Change Color buttons jump here with that item open.
   Scraper (and Rosin Bag when enabled) show as "Included" chips.
3. **Review** — "Your Kit" summary with thumbnails, savings, and the fulfillment properties.
   **Add to Cart** shows a confirmation and logs the line-item properties to the console
   (also available as `window.krakenLineItem`).

If a customer tweaks a pre-bundled kit, "Kit Type" automatically becomes `Custom`; if a custom
build happens to match a preset exactly, it reports as `Pre-bundled: …`.

Footer has a **Demo: add Pine Rosin Bag** switch to show the 5 → 6 item kit ($65 → $78) live.

## Editing — everything is in `CONFIG` (top of `app.js`)

| What | Where |
|---|---|
| Kit prices ($65 / $78) | `CONFIG.pricing` |
| "Bought separately" prices (strikethrough) | `separatePrice` on each component / stick type |
| Rosin bag on/off | `CONFIG.features.rosinBag` |
| Colors (name, hex, file slug, optional `upcharge`) | `CONFIG.colors` |
| Which colors each component offers | `colors: 'all'` or `['black','pink']` per component |
| Pre-bundled kits + their card photos | `CONFIG.presets` |
| Starting colors for "Customize Your Own" | `CONFIG.customDefaults` |
| Where each layer sits in the preview | `layer: { left, top, width, rotate }` (percent of stage) |
| Fulfillment property names | `property` / `typeProperty` per component |

> Separate prices are placeholder numbers — confirm real ones with Brian.

## Live preview — how the layers work

The preview is a stack of independent `<img>` layers inside `.preview-stage`:

```
img.layer--bag (z1) · img.layer--spray (z2) · img.layer--case (z3)
img.layer--stick (z4) · img.layer--scraper (z5) · img.layer--rosin (z6)
```

Changing a selection swaps **only** that layer (cross-fade). Each layer image is resolved from
`component + option` using the naming convention below.

## Replacing placeholder art with real photos

1. Shoot/cut each component as a **transparent PNG** (same angle + lighting across colors).
2. Name and drop files per the convention:

```
assets/bag/bag--black.png        (bag--pink, bag--babyblue, bag--mint, …)
assets/spray/spray--black.png
assets/case/case--black.png
assets/stick/stick--original--black.png
assets/stick/stick--prowrap--black.png
assets/scraper/scraper.png
assets/rosin/rosin.png
```

   `{color}` is the `slug` from `CONFIG.colors`: `black, pink, babyblue, mint, mintbubblegum,
   purplemint, cottoncandy, golddrip, usa, purple`.
3. In `app.js` set `CONFIG.assets.useRealPhotos = true`.
4. Nudge each component's `layer` position/size in `CONFIG` until the composition looks right.

Any photo that's still missing falls back to the placeholder automatically. While any placeholder
is on screen, the preview shows a **"Placeholder art"** badge, and each placeholder has a dashed
yellow **PLACEHOLDER** tag drawn on it.

The pre-bundled kit cards use the real full-kit photos from krakenbatgrip.com (needs internet);
if they can't load, the card falls back to the layered preview.

## Files

```
index.html   markup + step containers
styles.css   mobile-first styles (two-column ≥ 900px)
app.js       CONFIG, placeholder art, layered preview, step flow, pricing, fulfillment props
assets/      real product photos go here (see assets/README.md)
```
