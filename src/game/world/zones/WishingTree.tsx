import { FloatingParticles } from '../props/FloatingParticles'
import { Tree } from '../props/Tree'
import { WorldSign } from '../props/WorldSign'
import { birthdayConfig } from '../../../config/birthday'
import { heightAt, palette, zonePositions } from '../worldConfig'

const CARD_POSITIONS: [number, number, number][] = [
  [2.4, 3.6, 1.6],
  [-2.6, 3.3, 1.1],
  [1.6, 3, -2.2],
  [-1.8, 3.5, -1.8],
  [0, 4, 2.6],
]

export function WishingTree() {
  const [x, , z] = zonePositions.wishingTree
  const y = heightAt(x, z)

  return (
    <group position={[x, y, z]}>
      <WorldSign position={[0, 0, 4.2]} title={birthdayConfig.wishingTreeLabel} subtitle={birthdayConfig.wishPromptTitle} />

      {/* circular platform */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[5.2, 20]} />
        <meshStandardMaterial color={palette.pathStone} flatShading />
      </mesh>

      <Tree position={[0, 0, 0]} scale={1.6} foliageColor={palette.lightPink} trunkColor={palette.wood} seed={7} />
      <pointLight position={[0, 4, 0]} color={palette.lavender} intensity={1.6} distance={10} decay={2} />

      {CARD_POSITIONS.map((p, i) => (
        <group key={i} position={p} rotation={[0, i * 0.9, 0]}>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.8, 3]} />
            <meshBasicMaterial color={palette.wood} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.45, 0.32, 0.02]} />
            <meshStandardMaterial color={palette.cream} flatShading />
          </mesh>
          <mesh position={[0, 0, 0.012]}>
            <octahedronGeometry args={[0.05, 0]} />
            <meshStandardMaterial color={palette.pink} emissive={palette.pink} emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}

      <FloatingParticles center={[0, 0]} count={14} radius={4.5} baseY={2} height={3} color={palette.gold} size={0.08} />
    </group>
  )
}
