/* =========================================================================
   Kraken Grip — Build Your Own Grip Kit (clickable prototype)
   Vanilla JS. No build step. Open index.html in a browser.
   ========================================================================= */
'use strict';

/* =========================================================================
   CONFIG — everything editable lives here.
   ========================================================================= */
const CONFIG = {
  kitName: 'Grip Kit',

  features: {
    // Pine Rosin Bag (6th item). Flip to true to launch it — price switches to kitPriceWithRosin.
    rosinBag: false,
    // Show the rosin bag as a greyed-out "Coming soon" chip while rosinBag is false.
    showComingSoon: true,
    // Shows a small footer switch so you can demo the 5 → 6 item kit live in the pitch.
    showDemoControls: true,
  },

  pricing: {
    currency: 'USD',
    kitPrice: 65,            // 5-item kit
    kitPriceWithRosin: 78,   // 6-item kit (with rosin bag)
    // "Bought separately" prices live on each component below (separatePrice).
  },

  assets: {
    basePath: 'assets',
    // false = always draw the built-in tinted placeholder art (no 404s in the console).
    // true  = try the real photo at the naming-convention path first, fall back to placeholder if missing.
    useRealPhotos: false,
  },

  /* Color palette (from the live Kraken catalog).
     - id:      internal key
     - slug:    used in image file names  (bag--{slug}.png)
     - name:    exact catalog name — this is what fulfillment sees
     - label:   short name shown under swatches
     - hex:     1+ colors. Multiple = striped/two-tone placeholder + swatch.
     - upcharge: optional extra $ for this color (applies per component). */
  colors: [
    { id: 'black',         slug: 'black',         name: 'Black',                label: 'Black',          hex: ['#151515'] },
    { id: 'pink',          slug: 'pink',          name: 'Hot Pink (Bubblegum)', label: 'Hot Pink',       hex: ['#ff4fa8'] },
    { id: 'babyblue',      slug: 'babyblue',      name: 'Baby Blue',            label: 'Baby Blue',      hex: ['#8fd3ff'] },
    { id: 'mint',          slug: 'mint',          name: 'Cool Mint',            label: 'Cool Mint',      hex: ['#7ee8c8'] },
    { id: 'mintbubblegum', slug: 'mintbubblegum', name: 'Mint Bubblegum',       label: 'Mint Bubblegum', hex: ['#7ee8c8', '#ff8fc8'] },
    { id: 'purplemint',    slug: 'purplemint',    name: 'Purple Mint',          label: 'Purple Mint',    hex: ['#8a4fd8', '#7ee8c8'] },
    { id: 'cottoncandy',   slug: 'cottoncandy',   name: 'Cotton Candy',         label: 'Cotton Candy',   hex: ['#ffa6d6', '#9fd8ff'] },
    { id: 'golddrip',      slug: 'golddrip',      name: 'Gold Drip',            label: 'Gold Drip',      hex: ['#151515', '#e8b923'] },
    { id: 'usa',           slug: 'usa',           name: 'USA',                  label: 'USA',            hex: ['#c8102e', '#ffffff', '#0a3161'] },
    { id: 'purple',        slug: 'purple',        name: 'Purple',               label: 'Purple',         hex: ['#7a3fd0'] },
  ],

  /* Components. `layer` = where the layer sits on the preview stage, in % of the stage
     (stage is 4:3). Tweak these once real photos land so the composition looks right. */
  components: {
    bag: {
      name: 'On Deck Bag', short: 'Carry Bag', property: 'Carry Case Color',
      hint: 'The neoprene bag that carries everything.',
      separatePrice: 28, colors: 'all',
      image: 'bag/bag--{color}.png',
      layer: { left: 4, top: 9, width: 60, rotate: 0 },
    },
    stick: {
      name: 'Grip Stick', short: 'Grip Stick', property: 'Grip Stick Color', typeProperty: 'Grip Stick Type',
      hint: 'Pine tar stick. Pick a style, then a color.',
      colors: 'all',
      types: [
        { id: 'original', name: 'Original', blurb: 'Classic paper tube. Tear to expose.', separatePrice: 18, upcharge: 0 },
        { id: 'prowrap',  name: 'ProWrap',  blurb: 'Tape-wrapped. Peels off easy.',        separatePrice: 20, upcharge: 0 },
      ],
      image: 'stick/stick--{type}--{color}.png',
      layer: { left: 5, top: 63, width: 58, rotate: -7 },
    },
    spray: {
      name: 'Death Grip Bat Spray', short: 'Bat Spray', property: 'Spray Color',
      hint: 'Death Grip spray can.',
      separatePrice: 15, colors: 'all',
      image: 'spray/spray--{color}.png',
      layer: { left: 67, top: 6, width: 21, rotate: 0 },
    },
    case: {
      name: 'Pop-Top Carry Case', short: 'Pop-Top Case', property: 'Pop-Top Case Color',
      hint: 'Small case that keeps your grip stick clean.',
      separatePrice: 12, colors: 'all',
      image: 'case/case--{color}.png',
      layer: { left: 55, top: 50, width: 17, rotate: 0 },
    },
    scraper: {
      name: 'Bat Scraper', short: 'Bat Scraper', fixed: true,
      separatePrice: 8,
      image: 'scraper/scraper.png',
      layer: { left: 72, top: 79, width: 22, rotate: -4 },
    },
    rosin: {
      name: 'Pine Rosin Bag', short: 'Rosin Bag', property: 'Rosin Bag', fixed: true,
      separatePrice: 15,
      image: 'rosin/rosin.png',
      layer: { left: 37, top: 75, width: 17, rotate: 0 },
    },
  },

  // Order of the customize sections (stick includes its type picker).
  customizeOrder: ['bag', 'stick', 'spray', 'case'],

  // One-tap pre-bundled kits. image: real full-kit photo (set to null to show the layered preview instead).
  presets: [
    { id: 'all-black', name: 'All Black', image: 'https://www.krakenbatgrip.com/cdn/shop/files/Black_grip_kit.jpg',
      selections: { bag: 'black', stickType: 'original', stick: 'black', spray: 'black', case: 'black' } },
    { id: 'all-pink', name: 'All Pink', image: 'https://www.krakenbatgrip.com/cdn/shop/files/Pink_grip_kit.jpg',
      selections: { bag: 'pink', stickType: 'original', stick: 'pink', spray: 'pink', case: 'pink' } },
    { id: 'all-blue', name: 'All Blue', image: 'https://www.krakenbatgrip.com/cdn/shop/files/baby_blue_grip_kit.jpg',
      selections: { bag: 'babyblue', stickType: 'original', stick: 'babyblue', spray: 'babyblue', case: 'babyblue' } },
  ],

  // Starting colors for "Customize Your Own" (also drawn on that card).
  customDefaults: { bag: 'black', stickType: 'prowrap', stick: 'pink', spray: 'babyblue', case: 'mint' },
};

