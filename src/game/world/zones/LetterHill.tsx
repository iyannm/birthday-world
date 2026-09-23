import { Tree } from '../props/Tree'
import { Rock } from '../props/Rock'
import { Clearing } from '../props/Clearing'
import { Bench } from '../props/Bench'
import { Envelope } from '../props/Envelope'
import { FlowerPatch } from '../props/FlowerPatch'
import { Lamp } from '../props/Lamp'
import { WorldSign } from '../props/WorldSign'
import { birthdayConfig } from '../../../config/birthday'
import { heightAt, zonePositions } from '../worldConfig'

export function LetterHill() {
  const [x, , z] = zonePositions.letterHill
  const y = heightAt(x, z)

  return (
    <group position={[x, y, z]}>
      <WorldSign position={[-4, 0, 3]} title={birthdayConfig.letterHillLabel} subtitle="Read Letter" />

      <Clearing origin={[x, z]} radius={5.4} />

      <Tree position={[-7, heightAt(x - 7, z - 5) - y, -5]} scale={1.25} foliageColor="#849C8C" seed={33} />
      <Tree position={[7, heightAt(x + 7, z - 7) - y, -7]} scale={1.5} foliageColor="#9BAD91" seed={34} />
      <Rock position={[-5, heightAt(x - 5, z - 5) - y, -5]} scale={0.8} />
      <Envelope position={[0, 0.9, 0]} scale={1.4} />

      <Bench position={[-3, 0, -1.5]} rotation={Math.PI / 4} />
      <Bench position={[3, 0, -1.5]} rotation={-Math.PI / 4} />

      <FlowerPatch center={[-3, 3]} count={16} radius={2.2} />
      <FlowerPatch center={[3, 3]} count={16} radius={2.2} />

      <Lamp position={[-4, 0, 0]} />
      <Lamp position={[4, 0, 0]} />
    </group>
  )
}
