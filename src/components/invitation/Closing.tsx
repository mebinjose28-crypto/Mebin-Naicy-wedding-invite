import { ArrowUp } from 'lucide-react'

import { wedding } from '@/config/wedding'
import { Ornament } from './Ornament'
import { Reveal } from './Reveal'

export function Closing() {
  const { closing, cover } = wedding
  return (
    <footer className="bg-burgundy-deep px-6 pt-20 pb-16 text-center text-ivory" style={{ paddingBottom: 'max(4rem, env(safe-area-inset-bottom))' }}>
      <Reveal>
        <p className="font-display text-xl italic text-ivory/75">{closing.line}</p>
        <p className="font-display mt-3 text-[clamp(2.6rem,12vw,4.5rem)] leading-none font-medium text-gold-soft">
          {closing.signature}
        </p>
        <Ornament className="mt-6 text-gold/70" />
        <p className="eyebrow numerals mt-5 text-ivory/60">{cover.dates}</p>
        <a
          href="#home"
          className="eyebrow mt-10 inline-flex min-h-12 items-center gap-2 rounded-full border border-gold/40 px-6 text-[0.65rem] text-ivory/80 transition-colors hover:border-gold hover:text-ivory"
        >
          <ArrowUp className="size-3.5" aria-hidden="true" />
          Back to the beginning
        </a>
      </Reveal>
    </footer>
  )
}
