# Web Products Hub — Project Reference

**Last updated:** 04/11/2026 — Apple design system applied  
**Owner:** Jeffrey (jeffryanfl@gmail.com)  
**GitHub:** https://github.com/jeffryanfl  
**Status:** Active — Learning in public, building in public

---

## What This Project Is

A single-page personal web portfolio and learning hub, built from scratch using vanilla HTML, CSS, and JavaScript. No frameworks, no build tools — everything ships as flat files. The site is a living workshop: each project card links to a self-contained feature or mini-app embedded as a modal.

**Site title:** Web Products Hub  
**Tagline:** Web Learning Projects – April 2026  
**Theme:** Light — Apple design system (white surface, `#f5f5f7` background, Apple blue accent)

---

## File Structure

```
my-web-products-hub/
├── index.html       — Full single-page app, all sections + modals
├── styles.css       — Apple light theme, frosted nav, card shadows, modal styles, risk matrix
├── script.js        — All JS: nav, modals, countdown timer, risk calculator
├── assets/          — Static assets folder (images, icons — currently empty)
└── SKILL.md         — This file
```

---

## Sections (index.html)

| Section ID   | Description |
|---|---|
| `#hero`      | Full-height landing with tagline and CTA button |
| `#about`     | Text description of the site's purpose and philosophy |
| `#projects`  | 2×2 responsive card grid — each card opens a modal or shows an alert |
| `#features`  | Placeholder for future interactive experiments |
| `#contact`   | Email / GitHub / LinkedIn links |
| Footer       | Static branding line |

---

## Project Cards & Modals

### 1. Rockville '26 (`#rockvilleCard` → `#rockvilleModal`)
- **Purpose:** Concert countdown + set time tracker for Welcome to Rockville 2026
- **Features:**
  - Live countdown timer to 05/07/2026 12:00 PM ET, ticking every second
  - Set times by day (Thu–Sun) for major headliners
  - Placeholder photo gallery (4 emoji tiles)
- **Tech:** Vanilla JS `setInterval`, `Date`, DOM manipulation
- **Close:** X button, overlay click, or Escape key; focus returns to card

### 2. NIFB (`no ID` — generic card)
- **Status:** Placeholder — description TBD
- **Tag:** JavaScript
- **Behavior:** Clicking shows `alert()` with "coming soon" message

### 3. Risk Management (`#riskCard` → `#riskModal`)
- **Purpose:** Interactive inherent vs. residual risk calculator
- **Features:**
  - Three sliders: Inherent Impact (1–5), Inherent Likelihood (1–5), Control Effectiveness (0–100%)
  - Formula: `inherentRisk = impact × likelihood`, `residualRisk = inherentRisk × (1 - control/100)`
  - Risk tiers: Low (0–4), Medium (5–9), High (10–16), Critical (17–25)
  - Live 5×5 risk matrix: cells color-coded by tier (green/yellow/orange/red); inherent cell gets red ring, residual gets blue ring
  - Chart.js bar chart comparing inherent vs. residual scores
- **Tech:** Chart.js 4.4.7 (CDN), `requestAnimationFrame` for deferred chart init
- **Close:** X button, overlay click, or Escape key; focus returns to card

### 4. Project 4 (generic card)
- **Status:** Placeholder — Forms
- **Behavior:** Clicking shows `alert()` with "coming soon" message

---

## JavaScript Architecture (script.js)

All logic runs inside a single `DOMContentLoaded` listener. Sections:

1. **No-JS Class Removal** — removes `no-js` from `<html>` so CSS hides toggle safely
2. **Mobile Nav Toggle** — hamburger button toggles `.open` on `#navLinks`
3. **Smooth Scroll** — nav links close mobile menu on click
4. **Active Nav Highlight** — `IntersectionObserver` adds `.active` class to the in-view section's nav link
5. **Generic Card Click** — `alert()` for cards without modals
6. **Rockville Modal** — open/close, countdown `setInterval`, focus trap
7. **Risk Modal** — open/close, deferred `Chart.js` init via `requestAnimationFrame`
8. **Risk Calculator** — slider input → `calculateRisk()` → chart update → matrix update
9. **Risk Matrix** — paints tier colors on load; highlights inherent (red) and residual (blue) cells live

