import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FloatingParticlesProps {
  center: [number, number]
  count?: number
  radius?: number
  baseY?: number
  height?: number
  color?: string
  size?: number
}

/** Cheap ambient floating motes (butterflies/sparkles) — one Points draw call. */
export function FloatingParticles({
  center,
  count = 10,
  radius = 4,
  baseY = 1,
  height = 2,
  color = '#FFFFFF',
  size = 0.12,
}: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const seeds = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        angle: Math.random() * Math.PI * 2,
        r: Math.random() * radius,
        speed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      })),
    [count, radius],
  )

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    seeds.forEach((s, i) => {
      arr[i * 3] = center[0] + Math.cos(s.angle) * s.r
      arr[i * 3 + 1] = baseY
      arr[i * 3 + 2] = center[1] + Math.sin(s.angle) * s.r
    })
    return arr
  }, [seeds, center, baseY, count])

  useFrame(({ clock }) => {
    const points = pointsRef.current
    if (!points) return
    const arr = points.geometry.attributes.position.array as Float32Array
    const t = clock.elapsedTime
    seeds.forEach((s, i) => {
      const angle = s.angle + t * s.speed * 0.3
      arr[i * 3] = center[0] + Math.cos(angle) * s.r
      arr[i * 3 + 1] = baseY + Math.sin(t * s.speed + s.phase) * (height / 2) + height / 2
      arr[i * 3 + 2] = center[1] + Math.sin(angle) * s.r
    })
    points.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={size} sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  )
}
