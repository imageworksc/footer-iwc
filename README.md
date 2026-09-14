# ImageWorks Creative — Footer

The site footer on its own: a floating contact card (call, and subscribe),
the studio column (logo, both locations, social), the *Services* /
*Company* / *Platform Expertise* menus, the legal bar, and the cookie notice
that sits along the bottom of the viewport. Same copy and structure as the
footer on [imageworks-home](https://github.com/imageworksc/imageworks-home)
— minus the location map — laid out fresh on the design system from the
[branding page](https://imageworksc.github.io/branding-page/).

**Live:** https://imageworksc.github.io/footer-iwc/

## The design

The footer flips from a navy block to the brand's pale band, so it reads as
the calm close of a page rather than a wall. One card carries the two things
a visitor actually does down here — call, and subscribe — cut from the
branding page's CTA band (the navy→blue gradient with its dot field) and
floated over the footer's top edge. Navy is authority (the card, the legal
bar); green is action (the phone button, *Subscribe*, the chips, the
eyebrows); everything else is ink on tint.

- **Contact card** — the eyebrow, "Call or text us", and the phone number as
  a 58px green button with a real `tel:` link on the left; the newsletter
  with a labelled *Subscribe* button on the right.
- **Studio** — the colour mark, both locations behind the brand's tinted
  chip, and 44px social buttons.
- **Menus** — three columns under eyebrow headings, 34px link targets, hover
  turns the link blue and grows the rule under it.
- **Legal bar** — deep navy, the copyright left and the two links right.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | The footer, the cookie notice, and an empty page body above them |
| `styles.css` | Brand tokens, the footer components, and the cookie bar |
| `script.js` | The newsletter form's confirmation / validation, and the cookie notice's Accept |
| `assets/logo.png` | The colour mark, copied from `imageworksc/imageworks-home` |
| `.github/workflows/deploy.yml` | Publishes the folder to GitHub Pages on every push to `main` |

No build step and no dependencies. Open `index.html` directly, or serve the
folder with any static server.

## Reviewing it

- **Desktop (≥ 1100px)** — the card in two halves; the studio beside the
  three menus.
- **Tablet (768–1099px)** — the card still in two halves; the studio spreads
  into a row (mark and social left, locations right) above the three menus.
- **Phone (< 768px)** — everything stacks; the menus keep two columns until
  520px, where they and the buttons go full width.
- **4K / 5K** — every length is in `rem`, and the root font size grows with the
  viewport past 1920px (`clamp(100%, .5vw + 6.4px, 250%)`), so the footer
  scales as one piece instead of shrinking to a strip along the bottom.
  Narrower than 1920px it stays at the browser default and respects the
  user's font-size setting.
- **Newsletter** — submit with an empty or malformed address to see the inline
  error; a valid one shows the confirmation. Nothing is sent anywhere.
- **Cookie notice** — sticky to the bottom of the viewport; it rides along
  while you scroll and sits below the legal bar once you reach the foot of
  the page, so nothing is ever covered. *Accept* slides it away and remembers
  the answer for the tab (`sessionStorage`), so a new tab brings it back for
  review. To make it stick across visits like the live site, change
  `sessionStorage` to `localStorage` in `script.js`.

## Placing it on a page

The contact card straddles the footer's top edge by `--overlap` (56px, 40px
on phones). On this review page the empty `main` carries that room as
`padding-bottom`; on a real page, the section above the footer needs the
same bottom padding, or set `--overlap: 0` to have the card sit flush.

## Design system

Colour, spacing, radii, shadows and easing are the branding page's variables,
redeclared at the top of `styles.css`:

```
--navy #143c66      --navy-deep #0a2c4d   --blue #1266b5
--green #80c34a     --green-ink #5c9a2e   --ink #1f2b3e   --muted #5a6b82
--band-tint #f2f5f9 --chip-green #eaf6dd  --cta-band linear-gradient(135deg, #1266b5, #0a2c4d)
--r 2px             --shell 1180px        --ease cubic-bezier(.16,.84,.44,1)
```

Type is Plus Jakarta Sans, 400 / 600 / 700 / 800.

## Accessibility

Landmarks (`main`, `footer`, `nav`, a labelled `section` for the card, and a
labelled `region` for the cookie notice), an `address` element for the
locations, a labelled email field with a live-region status line,
`aria-label`s on the icon-only social buttons, visible focus rings on both
light and navy grounds, a real `tel:` link, 34–58px targets on everything
tappable, and `prefers-reduced-motion` support.
