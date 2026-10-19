# CREZORA.CO — Corporate Site & KalaaVerse (Early Access)

CREZORA.CO is the parent-brand site for an independent Indian technology studio.
KalaaVerse is its early-access creative ecosystem: a directory and workspace where
creative people can present their craft, and where clients can browse and contact
them.

> **Status:** Early Access. This is a static single-page app (React + Vite +
> TypeScript + Tailwind). It has **no backend**, **no database**, **no real
> authentication**, **no payments/escrow**, and **no AI service**.

---

## What is honest about this build

The product deliberately avoids pretending to be more finished than it is:

- **No fabricated data.** There are no invented creators, reviews, ratings,
  awards, testimonials, user counts, revenue or verification claims. The
  directory shows a small number of clearly-labelled **sample** profiles plus any
  profiles created on the same device.
- **No fake authentication.** "Sign in" only reopens a profile created earlier
  on the same browser. No passwords are collected.
- **No simulated translation.** BhashaVerse stays disabled unless a real
  translation endpoint is configured.
- **No fake payments.** The marketplace, wallet, escrow and payouts are not
  implemented and are shown as unavailable.

## Current feature status

| Area | Status |
| --- | --- |
| CREZORA corporate site | Live |
| KalaaVerse landing page | Live |
| Creator directory (light theme) | Live |
| Profile creation (local only) | Live (device-local) |
| Knowledge Hub | Early access |
| Sahayak AI | Concept only (honest status page) |
| Chitti AI | Concept only (honest status page) |
| BhashaVerse translation | Preview (engine disabled without a backend) |
| Marketplace / payments / wallet | Not available |
| Admin console | Not available |
| AI features | Not available |

## Languages

The interface opens in English by default. The language menu is searchable and
persists the choice in `localStorage` (`kv_interface_language_v1`).

- **Core landing-page translations:** English, Hindi, Telugu, Tamil, Kannada,
  Malayalam, Bengali, Marathi, Gujarati, Punjabi, Odia, Assamese and Urdu.
- **Registered but disabled until translated:** Sanskrit, Kashmiri, Konkani,
  Manipuri / Meitei, Nepali, Bodo, Dogri, Maithili, Santali and Sindhi.

Urdu is displayed right-to-left on the corporate surface. The 13 core
translations cover the corporate navigation, hero, product discovery, principles,
contact and footer. Product dictionaries exist for English, Hindi, Telugu, Tamil,
Kannada and Bengali, but product-screen localization is still partial — the
KalaaVerse landing view does not consume the selection yet. Other selected
languages fall back to English inside the product app, and the language menu says
so. Sahayak AI and Chitti AI are English-only concept pages and stay
left-to-right.

## Running locally

Requirements: Node.js 18+ and npm 9+.

```bash
npm install
npm run dev      # development server on http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

> On Windows PowerShell, `npm` may be blocked by the execution policy. Use
> `cmd /c "npm run build"` instead.

## Routes (hash-based)

The app uses hash routing so deep links work on any static host:

`#/` corporate · `#/kalaaverse` landing · `#/discover` directory ·
`#/knowledge` · `#/translate` · `#/sahayak` · `#/chitti` · `#/services` ·
`#/about` · `#/contact` · `#/privacy` · `#/terms` · `#/join` ·
`#/creator-signup` · `#/client-signup` · `#/sign-in` · `#/home` ·
`#/studio` · `#/collaborate` · `#/workroom` · `#/opportunities` ·
`#/community` · `#/library` · `#/profile`.

## Environment variables

All optional. Names only — values are supplied at deploy time.

| Variable | Purpose |
| --- | --- |
| `VITE_CONTACT_EMAIL` | Overrides the contact address. The public build defaults to `crezora.admin@gmail.com`. |
| `VITE_TRANSLATION_ENDPOINT` | Enables the BhashaVerse translation studio. If unset, translation stays disabled. |

## Data & privacy

All data lives in the browser's `localStorage` under the `kv_` prefix. Nothing is
sent to a server. Clearing site data removes everything.

## Repository layout

```
src/
  components/    shared UI (header, sidebar, footer, command palette, modals)
  config/        runtime configuration & feature flags
  data/          disciplines + labelled sample profiles
  services/      localStorage persistence, i18n, local-profile auth
  types/         TypeScript types
  views/         one folder per screen
```

See `docs/AUDIT.md` and `docs/DEPLOYMENT.md` for the audit and deployment notes.
