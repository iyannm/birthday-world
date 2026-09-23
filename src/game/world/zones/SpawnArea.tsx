import { useMemo } from 'react'
import { Bench } from '../props/Bench'
import { CraftedMesh } from '../props/CraftedMesh'
import { box, combine } from '../props/craftGeometry'
import { Clearing } from '../props/Clearing'
import { FlowerArch } from '../props/FlowerArch'
import { FlowerPatch } from '../props/FlowerPatch'
import { Lamp } from '../props/Lamp'
import { WorldSign } from '../props/WorldSign'
import { heightAt, palette } from '../worldConfig'

/** Player starting area: the dock sits over the pond behind the player, the path
 * (framed by the flower arch) leads forward/north into the rest of the world.
 * The pond itself is rendered globally by World.tsx along with the trail crossings. */
export function SpawnArea() {
  const y = heightAt(0, 105)
  const dock = useMemo(() => {
    const parts = Array.from({ length: 17 }, (_, i) =>
      box([3, 0.12, 0.39], [0, 0, (i - 8) * 0.41], i % 3 ? '#B4896B' : '#9D7158'),
    )
    for (const side of [-1, 1]) {
      parts.push(box([0.09, 0.09, 7], [side * 1.45, 0.04, 0], palette.wood))
      for (const z of [-2.6, 2.6]) {
        parts.push(box([0.15, 0.5, 0.15], [side * 1.4, 0.22, z], palette.wood))
        parts.push(box([0.18, 0.05, 0.18], [side * 1.4, 0.48, z], palette.cream))
      }
    }
    return combine(parts)
  }, [])
  return (
    <group>
      <group position={[0, heightAt(0, 94), 94]}>
        <Clearing origin={[0, 94]} radius={4.5} />
      </group>
      <group position={[0, y + 0.05, 107]}>
        <CraftedMesh geometry={dock} />
      </group>
      <WorldSign
        position={[2.4, y, 100]}
        title="Start Here"
        subtitle="Walk the path to begin"
        rotation={-0.5}
      />
      <FlowerArch position={[0, y, 94]} />
      <Lamp position={[-2.8, y, 95]} withLight />
      <Lamp position={[2.8, y, 95]} withLight />
      <FlowerPatch center={[-4, 99]} y={y} count={14} radius={2.4} />
      <FlowerPatch center={[4, 99]} y={y} count={14} radius={2.4} />
      <Bench position={[-3.5, y, 103]} rotation={Math.PI / 5} />
      <Bench position={[3.5, y, 103]} rotation={-Math.PI / 5} />
    </group>
  )
}
