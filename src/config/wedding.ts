/**
 * Every piece of invitation content lives here: names, dates, venues, links,
 * copy, photographs and music. Edit this file to change what guests see —
 * no component needs to be touched.
 */

export const wedding = {
  couple: {
    partnerOne: 'Naicy',
    partnerTwo: 'Mebin',
    monogram: ['M', 'N'] as const,
  },

  site: {
    /** Absolute URL of the live site. Used for WhatsApp / social previews. */
    url: 'https://mebinjose28-crypto.github.io/Mebin-Naicy-wedding-invite/',
    title: 'Naicy & Mebin – Wedding Invitation',
    description:
      'With joy in our hearts, we invite you to celebrate with us on 26th & 28th December 2026 in Kerala.',
    /** 1200×630 JPEG served as a plain static file so link previews load reliably. */
    shareImage: '/img/og-cover.jpg',
    shareImageAlt: 'The hands of a bride and groom resting together on an ivory silk saree',
    themeColor: '#800020',
    /**
     * When true, photos are resized and converted to WebP by Netlify Image CDN.
     * Set to false when hosting elsewhere — the original files are used as-is.
     */
    useNetlifyImageCdn: false,
  },

  cover: {
    eyebrow: 'You are cordially invited',
    heading: 'to the wedding celebrations of',
    dates: '26th & 28th · December · 2026',
    button: 'Open Invitation',
    photo: '/img/cover.jpg',
    photoAlt: 'A bride in an ivory saree and lace veil walking hand in hand with the groom toward a Kerala church',
  },

  hero: {
    blessing: 'With the blessings of God Almighty and our families',
    invitation: 'request the pleasure of your presence as we begin our forever',
    dates: 'December 2026 · Kerala',
    photo: '/img/cover.jpg',
    photoAlt: 'The couple walking toward the church doors at golden hour',
  },

  story: {
    /** Shown line by line, exactly as written. Empty strings add a pause between stanzas. */
    lines: [
      '10 years ago,',
      'we found each other,',
      'and ever since,',
      'life has been a little more beautiful.',
      '',
      'Now,',
      "we're counting down to forever.",
    ],
  },

  countdown: {
    /** ISO 8601 with the India offset, so the countdown is correct in every timezone. */
    target: '2026-12-28T11:00:00+05:30',
    caption: 'Monday, 28 December 2026 · 11:00 AM IST',
    afterTitle: 'Forever begins today',
    afterMessage:
      'Naicy & Mebin are now husband and wife. Thank you for every prayer, blessing and kind word that carried us here.',
  },

  events: [
    {
      id: 'engagement',
      kicker: 'Event One',
      title: 'Engagement Celebration',
      host: "@ Naicy's",
      isoDate: '2026-12-26',
      weekday: 'Saturday',
      day: '26',
      month: 'December',
      year: '2026',
      photo: '/img/church.jpg',
      photoAlt: 'A white Kerala church framed by coconut palms at golden hour',
      tone: 'light' as const,
      venues: [
        {
          label: 'Betrothal Ceremony',
          time: '11:30 AM',
          name: 'St. George Church',
          address: 'Puthenpally, Varapuzha',
          mapUrl: 'https://maps.app.goo.gl/WRDz4JbQ1cMdousx8',
        },
        {
          label: 'Reception',
          time: '12:30 PM',
          name: 'St. George Parish Hall',
          address: 'Puthenpally, Varapuzha',
          mapUrl: 'https://maps.app.goo.gl/ZnVqL6tQapZLTQK56',
        },
      ],
      note: {
        title: 'Just next door',
        text: 'The Parish Hall is next to the church — simply walk across after the ceremony.',
      },
    },
    {
      id: 'wedding',
      kicker: 'Event Two',
      title: 'Wedding Celebration',
      host: "@ Mebin's",
      isoDate: '2026-12-28',
      weekday: 'Monday',
      day: '28',
      month: 'December',
      year: '2026',
      photo: '/img/reception.jpg',
      photoAlt: 'A candlelit reception hall with ivory linens and blush roses',
      tone: 'dark' as const,
      venues: [
        {
          label: 'Holy Matrimony',
          time: '11:00 AM',
          name: "St. Augustine's Forane Church",
          address: 'Ramapuram, Pala',
          mapUrl: 'https://maps.app.goo.gl/HHkJ9DTtnU17NDvk',
        },
        {
          label: 'Reception',
          time: '12:30 PM',
          name: 'Michael Plaza Convention Center',
          address: 'Ramapuram, Pala',
          mapUrl: 'https://maps.app.goo.gl/tLGLLijbr77N5ggF7',
        },
      ],
      note: {
        title: 'From church to reception',
        text: 'The convention center is a short journey from the church.',
        travel: [
          { mode: 'car' as const, label: 'about 2 min by car' },
          { mode: 'walk' as const, label: 'about 8 min on foot' },
        ],
      },
    },
  ],

  rsvp: {
    title: 'Will you join us?',
    message:
      'Your presence would make our celebrations complete. Kindly let us know if you can attend — it only takes a moment.',
    button: 'RSVP Now',
    url: 'https://tally.so/r/J1q1LK',
  
  },

  music: {
    /** Replace with your own track (MP3 recommended, ~1–3 MB). Set to '' to hide the player. */
    src: '/audio/canon-in-d.mp3',
    title: 'Canon in D',
    credit: 'J. Pachelbel · piano arrangement',
    volume: 0.35,
  },

  closing: {
    line: 'With love and gratitude',
    signature: 'Naicy & Mebin',
  },

  nav: [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Our Story' },
    { id: 'engagement', label: 'Engagement' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'rsvp', label: 'RSVP' },
  ],
}

export type WeddingEvent = (typeof wedding.events)[number]
export type Venue = WeddingEvent['venues'][number]


/** Resolves photo paths for GitHub Pages. */
export function photo(src: string, _width: number, _quality = 72) {
  return `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`
}

export function photoSrcSet(src: string, widths: number[]) {
  return widths
    .map((w) => `${photo(src, w)} ${w}w`)
    .join(', ')
}
