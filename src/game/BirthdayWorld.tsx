import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import type { Group } from 'three'
import { World } from './world/World'
import { Player } from './Player'
import { CameraRig } from './Camera'
import { FinaleFireworks } from './FinaleFireworks'
import { FinaleSky } from './FinaleSky'
import { DebugStats } from './DebugStats'
import { useJoystick } from '../hooks/useJoystick'
import { useKeyboard } from '../hooks/useKeyboard'
import { useDebugFlag } from '../hooks/useDebugFlag'
import { useAudio } from '../hooks/useAudio'
import { useDevPhotos } from '../hooks/useDevPhotos'
import { useGameStore } from '../state/gameStore'
import { LoadingScreen } from '../components/ui/LoadingScreen'
import { IntroScreen } from '../components/ui/IntroScreen'
import { TopBar } from '../components/ui/TopBar'
import { Joystick } from '../components/ui/Joystick'
import { InteractButton } from '../components/ui/InteractButton'
import { CameraDragLayer } from '../components/ui/CameraDragLayer'
import { MemoryModal } from '../components/ui/MemoryModal'
import { WishModal } from '../components/ui/WishModal'
import { LetterModal } from '../components/ui/LetterModal'
import { MemoriesPanel } from '../components/ui/MemoriesPanel'
import { FinaleOverlay } from '../components/ui/FinaleOverlay'
import { DebugOverlay } from '../components/ui/DebugOverlay'

export function BirthdayWorld() {
  const playerRef = useRef<Group>(null)
  const debugDomRef = useRef<HTMLDivElement>(null)
  const joystick = useJoystick()
  const keyboard = useKeyboard()
  const debug = useDebugFlag()
  const { musicAvailable, toggleMusic } = useAudio()
  const { entries: devPhotoEntries } = useDevPhotos()
  const setDevPhotoUrl = useGameStore((s) => s.setDevPhotoUrl)

  useEffect(() => {
    for (const [id, entry] of Object.entries(devPhotoEntries)) setDevPhotoUrl(id, entry.url)
  }, [devPhotoEntries, setDevPhotoUrl])

  const phase = useGameStore((s) => s.phase)
  const anyModalOpen = useGameStore(
    (s) => !!s.activeMemoryId || s.wishModalOpen || s.letterModalOpen || s.memoriesPanelOpen,
  )
  const paused = phase !== 'playing' || anyModalOpen
  const showControls = phase === 'playing'

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ fov: 50, near: 0.1, far: 400, position: [0, 11, 220] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#F1E8DB']} />
        <fog attach="fog" args={['#F1E8DB', 48, 165]} />
        <World />
        <Player joystick={joystick.vector} keyboard={keyboard} playerRef={playerRef} paused={paused} />
        <CameraRig playerRef={playerRef} />
        <FinaleSky />
        <FinaleFireworks />
        {debug && <DebugStats playerRef={playerRef} domRef={debugDomRef} />}
      </Canvas>

      <LoadingScreen />
      <IntroScreen />

      {showControls && (
        <>
          <CameraDragLayer />
          <div className="hud">
            <TopBar onToggleMusic={toggleMusic} musicAvailable={musicAvailable} />
            <Joystick joystick={joystick} />
            <InteractButton />
          </div>
        </>
      )}

      <MemoryModal />
      <WishModal />
      <LetterModal />
      <MemoriesPanel />
      <FinaleOverlay />

      {debug && <DebugOverlay ref={debugDomRef} />}
    </div>
  )
}
