# Codeique — Full Project Audit

> Audited: 2026-03-29 | 55+ files reviewed | Next.js 16.1.6 + React 19 + Tailwind v4

---

## 1. Project Overview

| Detail | Value |
|--------|-------|
| **Framework** | Next.js 16.1.6 (App Router) |
| **React** | 19.2.3 |
| **CSS** | Tailwind CSS v4 (PostCSS plugin) |
| **Animation** | Framer Motion 12.37, GSAP 3.14, Lenis 1.3 |
| **TypeScript** | Strict mode, bundler module resolution |
| **Deployment** | Vercel-ready (images from picsum.photos allowed) |
| **Domain** | codeique.studio |

---

## 2. Architecture

### Rendering Hierarchy
```
<html> (server — layout.tsx)
  <body>
    |-- Theme init script (dangerouslySetInnerHTML)
    |-- Noise overlay (z-50, pointer-events: none)
    |-- <Providers> (client)
    |     |-- <ThemeProvider>
    |     |-- <SmoothScrollProvider> (Lenis + GSAP ScrollTrigger)
    |     |-- <Preloader />          z-9997, fixed overlay
    |     |-- <CustomCursor />       z-9999/9998
    |     |-- <TransitionCurtain />  z-9989
    |     |-- {children}
    |           |-- <template.tsx>   page-enter animation (opacity + blur)
    |                 |-- <page.tsx>  actual page content
```

### Z-Index Stack
| Z-Index | Component |
|---------|-----------|
| 9999 | CustomCursor dot |
| 9998 | CustomCursor ring |
| 9997 | Preloader |
| 9989 | TransitionCurtain |
| 999 | Loading page |
| 90 | Hero fixed title |
| 50 | Noise overlay + Navbar |

### Route Map
| Route | Type | Metadata |
|-------|------|----------|
| `/` | Dynamic (server, headers) | Root metadata in layout.tsx |
| `/about` | Client component | Layout with metadata |
| `/works` | Client component | Layout with metadata |
| `/works/[slug]` | Client (`use(params)`) | Layout with metadata |
| `/blog` | Server component | Inline metadata |
| `/blog/[slug]` | Server component | generateStaticParams + generateMetadata |
| `/contact` | Client component | Layout with metadata |
| `/privacy` | Server component | Inline metadata |
| `/terms` | Server component | Inline metadata |
| `/not-found` | Server component | Global 404 |

---

## 3. Design System

### Color Palette

#### Dark Theme (default)
| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#0a0a0a` | Page background |
| `--color-surface` | `#0f0f0f` | Elevated surfaces |
| `--color-card` | `#181818` | Card backgrounds |
| `--color-border` | `#333333` | Borders |
| `--color-foreground` | `#cacaca` | Primary text |
| `--color-muted` | `#8f8f8f` | Secondary text |
| `--color-accent` | `#ff4925` | Brand accent (orange-red) |
| `--color-accent-strong` | `#ff5f3d` | Hover/emphasis accent |

#### Light Theme
| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#f6f0e7` | Warm cream background |
| `--color-surface` | `#fffaf4` | Card surfaces |
| `--color-card` | `#f3ede4` | Card backgrounds |
| `--color-border` | `#d6cbbb` | Borders |
| `--color-foreground` | `#111111` | Primary text |
| `--color-muted` | `#5f584e` | Secondary text |

#### Other Notable Colors
| Usage | Value |
|-------|-------|
| Preloader background | `#FF6B35` (inline) |
| Preloader exit curtain | `var(--color-accent)` = `#ff4925` |
| Footer brand panel | `#ff542d` to `#ff4623` gradient |
| Status indicator | `#42d567` (green dot) |
| Selection highlight | `rgba(255, 73, 37, 0.28)` |

### Typography

| Font | Variable | Usage |
|------|----------|-------|
| **Geist** (Google) | `--font-sans` | Body text, UI |
| **Anton** (Google) | `--font-display` | Headlines, brand name |
| **Space Mono** (Google) | `--font-mono` | Labels, kickers, code |

