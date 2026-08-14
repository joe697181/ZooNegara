# Zoo Negara Immersive Redesign

A responsive twelve-page redesign of the selected Zoo Negara website pages, following the supplied rainforest-and-gold homepage direction while retaining the published page content.

## Run locally

1. Install [Node.js](https://nodejs.org/) 18 or newer.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local address shown in the terminal.

To make a production build, run `npm run build`. The ready-to-host files will be created in `dist/`.

## Included pages

- Home
- Zoo Negara / About Us
- The 5 Pillars We Stand
- Opening Hours & Rates
- Zoo Map with zoom controls
- Animal Feeding
- Food & Souvenir Kiosks
- Birthdays / Zoo Hunt / Explorace
- Adopt Our Animals
- Education
- Rimba Biodiversiti / Exhibits with interactive gallery
- Conservation / Animal in CITES

## Features

- Responsive glass navigation, mobile menu and page search
- Original Zoo Negara navigation labels, submenu structure and destinations
- Shared forest-and-gold design system across every page
- Cinematic hero motion, floating fireflies, page transitions and scroll-triggered reveals
- Adaptive Quick Access dock that expands on desktop and becomes a polished mobile action bar
- Scroll progress, card lift, sheen and directional button micro-interactions
- Official 2026 rates artwork and entrance-fee table
- Zoomable zoo map and full-size image viewers
- Interactive Rimba Biodiversiti gallery
- Source-page calls to action and contact information
- Keyboard-friendly dialogs and reduced-motion support

## Technology

| Part | Choice |
| --- | --- |
| Frontend | React 18 |
| Build tool | Vite |
| Icons | Lucide React |
| Display font | Cormorant Garamond |
| Body font | Manrope |
| Database | None — the project is a static informational website |

The project does not need environment variables or secret credentials.

See `docs/DESIGN-SYSTEM.md` for the palette and typography, `docs/CONTENT-SOURCES.md` for the content audit, and `docs/TECHNICAL.md` for handover notes.
