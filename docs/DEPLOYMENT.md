# Deployment guide — KalaaVerse / CREZORA.CO (Early Access)

This is a **static site**. Build it, upload the `dist/` folder to any static host.

> Do **not** deploy without founder approval. No target has been chosen or used yet.

---

## 1. Build

Windows PowerShell may block `npm`. Use `cmd`:

```bat
cmd /c "npm ci"
cmd /c "npm run build"
```

Output: `dist/` (`index.html` + `assets/`).

### Environment variables (build-time)

Vite inlines `VITE_*` variables at **build** time, so they must be present in the
build environment (not just at runtime).

| Name | Required | Notes |
| --- | --- | --- |
| `VITE_CONTACT_EMAIL` | Optional | Overrides the default `crezora.admin@gmail.com`. Use only a real founder-controlled inbox. |
| `VITE_TRANSLATION_ENDPOINT` | Optional | Only set if a real translation backend exists. Leave unset to keep BhashaVerse disabled. |

Example (bash):

```bash
VITE_CONTACT_EMAIL="hello@example.com" cmd /c "npm run build"
```

If `VITE_CONTACT_EMAIL` is unset, the public build uses
`crezora.admin@gmail.com`, and contact buttons open a real `mailto:` draft. This
is not a contact form and never claims a message was sent automatically.

---

## 2. Hosting options

Hash routing means no server rewrite rules are strictly required; any static file
server will work. Recommended setup:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18+ (20 LTS recommended)

### Netlify
- `netlify.toml`:
  ```toml
  [build]
    command = "npm run build"
    publish = "dist"
  ```
- Env vars in Site settings → Environment.

### Vercel
- Framework preset: **Vite**. Output directory: `dist`.
- Env vars in Project settings.

### Cloudflare Pages
- Build command `npm run build`, output `dist`.

### GitHub Pages / S3 + CloudFront
- Upload `dist/`. For Pages, if hosting under a subpath, set Vite `base` (see §3).

---

## 3. Subpath hosting

If the app is served from a subpath (e.g. `https://crezora.co/kalaaverse/`),
set the base path so asset URLs resolve:

```ts
// vite.config.ts
export default defineConfig({
  base: '/kalaaverse/',
  plugins: [react()],
});
```

(Tell the developer the exact subpath before building.)

---

## 4. Recommended security headers

Set these at the host/CDN (the app does not set them itself). Adjust the CSP to
your final asset/image origins.

```
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: DENY
Permissions-Policy: geolocation=(), microphone=(), camera=()
Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; connect-src 'self'
```

Notes:
- `script-src 'self'` works because Vite emits external JS (no inline scripts).
- If you add a translation endpoint, add its origin to `connect-src`.
- Google Fonts require the `fonts.googleapis.com` / `fonts.gstatic.com` entries;
  self-host fonts later to remove the third-party dependency.

## 5. Cache policy

- `assets/*` — hashed filenames → `Cache-Control: public, max-age=31536000, immutable`.
- `index.html` — `Cache-Control: no-cache` so new deploys are picked up.

---

## 6. Post-deploy verification checklist

1. `https://<host>/` loads the CREZORA corporate page.
2. `https://<host>/#/kalaaverse` and `/#/discover` load (hash routes).
3. Refresh on `/#/discover` still renders (hash routing).
4. `/#/translate` shows the honest "not available" state (unless an endpoint is set).
5. Contact buttons open a `mailto:` draft to `crezora.admin@gmail.com` (or the
   configured override). Nothing is sent automatically.
6. Language menu: default is English; selecting Hindi changes the corporate copy;
   the choice survives refresh. Urdu becomes RTL on the corporate page only.
7. Spot-check 320 px and 375 px: no horizontal scroll, mobile menu opens, and the
   language list is reachable inside the menu.
8. Browser console has no errors.
9. Confirm `dist/assets/*.js` contains no fabricated claims (spot check search).

---

## 7. Rollback

- Keep the previous `dist/` (or the host's previous deployment) and re-point to it.
- Or use git: revert to the pre-launch commit and redeploy.
- No database or server state to roll back — user data is device-local only.
