import { useState } from 'react'
import { memories } from '../../data/memories'
import { useGameStore } from '../../state/gameStore'

function MemoryPhoto({ src, caption }: { src: string; caption: string }) {
  const [broken, setBroken] = useState(false)

  return broken ? (
    <div className="memory-photo-placeholder">❤</div>
  ) : (
    <img className="memory-photo" src={src} alt={caption} onError={() => setBroken(true)} />
  )
}

export function MemoryModal() {
  const activeMemoryId = useGameStore((s) => s.activeMemoryId)
  const closeMemory = useGameStore((s) => s.closeMemory)
  const devUrl = useGameStore((s) => (activeMemoryId ? s.devPhotoUrls[activeMemoryId] : undefined))
  if (!activeMemoryId) return null
  const memory = memories.find((m) => m.id === activeMemoryId)
  if (!memory) return null

  const src = devUrl ?? memory.image

  return (
    <div className="modal-overlay" onClick={closeMemory}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeMemory} aria-label="Close">
          ✕
        </button>
        <MemoryPhoto key={src} src={src} caption={memory.caption} />
        <p className="memory-caption">{memory.caption}</p>
      </div>
    </div>
  )
}
