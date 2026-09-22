import { Bench } from '../props/Bench'
import { Envelope } from '../props/Envelope'
import { FlowerPatch } from '../props/FlowerPatch'
import { Lamp } from '../props/Lamp'
import { WorldSign } from '../props/WorldSign'
import { birthdayConfig } from '../../../config/birthday'
import { heightAt, palette, zonePositions } from '../worldConfig'

export function LetterHill() {
  const [x, , z] = zonePositions.letterHill
  const y = heightAt(x, z)

  return (
    <group position={[x, y, z]}>
      <WorldSign position={[-4, 0, 3]} title={birthdayConfig.letterHillLabel} subtitle="Read Letter" />

      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[4.4, 18]} />
        <meshStandardMaterial color={palette.pathStone} flatShading />
      </mesh>

      <Envelope position={[0, 0.6, 0]} scale={1.4} />

      <Bench position={[-3, 0, -1.5]} rotation={Math.PI / 4} />
      <Bench position={[3, 0, -1.5]} rotation={-Math.PI / 4} />

      <FlowerPatch center={[-3, 3]} y={y} count={16} radius={2.2} />
      <FlowerPatch center={[3, 3]} y={y} count={16} radius={2.2} />

      <Lamp position={[-4, 0, 0]} />
      <Lamp position={[4, 0, 0]} />
    </group>
  )
}
