# Technical Handover

## Overview

This is a static React website. It does not use login, a database, personal-data storage or a server-side API. Navigation uses URL hashes (for example `#/map`) so all twelve pages work on ordinary static hosting without special route-rewrite rules.

## Main pieces

- `src/App.jsx` contains the shared shell, reusable components and page layouts.
- `src/content.js` holds repeated navigation, food, exhibit and gallery data.
- `src/styles.css` contains the complete responsive design system.
- `public/assets/` contains the local image assets.

## Key decisions

- **React components:** the navigation, buttons, page heroes, image viewers and footer are shared, so a future style change can be made once and applied across the site.
- **Hash routing:** keeps deployment simple on static hosts and preserves direct links to every redesigned page.
- **Local imagery and fonts:** reduces broken external visual dependencies. YouTube previews and videos remain external because the source site embeds YouTube.
- **Progressive motion:** page entrances, scroll reveals and ambient hero effects use CSS transforms and opacity for smooth rendering. An `IntersectionObserver` activates content only as it enters the viewport.
- **Adaptive Quick Access dock:** the ticket and map actions remain persistently available without obscuring content; the rail expands on hover/focus at desktop sizes and becomes a mobile bottom dock.
- **Reduced motion:** the interface respects `prefers-reduced-motion` and disables decorative movement while keeping every control usable.
- **No Supabase/database:** all supplied content is public, editorial and read-only. Adding a database would create cost and maintenance without serving the requested redesign.

## External services

| Service | Purpose | Credentials |
| --- | --- | --- |
| YouTube | Two Animal & Zookeeper videos | None |
| Ticket2U | Official ticket and adoption actions | None |
| Zoo Negara website | Existing detail pages, PDFs and related links | None |

## Before production

- Confirm that Zoo Negara has permission to publish and reuse every local image asset.
- Have Zoo Negara staff re-check rates, schedules, phone numbers and external links before launch.
- Replace “redesign concept” in the footer if this becomes the official website.
- Run accessibility checks with keyboard navigation and a screen reader.
- Test the production build on current Chrome, Safari, Firefox and Edge.
- Add analytics and a content-management workflow only if Zoo Negara requests them.

## Personal data

No personal data is collected or stored. The project contains only public contact information published on the source pages.
