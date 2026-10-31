import { wedding, photo, photoSrcSet } from '@/config/wedding'
import { Ornament } from './Ornament'

export function Hero() {
  const { hero, couple } = wedding
  const delay = (i: number) => ({ '--i': i }) as React.CSSProperties

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="paper relative flex min-h-[100svh] flex-col items-center overflow-hidden px-6 pt-24 pb-10 text-center"
    >
      <div className="hero-enter flex w-full max-w-md flex-1 flex-col items-center">
        <p
          className="eyebrow max-w-[18rem] leading-relaxed tracking-[0.18em] text-burgundy/80"
          style={delay(0)}
        >
          {hero.blessing}
        </p>

        <div
          className="hero-photo relative mt-9 w-[min(68vw,17rem)] drop-shadow-[0_20px_40px_rgba(92,0,23,0.12)]"
          style={delay(1)}
        >
          <div className="arch-frame" />
          <div className="arch aspect-[3/4] overflow-hidden bg-blush/40">
            <img
              src={photo(hero.photo, 560)}
              srcSet={photoSrcSet(hero.photo, [360, 560, 768])}
              sizes="(min-width: 640px) 17rem, 68vw"
              alt={hero.photoAlt}
              className="h-full w-full object-cover object-[center_40%]"
              decoding="async"
            />
          </div>
        </div>

        <h1
          id="hero-title"
          tabIndex={-1}
          className="font-display mt-9 text-[clamp(3rem,15vw,5.5rem)] leading-[0.95] font-medium text-burgundy outline-none"
          style={delay(2)}
        >
          {couple.partnerOne}
          <span className="mx-3 align-[0.08em] text-[0.62em] italic text-gold">&amp;</span>
          {couple.partnerTwo}
        </h1>

        <p
          className="font-display mt-4 max-w-[19rem] text-[clamp(1.1rem,3vw,1.5rem)] leading-snug italic tracking-[0.02em] text-charcoal/80"
          style={delay(3)}
        >
          {hero.invitation}
        </p>

        <div style={delay(4)} className="mt-6">
          <Ornament />
          <p className="eyebrow numerals mt-4 text-charcoal/70">{hero.dates}</p>
        </div>

        <a
          href="#story"
          className="mt-auto flex flex-col items-center gap-3 pt-10 text-burgundy/70 transition-colors hover:text-burgundy"
          style={delay(5)}
        >
          <span className="eyebrow text-[0.62rem]">Scroll</span>
          <span className="scroll-cue" aria-hidden="true" />
          <span className="sr-only">to our story</span>
        </a>
      </div>
    </section>
  )
}
