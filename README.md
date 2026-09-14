# ImageWorks Creative — Footer

The site footer on its own: the studio column (logo, both locations, phone,
social), the *Services* / *Company* / *Platform Expertise* menus, the
newsletter sign-up, the legal line, and the cookie notice that sits along
the bottom of the viewport. Rebuilt from the footer on
[imageworks-home](https://github.com/imageworksc/imageworks-home) with the
same type, colours, spacing and logo — minus the location map that used to
sit above the newsletter. Built on the design system from the
[branding page](https://imageworksc.github.io/branding-page/).

**Live:** https://imageworksc.github.io/footer-iwc/

## Files

| File | What it holds |
| --- | --- |
| `index.html` | The footer, the cookie notice, and an empty page body above them |
| `styles.css` | Brand tokens, the footer components, and the cookie bar |
| `script.js` | The newsletter form's confirmation / validation, and the cookie notice's Accept |
| `assets/footer-logo.png` | The white mark, copied from `imageworksc/imageworks-home` |
| `.github/workflows/deploy.yml` | Publishes the folder to GitHub Pages on every push to `main` |

No build step and no dependencies. Open `index.html` directly, or serve the
folder with any static server.

## Reviewing it

- **Desktop (≥ 1100px)** — three columns: studio, menus, newsletter.
- **Tablet (768–1099px)** — two columns; the newsletter tucks under the studio.
- **Phone (< 768px)** — one column of centred bands, text left-aligned inside;
  under 520px the two menu columns stack too.
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

Colour, spacing, radii, shadows and easing are the branding page's variables,
redeclared at the top of `styles.css`:

```
--navy-deep #0a2c4d   --green #80c34a   --on-navy-soft rgba(255,255,255,.85)
--r 2px               --shell 1340px    --ease cubic-bezier(.16,.84,.44,1)
```

Type is Plus Jakarta Sans, 400 / 600 / 700.

## Accessibility

Landmarks (`main`, `footer`, `nav`, and a labelled `region` for the cookie
notice), an `address` element for the locations, a labelled email field with
a live-region status line, `aria-label`s on the icon-only social and submit
buttons, visible focus rings, a real `tel:` link, and `prefers-reduced-motion`
support (the cookie bar disappears without the slide).
