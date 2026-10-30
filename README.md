# Naicy & Mebin — Wedding Invitation

A cinematic, mobile-first digital wedding invitation for Naicy & Mebin's engagement (26 December 2026) and wedding (28 December 2026). Guests open a full-screen cover, tap **Open Invitation**, and the cover parts like a pair of doors to reveal the invitation: the ten-year love-story message, a live countdown to the wedding in Indian Standard Time, the two celebrations with venue cards and Google Maps directions, and a Tally RSVP.

## What's inside

- **Opening cover:** couple photograph, golden light and shimmer, music starts on the tap (mobile browsers only allow audio after a tap).
- **Love story and countdown:** the message is revealed line by line, then a countdown to 28 Dec 2026, 11:00 AM IST. After that moment a wedding-day message replaces the countdown.
- **Events:** the Engagement Celebration @ Naicy's (ivory) and the Wedding Celebration @ Mebin's (burgundy), each with its church ceremony and reception cards, **Get Directions** buttons and a travel note.
- **RSVP:** opens the Tally form (which saves to Google Sheets) in a new tab.
- **Music player:** play/pause with a live indicator. The guest's on/off choice is remembered, and the music pauses while the tab is in the background.
- **Navigation:** scroll progress bar, section menu, section dots on larger screens, back-to-top button, and light snowfall (turned off when the guest's device asks for reduced motion).
- **Sharing:** Open Graph and Twitter metadata with a 1200×630 cover image for WhatsApp previews.

## Editing content

Everything guests see is in **`src/config/wedding.ts`**: names, dates, times, venues, map links, story text, countdown target, RSVP link, music and photos.

- **Photos:** replace the files in `public/img/` (or point the config at new ones). `og-cover.jpg` is the WhatsApp preview and should stay 1200×630 JPEG, under 300 KB.
- **Music:** drop an MP3 into `public/audio/` and update `music.src`, `music.title` and `music.credit`. Set `src: ''` to hide the player.
- **Site URL:** if the domain changes, update `site.url` so link previews use absolute image URLs.

The included track is an original piano rendition of Pachelbel's *Canon in D*, a public-domain composition, made for this site.

## Tech

- [TanStack Start](https://tanstack.com/start) (React 19, server-rendered), Vite, Tailwind CSS 4
- Google Fonts: Cormorant Garamond (headings) and Jost (body)
- Netlify Image CDN for resized WebP photos (can be switched off, see below)
- No backend: RSVP responses are collected by Tally

## Running locally

```bash
pnpm install
pnpm dev            # http://localhost:3000
# or, with Netlify features such as the Image CDN emulated:
netlify dev
```

## Moving to another host

Set `site.useNetlifyImageCdn` to `false` in the config so photos load straight from `public/img/`. Then deploy the TanStack Start build to any host that supports it (Node, Vercel, Cloudflare and others; see the TanStack Start hosting docs). Netlify-specific settings live only in `netlify.toml`.
