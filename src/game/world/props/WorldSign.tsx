import { Text } from '@react-three/drei'
import { palette } from '../worldConfig'

interface WorldSignProps {
  position: [number, number, number]
  title: string
  subtitle?: string
  rotation?: number
}

/** Wooden signpost with a title + optional subtitle, used at every zone entrance. */
export function WorldSign({ position, title, subtitle, rotation = 0 }: WorldSignProps) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 1.8, 6]} />
        <meshStandardMaterial color={palette.wood} flatShading />
      </mesh>
      <mesh position={[0, 1.75, 0.04]} castShadow>
        <boxGeometry args={[1.7, 0.55, 0.08]} />
        <meshStandardMaterial color={palette.cream} flatShading />
      </mesh>
      <Text
        position={[0, 1.85, 0.09]}
        fontSize={0.16}
        color={palette.darkGreen}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.5}
        textAlign="center"
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          position={[0, 1.65, 0.09]}
          fontSize={0.11}
          color={palette.pink}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.5}
          textAlign="center"
        >
          {subtitle}
        </Text>
      )}
    </group>
  )
}
