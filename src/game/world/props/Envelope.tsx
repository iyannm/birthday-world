import { palette } from '../worldConfig'

interface EnvelopeProps {
  position: [number, number, number]
  scale?: number
  rotationY?: number
}

/** Stylized envelope built from boxes + triangles, marking Letter Hill. */
export function Envelope({ position, scale = 1, rotationY = 0 }: EnvelopeProps) {
  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.6, 0.08, 1.1]} />
        <meshStandardMaterial color={palette.cream} flatShading />
      </mesh>
      <mesh position={[0, 0.28, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[0.78, 0.5, 4]} />
        <meshStandardMaterial color={palette.pink} flatShading />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <octahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial color={palette.gold} emissive={palette.gold} emissiveIntensity={0.6} flatShading />
      </mesh>
    </group>
  )
}
