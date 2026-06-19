# Deploy Woven Sage to Cloudflare Pages

Follow these steps once to connect your site to **wovensage.com**.

## 1. Push to GitHub

```bash
cd ~/Projects/wovensage
git add .
git commit -m "Initial Woven Sage Psychology website"
git remote add origin git@github.com:YOUR_USERNAME/wovensage.git
git push -u origin main
```

Create the repo at [github.com/new](https://github.com/new) first if needed.

## 2. Create Cloudflare Pages project

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Select your `wovensage` repository
4. Configure build:

| Setting | Value |
|---------|-------|
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |

5. Set environment variable (optional):
   - `NODE_VERSION` = `20`

6. Click **Save and Deploy**

## 3. Connect custom domain

1. In your Pages project → **Custom domains**
2. Add **wovensage.com** and **www.wovensage.com**
3. Cloudflare will configure DNS automatically (domain already on Cloudflare)

## 4. Set up contact form (Formspree)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form with recipient **admin@wovensage.com**
3. Verify your email when prompted
4. Copy the form ID (e.g. `xyzabcde` from `https://formspree.io/f/xyzabcde`)
5. Update `src/config/site.ts`:

```ts
formspreeFormId: 'xyzabcde',
```

6. Commit and push — Cloudflare will rebuild automatically

## 5. Update Headway URL

When you have Michele's Headway profile link:

```ts
headwayBaseUrl: 'https://headway.co/providers/michele-evans-...',
```

Commit and push.

## 6. Optional: Cloudflare Web Analytics

1. Cloudflare Dashboard → **Analytics & Logs** → **Web Analytics**
2. Add site **wovensage.com** and copy the token
3. Update `src/config/site.ts`:

```ts
cloudflareAnalyticsToken: 'YOUR_TOKEN',
```

## 7. Verify after deploy

- [ ] Homepage loads at wovensage.com
- [ ] Sticky "Book on Headway" button works (opens Headway with UTM params)
- [ ] Contact form sends email to admin@wovensage.com
- [ ] All pages accessible (About, Team, Services, etc.)
- [ ] Mobile layout looks correct

## Local preview before deploy

```bash
npm install
npm run dev
```

Open http://localhost:4321

## Troubleshooting

**Build fails on Cloudflare:** Ensure `NODE_VERSION=20` is set in Pages environment variables.

**Form not sending:** Verify Formspree form ID and that admin@wovensage.com is verified in Formspree.

**Headway link wrong:** Update `headwayBaseUrl` in `src/config/site.ts` — no other code changes needed.
