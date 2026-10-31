import { useEffect, useRef, useState } from 'react'
import { Music2 } from 'lucide-react'

import { wedding, photo, photoSrcSet } from '@/config/wedding'
import { prefersReducedMotion } from '@/lib/use-in-view'
import { cn } from '@/lib/utils'
import { Monogram } from './Ornament'
import { useMusic } from './MusicProvider'

// Fixed positions keep server and client markup identical.
const MOTES = [
  { left: '14%', top: '72%', s: '3px', d: '9s', delay: '0s', x: '14px' },
  { left: '26%', top: '58%', s: '2px', d: '11s', delay: '2.4s', x: '-10px' },
  { left: '38%', top: '80%', s: '4px', d: '10s', delay: '4.1s', x: '18px' },
  { left: '52%', top: '64%', s: '2px', d: '8s', delay: '1.2s', x: '-16px' },
  { left: '63%', top: '76%', s: '3px', d: '12s', delay: '3.3s', x: '10px' },
  { left: '74%', top: '55%', s: '2px', d: '9.5s', delay: '5.2s', x: '-12px' },
  { left: '84%', top: '70%', s: '3px', d: '10.5s', delay: '0.8s', x: '8px' },
  { left: '46%', top: '42%', s: '2px', d: '13s', delay: '6s', x: '20px' },
]

const OPEN_DURATION = 1900

export function Cover({
  onOpen,
  onDone,
}: {
  onOpen: () => void
  onDone: () => void
}) {
  const { cover, couple } = wedding
  const music = useMusic()
  const [opening, setOpening] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    buttonRef.current?.focus({ preventScroll: true })
  }, [])

  const open = () => {
    if (opening) return
    // Must run inside the tap handler — mobile browsers only allow audio after a gesture.
    music.start()
    setOpening(true)
    onOpen()
    window.setTimeout(onDone, prefersReducedMotion() ? 50 : OPEN_DURATION)
  }

  const image = (
    <img
      src={photo(cover.photo, 768)}
      srcSet={photoSrcSet(cover.photo, [480, 768])}
      sizes="100vw"
      alt=""
      fetchPriority="high"
      decoding="async"
    />
  )

  return (
    <div
      className={cn('cover cover-active', opening && 'is-opening')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cover-names"
    >
      <div className="cover-panel cover-panel--left">{image}</div>
      <div className="cover-panel cover-panel--right">{image}</div>
      <div className="cover-seam" />

      <div className="cover-content text-ivory">
        <div className="gold-glow" />
        {MOTES.map((m, i) => (
          <span
            key={i}
            className="gold-mote"
            style={
              {
                left: m.left,
                top: m.top,
                '--s': m.s,
                '--d': m.d,
                '--delay': m.delay,
                '--x': m.x,
              } as React.CSSProperties
            }
          />
        ))}

        <div
          className="cover-enter relative flex h-full flex-col items-center justify-between px-6 text-center"
          style={{
            paddingTop: 'max(2.5rem, env(safe-area-inset-top))',
            paddingBottom: 'max(2.25rem, env(safe-area-inset-bottom))',
          }}
        >
          <div style={{ '--i': 0 } as React.CSSProperties}>
            <Monogram letters={couple.monogram} className="size-36 text-lg text-ivory" />
          </div>

          <div className="flex flex-col items-center">
            <p className="eyebrow text-gold-soft" style={{ '--i': 1 } as React.CSSProperties}>
              {cover.eyebrow}
            </p>
            <p
              className="font-display mt-3 text-lg italic text-ivory/85"
              style={{ '--i': 2 } as React.CSSProperties}
            >
              {cover.heading}
            </p>
            <p
              id="cover-names"
              className="font-display mt-5 leading-[0.92] font-medium tracking-[0.02em]"
              style={{ '--i': 3 } as React.CSSProperties}
            >
              <span className="shimmer-text block text-[clamp(3.6rem,19vw,7.5rem)]">
                {couple.partnerOne}
              </span>
              <span className="font-display my-1 block text-[clamp(2rem,9vw,3.5rem)] italic text-gold">
                &amp;
              </span>
              <span className="shimmer-text block text-[clamp(3.6rem,19vw,7.5rem)]">
                {couple.partnerTwo}
              </span>
            </p>
            <div className="mt-6 flex items-center gap-3" style={{ '--i': 4 } as React.CSSProperties}>
              <span className="h-px w-8 bg-gold/70" />
              <p className="eyebrow numerals text-ivory/90">{cover.dates}</p>
              <span className="h-px w-8 bg-gold/70" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4" style={{ '--i': 5 } as React.CSSProperties}>
            <button
              ref={buttonRef}
              type="button"
              onClick={open}
              className="open-button eyebrow min-h-14 rounded-full border border-gold/90 bg-white/8 px-10 text-[0.78rem] text-ivory shadow-[0_10px_40px_-12px_rgba(214,184,120,0.45)] transition-colors duration-300 hover:border-gold hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
            >
              <span className="ring" aria-hidden="true" />
              {cover.button}
            </button>
            {music.available && (
              <p className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.12em] text-ivory/65 uppercase">
                <Music2 className="size-3" aria-hidden="true" />
                Best enjoyed with sound on
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
