import { useMemo } from 'react'
import { BufferGeometry, Color, Float32BufferAttribute } from 'three'
import { heightAt, palette, type WaterFeature } from '../worldConfig'
import { CraftedMesh } from './CraftedMesh'
/** A shallow painted stream with a pale bank; draped onto the existing height field. */
export function Water({ position, width, length, rotation }: WaterFeature) {
  const [originX, originZ] = position
  const geometry = useMemo(() => {
    const p: number[] = [],
      colors: number[] = [],
      indices: number[] = []
    for (let row = 0; row <= 24; row++) {
      const v = row / 24,
        z = (v - 0.5) * length
      const taper = Math.sin(v * Math.PI) * 0.85 + 0.15
      for (let col = 0; col < 5; col++) {
        const x = (col / 4 - 0.5) * width * taper
        const wx = originX + x * Math.cos(rotation) + z * Math.sin(rotation)
        const wz = originZ - x * Math.sin(rotation) + z * Math.cos(rotation)
        p.push(wx, heightAt(wx, wz) + 0.035, wz)
        new Color(col === 0 || col === 4 ? palette.pathStone : col === 2 ? '#8DCFDA' : palette.water).toArray(
          colors,
          colors.length,
        )
        if (row < 24 && col < 4) {
          const a = row * 5 + col
          indices.push(a, a + 5, a + 1, a + 1, a + 5, a + 6)
        }
      }
    }
    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(p, 3))
    geo.setAttribute('color', new Float32BufferAttribute(colors, 3))
    geo.setIndex(indices)
    geo.computeVertexNormals()
    return geo
  }, [originX, originZ, width, length, rotation])
  return <CraftedMesh geometry={geometry} shadow={false} />
}
