// Node 22.18+ (native TypeScript stripping); no test dependency or browser required.
import assert from 'node:assert/strict'
import { registerHooks } from 'node:module'
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('.') && !/\.[a-z]+$/i.test(specifier)) {
      return nextResolve(`${specifier}.ts`, context)
    }
    return nextResolve(specifier, context)
  },
})
const { pathGeometry } = await import('../src/game/world/props/pathGeometry.ts')
const { trails } = await import('../src/game/world/trailLayout.ts')
const { heightAt, zonePositions } = await import('../src/game/world/worldConfig.ts')
const { memories } = await import('../src/data/memories.ts')
const { treeGeometry } = await import('../src/game/world/props/treeGeometry.ts')
const { flowerGeometry } = await import('../src/game/world/props/flowerGeometry.ts')
const geometry = pathGeometry(),
  p = geometry.attributes.position,
  indices = geometry.index.array
function groundSurface(x, z) {
  const sx = 180 / 120,
    sz = 220 / 148
  const gx = (x + 90) / sx,
    gz = (z + 110) / sz
  const ix = Math.floor(gx),
    iz = Math.floor(gz),
    u = gx - ix,
    v = gz - iz
  const x0 = ix * sx - 90,
    z0 = iz * sz - 110
  const h00 = heightAt(x0, z0),
    h10 = heightAt(x0 + sx, z0)
  const h01 = heightAt(x0, z0 + sz),
    h11 = heightAt(x0 + sx, z0 + sz)
  return u + v < 1 ? h00 * (1 - u - v) + h10 * u + h01 * v : h11 * (u + v - 1) + h01 * (1 - u) + h10 * (1 - v)
}
for (let i = 0; i < indices.length; i += 3) {
  const [a, b, c] = indices.slice(i, i + 3)
  const normalY =
    (p.getZ(b) - p.getZ(a)) * (p.getX(c) - p.getX(a)) - (p.getX(b) - p.getX(a)) * (p.getZ(c) - p.getZ(a))
  assert.ok(normalY > 0, `Path triangle ${i / 3} faces down or folds over`)
  const x = (p.getX(a) + p.getX(b) + p.getX(c)) / 3
  const y = (p.getY(a) + p.getY(b) + p.getY(c)) / 3
  const z = (p.getZ(a) + p.getZ(b) + p.getZ(c)) / 3
  assert.ok(y > groundSurface(x, z), `Path triangle ${i / 3} is buried in the rendered terrain`)
}
for (let i = 0; i < p.count; i++) {
  assert.ok(
    Math.abs(p.getY(i) - heightAt(p.getX(i), p.getZ(i)) - 0.07) < 0.00002,
    `Vertex ${i} leaves terrain`,
  )
}
for (const [name, pos] of [...Object.entries(zonePositions), ...memories.map((m) => [m.id, m.location])]) {
  const nearest = Math.min(...trails.flat().map((p) => Math.hypot(p.x - pos[0], p.z - pos[2])))
  assert.ok(nearest < 0.8, `${name} is disconnected from the trail (${nearest})`)
}
// Every route must join the connected component containing the spawn, including the garden fork.
const reached = new Set([0])
for (let pass = 0; pass < trails.length; pass++) {
  for (let i = 0; i < trails.length; i++) {
    if (reached.has(i)) continue
    const ends = [trails[i][0], trails[i].at(-1)]
    if (
      [...reached].some((j) =>
        ends.some((a) => trails[j].some((b) => Math.hypot(a.x - b.x, a.z - b.z) < 0.8)),
      )
    )
      reached.add(i)
  }
}
assert.equal(reached.size, trails.length, 'Trail network has disconnected routes')
for (const factory of [() => treeGeometry(7), () => flowerGeometry(12, 2, undefined, 7)]) {
  const a = factory(),
    b = factory()
  assert.deepEqual(
    a.attributes.position.array,
    b.attributes.position.array,
    'Landscaping changes across remounts',
  )
  for (const attr of Object.values(a.attributes)) assert.ok(attr.array.every(Number.isFinite))
  a.dispose()
  b.dispose()
}
geometry.dispose()
console.log(
  `PASS: ${indices.length / 3} upward-facing path triangles; all 8 routes, 7 zone anchors and 6 memories connected; terrain conformance and deterministic geometry.`,
)
