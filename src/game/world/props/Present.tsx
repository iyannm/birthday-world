import { useMemo } from 'react'
import { TorusGeometry } from 'three'
import { palette } from '../worldConfig'
import { box, combine, pigment, place, type Vec3 } from './craftGeometry'
import { CraftedMesh } from './CraftedMesh'
export function Present({
  position,
  color = palette.lavender,
  ribbonColor = palette.gold,
  scale = 1,
  rotationY = 0,
}: {
  position: Vec3
  color?: string
  ribbonColor?: string
  scale?: number
  rotationY?: number
}) {
  const geometry = useMemo(
    () =>
      combine([
        box([0.8, 0.72, 0.8], [0, -0.04, 0], color),
        box([0.86, 0.12, 0.86], [0, 0.34, 0], color),
        box([0.13, 0.82, 0.87], [0, 0, 0], ribbonColor),
        box([0.87, 0.82, 0.13], [0, 0, 0], ribbonColor),
        ...[-1, 1].map((side) =>
          place(
            pigment(new TorusGeometry(0.13, 0.035, 6, 12), ribbonColor),
            [side * 0.12, 0.49, 0],
            [1, 0.75, 1],
            [0, 0, side * 0.5],
          ),
        ),
      ]),
    [color, ribbonColor],
  )
  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      <CraftedMesh geometry={geometry} />
    </group>
  )
}