**Key helper functions:**
- `calculateRisk(impact, likelihood, controlEffectiveness)` — pure function, returns scores + tiers
- `riskTier(score)` — returns `'Low' | 'Medium' | 'High' | 'Critical'`
- `nearestCell(residualRisk)` — finds grid cell closest to a floating residual score
- `startCountdown()` / `updateCountdown()` — Rockville timer logic

---

## CSS Architecture (styles.css)

Apple design system using CSS custom properties (19-section file). Light theme with frosted-glass nav, pill buttons, and layered card shadows.

**Key variables:**
```css
--color-bg:           #f5f5f7   /* Apple page background */
--color-surface:      #ffffff   /* Cards, modals, nav */
--color-surface-alt:  #fbfbfd   /* Subtle section alt */
--color-text:         #1d1d1f   /* Apple primary text */
--color-muted:        #6e6e73   /* Apple secondary text */
--color-accent:       #0071e3   /* Apple blue */
--color-red:          #ff3b30   /* Apple red (countdown) */
--color-modal-bg:     #ffffff   /* Modal interior */
--color-nav-bg:       rgba(255,255,255,0.85)  /* Frosted nav */
--radius:             18px      /* Apple card radius */
--radius-btn:         980px     /* Apple pill buttons */
--shadow-card:        0 2px 12px rgba(0,0,0,0.08) ...
--shadow-modal:       0 24px 80px rgba(0,0,0,0.18) ...
```

**Notable design details:**
- Nav uses `backdrop-filter: saturate(180%) blur(20px)` for frosted glass effect
- Modal overlay uses `backdrop-filter: blur(6px)` behind the dark scrim
- Risk matrix tier colors updated to Apple system palette: green `#34c759`, amber `#ff9f0a`, orange `#ff6b35`, red `#ff3b30`
- Chart.js tooltip background updated to `#1d1d1f` with SF Pro font stack

**Responsive breakpoint:** `max-width: 768px` — collapses nav, stacks cards to 1 column, adjusts modal/countdown sizing.

**Accessibility:** `prefers-reduced-motion` media query disables all transitions/animations. `no-js` fallback shows nav links and removes card cursors.

---

## External Dependencies

| Library | Version | Usage |
|---|---|---|
| Chart.js | 4.4.7 | Bar chart in Risk Management modal |

Loaded via CDN: `https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js`

---

## Known TODOs / Next Steps

- [ ] Fill in NIFB project card — add description, build feature
- [ ] Fill in Project 4 card — add description, build Forms feature
- [ ] Populate `#features` section with live interactive experiments
- [ ] Replace `you@example.com` in contact section with real email
- [ ] Add real images to Rockville gallery (currently emoji placeholders)
- [ ] Consider adding a `<meta name="theme-color">` for mobile browser chrome
- [ ] Consider splitting script.js into modules as features grow

---

## How to Add a New Project Card

1. Add a `<div class="project-card" id="myCardId" ...>` block in the `#projects` grid in `index.html`
2. If it needs a modal, copy the existing modal overlay pattern (`<div class="modal-overlay" id="myModal" ...>`) and add your content
3. In `script.js`, add the card to `modalCards` array (to exclude it from generic click handler), then wire open/close/focus-trap logic following the Rockville or Risk modal pattern
4. No new CSS required for the card itself — `.project-card` styles are inherited

---

## Pattern: Modal Focus Trap

All modals implement a focus trap to meet accessibility best practices:

```js
modal.addEventListener('keydown', function (e) {
  if (e.key !== 'Tab') return;
  var focusable = modal.querySelectorAll('button, [href], input, ...');
  var first = focusable[0];
  var last  = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  if (!e.shiftKey && document.activeElement === last)  { e.preventDefault(); first.focus(); }
});
```

This same pattern is used in both the Rockville and Risk modals.
