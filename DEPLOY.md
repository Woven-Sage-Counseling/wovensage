# Deploy Woven Sage to Cloudflare Pages

Follow these steps once to connect your site to **wovensage.com**.

## 1. GitHub repository

Repo: **https://github.com/Woven-Sage-Counseling/wovensage** (production branch: `master`)

## 2. Automatic deploy on push (GitHub Actions)

Pushes to `master` deploy to Cloudflare Pages via `.github/workflows/deploy.yml`.

### One-time secret setup

1. Create a Cloudflare API token:
   - [Cloudflare Dashboard → API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - **Create Token** → template **Edit Cloudflare Workers**
   - Permissions: **Account → Cloudflare Pages → Edit**
   - Create and copy the token

2. Add GitHub secrets (repo → **Settings** → **Secrets and variables** → **Actions**):

| Secret | Value |
|--------|-------|
| `CLOUDFLARE_API_TOKEN` | token from step 1 |
| `CLOUDFLARE_ACCOUNT_ID` | `6b847212c32cfc59badb7935334d541a` |

Or from the terminal:

```bash
gh secret set CLOUDFLARE_API_TOKEN
gh secret set CLOUDFLARE_ACCOUNT_ID --body "6b847212c32cfc59badb7935334d541a"
```

3. Push to `master` — GitHub Actions builds and deploys automatically.

Manual deploy (optional):

```bash
npm run build
npx wrangler pages deploy dist --project-name=wovensage
```

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
