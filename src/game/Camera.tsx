import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { Group } from 'three'
import { cameraYaw } from './cameraYaw'
import { useGameStore } from '../state/gameStore'

interface CameraRigProps {
  playerRef: React.RefObject<Group | null>
}

const DISTANCE = 13
const HEIGHT = 7

/** Third-person camera that follows the player with a smooth damp, orbits with
 * `cameraYaw`, and pans out toward the horizon for the finale moment. */
export function CameraRig({ playerRef }: CameraRigProps) {
  const { camera } = useThree()
  const currentPos = useRef(new THREE.Vector3(0, HEIGHT, DISTANCE + 103))
  const lookTarget = useRef(new THREE.Vector3(0, 1, 100))

  useFrame((_, delta) => {
    const player = playerRef.current
    if (!player) return
    const finaleActive = useGameStore.getState().finaleActive
    const t = 1 - Math.pow(0.0001, delta)

    if (finaleActive) {
      const desired = new THREE.Vector3(player.position.x + 4, player.position.y + 9, player.position.z + 9)
      currentPos.current.lerp(desired, t * 0.6)
      camera.position.copy(currentPos.current)
      lookTarget.current.lerp(
        new THREE.Vector3(player.position.x - 25, player.position.y + 6, player.position.z - 60),
        t * 0.4,
      )
      camera.lookAt(lookTarget.current)
      return
    }

    const yaw = cameraYaw.value
    const offsetX = Math.sin(yaw) * DISTANCE
    const offsetZ = Math.cos(yaw) * DISTANCE
    const desired = new THREE.Vector3(
      player.position.x + offsetX,
      player.position.y + HEIGHT,
      player.position.z + offsetZ,
    )
    currentPos.current.lerp(desired, t)
    camera.position.copy(currentPos.current)

    lookTarget.current.lerp(new THREE.Vector3(player.position.x, player.position.y + 2, player.position.z), t)
    camera.lookAt(lookTarget.current)
  })

  return null
}
