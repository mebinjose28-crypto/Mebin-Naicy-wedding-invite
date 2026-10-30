import { useEffect, useRef, useState } from 'react'

/**
 * Reports once when an element scrolls into view. Falls back to "visible"
 * immediately on browsers without IntersectionObserver.
 */
export function useInView<T extends Element>(
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.15,
) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return [ref, inView] as const
}

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}
