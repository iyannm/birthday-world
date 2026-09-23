import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  BackSide,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  MeshBasicMaterial,
  PointsMaterial,
  SphereGeometry,
} from 'three'
import { useGameStore } from '../state/gameStore'

const STAR_COUNT = 1600
const STAR_RADIUS = 194
const starColors = ['#FFF8E9', '#FFE2DD', '#DDEAFF', '#F5E6FF'].map((color) => new Color(color))

function makeRandom() {
  let seed = 41731
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
}

/** A camera-centered twilight dome keeps the stars behind the lookout and terrain. */
export function FinaleSky() {
  const finaleActive = useGameStore((state) => state.finaleActive)
  const group = useRef<Group>(null)
  const domeMaterial = useRef<MeshBasicMaterial>(null)
  const starsMaterial = useRef<PointsMaterial>(null)
  const fade = useRef(0)

  const { domeGeometry, starsGeometry } = useMemo(() => {
    const domeGeometry = new SphereGeometry(205, 48, 24)
    const domePositions = domeGeometry.getAttribute('position')
    const domeColors: number[] = []
    const horizon = new Color('#775B81')
    const middle = new Color('#35426B')
    const zenith = new Color('#101A3B')
    const tint = new Color()
    for (let i = 0; i < domePositions.count; i++) {
      const height = Math.max(0, domePositions.getY(i) / 205)
      tint.copy(horizon).lerp(middle, Math.min(1, height * 2.2))
      tint.lerp(zenith, Math.max(0, (height - 0.35) / 0.65))
      domeColors.push(tint.r, tint.g, tint.b)
    }
    domeGeometry.setAttribute('color', new Float32BufferAttribute(domeColors, 3))

    const random = makeRandom()
    const positions: number[] = []
    const colors: number[] = []
    for (let i = 0; i < STAR_COUNT; i++) {
      const height = 0.035 + random() * 0.965
      const angle = random() * Math.PI * 2
      const radius = Math.sqrt(1 - height * height) * STAR_RADIUS
      positions.push(Math.cos(angle) * radius, height * STAR_RADIUS, Math.sin(angle) * radius)
      const color = starColors[Math.floor(random() * starColors.length)]
      colors.push(color.r, color.g, color.b)
    }
    const starsGeometry = new BufferGeometry()
    starsGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    starsGeometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
    return { domeGeometry, starsGeometry }
  }, [])

  useFrame(({ camera, clock }, delta) => {
    if (!finaleActive) {
      fade.current = 0
      return
    }
    if (group.current) group.current.position.copy(camera.position)
    fade.current = Math.min(1, fade.current + delta * 0.85)
    if (domeMaterial.current) domeMaterial.current.opacity = fade.current
    if (starsMaterial.current) {
      starsMaterial.current.opacity = fade.current * (0.88 + Math.sin(clock.elapsedTime * 1.6) * 0.1)
    }
  })

  if (!finaleActive) return null

  return (
    <group ref={group}>
      <mesh geometry={domeGeometry} renderOrder={-10}>
        <meshBasicMaterial
          ref={domeMaterial}
          vertexColors
          side={BackSide}
          transparent
          opacity={0}
          depthWrite={false}
          fog={false}
        />
      </mesh>
      <points geometry={starsGeometry} renderOrder={-9}>
        <pointsMaterial
          ref={starsMaterial}
          vertexColors
          size={2.3}
          sizeAttenuation={false}
          transparent
          opacity={0}
          depthWrite={false}
          fog={false}
        />
      </points>
    </group>
  )
}
