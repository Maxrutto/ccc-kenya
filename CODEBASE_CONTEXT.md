# CODEBASE_CONTEXT.md — CCC-Kenya Structural Map

> Generated: 2026-02-26
> Purpose: Pre-update reference for zero-downtime changes

---

## 1. Tech Stack & Tooling

| Layer | Technology | Version |
|-------|-----------|---------|
| Build | Vite | 6.2.0 |
| UI | React | 19.0.0 |
| Styling | Tailwind CSS | 3.4.3 (PostCSS 8.4.38, Autoprefixer 10.4.19) |
| Routing | react-router-dom | 7.5.0 (BrowserRouter, lazy-loaded routes) |
| Animation | framer-motion | 12.6.3 |
| Maps | react-leaflet / leaflet | 5.0.0 / 1.9.4 |
| Forms | formik + yup | 2.4.6 / 1.6.1 |
| Carousel | @splidejs/react-splide | 0.7.12 |
| Icons | react-icons | 5.5.0 |
| Lazy images | react-lazy-load-image-component | 1.5.6 |
| CMS client | @sanity/client + @sanity/image-url | 6.28.4 / 1.1.0 (mocked — see Section 3) |
| Contact API | Web3Forms + @emailjs/browser | — / 4.4.1 |
| Minifier | terser | 5.40.0 |
| Image processing (dev) | sharp | 0.34.4 |

**State Management:** Local React hooks only (`useState`, `useEffect`, `useCallback`, `useRef`, `memo`). No Redux, Zustand, or Context providers.

**Build config highlights** (`vite.config.js`):
- Manual chunk splitting: `react`, `router`, `framer`, `icons`, `leaflet`
- Production: terser minification with `drop_console` and `drop_debugger`
- Target: `esnext`, no sourcemaps in production

---

## 2. Directory Structure

```
ccc-kenya/
├── public/
│   ├── images/                     # Monastery & partner photos (hardcoded paths)
│   └── anniversary_images/         # 29 files, ~66 MB total
├── src/
│   ├── components/
│   │   ├── UI/
│   │   │   ├── AnimWrapper.jsx     # Intersection-based fade-in wrapper
│   │   │   ├── AnniversaryImage.jsx
│   │   │   ├── AnniversarySlider.jsx
│   │   │   ├── GlitchText.jsx
│   │   │   ├── ImageSlider.jsx
│   │   │   ├── LazyImage.jsx       # react-lazy-load-image-component wrapper
│   │   │   ├── Loader.jsx          # react-spinners loading indicator
│   │   │   └── ScrollToTop.jsx     # Scrolls to top on route change
│   │   ├── layout/
│   │   │   ├── Header.jsx          # Nav bar with mobile hamburger
│   │   │   └── Footer.jsx          # Links, newsletter (localStorage), contact info
│   │   └── sections/
│   │       ├── About.jsx           # Homepage section (eagerly imported)
│   │       ├── Hero.jsx
│   │       ├── History.jsx
│   │       ├── Mission.jsx         # Homepage section (eagerly imported)
│   │       └── Vision.jsx          # Homepage section (eagerly imported)
│   ├── data/
│   │   └── anniversaryImages.js    # 26 image entries with captions
│   ├── hooks/
│   │   └── useIntersectionObserver.js  # Custom IntersectionObserver hook
│   ├── lib/
│   │   ├── sanity.js               # Mock Sanity client (static data)
│   │   ├── imageBuilder.js         # Mock urlFor() — maps _ref strings to local paths
│   │   └── renderHelper.js         # forceRepaint utility
│   ├── pages/
│   │   ├── Home.jsx                # Landing page (lazy)
│   │   ├── News.jsx                # News & Events (lazy, fetches from mock sanity)
│   │   ├── Blog.jsx                # Contemplative Voices (lazy, inline data)
│   │   ├── Monasteries.jsx         # Member Monasteries + Leaflet map (lazy)
│   │   ├── AnnualMeetings.jsx      # Meeting timeline (lazy, inline data)
│   │   ├── Partners.jsx            # Partners & CCCK Friends (lazy, inline data)
│   │   ├── Work.jsx                # Our Initiatives (lazy, inline data)
│   │   ├── Contact.jsx             # Contact form — Web3Forms + mailto fallback (eager)
│   │   ├── Donate.jsx              # Donation page (eager)
│   │   └── NotFound.jsx            # 404 page (lazy)
│   ├── App.jsx                     # BrowserRouter, route definitions, lazy loading
│   ├── main.jsx                    # React 19 createRoot entry point
│   ├── App.css
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.cjs
├── postcss.config.cjs
├── eslint.config.js
├── package.json
├── env.example
└── studio/                         # Sanity Studio (unused — site uses mock client)
```

