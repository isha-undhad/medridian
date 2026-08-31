# Project Documentation — Dream Stories Website

> **Purpose of this document:** a complete snapshot of the site as it exists today (a fully static, hardcoded-content Next.js site), written so a future migration to a dynamic stack (database, CMS, API, auth) can be scoped and executed without re-discovering the codebase from scratch. Wherever content currently lives in a TypeScript file instead of a database, this doc calls it out explicitly.

Last generated: **2026-08-26**, against commit `53af984` on `main`.

---

## 1. Project Overview

**What it is:** the marketing/portfolio website for **Dream Stories**, a fictional/placeholder Surat, India-based destination wedding photography studio (see [src/data/nav.ts](src/data/nav.ts) — `brand`). It's a fine-art photography brand site: hero imagery, portfolio galleries, services, an "about the photographer" story, a journal/blog, and a contact/inquiry form.

**Target audience:** prospective wedding/portrait/editorial clients browsing the studio's work and submitting an inquiry; secondarily, real-estate for the studio's brand/editorial presence (Instagram cross-promotion, journal content for SEO).

**Current state:** 100% static. There is no database, no CMS, no authentication, no server-side data fetching, and no API routes. Every page is pre-rendered at build time from data hardcoded in TypeScript modules under [src/data/](src/data/). The one form on the site (contact/inquiry) does not submit anywhere — see [§9 Known Limitations](#9-known-limitations--technical-debt).

### Tech stack & versions

| Layer | Package | Version (resolved, package-lock.json) |
|---|---|---|
| Framework | `next` | **16.3.1** (App Router) |
| UI library | `react` / `react-dom` | **19.2.8** |
| Language | `typescript` | **5.9.3** |
| Styling | `tailwindcss` | **4.3.3** (v4, CSS-first config via `@theme inline`) |
| Styling build | `@tailwindcss/postcss` | 4.3.3 |
| Animation | `framer-motion` | 13.1.0 |
| Icons | `lucide-react` | 1.33.0 |
| Class utilities | `clsx` + `tailwind-merge` | 2.1.1 / 3.6.0 (combined in [src/lib/utils.ts](src/lib/utils.ts) as `cn()`) |
| Lint | `eslint` + `eslint-config-next` | 9.39.5 / 16.3.1 |
| Package manager | npm (`package-lock.json` present; no `yarn.lock`/`pnpm-lock.yaml`) | — |

**Routing model:** Next.js **App Router** (`src/app/`), not Pages Router. No `src/pages/` directory exists (Tailwind's config still references a `src/pages/**` glob defensively, but the folder is absent).

**Rendering model:** Every route is a Server Component by default; interactive pieces (forms, sliders, filters, modals) opt into Client Components via `"use client"` — **34 of 75** `.tsx` files under `src/` currently use `"use client"`. There are no `generateStaticParams`-less dynamic segments with runtime data fetching — the two dynamic routes (`/blog/[slug]`, `/portfolio/[category]`) both use `generateStaticParams` to pre-render every known page at build time (effectively SSG). No `getStaticProps`/`getServerSideProps` exist (those are Pages Router APIs and not used here).

**Important — non-standard project convention:** [AGENTS.md](AGENTS.md) (pulled in via [CLAUDE.md](CLAUDE.md)) states this Next.js install may have **breaking API/convention changes vs. training data**, and instructs reading `node_modules/next/dist/docs/` before writing new code against it. Any engineer (human or AI) picking up the dynamic migration should do the same before assuming standard Next 15/14-era App Router behavior.

---

## 2. Folder & File Structure

```
portfolio/
├─ AGENTS.md              # Next.js version-drift warning; imported by CLAUDE.md
├─ CLAUDE.md               # `@AGENTS.md` import only
├─ README.md               # Stock create-next-app README (not project-specific)
├─ next.config.ts          # Next config — currently only sets image `qualities`
├─ tailwind.config.ts      # Tailwind v4 config — content globs + fontSize tokens
├─ postcss.config.mjs      # Tailwind v4 PostCSS plugin wiring
├─ eslint.config.mjs       # ESLint flat config (next/core-web-vitals + TS)
├─ tsconfig.json           # `@/*` → `./src/*` path alias
├─ package.json / package-lock.json
├─ .env                    # Present but EMPTY — no env vars currently used
├─ .vscode/                # Editor settings (Tailwind CSS custom-data hints)
├─ public/                 # All static assets — see §5 Data Sources
│  ├─ home/, portfolio/, service/, about/, Experience/   # Photography assets by section
│  ├─ favicon*.{ico,png,svg}, icon*.png, apple-*icon.png # App icons/PWA icons
│  └─ *.svg                                              # Framework placeholder SVGs (unused Next.js defaults)
└─ src/
   ├─ app/                 # App Router: routes, layout, global CSS
   │  ├─ layout.tsx         # Root layout — fonts, Navbar/Footer/TextMarquee shell, <MotionConfig>
   │  ├─ globals.css        # Tailwind import, CSS custom properties (design tokens), keyframes
   │  ├─ page.tsx            → "/"                     (home)
   │  ├─ about/page.tsx      → "/about"
   │  ├─ services/page.tsx   → "/services"
   │  ├─ experience/page.tsx → "/experience"
   │  ├─ contact/page.tsx    → "/contact"
   │  ├─ blog/page.tsx       → "/blog"
   │  ├─ blog/[slug]/page.tsx           → "/blog/:slug"       (SSG via generateStaticParams)
   │  ├─ portfolio/page.tsx  → "/portfolio"
   │  └─ portfolio/[category]/page.tsx  → "/portfolio/:category" (SSG via generateStaticParams)
   ├─ components/           # All reusable UI, grouped by feature/section — see §4
   │  ├─ ui/                 # Generic, page-agnostic primitives (Button, Section, Reveal, …)
   │  ├─ layout/              # Navbar, Footer, MobileMenu, PageHeader (used site-wide)
   │  ├─ Navbar/              # ⚠️ Orphaned dead-code duplicate — see §9
   │  ├─ home/, about/, services/, experience/, contact/, blog/, portfolio/, signature-work/
   │  │                       # Page-specific section components
   ├─ data/                 # ALL hardcoded content — the migration target, see §5
   │  ├─ nav.ts               # Brand info, nav links, social links, footer links
   │  ├─ hero.ts               # Home hero slider slides
   │  ├─ portfolio.ts          # Portfolio categories + generated portfolio items
   │  ├─ categories.ts         # Per-category video hero content, category lookup helpers
   │  ├─ services.ts           # Services list
   │  ├─ photographer.ts       # Photographer bio, specialties, awards
   │  ├─ timeline.ts           # Studio history/timeline milestones
   │  ├─ blog.ts               # Blog posts (full content inline, no CMS/markdown)
   │  └─ privacyPolicy.ts      # Full privacy-policy copy, structured as sections
   └─ lib/                  # Framework-agnostic helpers
      ├─ utils.ts             # `cn()` — clsx + tailwind-merge class combiner
      ├─ motion.ts            # Shared Framer Motion variants/transition presets
      └─ usePrivacyConsent.ts # Client-side "hook" reading/writing localStorage consent flags
```

### Notes on `public/`

Images are organized by the page/section they're used on rather than by content type: `home/` (incl. `home/autoslider/`, `home/slider/`), `portfolio/` (numbered 1–12, reused across categories), `service/`, `about/`, `Experience/`. There is **no CMS-style media library** — every `<Image src>` in the codebase is a literal string path into one of these folders, cross-referenced from [src/data/*.ts](src/data/). Filenames are not content-descriptive (`1.jpg`, `2.jpeg`, `catagory3.jpg` — note the typo, kept as-is since it's a real filename referenced elsewhere).

`public/videos/` is referenced in code ([src/data/categories.ts](src/data/categories.ts)) but **does not exist on disk** — see §9.

---

## 3. Pages & Routes

All routes are statically generated (SSG) at build time — there is no per-request data fetching anywhere. "Hardcoded content" below means the copy/data is imported from `src/data/*.ts`, not fetched from anything external.

| Route | File | Renders | Static generation |
|---|---|---|---|
| `/` | [src/app/page.tsx](src/app/page.tsx) | Hero slider, intro, offerings headline, portfolio teaser, about-photographer band, explore-weddings grid, inquiry band, Instagram strip | Static (no params) |
| `/about` | [src/app/about/page.tsx](src/app/about/page.tsx) | Page header, about intro, specialties, photographer bio, inquire CTA, Instagram strip | Static |
| `/services` | [src/app/services/page.tsx](src/app/services/page.tsx) | Page header, services grid, inquire CTA, "how it works", Instagram strip | Static |
| `/experience` | [src/app/experience/page.tsx](src/app/experience/page.tsx) | Page header, "our journey" (timeline), editorial experience section, closing CTA, Instagram strip | Static |
| `/contact` | [src/app/contact/page.tsx](src/app/contact/page.tsx) | Page header, contact/inquiry form section, FAQ section, Instagram strip | Static |
| `/blog` | [src/app/blog/page.tsx](src/app/blog/page.tsx) | Page header, blog grid (all posts), "from the heart" slider, Instagram strip | Static |
| `/blog/[slug]` | [src/app/blog/\[slug\]/page.tsx](src/app/blog/%5Bslug%5D/page.tsx) | Single blog post body | **SSG** via `generateStaticParams()` mapping over `blogPosts` in [src/data/blog.ts](src/data/blog.ts); `generateMetadata()` sets title/description per post; calls `notFound()` for unknown slugs |
| `/portfolio` | [src/app/portfolio/page.tsx](src/app/portfolio/page.tsx) | Hero gallery, client-side filterable portfolio browser (wrapped in `<Suspense>` because it reads `useSearchParams`), Instagram strip | Static |
| `/portfolio/[category]` | [src/app/portfolio/\[category\]/page.tsx](src/app/portfolio/%5Bcategory%5D/page.tsx) | Category video hero + photo grid (+ Vimeo showcase reel, Engagements only) | **SSG** via `generateStaticParams()` mapping over `Object.keys(categoryContent)` in [src/data/categories.ts](src/data/categories.ts) (`weddings`, `engagements`, `family-maternity`); `generateMetadata()` per category; `notFound()` for unknown slugs |

**Root layout** ([src/app/layout.tsx](src/app/layout.tsx)) wraps every route with: `<Navbar>`, `<main>{children}</main>`, `<TextMarquee>`, `<Footer>`, all inside `<MotionConfig reducedMotion="user">`. Site-wide `<title>`/`<description>` metadata pulls from `brand` in [src/data/nav.ts](src/data/nav.ts).

No route currently reads cookies, headers, search params on the server, or performs any `fetch`/`axios`/database call — confirmed via full-repo search (zero matches for `fetch(`, `axios`, or `process.env` outside the empty `.env` file).

---

## 4. Components

Components are organized under `src/components/<domain>/`. Grouped below by domain, with props (from actual `type X Props` declarations) where the component takes any, and primary usage. Domain-specific section components not listed with props take none (they render their own hardcoded/data-imported content directly).

### `ui/` — generic primitives (used across many pages)

| Component | Props | Used in |
|---|---|---|
| [Button.tsx](src/components/ui/Button.tsx) — `Button`, `LinkButton` | `variant?: "primary" \| "secondary" \| "ghost" \| "light"`, `className?`, plus native button/anchor attrs | Various CTAs site-wide |
| [Container.tsx](src/components/ui/Container.tsx) | `as?: ElementType`, `className?`, `children` | Layout wrapper, site-wide |
| [Section.tsx](src/components/ui/Section.tsx) | `as?: ElementType`, `id?`, `className?`, `children` | Standard vertical section rhythm, most pages |
| [SectionHeading.tsx](src/components/ui/SectionHeading.tsx) | `eyebrow?`, `title`, `subtitle?`, `align?: "left"\|"center"`, `size?: "default"\|"hero"`, `className?` | Section headers throughout |
| [Heading.tsx](src/components/ui/Heading.tsx) | see file | Generic heading primitive |
| [Reveal.tsx](src/components/ui/Reveal.tsx) | `children`, `variants?`, `delay?`, `className?` | Scroll-in animation wrapper, used pervasively |
| [PlaceholderMedia.tsx](src/components/ui/PlaceholderMedia.tsx) | `tone`, `className?` | Gradient placeholder shown when a data entry has no real image (e.g. `HeroSlide` with no `src`) |
| [Logo.tsx](src/components/ui/Logo.tsx) (incl. `MonogramBadge`) | `LogoProps` (see file) | Navbar, Footer, PrivacyPolicyModal |
| [NavLink.tsx](src/components/ui/NavLink.tsx) | extends `LinkProps` | Navbar |
| [SocialIcons.tsx](src/components/ui/SocialIcons.tsx) | `IconProps` | Footer social row |
| [PrivacyPolicyModal.tsx](src/components/ui/PrivacyPolicyModal.tsx) | `isOpen`, `onClose`, `onAccept?` | Cookie/privacy-consent modal, reads/writes `localStorage` via [usePrivacyConsent](src/lib/usePrivacyConsent.ts); content from [src/data/privacyPolicy.ts](src/data/privacyPolicy.ts) |

### `layout/` — chrome shared by every page

| Component | Props | Notes |
|---|---|---|
| [Navbar.tsx](src/components/layout/Navbar.tsx) | none | The **real, wired-up** navbar — imported by [src/app/layout.tsx](src/app/layout.tsx). Reads nav data from [src/data/nav.ts](src/data/nav.ts) |
| [MobileMenu.tsx](src/components/layout/MobileMenu.tsx) | `open`, `onClose`, `pathname` | Mobile nav overlay, used by Navbar |
| [Footer.tsx](src/components/layout/Footer.tsx) | none | Site footer; links from `src/data/nav.ts`, also renders `PrivacyPolicyModal` trigger |
| [PageHeader.tsx](src/components/layout/PageHeader.tsx) | `eyebrow`, `title`, `description?`, `tone?: Tone`, `image?`, `imageAlt?` | Hero banner atop every non-home route |

### `home/` — home-page sections

`HeroSlider` (reads `heroSlides` from [src/data/hero.ts](src/data/hero.ts)), `IntroSection`, `OfferingsHeadline`, `PortfolioSection`, `AboutPhotographerSection`, `ExploreWeddingsGrid`, `ExploreSection`, `InstagramFollow` (`className?` prop), `PhotoMarquee` (props for image list/speed), `TextMarquee`, `CtaBanner`, `Testimonials` (`bgImage?` prop), `SliderControls` (`onPrev`, `onNext`).

### `about/`

`AboutIntro`, `Specialties` (reads `specialties` from [src/data/photographer.ts](src/data/photographer.ts)), `PhotographerBio` (reads `photographer`), `Awards` (reads `awards`), `Timeline` / `TimelineItem` (`milestone`, `index` — reads `timeline` from [src/data/timeline.ts](src/data/timeline.ts)), `InquireCta` (configurable eyebrow/heading/subtitle/CTA/image props, reused on Services page too).

### `services/`

`ServicesGrid` (`limit?` prop — reads `services` from [src/data/services.ts](src/data/services.ts)), `ServiceCard` (`service`, `delay?`), `ServicesStickyShowcase`.

### `experience/`

`OurJourney`, `EditorialExperience`, `ExperienceClosing`, `HowItWorksSection` (`className?`).

### `contact/`

`ContactSection` — **the inquiry form** (see §9 for its non-functional submit), `InquireEditorial` (`inquiryHref` prop, used on home page), `InquireFaqSection`.

### `blog/`

`BlogGrid` (`limit?` — reads `blogPosts` from [src/data/blog.ts](src/data/blog.ts)), `BlogCard` (`post`, `delay?`), `BlogPostView` (`post: BlogPost`), `BlogPostBody` (`paragraphs: string[]`), `FromTheHeartSlider`.

### `portfolio/`

`HeroGallery` (`leftImage`, `rightImage`, alts), `PortfolioBrowser` — client component driving category filtering via `useSearchParams`, reads `portfolioItems`/`portfolioCategories` from [src/data/portfolio.ts](src/data/portfolio.ts); `PortfolioHeader` (`activeCategory`, `onCategoryChange`), `PortfolioGrid` (`items`, `layout: "flex"|"columns"`), `PortfolioCard` (`item`, `delay?`), `PhotoGrid` (`photos`), `VideoHero` (`src`, `poster`, `credit`, `names`, `location` — reads per-category video config from [src/data/categories.ts](src/data/categories.ts)), `EngagementCinematicSection`, `EngagementVideoShowcase`.

### `signature-work/`

`Portfolio`, `CinematicPhotoGrid`, `CinematicVideo` (`videoSrc`, `poster`), `EngagementIntroVideo` (`videoSrc`, `poster`), `FamilyMaternityGrid` — supplementary portfolio-category presentational components, used from `PortfolioBrowser`.

---

## 5. Data Sources — critical for migration

**Everything is hardcoded in TypeScript.** There is no `.mdx`, no markdown, no JSON content files, no local database, no CMS, and no remote API. This section is the map of what moves where in a CMS/DB migration.

| File | Content | Shape | Migration target |
|---|---|---|---|
| [src/data/nav.ts](src/data/nav.ts) | Site brand (name, tagline, email, phone, location), primary/utility/mobile nav links, social links, footer link columns | Arrays/objects of typed literals | CMS "Site Settings" / global config singleton |
| [src/data/hero.ts](src/data/hero.ts) | 4 home-page hero slides (image, alt, tone, crop position) | `HeroSlide[]` | CMS "Hero Slides" collection |
| [src/data/portfolio.ts](src/data/portfolio.ts) | Portfolio categories (`Weddings`, `Engagements`, `Family & Maternity`) + **procedurally generated** portfolio items (titles cycle through a hardcoded array, images cycle through 12 files in `/public/portfolio/`) | `PortfolioItem[]`, generated via `.flatMap()`, not authored 1:1 | CMS "Portfolio Items" collection — **the generation logic itself must be replaced** with real per-item authored records (see §9) |
| [src/data/categories.ts](src/data/categories.ts) | Per-category video hero content (src, poster, credit, names, location) + `getCategoryContent`/`getCategoryPhotos` helpers | `Record<CategorySlug, CategoryContent>` | CMS "Portfolio Category" collection; video files referenced don't exist yet (`/videos/*.mp4`) |
| [src/data/services.ts](src/data/services.ts) | 6 services (icon, title, description, image) | `Service[]` | CMS "Services" collection |
| [src/data/photographer.ts](src/data/photographer.ts) | Photographer bio, quote, portrait tone; specialties list; awards list — **explicitly placeholder** ("Ava Bennett" — see file comment "swap for her real bio... when ready") | `photographer`, `Specialty[]`, `Award[]` | CMS "About/Photographer" singleton + "Awards" collection |
| [src/data/timeline.ts](src/data/timeline.ts) | 6 studio-history milestones (year, title, description, image, tone) | `TimelineMilestone[]` | CMS "Timeline" collection |
| [src/data/blog.ts](src/data/blog.ts) | 6 full blog posts — title, excerpt, category, date, readTime, image, **full body content as a `string[]` of paragraphs** (no markdown/rich-text) | `BlogPost[]` | CMS "Blog Posts" collection with rich-text/markdown body field; current plain-paragraph-array format is the simplest possible shape to migrate away from |
| [src/data/privacyPolicy.ts](src/data/privacyPolicy.ts) | Full privacy policy copy, structured into sections with bullet points and a version/lastUpdated/effectiveDate | `PrivacyPolicyData` | CMS "Legal Pages" singleton, or keep as versioned static legal copy (lower priority to move) |
| `public/**` (images/icons) | All photography, all page imagery | Static files | Object storage / DAM / CMS asset library (S3, Cloudinary, CMS-native media library) |

**Client-side "state" (not server data):** [src/lib/usePrivacyConsent.ts](src/lib/usePrivacyConsent.ts) reads/writes `localStorage` keys `meridian_privacy_accepted` / `meridian_privacy_accepted_at` directly in the browser — no server persistence of consent at all today. A real compliance posture (audit trail, cross-device consent) needs this moved server-side.

**Form data:** the contact/inquiry form ([ContactSection.tsx](src/components/contact/ContactSection.tsx)) collects first/last name, email, phone, interest (radio), session date, and budget — but only calls `event.preventDefault()` and flips local `submitted` state. **Nothing is sent anywhere.** This is the highest-priority item for the dynamic migration (see §9/§10).

---

## 6. Styling

- **Tailwind v4**, configured CSS-first. [tailwind.config.ts](tailwind.config.ts) only supplies `content` globs and one `theme.extend.fontSize` block (`heading`, `body` — clamp-based fluid type). The bulk of design tokens live in [src/app/globals.css](src/app/globals.css) via `@theme inline`, not the JS config (Tailwind v4 convention).
- **Design tokens** (CSS custom properties in `:root`, re-exposed to Tailwind via `@theme inline`):
  - Colors: `--color-bg` (#f6f4ec), `--color-surface` (#fff), `--color-ink` (#141412), `--color-body` (#3f4238), `--color-muted` (#6b6a63), `--color-line` (#e7e4dd), `--color-accent` (#a9895d), `--color-accent-ink` (#7c6440), `--color-dusty` (#7a8791), `--color-burgundy` (#4A1F2B).
  - Fonts: `--font-sans` → Geist (via `next/font/google`), `--font-serif` → Playfair Display (weights 500/600/700, via `next/font/google`). Two additional **self-hosted-via-URL** display fonts are declared with raw `@font-face` rules pointing at `static.showit.co` (a third-party CDN, likely inherited from a Showit-based previous site build): `Copperplate CC Heavy` (`.font-copperplate`) and `Times Now Light`/`Times Now Light Italic` (`.font-times-now`, `.font-times-now-italic`). These are **external network dependencies for fonts**, not self-hosted or `next/font`-managed — worth migrating to self-hosted files or `next/font/local` for reliability/perf/licensing clarity.
  - Font sizes: `--font-size-heading` (clamp), `--font-size-body`.
- **No dark mode** is implemented — `globals.css` defines only a light palette; no `prefers-color-scheme` or `data-theme` handling exists in this codebase.
- **Global CSS** ([src/app/globals.css](src/app/globals.css)) also defines: the `.site-container` utility class, marquee/scroll keyframes (`marquee-scroll`, `marquee-vertical`, `marquee-vertical-reverse`) with several speed-variant classes, transition-duration utility classes (`.transition-luxury`, `.transition-card`, `.transition-button`), a text-stroke effect for `OfferingsHeadline` (`.offerings-outline-text`, with an `@supports` fallback), scroll-timeline-driven slide-in animations for `ExploreWeddingsGrid` (`animation-timeline: view()`, gated behind `@supports`), and a full `prefers-reduced-motion: reduce` override block.
- **Animation:** Framer Motion (`framer-motion`) drives most reveal/hover/tap interactions via shared variant presets in [src/lib/motion.ts](src/lib/motion.ts) (`fadeUp`, `fadeIn`, `scaleIn`, `slideInLeft/Right`, `rowSlideInLeft/Right`, `staggerContainer`, `withDelay`, `staggerDelay`). App-wide `<MotionConfig reducedMotion="user">` in the root layout disables transform-based motion for users who prefer reduced motion, complementing the CSS-level reduced-motion block.
- **Class merging:** `cn()` in [src/lib/utils.ts](src/lib/utils.ts) (clsx + tailwind-merge) is the standard way `className` overrides are composed throughout components.

---

## 7. Dependencies

### Runtime (`dependencies`)

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.3.1 | Framework (App Router, Image/Font optimization, routing, build) |
| `react` / `react-dom` | 19.2.8 | UI runtime |
| `framer-motion` | ^13.1.0 | Scroll reveals, hover/tap micro-interactions, page-element transitions |
| `lucide-react` | ^1.33.0 | Icon set (used in Navbar, PrivacyPolicyModal, service icons, etc.) |
| `clsx` | ^2.1.1 | Conditional className composition |
| `tailwind-merge` | ^3.6.0 | Resolves conflicting Tailwind classes when merging (paired with `clsx` in `cn()`) |

### Dev (`devDependencies`)

| Package | Version | Purpose |
|---|---|---|
| `typescript` | ^5 | Type checking |
| `@types/node`, `@types/react`, `@types/react-dom` | ^20 / ^19 / ^19 | Type definitions |
| `tailwindcss` | ^4 | Utility-first CSS engine |
| `@tailwindcss/postcss` | ^4 | Tailwind v4's PostCSS integration |
| `eslint` | ^9 | Linting |
| `eslint-config-next` | 16.3.1 | Next.js's recommended ESLint rules (flat config, see [eslint.config.mjs](eslint.config.mjs)) |

No testing framework (Jest/Vitest/Playwright/Cypress) is installed. No state-management library (Redux/Zustand/Jotai). No form library (React Hook Form/Formik/Zod). No data-fetching library (SWR/React Query). No CMS SDK. No auth library. All of these will need to be selected and added during the dynamic migration.

---

## 8. Build & Deployment

- **Scripts** ([package.json](package.json)): `dev` → `next dev`, `build` → `next build`, `start` → `next start`, `lint` → `eslint`.
- **No `output: "export"`** is set in [next.config.ts](next.config.ts), so this is a standard Next.js server build (not a fully static HTML export) — though because every page is currently either static or `generateStaticParams`-based SSG, the build output today is effectively all-static regardless.
- **No `vercel.json` or `netlify.toml`** exists in the repo — deployment config, if any, lives outside the repo (in a hosting provider's dashboard). The `next.config.ts` comment about "Next.js 16 requires an explicit allowlist" for image `qualities` (`[75, 90]`) is the one build-relevant non-default setting.
- **Environment variables:** [.env](.env) exists in the repo but is **completely empty**, and `.gitignore` excludes `.env*` from version control anyway. No code reads `process.env` anywhere in `src/`. **There are currently zero environment variables in use** — this will change immediately once a database/CMS/API/auth provider is introduced (connection strings, API keys, auth secrets, etc. will all need `.env.local` entries plus deployment-platform env config).
- **Git remote:** `https://github.com/isha-undhad/medridian.git` — repo name (`medridian`) doesn't match the in-app brand name (`Meridian Studio`), worth reconciling if this becomes a public-facing detail (e.g. package name is `portfolio` per `package.json`, is generic and not brand-specific either).
- No CI config (no `.github/workflows/`) was found in the file listing.

---

## 9. Known Limitations / Technical Debt

1. **Contact form doesn't submit anywhere.** [ContactSection.tsx](src/components/contact/ContactSection.tsx)'s `handleSubmit` only calls `preventDefault()`, resets the form, and flips a local `submitted` boolean. No network request, no email, no storage. This is the single most important gap the dynamic migration needs to close.
2. **Orphaned dead-code component:** [src/components/Navbar/Navbar.tsx](src/components/Navbar/Navbar.tsx) is a 14-line placeholder navbar (`console.log("Menu clicked")`, no real links) that is **never imported anywhere** in the codebase — the real navbar is [src/components/layout/Navbar.tsx](src/components/layout/Navbar.tsx). Safe to delete; flagged here rather than removed unilaterally since it's out of scope for a documentation pass.
3. **Referenced video assets don't exist.** [src/data/categories.ts](src/data/categories.ts) points each portfolio category at `/videos/weddings.mp4`, `/videos/engagements.mp4`, `/videos/family-maternity.mp4` — there is **no `public/videos/` directory** in the repo. `VideoHero` will fail to load a source today.
4. **Portfolio items are procedurally generated, not individually authored.** [src/data/portfolio.ts](src/data/portfolio.ts) cycles a fixed pool of 12 image files and a fixed pool of ~30 titles across 3 categories via `.flatMap()`, so e.g. "Amalfi, Reimagined" and "The Harlow Wedding" repeat as titles across otherwise-unrelated images/categories, and the same physical image file (`/portfolio/1.jpeg` etc.) is reused across categories. This is placeholder/demo data — a real migration needs one authored record per real photo, not a generator.
5. **Placeholder brand & bio content throughout.** The studio name ("Meridian Studio"), photographer name ("Ava Bennett"), bio, awards, testimonials, and blog posts are explicitly called out in code comments as placeholder (e.g. `photographer.ts`: *"Placeholder profile... swap for her real bio, portrait, and accolades when ready"*; `awards.ts` content: *"Placeholder recognition — replace with real accolades before launch"*). None of this is launch-ready copy.
6. **Fonts loaded from a third-party CDN via raw `@font-face`.** `Copperplate CC Heavy` and `Times Now Light`/`Light Italic` in [globals.css](src/app/globals.css) are fetched from `static.showit.co` (an external, third-party host — likely left over from a prior Showit-platform build this was ported from), unlike Geist/Playfair which use `next/font/google`. This is an uncontrolled external dependency (could disappear, rate-limit, or violate licensing for this project) and bypasses Next's font optimization.
7. **No accessible focus/skip-link or landmark audit was performed** as part of this documentation pass — not verified either way, flagged as an open question for whoever does the migration/redesign.
8. **No tests exist** — no unit, integration, or e2e test tooling is installed. Any dynamic migration (forms, API calls, auth flows) will be going in without a safety net unless test tooling is added first.
9. **Repo/package naming mismatch:** git remote is `medridian` (typo of "Meridian"?), `package.json` name is generic `"portfolio"` — neither reflects the in-app brand. Low priority, but worth a decision before this becomes a real production deployment.
10. **Footer "Education", "Press", "Testimonials" links point to `#`** ([src/data/nav.ts](src/data/nav.ts) `footerExploreColumnB`) — dead placeholder links, not yet pointing at real pages/sections.

---

## 10. Future Migration Notes

Concrete, per-area flags for what needs to change to go from "hardcoded static site" to "dynamic site backed by DB/API/CMS/auth." Ordered roughly by priority.

### High priority — user-facing functionality that's currently broken/fake

- **Contact form → real backend.** [ContactSection.tsx](src/components/contact/ContactSection.tsx) needs a real submit target: a Next.js Route Handler (`src/app/api/inquiries/route.ts`) or a third-party form service (e.g. an email API, a CRM webhook), persisting submissions to a database table (`inquiries`: name, email, phone, interest, session date, budget, submitted_at) and probably triggering a notification email to the studio owner. Client-side validation (currently native HTML `required`/`pattern`) should be paired with server-side validation.
- **Portfolio category video sources** ([src/data/categories.ts](src/data/categories.ts)) need real files or a CDN URL before `VideoHero` will actually play anything — decide whether these become CMS-managed media fields or stay as static asset paths.
- **Privacy consent** ([usePrivacyConsent.ts](src/lib/usePrivacyConsent.ts)) currently lives only in `localStorage` — if consent needs to be auditable (GDPR/CCPA-style recordkeeping, matching the promises made in [privacyPolicy.ts](src/data/privacyPolicy.ts) §7 "Your Rights"), it needs a server-side consent-log table keyed to a user/session identifier.

### Content migration — move `src/data/*.ts` into a CMS or database

For each file, the "shape" documented in §5 is close to a ready-made schema:

| Data file | Suggested collection/table | Notes |
|---|---|---|
| `hero.ts` | `hero_slides` | Small, ordered list — fine as a CMS collection or even an admin-editable array in a settings table |
| `portfolio.ts` + `categories.ts` | `portfolio_categories`, `portfolio_items` | **Do not port the `.flatMap()` generator** — replace with real 1-row-per-photo records; `portfolio_items.category_id` FKs to `portfolio_categories`; category video fields move onto `portfolio_categories` |
| `services.ts` | `services` | Straightforward 1:1 |
| `photographer.ts` | `studio_profile` (singleton) + `awards` table | Bio/quote/portrait as a singleton; awards as a list keyed by year |
| `timeline.ts` | `timeline_milestones` | Straightforward 1:1, ordered by year |
| `blog.ts` | `blog_posts` | **Body content needs a real rich-text/markdown field** — the current `content: string[]` (one paragraph per array entry) is the simplest possible interim format; a CMS migration should upgrade this to MDX/rich-text to support headings, images, and formatting mid-post, which today's posts don't need but real ones likely will |
| `privacyPolicy.ts` | `legal_pages` (singleton, versioned) or keep static | Already has `version`/`lastUpdated`/`effectiveDate` fields — the shape already anticipates versioning, which pairs naturally with a CMS "revisions" model |
| `nav.ts` | `site_settings` (singleton) | Brand name/tagline/contact info/nav links/social links/footer links — a natural single "global settings" document in most headless CMSs |
| `public/**` images | Object storage / CMS media library | Every `<Image src="/home/...">` literal string will need to become a CMS-returned URL (or a stable proxy path) — expect to touch every component listed in §4 that currently imports from `src/data/*.ts` and renders an image |

### Structural/rendering changes once data becomes dynamic

- Pages currently exporting no fetch logic (all of §3) will need to become `async` Server Components calling a CMS SDK / DB query / internal API, replacing their `import { X } from "@/data/Y"` with an awaited fetch. This is a mechanical but repo-wide change — every page in [src/app/](src/app/) and every data-consuming component in §4 is affected.
- `/blog/[slug]` and `/portfolio/[category]` currently use `generateStaticParams()` against the static `blogPosts`/`categoryContent` arrays ([src/app/blog/\[slug\]/page.tsx](src/app/blog/%5Bslug%5D/page.tsx), [src/app/portfolio/\[category\]/page.tsx](src/app/portfolio/%5Bcategory%5D/page.tsx)) — once posts/categories come from a CMS, decide between: (a) keep SSG but generate params from a build-time CMS fetch (works well if content changes infrequently), or (b) drop to ISR (`revalidate`) or fully dynamic rendering if editors need instant/no-rebuild publishing.
- **Authentication** doesn't exist at all today (no login, no protected routes, no session handling). If the eventual CMS needs an admin UI inside this app (vs. a separate hosted CMS dashboard), an auth solution (NextAuth/Auth.js, Clerk, custom) and protected route group (e.g. `src/app/(admin)/`) will need to be added from scratch.
- **Environment variables** go from zero to several the moment any of the above lands (DB connection string, CMS API token, auth secrets, email-service API key) — set these up in `.env.local` (gitignored, already correctly excluded) and mirror them in whatever hosting platform is chosen (see §8 — no `vercel.json`/`netlify.toml` currently commits deployment config, so this will likely be configured directly in a hosting dashboard).
