import { wedding } from '@/config/wedding'
import { useInView } from '@/lib/use-in-view'
import { cn } from '@/lib/utils'
import { Countdown } from './Countdown'

const LINE_STEP = 0.62

export function Story() {
  const lines = wedding.story.lines
  const [storyRef, storyVisible] = useInView<HTMLDivElement>('0px 0px -20% 0px', 0.3)
  // The countdown rises in just after the final line has settled.
  const afterDelay = `${0.2 + (lines.length - 1) * LINE_STEP + 0.9}s`

  return (
    <section id="story" aria-label="Our story" className="paper relative px-5 pt-24 pb-24 sm:pt-32">
      <div
        ref={storyRef}
        className={cn('story mx-auto max-w-xl text-center', storyVisible && 'is-visible')}
      >
        <p className="font-display text-[clamp(1.55rem,6.6vw,2.6rem)] leading-[1.45] text-charcoal">
          {lines.map((line, i) =>
            line === '' ? (
              <span key={i} className="block h-6 sm:h-8" aria-hidden="true" />
            ) : (
              <span
                key={i}
                className={cn(
                  'story-line block text-balance',
                  i === lines.length - 1 && 'mt-1 font-medium text-burgundy italic',
                )}
                style={{ '--i': i, '--step': `${LINE_STEP}s` } as React.CSSProperties}
              >
                {line}
              </span>
            ),
          )}
        </p>
      </div>

      <div
        className="story-after mt-16 sm:mt-20"
        style={{ '--after-delay': afterDelay } as React.CSSProperties}
      >
        <p className="eyebrow mb-6 text-center text-gold">Until forever</p>
        <Countdown />
      </div>
    </section>
  )
}
