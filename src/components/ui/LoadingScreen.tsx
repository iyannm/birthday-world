import { useEffect, useState } from 'react'
import { useGameStore } from '../../state/gameStore'

/** Simple timed loading screen — the world is procedural so there's little to actually
 * wait on, but a short polished loading beat feels a lot better than an instant cut. */
export function LoadingScreen() {
  const phase = useGameStore((s) => s.phase)
  const finishLoading = useGameStore((s) => s.finishLoading)
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let raf: number
    const start = performance.now()
    const DURATION = 1100

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION)
      setProgress(p)
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setFading(true)
        setTimeout(finishLoading, 450)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [finishLoading])

  if (phase !== 'loading' && !fading) return null

  return (
    <div className={`loading-screen ${fading ? 'fading' : ''}`}>
      <div className="loading-heart">❤️</div>
      <div className="loading-text">Preparing your little world...</div>
      <div className="loading-bar-track">
        <div className="loading-bar-fill" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  )
}
