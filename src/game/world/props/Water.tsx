import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh, MeshStandardMaterial } from 'three'
import { heightAt, palette } from '../worldConfig'
import type { WaterFeature } from '../worldConfig'

/** Simple translucent water plane — no reflection/refraction, just a gentle shimmer. */
export function Water({ position, width, length, rotation }: WaterFeature) {
  const ref = useRef<Mesh>(null)
  const y = heightAt(position[0], position[1]) - 0.15

  useFrame(({ clock }) => {
    const mat = ref.current?.material as MeshStandardMaterial | undefined
    if (mat) mat.opacity = 0.6 + Math.sin(clock.elapsedTime * 0.6) * 0.08
  })

  return (
    <mesh
      ref={ref}
      position={[position[0], y, position[1]]}
      rotation={[-Math.PI / 2, 0, rotation]}
      receiveShadow
    >
      <planeGeometry args={[width, length, 1, 1]} />
      <meshStandardMaterial color={palette.water} transparent opacity={0.65} roughness={0.3} />
    </mesh>
  )
}
