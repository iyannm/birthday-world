import { useMemo } from 'react'
import { CraftedMesh } from './CraftedMesh'
import { benchGeometry } from './benchGeometry'
import type { Vec3 } from './craftGeometry'
export function Bench({ position, rotation = 0 }: { position: Vec3; rotation?: number }) {
  const geometry = useMemo(() => benchGeometry(), [])
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <CraftedMesh geometry={geometry} />
    </group>
  )
}
