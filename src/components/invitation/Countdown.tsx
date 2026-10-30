import { useEffect, useState } from 'react'

import { wedding } from '@/config/wedding'
import { Ornament } from './Ornament'

const TARGET = Date.parse(wedding.countdown.target)

function split(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000))
  return [
    { label: 'Days', value: Math.floor(total / 86400) },
    { label: 'Hours', value: Math.floor((total % 86400) / 3600) },
    { label: 'Minutes', value: Math.floor((total % 3600) / 60) },
    { label: 'Seconds', value: total % 60 },
  ]
}

/** Live countdown to the wedding, computed from an absolute IST timestamp. */
export function Countdown() {
  const { countdown } = wedding
  // null until mounted, so server and client render the same markup.
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    let timer: number
    const tick = () => {
      const current = Date.now()
      setNow(current)
      if (current < TARGET) timer = window.setTimeout(tick, 1000 - (current % 1000) + 5)
    }
    tick()
    const onVisibility = () => {
      if (!document.hidden) {
        window.clearTimeout(timer)
        tick()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  if (now !== null && now >= TARGET) {
    return (
      <div className="mx-auto max-w-md text-center" role="status">
        <Ornament />
        <p className="font-display mt-6 text-4xl font-medium text-burgundy">
          {countdown.afterTitle}
        </p>
        <p className="mt-4 text-base leading-relaxed font-light text-charcoal/80">
          {countdown.afterMessage}
        </p>
      </div>
    )
  }

  const units = split(now === null ? 0 : TARGET - now)

  return (
    <div className="mx-auto w-full max-w-lg">
      <div
        className="grid grid-cols-4 gap-2 sm:gap-4"
        role="timer"
        aria-live="off"
        aria-label={
          now === null
            ? 'Countdown to the wedding'
            : `${units[0].value} days, ${units[1].value} hours and ${units[2].value} minutes until the wedding`
        }
      >
        {units.map((u) => (
          <div
            key={u.label}
            className="count-cell flex flex-col items-center rounded-2xl border border-gold/40 px-1 pt-4 pb-3 sm:pt-6 sm:pb-4"
          >
            <span
              key={now === null ? '-' : u.value}
              className="font-display numerals tick text-[clamp(2.1rem,10.5vw,3.5rem)] leading-none font-semibold text-burgundy"
            >
              {now === null ? '--' : String(u.value).padStart(2, '0')}
            </span>
            <span className="mt-2 text-[0.6rem] font-medium tracking-[0.22em] text-charcoal/65 uppercase sm:text-[0.68rem]">
              {u.label}
            </span>
          </div>
        ))}
      </div>
      <p className="eyebrow numerals mt-6 text-center text-[0.64rem] leading-relaxed text-charcoal/70">
        {countdown.caption}
      </p>
    </div>
  )
}
