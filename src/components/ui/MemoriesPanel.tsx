import { memories } from '../../data/memories'
import { useGameStore } from '../../state/gameStore'

export function MemoriesPanel() {
  const open = useGameStore((s) => s.memoriesPanelOpen)
  const close = useGameStore((s) => s.toggleMemoriesPanel)
  const opened = useGameStore((s) => s.openedMemories)
  const openMemory = useGameStore((s) => s.openMemory)

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={() => close(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => close(false)} aria-label="Close">
          ✕
        </button>
        <h2 className="wish-title">Memories</h2>
        <div className="memories-panel-list">
          {memories.map((m) => {
            const isOpened = opened.has(m.id)
            return (
              <button
                key={m.id}
                className={`memories-panel-item ${isOpened ? 'opened' : ''}`}
                onClick={() => {
                  if (isOpened) openMemory(m.id)
                }}
                aria-label={isOpened ? m.caption : 'Not yet discovered'}
              >
                {isOpened ? '❤' : '?'}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
