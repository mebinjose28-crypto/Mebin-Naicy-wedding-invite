import { useEffect, useRef } from 'react'

import { prefersReducedMotion } from '@/lib/use-in-view'

type Flake = {
  x: number
  y: number
  r: number
  vy: number
  sway: number
  phase: number
  spin: number
  angle: number
  alpha: number
  color: string
  crystal: boolean
}

const COLORS = ['214,184,120', '216,183,178', '255,252,244']

/**
 * Sparse, slow snowflakes drawn on one canvas. Pauses when the tab is hidden
 * and is skipped entirely for guests who prefer reduced motion.
 */
export function Snowfall({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active || prefersReducedMotion()) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let frame = 0
    let last = performance.now()
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const flakes: Flake[] = []

    const make = (initial: boolean): Flake => {
      const crystal = Math.random() < 0.35
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : -12,
        r: crystal ? 3 + Math.random() * 3 : 1 + Math.random() * 1.8,
        vy: 12 + Math.random() * 18,
        sway: 6 + Math.random() * 14,
        phase: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.6,
        angle: Math.random() * Math.PI,
        alpha: 0.35 + Math.random() * 0.45,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        crystal,
      }
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = width < 640 ? 20 : 38
      while (flakes.length < target) flakes.push(make(true))
      flakes.length = target
    }

    const drawCrystal = (f: Flake) => {
      ctx.save()
      ctx.translate(f.x, f.y)
      ctx.rotate(f.angle)
      ctx.strokeStyle = `rgba(${f.color},${f.alpha})`
      ctx.lineWidth = 0.8
      ctx.beginPath()
      for (let i = 0; i < 3; i++) {
        ctx.rotate(Math.PI / 3)
        ctx.moveTo(-f.r, 0)
        ctx.lineTo(f.r, 0)
        ctx.moveTo(f.r * 0.55, 0)
        ctx.lineTo(f.r * 0.8, f.r * 0.25)
        ctx.moveTo(f.r * 0.55, 0)
        ctx.lineTo(f.r * 0.8, -f.r * 0.25)
      }
      ctx.stroke()
      ctx.restore()
    }

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      ctx.clearRect(0, 0, width, height)
      for (const f of flakes) {
        f.phase += dt * 0.8
        f.y += f.vy * dt
        f.x += Math.sin(f.phase) * f.sway * dt
        f.angle += f.spin * dt
        if (f.y > height + 12) Object.assign(f, make(false))
        if (f.crystal) {
          drawCrystal(f)
        } else {
          ctx.fillStyle = `rgba(${f.color},${f.alpha})`
          ctx.beginPath()
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      frame = requestAnimationFrame(loop)
    }

    const onVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden) {
        last = performance.now()
        frame = requestAnimationFrame(loop)
      }
    }

    resize()
    frame = requestAnimationFrame(loop)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-[2000ms]"
      style={{ opacity: active ? 1 : 0 }}
    />
  )
}
