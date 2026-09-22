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
import { bridgePositions, waterFeatures } from './worldConfig'

/** Everything that makes up the persistent 3D world (terrain, paths, water,
 * bridges, ambient decoration, and the seven named zones). */
export function World() {
  return (
    <group>
      <Lighting />
      <Ground />
      <PathNetwork />

      {waterFeatures.map((w, i) => (
        <Water key={i} {...w} />
      ))}
      {bridgePositions.map((b, i) => (
        <Bridge key={i} {...b} />
      ))}

      <AmbientDecor />

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
