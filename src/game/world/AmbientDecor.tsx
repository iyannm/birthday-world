import { FlowerPatch } from './props/FlowerPatch'
import { Rock } from './props/Rock'
import { Tree } from './props/Tree'
import { heightAt } from './worldConfig'

const TREES: [number, number, number, number][] = [
  // x, z, scale, seed
  [-20, 80, 1.1, 1],
  [20, 82, 0.95, 2],
  [-16, 50, 1, 3],
  [22, 44, 1.05, 4],
  [-32, -6, 1.15, 5],
  [46, 22, 0.9, 6],
  [70, 16, 1, 7],
  [54, -40, 1.1, 8],
  [-70, 40, 1, 9],
  [-25, -55, 0.95, 10],
]

const ROCKS: [number, number, number, number][] = [
  // x, z, scale, rotation
  [-10, 86, 0.8, 0.4],
  [26, 90, 1, 1.1],
  [-31, 55, 0.7, 2],
  [31, 40, 0.9, 0.8],
  [16, -20, 0.75, 1.6],
  [-46, -6, 0.85, 0.2],
  [70, -26, 0.8, 2.4],
  [-20, -80, 0.9, 1.2],
]

const FLOWER_CLUSTERS: [number, number][] = [
  [10, 88],
  [-25, 25],
  [50, 8],
  [-10, -55],
]

/** Hand-placed (deterministic, not random-per-render) trees/rocks/flowers filling the
 * space between named zones so the world doesn't feel empty. */
export function AmbientDecor() {
  return (
    <group>
      {TREES.map(([x, z, scale, seed], i) => (
        <Tree key={i} position={[x, heightAt(x, z), z]} scale={scale} seed={seed} />
      ))}
      {ROCKS.map(([x, z, scale, rot], i) => (
        <Rock key={i} position={[x, heightAt(x, z), z]} scale={scale} rotation={rot} />
      ))}
      {FLOWER_CLUSTERS.map(([x, z], i) => (
        <FlowerPatch key={i} center={[x, z]} y={heightAt(x, z)} count={14} radius={2.8} />
      ))}
    </group>
  )
}
