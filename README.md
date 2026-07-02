# Woven Sage Counseling Website

Marketing site for [Woven Sage Counseling](https://wovensage.com) — built with Astro, Tailwind CSS, deployed on Cloudflare Pages.

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
npm run preview  # preview production build
```

## Configuration

Edit **`src/config/site.ts`** to update:

- Headway booking URL (`headwayBaseUrl`)
- Formspree form ID (`formspreeFormId`)
- Contact email, service areas, insurance carriers
- Team bios, social links
- Cloudflare Analytics token (optional)

## Deploy to Cloudflare Pages

See **[DEPLOY.md](./DEPLOY.md)** for step-by-step instructions.

Build settings for Cloudflare Pages:

| Setting | Value |
|---------|-------|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | 20 |

## Contact form setup

1. Sign up at [formspree.io](https://formspree.io) (free tier)
2. Create a form targeting `admin@wovensage.com`
3. Copy the form ID into `siteConfig.formspreeFormId`

## Headway tracking

All "Book on Headway" buttons use UTM parameters:

- `utm_source=wovensage`
- `utm_medium=<source>` (header, hero, contact, etc.)
- `utm_campaign=book`

Click events fire `headway_book_click` for analytics integration.

## Project structure

```
src/
├── config/site.ts      # Central configuration
├── components/         # Reusable UI
├── layouts/            # Page layouts
├── pages/              # Routes
└── styles/global.css   # Tailwind + brand tokens
```
