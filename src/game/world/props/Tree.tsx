import { useMemo } from 'react'
import { palette } from '../worldConfig'

interface TreeProps {
  position: [number, number, number]
  scale?: number
  foliageColor?: string
  trunkColor?: string
  seed?: number
}

/** Cylinder trunk + clustered low-poly foliage blobs. Reused for every tree in the world. */
export function Tree({
  position,
  scale = 1,
  foliageColor = palette.darkGreen,
  trunkColor = palette.wood,
  seed = 0,
}: TreeProps) {
  const blobs = useMemo(() => {
    const rand = mulberry32(seed)
    return [
      { pos: [0, 3.4, 0] as const, r: 2.1 },
      { pos: [1.1 + rand() * 0.4, 2.7, 0.4] as const, r: 1.4 },
      { pos: [-1.2 - rand() * 0.4, 2.6, -0.3] as const, r: 1.5 },
      { pos: [0.3, 2.2, -1.3 - rand() * 0.3] as const, r: 1.3 },
    ]
  }, [seed])

  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.22, 0.32, 2.2, 6]} />
        <meshStandardMaterial color={trunkColor} flatShading />
      </mesh>
      {blobs.map((b, i) => (
        <mesh key={i} castShadow position={b.pos as unknown as [number, number, number]}>
          <icosahedronGeometry args={[b.r, 0]} />
          <meshStandardMaterial color={foliageColor} flatShading />
        </mesh>
      ))}
    </group>
  )
}

function mulberry32(seed: number) {
  let a = seed + 0x6d2b79f5
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
