import { useGameStore } from '../../state/gameStore'
import { birthdayConfig } from '../../config/birthday'
import { Icon } from './Icon'
export function IntroScreen() {
  const phase = useGameStore((s) => s.phase),
    enterWorld = useGameStore((s) => s.enterWorld)
  return (
    <div className={`intro-screen ${phase === 'intro' ? '' : 'hidden'}`} aria-hidden={phase !== 'intro'}>
      <div className="intro-card">
        <span className="eyebrow">A BIRTHDAY ADVENTURE</span>
        <div className="invitation-seal">
          <Icon name="heart" size={40} />
          <span>made with love</span>
        </div>
        <h1 className="intro-title">{birthdayConfig.introTitle}</h1>
        <p className="intro-description">
          A garden of memories, a little magic,
          <br />
          and a whole day to celebrate you.
        </p>
        <button className="intro-button" onClick={enterWorld} tabIndex={phase === 'intro' ? 0 : -1}>
          {birthdayConfig.enterButtonLabel}
          <Icon name="arrow" size={18} />
        </button>
        <span className="intro-footnote">Take your time. Follow the lanterns.</span>
      </div>
    </div>
  )
}
