import { useMemo } from 'react'
import { CraftedMesh } from './CraftedMesh'
import { pathGeometry } from './pathGeometry'
export function PathNetwork() {
  const geometry = useMemo(() => pathGeometry(), [])
  return <CraftedMesh geometry={geometry} shadow={false} />
}
