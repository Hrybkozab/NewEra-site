# NewEra

NewEra is a Brawl Stars team website built as a modern single-page frontend project.  
It presents the roster, news, team story, contact page, and a live Brawl Stars API block for current rotation data.

## Project

This site is designed for:

- team presentation
- roster showcase
- news and article pages
- community and contact links
- future Brawl Stars data integrations

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React
- Netlify Functions

## Pages

- `/` - Home page
- `/team` - Team page with player spotlight
- `/about` - Team story and values
- `/news` - News hub with search, filter, and live API section
- `/news/:slug` - Full article page
- `/contact` - Contact form with validation

## Features

- responsive esports-style layout
- roster spotlight with URL-based player selection
- separate article system powered by shared news data
- news search by title, tag, category, and excerpt
- news tag filtering
- contact form validation
- live Brawl Stars API rotation block with safe fallback
- reusable data-driven content arrays

## How It Works

### News system

News cards and article pages use the shared data file:

- `src/pages/newsData.ts`

Each story contains:

- slug
- tag
- category
- date
- title
- image
- excerpt
- full article body
- highlights
- stat block

To add a new article, create a new object inside `newsStories`.

### Contact form

The contact form validates:

- name length
- email format
- tryout tag when tryout is selected
- message length

The form currently uses frontend validation and success state logic.

### Brawl Stars API block

The live rotation section on the News page uses a Netlify Function:

- `netlify/functions/brawl-events.mjs`

This keeps the API token hidden on the server side.

If the API token is missing, the page automatically falls back to a friendly offline state instead of breaking.

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Brawl Stars API Setup

To enable live Brawl Stars rotation data, add this environment variable in Netlify:

```bash
BRAWL_STARS_API_TOKEN=your_token_here
```

You can get the token from the official Brawl Stars developer portal:

- [Brawl Stars API](https://developer.brawlstars.com/)

## Main Structure

- `src/main.tsx` - app entry point
- `src/App.tsx` - routes, navbar, footer
- `src/pages/Home.tsx` - home page
- `src/pages/Team.tsx` - player spotlight and roster
- `src/pages/About.tsx` - team story
- `src/pages/News.tsx` - news hub
- `src/pages/NewsArticle.tsx` - article page
- `src/pages/newsData.ts` - all news content
- `src/pages/Contact.tsx` - contact form
- `src/index.css` - global styles
- `public/images` - static images
- `netlify/functions` - server-side API functions

## Future Ideas

- connect real player tags and live player stats
- add club info from Brawl Stars API
- add real backend submission for the contact form
- move news content into an admin-friendly CMS or database
