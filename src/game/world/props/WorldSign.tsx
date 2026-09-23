import { useMemo } from 'react'
import { Text } from '@react-three/drei'
import { palette } from '../worldConfig'
import { box, branch, combine, type Vec3 } from './craftGeometry'
import { CraftedMesh } from './CraftedMesh'
export function WorldSign({
  position,
  title,
  subtitle,
  rotation = 0,
}: {
  position: Vec3
  title: string
  subtitle?: string
  rotation?: number
}) {
  const geometry = useMemo(
    () =>
      combine([
        branch([0, 0, 0], [0, 2.2, 0], 0.1, palette.wood),
        box([2.85, 0.98, 0.16], [0, 1.92, 0], palette.wood),
        box([2.7, 0.82, 0.04], [0, 1.94, 0.1], palette.cream),
        box([0.09, 0.68, 0.05], [-1.23, 1.94, 0.13], palette.pink),
      ]),
    [],
  )
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <CraftedMesh geometry={geometry} />
      <Text
        position={[0.05, 2.09, 0.14]}
        fontSize={0.21}
        color={palette.darkGreen}
        maxWidth={2.25}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          position={[0.05, 1.76, 0.14]}
          fontSize={0.125}
          color={palette.wood}
          maxWidth={2.2}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {subtitle}
        </Text>
      )}
    </group>
  )
}
