import { useMemo } from 'react'
import { BufferGeometry, Color, Float32BufferAttribute } from 'three'
import { heightAt, palette } from '../worldConfig'
import { distanceToTrail, meadowColor } from '../trailLayout'
import { CraftedMesh } from './CraftedMesh'
/** A landing that follows the hill, with the same soft planted edge as the trails. */
export function Clearing({ origin: [x, z], radius }: { origin: [number, number]; radius: number }) {
  const geometry = useMemo(() => {
    const positions: number[] = [],
      colors: number[] = [],
      indices: number[] = []
    const centerY = heightAt(x, z),
      stone = new Color(palette.pathStone),
      sides = 48
    for (let ring = 0; ring <= 8; ring++) {
      const r = Math.max(0.001, (ring / 8) * radius)
      for (let i = 0; i <= sides; i++) {
        const a = (i / sides) * Math.PI * 2,
          px = Math.cos(a) * r,
          pz = Math.sin(a) * r
        positions.push(px, heightAt(x + px, z + pz) - centerY + 0.13, pz)
        const edgeBlend = Math.max(0, Math.min(1, distanceToTrail(x + px, z + pz) / 1.3))
        const color = ring === 8 ? stone.clone().lerp(meadowColor(x + px, z + pz), edgeBlend) : stone
        color.toArray(colors, colors.length)
        if (ring < 8 && i < sides) {
          const k = ring * (sides + 1) + i
          indices.push(k, k + 1, k + sides + 1, k + 1, k + sides + 2, k + sides + 1)
        }
      }
    }
    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geo.setAttribute('color', new Float32BufferAttribute(colors, 3))
    geo.setIndex(indices)
    geo.computeVertexNormals()
    return geo
  }, [x, z, radius])
  return <CraftedMesh geometry={geometry} shadow={false} />
}
