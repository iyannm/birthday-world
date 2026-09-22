import { FlowerPatch } from '../props/FlowerPatch'
import { Lamp } from '../props/Lamp'
import { PolaroidFrame } from '../props/PolaroidFrame'
import { WorldSign } from '../props/WorldSign'
import { memories } from '../../../data/memories'
import { useGameStore } from '../../../state/gameStore'
import { palette } from '../worldConfig'

export function MemoryTrail() {
  const devPhotoUrls = useGameStore((s) => s.devPhotoUrls)

  return (
    <group>
      <WorldSign position={[-46, memories[0].location[1] + 1, 44]} title="Memory Trail" subtitle="A few favorites" rotation={0.5} />
      {memories.map((m, i) => {
        const [x, y, z] = m.location
        const faceZ = z < 0 ? -1 : 1
        return (
          <group key={m.id} position={[x, y, z]}>
            <mesh position={[0, 1.1, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.08, 2.2, 6]} />
              <meshStandardMaterial color={palette.wood} flatShading />
            </mesh>
            <PolaroidFrame
              id={m.id}
              position={[0, 2.15, 0.12 * faceZ]}
              rotation={[0, faceZ > 0 ? 0 : Math.PI, 0]}
              image={devPhotoUrls[m.id] ?? m.image}
            />
            <FlowerPatch center={[x, z]} y={y} count={12} radius={1.6} />
            {i % 2 === 0 && <Lamp position={[1.4, y, 0.4]} />}
          </group>
        )
      })}
    </group>
  )
}
