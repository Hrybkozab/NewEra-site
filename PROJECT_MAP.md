# Project Map

## Main entry

- `src/main.tsx`
  Starts React and wraps the app in `HashRouter`.

- `src/App.tsx`
  Main shell of the site.
  Contains:
  - top navigation
  - footer
  - page routes
  - scroll reset when switching pages

## Pages

- `src/pages/Home.tsx`
  Main landing page.
  Contains:
  - hero section
  - running marquee banner
  - player preview cards
  - stats
  - achievements
  - news

- `src/pages/Team.tsx`
  Team page.
  Contains:
  - big selected player card
  - player switch buttons
  - roster grid
  - sync between selected player and URL query

- `src/pages/About.tsx`
  About page.
  Contains:
  - team story
  - mission block
  - timeline
  - values

- `src/pages/Contact.tsx`
  Contact page.
  Contains:
  - contact form UI
  - Discord block
  - socials
  - FAQ

## Styles

- `src/index.css`
  Global styles for the whole project.
  Contains:
  - fonts
  - base styles
  - scrollbar
  - animations
  - marquee animation

## Images

- `public/images/newera-logo.png`
  Main NewEra logo.

- `public/images/brawl-stars-badge.png`
  Brawl Stars badge used in player cards.

- `public/images/team/`
  Player images used by `Home` and `Team`.

## Config

- `package.json`
  Dependencies and npm scripts.

- `vite.config.ts`
  Vite config.

- `tailwind.config.js`
  Tailwind config.

- `postcss.config.js`
  PostCSS config.

- `tsconfig.json`
  TypeScript config for app code.

- `tsconfig.node.json`
  TypeScript config for Vite/node-side files.
