import { useMemo } from 'react'
import { CraftedMesh } from './CraftedMesh'
import { treeGeometry } from './treeGeometry'
import type { Vec3 } from './craftGeometry'
import { palette } from '../worldConfig'
interface TreeProps {
  position: Vec3
  scale?: number
  foliageColor?: string
  trunkColor?: string
  seed?: number
}
export function Tree({
  position,
  scale = 1,
  foliageColor = palette.darkGreen,
  trunkColor = palette.wood,
  seed = 0,
}: TreeProps) {
  const geometry = useMemo(
    () => treeGeometry(seed, foliageColor, trunkColor),
    [seed, foliageColor, trunkColor],
  )
  return (
    <group position={position} scale={scale}>
      <CraftedMesh geometry={geometry} />
    </group>
  )
}
