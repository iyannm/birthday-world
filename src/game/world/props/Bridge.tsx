import { palette } from '../worldConfig'
import { heightAt } from '../worldConfig'

interface BridgeProps {
  position: [number, number]
  rotation?: number
  length?: number
}

/** Reusable wooden plank bridge that crosses streams/ponds along the path network. */
export function Bridge({ position, rotation = 0, length = 6 }: BridgeProps) {
  const y = heightAt(position[0], position[1]) + 0.08
  return (
    <group position={[position[0], y, position[1]]} rotation={[0, rotation, 0]}>
      <mesh receiveShadow castShadow>
        <boxGeometry args={[2, 0.15, length]} />
        <meshStandardMaterial color={palette.wood} flatShading />
      </mesh>
      {[-0.95, 0.95].map((x) => (
        <group key={x} position={[x, 0.35, 0]}>
          <mesh>
            <boxGeometry args={[0.08, 0.5, length]} />
            <meshStandardMaterial color={palette.wood} flatShading />
          </mesh>
          {Array.from({ length: Math.max(2, Math.round(length / 1.3)) }).map((_, i, arr) => {
            const t = arr.length > 1 ? i / (arr.length - 1) : 0.5
            return (
              <mesh key={i} position={[0, 0.15, (t - 0.5) * (length - 0.4)]}>
                <boxGeometry args={[0.06, 0.28, 0.06]} />
                <meshStandardMaterial color={palette.wood} flatShading />
              </mesh>
            )
          })}
        </group>
      ))}
    </group>
  )
}
