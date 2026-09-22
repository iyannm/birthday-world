import { useMemo } from 'react'
import * as THREE from 'three'
import { heightAt, palette, pathSegments } from '../worldConfig'

function buildRibbon(points: [number, number][], width: number) {
  const curvePoints = points.map(([x, z]) => new THREE.Vector3(x, heightAt(x, z), z))
  const curve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.5)
  const sampled = curve.getPoints(Math.max(20, points.length * 12))

  const positions: number[] = []
  const indices: number[] = []

  for (let i = 0; i < sampled.length; i++) {
    const p = sampled[i]
    const next = sampled[Math.min(i + 1, sampled.length - 1)]
    const dir = new THREE.Vector2(next.x - p.x, next.z - p.z)
    if (dir.lengthSq() > 0) dir.normalize()
    else dir.set(1, 0)
    const perp = new THREE.Vector2(-dir.y, dir.x).multiplyScalar(width / 2)
    const y = heightAt(p.x, p.z) + 0.03

    positions.push(p.x + perp.x, y, p.z + perp.y)
    positions.push(p.x - perp.x, y, p.z - perp.y)

    if (i < sampled.length - 1) {
      const a = i * 2
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
    }
  }

  return { positions, indices }
}

/** Whole curved path network baked into a single mesh — one draw call, however many segments. */
export function PathNetwork() {
  const geometry = useMemo(() => {
    const allPositions: number[] = []
    const allIndices: number[] = []
    for (const seg of pathSegments) {
      const { positions, indices } = buildRibbon(seg.points, seg.width ?? 3.2)
      const base = allPositions.length / 3
      allPositions.push(...positions)
      for (const idx of indices) allIndices.push(idx + base)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(allPositions, 3))
    geo.setIndex(allIndices)
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial color={palette.pathStone} flatShading roughness={1} />
    </mesh>
  )
}
