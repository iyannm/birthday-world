import { useMemo } from 'react'
import * as THREE from 'three'
import { WORLD_DEPTH, WORLD_WIDTH, heightAt } from '../worldConfig'
import { meadowColor } from '../trailLayout'
import { CraftedMesh } from './CraftedMesh'
export function Ground() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(WORLD_WIDTH, WORLD_DEPTH, 120, 148)
    geo.rotateX(-Math.PI / 2)
    const p = geo.attributes.position,
      colors = new Float32Array(p.count * 3)
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i),
        z = p.getZ(i)
      p.setY(i, heightAt(x, z))
      meadowColor(x, z).toArray(colors, i * 3)
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    return geo
  }, [])
  return <CraftedMesh geometry={geometry} shadow={false} />
}
