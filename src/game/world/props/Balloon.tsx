import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { palette } from '../worldConfig'

interface BalloonProps {
  position: [number, number, number]
  color?: string
  seed?: number
}

/** Gently bobbing balloon on a thin string. */
export function Balloon({ position, color = palette.pink, seed = 0 }: BalloonProps) {
  const ref = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime + seed
    ref.current.position.y = position[1] + Math.sin(t * 1.3) * 0.18
    ref.current.rotation.z = Math.sin(t * 0.8) * 0.06
  })

  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <sphereGeometry args={[0.4, 8, 7]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.002, 0.002, 1.1, 3]} />
        <meshBasicMaterial color={palette.wood} />
      </mesh>
    </group>
  )
}
