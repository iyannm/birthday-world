import { useMemo } from 'react'
import { beside, clearOfZones, distanceToTrail, flowerColors, trails } from './trailLayout'
import { heightAt, palette } from './worldConfig'
import { benchGeometry } from './props/benchGeometry'
import { flowerGeometry } from './props/flowerGeometry'
import { lampGeometry, lampGlow } from './props/lampGeometry'
import { rockGeometry } from './props/rockGeometry'
import { treeGeometry } from './props/treeGeometry'
import { combine, pebble, place, random, type Vec3 } from './props/craftGeometry'
import { CraftedMesh } from './props/CraftedMesh'

/** Repeating lantern rhythm, planted outside bends, and rest pockets. Batched per route for culling. */
export function AmbientDecor() {
  const sections = useMemo(
    () =>
      trails.map((trail, route) => {
        const rand = random(route + 41),
          parts = [],
          lights = []
        for (let i = 8; i < trail.length - 8; i += 8) {
          const p = trail[i],
            side = Math.floor(i / 8) % 2 ? 1 : -1
          const edge = p.width / 2 + 1.35
          const anchor = beside(p, side * edge)
          if (!clearOfZones(p.x, p.z, 8) || distanceToTrail(anchor[0], anchor[2]) < 0.9) continue
          if (i % 24 === 8) {
            parts.push(place(lampGeometry(), anchor))
            lights.push(place(lampGlow(), anchor))
          }
          const flowerPos = beside(p, side * (edge + 0.6))
          const flowers = flowerGeometry(8, 1.1, flowerColors(p.z), route * 1000 + i)
          // Drape the bed onto the terrain, including on the steeper upper trails.
          const fp = flowers.getAttribute('position')
          for (let k = 0; k < fp.count; k++)
            fp.setY(
              k,
              fp.getY(k) + heightAt(fp.getX(k) + flowerPos[0], fp.getZ(k) + flowerPos[2]) - flowerPos[1],
            )
          parts.push(place(flowers, flowerPos))
          if (i % 16 === 8) {
            const treePos = beside(p, side * (edge + 4.5))
            if (distanceToTrail(treePos[0], treePos[2]) > 4 && clearOfZones(treePos[0], treePos[2], 20)) {
              const s = 0.85 + rand() * 0.5
              const foliage = p.z < -30 ? '#849C8C' : route === 5 || route === 6 ? '#D8B8CC' : palette.sage
              parts.push(place(treeGeometry(route * 100 + i, foliage), treePos, [s, s, s]))
              const rockPos: Vec3 = [
                treePos[0] + 1.5,
                heightAt(treePos[0] + 1.5, treePos[2] + 1),
                treePos[2] + 1,
              ]
              parts.push(place(rockGeometry(i), rockPos, [0.65, 0.65, 0.65]))
            }
          }
          // Small intermittent edging stones, never a solid curb.
          for (const sign of [-1, 1]) {
            const pos = beside(p, sign * (p.width / 2 + 0.4))
            if (distanceToTrail(pos[0], pos[2]) > 0.15)
              parts.push(pebble(pos, [0.18 + rand() * 0.15, 0.1, 0.23], palette.pathStone, i))
          }
        }
        const rest = trail[Math.floor(trail.length * 0.55)],
          restPos = beside(rest, rest.width / 2 + 3.2)
        if (clearOfZones(restPos[0], restPos[2]) && distanceToTrail(restPos[0], restPos[2]) > 2) {
          parts.push(place(benchGeometry(), restPos, [1, 1, 1], [0, Math.atan2(-rest.nx, -rest.nz), 0]))
        }
        return { geometry: combine(parts), glow: lights.length ? combine(lights) : null }
      }),
    [],
  )
  return (
    <group>
      {sections.map((section, i) => (
        <group key={i}>
          <CraftedMesh geometry={section.geometry} />
          {section.glow && <CraftedMesh geometry={section.glow} glow />}
        </group>
      ))}
    </group>
  )
}
