import { palette } from '../worldConfig'

interface RockProps {
  position: [number, number, number]
  scale?: number
  rotation?: number
}

/** Low-poly irregular rock (a squashed, rotated dodecahedron reads as "irregular" for free). */
export function Rock({ position, scale = 1, rotation = 0 }: RockProps) {
  return (
    <mesh
      position={position}
      rotation={[0.3, rotation, 0.15]}
      scale={[scale * 1.1, scale * 0.75, scale * 0.9]}
      castShadow
      receiveShadow
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={palette.rock} flatShading />
    </mesh>
  )
}