#### Type Scale Classes
| Class | Size | Usage |
|-------|------|-------|
| `.display` | Anton, uppercase, 0.92 line-height | Brand name, section headers |
| `.type-page-title` | clamp(2.95rem, 7vw, 5.75rem) | Page titles |
| `.type-display-title` | clamp(3rem, 7vw, 6.6rem) | Large display headings |
| `.type-section-title` | clamp(2.2rem, 4.6vw, 4.15rem) | Section headings |
| `.type-card-title` | clamp(1.35rem, 2vw, 2.35rem) | Card headings |
| `.type-body` | 1rem, 1.9 line-height | Body text |
| `.type-body-lg` | clamp(1rem, 1.2vw, 1.15rem) | Large body text |
| `.type-kicker` | 0.88rem, uppercase, 0.22em tracking | Section labels |

### Spacing & Layout
| Token | Value |
|-------|-------|
| `--container` | 1280px |
| `--radius-xl` | 1.75rem |
| `--radius-lg` | 1.25rem |
| `--radius-md` | 0.875rem |
| `.container-shell` | width: calc(100% - 40px), margin-inline: auto |

### Animation System

**Three animation libraries working together:**
1. **Framer Motion** — Component animations, scroll-linked transforms, AnimatePresence
2. **GSAP + ScrollTrigger** — Synced with Lenis for scroll-triggered effects
3. **CSS Animations** — Marquee, shimmer, breathing, floating

**Shared ease curve:** `[0.22, 1, 0.36, 1]` (used consistently across all animations)

**Animation presets (lib/animations.ts):**
- `fadeUp`, `fadeLeft`, `fadeRight` — Directional reveals
- `scaleFade` — Cards, modals
- `stagger`, `staggerFast` — Container children
- `expandHeight` — Accordions
- `pageTransition` — Route changes

### Interactive Patterns
| Pattern | Description |
|---------|-------------|
| `.interactive-card` | translateY(-4px) + shadow on hover |
| `.interactive-media` | scale(1.05) on image/video hover |
| `.interactive-link` | Underline scaleX reveal on hover |
| `.nav-highlight` | Gradient slide-in on nav links |
| `.magnetic-glow` | Radial gradient follows cursor position |
| `ScrambleText` | Text scrambles to random chars then resolves |
| `MagneticButton` | Button follows cursor with spring physics |
| `CustomCursor` | Two-layer cursor: dot (instant) + ring (springy lag) |

---

## 4. Component Inventory

### Layout Components
| Component | File | Type |
|-----------|------|------|
| Navbar | `components/layout/Navbar.tsx` | Client |
| Footer | `components/layout/Footer.tsx` | Client |
| ParallaxFooter | `components/layout/ParallaxFooter.tsx` | Client |

### Provider Components
| Component | File | Purpose |
|-----------|------|---------|
| Providers | `providers/Providers.tsx` | Wraps all providers |
| ThemeProvider | `providers/ThemeProvider.tsx` | Dark/light toggle |
| SmoothScrollProvider | `providers/SmoothScrollProvider.tsx` | Lenis + GSAP |

### UI Components (14)
| Component | File | Purpose |
|-----------|------|---------|
| Accordion | `ui/Accordion.tsx` | FAQ expand/collapse |
| AnimatedCounter | `ui/AnimatedCounter.tsx` | Number count-up on scroll |
| AnimatedText | `ui/AnimatedText.tsx` | Word/char stagger reveal |
| Button | `ui/Button.tsx` | Link or action button |
| CustomCursor | `ui/CustomCursor.tsx` | Two-layer cursor replacement |
| MagneticButton | `ui/MagneticButton.tsx` | Magnetic hover effect |
| Marquee | `ui/Marquee.tsx` | Infinite horizontal scroll |
| ParallaxImage | `ui/ParallaxImage.tsx` | Scroll-linked image offset |
| Preloader | `ui/Preloader.tsx` | First-visit loading screen |
| RevealOnScroll | `ui/RevealOnScroll.tsx` | Scroll-reveal wrapper |
| ScrambleText | `ui/ScrambleText.tsx` | Text scramble effect |
| SectionLabel | `ui/SectionLabel.tsx` | Kicker/label text |
| StatusPage | `ui/StatusPage.tsx` | 404 and status pages |
| ThemeToggle | `ui/ThemeToggle.tsx` | Dark/light switch |
| TransitionCurtain | `ui/TransitionCurtain.tsx` | Route transition overlay |

