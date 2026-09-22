import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { palette } from '../worldConfig'

interface CakeProps {
  position: [number, number, number]
  sparkle?: boolean
}

/** Stacked-cylinder birthday cake with candles. */
export function Cake({ position, sparkle = false }: CakeProps) {
  const sparkleRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (sparkleRef.current) {
      sparkleRef.current.rotation.y = clock.elapsedTime * 1.4
      sparkleRef.current.visible = sparkle
    }
  })

  const tiers = [
    { r: 1.3, h: 0.55, y: 0.275, color: palette.lightPink },
    { r: 1, h: 0.5, y: 0.55 + 0.25, color: palette.cream },
    { r: 0.7, h: 0.45, y: 0.55 + 0.5 + 0.225, color: palette.pink },
  ]

  return (
    <group position={position}>
      {tiers.map((t, i) => (
        <mesh key={i} position={[0, t.y, 0]} castShadow>
          <cylinderGeometry args={[t.r, t.r * 1.05, t.h, 10]} />
          <meshStandardMaterial color={t.color} flatShading />
        </mesh>
      ))}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2
        const r = 0.4
        return (
          <group key={i} position={[Math.cos(angle) * r, 1.45, Math.sin(angle) * r]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.25, 5]} />
              <meshStandardMaterial color={palette.gold} flatShading />
            </mesh>
            <mesh position={[0, 0.17, 0]}>
              <coneGeometry args={[0.05, 0.12, 5]} />
              <meshStandardMaterial color="#FF9F4A" emissive="#FF9F4A" emissiveIntensity={1.2} flatShading />
            </mesh>
          </group>
        )
      })}
      <group ref={sparkleRef} position={[0, 1.7, 0]}>
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.6, Math.sin(i) * 0.2, Math.sin(angle) * 0.6]}>
              <octahedronGeometry args={[0.08, 0]} />
              <meshStandardMaterial color={palette.gold} emissive={palette.gold} emissiveIntensity={1.5} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}
