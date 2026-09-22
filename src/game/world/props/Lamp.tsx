import { palette } from '../worldConfig'

interface LampProps {
  position: [number, number, number]
  color?: string
  height?: number
  /** Real-time point light is expensive — only enable for a few hero lamps. */
  withLight?: boolean
}

/** Simple post lamp / lantern: pole + glowing emissive orb. */
export function Lamp({ position, color = palette.gold, height = 2.4, withLight = false }: LampProps) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, height, 6]} />
        <meshStandardMaterial color={palette.wood} flatShading />
      </mesh>
      <mesh position={[0, height + 0.15, 0]}>
        <icosahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} flatShading />
      </mesh>
      {withLight && (
        <pointLight position={[0, height + 0.15, 0]} color={color} intensity={2.2} distance={9} decay={2} />
      )}
    </group>
  )
}
