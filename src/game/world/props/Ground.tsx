import { useMemo } from 'react'
import * as THREE from 'three'
import { WORLD_DEPTH, WORLD_WIDTH, heightAt, palette } from '../worldConfig'

const TIER_COLORS = [
  new THREE.Color(palette.sage),
  new THREE.Color(palette.darkGreen),
  new THREE.Color('#6FA372'),
  new THREE.Color(palette.rock),
]

function colorForHeight(y: number) {
  if (y < 8) return TIER_COLORS[0]
  if (y < 16) return TIER_COLORS[1]
  if (y < 27) return TIER_COLORS[2]
  return TIER_COLORS[3]
}

/** Single displaced-plane ground mesh — the whole world's terrain in one draw call. */
export function Ground() {
  const geometry = useMemo(() => {
    const segX = 60
    const segZ = 74
    const geo = new THREE.PlaneGeometry(WORLD_WIDTH, WORLD_DEPTH, segX, segZ)
    geo.rotateX(-Math.PI / 2)

    const pos = geo.attributes.position
    const colors = new Float32Array(pos.count * 3)
    const c = new THREE.Color()

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const y = heightAt(x, z)
      pos.setY(i, y)
      c.copy(colorForHeight(y))
      c.toArray(colors, i * 3)
    }

    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial vertexColors flatShading roughness={1} />
    </mesh>
  )
}
