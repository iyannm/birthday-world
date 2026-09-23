import { AmbientDecor } from './AmbientDecor'
import { Lighting } from './Lighting'
import { Bridge } from './props/Bridge'
import { Ground } from './props/Ground'
import { PathNetwork } from './props/PathNetwork'
import { Water } from './props/Water'
import { BirthdayPlaza } from './zones/BirthdayPlaza'
import { FinaleLookout } from './zones/FinaleLookout'
import { LetterHill } from './zones/LetterHill'
import { MemoryTrail } from './zones/MemoryTrail'
import { MemoryTree } from './zones/MemoryTree'
import { SpawnArea } from './zones/SpawnArea'
import { WelcomeGarden } from './zones/WelcomeGarden'
import { WishingTree } from './zones/WishingTree'
import { trails } from './trailLayout'
import { Wayfinding } from './Wayfinding'

// Crossings use the same centerline and tangent as the trail; no detached bridges.
const crossings = [2, 3, 5, 6, 7].map((route) => {
  const p = trails[route][Math.floor(trails[route].length * 0.52)]
  return { position: [p.x, p.z] as [number, number], rotation: Math.atan2(p.nz, -p.nx) }
})

/** Everything that makes up the persistent 3D world (terrain, paths, water,
 * bridges, ambient decoration, and the seven named zones). */
export function World() {
  return (
    <group>
      <Lighting />
      <Ground />
      <PathNetwork />

      <Water position={[0, 109]} width={11} length={9} rotation={0} />
      {crossings.map((b, i) => (
        <group key={i}>
          <Water position={b.position} rotation={b.rotation + Math.PI / 2} width={6} length={15} />
          <Bridge {...b} length={7.2} />
        </group>
      ))}

      <AmbientDecor />
      <Wayfinding />

      <SpawnArea />
      <WelcomeGarden />
      <BirthdayPlaza />
      <MemoryTree />
      <MemoryTrail />
      <WishingTree />
      <LetterHill />
      <FinaleLookout />
    </group>
  )
}
