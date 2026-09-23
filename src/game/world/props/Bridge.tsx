import { useMemo } from 'react'
import { palette, heightAt } from '../worldConfig'
import { box, branch, combine, type Vec3 } from './craftGeometry'
import { CraftedMesh } from './CraftedMesh'
export function Bridge({
  position,
  rotation = 0,
  length = 6,
}: {
  position: [number, number]
  rotation?: number
  length?: number
}) {
  const [originX, originZ] = position
  const geometry = useMemo(() => {
    const parts = [],
      count = Math.ceil(length / 0.45)
    const ground = (x: number, z: number) =>
      heightAt(
        originX + x * Math.cos(rotation) + z * Math.sin(rotation),
        originZ - x * Math.sin(rotation) + z * Math.cos(rotation),
      )
    const baseY = heightAt(originX, originZ)
    const deckY = (z: number) => ground(0, z) - baseY + 0.1
    for (let i = 0; i < count; i++) {
      const z = (i / (count - 1) - 0.5) * length
      parts.push(
        box([3.7, 0.13, (length / count) * 0.94], [0, deckY(z), z], i % 3 ? '#AF8261' : palette.wood),
      )
    }
    for (const x of [-1.85, 1.85]) {
      for (let i = 0; i < 4; i++) {
        const z = (i / 3 - 0.5) * length
        parts.push(box([0.13, 0.95, 0.13], [x, deckY(z) + 0.45, z], palette.wood))
        if (i < 3) {
          const next = ((i + 1) / 3 - 0.5) * length
          parts.push(branch([x, deckY(z) + 0.86, z], [x, deckY(next) + 0.86, next], 0.055, palette.cream))
        }
      }
    }
    return combine(parts)
  }, [originX, originZ, length, rotation])
  const origin: Vec3 = [originX, heightAt(originX, originZ), originZ]
  return (
    <group position={origin} rotation={[0, rotation, 0]}>
      <CraftedMesh geometry={geometry} />
    </group>
  )
}
