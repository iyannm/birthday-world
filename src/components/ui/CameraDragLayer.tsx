import { useRef } from 'react'
import { cameraYaw } from '../../game/cameraYaw'

const SENSITIVITY = 0.006

/** Full-screen layer (sits beneath the joystick/heart button) that lets you drag
 * to orbit the camera. Entirely optional — the world is fully navigable without it. */
export function CameraDragLayer() {
  const dragging = useRef(false)
  const lastX = useRef(0)
  const pointerId = useRef<number | null>(null)

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    pointerId.current = e.pointerId
    lastX.current = e.clientX
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || pointerId.current !== e.pointerId) return
    const dx = e.clientX - lastX.current
    lastX.current = e.clientX
    cameraYaw.value -= dx * SENSITIVITY
  }
  const endDrag = (e: React.PointerEvent) => {
    if (pointerId.current !== e.pointerId) return
    dragging.current = false
    pointerId.current = null
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 10, touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    />
  )
}
