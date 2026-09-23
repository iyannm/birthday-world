import { useMemo } from 'react'
import { CylinderGeometry, Shape, ShapeGeometry } from 'three'
import { palette } from '../worldConfig'
import { box, combine, pigment, place, type Vec3 } from './craftGeometry'
import { CraftedMesh } from './CraftedMesh'
export function Envelope({
  position,
  scale = 1,
  rotationY = 0,
}: {
  position: Vec3
  scale?: number
  rotationY?: number
}) {
  const geometry = useMemo(() => {
    const flap = new Shape().moveTo(-0.77, 0.49).lineTo(0, -0.12).lineTo(0.77, 0.49).closePath()
    return combine([
      box([1.65, 1.12, 0.09], [0, 0, 0], palette.pathStone),
      box([1.58, 1.04, 0.08], [0, 0.01, 0.03], palette.cream),
      place(pigment(new ShapeGeometry(flap), '#F8DEC7'), [0, 0, 0.08]),
      place(
        pigment(new CylinderGeometry(0.13, 0.13, 0.045, 12), palette.pink),
        [0, -0.08, 0.105],
        [1, 1, 1],
        [Math.PI / 2, 0, 0],
      ),
      box([0.04, 0.11, 0.015], [0, -0.08, 0.135], palette.gold, [0, 0, 0.4]),
    ])
  }, [])
  return (
    <group position={position} scale={scale} rotation={[-0.25, rotationY, 0]}>
      <CraftedMesh geometry={geometry} />
    </group>
  )
}
