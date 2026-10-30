import { cn } from '@/lib/utils'
import { useInView } from '@/lib/use-in-view'

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      data-reveal
      className={cn(inView && 'is-visible', className)}
      style={{ '--i': delay } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
