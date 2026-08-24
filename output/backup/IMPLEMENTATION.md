# Januar Maksum Portfolio Prototype

This folder contains a framework-neutral portfolio prototype built from semantic HTML, Tailwind CSS utilities, plain CSS, and vanilla JavaScript.

## Files

- `index.html` — document structure and factual résumé content
- `styles.css` — design tokens, neo-brutalist components, responsive rules, and reduced-motion fallback
- `script.js` — accessible résumé tabs and optional GSAP motion enhancement
- `wave-background.js` — optional Three.js contour background with static SVG fallback
- `assets/open-to-work-portrait-v3.png` — 1200 × 1500 active monochrome portrait with alpha transparency
- `assets/open-to-work-portrait-v2.{avif,png}` — previous full-background hero portrait retained for rollback
- `assets/open-to-work-portrait.{avif,png}` — original hero portrait retained for rollback

## Run locally

```bash
python3 -m http.server 4173 -d output
```

Then open `http://127.0.0.1:4173`.

## External dependencies

- Tailwind CSS v4 browser CDN
- Google Fonts: Archivo and Space Grotesk
- GSAP 3.13.0 and ScrollTrigger
- Three.js 0.185.1

Tailwind's browser CDN is intended for development and prototyping, not production. When converting this page to Vue, React, or another framework, install Tailwind through that framework's build pipeline and move the markup section-by-section into components.

## Stable section interfaces

- `#about`
- `#experience`
- `#education`
- `#skills`
- `#certifications`

Elements with `data-reveal` opt into progressive motion; they remain visible when JavaScript or GSAP is unavailable.
The five résumé controls use the ARIA tab pattern. Experience is active by default, while the `noscript` fallback displays every panel.

The hero uses a responsive Tailwind flex structure: copy and artwork stack on narrow screens, then become vertically centered 60/40 columns from the `md` breakpoint. The semantic headline and sticker badges remain in the copy column, while the centered artwork column contains one transparent precomposed `januarmaksum-v1.png` portrait with its shield and ornaments scaling together.

## Suggested framework boundaries

1. `Hero`
2. `ProfileOverview`
3. `SectionNavigation`
4. `ExperienceList` and `ExperienceCard`
5. `EducationGrid`
6. `SkillGrid`
7. `CertificationList`
8. `ContactCallout`

Keep the résumé data separate from presentation components during migration. Availability wording is intentionally represented as visible page content and should be updated when the user's status changes.
