import { cn } from '@/lib/utils'

/** A fine champagne-gold flourish used between headings and sections. */
export function Ornament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 20"
      aria-hidden="true"
      className={cn('mx-auto h-4 w-44 text-gold', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
    >
      <path d="M2 10h78" />
      <path d="M140 10h78" />
      <path d="M86 10c6-7 14-7 18 0-4 7-12 7-18 0Z" />
      <path d="M134 10c-6-7-14-7-18 0 4 7 12 7 18 0Z" />
      <path d="M110 3.5 116.5 10 110 16.5 103.5 10Z" fill="currentColor" fillOpacity="0.25" />
      <circle cx="80" cy="10" r="1.2" fill="currentColor" />
      <circle cx="140" cy="10" r="1.2" fill="currentColor" />
    </svg>
  )
}

export function Monogram({
  letters,
  className,
}: {
  letters: readonly [string, string]
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'font-display relative inline-flex items-center justify-center rounded-full border border-gold/70 italic',
        className,
      )}
    >
      <span className="absolute inset-[3px] rounded-full border border-gold/30" />
      {letters[0]}
      <span className="mx-[0.12em] text-[0.7em] not-italic text-gold">&amp;</span>
      {letters[1]}
    </span>
  )
}
