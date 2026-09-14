# ImageWorks Creative — Footer

The site footer on its own: the newsletter, the *Services* / *Company* /
*Platform Expertise* menus, contact and both locations, the legal line, and
the cookie notice that sits along the bottom of the viewport. Same copy and
structure as the footer on
[imageworks-home](https://github.com/imageworksc/imageworks-home) — minus
the location map — laid out clean on the design system from the
[branding page](https://imageworksc.github.io/branding-page/).

**Live:** https://imageworksc.github.io/footer-iwc/

## The design

White ground under a hairline, three rows, and type doing the work: navy for
what you read first (titles, the phone), the nav's grey for links, muted for
addresses and legal. The green is spent on one button. No panels, no icons
in boxes — the social marks sit bare under the logo.

Behind it, the branding page's hero washes: three pale ellipses of brand
colour (green, brand blue, sky), each drifting up and down on its own clock
(26 / 37 / 47 s — about a third of the hero's, since a footer is looked at
for seconds), and a sheen crossing over them every 19 s. A mask brings them
in under the hairline and out again before the legal line. They stop under
`prefers-reduced-motion`.

1. **Newsletter** — the title and its line on the left, the field and the
   *Subscribe* button on the right.
2. **Columns** — the logo and social marks; *Services*; *Company* with
   *Platform Expertise* stacked under it; and contact: the phone first as a
   real `tel:` link, then both locations. Links slide a step to the right
   and turn brand blue on hover; nothing underlines.
3. **Legal** — the copyright left, *Sitemap* and *Privacy Policy* right.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | The footer, the cookie notice, and an empty page body above them |
| `styles.css` | Brand tokens, the footer, and the cookie bar |
| `script.js` | The newsletter form's confirmation / validation, and the cookie notice's Accept |
| `assets/logo.png` | The colour mark, copied from `imageworksc/imageworks-home` |
| `.github/workflows/deploy.yml` | Publishes the folder to GitHub Pages on every push to `main` |

No build step and no dependencies. Open `index.html` directly, or serve the
folder with any static server.

## Reviewing it

- **Desktop (≥ 1024px)** — four columns: brand, services, company, contact.
- **Tablet (768–1023px)** — the brand becomes a row (logo left, social marks
  right) over three columns.
- **Phone (< 768px)** — the newsletter stacks; two columns of links with the
  contact block full width beneath, its two locations side by side; under
  520px everything is one column and the button goes full width.
- **4K / 5K** — every length is in `rem`, and the root font size grows with the
  viewport past 1920px (`clamp(100%, .5vw + 6.4px, 250%)`), so the footer
  scales as one piece instead of shrinking to a strip along the bottom.
  Narrower than 1920px it stays at the browser default and respects the
  user's font-size setting.
- **Newsletter** — submit with an empty or malformed address to see the inline
  error; a valid one shows the confirmation. Nothing is sent anywhere.
- **Cookie notice** — sticky to the bottom of the viewport; it rides along
  while you scroll and sits below the legal line once you reach the foot of
  the page, so nothing is ever covered. *Accept* slides it away and remembers
  the answer for the tab (`sessionStorage`), so a new tab brings it back for
  review. To make it stick across visits like the live site, change
  `sessionStorage` to `localStorage` in `script.js`.

## Design system

Colour, spacing, radii and easing are the branding page's variables,
redeclared at the top of `styles.css`:

```
--navy #143c66   --green #80c34a   --ink #1f2b3e   --link #3d464d   --muted #5a6b82
--border #e3eaf3 --r 2px           --shell 1180px  --ease cubic-bezier(.16,.84,.44,1)
```

Type is Plus Jakarta Sans, 400 / 500 / 600 / 700.

## Accessibility

Landmarks (`main`, `footer`, a labelled `nav` per menu, a labelled `section`
for the newsletter, and a labelled `region` for the cookie notice), an
`address` element for the locations, a labelled email field with a
live-region status line, `aria-label`s on the icon-only social links,
visible focus rings, a real `tel:` link, 33–48px targets on everything
tappable, and `prefers-reduced-motion` support.
