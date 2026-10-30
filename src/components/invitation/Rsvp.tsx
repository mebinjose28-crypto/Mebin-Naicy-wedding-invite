import { ArrowUpRight } from 'lucide-react'

import { wedding } from '@/config/wedding'
import { Monogram, Ornament } from './Ornament'
import { Reveal } from './Reveal'

export function Rsvp() {
  const { rsvp, couple } = wedding

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-title"
      className="paper relative overflow-hidden px-5 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(70%_100%_at_50%_0%,rgb(216_183_178/0.45),transparent_70%)]"
      />
      <Reveal className="relative mx-auto max-w-md">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-gold/50 bg-card px-6 pt-16 pb-10 text-center shadow-[0_40px_80px_-50px_rgb(128_0_32/0.55)] sm:px-10">
          {/* envelope flap */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 90"
            preserveAspectRatio="none"
            className="absolute inset-x-0 top-0 h-20 w-full"
          >
            <path d="M0 0h400L200 86Z" fill="#f1e8d8" />
            <path d="M0 0 200 86 400 0" fill="none" stroke="#d6b878" strokeOpacity="0.7" strokeWidth="1" />
          </svg>
          <div className="relative -mt-10 flex justify-center">
            <Monogram
              letters={couple.monogram}
              className="size-16 bg-burgundy text-xl text-ivory shadow-[0_8px_24px_-8px_rgb(128_0_32/0.7)]"
            />
          </div>

          <p className="eyebrow mt-8 text-gold">Kindly respond</p>
          <h2
            id="rsvp-title"
            className="font-display mt-3 text-[clamp(2.4rem,10vw,3.4rem)] leading-tight font-medium text-burgundy"
          >
            {rsvp.title}
          </h2>
          <Ornament className="mt-4" />
          <p className="mt-6 text-base leading-relaxed font-light text-charcoal/80">
            {rsvp.message}
          </p>

          <a
            href={rsvp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="open-button eyebrow mt-9 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-burgundy px-8 text-[0.8rem] text-ivory shadow-[0_14px_34px_-14px_rgb(128_0_32/0.9)] transition-[background-color,transform] hover:bg-burgundy-deep active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy"
          >
            {rsvp.button}
            <ArrowUpRight className="size-4" strokeWidth={1.6} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <p className="mt-4 text-xs leading-relaxed text-charcoal/60">{rsvp.footnote}</p>
        </div>
      </Reveal>
    </section>
  )
}