### Section Components (11)
| Component | File | Purpose |
|-----------|------|---------|
| Hero | `sections/Hero.tsx` | Landing hero with parallax brand |
| About | `sections/About.tsx` | Studio intro + stats |
| Work | `sections/Work.tsx` | Featured case studies |
| Stats | `sections/Stats.tsx` | Animated counters |
| Services | `sections/Services.tsx` | Accordion service list |
| Process | `sections/Process.tsx` | 4-step workflow |
| Testimonials | `sections/Testimonials.tsx` | Scroll-linked reviews |
| Pricing | `sections/Pricing.tsx` | 3-tier pricing with currency |
| FAQ | `sections/FAQ.tsx` | Accordion questions |
| BlogPreview | `sections/BlogPreview.tsx` | Latest 3 blog cards |
| CTA | `sections/CTA.tsx` | Full-bleed contact banner |

### Work Components
| Component | File | Purpose |
|-----------|------|---------|
| ProjectShowcaseCard | `work/ProjectShowcaseCard.tsx` | Project card with parallax |

---

## 5. SEO Audit

### Metadata
- **Root metadata:** Title template `%s | Codeique`, metadataBase set to `https://codeique.studio`
- **OpenGraph:** Title, description, site name, locale configured
- **Twitter:** Card type `summary_large_image` configured
- **Per-page metadata:** About, Works, Contact, Blog, Privacy, Terms all have custom titles and descriptions
- **Blog posts:** Dynamic `generateMetadata` with OG `article` type and `publishedTime`
- **Schema.org:** Organization JSON-LD in root layout

### Sitemap & Robots
- `robots.ts` — Allows all, disallows `/api/`, points to sitemap
- `sitemap.ts` — Dynamic: includes static routes + all projects + all blog posts with priority levels

### Missing SEO Items
- No `favicon.ico` or `apple-touch-icon` configured
- No Open Graph images (`og:image`) for any page
- Blog posts have no `author` metadata
- No canonical URL tags set explicitly
- Schema.org `sameAs` links are generic (no actual profile URLs)
- No structured data for blog articles (Article schema)
- `lastModified` in sitemap always uses `new Date()` instead of actual dates

---

## 6. Accessibility Audit

### Good Practices
- `prefers-reduced-motion` respected in AnimatedText, RevealOnScroll, ScrambleText, ProjectShowcaseCard
- `aria-label` on ScrambleText (screen readers get real text)
- `aria-expanded` on FAQ accordion and services
- `aria-hidden` on decorative elements (cursor, corner marks, decorative numbers)
- `aria-busy` on loading button state
- `sr-only` label on footer email input
- `focus-visible` ring styles on buttons and interactive elements
- Body scroll lock when mobile nav is open

### Issues
- **Testimonials `<img>` instead of `<Image>`:** Uses raw `<img>` tags for avatars — no Next.js optimization, no lazy loading
- **No skip-to-content link:** Missing skip navigation for keyboard users
- **ScrambleText `aria-label`:** Only the base text is exposed; during scramble the visual output is meaningless to screen readers (already handled via `aria-hidden` on display spans)
- **Service items use `role="button"` on `<motion.div>`:** Should be `<button>` elements or use proper ARIA
- **Color contrast:** White text at 20-30% opacity (e.g., `text-white/20`, `text-white/25`) on dark backgrounds likely fails WCAG AA 4.5:1 contrast ratio
- **Footer form:** Newsletter form has no submit feedback or error handling
- **Contact form:** No client-side validation messages shown (relies only on `required` attribute)
- **Footer Privacy/Terms links:** `hover:text-white` in light theme should be `hover:text-black`

