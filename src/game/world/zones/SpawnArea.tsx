import { Bench } from '../props/Bench'
import { FlowerArch } from '../props/FlowerArch'
import { FlowerPatch } from '../props/FlowerPatch'
import { Lamp } from '../props/Lamp'
import { WorldSign } from '../props/WorldSign'
import { heightAt, palette } from '../worldConfig'

/** Player starting area: the dock sits over the pond behind the player, the path
 * (framed by the flower arch) leads forward/north into the rest of the world.
 * The pond itself is rendered globally by World.tsx from `waterFeatures`. */
export function SpawnArea() {
  const y = heightAt(0, 105)
  return (
    <group>
      <mesh position={[0, y + 0.05, 107]} receiveShadow castShadow>
        <boxGeometry args={[3, 0.15, 7]} />
        <meshStandardMaterial color={palette.wood} flatShading />
      </mesh>
      <WorldSign position={[2.4, y, 100]} title="Start Here" subtitle="Walk the path to begin" rotation={-0.5} />
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
