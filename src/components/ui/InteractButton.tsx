import { useGameStore } from '../../state/gameStore'
import { Icon } from './Icon'
export function InteractButton() {
  const nearby = useGameStore((s) => s.nearbyInteraction),
    triggerInteraction = useGameStore((s) => s.triggerInteraction)
  return (
    <div className="interact-zone">
      <div className={`interact-hint ${nearby ? 'visible' : ''}`} aria-live="polite">
        {nearby?.label.replace(/^❤️\s*/, '')}
      </div>
      <button
        className={`heart-button ${nearby ? 'active' : ''}`}
        onClick={() => triggerInteraction()}
        disabled={!nearby}
        aria-label={nearby?.label ?? 'Move closer to interact'}
      >
        <Icon name="heart" size={30} />
      </button>
      <span className="control-caption">{nearby ? 'Tap to discover' : 'Explore'}</span>
    </div>
  )
}
