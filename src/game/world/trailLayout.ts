import { CatmullRomCurve3, Vector3, Color } from 'three'
import { heightAt, palette, pathSegments, zonePositions } from './worldConfig'

/** Shared, arc-length-spaced trail samples drive the surface AND its landscaping. */
export const trails = pathSegments.map((segment, index) => {
  const curve = new CatmullRomCurve3(
    segment.points.map(([x, z]) => new Vector3(x, 0, z)),
    false,
    'centripetal',
  )
  const length = curve.getLength()
  const count = Math.ceil(length / 0.75)
  return Array.from({ length: count + 1 }, (_, i) => {
    const t = i / count,
      p = curve.getPointAt(t),
      tangent = curve.getTangentAt(t)
    const width = (segment.width ?? 3.6) * (1 + Math.sin(t * Math.PI * 4 + index) * 0.075)
    return { x: p.x, z: p.z, nx: -tangent.z, nz: tangent.x, width, t, distance: t * length }
  })
})
export type TrailSample = (typeof trails)[number][number]
export function beside(sample: TrailSample, offset: number): [number, number, number] {
  const x = sample.x + sample.nx * offset,
    z = sample.z + sample.nz * offset
  return [x, heightAt(x, z), z]
}
export function distanceToTrail(x: number, z: number) {
  let closest = Infinity
  for (const trail of trails)
    for (let i = 0; i < trail.length; i += 2) {
      const p = trail[i]
      closest = Math.min(closest, Math.hypot(x - p.x, z - p.z) - p.width / 2)
    }
  return closest
}
export function clearOfZones(x: number, z: number, radius = 10) {
  return Object.values(zonePositions).every((p) => Math.hypot(x - p[0], z - p[2]) > radius)
}
const low = new Color('#9CBE83'),
  high = new Color('#829F87'),
  gold = new Color('#B5BF8A')
export function meadowColor(x: number, z: number) {
  const altitude = Math.max(0, Math.min(1, (heightAt(x, z) - 7) / 27))
  return low
    .clone()
    .lerp(high, altitude)
    .lerp(gold, (Math.sin(x * 0.11 + z * 0.06) + 1) * 0.1)
}
export function flowerColors(z: number): string[] {
  return z > 25
    ? [palette.pink, palette.cream, palette.gold]
    : z > -35
      ? [palette.lavender, palette.lightPink, palette.cream]
      : [palette.cream, palette.gold, palette.lavender]
}
