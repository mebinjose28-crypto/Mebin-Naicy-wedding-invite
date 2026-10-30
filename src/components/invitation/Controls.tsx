import { useEffect, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowUp, X } from 'lucide-react'

import { wedding } from '@/config/wedding'
import { cn } from '@/lib/utils'
import { Monogram, Ornament } from './Ornament'
import { useMusic } from './MusicProvider'

function useScrollState() {
  const barRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      barRef.current?.style.setProperty('--progress', String(progress))
      setScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const item of wedding.nav) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return { barRef, scrolled, active }
}

function MusicButton() {
  const { available, playing, toggle } = useMusic()
  if (!available) return null
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? `Pause music: ${wedding.music.title}` : `Play music: ${wedding.music.title}`}
      title={`${wedding.music.title} — ${wedding.music.credit}`}
      className="glass flex h-11 items-center gap-2.5 rounded-full border border-gold/40 pr-4 pl-3.5 text-burgundy transition-colors hover:border-gold"
    >
      <span className={cn('eq flex h-4 items-end gap-[3px]', playing && 'is-playing')} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="eyebrow text-[0.58rem]">{playing ? 'Music on' : 'Music off'}</span>
    </button>
  )
}

export function Controls() {
  const { barRef, scrolled, active } = useScrollState()
  const [menuOpen, setMenuOpen] = useState(false)
  const pendingTarget = useRef<string | null>(null)

  // Close the menu first, then scroll once the page is unlocked again.
  const goTo = (event: React.MouseEvent, id: string) => {
    event.preventDefault()
    pendingTarget.current = id
    setMenuOpen(false)
  }

  return (
    <>
      <div ref={barRef} className="fixed inset-x-0 top-0 z-40 h-[2px]" aria-hidden="true">
        <div className="progress-bar h-full bg-gradient-to-r from-gold via-gold-soft to-burgundy" />
      </div>

      <div className="safe-top pointer-events-none fixed inset-x-0 z-40 flex items-center justify-between px-4">
        <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="glass pointer-events-auto flex size-11 items-center justify-center rounded-full border border-gold/40 text-burgundy transition-colors hover:border-gold"
            >
              <Monogram letters={wedding.couple.monogram} className="size-9 border-0 text-[0.95rem]" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Content
              aria-describedby={undefined}
              onCloseAutoFocus={(event) => {
                const id = pendingTarget.current
                if (!id) return
                event.preventDefault()
                pendingTarget.current = null
                requestAnimationFrame(() =>
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
                )
              }}
              className="menu-overlay fixed inset-0 z-[70] flex flex-col items-center justify-center bg-burgundy-deep/97 px-6 text-ivory"
            >
              <Dialog.Title className="sr-only">Invitation sections</Dialog.Title>
              <Dialog.Close
                aria-label="Close menu"
                className="safe-top absolute right-4 flex size-11 items-center justify-center rounded-full border border-gold/40 text-gold-soft"
              >
                <X className="size-5" strokeWidth={1.4} />
              </Dialog.Close>
              <Monogram letters={wedding.couple.monogram} className="size-16 text-xl text-gold-soft" />
              <nav aria-label="Sections" className="mt-10">
                <ul className="flex flex-col items-center gap-2">
                  {wedding.nav.map((item, i) => (
                    <li key={item.id} style={{ '--i': i } as React.CSSProperties}>
                      <a
                        href={`#${item.id}`}
                        onClick={(event) => goTo(event, item.id)}
                        aria-current={active === item.id ? 'true' : undefined}
                        className={cn(
                          'font-display block px-6 py-2 text-[2.1rem] leading-tight transition-colors',
                          active === item.id ? 'text-gold italic' : 'text-ivory/85 hover:text-ivory',
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <Ornament className="mt-10 text-gold/60" />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <div className="pointer-events-auto">
          <MusicButton />
        </div>
      </div>

      {/* Section dots for larger screens */}
      <nav
        aria-label="Section shortcuts"
        className="fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 flex-col md:flex"
      >
        {wedding.nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-label={item.label}
            aria-current={active === item.id ? 'true' : undefined}
            className="group flex size-9 items-center justify-center"
          >
            <span
              className={cn(
                'block rounded-full transition-all duration-500',
                active === item.id
                  ? 'size-2.5 bg-burgundy ring-4 ring-gold/30'
                  : 'size-1.5 bg-charcoal/30 group-hover:bg-burgundy/60',
              )}
            />
          </a>
        ))}
      </nav>

      <a
        href="#home"
        aria-label="Back to top"
        tabIndex={scrolled ? undefined : -1}
        className={cn(
          'glass safe-bottom fixed right-4 z-40 flex size-12 items-center justify-center rounded-full border border-gold/40 text-burgundy transition-all duration-500',
          scrolled ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
        )}
      >
        <ArrowUp className="size-5" strokeWidth={1.4} />
      </a>
    </>
  )
}
