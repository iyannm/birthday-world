import { Bench } from '../props/Bench'
import { FlowerPatch } from '../props/FlowerPatch'
import { Lamp } from '../props/Lamp'
import { WorldSign } from '../props/WorldSign'
import { birthdayConfig } from '../../../config/birthday'
import { heightAt, palette, zonePositions } from '../worldConfig'

function Telescope() {
  return (
    <group position={[2.6, 0, -1.5]} rotation={[0, -0.6, 0]}>
      {[-0.3, 0.3].map((x) =>
        [-0.3, 0.3].map((zOff) => (
          <mesh key={`${x}-${zOff}`} position={[x, 0.5, zOff]} rotation={[0.15 * Math.sign(zOff || 1), 0, 0.15 * Math.sign(x || 1)]}>
            <cylinderGeometry args={[0.03, 0.03, 1, 5]} />
            <meshStandardMaterial color={palette.wood} flatShading />
          </mesh>
        )),
      )}
      <mesh position={[0, 1.05, 0]} rotation={[0, 0, -0.5]} castShadow>
        <cylinderGeometry args={[0.09, 0.13, 1.1, 8]} />
        <meshStandardMaterial color={palette.rock} flatShading />
      </mesh>
    </group>
  )
}

function Pavilion() {
  const posts: [number, number][] = [
    [-2.4, -2.4],
    [2.4, -2.4],
    [-2.4, 2.4],
    [2.4, 2.4],
  ]
  return (
    <group position={[-3, 0, 1]}>
      {posts.map((p, i) => (
        <mesh key={i} position={[p[0], 1.3, p[1]]} castShadow>
          <cylinderGeometry args={[0.09, 0.1, 2.6, 6]} />
          <meshStandardMaterial color={palette.wood} flatShading />
        </mesh>
      ))}
      <mesh position={[0, 2.7, 0]} castShadow>
        <coneGeometry args={[3.6, 1.3, 4]} />
        <meshStandardMaterial color={palette.pink} flatShading />
      </mesh>
    </group>
  )
}

export function FinaleLookout() {
  const [x, , z] = zonePositions.finaleLookout
  const y = heightAt(x, z)

  return (
    <group position={[x, y, z]}>
      <WorldSign position={[0, 0.4, 5.5]} title={birthdayConfig.finaleLookoutLabel} subtitle="Watch the Sky" />

      {/* lookout deck */}
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[10, 0.3, 9]} />
        <meshStandardMaterial color={palette.wood} flatShading />
      </mesh>

      {/* railings */}
      {[-4.9, 4.9].map((rx) => (
        <mesh key={rx} position={[rx, 0.8, 0]} castShadow>
          <boxGeometry args={[0.12, 0.9, 9]} />
          <meshStandardMaterial color={palette.cream} flatShading />
        </mesh>
      ))}
      <mesh position={[0, 0.8, -4.4]} castShadow>
        <boxGeometry args={[10, 0.9, 0.12]} />
        <meshStandardMaterial color={palette.cream} flatShading />
      </mesh>

      <Pavilion />
      <Telescope />

      <Bench position={[0, 0.25, 3.2]} rotation={0} />
      <Bench position={[-3.5, 0.25, 3.4]} rotation={0.3} />

      <FlowerPatch center={[x + 4, z + 3.5]} y={y + 0.25} count={16} radius={2} />

      <Lamp position={[-4.6, 0.25, -3.8]} withLight />
      <Lamp position={[4.6, 0.25, -3.8]} withLight />
    </group>
  )
}
