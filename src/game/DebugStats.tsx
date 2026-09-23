import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { zonePositions } from './world/worldConfig'

interface DebugStatsProps {
  playerRef: React.RefObject<Group | null>
  domRef: React.RefObject<HTMLDivElement | null>
}

/** Writes debug text directly to a DOM node each frame (no React re-renders) —
 * enabled only behind ?debugWorld=1. */
export function DebugStats({ playerRef, domRef }: DebugStatsProps) {
  const frames = useRef(0)
  const lastSample = useRef(0)
  const fps = useRef(0)

  useFrame((state) => {
    frames.current += 1
    const elapsed = state.clock.elapsedTime
    if (elapsed - lastSample.current >= 0.5) {
      fps.current = Math.round(frames.current / (elapsed - lastSample.current))
      frames.current = 0
      lastSample.current = elapsed
    }

    const p = playerRef.current?.position
    if (domRef.current && p) {
      const zoneLines = Object.entries(zonePositions)
        .map(([name, pos]) => `${name}: (${pos[0]}, ${pos[2]})`)
        .join('\n')
      domRef.current.textContent =
        `FPS: ${fps.current}\n` +
        `Draws: ${state.gl.info.render.calls} | Triangles: ${state.gl.info.render.triangles.toLocaleString()}\n` +
        `pos: (${p.x.toFixed(1)}, ${p.y.toFixed(1)}, ${p.z.toFixed(1)})\n\n` +
        `zones:\n${zoneLines}`
    }
  })

  return null
}