---

## 3. Data Layer & Content Management (Critical)

**ALL content is hardcoded.** There is no live CMS, database, or API powering content. The `@sanity/client` dependency exists but is fully mocked in `src/lib/sanity.js`.

### Data source inventory

| Content | File | Format | Count |
|---------|------|--------|-------|
| News & Announcements | `src/lib/sanity.js` | Mock Sanity client, `newsArticles` array | 8 articles |
| News Categories | `src/lib/sanity.js` | Mock Sanity client, `categories` array | 4 categories (Events, Formation, Prayer Intentions, Announcements) |
| Monasteries (Sanity mock) | `src/lib/sanity.js` | Mock Sanity client, `monasteries` array | 24 entries |
| Monasteries (Page data) | `src/pages/Monasteries.jsx` | Two inline arrays: `kenyanMonasteries` + `otherCountriesMonasteries` | 20 Kenyan + 17 international = 37 total |
| Blog / Contemplative Voices | `src/pages/Blog.jsx` | Inline `blogPosts` array | 1 post |
| Annual Meetings | `src/pages/AnnualMeetings.jsx` | Inline `annualMeetings` array | 11 meetings (2015-2025) |
| Partners | `src/pages/Partners.jsx` | Inline `partners` array + `ccckFriends` object | 5 partners + CCCK Friends section |
| Work / Initiatives | `src/pages/Work.jsx` | Inline `work` array + inline key initiatives array | 6 work items + 5 key initiatives |
| Anniversary Images | `src/data/anniversaryImages.js` | Exported array of image objects | 26 entries |

### Only external API

**Web3Forms** — used for the contact form at `src/pages/Contact.jsx`.
- API key loaded from `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY`
- Falls back to `mailto:` links and a copy-to-clipboard modal if the key is missing or the API call fails
- `@emailjs/browser` is listed in dependencies but not currently imported anywhere

---

## 4. Key Component Architecture

### Routing (App.jsx)

All routes are flat — no nested routes or dynamic segments:

```
/                  → Home (lazy)
/monasteries       → Monasteries (lazy)
/work              → Work (lazy)
/news              → News (lazy)
/annual-meetings   → AnnualMeetings (lazy)
/partners          → Partners (lazy, preloaded)
/blog              → Blog (lazy)
/contact           → Contact (eager import)
/donate            → Donate (eager import)
*                  → NotFound (lazy)
```

Lazy loading uses a custom `createLazyComponent()` wrapper around `React.lazy()` that adds retry logic and an optional preload flag. About, Mission, and Vision are eagerly imported (used on the homepage).

### News component hierarchy

```
News.jsx
├── Fetches data: client.fetch() from src/lib/sanity.js (mock)
├── State: news[], categories[], loading, activeFilter
├── Category filter buttons (from categories array)
├── News card grid (3-column responsive)
│   ├── Conditional image rendering (only for specific _ref values)
│   │   └── urlFor() from src/lib/imageBuilder.js (mock)
│   ├── Date formatting (toLocaleDateString)
│   ├── Category tags
│   └── Excerpt text
└── Empty state fallback
```

**Note:** News articles have `slug` fields in the data but there are no detail routes (`/news/:slug` is not implemented). All content displays in card format on the listing page.

### Blog component hierarchy

```
Blog.jsx
├── Data: inline blogPosts array (1 post)
├── Renders full post content inline (not a listing/detail split)
│   ├── Post header (title, date, author)
│   ├── LazyImage for post image
│   └── Content blocks: "quote" or "paragraph" type
└── "More Stories Coming Soon" placeholder
```

**Note:** Blog posts have an `id` field but there is no `/blog/:id` route. The single post renders in full on the `/blog` page.

### Monasteries component hierarchy

```
Monasteries.jsx
├── Data: kenyanMonasteries[] + otherCountriesMonasteries[] (inline, 37 total)
├── Leaflet MapContainer with markers for all monasteries
│   ├── OpenStreetMap tile layer
│   └── Marker + Popup per monastery
├── Kenya section: card grid with images (native <img>, not LazyImage)
└── International section: card grid with country labels
```

**Note:** Monasteries exist in TWO separate data stores: `src/lib/sanity.js` (24 entries with Sanity-style schema) and `src/pages/Monasteries.jsx` (37 entries with direct image paths). These are independent and not synchronized.

### Shared UI components

