import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../state/gameStore'

const COUNT = 320
const COLORS = [
  new THREE.Color('#FFD58A'),
  new THREE.Color('#EFA4B7'),
  new THREE.Color('#D8B8EA'),
  new THREE.Color('#F7B8C6'),
  new THREE.Color('#76BED5'),
]

interface Particle {
  vx: number
  vy: number
  vz: number
  life: number
  maxLife: number
}

function randomBurstOrigin() {
  return new THREE.Vector3((Math.random() - 0.5) * 50 - 35, 30 + Math.random() * 14, (Math.random() - 0.5) * 50 - 90)
}

function respawn(i: number, positions: Float32Array, particles: Particle[], origin: THREE.Vector3) {
  positions[i * 3] = origin.x
  positions[i * 3 + 1] = origin.y
  positions[i * 3 + 2] = origin.z

  const angle = Math.random() * Math.PI * 2
  const elevation = Math.random() * Math.PI - Math.PI / 2
  const speed = 3 + Math.random() * 5
  particles[i].vx = Math.cos(angle) * Math.cos(elevation) * speed
  particles[i].vy = Math.sin(elevation) * speed + 2
  particles[i].vz = Math.sin(angle) * Math.cos(elevation) * speed
  particles[i].life = 0
  particles[i].maxLife = 1.2 + Math.random() * 0.8
}

/** Lightweight custom Three.js particle fireworks — no post-processing, no heavy library. */
export function FinaleFireworks() {
  const finaleActive = useGameStore((s) => s.finaleActive)
  const pointsRef = useRef<THREE.Points>(null)
  const originsRef = useRef<THREE.Vector3[]>([])
  const nextBurstAt = useRef(0)
  const burstIndex = useRef(0)

  const { positions, colors, particles } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const particles: Particle[] = []
    for (let i = 0; i < COUNT; i++) {
      particles.push({ vx: 0, vy: 0, vz: 0, life: 999, maxLife: 1 })
      const c = COLORS[i % COLORS.length]
      c.toArray(colors, i * 3)
      positions[i * 3 + 1] = -999
    }
    originsRef.current = [randomBurstOrigin(), randomBurstOrigin(), randomBurstOrigin()]
    return { positions, colors, particles }
  }, [])

  useFrame((state, rawDelta) => {
    if (!finaleActive || !pointsRef.current) return
    const delta = Math.min(rawDelta, 0.05)
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array

    if (state.clock.elapsedTime > nextBurstAt.current) {
      nextBurstAt.current = state.clock.elapsedTime + 0.55 + Math.random() * 0.45
      const origin = randomBurstOrigin()
      originsRef.current[burstIndex.current % originsRef.current.length] = origin
      burstIndex.current++
      const perBurst = 44
      for (let n = 0; n < perBurst; n++) {
        const i = Math.floor(Math.random() * COUNT)
        respawn(i, arr, particles, origin)
      }
    }

    for (let i = 0; i < COUNT; i++) {
      const p = particles[i]
      if (p.life > p.maxLife) continue
      p.life += delta
      p.vy -= 6 * delta
      arr[i * 3] += p.vx * delta
      arr[i * 3 + 1] += p.vy * delta
      arr[i * 3 + 2] += p.vz * delta
      if (p.life > p.maxLife) arr[i * 3 + 1] = -999
    }
    posAttr.needsUpdate = true
  })

  if (!finaleActive) return null

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.9} vertexColors transparent opacity={0.95} sizeAttenuation depthWrite={false} />
    </points>
  )
}