---

## 7. Performance Audit

### Good Practices
- Dynamic imports for below-fold sections (Work, Stats, Services, Process, Testimonials, Pricing, FAQ, BlogPreview, CTA)
- `next/image` with `sizes` props for responsive images
- `priority` on above-fold images (blog featured, project hero)
- `will-change: transform` used intentionally (GPU class)
- GSAP `lagSmoothing(0)` prevents tab-switch stutter
- Lenis uses GSAP ticker instead of separate rAF loop (single frame)
- CSS `prefers-reduced-motion` disables animations globally

### Issues
- **Three animation libraries:** Framer Motion + GSAP + Lenis = significant JS bundle for animations
- **Large PNG images in public/:** Several 1-2MB PNG files (cyberHr, develozy, lastsongonly) — should be optimized to WebP/AVIF
- **Testimonial avatars:** Using `<img>` instead of `<Image>` — no optimization
- **No `loading="lazy"` on gallery images:** Some project images lack lazy loading strategy
- **SmoothScrollProvider context value:** `lenisRef.current` is passed in Provider value but won't trigger re-renders when Lenis initializes (ref value, not state)
- **Footer time interval:** Both Navbar and Footer create separate `setInterval(update, 1000)` for IST clock — could share one
- **Noise overlay:** SVG noise texture rendered on every page — `mix-blend-mode: soft-light` triggers compositing layer

---

## 8. UI/UX Audit

### Design Quality
- **Consistent design language:** Editorial, typographic, premium feel throughout
- **Strong visual hierarchy:** Kicker labels, large display fonts, clear content sections
- **Thoughtful hover states:** Cards lift, links reveal underlines, images scale
- **Dark/light theme:** Full theme system with proper color variable switching
- **Responsive design:** Proper mobile breakpoints, `clamp()` for fluid typography

### Issues
- **Hero brand name color in light theme:** `text-white` hardcoded — should adapt to light theme
- **Contact page background:** Uses `dark:bg-white/10` (Tailwind dark mode) but project uses `data-theme` attribute — `dark:` won't work
- **Footer email in light mode:** `hover:text-white` on Privacy/Terms links should be theme-aware
- **Pricing toggle not theme-aware:** `bg-white/16` and `text-white/60` hardcoded regardless of theme
- **StatusPage:** Background hardcoded to `bg-black` — breaks in light theme
- **Loading page:** `bg-[var(--color-background)]` but text color transitions are hardcoded to dark theme values
- **Preloader:** Uses inline styles with hardcoded colors — doesn't respond to theme
- **Works page description text:** Still reads like developer notes ("This page now leans into a more immersive archive feeling...") — should be user-facing copy
- **Work section description:** Same issue ("The work section now reads more like a curated reel...")
- **Footer availability date:** Hardcoded "Early Mar 2026" — will become stale

---

## 9. Code Quality Audit

### Good Practices
- Consistent file structure and naming conventions
- TypeScript strict mode enabled
- Clean separation of concerns (data, animations, components)
- Proper use of `as const` for readonly data
- Custom hooks extracted (`useSmoothScroll`, `useTheme`, `useIstClock`)
- Clean animation variant system in `lib/animations.ts`

### Issues Found

#### Bugs
1. **TransitionCurtain.tsx:** Duplicate `"use client"` directive on lines 1 and 23
2. **Preloader timer cleanup:** `return () => clearTimeout(...)` inside `setTimeout` callbacks is a no-op — setTimeout ignores return values
3. **SmoothScrollProvider:** Context value uses `lenisRef.current` which is `null` during first render — consumers calling `useSmoothScroll().lenis?.scrollTo()` won't get the Lenis instance until a re-render
4. **Footer social links:** Use `<Link>` (Next.js router) for external URLs — should use `<a>` tags for external links
5. **Contact form:** `handleSubmit` is fake (just a `setTimeout`) — no actual form submission

