import { Car, Footprints, Sparkles } from 'lucide-react'

import { photo, photoSrcSet, type WeddingEvent } from '@/config/wedding'
import { useInView } from '@/lib/use-in-view'
import { cn } from '@/lib/utils'
import { Ornament } from './Ornament'
import { Reveal } from './Reveal'
import { VenueCard } from './VenueCard'

const TRAVEL_ICONS = { car: Car, walk: Footprints }

export function EventSection({ event }: { event: WeddingEvent }) {
  const dark = event.tone === 'dark'
  const [bannerRef, bannerVisible] = useInView<HTMLDivElement>()
  const [first, second] = event.venues
  const note = event.note

  return (
    <section
      id={event.id}
      aria-labelledby={`${event.id}-title`}
      className={cn(
        'relative overflow-hidden px-5 py-24 sm:py-32',
        dark
          ? 'bg-burgundy text-ivory [background-image:radial-gradient(120%_60%_at_50%_0%,rgb(214_184_120/0.14),transparent_60%),radial-gradient(90%_50%_at_50%_100%,rgb(0_0_0/0.25),transparent_70%)]'
          : 'paper bg-[#f5ede1] text-charcoal',
      )}
    >
      <div className="mx-auto max-w-content">
        <Reveal className="text-center">
          <p className={cn('font-display text-5xl italic', dark ? 'text-gold/80' : 'text-gold')}>
            {event.number}
          </p>
          <p className={cn('eyebrow mt-3', dark ? 'text-gold-soft' : 'text-burgundy/80')}>
            {event.kicker}
          </p>
          <h2
            id={`${event.id}-title`}
            className={cn(
              'font-display mt-3 text-[clamp(2.4rem,10vw,4rem)] leading-[1.02] font-medium',
              dark ? 'text-ivory' : 'text-burgundy',
            )}
          >
            {event.title}
          </h2>
          <p className={cn('font-display mt-2 text-2xl italic', dark ? 'text-blush' : 'text-charcoal/70')}>
            {event.host}
          </p>
          <Ornament className="mt-6" />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-md gap-10 lg:max-w-none lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-14">
          <div
            ref={bannerRef}
            data-reveal
            className={cn('event-banner relative lg:sticky lg:top-24', bannerVisible && 'is-visible')}
          >
            <div className="overflow-hidden rounded-[1.5rem]">
              <img
                src={photo(event.photo, 720)}
                srcSet={photoSrcSet(event.photo, [480, 720, 1200])}
                sizes="(min-width: 1024px) 40rem, 92vw"
                alt={event.photoAlt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div
              className={cn(
                'absolute -bottom-7 left-1/2 flex -translate-x-1/2 items-stretch rounded-2xl border text-center shadow-xl',
                dark
                  ? 'border-gold/50 bg-burgundy-deep text-ivory'
                  : 'border-gold/50 bg-ivory text-burgundy',
              )}
            >
              <time
                dateTime={event.isoDate}
                className="flex items-center gap-4 px-5 py-3"
              >
                <span className="eyebrow text-[0.62rem] opacity-80">{event.weekday}</span>
                <span className="font-display numerals text-4xl leading-none font-semibold">
                  {event.day}
                </span>
                <span className="eyebrow text-[0.62rem] leading-relaxed opacity-80">
                  {event.month}
                  <br />
                  {event.year}
                </span>
              </time>
            </div>
          </div>

          <div className="pt-6 lg:pt-0">
            <Reveal>
              <VenueCard venue={first} tone={event.tone} />
            </Reveal>

            <div className="flex flex-col items-center py-1" aria-hidden="true">
              <span className="connector block h-7 w-px" />
              <span
                className={cn(
                  'eyebrow rounded-full border px-4 py-2 text-[0.6rem]',
                  dark ? 'border-gold/40 text-gold-soft' : 'border-gold/60 bg-ivory text-burgundy',
                )}
              >
                {'travel' in note ? 'A short drive' : 'Adjacent to the church'}
              </span>
              <span className="connector block h-7 w-px" />
            </div>

            <Reveal>
              <VenueCard venue={second} tone={event.tone} />
            </Reveal>

            <Reveal className="mt-6">
              <aside
                className={cn(
                  'flex gap-4 rounded-2xl border border-dashed p-5',
                  dark ? 'border-gold/40 bg-burgundy-deep/40' : 'border-gold/60 bg-ivory/70',
                )}
              >
                <Sparkles
                  className={cn('mt-0.5 size-5 shrink-0', dark ? 'text-gold' : 'text-burgundy')}
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
                <div>
                  <p className={cn('font-display text-xl font-medium', dark ? 'text-ivory' : 'text-burgundy')}>
                    {note.title}
                  </p>
                  <p className={cn('mt-1 text-[0.95rem] leading-relaxed font-light', dark ? 'text-ivory/80' : 'text-charcoal/80')}>
                    {note.text}
                  </p>
                  {'travel' in note && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {note.travel.map((t) => {
                        const Icon = TRAVEL_ICONS[t.mode]
                        return (
                          <li
                            key={t.mode}
                            className={cn(
                              'inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm',
                              dark ? 'bg-ivory/10 text-ivory' : 'bg-blush/40 text-charcoal',
                            )}
                          >
                            <Icon className="size-4 text-gold" strokeWidth={1.6} aria-hidden="true" />
                            {t.label}
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
