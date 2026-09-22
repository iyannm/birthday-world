import { totalMemories, useGameStore } from '../../state/gameStore'

interface TopBarProps {
  onToggleMusic: () => void
  musicAvailable: boolean
}

export function TopBar({ onToggleMusic, musicAvailable }: TopBarProps) {
  const muted = useGameStore((s) => s.muted)
  const openedCount = useGameStore((s) => s.openedMemories.size)
  const toggleMemoriesPanel = useGameStore((s) => s.toggleMemoriesPanel)

  return (
    <div className="hud-top">
      <div className="hud-title">Birthday World ❤️</div>
      <div className="hud-top-right">
        <div className="memories-count">
          Memories {openedCount} / {totalMemories}
        </div>
        {musicAvailable && (
          <button className="hud-icon-btn" onClick={onToggleMusic} aria-label="Toggle music">
            {muted ? '🔇' : '🔊'}
          </button>
        )}
        <button className="hud-icon-btn" onClick={() => toggleMemoriesPanel(true)} aria-label="View memories">
          🖼
        </button>
      </div>
    </div>
  )
}