#### Code Smells
6. **Inconsistent `<img>` vs `<Image>`:** Testimonials use raw `<img>` while everywhere else uses `next/image`
7. **`ParallaxFooter` component:** Defined but never imported or used anywhere
8. **Duplicate IST clock logic:** Both Navbar and Footer implement the same clock independently
9. **Unused CSS classes:** `.ambient-grid` only used in Hero; `.mesh` not used anywhere
10. **Hardcoded strings throughout:** No i18n preparation, emails and phone numbers repeated in multiple files

#### TypeScript
11. **Blog `[slug]` page:** `params: Promise<{ slug: string }>` type is correct for Next.js 16 but `use()` in client component (`works/[slug]`) vs `await` in server component (`blog/[slug]`) — inconsistent pattern

---

## 10. Security Audit

### Potential Issues
- **`dangerouslySetInnerHTML`** in layout.tsx for theme script — acceptable for inline scripts but should be reviewed
- **Contact form:** No CSRF protection, no rate limiting, no honeypot field
- **External links:** Social links go to root domains (e.g., `https://x.com`, `https://instagram.com`) — placeholder URLs, not actual profiles
- **Email/phone in plain text:** `hello@codeique.studio` and `+91 98765 43210` exposed in HTML — standard for contact pages but worth noting
- **No Content Security Policy headers configured**

---

## 11. File Inventory

### Source Files (55 total)
```
src/
  app/ (15 files)
    layout.tsx, template.tsx, page.tsx, globals.css
    loading.tsx, not-found.tsx, robots.ts, sitemap.ts
    about/    — layout.tsx, page.tsx
    blog/     — page.tsx, [slug]/page.tsx
    contact/  — layout.tsx, page.tsx
    privacy/  — page.tsx
    terms/    — page.tsx
    works/    — layout.tsx, page.tsx, [slug]/page.tsx
  components/ (26 files)
    layout/    — Navbar.tsx, Footer.tsx, ParallaxFooter.tsx
    providers/ — Providers.tsx, SmoothScrollProvider.tsx, ThemeProvider.tsx
    sections/  — Hero, About, Work, Stats, Services, Process,
                 Testimonials, Pricing, FAQ, BlogPreview, CTA (11 files)
    ui/        — 15 files (see Component Inventory above)
    work/      — ProjectShowcaseCard.tsx
  lib/ (3 files)
    data.ts, animations.ts, pricing-geo.ts
```

### Public Assets
```
public/
  cyberHr 1.png (2.1 MB), cyberHr 2.png (1.0 MB), cyberHr3.png (1.1 MB)
  develozy 1.png (2.9 MB), develozy 2.png (2.0 MB), develozy 3.png (1.2 MB)
  lastsongonly 1.png (1.6 MB), lastsongonly 2.png (2.0 MB), lastsongonly 3.png (0.7 MB)
  let's tak.avif (12 KB)
  noise.svg (289 B)
  images/ — 18 SVG/PNG files for projects, blog, services
```

### Config Files
```
package.json, tsconfig.json, next.config.ts, postcss.config.mjs
eslint.config.mjs, pnpm-workspace.yaml, .gitignore
```

---

## 12. Dependencies

### Production
| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.1.6 | Framework |
| react | 19.2.3 | UI library |
| react-dom | 19.2.3 | DOM rendering |
| framer-motion | ^12.37.0 | Component animations |
| gsap | ^3.14.2 | ScrollTrigger animations |
| lenis | ^1.3.21 | Smooth scrolling |

### Development
| Package | Version | Purpose |
|---------|---------|---------|
| tailwindcss | ^4 | Utility CSS |
| @tailwindcss/postcss | ^4 | PostCSS integration |
| typescript | ^5 | Type checking |
| eslint | ^9 | Linting |
| eslint-config-next | 16.1.6 | Next.js lint rules |
| @types/node | ^20 | Node type definitions |
| @types/react | ^19 | React type definitions |
| @types/react-dom | ^19 | ReactDOM type definitions |

### Missing Recommended
- No testing framework (Jest, Vitest, Playwright)
- No Prettier for code formatting
- No Husky/lint-staged for pre-commit hooks
- No bundle analyzer configured
