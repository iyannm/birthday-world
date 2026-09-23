import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { CylinderGeometry, OctahedronGeometry, SphereGeometry, type Group } from 'three'
import { palette } from '../worldConfig'
import { combine, pigment, place, type Vec3 } from './craftGeometry'
import { CraftedMesh } from './CraftedMesh'
export function Cake({ position, sparkle = false }: { position: Vec3; sparkle?: boolean }) {
  const ref = useRef<Group>(null)
  const sparkleRef = useRef<Group>(null)
  const geometry = useMemo(() => {
    const parts = [place(pigment(new CylinderGeometry(1.55, 1.45, 0.13, 32), palette.gold), [0, 0.07, 0])]
    let bottom = 0.13
    for (let tier = 0; tier < 3; tier++) {
      const radius = 1.3 - tier * 0.3,
        h = 0.5
      parts.push(
        place(
          pigment(
            new CylinderGeometry(radius, radius * 1.02, h, 28),
            tier === 1 ? palette.cream : palette.pink,
          ),
          [0, bottom + h / 2, 0],
        ),
      )
      parts.push(
        place(pigment(new CylinderGeometry(radius + 0.02, radius, 0.08, 28), palette.cream), [
          0,
          bottom + h,
          0,
        ]),
      )
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2
        parts.push(
          place(
            pigment(new SphereGeometry(1, 6, 4), palette.cream),
            [Math.cos(a) * radius, bottom + h - 0.035, Math.sin(a) * radius],
            [0.11, 0.09 + (i % 3) * 0.035, 0.1],
          ),
        )
      }
      bottom += h
    }
    for (let i = 0; i < 5; i++) {
      const a = i * Math.PI * 0.4
      parts.push(
        place(pigment(new CylinderGeometry(0.045, 0.045, 0.32, 8), i % 2 ? palette.lavender : palette.gold), [
          Math.cos(a) * 0.4,
          1.78,
          Math.sin(a) * 0.4,
        ]),
      )
    }
    return combine(parts)
  }, [])
  const flames = useMemo(
    () =>
      combine(
        Array.from({ length: 5 }, (_, i) =>
          place(
            pigment(new SphereGeometry(1, 6, 5), palette.gold),
            [Math.cos(i * Math.PI * 0.4) * 0.4, 2.01, Math.sin(i * Math.PI * 0.4) * 0.4],
            [0.055, 0.12, 0.055],
          ),
        ),
      ),
    [],
  )
  const sparkles = useMemo(
    () =>
      combine(
        Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2
          return place(pigment(new OctahedronGeometry(0.1), palette.gold), [
            Math.cos(angle) * 1.15,
            1.8 + Math.sin(i * 2) * 0.35,
            Math.sin(angle) * 1.15,
          ])
        }),
      ),
    [],
  )
  useFrame(({ clock }) => {
    if (sparkleRef.current) sparkleRef.current.rotation.y = clock.elapsedTime * 1.4
    if (ref.current)
      ref.current.scale.setScalar(
        1 + Math.sin(clock.elapsedTime * (sparkle ? 9 : 3)) * (sparkle ? 0.09 : 0.015),
      )
  })
  return (
    <group position={position}>
      <CraftedMesh geometry={geometry} />
      <group ref={ref}>
        <CraftedMesh geometry={flames} glow />
      </group>
      <group ref={sparkleRef} visible={sparkle}>
        <CraftedMesh geometry={sparkles} glow />
      </group>
    </group>
  )
}
