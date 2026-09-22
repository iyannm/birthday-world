import { useState } from 'react'
import { memories } from '../../data/memories'
import { useGameStore } from '../../state/gameStore'

export function MemoryModal() {
  const activeMemoryId = useGameStore((s) => s.activeMemoryId)
  const closeMemory = useGameStore((s) => s.closeMemory)
  const devUrl = useGameStore((s) => (activeMemoryId ? s.devPhotoUrls[activeMemoryId] : undefined))
  const [broken, setBroken] = useState(false)

  if (!activeMemoryId) return null
  const memory = memories.find((m) => m.id === activeMemoryId)
  if (!memory) return null

  const src = devUrl ?? memory.image
  const showPlaceholder = broken || !src

  return (
    <div className="modal-overlay" onClick={closeMemory}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeMemory} aria-label="Close">
          ✕
        </button>
        {showPlaceholder ? (
          <div className="memory-photo-placeholder">❤</div>
        ) : (
          <img className="memory-photo" src={src} alt={memory.caption} onError={() => setBroken(true)} />
        )}
        <p className="memory-caption">{memory.caption}</p>
      </div>
    </div>
  )
}
