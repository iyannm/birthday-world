import * as THREE from 'three'
import { heightAt, palette } from '../worldConfig'
import { meadowColor, trails } from '../trailLayout'

/** Terrain-following, feathered path surface. The winding must face upward. */
export function pathGeometry() {
  const positions: number[] = [],
    colors: number[] = [],
    indices: number[] = []
  const bands = [-1.38, -1.12, -0.86, 0, 0.86, 1.12, 1.38]
  const stone = new THREE.Color(palette.pathStone),
    shoulder = new THREE.Color('#C2BD8C')
  for (const trail of trails) {
    const base = positions.length / 3
    trail.forEach((p, i) => {
      bands.forEach((band, j) => {
        const edge = 1 + Math.sin(i * 1.7) * 0.018 * Math.abs(band)
        const offset = ((band * p.width) / 2) * edge
        const x = p.x + p.nx * offset,
          z = p.z + p.nz * offset
        positions.push(x, heightAt(x, z) + 0.07, z)
        const c =
          Math.abs(band) > 1.3 ? meadowColor(x, z) : Math.abs(band) > 1 ? shoulder.clone() : stone.clone()
        c.multiplyScalar(1 + Math.sin(i * 0.73 + j * 1.2) * 0.025).toArray(colors, colors.length)
        if (i < trail.length - 1 && j < bands.length - 1) {
          const a = base + i * bands.length + j
          // Upward winding, including the last section (centered curve tangent).
          indices.push(a, a + 1, a + bands.length, a + 1, a + bands.length + 1, a + bands.length)
        }
      })
    })
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  return geo
}