- **AnimWrapper** — wraps content with intersection-observer-triggered fade-in animation
- **LazyImage** — wraps `react-lazy-load-image-component` for progressive image loading
- **Loader** — full-page spinner using `react-spinners`
- **ScrollToTop** — scrolls window to top on route changes
- **AnniversarySlider** — Splide carousel for anniversary photos

---

## 5. Potential Loopholes & Gotchas

### Mixed image referencing patterns
- **Monasteries.jsx** uses direct paths: `"images/Carmelite Nairobi Westlands.jpeg"`
- **News.jsx** uses mock Sanity refs: `{ asset: { _ref: 'bishop-kimengich' } }` resolved by `imageBuilder.js`
- **Blog.jsx** uses direct paths: `"images/Carmelite Monastery Kitui.jpg"`
- **anniversaryImages.js** uses direct paths: `"anniversary_images/IMG_1957.jpg"`
- Any refactor to a real CMS must account for both patterns

### Data tightly coupled inside page components
Content arrays are defined at the top of their respective page files (`Blog.jsx`, `AnnualMeetings.jsx`, `Monasteries.jsx`, `Partners.jsx`, `Work.jsx`). Extracting data to a CMS or shared data layer requires touching every page component.

### Duplicate monastery data
`src/lib/sanity.js` has 24 monasteries (Sanity-schema format) while `src/pages/Monasteries.jsx` has 37 monasteries (flat format with direct image paths). The page component does NOT fetch from the mock client — it uses its own inline data. The two datasets are out of sync in count and structure.

### Anniversary images are unoptimized
- 29 files in `public/anniversary_images/`, totaling ~66 MB
- Average ~2.3 MB per image
- No responsive variants or WebP/AVIF conversions
- `sharp` is in devDependencies but no build-time optimization pipeline exists

### Mock Sanity client uses brittle query string matching
`src/lib/sanity.js` matches queries via `query.includes("monastery")`, `query.includes("news")`, etc. Any new query that contains these substrings will match unexpectedly; any query that doesn't contain them returns `[]`.

### No TypeScript
The entire codebase is plain JavaScript (`.jsx`/`.js`). Adding new data fields or changing component props risks silent breakage with no compile-time checks.

### Hardcoded email in multiple files
`ccckmonasteries@gmail.com` appears in 6 files with no central config:
- `src/pages/Contact.jsx` (multiple occurrences — form fallback, mailto links, Gmail/Outlook links)
- `src/pages/Partners.jsx` (CCCK Friends contact section)
- `src/components/layout/Footer.jsx` (footer contact info)
- `src/components/layout/Header.jsx`
- `env.example`
- `EMAIL_SETUP.md`

### CustomPortableText in News.jsx only handles basic text spans
The renderer at `News.jsx:9-24` only processes `block.children[].text` spans. It does not handle:
- Bold, italic, or other marks
- Links or annotations
- Lists, headings, or nested blocks
- Images or embedded content

If the mock data is upgraded or a real Sanity backend is connected, this renderer will silently drop rich content.

### Newsletter subscription is localStorage-only
The Footer newsletter form stores subscribers in `localStorage` — there is no backend, no email service integration, and data is lost on browser clear.

### Social media links are placeholders
Footer and Contact page link to generic `https://facebook.com`, `https://twitter.com`, `https://instagram.com` — not actual CCCK accounts.

### @emailjs/browser is an unused dependency
Listed in `package.json` but not imported anywhere in the codebase. The contact form uses Web3Forms instead.

---

## Appendix: Route-to-File Map

| Route | Component file | Data source |
|-------|---------------|-------------|
| `/` | `src/pages/Home.jsx` | Sections: About, Mission, Vision, Hero, History |
| `/news` | `src/pages/News.jsx` | `src/lib/sanity.js` (mock fetch) |
| `/blog` | `src/pages/Blog.jsx` | Inline `blogPosts` array |
| `/monasteries` | `src/pages/Monasteries.jsx` | Inline `kenyanMonasteries` + `otherCountriesMonasteries` |
| `/annual-meetings` | `src/pages/AnnualMeetings.jsx` | Inline `annualMeetings` array |
| `/partners` | `src/pages/Partners.jsx` | Inline `partners` + `ccckFriends` |
| `/work` | `src/pages/Work.jsx` | Inline `work` + key initiatives |
| `/contact` | `src/pages/Contact.jsx` | Web3Forms API (external) |
| `/donate` | `src/pages/Donate.jsx` | — |
| `*` | `src/pages/NotFound.jsx` | — |
