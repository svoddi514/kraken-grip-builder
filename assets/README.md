# Asset naming convention

Drop real product photos here using **exactly** these names. Until a file exists, the
builder draws a tinted placeholder (marked with a dashed yellow "PLACEHOLDER" tag).

```
assets/bag/bag--{color}.png                 e.g. bag--black.png, bag--pink.png
assets/spray/spray--{color}.png             e.g. spray--babyblue.png
assets/case/case--{color}.png               e.g. case--mint.png
assets/stick/stick--{type}--{color}.png     e.g. stick--original--black.png, stick--prowrap--pink.png
assets/scraper/scraper.png                  (one file — not customizable)
assets/rosin/rosin.png                      (one file — not customizable)
```

`{color}` = the color `slug` in `CONFIG.colors` (app.js):
`black, pink, babyblue, mint, mintbubblegum, purplemint, cottoncandy, golddrip, usa, purple`

`{type}` = the stick type `id`: `original, prowrap`

Photo specs: transparent PNG, tightly cropped to the product, ~1000px on the long edge,
same camera angle + lighting across all colors of a component (so swaps don't "jump").
After adding photos set `CONFIG.assets.useRealPhotos = true` in app.js.
