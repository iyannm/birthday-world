import { BufferGeometry, Float32BufferAttribute, IcosahedronGeometry } from 'three'
import { palette } from '../worldConfig'
import { branch, combine, pigment, place, random } from './craftGeometry'

export const FLOWERS = [palette.pink, palette.lightPink, palette.gold, palette.lavender]

/** A cupped, five-lobed blossom: 20 triangles instead of five separate spheres. */
function blossom(color: string) {
  const positions = [0, 0, 0],
    indices = []
  for (let i = 0; i <= 20; i++) {
    const a = (i / 20) * Math.PI * 2,
      r = 0.15 + Math.cos(a * 5) * 0.055
    positions.push(Math.cos(a) * r, 0.045, Math.sin(a) * r)
    if (i < 20) indices.push(0, i + 2, i + 1)
  }
  const geo = new BufferGeometry()
  geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  return pigment(geo, color)
}
export function flowerGeometry(count = 18, radius = 3, colors: string[] = FLOWERS, seed = 1) {
  const rand = random(seed),
    parts = []
  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2,
      r = Math.sqrt(rand()) * radius
    const x = Math.cos(angle) * r,
      z = Math.sin(angle) * r,
      h = 0.3 + rand() * 0.38
    parts.push(branch([x, 0, z], [x + 0.06, h, z], 0.023, palette.darkGreen))
    const leaf = new BufferGeometry()
    leaf.setAttribute(
      'position',
      new Float32BufferAttribute([0, 0, 0, 0.1, 0.08, 0.06, 0.23, 0.14, 0, 0.1, 0.08, -0.06], 3),
    )
    leaf.setIndex([0, 1, 2, 0, 2, 3])
    leaf.computeVertexNormals()
    parts.push(place(pigment(leaf, palette.sage), [x, h * 0.4, z], [1, 1, 1], [0, angle, 0]))
    parts.push(place(blossom(colors[i % colors.length]), [x + 0.06, h, z], [1, 1, 1], [0.1, angle, 0.1]))
    parts.push(
      place(pigment(new IcosahedronGeometry(0.06, 0), palette.gold), [x + 0.06, h + 0.025, z], [1, 0.5, 1]),
    )
  }
  return combine(parts)
}
