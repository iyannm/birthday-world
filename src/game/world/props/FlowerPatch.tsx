import { useMemo } from 'react'
import { CraftedMesh } from './CraftedMesh'
import { flowerGeometry, FLOWERS } from './flowerGeometry'
export function FlowerPatch({
  center: [x, z],
  count = 18,
  radius = 3,
  colors = FLOWERS,
  y = 0,
}: {
  center: [number, number]
  count?: number
  radius?: number
  colors?: string[]
  y?: number
}) {
  const colorKey = colors.join(',')
  const geometry = useMemo(
    () => flowerGeometry(count, radius, colorKey.split(','), Math.round(x * 37 + z * 19)),
    [count, radius, colorKey, x, z],
  )
  return (
    <group position={[x, y, z]}>
      <CraftedMesh geometry={geometry} shadow={false} />
    </group>
  )
}
