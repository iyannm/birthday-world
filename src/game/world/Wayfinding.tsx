import { useMemo } from 'react'
import { CylinderGeometry, Shape, ShapeGeometry } from 'three'
import { heightAt, palette, zonePositions } from './worldConfig'
import { branch, combine, pigment, place } from './props/craftGeometry'
import { CraftedMesh } from './props/CraftedMesh'
import { WorldSign } from './props/WorldSign'

const destinations = [
  { position: zonePositions.welcomeGarden, color: palette.pink, offset: [-5, -4] },
  { position: zonePositions.birthdayPlaza, color: palette.gold, offset: [4, -5] },
  { position: zonePositions.memoryTree, color: palette.sage, offset: [-8, 3] },
  { position: [-52, 9, 36], color: palette.lavender, offset: [3, 3] },
  { position: zonePositions.wishingTree, color: palette.lightPink, offset: [5, -2] },
  { position: zonePositions.letterHill, color: palette.cream, offset: [-3, -4] },
  { position: zonePositions.finaleLookout, color: palette.gold, offset: [4, -4] },
]
/** A repeated ribbon motif makes destinations visible above the low roadside planting. */
export function Wayfinding() {
  const geometry = useMemo(() => {
    const parts = []
    for (const { position: p, color, offset } of destinations) {
      const x = p[0] + offset[0],
        z = p[2] + offset[1],
        y = heightAt(x, z)
      parts.push(branch([x, y, z], [x, y + 7.8, z], 0.11, palette.wood))
      parts.push(branch([x - 0.15, y + 7.4, z], [x + 1.9, y + 7.4, z], 0.045, palette.gold))
      const shape = new Shape()
        .moveTo(0, 0)
        .lineTo(1.6, 0)
        .lineTo(1.55, -2.1)
        .lineTo(0.8, -1.7)
        .lineTo(0, -2.1)
        .closePath()
      const front = place(pigment(new ShapeGeometry(shape), color), [x + 0.1, y + 7.3, z])
      parts.push(front)
      parts.push(place(pigment(new CylinderGeometry(0.18, 0.18, 0.25, 8), palette.gold), [x, y + 7.85, z]))
    }
    return combine(parts)
  }, [])
  return (
    <>
      <CraftedMesh geometry={geometry} doubleSided />
      <WorldSign
        position={[-3.7, heightAt(-3.7, 90), 90]}
        title="Garden & memories"
        subtitle="Follow the left trail"
        rotation={0.25}
      />
      <WorldSign
        position={[3.7, heightAt(3.7, 90), 90]}
        title="Birthday & wishes"
        subtitle="Follow the right trail"
        rotation={-0.25}
      />
    </>
  )
}
