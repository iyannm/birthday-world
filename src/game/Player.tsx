import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'
import { Character } from './Character'
import { cameraYaw } from './cameraYaw'
import { lerpAngle } from './mathUtils'
import { interactionPoints } from './interactionTargets'
import { SPAWN_POSITION, WORLD_BOUNDS, heightAt } from './world/worldConfig'
import { useGameStore } from '../state/gameStore'
import type { JoystickVector } from '../hooks/useJoystick'
import type { KeyboardState } from '../hooks/useKeyboard'

interface PlayerProps {
  joystick: React.RefObject<JoystickVector>
  keyboard: React.RefObject<KeyboardState>
  playerRef: React.RefObject<Group | null>
  paused: boolean
}

const SPEED = 10
const DEADZONE = 0.05

export function Player({ joystick, keyboard, playerRef, paused }: PlayerProps) {
  const facing = useRef(Math.PI)
  const movingRef = useRef(false)
  const lastNearbyKey = useRef<string | null>(null)
  const prevInteractKey = useRef(false)
  const [moving, setMoving] = useState(false)

  useFrame((_, rawDelta) => {
    const group = playerRef.current
    if (!group || paused) return
    const delta = Math.min(rawDelta, 0.05)

    let ix = joystick.current.x
    let iy = joystick.current.y
    if (Math.hypot(ix, iy) < DEADZONE) {
      ix = keyboard.current.x
      iy = keyboard.current.y
    }

    const inputLen = Math.hypot(ix, iy)
    const isMoving = inputLen > DEADZONE
    if (isMoving !== movingRef.current) {
      movingRef.current = isMoving
      setMoving(isMoving)
    }

    if (isMoving) {
      const yaw = cameraYaw.value
      const sin = Math.sin(yaw)
      const cos = Math.cos(yaw)
      const worldX = ix * cos + iy * sin
      const worldZ = -ix * sin + iy * cos

      const nx = THREE.MathUtils.clamp(
        group.position.x + worldX * SPEED * delta,
        WORLD_BOUNDS.minX,
        WORLD_BOUNDS.maxX,
      )
      const nz = THREE.MathUtils.clamp(
        group.position.z + worldZ * SPEED * delta,
        WORLD_BOUNDS.minZ,
        WORLD_BOUNDS.maxZ,
      )
      group.position.x = nx
      group.position.z = nz

      const targetFacing = Math.atan2(worldX, worldZ)
      facing.current = lerpAngle(facing.current, targetFacing, 1 - Math.pow(0.001, delta))
      group.rotation.y = facing.current
    }

    group.position.y = heightAt(group.position.x, group.position.z)

    let nearest: (typeof interactionPoints)[number] | null = null
    let nearestDist = Infinity
    for (const point of interactionPoints) {
      const dx = group.position.x - point.position[0]
      const dz = group.position.z - point.position[1]
      const dist = Math.hypot(dx, dz)
      if (dist < point.radius && dist < nearestDist) {
        nearest = point
        nearestDist = dist
      }
    }
    const nearestKey = nearest ? `${nearest.target.type}:${'id' in nearest.target ? nearest.target.id : ''}` : null
    if (nearestKey !== lastNearbyKey.current) {
      lastNearbyKey.current = nearestKey
      useGameStore.getState().setNearbyInteraction(nearest?.target ?? null)
    }

    const interactPressed = keyboard.current.interact
    if (interactPressed && !prevInteractKey.current) {
      useGameStore.getState().triggerInteraction()
    }
    prevInteractKey.current = interactPressed
  })

  return (
    <group ref={playerRef} position={SPAWN_POSITION} rotation={[0, Math.PI, 0]}>
      <Character moving={moving} />
    </group>
  )
}
