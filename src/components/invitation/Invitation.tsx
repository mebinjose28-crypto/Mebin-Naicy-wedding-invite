import { useEffect, useState } from 'react'

import { wedding } from '@/config/wedding'
import { cn } from '@/lib/utils'
import { Closing } from './Closing'
import { Controls } from './Controls'
import { Cover } from './Cover'
import { EventSection } from './EventSection'
import { Hero } from './Hero'
import { MusicProvider } from './MusicProvider'
import { Rsvp } from './Rsvp'
import { Snowfall } from './Snowfall'
import { Story } from './Story'

type Phase = 'cover' | 'opening' | 'open'

export function Invitation() {
  const [phase, setPhase] = useState<Phase>('cover')

  // Scroll-reveal styles only hide content once JavaScript is running.
  useEffect(() => {
    document.documentElement.classList.add('reveal-ready')
  }, [])

  useEffect(() => {
    if (phase === 'open') document.getElementById('hero-title')?.focus({ preventScroll: true })
  }, [phase])

  return (
    <MusicProvider>
      <noscript>
        <style>{'.cover{display:none!important}.hero-enter>*{opacity:1!important}'}</style>
      </noscript>

      {phase !== 'open' && (
        <Cover onOpen={() => setPhase('opening')} onDone={() => setPhase('open')} />
      )}

      <Snowfall active={phase !== 'cover'} />
      <Controls />

      <main className={cn(phase !== 'cover' && 'invitation-open')} aria-hidden={phase === 'cover' ? true : undefined}>
        <Hero />
        <Story />
        {wedding.events.map((event) => (
          <EventSection key={event.id} event={event} />
        ))}
        <Rsvp />
      </main>
      <Closing />
    </MusicProvider>
  )
}