/* =========================================================================
   Helpers
   ========================================================================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: CONFIG.pricing.currency });
const money = (n) => fmt.format(n);
const moneyShort = (n) => (Number.isInteger(n) ? money(n).replace(/\.00$/, '') : money(n));
const comp = (key) => CONFIG.components[key];
const colorById = (id) => CONFIG.colors.find((c) => c.id === id);
const stickType = (id) => comp('stick').types.find((t) => t.id === id);
const colorsFor = (key) => {
  const list = comp(key).colors;
  return !list || list === 'all' ? CONFIG.colors : list.map(colorById).filter(Boolean);
};
const swatchBg = (hex) => {
  if (hex.length === 1) return hex[0];
  const step = 100 / hex.length;
  return `linear-gradient(135deg, ${hex.map((h, i) => `${h} ${i * step}% ${(i + 1) * step}%`).join(', ')})`;
};
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const LAYER_KEYS = ['bag', 'spray', 'case', 'stick', 'scraper', 'rosin'];
const SELECTION_KEYS = ['bag', 'stickType', 'stick', 'spray', 'case'];
const STEPS = [
  { id: 'start', label: 'Pick a Kit' },
  { id: 'customize', label: 'Customize' },
  { id: 'review', label: 'Review' },
];

/* =========================================================================
   State (in-memory only)
   ========================================================================= */
const state = {
  step: 'start',
  started: false,
  viaPreset: false,
  rosin: CONFIG.features.rosinBag,
  selections: { ...CONFIG.customDefaults },
};

/* =========================================================================
   Placeholder art — tinted SVGs drawn per component.
   Every placeholder carries a dashed yellow "PLACEHOLDER" tag so it's obvious.
   ========================================================================= */
const FONT = "Arial Black, Impact, Helvetica, sans-serif";
const svgURI = (svg) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

function fillFor(hex, id = 'f') {
  if (hex.length === 1) return { defs: '', fill: hex[0] };
  const w = 16;
  const size = w * hex.length;
  const rects = hex.map((c, i) => `<rect x="${i * w}" y="0" width="${w}" height="${size}" fill="${c}"/>`).join('');
  return {
    defs: `<pattern id="${id}" width="${size}" height="${size}" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">${rects}</pattern>`,
    fill: `url(#${id})`,
  };
}
const SHADE_H = `<linearGradient id="sh" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>`;
const SHADE_V = `<linearGradient id="sv" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>`;
const tag = (cx, y, w = 104) =>
  `<g><rect x="${cx - w / 2}" y="${y}" width="${w}" height="20" rx="10" fill="rgba(0,0,0,.7)" stroke="#ffd400" stroke-width="2" stroke-dasharray="4 3"/>` +
  `<text x="${cx}" y="${y + 14}" text-anchor="middle" font-family="${FONT}" font-size="10" letter-spacing="1.5" fill="#ffd400">PLACEHOLDER</text></g>`;
