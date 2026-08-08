---
name: vrom-website
description: Building or changing the VROM marketing site in website/ — the locked design tokens, the RTL rules, the motion spec the designer signed off, and the content that must never be invented. Load before touching anything under website/.
---

# VROM website — the contract

The marketing site in `website/` is a **translation of a finished design**, not a fresh
design. The design lives in Claude Design (project `118a2764-ab85-4dfa-889b-81e3647500de`)
and the brief is `website/design.md`. When the code and this file disagree with the design,
the design wins — but nothing here may be changed casually, because each value below was
decided and reviewed.

## The story the site tells

Decided 1 Aug 2026, and it is **not** the compatibility engine. Do not drift back to it.

**The pain is the trip, not the trust.** People already have a spare-parts merchant they
know and buy from. What they don't want is to shut the shop, drive to the market and stand
in the crowd for a part they know who sells.

So the site tells it in two paths:

1. **Your own merchant, delivered.** Pick the shop you already deal with, send him the
   request, he answers with his price, and the part comes to your door. Nothing about the
   relationship changes except the journey. This is the lead.
2. **Nobody you know has it.** Post the request once, it reaches the merchants who deal in
   your car's brand, and the offers come back to you — so you choose on price or on rating
   sitting down, instead of walking the market asking.

Both are real product features: `isDirect` / `isDirected` on a request is the first path,
the open RFQ is the second.

**Compatibility is now a trust point, not the headline.** "القطعة بتركب" sits in the trust
section with verified merchants and managed shipping. It is true and it matters — it is just
not what gets someone to open the app.

---

## Non-negotiables

1. **Arabic only, full RTL.** No English version, no language switch. `<html dir="rtl" lang="ar">`.
2. **Light theme.** Page background `#F4F8FD`. There is no dark mode.
3. **Cairo**, self-hosted, Arabic subset, **weights 400/600/700/800 only** (300 and 500 are
   used nowhere — do not add them back).
4. **The logo is the real artwork**, shipped as `logo-blue.png` and `logo-white.png` (one
   per surface — a CSS filter cannot turn white into brand blue). The wordmark beside it is
   live text, not part of the image. Never mirrored.
5. **The app screenshots inside phone frames stay dark.** That contrast is deliberate: a dark
   phone on a light page. Never lighten or recolor them.
6. **Never invent content.** No made-up stats ("+500 merchants"), no fake testimonials, no
   partner/press logos. The offers scene shows sample prices and ratings under a «عيّنة»
   badge, with generic shop names — never a real business.
7. **Never imply money-back or escrow.** VROM manages shipping and takes commission on
   delivery; there is **no held-funds guarantee**. Reassurance copy stays on what is true:
   الدفع عند الاستلام · الشحن بنديره ونتابعه · تجار موثّقين · تقييم ونظام نزاعات.

## Tokens

Declared once in `src/index.css` as Tailwind v4 `@theme` variables — the same palette the
Flutter app and the admin panel use, so the three read as one product.

| Token | Hex | Use |
|---|---|---|
| `--color-primary` | `#3B82C4` | buttons, links, emphasis |
| `--color-primary-light` | `#EBF3FB` | soft fills, icon halos |
| `--color-cover` | `#1F5EA3` | gradient end, darker blue |
| `--color-text-1` | `#0D1B2E` | headings, body |
| `--color-text-2` | `#4A6480` | secondary text |
| `--color-text-3` | `#8AADC8` | **decoration only** — fails AA on the page background |
| `--color-border-soft` | `#B0CDE8` | field and card borders |
| `--color-hairline` | `#E3EDF8` | card hairlines |
| `--color-bg` | `#F4F8FD` | page |
| `--color-bg-alt` | `#ECF3FB` | alternating band |
| `--color-success` / `-bg` | `#22913A` / `#E8F7EC` | trust icons |
| `--color-danger` / `-bg` | `#C42B2B` / `#FCECEC` | problem icons, field errors |
| `--color-warn` / `-bg` | `#C47A1E` / `#FEF3E2` | «قريبًا» badge |

**Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64. Section padding
`clamp(56px, 8vw, 96px)`, page gutter 20–24px.
**Radii:** 12 buttons & fields · 16 small cards · 20–24 large cards · 999 pills.
**Shadows:** resting `0 1px 2px rgba(13,27,46,.05)` · hover `0 16px 34px -16px rgba(31,94,163,.28)`.

## RTL rules that get forgotten

- Use **logical properties** (`margin-inline`, `padding-inline`, `inset-inline`), not
  left/right. Tailwind's `ps-*`/`pe-*`/`ms-*`/`me-*` already do this.
