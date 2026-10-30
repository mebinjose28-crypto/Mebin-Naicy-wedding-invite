# AGENTS.md

A single-page digital wedding invitation for Naicy & Mebin, built with TanStack Start (React 19, SSR) and Tailwind CSS 4, deployed on Netlify. It has no database or API. The RSVP is an external Tally form.

## Architecture

- `src/config/wedding.ts`: **the single source of truth for all content** (names, dates, venues, map links, copy, photo and audio paths, nav items). Components read only from here, so never hard-code content in components. It also exports `photo()` / `photoSrcSet()`, which route images through Netlify Image CDN when `site.useNetlifyImageCdn` is true.
- `src/routes/__root.tsx`: HTML shell, Open Graph/WhatsApp meta, fonts, and the cover-image preload.
- `src/routes/index.tsx`: renders `<Invitation />`.
- `src/components/invitation/`: the invitation, one component per section.
  - `Invitation.tsx`: page phases `cover → opening → open`. It adds `reveal-ready` to `<html>` on mount, so scroll-reveal CSS only hides content once JS runs.
  - `Cover.tsx`: full-screen opening. Two half-panels show one photo and slide apart. `music.start()` **must stay inside the click handler** (iOS/Android audio-gesture rule).
  - `MusicProvider.tsx`: one `Audio` element for the page's lifetime. Stores the on/off preference in localStorage and the playback position in sessionStorage. Pauses while the tab is hidden.
  - `Story.tsx` + `Countdown.tsx`: line-by-line reveal (CSS, staggered via `--i`). The countdown wrapper `.story-after` animates after the last line through a CSS sibling selector. The countdown uses an absolute `+05:30` timestamp, renders `--` until mount (hydration-safe), and switches to the after-wedding message once the time passes.
  - `EventSection.tsx` / `VenueCard.tsx`: `tone: 'light' | 'dark'` gives each event its own look. Event notes may include `travel` chips.
  - `Rsvp.tsx`, `Closing.tsx`, `Controls.tsx` (progress bar, Radix Dialog menu, music button, section dots, back-to-top), `Snowfall.tsx` (single canvas, about 20 flakes on mobile, off under reduced motion), `Reveal.tsx`, `Ornament.tsx`.
- `src/styles.css`: palette variables (`--burgundy`, `--gold`, `--ivory`, `--blush`, `--charcoal`, also exposed as Tailwind colors such as `bg-burgundy` and `text-gold`). Bespoke classes and keyframes sit in `@layer components` so Tailwind utilities can override them.
- `public/img/`: generated photos. `og-cover.jpg` is 1200×630 for link previews. `public/audio/canon-in-d.mp3` is an original rendition of a public-domain piece.
- `src/components/ui/`, `src/examples/`, `docs/`: leftover template building blocks, mostly unused.

## Conventions

- Mobile first: design at 360–430px wide and keep tap targets at least 44px. Respect `env(safe-area-inset-*)` on fixed elements.
- Keep motion subtle. Every animation must degrade under `prefers-reduced-motion` (a global rule in `styles.css` does this).
- Don't read `window`/storage during render. Use effects (SSR).
- Don't add heavy libraries. Animations are CSS plus one canvas.
- Icons: `lucide-react`. Use `cn()` from `@/lib/utils` to merge classes.
- `src/routeTree.gen.ts` is generated. Don't edit it.