const wrap = (vb, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${body}</svg>`;

const DRAW = {
  bag(hex) {
    const f = fillFor(hex);
    return wrap('0 0 400 330', `
      <defs>${f.defs}${SHADE_H}</defs>
      <path d="M140 64 C140 6 260 6 260 64" fill="none" stroke="#1d1d1f" stroke-width="16" stroke-linecap="round"/>
      <rect x="16" y="52" width="368" height="264" rx="64" fill="${f.fill}" stroke="rgba(0,0,0,.45)" stroke-width="5"/>
      <rect x="16" y="52" width="368" height="264" rx="64" fill="url(#sh)"/>
      <path d="M58 98 H342" stroke="#2a2a2a" stroke-width="12" stroke-linecap="round"/>
      <path d="M58 98 H342" stroke="#c9c9c9" stroke-width="4" stroke-dasharray="3 5"/>
      <rect x="318" y="90" width="16" height="42" rx="6" fill="#d0d0d0" stroke="#555" stroke-width="2"/>
      <circle cx="200" cy="196" r="58" fill="rgba(0,0,0,.6)" stroke="#fff" stroke-width="4"/>
      <text x="200" y="214" text-anchor="middle" font-family="${FONT}" font-size="50" fill="#fff">K</text>
      <text x="200" y="128" text-anchor="middle" font-family="${FONT}" font-size="16" letter-spacing="5" fill="rgba(255,255,255,.9)" stroke="rgba(0,0,0,.5)" stroke-width=".6">ON DECK</text>
      ${tag(200, 272, 130)}`);
  },
  spray(hex) {
    const f = fillFor(hex);
    return wrap('0 0 130 320', `
      <defs>${f.defs}${SHADE_H}</defs>
      <rect x="52" y="0" width="24" height="18" rx="4" fill="#2b2b2b"/>
      <rect x="26" y="12" width="78" height="54" rx="14" fill="${f.fill}" stroke="rgba(0,0,0,.45)" stroke-width="3"/>
      <rect x="26" y="12" width="78" height="54" rx="14" fill="url(#sh)"/>
      <rect x="26" y="40" width="78" height="26" fill="rgba(0,0,0,.18)"/>
      <rect x="12" y="58" width="106" height="256" rx="22" fill="${f.fill}" stroke="rgba(0,0,0,.45)" stroke-width="3"/>
      <rect x="12" y="58" width="106" height="256" rx="22" fill="url(#sh)"/>
      <rect x="13.5" y="118" width="103" height="112" fill="rgba(0,0,0,.72)"/>
      <text x="65" y="160" text-anchor="middle" font-family="${FONT}" font-size="25" fill="#fff">DEATH</text>
      <text x="65" y="192" text-anchor="middle" font-family="${FONT}" font-size="25" fill="#fff">GRIP</text>
      <text x="65" y="214" text-anchor="middle" font-family="${FONT}" font-size="10" letter-spacing="2" fill="#ff4fa8">BAT SPRAY</text>
      ${tag(65, 262, 100)}`);
  },
  case(hex) {
    const f = fillFor(hex);
    return wrap('0 0 150 222', `
      <defs>${f.defs}${SHADE_H}</defs>
      <rect x="18" y="60" width="114" height="156" rx="30" fill="${f.fill}" stroke="rgba(0,0,0,.45)" stroke-width="4"/>
      <rect x="18" y="60" width="114" height="156" rx="30" fill="url(#sh)"/>
      <rect x="10" y="12" width="130" height="58" rx="24" fill="${f.fill}" stroke="rgba(0,0,0,.45)" stroke-width="4"/>
      <rect x="10" y="12" width="130" height="58" rx="24" fill="rgba(0,0,0,.2)"/>
      <rect x="10" y="12" width="130" height="58" rx="24" fill="url(#sh)"/>
      <rect x="58" y="64" width="34" height="9" rx="3" fill="#2b2b2b"/>
      <circle cx="75" cy="128" r="28" fill="rgba(0,0,0,.6)" stroke="#fff" stroke-width="3"/>
      <text x="75" y="141" text-anchor="middle" font-family="${FONT}" font-size="34" fill="#fff">K</text>
      ${tag(75, 178, 104)}`);
  },
  stick(hex, type = 'original') {
    const f = fillFor(hex);
    const texture = type === 'prowrap'
      ? Array.from({ length: 13 }, (_, i) => {
          const x = 30 + i * 40;
          return `<path d="M${x} 90 L${x + 46} 10" stroke="rgba(255,255,255,.4)" stroke-width="9"/><path d="M${x + 9} 90 L${x + 55} 10" stroke="rgba(0,0,0,.28)" stroke-width="2"/>`;
        }).join('')
      : Array.from({ length: 11 }, (_, i) => {
          const x = 76 + i * 40;
          return `<path d="M${x} 18 V82" stroke="rgba(0,0,0,.45)" stroke-width="3" stroke-dasharray="2 5"/>`;
        }).join('');
    const label = type === 'prowrap' ? 'PROWRAP' : 'GRIP STICK';
    return wrap('0 0 540 100', `
      <defs>${f.defs}${SHADE_V}<clipPath id="c"><rect x="30" y="14" width="500" height="72" rx="20"/></clipPath></defs>
      <rect x="4" y="26" width="44" height="48" rx="14" fill="#5a3412"/>
      <rect x="8" y="30" width="30" height="12" rx="6" fill="rgba(255,255,255,.25)"/>
      <rect x="30" y="14" width="500" height="72" rx="20" fill="${f.fill}" stroke="rgba(0,0,0,.45)" stroke-width="4"/>
      <g clip-path="url(#c)">${texture}<rect x="490" y="14" width="40" height="72" fill="rgba(0,0,0,.3)"/></g>
      <rect x="30" y="14" width="500" height="72" rx="20" fill="url(#sv)"/>
      <rect x="244" y="30" width="190" height="40" rx="10" fill="rgba(0,0,0,.72)"/>
      <text x="339" y="58" text-anchor="middle" font-family="${FONT}" font-size="21" letter-spacing="2" fill="#fff">${label}</text>
      ${tag(150, 40, 110)}`);
  },
  scraper() {
    return wrap('0 0 220 92', `
      <defs>${SHADE_V}</defs>
      <rect x="4" y="28" width="112" height="36" rx="12" fill="#1c1c1c"/>
      <rect x="4" y="28" width="112" height="36" rx="12" fill="url(#sv)"/>
      <path d="M112 20 L202 6 Q218 46 202 86 L112 72 Z" fill="#b8bec6" stroke="#6b7280" stroke-width="3"/>
      <path d="M112 20 L202 6 Q218 46 202 86 L112 72 Z" fill="url(#sv)"/>
      <text x="60" y="51" text-anchor="middle" font-family="${FONT}" font-size="13" letter-spacing="2" fill="#fff">SCRAPER</text>
      ${tag(160, 36, 84)}`);
  },
  rosin() {
    return wrap('0 0 170 152', `
      <defs>${SHADE_H}<pattern id="d" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1.2" fill="rgba(0,0,0,.12)"/></pattern></defs>
      <path d="M30 40 Q14 136 85 144 Q156 136 140 40 Q85 22 30 40 Z" fill="#f4efe6" stroke="#bfb5a2" stroke-width="3"/>
      <path d="M30 40 Q14 136 85 144 Q156 136 140 40 Q85 22 30 40 Z" fill="url(#d)"/>
      <path d="M30 40 Q14 136 85 144 Q156 136 140 40 Q85 22 30 40 Z" fill="url(#sh)"/>
      <ellipse cx="85" cy="40" rx="58" ry="9" fill="none" stroke="#e23b6d" stroke-width="5"/>
      <path d="M85 44 q-14 18 -26 20 M85 44 q14 18 26 20" stroke="#e23b6d" stroke-width="4" fill="none" stroke-linecap="round"/>
      <text x="85" y="96" text-anchor="middle" font-family="${FONT}" font-size="22" letter-spacing="2" fill="#3a3a3a">ROSIN</text>
      ${tag(85, 110, 100)}`);
  },
};

/* =========================================================================
   Asset resolution: real photo (naming convention) → else placeholder
   ========================================================================= */
function assetPath(key, sel) {
  const c = comp(key);
  let p = c.image;
  if (!c.fixed) {
    p = p.replace('{color}', colorById(sel[key]).slug);
    if (key === 'stick') p = p.replace('{type}', sel.stickType);
  }
  return `${CONFIG.assets.basePath}/${p}`;
}

function placeholderSrc(key, sel) {
  if (comp(key).fixed) return svgURI(DRAW[key]());
  return svgURI(DRAW[key](colorById(sel[key]).hex, sel.stickType));
}

const probeCache = new Map();
function probe(url) {
  if (!probeCache.has(url)) {
    probeCache.set(url, new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    }));
  }
  return probeCache.get(url);
}

async function resolveAsset(key, sel) {
  if (CONFIG.assets.useRealPhotos) {
    const path = assetPath(key, sel);
    if (await probe(path)) return { src: path, placeholder: false };
  }
  return { src: placeholderSrc(key, sel), placeholder: true };
}

/* =========================================================================
   Pricing + fulfillment properties
   ========================================================================= */
function prices(sel = state.selections, rosin = state.rosin) {
  let regular = 0;
  let upcharge = 0;
  for (const key of ['bag', 'stick', 'spray', 'case']) {
    regular += key === 'stick' ? stickType(sel.stickType).separatePrice : comp(key).separatePrice;
    upcharge += colorById(sel[key]).upcharge || 0;
  }
  upcharge += stickType(sel.stickType).upcharge || 0;
  regular += comp('scraper').separatePrice;
  if (rosin) regular += comp('rosin').separatePrice;
  const kit = (rosin ? CONFIG.pricing.kitPriceWithRosin : CONFIG.pricing.kitPrice) + upcharge;
  regular += upcharge;
  return { regular, kit, save: Math.max(0, regular - kit), items: rosin ? 6 : 5 };
}

function matchingPreset(sel = state.selections) {
  return CONFIG.presets.find((p) => SELECTION_KEYS.every((k) => p.selections[k] === sel[k])) || null;
}

function kitType() {
  const p = matchingPreset();
  return p ? `Pre-bundled: ${p.name}` : 'Custom';
}

function lineItemProperties() {
  const s = state.selections;
  const C = CONFIG.components;
  return {
    'Kit Type': kitType(),
    [C.bag.property]: colorById(s.bag).name,
    [C.stick.typeProperty]: stickType(s.stickType).name,
    [C.stick.property]: colorById(s.stick).name,
    [C.spray.property]: colorById(s.spray).name,
    [C.case.property]: colorById(s.case).name,
    [C.rosin.property]: state.rosin ? 'Included' : 'N/A',
    Price: money(prices().kit),
  };
}

/* =========================================================================
   Layered preview stage
   ========================================================================= */
const els = {};
const layerTokens = {};
const placeholderLayers = new Set();

function isLayerActive(key) {
  return key !== 'rosin' || state.rosin;
}

function positionLayer(img, key) {
  const { left, top, width, rotate } = comp(key).layer;
  img.style.left = `${left}%`;
  img.style.top = `${top}%`;
  img.style.width = `${width}%`;
  if (rotate) img.style.rotate = `${rotate}deg`;
}

function retire(el) {
  el.classList.remove('is-current');
  setTimeout(() => el.remove(), prefersReducedMotion() ? 0 : 400);
}

// Swap a single layer's image with a cross-fade. Only the changed layer is touched.
async function updateLayer(key, { animate = true } = {}) {
  const stage = els.stage;
  const token = (layerTokens[key] || 0) + 1;
  layerTokens[key] = token;

  if (!isLayerActive(key)) {
    $$(`.layer--${key}`, stage).forEach(retire);
    placeholderLayers.delete(key);
    updatePlaceholderBadge();
    return;
  }

  const { src, placeholder } = await resolveAsset(key, { ...state.selections });
  if (layerTokens[key] !== token) return; // a newer selection won the race

  placeholder ? placeholderLayers.add(key) : placeholderLayers.delete(key);
  updatePlaceholderBadge();

  const current = $(`.layer--${key}.is-current`, stage);
  if (current && current.dataset.src === src) return;

  const img = new Image();
  img.className = `layer layer--${key}`;
  img.alt = '';
  img.decoding = 'async';
  img.draggable = false;
  img.dataset.src = src;
  img.dataset.layer = key;
  positionLayer(img, key);
  img.addEventListener('load', () => {
    if (layerTokens[key] !== token) { img.remove(); return; }
    requestAnimationFrame(() => requestAnimationFrame(() => {
      img.classList.add('is-current');
      if (animate) img.classList.add('is-pop');
      $$(`.layer--${key}`, stage).filter((el) => el !== img).forEach(retire);
    }));
  }, { once: true });
  stage.appendChild(img);
  img.src = src;
}

function updateAllLayers(opts) {
  LAYER_KEYS.forEach((k) => updateLayer(k, opts));
  updateStageLabel();
}

function updatePlaceholderBadge() {
  els.placeholderBadge.hidden = placeholderLayers.size === 0;
}

function updateStageLabel() {
  const s = state.selections;
  const parts = [
    `${colorById(s.bag).name} carry bag`,
    `${colorById(s.stick).name} ${stickType(s.stickType).name} grip stick`,
    `${colorById(s.spray).name} bat spray`,
    `${colorById(s.case).name} pop-top case`,
    'bat scraper',
  ];
  if (state.rosin) parts.push('pine rosin bag');
  els.stage.setAttribute('aria-label', `Your kit preview: ${parts.join(', ')}.`);
  els.itemCount.textContent = `${prices().items} items`;
}

// Static (non-animated) mini preview used on cards.
function miniStage(sel, label) {
  const stage = document.createElement('span');
  stage.className = 'preview-stage preview-stage--mini';
  stage.setAttribute('role', 'img');
  stage.setAttribute('aria-label', label);
  LAYER_KEYS.filter(isLayerActive).forEach(async (key) => {
    const img = new Image();
    img.className = `layer layer--${key} is-current`;
    img.alt = '';
    positionLayer(img, key);
    stage.appendChild(img);
    img.src = (await resolveAsset(key, sel)).src;
  });
  return stage;
}

async function setThumb(img, key, sel = state.selections) {
  const token = (img._token = (img._token || 0) + 1);
  const { src } = await resolveAsset(key, { ...sel });
  if (img._token === token) img.src = src;
}

/* =========================================================================
   Step 1 — starting point cards
   ========================================================================= */
function renderStart() {
  const grid = els.kitGrid;
  grid.replaceChildren();

  CONFIG.presets.forEach((preset) => {
    const accent = colorById(preset.selections.bag).hex[0];
    const p = prices(preset.selections);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'kit-card';
    btn.style.setProperty('--kit-accent', accent);
    btn.dataset.preset = preset.id;
    btn.innerHTML = `
      <span class="kit-card__media"></span>
      <span class="kit-card__body">
        <span class="kit-card__title">${preset.name}</span>
        <span class="kit-card__meta">${p.items} items · everything matches</span>
        <span class="kit-card__price"><s>${moneyShort(p.regular)}</s> <strong>${moneyShort(p.kit)}</strong></span>
        <span class="kit-card__cta">Get this kit <span aria-hidden="true">→</span></span>
      </span>`;
    const media = $('.kit-card__media', btn);
    const label = `${preset.name} ${CONFIG.kitName}`;
    if (preset.image) {
      const img = new Image();
      img.alt = label;
      img.loading = 'lazy';
      img.onerror = () => media.replaceChildren(miniStage(preset.selections, label));
      img.src = preset.image;
      media.appendChild(img);
    } else {
      media.appendChild(miniStage(preset.selections, label));
    }
    btn.addEventListener('click', () => choosePreset(preset));
    grid.appendChild(btn);
  });

  const p = prices(CONFIG.customDefaults);
  const custom = document.createElement('button');
  custom.type = 'button';
  custom.className = 'kit-card kit-card--custom';
  custom.innerHTML = `
    <span class="kit-card__media"></span>
    <span class="kit-card__body">
      <span class="kit-card__title">Customize Your Own</span>
      <span class="kit-card__meta">Mix &amp; match ${CONFIG.colors.length} colors</span>
      <span class="kit-card__price"><s>${moneyShort(p.regular)}</s> <strong>${moneyShort(p.kit)}</strong></span>
      <span class="kit-card__cta">Start building <span aria-hidden="true">→</span></span>
    </span>`;
  $('.kit-card__media', custom).appendChild(miniStage(CONFIG.customDefaults, 'A mixed-color custom grip kit'));
  custom.addEventListener('click', chooseCustom);
  grid.appendChild(custom);
}

function choosePreset(preset) {
  state.selections = { ...preset.selections };
  state.started = true;
  state.viaPreset = true;
  updateAllLayers({ animate: false });
  syncCustomize();
  updatePrice();
  goTo('review');
}

function chooseCustom() {
  state.started = true;
  state.viaPreset = false;
  if (matchingPreset()) state.selections = { ...CONFIG.customDefaults };
  updateAllLayers({ animate: false });
  syncCustomize();
  updatePrice();
  goTo('customize');
}

/* =========================================================================
   Step 2 — customize
   ========================================================================= */
function swatchRow(key, groupLabelId) {
  const row = document.createElement('div');
  row.className = 'swatch-row';
  row.setAttribute('role', 'group');
  row.setAttribute('aria-labelledby', groupLabelId);
  row.dataset.key = key;
  colorsFor(key).forEach((color) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'swatch';
    b.dataset.value = color.id;
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', `${comp(key).short}: ${color.name}`);
    b.innerHTML = `
      <span class="swatch__chip" style="background:${swatchBg(color.hex)}"><span class="swatch__check" aria-hidden="true">✓</span></span>
      <span class="swatch__name">${color.label}</span>`;
    b.addEventListener('click', () => select(key, color.id));
    row.appendChild(b);
  });
  return row;
}

function typeRow(labelId) {
  const types = document.createElement('div');
  types.className = 'type-row';
  types.setAttribute('role', 'group');
  types.setAttribute('aria-labelledby', labelId);
  types.dataset.key = 'stickType';
  comp('stick').types.forEach((t) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'type-card';
    b.dataset.value = t.id;
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = `
      <span class="type-card__check" aria-hidden="true">✓</span>
      <img class="type-card__img" alt="${t.name} grip stick" data-type-img="${t.id}">
      <span class="type-card__name">${t.name}</span>
      <span class="type-card__blurb">${t.blurb}</span>`;
    b.addEventListener('click', () => select('stickType', t.id));
    types.appendChild(b);
  });
  return types;
}

// Customize = the "Your Kit" list, where each item has a Change Color button
// that opens its own swatch panel (one open at a time).
function renderCustomize() {
  els.choices.replaceChildren();
  CONFIG.customizeOrder.forEach((key) => {
    const c = comp(key);
    const hid = `h-choice-${key}`;
    const panelId = `edit-${key}`;
    const li = document.createElement('li');
    li.className = 'summary__row edit-row';
    li.dataset.row = key;
    li.innerHTML = `
      <span class="summary__thumb"><img alt="" data-thumb="${key}"></span>
      <span class="summary__label" id="${hid}">${c.short}${key === 'stick' ? ' · <span data-value-for="stickType"></span>' : ''}</span>
      <span class="summary__value"><span class="dot" data-dot-for="${key}" aria-hidden="true"></span><span data-value-for="${key}"></span></span>
      <button type="button" class="edit-btn" aria-expanded="false" aria-controls="${panelId}" aria-describedby="${hid}">Change Color</button>
      <div class="edit-panel" id="${panelId}" hidden></div>`;
    const panel = $('.edit-panel', li);
    if (key === 'stick') {
      panel.insertAdjacentHTML('beforeend', '<h3 class="edit-panel__sub" id="h-choice-stickType">Style</h3>');
      panel.appendChild(typeRow('h-choice-stickType'));
      panel.insertAdjacentHTML('beforeend', '<h3 class="edit-panel__sub" id="h-choice-stickColor">Color</h3>');
      panel.appendChild(swatchRow('stick', 'h-choice-stickColor'));
    } else {
      panel.appendChild(swatchRow(key, hid));
    }
    $('.edit-btn', li).addEventListener('click', () => toggleEditor(key));
    els.choices.appendChild(li);
  });
  renderIncluded();
}

function toggleEditor(key, open, { focusSwatch = false } = {}) {
  $$('.edit-row', els.choices).forEach((li) => {
    const isTarget = li.dataset.row === key;
    const willOpen = isTarget && (open ?? !li.classList.contains('is-open'));
    li.classList.toggle('is-open', willOpen);
    $('.edit-panel', li).hidden = !willOpen;
    const btn = $('.edit-btn', li);
    btn.setAttribute('aria-expanded', String(willOpen));
    btn.textContent = willOpen ? 'Done' : 'Change Color';
    if (willOpen) {
      li.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      if (focusSwatch) ($('[aria-pressed="true"]', li) || btn).focus({ preventScroll: true });
    }
  });
}

function renderIncluded() {
  const list = els.included;
  list.replaceChildren();
  const items = [{ key: 'scraper', status: 'Included' }];
  if (state.rosin) items.push({ key: 'rosin', status: 'Included' });
  else if (CONFIG.features.showComingSoon) items.push({ key: 'rosin', status: 'Coming soon', soon: true });
  items.forEach(({ key, status, soon }) => {
    const li = document.createElement('li');
    li.className = `summary__row${soon ? ' summary__row--soon' : ''}`;
    li.innerHTML = `
      <span class="summary__thumb"><img alt=""></span>
      <span class="summary__label">${comp(key).short}</span>
      <span class="summary__value"><span class="${soon ? 'summary__soon' : 'summary__included'}">${soon ? '' : '✓ '}${status}</span></span>`;
    setThumb($('img', li), key);
    list.appendChild(li);
  });
}

function syncCustomize() {
  const s = state.selections;
  $$('[data-key]', els.choices).forEach((group) => {
    const value = s[group.dataset.key];
    $$('button', group).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.value === value)));
  });
  $$('[data-value-for]', els.choices).forEach((el) => {
    const k = el.dataset.valueFor;
    el.textContent = k === 'stickType' ? stickType(s.stickType).name : colorById(s[k]).name;
  });
  $$('[data-dot-for]', els.choices).forEach((el) => { el.style.background = swatchBg(colorById(s[el.dataset.dotFor]).hex); });
  $$('[data-thumb]', els.choices).forEach((img) => setThumb(img, img.dataset.thumb));
  $$('[data-type-img]', els.choices).forEach((img) =>
    setThumb(img, 'stick', { ...s, stickType: img.dataset.typeImg }));
}

function select(key, value) {
  if (state.selections[key] === value) return;
  state.selections[key] = value;
  syncCustomize();
  updateLayer(key === 'stickType' ? 'stick' : key);
  updateStageLabel();
  updatePrice();
  const name = key === 'stickType' ? stickType(value).name : colorById(value).name;
  const label = key === 'stickType' ? 'Grip stick style' : comp(key).short;
  announce(`${label}: ${name}`);
}

// Arrow-key navigation within a swatch / type row.
function onRowKeydown(e) {
  const row = e.target.closest('.swatch-row, .type-row');
  if (!row || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) return;
  const buttons = $$('button', row);
  const i = buttons.indexOf(e.target);
  if (i < 0) return;
  e.preventDefault();
  let next = i;
  if (e.key === 'Home') next = 0;
  else if (e.key === 'End') next = buttons.length - 1;
  else next = (i + (['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : -1) + buttons.length) % buttons.length;
  buttons[next].focus();
}

/* =========================================================================
   Step 3 — review
   ========================================================================= */
function renderReview() {
  const s = state.selections;
  const p = prices();
  const preset = matchingPreset();
  els.kitType.textContent = preset ? `Pre-bundled · ${preset.name}` : 'Custom Kit';
  els.kitType.classList.toggle('is-custom', !preset);

  const rows = [
    { key: 'bag', label: comp('bag').short, value: colorById(s.bag), sel: s },
    { key: 'stick', label: `${comp('stick').short} · ${stickType(s.stickType).name}`, value: colorById(s.stick), sel: s },
    { key: 'spray', label: comp('spray').short, value: colorById(s.spray), sel: s },
    { key: 'case', label: comp('case').short, value: colorById(s.case), sel: s },
    { key: 'scraper', label: comp('scraper').short, included: true },
  ];
  if (state.rosin) rows.push({ key: 'rosin', label: comp('rosin').short, included: true });

  els.summary.replaceChildren();
  rows.forEach((r) => {
    const li = document.createElement('li');
    li.className = 'summary__row';
    li.innerHTML = `
      <span class="summary__thumb"><img alt=""></span>
      <span class="summary__label">${r.label}</span>
      <span class="summary__value">${r.included
        ? '<span class="summary__included">✓ Included</span>'
        : `<span class="dot" style="background:${swatchBg(r.value.hex)}" aria-hidden="true"></span>${r.value.name}`}</span>
      ${r.included ? '' : `<button type="button" class="edit-btn" aria-label="Change ${r.label} color">Change Color</button>`}`;
    if (!r.included) $('.edit-btn', li).addEventListener('click', () => editFromReview(r.key));
    setThumb($('img', li), r.key);
    els.summary.appendChild(li);
  });

  els.summaryPrice.innerHTML = `
    <span class="summary__price-label">${p.items}-item ${CONFIG.kitName}</span>
    <span class="summary__price-nums"><s>${money(p.regular)}</s><strong>${money(p.kit)}</strong></span>
    ${p.save ? `<span class="summary__save">You save ${money(p.save)} vs. buying separately</span>` : ''}`;

  els.fulfillmentJson.textContent = JSON.stringify(lineItemProperties(), null, 2);
}

function editFromReview(key) {
  state.viaPreset = false;
  goTo('customize', { focus: false });
  toggleEditor(key, true, { focusSwatch: true });
}

function addToCart() {
  const props = lineItemProperties();
  window.krakenLineItem = props;
  console.log('%cKraken Grip → line item properties', 'background:#ff2e88;color:#fff;padding:2px 6px;border-radius:4px;font-weight:bold', props);
  console.table(props);

  els.cartProps.replaceChildren();
  Object.entries(props).forEach(([k, v]) => {
    const dt = document.createElement('dt');
    dt.textContent = k;
    const dd = document.createElement('dd');
    dd.textContent = v;
    els.cartProps.append(dt, dd);
  });
  els.cartDialog.showModal();
}

/* =========================================================================
   Navigation, progress, action bar
   ========================================================================= */
function goTo(step, { focus = true } = {}) {
  if (step !== 'start' && !state.started) step = 'start';
  state.step = step;
  els.main.dataset.step = step;
  $('#step-start').hidden = step !== 'start';
  $('#step-customize').hidden = step !== 'customize';
  $('#step-review').hidden = step !== 'review';
  if (step === 'review') renderReview();
  if (step !== 'customize') toggleEditor(null, false);
  renderProgress();
  renderActionBar();
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  if (focus) $(`#h-${step}`).focus({ preventScroll: true });
}