- **Arrows and chevrons mirror.** "next" points **left**. The back chevron in the design is
  `M14 6l-6 6 6 6`.
- **Latin runs and numbers stay LTR** inside Arabic text — wrap in `<bdi dir="ltr">`
  (prices, phone numbers, `vrom-eg.com`, `InstaPay`, `Google Play`). Getting this wrong
  reorders the characters visibly.
- Arabic needs `line-height: 1.7–1.8` for body — tighter clips the kasra.
- **Never mirror** the logo or the app screenshots.
- Progress bars fill from the **right** (`transform-origin: right`).

## Motion — the designer's signed-off spec

Everything is **`transform` and `opacity` only**. No animation library: CSS transitions +
`IntersectionObserver` + one shared `requestAnimationFrame`.

| Motion | Trigger | Duration | Easing |
|---|---|---|---|
| Reveal on scroll | IO, 14% + `-8%` margin | 550ms | `cubic-bezier(.22,1,.36,1)` |
| …stagger between items | | 90ms | |
| Mockup screen swap | auto loop, stops on tap | 2600ms hold / 600ms move | `cubic-bezier(.4,0,.2,1)` |
| Offers: request leaves | scroll-scrub .06→.26 | live | `cubic-bezier(.22,1,.36,1)` |
| Offers: merchants light up | scroll-scrub .24→.50, staggered | 400ms | `linear` |
| Offers: offer cards return | scroll-scrub .48→.82, staggered | 450ms | `cubic-bezier(.22,1,.36,1)` |
| Offers: payoff capsule | scroll-scrub .80→.94 | 500ms | `cubic-bezier(.22,1,.36,1)` |
| Step line fill | scroll within the steps box, starts at 85vh | live | `linear` |
| Active step | same progress | 350ms | `cubic-bezier(.22,1,.36,1)` |
| Buttons | hover/active | 180ms | `cubic-bezier(.22,1,.36,1)` |
| Cards | hover | 220ms | `ease-out` |
| Fields | focus | 180ms | `ease` |
| Accordion chevron | click | 300ms | `cubic-bezier(.22,1,.36,1)` |
| Mobile menu | click | 250ms | `cubic-bezier(.22,1,.36,1)` |

**`prefers-reduced-motion: reduce` must show the finished state, never less content:**
the request sent, the merchants lit, the offers arrived, payoff capsule visible, every `data-reveal`
element shown. Two belts: the hidden state is applied by JS (so a thrown error leaves the
page visible rather than blank), and a CSS rule inside the media query forces
`opacity:1; transform:none` back on.

This is a client-rendered SPA, so it does need JS to paint at all — what the rule guarantees
is that **no content is gated behind an animation**, not that the page works scriptless. The
`og:`/`description`/`canonical` tags are static in `index.html`, so link previews and
crawlers that don't execute JS still get the right metadata. If organic search ever matters
more than it does today, prerendering is the change to make — not more meta tags.

**Under 760px:** floating chips removed, two offer cards instead of three, selectors become one
row. The offers scene **measures itself and applies `transform: scale()` (floor 0.7)** so it
fits any viewport height instead of being clipped — desktop stays at `scale(1)`.

## Icons

One family: **24×24 grid, stroke 1.4, round caps/joins, no fill, no gradient.** Blue
`#3B82C4`; trust icons green `#22913A`; problem icons red `#C42B2B`. The circle behind an
icon is a **separate element underneath**, never drawn inside the SVG. Icon is about half the
circle's diameter (24 in 48, 32 in 64). Decorative icons get `aria-hidden`; every icon has a
readable label beside it. Full set: `VROM - الأيقونات.dc.html` in the design project, mirrored
in `src/components/Icons.tsx`.

## Facts (do not paraphrase into something stronger)

- WhatsApp `+20 155 427 9033` → `https://wa.me/201554279033` · Email `vrom.app@gmail.com`
- Domain `vrom-eg.com` · Ships to **all Egyptian governorates**
- Payment: **cash on delivery · wallet · InstaPay · Visa**
- Commission **5%**, charged on a completed deal at delivery. No subscription fee.
- Merchants are **reviewed by VROM** before they receive any request.
- The app is **not released yet** — store badges are deliberately disabled with «قريبًا».

## Stack

React 19 + Vite + TypeScript + Tailwind v4 (CSS-first `@theme`), oxlint — mirroring
the admin panel (its own repo, `vrom-admin`). Static build, deployed to Cloudflare Pages.
Dev server on **5174** (the admin panel holds 5173). No backend except the contact form and the email capture.
