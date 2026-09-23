import { useMemo } from 'react'
import { ConeGeometry } from 'three'
import { Bench } from '../props/Bench'
import { FlowerPatch } from '../props/FlowerPatch'
import { Lamp } from '../props/Lamp'
import { WorldSign } from '../props/WorldSign'
import { CraftedMesh } from '../props/CraftedMesh'
import { box, branch, combine, pigment, place } from '../props/craftGeometry'
import { birthdayConfig } from '../../../config/birthday'
import { heightAt, palette, zonePositions } from '../worldConfig'

export function FinaleLookout() {
  const [x, , z] = zonePositions.finaleLookout,
    y = heightAt(x, z)
  const geometry = useMemo(() => {
    const parts = []
    for (let i = 0; i < 22; i++)
      parts.push(box([10, 0.22, 0.39], [0, 0.1, -4.3 + i * 0.41], i % 3 ? '#AD8165' : '#9D7158'))
    for (const side of [-1, 1]) {
      for (let i = 0; i < 6; i++)
        parts.push(box([0.12, 1, 0.12], [side * 4.8, 0.7, -4.2 + i * 1.68], palette.cream))
      parts.push(box([0.14, 0.12, 8.5], [side * 4.8, 1.16, 0], palette.wood))
    }
    for (let i = 0; i < 7; i++) parts.push(box([0.12, 1, 0.12], [-4.8 + i * 1.6, 0.7, -4.2], palette.cream))
    parts.push(box([9.8, 0.12, 0.14], [0, 1.16, -4.2], palette.wood))
    for (const px of [-4.6, -0.2])
      for (const pz of [-1.5, 2.9]) parts.push(branch([px, 0.2, pz], [px, 3.5, pz], 0.1, palette.cream))
    parts.push(
      place(
        pigment(new ConeGeometry(3.6, 1.2, 4), palette.pink),
        [-2.4, 4.05, 0.7],
        [1, 1, 1],
        [0, Math.PI / 4, 0],
      ),
    )
    parts.push(
      place(
        pigment(new ConeGeometry(3.7, 0.14, 4), palette.cream),
        [-2.4, 3.48, 0.7],
        [1, 1, 1],
        [0, Math.PI / 4, 0],
      ),
    )
    parts.push(branch([-2.4, 4.5, 0.7], [-2.4, 5, 0.7], 0.055, palette.gold))
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2
      parts.push(
        branch(
          [2.6 + Math.cos(a) * 0.5, 0.2, -1.5 + Math.sin(a) * 0.5],
          [2.6, 1.25, -1.5],
          0.035,
          palette.wood,
        ),
      )
    }
    parts.push(branch([2.35, 1.25, -1.1], [2.9, 1.65, -2], 0.14, palette.rock))
    parts.push(branch([2.86, 1.62, -1.92], [2.94, 1.68, -2.06], 0.17, palette.gold))
    return combine(parts)
  }, [])
  return (
    <group position={[x, y, z]}>
      <WorldSign
        position={[0, 0.4, 5.5]}
        title={birthdayConfig.finaleLookoutLabel}
        subtitle="Watch the Sky"
      />
      <CraftedMesh geometry={geometry} />
      <Bench position={[0, 0.25, 3.2]} />
      <Bench position={[-3.5, 0.25, 3.4]} rotation={0.3} />
      <FlowerPatch center={[4, 3.5]} y={0.25} count={16} radius={2} />
      <Lamp position={[-4.6, 0.25, -3.8]} />
      <Lamp position={[4.6, 0.25, -3.8]} />
    </group>
  )
}
