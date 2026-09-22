import { palette } from '../worldConfig'

interface PresentProps {
  position: [number, number, number]
  color?: string
  ribbonColor?: string
  scale?: number
  rotationY?: number
}

/** Box + ribbon present. */
export function Present({
  position,
  color = palette.lavender,
  ribbonColor = palette.gold,
  scale = 1,
  rotationY = 0,
}: PresentProps) {
  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.86, 0.16, 0.16]} />
        <meshStandardMaterial color={ribbonColor} flatShading />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.16, 0.16, 0.86]} />
        <meshStandardMaterial color={ribbonColor} flatShading />
      </mesh>
      <mesh position={[0, 0.44, 0]}>
        <torusGeometry args={[0.13, 0.045, 6, 10]} />
        <meshStandardMaterial color={ribbonColor} flatShading />
      </mesh>
    </group>
  )
}
