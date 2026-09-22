import { useGameStore } from '../../state/gameStore'
import { birthdayConfig } from '../../config/birthday'

export function FinaleOverlay() {
  const finaleActive = useGameStore((s) => s.finaleActive)
  const exploreAgain = useGameStore((s) => s.exploreAgain)

  if (!finaleActive) return null

  return (
    <div className="finale-overlay">
      <div className="finale-text">
        <h2>{birthdayConfig.finaleTitle}</h2>
        <p>{birthdayConfig.finalMessage}</p>
      </div>
      <button className="finale-button" onClick={exploreAgain}>
        {birthdayConfig.exploreAgainLabel}
      </button>
    </div>
  )
}
