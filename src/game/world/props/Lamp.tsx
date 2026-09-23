import { useMemo } from 'react'
import { CraftedMesh } from './CraftedMesh'
import { lampGeometry, lampGlow } from './lampGeometry'
import type { Vec3 } from './craftGeometry'
import { palette } from '../worldConfig'
export function Lamp({
  position,
  color = palette.gold,
  height = 2.8,
}: {
  position: Vec3
  color?: string
  height?: number
  withLight?: boolean
}) {
  const geometry = useMemo(() => lampGeometry(height), [height])
  const glow = useMemo(() => lampGlow(height, color), [height, color])
  return (
    <group position={position}>
      <CraftedMesh geometry={geometry} />
      <CraftedMesh geometry={glow} glow />
    </group>
  )
}
