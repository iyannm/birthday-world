import { palette } from '../worldConfig'

interface BenchProps {
  position: [number, number, number]
  rotation?: number
}

export function Bench({ position, rotation = 0 }: BenchProps) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.32, 0]} castShadow>
        <boxGeometry args={[1.4, 0.1, 0.5]} />
        <meshStandardMaterial color={palette.wood} flatShading />
      </mesh>
      <mesh position={[0, 0.62, -0.22]} castShadow>
        <boxGeometry args={[1.4, 0.5, 0.08]} />
        <meshStandardMaterial color={palette.wood} flatShading />
      </mesh>
      {[-0.6, 0.6].map((x) => (
        <mesh key={x} position={[x, 0.16, 0]}>
          <boxGeometry args={[0.1, 0.32, 0.46]} />
          <meshStandardMaterial color={palette.darkGreen} flatShading />
        </mesh>
      ))}
    </group>
  )
}
