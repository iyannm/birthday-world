import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
export type Vec3 = [number, number, number]

/** Vertex pigment gives each part a shaded underside without textures or extra materials. */
export function pigment(source: THREE.BufferGeometry, color: string, variation = 0.12) {
  const geometry = source.index ? source.toNonIndexed() : source
  if (geometry !== source) source.dispose()
  geometry.deleteAttribute('uv')
  geometry.computeBoundingBox()
  const bounds = geometry.boundingBox!
  const positions = geometry.getAttribute('position')
  const colors = new Float32Array(positions.count * 3)
  const base = new THREE.Color(color),
    tint = new THREE.Color()
  for (let i = 0; i < positions.count; i++) {
    const h = (positions.getY(i) - bounds.min.y) / Math.max(0.001, bounds.max.y - bounds.min.y)
    tint
      .copy(base)
      .multiplyScalar(0.82 + h * variation * 2)
      .toArray(colors, i * 3)
  }
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  return geometry
}
export function place(
  geometry: THREE.BufferGeometry,
  position: Vec3 = [0, 0, 0],
  scale: Vec3 = [1, 1, 1],
  rotation: Vec3 = [0, 0, 0],
) {
  geometry
    .scale(...scale)
    .rotateX(rotation[0])
    .rotateY(rotation[1])
    .rotateZ(rotation[2])
    .translate(...position)
  return geometry
}
/** Takes ownership of input geometries. One material and draw call for all parts. */
export function combine(parts: THREE.BufferGeometry[]) {
  const result = mergeGeometries(parts, false)!
  parts.forEach((part) => part.dispose())
  result.computeBoundingSphere()
  return result
}
export function box(size: Vec3, position: Vec3, color: string, rotation: Vec3 = [0, 0, 0]) {
  return place(pigment(new THREE.BoxGeometry(...size), color), position, [1, 1, 1], rotation)
}
export function pebble(position: Vec3, scale: Vec3, color: string, seed = 0) {
  const geometry = new THREE.IcosahedronGeometry(1, 1)
  const p = geometry.getAttribute('position')
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i),
      y = p.getY(i),
      z = p.getZ(i)
    const wobble = 1 + Math.sin(x * 7 + z * 4 + seed) * 0.1
    p.setXYZ(i, x * wobble, y * wobble, z * wobble)
  }
  geometry.computeVertexNormals()
  return place(pigment(geometry, color, 0.2), position, scale)
}
export function branch(from: Vec3, to: Vec3, radius: number, color: string) {
  const a = new THREE.Vector3(...from),
    b = new THREE.Vector3(...to),
    delta = b.clone().sub(a)
  const geometry = pigment(new THREE.CylinderGeometry(radius * 0.65, radius, delta.length(), 7), color)
  geometry.applyQuaternion(
    new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize()),
  )
  return geometry.translate(...(a.add(b).multiplyScalar(0.5).toArray() as Vec3))
}
export function random(seed: number) {
  let a = seed | 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
