import { palette } from '../worldConfig'

interface FlowerArchProps {
  position: [number, number, number]
  rotationY?: number
}

const BLOOM_COLORS = [palette.pink, palette.lightPink, palette.gold, palette.lavender]

/** Half-torus arch trellis dotted with little blooms — used at the spawn dock and garden entrance. */
export function FlowerArch({ position, rotationY = 0 }: FlowerArchProps) {
  const blooms = Array.from({ length: 9 }).map((_, i) => {
    const t = i / 8
    const angle = Math.PI * t
    return {
      x: Math.cos(angle) * 1.15,
      y: 0.35 + Math.sin(angle) * 1.15,
      color: BLOOM_COLORS[i % BLOOM_COLORS.length],
    }
  })

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {[-1.15, 1.15].map((x) => (
        <mesh key={x} position={[x, 0.65, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.08, 1.3, 6]} />
          <meshStandardMaterial color={palette.wood} flatShading />
        </mesh>
      ))}
      <mesh position={[0, 1.5, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.15, 0.06, 6, 16, Math.PI]} />
        <meshStandardMaterial color={palette.wood} flatShading />
      </mesh>
      {blooms.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, 0]}>
          <icosahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial color={b.color} flatShading />
        </mesh>
      ))}
    </group>
  )
}
