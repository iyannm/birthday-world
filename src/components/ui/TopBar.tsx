import { totalMemories, useGameStore } from '../../state/gameStore'
import { Icon } from './Icon'
interface TopBarProps {
  onToggleMusic: () => void
  musicAvailable: boolean
}
export function TopBar({ onToggleMusic, musicAvailable }: TopBarProps) {
  const muted = useGameStore((s) => s.muted),
    openedCount = useGameStore((s) => s.openedMemories.size)
  const toggleMemoriesPanel = useGameStore((s) => s.toggleMemoriesPanel)
  return (
    <>
      <div className="hud-top">
        <div className="hud-title">
          <Icon name="heart" size={17} />
          <span>Birthday World</span>
        </div>
        <div className="hud-top-right">
          <button
            className="memories-count"
            onClick={() => toggleMemoriesPanel(true)}
            aria-label={`View memories, ${openedCount} of ${totalMemories} discovered`}
          >
            <Icon name="photos" size={18} />
            <span className="memories-label">Memories</span>
            <span>
              {openedCount}
              <span className="count-divider"> / </span>
              {totalMemories}
            </span>
          </button>
          {musicAvailable && (
            <button
              className="hud-icon-btn"
              onClick={onToggleMusic}
              aria-label={muted ? 'Unmute music' : 'Mute music'}
            >
              <Icon name={muted ? 'muted' : 'sound'} />
            </button>
          )}
        </div>
      </div>
      <div className="trail-hint">
        <span className="hint-dot" />
        Follow the lanterns<span className="desktop-hint"> · WASD to walk · Drag to look</span>
      </div>
    </>
  )
}
