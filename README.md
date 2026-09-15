# ImageWorks Creative — Footer

The site footer on its own: the *Services* / *Company* / *Platform
Expertise* menus, contact and both locations, the legal line, and the
cookie notice floating in the bottom-left corner. Same copy and
structure as the footer on
[imageworks-home](https://github.com/imageworksc/imageworks-home) — minus
the location map — laid out clean on the design system from the
[branding page](https://imageworksc.github.io/branding-page/).

**Live:** https://imageworksc.github.io/footer-iwc/

## The design

Built to sit under the [navigation](https://imageworksc.github.io/menu-iwc/),
and made of its parts, turned to face the other way:

- **Column headings** are the dropdown panels' section labels — the brand's
  eyebrow (without its dot) and the hairline that finishes the rule.
- **Links** are the panels' rows — the nav's grey at 600 weight; under the
  cursor they take the pale blue tint, turn navy, and a green bar slides in
  on the left. No underlines anywhere.
- **The legal bar** is the utility bar mirrored — the same tinted band and
  hairline, 13px at 600, links turning blue on hover.
- **The cookie notice** is a bar the width of the viewport on the footer's
  navy, flat, with the green rule along the top, coming up from 8px below
  on the panels' timings. Its content sits on the footer's shell, so the copy lines
  up with the columns and *Accept* with the legal links.
- **The mark** is set by height at 40px like the nav bar's, and the tokens
  are the nav's, verbatim.

Two rows, and the green spent on the labels, the hover bar and the cookie
button. The ground is the home's deep navy (`deep`, shared by the footer
and the cookie bar), the way the branding page's deep band does it:
re-pointing the semantic tokens flips every child, so nothing inside
carries its own dark variant. Blue has no
contrast against navy, so hovers turn green there; the legal band darkens
instead of tinting; the washes are brighter and the sheen quieter.

To run it on white instead, drop `deep` from the `<footer>` (and from the
cookie bar, if it should follow) and point the mark at `assets/logo.png`
(the colour one) instead of `assets/logo-white.png`.

Behind it, the branding page's hero washes: three pale ellipses of brand
colour (green, brand blue, sky), each drifting up and down on its own clock
(26 / 37 / 47 s — about a third of the hero's, since a footer is looked at
for seconds), and a sheen crossing over them every 19 s. A mask brings them
in under the hairline and out again before the legal line. They stop under
`prefers-reduced-motion`.

1. **Columns** — the logo and social marks; *Services* (with *AI Website
   Design* pointing at the [AI web design page](https://imageworksc.github.io/ai-web-design/));
   *Company* with *Platform Expertise* stacked under it; and contact: the
   phone first as a real `tel:` link, then both locations as a panel row's
   title over a quieter line.
2. **Legal** — the copyright left, *Sitemap* and *Privacy Policy* right.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | The footer, the cookie panel, and an empty page body above them |
| `styles.css` | Brand tokens, the footer, and the cookie panel |
| `script.js` | The cookie card: showing it, and Accept |
| `assets/logo-white.png` | The white mark for the navy ground, copied from `imageworksc/imageworks-home` |
| `assets/logo.png` | The colour mark, for running the footer on white |
| `.github/workflows/deploy.yml` | Publishes the folder to GitHub Pages on every push to `main` |

No build step and no dependencies. Open `index.html` directly, or serve the
folder with any static server.

Nothing is inline. No `<style>` block, no `style` attribute, no `on…`
handler, no presentation attributes on the SVGs: the social marks are
symbols in a sprite at the top of the body, drawn with `<use>` and coloured
and sized from the stylesheet. The script is ES2015+ — `const`/`let`,
arrow functions, optional chaining — in one closure.

## Reviewing it

- **Desktop (≥ 1024px)** — four columns: brand, services, company, contact.
- **Tablet (768–1023px)** — the brand becomes a row (logo left, social marks
  right) over three columns.
- **Phone (< 768px)** — two columns of links with the contact block full
  width beneath, its two locations side by side; under 520px everything is
  one column.
- **4K / 5K** — every length is in `rem`, and the root font size grows with the
  viewport past 1920px (`clamp(100%, .5vw + 6.4px, 250%)`), so the footer
  scales as one piece instead of shrinking to a strip along the bottom.
  Narrower than 1920px it stays at the browser default and respects the
  user's font-size setting.
- **Cookie notice** — fixed across the foot of the viewport; on small
  phones *Accept* fills the width. While it is up the legal bar keeps room
  for it below its line, so it never covers the line once you reach the foot
  of the page. *Accept* sends it
  back down and remembers the answer for the tab (`sessionStorage`), so a
  new tab brings it back for review. To make it stick across visits like
  the live site, change `sessionStorage` to `localStorage` in `script.js`.

## Design system

Colour, spacing, radii and easing are the branding page's variables,
redeclared at the top of `styles.css`:

```
--navy #143c66      --blue #1266b5      --green #80c34a    --green-ink #5c9a2e
--nav-ink #3d464d   --muted #5a6b82     --tint-blue #e5edf7  --band-tint #f2f5f9
--border #e3eaf3    --r 2px             --shell 1180px       --ease cubic-bezier(.16,.84,.44,1)
```

Type is Plus Jakarta Sans, 400 / 500 / 600 / 700 / 800.

## Accessibility

Landmarks (`main`, `footer`, a labelled `nav` per menu, and a labelled
`region` for the cookie notice), an `address` element for the locations,
`aria-label`s on the icon-only social links, visible focus rings, a real
`tel:` link, 33–52px targets on everything tappable, and
`prefers-reduced-motion` support.
