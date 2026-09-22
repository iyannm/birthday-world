import { useGameStore } from '../../state/gameStore'
import { birthdayConfig } from '../../config/birthday'

export function IntroScreen() {
  const phase = useGameStore((s) => s.phase)
  const enterWorld = useGameStore((s) => s.enterWorld)
  const visible = phase === 'intro'

  return (
    <div className={`intro-screen ${visible ? '' : 'hidden'}`}>
      <div className="intro-card">
        <p className="intro-title">{birthdayConfig.introSubtitle}</p>
        <button className="intro-button" onClick={enterWorld}>
          {birthdayConfig.enterButtonLabel}
        </button>
      </div>
    </div>
  )
}
