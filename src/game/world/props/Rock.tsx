import { useMemo } from 'react'
import { CraftedMesh } from './CraftedMesh'
import { rockGeometry } from './rockGeometry'
import type { Vec3 } from './craftGeometry'
export function Rock({
  position,
  scale = 1,
  rotation = 0,
}: {
  position: Vec3
  scale?: number
  rotation?: number
}) {
  const geometry = useMemo(() => rockGeometry(rotation), [rotation])
  return (
    <group position={position} scale={scale} rotation={[0, rotation, 0]}>
      <CraftedMesh geometry={geometry} />
    </group>
  )
}
