import { useGameStore } from '../../state/gameStore'

export function InteractButton() {
  const nearby = useGameStore((s) => s.nearbyInteraction)
  const triggerInteraction = useGameStore((s) => s.triggerInteraction)

  return (
    <div className="interact-zone">
      <div className={`interact-hint ${nearby ? 'visible' : ''}`}>{nearby ? `❤️ ${nearby.label}` : ''}</div>
      <button
        className={`heart-button ${nearby ? 'active' : ''}`}
        onClick={() => triggerInteraction()}
        aria-label="Interact"
      >
        ❤
      </button>
    </div>
  )
}
