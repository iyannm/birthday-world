import { useMemo } from 'react'
import { TorusGeometry } from 'three'
import { palette } from '../worldConfig'
import { branch, combine, pebble, pigment, place, type Vec3 } from './craftGeometry'
import { CraftedMesh } from './CraftedMesh'
export function FlowerArch({ position, rotationY = 0 }: { position: Vec3; rotationY?: number }) {
  const geometry = useMemo(() => {
    const parts = [-1.9, 1.9].map((x) => branch([x, 0, 0], [x, 2.6, 0], 0.1, palette.wood))
    parts.push(place(pigment(new TorusGeometry(1.9, 0.09, 6, 24, Math.PI), palette.wood), [0, 2.6, 0]))
    for (let i = 0; i < 17; i++) {
      const a = (i / 16) * Math.PI,
        x = Math.cos(a) * 1.9,
        y = 2.6 + Math.sin(a) * 1.9
      parts.push(pebble([x, y, 0], [0.33, 0.25, 0.26], palette.sage, i))
      if (i % 2 === 0)
        parts.push(pebble([x, y + 0.07, 0.22], [0.19, 0.18, 0.14], i % 4 ? palette.pink : palette.cream, i))
    }
    return combine(parts)
  }, [])
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <CraftedMesh geometry={geometry} />
    </group>
  )
}
