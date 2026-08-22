# Januar Maksum Portfolio Prototype

This folder contains a framework-neutral portfolio prototype built from semantic HTML, Tailwind CSS utilities, plain CSS, and vanilla JavaScript.

## Files

- `index.html` — document structure and factual résumé content
- `styles.css` — design tokens, neo-brutalist components, responsive rules, and reduced-motion fallback
- `script.js` — active-section navigation and optional GSAP motion enhancement

## Run locally

```bash
python3 -m http.server 4173 -d output
```

Then open `http://127.0.0.1:4173`.

## External dependencies

- Tailwind CSS v4 browser CDN
- Google Fonts: Archivo and Space Grotesk
- GSAP 3.13.0 and ScrollTrigger

Tailwind's browser CDN is intended for development and prototyping, not production. When converting this page to Vue, React, or another framework, install Tailwind through that framework's build pipeline and move the markup section-by-section into components.

## Stable section interfaces

- `#about`
- `#experience`
- `#education`
- `#skills`
- `#certifications`

Elements with `data-observe-section` drive the active navigation state. Elements with `data-reveal` opt into progressive motion; they remain visible when JavaScript or GSAP is unavailable.

## Suggested framework boundaries

1. `Hero`
2. `ProfileOverview`
3. `SectionNavigation`
4. `ExperienceList` and `ExperienceCard`
5. `EducationGrid`
6. `SkillGrid`
7. `CertificationList`
8. `ContactCallout`

Keep the résumé data separate from presentation components during migration. The current HTML intentionally contains no invented projects, metrics, or availability claims.