function renderProgress() {
  const idx = STEPS.findIndex((s) => s.id === state.step);
  const skipped = state.viaPreset && matchingPreset() && state.step === 'review';
  els.progress.replaceChildren();
  STEPS.forEach((s, i) => {
    const li = document.createElement('li');
    const isSkipped = s.id === 'customize' && skipped;
    li.className = 'progress__item' +
      (i === idx ? ' is-current' : '') +
      (i < idx && !isSkipped ? ' is-done' : '') +
      (isSkipped ? ' is-skipped' : '');
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'progress__btn';
    b.disabled = s.id !== 'start' && !state.started;
    if (i === idx) b.setAttribute('aria-current', 'step');
    b.innerHTML = `<span class="progress__num">${i < idx && !isSkipped ? '✓' : i + 1}</span><span class="progress__label">${s.label}${isSkipped ? ' <small>(optional)</small>' : ''}</span>`;
    b.addEventListener('click', () => (s.id === 'customize' ? chooseCustomizeFromAnywhere() : goTo(s.id)));
    li.appendChild(b);
    els.progress.appendChild(li);
  });
}

function chooseCustomizeFromAnywhere() {
  if (!state.started) return;
  goTo('customize');
}

function renderActionBar() {
  const bar = els.actionbar;
  bar.hidden = state.step === 'start';
  document.body.classList.toggle('has-actionbar', !bar.hidden);
  if (state.step === 'customize') {
    setBtn(els.btnSecondary, '← Back', () => goTo('start'));
    setBtn(els.btnPrimary, 'Review My Kit →', () => goTo('review'));
  } else if (state.step === 'review') {
    setBtn(els.btnSecondary, '✎ Change Colors', () => goTo('customize'));
    setBtn(els.btnPrimary, 'Add to Cart', addToCart);
  }
  updatePrice();
}

