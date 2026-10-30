import { Church, MapPin, Navigation, Wine } from 'lucide-react'

import type { Venue } from '@/config/wedding'
import { cn } from '@/lib/utils'

export function VenueCard({ venue, tone }: { venue: Venue; tone: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  const Icon = /reception/i.test(venue.label) ? Wine : Church

  return (
    <article
      className={cn(
        'venue-card relative flex flex-col rounded-[1.25rem] border p-6 text-left sm:p-7',
        dark
          ? 'border-gold/35 bg-[rgb(255_255_255/0.05)] text-ivory'
          : 'border-gold/45 bg-card text-charcoal shadow-[0_22px_50px_-34px_rgb(128_0_32/0.45)]',
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <p className={cn('eyebrow', dark ? 'text-gold' : 'text-burgundy')}>{venue.label}</p>
        <span
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full border',
            dark ? 'border-gold/40 text-gold' : 'border-gold/50 text-burgundy',
          )}
          aria-hidden="true"
        >
          <Icon className="size-[1.1rem]" strokeWidth={1.4} />
        </span>
      </div>

      <p
        className={cn(
          'font-display numerals mt-3 flex items-center gap-2 text-[2.4rem] leading-none font-medium',
          dark ? 'text-ivory' : 'text-burgundy',
        )}
      >
        <span className="sr-only">Time: </span>
        {venue.time}
      </p>

      <h3 className="font-display mt-5 text-[1.6rem] leading-tight font-medium">{venue.name}</h3>
      <p
        className={cn(
          'mt-2 flex items-start gap-2 text-[0.95rem] leading-snug font-light',
          dark ? 'text-ivory/75' : 'text-charcoal/75',
        )}
      >
        <MapPin className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
        {venue.address}
      </p>

      <a
        href={venue.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Get directions to ${venue.name} (opens Google Maps)`}
        className={cn(
          'eyebrow mt-6 inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full px-6 text-[0.72rem] transition-[background-color,transform] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3',
          dark
            ? 'bg-gold text-burgundy-deep hover:bg-gold-soft focus-visible:outline-gold'
            : 'bg-burgundy text-ivory hover:bg-burgundy-deep focus-visible:outline-burgundy',
        )}
      >
        <Navigation className="size-4" strokeWidth={1.6} aria-hidden="true" />
        Get Directions
      </a>
    </article>
  )
}
