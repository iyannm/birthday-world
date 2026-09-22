import { useGameStore } from '../../state/gameStore'
import { birthdayConfig } from '../../config/birthday'

export function LetterModal() {
  const open = useGameStore((s) => s.letterModalOpen)
  const close = useGameStore((s) => s.toggleLetterModal)

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={() => close(false)}>
      <div className="modal-card letter-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => close(false)} aria-label="Close">
          ✕
        </button>
        <h2 className="letter-title">{birthdayConfig.letterTitle}</h2>
        <p className="letter-body">{birthdayConfig.letter}</p>
      </div>
    </div>
  )
}