function setBtn(btn, label, handler) {
  btn.textContent = label;
  btn.onclick = handler;
}

let lastKitPrice = null;
function updatePrice() {
  const p = prices();
  els.priceRegular.textContent = money(p.regular);
  els.priceKit.textContent = money(p.kit);
  els.priceSave.textContent = p.save ? `Save ${moneyShort(p.save)}` : '';
  if (lastKitPrice !== null && lastKitPrice !== p.kit) {
    els.priceKit.classList.remove('bump');
    void els.priceKit.offsetWidth;
    els.priceKit.classList.add('bump');
  }
  lastKitPrice = p.kit;
}

function announce(msg) {
  els.announcer.textContent = '';
  setTimeout(() => { els.announcer.textContent = msg; }, 30);
}

function setRosin(on) {
  state.rosin = on;
  updateLayer('rosin');
  updateStageLabel();
  renderStart();
  renderIncluded();
  updatePrice();
  if (state.step === 'review') renderReview();
  announce(on ? 'Pine Rosin Bag added. Kit now has 6 items.' : 'Pine Rosin Bag removed.');
}

function resetAll() {
  state.started = false;
  state.viaPreset = false;
  state.selections = { ...CONFIG.customDefaults };
  updateAllLayers({ animate: false });
  syncCustomize();
  goTo('start');
}

