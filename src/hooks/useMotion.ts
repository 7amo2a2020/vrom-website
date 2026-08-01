import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

/**
 * Whether the visitor asked for less motion.
 *
 * Every scroll-driven scene reads this and jumps straight to its finished
 * state — filled selectors, lit parts, visible payoff — rather than showing
 * less. Reduced motion must never mean reduced content.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * A live media query.
 *
 * Reading `window.innerWidth` during render looks equivalent and is not: it is
 * sampled once and never corrected, so a section keeps whichever height the
 * first paint happened to pick. This re-renders when the query flips.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (notify: () => void) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', notify)
      // `resize` as well as the query's own event: the MediaQueryList change
      // does not fire in every environment (device emulation, some embedded
      // webviews), and a viewport that resizes without re-reading the query
      // keeps whichever layout it started in.
      window.addEventListener('resize', notify, { passive: true })
      return () => {
        mq.removeEventListener('change', notify)
        window.removeEventListener('resize', notify)
      }
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Below this the layout drops the decorative extras and shortens the scene. */
export const NARROW = '(max-width: 759px)'

/**
 * One rAF-throttled scroll/resize subscription for the whole page.
 *
 * Every scene measures inside the same frame instead of each adding its own
 * listener. The pending frame is cancelled and re-scheduled rather than left
 * outstanding, and a `visibilitychange` clears it — a frame requested while the
 * tab was hidden never fires, and without the reset the scene would freeze at
 * whatever it last measured.
 */
export function useFrameLoop(measure: () => void) {
  const cb = useRef(measure)
  cb.current = measure

  useEffect(() => {
    let raf = 0
    const schedule = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        raf = 0
        cb.current()
      })
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    document.addEventListener('visibilitychange', schedule)
    schedule()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      document.removeEventListener('visibilitychange', schedule)
    }
  }, [])
}

/**
 * How far through a tall section the page has scrolled, 0 → 1.
 *
 * The section is taller than the viewport and its child is sticky, so this is
 * the fraction of the extra height consumed — which is what drives the
 * compatibility scene frame by frame.
 */
export function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion()
  const [progress, setProgress] = useState(reduced ? 1 : 0)

  useFrameLoop(() => {
    if (reduced) {
      setProgress(1)
      return
    }
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const travel = rect.height - window.innerHeight
    const next =
      travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0
    // A repaint per sub-pixel is wasted work; the eye can't see it either.
    setProgress((prev) => (Math.abs(next - prev) > 0.003 ? next : prev))
  })

  return progress
}

/** Maps a slice of overall progress onto its own 0 → 1 ramp. */
export function ramp(progress: number, from: number, to: number): number {
  return Math.min(1, Math.max(0, (progress - from) / (to - from)))
}

/**
 * Reveals `[data-reveal]` elements once, as they come into view.
 *
 * The hidden state is set here rather than in CSS: if this never runs — no JS,
 * an old browser, a thrown error — the page is simply fully visible.
 */
export function useReveal() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    )
    if (!nodes.length || !('IntersectionObserver' in window)) return

    for (const el of nodes) el.dataset.revealHidden = 'true'

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          const order = Number(el.dataset.reveal) || 0
          el.style.transitionDelay = `${order * 90}ms`
          el.dataset.revealHidden = 'false'
          io.unobserve(el)
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    )

    for (const el of nodes) io.observe(el)
    return () => io.disconnect()
  }, [reduced])
}

/**
 * Shrinks a fixed-height scene so it fits the viewport instead of being clipped.
 *
 * The compatibility scene has a near-constant natural height, so on a short
 * phone the payoff line fell below the fold no matter how much was trimmed.
 * Scaling is a `transform`, so it costs no layout and desktop — where the scene
 * already fits — stays untouched at 1.
 */
export function useFitScale(
  ref: React.RefObject<HTMLElement | null>,
  available: () => number,
) {
  const reduced = useReducedMotion()
  const [scale, setScale] = useState(1)

  useFrameLoop(() => {
    const el = ref.current
    if (!el) return
    const content = el.scrollHeight
    const room = available()
    const next = content > room ? Math.max(0.7, room / content) : 1
    setScale((prev) => (Math.abs(next - prev) > 0.01 ? next : prev))
  })

  return reduced ? Math.min(scale, 1) : scale
}
