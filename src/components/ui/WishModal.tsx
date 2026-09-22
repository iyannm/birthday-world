import { useState } from 'react'
import { useGameStore } from '../../state/gameStore'
import { birthdayConfig } from '../../config/birthday'

export function WishModal() {
  const open = useGameStore((s) => s.wishModalOpen)
  const close = useGameStore((s) => s.toggleWishModal)
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!open) return null

  const handleClose = () => {
    close(false)
    setTimeout(() => {
      setText('')
      setSubmitted(false)
    }, 300)
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose} aria-label="Close">
          ✕
        </button>
        <h2 className="wish-title">{birthdayConfig.wishPromptTitle}</h2>
        {submitted ? (
          <p className="wish-thanks">{birthdayConfig.wishThankYou}</p>
        ) : (
          <>
            <textarea
              className="wish-input"
              placeholder={birthdayConfig.wishPlaceholder}
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={200}
            />
            <button className="wish-submit" onClick={() => setSubmitted(true)}>
              {birthdayConfig.wishButtonLabel}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