/* =========================================================================
   Init
   ========================================================================= */
function init() {
  Object.assign(els, {
    main: $('#main'),
    stage: $('#stage'),
    placeholderBadge: $('#placeholder-badge'),
    itemCount: $('#item-count'),
    kitGrid: $('#kit-grid'),
    choices: $('#choices'),
    included: $('#included'),
    kitType: $('#kit-type'),
    summary: $('#summary'),
    summaryPrice: $('#summary-price'),
    fulfillmentJson: $('#fulfillment-json'),
    progress: $('#progress'),
    actionbar: $('#actionbar'),
    btnPrimary: $('#btn-primary'),
    btnSecondary: $('#btn-secondary'),
    priceRegular: $('#price-regular'),
    priceKit: $('#price-kit'),
    priceSave: $('#price-save'),
    cartDialog: $('#cart-dialog'),
    cartProps: $('#cart-props'),
    announcer: $('#announcer'),
  });

  renderStart();
  renderCustomize();
  syncCustomize();
  updateAllLayers({ animate: false });
  updatePrice();
  goTo('start', { focus: false });

  els.choices.addEventListener('keydown', onRowKeydown);

  if (CONFIG.features.showDemoControls) {
    const toggle = $('#rosin-toggle');
    $('#demo-toggle').hidden = false;
    toggle.checked = state.rosin;
    toggle.addEventListener('change', () => setRosin(toggle.checked));
  }

  els.cartDialog.addEventListener('close', () => {
    if (els.cartDialog.returnValue === 'restart') resetAll();
  });
}

document.addEventListener('DOMContentLoaded', init);
